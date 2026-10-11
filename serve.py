"""Local preview server: python3 -m http.server, but telling the browser not to cache.

Without this, browsers reuse old copies of edited sketch JS, especially inside the gallery's iframes.
"""

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8500
    handler = partial(NoCacheHandler, directory=str(Path(__file__).parent))
    print(f"Serving on http://localhost:{port}")
    ThreadingHTTPServer(("", port), handler).serve_forever()
