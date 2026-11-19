# Adorn prototipine uygulanan yamalar. Her yama tam olarak bir kez eşleşmeli.
# Kullanım: python3 patches.py app.pretty.js out.js
import sys

src = open(sys.argv[1], encoding="utf-8").read()
P = []  # (ad, eski, yeni)


def p(name, old, new):
    P.append((name, old, new))


# ---------------------------------------------------------------- i18n
# 1) Hazır çevirileri (l10n/<dil>.json) önbelleğe yükle; sunucu olmadan da tüm diller çalışsın.
p("l10n-store", """  var O = `en`,
    re = `English`,""", """  var __adornStatic = {};
  function __adornL10n(e) {
    if (__adornStatic[e]) return __adornStatic[e];
    if (typeof fetch < `u` && !__adornStatic[`__busy_` + e]) {
      __adornStatic[`__busy_` + e] = 1;
      fetch(`l10n/${e}.json`)
        .then((t) => (t.ok ? t.json() : null))
        .then((t) => {
          if (!t) return;
          (__adornStatic[e] = t), O === e && (Object.assign(k, t), F());
        })
        .catch(() => {
          __adornStatic[`__busy_` + e] = 0;
        });
    }
    return {};
  }
  var O = `en`,
    re = `English`,""")
p("l10n-merge", """          k = JSON.parse(window.localStorage.getItem(P(e)) ?? `{}`);""",
  """          k = Object.assign(
            JSON.parse(window.localStorage.getItem(P(e)) ?? `{}`),
            __adornL10n(e),
          );""")

# 2) "Profil" başlıkları (Güzellik profili -> Profil), konu alt yazısı
p("ul-profile-title", """      "profile.title": `Your beauty profile`,""", """      "profile.title": `Profile`,""")
p("ul-esc-profile", """      "esc.profile": `Beauty profile`,""", """      "esc.profile": `Profile`,""")
p("ul-topic-sub", """      "topic.sub": `Ask anything about {topic}. Adorn keeps this chat focused on it.`,""",
  """      "topic.sub": `Adorn will keep this chat focused on this topic.`,""")

PROFILE = {"tr": "Profil", "es": "Perfil", "fr": "Profil", "de": "Profil", "it": "Profilo", "pt": "Perfil",
           "ru": "Профиль", "ar": "الملف الشخصي", "zh": "个人资料", "ja": "プロフィール", "ko": "프로필",
           "fi": "Profiili", "sv": "Profil"}
OLD_PT = {"tr": ("Güzellik profili", "Güzellik profilin"), "es": ("Perfil de belleza", "Tu perfil de belleza"),
          "fr": ("Profil beauté", "Ton profil beauté"), "de": ("Beauty-Profil", "Dein Beauty-Profil"),
          "it": ("Profilo beauty", "Il tuo profilo beauty"), "pt": ("Perfil de beleza", "O seu perfil de beleza"),
          "ru": ("Бьюти-профиль", "Ваш бьюти-профиль"), "ar": ("ملف الجمال", "ملفك الجمالي"),
          "zh": ("美妆档案", "你的美妆档案"), "ja": ("ビューティープロフィール", "ビューティープロフィール"),
          "ko": ("뷰티 프로필", "나의 뷰티 프로필"), "fi": ("Kauneusprofiili", "Kauneusprofiilisi"),
          "sv": ("Skönhetsprofil", "Din skönhetsprofil")}
for lang, (esc, title) in OLD_PT.items():
    p(f"dl-esc-{lang}", f'        "esc.profile": `{esc}`,', f'        "esc.profile": `{PROFILE[lang]}`,')
    p(f"dl-title-{lang}", f'        "profile.title": `{title}`,', f'        "profile.title": `{PROFILE[lang]}`,')
TOPIC = {"tr": ("`{topic} hakkında her şeyi sor. Adorn bu sohbeti bu konuya odaklı tutar.`", "`Adorn sohbeti bu konuya odaklı tutacaktır.`"),
         "fi": ("`Kysy mitä tahansa aiheesta {topic}. Adorn pitää keskustelun aiheessa.`", "`Adorn pitää keskustelun tässä aiheessa.`"),
         "sv": ("`Fråga vad som helst om {topic}. Adorn håller chatten fokuserad på det.`", "`Adorn håller chatten fokuserad på det här ämnet.`")}
for lang, (old, new) in TOPIC.items():
    p(f"dl-topic-{lang}", f'        "topic.sub": {old},', f'        "topic.sub": {new},')

