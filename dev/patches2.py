# İkinci tur yamalar: seri programları, alev halkası, şarj olan görevler, Claude ayarı, titreşim.
# patches.py'nin sonunda exec ile çalıştırılır; p(ad, eski, yeni) ile yama ekler.

PROGRAMS_JS = r'''  var __adornProgs = {
    acne: {
      am: [`Morning ritual`, `Gentle gel cleanse, light moisturiser, SPF.`],
      pm: [`Night ritual`, `Cleanse, care for spots where needed, moisturise.`],
      days: [
        [`Hands off`, `Notice how often you touch your face today.`, `How do I handle a spot without making it worse?`],
        [`Pillowcase swap`, `Put on a fresh pillowcase tonight.`, `Which small habits help most against breakouts?`],
        [`Salicylic acid`, `Learn how a BHA clears the inside of the pore.`, `Would a BHA suit my skin, and how often should I use it?`],
        [`Non-clogging moisturiser`, `Check that your moisturiser is labelled non-comedogenic.`, `Which light moisturiser would you pick for breakout-prone skin?`],
        [`Phone screen`, `Wipe your phone screen; it touches your cheek every day.`, `What else touches my face that I might be missing?`],
        [`Patch first`, `Test any new product behind the ear for two days.`, `How do I introduce a new product safely?`],
        [`Marks, not spots`, `Learn the difference between a breakout and the mark it leaves.`, `How can I fade the marks breakouts leave behind?`],
        [`Rinse after sweat`, `Rinse your face soon after you sweat.`, `How should I care for my skin after a workout?`],
        [`Niacinamide`, `See how niacinamide helps with oil and redness.`, `Should I add niacinamide to my routine?`],
        [`When to see a pro`, `Deep, painful or lasting breakouts deserve a dermatologist.`, `How do I know if I should see a dermatologist?`],
      ],
    },
    glass: {
      am: [`Morning ritual`, `Hydrating cleanse, layered moisture, SPF.`],
      pm: [`Night ritual`, `Gentle cleanse, hydrating layers, seal it all in.`],
      days: [
        [`Layer thin to thick`, `Apply hydrating layers from the thinnest to the richest.`, `How should I layer my hydrating products?`],
        [`Damp skin`, `Apply serum while skin is still damp so it holds more water.`, `Which hydrating serum would suit my skin?`],
        [`Gentle smoothing`, `Smooth texture with a mild exfoliant once or twice a week.`, `Which gentle exfoliant would you pick for me?`],
        [`Seal it in`, `Finish tonight with a richer layer to lock in moisture.`, `What can I use as a sleeping mask?`],
        [`Daily SPF`, `Sunscreen keeps your tone even and your glow clear.`, `Which sunscreen gives a glowy finish without white cast?`],
        [`Water and sleep`, `Drink water through the day and aim for seven hours of sleep.`, `Which habits make the biggest difference to a glow?`],
        [`One-minute massage`, `Massage your moisturiser in for a full minute.`, `How do I do a simple facial massage?`],
        [`Barrier check`, `Tight or stinging skin means it is time to simplify for a few days.`, `How do I know if my skin barrier is damaged?`],
        [`Hydrating toner`, `Press a hydrating toner in with your palms.`, `Do I need a toner, and which one?`],
        [`Glow check`, `Look at your skin in daylight: what has changed?`, `What should I adjust in my routine next?`],
      ],
    },
    calm: {
      am: [`Morning ritual`, `Lukewarm rinse, soothing moisturiser, mineral SPF.`],
      pm: [`Night ritual`, `Gentle cleanse and a calming barrier cream.`],
      days: [
        [`Fewer products`, `Keep only a cleanser, a moisturiser and SPF for now.`, `What is the simplest routine for sensitive skin?`],
        [`Lukewarm water`, `Use lukewarm water; hot water leaves skin redder.`, `Why does my skin turn red after washing?`],
        [`Fragrance check`, `Look for fragrance on the labels of what you use.`, `Which products are gentle and fragrance-free?`],
        [`Pat, don't rub`, `Pat your face dry with a soft towel.`, `How can I stop irritating my skin by accident?`],
        [`Barrier cream`, `Learn what ceramides and panthenol do for calm skin.`, `Which barrier cream would you recommend for me?`],
        [`Mineral SPF`, `Mineral sunscreens are often kinder to sensitive skin.`, `Which sunscreen suits sensitive skin?`],
        [`One change at a time`, `Add only one new product a week.`, `How should I add a new product safely?`],
        [`Triggers`, `Note what was different on days your skin flared.`, `What commonly triggers redness?`],
        [`Cool down`, `A cool compress soothes a flare.`, `What should I do when my skin flares up?`],
        [`When to see a pro`, `Lasting redness or burning deserves a dermatologist.`, `When should I see a dermatologist about redness?`],
      ],
    },
    hair: {
      am: [`Morning hair care`, `Detangle gently and protect from heat.`],
      pm: [`Night hair care`, `A loose style and a satin pillowcase.`],
      days: [
        [`Scalp massage`, `Massage your scalp with your fingertips for a minute.`, `Does scalp massage really help my hair?`],
        [`Conditioner on the ends`, `Apply conditioner to the lengths and ends, not the roots.`, `Which conditioner suits my hair type?`],
        [`Heat protection`, `Use a heat protectant before any hot tool.`, `Which heat protectant would you recommend?`],
        [`Wide-tooth comb`, `Detangle wet hair with a wide-tooth comb, ends first.`, `How do I detangle without breakage?`],
        [`Weekly mask`, `Give your lengths a nourishing mask this week.`, `Which hair mask would suit my hair?`],
        [`Wash rhythm`, `Find a wash rhythm that suits your scalp.`, `How often should I wash my hair?`],
        [`Gentle towel`, `Squeeze water out with a soft towel instead of rubbing.`, `How should I dry my hair to avoid frizz?`],
        [`Loose styles`, `Give your hairline a break from tight styles.`, `Which hairstyles are gentle on my hair?`],
        [`Trim check`, `Look at your ends: split ends mean a trim is due.`, `How often should I get a trim?`],
        [`Shine check`, `Look at your hair in daylight: what has changed?`, `What should I change in my hair routine next?`],
      ],
    },
  };
'''

