# Adorn: kişisel bakım asistanı (PWA)

Cilt, saç ve makyaj için kişisel bakım asistanı. iPhone ve Android'de ana ekrana uygulama gibi kurulur, tam ekran ve çevrimdışı çalışır.

## Öne çıkanlar

- **Unisex yol ayrımı**: Açılışta "Makyajla ilgileniyor musun?" sorusu.
  - **Evet**: 3 kısa soru (dokununca seçilen büyür, diğerleri solar ve otomatik geçer), ardından makyaj + cilt + saç modu.
  - **Hayır**: Soru yok. Tasarım aynı kalır, yalnızca makyaj içeriği gizlenir; uygulama cilt ve saç bakımına odaklanır.
- **Tek seferlik karşılama**: "Hoş geldin! Ben Adorn, senin kişisel asistanınım. Tanışalım mı?" ve ardından **Profil**.
- **Odaklı sohbet**: Konu seçilince sohbet o konuda kalır. Konu dışı bir soruda "Yeni sohbette sor" önerilir.
- **Tam ekran glow-up serisi**: Sade görünüm; günlük 3 görev (sabah rutini, kısa ders + soru, akşam rutini) ve 30 günlük ilerleme.
- **Ürün tarama**: Canlı kamera vizörü. Claude bağlıysa fotoğraftan ürün tanıma; değilse ürün adını yazarak (otomatik öneriyle) analiz. Sonuçta uygunluk puanı, nedenleri, uyarılar ve kullanım şekli gösterilir.
- **Rutin**: Profile göre oluşan sabah/akşam adımları. Tamamlanan rutin seriye sayılır.
- **Ürünlerim**: Puanlama, alana göre filtre, geri alınabilir silme.
- **Tam Türkçe ve İngilizce**: Arayüz ve sohbet motoru iki dilli. Türkçe ekleri ve ünsüz yumuşamasını tanır (ör. "kepeğim", "sivilcelerim").
- **Kasmayan sohbet**: Yerel motor anında yanıt verir. Yazı animasyonu `requestAnimationFrame` ile yapılır ve yalnızca ilgili mesaj güncellenir; liste her seferinde yeniden çizilmez.
- **Orijinal tasarım**: Kırık beyaz zemin, kahve vurgular, sistem yazı tipi; açık ve koyu tema.

## Claude bağlantısı (isteğe bağlı)

Uygulama çevrimdışı yerleşik bir asistanla çalışır. Canlı yanıt ve fotoğraftan ürün tanıma için **Profil → Ayarlar → Claude bağlantısı** alanına bir Anthropic API anahtarı girilebilir. Anahtar yalnızca o cihazın tarayıcısında saklanır.

> Not: API anahtarı tarayıcıdan doğrudan kullanılır. Herkese açık bir yayın için anahtarı bir sunucu (proxy) arkasına almak daha güvenlidir.

## Yapı

```
index.html             Uygulama kabuğu
manifest.webmanifest   PWA manifesti (tam ekran, ikonlar, kısayollar)
sw.js                  Servis çalışanı (çevrimdışı önbellek)
css/app.css            Tasarım (orijinal palet)
js/i18n.js             TR/EN metinler
js/data.js             Ürünler, konular, seriler, dersler
js/engine.js           Yerel sohbet motoru, ürün analizi, rutin
js/ai.js               Claude bağlantısı
js/app.js              Ekranlar ve etkileşim
icons/                 Uygulama ikonları (normal, maskable, Apple)
scripts/               İkon ve tek dosyalık önizleme üretimi
```

Derleme adımı yoktur. Düz HTML/CSS/JS'dir.

## Yerelde çalıştırma

```bash
python3 -m http.server 8080
```

Ardından `http://localhost:8080` adresini aç. Servis çalışanı yalnızca `http(s)` üzerinde etkinleşir.

## Yayınlama (GitHub Pages)

`main` dalına her gönderimde `.github/workflows/pages.yml` site dosyalarını `gh-pages` dalına kopyalar. Pages ayarı: **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `(root)`**.

## Telefona kurulum

- **iPhone (Safari)**: Paylaş → **Ana Ekrana Ekle**
- **Android (Chrome)**: Menü → **Uygulamayı yükle** (veya Profil → Ayarlar → "Ana ekrana ekle")
