from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
ROOT=Path(__file__).resolve().parents[1]/'public'
os.chdir(ROOT)
class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.headers.get('Host') not in ['127.0.0.1:8766','localhost:8766']:
            self.send_error(403);return
        origin=self.headers.get('Origin')
        if origin and origin not in ['http://127.0.0.1:8766','http://localhost:8766']:
            self.send_error(403);return
        super().do_GET()
    def log_message(self,*args): pass
print('Preview: http://127.0.0.1:8766',flush=True)
ThreadingHTTPServer(('127.0.0.1',8766),Handler).serve_forever()