p("progs-data", """  var __adornMk = !0,""", PROGRAMS_JS + """  var __adornMk = !0,""")

p("progs-meta", """  var $l = {
      skin: {""", """  var $l = {
      acne: {
        name: `Clear skin`,
        line: `Fewer breakouts and calmer skin, one small step a day.`,
      },
      glass: {
        name: `Glass skin`,
        line: `Deep hydration and a smooth, even glow.`,
      },
      calm: {
        name: `Calm sensitive skin`,
        line: `Less redness and stinging with a gentler routine.`,
      },
      hair: {
        name: `Stronger hair`,
        line: `A healthier scalp and smoother lengths.`,
      },
      skin: {""")

p("progs-ou", """  function ou(e, t, n) {
    let [r, i, a] = (e === `skin` ? tu : nu)[Math.min(Math.max(t, 1), 30) - 1],""", """  function ou(e, t, n) {
    let __p = __adornProgs[e];
    if (__p) {
      let [r, i, a] = __p.days[(Math.min(Math.max(t, 1), 30) - 1) % __p.days.length];
      return [
        { id: `morning`, kind: `morning`, title: __p.am[0], detail: __p.am[1] },
        { id: `lesson`, kind: `lesson`, title: r, detail: i, ask: a },
        { id: `night`, kind: `night`, title: __p.pm[0], detail: __p.pm[1] },
      ];
    }
    let [r, i, a] = (e === `skin` ? tu : nu)[Math.min(Math.max(t, 1), 30) - 1],""")

# Kayıtlı veride yeni program anahtarlarını kabul et
p("progs-load1", """    let t = e.goal === `skin` || e.goal === `makeup` ? e.goal : null;""",
  """    let t = typeof e.goal == `string` && e.goal in $l ? e.goal : null;""")