# ---------------------------------------------------------------- makyaj / bakım yolu
p("mode-helpers", """  function bp() {
    let { theme: e, changeTheme: t, restoreAppearance: n } = Po(),""", """  var __adornMk = !0,
    __adornMakeupAreas = [`Makeup Prep`, `Makeup`, `Post-Makeup`];
  function __vk() {
    return __adornMk ? Vc : Vc.filter((e) => !__adornMakeupAreas.includes(e));
  }
  function __okRoutine(e) {
    return __adornMk || !e || !__adornMakeupAreas.includes(e.area);
  }
  function bp() {
    let { theme: e, changeTheme: t, restoreAppearance: n } = Po(),""")
p("td-makeup", """      animatedBackground: !0,
      liquidGlass: !0,
    },
    nd =""", """      animatedBackground: !0,
      liquidGlass: !0,
      makeup: !0,
    },
    nd =""")
p("sanitize-makeup", """        liquidGlass: c.liquidGlass !== !1,
        language:""", """        liquidGlass: c.liquidGlass !== !1,
        makeup: c.makeup !== !1,
        language:""")
p("mode-routines", """      Xt = [...Hc, ...kt],""", """      Xt = ((__adornMk = zt.makeup !== !1), [...Hc, ...kt].filter(__okRoutine)),""")
# Konu eşleştirme: makyajsız yolda makyaj rutini önerme
p("wc-guard", """  function Gc(e) {
    return Hc.find((t) => t.area === e) ?? Hc[0];
  }""", """  function Gc(e) {
    return Hc.find((t) => t.area === e && __okRoutine(t)) ?? Hc[0];
  }""")
p("ld-routine", """    let o = Wc(a, e.routines) ?? (e.topic ? Gc(e.topic) : Hc[0]),""",
  """    let o = Wc(a, e.routines) ?? (e.topic ? Gc(e.topic) : Hc[0]);
    __okRoutine(o) || (o = /hair|scalp|frizz|curl|saç|sac\\b/i.test(a) ? Hc[5] : Hc[0]);
    let""")
# Menüler: alan listeleri
p("al-areas", """      h = [Ol, ...Vc],""", """      h = __adornMk ? [Ol, ...Vc] : __vk(),""")
p("al-courses", """                      c &&
                        (0, R.jsx)(q, {
                          variant: `ghost`,
                          size: `icon`,
                          "aria-label": m(`esc.courses`),""", """                      c &&
                        __adornMk &&
                        (0, R.jsx)(q, {
                          variant: `ghost`,
                          size: `icon`,
                          "aria-label": m(`esc.courses`),""")
# Profil: makyaj bölümü yalnızca makyaj yolunda
p("profile-makeup", """        (0, R.jsxs)(wl, {
          title: I(`Makeup`),""", """        __adornMk &&
        (0, R.jsxs)(wl, {
          title: I(`Makeup`),""")
# Profil: göz rengi yalnızca makyaj yolunda
p("profile-eyes", """        (0, R.jsx)(wl, {
          title: I(`Eyes`),""", """        __adornMk &&
        (0, R.jsx)(wl, {
          title: I(`Eyes`),""")
# Seri: pencere yerine kendi tam ekran sayfası
p("glow-not-dialog", """              (0, R.jsx)(lt.Root, {
                open: z !== null,""", """              z === `glow` &&
                (0, R.jsxs)(`div`, {
                  className: `glow-page`,
                  role: `dialog`,
                  "aria-modal": `true`,
                  "aria-label": tr.glow,
                  children: [
                    (0, R.jsxs)(`div`, {
                      className: `glow-page-head`,
                      children: [
                        (0, R.jsx)(`h2`, {
                          className: `dialog-title`,
                          children: tr.glow,
                        }),
                        (0, R.jsx)(q, {
                          variant: `ghost`,
                          size: `icon`,
                          "aria-label": I(`Close window`),
                          onClick: () => We(null),
                          children: (0, R.jsx)(No, {}),
                        }),
                      ],
                    }),
                    (0, R.jsx)(`div`, {
                      className: `glow-page-body`,
                      children: (0, R.jsx)(
                        Cu,
                        {
                          glow: P,
                          remembering: Vt,
                          level: St[`Makeup experience`] ?? ``,
                          onOpenLesson: Ln,
                          onBegin: Fn,
                          onToggle: (e) => le((t) => t && mu(t, e)),
                          onAsk: zn,
                          onChangeGoal: () => le(null),
                          onLink: () => le((e) => e && du(e)),
                        },
                        it,
                      ),
                    }),
                  ],
                }),
              (0, R.jsx)(lt.Root, {
                open: z !== null && z !== `glow`,""")
