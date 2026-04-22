/**
 * Globalny język strony (PL / EN): localStorage + pływający przełącznik.
 * Wymaga na stronie stylów .btn (jak w pozostałych plikach HTML).
 */
(function () {
  var KEY = "portfolioLang";

  window.PORTFOLIO_I18N = {
    pl: {
      langGroupAria: "Język strony",
      metaDescIndex:
        "Andrzej Ratajczyk — linoryt i malarstwo. Wejście do portfolio.",
      titleIndex: "Andrzej Ratajczyk — Linoryt & malarstwo",
      landingNavAria: "Bio i social media",
      navBio: "Bio",
      navContact: "Kontakt",
      ctaGraphics: "Grafika",
      ctaPainting: "Malarstwo",
      altGraphic: "Linoryt",
      altPainting: "Malarstwo",
      metaDescKatalog: "Andrzej Ratajczyk — portfolio: linoryt i malarstwo.",
      titleKatalog: "Andrzej Ratajczyk — Portfolio",
      catalogNavAria: "Nawigacja witryny",
      catalogHome: "Strona główna",
      catalogHomeAria: "Strona główna witryny",
      tabsAria: "Widok portfolio",
      tabGraphics: "Grafika",
      tabPainting: "Malarstwo",
      emptyGrid: "Brak wyników.",
      lightboxClose: "Zamknij",
      lightboxAria: "Powiększenie pracy",
      paintingOutLink: "Strona malarstwa",
      cardFooterLink: "Karta pracy",
      paintingMedium: "Olej na płótnie",
      footerKatalog1: "Miniatury grafiki i malarstwa pochodzą z pliku danych portfolio (podgląd w tej witrynie).",
      footerKatalog2: "Pełne rozdzielczości i opisy przy poszczególnych pozycjach na stronie źródłowej.",
      metaDescKontakt: "Andrzej Ratajczyk — kontakt i social media.",
      titleKontakt: "Andrzej Ratajczyk — Kontakt",
      kontaktNavAria: "Nawigacja",
      kontaktBack: "Powrót do portfolio",
      kontaktCatalog: "Portfolio",
      kontaktBio: "Bio",
      kontaktH1: "Kontakt",
      kontaktLead:
        "Zapytania o prace, wystawy i reprodukcje można kierować przez e-mail (poniżej) oraz profile społecznościowe.",
      kontaktEmailH2: "E-mail",
      kontaktWrite: "Napisz wiadomość",
      kontaktSocialH2: "Social media",
      metaDescBio: "Andrzej Ratajczyk — biografia, wystawy i osiągnięcia.",
      titleBio: "Andrzej Ratajczyk — Biografia",
      bioNavAria: "Nawigacja",
      bioBack: "Powrót do portfolio",
      bioCatalog: "Portfolio",
      bioContact: "Kontakt",
      footerBio: "Andrzej Ratajczyk — biografia.",
    },
    en: {
      langGroupAria: "Site language",
      metaDescIndex: "Andrzej Ratajczyk — linocut and painting. Portfolio entry.",
      titleIndex: "Andrzej Ratajczyk — Linocut & painting",
      landingNavAria: "Bio and social media",
      navBio: "Bio",
      navContact: "Contact",
      ctaGraphics: "Graphics",
      ctaPainting: "Painting",
      altGraphic: "Linocut",
      altPainting: "Painting",
      metaDescKatalog: "Andrzej Ratajczyk — portfolio: linocut and painting.",
      titleKatalog: "Andrzej Ratajczyk — Portfolio",
      catalogNavAria: "Site navigation",
      catalogHome: "Home",
      catalogHomeAria: "Site home page",
      tabsAria: "Portfolio view",
      tabGraphics: "Graphics",
      tabPainting: "Painting",
      emptyGrid: "No results.",
      lightboxClose: "Close",
      lightboxAria: "Enlarged artwork",
      paintingOutLink: "Painting gallery page",
      cardFooterLink: "Work page",
      paintingMedium: "Oil on canvas",
      footerKatalog1: "Thumbnails come from the portfolio data file (preview on this site).",
      footerKatalog2: "Full resolutions and descriptions are provided on the source page for each item.",
      metaDescKontakt: "Andrzej Ratajczyk — contact and social media.",
      titleKontakt: "Andrzej Ratajczyk — Contact",
      kontaktNavAria: "Navigation",
      kontaktBack: "Back to portfolio",
      kontaktCatalog: "Portfolio",
      kontaktBio: "Bio",
      kontaktH1: "Contact",
      kontaktLead:
        "Questions about works, exhibitions and reproductions: e-mail (below) or social profiles.",
      kontaktEmailH2: "E-mail",
      kontaktWrite: "Write a message",
      kontaktSocialH2: "Social media",
      metaDescBio: "Andrzej Ratajczyk — biography, exhibitions and achievements.",
      titleBio: "Andrzej Ratajczyk — Biography",
      bioNavAria: "Navigation",
      bioBack: "Back to portfolio",
      bioCatalog: "Portfolio",
      bioContact: "Contact",
      footerBio: "Andrzej Ratajczyk — biography.",
    },
  };

  function get() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "en" ? "en" : "pl";
    } catch (_) {
      return "pl";
    }
  }

  function set(lang) {
    var l = lang === "en" ? "en" : "pl";
    try {
      localStorage.setItem(KEY, l);
    } catch (_) {}
    if (document.documentElement) document.documentElement.lang = l;
    syncAll();
    try {
      window.dispatchEvent(new CustomEvent("portfoliolangchange", { detail: l }));
    } catch (_) {}
  }

  window.portfolioT = function (key) {
    var lang = get();
    var d = window.PORTFOLIO_I18N;
    if (!d || !d[lang]) return key;
    if (d[lang][key] != null) return d[lang][key];
    if (d.pl && d.pl[key] != null) return d.pl[key];
    return key;
  };

  function injectChromeOnce() {
    if (document.getElementById("site-lang-switch")) return;
    if (!document.body) return;

    var css =
      "#site-lang-switch.site-lang{position:fixed;top:0.75rem;right:clamp(0.65rem,2.5vw,1.25rem);z-index:50;display:flex;gap:0.35rem;align-items:center}" +
      "#site-lang-switch.site-lang .btn{padding:0.42rem 0.72rem;min-width:2.35rem;justify-content:center}" +
      "#site-lang-switch .lang-switch__btn.is-active{box-shadow:inset 0 0 0 1px rgba(255,255,255,0.72);color:#fff}";

    var st = document.createElement("style");
    st.setAttribute("data-portfolio-lang", "");
    st.textContent = css;
    document.head.appendChild(st);

    var wrap = document.createElement("div");
    wrap.id = "site-lang-switch";
    wrap.className = "site-lang";
    wrap.setAttribute("role", "group");
    wrap.innerHTML =
      '<button type="button" class="btn btn--ghost lang-switch__btn" data-lang="pl" aria-pressed="false">PL</button>' +
      '<button type="button" class="btn btn--ghost lang-switch__btn" data-lang="en" aria-pressed="false">EN</button>';
    document.body.appendChild(wrap);

    wrap.addEventListener("click", function (e) {
      var b = e.target && e.target.closest && e.target.closest(".lang-switch__btn[data-lang]");
      if (!b || !wrap.contains(b)) return;
      set(b.getAttribute("data-lang") || "pl");
    });
  }

  function syncLangButtons() {
    var cur = get();
    var label = window.portfolioT("langGroupAria");
    var wrap = document.getElementById("site-lang-switch");
    if (wrap) wrap.setAttribute("aria-label", label);

    document.querySelectorAll(".lang-switch__btn[data-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === cur;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("is-active", on);
    });
  }

  function syncLangBlocks() {
    var cur = get();
    document.querySelectorAll("[data-lang-block]").forEach(function (el) {
      var b = el.getAttribute("data-lang-block");
      el.hidden = b !== cur;
    });
  }

  function applyDataI18n() {
    var cur = get();
    var t = window.PORTFOLIO_I18N && window.PORTFOLIO_I18N[cur];
    if (!t) return;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key && t[key] != null) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (key && t[key] != null) el.innerHTML = t[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (key && t[key] != null) el.setAttribute("placeholder", t[key]);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr");
      if (!spec) return;
      var parts = spec.split(":");
      var attr = parts[0];
      var key = parts.slice(1).join(":");
      if (attr && key && t[key] != null) el.setAttribute(attr, t[key]);
    });

    var page = document.body && document.body.getAttribute("data-page");
    if (page) {
      var titleMap = { index: "titleIndex", katalog: "titleKatalog", kontakt: "titleKontakt", bio: "titleBio" };
      var metaMap = { index: "metaDescIndex", katalog: "metaDescKatalog", kontakt: "metaDescKontakt", bio: "metaDescBio" };
      var tk = titleMap[page];
      var mk = metaMap[page];
      if (tk && t[tk]) document.title = t[tk];
      var meta = document.querySelector('meta[name="description"]');
      if (meta && mk && t[mk]) meta.setAttribute("content", t[mk]);
    }
  }

  function syncBioBodies() {
    var pl = document.getElementById("bio-content-pl");
    var en = document.getElementById("bio-content-en");
    if (!pl || !en) return;
    var cur = get();
    pl.hidden = cur !== "pl";
    en.hidden = cur !== "en";
  }

  function syncAll() {
    injectChromeOnce();
    syncLangButtons();
    syncLangBlocks();
    applyDataI18n();
    syncBioBodies();
    if (typeof window.__portfolioOnLangChange === "function") {
      try {
        window.__portfolioOnLangChange();
      } catch (e) {}
    }
  }

  function onStorage(e) {
    if (e.key === KEY) syncAll();
  }

  function init() {
    if (window.__portfolioLangInited) return;
    window.__portfolioLangInited = true;
    injectChromeOnce();
    if (document.documentElement) document.documentElement.lang = get();
    syncAll();
    window.addEventListener("storage", onStorage);
  }

  window.portfolioLang = { get: get, set: set, sync: syncAll, KEY: KEY };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