p("progs-load2", """            X(e) && (e.goal === `skin` || e.goal === `makeup`) && rl(e.finished)""",
  """            X(e) && typeof e.goal == `string` && e.goal in $l && rl(e.finished)""")

# Program seçici: genel "cilt" yerine belirli programlar; makyaj yalnızca makyaj yolunda
p("progs-picker", """              .filter((e) => __adornMk || e !== `makeup`)""",
  """              .filter((e) => e !== `skin` && (__adornMk || e !== `makeup`))""")
p("progs-icons", """                      children:
                        e === `skin` ? (0, R.jsx)(Do, {}) : (0, R.jsx)(wo, {}),""", """                      children:
                        e === `makeup`
                          ? (0, R.jsx)(wo, {})
                          : e === `hair`
                            ? (0, R.jsx)(yc, { name: `hair` })
                            : (0, R.jsx)(Do, {}),""")

# Daha zarif alev (seri çipi ve her yerde aynı bileşen)
p("flame-outer", """              d: `M32 4c3 9 13 15 15 27 2 12-5 25-15 25S15 46 17 35c1-7 6-10 7-17 4 4 5 8 5 12 3-6 4-15 3-26z`,""",
  """              d: `M32 5C36 15 47 21 47 36C47 47 40 57 32 57C24 57 17 47 17 37C17 29 22 25 25 18C27 23 29 26 31 27C33 20 33 12 32 5Z`,""")
p("flame-inner", """              d: `M32 28c2 6 8 9 8 17 0 6-4 10-8 10s-8-4-8-9c0-5 3-7 4-11 2 2 3 4 3 6 1-4 2-8 1-13z`,""",
  """              d: `M32 30C35 36 40 39 40 46C40 51 36.5 55 32 55C27.5 55 24 51 24 47C24 43 26.5 41 28 37C29.5 39 30.5 40.5 31.5 41C32.5 37 33 33.5 32 30Z`,""")

