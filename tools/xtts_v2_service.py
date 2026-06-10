import io
import json
import os
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

import numpy as np
import soundfile as sf
import torch


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_ROOT = PROJECT_ROOT / "data" / "xtts-runtime"
TTS_HOME = DATA_ROOT / "tts-home"
HF_HOME = DATA_ROOT / "huggingface"
FFMPEG_DLL_DIRECTORIES = [
    Path(r"C:\Program Files\Streamlabs OBS\resources\app.asar.unpacked\node_modules\obs-studio-node"),
    Path(r"C:\Program Files\obs-studio\bin\64bit"),
]

for path in (DATA_ROOT, TTS_HOME, HF_HOME):
    path.mkdir(parents=True, exist_ok=True)

os.environ.setdefault("TTS_HOME", str(TTS_HOME))
os.environ.setdefault("XDG_DATA_HOME", str(TTS_HOME))
os.environ.setdefault("HF_HOME", str(HF_HOME))
os.environ.setdefault("COQUI_TOS_AGREED", "1")

PYTHON_DLL_DIRECTORIES = [
    PROJECT_ROOT / ".venv-xtts" / "Lib" / "site-packages" / "torch" / "lib",
    PROJECT_ROOT / ".venv-xtts" / "Lib" / "site-packages" / "torchcodec",
    *FFMPEG_DLL_DIRECTORIES,
]

for directory in PYTHON_DLL_DIRECTORIES:
    if not directory.exists():
        continue

    os.environ["PATH"] = f"{directory};{os.environ.get('PATH', '')}"
    if hasattr(os, "add_dll_directory"):
        os.add_dll_directory(str(directory))

from TTS.api import TTS


HOST = "127.0.0.1"
PORT = 8020
MODEL_NAME = "tts_models/multilingual/multi-dataset/xtts_v2"
SUPPORTED_AUDIO_EXTENSIONS = {".wav", ".mp3", ".flac", ".ogg", ".m4a"}


def clamp(value: float, minimum: float, maximum: float) -> float:
    return max(minimum, min(maximum, value))


def normalize_speaker_wavs(raw_value) -> list[str]:
    if not raw_value:
        return []

    values = raw_value if isinstance(raw_value, list) else [raw_value]
    normalized = []

    for item in values:
        path = Path(str(item)).expanduser().resolve()
        if not path.exists():
            raise FileNotFoundError(f"Speaker reference not found: {path}")
        if path.suffix.lower() not in SUPPORTED_AUDIO_EXTENSIONS:
            raise ValueError(f"Unsupported speaker reference format: {path.suffix}")
        normalized.append(str(path))

    return normalized


class XttsRuntime:
    def __init__(self) -> None:
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.loaded_at = None
        self.model = None
        self.load_lock = threading.Lock()
        self.inference_lock = threading.Lock()
        self.last_error = None
        self.last_request_at = None
        self.last_speaker = None

    def load(self) -> None:
        if self.model is not None:
            return

        with self.load_lock:
            if self.model is not None:
                return

            self.model = TTS(MODEL_NAME).to(self.device)
            self.loaded_at = time.time()
            self.last_error = None

    def get_status(self) -> dict:
        return {
            "ok": True,
            "service": "xtts-v2-local",
            "endpoint": f"http://{HOST}:{PORT}/tts",
            "model": MODEL_NAME,
            "device": self.device,
            "cuda": torch.cuda.is_available(),
            "loaded": self.model is not None,
            "loadedAt": self.loaded_at,
            "lastRequestAt": self.last_request_at,
            "lastSpeaker": self.last_speaker,
            "lastError": self.last_error,
        }

    def synthesize(self, payload: dict) -> bytes:
        self.load()

        text = str(payload.get("text", "")).strip()
        if not text:
            raise ValueError("The 'text' field is required.")

        language = str(payload.get("language", "en") or "en").strip() or "en"
        voice = str(payload.get("voice", "") or "").strip()
        speed = clamp(float(payload.get("speed", 1.0) or 1.0), 0.5, 2.0)
        volume = clamp(float(payload.get("volume", 1.0) or 1.0), 0.0, 2.0)
        split_sentences = bool(payload.get("split_sentences", True))
        speaker_wavs = normalize_speaker_wavs(payload.get("speaker_wav"))

        kwargs = {
            "text": text,
            "language": language,
            "split_sentences": split_sentences,
        }

        if speaker_wavs:
            kwargs["speaker_wav"] = speaker_wavs
            self.last_speaker = speaker_wavs[0]
        elif voice and voice.lower() not in {"default", "none", "disabled"}:
            kwargs["speaker"] = voice
            self.last_speaker = voice
        else:
            self.last_speaker = "default"

        if abs(speed - 1.0) > 0.001:
            kwargs["speed"] = speed

        self.last_request_at = time.time()

        with self.inference_lock:
            try:
                wav = self.model.tts(**kwargs)
            except TypeError as error:
                if "speed" in kwargs and "speed" in str(error):
                    kwargs.pop("speed", None)
                    wav = self.model.tts(**kwargs)
                else:
                    self.last_error = str(error)
                    raise
            except Exception as error:
                self.last_error = str(error)
                raise

        audio = np.asarray(wav, dtype=np.float32)
        if volume != 1.0:
            audio = np.clip(audio * volume, -1.0, 1.0)

        buffer = io.BytesIO()
        sf.write(buffer, audio, 24000, format="WAV")
        self.last_error = None
        return buffer.getvalue()


runtime = XttsRuntime()


class TtsHandler(BaseHTTPRequestHandler):
    server_version = "StreamSyncProXTTS/1.0"

    def _send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path in ("/", "/health", "/tts"):
            self._send_json(200, runtime.get_status())
            return

        self._send_json(404, {"ok": False, "error": "Not found"})

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path != "/tts":
            self._send_json(404, {"ok": False, "error": "Not found"})
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length)

        try:
            payload = json.loads(raw_body.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._send_json(400, {"ok": False, "error": "Invalid JSON"})
            return

        try:
            audio_bytes = runtime.synthesize(payload)
        except FileNotFoundError as error:
            self._send_json(400, {"ok": False, "error": str(error)})
            return
        except ValueError as error:
            self._send_json(400, {"ok": False, "error": str(error)})
            return
        except Exception as error:
            self._send_json(500, {"ok": False, "error": str(error)})
            return

        self.send_response(200)
        self.send_header("Content-Type", "audio/wav")
        self.send_header("Content-Length", str(len(audio_bytes)))
        self.end_headers()
        self.wfile.write(audio_bytes)

    def log_message(self, format_string: str, *args) -> None:
        return


def main() -> None:
    print("Loading XTTS-v2 model. The first startup can take a while while model weights download.", flush=True)
    runtime.load()
    server = ThreadingHTTPServer((HOST, PORT), TtsHandler)
    print(f"XTTS-v2 local service listening on http://{HOST}:{PORT}/tts using {runtime.device}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
