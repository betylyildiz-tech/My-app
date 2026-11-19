# index.html üretir: prototip HTML + yamalanmış JS + CSS ekleri + PWA etiketleri.
# Kullanım: python3 build.py <prototip.html> <app.patched.js> <additions.css> <pwa-head.html> <çıktı.html>
import subprocess, sys, os

proto, js_path, css_add, head_add, out = sys.argv[1:6]
html = open(proto, encoding="utf-8").read()
js = open(js_path, encoding="utf-8").read()
here = os.path.dirname(os.path.abspath(__file__))
esbuild = os.path.join(here, "tools", "node_modules", ".bin", "esbuild")
mini = subprocess.run([esbuild, "--minify", "--target=es2020", "--loader=js", "--charset=utf8", "--legal-comments=none"],
                      input=js, capture_output=True, text=True, check=True).stdout
mini = mini.replace("</script", "<\\/script")
add = open(css_add, encoding="utf-8").read()
add_min = subprocess.run([esbuild, "--minify", "--loader=css", "--charset=utf8"], input=add,
                         capture_output=True, text=True, check=True).stdout

body = html.index("<body>")
s0 = html.index("<script>", body) + len("<script>")
s1 = html.rindex("</script>")
html = html[:s0] + mini + html[s1:]
st = html.index("</style>")
html = html[:st] + "\n" + add_min + html[st:]
anchor = '<meta name="description" content="Your personal beauty companion for connected skincare, makeup and haircare routines." />'
assert html.count(anchor) == 1
html = html.replace(anchor, anchor + open(head_add, encoding="utf-8").read(), 1)
open(out, "w", encoding="utf-8").write(html)
print(out, round(len(html.encode()) / 1024), "KB")
