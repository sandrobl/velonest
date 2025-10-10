// VeloNest site helpers: Klaro trigger + language sync
(function () {
  var LANG_KEY = 'velonest-lang';
  function detectBrowserLang() {
    try {
      var list = [];
      if (navigator.languages && navigator.languages.length) list = list.concat(navigator.languages);
      if (navigator.language) list.push(navigator.language);
      list = list.filter(Boolean).map(function (l) { return (l || '').slice(0, 2).toLowerCase(); });
      for (var i = 0; i < list.length; i++) {
        if (list[i] === 'de' || list[i] === 'en') return list[i];
      }
    } catch (e) {}
    return 'en';
  }

  function currentLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      return (stored === 'de' || stored === 'en') ? stored : (window.__VELONEST_LANG__ || detectBrowserLang());
    } catch (e) {
      return window.__VELONEST_LANG__ || 'en';
    }
  }

  // Ensure Klaro uses the same language as the site
  var lang = currentLang();
  try { document.documentElement.lang = lang; } catch (e) {}
  try { if (window.klaroConfig) { window.klaroConfig.lang = lang; } } catch (e) {}

  // Explicitly bind triggers for Klaro
  function bindKlaroTriggers() {
    var triggers = document.querySelectorAll('[data-klaro="show"]');
    triggers.forEach(function (el) {
      if (el.__klaroBound) return;
      el.__klaroBound = true;
      el.addEventListener('click', function (e) {
        e.preventDefault();
        try {
          if (window.klaro && typeof window.klaro.show === 'function') {
            var modal = el.hasAttribute('data-klaro-modal');
            window.klaro.show(window.klaroConfig, modal);
          } else {
            // Fallback: toggle the notice element if Klaro hasn’t exposed show()
            var root = document.getElementById((window.klaroConfig && window.klaroConfig.elementID) || 'klaro');
            if (root) root.classList.toggle('cn-activated');
          }
        } catch (err) {
          // no-op
        }
      });
    });
  }

  function syncKlaroLangOnToggle() {
    try {
      document.querySelectorAll('.language-button').forEach(function(btn){
        btn.addEventListener('click', function(){
          var newLang = (btn && btn.dataset && btn.dataset.lang) ? btn.dataset.lang : null;
          if (newLang && (newLang==='de' || newLang==='en')) {
            try { document.documentElement.lang = newLang; } catch (e) {}
            try { if (window.klaroConfig) window.klaroConfig.lang = newLang; } catch (e) {}
            try { localStorage.setItem(LANG_KEY, newLang); } catch (e) {}
          }
        });
      });
    } catch (e) {}
  }

  function init() {
    bindKlaroTriggers();
    syncKlaroLangOnToggle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
