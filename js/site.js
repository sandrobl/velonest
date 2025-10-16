// Minimal site helper: set language based on browser
(function () {
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

  function setLangFromBrowser() {
    var lang = detectBrowserLang();
    try { document.documentElement.lang = lang; } catch (e) {}
    try { window.__VELONEST_LANG__ = lang; } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setLangFromBrowser);
  else setLangFromBrowser();
})();