# ---------------------------------------------------------------- yeni bileşenler
COMPONENTS_JS = r'''  var __FLAME = `M32 5C36 15 47 21 47 36C47 47 40 57 32 57C24 57 17 47 17 37C17 29 22 25 25 18C27 23 29 26 31 27C33 20 33 12 32 5Z`,
    __WAVE = `M-64 0Q-56 -3 -48 0T-32 0T-16 0T0 0T16 0T32 0T48 0T64 0T80 0T96 0T112 0T128 0V80H-64Z`;
  function __thump() {
    try {
      if (typeof navigator < `u` && typeof navigator.vibrate == `function`) {
        navigator.vibrate(22);
        return;
      }
      eo();
    } catch {}
  }
  function __FlameRing({ progress: e, today: t, streak: n }) {
    let r = 2 * Math.PI * 104,
      i = Math.max(0, Math.min(1, t)),
      a = 58 - i * 56;
    return (0, R.jsxs)(`div`, {
      className: `flame-ring ${i >= 1 ? `is-full` : ``} ${n > 0 ? `is-lit` : ``}`,
      children: [
        (0, R.jsxs)(`svg`, {
          viewBox: `0 0 240 240`,
          "aria-hidden": `true`,
          children: [
            (0, R.jsxs)(`defs`, {
              children: [
                (0, R.jsx)(`clipPath`, {
                  id: `fr-clip`,
                  children: (0, R.jsx)(`path`, { d: __FLAME }),
                }),
                (0, R.jsxs)(`linearGradient`, {
                  id: `fr-liquid`,
                  x1: `0`,
                  y1: `1`,
                  x2: `0`,
                  y2: `0`,
                  children: [
                    (0, R.jsx)(`stop`, { offset: `0`, stopColor: `var(--fr-deep)` }),
                    (0, R.jsx)(`stop`, { offset: `.6`, stopColor: `var(--fr-mid)` }),
                    (0, R.jsx)(`stop`, { offset: `1`, stopColor: `var(--fr-light)` }),
                  ],
                }),
                (0, R.jsxs)(`linearGradient`, {
                  id: `fr-arc`,
                  x1: `0`,
                  y1: `0`,
                  x2: `1`,
                  y2: `1`,
                  children: [
                    (0, R.jsx)(`stop`, { offset: `0`, stopColor: `var(--fr-light)` }),
                    (0, R.jsx)(`stop`, { offset: `1`, stopColor: `var(--fr-deep)` }),
                  ],
                }),
              ],
            }),
            (0, R.jsx)(`circle`, { cx: 120, cy: 120, r: 104, className: `fr-track` }),
            (0, R.jsx)(`circle`, {
              cx: 120,
              cy: 120,
              r: 104,
              className: `fr-arc`,
              style: { strokeDasharray: r, strokeDashoffset: r * (1 - Math.max(0, Math.min(1, e))) },
            }),
            (0, R.jsx)(`g`, {
              transform: `translate(68 26) scale(1.625)`,
              children: (0, R.jsxs)(`g`, {
                className: `fr-flame`,
                children: [
                  (0, R.jsx)(`path`, { d: __FLAME, className: `fr-shell` }),
                  (0, R.jsx)(`g`, {
                    clipPath: `url(#fr-clip)`,
                    children: (0, R.jsxs)(`g`, {
                      className: `fr-level`,
                      style: { transform: `translateY(${a}px)` },
                      children: [
                        (0, R.jsx)(`path`, { d: __WAVE, className: `fr-wave fr-wave-back` }),
                        (0, R.jsx)(`path`, { d: __WAVE, className: `fr-wave` }),
                      ],
                    }),
                  }),
                  (0, R.jsx)(`path`, { d: __FLAME, className: `fr-outline` }),
                ],
              }),
            }),
          ],
        }),
        (0, R.jsxs)(`div`, {
          className: `flame-ring-count`,
          children: [
            (0, R.jsx)(`strong`, { children: n }),
            (0, R.jsx)(`small`, { children: I(n === 1 ? `day` : `days`) }),
          ],
        }),
      ],
    });
  }
  function __ChargeTask({ task: e, icon: t, onCharge: n, onGone: r, onAsk: i, onLesson: a }) {
    let [o, s] = (0, y.useState)(`idle`),
      c = (0, y.useRef)(!1),
      l = (0, y.useRef)(`idle`);
    l.current = o;
    let u = () => {
        l.current === `charged` &&
          ((l.current = `leaving`),
          hp() ? r(e.id) : s(`leaving`));
      },
      __done = () => {
        l.current === `charging` &&
          (s(`charged`),
          (l.current = `charged`),
          __thump(),
          n(),
          c.current || window.setTimeout(u, 180));
      },
      d = () => {
        l.current === `idle` &&
          ((c.current = !0),
          s(`charging`),
          (l.current = `charging`),
          to(`tap`),
          hp() && window.setTimeout(__done, 120));
      },
      f = () => {
        (c.current = !1), u();
      };
    return (0, R.jsxs)(`li`, {
      className: `charge-task is-${o}`,
      role: `button`,
      tabIndex: 0,
      "aria-label": `${I(`Complete`)} ${I(e.title)}`,
      onPointerDown: d,
      onPointerUp: f,
      onPointerCancel: f,
      onPointerLeave: () => {
        c.current && f();
      },
      onKeyDown: (e) => {
        (e.key === `Enter` || e.key === ` `) &&
          (e.preventDefault(), d(), (c.current = !1));
      },
      onAnimationEnd: (e) => {
        e.target === e.currentTarget &&
          e.animationName === `adorn-leave` &&
          r(e.currentTarget.dataset.id);
      },
      "data-id": e.id,
      children: [
        (0, R.jsx)(`span`, {
          className: `charge-fill`,
          "aria-hidden": `true`,
          onAnimationEnd: (e) => {
            e.animationName === `adorn-charge` && __done();
          },
        }),
        (0, R.jsx)(`span`, { className: `charge-icon`, children: (0, R.jsx)(t, {}) }),
        (0, R.jsxs)(`span`, {
          className: `glow-task-text`,
          children: [
            (0, R.jsx)(`strong`, { children: I(e.title) }),
            (0, R.jsx)(`small`, { children: I(e.detail) }),
            e.lessonId && a
              ? (0, R.jsx)(q, {
                  variant: `ghost`,
                  size: `sm`,
                  className: `glow-ask`,
                  onPointerDown: (e) => e.stopPropagation(),
                  onClick: (t) => {
                    t.stopPropagation(), a(e.lessonId);
                  },
                  children: I(`Open lesson`),
                })
              : e.ask &&
                (0, R.jsx)(q, {
                  variant: `ghost`,
                  size: `sm`,
                  className: `glow-ask`,
                  onPointerDown: (e) => e.stopPropagation(),
                  onClick: (t) => {
                    t.stopPropagation(), i(e.ask);
                  },
                  children: I(`Ask Adorn`),
                }),
          ],
        }),
      ],
    });
  }
  function __ClaudeKey() {
    let e = () => {
        try {
          return localStorage.getItem(`adorn:claude-key`) || ``;
        } catch {
          return ``;
        }
      },
      [t] = (0, y.useState)(e),
      [n, r] = (0, y.useState)(``);
    return (0, R.jsxs)(`div`, {
      className: `settings-row claude-key`,
      children: [
        (0, R.jsxs)(`span`, {
          className: `settings-label`,
          children: [
            I(`Claude connection`),
            (0, R.jsx)(`small`, {
              children: t
                ? I(`Connected. Replies come from Claude.`)
                : I(`Paste an Anthropic API key to get live replies. It is stored only on this device.`),
            }),
          ],
        }),
        t
          ? (0, R.jsx)(q, {
              variant: `ghost`,
              size: `sm`,
              onClick: () => {
                try {
                  localStorage.removeItem(`adorn:claude-key`);
                } catch {}
                location.reload();
              },
              children: I(`Disconnect`),
            })
          : (0, R.jsxs)(`form`, {
              className: `claude-key-form`,
              onSubmit: (e) => {
                e.preventDefault();
                let t = n.trim();
                if (t) {
                  try {
                    localStorage.setItem(`adorn:claude-key`, t);
                  } catch {}
                  location.reload();
                }
              },
              children: [
                (0, R.jsx)(`input`, {
                  type: `password`,
                  autoComplete: `off`,
                  spellCheck: !1,
                  placeholder: `sk-ant-…`,
                  "aria-label": I(`API key`),
                  value: n,
                  onChange: (e) => r(e.target.value),
                }),
                (0, R.jsx)(q, { type: `submit`, size: `sm`, disabled: !n.trim(), children: I(`Connect`) }),
              ],
            }),
      ],
    });
  }
'''
p("components", """  var __adornMk = !0,""", COMPONENTS_JS + """  var __adornMk = !0,""")

