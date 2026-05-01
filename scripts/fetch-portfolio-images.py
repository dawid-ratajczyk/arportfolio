#!/usr/bin/env python3
"""Pobiera obrazy z data.js i (opcjonalnie) pojedynczy URL tła z HTML do portfolio/images/..."""
from __future__ import annotations

import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data.js"
BASE = "https://linocut.andrzejratajczyk.pl/content/images/"
EXTRA = [
    BASE + "2023/03/icon-copy-2.jpg",
]


def main() -> int:
    text = DATA.read_text(encoding="utf-8")
    # Źródło zdalne w data.js lub już zmigrowane ./images/…
    urls = set(m.group(1) for m in re.finditer(r'"(https://linocut\.andrzejratajczyk\.pl/content/images/[^"]+)"', text))
    urls.update(BASE + m.group(1) for m in re.finditer(r'"\./images/([^"]+)"', text))
    urls.update(EXTRA)
    ok = 0
    for url in sorted(urls):
        if not url.startswith(BASE):
            print("skip", url, file=sys.stderr)
            continue
        rel = url[len(BASE) :]
        dest = ROOT / "images" / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if dest.exists() and dest.stat().st_size > 0:
            print("exists", dest.relative_to(ROOT))
            ok += 1
            continue
        print("fetch", rel)
        req = urllib.request.Request(url, headers={"User-Agent": "portfolio-local-mirror/1.0"})
        with urllib.request.urlopen(req, timeout=120) as r:
            dest.write_bytes(r.read())
        ok += 1
    print("done", ok, "files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
