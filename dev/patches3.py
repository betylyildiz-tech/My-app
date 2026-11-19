# Üçüncü tur: varsayılan İngilizce, profilde yüz taraması.
# patches.py içinden exec ile çalıştırılır.

# Varsayılan dil İngilizce (kayıtlı tercih varsa o kullanılır)
p("lang-default-en", """Te(sl(o?.preferences?.language) ? o.preferences.language : ll()),""",
  """Te(sl(o?.preferences?.language) ? o.preferences.language : `en`),""")

# Fotoğraf analizine isteğe bağlı not (yüz taraması cilt odaklı bir istekle gönderir)
p("bn-note-sig", """    async function bn(e) {
      let t = e ?? f;""", """    async function bn(e, __note) {
      let t = e ?? f;""")
p("bn-note-use", """      let n = tl(m, J.profileNote),""", """      let n = tl(__note ?? m, J.profileNote),""")

FACESCAN_JS = r'''  function __FaceScan({ live: e, onClose: t, onCapture: n, onSettings: r }) {
    let [i, a] = (0, y.useState)(`starting`),
      o = (0, y.useRef)(null),
      s = (0, y.useRef)(null),
      c = (0, y.useRef)(null),
      l = () => {
        s.current && (s.current.getTracks().forEach((e) => e.stop()), (s.current = null));
      };
    (0, y.useEffect)(() => {
      let e = !0;
      return (
        navigator.mediaDevices?.getUserMedia
          ? navigator.mediaDevices
              .getUserMedia({
                video: { facingMode: `user`, width: { ideal: 1280 }, height: { ideal: 1280 } },
                audio: !1,
              })
              .then((t) => {
                if (!e) {
                  t.getTracks().forEach((e) => e.stop());
                  return;
                }
                (s.current = t),
                  o.current && ((o.current.srcObject = t), o.current.play().catch(() => {})),
                  a(`live`);
              })
              .catch(() => e && a(`fallback`))
          : a(`fallback`),
        () => {
          (e = !1), l();
        }
      );
    }, []);
    let u = (t) => {
        if (t) {
          if ((l(), !e)) {
            a(`nolive`);
            return;
          }
          a(`sending`), window.setTimeout(() => n(t), 260);
        }
      },
      d = () => {
        let e = o.current;
        if (!e || !e.videoWidth) {
          c.current?.click();
          return;
        }
        let t = Math.min(1, 1280 / Math.max(e.videoWidth, e.videoHeight)),
          n = document.createElement(`canvas`);
        (n.width = Math.round(e.videoWidth * t)),
          (n.height = Math.round(e.videoHeight * t)),
          n.getContext(`2d`)?.drawImage(e, 0, 0, n.width, n.height),
          __thump(),
          a(`flash`),
          n.toBlob((e) => u(e), `image/jpeg`, 0.9);
      },
      f = i === `live` || i === `flash` || i === `sending`;
    return (0, R.jsxs)(`div`, {
      className: `face-scan is-${i}`,
      role: `dialog`,
      "aria-modal": `true`,
      "aria-label": I(`Skin scan`),
      children: [
        (0, R.jsx)(`video`, {
          ref: o,
          className: `face-scan-video`,
          playsInline: !0,
          muted: !0,
          autoPlay: !0,
        }),
        (0, R.jsx)(`div`, { className: `face-scan-shade`, "aria-hidden": `true` }),
        (0, R.jsxs)(`div`, {
          className: `face-scan-guide`,
          "aria-hidden": `true`,
          children: [
            (0, R.jsx)(`span`, { className: `face-scan-oval` }),
            (0, R.jsx)(`span`, { className: `face-scan-sweep` }),
          ],
        }),
        (0, R.jsxs)(`div`, {
          className: `face-scan-top`,
          children: [
            (0, R.jsx)(q, {
              variant: `ghost`,
              size: `icon`,
              className: `face-scan-close`,
              "aria-label": I(`Close window`),
              onClick: () => {
                l(), t();
              },
              children: (0, R.jsx)(No, {}),
            }),
            (0, R.jsx)(`strong`, { children: I(`Skin scan`) }),
            (0, R.jsx)(`span`, { className: `face-scan-spacer` }),
          ],
        }),
        (0, R.jsxs)(`div`, {
          className: `face-scan-bottom`,
          children: [
            i === `nolive`
              ? (0, R.jsxs)(`div`, {
                  className: `face-scan-card`,
                  children: [
                    (0, R.jsx)(`strong`, { children: I(`Connect Claude to analyse your photo`) }),
                    (0, R.jsx)(`p`, {
                      children: I(
                        `Photo analysis needs a live connection. Add your Claude key in Settings, then scan again.`,
                      ),
                    }),
                    (0, R.jsxs)(`div`, {
                      className: `face-scan-actions`,
                      children: [
                        (0, R.jsx)(q, { onClick: r, children: I(`Open Settings`) }),
                        (0, R.jsx)(q, { variant: `ghost`, onClick: t, children: I(`Close`) }),
                      ],
                    }),
                  ],
                })
              : (0, R.jsxs)(R.Fragment, {
                  children: [
                    (0, R.jsx)(`p`, {
                      className: `face-scan-hint`,
                      children:
                        i === `fallback`
                          ? I(`The camera isn't available here. Choose a photo instead.`)
                          : i === `sending`
                            ? I(`Looking closely…`)
                            : I(`Face the camera in soft, even light.`),
                    }),
                    (0, R.jsxs)(`div`, {
                      className: `face-scan-controls`,
                      children: [
                        (0, R.jsx)(`button`, {
                          type: `button`,
                          className: `face-scan-pick`,
                          onClick: () => c.current?.click(),
                          children: I(`Choose photo`),
                        }),
                        (0, R.jsx)(`button`, {
                          type: `button`,
                          className: `face-scan-shutter`,
                          "aria-label": I(`Take photo`),
                          disabled: !f || i !== `live`,
                          onClick: d,
                          children: (0, R.jsx)(`i`, {}),
                        }),
                        (0, R.jsx)(`span`, { className: `face-scan-pick is-ghost`, "aria-hidden": `true` }),
                      ],
                    }),
                  ],
                }),
            (0, R.jsx)(`input`, {
              ref: c,
              type: `file`,
              accept: `image/*`,
              capture: `user`,
              className: `sr-only`,
              tabIndex: -1,
              "aria-hidden": `true`,
              onChange: (e) => {
                let t = e.target.files?.[0];
                (e.target.value = ``), t && t.type.startsWith(`image/`) && (__thump(), u(t));
              },
            }),
          ],
        }),
      ],
    });
  }
'''
p("facescan-comp", """  var __adornMk = !0,""", FACESCAN_JS + """  var __adornMk = !0,""")

