# Adorn — Beauty that understands you

Adorn prototipinin telefona kurulabilen (PWA) sürümü. Derleme adımı gerektirmez; GitHub Pages'te statik dosya olarak yayınlanır.

**Canlı adres:** https://betylyildiz-tech.github.io/My-app/

## Prototipe eklenenler

Tasarım, renkler, fontlar, ikonlar ve logo prototipteki gibi kaldı. Eklenen ve değişenler:

- **İki yol:** Açılışta "Makyajla ilgileniyor musun?" sorusu sorulur.
  - **Evet:** Kısa sorularla klasik moda geçilir.
  - **Hayır:** Sorular atlanır. Makyaj alanları, kurslar, makyaj glow-up'ı, profildeki makyaj bölümü ve makyaj önerileri gizlenir; uygulama cilt ve saç bakımına odaklanır. Bu tercih sonradan Ayarlar → "Makyaj içeriği" ile değiştirilebilir.
- **Akıcı sorular:** Onay butonu yok; seçeneğe dokununca bir sonraki soruya geçilir. Seçilen hafifçe büyür, diğerleri solar. Seçenekler yuvarlak hap biçimindedir.
- **Tek seferlik karşılama:** "Hoş geldin! Ben Adorn, kişisel asistanınım. Birbirimizi tanıyalım mı?" Ardından Profil açılır. "Güzellik profili" başlığı "Profil" oldu.
- **Ana sayfa:** "Odaklı sohbet" başlığı ve özet çipleri kaldırıldı. Konu seçilince yalnızca "Adorn sohbeti bu konuya odaklı tutacaktır." yazar.
- **Seri:** Pencere yerine tüm ekranı kaplayan kendi sayfasında açılır.
  - **Programlar:** Genel bir şablon yerine belirli hedefler: Sivilcesiz cilt, Cam cilt, Hassas cilde huzur, Güçlü saçlar (makyaj yolunda ayrıca Makyaj glow-up'ı). Her biri 30 günlük, günde üç görevli.
  - **Alev halkası:** Ortada ince, yumuşak hatlı bir alev var; seri gün sayısı alevin içinde yazar. Günün görevleri tamamlandıkça alev alttan yukarı kahve tonlarında dolar. Çevresindeki halka 30 günlük ilerlemeyi gösterir.
  - **Görevler:** Dokununca kutu şarj gibi dolar, tok bir titreşim gelir. Parmak ekrandan kalkınca görev kaybolur.
- **Gerçek yapay zeka (Claude):** Ayarlar → Rehberlik → "Claude bağlantısı" alanına bir Anthropic API anahtarı girilince sohbet ve fotoğraf yorumu Claude'dan canlı gelir (model: Claude Opus 5.5). Anahtar yalnızca o cihazda saklanır ve doğrudan Anthropic'e gönderilir. Anahtar yoksa uygulama yerleşik örnek yanıtlarla çalışır.
- **Görünüm:** Yazma çubuğu tam yuvarlak ve yarı saydam. Satırlar, düğmeler ve sohbet balonları yumuşak, esnek animasyonlarla tepki verir. Sohbet ve seride dokunuşlara kısa bir titreşim eşlik eder. Palet beyaz, bej, siyah ve kahvedir; turuncu tonlar kaldırıldı.
- **Üst düğmeler:** Seri, geçmiş ve + düğmeleri kapalı tepside durur; ok işaretine dokununca ya da kaydırınca belirir.
- **Hayır yolu profilinde** göz rengi bölümü gösterilmez.
- **14 dil:** İngilizce, Türkçe, İspanyolca, Fransızca, Almanca, İtalyanca, Portekizce, Rusça, Arapça, Çince, Japonca, Korece, Fince, İsveççe. Çeviriler `l10n/` içinde hazır durur; sunucu veya internet olmadan çalışır. Örnek sohbet yanıtları da çevrilir.
- **Akıcılık:** Kaydırılan kartlardaki gereksiz bulanıklık efekti kaldırıldı; örnek yanıt beklemesi kısaldı. Telefonda alttan açılan paneller tam genişlikte açılır.
- **PWA:** Ana ekrana kurulur, kendi penceresinde açılır, internetsiz de çalışır.

## Dosyalar

```
index.html             Uygulama (prototip + değişiklikler, tek dosya)
l10n/                  13 dilin hazır çevirileri
manifest.webmanifest   Uygulama adı, ikonlar, görünüm
sw.js                  Servis çalışanı: önbellek, internetsiz açılış
icons/                 Ana ekran ikonları (prototipteki "adorn" yazısı)
dev/                   Prototip, yamalar ve yeniden üretme araçları (bkz. dev/README.md)
```

## Yayınlama

`main` dalına yapılan her gönderimde `.github/workflows/pages.yml` siteyi `gh-pages` dalına yayınlar. Pages ayarı: **Settings → Pages → Deploy from a branch → `gh-pages` / `(root)`**.

## Telefona kurulum

- **iPhone (Safari):** Paylaş → **Ana Ekrana Ekle**
- **Android (Chrome):** Menü → **Uygulamayı yükle**
