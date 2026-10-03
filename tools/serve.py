#!/usr/bin/env python3
"""Serveur local imitant GitHub Pages : /page sert page.html.

Usage : /usr/bin/python3 tools/serve.py [port] [dossier]
Par défaut : port 8000, dossier = racine du site.
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.abspath(
    sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), "..")
)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        translated = super().translate_path(path)
        if not os.path.exists(translated) and os.path.exists(translated + ".html"):
            return translated + ".html"
        return translated

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT)
    print(f"Site servi sur http://localhost:{PORT} depuis {ROOT}")
    ThreadingHTTPServer(("", PORT), Handler).serve_forever()
