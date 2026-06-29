from pathlib import Path

# Expose the existing ai-services folders as an importable ai_services package.
__path__ = [str(Path(__file__).resolve().parent.parent)]
