/* eslint-disable no-return-assign */
/* eslint-disable no-func-assign */
/* eslint-disable no-sequences */
/* eslint-disable no-void */
/* eslint-disable no-shadow */
/* eslint-disable yoda */
/* eslint-disable prettier/prettier */
!function () {
    var o = {
        9898: function (e, t, o) {
            function r(e) {
                return (r = 'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator ? function (e) {
                    return typeof e;
                }
                    : function (e) {
                        return e && 'function' === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
                    }
                )(e);
            }
            var n = o(9724)
                , a = o(1643)
                , s = o(1166);
            function l(e, t) {
                if (!e || !t) { return !1; }
                if (void 0 === (t = !t.keyCode ? {
                    keyCode: t,
                } : t).status && (t.status = !0),
                    t.status && !n.get(a.keys().status)) { return !1; }
                var o = e.keyCode || e.which || e.charCode;
                if (o) {
                    var i = s.getDisableShortKeys();
                    if (!(0 < i.length && -1 < [].indexOf.call(i, o) || 'number' === typeof t.keyCode && t.keyCode != o || 'object' == r(t.keyCode) && [].indexOf.call(t.keyCode, o) < 0)) {
                        i = e.ctrlKey,
                            o = e.shfitKey,
                            e = e.altKey;
                        return !(t.ctrlKey && !i) && (!(t.shfitKey && !o) && !(t.altKey && !e));
                    }
                }
            }
            var c = {
                wakeup: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !1,
                    status: !1,
                    keyCode: 192,
                },
                wakupConfig: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    status: !0,
                    keyCode: 76,
                },
                dialogClose: {
                    shiftKey: !1,
                    ctrlKey: !1,
                    altKey: !1,
                    keyCode: 27,
                },
                changeRegion: {
                    next: {
                        shiftKey: !1,
                        ctrlKey: !0,
                        altKey: !0,
                        status: !0,
                        keyCode: [34, 40],
                    },
                    pre: {
                        shiftKey: !1,
                        ctrlKey: !0,
                        altKey: !0,
                        status: !0,
                        keyCode: [33, 38],
                    }
                },
                opVoice: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    status: !0,
                    keyCode: 86,
                },
                vocierate: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    status: !0,
                    keyCode: 75,
                },
                mouseb: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: 77,
                },
                mouseten: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: 78,
                },
                reset: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: 67,
                },
                readsrc: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    status: !1,
                    keyCode: 82,
                },
                bigsrc: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: 66,
                },
                readtype: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: 70,
                },
                exitservice: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: 69,
                },
                changeTheme: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: 84,
                },
                fontTob: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: [187, 107],
                },
                fontTos: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: [189, 109],
                },
                help: {
                    shiftKey: !1,
                    ctrlKey: !0,
                    altKey: !0,
                    keyCode: 191,
                },
                showImg: {
                    shiftKey: !1,
                    ctrlKey: !1,
                    altKey: !0,
                    keyCode: [57, 105],
                },
                showQrcode: {
                    shiftKey: !1,
                    ctrlKey: !1,
                    altKey: !0,
                    keyCode: [48, 96],
                }
            };
            e.exports = {
                eventKeyCode: function (e) {
                    return e.keyCode || e.which || e.charCode;
                },
                checkKeyCode: l,
                keyCodeSettings: c,
                toWakeUpRead: function (e) {
                    var t = e.altKey
                        , o = e.ctrlKey
                        , i = (e.shfitKey,
                            e.keyCode || e.which || e.charCode)
                        , r = s.getDisableShortKeys();
                    if (!(0 < r.length && -1 < [].indexOf.call(r, i))) { return t && (48 <= i && i <= 57 || 96 <= i && i <= 105) ? !o && !shiftKey || void 0 : !!l(e, c.readsrc); }
                },
            };
        },
        1643: function (e) {
            var l = {
                val: function (e, t) {
                    return t = t || location.search.substring(1),
                        new RegExp('(^|/?|&)' + e + '=([^&]*)(/s|&|$)', 'i').test(t) ? RegExp.$2 : '';
                },
            };
            function s() {
                var e = document.scripts
                    , t = 'aria.';
                window.isAriaDev && (t = 'ariaDev');
                for (var o = {
                    success: !1,
                }, i = 0; i < e.length; i++) {
                    try {
                        var r = e[i]
                            , n = r.src.indexOf('/' + t);
                        if (n <= 0 && (n = r.src.indexOf('/_' + t)),
                            null !== r.src && -1 < n) {
                            o.road = r.src.substr(0, n + 1),
                                o.appid = l.val('appid', r.src);
                            var a = l.val('callback', r.src);
                            a && 0 < a.length && (o.callback = a);
                            var s = l.val('initcallback', r.src);
                            s && 0 < s.length && (o.initcallback = s),
                                o.success = !0;
                            break;
                        }
                    } catch (e) { }
                }
                return o;
            }
            var c = 'aria';
            window.isAriaDev && (c = 'ariaDev');
            var t = null;
            var o = {
                en: 'welcome {0},When a blind user enters the intelligent blind lane, press the shortcut key Ctrl + Alt + R; To read the detailed operation instructions, press the shortcut key Ctrl + Alt + question mark',
                'zh-CN': '欢迎进入 {0},盲人用户进入智能盲道请按快捷键Ctrl+Alt+R；阅读详细操作说明请按快捷键Ctrl+Alt+问号键。',
            };
            e.exports = {
                keys: function () {
                    var e = s().appid;
                    window.ariaAppId = e;
                    function t() {
                        return c + '/' + e;
                    }
                    function o() {
                        return t() + '/runtime/settings';
                    }
                    function i() {
                        return t() + '/data/settings';
                    }
                    function r() {
                        return t() + '/runtime';
                    }
                    function n() {
                        return t() + '/data';
                    }
                    var a = c + '/userSettings';
                    return {
                        base: c,
                        status: c + '/status',
                        userSettings: {
                            root: a,
                            defaultTheme: a + '/defaultTheme',
                            scale: a + '/scale',
                            ariaPointerRead: a + '/ariaPointerRead',
                            bigpoint: a + '/bigpoint',
                            leftfixed: a + '/leftfixed',
                            topfixed: a + '/fixed',
                            readtype: a + '/readtype',
                            readsrc: a + '/readsrc',
                            voice: {
                                root: a + '/voice',
                                enable: a + '/voice/enable',
                                rate: a + '/voice/rate',
                            },
                            mousemode: a + '/mousemode',
                            mouseten: a + '/mouseten',
                            py: a + '/py',
                            big5: a + '/big5',
                            bigsrc: a + '/bigsrc',
                            canRead: a + '/canRead',
                        },
                        road: t() + '/road',
                        root: t(),
                        runtime: {
                            root: r(),
                            serviceUrl: r() + '/serviceUrl',
                            security: r() + '/security',
                            appid: r() + '/appid',
                            callback: r() + '/callback',
                            settings: {
                                root: o(),
                                highlight: {
                                    root: o() + '/highlight',
                                    enable: o() + '/highlight/enable',
                                    rate: o() + '/highlight/rate',
                                    mode: o() + '/highlight/mode',
                                },
                                voice: {
                                    root: o() + '/voice',
                                    enable: o() + '/voice/enable',
                                    maxRate: o() + '/voice/maxRate',
                                    minRate: o() + '/voice/minRate',
                                    rate: o() + '/voice/rate',
                                },
                                curregion: {
                                    id: o() + '/curregion/id',
                                },
                                golabSkipScale: o() + '/golabSkipScale',
                                golabSkipAll: o() + '/golabSkipAll',
                                golabSkipTheme: o() + '/golabSkipTheme',
                                golabFocus: o() + '/golabFocus',
                                golabRegion1: o() + '/golabRegion1',
                                golabRegion2: o() + '/golabRegion2',
                                golabRegion3: o() + '/golabRegion3',
                                golabRegion4: o() + '/golabRegion4',
                                golabReplaceBg: o() + '/golabReplaceBg',
                                tellerMode: o() + '/tellerMode',
                                defaultLanguage: o() + '/defaultLanguage',
                                shortCutIcon: o() + '/shortCutIcon',
                                css: o() + '/css',
                                closeShortIcon: o() + '/closeShortIcon',
                                bodyfont: o() + '/bodyfont',
                                reticle: o() + '/reticle',
                                spacing: o() + '/spacing',
                                padding: o() + '/padding',
                                maxZoom: o() + '/maxZoom',
                                minZoom: o() + '/minZoom',
                                focusTheme: o() + '/focusTheme',
                                useOldFixed: o() + '/useOldFixed',
                                oldFixedCss: o() + '/oldFixedCss',
                                defaultTheme: o() + '/defaultTheme',
                                scale: o() + '/scale',
                                golabFixedCss: o() + '/golabFixedCss',
                                golabCss: o() + '/golabCss',
                                iconType: o() + '/iconType',
                            }
                        },
                        data: {
                            root: n(),
                            version: c + '/version',
                            languages: n() + '/languages',
                            themes: n() + '/theme',
                            golbalElems: n() + '/golbalElems',
                            roles: n() + '/roles',
                            conf: {
                                root: n() + '/conf',
                                region: n() + '/conf/region',
                            },
                            settings: {
                                root: i(),
                                enable: i() + '/enable',
                                topfixed: i() + '/fixed',
                                highlight: {
                                    root: i() + '/highlight',
                                    enable: i() + '/highlight/enable',
                                    rate: i() + '/highlight/rate',
                                    mode: i() + '/highlight/mode',
                                },
                                voice: {
                                    root: i() + '/voice',
                                    enable: i() + '/voice/enable',
                                    rate: i() + '/voice/rate',
                                },
                                tellerMode: i() + '/tellerMode',
                                defaultTheme: i() + '/defaultTheme',
                                defaultLanguage: i() + '/defaultLanguage',
                                shortCutIcon: i() + '/shortCutIcon',
                                scale: i() + '/scale',
                                golabFixedCss: i() + '/golabFixedCss',
                                golabCss: i() + '/golabCss',
                                iconType: i() + '/iconType',
                                spacing: i() + '/spacing',
                                padding: i() + '/padding',
                            }
                        },
                    };
                },
                getAppid: s,
                queryString: l,
                AppIdChangeAddListen: function (e) {
                    t = setInterval(function () {
                        appid = s().appid,
                            window.ariaAppId != appid && e && 'function' === typeof e && (window.ariaAppId = appid,
                                e());
                    }, 1500);
                },
                AppIdChangeRemoveListen: function () {
                    clearInterval(t),
                        t = null;
                },
                addWelcomeContent: function () {
                    var e = document.querySelector('html').getAttribute('lang') || 'zh-CN'
                        , t = o[e];
                    t && (t = t.replace('{0}', document.title),
                        (e = document.querySelector('#ariaTipText')) || ((e = document.createElement('a')).id = 'ariaTipText',
                            e.setAttribute('role', 'pagedescription'),
                            e.setAttribute('aria-label', t),
                            e.setAttribute('href', 'javascript:void(0)'),
                            document.body.insertBefore(e, document.body.firstElementChild)));
                },
                welcomeContent: o,
            };
        },
        3969: function (e, t, o) {
            var i = o(3334)
                , r = 'aria';
            window.isAriaDev && (r = 'ariaDev'),
                e.exports = {
                    get status() {
                        var e = i.getCookie(r + 'Status');
                        if (void 0 !== e) { return JSON.parse(e); }
                    },
                    set status(e) {
                        i.setCookie(r + 'Status', e);
                    },
                    get bigsrc() {
                        var e = i.getCookie(r + 'Bigsrc');
                        if (void 0 !== e) { return JSON.parse(e); }
                    },
                    set bigsrc(e) {
                        i.setCookie(r + 'Bigsrc', e);
                    },
                    get defaultTheme() {
                        return i.getCookie(r + 'DefaultTheme');
                    },
                    set defaultTheme(e) {
                        i.setCookie(r + 'DefaultTheme', e);
                    },
                    get fixed() {
                        var e = i.getCookie(r + 'Fixed');
                        if (void 0 !== e) { return JSON.parse(e); }
                    },
                    set fixed(e) {
                        i.setCookie(r + 'Fixed', e);
                    },
                    get mousemode() {
                        var e = i.getCookie(r + 'Mousemode');
                        if (void 0 !== e) { return JSON.parse(e); }
                    },
                    set mousemode(e) {
                        i.setCookie(r + 'Mousemode', e);
                    },
                    get mouseten() {
                        var e = i.getCookie(r + 'Mouseten');
                        if (void 0 !== e && 'undefined' != e) { return JSON.parse(e); }
                    },
                    set mouseten(e) {
                        i.setCookie(r + 'Mouseten', e);
                    },
                    get oldFixedStatus() {
                        var e = i.getCookie(r + 'oldFixedStatus');
                        if (void 0 !== e && 'undefined' != e) { return JSON.parse(e); }
                    },
                    set oldFixedStatus(e) {
                        i.setCookie(r + 'oldFixedStatus', e);
                    },
                    get scale() {
                        var e = i.getCookie(r + 'Scale');
                        return void 0 !== e && 'undefined' != e ? JSON.parse(e) : 1;
                    },
                    set scale(e) {
                        i.setCookie(r + 'Scale', e);
                    },
                    get readtype() {
                        var e = i.getCookie(r + 'Readtype');
                        if (void 0 !== e && 'undefined' != e) { return JSON.parse(e); }
                    },
                    set readtype(e) {
                        i.setCookie(r + 'Readtype', e);
                    },
                    clearAll: function () {
                        i.devareCookie(r + 'Bigsrc'),
                            i.devareCookie(r + 'Readtype'),
                            i.devareCookie(r + 'Fixed'),
                            i.devareCookie(r + 'Mouseten'),
                            i.devareCookie(r + 'Scale'),
                            i.devareCookie(r + 'Mousemode'),
                            i.devareCookie(r + 'DefaultTheme');
                    },
                };
        },
        1166: function (e) {
            e.exports = {
                disableShortKeys: function (e) {
                    window.disablShortKeys = e;
                },
                getDisableShortKeys: function () {
                    return window.disablShortKeys || [];
                },
            };
        },
        1266: function (e, t, o) {
            o(9724),
                o(1643);
            var i = o(3969)
                , r = !1;
            function n(e, t) {
                a('.cnwza', e),
                    a('#cnwza', e),
                    a('#cniil_wza', e),
                    e ? (a("[onclick='aria.start();']", e),
                        a("[onclick='aria.start()']", e)) : (a("[onclick='aria.end();']", e),
                            a("[onclick='aria.end()']", e)),
                    t && a(t, e);
            }
            function a(e, t) {
                var o = 'string' === typeof e ? document.querySelectorAll(e) : [e];
                if (o && void 0 !== o && 0 != o.length) {
                    for (var i = 0; i < o.length; i++) {
                        var r = o[i]
                            , n = r.getAttribute('clickhide')
                            , a = r.getAttribute('closeText')
                            , s = (s = r.getAttribute('openText')) || r.innerText;
                        t ? 'false' != n ? r.classList.add('ariaHide') : a && (r.innerText = a) : 'false' != n ? r.classList.remove('ariaHide') : s && (r.innerText = s),
                            'string' === typeof e && (-1 < e.indexOf('end') && r.setAttribute('onclick', 'aria.start()'),
                                -1 < e.indexOf('start') && r.setAttribute('onclick', 'aria.end()'));
                    }
                }
            }
            function s(e) {
                null != (e.target.closestReplenish('#cniil_wza') || e.target.closestReplenish('#cnwza') || e.target.closestReplenish('.cnwza')) && (i.status ? aria && 'function' === typeof aria.end && (n(!1),
                    aria.end()) : aria && 'function' === typeof aria.start && (n(!0),
                        aria.start()));
            }
            Element.prototype.closestReplenish = function (t) {
                var e = this
                    , o = function () {
                        if (t instanceof HTMLElement) { return [t]; }
                        try {
                            t = document.querySelectorAll(t);
                        } catch (e) { } finally {
                            var e = Object.prototype.toString.call(t).slice(8, -1);
                            if (-1 < ['NodeList', 'HTMLCollection', 'Array'].indexOf(e)) { return [].slice.call(t); }
                        }
                    }();
                do {
                    if (-1 < o.indexOf(e)) { return e; }
                } while (null !== (e = e.parentElement));
                return null;
            }
                ,
                e.exports = {
                    setBtn: n,
                    addListenBtn: function () {
                        r || (window.addEventListener('click', s),
                            r = !0);
                    },
                    removeListenBtn: function () {
                        r = !1,
                            window.removeEventListener('click', s);
                    },
                    mobileHide: function () {
                        for (var e = document.querySelectorAll('[mobilehide]'), t = 0; t < e.length; t++) {
                            var o = e[t];
                            try {
                                var i = o.getAttribute('mobilehide');
                                'none' == i && (o.style.display = 'none'),
                                    'hidden' == i && (o.style.visibility = 'hidden');
                            } catch (e) { }
                        }
                    },
                };
        },
        7744: function (e) {
            e.exports = {
                getContainerDom: function (e) {
                    var t = document.querySelector('#aging-tools-pc');
                    return null != t ? t : (void 0 !== e && e.body ? e : document).body;
                },
            };
        },
        3334: function (e) {
            function t() { }
            function r() {
                var e = document.domain.split('.')
                    , t = e.length;
                if (1 == t) { return document.domain; }
                var o = e[t - 2] + '.' + e[t - 1];
                return '.' + (o = 2 < o.length && -1 < [].indexOf.call(['com', 'gov', 'org', 'net'], e[t - 2]) ? e[t - 3] + '.' + o : o);
            }
            t.prototype.devareCookie = function (e) {
                var t = new Date;
                t.setTime(t.getTime() - 1e4),
                    document.cookie = e + '=v; expires=' + t.toGMTString() + ';path=/;domain=' + r();
            }
                ,
                t.prototype.setCookie = function (e, t) {
                    this.devareCookie(e);
                    var o, i = new Date;
                    i.setTime(i.getTime() + 864e6),
                        o = document.domain,
                        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(o) ? document.cookie = e + '=' + t + '; expires=' + i.toGMTString() + ';path=/;' : document.cookie = e + '=' + t + '; expires=' + i.toGMTString() + ';path=/;domain=' + r();
                }
                ,
                t.prototype.getCookie = function (e) {
                    for (var t = document.cookie.split('; '), o = 0; o < t.length; o++) {
                        var i = t[o].split('=');
                        if (i[0] == e) { return i[1]; }
                    }
                }
                ,
                t.prototype.getCookies = function (e) {
                    for (var t = document.cookie.split('; '), o = 0; o < t.length; o++) {
                        if (t[o].split('=')[0] == e)
                            return t[o].substring(t[o].indexOf('=') + 1);
                    }
                }
                ,
                t.prototype.getAllCookie = function () {
                    var e = document.cookie.split('; ');
                    return 0 < arrcookie.length ? e : '';
                }
                ;
            var o = new t;
            e.exports = o;
        },
        9724: function (e) {
            function r(e) {
                return (r = 'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator ? function (e) {
                    return typeof e;
                }
                    : function (e) {
                        return e && 'function' === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
                    }
                )(e);
            }
            function n(e) {
                if (null === e) { return 'null'; }
                if (e != e) { return 'nan'; }
                if ('function' === typeof Array.isArray) {
                    if (Array.isArray(e)) { return 'array'; }
                } else if ('[object Array]' === Object.prototype.toString.call(e)) { return 'array'; }
                return r(e).toLowerCase();
            }
            function t() {
                this.name = 'Store';
            }
            t.prototype = {
                init: function (e) {
                    return this.store = window[e],
                        this;
                },
                set: function (e, t) {
                    if (null != (e = 'object' === r(e) ? e.root : e)) {
                        var o = e.split('/')
                            , i = (i = this.get(o[0])) || {};
                        switch (n(i = 1 < o.length ? function e(t, o, i, r) {
                            return (t = t || {})[o[r]] || (t[o[r]] = {}),
                                r >= o.length - 1 ? void 0 === i ? delete t[o[r]] : t[o[r]] = i : e(t[o[r]], o, i, r + 1),
                                t;
                        }(i, o, t, 1) : i)) {
                            case 'object':
                            case 'array':
                                this.store.setItem(o[0], JSON.stringify(i));
                                break;
                            default:
                                this.store.setItem(o[0], i);
                        }
                    }
                },
                get: function (e) {
                    if (e) {
                        e = e.split('/');
                        return function e(t, o, i) {
                            if (null === t) { return null; }
                            try {
                                t = 'number' === n(+t) ? t : JSON.parse(t);
                            } catch (e) { }
                            return 1 === o.length ? t : ('object' === r(t) && (t = t[o[i]]),
                                (i += 1) > o.length - 1 ? t : e(t, o, i));
                        }(this.store.getItem(e[0]), e, 1);
                    }
                },
                getAll: function () {
                    var e, t = JSON.parse(JSON.stringify(this.store)), o = {}, i = '';
                    for (e in t) {
                        try {
                            i = 'number' === n(+(i = t[e])) ? i : JSON.parse(i);
                        } catch (e) { }
                        o[e] = i;
                    }
                    return o;
                },
                remove: function (e) {
                    this.set(e, void 0);
                },
                clear: function () {
                    this.store.clear();
                },
            };
            var o = (new t).init('localStorage');
            (new t).init('sessionStorage');
            e.exports = o;
        },
    }
        , i = {};
    function r(e) {
        var t = i[e];
        if (void 0 !== t) { return t.exports; }
        t = i[e] = {
            exports: {},
        };
        return o[e](t, t.exports, r),
            t.exports;
    }
    var n, a, s, l, c, d, u;
    function y() {
        var e = a.getAppid();
        if (e.success && (n.set(a.keys().runtime.appid, e.appid),
            n.set(a.keys().road, e.road),
            e.initcallback)) {
            try {
                window[e.initcallback](aria);
            } catch (e) { }
        }
        return e.success;
    }
    function f() {
        var e = document.createElement('script')
            , t = a.getAppid();
        e.src = n.get(a.keys().road) + '_aria.js?appid=' + n.get(a.keys().runtime.appid) + '&initcallback=' + t.initcallback + '&callback=' + t.callback,
            e.setAttribute('charset', 'utf-8'),
            d.getContainerDom().appendChild(e);
    }
    function e() {
        var t = {};
        window.isAriaDev ? window.ariaDev = t : window.aria = t;
        t.status = function () {
            return l.status;
        }
            ;
        function e(e) {
            s.checkKeyCode(e, s.keyCodeSettings.wakeup) ? t.start() : s.toWakeUpRead(e) && (l.bigsrc = !0,
                n.set(a.keys().userSettings.readsrc, !0),
                n.set(a.keys().userSettings.voice.enable, !1),
                c.setBtn(!0),
                t.start());
        }
        t.start = function () {
            c.removeListenBtn(),
                document.removeEventListener('keydown', e),
                l.status = !0,
                f();
        }
            ,
            t.end = function () {
                l.status = !1;
            }
            ,
            t.initcallback = u,
            a.addWelcomeContent(),
            y();
        var o = a.queryString.val('aria');
        '1' == o && (l.status = !0),
            '0' == o && (l.status = !1),
            t.status() ? t.start() : (document.addEventListener('keydown', e),
                c.addListenBtn());
    }
    n = r(9724),
        a = r(1643),
        s = r(9898),
        l = r(3969),
        c = r(1266),
        d = r(7744),
        u = r(1166),
        !function () {
            for (var e = navigator.userAgent, t = ['2.0 MMP', '240320', 'AvantGo', 'BlackBerry', 'Blazer', 'Cellphone', 'Danger', 'DoCoMo', 'Elaine/3.0', 'EudoraWeb', 'hiptop', 'IEMobile', 'KYOCERA/WX310K', 'LG/U990', 'MIDP-2.0', 'MMEF20', 'MOT-V', 'NetFront', 'Newt', 'Nintendo Wii', 'Nitro', 'Nokia', 'Opera Mini', 'Opera Mobi', 'Miui', 'Palm', 'Playstation Portable', 'portalmmm', 'Proxinet', 'ProxiNet', 'SHARP-TQ-GX10', 'Small', 'SonyEricsson', 'Symbian OS', 'SymbianOS', 'TS21i-10', 'UP.Browser', 'UP.Link', 'Windows CE', 'WinWAP', 'Android', 'iPhone', 'iPod', 'iPad', 'Windows Phone', 'HTC'], o = !1, i = 0; i < t.length; i++) {
                if (0 < e.indexOf(t[i])) {
                    o = !0;
                    break;
                }
            }
            var r = window.screen.width
                , n = window.screen.height;
            return o = r < 500 || n < 800 ? !0 : o;
        }() ? e() : (y(),
            f());
}();