# Esc ile seri sayfasını kapat
p("glow-esc", """          e.key === `Escape` && (ce(null), N(!1));""",
  """          e.key === `Escape` && (ce(null), N(!1), We((e) => (e === `glow` ? null : e)));""")
# Profil hedefleri: makyajsız yolda makyaj hedeflerini gösterme
p("profile-goals", """              "aria-label": I(`Goals`),
              children: Pc.map((n) => {""", """              "aria-label": I(`Goals`),
              children: Pc.filter(
                (e) =>
                  __adornMk ||
                  (e !== `Learn makeup step by step` &&
                    e !== `Polish my everyday look` &&
                    e !== `Get ready for an event`),
              ).map((n) => {""")
# Glow-up: makyaj hedefi yalnızca makyaj yolunda
p("glow-goals", """            children: Object.keys($l).map((e) =>""",
  """            children: Object.keys($l)
              .filter((e) => __adornMk || e !== `makeup`)
              .map((e) =>""")
# Ana sayfa önerileri
p("home-starters", """                              starters: ge
                                ? (qc[ge] ?? []).map((e) => I(e))
                                : Ue,""", """                              starters: ge
                                ? (qc[ge] ?? []).map((e) => I(e))
                                : __adornMk
                                  ? Ue
                                  : [
                                      Ue[0],
                                      I(`My skin feels tight after washing`),
                                      Ue[2],
                                      Ue[3],
                                    ],""")
p("home-starter-icon", """            let n = r ? u : (Tf[t] ?? wo);""",
  """            let n = r ? u : !__adornMk && t === 1 ? Do : (Tf[t] ?? wo);""")
# Ayarlar: yolu sonradan değiştirmek için tek satır
p("settings-makeup", """                                  (0, R.jsxs)(`label`, {
                                    className: `settings-row`,
                                    children: [
                                      I(`Include products I own`),""", """                                  (0, R.jsxs)(`label`, {
                                    className: `settings-row`,
                                    children: [
                                      (0, R.jsxs)(`span`, {
                                        className: `settings-label`,
                                        children: [
                                          I(`Makeup content`),
                                          (0, R.jsx)(`small`, {
                                            children: I(
                                              `Off keeps Adorn to skincare and haircare.`,
                                            ),
                                          }),
                                        ],
                                      }),
                                      (0, R.jsx)(`input`, {
                                        type: `checkbox`,
                                        checked: zt.makeup !== !1,
                                        onChange: (e) =>
                                          $t({ makeup: e.target.checked }),
                                      }),
                                    ],
                                  }),
                                  (0, R.jsxs)(`label`, {
                                    className: `settings-row`,
                                    children: [
                                      I(`Include products I own`),""")
# Claude'a giden talimat: makyajsız yol
p("prompt-mode", """          extra: [s, r, n, l, c, Cf].filter(Boolean).join(`""",
  """          extra: [
            s,
            r,
            n,
            __adornMk
              ? l
              : `The person chose a skincare and haircare experience without makeup: never suggest makeup products, looks, courses or routines. If they ask about makeup, answer briefly and kindly.`,
            c,
            __adornMk ? Cf : ``,
          ]
            .filter(Boolean)
            .join(`""")

# ---------------------------------------------------------------- ana sayfa
p("home-eyebrow", """            (0, R.jsx)(`p`, {
              className: `home-eyebrow`,
              children: r ? s(`home.focus`) : l,
            }),""", """            !r &&
              (0, R.jsx)(`p`, { className: `home-eyebrow`, children: l }),""")
p("home-sub", """                                ? L(`topic.sub`, { topic: L(`area.${ge}`) })""",
  """                                ? L(`topic.sub`)""")
p("home-stats", """                              stats: Vn,""", """                              stats: [],""")