# Profil: ad alanının altında "Cildini tara" satırı
p("facescan-entry", """        i &&
          (0, R.jsx)(wl, {
            title: o(`profile.face`),""", """        (0, R.jsxs)(`button`, {
          type: `button`,
          className: `face-scan-entry`,
          onClick: () => window.dispatchEvent(new CustomEvent(`adorn:facescan`)),
          children: [
            (0, R.jsx)(`span`, {
              className: `face-scan-entry-icon`,
              children: (0, R.jsx)(yc, { name: `camera` }),
            }),
            (0, R.jsxs)(`span`, {
              className: `face-scan-entry-text`,
              children: [
                (0, R.jsx)(`strong`, { children: I(`Scan your skin`) }),
                (0, R.jsx)(`small`, {
                  children: I(`Show Adorn your skin or makeup for a closer look.`),
                }),
              ],
            }),
            (0, R.jsx)(mo, { className: `face-scan-entry-chevron`, "aria-hidden": `true` }),
          ],
        }),
        i &&
          (0, R.jsx)(wl, {
            title: o(`profile.face`),""")

# Uygulama: tarama durumu, olay dinleyici ve görünüm
p("facescan-state", """      [__wlOpen, __wl] = (0, y.useState)(!1),""", """      [__wlOpen, __wl] = (0, y.useState)(!1),
      [__fsOpen, __fs] = (0, y.useState)(!1),""")
p("facescan-listen", """    let tn = s.reset;""", """    (0, y.useEffect)(() => {
      let e = () => {
        We(null), window.setTimeout(() => __fs(!0), 120);
      };
      return (
        window.addEventListener(`adorn:facescan`, e),
        () => window.removeEventListener(`adorn:facescan`, e)
      );
    }, []);
    let tn = s.reset;""")
p("facescan-render", """              __wlOpen &&
                !je &&""", """              __fsOpen &&
                (0, R.jsx)(__FaceScan, {
                  live: ln && x,
                  onClose: () => {
                    __fs(!1), rn(`profile`);
                  },
                  onSettings: () => {
                    __fs(!1), rn(`settings`);
                  },
                  onCapture: (e) => {
                    __fs(!1),
                      We(null),
                      bn(
                        e,
                        I(
                          `Please look at my skin in this photo. Tell me what you can see, such as breakouts, redness, dryness, texture or dark spots. If I'm wearing makeup, give me feedback on it too. Then suggest a simple routine.`,
                        ),
                      );
                  },
                }),
              __wlOpen &&
                !je &&""")
