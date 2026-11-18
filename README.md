# Adorn — Beauty that understands you

Adorn prototipinin telefona kurulabilen (PWA) sürümü. Derleme adımı yoktur; GitHub Pages'te statik dosya olarak yayınlanır.

**Canlı adres:** https://betylyildiz-tech.github.io/My-app/

## Dosyalar

```
index.html             Prototipin kendisi (tek parça HTML). Yalnızca <head> içine PWA satırları eklendi.
manifest.webmanifest   Uygulama adı, ikonlar, tam ekran (standalone) görünüm
sw.js                  Servis çalışanı: uygulamayı önbelleğe alır, internetsiz de açılır
icons/                 Ana ekran ikonları (prototipteki "adorn" yazısı)
.nojekyll              GitHub Pages'in dosyaları olduğu gibi sunması için
```

`index.html` içine eklenen tek kod: GitHub Pages'te `/api` sunucusu olmadığı için bu istekler ağa gitmeden "kullanılamıyor" olarak yanıtlanır ve uygulama prototipteki yerleşik örnek yanıtlarla çalışır. Konsolda 404 hatası oluşmaz.

## Güncelleme

Yeni bir prototip HTML'i geldiğinde:

1. Dosyayı `index.html` olarak kaydet.
2. Eski `index.html` içindeki `<!-- PWA: ... -->` bloğunu (bir `<link rel="manifest">` ile başlayıp `</script>` ile biter) yeni dosyada `<meta name="description" ...>` satırının hemen altına kopyala.
3. `sw.js` içindeki `CACHE` sürümünü bir artır (ör. `adorn-v4`), böylece telefonlar yeni sürümü alır.
4. `main` dalına gönder. `.github/workflows/pages.yml` siteyi `gh-pages` dalına yayınlar.

## Telefona kurulum

- **iPhone (Safari):** Paylaş → **Ana Ekrana Ekle**
- **Android (Chrome):** Menü → **Uygulamayı yükle**

## Yerelde deneme

```bash
python3 -m http.server 8080
```

Ardından `http://localhost:8080` adresini aç.