# ---------------------------------------------------------------- karşılama soruları
start = src.index("  function ku({ onDone: e, onSkip: t }) {")
end = src.index("  var Au = (0, y.createContext)({")
OLD_KU = src[start:end]
NEW_KU = r'''  function ku({ onDone: e, onSkip: t }) {
    let [n, r] = (0, y.useState)(0),
      [i, a] = (0, y.useState)(``),
      [o, s] = (0, y.useState)([]),
      [c, l] = (0, y.useState)(null),
      u = (0, y.useRef)(!1),
      d = (t, n = {}) => {
        let r = n.level ?? i;
        e({
          name: ``,
          level: r,
          goals: n.goals ?? o,
          personalGoal: n.goal ?? ``,
          next: t,
          course: Xl(Zl(r)).id,
          makeup: n.makeup ?? !0,
        });
      },
      f = (e, t) => {
        u.current ||
          ((u.current = !0),
          to(`tap`),
          l(e),
          window.setTimeout(
            () => {
              (u.current = !1), l(null), t();
            },
            hp() ? 0 : 360,
          ));
      },
      p = (e, t, n, r) =>
        (0, R.jsx)(
          `button`,
          {
            type: `button`,
            className: `onboarding-option is-pill ${c === e ? `is-picked` : ``} ${c && c !== e ? `is-dimmed` : ``}`,
            onClick: () => f(e, r),
            children: (0, R.jsxs)(`span`, {
              children: [
                (0, R.jsx)(`strong`, { children: t }),
                n && (0, R.jsx)(`small`, { children: n }),
              ],
            }),
          },
          e,
        ),
      m = (e) =>
        (0, R.jsx)(`div`, {
          className: `onboarding-options ${c ? `is-deciding` : ``}`,
          role: `group`,
          children: e,
        });
    return (0, R.jsx)(`div`, {
      className: `onboarding`,
      role: `dialog`,
      "aria-modal": `true`,
      "aria-label": I(`Set up Adorn`),
      children: (0, R.jsxs)(`div`, {
        className: `onboarding-inner`,
        children: [
          (0, R.jsxs)(`div`, {
            className: `onboarding-top`,
            children: [
              n > 0
                ? (0, R.jsx)(`button`, {
                    type: `button`,
                    className: `onboarding-back`,
                    onClick: () => r(n - 1),
                    "aria-label": I(`Back`),
                    children: (0, R.jsx)(po, {}),
                  })
                : (0, R.jsx)(`span`, {}),
              n > 0 &&
                (0, R.jsx)(`span`, {
                  className: `onboarding-steps`,
                  "aria-label": I(`Step {0} of {1}`, { 0: n, 1: 3 }),
                  children: [1, 2, 3].map((e) =>
                    (0, R.jsx)(`i`, { className: e <= n ? `is-on` : `` }, e),
                  ),
                }),
              (0, R.jsx)(`button`, {
                type: `button`,
                className: `onboarding-skip`,
                onClick: t,
                children: I(`Skip`),
              }),
            ],
          }),
          n === 0 &&
            (0, R.jsxs)(`section`, {
              className: `onboarding-step onboarding-hello`,
              children: [
                (0, R.jsx)(`span`, { className: `wordmark`, children: `adorn` }),
                (0, R.jsx)(`h1`, { children: I(`Are you into makeup?`) }),
                (0, R.jsx)(`p`, {
                  children: I(
                    `Adorn shapes itself around your answer. You can change it later in Settings.`,
                  ),
                }),
                m([
                  p(`yes`, I(`Yes`), I(`Makeup, skincare and hair`), () => r(1)),
                  p(`no`, I(`No`), I(`Skincare and hair only`), () =>
                    d(`chat`, { makeup: !1, level: ``, goals: [], goal: `` }),
                  ),
                ]),
              ],
            }, `s0`),
          n === 1 &&
            (0, R.jsxs)(`section`, {
              className: `onboarding-step`,
              children: [
                (0, R.jsx)(`h2`, {
                  children: I(`How comfortable are you with makeup?`),
                }),
                m(
                  Du.map((e) =>
                    p(e.value, I(e.title), null, () => {
                      a(e.value), r(2);
                    }),
                  ),
                ),
              ],
            }, `s1`),
          n === 2 &&
            (0, R.jsxs)(`section`, {
              className: `onboarding-step`,
              children: [
                (0, R.jsx)(`h2`, {
                  children: I(`What would you like help with?`),
                }),
                m(
                  Pc.map((e) =>
                    p(e, I(e), null, () => {
                      s([e]), r(3);
                    }),
                  ),
                ),
              ],
            }, `s2`),
          n === 3 &&
            (0, R.jsxs)(`section`, {
              className: `onboarding-step`,
              children: [
                (0, R.jsx)(`h2`, { children: I(`Set yourself a goal`) }),
                m(Ou.map((e) => p(e, I(e), null, () => d(`chat`, { goal: e })))),
              ],
            }, `s3`),
        ],
      }),
    });
  }
'''
p("onboarding", OLD_KU, NEW_KU)

