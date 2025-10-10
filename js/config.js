var klaroConfig = {
    // Follow site language (set by early bootstrap or pages). Fallback: 'en'.
    lang: (function(){ try { return (window.__VELONEST_LANG__ || (document && document.documentElement && document.documentElement.lang) || 'en'); } catch(e) { return 'en'; } })(),
    version: 1,
    elementID: 'klaro',
    styling: { theme: ['light', 'top', 'wide'] },
    showDescriptionEmptyStore: true,
    noAutoLoad: false,
    htmlTexts: true,
    embedded: false,
    groupByPurpose: true,
    autoFocus: false,
    showNoticeTitle: false,
    storageMethod: 'cookie',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 365,
    // cookieDomain: '.yourdomain.tld',
    // cookiePath: '/',
    default: true,           // ✅ Standard = aus (rechtssicheres Opt-in)
    mustConsent: false,       // Modal nicht erzwingen (kann Conversion drücken)
    acceptAll: false,          // ✅ „Alle akzeptieren“ zeigen
    hideDeclineAll: false,    // „Nur notwendige“ Option bleibt sichtbar
    hideLearnMore: false,
    noticeAsModal: true,

    translations: {
        zz: { privacyPolicyUrl: '/datenschutz.html' }, // Fallback
        de: {
            privacyPolicyUrl: '/datenschutz.html',
            consentNotice: {
                // Kurzer, klarer Elevator Pitch – HTML erlaubt
                description: 'Wir verwenden <b>selbst gehostetes Matomo</b>, um die App zu verbessern: Fehler finden, Ladezeiten messen und Features priorisieren. <br>Keine Werbung, keine Weitergabe an Dritte. Sie können Ihre Auswahl jederzeit in den <a href="#" data-klaro="show" data-klaro-modal="1">Einstellungen</a> ändern.',
                learnMore: 'Einstellungen',
                ok: 'Nur notwendige laden',
                acceptAll: 'Alle akzeptieren',
            },
            consentModal: {
                title: 'Datenschutz & Analyse',
                description: 'Mit Ihrer Zustimmung helfen Sie uns, <b>Probleme schneller zu finden</b> und <b>die App gezielt zu verbessern</b>. Wir nutzen <b>Matomo</b> auf unseren eigenen Servern (kein Drittanbieter-Werbetracking). Sie können Ihre Einwilligung jederzeit widerrufen.',
            },
            purposes: {
                analytics: 'Nutzungsanalyse (Matomo)',
            },
            matomo: {
                title: 'Matomo (Self-Hosted)',
                description: 'Anonyme Nutzungsstatistiken zur Verbesserung der App. Keine Werbung, keine Weitergabe. Datenverarbeitung auf unseren Servern in Deutschland/EU*.',
            },
            ok: 'Tracking zulassen',
            save: 'Auswahl speichern',
            acceptAll: 'Alle akzeptieren',
            decline: 'Kein Tracking',
        },
        en: {
            privacyPolicyUrl: '/privacy',
            consentNotice: {
                description: 'We use <b>self-hosted Matomo</b> to improve the app: find bugs, measure performance, and prioritize features. <br>No ads, no data resale. You can change your choice anytime in the <a href="#" data-klaro="show" data-klaro-modal="1">settings</a>.',
                learnMore: 'Settings',
                ok: 'Only necessary',
                acceptAll: 'Accept all',
            },
            consentModal: {
                title: 'Privacy & Analytics',
                description: 'With your consent you help us <b>find issues faster</b> and <b>improve the app</b>. We use <b>Matomo</b> on our own servers (no third-party ad tracking). You can withdraw consent at any time.',
            },
            purposes: {
                analytics: 'Usage analytics (Matomo)',
            },
            matomo: {
                title: 'Matomo (Self-Hosted)',
                description: 'Anonymous usage stats to improve the app. No ads, no resale. Data processed on our servers in Germany/EU*.',
            },
            ok: 'Allow tracking',
            save: 'Save selection',
            acceptAll: 'Accept all',
            decline: 'No tracking',
        },
    },

    services: [
        {
            name: 'matomo',
            title: 'Matomo (Self-Hosted)',
            purposes: ['analytics'],
            default: true,     // ✅ wichtig für ehrliches Opt-in
            required: false,
            optOut: false,
            onlyOnce: true,
            cookies: [
                [/^_pk_.*$/, '/', 'velonest.joshuah.ch'],
                [/^_mtm_.*$/, '/', 'velonest.joshuah.ch'],
                [/^MATOMO.*$/, '/', 'velonest.joshuah.ch'],
            ],
            callback: function (consent, service) {
                // Matomo Consent API korrekt ansprechen
                if (typeof window !== 'undefined' && typeof window._paq !== 'undefined') {
                    if (consent === true) {
                        window._paq.push(['rememberConsentGiven']);
                        window._paq.push(['setConsentGiven']);
                    } else {
                        window._paq.push(['forgetConsentGiven']);
                        window._paq.push(['deleteCookies']);
                    }
                }
            },
        },
    ],
};