# Ayarlar: Claude bağlantısı satırı (Rehberlik bölümünün başı)
p("settings-claude", """                                  (0, R.jsx)(`h3`, {
                                    children: L(`settings.guidance`),
                                  }),""", """                                  (0, R.jsx)(`h3`, {
                                    children: L(`settings.guidance`),
                                  }),
                                  (0, R.jsx)(__ClaudeKey, {}),""")

# Sohbet: gönderirken ve yanıt gelince tok bir dokunuş
p("chat-haptic-send", """      if (!t || Gt) return;
      if (
        (yt((e) => e || (ge ? `${ge}: ${t}` : t)),""", """      if (!t || Gt) return;
      if (
        (to(`tap`),
        yt((e) => e || (ge ? `${ge}: ${t}` : t)),""")
p("chat-haptic-live", """        mn(e, {
          text: n.text || `…`,""", """        __thump(),
        mn(e, {
          text: n.text || `…`,""")
p("chat-haptic-sample", """            Kt(!1),
            zt.readAloud && Ro(n.text, zt.voiceStyle);
        }, 420);""", """            Kt(!1),
            __thump(),
            zt.readAloud && Ro(n.text, zt.voiceStyle);
        }, 420);""")

# ---------------------------------------------------------------- seri: yeni ana görünüm
p("cu-gone-state", """    let [l, u] = (0, y.useState)(0),
      [d, f] = (0, y.useState)(!1),
      [p, m] = (0, y.useState)(Zl(s)),""", """    let [__gone, __setGone] = (0, y.useState)(
        () => new Set(e?.done?.[ru()] ?? []),
      ),
      [l, u] = (0, y.useState)(0),
      [d, f] = (0, y.useState)(!1),
      [p, m] = (0, y.useState)(Zl(s)),""")