# Karşılama bitince: yolu kaydet, tek seferlik "hoş geldin" göster
p("wl-state", """    let [je, Me] = (0, y.useState)(!1),""", """    let [je, Me] = (0, y.useState)(!1),
      [__wlOpen, __wl] = (0, y.useState)(!1),""")
p("onb-done", """      Ct(t),
        Et(t),
        Ie(e.course),
        Ht(!0),
        Me(!1),""", """      Ct(t),
        Et(t),
        Ie(e.course),
        $t({ makeup: e.makeup !== !1 }),
        Ht(!0),
        Me(!1),
        __wl(!0),""")
p("onb-skip", """                  onSkip: () => {
                    Me(!1), Lu();
                  },
                }),""", """                  onSkip: () => {
                    Me(!1), Lu(), __wl(!0);
                  },
                }),
              __wlOpen &&
                !je &&
                (0, R.jsx)(`div`, {
                  className: `welcome-overlay`,
                  role: `dialog`,
                  "aria-modal": `true`,
                  "aria-labelledby": `welcome-title`,
                  children: (0, R.jsxs)(`div`, {
                    className: `welcome-card`,
                    children: [
                      (0, R.jsx)(`span`, {
                        className: `wordmark`,
                        children: `adorn`,
                      }),
                      (0, R.jsx)(`h2`, {
                        id: `welcome-title`,
                        children: wt
                          ? I(`Welcome, {name}!`, { name: wt })
                          : I(`Welcome!`),
                      }),
                      (0, R.jsx)(`p`, {
                        children: I(
                          `I’m Adorn, your personal assistant. Shall we get to know each other?`,
                        ),
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `welcome-actions`,
                        children: [
                          (0, R.jsx)(q, {
                            onClick: () => {
                              __wl(!1), rn(`profile`);
                            },
                            children: I(`Let’s get to know each other`),
                          }),
                          (0, R.jsx)(q, {
                            variant: `ghost`,
                            onClick: () => __wl(!1),
                            children: I(`Maybe later`),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),""")

# ---------------------------------------------------------------- örnek yanıtların çevirisi
p("ld-thanks", """        text: `It's a pleasure. Come back whenever you'd like to adjust a ritual or plan the next one.`,""",
  """        text: I(
          `It's a pleasure. Come back whenever you'd like to adjust a ritual or plan the next one.`,
        ),""")
p("ld-hello", """        text: `Hello, lovely to see you. Tell me what you have in mind today: skincare, makeup, an evening wind-down or your hair.`,""",
  """        text: __adornMk
          ? I(
              `Hello, lovely to see you. Tell me what you have in mind today: skincare, makeup, an evening wind-down or your hair.`,
            )
          : I(
              `Hello, lovely to see you. Tell me what you have in mind today: skincare, an evening wind-down or your hair.`,
            ),""")
p("ld-irritation", """          `If you're noticing irritation, swelling or pain, pause any new products and check in with a dermatologist or pharmacist. Here is a gentle, simple routine in the meantime.`,
        )""", """          I(
            `If you're noticing irritation, swelling or pain, pause any new products and check in with a dermatologist or pharmacist. Here is a gentle, simple routine in the meantime.`,
          ),
        )""")
p("ld-start", """          `Let's make a little space for you. Here's a starting point for ${o.title.toLowerCase()}, about ${c}.`,""",
  """          I(
            `Let's make a little space for you. Here's a starting point for {title}, about {time}.`,
            { title: __lc(I(o.title)), time: __min(c) },
          ),""")
p("ld-hair", """        ? l.push(`I've kept your ${d} hair in mind.`)""",
  """        ? l.push(I(`I've kept your {hair} hair in mind.`, { hair: __lc(d) }))""")
p("ld-hair-d", """      d = [n[`Hair type`], n[`Hair color`]]
        .map((e) => e?.trim())
        .filter(Boolean)""", """      d = [n[`Hair type`], n[`Hair color`]]
        .map((e) => e?.trim())
        .filter(Boolean)
        .map((e) => I(e))""")
p("ld-skin", """            `Since you shared that your skin is ${u.toLowerCase()}, keep textures comfortable for you.`,""",
  """            I(
              `Since you shared that your skin is {skin}, keep textures comfortable for you.`,
              { skin: __lc(I(u)) },
            ),""")
