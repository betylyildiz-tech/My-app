/* Adorn — yerel (çevrimdışı) asistan beyni: niyet tanıma, öneriler, ürün analizi, rutin */
(function () {
  const { L, PRODUCTS, CATS } = window.ADORN_DATA;

  /* Türkçe karakterleri sadeleştir, küçük harfe çevir */
  function norm(s) {
    return (' ' + String(s || '').toLocaleLowerCase('tr-TR')
      .replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıIİ]/g, 'i')
      .replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u')
      .replace(/[âà]/g, 'a').replace(/[îì]/g, 'i').replace(/[ûù]/g, 'u')
      .replace(/[’'`´]/g, '').replace(/[^a-z0-9%+\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' ');
  }
  /* Anahtar kelime: kelime başında eşleşir (Türkçe ekleri yakalar). Sonunda boşluk varsa tam kelime. */
  function hit(text, kw) { return text.includes(' ' + kw); }

  /* ---------- Uygunluk puanı ---------- */
  function fitScore(p, prof = {}) {
    let s = 72; const why = [], warn = [];
    const st = prof.skinType;
    if ((p.area === 'skin' || p.area === 'makeup') && st) {
      if (p.for.includes(st)) { s += 10; why.push(L('Cilt tipine uygun', 'Suits your skin type')); }
      else { s -= 10; warn.push(L('Cilt tipin için ilk tercih değil', 'Not the first pick for your skin type')); }
    }
    if (p.area === 'hair' && prof.hairType && p.for.includes(prof.hairType)) { s += 6; why.push(L('Saç tipine uygun', 'Suits your hair type')); }
    const cs = (prof.concerns || []).filter(c => p.concerns.includes(c));
    if (cs.length) { s += Math.min(2, cs.length) * 7; why.push(L('Odak noktalarını hedefliyor', 'Targets your focus areas')); }
    if (prof.scalp && p.concerns.includes(prof.scalp)) { s += 12; why.push(L('Saç derisi ihtiyacına yönelik', 'Made for your scalp need')); }
    if (st === 'sensitive' && !p.ff) { s -= 12; warn.push(L('Parfüm içerebilir; önce küçük bir alanda dene', 'May contain fragrance; patch test first')); }
    const notes = norm(prof.notes || '');
    if (!p.ff && (hit(notes, 'parfum') || hit(notes, 'fragrance') || hit(notes, 'koku'))) { s -= 10; warn.push(L('Notlarında parfümden kaçındığını yazdın', 'Your notes say you avoid fragrance')); }
    if (prof.budget) {
      const d = p.budget.length - prof.budget.length;
      if (d > 0) { s -= 8 * d; warn.push(L('Bütçenin üzerinde', 'Above your budget')); }
      else { s += 4; why.push(L('Bütçene uygun', 'Within your budget')); }
    }
    if (p.ff) why.push(L('Parfümsüz', 'Fragrance-free'));
    return { score: Math.max(35, Math.min(97, Math.round(s))), why, warn };
  }

  function allowed(p, mode) { return mode === 'makeup' || p.area !== 'makeup'; }

  function pick(prof, mode, { cats, areas, concerns } = {}, n = 3) {
    return PRODUCTS
      .filter(p => allowed(p, mode))
      .filter(p => !cats || cats.includes(p.cat))
      .filter(p => !areas || areas.includes(p.area))
      .map(p => {
        let sc = fitScore(p, prof).score;
        if (concerns && concerns.some(c => p.concerns.includes(c))) sc += 15;
        return { p, sc };
      })
      .sort((a, b) => b.sc - a.sc)
      .slice(0, n).map(x => x.p.id);
  }

  /* ---------- Ürün analizi ---------- */
  const CAT_KEYS = [
    ['spf', ['spf', 'gunes', 'sunscreen', 'sun ', 'uv ', 'anthelios', 'photoderm']],
    ['cleanser', ['cleanser', 'temizle', 'yuz yikama', 'face wash', 'foaming', 'jel ', 'gel cleanser', 'micellar', 'misel']],
    ['exfoliant', ['peeling', 'exfoli', 'bha', 'aha', 'tonik', 'toner', 'glycolic', 'glikolik']],
    ['serum', ['serum', 'ampul', 'essence', 'niacinamide', 'niasinamid', 'retinol', 'vitamin c', 'c vitamini']],
    ['eye', ['eye cream', 'goz kremi', 'goz cevre', 'eye ']],
    ['moisturizer', ['krem', 'cream', 'nemlendir', 'moistur', 'lotion', 'losyon', 'balm', 'gel cream']],
    ['shampoo', ['sampuan', 'shampoo']],
    ['hairoil', ['sac yag', 'hair oil', 'argan', 'serum sac']],
    ['hairmask', ['sac maske', 'hair mask', 'kremi sac', 'conditioner', 'sac kremi', 'olaplex']],
    ['foundation', ['fondoten', 'foundation', 'bb ', 'cc ', 'skin tint']],
    ['concealer', ['kapatici', 'concealer']],
    ['mascara', ['maskara', 'mascara']],
    ['lip', ['ruj', 'lipstick', 'gloss', 'lip ', 'dudak']],
    ['blush', ['allik', 'blush', 'bronzer', 'highlighter']],
    ['liner', ['eyeliner', 'liner', 'kalem']],
    ['brow', ['kas ', 'brow']]
  ];
  const CAT_AREA = { spf: 'skin', cleanser: 'skin', exfoliant: 'skin', serum: 'skin', eye: 'skin', moisturizer: 'skin', shampoo: 'hair', hairoil: 'hair', hairmask: 'hair', foundation: 'makeup', concealer: 'makeup', mascara: 'makeup', lip: 'makeup', blush: 'makeup', liner: 'makeup', brow: 'makeup', other: 'skin' };
  const CAT_HOW = {
    spf: L('Sabah son adım olarak iki parmak boyu sür; dışarıdaysan 2–3 saatte bir yenile.', 'Last morning step, two finger-lengths; reapply every 2–3 hours outdoors.'),
    cleanser: L('Nemli cilde 30–60 saniye masaj yap, ılık suyla durula.', 'Massage onto damp skin for 30–60 seconds, rinse with lukewarm water.'),
    exfoliant: L('Akşam, temizlikten sonra; haftada 2–3 kez ile başla.', 'Evenings after cleansing; start 2–3 times a week.'),
    serum: L('Temizlikten sonra, nemlendiriciden önce birkaç damla.', 'A few drops after cleansing, before moisturizer.'),
    eye: L('Yüzük parmağınla, göz çevresine tapping yaparak.', 'Tap around the eye with your ring finger.'),
    moisturizer: L('Serumdan sonra, cilt hafif nemliyken.', 'After serum, while skin is slightly damp.'),
    shampoo: L('Saç derisine masajla uygula, 1 dk beklet, iyice durula.', 'Massage into the scalp, leave a minute, rinse well.'),
    hairoil: L('Nemli saçın orta ve uç kısımlarına az miktarda.', 'A little on mid-lengths and ends of damp hair.'),
    hairmask: L('Yıkadıktan sonra uçlara, 3–5 dk beklet.', 'After washing, on the ends; leave 3–5 minutes.'),
    foundation: L('Az miktarla yüzün ortasından dışa doğru dağıt.', 'A little, blended out from the centre of the face.'),
    concealer: L('Sadece gereken noktalara, tapping ile.', 'Only where needed, tapped in.'),
    mascara: L('Dipte sağa sola oynat, uçlara doğru çek.', 'Wiggle at the root, pull to the tips.'),
    lip: L('Önce balm, sonra ürün; kenarlar için fırça.', 'Balm first, then product; use a brush for edges.'),
    blush: L('Elmacık kemiğinden şakağa doğru dağıt.', 'Blend from the cheekbone toward the temple.'),
    liner: L('Kirpik diplerine noktalar koy ve birleştir.', 'Dot along the lash line and connect.'),
    brow: L('Ortadan başla, kısa yukarı vuruşlar.', 'Start in the middle with short upward strokes.'),
    other: L('Ambalajdaki talimata göre, önce küçük bir alanda dene.', 'Follow the pack directions and patch test first.')
  };
  const ING_KEYS = [
    ['retinol', L('Retinol', 'Retinol'), L('Retinol içeriyor: yalnızca akşam kullan, ertesi gün SPF şart.', 'Contains retinol: evenings only, SPF the next day.')],
    ['salicylic', L('Salisilik asit (BHA)', 'Salicylic acid (BHA)'), L('Asit içeriyor: diğer peelinglerle aynı gece kullanma.', 'Contains acid: don\'t layer with other exfoliants the same night.')],
    ['bha', L('BHA', 'BHA'), null], ['glycolic', L('Glikolik asit (AHA)', 'Glycolic acid (AHA)'), L('AHA güneş hassasiyetini artırır; SPF kullan.', 'AHAs increase sun sensitivity; wear SPF.')],
    ['niacinamide', L('Niasinamid', 'Niacinamide'), null], ['niasinamid', L('Niasinamid', 'Niacinamide'), null],
    ['hyaluronic', L('Hyaluronik asit', 'Hyaluronic acid'), null], ['vitamin c', L('C vitamini', 'Vitamin C'), null],
    ['ceramide', L('Seramid', 'Ceramides'), null], ['seramid', L('Seramid', 'Ceramides'), null],
    ['alcohol', L('Alkol', 'Alcohol'), L('Alkol içeriyor olabilir; kuru ve hassas ciltte kurutabilir.', 'May contain alcohol; can dry out dry or sensitive skin.')],
    ['parfum', L('Parfüm', 'Fragrance'), L('Parfüm içeriyor; hassas ciltte önce küçük bir alanda dene.', 'Contains fragrance; patch test if sensitive.')],
    ['fragrance', L('Parfüm', 'Fragrance'), L('Parfüm içeriyor; hassas ciltte önce küçük bir alanda dene.', 'Contains fragrance; patch test if sensitive.')]
  ];

  function findProduct(q) {
    const n = norm(q);
    let best = null, bestScore = 0;
    for (const p of PRODUCTS) {
      const bc = norm(p.brand).replace(/ /g, '');
      const nw = norm(p.name).trim().split(' ').filter(w => w.length > 2);
      const brandOk = bc.length > 2 && n.replace(/ /g, '').includes(bc);
      const nm = nw.filter(w => n.includes(' ' + w)).length;
      const solo = brandOk && PRODUCTS.filter(x => x.brand === p.brand).length === 1;
      if (!((brandOk && nm >= 1) || nm >= 2 || solo)) continue;
      const sc = (brandOk ? 1 : 0) + nm / nw.length * 1.5 + nm * 0.2;
      if (sc > bestScore) { bestScore = sc; best = p; }
    }
    return best;
  }

  function guessCat(q) {
    const n = norm(q);
    for (const [cat, keys] of CAT_KEYS) if (keys.some(k => hit(n, k))) return cat;
    return 'other';
  }

  function analyzeProduct(query, prof, mode) {
    const known = typeof query === 'object' ? query : findProduct(query);
    if (known) {
      const f = fitScore(known, prof);
      const warn = [...f.warn];
      known.ing.forEach(i => { const k = ING_KEYS.find(x => norm(i).includes(' ' + x[0])); if (k && k[2]) warn.push(k[2]); });
      return { known: true, product: known, score: f.score, why: f.why, warn, how: known.how, ing: known.ing, desc: known.d };
    }
    const cat = guessCat(query);
    const area = CAT_AREA[cat];
    const n = norm(query);
    const ing = [], warn = [];
    ING_KEYS.forEach(([k, label, w]) => { if (hit(n, k)) { if (!ing.some(x => tx(x) === tx(label))) ing.push(label); if (w) warn.push(w); } });
    const fake = { area, for: prof.skinType ? [prof.skinType] : [], concerns: [], budget: prof.budget || '$$', ff: !ing.some(i => tx(i) === tx(L('Parfüm', 'Fragrance'))) };
    const f = fitScore(fake, {});
    if (mode === 'care' && area === 'makeup') warn.push(L('Bu bir makyaj ürünü gibi görünüyor; makyaj içeriği kapalı.', 'This looks like a makeup product; makeup content is off.'));
    if (prof.skinType === 'sensitive') warn.push(L('Hassas cildin var; ilk kullanımda kulak arkasında test et.', 'You have sensitive skin; patch test behind the ear first.'));
    const name = String(query).trim().replace(/\s+/g, ' ').slice(0, 80);
    return {
      known: false,
      product: { id: 'u-' + norm(name).trim().replace(/\s/g, '-').slice(0, 40), brand: '', name, cat, area, for: [], concerns: [], budget: '', ff: fake.ff, ing: ing.map(tx) },
      score: Math.min(80, f.score), why: [L('Kategoriye göre genel değerlendirme', 'General review by category')], warn,
      how: CAT_HOW[cat], ing: ing.map(tx), desc: null
    };
  }

  /* ---------- Rutin ---------- */
  function buildRoutine(prof = {}, mode) {
    const st = prof.skinType, cs = prof.concerns || [];
    const am = [], pm = [];
    const cleanser = st === 'oily' || st === 'combo'
      ? L('Jel temizleyiciyle yüzünü yıka', 'Wash with a gel cleanser')
      : L('Nazik, köpürmeyen temizleyici', 'Gentle, non-foaming cleanser');
    am.push({ id: 'cl', t: cleanser, m: 1 });
    if (cs.includes('darkspots') || cs.includes('dull')) am.push({ id: 'vc', t: L('C vitamini serumu', 'Vitamin C serum'), m: 1 });
    else if (cs.includes('pores') || cs.includes('acne') || st === 'oily') am.push({ id: 'nia', t: L('Niasinamid serumu', 'Niacinamide serum'), m: 1 });
    if (cs.includes('darkcircles')) am.push({ id: 'eye', t: L('Göz çevresine kafein serumu', 'Caffeine serum under eyes'), m: 1 });
    am.push({ id: 'moist', t: st === 'oily' ? L('Hafif jel nemlendirici', 'Light gel moisturizer') : L('Nemlendirici', 'Moisturizer'), m: 1 });
    am.push({ id: 'spf', t: L('Güneş koruyucu SPF 50', 'SPF 50 sunscreen'), m: 1 });
    if (mode === 'makeup') am.push({ id: 'mk', t: L('Hafif makyaj (isteğe bağlı)', 'Light makeup (optional)'), m: 8 });
    if (mode === 'makeup') pm.push({ id: 'rm', t: L('Makyajı temizleme yağı veya misel suyla çıkar', 'Remove makeup with cleansing oil or micellar water'), m: 2 });
    pm.push({ id: 'cl2', t: L('Yüzünü yıka', 'Cleanse your face'), m: 1 });
    if (cs.includes('aging')) pm.push({ id: 'ret', t: L('Retinol (haftada 2–3 gece)', 'Retinol (2–3 nights a week)'), m: 1 });
    else if (cs.includes('acne') || cs.includes('pores')) pm.push({ id: 'bha', t: L('BHA peeling (haftada 2–3 gece)', 'BHA exfoliant (2–3 nights a week)'), m: 1 });
    else pm.push({ id: 'ha', t: L('Nem serumu', 'Hydrating serum'), m: 1 });
    pm.push({ id: 'moist2', t: st === 'dry' || st === 'sensitive' ? L('Zengin, onarıcı krem', 'Rich, repairing cream') : L('Nemlendirici', 'Moisturizer'), m: 1 });
    pm.push({ id: 'lip', t: L('Dudak balmı', 'Lip balm'), m: 1 });
    return { am, pm };
  }

  /* ---------- Sohbet niyetleri ---------- */
  const nm = (c) => c.name ? (c.lang === 'tr' ? ', ' + c.name : ', ' + c.name) : '';
  const skinWord = (c) => {
    const o = window.ADORN_DATA.OPTIONS.skinType.find(x => x.id === c.prof.skinType);
    return o ? tx(o.l).toLocaleLowerCase(c.lang === 'tr' ? 'tr-TR' : 'en') : null;
  };

  const INTENTS = [
    { id: 'medical', area: 'general', w: 2, keys: ['egzama', 'eczema', 'sedef', 'psoriasis', 'rozasea', 'rosacea', 'enfeksiyon', 'infection', 'iltihap', 'kistik', 'cystic', 'mantar', 'fungal', 'alerjik reaksiyon', 'allergic reaction', 'yara ', 'wound', 'kanama', 'bleeding', 'isotretinoin', 'roaccutane', 'ilac', 'medication'],
      r: (c) => ({ text: tx(L(
        'Bu, bir dermatoloğun değerlendirmesi gereken bir durum olabilir. Ben tanı koyamam ama bu arada cildini yormamak için şunlar güvenli:\n• Rutini sadeleştir: nazik temizleyici, parfümsüz nemlendirici, SPF\n• Peeling, retinol ve yeni ürünlere ara ver\n• Bölgeyi kaşıma veya sıkma\nŞiddetli kızarıklık, şişlik, ateş ya da yayılan döküntü varsa vakit kaybetmeden bir hekime başvur.',
        'This may need a dermatologist\'s look. I can\'t diagnose, but these are safe meanwhile:\n• Simplify: gentle cleanser, fragrance-free moisturizer, SPF\n• Pause exfoliants, retinol and new products\n• Don\'t pick or scratch\nIf there\'s severe redness, swelling, fever or a spreading rash, see a doctor promptly.')),
        products: pick(c.prof, c.mode, { cats: ['cleanser', 'moisturizer'], concerns: ['redness'] }, 2) }) },
    { id: 'greet', area: 'general', keys: ['merhaba', 'selam', 'slm', 'hey ', 'hi ', 'hello', 'gunaydin', 'iyi aksamlar', 'iyi gunler', 'naber', 'nasilsin', 'how are you'],
      r: (c) => ({ text: tx(L(`Merhaba${nm(c)}! Bugün nasıl yardımcı olayım? Bir rutin kurabilir, ürün önerebilir ya da bir ürünü senin için yorumlayabilirim.`, `Hi${nm(c)}! How can I help today? I can build a routine, suggest products or review a product for you.`)),
        chips: c.mode === 'makeup' ? [L('Sabah rutini', 'Morning routine'), L('Günlük makyaj', 'Everyday makeup'), L('Ne almalıyım?', 'What should I buy?')] : [L('Sabah rutini', 'Morning routine'), L('Kabaran saçlar', 'Frizzy hair'), L('Ne almalıyım?', 'What should I buy?')] }) },
    { id: 'thanks', area: 'general', keys: ['tesekkur', 'sagol', 'sag ol', 'eyvallah', 'thanks', 'thank', 'super', 'harika', 'cok iyi', 'great'],
      r: (c) => ({ text: tx(L('Rica ederim! Aklına başka bir şey gelirse buradayım. Bugünkü serini tamamlamayı da unutma.', 'You\'re welcome! I\'m here if anything else comes up. Don\'t forget today\'s streak.')) }) },
    { id: 'who', area: 'general', keys: ['kimsin', 'sen kim', 'neler yapabilir', 'ne yapabilir', 'who are you', 'what can you', 'help me', 'yardim et'],
      r: (c) => ({ text: tx(L(
        `Ben Adorn, kişisel bakım asistanın. Neler yapabilirim:\n• Cildine ve saçına göre sabah/akşam rutini kurarım\n• Bir ürünü tarayıp sana uygun olup olmadığını söylerim\n• Profiline göre ürün öneririm${c.mode === 'makeup' ? '\n• Makyaj tekniklerini adım adım anlatırım' : '\n• Saç ve saç derisi bakımı için pratik öneriler veririm'}\n• Glow-up serinle her gün küçük adımlar attırırım`,
        `I'm Adorn, your personal care assistant. I can:\n• Build morning/evening routines for your skin and hair\n• Scan a product and tell you if it suits you\n• Suggest products for your profile${c.mode === 'makeup' ? '\n• Walk you through makeup techniques' : '\n• Give practical hair and scalp care tips'}\n• Keep you going with a daily glow-up streak`)) }) },
    { id: 'am', area: 'skin', keys: ['sabah', 'morning', 'rutin', 'routine', 'bakim rutin', 'cilt bakim', 'skincare', 'skin care', 'gunluk bakim', 'bakim yap', 'nereden basla', 'where do i start'],
      r: (c) => {
        const r = buildRoutine(c.prof, c.mode); const sw = skinWord(c);
        return { text: tx(L(
          `İşte sana ${sw ? sw + ' cilt için ' : ''}sade bir sabah rutini, yaklaşık ${r.am.reduce((a, b) => a + b.m, 0)} dakika. Sırası önemli: inceden kalına doğru.${sw ? '' : ' Profilde cilt tipini seçersen adımları daha da kişiselleştiririm.'}`,
          `Here's a simple morning routine${sw ? ' for ' + sw + ' skin' : ''}, about ${r.am.reduce((a, b) => a + b.m, 0)} minutes. Order matters: thinnest to thickest.${sw ? '' : ' Pick your skin type in Profile and I\'ll tailor it further.'}`)),
          steps: { title: L('Sabah rutini', 'Morning routine'), items: r.am.map(s => s.t), routine: 'am' },
          products: pick(c.prof, c.mode, { cats: ['cleanser', 'spf', 'moisturizer'] }, 3),
          chips: [L('Akşam rutini', 'Evening routine'), L('Hangi SPF?', 'Which SPF?')] };
      } },
    { id: 'pm', area: 'skin', keys: ['aksam rutin', 'gece rutin', 'aksam bakim', 'gece bakim', 'aksam', 'gece', 'night', 'evening routine', 'night routine', 'yatmadan', 'before bed', 'pm routine'],
      r: (c) => {
        const r = buildRoutine(c.prof, c.mode);
        return { text: tx(L('Akşam rutini cildin onarıldığı zaman. Aktif içerikleri (retinol, asit) burada kullanırız; sabah mutlaka SPF ile dengeleriz.', 'Evenings are repair time. This is where actives (retinol, acids) go; balance them with SPF in the morning.')),
          steps: { title: L('Akşam rutini', 'Evening routine'), items: r.pm.map(s => s.t), routine: 'pm' },
          products: pick(c.prof, c.mode, { cats: ['serum', 'exfoliant', 'moisturizer'] }, 3),
          chips: [L('Retinol nasıl kullanılır?', 'How to use retinol?'), L('Sabah rutini', 'Morning routine')] };
      } },
    { id: 'acne', area: 'skin', keys: ['sivilce', 'akne', 'acne', 'pimple', 'breakout', 'siyah nokta', 'blackhead', 'gozenek', 'pore', 'komedon', 'beyaz nokta', 'whitehead'],
      r: (c) => ({ text: tx(L(
        'Sivilce ve tıkalı gözenekler için en etkili yol sade ve düzenli bir rutin:\n• Sabah-akşam jel temizleyici\n• Akşam haftada 2–3 kez **salisilik asit (BHA)**: gözeneğin içini temizler\n• **Niasinamid** yağ dengesine ve iz görünümüne yardımcı olur\n• Hafif, gözenek tıkamayan nemlendirici ve her sabah SPF\nSıkmamaya çalış; iz bırakır. 6–8 haftada düzelme yoksa ya da sivilceler derin ve ağrılıysa bir dermatoloğa görün.',
        'For breakouts and clogged pores, a simple, steady routine works best:\n• Gel cleanser morning and night\n• **Salicylic acid (BHA)** 2–3 evenings a week to clear inside the pore\n• **Niacinamide** helps with oil and the look of marks\n• A light, non-clogging moisturizer and SPF every morning\nTry not to squeeze; it leaves marks. If there\'s no change in 6–8 weeks, or spots are deep and painful, see a dermatologist.')),
        products: pick(c.prof, c.mode, { cats: ['exfoliant', 'serum', 'cleanser'], concerns: ['acne', 'pores'] }, 3),
        chips: [L('Sivilce izleri', 'Acne marks'), L('Akşam rutini', 'Evening routine')] }) },
    { id: 'oily', area: 'skin', keys: ['yagli cilt', 'yaglaniyor', 'yaglanma', 'parlama', 'parliyor', 'oily skin', 'oily ', 'shine', 'shiny', 'greasy skin'],
      r: (c) => ({ text: tx(L(
        'Yağlı cilt genelde susuz cilttir: çok sert temizlersen daha çok yağ üretir.\n• Günde iki kez nazik jel temizleyici, fazlası değil\n• Hafif jel nemlendiriciyi atlama\n• Niasinamid yağ dengesine yardımcı olur\n• Gün içinde parlama için kurulama kâğıdı, pudra değil',
        'Oily skin is often dehydrated skin: stripping it makes it produce more oil.\n• Gentle gel cleanser twice a day, no more\n• Don\'t skip a light gel moisturizer\n• Niacinamide helps balance oil\n• Use blotting papers for midday shine, not more powder')),
        products: pick(c.prof, c.mode, { cats: ['cleanser', 'serum', 'moisturizer'], concerns: ['pores'] }, 3) }) },
    { id: 'dry', area: 'skin', keys: ['kuru cilt', 'kuruluk', 'kuru ', 'kuruyor', 'dry skin', 'dry ', 'pullan', 'flaky', 'gerginlik', 'geriliyor', 'tight'],
      r: (c) => ({ text: tx(L(
        'Kuru cilt için hedef: nemi eklemek ve kilitlemek.\n• Köpürmeyen, kremsi temizleyici; sıcak su yerine ılık\n• Nemli cilde hyaluronik asit serumu\n• Seramidli, zengin bir krem ile kilitle\n• Kışın yatak odasında nemlendirici cihaz büyük fark yaratır',
        'For dry skin, the goal is to add moisture and lock it in.\n• A creamy, non-foaming cleanser; lukewarm, not hot water\n• Hyaluronic acid serum on damp skin\n• Seal with a rich ceramide cream\n• In winter, a bedroom humidifier makes a real difference')),
        products: pick(c.prof, c.mode, { cats: ['cleanser', 'serum', 'moisturizer'], concerns: ['dryness'] }, 3) }) },
    { id: 'sensitive', area: 'skin', keys: ['hassas', 'kizariklik', 'kizar', 'tahris', 'yaniyor', 'yanma', 'batma', 'sensitive', 'redness', 'irritat', 'sting'],
      r: (c) => ({ text: tx(L(
        'Hassas ve kızaran ciltte daha az ürün daha iyidir.\n• Birkaç gün yalnızca: nazik temizleyici, parfümsüz nemlendirici, SPF\n• Peeling ve retinole ara ver, bariyer toparlansın\n• Yeni ürünü önce kulak arkasında 2–3 gün dene\n• Panthenol, seramid ve centella içerikleri yatıştırır',
        'With sensitive, reactive skin, fewer products is better.\n• For a few days, only: gentle cleanser, fragrance-free moisturizer, SPF\n• Pause exfoliants and retinol so the barrier can recover\n• Patch test new products behind the ear for 2–3 days\n• Panthenol, ceramides and centella are soothing')),
        products: pick(c.prof, c.mode, { cats: ['moisturizer', 'cleanser'], concerns: ['redness'] }, 3) }) },
    { id: 'spf', area: 'skin', keys: ['gunes', 'spf', 'sunscreen', 'sun ', 'uv ', 'gunes kremi', 'koruyucu'],
      r: (c) => ({ text: tx(L(
        `Güneş koruyucu, cilt bakımının en etkili adımı: lekeleri, erken yaşlanmayı ve hassasiyeti azaltır.\n• **SPF 50**, geniş spektrum (UVA+UVB)\n• Yüz ve boyun için iki parmak boyu\n• Sabah son adım; dışarıdaysan 2–3 saatte bir yenile\n${c.prof.skinType === 'oily' ? '• Yağlı cilt için fluid veya jel dokular seç' : c.prof.skinType === 'dry' ? '• Kuru cilt için kremsi dokular rahat ettirir' : '• Beyaz iz bırakmayan, hafif bir doku seç ki her gün kullan'}`,
        `Sunscreen is the most effective skincare step: it reduces dark spots, early ageing and sensitivity.\n• **SPF 50**, broad spectrum (UVA+UVB)\n• Two finger-lengths for face and neck\n• Last morning step; reapply every 2–3 hours outdoors\n${c.prof.skinType === 'oily' ? '• For oily skin, pick a fluid or gel texture' : c.prof.skinType === 'dry' ? '• For dry skin, creamy textures feel best' : '• Pick a light one with no white cast so you\'ll wear it daily'}`)),
        products: pick(c.prof, c.mode, { cats: ['spf'] }, 2) }) },
    { id: 'eyes', area: 'skin', keys: ['goz alti', 'gozalti', 'morluk', 'torba', 'sislik', 'dark circle', 'under eye', 'under-eye', 'puffy', 'puffiness', 'halka'],
      r: (c) => ({ text: tx(L(
        `Göz altı morlukları çoğunlukla genetik, ince cilt ve uykuyla ilgili; tamamen silinmez ama belirgin şekilde hafifler.\n• Sabah soğuk kaşık veya kafeinli serum şişliği azaltır\n• Göz çevresine yüzük parmağınla tapping\n• SPF'yi göz çevresine de sür\n• 7–8 saat uyku ve az tuz${c.mode === 'makeup' ? '\n• Makyajda: iç köşeye somon/şeftali tonlu düzeltici, üzerine az kapatıcı' : ''}`,
        `Dark circles are mostly genetics, thin skin and sleep; they won't vanish but can fade noticeably.\n• A cold spoon or caffeine serum in the morning reduces puffiness\n• Tap product in with your ring finger\n• Take SPF up to the eye area too\n• 7–8 hours of sleep and less salt${c.mode === 'makeup' ? '\n• Makeup: a peach corrector at the inner corner, then a little concealer' : ''}`)),
        products: pick(c.prof, c.mode, { cats: ['eye', 'concealer'], concerns: ['darkcircles'] }, 2) }) },
    { id: 'aging', area: 'skin', keys: ['kirisik', 'yaslanma', 'ince cizgi', 'anti age', 'antiage', 'anti-age', 'wrinkle', 'fine line', 'aging', 'ageing', 'sarkma', 'kaz ayag'],
      r: (c) => ({ text: tx(L(
        'İnce çizgiler için kanıtı en güçlü üçlü:\n• **Her sabah SPF**: yaşlanmanın büyük kısmı güneşten\n• **Retinol** akşam, haftada 2 geceyle başla, alıştıkça artır\n• **C vitamini** sabah, ışıltı ve leke için\nNemli tutulan cilt çizgileri daha az gösterir; boynu da unutma.',
        'The best-proven trio for fine lines:\n• **SPF every morning**: most ageing comes from the sun\n• **Retinol** at night, starting 2 nights a week, building up\n• **Vitamin C** in the morning for glow and spots\nWell-hydrated skin shows fewer lines; don\'t forget your neck.')),
        products: pick(c.prof, c.mode, { cats: ['serum', 'spf'], concerns: ['aging'] }, 3), chips: [L('Retinol nasıl kullanılır?', 'How to use retinol?')] }) },
    { id: 'spots', area: 'skin', keys: ['leke', 'dark spot', 'hyperpig', 'sivilce izi', 'acne mark', 'iz kald', 'ton esitsiz', 'uneven', 'melasma'],
      r: (c) => ({ text: tx(L(
        'Leke ve iz görünümü için sabır + güneş koruması şart.\n• Her gün SPF 50; korumasız bir gün haftaların emeğini geri alır\n• Sabah C vitamini veya niasinamid\n• Akşam haftada 2–3 kez AHA/BHA veya retinol\n• Sonuç 8–12 haftada görülür; melazma şüphesinde dermatoloğa danış',
        'Spots and marks need patience plus sun protection.\n• SPF 50 every day; one unprotected day undoes weeks of work\n• Vitamin C or niacinamide in the morning\n• AHA/BHA or retinol 2–3 evenings a week\n• Expect results in 8–12 weeks; see a dermatologist if you suspect melasma')),
        products: pick(c.prof, c.mode, { cats: ['serum', 'spf'], concerns: ['darkspots'] }, 3) }) },
    { id: 'ingredient', area: 'skin', keys: ['niasinamid', 'niacinamide', 'retinol', 'retinoid', 'c vitamini', 'vitamin c', 'hyaluronik', 'hyaluronic', 'salisilik', 'salicylic', 'bha ', 'aha ', 'glikolik', 'glycolic', 'seramid', 'ceramide', 'peptit', 'peptide', 'icerik', 'ingredient'],
      r: (c, n) => {
        const parts = [];
        const add = (k, tr, en) => { if (k.some(x => hit(n, x))) parts.push(tx(L(tr, en))); };
        add(['retinol', 'retinoid'], '**Retinol**: hücre yenilenmesini hızlandırır; ince çizgi, sivilce ve dokuya iyi gelir. Akşam, bezelye kadar, haftada 2 geceyle başla. İlk haftalarda hafif pullanma normal. Hamilelikte kullanılmaz; ertesi sabah SPF şart.', '**Retinol** speeds up cell turnover; good for fine lines, breakouts and texture. Evenings, pea-sized, starting 2 nights a week. Mild flaking early on is normal. Not for pregnancy; SPF the next morning is a must.');
        add(['niasinamid', 'niacinamide'], '**Niasinamid** (B3 vitamini): yağ dengesi, gözenek görünümü, kızarıklık ve lekelere yardımcı. Sabah veya akşam, %5–10 yeterli; neredeyse her içerikle uyumlu.', '**Niacinamide** (vitamin B3) helps with oil, the look of pores, redness and spots. Morning or night, 5–10% is plenty; it plays well with almost everything.');
        add(['c vitamini', 'vitamin c'], '**C vitamini**: antioksidan; ışıltı ve leke görünümü için sabah, SPF\'nin altında. Işık ve havadan korunan ambalaj seç; kahverengileşirse etkisi azalır.', '**Vitamin C** is an antioxidant for glow and spots; use it in the morning under SPF. Pick light- and air-tight packaging; if it turns brown, it\'s lost potency.');
        add(['hyaluronik', 'hyaluronic'], '**Hyaluronik asit**: cilde su çeker. Nemli cilde sür ve üzerine nemlendiriciyle kilitle; aksi halde kuru havada ters etki yapabilir.', '**Hyaluronic acid** draws water into skin. Apply to damp skin and seal with moisturizer, or it can backfire in dry air.');
        add(['salisilik', 'salicylic', 'bha '], '**Salisilik asit (BHA)**: yağda çözünür, gözeneğin içine girer; siyah nokta ve sivilce için ideal. Haftada 2–3 akşam yeterli.', '**Salicylic acid (BHA)** is oil-soluble and gets into pores; ideal for blackheads and breakouts. 2–3 evenings a week is enough.');
        add(['aha ', 'glikolik', 'glycolic'], '**AHA (glikolik/laktik)**: yüzeyi pürüzsüzleştirir, ışıltı verir. Güneş hassasiyetini artırır; SPF şart, retinolle aynı gece kullanma.', '**AHAs (glycolic/lactic)** smooth the surface and add glow. They raise sun sensitivity, so SPF is a must; don\'t use with retinol the same night.');
        add(['seramid', 'ceramide'], '**Seramidler**: cilt bariyerinin harcı. Kuru, hassas ve aktif kullanan ciltler için temel.', '**Ceramides** are the mortar of the skin barrier. Essential for dry or sensitive skin and anyone using actives.');
        add(['peptit', 'peptide'], '**Peptitler**: cildin sıkılık sinyallerini destekler; nazik oldukları için retinol kullanamayanlara iyi bir alternatif.', '**Peptides** support the skin\'s firmness signals; gentle enough to be an alternative if you can\'t use retinol.');
        if (!parts.length) parts.push(tx(L('Hangi içeriği merak ediyorsun? Niasinamid, retinol, C vitamini, hyaluronik asit, BHA/AHA ve seramidi anlatabilirim.', 'Which ingredient are you curious about? I can explain niacinamide, retinol, vitamin C, hyaluronic acid, BHA/AHA and ceramides.')));
        const kws = { 'retinol': 'aging', 'niasinamid': 'pores', 'niacinamide': 'pores', 'salisilik': 'acne', 'salicylic': 'acne', 'hyaluronik': 'dryness', 'hyaluronic': 'dryness', 'vitamin c': 'darkspots', 'c vitamini': 'darkspots' };
        const conc = Object.keys(kws).filter(k => hit(n, k)).map(k => kws[k]);
        return { text: parts.join('\n\n'), products: conc.length ? pick(c.prof, c.mode, { cats: ['serum', 'exfoliant', 'moisturizer'], concerns: conc }, 2) : [] };
      } },
    { id: 'lipcare', area: 'skin', keys: ['dudak kuru', 'dudaklarim kuru', 'dudagim kuru', 'catlak dudak', 'dudak catla', 'dudaklar catla', 'chapped', 'dudak bakim', 'lip balm', 'lip care', 'dry lips'],
      r: (c) => ({ text: tx(L('Kuru dudaklar için: yalama alışkanlığını bırak, gün içinde parfümsüz balm, gece kalın bir kat vazelin veya lanolin. Dışarıda SPF\'li dudak balmı kullan. Haftada bir yumuşak diş fırçasıyla nazikçe ölü deriyi alabilirsin.', 'For dry lips: stop licking them, use a fragrance-free balm during the day and a thick layer of petrolatum or lanolin at night. Outdoors, use an SPF lip balm. Once a week, gently buff with a soft toothbrush.')) }) },
    { id: 'frizz', area: 'hair', keys: ['kabar', 'elektrik', 'frizz', 'kuru sac', 'saclarim kuru', 'dry hair', 'yipranmis', 'damaged', 'kirik uc', 'split end', 'sac yag', 'hair oil', 'sac bakim', 'hair care'],
      r: (c) => ({ text: tx(L(
        'Kabarma, saçın nem aradığının işareti. Basit bir plan:\n• Sülfatsız, nemlendirici şampuan; her yıkamada saç kremi\n• Havluyla ovma, mikrofiber havlu veya tişörtle bastırarak kurula\n• Nemli saçın uçlarına birkaç damla saç yağı\n• Haftada bir maske; ısı kullanıyorsan ısı koruyucu şart\n• Saten yastık kılıfı sürtünmeyi azaltır',
        'Frizz is hair asking for moisture. A simple plan:\n• Sulfate-free, hydrating shampoo; conditioner every wash\n• Don\'t rub with a towel; press with microfibre or a T-shirt\n• A few drops of hair oil on damp ends\n• A weekly mask; heat protectant if you use heat\n• A satin pillowcase cuts friction')),
        products: pick(c.prof, c.mode, { areas: ['hair'], cats: ['hairoil', 'hairmask'] }, 2) }) },
    { id: 'dandruff', area: 'hair', keys: ['kepek', 'kepeg', 'dandruff', 'kasinti', 'kasiniyor', 'itchy', 'flake', 'sac derisi', 'scalp'],
      r: (c) => ({ text: tx(L(
        'Kepek çoğunlukla saç derisindeki mayanın fazla çoğalmasından kaynaklanır ve kontrol altına alınabilir.\n• Haftada 2–3 kez kepek şampuanı; saç derisinde **1–2 dakika beklet**\n• Diğer günler nazik bir şampuan\n• Saç derisine yağ sürme; kepeği besleyebilir\n• 4 haftada düzelme yoksa veya kızarık plaklar varsa dermatoloğa danış',
        'Dandruff is mostly an overgrowth of a scalp yeast, and it\'s very manageable.\n• Anti-dandruff shampoo 2–3 times a week; **leave it on 1–2 minutes**\n• A gentle shampoo on other days\n• Don\'t oil the scalp; it can feed the flakes\n• No change in 4 weeks, or red patches? See a dermatologist')),
        products: pick(c.prof, c.mode, { areas: ['hair'], concerns: ['dandruff'] }, 2) }) },
    { id: 'hairloss', area: 'hair', keys: ['dokul', 'hair loss', 'losing hair', 'thinning', 'seyrel', 'incel', 'kel', 'bald', 'sac ekim', 'acilma'],
      r: (c) => ({ text: tx(L(
        'Günde 50–100 tel dökülme normal. Belirgin artış varsa:\n• Stres, demir/D vitamini eksikliği, tiroid ve ani kilo kaybı yaygın sebepler; kan tahlili yaptırmak mantıklı\n• Alın hattı veya tepede açılma genetik olabilir; erken dönemde dermatoloğa gitmek en etkili adım\n• Kafeinli/aminexilli şampuanlar destekleyicidir, mucize değil\n• Sıkı toplama, sert fırçalama ve aşırı ısıdan kaçın',
        'Losing 50–100 hairs a day is normal. If it\'s clearly more:\n• Stress, low iron/vitamin D, thyroid and rapid weight loss are common causes; a blood test is sensible\n• A receding hairline or thinning crown can be genetic; seeing a dermatologist early is the most effective step\n• Caffeine/aminexil shampoos help a little, they\'re not miracles\n• Avoid tight styles, harsh brushing and too much heat')),
        products: pick(c.prof, c.mode, { areas: ['hair'], concerns: ['thinning'] }, 1) }) },
    { id: 'oilyhair', area: 'hair', keys: ['yaglanan sac', 'sacim yaglan', 'saclarim yaglan', 'sac yaglan', 'yagli sac', 'oily hair', 'greasy hair', 'oily scalp'],
      r: (c) => ({ text: tx(L('Çabuk yağlanan saçta sık yıkamak sorun değil; nazik bir şampuanla her gün yıkayabilirsin. Saç kremini yalnızca uçlara sür, saç derisine değil. Saçına gün içinde dokunmamaya çalış ve yastık kılıfını sık değiştir. Kuru şampuan araya bir gün sıkıştırmak için iyi bir yardımcı.', 'Washing oily hair often is fine; you can shampoo daily with a gentle formula. Put conditioner on the ends only, never the scalp. Try not to touch your hair during the day and change pillowcases often. Dry shampoo helps stretch an extra day.')) }) },
    { id: 'styling', area: 'hair', keys: ['sac model', 'sac sekil', 'sekillendir', 'wax ', 'pomat', 'pomade', 'haircut', 'hairstyle', 'styling', 'jole', 'sac kesim', 'berber', 'barber'],
      r: (c) => ({ text: tx(L(
        'Şekillendirici seçimi istediğin görünüme bağlı:\n• **Kil / pasta**: mat, doğal, dokulu görünüm; ince telli saçlara hacim\n• **Pomat**: parlak, düzenli, klasik görünüm\n• **Wax**: orta tutuş, yeniden şekillendirilebilir\nNohut kadarıyla başla, avucunda ısıt, arkadan öne doğru uygula. Berberine yüz şeklini ve sabah ayırabildiğin süreyi söyle; buna göre kesim önersin.',
        'Pick a styler by the look you want:\n• **Clay / paste**: matte, natural, textured; adds volume to fine hair\n• **Pomade**: shiny, neat, classic\n• **Wax**: medium hold, restylable\nStart with a chickpea-sized amount, warm it in your palms, apply back to front. Tell your barber your face shape and how much time you have in the morning.')) }) },
    { id: 'shave', area: 'skin', w: 2, keys: ['tiras', 'shave', 'shaving', 'jilet', 'razor', 'batik', 'ingrown', 'after shave', 'aftershave', 'kesik', 'kizarik tiras'],
      r: (c) => ({ text: tx(L(
        'Tıraş tahrişini azaltmak için:\n• Duştan sonra tıraş ol; sıcak su kılı yumuşatır\n• Tıraş köpüğü veya jelini 1 dakika beklet\n• **Kıl yönünde** geç; batık sorunu varsa ters yöne hiç geçme\n• Bıçağı 5–7 tıraşta bir değiştir, sık durula\n• Soğuk suyla bitir, **alkolsüz** bir balm sür\nBatıklar sık oluyorsa haftada 2 kez salisilik asitli bir tonik yardımcı olur.',
        'To cut razor irritation:\n• Shave after a shower; warm water softens hair\n• Let the foam or gel sit for a minute\n• Go **with the grain**; if you get ingrowns, never against it\n• Change the blade every 5–7 shaves, rinse often\n• Finish with cool water and an **alcohol-free** balm\nIf ingrowns are frequent, a salicylic acid toner twice a week helps.')),
        chips: [L('Hassas cilt', 'Sensitive skin')] }) },
    { id: 'body', area: 'skin', keys: ['ter ', 'terleme', 'koku', 'deodorant', 'deodoran', 'parfum', 'fragrance', 'sweat', 'smell', 'vucut', 'body'],
      r: (c) => ({ text: tx(L(
        'Tazelik için temel düzen:\n• Günlük duş; koltuk altı ve ayaklara özen\n• Ter sorunu varsa akşam **antiperspirant**, sabah deodorant daha etkili\n• Parfümü nabız noktalarına (bilek, boyun) sık, ovma\n• Pamuklu ve nefes alan kumaşlar kokuyu azaltır\n• Vücut için de nemlendirici, özellikle duştan hemen sonra',
        'A simple freshness routine:\n• Daily shower, with care for underarms and feet\n• If you sweat a lot, **antiperspirant at night** works better, deodorant in the morning\n• Spray fragrance on pulse points (wrists, neck), don\'t rub\n• Cotton and breathable fabrics reduce odour\n• Moisturize your body too, right after showering')) }) },
    { id: 'everyday', area: 'makeup', keys: ['gunluk makyaj', 'dogal makyaj', 'everyday makeup', 'natural makeup', 'no makeup', 'sade makyaj', 'makyaj', 'makeup', '10 dakika', 'hizli makyaj', 'quick makeup', 'okul', 'is icin', 'for work'],
      r: (c) => ({ text: tx(L(
        `Yaklaşık 10 dakikalık, ${c.prof.makeupStyle === 'glam' ? 'biraz daha belirgin ama' : ''} doğal bir günlük makyaj:`,
        `A natural everyday look in about 10 minutes${c.prof.makeupStyle === 'glam' ? ', with a touch more definition' : ''}:`)),
        steps: { title: L('Günlük makyaj', 'Everyday makeup'), items: [L('Hafif ten ürünü, sadece gereken yerlere', 'A light base, only where needed'), L('Göz altı iç köşesine kapatıcı', 'Concealer at the inner under-eye'), L('Elmacıklara yumuşak allık', 'A soft wash of blush'), L('Kaşları tara ve boşlukları doldur', 'Brush brows and fill gaps'), L('Bir kat maskara', 'One coat of mascara'), L('Renkli balm veya gloss', 'Tinted balm or gloss')].map(tx) },
        products: pick(c.prof, c.mode, { areas: ['makeup'], cats: ['foundation', 'mascara', 'blush', 'lip'] }, 3),
        chips: [L('Fondöten tonum', 'My foundation shade'), L('Akşam makyajı', 'Evening look')] }) },
    { id: 'foundation', area: 'makeup', keys: ['fondoten', 'foundation', 'ten rengi', 'ton ', 'shade', 'alt ton', 'undertone', 'kapatici', 'concealer', 'bb krem', 'cc krem', 'tint', 'pudra', 'powder'],
      r: (c) => {
        const ut = c.prof.undertone;
        const utTxt = ut === 'warm' ? L('Sıcak alt tonun var: sarı/altın (W veya N) tonlara bak.', 'You have a warm undertone: look at yellow/golden (W or N) shades.')
          : ut === 'cool' ? L('Soğuk alt tonun var: pembe tabanlı (C) tonlara bak.', 'You have a cool undertone: look at pink-based (C) shades.')
          : ut === 'neutral' ? L('Nötr alt tonun var: N kodlu tonlar en kolay eşleşir.', 'You have a neutral undertone: N shades match most easily.')
          : L('Alt tonunu bilmiyorsan: bilek damarların yeşilse sıcak, mor-maviyse soğuk, ikisi de ise nötr.', 'Not sure of your undertone? Green wrist veins mean warm, blue-purple means cool, both means neutral.');
        return { text: tx(L(
          `Doğru fondöten tonu için:\n• Üç tonu **çene hattına** yan yana sür, gün ışığında bak\n• Kaybolan ton seninkidir; yüz ile boyun arasında çizgi olmamalı\n• ${tx(utTxt)}\n• Kapatıcıyı göz altı için fondötenden yarım ton açık, leke için aynı ton seç`,
          `To find your foundation shade:\n• Swipe three shades side by side on your **jawline** and check in daylight\n• The one that disappears is yours; no line between face and neck\n• ${tx(utTxt)}\n• Concealer: half a shade lighter for under-eyes, same shade for spots`)),
          products: pick(c.prof, c.mode, { areas: ['makeup'], cats: ['foundation', 'concealer'] }, 3) };
      } },
    { id: 'eyemk', area: 'makeup', keys: ['eyeliner', 'maskara', 'mascara', 'far ', 'farlar', 'eyeshadow', 'goz makyaj', 'eye makeup', 'kirpik', 'kirpig', 'lash', 'kas ', 'kaslar', 'kaslarim', 'brow'],
      r: (c, n) => {
        const brow = ['kas ', 'kaslar', 'kaslarim', 'brow'].some(k => hit(n, k));
        if (brow) return { text: tx(L('Doğal kaşlar için: kaşları yukarı tara, ortadan başlayarak kısa, kıl gibi vuruşlarla boşlukları doldur. Kaş başını en son ve en hafif yap. Şeffaf kaş jeliyle sabitle.', 'For natural brows: brush them up, start in the middle and fill gaps with short, hair-like strokes. Do the front last and lightest. Set with clear brow gel.')), products: pick(c.prof, c.mode, { cats: ['brow'] }, 1) };
        return { text: tx(L(
          'Göz makyajında kolay sonuç için:\n• **Maskara**: fırçayı dipte sağa sola oynat, uçlara çek; ikinci kat ilk kurumadan\n• **Eyeliner**: kirpik diplerine noktalar koy, birleştir; kuyruğu alt kirpik çizgisinin devamı gibi düşün\n• **Far**: kapağa orta ton, göz kapağı çizgisine bir ton koyu, iç köşeye ışıltı',
          'Easy wins for eye makeup:\n• **Mascara**: wiggle at the root, pull to tips; second coat before the first dries\n• **Eyeliner**: dot along the lash line, connect; angle the wing like an extension of your lower lashes\n• **Shadow**: mid tone on the lid, one shade deeper in the crease, a touch of shimmer at the inner corner')),
          products: pick(c.prof, c.mode, { cats: ['mascara', 'liner'] }, 2) };
      } },
    { id: 'lipmk', area: 'makeup', keys: ['ruj', 'lipstick', 'gloss', 'dudak makyaj', 'lip liner', 'dudak kalem', 'dudak rengi', 'lip color', 'lip colour'],
      r: (c) => ({ text: tx(L(
        `Ruj seçerken ${c.prof.undertone === 'cool' ? 'soğuk alt tonuna mavi tabanlı kırmızılar ve pembe-mürdüm tonlar' : c.prof.undertone === 'warm' ? 'sıcak alt tonuna mercan, tuğla ve turuncu tabanlı kırmızılar' : 'gül kurusu ve "dudak rengi + bir ton" nüdler'} çok yakışır. Uzun kalıcılık için: balm sür, kurula, dudak kalemiyle tüm dudağı doldur, ruju fırçayla sür, kâğıt mendille bastır ve bir kat daha.`,
        `When choosing lipstick, ${c.prof.undertone === 'cool' ? 'blue-based reds and berry pinks suit your cool undertone' : c.prof.undertone === 'warm' ? 'coral, brick and orange-based reds suit your warm undertone' : 'rosy nudes and "your lips, one shade deeper" are safe bets'}. For long wear: balm, blot, fill the whole lip with liner, apply with a brush, blot with a tissue, then one more layer.`)),
        products: pick(c.prof, c.mode, { cats: ['lip'] }, 2) }) },
    { id: 'blush', area: 'makeup', keys: ['allik', 'blush', 'bronzer', 'highlighter', 'aydinlatici', 'kontur', 'contour'],
      r: (c) => ({ text: tx(L('Allık için gülümse, elmacık kemiğinin üstünden şakağa doğru dağıt; likit allıkta bir nokta yeter. Kontur elmacık kemiğinin altına, kulaktan ağız köşesine doğru yarı yolda bitmeli. Aydınlatıcı yalnızca elmacık üstü, burun kemeri ve kaş kemerine.', 'For blush, smile and blend from the top of the cheek toward the temple; one dot of liquid blush is enough. Contour goes under the cheekbone, from the ear stopping halfway to the mouth. Highlighter only on cheek tops, nose bridge and brow bone.')),
        products: pick(c.prof, c.mode, { cats: ['blush', 'base'] }, 2) }) },
    { id: 'evening', area: 'makeup', keys: ['aksam makyaj', 'gece makyaj', 'ozel gun', 'dugun', 'nisan', 'mezuniyet', 'parti', 'davet', 'party', 'wedding', 'event', 'evening look', 'glam', 'smokey', 'smoky'],
      r: (c) => ({ text: tx(L('Özel gün için daha kalıcı ve fotoğrafta da güzel duran bir akşam makyajı:', 'A longer-lasting evening look that also photographs well:')),
        steps: { title: L('Akşam makyajı', 'Evening look'), items: [L('Nemlendirici ve makyaj bazı', 'Moisturizer and primer'), L('Uzun süre kalıcı fondöten, ince katlar', 'Long-wear foundation in thin layers'), L('Göz altı kapatıcı + ince pudra', 'Under-eye concealer + light powder'), L('Gözde geçişli koyu far veya eyeliner', 'Blended deeper shadow or liner'), L('İki kat maskara', 'Two coats of mascara'), L('Allık ve elmacık üstüne aydınlatıcı', 'Blush and a touch of highlighter'), L('Kalemle sabitlenmiş ruj', 'Lipstick set with liner'), L('Sabitleyici sprey', 'Setting spray')].map(tx) },
        products: pick(c.prof, c.mode, { cats: ['foundation', 'setting', 'lip', 'liner'] }, 3) }) },
    { id: 'buy', area: 'general', keys: ['ne almali', 'ne alayim', 'ne alsam', 'oneri', 'oner', 'tavsiye', 'recommend', 'what should i buy', 'buy next', 'urun oner', 'hangi urun', 'which product', 'ne kullanmali', 'ne kullanayim', 'what should i use'],
      r: (c) => {
        const bag = new Set(c.bag.map(b => b.id));
        const order = ['spf', 'cleanser', 'moisturizer', 'serum', ...(c.mode === 'makeup' ? ['foundation', 'mascara'] : [])];
        const haveCats = new Set(c.bag.map(b => b.cat));
        const missing = order.filter(x => !haveCats.has(x));
        const cat = missing[0] || 'serum';
        const ids = pick(c.prof, c.mode, { cats: [cat], concerns: c.prof.concerns }, 4).filter(id => !bag.has(id)).slice(0, 2);
        return { text: tx(L(
          `Ürünlerine bakınca sıradaki en mantıklı adım **${tx(CATS[cat])}**. ${cat === 'spf' ? 'Her rutinin temeli güneş koruyucu; diğer her ürünün emeğini korur.' : 'Bu, rutinindeki en büyük boşluğu kapatır.'} Profiline göre en uygun seçenekler:`,
          `Looking at your products, the smartest next step is a **${tx(CATS[cat]).toLowerCase()}**. ${cat === 'spf' ? 'Sunscreen is the base of every routine; it protects the work of everything else.' : 'It fills the biggest gap in your routine.'} Best matches for your profile:`)), products: ids };
      } },
    { id: 'glow', area: 'general', keys: ['glow', 'seri', 'streak', 'degisim', 'kendimi gelistir', 'motivasyon', 'motivation', 'challenge', 'bakimli gorun', 'look better', 'daha iyi gorun'],
      r: (c) => ({ text: tx(L('Glow-up küçük ama her gün tekrarlanan adımlardan oluşur. Sağ üstteki seri simgesine dokun: her gün sabah rutini, kısa bir ders ve akşam rutiniyle serini büyüt, rozetleri topla.', 'A glow-up is small steps repeated daily. Tap the streak icon at the top right: each day, a morning routine, a short lesson and an evening routine grow your streak and unlock badges.')), action: 'streak' }) },
    { id: 'life', area: 'general', keys: ['beslenme', 'diyet', 'su ic', 'su icmek', 'water', 'diet', 'uyku', 'uyumak', 'sleep', 'spor', 'egzersiz', 'stres', 'stress', 'sigara', 'smoking', 'seker', 'sugar'],
      r: (c) => ({ text: tx(L('Cilt ve saç yaşam tarzına çok tepki verir:\n• 7–8 saat uyku: göz altı ve donukluk için en ucuz bakım\n• Yeterli su ve sebze; çok şekerli ve işlenmiş gıdalar bazı kişilerde sivilceyi artırabilir\n• Düzenli egzersiz kan akışını artırır; terledikten sonra yüzünü yıka\n• Stres dökülme ve sivilceyi tetikleyebilir; kısa yürüyüşler bile işe yarar\n• Sigara cilt yaşlanmasını belirgin şekilde hızlandırır', 'Skin and hair respond strongly to lifestyle:\n• 7–8 hours of sleep: the cheapest fix for under-eyes and dullness\n• Enough water and veg; very sugary, processed food can worsen breakouts for some people\n• Regular exercise boosts circulation; wash your face after sweating\n• Stress can trigger shedding and breakouts; even short walks help\n• Smoking noticeably speeds up skin ageing')) }) }
  ];

  const AREA_OK = { skin: ['skin', 'general'], makeup: ['makeup', 'skin', 'general'], hair: ['hair', 'general'], general: ['skin', 'makeup', 'hair', 'general'] };

  function detect(text) {
    const n = norm(text);
    let best = null, bestS = 0;
    for (const it of INTENTS) {
      let s = 0;
      for (const k of it.keys) if (hit(n, k)) s += k.trim().length + (k.includes(' ') ? 4 : 0);
      s *= (it.w || 1);
      if (s > bestS) { bestS = s; best = it; }
    }
    return { intent: best, score: bestS, n };
  }

  /* Ana giriş: { text, prof, mode, lang, name, bag, topicArea } */
  function reply(ctx) {
    const { intent, score, n } = detect(ctx.text);
    const c = { ...ctx, prof: ctx.prof || {} };
    if (!intent || score < 3) {
      return { text: tx(L(
        'Bunu tam anlayamadım ama yardımcı olmak isterim. Biraz daha açar mısın? Örneğin cilt tipini, yaşadığın sorunu ya da merak ettiğin ürünü yazabilirsin.',
        'I didn\'t quite catch that, but I\'d like to help. Could you say a bit more? For example your skin type, the issue you\'re having, or a product you\'re curious about.')),
        chips: ctx.mode === 'makeup' ? [L('Sabah rutini', 'Morning routine'), L('Günlük makyaj', 'Everyday makeup'), L('Ne almalıyım?', 'What should I buy?')] : [L('Sabah rutini', 'Morning routine'), L('Kuru cilt', 'Dry skin'), L('Saç dökülmesi', 'Hair thinning')], intentArea: 'general' };
    }
    if (intent.area === 'makeup' && ctx.mode === 'care') {
      return { text: tx(L(
        'Makyaj içeriği şu an kapalı, o yüzden cilt, saç ve bakıma odaklanıyorum. Makyaj önerileri istersen Profil > Ayarlar\'dan "Makyaj içeriği"ni açabilirsin. Bu arada cildini hazırlamak için sabah rutini kurmamı ister misin?',
        'Makeup content is off, so I\'m focusing on skin, hair and grooming. If you\'d like makeup tips, turn on "Makeup content" in Profile > Settings. Meanwhile, shall I set up a morning routine?')),
        chips: [L('Sabah rutini', 'Morning routine')], intentArea: 'makeup' };
    }
    if (ctx.topicArea && !AREA_OK[ctx.topicArea].includes(intent.area) && score >= 5) {
      return { offTopic: true, intentArea: intent.area };
    }
    const out = intent.r(c, n);
    out.intentArea = intent.area;
    out.intent = intent.id;
    if (out.chips) out.chips = out.chips.map(tx);
    if (out.steps) { out.steps.title = tx(out.steps.title); out.steps.items = out.steps.items.map(tx); }
    return out;
  }

  window.ADORN_ENGINE = { norm, reply, detect, fitScore, analyzeProduct, findProduct, buildRoutine, pick };
})();