_cs = src.index("    let C = su(e).length,")
_ce = src.index("  function wu({ course: e, done: t }) {")
OLD_CU = src[_cs:_ce]
NEW_CU = """    let C = su(e).length,
      w = lu(e),
      T = fu(e),
      { current: E, next: ee } = pu(C),
      __n = x.filter((t) => b.includes(t.id)).length;
    return (0, R.jsxs)(`div`, {
      className: `glow glow-v2`,
      children: [
        (0, R.jsxs)(`div`, {
          className: `glow-hero`,
          children: [
            (0, R.jsx)(__FlameRing, {
              progress: w,
              today: x.length ? __n / x.length : 0,
              streak: T,
            }),
            (0, R.jsxs)(`div`, {
              className: `glow-hero-meta`,
              children: [
                (0, R.jsx)(`span`, {
                  className: `glow-program`,
                  children: I($l[e.goal]?.name ?? ``),
                }),
                (0, R.jsx)(`strong`, {
                  className: `glow-rank-name`,
                  children: I(E.name),
                }),
                (0, R.jsx)(`small`, {
                  children: I(`Day {n} of 30`, { n: uu(e) }),
                }),
                ee &&
                  (0, R.jsx)(`small`, {
                    className: `glow-next`,
                    children: he(
                      ee.min - C,
                      `Next: {title} in {n} day`,
                      `Next: {title} in {n} days`,
                      { title: I(ee.name) },
                    ),
                  }),
                e.goalText &&
                  (0, R.jsxs)(`small`, {
                    className: `glow-goal-text`,
                    children: [I(`Goal:`), ` `, e.goalText],
                  }),
                w >= 1 &&
                  (0, R.jsxs)(q, {
                    size: `sm`,
                    className: `glow-link-btn`,
                    onClick: () => {
                      to(`success`), a();
                    },
                    children: [(0, R.jsx)(_o, {}), I(`Add to chain`)],
                  }),
              ],
            }),
          ],
        }),
        (0, R.jsxs)(`div`, {
          className: `glow-today`,
          children: [
            (0, R.jsxs)(`h3`, {
              children: [
                I(S ? `Today is done` : `Today`),
                (0, R.jsx)(`span`, {
                  className: `glow-dots`,
                  "aria-label": `${__n}/${x.length}`,
                  children: x.map((t) =>
                    (0, R.jsx)(
                      `i`,
                      { className: b.includes(t.id) ? `is-on` : `` },
                      t.id,
                    ),
                  ),
                }),
              ],
            }),
            (0, R.jsx)(`ul`, {
              className: `charge-list`,
              children: x
                .filter((t) => !(b.includes(t.id) && __gone.has(t.id)))
                .map((t) =>
                  (0, R.jsx)(
                    __ChargeTask,
                    {
                      task: t,
                      icon: gu[t.kind],
                      onCharge: () => {
                        b.includes(t.id) || n(t.id);
                      },
                      onGone: (e) =>
                        __setGone((t) => new Set(t).add(e)),
                      onAsk: r,
                      onLesson: c,
                    },
                    t.id,
                  ),
                ),
            }),
            S &&
              (0, R.jsx)(`p`, {
                className: `glow-done-note`,
                children: I(`See you tomorrow. Your flame is full.`),
              }),
          ],
        }),
        (0, R.jsx)(xu, { links: e.chain ?? [], progress: w }),
        (0, R.jsx)(`button`, {
          type: `button`,
          className: `glow-change`,
          onClick: i,
          children: I(`Change goal`),
        }),
      ],
    });
  }
"""
p("cu-main", OLD_CU, NEW_CU)
