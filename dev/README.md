# Geliştirme notları

Yayındaki `index.html`, yüklenen prototipten (`prototip.html`) üretilir. Prototipin tasarımı, renkleri, fontları, ikonları ve logosu olduğu gibi kalır. Üzerine yalnızca `patches.py` içindeki değişiklikler uygulanır. Her yama tam olarak bir kez eşleşmek zorundadır; eşleşmezse derleme durur.

## Yeniden üretmek

```bash
cd dev
npm i --prefix tools prettier@3.3.3 esbuild@0.23.1
python3 - <<'PY'
s = open("prototip.html", encoding="utf-8").read()
b = s.index("<body>"); a = s.index("<script>", b) + 8; e = s.rindex("</script>")
open("app.js", "w", encoding="utf-8").write(s[a:e])
PY
tools/node_modules/.bin/prettier --parser babel app.js > app.pretty.js
python3 patches.py app.pretty.js app.patched.js
python3 build.py prototip.html app.patched.js additions.css,ios.css pwa-head.html ../index.html
```

Bu işlem `index.html` dosyasını yeniden yazar. Ardından `sw.js` içindeki `CACHE` sürümünü bir artırın.

## Dosyalar

- `patches.py`: Prototipe uygulanan değişiklikler; her birinin başında Türkçe açıklaması var.
- `patches2.py`: İkinci tur: seri programları, alev halkası, şarj olan görevler, Claude bağlantısı ayarı, titreşimler (`patches.py` tarafından çalıştırılır).
- `patches3.py`: Üçüncü tur: varsayılan İngilizce, profilde yüz taraması (`patches.py` tarafından çalıştırılır).
- `ios.css`: iOS tarzı yüzey güncellemesi, yüz tarama ekranı ve premium altın hüzme stilleri.
- `additions.css`: Yeni parçaların stilleri. Prototipin kendi renk değişkenlerini (`--tint`, `--paper`, `--ink-2` vb.) kullanır.
- `pwa-head.html`: `<head>` içine eklenen manifest, ikon ve servis çalışanı satırları. Ayrıca GitHub Pages'te `/api` sunucusu olmadığı için bu istekleri ağa göndermeden "kullanılamıyor" olarak yanıtlayan küçük kod.
- `../l10n/*.json`: 13 dilin hazır çevirileri (İngilizce metin → çeviri).