p("ld-bag", """          `From your beauty bag, ${cd(e.slice(0, 3).map((e) => `${e.brand} ${e.name}`))} ${e.length === 1 ? `fits` : `fit`} right in.`,""",
  """          I(
            e.length === 1
              ? `From your beauty bag, {items} fits right in.`
              : `From your beauty bag, {items} fit right in.`,
            { items: cd(e.slice(0, 3).map((e) => `${e.brand} ${e.name}`)) },
          ),""")
p("ld-tone", """        t
          ? `For two tones like ${f.toLowerCase()} and ${t.toLowerCase()}, many people match base makeup to the larger area and spot-blend a second shade where needed.`
          : `For ${f.toLowerCase()} skin${e ? ` with a ${e.toLowerCase()} undertone` : ``}, look for shades named in that family and test along the jaw in daylight.`,""",
  """        t
          ? I(
              `For two tones like {a} and {b}, many people match base makeup to the larger area and spot-blend a second shade where needed.`,
              { a: __lc(I(f)), b: __lc(I(t)) },
            )
          : e
            ? I(
                `For {tone} skin with a {undertone} undertone, look for shades named in that family and test along the jaw in daylight.`,
                { tone: __lc(I(f)), undertone: __lc(I(e)) },
              )
            : I(
                `For {tone} skin, look for shades named in that family and test along the jaw in daylight.`,
                { tone: __lc(I(f)) },
              ),""")
p("ld-budget", """          n.Budget
            ? `A few ideas that suit your budget:`
            : `A few well-loved ideas, if you want something new:`,""", """          n.Budget
            ? I(`A few ideas that suit your budget:`)
            : I(`A few well-loved ideas, if you want something new:`),""")
p("ld-ff", """          `Where you add something new, look for fragrance-free formulas.`,
        ),""", """          I(`Where you add something new, look for fragrance-free formulas.`),
        ),""")
p("ld-quick", """      i.pace === `Quick & simple` && l.push(`I kept only the essentials.`),""",
  """      i.pace === `Quick & simple` && l.push(I(`I kept only the essentials.`)),""")
p("ld-detailed", """          `Open the ritual to go step by step and tick each one off as you go.`,
        ),
      l.push(`What would you like to adjust?`),""", """          I(`Open the ritual to go step by step and tick each one off as you go.`),
        ),
      l.push(I(`What would you like to adjust?`)),""")
p("ld-helpers", """  function ld(e) {""", """  function __lc(e) {
    let t = String(e ?? ``);
    if (O === `de`) return t;
    try {
      return t.toLocaleLowerCase(O);
    } catch {
      return t.toLowerCase();
    }
  }
  function __min(e) {
    return String(e ?? ``).replace(/(\\d+)\\s*min\\b/, (e, t) => I(`{n} min`, { n: t }));
  }
  function ld(e) {""")
p("note-i18n", """                                              (0, R.jsx)(`p`, {
                                                className: `assistant-note`,
                                                children: e.note,
                                              }),""", """                                              (0, R.jsx)(`p`, {
                                                className: `assistant-note`,
                                                children: I(e.note),
                                              }),""")
p("example-local", """              text: `A little ritual, just for you. Here is the routine from this example beauty session.`,
              routineId: r.id,""", """              text: `A little ritual, just for you. Here is the routine from this example beauty session.`,
              routineId: r.id,
              local: !0,""")
# Örnek yanıt beklemesi: 650 ms yerine daha çevik
p("sample-delay", """            Kt(!1),
            zt.readAloud && Ro(n.text, zt.voiceStyle);
        }, 650);""", """            Kt(!1),
            zt.readAloud && Ro(n.text, zt.voiceStyle);
        }, 420);""")

# ---------------------------------------------------------------- uygula
out = src
for name, old, new in P:
    n = out.count(old)
    if n != 1:
        sys.exit(f"YAMA BAŞARISIZ: {name} ({n} eşleşme)")
    out = out.replace(old, new)
MEMO = []
for name, old, new in MEMO:
    n = out.count(old)
    if n != 1:
        sys.exit(f"YAMA BAŞARISIZ: {name} ({n} eşleşme)")
    out = out.replace(old, new)
open(sys.argv[2], "w", encoding="utf-8").write(out)
print(f"{len(P) + len(MEMO)} yama uygulandı")
