/**
 * lang-switch.js — Bilingual (EN/中文) language manager for the Qisong Zhang academic homepage.
 * Adapted from the Spatialfolio i18n.js implementation (Gemini-Spatialfolio).
 *
 * Mechanism:
 *  - Rich HTML blocks: paired `.lang-en` / `.lang-zh` containers, visibility driven by
 *    the `lang-zh` class on <html> (see home.css). CSS handles the swap — no innerHTML rewriting.
 *  - Short strings: elements carrying data-i18n-en / data-i18n-zh attributes get their
 *    innerHTML swapped by apply().
 *  - State: localStorage 'wowpage_lang'; default follows the browser language.
 *  - A pre-paint inline script in _includes/head/custom.html sets the <html> class before
 *    first paint, so there is no flash of the wrong language.
 */
(function () {
  const STORAGE_KEY = 'wowpage_lang';
  const TITLES = {
    en: 'Qisong Zhang — CV/AIGC Researcher | BUPT & TeleAI',
    zh: '张启淞 — CV/AIGC 研究员 | 北京邮电大学 & 中国电信 TeleAI'
  };

  function getInitialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
    return (navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
  }

  let currentLang = getInitialLang();

  function apply() {
    document.documentElement.classList.toggle('lang-zh-active', currentLang === 'zh');
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    document.title = TITLES[currentLang];

    // Short strings via data-i18n attributes (skip elements with empty values).
    const els = document.querySelectorAll('[data-i18n-en], [data-i18n-zh]');
    els.forEach(function (el) {
      const enText = el.getAttribute('data-i18n-en');
      const zhText = el.getAttribute('data-i18n-zh');
      if (currentLang === 'zh' && zhText) {
        el.innerHTML = zhText;
      } else if (currentLang === 'en' && enText) {
        el.innerHTML = enText;
      }
    });

    updateToggleButtons();
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'zh') return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    apply();
  }

  function getLang() {
    return currentLang;
  }

  function updateToggleButtons() {
    const btns = document.querySelectorAll('.lang-btn');
    btns.forEach(function (btn) {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === currentLang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  function initToggle() {
    const containers = document.querySelectorAll('.lang-switch-container');
    containers.forEach(function (container) {
      container.innerHTML =
        '<div class="lang-switch" role="group" aria-label="Language Toggle">' +
        '<button class="lang-btn pub-button" data-lang="en" aria-pressed="' + (currentLang === 'en') + '">EN</button>' +
        '<button class="lang-btn pub-button" data-lang="zh" aria-pressed="' + (currentLang === 'zh') + '">中文</button>' +
        '</div>';
    });

    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.lang-btn');
      if (btn) {
        const lang = btn.getAttribute('data-lang');
        if (lang) setLang(lang);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initToggle();
    apply();
  });

  window.i18n = {
    getLang: getLang,
    setLang: setLang,
    apply: apply
  };
})();
