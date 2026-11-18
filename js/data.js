/* Adorn — içerik verisi (iki dilli) */
(function () {
  const L = (tr, en) => ({ tr, en });

  /* ---------- Profil seçenekleri ---------- */
  const OPTIONS = {
    skinType: [
      { id: 'dry', l: L('Kuru', 'Dry') }, { id: 'oily', l: L('Yağlı', 'Oily') },
      { id: 'combo', l: L('Karma', 'Combination') }, { id: 'normal', l: L('Normal', 'Normal') },
      { id: 'sensitive', l: L('Hassas', 'Sensitive') }
    ],
    concerns: [
      { id: 'acne', l: L('Sivilce', 'Breakouts') }, { id: 'pores', l: L('Gözenekler', 'Pores') },
      { id: 'dryness', l: L('Kuruluk', 'Dryness') }, { id: 'redness', l: L('Kızarıklık', 'Redness') },
      { id: 'darkspots', l: L('Leke', 'Dark spots') }, { id: 'aging', l: L('İnce çizgiler', 'Fine lines') },
      { id: 'darkcircles', l: L('Göz altı', 'Under-eyes') }, { id: 'dull', l: L('Donukluk', 'Dullness') }
    ],
    hairType: [
      { id: 'straight', l: L('Düz', 'Straight') }, { id: 'wavy', l: L('Dalgalı', 'Wavy') },
      { id: 'curly', l: L('Kıvırcık', 'Curly') }, { id: 'thin', l: L('İnce telli', 'Fine') },
      { id: 'short', l: L('Kısa', 'Short') }
    ],
    scalp: [
      { id: 'balanced', l: L('Dengeli', 'Balanced') }, { id: 'oilyscalp', l: L('Çabuk yağlanan', 'Gets oily fast') },
      { id: 'dandruff', l: L('Kepekli', 'Flaky') }, { id: 'thinning', l: L('Dökülme var', 'Thinning') }
    ],
    skinTone: [
      { id: 'fair', l: L('Çok açık', 'Fair'), c: '#F3D9C6' }, { id: 'light', l: L('Açık', 'Light'), c: '#E8C2A4' },
      { id: 'medium', l: L('Buğday', 'Medium'), c: '#C99A73' }, { id: 'tan', l: L('Esmer', 'Tan'), c: '#A97650' },
      { id: 'deep', l: L('Koyu', 'Deep'), c: '#7A4E33' }, { id: 'rich', l: L('Çok koyu', 'Rich'), c: '#4E3020' }
    ],
    undertone: [
      { id: 'warm', l: L('Sıcak', 'Warm') }, { id: 'cool', l: L('Soğuk', 'Cool') },
      { id: 'neutral', l: L('Nötr', 'Neutral') }, { id: 'unsure', l: L('Emin değilim', 'Not sure') }
    ],
    makeupStyle: [
      { id: 'natural', l: L('Doğal', 'Natural') }, { id: 'glam', l: L('Göz alıcı', 'Glam') },
      { id: 'soft', l: L('Yumuşak ışıltı', 'Soft glow') }, { id: 'bold', l: L('Cesur', 'Bold') }
    ],
    budget: [
      { id: '$', l: L('Uygun', 'Budget') }, { id: '$$', l: L('Orta', 'Mid') }, { id: '$$$', l: L('Premium', 'Premium') }
    ]
  };

  /* ---------- Ana sayfa konuları ---------- */
  const TOPICS = {
    makeup: [
      { id: 'am', area: 'skin', icon: 'sun', t: L('Sabah cilt bakımı', 'Morning skincare'), q: L('Sabah cilt bakım rutinimi planlar mısın?', 'Can you plan my morning skincare routine?') },
      { id: 'everyday', area: 'makeup', icon: 'sparkle', t: L('Kolay günlük makyaj', 'Easy everyday makeup'), q: L('Bana kolay bir günlük makyaj öner.', 'Suggest an easy everyday makeup look.') },
      { id: 'shade', area: 'makeup', icon: 'drop', t: L('Fondöten tonumu bul', 'Find my foundation shade'), q: L('Doğru fondöten tonunu nasıl bulurum?', 'How do I find the right foundation shade?') },
      { id: 'event', area: 'makeup', icon: 'star', t: L('Özel gün makyajı', 'Special-day makeup'), q: L('Özel bir gün için akşam makyajı öner.', 'Suggest an evening look for a special day.') },
      { id: 'frizz', area: 'hair', icon: 'wave', t: L('Kabaran saçlar', 'Frizzy hair'), q: L('Saçlarım kabarıyor ve kuru, ne yapmalıyım?', 'My hair is dry and frizzy, what should I do?') },
      { id: 'buy', area: 'general', icon: 'bag', t: L('Ne almalıyım?', 'What should I buy?'), q: L('Profilime göre sıradaki ürünüm ne olmalı?', 'Based on my profile, what should I buy next?') }
    ],
    care: [
      { id: 'am', area: 'skin', icon: 'sun', t: L('Sabah bakım rutini', 'Morning routine'), q: L('Bana basit bir sabah bakım rutini kurar mısın?', 'Can you set up a simple morning routine for me?') },
      { id: 'acne', area: 'skin', icon: 'target', t: L('Sivilce ve gözenekler', 'Breakouts and pores'), q: L('Sivilce ve siyah noktalar için ne yapmalıyım?', 'What should I do about breakouts and blackheads?') },
      { id: 'dry', area: 'skin', icon: 'drop', t: L('Kuru ve hassas cilt', 'Dry, sensitive skin'), q: L('Cildim kuru ve hassas, nasıl bakmalıyım?', 'My skin is dry and sensitive, how should I care for it?') },
      { id: 'frizz', area: 'hair', icon: 'wave', t: L('Kabaran saçlar', 'Frizzy hair'), q: L('Saçlarım kabarıyor ve kuru, ne yapmalıyım?', 'My hair is dry and frizzy, what should I do?') },
      { id: 'hair', area: 'hair', icon: 'wave', t: L('Dökülme ve kepek', 'Thinning and dandruff'), q: L('Saç dökülmesi ve kepek için ne önerirsin?', 'What do you suggest for thinning hair and dandruff?') },
      { id: 'buy', area: 'general', icon: 'bag', t: L('Ne almalıyım?', 'What should I buy?'), q: L('Profilime göre ilk alacağım bakım ürünü ne olmalı?', 'Based on my profile, which care product should I get first?') }
    ]
  };

  /* ---------- Ürün kütüphanesi ---------- */
  const P = (o) => o;
  const PRODUCTS = [
    // Cilt
    P({ id: 'cv-hyd', brand: 'CeraVe', name: 'Hydrating Cleanser', cat: 'cleanser', area: 'skin', for: ['dry', 'normal', 'sensitive'], concerns: ['dryness', 'redness'], budget: '$', ff: true, ing: ['Ceramides', 'Hyaluronic acid'],
      d: L('Köpürmeyen, bariyeri yormayan nazik temizleyici.', 'A gentle, non-foaming cleanser that respects the skin barrier.'),
      how: L('Nemli cilde masaj yaparak uygula, ılık suyla durula.', 'Massage onto damp skin, rinse with lukewarm water.') }),
    P({ id: 'cv-foam', brand: 'CeraVe', name: 'Foaming Cleanser', cat: 'cleanser', area: 'skin', for: ['oily', 'combo', 'normal'], concerns: ['acne', 'pores'], budget: '$', ff: true, ing: ['Niacinamide', 'Ceramides'],
      d: L('Fazla yağı alırken cildi kurutmayan köpüren jel.', 'A foaming gel that lifts oil without stripping.'),
      how: L('Sabah ve akşam, az miktarı köpürterek kullan.', 'Use a small amount morning and night.') }),
    P({ id: 'lrp-effaclar', brand: 'La Roche-Posay', name: 'Effaclar Purifying Foaming Gel', cat: 'cleanser', area: 'skin', for: ['oily', 'combo'], concerns: ['acne', 'pores'], budget: '$$', ff: false, ing: ['Zinc PCA'],
      d: L('Yağlı ve sivilceye eğilimli ciltler için arındırıcı jel.', 'A purifying gel for oily, breakout-prone skin.'),
      how: L('Nemli yüze uygula, T bölgesine odaklan, durula.', 'Apply to damp skin, focus on the T-zone, rinse.') }),
    P({ id: 'to-nia', brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', cat: 'serum', area: 'skin', for: ['oily', 'combo', 'normal'], concerns: ['pores', 'acne', 'darkspots'], budget: '$', ff: true, ing: ['Niacinamide', 'Zinc'],
      d: L('Gözenek görünümü ve yağ dengesi için popüler serum.', 'A popular serum for the look of pores and oil balance.'),
      how: L('Nemlendiriciden önce birkaç damla. Hassassan gün aşırı başla.', 'A few drops before moisturizer. If sensitive, start every other day.') }),
    P({ id: 'to-ha', brand: 'The Ordinary', name: 'Hyaluronic Acid 2% + B5', cat: 'serum', area: 'skin', for: ['dry', 'normal', 'combo', 'oily', 'sensitive'], concerns: ['dryness', 'dull'], budget: '$', ff: true, ing: ['Hyaluronic acid', 'Panthenol'],
      d: L('Her cilt tipine uygun, hafif nem serumu.', 'A lightweight hydrating serum for every skin type.'),
      how: L('Nemli cilde uygula, üzerine mutlaka nemlendirici sür.', 'Apply to damp skin and seal with moisturizer.') }),
    P({ id: 'pc-bha', brand: 'Paula\'s Choice', name: 'Skin Perfecting 2% BHA Liquid Exfoliant', cat: 'exfoliant', area: 'skin', for: ['oily', 'combo', 'normal'], concerns: ['pores', 'acne'], budget: '$$', ff: true, ing: ['Salicylic acid 2%'],
      d: L('Siyah nokta ve tıkalı gözenekler için durulanmayan BHA.', 'A leave-on BHA for blackheads and clogged pores.'),
      how: L('Akşam, temizlikten sonra pamukla. Haftada 2–3 kez başla.', 'Evenings after cleansing, on a cotton pad. Start 2–3 times a week.') }),
    P({ id: 'lrp-uvmune', brand: 'La Roche-Posay', name: 'Anthelios UVMune 400 Fluid SPF50+', cat: 'spf', area: 'skin', for: ['dry', 'normal', 'combo', 'oily', 'sensitive'], concerns: ['darkspots', 'aging', 'redness'], budget: '$$', ff: true, ing: ['UVA/UVB filters'],
      d: L('Çok hafif dokulu, yüksek korumalı güneş koruyucu.', 'A very light, high-protection sunscreen.'),
      how: L('Sabah son adım. İki parmak boyu miktar, 2–3 saatte bir yenile.', 'Last morning step. Two finger-lengths; reapply every 2–3 hours outdoors.') }),
    P({ id: 'boj-sun', brand: 'Beauty of Joseon', name: 'Relief Sun SPF50+', cat: 'spf', area: 'skin', for: ['dry', 'normal', 'combo'], concerns: ['dull', 'dryness'], budget: '$', ff: true, ing: ['Rice extract', 'Probiotics'],
      d: L('Beyaz iz bırakmayan, kremsi güneş koruyucu.', 'A creamy sunscreen that leaves no white cast.'),
      how: L('Nemlendiriciden sonra bol miktarda uygula.', 'Apply generously after moisturizer.') }),
    P({ id: 'cv-cream', brand: 'CeraVe', name: 'Moisturising Cream', cat: 'moisturizer', area: 'skin', for: ['dry', 'normal', 'sensitive'], concerns: ['dryness', 'redness'], budget: '$', ff: true, ing: ['Ceramides', 'Hyaluronic acid'],
      d: L('Yüz ve vücut için zengin, bariyer onarıcı krem.', 'A rich, barrier-repairing cream for face and body.'),
      how: L('Temizlik ve serumdan sonra, nemli cilde.', 'After cleansing and serum, on slightly damp skin.') }),
    P({ id: 'ntg-hb', brand: 'Neutrogena', name: 'Hydro Boost Water Gel', cat: 'moisturizer', area: 'skin', for: ['oily', 'combo', 'normal'], concerns: ['dryness', 'dull'], budget: '$', ff: false, ing: ['Hyaluronic acid'],
      d: L('Yağlı ciltleri ağırlaştırmayan jel nemlendirici.', 'A gel moisturizer that won\'t weigh oily skin down.'),
      how: L('Sabah ve akşam ince bir kat.', 'A thin layer morning and night.') }),
    P({ id: 'lrp-cica', brand: 'La Roche-Posay', name: 'Cicaplast Baume B5+', cat: 'moisturizer', area: 'skin', for: ['sensitive', 'dry'], concerns: ['redness', 'dryness'], budget: '$$', ff: true, ing: ['Panthenol 5%', 'Madecassoside'],
      d: L('Tahriş olmuş, gerilmiş cilt için onarıcı balm.', 'A soothing balm for irritated, tight skin.'),
      how: L('Kuru ya da tahrişli bölgelere ince tabaka.', 'A thin layer on dry or irritated areas.') }),
    P({ id: 'to-ret', brand: 'The Ordinary', name: 'Retinol 0.5% in Squalane', cat: 'serum', area: 'skin', for: ['normal', 'combo', 'oily', 'dry'], concerns: ['aging', 'darkspots', 'acne'], budget: '$', ff: true, ing: ['Retinol', 'Squalane'],
      d: L('İnce çizgiler ve cilt dokusu için retinol.', 'Retinol for fine lines and texture.'),
      how: L('Yalnızca akşam, haftada 2 geceyle başla. Ertesi sabah SPF şart.', 'Evenings only, start 2 nights a week. SPF the next morning is a must.') }),
    P({ id: 'to-caf', brand: 'The Ordinary', name: 'Caffeine Solution 5% + EGCG', cat: 'eye', area: 'skin', for: ['dry', 'normal', 'combo', 'oily', 'sensitive'], concerns: ['darkcircles'], budget: '$', ff: true, ing: ['Caffeine', 'EGCG'],
      d: L('Göz altı şişlik ve gölge görünümü için hafif serum.', 'A light serum for under-eye puffiness and shadows.'),
      how: L('Sabah ve akşam, yüzük parmağıyla tapping yaparak.', 'Morning and night, tap in with your ring finger.') }),
    P({ id: 'scn-ce', brand: 'SkinCeuticals', name: 'C E Ferulic', cat: 'serum', area: 'skin', for: ['normal', 'dry', 'combo'], concerns: ['darkspots', 'dull', 'aging'], budget: '$$$', ff: true, ing: ['Vitamin C 15%', 'Vitamin E', 'Ferulic acid'],
      d: L('Işıltı ve leke görünümü için güçlü C vitamini serumu.', 'A potent vitamin C serum for radiance and dark spots.'),
      how: L('Sabah temizlikten sonra 4–5 damla, ardından SPF.', 'Mornings after cleansing, 4–5 drops, then SPF.') }),
    // Saç
    P({ id: 'mo-oil', brand: 'Moroccanoil', name: 'Treatment', cat: 'hairoil', area: 'hair', for: ['wavy', 'curly', 'straight'], concerns: ['frizz', 'dry'], budget: '$$', ff: false, ing: ['Argan oil'],
      d: L('Kabarmayı yatıştıran, parlaklık veren saç yağı.', 'A hair oil that tames frizz and adds shine.'),
      how: L('Nemli saçın orta ve uç kısmına 1–2 pompa.', '1–2 pumps through mid-lengths and ends of damp hair.') }),
    P({ id: 'olaplex3', brand: 'Olaplex', name: 'No.3 Hair Perfector', cat: 'hairmask', area: 'hair', for: ['wavy', 'curly', 'straight', 'thin'], concerns: ['damage', 'dry'], budget: '$$', ff: false, ing: ['Bis-aminopropyl diglycol dimaleate'],
      d: L('Yıpranmış ve boyalı saçlar için yıkama öncesi bakım.', 'A pre-shampoo treatment for damaged or coloured hair.'),
      how: L('Nemli saça uygula, en az 10 dk beklet, sonra yıka.', 'Apply to damp hair, leave 10+ minutes, then wash.') }),
    P({ id: 'vichy-dercos', brand: 'Vichy', name: 'Dercos Anti-Dandruff Shampoo', cat: 'shampoo', area: 'hair', for: ['straight', 'wavy', 'curly', 'short', 'thin'], concerns: ['dandruff'], budget: '$$', ff: false, ing: ['Selenium disulfide', 'Salicylic acid'],
      d: L('Kepek ve kaşıntı için hedefli şampuan.', 'A targeted shampoo for flakes and itch.'),
      how: L('Saç derisine masajla uygula, 1–2 dk beklet, durula. Haftada 2–3 kez.', 'Massage into scalp, leave 1–2 minutes, rinse. 2–3 times a week.') }),
    P({ id: 'vichy-energy', brand: 'Vichy', name: 'Dercos Energy+ Shampoo', cat: 'shampoo', area: 'hair', for: ['thin', 'short', 'straight', 'wavy'], concerns: ['thinning'], budget: '$$', ff: false, ing: ['Aminexil', 'Caffeine'],
      d: L('Güçsüz ve incelen saçlar için destekleyici şampuan.', 'A supporting shampoo for weak, thinning hair.'),
      how: L('Saç derisine masajla uygula, 1 dk beklet, durula.', 'Massage into scalp, leave 1 minute, rinse.') }),
    // Makyaj
    P({ id: 'mb-fitme', brand: 'Maybelline', name: 'Fit Me Matte + Poreless Foundation', cat: 'foundation', area: 'makeup', for: ['oily', 'combo', 'normal'], concerns: ['pores'], budget: '$', ff: false, ing: [],
      d: L('Geniş ton yelpazesi, doğal mat bitiş.', 'A wide shade range with a natural matte finish.'),
      how: L('Yarım pompa, yüzün ortasından dışa doğru nemli süngerle.', 'Half a pump, blended out from the centre with a damp sponge.') }),
    P({ id: 'lo-truematch', brand: 'L\'Oréal Paris', name: 'True Match Foundation', cat: 'foundation', area: 'makeup', for: ['dry', 'normal', 'combo'], concerns: ['dull'], budget: '$', ff: false, ing: ['Hyaluronic acid'],
      d: L('Alt tona göre ayrılmış tonlarla doğal saten bitiş.', 'Shades split by undertone, natural satin finish.'),
      how: L('Fırçayla ince katlar halinde, gerektiği yerde ikinci kat.', 'Thin layers with a brush; build only where needed.') }),
    P({ id: 'el-dw', brand: 'Estée Lauder', name: 'Double Wear Stay-in-Place Foundation', cat: 'foundation', area: 'makeup', for: ['oily', 'combo'], concerns: ['pores'], budget: '$$$', ff: false, ing: [],
      d: L('Uzun süre kalıcı, orta-yüksek kapatıcılık.', 'Long-wear, medium-to-full coverage.'),
      how: L('Çok az miktarla başla, hızlı kurur; bölge bölge çalış.', 'Start with very little; it sets fast, so work in sections.') }),
    P({ id: 'mb-eraser', brand: 'Maybelline', name: 'Instant Anti-Age Eraser Concealer', cat: 'concealer', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily'], concerns: ['darkcircles'], budget: '$', ff: false, ing: [],
      d: L('Göz altı için aydınlatıcı, sünger uçlu kapatıcı.', 'A brightening sponge-tip concealer for under-eyes.'),
      how: L('Göz altının iç köşesine nokta, parmakla tapping.', 'Dot at the inner under-eye, tap in with a finger.') }),
    P({ id: 'nars-rcc', brand: 'NARS', name: 'Radiant Creamy Concealer', cat: 'concealer', area: 'makeup', for: ['dry', 'normal', 'combo'], concerns: ['darkcircles', 'darkspots'], budget: '$$$', ff: false, ing: [],
      d: L('Kremsi, ışıltılı ve kapatıcı.', 'Creamy, radiant and buildable.'),
      how: L('Az miktarla, yalnızca gereken yerlere.', 'Use a little, only where you need it.') }),
    P({ id: 'rare-blush', brand: 'Rare Beauty', name: 'Soft Pinch Liquid Blush', cat: 'blush', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily', 'sensitive'], concerns: ['dull'], budget: '$$', ff: false, ing: [],
      d: L('Çok pigmentli, doğal görünümlü likit allık.', 'A highly pigmented liquid blush with a natural look.'),
      how: L('Elmacık kemiğine tek nokta yeter, hemen dağıt.', 'One dot per cheek is enough; blend right away.') }),
    P({ id: 'mb-skyhigh', brand: 'Maybelline', name: 'Lash Sensational Sky High', cat: 'mascara', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily', 'sensitive'], concerns: [], budget: '$', ff: false, ing: [],
      d: L('Esnek fırçalı, uzatıcı maskara.', 'A lengthening mascara with a flexible brush.'),
      how: L('Fırçayı dipte sağa sola oynat, uçlara doğru çek.', 'Wiggle at the root, then pull through to the tips.') }),
    P({ id: 'essence-lp', brand: 'essence', name: 'Lash Princess False Lash Mascara', cat: 'mascara', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily'], concerns: [], budget: '$', ff: false, ing: [],
      d: L('Uygun fiyatlı, hacim veren maskara.', 'An affordable volumizing mascara.'),
      how: L('İki kat, ilk kat kurumadan.', 'Two coats, the second before the first dries.') }),
    P({ id: 'abh-brow', brand: 'Anastasia Beverly Hills', name: 'Brow Wiz', cat: 'brow', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily', 'sensitive'], concerns: [], budget: '$$', ff: false, ing: [],
      d: L('İnce uçlu, kıl kıl çizim yapan kaş kalemi.', 'An ultra-fine brow pencil for hair-like strokes.'),
      how: L('Kısa, yukarı doğru vuruşlar; sonra fırçayla tara.', 'Short upward strokes, then brush through.') }),
    P({ id: 'nyx-epic', brand: 'NYX Professional Makeup', name: 'Epic Ink Liner', cat: 'liner', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily'], concerns: [], budget: '$', ff: false, ing: [],
      d: L('Fırça uçlu, yoğun siyah likit eyeliner.', 'A brush-tip liquid liner in deep black.'),
      how: L('Kirpik diplerine noktalar koy, sonra birleştir.', 'Dot along the lash line, then connect.') }),
    P({ id: 'nyx-butter', brand: 'NYX Professional Makeup', name: 'Butter Gloss', cat: 'lip', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily', 'sensitive'], concerns: [], budget: '$', ff: false, ing: [],
      d: L('Yapışmayan, yumuşak dokulu dudak parlatıcısı.', 'A soft, non-sticky lip gloss.'),
      how: L('Dudak ortasına sür, dudakları bastır.', 'Apply to the centre and press lips together.') }),
    P({ id: 'mac-rw', brand: 'MAC', name: 'Matte Lipstick Ruby Woo', cat: 'lip', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily'], concerns: [], budget: '$$', ff: false, ing: [],
      d: L('Mavi alt tonlu, klasik mat kırmızı.', 'A classic blue-based matte red.'),
      how: L('Önce dudak balmı, kurulayıp fırçayla kontur.', 'Balm first, blot, then line with a brush.') }),
    P({ id: 'elf-halo', brand: 'e.l.f.', name: 'Halo Glow Liquid Filter', cat: 'base', area: 'makeup', for: ['dry', 'normal', 'combo'], concerns: ['dull'], budget: '$', ff: false, ing: ['Hyaluronic acid', 'Squalane'],
      d: L('Tek başına ya da fondötenle karıştırılan ışıltı bazı.', 'A glow base worn alone or mixed with foundation.'),
      how: L('Elmacık ve burun kemerine ya da fondötenle karıştır.', 'On high points, or mixed into foundation.') }),
    P({ id: 'ct-setting', brand: 'Charlotte Tilbury', name: 'Airbrush Flawless Setting Spray', cat: 'setting', area: 'makeup', for: ['dry', 'normal', 'combo', 'oily'], concerns: [], budget: '$$$', ff: false, ing: [],
      d: L('Makyajı gün boyu sabitleyen sprey.', 'A spray that locks makeup in place all day.'),
      how: L('Yüzden 20 cm uzakta, X ve T şeklinde sık.', 'Hold 20 cm away, spray in an X and a T.') })
  ];

  const CATS = {
    cleanser: L('Temizleyici', 'Cleanser'), serum: L('Serum', 'Serum'), exfoliant: L('Peeling', 'Exfoliant'),
    spf: L('Güneş koruyucu', 'Sunscreen'), moisturizer: L('Nemlendirici', 'Moisturizer'), eye: L('Göz çevresi', 'Eye care'),
    hairoil: L('Saç yağı', 'Hair oil'), hairmask: L('Saç bakımı', 'Hair treatment'), shampoo: L('Şampuan', 'Shampoo'),
    foundation: L('Fondöten', 'Foundation'), concealer: L('Kapatıcı', 'Concealer'), blush: L('Allık', 'Blush'),
    mascara: L('Maskara', 'Mascara'), brow: L('Kaş', 'Brow'), liner: L('Eyeliner', 'Eyeliner'), lip: L('Dudak', 'Lip'),
    base: L('Baz', 'Base'), setting: L('Sabitleyici', 'Setting'), other: L('Diğer', 'Other')
  };
  const AREAS = { skin: L('Cilt', 'Skin'), hair: L('Saç', 'Hair'), makeup: L('Makyaj', 'Makeup'), body: L('Vücut', 'Body') };

  /* ---------- Glow-up serileri ---------- */
  const SKIN_LESSONS = [
    { t: L('Doğru temizlik', 'Cleansing right'), b: L('Günde iki kez, ılık suyla ve 30–60 saniye masajla temizle. Sıcak su ve sert köpükler bariyeri yorar; cilt gerilmemeli.', 'Cleanse twice a day with lukewarm water and a 30–60 second massage. Hot water and harsh foams wear down the barrier; skin should never feel tight.'),
      q: L('Temizlikten sonra cilt nasıl hissetmeli?', 'How should skin feel after cleansing?'), o: [L('Gergin ve gıcırdayan', 'Tight and squeaky'), L('Rahat ve yumuşak', 'Comfortable and soft')], a: 1 },
    { t: L('Nem kilidi', 'Locking in moisture'), b: L('Nemlendiriciyi cilt hâlâ hafif nemliyken sür. Yağlı cilt de nem ister; jel dokular ağırlık yapmaz.', 'Apply moisturizer while skin is still slightly damp. Oily skin needs moisture too; gel textures stay light.'),
      q: L('Yağlı cilt nemlendirici kullanmalı mı?', 'Should oily skin use moisturizer?'), o: [L('Evet, hafif bir jel', 'Yes, a light gel'), L('Hayır, gerek yok', 'No, it doesn\'t need it')], a: 0 },
    { t: L('Güneş koruyucu kuralı', 'The sunscreen rule'), b: L('Yüz ve boyun için yaklaşık iki parmak boyu SPF gerekir. Bulutlu havada da UVA geçer; dışarıdaysan 2–3 saatte bir yenile.', 'Face and neck need about two finger-lengths of SPF. UVA gets through clouds too; outdoors, reapply every 2–3 hours.'),
      q: L('Bulutlu günde SPF gerekli mi?', 'Do you need SPF on a cloudy day?'), o: [L('Evet', 'Yes'), L('Hayır', 'No')], a: 0 },
    { t: L('Niasinamid', 'Niacinamide'), b: L('Niasinamid yağ dengesine, gözenek görünümüne ve lekelere yardımcı olur. %5–10 arası yeterli; daha fazlası daha iyi değil.', 'Niacinamide helps with oil balance, the look of pores and dark spots. 5–10% is plenty; more isn\'t better.'),
      q: L('Niasinamid en çok neye yardım eder?', 'What does niacinamide help most with?'), o: [L('Yağ ve gözenek görünümü', 'Oil and the look of pores'), L('Saç uzaması', 'Hair growth')], a: 0 },
    { t: L('Peeling sıklığı', 'How often to exfoliate'), b: L('Asit peelingler (AHA/BHA) haftada 2–3 kez yeterli. Kızarıklık, yanma veya pullanma görürsen ara ver.', 'Acid exfoliants (AHA/BHA) are enough 2–3 times a week. Pause if you see redness, stinging or flaking.'),
      q: L('Peeling sonrası cilt yanıyorsa?', 'If skin stings after exfoliating?'), o: [L('Daha sık uygula', 'Use it more often'), L('Ara ver, bariyeri onar', 'Pause and repair the barrier')], a: 1 },
    { t: L('Retinole giriş', 'Starting retinol'), b: L('Retinol yalnızca akşam, haftada 2 geceyle başlar. Bezelye kadarı tüm yüze yeter; ertesi sabah SPF şart.', 'Retinol goes on at night only, starting 2 nights a week. A pea-sized amount covers the face; SPF the next morning is a must.'),
      q: L('Retinol ne zaman sürülür?', 'When do you apply retinol?'), o: [L('Sabah', 'Morning'), L('Akşam', 'Evening')], a: 1 },
    { t: L('Uyku ve su', 'Sleep and water'), b: L('Uykusuzluk göz altını ve donukluğu artırır. Yastık kılıfını haftada bir değiştirmek sivilceye karşı küçük ama etkili bir adım.', 'Poor sleep deepens under-eye shadows and dullness. Changing your pillowcase weekly is a small, effective step against breakouts.'),
      q: L('Yastık kılıfı ne sıklıkla değişmeli?', 'How often should you change your pillowcase?'), o: [L('Haftada bir', 'Weekly'), L('Ayda bir', 'Monthly')], a: 0 },
    { t: L('Göz çevresi', 'The eye area'), b: L('Göz çevresi ince ve hassastır. Ürünü yüzük parmağınla, ovmadan, tapping yaparak uygula.', 'The eye area is thin and delicate. Tap product in with your ring finger, never rub.'),
      q: L('Göz çevresine hangi parmakla?', 'Which finger for the eye area?'), o: [L('İşaret parmağı', 'Index finger'), L('Yüzük parmağı', 'Ring finger')], a: 1 },
    { t: L('Bariyer onarımı', 'Barrier repair'), b: L('Yanma, gerginlik ve ani kızarıklık bariyerin yorulduğunu gösterir. Birkaç gün yalnızca temizleyici, nemlendirici ve SPF kullan.', 'Stinging, tightness and sudden redness mean the barrier is tired. For a few days, use only cleanser, moisturizer and SPF.'),
      q: L('Bariyer yorulduysa ilk adım?', 'First step when the barrier is tired?'), o: [L('Rutini sadeleştir', 'Simplify the routine'), L('Yeni aktif ekle', 'Add a new active')], a: 0 },
    { t: L('Tutarlılık', 'Consistency'), b: L('Bir ürünün etkisini görmek 4–8 hafta sürer. Aynı anda tek yeni ürün dene ki neyin işe yaradığını bil.', 'It takes 4–8 weeks to see what a product does. Add one new product at a time so you know what works.'),
      q: L('Aynı anda kaç yeni ürün denemeli?', 'How many new products at once?'), o: [L('Bir', 'One'), L('Üç', 'Three')], a: 0 }
  ];
  const MAKEUP_LESSONS = [
    { t: L('Makyaj öncesi hazırlık', 'Prepping for makeup'), b: L('İyi makyaj iyi nemlendirilmiş ciltle başlar. Nemlendiriciyi 2–3 dakika emmeye bırak, sabahları SPF\'yi unutma.', 'Good makeup starts with moisturized skin. Let moisturizer sink in for 2–3 minutes, and don\'t skip SPF in the morning.'),
      q: L('Fondötenden önce ne gelir?', 'What comes before foundation?'), o: [L('Nemlendirici ve SPF', 'Moisturizer and SPF'), L('Pudra', 'Powder')], a: 0 },
    { t: L('Doğru fondöten tonu', 'The right foundation shade'), b: L('Tonu çene hattında, gün ışığında dene. Kaybolan ton doğru tondur; boyunla yüz arasında çizgi oluşmamalı.', 'Test shades on your jawline in daylight. The one that disappears is yours; there should be no line between face and neck.'),
      q: L('Fondöten nerede denenir?', 'Where should you test foundation?'), o: [L('Bilek', 'Wrist'), L('Çene hattı', 'Jawline')], a: 1 },
    { t: L('Kapatıcıda az çoktur', 'Less is more with concealer'), b: L('Kapatıcıyı yalnızca gerektiği yere, küçük noktalarla sür. Göz altında iç köşeye odaklanmak yorgun görünümü en çok azaltır.', 'Use concealer only where needed, in small dots. Focusing on the inner under-eye does the most to brighten a tired look.'),
      q: L('Göz altında nereye odaklanmalı?', 'Where to focus under the eyes?'), o: [L('İç köşe', 'Inner corner'), L('Tüm göz çevresi', 'The whole eye area')], a: 0 },
    { t: L('Allığın yeri', 'Where blush goes'), b: L('Gülümse, elmacık kemiğinin en yüksek noktasından şakağa doğru dağıt. Fazlası olursa üzerine fondöten süngeriyle bastır.', 'Smile, then blend from the top of your cheek toward the temple. Overdid it? Press a foundation sponge over it.'),
      q: L('Allık fazla olursa?', 'Too much blush?'), o: [L('Pudrayla kapat', 'Cover with powder'), L('Süngerle bastır', 'Press with a sponge')], a: 1 },
    { t: L('Kaş şekli', 'Brow shape'), b: L('Kaşı baştan doldurma; ortadan başla, başını yukarı doğru fırçala. Kıl gibi kısa vuruşlar en doğal sonucu verir.', 'Don\'t fill from the start; begin in the middle and brush the front up. Short, hair-like strokes look most natural.'),
      q: L('Kaş doldurmaya nereden başlanır?', 'Where to start filling brows?'), o: [L('Ortadan', 'The middle'), L('Baştan', 'The front')], a: 0 },
    { t: L('Maskara tekniği', 'Mascara technique'), b: L('Fırçayı kirpik dibinde sağa sola oynat, sonra uçlara çek. İkinci katı ilk kat kurumadan sür, topaklanmaz.', 'Wiggle the wand at the root, then pull to the tips. Add the second coat before the first dries to avoid clumps.'),
      q: L('İkinci kat ne zaman?', 'When to add a second coat?'), o: [L('İlk kat kurumadan', 'Before the first dries'), L('Tamamen kuruyunca', 'Once fully dry')], a: 0 },
    { t: L('Eyeliner\'a başlangıç', 'Eyeliner basics'), b: L('Tek hamlede çizmeye çalışma. Kirpik diplerine noktalar koy ve birleştir; kuyruk için alt kirpik çizgisinin devamını hayal et.', 'Don\'t try one stroke. Dot along the lash line and connect; for the wing, follow the line of your lower lashes.'),
      q: L('Eyeliner için en kolay yöntem?', 'Easiest eyeliner method?'), o: [L('Tek hamle', 'One stroke'), L('Noktaları birleştir', 'Connect the dots')], a: 1 },
    { t: L('Dudak dengesi', 'Balancing the lips'), b: L('Göz makyajı yoğunsa dudak sade, dudak cesursa göz sade kalsın. Ruj öncesi balm sür ve kurula, daha uzun kalır.', 'Bold eyes, soft lips, or the other way round. Balm before lipstick, then blot, and it lasts longer.'),
      q: L('Kırmızı ruj sürdüğünde göz?', 'Wearing red lipstick, the eyes should be?'), o: [L('Sade', 'Soft'), L('Yoğun smokey', 'Heavy smokey')], a: 0 },
    { t: L('Sabitleme', 'Setting'), b: L('Pudrayı yalnızca T bölgesine ve göz altına sür. Sabitleyici sprey makyajı eritir ve gün boyu kalmasını sağlar.', 'Powder only the T-zone and under-eyes. Setting spray melts layers together and helps everything last.'),
      q: L('Pudra nereye?', 'Where does powder go?'), o: [L('Tüm yüze kalın', 'Thick all over'), L('T bölgesi ve göz altı', 'T-zone and under-eyes')], a: 1 },
    { t: L('10 dakikalık rutin', 'The 10-minute routine'), b: L('Ten, kapatıcı, allık, kaş, maskara, dudak. Bu sırayla gidersen 10 dakikada bitmiş, dengeli bir görünüm elde edersin.', 'Base, concealer, blush, brows, mascara, lips. In this order, you get a finished, balanced look in 10 minutes.'),
      q: L('Rutinde maskara hangi adımdan sonra?', 'Mascara comes after which step?'), o: [L('Kaş', 'Brows'), L('Dudak', 'Lips')], a: 0 }
  ];
  const GROOM_LESSONS = [
    { t: L('Şampuan sıklığı', 'How often to shampoo'), b: L('Çoğu saç için gün aşırı yıkama yeterli. Saç derisi çabuk yağlanıyorsa her gün, nazik bir şampuanla yıkayabilirsin.', 'Every other day is enough for most hair. If your scalp gets oily fast, wash daily with a gentle shampoo.'),
      q: L('Şampuan nereye odaklanmalı?', 'Where should shampoo focus?'), o: [L('Saç derisi', 'The scalp'), L('Saç uçları', 'The ends')], a: 0 },
    { t: L('Saç derisi masajı', 'Scalp massage'), b: L('Şampuan sırasında parmak uçlarıyla 1 dakika dairesel masaj yap. Tırnak kullanma; tahriş eder.', 'While shampooing, massage in small circles with your fingertips for a minute. No nails; they irritate.'),
      q: L('Masajda ne kullanılır?', 'What do you massage with?'), o: [L('Tırnaklar', 'Nails'), L('Parmak uçları', 'Fingertips')], a: 1 },
    { t: L('Kepekle başa çıkma', 'Dealing with dandruff'), b: L('Kepek şampuanını saç derisinde 1–2 dakika beklet, haftada 2–3 kez kullan. Diğer günler nazik şampuan yeterli.', 'Leave dandruff shampoo on the scalp for 1–2 minutes, 2–3 times a week. A gentle shampoo is enough on other days.'),
      q: L('Kepek şampuanı ne kadar beklemeli?', 'How long should dandruff shampoo sit?'), o: [L('Hemen durula', 'Rinse right away'), L('1–2 dakika', '1–2 minutes')], a: 1 },
    { t: L('Dökülme belirtileri', 'Signs of thinning'), b: L('Günde 50–100 tel dökülmesi normal. Tepe ve alın hattında belirgin açılma varsa erken dönemde bir dermatoloğa görünmek en etkili adımdır.', 'Losing 50–100 hairs a day is normal. If the crown or hairline is clearly thinning, seeing a dermatologist early is the most effective step.'),
      q: L('Günde kaç tel dökülme normal?', 'How many hairs a day is normal to lose?'), o: [L('50–100', '50–100'), L('5–10', '5–10')], a: 0 },
    { t: L('Isı koruma', 'Heat protection'), b: L('Fön, düzleştirici veya maşa kullanmadan önce ısı koruyucu sür. Isıyı orta seviyede tut; çok sıcak cihaz saçı kırar.', 'Use a heat protectant before blow-drying, straightening or curling. Keep the heat medium; very hot tools break hair.'),
      q: L('Isı koruyucu ne zaman sürülür?', 'When do you apply heat protectant?'), o: [L('Isıdan önce', 'Before heat'), L('Isıdan sonra', 'After heat')], a: 0 },
    { t: L('Doğru kurulama', 'Drying gently'), b: L('Saçı havluyla ovma; mikrofiber havlu veya pamuklu tişörtle bastırarak kurula. Islak saç en kırılgan halindedir, geniş dişli tarak kullan.', 'Don\'t rub with a towel; press with microfibre or a cotton T-shirt. Wet hair is at its most fragile, so use a wide-tooth comb.'),
      q: L('Islak saç için hangisi?', 'Which is best for wet hair?'), o: [L('Geniş dişli tarak', 'Wide-tooth comb'), L('Sık dişli fırça', 'Fine brush')], a: 0 },
    { t: L('Saç kremi nereye?', 'Where conditioner goes'), b: L('Saç kremini uçlara ve orta kısma sür, saç derisine değil. 2–3 dakika beklet, ılık suyla durula.', 'Apply conditioner to mid-lengths and ends, not the scalp. Leave 2–3 minutes and rinse with lukewarm water.'),
      q: L('Saç kremi nereye sürülür?', 'Where does conditioner go?'), o: [L('Saç derisine', 'The scalp'), L('Uçlara ve orta kısma', 'Ends and mid-lengths')], a: 1 },
    { t: L('Haftalık maske', 'A weekly mask'), b: L('Haftada bir besleyici maske, kuru ve yıpranmış saçta parlaklığı geri getirir. Uçlara odaklan, 5–10 dakika beklet.', 'A nourishing mask once a week brings shine back to dry, damaged hair. Focus on the ends and leave it 5–10 minutes.'),
      q: L('Maske ne sıklıkla?', 'How often for a mask?'), o: [L('Haftada bir', 'Once a week'), L('Her gün', 'Every day')], a: 0 },
    { t: L('Saten yastık kılıfı', 'Satin pillowcase'), b: L('Saten veya ipek yastık kılıfı sürtünmeyi azaltır; sabah daha az kabarma ve kırık uç görürsün.', 'A satin or silk pillowcase cuts friction; you\'ll wake up with less frizz and fewer split ends.'),
      q: L('Saten kılıf neyi azaltır?', 'What does satin reduce?'), o: [L('Sürtünme ve kabarma', 'Friction and frizz'), L('Saç uzamasını', 'Hair growth')], a: 0 }
  ];

  const SERIES = {
    makeup: [
      { id: 'mk30', t: L('30 Günlük Makyaj Glow-Up', '30-Day Makeup Glow-Up'), d: L('Her gün bir ders, sabah hazırlık ve akşam temizlik.', 'One lesson a day, plus morning prep and night cleanse.'), lessons: MAKEUP_LESSONS },
      { id: 'sk30', t: L('Cilt Işıltısı', 'Skin Radiance'), d: L('Sağlıklı, ışıltılı bir ten için 30 gün.', '30 days to healthy, glowing skin.'), lessons: SKIN_LESSONS }
    ],
    care: [
      { id: 'rs30', t: L('30 Gün Cilt Reset', '30-Day Skin Reset'), d: L('Temiz, dengeli ve sağlıklı bir cilt için 30 gün.', '30 days to clean, balanced, healthy skin.'), lessons: SKIN_LESSONS },
      { id: 'gr30', t: L('Saç Bakımı', 'Hair Care'), d: L('Sağlıklı, güçlü saç için 30 gün.', '30 days to healthy, strong hair.'), lessons: GROOM_LESSONS }
    ]
  };

  window.ADORN_DATA = { L, OPTIONS, TOPICS, PRODUCTS, CATS, AREAS, SERIES };
})();
