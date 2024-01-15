M.define("/js/Dropdown", function (c, b, d) {
    function a(e) {
        this.$nav = typeof e.nav === "string" ? $(e.nav) : e.nav;
        this.$panel = typeof e.panel === "string" ? $(e.panel) : e.panel;
        this.showCallback = e.showCallback;
        this.hideCallback = e.hideCallback;
        this.delay = e.delay || 0;
        this.event = e.event || "mouseenterleave";
        this._isShow = false;
        this.init()
    }
    a.prototype = {
        init: function () {
            if (this.event === "mouseenterleave") {
                this.$nav.on("mouseenter.dropdown", M.bind(function (e) {
                    this.show()
                }, this)).on("mouseleave.dropdown", M.bind(function (e) {
                    if ($(e.relatedTarget).closest(this.$panel).length === 0) {
                        this.hide(true)
                    }
                }, this));
                this.$panel.on("mouseenter.dropdown", M.bind(function (e) {
                    this.show()
                }, this)).on("mouseleave.dropdown", M.bind(function (e) {
                    if ($(e.relatedTarget).closest(this.$nav).length === 0) {
                        this.hide(false)
                    }
                }, this))
            }
            if (this.event === "click") {
                this.$nav.on("click.dropdown", M.bind(function (e) {
                    this.show()
                }, this));
                $(document).on("click.dropdown", M.bind(function (e) {
                    if ($(e.target).closest(this.$nav).length === 0 && $(e.target).closest(this.$panel).length === 0) {
                        this.hide(false)
                    }
                }, this))
            }
        },
        show: function () {
            this.$panel.show();
            this._isShow = true;
            if (M.isFunction(this.showCallback)) {
                this.showCallback.call(this, this.$nav, this.$panel)
            }
        },
        hide: function (e) {
            this._isShow = false;
            if (e && this.delay > 0) {
                setTimeout(M.bind(function () {
                    if (!this._isShow) {
                        this.$panel.hide();
                        if (M.isFunction(this.hideCallback)) {
                            this.hideCallback.call(this, this.$nav, this.$panel)
                        }
                    }
                }, this), this.delay)
            } else {
                this.$panel.hide();
                if (M.isFunction(this.hideCallback)) {
                    this.hideCallback.call(this, this.$nav, this.$panel)
                }
            }
        },
        destory: function () {
            if (this.event === "mouseenterleave") {
                this.$nav.off("mouseenter.dropdown").off("mouseleave.dropdown");
                this.$panel.off("mouseenter.dropdown").off("mouseleave.dropdown")
            }
            if (this.event === "click") {
                this.$nav.off("click.dropdown")
            }
            this.$panel.hide()
        }
    };
    d.exports = a
});
M.define("/js/pageletcommon/pageHeadUserInfoWWWNormal", function (c) {
    var a = c("/js/Dropdown")
        , b = window.Env || {};
    return {
        events: {},
        init: function () {
            var k = $("#head-btn-daka");
            $(function () {
                $(".new_daka_tips").addClass("on")
            });
            $(".ndt_close").on("click", function () {
                $(this).parent().hide()
            });
            M.Event.on("afterDaka", l);
            function l(q) {
                if (q && q.dakaFlag) {
                    k.closest(".head-daka").addClass("daka-complete")
                }
            }
            var e = i("dakaday");
            if (e !== null) {
                $(".head-btn-daka").attr("data-day", e)
            }
            function i(q) {
                var s = new RegExp("(^|&)" + q + "=([^&]*)(&|$)");
                var t = window.location.search.substr(1).match(s);
                if (t !== null) {
                    return unescape(t[2])
                }
                return null
            }
            var g = new a({
                nav: "#_j_head_user",
                panel: "#_j_user_panel",
                showCallback: function (q, r) {
                    q.find(".drop-trigger").addClass("drop-trigger-active")
                },
                hideCallback: function (q, r) {
                    q.find(".drop-trigger").removeClass("drop-trigger-active")
                },
                delay: 500
            });
            var d = 0
                , p = $("#_j_head_msg")
                , o = $("#_j_msg_panel")
                , n = p.find(".head-msg-new")
                , j = $("#_j_msg_float_panel");
            var f = new a({
                nav: p.selector,
                panel: o.selector,
                showCallback: function (q, r) {
                    q.find(".drop-trigger").addClass("drop-trigger-active")
                },
                hideCallback: function (q, r) {
                    q.find(".drop-trigger").removeClass("drop-trigger-active")
                },
                delay: 200
            });
            M.Event.on("get new msg", function (q) {
                if (q.msg || d > 0) {
                    o.find("ul").html(q.menu_index);
                    h()
                }
            });
            o.on("click", "a", function (q) {
                M.Event.fire("update msg")
            });
            j.on("click", "ul a", function (q) {
                M.Event.fire("update msg")
            });
            j.on("click", ".close-newmsg", function (q) {
                m()
            });
            function m() {
                n.hide();
                j.hide();
                $.ajax({
                    url: "http://" + b.WWW_HOST + "/ajax/ajax_msg.php",
                    dataType: "jsonp",
                    data: {
                        a: "ignore",
                        from: "1"
                    },
                    success: function (q) {
                        M.Event.fire("update msg")
                    }
                })
            }
            window.close_msg_tips = m;
            function h() {
                var q = "";
                d = 0;
                o.find(".num").each(function (r, t) {
                    var s = $(t);
                    d += Number(s.html());
                    q += "<li>" + s.closest("li").html() + "</li>"
                });
                if (d > 0) {
                    n.html((d > 99 ? "99+" : d)).show();
                    j.find("ul").html(q).end().show()
                } else {
                    n.hide();
                    j.hide()
                }
            }
            h()
        }
    }
});
/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function (i, f) {
    var t = i.fn.domManip, h = "_tmplitem", u = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, p = {}, e = {}, y, x = {
        key: 0,
        data: {}
    }, w = 0, q = 0, g = [];
    function k(B, A, D, E) {
        var C = {
            data: E || (E === 0 || E === false) ? E : (A ? A.data : {}),
            _wrap: A ? A._wrap : null,
            tmpl: null,
            parent: A || null,
            nodes: [],
            calls: c,
            nest: b,
            wrap: n,
            html: r,
            update: z
        };
        if (B) {
            i.extend(C, B, {
                nodes: [],
                parent: A
            })
        }
        if (D) {
            C.tmpl = D;
            C._ctnt = C._ctnt || C.tmpl(i, C);
            C.key = ++w;
            (g.length ? e : p)[w] = C
        }
        return C
    }
    i.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (A, B) {
        i.fn[A] = function (C) {
            var F = [], I = i(C), E, G, D, J, H = this.length === 1 && this[0].parentNode;
            y = p || {};
            if (H && H.nodeType === 11 && H.childNodes.length === 1 && I.length === 1) {
                I[B](this[0]);
                F = this
            } else {
                for (G = 0,
                    D = I.length; G < D; G++) {
                    q = G;
                    E = (G > 0 ? this.clone(true) : this).get();
                    i(I[G])[B](E);
                    F = F.concat(E)
                }
                q = 0;
                F = this.pushStack(F, A, I.selector)
            }
            J = y;
            y = null;
            i.tmpl.complete(J);
            return F
        }
    });
    i.fn.extend({
        tmpl: function (C, B, A) {
            return i.tmpl(this[0], C, B, A)
        },
        tmplItem: function () {
            return i.tmplItem(this[0])
        },
        template: function (A) {
            return i.template(A, this[0])
        },
        domManip: function (E, H, G, I) {
            if (E[0] && i.isArray(E[0])) {
                var B = i.makeArray(arguments), A = E[0], F = A.length, C = 0, D;
                while (C < F && !(D = i.data(A[C++], "tmplItem"))) { }
                if (D && q) {
                    B[2] = function (J) {
                        i.tmpl.afterManip(this, J, G)
                    }
                }
                t.apply(this, B)
            } else {
                t.apply(this, arguments)
            }
            q = 0;
            if (!y) {
                i.tmpl.complete(p)
            }
            return this
        }
    });
    i.extend({
        tmpl: function (C, F, E, B) {
            var D, A = !B;
            if (A) {
                B = x;
                C = i.template[C] || i.template(null, C);
                e = {}
            } else {
                if (!C) {
                    C = B.tmpl;
                    p[B.key] = B;
                    B.nodes = [];
                    if (B.wrapped) {
                        s(B, B.wrapped)
                    }
                    return i(m(B, null, B.tmpl(i, B)))
                }
            }
            if (!C) {
                return []
            }
            if (typeof F === "function") {
                F = F.call(B || {})
            }
            if (E && E.wrapped) {
                s(E, E.wrapped)
            }
            D = i.isArray(F) ? i.map(F, function (G) {
                return G ? k(E, B, C, G) : null
            }) : [k(E, B, C, F)];
            return A ? i(m(B, null, D)) : D
        },
        tmplItem: function (B) {
            var A;
            if (B instanceof i) {
                B = B[0]
            }
            while (B && B.nodeType === 1 && !(A = i.data(B, "tmplItem")) && (B = B.parentNode)) { }
            return A || x
        },
        template: function (B, A) {
            if (A) {
                if (typeof A === "string") {
                    A = l(A)
                } else {
                    if (A instanceof i) {
                        A = A[0] || {}
                    }
                }
                if (A.nodeType) {
                    A = i.data(A, "tmpl") || i.data(A, "tmpl", l(A.innerHTML))
                }
                return typeof B === "string" ? (i.template[B] = A) : A
            }
            return B ? (typeof B !== "string" ? i.template(null, B) : (i.template[B] || i.template(null, u.test(B) ? B : i(B)))) : null
        },
        encode: function (A) {
            return ("" + A).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    });
    i.extend(i.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function (A) {
            p = {}
        },
        afterManip: function v(C, A, D) {
            var B = A.nodeType === 11 ? i.makeArray(A.childNodes) : A.nodeType === 1 ? [A] : [];
            D.call(C, A);
            o(B);
            q++
        }
    });
    function m(A, E, C) {
        var D, B = C ? i.map(C, function (F) {
            return (typeof F === "string") ? (A.key ? F.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + h + '="' + A.key + '" $2') : F) : m(F, A, F._ctnt)
        }) : A;
        if (E) {
            return B
        }
        B = B.join("");
        B.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (G, H, F, I) {
            D = i(F).get();
            o(D);
            if (H) {
                D = a(H).concat(D)
            }
            if (I) {
                D = D.concat(a(I))
            }
        });
        return D ? D : a(B)
    }
    function a(B) {
        var A = document.createElement("div");
        A.innerHTML = B;
        return i.makeArray(A.childNodes)
    }
    function l(A) {
        return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + i.trim(A).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (I, C, G, D, E, J, F) {
            var L = i.tmpl.tag[G], B, H, K;
            if (!L) {
                throw "Unknown template tag: " + G
            }
            B = L._default || [];
            if (J && !/\w$/.test(E)) {
                E += J;
                J = ""
            }
            if (E) {
                E = j(E);
                F = F ? ("," + j(F) + ")") : (J ? ")" : "");
                H = J ? (E.indexOf(".") > -1 ? E + j(J) : ("(" + E + ").call($item" + F)) : E;
                K = J ? H : "(typeof(" + E + ")==='function'?(" + E + ").call($item):(" + E + "))"
            } else {
                K = H = B.$1 || "null"
            }
            D = j(D);
            return "');" + L[C ? "close" : "open"].split("$notnull_1").join(E ? "typeof(" + E + ")!=='undefined' && (" + E + ")!=null" : "true").split("$1a").join(K).split("$1").join(H).split("$2").join(D || B.$2 || "") + "__.push('"
        }) + "');}return __;")
    }
    function s(B, A) {
        B._wrap = m(B, true, i.isArray(A) ? A : [u.test(A) ? A : i(A).html()]).join("")
    }
    function j(A) {
        return A ? A.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }
    function d(A) {
        var B = document.createElement("div");
        B.appendChild(A.cloneNode(true));
        return B.innerHTML
    }
    function o(G) {
        var I = "_" + q, B, A, E = {}, F, D, C;
        for (F = 0,
            D = G.length; F < D; F++) {
            if ((B = G[F]).nodeType !== 1) {
                continue
            }
            A = B.getElementsByTagName("*");
            for (C = A.length - 1; C >= 0; C--) {
                H(A[C])
            }
            H(B)
        }
        function H(P) {
            var L, O = P, N, J, K;
            if ((K = P.getAttribute(h))) {
                while (O.parentNode && (O = O.parentNode).nodeType === 1 && !(L = O.getAttribute(h))) { }
                if (L !== K) {
                    O = O.parentNode ? (O.nodeType === 11 ? 0 : (O.getAttribute(h) || 0)) : 0;
                    if (!(J = p[K])) {
                        J = e[K];
                        J = k(J, p[O] || e[O]);
                        J.key = ++w;
                        p[w] = J
                    }
                    if (q) {
                        Q(K)
                    }
                }
                P.removeAttribute(h)
            } else {
                if (q && (J = i.data(P, "tmplItem"))) {
                    Q(J.key);
                    p[J.key] = J;
                    O = i.data(P.parentNode, "tmplItem");
                    O = O ? O.key : 0
                }
            }
            if (J) {
                N = J;
                while (N && N.key != O) {
                    N.nodes.push(P);
                    N = N.parent
                }
                delete J._ctnt;
                delete J._wrap;
                i.data(P, "tmplItem", J)
            }
            function Q(R) {
                R = R + I;
                J = E[R] = (E[R] || k(J, p[J.parent.key + I] || J.parent))
            }
        }
    }
    function c(C, A, D, B) {
        if (!C) {
            return g.pop()
        }
        g.push({
            _: C,
            tmpl: A,
            item: this,
            data: D,
            options: B
        })
    }
    function b(A, C, B) {
        return i.tmpl(i.template(A), C, B, this)
    }
    function n(C, A) {
        var B = C.options || {};
        B.wrapped = A;
        return i.tmpl(i.template(C.tmpl), C.data, B, C.item)
    }
    function r(B, C) {
        var A = this._wrap;
        return i.map(i(i.isArray(A) ? A.join("") : A).filter(B || "*"), function (D) {
            return C ? D.innerText || D.textContent : D.outerHTML || d(D)
        })
    }
    function z() {
        var A = this.nodes;
        i.tmpl(null, null, null, this).insertBefore(A[0]);
        i(A).remove()
    }
    if (window.M && typeof M.define == "function") {
        M.define("jq-tmpl", function () {
            return i
        })
    }
}
)(jQuery);
M.define("InputListener", function (c, b, d) {
    var a = {
        listen: function (f, e) {
            f = $(f);
            f.each($.proxy(function (g, h) {
                h = $(h);
                if (!h.is("input") && !h.is("textarea")) {
                    throw new Error("input listener only apply to input or textarea")
                }
                this.initListen(h, e)
            }, this))
        },
        unlisten: function (e) {
            e = $(e);
            e.each($.proxy(function (h, k) {
                k = $(k);
                if (!k.is("input") && !k.is("textarea")) {
                    throw new Error("input listener only apply to input or textarea")
                }
                if (arguments.length == 1) {
                    k.unbind("focus", this.getStartListenFunc());
                    k.unbind("blur", this.getStopListenFunc());
                    k.removeData("__input_listener_handlers")
                } else {
                    if (typeof arguments[1] == "function") {
                        var j = arguments[1]
                            , g = k.data("__input_listener_listeninterval");
                        for (var h = 0, f = g.length; h < f; h++) {
                            if (g[h] == j) {
                                g.splice(h, 1);
                                h--
                            }
                        }
                    }
                }
            }, this))
        },
        initListen: function (f, e) {
            f.data("__input_listener_currentval", f.val());
            if (!f.data("__input_listener_handlers")) {
                this.bindListenEvent(f)
            }
            this.addListenHandler(f, e);
            if (f.is(":focus")) {
                f.blur();
                f.focus()
            }
        },
        bindListenEvent: function (e) {
            e.data("__input_listener_handlers", []);
            e.focus(this.getStartListenFunc());
            e.blur(this.getStopListenFunc())
        },
        getStartListenFunc: function () {
            if (!this.bindStartListenFunc) {
                this.bindStartListenFunc = $.proxy(this.startListen, this)
            }
            return this.bindStartListenFunc
        },
        getStopListenFunc: function () {
            if (!this.bindStopListenFunc) {
                this.bindStopListenFunc = $.proxy(this.stopListen, this)
            }
            return this.bindStopListenFunc
        },
        startListen: function (e) {
            var f = $(e.target);
            f.data("__input_listener_currentval", f.val());
            f.data("__input_listener_listeninterval", setInterval($.proxy(function () {
                var h = f.data("__input_listener_currentval")
                    , g = f.val();
                if (h != g) {
                    f.data("__input_listener_currentval", g);
                    this.triggerListenHandler(f)
                }
            }, this), 100))
        },
        stopListen: function (e) {
            var f = $(e.target);
            clearInterval(f.data("__input_listener_listeninterval"))
        },
        addListenHandler: function (f, e) {
            if (typeof e == "function") {
                f.data("__input_listener_handlers").push(e)
            }
        },
        triggerListenHandler: function (h) {
            var f = h.data("__input_listener_handlers");
            for (var g = 0, e = f.length; g < e; g++) {
                f[g].call(null, {
                    target: h.get(0)
                })
            }
        }
    };
    return a
});
M.define("SuggestionXHR", function (b, a, c) {
    function d(e) {
        this.URL = null;
        this.delay = 200;
        this.dataType = "text";
        $.extend(this, e);
        this.delayTimer = null;
        this.xhr = null;
        this.cache = {};
        this.init()
    }
    d.prototype = {
        init: function () {
            if (!this.URL) {
                throw new Error("no url for suggestion")
            }
        },
        getSuggestion: function (g, h) {
            var f = this.getQuery(g) //好像是处理search关键词，变为url参数?
                , e = this.cache[f];
            h = typeof h === "function" ? h : $.noop;
            this.stop();
            if (e) {
                h(e)
            } else {
                this.getXHRData(f, h)
            }
        },
        stop: function () {
            clearTimeout(this.delayTimer);
            if (this.xhr && this.xhr.readyState !== 4) {
                this.xhr.abort()
            }
        },
        getQuery: function (h) {    // h = {q:X, gall:1}?
            var g = "";
            if (typeof h == "string") {
                g = encodeURIComponent(h)
            } else {
                if (h && typeof h == "object") {
                    var e = [];
                    for (var f in h) {
                        if (h.hasOwnProperty(f)) {
                            e.push(f + "=" + encodeURIComponent(h[f]))
                        }
                    }
                    g = e.join("&")
                }
            }
            return g
        },
        getXHRData: function (e, h) {  // e 好像是search关键词处理成的url字符串
            var f = this.xhr
                , g = {
                    url: this.URL,
                    data: e,
                    dataType: this.dataType,
                    success: M.bind(function (i) {
                        h(i);
                        this.cache[e] = i
                    }, this)
                };
            this.delayTimer = setTimeout(M.bind(function () {
                this.xhr = $.ajax(g)
            }, this), this.delay)
        }
    };
    return d
});
M.define("DropList", function (c, b, d) {
    var a = M.Event;
    function e(f) {
        this.trigger = null;
        this.container = null;
        this.itemSelector = "._j_listitem";
        this.itemHoverClass = "on";
        this.firstItemHover = false;
        $.extend(this, f);
        this.trigger = $(this.trigger);
        this.container = $(this.container);
        this.mouseon = false;
        this.visible = false;
        this.init()
    }
    M.mix(e.prototype, {
        createContainer: $.noop,
        updateList: $.noop,
        init: function () {
            if (!this.trigger.length) {
                M.error("no trigger for drop list")
            }
            if (!this.container.length) {
                this.container = this.createContainer()
            }
            if (!this.container.length) {
                M.error("no container for drop list")
            }
            this.bindEvents()
        },
        bindEvents: function () {
            this.trigger.on("keydown", $.proxy(function (g) {
                var h = g.keyCode;
                if (this.visible && h == 13) {
                    var f = this.getFocusItem();
                    if (f.length) {
                        this.selectItem(f);
                        g.preventDefault()
                    }
                } else {
                    if (this.visible && h == 38) {
                        this.moveFocus(-1)
                    } else {
                        if (this.visible && h == 40) {
                            this.moveFocus(1)
                        }
                    }
                }
            }, this));
            this.container.on("mouseenter", this.itemSelector, $.proxy(this.moveFocus, this)).on("click", this.itemSelector, $.proxy(this.clickItem, this)).on("mouseenter", $.proxy(this.mouseOverCnt, this)).on("mouseleave", $.proxy(this.mouseOutCnt, this))
        },
        show: function (g) {
            this.updateList(g);
            this.container.show();
            if (this.firstItemHover) {
                var f = this.container.find(this.itemSelector);
                if (f.length) {
                    this.moveFocus(1)
                }
            }
            this.visible = true
        },
        hide: function () {
            this.container.hide();
            this.visible = false
        },
        clickItem: function (g) {
            var f = this.getFocusItem();
            this.selectItem(f);
            g.preventDefault()
        },
        selectItem: function (f) {
            a(this).fire("itemselected", {
                item: f
            })
        },
        moveFocus: function (i) {
            var h = this.container.find(this.itemSelector), j = this.getFocusItem(), g = j, f;
            if (i === -1) {
                if (j.length) {
                    f = h.index(j) - 1
                }
                if (!j.length || f == -1) {
                    g = h.last()
                } else {
                    g = h.eq(f)
                }
            } else {
                if (i === 1) {
                    if (j.length) {
                        f = h.index(j) + 1
                    }
                    if (!j.length || f == h.length) {
                        g = h.first()
                    } else {
                        g = h.eq(f)
                    }
                } else {
                    if (i.currentTarget) {
                        g = $(i.currentTarget)
                    }
                }
            }
            j.removeClass(this.itemHoverClass);
            g.addClass(this.itemHoverClass);
            a(this).fire("itemfocused", {
                prevItem: j,
                focusItem: g
            })
        },
        getFocusItem: function () {
            var f = this.container.find(this.itemSelector);
            return f.filter("." + this.itemHoverClass)
        },
        mouseOverCnt: function () {
            this.mouseon = true
        },
        mouseOutCnt: function () {
            this.mouseon = false
        }
    });
    return e
});
M.define("Suggestion", function (c) {
    c("jq-tmpl");
    var a = c("InputListener");
    var b = '{{each(i, item) list}}<li class="${listItemClass}" data-value="${item.value}">${item.text}</li>{{/each}}';
    function d(e) {
        e.suggestionURL = e.url || $(e.input).data("suggestionurl");
        this.dropListClass = "droplist";
        this.listItemSelector = "._j_listitem";
        this.listItemHoverClass = "on";
        this.listFirstItemHover = false;
        this.keyParamName = "key";
        this.dataType = "json";
        this.suggestionParams = {};
        this.listContainer = null;
        M.mix(this, e);
        this.input = $(this.input);
        this.listTmpl = this.listTmpl || b;
        this.actOnList = false;
        this.init()
    }
    M.mix(d.prototype, {
        init: function () {
            a.listen(this.input, $.proxy(this.inputChange, this));
            this.input.blur($.proxy(function (f) {
                var e = $(f.currentTarget);
                if (e.data("droplist")) {
                    setTimeout($.proxy(function () {
                        if (!this.actOnList && e.data("droplist")) {
                            e.data("droplist").hide()
                        }
                        this.actOnList = false
                    }, this), 200)
                }
            }, this));
            this.input.keyup($.proxy(function (f) {
                var e = $(f.currentTarget);
                if (f.keyCode == 40 && (!e.data("droplist") || !e.data("droplist").visible)) {
                    this.inputChange(f)
                }
            }, this))
        },
        inputChange: function (i) {
            var f = $(i.target)
                , k = $.trim(f.val())
                , j = c("SuggestionXHR")
                , h = c("DropList");
            var g = f.data("droplist");
            if (!g) {
                f.data("droplist", g = new h({
                    trigger: f,
                    itemSelector: this.listItemSelector,
                    itemHoverClass: this.listItemHoverClass,
                    firstItemHover: this.listFirstItemHover,
                    container: this.listContainer,
                    createContainer: $.proxy(function () {
                        var l = this.createListContainer(f);
                        this.listContainer = l;
                        return l
                    }, this),
                    updateList: $.proxy(this.updateList, this)
                }));
                M.Event(g).on("itemselected", $.proxy(function (l) {
                    this.dropItemSelected(f, l.item)
                }, this));
                M.Event(g).on("itemfocused", $.proxy(function (l) {
                    M.Event(this).fire("itemfocused", l)
                }, this))
            }
            g.hide = function () {
                setTimeout($.proxy(function () {
                    if (M.windowFocused) {
                        this.container.hide();
                        this.visible = false
                    }
                }, this), 1)
            }
                ;
            var e = f.data("suggestion");
            if (!e) {
                f.data("suggestion", e = new j({
                    URL: this.suggestionURL,
                    dataType: this.dataType
                }))
            }
            if (!k.length) {
                e.stop();
                g.hide();
                M.Event(this).fire("after hide list")
            } else {
                this.suggestionParams[this.keyParamName] = k;
                M.Event(this).fire("before suggestion xhr");
                e.getSuggestion(this.suggestionParams, $.proxy(function (m) {
                    M.Event(this).fire("before show list");
                    var l = this.handleSuggest(m);
                    if (l) {
                        f.data("droplist").show(l)
                    }
                }, this))
            }
        },
        handleSuggest: function (f) {
            var e = "";
            if (this.dataType == "json") {
                e = $.tmpl(this.listTmpl, f)
            }
            return e
        },
        createListContainer: function (f) {
            var g = $("<ul />")
                , e = f.position();
            g.css({
                display: "none",
                position: "absolute",
                left: e.left,
                top: e.top + f.outerHeight()
            }).addClass(this.dropListClass);
            g.insertAfter(f);
            return g
        },
        updateList: function (e) {
            this.listContainer.html(e)
        },
        hideDropList: function () {
            this.input.data("droplist") && this.input.data("droplist").hide()
        },
        dropItemSelected: function (e, f) {
            a.unlisten(e);
            M.Event(this).fire("itemselected", {
                item: f,
                input: e
            });
            a.listen(e, $.proxy(this.inputChange, this))
        }
    });
    return d
});
M.define("MesSearchEvent", function (b, a, c) {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    Math.uuid = function (f, j) {
        var l = e, h = [], g;
        j = j || l.length;
        if (f) {
            for (g = 0; g < f; g++) {
                h[g] = l[0 | Math.random() * j]
            }
        } else {
            var k;
            h[8] = h[13] = h[18] = h[23] = "-";
            h[14] = "4";
            for (g = 0; g < 36; g++) {
                if (!h[g]) {
                    k = 0 | Math.random() * 16;
                    h[g] = l[(g == 19) ? (k & 3) | 8 : k]
                }
            }
        }
        return h.join("")
    }
        ;
    Math.uuidFast = function () {
        var k = e, h = new Array(36), g = 0, j;
        for (var f = 0; f < 36; f++) {
            if (f == 8 || f == 13 || f == 18 || f == 23) {
                h[f] = "-"
            } else {
                if (f == 14) {
                    h[f] = "4"
                } else {
                    if (g <= 2) {
                        g = 33554432 + (Math.random() * 16777216) | 0
                    }
                    j = g & 15;
                    g = g >> 4;
                    h[f] = k[(f == 19) ? (j & 3) | 8 : j]
                }
            }
        }
        return h.join("")
    }
        ;
    Math.uuidCompact = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (h) {
            var g = Math.random() * 16 | 0
                , f = h == "x" ? g : (g & 3 | 8);
            return f.toString(16)
        })
    }
        ;
    var d = {
        uuid: function () {
            return Math.uuid()
        },
        search: function (f) {
            var g = Math.uuid();
            f.id = g;
            !!mfwPageEvent && mfwPageEvent("se", "v2_search", f);
            return g
        },
        searchCache: function (f) {
            var g = Math.uuid();
            f.id = g;
            !!mfwPageEvent && mfwPageEvent("se", "v2_search_cache", f);
            return g
        },
        resultClick: function (f) {
            !!mfwPageEvent && mfwPageEvent("se", "v2_result_click", f);
            return f.id
        }
    };
    c.exports = d
});
M.define("Cookie", function (f, h, e) {
    var g = /\+/g;
    var i = navigator.cookieEnabled;
    if (!i) {
        document.cookie = "__detectCookieEnabled=1;";
        i = document.cookie.indexOf("__detectCookieEnabled") != -1 ? true : false;
        if (i) {
            document.cookie = "__detectCookieEnabled=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        }
    }
    if (!i) {
        return {
            isSupport: false
        }
    }
    var d = {
        isSupport: true,
        set: function (m, n, k) {
            k = (typeof k == "object" && k !== null) ? k : {};
            if (typeof k.expires === "number") {
                var o = k.expires
                    , l = k.expires = new Date();
                l.setTime(+l + o * 1000)
            }
            return (document.cookie = [j(m), "=", j(String(n)), k.expires ? "; expires=" + k.expires.toUTCString() : "", k.path ? "; path=" + k.path : "", k.domain ? "; domain=" + k.domain : "", k.secure ? "; secure" : ""].join(""))
        },
        get: function (q) {
            var k = q ? undefined : {};
            var r = document.cookie ? document.cookie.split("; ") : [];
            for (var p = 0, m = r.length; p < m; p++) {
                var s = r[p].split("=");
                var n = a(s.shift());
                var o = s.join("=");
                if (q && q === n) {
                    k = b(o);
                    break
                }
                if (!q && (o = b(o)) !== undefined) {
                    k[n] = o
                }
            }
            return k
        },
        remove: function (l, k) {
            if (this.get(l) === undefined) {
                return false
            }
            k = (typeof k == "object" && k !== null) ? k : {};
            k.expires = -1;
            this.set(l, "", k)
        }
    };
    function j(k) {
        return encodeURIComponent(k)
    }
    function a(k) {
        return decodeURIComponent(k)
    }
    function c(k) {
        if (k.indexOf('"') === 0) {
            k = k.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        }
        try {
            k = decodeURIComponent(k.replace(g, " "));
            return k
        } catch (l) { }
    }
    function b(k) {
        var l = c(k);
        return l
    }
    e.exports = d
});
M.define("/js/SiteSearch", function (c) {
    var f = "1.0.0"
        , b = c("Suggestion")
        , i = c("MesSearchEvent")
        , h = M.cssSupport("transition")
        , e = M.cssSupport("transform")
        , a = c("Cookie")
        , g = window.Env || {};
    var d = function (D) {
        var O = D.submitCallback || function () { }
            ;
        var F = $("#" + D.input + "")
            , V = !!D.submit ? $("#" + D.submit + "") : null
            , u = D.additionalClass ? D.additionalClass : ""
            , L = !!D.isRelevant
            , t = D.maxCount || 0
            , A = D.hideOnScroll || false
            , o = false
            , K = false
            , j = ""
            , z = ""
            , m = ""
            , q = "";
        if (D.input === "_j_index_search_input_all") {
            var I = [];
            if (F.val() === "" && I && I.length) {
                var U = Math.floor(Math.random() * I.length)
                    , J = I[U];
                F.val(J.name).data("url", J.url)
            }
            F.on("focus", function (X) {
                if (F.data("url")) {
                    F.val("").data("url", "")
                }
            })
        }
        if (g.is_async_site_search) {
            o = true
        }
        var R = new b({
            url: (g.WWW_HOST ? window.location.protocol + "//" + g.WWW_HOST : "") + "/search/ss.php",
            suggestionParams: {
                isHeader: Number(L)
            },
            input: F,
            listItemHoverClass: "active",
            listFirstItemHover: false,
            dataType: "jsonp",
            createListContainer: function () {
                var X = $('<div class="m-search-suggest ' + u + ' hide"><ul class="mss-list"></ul></div>').appendTo("body");
                X.on("mouseenter", ".mss-place .mss-title, .mss-place .mss-nav a", function (Z) {
                    var Y = $(Z.currentTarget)
                        , aa = Y.closest(".mss-place");
                    aa.find(".mss-title").removeClass("active").removeClass("frozen").end().find(".mss-nav a").removeClass("active").end();
                    Y.addClass("active")
                }).on("mouseleave", ".mss-place .mss-title, .mss-place .mss-nav a", function (Z) {
                    var Y = $(Z.currentTarget);
                    Y.removeClass("active")
                });
                return X
            },
            handleSuggest: function (aF) {
                j = aF.keyword;
                K = !!aF.is_hit;
                m = "https://" + aF.www_host;
                var az = aF.keyword_cut
                    , aB = aF.show_types
                    , Y = aF.hide_types;
                var aC = a.get("acchidebar");
                var ar = aC !== undefined && aC == 0;
                var au = $("<ul>");
                var ac = aF.first_poi;
                if (!!ac) {
                    var an = ac
                        , al = $('<li class="mss-item _j_listitem" data-type="pois">').appendTo(au)
                        , aq = $('<div class="mss-title">').appendTo(al);
                    al.attr("data-url", an.url);
                    aq.append('<span class="mss-fr">' + (!!an.mddname ? an.mddname : "") + an.typename + "</span>");
                    aq.append('<span class="mss-cn">' + an.dis_name + "</span>")
                }
                var ai = aF.article_info;
                if (ai && ai.result) {
                    for (var av = 0; av < ai.result.length; av++) {
                        var ah = ai.result[av]
                            , al = $('<li class="mss-item _j_listitem" data-type="guides">').appendTo(au)
                            , aq = $('<div class="mss-title">').appendTo(al);
                        al.attr("data-url", ah.link);
                        aq.html(ah.name_display)
                    }
                }
                var am = aF.mdd_info;
                if (am && am.result) {
                    for (var av = 0; av < am.result.length; av++) {
                        var ab = am.result[av]
                            , al = $('<li class="mss-item _j_listitem" data-type="mdd">').appendTo(au)
                            , aq = $('<div class="mss-title">').appendTo(al);
                        al.attr("data-url", ab.url);
                        if (!!ab.parent) {
                            aq.append('<span class="mss-fr">' + ab.parent + "</span>")
                        }
                        aq.append('<span class="mss-cn">' + ab.dis_name + "</span>");
                        aq.append('<span class="mss-gl"> ' + ab.infoname + "</span>")
                    }
                }
                var ap = aF.hotel_info;
                if (ap && ap.result && !L && !ar) {
                    for (var av = 0; av < ap.result.length; av++) {
                        var aD = ap.result[av]
                            , al = $('<li class="mss-item _j_listitem mfw-acc-hide" data-type="hotels">').appendTo(au)
                            , aq = $('<div class="mss-title">').appendTo(al);
                        al.attr("data-url", aD.url);
                        aq.append('<span class="mss-fr">' + aD.typename + "</span>");
                        aq.append('<span class="mss-cn">' + aD.title + "</span>");
                        aq.append('<span class="mss-gl"> ' + aD.infoname + "</span>")
                    }
                }
                var af = aF.gl_info;
                if (af && af.result) {
                    for (var av = 0; av < af.result.length; av++) {
                        var at = af.result[av]
                            , al = $('<li class="mss-item _j_listitem" data-type="sales_gonglve">').appendTo(au)
                            , aq = $('<div class="mss-title">').appendTo(al);
                        al.attr("data-url", at.url);
                        aq.append('<span class="mss-fr">' + at.typename + "</span>");
                        aq.append('<span class="mss-cn">' + at.title + "</span>")
                    }
                }
                var aa = aF.sales_info;
                if (aa && aa.result && !L) {
                    for (var av = 0; av < aa.result.length; av++) {
                        var X = aa.result[av]
                            , al = $('<li class="mss-item _j_listitem" data-type="sales_promoted">').appendTo(au)
                            , aq = $('<div class="mss-title">').appendTo(al);
                        al.attr("data-url", X.url);
                        aq.append('<span class="mss-fr">' + X.typename + "</span>");
                        aq.append('<span class="mss-cn">' + X.title + "</span>");
                        aq.append('<span class="mss-gl"> ' + X.infoname + "</span>")
                    }
                }
                var ag = aF.route_info;
                if (ag && ag.result && !L) {
                    for (var av = 0; av < ag.result.length; av++) {
                        var aA = ag.result[av]
                            , al = $('<li class="mss-item _j_listitem" data-type="route_promoted">').appendTo(au)
                            , aq = $('<div class="mss-title">').appendTo(al);
                        al.attr("data-url", aA.url);
                        aq.append('<span class="mss-fr">' + aA.typename + "</span>");
                        aq.append('<span class="mss-cn">' + aA.title + "</span>");
                        aq.append('<span class="mss-gl"> ' + aA.infoname + "</span>")
                    }
                }
                var aw = aF.qa_info;
                if (aw && aw.result & !ar) {
                    for (var av = 0; av < aw.result.length; av++) {
                        var aj = aw.result[av]
                            , al = $('<li class="mss-item _j_listitem mfw-acc-hide" data-type="questions">').appendTo(au)
                            , aq = $('<div class="mss-title">').appendTo(al);
                        al.attr("data-url", aj.url);
                        aq.append('<span class="mss-fr">' + aj.typename + "</span>");
                        aq.append('<span class="mss-cn">' + aj.title + "</span>")
                    }
                }
                var ae = aF.poi_info
                    , ay = !L;
                if (M.isArray(aB) && M.indexOf(aB, "poi") !== -1) {
                    ay = true
                }
                if (ae && ae.result && ay) {
                    for (var av = 0; av < ae.result.length; av++) {
                        var an = ae.result[av]
                            , Z = "hotel" === an.stype ? "hotel" : "poi"
                            , al = $('<li class="mss-item _j_listitem" data-type="' + Z + '">').appendTo(au)
                            , aq = $('<div class="mss-title">').appendTo(al);
                        al.attr("data-url", an.url);
                        aq.append('<span class="mss-fr">' + (!!an.mddname ? an.mddname : "") + an.typename + "</span>");
                        aq.append('<span class="mss-cn" style="color:#999;">' + an.dis_name + "</span>")
                    }
                }
                var ak = aF.sekey_info
                    , ax = L;
                if (M.isArray(Y) && M.indexOf(Y, "sekey") !== -1) {
                    ax = false
                }
                if (ak && ak.result && ax) {
                    for (var av = 0; av < ak.result.length; av++) {
                        if (av > 4) {
                            break
                        }
                        var aE = ak.result[av]
                            , al = $('<li class="mss-item _j_listitem" data-type="sekey">').appendTo(au);
                        al.attr("data-url", aE.url);
                        al.append('<div class="mss-title">' + aE.name + "</div>")
                    }
                }
                var ad = aF.ginfo_num;
                if (!!ad) {
                    var al = $('<li class="mss-item _j_listitem" data-type="notes">').appendTo(au);
                    al.append('<div class="mss-title">搜“<span class="mss-key">' + az + '</span>”相关游记<span class="mss-num">' + ad + "篇</span></div>")
                }
                var ao = aF.user_num;
                if (!!ad) {
                    var al = $('<li class="mss-item _j_listitem" data-type="users">').appendTo(au);
                    al.append('<div class="mss-title">搜“<span class="mss-key">' + az + "</span>”相关用户</div>")
                }
                if (t > 0) {
                    au.find("._j_listitem").each(function (aG, aH) {
                        if (aG > t) {
                            $(aH).remove()
                        }
                    })
                }
                return au.html()
            },
            updateList: function (X) {
                this.listContainer.find(".mss-list").html(X);
                if (L) {
                    this.listContainer.find(".mss-list").addClass("shrink-list")
                }
                if (K) {
                    R.input.data("droplist").moveFocus(1)
                }
            }
        });
        if (o) {
            var B = c("InputListener"), x = c("SuggestionXHR"), E = new x({
                URL: (g.WWW_HOST ? "https://" + g.WWW_HOST : "") + "/search/s.php",
                dataType: "json"
            }), w = $("#_j_mfw_search_main"), W = F.closest(".search-wrapper"), N = $('<div class="search-keyword-tip"></div>').appendTo(W), C = D.input === "_j_index_search_input_all", H = false, v, r, P, l, s;
            B.listen(F, function (Y) {
                var X = $(Y.target)
                    , Z = $.trim(X.val());
                if (!H && Z) {
                    H = true
                }
                N.hide()
            });
            M.Event(R).on("before suggestion xhr", function () {
                var X = R.suggestionParams[R.keyParamName];
                if (X && X !== z) {
                    E.getSuggestion({
                        q: X,   //question?
                        gall: 1
                    }, $.proxy(function (Z) {
                        var ad = $.trim(F.val());
                        if (!ad) {
                            return false
                        }
                        if (!Z || !Z.keyword || (!Z.result && !Z.unmatch)) {
                            return false
                        }
                        if (Z.unmatch === 1) {
                            N.hide()
                        } else {
                            z = X;
                            if (W[0]) {
                                var aa = Z.keyword.length
                                    , Y = Z.keyword.replace(/[A-Za-z0-9\s]/g, "").length
                                    , ac = aa - Y;
                                setTimeout(function () {
                                    N.html(Z.keyword).css("left", 32 + Y * 14 + ac * 7).show()
                                }, 1)
                            }
                            w.html($(Z.result).css("minHeight", 0).html());
                            if (h && e) {
                                w.find("> .wid").addClass("anim-climb");
                                setTimeout(function () {
                                    w.find("> .wid").removeClass("anim-climb")
                                }, 1)
                            }
                            var ab = g.search_type || "all";
                            g.search_seid = S(X, ab);
                            g.search_keyword = X;
                            g.is_search_cache = true;
                            g.is_search_updated = true
                        }
                    }, R))
                }
            })
        }
        M.Event(R).on("before suggestion xhr", function () {
            T(F, R.listContainer)
        });
        M.Event(R).on("before show list", function () {
            R.listContainer.find(".mss-list").show()
        });
        M.Event(R).on("itemfocused", function (Y) {
            var X = Y.prevItem
                , Z = Y.focusItem
                , aa = R.listContainer;
            if (1 < aa.find(".mss-place").length) {
                if (Z.hasClass("mss-place")) {
                    aa.find(".mss-place").removeClass("frozen")
                }
                if (!Z.hasClass("mss-place") && !!X && X.hasClass("mss-place")) {
                    aa.find(".mss-place").removeClass("frozen");
                    X.addClass("frozen")
                }
            }
            if (Z.hasClass("mss-place")) {
                Z.find(".mss-title").addClass("frozen")
            }
        });
        M.Event(R).on("itemselected", function (Z) {
            var ab = Z.item;
            if (ab.length) {
                var aa = ab.data("type")
                    , Y = ab.data("url")
                    , ad = F.attr("id") === "_j_head_search_input" ? "header" : "default";
                if (aa === "flight_hotel" || aa === "flight" || aa === "local") {
                    aa = "sales"
                }
                q = n(j, "all", ad, "suggest");
                if ("notes" === aa || "users" === aa) {
                    var ac = n(j, aa, ad, "suggest");
                    location.href = m + "/search/q.php?q=" + encodeURIComponent(j) + "&t=" + aa + "&seid=" + ac
                } else {
                    var Y = ab.data("url")
                        , X = R.listContainer.find(".mss-item").index(ab.closest(".mss-item")) + 1;
                    Q(Y, X, aa);
                    location.href = ab.data("url")
                }
            } else {
                if (j !== "") {
                    location.href = m + "/search/q.php?q=" + encodeURIComponent(j)
                }
            }
        });
        var y = F.closest(".head-search-wrapper");
        if (y[0]) {
            F.on("focus", function (X) {
                setTimeout(function () {
                    y.addClass("head-search-focus")
                }, 1)
            }).on("blur", function (X) {
                setTimeout(function () {
                    if (M.windowFocused) {
                        y.removeClass("head-search-focus")
                    }
                }, 1)
            })
        }
        if (V && V[0]) {
            V.on("click", function (aa) {
                var Z = "/search/q.php";
                var Y = $.trim(F.val());
                var ad = "";
                if (F.data("url")) {
                    if (F.data("url").indexOf("http") !== -1) {
                        ad = F.data("url");
                        O(ad);
                        location.href = ad
                    } else {
                        ad = (g.WWW_HOST ? "https://" + g.WWW_HOST : "") + F.data("url");
                        O(ad);
                        location.href = ad
                    }
                    return true
                }
                if (Y !== "") {
                    if (R.listContainer) {
                        R.listContainer.hide()
                    }
                    var ac = F.attr("id") === "_j_head_search_input" ? "header" : "default"
                        , ae = g.search_type || "all"
                        , ab = n(Y, ae, ac, "form")
                        , X = m + Z + "?q=" + encodeURIComponent(Y);
                    if (g.search_type && (location.pathname === "/search/s.php" || location.pathname === "/search/q.php")) {
                        X += "&t=" + g.search_type
                    }
                    X += "&seid=" + ab;
                    O(X);
                    location.href = X
                }
            })
        }
        if (F && F[0]) {
            F.on("keydown", function (aa) {
                if (aa.keyCode == 13) {
                    var ad = R.input.data("droplist");
                    if (ad && ad.getFocusItem().length) {
                        return true
                    }
                    var Y = $.trim(F.val());
                    if (Y !== "") {
                        var Z = "/search/q.php";
                        if (R.listContainer) {
                            R.listContainer.hide()
                        }
                        var ac = F.attr("id") === "_j_head_search_input" ? "header" : "default"
                            , ae = g.search_type || "all"
                            , ab = n(Y, ae, ac, "form")
                            , X = m + Z + "?q=" + encodeURIComponent(Y);
                        if (g.search_type && (location.pathname === "/search/s.php" || location.pathname === "/search/q.php")) {
                            X += "&t=" + g.search_type
                        }
                        X += "&seid=" + ab;
                        location.href = X
                    }
                }
            })
        }
        $(window).resize(function () {
            if (R.listContainer && R.listContainer.length && R.listContainer.is(":visible")) {
                T(F, R.listContainer)
            }
        });
        $(window).on("scroll", function (X) {
            if (A) {
                R.hideDropList()
            }
        });
        function T(Y, ac) {
            var ab = Y.offset()
                , X = $("body")
                , aa = X.css("position")
                , Z = parseFloat(X.css("margin-top"));
            ac.css({
                left: ab.left + (D.input === "_j_index_search_input_all" ? 0 : 1),
                top: ab.top + F.outerHeight() - 2 - (aa === "relative" && Z) || 0,
            })
        }
        function n(X, ab, aa, Z) {
            var Y = {
                keyword: X,
                content_category: ab,
                searchbox_category: "main_search",
                searchbox_position: aa,
                search_type: Z,
                version: f
            };
            return i.search(Y)
        }
        function S(X, Z) {
            var Y = {
                keyword: X,
                content_category: Z,
                version: f
            };
            return i.searchCache(Y)
        }
        function Q(aa, Y, Z) {
            var X = {
                id: q,
                keyword: j,
                click_url: aa,
                index: Y,
                content_category: Z,
                search_type: "suggest",
                version: f
            };
            return i.resultClick(X)
        }
        function G(Y, ac) {
            var Z = []
                , ae = Y.split("|");
            ac = k(ac);
            for (var ab = 0; ab < ae.length; ab++) {
                var aa = $.trim(ae[ab]);
                if (aa == "search://") {
                    var X = Z.length;
                    Z[X] = ae[ab++];
                    Z[X + 1] = ae[ab++];
                    Z[X + 2] = ae[ab++];
                    Z[X + 3] = ae[ab++];
                    Z[X + 4] = ae[ab++];
                    Z[X + 5] = ae[ab];
                    continue
                }
                if (aa) {
                    try {
                        aa = aa.replace(new RegExp(ac, "ig"), function (af) {
                            return '<span class="highlight">' + af + "</span>"
                        })
                    } catch (ad) {
                        aa = aa.replace(ac, function (af) {
                            return '<span class="highlight">' + af + "</span>"
                        })
                    }
                    Z[Z.length] = aa
                }
            }
            return Z
        }
        var p = $("<div/>");
        function k(X) {
            return p.text(X).html()
        }
    };
    return d
});
M.closure(function (d) {
    var s = $("#header");
    if (!s.length) {
        return false
    }
    var p = d("/js/Dropdown");
    var o = d("/js/SiteSearch");
    new o({
        input: "_j_head_search_input",
        submit: "_j_head_search_link",
        isRelevant: true
    });
    $("#_j_nav_sales").find("[data-sales-nav]").on("click", function () {
        var u = $(this).data("salesNav");
        mfwPageEvent("sales", "index_sales_nav", {
            name: u
        })
    });
    $("#_j_head_nav_warper").delegate("#_j_head_nav>li", "click", function (v) {
        var w = $(this);
        var u = w.index();
        var x = w.data("tabItem");
        mfwPageEvent("sales", "click_index_index", {
            _tp: "首页",
            pos_id: "index.index.header." + u,
            module_name: "通用顶栏",
            item_name: x,
            item_source: "tab",
            item_id: "",
            item_uri: "",
        })
    });
    mfwPageEvent("sales", "show_index_index", {
        _tp: "首页",
        pos_id: "index.index.header.index",
        module_name: "通用顶栏",
        item_name: "",
        item_source: "",
        item_id: "",
        item_uri: "",
    });
    if (!window.showBarFlag) {
        $("._j_sales_nav_show").off("hover")
    } else {
        var b = 0
            , q = 0;
        $("._j_sales_nav_show").hover(function () {
            clearTimeout(b);
            q = setTimeout(function () {
                $("._j_sales_nav_show").addClass("head-nav-hover");
                $("._j_sales_top").fadeIn(300)
            }, 200)
        }, function () {
            clearTimeout(q);
            b = setTimeout(function () {
                $("._j_sales_nav_show").removeClass("head-nav-hover");
                $("._j_sales_top").fadeOut(300)
            }, 200)
        })
    }
    var n = 0
        , g = 0;
    $("._j_shequ_nav_show").hover(function () {
        clearTimeout(n);
        g = setTimeout(function () {
            $("._j_shequ_nav_show").addClass("head-nav-hover");
            $("._j_shequ_top").fadeIn(300)
        }, 200)
    }, function () {
        clearTimeout(g);
        n = setTimeout(function () {
            $("._j_shequ_nav_show").removeClass("head-nav-hover");
            $("._j_shequ_top").fadeOut(300)
        }, 200)
    });
    var r = $("#_j_community_panel")
        , j = r.find(".panel-image").length
        , k = Math.floor(Math.random() * j);
    if (k === j) {
        k--
    }
    r.find(".panel-image").eq(k).show();
    var h = window.location.hostname
        , l = window.location.pathname + window.location.search
        , a = $("#_j_head_nav");
    if (h.indexOf("www") === 0) {
        if (l === "" || l === "/") {
            a.children("._j_head_nav_index").addClass("head-nav-active")
        }
        var i = new RegExp("^/(mdd|photo/mdd|poi|photo/poi|travel-scenic-spot|jd|cy|gw|yl|yj|xc|baike)/|sFrom=mdd.*|sFrom=smdd.*", "i");
        if (i.test(l)) {
            if (l.indexOf("poi/choice") != -1) {
                a.children("._j_head_nav_choice").addClass("head-nav-active")
            } else {
                a.children("._j_head_nav_mdd").addClass("head-nav-active")
            }
        }
        var f = new RegExp("^/gonglve/.*", "i");
        if (f.test(l)) {
            a.children("._j_head_nav_gonglve").addClass("head-nav-active")
        }
        var e = window.Env && window.Env.sales_title_tag;
        if (e) {
            if (e === "flight_hotel") {
                a.children("._j_head_nav_sales").find("ul>li:eq(0)>a").addClass("on")
            } else {
                if (e === "visa") {
                    a.children("._j_head_nav_sales").find("ul>li:eq(2)>a").addClass("on")
                } else {
                    if (e === "localdeals") {
                        a.children("._j_head_nav_sales").find("ul>li:eq(1)>a").addClass("on")
                    } else {
                        if (e === "insurance") {
                            a.children("._j_head_nav_sales").find("ul>li:eq(4)>a").addClass("on")
                        }
                    }
                }
            }
            a.find("._j_head_nav_sales").addClass("head-nav-active")
        }
        if (/^\/insurance\//i.test(l)) {
            a.find("._j_head_nav_sales").addClass("head-nav-active")
        }
        var t = new RegExp("^/hotel/(?!.*sFrom=mdd).*", "ig");
        if (t.test(l)) {
            a.children("._j_head_nav_hotel").addClass("head-nav-active");
            a.children("._j_head_nav_hotel").find(".head-act616").remove()
        }
        var m = new RegExp("^/(wenda|qa|mall|together|group|i|traveller|rudder|paimai|club|postal|school|photo_pk|focus)/(?!.*sFrom=mdd|s.php*).*", "i");
        if (m.test(l)) {
            a.children("._j_head_nav_community").addClass("head-nav-active")
        }
        var c = new RegExp("^/flight/.*", "i");
        if (c.test(l)) {
            a.children("._j_head_nav_flight").addClass("head-nav-active")
        }
    }
});
M.define("PageAdmin", function (b) {
    var e = {}
        , c = d();
    e.uuid = window.Env && window.Env.uPageId || a();
    function a() {
        var f = c();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (h) {
            var g = (f + Math.random() * 16) % 16 | 0;
            f = Math.floor(f / 16);
            return (h === "x" ? g : (g & 3 | 8)).toString(16)
        })
    }
    function d() {
        var f = window.performance || {}
            , g = f.now || f.mozNow || f.msNow || f.oNow || f.webkitNow || Date.now || function () {
                return new Date().getTime()
            }
            ;
        if (f.now || f.mozNow || f.msNow || f.oNow || f.webkitNow) {
            return function () {
                return g.call(f)
            }
        }
        return g
    }
    return e
});
M.define("Storage", function (e, g, b) {
    var n = document;
    var d = c();
    var f = {
        _element: null,
        _expires: null,
        _file: document.location.hostname,
        init: function () {
            if (!this._element) {
                try {
                    this._element = n.createElement("input");
                    this._element.type = "hidden";
                    this._element.addBehavior("#default#userData");
                    n.body.appendChild(this._element);
                    this.setItem("__detectUserDataStorage", 1);
                    this.removeItem("__detectUserDataStorage");
                    return {
                        setItem: this.setItem,
                        getItem: this.getItem,
                        removeItem: this.removeItem
                    }
                } catch (p) {
                    M.error(p)
                }
            }
            return true
        },
        setItem: function (s, t, q) {
            var p = j(q);
            this._element.expires = p.toUTCString();
            this._element.load(this._file);
            var r = a(this._element.getAttribute(s))
                , u = i(t, +p);
            this._element.setAttribute(s, u);
            this._element.save(this._file);
            k({
                key: s,
                newValue: u,
                oldValue: r,
                url: window.location.href
            })
        },
        getItem: function (p) {
            this._element.load(this._file);
            var q = a(this._element.getAttribute(p));
            return q && q.value
        },
        removeItem: function (p) {
            this._element.load(this._file);
            this._element.removeAttribute(p);
            this._element.save(this._file)
        }
    };
    var l = {
        setItem: function (r, s, q) {
            if (!d) {
                return
            }
            var p = j(q);
            localStorage.setItem(r, i(s, +p))
        },
        getItem: function (p) {
            if (!d) {
                return
            }
            var r = +new Date()
                , q = a(localStorage.getItem(p));
            if (q) {
                if (r > q.timestamp) {
                    localStorage.removeItem(p);
                    q = null
                } else {
                    q = q.value
                }
            }
            return q
        },
        removeItem: function (p) {
            if (!d) {
                return
            }
            localStorage.removeItem(p)
        }
    };
    var h = {}
        , m = {
            on: function (q, r) {
                var p = h[q] || (h[q] = []);
                p.push(r)
            },
            off: function (q, r) {
                var p = h[q];
                if (!!p) {
                    if (!!r) {
                        M.forEach(p, function (t, s) {
                            if (t == r) {
                                p.splice(s, 1)
                            }
                        })
                    } else {
                        p = []
                    }
                }
                return this
            }
        };
    M.mix(f, m);
    M.mix(l, m);
    if (window.addEventListener) {
        window.addEventListener("storage", k, false)
    } else {
        if (window.attachEvent) {
            window.attachEvent("onstorage", k)
        }
    }
    function k(u) {
        if (!u) {
            u = window.event
        }
        var p = M.mix({}, u)
            , w = u.newValue && a(u.newValue)
            , q = u.oldValue && a(u.oldValue)
            , v = +new Date();
        p.newValue = w && w.value;
        if (!!q && v < q.timestamp) {
            p.oldValue = q.value
        } else {
            p.oldValue = null
        }
        var t = u.key
            , s = h[t]
            , r = 0;
        if (!t || !s || 0 === s.length) {
            return
        }
        while (r < s.length) {
            s[r++].call(window, p)
        }
    }
    function j(p) {
        if (Object.prototype.toString.call(p) != "[object Date]") {
            var q = typeof p === "number" && p > 0 ? p : 86400;
            p = new Date();
            p.setTime(+p + q * 1000)
        }
        return p
    }
    function i(q, p) {
        var r = {
            value: q,
            timestamp: p
        };
        return JSON.stringify(r)
    }
    function a(p) {
        if (p) {
            try {
                p = JSON.parse(p);
                if (!("value" in p) || !("timestamp" in p)) {
                    p = {
                        value: p,
                        timestamp: +j()
                    }
                }
            } catch (q) {
                p = {
                    value: p,
                    timestamp: +j()
                }
            }
        }
        return p
    }
    function c() {
        if (window.localStorage) {
            try {
                localStorage.setItem("__detectLocalStorage", 1);
                localStorage.removeItem("__detectLocalStorage");
                return true
            } catch (p) {
                return false
            }
        }
        return false
    }
    var o = window.localStorage ? l : f.init();
    b.exports = M.mix(o, {
        isAvailable: c,
        isSupport: window.localStorage ? d : ("setItem" in o)
    })
});
M.define("ResourceKeeper", function (d) {
    var m = b();
    if (!m) {
        return {
            isSupport: false
        }
    }
    var c = [];
    if (window.addEventListener) {
        window.addEventListener("onbeforeunload", l, false)
    } else {
        if (window.attachEvent) {
            window.attachEvent("onbeforeunload", l)
        }
    }
    function l() {
        M.forEach(c, function (n) {
            n.release()
        })
    }
    var e = d("PageAdmin").uuid
        , j = "default_resource"
        , h = "__resource_keeper"
        , f = 1000
        , k = 2000;
    function a(n) {
        n = "" + n;
        n = n || j;
        this.keeping = false;
        this.resourceKeeperStorageKey = h + "_" + n;
        this.keepingRefreshInterval = 0;
        this._initStorageListener();
        c.push(this)
    }
    M.mix(a.prototype, {
        keep: function () {
            this._requestKeep();
            return this.keeping
        },
        forceKeep: function (n) {
            this._startKeep(n)
        },
        release: function () {
            if (this.keeping) {
                var n = +new Date()
                    , o = g(this.resourceKeeperStorageKey);
                if (o.currentKeeperPageUUID == e && o.expire > n) {
                    m.remove(this.resourceKeeperStorageKey);
                    this._setKeeping(false)
                }
            }
        },
        _initStorageListener: function () {
            M.Event(m).on("resource_keeper_change", M.bind(function (n) {
                if (this.keeping && n.key == this.resourceKeeperStorageKey && n.pageUUID && n.pageUUID != e) {
                    this._setKeeping(false)
                }
            }, this))
        },
        _requestKeep: function () {
            var n = +new Date()
                , o = g(this.resourceKeeperStorageKey);
            if (!o.currentKeeperPageUUID || o.currentKeeperPageUUID == e || o.expire <= n) {
                this._startKeep(n)
            } else {
                this._setKeeping(false)
            }
        },
        _startKeep: function (n) {
            n = n || +new Date();
            var o = n + k;
            m.set(this.resourceKeeperStorageKey, e + ":" + o);
            this._setKeeping(true)
        },
        _setKeeping: function (n) {
            this.keeping = n;
            if (this.keeping) {
                this._startKeepingRefreshRequest()
            } else {
                this._stopKeepingRefreshRequest()
            }
        },
        _startKeepingRefreshRequest: function () {
            clearInterval(this.keepingRefreshInterval);
            this.keepingRefreshInterval = setInterval(M.bind(this._requestKeep, this), f)
        },
        _stopKeepingRefreshRequest: function () {
            clearInterval(this.keepingRefreshInterval)
        }
    });
    function b() {
        var o = null
            , p = d("Storage");
        if (p && p.isSupport) {
            o = {
                set: M.bind(p.setItem, p),
                get: M.bind(p.getItem, p),
                remove: M.bind(p.removeItem, p)
            };
            if (window.addEventListener) {
                window.addEventListener("storage", function (r) {
                    var q = r.key;
                    if (q.indexOf(h) === 0) {
                        var t = "";
                        if (r.newValue) {
                            var s = r.newValue.split(":");
                            if (s.length == 2) {
                                t = s[0]
                            }
                        }
                        M.Event(o).fire("resource_keeper_change", {
                            key: q,
                            pageUUID: t
                        })
                    }
                }, false)
            }
        } else {
            var n = d("Cookie");
            if (n && n.isSupport) {
                o = {
                    set: function (q, r) {
                        return n.set(q, r, k)
                    },
                    get: M.bind(n.get, n),
                    remove: M.bind(n.remove, n)
                }
            }
        }
        return o
    }
    function g(p) {
        var o = {
            currentKeeperPageUUID: "",
            expire: 0
        }
            , n = m.get(p);
        if (n) {
            n = n.split(":");
            o.currentKeeperPageUUID = n[0];
            o.expire = +n[1]
        }
        return o
    }
    function i(o) {
        var n = new a(o);
        return {
            keep: M.bind(n.keep, n),
            forceKeep: M.bind(n.forceKeep, n),
            release: M.bind(n.release, n)
        }
    }
    i.isSupport = true;
    return i
});
(function (a) {
    a.jGrowl = function (b, c) {
        if (a("#jGrowl").size() == 0) {
            a('<div id="jGrowl"></div>').addClass((c && c.position) ? c.position : a.jGrowl.defaults.position).appendTo("body")
        }
        a("#jGrowl").jGrowl(b, c)
    }
        ;
    a.fn.jGrowl = function (b, d) {
        if (a.isFunction(this.each)) {
            var c = arguments;
            return this.each(function () {
                var e = this;
                if (a(this).data("jGrowl.instance") == undefined) {
                    a(this).data("jGrowl.instance", a.extend(new a.fn.jGrowl(), {
                        notifications: [],
                        element: null,
                        interval: null
                    }));
                    a(this).data("jGrowl.instance").startup(this)
                }
                if (a.isFunction(a(this).data("jGrowl.instance")[b])) {
                    a(this).data("jGrowl.instance")[b].apply(a(this).data("jGrowl.instance"), a.makeArray(c).slice(1))
                } else {
                    a(this).data("jGrowl.instance").create(b, d)
                }
            })
        }
    }
        ;
    a.extend(a.fn.jGrowl.prototype, {
        defaults: {
            pool: 0,
            header: "",
            group: "",
            sticky: false,
            position: "top-right",
            glue: "after",
            theme: "default",
            themeState: "highlight",
            corners: "10px",
            check: 250,
            life: 3000,
            closeDuration: "normal",
            openDuration: "normal",
            easing: "swing",
            closer: true,
            closeTemplate: "&times;",
            closerTemplate: "<div>[ 关闭 ]</div>",
            log: function (c, b, d) { },
            beforeOpen: function (c, b, d) { },
            afterOpen: function (c, b, d) { },
            open: function (c, b, d) { },
            beforeClose: function (c, b, d) { },
            close: function (c, b, d) { },
            animateOpen: {
                opacity: "show"
            },
            animateClose: {
                opacity: "hide"
            }
        },
        notifications: [],
        element: null,
        interval: null,
        create: function (b, c) {
            var c = a.extend({}, this.defaults, c);
            if (typeof c.speed !== "undefined") {
                c.openDuration = c.speed;
                c.closeDuration = c.speed
            }
            this.notifications.push({
                message: b,
                options: c
            });
            c.log.apply(this.element, [this.element, b, c])
        },
        render: function (d) {
            var b = this;
            var c = d.message;
            var e = d.options;
            var d = a('<div class="jGrowl-notification ' + e.themeState + " ui-corner-all" + ((e.group != undefined && e.group != "") ? " " + e.group : "") + '"><div class="jGrowl-close">' + e.closeTemplate + '</div><div class="jGrowl-header">' + e.header + '</div><div class="jGrowl-message">' + c + "</div></div>").data("jGrowl", e).addClass(e.theme).children("div.jGrowl-close").bind("click.jGrowl", function () {
                a(this).parent().trigger("jGrowl.close")
            }).parent();
            a(d).bind("mouseover.jGrowl", function () {
                a("div.jGrowl-notification", b.element).data("jGrowl.pause", true)
            }).bind("mouseout.jGrowl", function () {
                a("div.jGrowl-notification", b.element).data("jGrowl.pause", false)
            }).bind("jGrowl.beforeOpen", function () {
                if (e.beforeOpen.apply(d, [d, c, e, b.element]) != false) {
                    a(this).trigger("jGrowl.open")
                }
            }).bind("jGrowl.open", function () {
                if (e.open.apply(d, [d, c, e, b.element]) != false) {
                    if (e.glue == "after") {
                        a("div.jGrowl-notification:last", b.element).after(d)
                    } else {
                        a("div.jGrowl-notification:first", b.element).before(d)
                    }
                    a(this).animate(e.animateOpen, e.openDuration, e.easing, function () {
                        if (a.browser.msie && (parseInt(a(this).css("opacity"), 10) === 1 || parseInt(a(this).css("opacity"), 10) === 0)) {
                            this.style.removeAttribute("filter")
                        }
                        a(this).data("jGrowl").created = new Date();
                        a(this).trigger("jGrowl.afterOpen")
                    })
                }
            }).bind("jGrowl.afterOpen", function () {
                e.afterOpen.apply(d, [d, c, e, b.element])
            }).bind("jGrowl.beforeClose", function () {
                if (e.beforeClose.apply(d, [d, c, e, b.element]) != false) {
                    a(this).trigger("jGrowl.close")
                }
            }).bind("jGrowl.close", function () {
                a(this).data("jGrowl.pause", true);
                a(this).animate(e.animateClose, e.closeDuration, e.easing, function () {
                    a(this).remove();
                    var f = e.close.apply(d, [d, c, e, b.element]);
                    if (a.isFunction(f)) {
                        f.apply(d, [d, c, e, b.element])
                    }
                })
            }).trigger("jGrowl.beforeOpen");
            if (e.corners != "" && a.fn.corner != undefined) {
                a(d).corner(e.corners)
            }
            if (a("div.jGrowl-notification:parent", b.element).size() > 1 && a("div.jGrowl-closer", b.element).size() == 0 && this.defaults.closer != false) {
                a(this.defaults.closerTemplate).addClass("jGrowl-closer ui-state-highlight ui-corner-all").addClass(this.defaults.theme).appendTo(b.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function () {
                    a(this).siblings().trigger("jGrowl.beforeClose");
                    if (a.isFunction(b.defaults.closer)) {
                        b.defaults.closer.apply(a(this).parent()[0], [a(this).parent()[0]])
                    }
                })
            }
        },
        update: function () {
            a(this.element).find("div.jGrowl-notification:parent").each(function () {
                if (a(this).data("jGrowl") != undefined && a(this).data("jGrowl").created != undefined && (a(this).data("jGrowl").created.getTime() + parseInt(a(this).data("jGrowl").life)) < (new Date()).getTime() && a(this).data("jGrowl").sticky != true && (a(this).data("jGrowl.pause") == undefined || a(this).data("jGrowl.pause") != true)) {
                    a(this).trigger("jGrowl.beforeClose")
                }
            });
            if (this.notifications.length > 0 && (this.defaults.pool == 0 || a(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool)) {
                this.render(this.notifications.shift())
            }
            if (a(this.element).find("div.jGrowl-notification:parent").size() < 2) {
                a(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function () {
                    a(this).remove()
                })
            }
        },
        startup: function (b) {
            this.element = a(b).addClass("jGrowl").append('<div class="jGrowl-notification"></div>');
            this.interval = setInterval(function () {
                a(b).data("jGrowl.instance").update()
            }, parseInt(this.defaults.check));
            if (a.browser.msie && parseInt(a.browser.version) < 7 && !window.XMLHttpRequest) {
                a(this.element).addClass("ie6")
            }
        },
        shutdown: function () {
            a(this.element).removeClass("jGrowl").find("div.jGrowl-notification").remove();
            clearInterval(this.interval)
        },
        close: function () {
            a(this.element).find("div.jGrowl-notification").each(function () {
                a(this).trigger("jGrowl.beforeClose")
            })
        }
    });
    a.jGrowl.defaults = a.fn.jGrowl.prototype.defaults
}
)(jQuery);
if (window.M && typeof window.M.define == "function") {
    window.M.define("jq-jgrowl", function () {
        return jQuery
    })
}
M.closure(function (e) {
    var j = e("ResourceKeeper")
        , t = j.isSupport ? new j("new_msg_loop") : null
        , s = e("Storage")
        , b = 1000
        , r = 10000
        , u = 40000
        , d = 120000;
    var v = (function () {
        if (j.isSupport) {
            return $.proxy(t.keep, t)
        } else {
            return function () {
                return M.windowFocused
            }
        }
    }());
    var k = function () {
        if (j.isSupport) {
            t.forceKeep()
        }
    };
    if ("addEventListener" in window) {
        window.addEventListener("focus", k, false)
    } else {
        if ("attachEvent" in document) {
            document.attachEvent("onfocusin", k)
        }
    }
    $(function () {
        if (window.Env && window.Env.UID > 0 || window.__mfw_uid > 0) { } else { }
        $("body").delegate(".jGrowl-closer", "click", function (x) {
            $.getJSON("/ajax/ajax_msg.php", {
                a: "closetip"
            });
            s.setItem("jgrowl_close_time", +new Date())
        });
        M.Event.on("update msg", function () {
            setTimeout(function () {
                w();
                s.setItem("update_msg", +new Date())
            }, 1)
        });
        s.on("update_msg", function (x) {
            w()
        });
        function w() {
            if (window.Env && window.Env.UID > 0 || window.__mfw_uid > 0) {
                p("msgdisplay")
            } else {
                p("nologinfeed")
            }
        }
    });
    function n() {
        setInterval(function () {
            v() && p("msgdisplay")
        }, u)
    }
    function l() {
        var x, w = 1;
        v() && p("nologinfeed");
        x = setInterval(function () {
            v() && p("nologinfeed");
            w++;
            if (w == 3) {
                clearInterval(x)
            }
        }, d)
    }
    function p(w) {
        $.get("/ajax/ajax_msg.php?a=" + w, function (x) {
            if (x) {
                o(x)
            }
        }, "json")
    }
    function o(w) {
        g();
        M.Event.fire("get new msg", w);
        if (w.msg) {
            m()
        }
        if (w.tips && !i()) {
            a(w)
        }
    }
    e("jq-jgrowl");
    function a(w) {
        var x = w.tips.split(w.split_char);
        M.forEach(x, function (z, y) {
            if (z) {
                setTimeout(function () {
                    $.jGrowl(z, {
                        header: "新鲜事：",
                        closer: false,
                        life: 20000
                    })
                }, 2000 * y + 10)
            }
        })
    }
    function i() {
        var x = s.getItem("jgrowl_close_time")
            , w = +new Date();
        if (x && w - x < 24 * 60 * 60 * 1000) {
            return true
        }
        return false
    }
    var c, f = 0, h = 1000, q = document.title;
    function m() {
        g();
        c = setInterval(function () {
            if (v()) {
                f++;
                document.title = f % 2 === 0 ? "【　　　】 - " + q : "【新消息】 - " + q
            } else {
                document.title = q
            }
        }, h)
    }
    function g() {
        clearInterval(c);
        document.title = q
    }
});
M.define("dialog/Layer", function (a) {
    var g = 0
        , f = 550
        , d = (function () {
            return $.browser && $.browser.msie && parseInt($.browser.version, 10) == 7
        }())
        , c = (function () {
            return $.browser && $.browser.msie && parseInt($.browser.version, 10) < 7
        }());
    function b() {
        return g++
    }
    function e(h) {
        this.opacity = 0.8;
        this.background = "#fff";
        this.impl = "Dialog";
        this.fixed = true;
        M.mix(this, h);
        this.id = "_j_layer_" + b();
        this.stacks = [];
        this.activeStackId = null;
        this.overflow = false;
        this.changeFixed = false;
        e.instances[this.id] = this;
        if (!e[this.impl]) {
            e[this.impl] = []
        }
        e[this.impl].push(this.id);
        this.init()
    }
    e.prototype = {
        init: function () {
            this._createPanel()
        },
        _createPanel: function () {
            f++;
            var h = {
                position: (!c && this.fixed) ? "fixed" : "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0
            }
                , j = M.mix({}, h, {
                    "z-index": f,
                    display: "none"
                })
                , k = M.mix({}, h, {
                    position: !c ? "fixed" : "absolute",
                    background: this.background,
                    opacity: this.opacity,
                    "z-index": -1
                })
                , i = M.mix({}, h, {
                    "z-index": 0
                }, (!c && this.fixed) ? {
                    "overflow-x": "hidden",
                    "overflow-y": "hidden"
                } : {
                    overflow: "visible"
                });
            this._panel = $('<div id="' + this.id + '" class="layer _j_layer">                                <div class="layer_mask _j_mask"></div>                                <div class="layer_content _j_content"></div>                            </div>').css(j).appendTo("body");
            this._mask = this._panel.children("._j_mask").css(k);
            this._content = this._panel.children("._j_content").css(i)
        },
        setZIndex: function (h) {
            f = h;
            this._panel.css("z-index", f)
        },
        getZIndex: function () {
            return +this._panel.css("z-index")
        },
        toFront: function () {
            this.setZIndex(f + 1)
        },
        setFixed: function (h) {
            h = !!h;
            if (this.fixed != h) {
                this.changeFixed = true;
                this.fixed = h;
                if (!c && this.fixed) {
                    this._panel.css("position", "fixed");
                    this._content.css({
                        position: "fixed",
                        "overflow-x": "hidden",
                        "overflow-y": "hidden"
                    })
                } else {
                    this._panel.css("position", "absolute");
                    this._content.css({
                        position: "absolute",
                        "overflow-x": "",
                        "overflow-y": "",
                        overflow: "visible"
                    })
                }
            } else {
                this.changeFixed = false
            }
        },
        newStack: function (i) {
            var h = $(i).appendTo(this._content);
            this.stacks.push(h);
            return this.stacks.length - 1
        },
        getStack: function (h) {
            return this.stacks[h]
        },
        getActiveStack: function () {
            return this.stacks[this.activeStackId]
        },
        setActiveStack: function (h) {
            this.activeStackId = h
        },
        getPanel: function () {
            return this._panel
        },
        getMask: function () {
            return this._mask
        },
        getContent: function () {
            return this._content
        },
        show: function (j) {
            var i = this;
            if (this.visible) {
                typeof j === "function" && j();
                return
            }
            e.activeId = this.id;
            this.visible = true;
            if (c) {
                var h = document.documentElement && document.documentElement.scrollHeight || document.body.scrollHeight;
                this._panel.css("height", h);
                this._mask.css("height", h)
            }
            this._panel.fadeIn(200, function () {
                typeof j === "function" && j()
            })
        },
        hide: function (i) {
            var h = this;
            if (!this.visible) {
                typeof i === "function" && i();
                return
            }
            this.visible = false;
            if (c) {
                this._panel.css("height", "");
                this._mask.css("height", "")
            }
            this._panel.fadeOut(200, function () {
                typeof i === "function" && i();
                h._recoverTopScroller()
            })
        },
        setOverFlow: function (h) {
            this.overflow = h;
            if (h) {
                if (!c && this.fixed) {
                    this._hideTopScroller();
                    this._content.css("overflow-y", "auto")
                }
            } else {
                if (!c && this.fixed) {
                    this._content.css("overflow-y", "hidden")
                }
            }
        },
        _hideTopScroller: function () {
            if (d) {
                $("html").css("overflow", "hidden")
            } else {
                if (!c) {
                    $("body").css("overflow", "hidden")
                } else {
                    $("body").css("overflow-x", "hidden");
                    this._panel.height($(document).height() + 20)
                }
            }
        },
        _recoverTopScroller: function () {
            if (d) {
                $("html").css("overflow", "")
            } else {
                if (!c) {
                    $("body").css("overflow", "")
                } else {
                    $("body").css("overflow-x", "")
                }
            }
        },
        destroy: function () {
            this.hide($.proxy(function () {
                this._panel && this._panel.remove();
                this._panel = null;
                if (M.indexOf(e[this.impl], this.id) != -1) {
                    e[this.impl].splice(M.indexOf(e[this.impl], this.id), 1)
                }
                delete e.instances[this.id]
            }, this))
        },
        clear: function () {
            this._content.empty();
            this.stacks = [];
            this.activeStackId = null
        }
    };
    e.instances = {};
    e.activeId = null;
    e.getInstance = function (h) {
        return e.instances[h]
    }
        ;
    e.getActive = function (h) {
        var i = e.getInstance(e.activeId);
        if (h && i) {
            i = i.impl === h ? i : null
        }
        return i
    }
        ;
    e.getImplInstance = function (i) {
        var h = e.getActive(i);
        if (!h && M.is(e[i], "Array") && e[i].length) {
            h = e.getInstance(e[i][e[i].length - 1])
        }
        return h
    }
        ;
    e.closeActive = function () {
        var h = e.getActive();
        if (h && h.getActiveStack()) {
            h.getActiveStack().trigger("close")
        }
    }
        ;
    $(document).keyup(function (h) {
        if (h.keyCode == 27) {
            e.closeActive()
        }
    });
    $(document).unload(function () {
        M.forEach(e.instances, function () {
            e.destroy()
        })
    });
    return e
});
M.define("dialog/DialogBase", function (b) {
    var e = b("dialog/Layer")
        , a = M.Event
        , d = (function () {
            return $.browser && $.browser.msie && parseInt($.browser.version, 10) < 7
        }());
    function c(f) {
        this.newLayer = false;
        this.width = "";
        this.height = "";
        this.background = "#000";
        this.panelBackground = "#fff";
        this.bgOpacity = 0.7;
        this.stackable = true;
        this.fixed = true;
        this.reposition = false;
        this.autoPosition = true;
        this.minTopOffset = 20;
        this.layerZIndex = -1;
        this.impl = "Dialog";
        M.mix(this, f);
        this.visible = false;
        this.destroyed = false;
        this.positioned = false;
        this.resizeTimer = 0;
        this.init()
    }
    c.prototype = {
        tpl: "<div />",
        init: function () {
            this._createDialog();
            this._bindEvents()
        },
        _createDialog: function () {
            this._panel = $(this.tpl).css({
                position: "absolute",
                opacity: 0,
                display: "none",
                background: this.panelBackground,
                "z-index": 0
            });
            this.setRect({
                width: this.width,
                height: this.height
            });
            this._layer = !this.newLayer && e.getImplInstance(this.impl) || new e({
                impl: this.impl
            });
            if (this.layerZIndex >= 0) {
                this._layer.setZIndex(this.layerZIndex)
            }
            this._layer.setFixed(this.fixed);
            this._layer.getMask().css({
                background: this.background,
                opacity: this.bgOpacity
            });
            this._stackId = this._layer.newStack(this._panel);
            this.setPanelContent()
        },
        _bindEvents: function () {
            var f = this;
            $(window).resize($.proxy(this.resizePosition, this));
            M.Event(this).on("resize", $.proxy(this.resizePosition, this));
            this._panel.delegate("._j_close, a[data-dialog-button]", "click", function (g) {
                var h = $(g.currentTarget).attr("data-dialog-button");
                if (h == "hide") {
                    f.hide()
                } else {
                    f.close()
                }
                g.preventDefault()
            });
            this._panel.bind("close", function (g, h) {
                f.close(h)
            })
        },
        resizePosition: function () {
            var f = this;
            clearTimeout(this.resizeTimer);
            if (f.visible && f.autoPosition) {
                this.resizeTimer = setTimeout(function () {
                    f.setPosition()
                }, 100)
            }
        },
        addClass: function (f) {
            this._panel.addClass(f)
        },
        removeClass: function (f) {
            this._panel.removeClass(f)
        },
        setRect: function (f) {
            if (f.width) {
                this._panel.css("width", f.width);
                this.width = f.width
            }
            if (f.height) {
                this._panel.css("height", f.height);
                this.height = f.height
            }
        },
        getPanel: function () {
            return this._panel
        },
        getLayer: function () {
            return this._layer
        },
        getMask: function () {
            return this._layer && this._layer.getMask()
        },
        setPanelContent: function () { },
        _getPanelRect: function () {
            var f = this.getPanel()
                , g = f.outerHeight()
                , h = f.outerWidth();
            if (!f.is(":visible")) {
                f.css({
                    visibility: "hidden",
                    display: "block"
                });
                var g = f.outerHeight()
                    , h = f.outerWidth();
                f.css({
                    visibility: "",
                    display: ""
                })
            }
            return {
                height: g,
                width: h
            }
        },
        _getNumric: function (f) {
            f = parseInt(f, 10);
            return isNaN(f) ? 0 : f
        },
        setPosition: function (f) {
            var g = this._getPanelRect()
                , h = {
                    width: $(window).width(),
                    height: $(window).height()
                };
            var k = (h.width - (this._getNumric(this.width) > 0 ? this._getNumric(this.width) : g.width)) / 2
                , j = (h.height - (this._getNumric(this.height) > 0 ? this._getNumric(this.height) : g.height)) * 4 / 9;
            j = j < this.minTopOffset ? this.minTopOffset : j;
            if (d || !this.fixed) {
                var i = $(window).scrollTop();
                if (i > 0) {
                    j += i
                }
            }
            f = {
                left: (f && f.left) || k,
                top: (f && f.top) || j
            };
            if (!d && this.fixed) {
                if (h.height - g.height <= f.top) {
                    this.getPanel().addClass("dialog_overflow");
                    this._layer.setOverFlow(true)
                } else {
                    this.getPanel().removeClass("dialog_overflow");
                    this._layer.setOverFlow(false)
                }
            }
            var l = this.positioned ? "animate" : "css";
            $.fn[l].call(this.getPanel(), f, 200);
            this.positioned = true;
            this.position = f
        },
        setFixed: function (f) {
            this.fixed = !!f;
            this._layer.setFixed(this.fixed)
        },
        getPosition: function () {
            return this.position
        },
        show: function (f) {
            if (this.visible) {
                return
            }
            var h = this;
            a(this).fire("beforeshow");
            var g;
            if (this._layer.getActiveStack()) {
                g = this._layer.getActiveStack();
                if (!this.reposition && !f && !this._layer.changeFixed) {
                    f = this._layer.getActiveStack().position()
                }
            }
            this._layer.show();
            this.getPanel().css({
                display: "",
                "z-index": 1
            });
            this.setPosition(f);
            g && g.trigger("close", [true]);
            this.visible = true;
            this._layer.setActiveStack(this._stackId);
            this.getPanel().animate({
                opacity: 1
            }, {
                queue: false,
                duration: 200,
                complete: function () {
                    a(h).fire("aftershow")
                }
            })
        },
        close: function () {
            var f = this.stackable ? "hide" : "destroy";
            this[f].apply(this, Array.prototype.slice.call(arguments))
        },
        hide: function (g, f) {
            if (typeof g == "function") {
                f = g;
                g = undefined
            }
            if (!this.visible) {
                typeof f == "function" && f();
                return
            }
            a(this).fire("beforeclose");
            a(this).fire("beforehide");
            this._layer.setActiveStack(null);
            this.visible = false;
            if (!g) {
                this._layer.hide()
            }
            this.getPanel().animate({
                opacity: 0
            }, {
                queue: false,
                duration: 200,
                complete: $.proxy(function () {
                    this.getPanel().css({
                        display: "none",
                        "z-index": 0
                    });
                    a(this).fire("afterhide");
                    a(this).fire("afterclose");
                    typeof f == "function" && f()
                }, this)
            })
        },
        destroy: function (g, f) {
            if (typeof g == "function") {
                f = g;
                g = undefined
            }
            if (this.destroyed) {
                M.error("Dialog already destroyed!");
                typeof f == "function" && f();
                return
            }
            a(this).fire("beforeclose");
            a(this).fire("beforedestroy");
            this.destroyed = true;
            this.hide(g, $.proxy(function () {
                if (this._panel.length) {
                    this._panel.undelegate();
                    this._panel.unbind();
                    this._panel.remove();
                    this._panel = null
                }
                this._layer = null;
                a(this).fire("afterdestroy");
                a(this).fire("afterclose");
                typeof f == "function" && f()
            }, this))
        }
    };
    return c
});
M.define("dialog/Dialog", function (c) {
    var d = c("dialog/DialogBase")
        , a = '<div class="popup-box layer_dialog _j_dialog pop_no_margin">                    <div class="dialog_title" style="display:none"><div class="_j_title title"></div></div>                    <div class="dialog_body _j_content"></div>                    <a id="popup_close" class="close-btn _j_close"><i></i></a>                </div>';
    var b = M.extend(function (e) {
        this.content = "";
        this.title = "";
        this.PANEL_CLASS = "";
        this.MASK_CLASS = "";
        b.$parent.call(this, e)
    }, d);
    M.mix(b.prototype, {
        tpl: a,
        setPanelContent: function () {
            this._dialogTitle = this._panel.find("._j_title");
            this._dialogContent = this._panel.find("._j_content");
            this.setTitle(this.title);
            this.setContent(this.content);
            this.addClass(this.PANEL_CLASS);
            this.getMask().addClass(this.MASK_CLASS)
        },
        setTitle: function (e) {
            if (e) {
                this._dialogTitle.html(e).parent().css("display", "")
            } else {
                this._dialogTitle.parent().css("display", "none")
            }
            this.title = e
        },
        getTitle: function () {
            return this.title
        },
        setContent: function (e) {
            this._dialogContent.empty().append(e)
        }
    });
    return b
});
M.define("dialog/alert", function (e, d) {
    var b = e("dialog/Dialog")
        , a = '<div id="popup_container" class="popup-box new-popbox"><a class="close-btn _j_close"><i></i></a><div class="pop-ico" id="_j_alertpopicon"><i class="i1"></i></div><div class="pop-ctn"><p class="hd _j_content"></p><p class="bd _j_detail"></p></div><div class="pop-btns"><a role="button" tabindex="0" class="popbtn popbtn-submit _j_close">&nbsp;确定&nbsp;</a></div></div>'
        , f = M.extend(function (j) {
            var i = {
                width: 420,
                content: "请输入内容",
                background: "#000",
                bgOpacity: 0.7,
                PANEL_CLASS: "pop_no_margin",
                reposition: true,
                impl: "Alert",
                layerZIndex: 10000
            };
            j = M.mix(i, j);
            f.$parent.call(this, j);
            this.bindEvents()
        }, b)
        , g = null
        , h = $.noop;
    M.mix(f.prototype, {
        tpl: a,
        setAlertTitle: function (i) {
            this.setContent(i)
        },
        setAlertContent: function (i) {
            this.getPanel().find("._j_detail").text(i)
        },
        setAssureWords: function (i) {
            this.getPanel().find(".popbtn-submit").text(i)
        },
        setCloserHide: function (i) {
            if (i) {
                this.getPanel().find(".close-btn").hide()
            } else {
                this.getPanel().find(".close-btn").show()
            }
        },
        bindEvents: function () {
            var i = this.getPanel();
            i.on("keydown", ".pop-btns ._j_close", function (j) {
                if (j.keyCode == 13) {
                    $(this).trigger("click")
                }
            }).on("click", ".pop-btns ._j_close", function (j) {
                i.data("btn_trigger", true)
            })
        }
    });
    var c = function (i, k, j) {
        if (!g) {
            g = new f();
            M.Event(g).on("afterhide", function () {
                var l = g.getPanel();
                if (typeof h == "function") {
                    h.call(g, l)
                }
                l.data("btn_trigger", false)
            });
            M.Event(g).on("aftershow", function () {
                g.getPanel().find(".pop-btns ._j_close").focus()
            })
        }
        g.getLayer().toFront();
        if (M.isObject(i)) {
            g.setAlertTitle(i.title);
            g.setAlertContent(i.content)
        } else {
            g.setAlertTitle(i);
            g.setAlertContent("")
        }
        if (M.isObject(i)) {
            if (i.assureWords) {
                g.setAssureWords(i.assureWords)
            } else {
                g.setAssureWords("确定")
            }
            if (i.hideCloser) {
                g.setCloserHide(true)
            } else {
                g.setCloserHide(false)
            }
        } else {
            g.setAssureWords("确定");
            g.setCloserHide(false)
        }
        if (typeof k == "function") {
            h = k
        } else {
            h = $.noop
        }
        if (j) {
            $("#_j_alertpopicon").children("i").attr("class", "i" + j)
        } else {
            $("#_j_alertpopicon").children("i").attr("class", "i" + 1)
        }
        g.show();
        return g
    };
    d.pop = c;
    d.warning = function (i, j) {
        c(i, j, 1)
    }
        ;
    d.tip = function (i, j) {
        c(i, j, 3)
    }
});
M.define("FrequencyVerifyControl", function (c, b, d) {
    function a(e) {
        this.container = e.container;
        this.app = e.app;
        this.successHandler = $.noop;
        M.mix(this, e);
        this.init()
    }
    a.prototype = {
        init: function () {
            this.initData();
            this.refreshImg();
            this.verifyCon.delegate("img,._j_change_img", "click", $.proxy(function (e) {
                this.refreshImg()
            }, this));
            this.verifyCon.delegate("._j_fre_confirm", "click", $.proxy(function (h) {
                var g = this.verifyText.val();
                var f = g.length;
                if (f == 0) {
                    this.showErro("您还没有输入验证码!");
                    return false
                } else {
                    if (f !== 6) {
                        this.showErro("请输入正确的验证码!");
                        return false
                    }
                }
                var e = $(h.currentTarget);
                if (e.hasClass("waiting")) {
                    return false
                }
                e.addClass("waiting");
                $.post("/user/captcha/verify", {
                    sCode: g,
                    iApp: this.app
                }, $.proxy(function (i) {
                    if (i) {
                        if (i.ret === 1) {
                            this.successHandler(this.target);
                            this.verifyCon.hide();
                            this.hideErro()
                        } else {
                            if (i.ret === 0) {
                                this.verifyText.val("");
                                this.verifyText.focus();
                                this.refreshImg();
                                this.showErro("输入的验证码不正确!")
                            } else {
                                if (i.ret === -1) {
                                    this.showErro("错误次数过多，请稍候尝试")
                                }
                            }
                        }
                    }
                    e.removeClass("waiting")
                }, this), "json")
            }, this));
            this.verifyCon.delegate("._j_fre_text", "keyup", $.proxy(function (e) {
                if (e.keyCode == 13) {
                    this.verifyCon.find("._j_fre_confirm").trigger("click")
                }
            }, this))
        },
        showErro: function (e) {
            this.errorCon.html(e);
            this.errorCon.show()
        },
        hideErro: function () {
            this.errorCon.hide()
        },
        initData: function () {
            this.verifyCon = this.container;
            this.verifyPo = this.verifyCon.find(".protectedYZM");
            this.verifyImg = this.verifyCon.find("img");
            this.verifyText = this.verifyCon.find("._j_fre_text");
            this.errorCon = this.verifyPo.find(".n-error")
        },
        refreshImg: function () {
            var e = "/user/captcha/code?iApp=" + this.app + "&s=" + new Date().getTime();
            this.verifyImg.attr("src", e)
        }
    };
    d.exports = a
});
M.define("FrequencySystemVerify", function (f, e, g) {
    var b = f("dialog/Dialog")
        , h = f("dialog/Layer")
        , d = f("FrequencyVerifyControl");
    var a = '<div class="popYzm" style="z-index:inherit;position: relative;width:350px;height: 250px"><div class="protectedYZM" style="border: none;box-shadow: none;padding:25px 15px;"><p>亲爱的蜂蜂，你操作的速度有点像机器人<br>来证明下自己吧~</p><div class="YZMInput"><input class="_j_fre_text" type="text" placeHolder="验证码"></div><div class="YZMInput"><img src="http://images.mafengwo.net/images/home_new2015/verify.gif" width="150px" height="40px"><label><a href="javascript:void(0);" class="_j_change_img">看不清，换一张</a></label></div><div class="YZMSubmit"><a href="javascript:void(0);" class="_j_fre_confirm" title="确定">确定</a><span class="n-error">错误次数过多，请稍候尝试</span></div></div></div>';
    function c(i) {
        this.app = i.app;
        this.init()
    }
    c.prototype = {
        init: function () {
            var i = new b({
                content: a
            });
            if (h.getActive()) {
                i.getLayer().setZIndex(h.getActive().getZIndex() + 1)
            }
            i.show();
            var j = i.getPanel().find(".popYzm");
            new d({
                container: j,
                app: this.app,
                successHandler: $.proxy(function () {
                    M.Event.fire("frequency:system:verify:success");
                    i.close()
                }, this)
            })
        }
    };
    g.exports = c
});
M.closure(function (d) {
    var b = d("dialog/Dialog")
        , f = d("dialog/alert")
        , c = d("FrequencySystemVerify");
    window.show_login = a;
    $.ajaxSetup({
        dataFilter: function (i, h) {
            try {
                var k = $.parseJSON(i);
                if (k && k.unsafe == 1) {
                    window.location.href = "http://www.mafengwo.cn";
                    return "{}"
                }
                if (k && k.error && k.error.msg == "login:required") {
                    M.Event.fire("login:required");
                    return "{}"
                }
                if (k && k.error && k.error.msg == "mobilebind:required") {
                    f.pop({
                        title: "依《网络安全法》要求，你需要在发布内容之前绑定手机号~",
                        assureWords: "去绑定",
                        hideCloser: true
                    }, function (m) {
                        location.href = window.Env.P_HTTP + "/setting/security/mobile/"
                    });
                    return {}
                }
                if (k && k.resource && k.resource.onload && k.resource.onload.length) {
                    if (k.resource.onload[0] == 'K.fire("login:required");') {
                        M.Event.fire("login:required");
                        return "{}"
                    }
                }
                if (k && k.error) {
                    var g = 0;
                    var l = 0;
                    if (typeof (k.error.errno) !== "undefined") {
                        g = k.error.errno;
                        l = k.error.error
                    } else {
                        if (typeof (k.error.code) !== "undefined") {
                            g = k.error.code;
                            l = k.error.msg
                        }
                    }
                    if (g === 10000) {
                        M.Event.fire("frequency:verify", l);
                        return "{}"
                    }
                }
            } catch (j) { }
            return i
        },
        error: function (g) {
            if (g.status == 401) {
                if (g.responseJSON && g.responseJSON.data && g.responseJSON.data.auth_type == "login") {
                    M.Event.fire("login:required")
                }
            }
        }
    });
    var e = null;
    function a() {
        document.location.href = (window.Env && window.Env.P_HTTP) || "https://passport.mafengwo.cn";
        return;
        if (!e) {
            e = new b({
                PANEL_CLASS: "login_pop",
                content: '<iframe frameborder="no" border="0" scrolling="no" width="580" height="292" allowtransparency="true"></iframe>',
                background: "#aaa",
                bgOpacity: 0.6,
                reposition: true,
                impl: "logindialog"
            })
        }
        e.show();
        if (!e.getPanel().find("iframe").attr("src")) {
            M.Event(e).once("aftershow", function () {
                var g = window.Env.P_HTTP || "https://passport.mafengwo.cn";
                e.getPanel().find("iframe").attr("src", g + "/login-popup.html")
            })
        }
    }
    M.Event.on("login:required", a);
    M.Event.on("frequency:verify", function (g) {
        new c({
            app: g
        })
    });
    if (M.Event.isFired("login:required")) {
        a()
    }
});
M.define("ScrollObserver", function (e, g, c) {
    var h = 0, f = {}, a = false, b, d = true;
    g.addObserver = function (k) {
        var j = "ScrollObserver_" + h;
        h++;
        f[j] = k;
        d = false;
        return j
    }
        ;
    g.removeObserver = function (j) {
        delete f[j];
        if (M.isEmpty(f)) {
            d = true
        }
    }
        ;
    function i() {
        for (var j in f) {
            if (f.hasOwnProperty(j)) {
                f[j]()
            }
        }
    }
    $(window).scroll(function () {
        if (d) {
            return
        }
        if (!a) {
            b = setInterval(function () {
                if (a) {
                    a = false;
                    clearTimeout(b);
                    i()
                }
            }, 50)
        }
        a = true
    });
    return g
});
M.define("TopTip", function (b, a, c) {
    c.exports = {
        show: function (d) {
            var d = $('<div id="over_container"><div id="over_message">' + d + "</div></div>").appendTo("body");
            setTimeout(function () {
                d.hide("fast", function () {
                    d.remove()
                })
            }, 3000)
        }
    }
});
M.define("QRCode", function (b, a, c) {
    c.exports = {
        gen: function (e, d) {
            var d = {
                text: e,
                size: d.size || 200,
                eclevel: d.evlevel || "H",
                logo: d.logo || "",
                __stk__: window.Env.CSTK
            };
            return "http://" + window.Env.WWW_HOST + "/qrcode.php?" + $.param(d)
        }
    }
});
var XDate = (function (X, D, ae, s) {
    var N = 0;
    var h = 1;
    var n = 2;
    var l = 3;
    var t = 4;
    var aa = 5;
    var d = 6;
    var ah = 7;
    var G = 8;
    var C = 9;
    var ab = 86400000;
    var T = "yyyy-MM-dd'T'HH:mm:ss(.fff)";
    var u = T + "zzz";
    var i = ["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds", "Day", "Year"];
    var m = ["Years", "Months", "Days"];
    var x = [12, 31, 24, 60, 60, 1000, 1];
    var z = new RegExp("(([a-zA-Z])\\2*)|(\\((('.*?'|\\(.*?\\)|.)*?)\\))|('(.*?)')");
    var b = X.UTC;
    var B = X.prototype.toUTCString;
    var r = S.prototype;
    r.length = 1;
    r.splice = ae.prototype.splice;
    function S() {
        return ad((this instanceof S) ? this : new S(), arguments)
    }
    function ad(an, am) {
        var ak = am.length;
        var al;
        if (R(am[ak - 1])) {
            al = am[--ak];
            am = w(am, 0, ak)
        }
        if (!ak) {
            an[0] = new X()
        } else {
            if (ak == 1) {
                var aj = am[0];
                if (aj instanceof X || ag(aj)) {
                    an[0] = new X(+aj)
                } else {
                    if (aj instanceof S) {
                        an[0] = E(aj)
                    } else {
                        if (k(aj)) {
                            an[0] = new X(0);
                            an = y(aj, al || false, an)
                        }
                    }
                }
            } else {
                an[0] = new X(b.apply(X, am));
                if (!al) {
                    an[0] = e(an[0])
                }
            }
        }
        if (R(al)) {
            q(an, al)
        }
        return an
    }
    r.getUTCMode = af(W);
    function W(aj) {
        return aj[0].toString === B
    }
    r.setUTCMode = af(q);
    function q(ak, aj, al) {
        if (aj) {
            if (!W(ak)) {
                if (al) {
                    ak[0] = j(ak[0])
                }
                ak[0].toString = B
            }
        } else {
            if (W(ak)) {
                if (al) {
                    ak[0] = e(ak[0])
                } else {
                    ak[0] = new X(+ak[0])
                }
            }
        }
        return ak
    }
    r.getTimezoneOffset = function () {
        if (W(this)) {
            return 0
        } else {
            return this[0].getTimezoneOffset()
        }
    }
        ;
    ac(i, function (ak, aj) {
        r["get" + ak] = function () {
            return P(this[0], W(this), aj)
        }
            ;
        if (aj != G) {
            r["getUTC" + ak] = function () {
                return P(this[0], true, aj)
            }
        }
        if (aj != ah) {
            r["set" + ak] = function (al) {
                H(this, aj, al, arguments, W(this));
                return this
            }
                ;
            if (aj != G) {
                r["setUTC" + ak] = function (al) {
                    H(this, aj, al, arguments, true);
                    return this
                }
                    ;
                r["add" + (m[aj] || ak)] = function (am, al) {
                    f(this, aj, am, al);
                    return this
                }
                    ;
                r["diff" + (m[aj] || ak)] = function (al) {
                    return I(this, al, aj)
                }
            }
        }
    });
    function H(an, aq, ao, am, ap) {
        var ak = o(P, an[0], ap);
        var aj = o(J, an[0], ap);
        var ar;
        var al = false;
        if (am.length == 2 && R(am[1])) {
            al = am[1];
            am = [ao]
        }
        if (aq == h) {
            ar = (ao % 12 + 12) % 12
        } else {
            ar = ak(h)
        }
        aj(aq, am);
        if (al && ak(h) != ar) {
            aj(h, [ak(h) - 1]);
            aj(n, [O(ak(N), ak(h))])
        }
    }
    function f(al, ak, an, aj) {
        an = Number(an);
        var am = D.floor(an);
        al["set" + i[ak]](al["get" + i[ak]]() + am, aj || false);
        if (am != an && ak < d) {
            f(al, ak + 1, (an - am) * x[ak], aj)
        }
    }
    function I(aj, aq, am) {
        aj = aj.clone().setUTCMode(true, true);
        aq = S(aq).setUTCMode(true, true);
        var al = 0;
        if (am == N || am == h) {
            for (var ao = d, ak; ao >= am; ao--) {
                al /= x[ao];
                al += P(aq, false, ao) - P(aj, false, ao)
            }
            if (am == h) {
                al += (aq.getFullYear() - aj.getFullYear()) * 12
            }
        } else {
            if (am == n) {
                var ap = aj.toDate().setUTCHours(0, 0, 0, 0);
                var an = aq.toDate().setUTCHours(0, 0, 0, 0);
                al = D.round((an - ap) / ab) + ((aq - an) - (aj - ap)) / ab
            } else {
                al = (aq - aj) / [3600000, 60000, 1000, 1][am - 3]
            }
        }
        return al
    }
    r.getWeek = function () {
        return a(o(P, this, false))
    }
        ;
    r.getUTCWeek = function () {
        return a(o(P, this, true))
    }
        ;
    r.setWeek = function (ak, aj) {
        c(this, ak, aj, false);
        return this
    }
        ;
    r.setUTCWeek = function (ak, aj) {
        c(this, ak, aj, true);
        return this
    }
        ;
    r.addWeeks = function (aj) {
        return this.addDays(Number(aj) * 7)
    }
        ;
    r.diffWeeks = function (aj) {
        return I(this, aj, n) / 7
    }
        ;
    function a(aj) {
        return K(aj(N), aj(h), aj(n))
    }
    function K(ak, am, aj) {
        var an = new X(b(ak, am, aj));
        var al = U(p(ak, am, aj));
        return D.floor(D.round((an - al) / ab) / 7) + 1
    }
    function p(ak, al, aj) {
        var am = new X(b(ak, al, aj));
        if (am < U(ak)) {
            return ak - 1
        } else {
            if (am >= U(ak + 1)) {
                return ak + 1
            }
        }
        return ak
    }
    function U(aj) {
        var ak = new X(b(aj, 0, 4));
        ak.setUTCDate(ak.getUTCDate() - (ak.getUTCDay() + 6) % 7);
        return ak
    }
    function c(am, ap, ak, ao) {
        var aj = o(P, am, ao);
        var an = o(J, am, ao);
        if (ak === s) {
            ak = p(aj(N), aj(h), aj(n))
        }
        var al = U(ak);
        if (!ao) {
            al = e(al)
        }
        am.setTime(+al);
        an(n, [aj(n) + (ap - 1) * 7])
    }
    S.parsers = [F];
    S.parse = function (aj) {
        return +S("" + aj)
    }
        ;
    function y(ao, aj, an) {
        var am = S.parsers;
        var al = 0;
        var ak;
        for (; al < am.length; al++) {
            ak = am[al](ao, aj, an);
            if (ak) {
                return ak
            }
        }
        an[0] = new X(ao);
        return an
    }
    function F(an, ak, al) {
        var aj = an.match(/^(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/);
        if (aj) {
            var am = new X(b(aj[1], aj[3] ? aj[3] - 1 : 0, aj[5] || 1, aj[7] || 0, aj[8] || 0, aj[10] || 0, aj[12] ? Number("0." + aj[12]) * 1000 : 0));
            if (aj[13]) {
                if (aj[14]) {
                    am.setUTCMinutes(am.getUTCMinutes() + (aj[15] == "-" ? 1 : -1) * (Number(aj[16]) * 60 + (aj[18] ? Number(aj[18]) : 0)))
                }
            } else {
                if (!ak) {
                    am = e(am)
                }
            }
            return al.setTime(+am)
        }
    }
    r.toString = function (aj, ak, al) {
        if (aj === s || !V(this)) {
            return this[0].toString()
        } else {
            return L(this, aj, ak, al, W(this))
        }
    }
        ;
    r.toUTCString = r.toGMTString = function (aj, ak, al) {
        if (aj === s || !V(this)) {
            return this[0].toUTCString()
        } else {
            return L(this, aj, ak, al, true)
        }
    }
        ;
    r.toISOString = function () {
        return this.toUTCString(u)
    }
        ;
    S.defaultLocale = "";
    S.locales = {
        "": {
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            amDesignator: "AM",
            pmDesignator: "PM"
        }
    };
    S.formatters = {
        i: T,
        u: u
    };
    function L(aq, am, ak, an, ar) {
        var aj = S.locales;
        var ap = aj[S.defaultLocale] || {};
        var al = o(P, aq, ar);
        ak = (k(ak) ? aj[ak] : ak) || {};
        function at(au) {
            return ak[au] || ap[au]
        }
        function ao(au) {
            if (an) {
                var av = (au == ah ? n : au) - 1;
                for (; av >= 0; av--) {
                    an.push(al(av))
                }
            }
            return al(au)
        }
        return Y(aq, am, ao, at, ar)
    }
    function Y(ap, ak, an, ao, aq) {
        var aj;
        var al;
        var am = "";
        while (aj = ak.match(z)) {
            am += ak.substr(0, aj.index);
            if (aj[1]) {
                am += Q(ap, aj[1], an, ao, aq)
            } else {
                if (aj[3]) {
                    al = Y(ap, aj[4], an, ao, aq);
                    if (parseInt(al.replace(/\D/g, ""), 10)) {
                        am += al
                    }
                } else {
                    am += aj[7] || "'"
                }
            }
            ak = ak.substr(aj.index + aj[0].length)
        }
        return am + ak
    }
    function Q(ap, an, al, ao, aq) {
        var aj = an.length;
        var am;
        var ak = "";
        while (aj > 0) {
            am = A(ap, an.substr(0, aj), al, ao, aq);
            if (am !== s) {
                ak += am;
                an = an.substr(aj);
                aj = an.length
            } else {
                aj--
            }
        }
        return ak + an
    }
    function A(an, al, aj, am, ap) {
        var ak = S.formatters[al];
        if (k(ak)) {
            return Y(an, ak, aj, am, ap)
        } else {
            if (v(ak)) {
                return ak(an, ap || false, am)
            }
        }
        switch (al) {
            case "fff":
                return Z(aj(d), 3);
            case "s":
                return aj(aa);
            case "ss":
                return Z(aj(aa));
            case "m":
                return aj(t);
            case "mm":
                return Z(aj(t));
            case "h":
                return aj(l) % 12 || 12;
            case "hh":
                return Z(aj(l) % 12 || 12);
            case "H":
                return aj(l);
            case "HH":
                return Z(aj(l));
            case "d":
                return aj(n);
            case "dd":
                return Z(aj(n));
            case "ddd":
                return am("dayNamesShort")[aj(ah)] || "";
            case "dddd":
                return am("dayNames")[aj(ah)] || "";
            case "M":
                return aj(h) + 1;
            case "MM":
                return Z(aj(h) + 1);
            case "MMM":
                return am("monthNamesShort")[aj(h)] || "";
            case "MMMM":
                return am("monthNames")[aj(h)] || "";
            case "yy":
                return (aj(N) + "").substring(2);
            case "yyyy":
                return aj(N);
            case "t":
                return ai(aj, am).substr(0, 1).toLowerCase();
            case "tt":
                return ai(aj, am).toLowerCase();
            case "T":
                return ai(aj, am).substr(0, 1);
            case "TT":
                return ai(aj, am);
            case "z":
            case "zz":
            case "zzz":
                return ap ? "Z" : g(an, al);
            case "w":
                return a(aj);
            case "ww":
                return Z(a(aj));
            case "S":
                var ao = aj(n);
                if (ao > 10 && ao < 20) {
                    return "th"
                }
                return ["st", "nd", "rd"][ao % 10 - 1] || "th"
        }
    }
    function g(ao, an) {
        var ap = ao.getTimezoneOffset();
        var ak = ap < 0 ? "+" : "-";
        var aj = D.floor(D.abs(ap) / 60);
        var am = D.abs(ap) % 60;
        var al = aj;
        if (an == "zz") {
            al = Z(aj)
        } else {
            if (an == "zzz") {
                al = Z(aj) + ":" + Z(am)
            }
        }
        return ak + al
    }
    function ai(aj, ak) {
        return aj(l) < 12 ? ak("amDesignator") : ak("pmDesignator")
    }
    ac(["getTime", "valueOf", "toDateString", "toTimeString", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toJSON"], function (aj) {
        r[aj] = function () {
            return this[0][aj]()
        }
    });
    r.setTime = function (aj) {
        this[0].setTime(aj);
        return this
    }
        ;
    r.valid = af(V);
    function V(aj) {
        return !isNaN(+aj[0])
    }
    r.clone = function () {
        return new S(this)
    }
        ;
    r.clearTime = function () {
        return this.setHours(0, 0, 0, 0)
    }
        ;
    r.toDate = function () {
        return new X(+this[0])
    }
        ;
    S.now = function () {
        return +new X()
    }
        ;
    S.today = function () {
        return new S().clearTime()
    }
        ;
    S.UTC = b;
    S.getDaysInMonth = O;
    function E(aj) {
        var ak = new X(+aj[0]);
        if (W(aj)) {
            ak.toString = B
        }
        return ak
    }
    function P(ak, al, aj) {
        return ak["get" + (al ? "UTC" : "") + i[aj]]()
    }
    function J(al, am, ak, aj) {
        al["set" + (am ? "UTC" : "") + i[ak]].apply(al, aj)
    }
    function j(aj) {
        return new X(b(aj.getFullYear(), aj.getMonth(), aj.getDate(), aj.getHours(), aj.getMinutes(), aj.getSeconds(), aj.getMilliseconds()))
    }
    function e(aj) {
        return new X(aj.getUTCFullYear(), aj.getUTCMonth(), aj.getUTCDate(), aj.getUTCHours(), aj.getUTCMinutes(), aj.getUTCSeconds(), aj.getUTCMilliseconds())
    }
    function O(aj, ak) {
        return 32 - new X(b(aj, ak, 32)).getUTCDate()
    }
    function af(aj) {
        return function () {
            return aj.apply(s, [this].concat(w(arguments)))
        }
    }
    function o(ak) {
        var aj = w(arguments, 1);
        return function () {
            return ak.apply(s, aj.concat(w(arguments)))
        }
    }
    function w(ak, al, aj) {
        return ae.prototype.slice.call(ak, al || 0, aj === s ? ak.length : aj)
    }
    function ac(aj, al) {
        for (var ak = 0; ak < aj.length; ak++) {
            al(aj[ak], ak)
        }
    }
    function k(aj) {
        return typeof aj == "string"
    }
    function ag(aj) {
        return typeof aj == "number"
    }
    function R(aj) {
        return typeof aj == "boolean"
    }
    function v(aj) {
        return typeof aj == "function"
    }
    function Z(ak, aj) {
        aj = aj || 2;
        ak += "";
        while (ak.length < aj) {
            ak = "0" + ak
        }
        return ak
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = S
    }
    if (typeof define === "function" && define.amd) {
        define([], function () {
            return S
        })
    } else {
        if (window.M && typeof window.M.define === "function") {
            window.M.define("xdate", function () {
                return S
            })
        }
    }
    return S
}
)(Date, Math, Array);
M.define("/js/hotel/module/FestivalDateConfig", function (d, c, e) {
    var a = d("xdate");
    var b = {
        specific: [{
            year: 2017,
            month: 1,
            day: 27,
            name: "除夕",
            shortName: "除夕"
        }, {
            year: 2017,
            month: 1,
            day: 28,
            name: "春节",
            shortName: "春节"
        }, {
            year: 2017,
            month: 2,
            day: 11,
            name: "元宵节",
            shortName: "元宵"
        }, {
            year: 2017,
            month: 4,
            day: 4,
            name: "清明",
            shortName: "清明"
        }, {
            year: 2017,
            month: 5,
            day: 30,
            name: "端午",
            shortName: "端午"
        }, {
            year: 2017,
            month: 10,
            day: 4,
            name: "中秋",
            shortName: "中秋"
        }],
        regular: [{
            month: 1,
            day: 1,
            name: "元旦",
            shortName: "元旦"
        }, {
            month: 2,
            day: 14,
            name: "情人节",
            shortName: null
        }, {
            month: 5,
            day: 1,
            name: "劳动节",
            shortName: "五一"
        }, {
            month: 10,
            day: 1,
            name: "国庆",
            shortName: "国庆"
        }, {
            month: 12,
            day: 25,
            name: "圣诞",
            shortName: "圣诞"
        }],
        getDateList: function () {
            var n = (new a()).getFullYear()
                , o = n + 1
                , p = this.specific.slice()
                , m = []
                , h = [];
            for (var l = 0; l < this.regular.length; l++) {
                var f = this.regular[l];
                for (var k = 0; k < p.length; k++) {
                    var g = p[k];
                    if (g.day === f.day && g.month === f.month && (g.year === n || g.year === o)) {
                        p.splice(k, 1)
                    }
                }
                m.push(M.mix({}, f, {
                    year: n
                }));
                m.push(M.mix({}, f, {
                    year: o
                }))
            }
            h = p.concat(m);
            h.sort(function (j, i) {
                if (j.year !== i.year) {
                    return j.year - i.year
                }
                if (j.month !== i.month) {
                    return j.month - i.month
                }
                return j.day - i.day
            });
            return h
        }
    };
    e.exports = b
});
/*! jQuery UI - v1.11.3 - 2015-02-15
* http://jqueryui.com
* Includes: core.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (window.M && typeof M.define === "function") {
            M.define("jqui-core", function () {
                return a(jQuery)
            })
        } else {
            a(jQuery)
        }
    }
}(function (e) {
    /*!
 * jQuery UI Core 1.11.3
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
    e.ui = e.ui || {};
    e.extend(e.ui, {
        version: "1.11.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    e.fn.extend({
        scrollParent: function (k) {
            var j = this.css("position")
                , i = j === "absolute"
                , l = k ? /(auto|scroll|hidden)/ : /(auto|scroll)/
                , m = this.parents().filter(function () {
                    var n = e(this);
                    if (i && n.css("position") === "static") {
                        return false
                    }
                    return l.test(n.css("overflow") + n.css("overflow-y") + n.css("overflow-x"))
                }).eq(0);
            return j === "fixed" || !m.length ? e(this[0].ownerDocument || document) : m
        },
        uniqueId: (function () {
            var i = 0;
            return function () {
                return this.each(function () {
                    if (!this.id) {
                        this.id = "ui-id-" + (++i)
                    }
                })
            }
        }
        )(),
        removeUniqueId: function () {
            return this.each(function () {
                if (/^ui-id-\d+$/.test(this.id)) {
                    e(this).removeAttr("id")
                }
            })
        }
    });
    function g(k, i) {
        var m, l, j, n = k.nodeName.toLowerCase();
        if ("area" === n) {
            m = k.parentNode;
            l = m.name;
            if (!k.href || !l || m.nodeName.toLowerCase() !== "map") {
                return false
            }
            j = e("img[usemap='#" + l + "']")[0];
            return !!j && f(j)
        }
        return (/^(input|select|textarea|button|object)$/.test(n) ? !k.disabled : "a" === n ? k.href || i : i) && f(k)
    }
    function f(i) {
        return e.expr.filters.visible(i) && !e(i).parents().addBack().filter(function () {
            return e.css(this, "visibility") === "hidden"
        }).length
    }
    e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function (i) {
            return function (j) {
                return !!e.data(j, i)
            }
        }) : function (l, k, j) {
            return !!e.data(l, j[3])
        }
        ,
        focusable: function (i) {
            return g(i, !isNaN(e.attr(i, "tabindex")))
        },
        tabbable: function (k) {
            var i = e.attr(k, "tabindex")
                , j = isNaN(i);
            return (j || i >= 0) && g(k, !j)
        }
    });
    if (!e("<a>").outerWidth(1).jquery) {
        e.each(["Width", "Height"], function (l, j) {
            var k = j === "Width" ? ["Left", "Right"] : ["Top", "Bottom"]
                , m = j.toLowerCase()
                , o = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            function n(q, p, i, r) {
                e.each(k, function () {
                    p -= parseFloat(e.css(q, "padding" + this)) || 0;
                    if (i) {
                        p -= parseFloat(e.css(q, "border" + this + "Width")) || 0
                    }
                    if (r) {
                        p -= parseFloat(e.css(q, "margin" + this)) || 0
                    }
                });
                return p
            }
            e.fn["inner" + j] = function (i) {
                if (i === undefined) {
                    return o["inner" + j].call(this)
                }
                return this.each(function () {
                    e(this).css(m, n(this, i) + "px")
                })
            }
                ;
            e.fn["outer" + j] = function (i, p) {
                if (typeof i !== "number") {
                    return o["outer" + j].call(this, i)
                }
                return this.each(function () {
                    e(this).css(m, n(this, i, true, p) + "px")
                })
            }
        })
    }
    if (!e.fn.addBack) {
        e.fn.addBack = function (i) {
            return this.add(i == null ? this.prevObject : this.prevObject.filter(i))
        }
    }
    if (e("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        e.fn.removeData = (function (i) {
            return function (j) {
                if (arguments.length) {
                    return i.call(this, e.camelCase(j))
                } else {
                    return i.call(this)
                }
            }
        }
        )(e.fn.removeData)
    }
    e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    e.fn.extend({
        focus: (function (i) {
            return function (j, k) {
                return typeof j === "number" ? this.each(function () {
                    var l = this;
                    setTimeout(function () {
                        e(l).focus();
                        if (k) {
                            k.call(l)
                        }
                    }, j)
                }) : i.apply(this, arguments)
            }
        }
        )(e.fn.focus),
        disableSelection: (function () {
            var i = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(i + ".ui-disableSelection", function (j) {
                    j.preventDefault()
                })
            }
        }
        )(),
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function (l) {
            if (l !== undefined) {
                return this.css("zIndex", l)
            }
            if (this.length) {
                var j = e(this[0]), i, k;
                while (j.length && j[0] !== document) {
                    i = j.css("position");
                    if (i === "absolute" || i === "relative" || i === "fixed") {
                        k = parseInt(j.css("zIndex"), 10);
                        if (!isNaN(k) && k !== 0) {
                            return k
                        }
                    }
                    j = j.parent()
                }
            }
            return 0
        }
    });
    e.ui.plugin = {
        add: function (k, l, n) {
            var j, m = e.ui[k].prototype;
            for (j in n) {
                m.plugins[j] = m.plugins[j] || [];
                m.plugins[j].push([l, n[j]])
            }
        },
        call: function (j, m, l, k) {
            var n, o = j.plugins[m];
            if (!o) {
                return
            }
            if (!k && (!j.element[0].parentNode || j.element[0].parentNode.nodeType === 11)) {
                return
            }
            for (n = 0; n < o.length; n++) {
                if (j.options[o[n][0]]) {
                    o[n][1].apply(j.element, l)
                }
            }
        }
    };
    /*!
 * jQuery UI Widget 1.11.3
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
    var h = 0
        , b = Array.prototype.slice;
    e.cleanData = (function (i) {
        return function (j) {
            var l, m, k;
            for (k = 0; (m = j[k]) != null; k++) {
                try {
                    l = e._data(m, "events");
                    if (l && l.remove) {
                        e(m).triggerHandler("remove")
                    }
                } catch (n) { }
            }
            i(j)
        }
    }
    )(e.cleanData);
    e.widget = function (i, j, q) {
        var n, o, l, p, k = {}, m = i.split(".")[0];
        i = i.split(".")[1];
        n = m + "-" + i;
        if (!q) {
            q = j;
            j = e.Widget
        }
        e.expr[":"][n.toLowerCase()] = function (r) {
            return !!e.data(r, n)
        }
            ;
        e[m] = e[m] || {};
        o = e[m][i];
        l = e[m][i] = function (r, s) {
            if (!this._createWidget) {
                return new l(r, s)
            }
            if (arguments.length) {
                this._createWidget(r, s)
            }
        }
            ;
        e.extend(l, o, {
            version: q.version,
            _proto: e.extend({}, q),
            _childConstructors: []
        });
        p = new j();
        p.options = e.widget.extend({}, p.options);
        e.each(q, function (s, r) {
            if (!e.isFunction(r)) {
                k[s] = r;
                return
            }
            k[s] = (function () {
                var t = function () {
                    return j.prototype[s].apply(this, arguments)
                }
                    , u = function (v) {
                        return j.prototype[s].apply(this, v)
                    };
                return function () {
                    var x = this._super, v = this._superApply, w;
                    this._super = t;
                    this._superApply = u;
                    w = r.apply(this, arguments);
                    this._super = x;
                    this._superApply = v;
                    return w
                }
            }
            )()
        });
        l.prototype = e.widget.extend(p, {
            widgetEventPrefix: o ? (p.widgetEventPrefix || i) : i
        }, k, {
            constructor: l,
            namespace: m,
            widgetName: i,
            widgetFullName: n
        });
        if (o) {
            e.each(o._childConstructors, function (s, t) {
                var r = t.prototype;
                e.widget(r.namespace + "." + r.widgetName, l, t._proto)
            });
            delete o._childConstructors
        } else {
            j._childConstructors.push(l)
        }
        e.widget.bridge(i, l);
        return l
    }
        ;
    e.widget.extend = function (n) {
        var j = b.call(arguments, 1), m = 0, i = j.length, k, l;
        for (; m < i; m++) {
            for (k in j[m]) {
                l = j[m][k];
                if (j[m].hasOwnProperty(k) && l !== undefined) {
                    if (e.isPlainObject(l)) {
                        n[k] = e.isPlainObject(n[k]) ? e.widget.extend({}, n[k], l) : e.widget.extend({}, l)
                    } else {
                        n[k] = l
                    }
                }
            }
        }
        return n
    }
        ;
    e.widget.bridge = function (j, i) {
        var k = i.prototype.widgetFullName || j;
        e.fn[j] = function (n) {
            var l = typeof n === "string"
                , m = b.call(arguments, 1)
                , o = this;
            if (l) {
                this.each(function () {
                    var q, p = e.data(this, k);
                    if (n === "instance") {
                        o = p;
                        return false
                    }
                    if (!p) {
                        return e.error("cannot call methods on " + j + " prior to initialization; attempted to call method '" + n + "'")
                    }
                    if (!e.isFunction(p[n]) || n.charAt(0) === "_") {
                        return e.error("no such method '" + n + "' for " + j + " widget instance")
                    }
                    q = p[n].apply(p, m);
                    if (q !== p && q !== undefined) {
                        o = q && q.jquery ? o.pushStack(q.get()) : q;
                        return false
                    }
                })
            } else {
                if (m.length) {
                    n = e.widget.extend.apply(null, [n].concat(m))
                }
                this.each(function () {
                    var p = e.data(this, k);
                    if (p) {
                        p.option(n || {});
                        if (p._init) {
                            p._init()
                        }
                    } else {
                        e.data(this, k, new i(n, this))
                    }
                })
            }
            return o
        }
    }
        ;
    e.Widget = function () { }
        ;
    e.Widget._childConstructors = [];
    e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function (i, j) {
            j = e(j || this.defaultElement || this)[0];
            this.element = e(j);
            this.uuid = h++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = e();
            this.hoverable = e();
            this.focusable = e();
            if (j !== this) {
                e.data(j, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function (k) {
                        if (k.target === j) {
                            this.destroy()
                        }
                    }
                });
                this.document = e(j.style ? j.ownerDocument : j.document || j);
                this.window = e(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this.options = e.widget.extend({}, this.options, this._getCreateOptions(), i);
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function () {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function () {
            return this.element
        },
        option: function (m, n) {
            var j = m, o, l, k;
            if (arguments.length === 0) {
                return e.widget.extend({}, this.options)
            }
            if (typeof m === "string") {
                j = {};
                o = m.split(".");
                m = o.shift();
                if (o.length) {
                    l = j[m] = e.widget.extend({}, this.options[m]);
                    for (k = 0; k < o.length - 1; k++) {
                        l[o[k]] = l[o[k]] || {};
                        l = l[o[k]]
                    }
                    m = o.pop();
                    if (arguments.length === 1) {
                        return l[m] === undefined ? null : l[m]
                    }
                    l[m] = n
                } else {
                    if (arguments.length === 1) {
                        return this.options[m] === undefined ? null : this.options[m]
                    }
                    j[m] = n
                }
            }
            this._setOptions(j);
            return this
        },
        _setOptions: function (i) {
            var j;
            for (j in i) {
                this._setOption(j, i[j])
            }
            return this
        },
        _setOption: function (i, j) {
            this.options[i] = j;
            if (i === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled", !!j);
                if (j) {
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus")
                }
            }
            return this
        },
        enable: function () {
            return this._setOptions({
                disabled: false
            })
        },
        disable: function () {
            return this._setOptions({
                disabled: true
            })
        },
        _on: function (l, k, j) {
            var m, i = this;
            if (typeof l !== "boolean") {
                j = k;
                k = l;
                l = false
            }
            if (!j) {
                j = k;
                k = this.element;
                m = this.widget()
            } else {
                k = m = e(k);
                this.bindings = this.bindings.add(k)
            }
            e.each(j, function (s, r) {
                function p() {
                    if (!l && (i.options.disabled === true || e(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof r === "string" ? i[r] : r).apply(i, arguments)
                }
                if (typeof r !== "string") {
                    p.guid = r.guid = r.guid || p.guid || e.guid++
                }
                var q = s.match(/^([\w:-]*)\s*(.*)$/)
                    , o = q[1] + i.eventNamespace
                    , n = q[2];
                if (n) {
                    m.delegate(n, o, p)
                } else {
                    k.bind(o, p)
                }
            })
        },
        _off: function (j, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            j.unbind(i).undelegate(i);
            this.bindings = e(this.bindings.not(j).get());
            this.focusable = e(this.focusable.not(j).get());
            this.hoverable = e(this.hoverable.not(j).get())
        },
        _delay: function (l, k) {
            function j() {
                return (typeof l === "string" ? i[l] : l).apply(i, arguments)
            }
            var i = this;
            return setTimeout(j, k || 0)
        },
        _hoverable: function (i) {
            this.hoverable = this.hoverable.add(i);
            this._on(i, {
                mouseenter: function (j) {
                    e(j.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (j) {
                    e(j.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (i) {
            this.focusable = this.focusable.add(i);
            this._on(i, {
                focusin: function (j) {
                    e(j.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (j) {
                    e(j.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (i, j, k) {
            var n, m, l = this.options[i];
            k = k || {};
            j = e.Event(j);
            j.type = (i === this.widgetEventPrefix ? i : this.widgetEventPrefix + i).toLowerCase();
            j.target = this.element[0];
            m = j.originalEvent;
            if (m) {
                for (n in m) {
                    if (!(n in j)) {
                        j[n] = m[n]
                    }
                }
            }
            this.element.trigger(j, k);
            return !(e.isFunction(l) && l.apply(this.element[0], [j].concat(k)) === false || j.isDefaultPrevented())
        }
    };
    e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (j, i) {
        e.Widget.prototype["_" + j] = function (m, l, o) {
            if (typeof l === "string") {
                l = {
                    effect: l
                }
            }
            var n, k = !l ? j : l === true || typeof l === "number" ? i : l.effect || i;
            l = l || {};
            if (typeof l === "number") {
                l = {
                    duration: l
                }
            }
            n = !e.isEmptyObject(l);
            l.complete = o;
            if (l.delay) {
                m.delay(l.delay)
            }
            if (n && e.effects && e.effects.effect[k]) {
                m[j](l)
            } else {
                if (k !== j && m[k]) {
                    m[k](l.duration, l.easing, o)
                } else {
                    m.queue(function (p) {
                        e(this)[j]();
                        if (o) {
                            o.call(m[0])
                        }
                        p()
                    })
                }
            }
        }
    });
    var d = e.widget;
    /*!
 * jQuery UI Mouse 1.11.3
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */
    var a = false;
    e(document).mouseup(function () {
        a = false
    });
    var c = e.widget("ui.mouse", {
        version: "1.11.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var i = this;
            this.element.bind("mousedown." + this.widgetName, function (j) {
                return i._mouseDown(j)
            }).bind("click." + this.widgetName, function (j) {
                if (true === e.data(j.target, i.widgetName + ".preventClickEvent")) {
                    e.removeData(j.target, i.widgetName + ".preventClickEvent");
                    j.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function (k) {
            if (a) {
                return
            }
            this._mouseMoved = false;
            (this._mouseStarted && this._mouseUp(k));
            this._mouseDownEvent = k;
            var j = this
                , l = (k.which === 1)
                , i = (typeof this.options.cancel === "string" && k.target.nodeName ? e(k.target).closest(this.options.cancel).length : false);
            if (!l || i || !this._mouseCapture(k)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    j.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(k) && this._mouseDelayMet(k)) {
                this._mouseStarted = (this._mouseStart(k) !== false);
                if (!this._mouseStarted) {
                    k.preventDefault();
                    return true
                }
            }
            if (true === e.data(k.target, this.widgetName + ".preventClickEvent")) {
                e.removeData(k.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function (m) {
                return j._mouseMove(m)
            }
                ;
            this._mouseUpDelegate = function (m) {
                return j._mouseUp(m)
            }
                ;
            this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            k.preventDefault();
            a = true;
            return true
        },
        _mouseMove: function (i) {
            if (this._mouseMoved) {
                if (e.ui.ie && (!document.documentMode || document.documentMode < 9) && !i.button) {
                    return this._mouseUp(i)
                } else {
                    if (!i.which) {
                        return this._mouseUp(i)
                    }
                }
            }
            if (i.which || i.button) {
                this._mouseMoved = true
            }
            if (this._mouseStarted) {
                this._mouseDrag(i);
                return i.preventDefault()
            }
            if (this._mouseDistanceMet(i) && this._mouseDelayMet(i)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, i) !== false);
                (this._mouseStarted ? this._mouseDrag(i) : this._mouseUp(i))
            }
            return !this._mouseStarted
        },
        _mouseUp: function (i) {
            this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (i.target === this._mouseDownEvent.target) {
                    e.data(i.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(i)
            }
            a = false;
            return false
        },
        _mouseDistanceMet: function (i) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - i.pageX), Math.abs(this._mouseDownEvent.pageY - i.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () { },
        _mouseDrag: function () { },
        _mouseStop: function () { },
        _mouseCapture: function () {
            return true
        }
    })
}));
/*!
 * jQuery UI Datepicker 1.11.3
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */
M.define("jqui-datepicker", function (d) {
    d("jqui-core");
    $.extend($.ui, {
        datepicker: {
            version: "1.11.3"
        }
    });
    var g;
    function h(j) {
        var i, k;
        while (j.length && j[0] !== document) {
            i = j.css("position");
            if (i === "absolute" || i === "relative" || i === "fixed") {
                k = parseInt(j.css("zIndex"), 10);
                if (!isNaN(k) && k !== 0) {
                    return k
                }
            }
            j = j.parent()
        }
        return 0
    }
    function c() {
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            renderDay: null,
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.regional.en = $.extend(true, {}, this.regional[""]);
        this.regional["en-US"] = $.extend(true, {}, this.regional.en);
        this.dpDiv = b($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    $.extend(c.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (i) {
            a(this._defaults, i || {});
            return this
        },
        _attachDatepicker: function (l, i) {
            var m, k, j;
            m = l.nodeName.toLowerCase();
            k = (m === "div" || m === "span");
            if (!l.id) {
                this.uuid += 1;
                l.id = "dp" + this.uuid
            }
            j = this._newInst($(l), k);
            j.settings = $.extend({}, i || {});
            if (m === "input") {
                this._connectDatepicker(l, j)
            } else {
                if (k) {
                    this._inlineDatepicker(l, j)
                }
            }
        },
        _newInst: function (j, i) {
            var k = j[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: k,
                input: j,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: (!i ? this.dpDiv : b($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
            }
        },
        _connectDatepicker: function (k, j) {
            var i = $(k);
            j.append = $([]);
            j.trigger = $([]);
            if (i.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(i, j);
            i.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
            this._autoSize(j);
            $.data(k, "datepicker", j);
            if (j.settings.disabled) {
                this._disableDatepicker(k)
            }
        },
        _attachments: function (k, n) {
            var j, m, i, o = this._get(n, "appendText"), l = this._get(n, "isRTL");
            if (n.append) {
                n.append.remove()
            }
            if (o) {
                n.append = $("<span class='" + this._appendClass + "'>" + o + "</span>");
                k[l ? "before" : "after"](n.append)
            }
            k.unbind("focus", this._showDatepicker);
            if (n.trigger) {
                n.trigger.remove()
            }
            j = this._get(n, "showOn");
            if (j === "focus" || j === "both") {
                k.focus(this._showDatepicker)
            }
            if (j === "button" || j === "both") {
                m = this._get(n, "buttonText");
                i = this._get(n, "buttonImage");
                n.trigger = $(this._get(n, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: i,
                    alt: m,
                    title: m
                }) : $("<button type='button'></button>").addClass(this._triggerClass).html(!i ? m : $("<img/>").attr({
                    src: i,
                    alt: m,
                    title: m
                })));
                k[l ? "before" : "after"](n.trigger);
                n.trigger.click(function () {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput === k[0]) {
                        $.datepicker._hideDatepicker()
                    } else {
                        if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== k[0]) {
                            $.datepicker._hideDatepicker();
                            $.datepicker._showDatepicker(k[0])
                        } else {
                            $.datepicker._showDatepicker(k[0])
                        }
                    }
                    return false
                })
            }
        },
        _autoSize: function (p) {
            if (this._get(p, "autoSize") && !p.inline) {
                var m, k, l, o, n = new Date(2009, 12 - 1, 20), j = this._get(p, "dateFormat");
                if (j.match(/[DM]/)) {
                    m = function (i) {
                        k = 0;
                        l = 0;
                        for (o = 0; o < i.length; o++) {
                            if (i[o].length > k) {
                                k = i[o].length;
                                l = o
                            }
                        }
                        return l
                    }
                        ;
                    n.setMonth(m(this._get(p, (j.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    n.setDate(m(this._get(p, (j.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - n.getDay())
                }
                p.input.attr("size", this._formatDate(p, n).length)
            }
        },
        _inlineDatepicker: function (j, i) {
            var k = $(j);
            if (k.hasClass(this.markerClassName)) {
                return
            }
            k.addClass(this.markerClassName).append(i.dpDiv);
            $.data(j, "datepicker", i);
            this._setDate(i, this._getDefaultDate(i), true);
            this._updateDatepicker(i);
            this._updateAlternate(i);
            if (i.settings.disabled) {
                this._disableDatepicker(j)
            }
            i.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function (p, j, n, k, o) {
            var i, s, m, r, q, l = this._dialogInst;
            if (!l) {
                this.uuid += 1;
                i = "dp" + this.uuid;
                this._dialogInput = $("<input type='text' id='" + i + "' style='position: absolute; top: -100px; width: 0px;'/>");
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                l = this._dialogInst = this._newInst(this._dialogInput, false);
                l.settings = {};
                $.data(this._dialogInput[0], "datepicker", l)
            }
            a(l.settings, k || {});
            j = (j && j.constructor === Date ? this._formatDate(l, j) : j);
            this._dialogInput.val(j);
            this._pos = (o ? (o.length ? o : [o.pageX, o.pageY]) : null);
            if (!this._pos) {
                s = document.documentElement.clientWidth;
                m = document.documentElement.clientHeight;
                r = document.documentElement.scrollLeft || document.body.scrollLeft;
                q = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(s / 2) - 100 + r, (m / 2) - 150 + q]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            l.settings.onSelect = n;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv)
            }
            $.data(this._dialogInput[0], "datepicker", l);
            return this
        },
        _destroyDatepicker: function (k) {
            var l, i = $(k), j = $.data(k, "datepicker");
            if (!i.hasClass(this.markerClassName)) {
                return
            }
            l = k.nodeName.toLowerCase();
            $.removeData(k, "datepicker");
            if (l === "input") {
                j.append.remove();
                j.trigger.remove();
                i.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (l === "div" || l === "span") {
                    i.removeClass(this.markerClassName).empty()
                }
            }
            if (g === j) {
                g = null
            }
        },
        _enableDatepicker: function (l) {
            var m, k, i = $(l), j = $.data(l, "datepicker");
            if (!i.hasClass(this.markerClassName)) {
                return
            }
            m = l.nodeName.toLowerCase();
            if (m === "input") {
                l.disabled = false;
                j.trigger.filter("button").each(function () {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (m === "div" || m === "span") {
                    k = i.children("." + this._inlineClass);
                    k.children().removeClass("ui-state-disabled");
                    k.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (n) {
                return (n === l ? null : n)
            })
        },
        _disableDatepicker: function (l) {
            var m, k, i = $(l), j = $.data(l, "datepicker");
            if (!i.hasClass(this.markerClassName)) {
                return
            }
            m = l.nodeName.toLowerCase();
            if (m === "input") {
                l.disabled = true;
                j.trigger.filter("button").each(function () {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (m === "div" || m === "span") {
                    k = i.children("." + this._inlineClass);
                    k.children().addClass("ui-state-disabled");
                    k.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (n) {
                return (n === l ? null : n)
            });
            this._disabledInputs[this._disabledInputs.length] = l
        },
        _isDisabledDatepicker: function (k) {
            if (!k) {
                return false
            }
            for (var j = 0; j < this._disabledInputs.length; j++) {
                if (this._disabledInputs[j] === k) {
                    return true
                }
            }
            return false
        },
        _getInst: function (j) {
            try {
                return $.data(j, "datepicker")
            } catch (i) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (o, j, n) {
            var k, i, m, p, l = this._getInst(o);
            if (arguments.length === 2 && typeof j === "string") {
                return (j === "defaults" ? $.extend({}, $.datepicker._defaults) : (l ? (j === "all" ? $.extend({}, l.settings) : this._get(l, j)) : null))
            }
            k = j || {};
            if (typeof j === "string") {
                k = {};
                k[j] = n
            }
            if (l) {
                if (this._curInst === l) {
                    this._hideDatepicker()
                }
                i = this._getDateDatepicker(o, true);
                m = this._getMinMaxDate(l, "min");
                p = this._getMinMaxDate(l, "max");
                a(l.settings, k);
                if (m !== null && k.dateFormat !== undefined && k.minDate === undefined) {
                    l.settings.minDate = this._formatDate(l, m)
                }
                if (p !== null && k.dateFormat !== undefined && k.maxDate === undefined) {
                    l.settings.maxDate = this._formatDate(l, p)
                }
                if ("disabled" in k) {
                    if (k.disabled) {
                        this._disableDatepicker(o)
                    } else {
                        this._enableDatepicker(o)
                    }
                }
                this._attachments($(o), l);
                this._autoSize(l);
                this._setDate(l, i);
                this._updateAlternate(l);
                this._updateDatepicker(l)
            }
        },
        _changeDatepicker: function (k, i, j) {
            this._optionDatepicker(k, i, j)
        },
        _refreshDatepicker: function (j) {
            var i = this._getInst(j);
            if (i) {
                this._updateDatepicker(i)
            }
        },
        _setDateDatepicker: function (k, i) {
            var j = this._getInst(k);
            if (j) {
                this._setDate(j, i);
                this._updateDatepicker(j);
                this._updateAlternate(j)
            }
        },
        _getDateDatepicker: function (k, i) {
            var j = this._getInst(k);
            if (j && !j.inline) {
                this._setDateFromField(j, i)
            }
            return (j ? this._getDate(j) : null)
        },
        _doKeyDown: function (l) {
            var j, i, n, m = $.datepicker._getInst(l.target), o = true, k = m.dpDiv.is(".ui-datepicker-rtl");
            m._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (l.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker();
                        o = false;
                        break;
                    case 13:
                        n = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", m.dpDiv);
                        if (n[0]) {
                            $.datepicker._selectDay(l.target, m.selectedMonth, m.selectedYear, n[0])
                        }
                        j = $.datepicker._get(m, "onSelect");
                        if (j) {
                            i = $.datepicker._formatDate(m);
                            j.apply((m.input ? m.input[0] : null), [i, m])
                        } else {
                            $.datepicker._hideDatepicker()
                        }
                        return false;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(l.target, (l.ctrlKey ? -$.datepicker._get(m, "stepBigMonths") : -$.datepicker._get(m, "stepMonths")), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(l.target, (l.ctrlKey ? +$.datepicker._get(m, "stepBigMonths") : +$.datepicker._get(m, "stepMonths")), "M");
                        break;
                    case 35:
                        if (l.ctrlKey || l.metaKey) {
                            $.datepicker._clearDate(l.target)
                        }
                        o = l.ctrlKey || l.metaKey;
                        break;
                    case 36:
                        if (l.ctrlKey || l.metaKey) {
                            $.datepicker._gotoToday(l.target)
                        }
                        o = l.ctrlKey || l.metaKey;
                        break;
                    case 37:
                        if (l.ctrlKey || l.metaKey) {
                            $.datepicker._adjustDate(l.target, (k ? +1 : -1), "D")
                        }
                        o = l.ctrlKey || l.metaKey;
                        if (l.originalEvent.altKey) {
                            $.datepicker._adjustDate(l.target, (l.ctrlKey ? -$.datepicker._get(m, "stepBigMonths") : -$.datepicker._get(m, "stepMonths")), "M")
                        }
                        break;
                    case 38:
                        if (l.ctrlKey || l.metaKey) {
                            $.datepicker._adjustDate(l.target, -7, "D")
                        }
                        o = l.ctrlKey || l.metaKey;
                        break;
                    case 39:
                        if (l.ctrlKey || l.metaKey) {
                            $.datepicker._adjustDate(l.target, (k ? -1 : +1), "D")
                        }
                        o = l.ctrlKey || l.metaKey;
                        if (l.originalEvent.altKey) {
                            $.datepicker._adjustDate(l.target, (l.ctrlKey ? +$.datepicker._get(m, "stepBigMonths") : +$.datepicker._get(m, "stepMonths")), "M")
                        }
                        break;
                    case 40:
                        if (l.ctrlKey || l.metaKey) {
                            $.datepicker._adjustDate(l.target, +7, "D")
                        }
                        o = l.ctrlKey || l.metaKey;
                        break;
                    default:
                        o = false
                }
            } else {
                if (l.keyCode === 36 && l.ctrlKey) {
                    $.datepicker._showDatepicker(this)
                } else {
                    o = false
                }
            }
            if (o) {
                l.preventDefault();
                l.stopPropagation()
            }
        },
        _doKeyPress: function (k) {
            var j, i, l = $.datepicker._getInst(k.target);
            if ($.datepicker._get(l, "constrainInput")) {
                j = $.datepicker._possibleChars($.datepicker._get(l, "dateFormat"));
                i = String.fromCharCode(k.charCode == null ? k.keyCode : k.charCode);
                return k.ctrlKey || k.metaKey || (i < " " || !j || j.indexOf(i) > -1)
            }
        },
        _doKeyUp: function (k) {
            var i, l = $.datepicker._getInst(k.target);
            if (l.input.val() !== l.lastVal) {
                try {
                    i = $.datepicker.parseDate($.datepicker._get(l, "dateFormat"), (l.input ? l.input.val() : null), $.datepicker._getFormatConfig(l));
                    if (i) {
                        $.datepicker._setDateFromField(l);
                        $.datepicker._updateAlternate(l);
                        $.datepicker._updateDatepicker(l)
                    }
                } catch (j) { }
            }
            return true
        },
        _showDatepicker: function (j) {
            j = j.target || j;
            if (j.nodeName.toLowerCase() !== "input") {
                j = $("input", j.parentNode)[0]
            }
            if ($.datepicker._isDisabledDatepicker(j) || $.datepicker._lastInput === j) {
                return
            }
            var l, p, k, n, o, i, m;
            l = $.datepicker._getInst(j);
            if ($.datepicker._curInst && $.datepicker._curInst !== l) {
                $.datepicker._curInst.dpDiv.stop(true, true);
                if (l && $.datepicker._datepickerShowing) {
                    $.datepicker._hideDatepicker($.datepicker._curInst.input[0])
                }
            }
            p = $.datepicker._get(l, "beforeShow");
            k = p ? p.apply(j, [j, l]) : {};
            if (k === false) {
                return
            }
            a(l.settings, k);
            l.lastVal = null;
            $.datepicker._lastInput = j;
            $.datepicker._setDateFromField(l);
            if ($.datepicker._inDialog) {
                j.value = ""
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(j);
                $.datepicker._pos[1] += j.offsetHeight
            }
            n = false;
            $(j).parents().each(function () {
                n |= $(this).css("position") === "fixed";
                return !n
            });
            o = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            l.dpDiv.empty();
            l.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            $.datepicker._updateDatepicker(l);
            o = $.datepicker._checkOffset(l, o, n);
            l.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static" : (n ? "fixed" : "absolute")),
                display: "none",
                left: o.left + "px",
                top: o.top + "px"
            });
            if (!l.inline) {
                i = $.datepicker._get(l, "showAnim");
                m = $.datepicker._get(l, "duration");
                l.dpDiv.css("z-index", h($(j)) + 1);
                $.datepicker._datepickerShowing = true;
                if ($.effects && $.effects.effect[i]) {
                    l.dpDiv.show(i, $.datepicker._get(l, "showOptions"), m)
                } else {
                    l.dpDiv[i || "show"](i ? m : null)
                }
                if ($.datepicker._shouldFocusInput(l)) {
                    l.input.focus()
                }
                $.datepicker._curInst = l
            }
        },
        _updateDatepicker: function (l) {
            this.maxRows = 4;
            g = l;
            l.dpDiv.empty().append(this._generateHTML(l));
            this._attachHandlers(l);
            var n, i = this._getNumberOfMonths(l), m = i[1], k = 17, j = l.dpDiv.find("." + this._dayOverClass + " a");
            if (j.length > 0) {
                f.apply(j.get(0))
            }
            l.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (m > 1) {
                l.dpDiv.addClass("ui-datepicker-multi-" + m).css("width", (k * m) + "em")
            }
            l.dpDiv[(i[0] !== 1 || i[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            l.dpDiv[(this._get(l, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (l === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(l)) {
                l.input.focus()
            }
            if (l.yearshtml) {
                n = l.yearshtml;
                setTimeout(function () {
                    if (n === l.yearshtml && l.yearshtml) {
                        l.dpDiv.find("select.ui-datepicker-year:first").replaceWith(l.yearshtml)
                    }
                    n = l.yearshtml = null
                }, 0)
            }
        },
        _shouldFocusInput: function (i) {
            return i.input && i.input.is(":visible") && !i.input.is(":disabled") && !i.input.is(":focus")
        },
        _checkOffset: function (n, l, k) {
            var m = n.dpDiv.outerWidth()
                , q = n.dpDiv.outerHeight()
                , p = n.input ? n.input.outerWidth() : 0
                , i = n.input ? n.input.outerHeight() : 0
                , o = document.documentElement.clientWidth + (k ? 0 : $(document).scrollLeft())
                , j = document.documentElement.clientHeight + (k ? 0 : $(document).scrollTop());
            l.left -= (this._get(n, "isRTL") ? (m - p) : 0);
            l.left -= (k && l.left === n.input.offset().left) ? $(document).scrollLeft() : 0;
            l.top -= (k && l.top === (n.input.offset().top + i)) ? $(document).scrollTop() : 0;
            l.left -= Math.min(l.left, (l.left + m > o && o > m) ? Math.abs(l.left + m - o) : 0);
            l.top -= Math.min(l.top, (l.top + q > j && j > q) ? Math.abs(q + i) : 0);
            return l
        },
        _findPos: function (l) {
            var i, k = this._getInst(l), j = this._get(k, "isRTL");
            while (l && (l.type === "hidden" || l.nodeType !== 1 || $.expr.filters.hidden(l))) {
                l = l[j ? "previousSibling" : "nextSibling"]
            }
            i = $(l).offset();
            return [i.left, i.top]
        },
        _hideDatepicker: function (k) {
            var j, n, m, i, l = this._curInst;
            if (!l || (k && l !== $.data(k, "datepicker"))) {
                return
            }
            if (this._datepickerShowing) {
                j = this._get(l, "showAnim");
                n = this._get(l, "duration");
                m = function () {
                    $.datepicker._tidyDialog(l)
                }
                    ;
                if ($.effects && ($.effects.effect[j] || $.effects[j])) {
                    l.dpDiv.hide(j, $.datepicker._get(l, "showOptions"), n, m)
                } else {
                    l.dpDiv[(j === "slideDown" ? "slideUp" : (j === "fadeIn" ? "fadeOut" : "hide"))]((j ? n : null), m)
                }
                if (!j) {
                    m()
                }
                this._datepickerShowing = false;
                i = this._get(l, "onClose");
                if (i) {
                    i.apply((l.input ? l.input[0] : null), [(l.input ? l.input.val() : ""), l])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function (i) {
            i.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (j) {
            if (!$.datepicker._curInst) {
                return
            }
            var i = $(j.target)
                , k = $.datepicker._getInst(i[0]);
            if (((i[0].id !== $.datepicker._mainDivId && i.parents("#" + $.datepicker._mainDivId).length === 0 && !i.hasClass($.datepicker.markerClassName) && !i.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))) || (i.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== k)) {
                $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (m, l, k) {
            var j = $(m)
                , i = this._getInst(j[0]);
            if (this._isDisabledDatepicker(j[0])) {
                return
            }
            this._adjustInstDate(i, l + (k === "M" ? this._get(i, "showCurrentAtPos") : 0), k);
            this._updateDatepicker(i)
        },
        _gotoToday: function (l) {
            var i, k = $(l), j = this._getInst(k[0]);
            if (this._get(j, "gotoCurrent") && j.currentDay) {
                j.selectedDay = j.currentDay;
                j.drawMonth = j.selectedMonth = j.currentMonth;
                j.drawYear = j.selectedYear = j.currentYear
            } else {
                i = new Date();
                j.selectedDay = i.getDate();
                j.drawMonth = j.selectedMonth = i.getMonth();
                j.drawYear = j.selectedYear = i.getFullYear()
            }
            this._notifyChange(j);
            this._adjustDate(k)
        },
        _selectMonthYear: function (m, i, l) {
            var k = $(m)
                , j = this._getInst(k[0]);
            j["selected" + (l === "M" ? "Month" : "Year")] = j["draw" + (l === "M" ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
            this._notifyChange(j);
            this._adjustDate(k)
        },
        _selectDay: function (n, l, i, m) {
            var j, k = $(n);
            if ($(m).hasClass(this._unselectableClass) || this._isDisabledDatepicker(k[0])) {
                return
            }
            j = this._getInst(k[0]);
            j.selectedDay = j.currentDay = $(m).data("date");
            j.selectedMonth = j.currentMonth = l;
            j.selectedYear = j.currentYear = i;
            this._selectDate(n, this._formatDate(j, j.currentDay, j.currentMonth, j.currentYear))
        },
        _clearDate: function (j) {
            var i = $(j);
            this._selectDate(i, "")
        },
        _selectDate: function (m, i) {
            var j, l = $(m), k = this._getInst(l[0]);
            i = (i != null ? i : this._formatDate(k));
            if (k.input) {
                k.input.val(i)
            }
            this._updateAlternate(k);
            j = this._get(k, "onSelect");
            if (j) {
                j.apply((k.input ? k.input[0] : null), [i, k])
            } else {
                if (k.input) {
                    k.input.trigger("change")
                }
            }
            if (k.inline) {
                this._updateDatepicker(k)
            } else {
                this._hideDatepicker();
                this._lastInput = k.input[0];
                if (typeof (k.input[0]) !== "object") {
                    k.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function (m) {
            var l, k, i, j = this._get(m, "altField");
            if (j) {
                l = this._get(m, "altFormat") || this._get(m, "dateFormat");
                k = this._getDate(m);
                i = this.formatDate(l, k, this._getFormatConfig(m));
                $(j).each(function () {
                    $(this).val(i)
                })
            }
        },
        noWeekends: function (j) {
            var i = j.getDay();
            return [(i > 0 && i < 6), ""]
        },
        iso8601Week: function (i) {
            var j, k = new Date(i.getTime());
            k.setDate(k.getDate() + 4 - (k.getDay() || 7));
            j = k.getTime();
            k.setMonth(0);
            k.setDate(1);
            return Math.floor(Math.round((j - k) / 86400000) / 7) + 1
        },
        parseDate: function (y, t, A) {
            if (y == null || t == null) {
                throw "Invalid arguments"
            }
            t = (typeof t === "object" ? t.toString() : t + "");
            if (t === "") {
                return null
            }
            var l, v, j, z = 0, o = (A ? A.shortYearCutoff : null) || this._defaults.shortYearCutoff, k = (typeof o !== "string" ? o : new Date().getFullYear() % 100 + parseInt(o, 10)), r = (A ? A.dayNamesShort : null) || this._defaults.dayNamesShort, C = (A ? A.dayNames : null) || this._defaults.dayNames, i = (A ? A.monthNamesShort : null) || this._defaults.monthNamesShort, m = (A ? A.monthNames : null) || this._defaults.monthNames, n = -1, D = -1, x = -1, q = -1, w = false, B, s = function (F) {
                var G = (l + 1 < y.length && y.charAt(l + 1) === F);
                if (G) {
                    l++
                }
                return G
            }, E = function (H) {
                var F = s(H)
                    , I = (H === "@" ? 14 : (H === "!" ? 20 : (H === "y" && F ? 4 : (H === "o" ? 3 : 2))))
                    , K = (H === "y" ? I : 1)
                    , J = new RegExp("^\\d{" + K + "," + I + "}")
                    , G = t.substring(z).match(J);
                if (!G) {
                    throw "Missing number at position " + z
                }
                z += G[0].length;
                return parseInt(G[0], 10)
            }, p = function (G, H, J) {
                var F = -1
                    , I = $.map(s(G) ? J : H, function (L, K) {
                        return [[K, L]]
                    }).sort(function (L, K) {
                        return -(L[1].length - K[1].length)
                    });
                $.each(I, function (L, N) {
                    var K = N[1];
                    if (t.substr(z, K.length).toLowerCase() === K.toLowerCase()) {
                        F = N[0];
                        z += K.length;
                        return false
                    }
                });
                if (F !== -1) {
                    return F + 1
                } else {
                    throw "Unknown name at position " + z
                }
            }, u = function () {
                if (t.charAt(z) !== y.charAt(l)) {
                    throw "Unexpected literal at position " + z
                }
                z++
            };
            for (l = 0; l < y.length; l++) {
                if (w) {
                    if (y.charAt(l) === "'" && !s("'")) {
                        w = false
                    } else {
                        u()
                    }
                } else {
                    switch (y.charAt(l)) {
                        case "d":
                            x = E("d");
                            break;
                        case "D":
                            p("D", r, C);
                            break;
                        case "o":
                            q = E("o");
                            break;
                        case "m":
                            D = E("m");
                            break;
                        case "M":
                            D = p("M", i, m);
                            break;
                        case "y":
                            n = E("y");
                            break;
                        case "@":
                            B = new Date(E("@"));
                            n = B.getFullYear();
                            D = B.getMonth() + 1;
                            x = B.getDate();
                            break;
                        case "!":
                            B = new Date((E("!") - this._ticksTo1970) / 10000);
                            n = B.getFullYear();
                            D = B.getMonth() + 1;
                            x = B.getDate();
                            break;
                        case "'":
                            if (s("'")) {
                                u()
                            } else {
                                w = true
                            }
                            break;
                        default:
                            u()
                    }
                }
            }
            if (z < t.length) {
                j = t.substr(z);
                if (!/^\s+/.test(j)) {
                    throw "Extra/unparsed characters found in date: " + j
                }
            }
            if (n === -1) {
                n = new Date().getFullYear()
            } else {
                if (n < 100) {
                    n += new Date().getFullYear() - new Date().getFullYear() % 100 + (n <= k ? 0 : -100)
                }
            }
            if (q > -1) {
                D = 1;
                x = q;
                do {
                    v = this._getDaysInMonth(n, D - 1);
                    if (x <= v) {
                        break
                    }
                    D++;
                    x -= v
                } while (true)
            }
            B = this._daylightSavingAdjust(new Date(n, D - 1, x));
            if (B.getFullYear() !== n || B.getMonth() + 1 !== D || B.getDate() !== x) {
                throw "Invalid date"
            }
            return B
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function (r, l, m) {
            if (!l) {
                return ""
            }
            var t, u = (m ? m.dayNamesShort : null) || this._defaults.dayNamesShort, j = (m ? m.dayNames : null) || this._defaults.dayNames, p = (m ? m.monthNamesShort : null) || this._defaults.monthNamesShort, n = (m ? m.monthNames : null) || this._defaults.monthNames, s = function (v) {
                var w = (t + 1 < r.length && r.charAt(t + 1) === v);
                if (w) {
                    t++
                }
                return w
            }, i = function (x, y, v) {
                var w = "" + y;
                if (s(x)) {
                    while (w.length < v) {
                        w = "0" + w
                    }
                }
                return w
            }, o = function (v, x, w, y) {
                return (s(v) ? y[x] : w[x])
            }, k = "", q = false;
            if (l) {
                for (t = 0; t < r.length; t++) {
                    if (q) {
                        if (r.charAt(t) === "'" && !s("'")) {
                            q = false
                        } else {
                            k += r.charAt(t)
                        }
                    } else {
                        switch (r.charAt(t)) {
                            case "d":
                                k += i("d", l.getDate(), 2);
                                break;
                            case "D":
                                k += o("D", l.getDay(), u, j);
                                break;
                            case "o":
                                k += i("o", Math.round((new Date(l.getFullYear(), l.getMonth(), l.getDate()).getTime() - new Date(l.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case "m":
                                k += i("m", l.getMonth() + 1, 2);
                                break;
                            case "M":
                                k += o("M", l.getMonth(), p, n);
                                break;
                            case "y":
                                k += (s("y") ? l.getFullYear() : (l.getYear() % 100 < 10 ? "0" : "") + l.getYear() % 100);
                                break;
                            case "@":
                                k += l.getTime();
                                break;
                            case "!":
                                k += l.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case "'":
                                if (s("'")) {
                                    k += "'"
                                } else {
                                    q = true
                                }
                                break;
                            default:
                                k += r.charAt(t)
                        }
                    }
                }
            }
            return k
        },
        _possibleChars: function (m) {
            var l, k = "", j = false, i = function (n) {
                var o = (l + 1 < m.length && m.charAt(l + 1) === n);
                if (o) {
                    l++
                }
                return o
            };
            for (l = 0; l < m.length; l++) {
                if (j) {
                    if (m.charAt(l) === "'" && !i("'")) {
                        j = false
                    } else {
                        k += m.charAt(l)
                    }
                } else {
                    switch (m.charAt(l)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            k += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            if (i("'")) {
                                k += "'"
                            } else {
                                j = true
                            }
                            break;
                        default:
                            k += m.charAt(l)
                    }
                }
            }
            return k
        },
        _get: function (j, i) {
            return j.settings[i] !== undefined ? j.settings[i] : this._defaults[i]
        },
        _setDateFromField: function (n, k) {
            if (n.input.val() === n.lastVal) {
                return
            }
            var i = this._get(n, "dateFormat")
                , p = n.lastVal = n.input ? n.input.val() : null
                , o = this._getDefaultDate(n)
                , j = o
                , l = this._getFormatConfig(n);
            try {
                j = this.parseDate(i, p, l) || o
            } catch (m) {
                p = (k ? "" : p)
            }
            n.selectedDay = j.getDate();
            n.drawMonth = n.selectedMonth = j.getMonth();
            n.drawYear = n.selectedYear = j.getFullYear();
            n.currentDay = (p ? j.getDate() : 0);
            n.currentMonth = (p ? j.getMonth() : 0);
            n.currentYear = (p ? j.getFullYear() : 0);
            this._adjustInstDate(n)
        },
        _getDefaultDate: function (i) {
            return this._restrictMinMax(i, this._determineDate(i, this._get(i, "defaultDate"), new Date()))
        },
        _determineDate: function (m, j, n) {
            var l = function (p) {
                var o = new Date();
                o.setDate(o.getDate() + p);
                return o
            }
                , k = function (v) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(m, "dateFormat"), v, $.datepicker._getFormatConfig(m))
                    } catch (u) { }
                    var p = (v.toLowerCase().match(/^c/) ? $.datepicker._getDate(m) : null) || new Date()
                        , q = p.getFullYear()
                        , t = p.getMonth()
                        , o = p.getDate()
                        , s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g
                        , r = s.exec(v);
                    while (r) {
                        switch (r[2] || "d") {
                            case "d":
                            case "D":
                                o += parseInt(r[1], 10);
                                break;
                            case "w":
                            case "W":
                                o += parseInt(r[1], 10) * 7;
                                break;
                            case "m":
                            case "M":
                                t += parseInt(r[1], 10);
                                o = Math.min(o, $.datepicker._getDaysInMonth(q, t));
                                break;
                            case "y":
                            case "Y":
                                q += parseInt(r[1], 10);
                                o = Math.min(o, $.datepicker._getDaysInMonth(q, t));
                                break
                        }
                        r = s.exec(v)
                    }
                    return new Date(q, t, o)
                }
                , i = (j == null || j === "" ? n : (typeof j === "string" ? k(j) : (typeof j === "number" ? (isNaN(j) ? n : l(j)) : new Date(j.getTime()))));
            i = (i && i.toString() === "Invalid Date" ? n : i);
            if (i) {
                i.setHours(0);
                i.setMinutes(0);
                i.setSeconds(0);
                i.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(i)
        },
        _daylightSavingAdjust: function (i) {
            if (!i) {
                return null
            }
            i.setHours(i.getHours() > 12 ? i.getHours() + 2 : 0);
            return i
        },
        _setDate: function (o, l, n) {
            var i = !l
                , k = o.selectedMonth
                , m = o.selectedYear
                , j = this._restrictMinMax(o, this._determineDate(o, l, new Date()));
            o.selectedDay = o.currentDay = j.getDate();
            o.drawMonth = o.selectedMonth = o.currentMonth = j.getMonth();
            o.drawYear = o.selectedYear = o.currentYear = j.getFullYear();
            if ((k !== o.selectedMonth || m !== o.selectedYear) && !n) {
                this._notifyChange(o)
            }
            this._adjustInstDate(o);
            if (o.input) {
                o.input.val(i ? "" : this._formatDate(o))
            }
        },
        _getDate: function (j) {
            var i = (!j.currentYear || (j.input && j.input.val() === "") ? null : this._daylightSavingAdjust(new Date(j.currentYear, j.currentMonth, j.currentDay)));
            return i
        },
        _attachHandlers: function (j) {
            var i = this._get(j, "stepMonths")
                , k = "#" + j.id.replace(/\\\\/g, "\\");
            j.dpDiv.find("[data-handler]").map(function () {
                var l = {
                    prev: function () {
                        $.datepicker._adjustDate(k, -i, "M")
                    },
                    next: function () {
                        $.datepicker._adjustDate(k, +i, "M")
                    },
                    hide: function () {
                        $.datepicker._hideDatepicker()
                    },
                    today: function () {
                        $.datepicker._gotoToday(k)
                    },
                    selectDay: function () {
                        $.datepicker._selectDay(k, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    },
                    selectMonth: function () {
                        $.datepicker._selectMonthYear(k, this, "M");
                        return false
                    },
                    selectYear: function () {
                        $.datepicker._selectMonthYear(k, this, "Y");
                        return false
                    }
                };
                $(this).bind(this.getAttribute("data-event"), l[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (Z) {
            var B, A, U, L, m, ae, X, Q, ah, J, al, t, v, u, j, ad, ac, r, E, ag, S, am, D, I, s, n, V, O, R, P, q, G, w, Y, ab, l, af, aj, N, x, aa = new Date(), C = this._daylightSavingAdjust(new Date(aa.getFullYear(), aa.getMonth(), aa.getDate())), ai = this._get(Z, "isRTL"), ak = this._get(Z, "showButtonPanel"), T = this._get(Z, "hideIfNoPrevNext"), H = this._get(Z, "navigationAsDateFormat"), y = this._getNumberOfMonths(Z), p = this._get(Z, "showCurrentAtPos"), K = this._get(Z, "stepMonths"), F = (y[0] !== 1 || y[1] !== 1), k = this._daylightSavingAdjust((!Z.currentDay ? new Date(9999, 9, 9) : new Date(Z.currentYear, Z.currentMonth, Z.currentDay))), o = this._getMinMaxDate(Z, "min"), z = this._getMinMaxDate(Z, "max"), i = Z.drawMonth - p, W = Z.drawYear;
            if (i < 0) {
                i += 12;
                W--
            }
            if (z) {
                B = this._daylightSavingAdjust(new Date(z.getFullYear(), z.getMonth() - (y[0] * y[1]) + 1, z.getDate()));
                B = (o && B < o ? o : B);
                while (this._daylightSavingAdjust(new Date(W, i, 1)) > B) {
                    i--;
                    if (i < 0) {
                        i = 11;
                        W--
                    }
                }
            }
            Z.drawMonth = i;
            Z.drawYear = W;
            A = this._get(Z, "prevText");
            A = (!H ? A : this.formatDate(A, this._daylightSavingAdjust(new Date(W, i - K, 1)), this._getFormatConfig(Z)));
            U = (this._canAdjustMonth(Z, -1, W, i) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + A + "'><span class='ui-icon ui-icon-circle-triangle-" + (ai ? "e" : "w") + "'>" + A + "</span></a>" : (T ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + A + "'><span class='ui-icon ui-icon-circle-triangle-" + (ai ? "e" : "w") + "'>" + A + "</span></a>"));
            L = this._get(Z, "nextText");
            L = (!H ? L : this.formatDate(L, this._daylightSavingAdjust(new Date(W, i + K, 1)), this._getFormatConfig(Z)));
            m = (this._canAdjustMonth(Z, +1, W, i) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + L + "'><span class='ui-icon ui-icon-circle-triangle-" + (ai ? "w" : "e") + "'>" + L + "</span></a>" : (T ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + L + "'><span class='ui-icon ui-icon-circle-triangle-" + (ai ? "w" : "e") + "'>" + L + "</span></a>"));
            ae = this._get(Z, "currentText");
            X = (this._get(Z, "gotoCurrent") && Z.currentDay ? k : C);
            ae = (!H ? ae : this.formatDate(ae, X, this._getFormatConfig(Z)));
            Q = (!Z.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(Z, "closeText") + "</button>" : "");
            ah = (ak) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (ai ? Q : "") + (this._isInRange(Z, X) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + ae + "</button>" : "") + (ai ? "" : Q) + "</div>" : "";
            J = parseInt(this._get(Z, "firstDay"), 10);
            J = (isNaN(J) ? 0 : J);
            al = this._get(Z, "showWeek");
            t = this._get(Z, "dayNames");
            v = this._get(Z, "dayNamesMin");
            u = this._get(Z, "monthNames");
            j = this._get(Z, "monthNamesShort");
            ad = this._get(Z, "beforeShowDay");
            ac = this._get(Z, "renderDay");
            r = this._get(Z, "showOtherMonths");
            E = this._get(Z, "selectOtherMonths");
            ag = this._getDefaultDate(Z);
            S = "";
            am;
            for (D = 0; D < y[0]; D++) {
                I = "";
                this.maxRows = 4;
                for (s = 0; s < y[1]; s++) {
                    n = this._daylightSavingAdjust(new Date(W, i, Z.selectedDay));
                    V = " ui-corner-all";
                    O = "";
                    if (F) {
                        O += "<div class='ui-datepicker-group";
                        if (y[1] > 1) {
                            switch (s) {
                                case 0:
                                    O += " ui-datepicker-group-first";
                                    V = " ui-corner-" + (ai ? "right" : "left");
                                    break;
                                case y[1] - 1:
                                    O += " ui-datepicker-group-last";
                                    V = " ui-corner-" + (ai ? "left" : "right");
                                    break;
                                default:
                                    O += " ui-datepicker-group-middle";
                                    V = "";
                                    break
                            }
                        }
                        O += "'>"
                    }
                    O += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + V + "'>" + (/all|left/.test(V) && D === 0 ? (ai ? m : U) : "") + (/all|right/.test(V) && D === 0 ? (ai ? U : m) : "") + this._generateMonthYearHeader(Z, i, W, o, z, D > 0 || s > 0, u, j) + "</div><table class='ui-datepicker-calendar'><thead><tr>";
                    R = (al ? "<th class='ui-datepicker-week-col'>" + this._get(Z, "weekHeader") + "</th>" : "");
                    for (am = 0; am < 7; am++) {
                        P = (am + J) % 7;
                        R += "<th scope='col'" + ((am + J + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + t[P] + "'>" + v[P] + "</span></th>"
                    }
                    O += R + "</tr></thead><tbody>";
                    q = this._getDaysInMonth(W, i);
                    if (W === Z.selectedYear && i === Z.selectedMonth) {
                        Z.selectedDay = Math.min(Z.selectedDay, q)
                    }
                    G = (this._getFirstDayOfMonth(W, i) - J + 7) % 7;
                    w = Math.ceil((G + q) / 7);
                    Y = (F ? this.maxRows > w ? this.maxRows : w : w);
                    this.maxRows = Y;
                    ab = this._daylightSavingAdjust(new Date(W, i, 1 - G));
                    for (l = 0; l < Y; l++) {
                        O += "<tr>";
                        af = (!al ? "" : "<td class='ui-datepicker-week-col'>" + this._get(Z, "calculateWeek")(ab) + "</td>");
                        for (am = 0; am < 7; am++) {
                            aj = (ad ? ad.apply((Z.input ? Z.input[0] : null), [ab]) : [true, ""]);
                            N = (ab.getMonth() !== i);
                            x = (N && !E) || !aj[0] || (o && ab < o) || (z && ab > z);
                            af += "<td class='" + ((am + J + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (N ? " ui-datepicker-other-month" : "") + ((ab.getTime() === n.getTime() && i === Z.selectedMonth && Z._keyEvent) || (ag.getTime() === ab.getTime() && ag.getTime() === n.getTime()) ? " " + this._dayOverClass : "") + (x ? " " + this._unselectableClass + " ui-state-disabled" : "") + (N && !r ? "" : " " + aj[1] + (ab.getTime() === k.getTime() ? " " + this._currentClass : "") + (ab.getTime() === C.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!N || r) && aj[2] ? " title='" + aj[2].replace(/'/g, "&#39;") + "'" : "") + (x ? " data-date='" + ab.getDate() + "'" : " data-handler='selectDay' data-event='click' data-date='" + ab.getDate() + "' data-month='" + ab.getMonth() + "' data-year='" + ab.getFullYear() + "'") + ">" + (N && !r ? "&#xa0;" : (x ? "<span class='ui-state-default'>" + ab.getDate() + "</span>" : "<a class='ui-state-default" + (ab.getTime() === C.getTime() ? " ui-state-highlight" : "") + (ab.getTime() === k.getTime() ? " ui-state-active" : "") + (N ? " ui-priority-secondary" : "") + "' href='#'>" + (ac ? ac.apply(Z, [ab.getFullYear(), ab.getMonth() + 1, ab.getDate()]) : ab.getDate()) + "</a>")) + "</td>";
                            ab.setDate(ab.getDate() + 1);
                            ab = this._daylightSavingAdjust(ab)
                        }
                        O += af + "</tr>"
                    }
                    i++;
                    if (i > 11) {
                        i = 0;
                        W++
                    }
                    O += "</tbody></table>" + (F ? "</div>" + ((y[0] > 0 && s === y[1] - 1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                    I += O
                }
                S += I
            }
            S += ah;
            Z._keyEvent = false;
            return S
        },
        _generateMonthYearHeader: function (m, k, u, o, s, v, q, i) {
            var z, j, A, x, n, w, t, p, l = this._get(m, "changeMonth"), B = this._get(m, "changeYear"), C = this._get(m, "showMonthAfterYear"), r = "<div class='ui-datepicker-title'>", y = "";
            if (v || !l) {
                y += "<span class='ui-datepicker-month'>" + q[k] + "</span>"
            } else {
                z = (o && o.getFullYear() === u);
                j = (s && s.getFullYear() === u);
                y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (A = 0; A < 12; A++) {
                    if ((!z || A >= o.getMonth()) && (!j || A <= s.getMonth())) {
                        y += "<option value='" + A + "'" + (A === k ? " selected='selected'" : "") + ">" + i[A] + "</option>"
                    }
                }
                y += "</select>"
            }
            if (!C) {
                r += y + (v || !(l && B) ? "&#xa0;" : "")
            }
            if (!m.yearshtml) {
                m.yearshtml = "";
                if (v || !B) {
                    r += "<span class='ui-datepicker-year'>" + u + "</span>"
                } else {
                    x = this._get(m, "yearRange").split(":");
                    n = new Date().getFullYear();
                    w = function (E) {
                        var D = (E.match(/c[+\-].*/) ? u + parseInt(E.substring(1), 10) : (E.match(/[+\-].*/) ? n + parseInt(E, 10) : parseInt(E, 10)));
                        return (isNaN(D) ? n : D)
                    }
                        ;
                    t = w(x[0]);
                    p = Math.max(t, w(x[1] || ""));
                    t = (o ? Math.max(t, o.getFullYear()) : t);
                    p = (s ? Math.min(p, s.getFullYear()) : p);
                    m.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; t <= p; t++) {
                        m.yearshtml += "<option value='" + t + "'" + (t === u ? " selected='selected'" : "") + ">" + t + "</option>"
                    }
                    m.yearshtml += "</select>";
                    r += m.yearshtml;
                    m.yearshtml = null
                }
            }
            r += this._get(m, "yearSuffix");
            if (C) {
                r += (v || !(l && B) ? "&#xa0;" : "") + y
            }
            r += "</div>";
            return r
        },
        _adjustInstDate: function (l, o, n) {
            var k = l.drawYear + (n === "Y" ? o : 0)
                , m = l.drawMonth + (n === "M" ? o : 0)
                , i = Math.min(l.selectedDay, this._getDaysInMonth(k, m)) + (n === "D" ? o : 0)
                , j = this._restrictMinMax(l, this._daylightSavingAdjust(new Date(k, m, i)));
            l.selectedDay = j.getDate();
            l.drawMonth = l.selectedMonth = j.getMonth();
            l.drawYear = l.selectedYear = j.getFullYear();
            if (n === "M" || n === "Y") {
                this._notifyChange(l)
            }
        },
        _restrictMinMax: function (l, j) {
            var k = this._getMinMaxDate(l, "min")
                , m = this._getMinMaxDate(l, "max")
                , i = (k && j < k ? k : j);
            return (m && i > m ? m : i)
        },
        _notifyChange: function (j) {
            var i = this._get(j, "onChangeMonthYear");
            if (i) {
                i.apply((j.input ? j.input[0] : null), [j.selectedYear, j.selectedMonth + 1, j])
            }
        },
        _getNumberOfMonths: function (j) {
            var i = this._get(j, "numberOfMonths");
            return (i == null ? [1, 1] : (typeof i === "number" ? [1, i] : i))
        },
        _getMinMaxDate: function (j, i) {
            return this._determineDate(j, this._get(j, i + "Date"), null)
        },
        _getDaysInMonth: function (i, j) {
            return 32 - this._daylightSavingAdjust(new Date(i, j, 32)).getDate()
        },
        _getFirstDayOfMonth: function (i, j) {
            return new Date(i, j, 1).getDay()
        },
        _canAdjustMonth: function (l, n, k, m) {
            var i = this._getNumberOfMonths(l)
                , j = this._daylightSavingAdjust(new Date(k, m + (n < 0 ? n : i[0] * i[1]), 1));
            if (n < 0) {
                j.setDate(this._getDaysInMonth(j.getFullYear(), j.getMonth()))
            }
            return this._isInRange(l, j)
        },
        _isInRange: function (m, k) {
            var j, p, l = this._getMinMaxDate(m, "min"), i = this._getMinMaxDate(m, "max"), q = null, n = null, o = this._get(m, "yearRange");
            if (o) {
                j = o.split(":");
                p = new Date().getFullYear();
                q = parseInt(j[0], 10);
                n = parseInt(j[1], 10);
                if (j[0].match(/[+\-].*/)) {
                    q += p
                }
                if (j[1].match(/[+\-].*/)) {
                    n += p
                }
            }
            return ((!l || k.getTime() >= l.getTime()) && (!i || k.getTime() <= i.getTime()) && (!q || k.getFullYear() >= q) && (!n || k.getFullYear() <= n))
        },
        _getFormatConfig: function (i) {
            var j = this._get(i, "shortYearCutoff");
            j = (typeof j !== "string" ? j : new Date().getFullYear() % 100 + parseInt(j, 10));
            return {
                shortYearCutoff: j,
                dayNamesShort: this._get(i, "dayNamesShort"),
                dayNames: this._get(i, "dayNames"),
                monthNamesShort: this._get(i, "monthNamesShort"),
                monthNames: this._get(i, "monthNames")
            }
        },
        _formatDate: function (l, i, m, k) {
            if (!i) {
                l.currentDay = l.selectedDay;
                l.currentMonth = l.selectedMonth;
                l.currentYear = l.selectedYear
            }
            var j = (i ? (typeof i === "object" ? i : this._daylightSavingAdjust(new Date(k, m, i))) : this._daylightSavingAdjust(new Date(l.currentYear, l.currentMonth, l.currentDay)));
            return this.formatDate(this._get(l, "dateFormat"), j, this._getFormatConfig(l))
        }
    });
    function b(j) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return j.delegate(i, "mouseout", function () {
            $(this).removeClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                $(this).removeClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                $(this).removeClass("ui-datepicker-next-hover")
            }
        }).delegate(i, "mouseover", f)
    }
    function f() {
        if (!$.datepicker._isDisabledDatepicker(g.inline ? g.dpDiv.parent()[0] : g.input[0])) {
            $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
            $(this).addClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                $(this).addClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                $(this).addClass("ui-datepicker-next-hover")
            }
        }
    }
    function a(k, j) {
        $.extend(k, j);
        for (var i in j) {
            if (j[i] == null) {
                k[i] = j[i]
            }
        }
        return k
    }
    $.fn.datepicker = function (j) {
        if (!this.length) {
            return this
        }
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick);
            $.datepicker.initialized = true
        }
        if ($("#" + $.datepicker._mainDivId).length === 0) {
            $("body").append($.datepicker.dpDiv)
        }
        var i = Array.prototype.slice.call(arguments, 1);
        if (typeof j === "string" && (j === "isDisabled" || j === "getDate" || j === "widget")) {
            return $.datepicker["_" + j + "Datepicker"].apply($.datepicker, [this[0]].concat(i))
        }
        if (j === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
            return $.datepicker["_" + j + "Datepicker"].apply($.datepicker, [this[0]].concat(i))
        }
        return this.each(function () {
            typeof j === "string" ? $.datepicker["_" + j + "Datepicker"].apply($.datepicker, [this].concat(i)) : $.datepicker._attachDatepicker(this, j)
        })
    }
        ;
    $.datepicker = new c();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.11.3";
    var e = $.datepicker;
    return e
});
M.define("/js/hotel/module/DateRangePicker", function (f, e, g) {
    var b = f("xdate")
        , d = f("/js/hotel/module/FestivalDateConfig");
    f("jqui-datepicker");
    var h = 22;
    var a = {
        duration: 50,
        numberOfMonths: 2,
        firstDay: 1,
        altFormat: "yy-mm-dd",
        dateFormat: "yy-mm-dd",
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    };
    var c = function (i) {
        this.dateFormat = "yyyy-MM-dd";
        this.timer = null;
        this.customCss = "hotel_datepicker";
        this.fesDateList = d.getDateList();
        this.priceDateList = [];
        this.startInput = null;
        this.endInput = null;
        this.startDate = null;
        this.endDate = null;
        this.minDate = null;
        this.maxDate = null;
        this.rangeMinDays = 1;
        this.rangeMaxDays = null;
        this.datePickerOptions = {};
        this.startDayClass = "start_day";
        this.startDayClassUnset = "start_day_unset";
        this.endDayClass = "end_day";
        this.endDayClassUnset = "end_day_unset";
        this.isCached = false;
        this.isDoublePick = false;
        this.isAllowSameDate = false;
        M.mix(this, i);
        M.mix(this.datePickerOptions, a, false);
        if (this.isAllowSameDate) {
            this.rangeMinDays = 0
        }
        this.startInput = $(this.startInput);
        this.endInput = $(this.endInput);
        this.dateRangeSetted = true;
        this.showIns = null;
        this.preCheck();
        this.init()
    };
    c.prototype = {
        init: function () {
            this.initDatePicker()
        },
        preCheck: function () {
            if (!this.startInput.length || !this.endInput.length) {
                M.error("date range picker need an start input and an end input")
            }
            if (this.maxDate && this.minDate && b.parse(this.maxDate) <= b.parse(this.minDate)) {
                M.error("max date must big than min date")
            }
            this.rangeMinDays = +this.rangeMinDays;
            if (isNaN(this.rangeMinDays) || this.rangeMinDays < 0) {
                M.error("date range days must be positive")
            }
            if (this.rangeMaxDays) {
                this.rangeMaxDays = +this.rangeMaxDays;
                if (isNaN(this.rangeMaxDays) || this.rangeMaxDays < 0) {
                    M.error("date range days must be positive")
                }
            }
            if (this.rangeMinDays && this.rangeMaxDays && this.rangeMinDays > this.rangeMaxDays) {
                M.error("date range max days must equal or more than min days")
            }
            if (this.maxDate && this.minDate && this.rangeMinDays > 0) {
                var j = new b(this.minDate);
                var l = new b(this.maxDate);
                if (j.diffDays(l) < this.rangeMinDays) {
                    M.error("date range days must equal or more than range min days")
                }
            }
            if (!this.startDate) {
                this.startDate = (new b()).toString(this.dateFormat)
            }
            if (this.minDate && b.parse(this.startDate) < b.parse(this.minDate)) {
                this.startDate = this.minDate
            }
            if (this.endDate) {
                var i = new b(this.startDate)
                    , k = new b(this.endDate);
                if (i.diffDays(k) < this.rangeMinDays) {
                    k = i.addDays(this.rangeMinDays)
                }
                if (this.maxDate && b.parse(this.maxDate) < k) {
                    k = this.maxDate
                }
                this.endDate = k.toString(this.dateFormat)
            } else {
                this.endDate = (new b(this.startDate)).addDays(1).toString(this.dateFormat)
            }
        },
        initDatePicker: function () {
            var j = {
                onSelect: M.bind(this.selectDate, this),
                onClose: M.bind(this.closeDate, this),
                beforeShow: M.bind(this.beforeShow, this),
                beforeShowDay: M.bind(this.beforeShowDay, this),
                renderDay: M.bind(this.renderDay, this),
                gotoCurrent: true
            }
                , k = M.mix({}, j, a)
                , i = M.mix({}, j, a);
            if (this.minDate) {
                k.minDate = (new b(this.minDate)).toString(this.dateFormat);
                i.minDate = (new b(this.minDate)).addDays(this.rangeMinDays).toString(this.dateFormat)
            }
            if (this.maxDate) {
                k.maxDate = (new b(this.maxDate)).addDays(-this.rangeMinDays).toString(this.dateFormat);
                if ((new b(this.startDate)).addDays(this.rangeMaxDays) > new b(this.maxDate)) {
                    i.maxDate = (new b(this.maxDate)).toString(this.dateFormat)
                } else {
                    i.maxDate = (new b(this.startDate)).addDays(this.rangeMaxDays).toString(this.dateFormat)
                }
            }
            this.startInput.datepicker(k);
            this.endInput.datepicker(i);
            this.startInput.datepicker("setDate", this.startDate);
            this.endInput.datepicker("setDate", this.endDate);
            if (this.isDoublePick) {
                this.startInput.datepicker("widget").on("mouseenter", "td:not(.ui-state-disabled)", $.proxy(this.mouseenterEffect, this));
                this.startInput.datepicker("widget").on("mouseleave", "td:not(.ui-state-disabled)", $.proxy(this.mouseleaveEffect, this));
                this.endInput.datepicker("widget").on("mouseenter", "td:not(.ui-state-disabled)", $.proxy(this.mouseenterEffect, this));
                this.endInput.datepicker("widget").on("mouseleave", "td:not(.ui-state-disabled)", $.proxy(this.mouseleaveEffect, this))
            }
        },
        mouseenterEffect: function (k) {
            var n = $(k.delegateTarget)
                , m = $(k.target).closest("td")
                , j = new b(m.data("year"), m.data("month"), $("a", m).html());
            if (!this.showIns || !this.showIns.input) {
                return true
            }
            if (this.showIns.input.is(this.startInput)) {
                var l = new b(this.endDate);
                m.addClass("unset")
            } else {
                var i = new b(this.startDate);
                m.addClass("unset")
            }
        },
        mouseleaveEffect: function (k) {
            var n = $(k.delegateTarget)
                , m = $(k.target).closest("td")
                , j = new b(m.data("year"), (m.data("month") + 1), $("a", m).html());
            if (!this.showIns || !this.showIns.input) {
                return true
            }
            if (this.showIns.input.is(this.startInput)) {
                var l = new b(this.endDate);
                m.removeClass("unset")
            } else {
                var i = new b(this.startDate);
                m.removeClass("unset")
            }
        }
    };
    M.mix(c.prototype, {
        selectDate: function (j, p) {
            var k = ""
                , q = {
                    startDate: this.startDate,
                    endDate: this.endDate
                }
                , m = false
                , l = false;
            if (p.input.is(this.startInput)) {
                q.startDate = j;
                k = this.endInput
            } else {
                q.endDate = j;
                k = this.startInput
            }
            if (p.input.is(this.startInput)) {
                if ((new b(j)).addDays(this.rangeMaxDays) > new b(this.maxDate)) {
                    k.datepicker("option", "maxDate", (new b(this.maxDate)).toString(this.dateFormat))
                } else {
                    k.datepicker("option", "maxDate", (new b(j)).addDays(this.rangeMaxDays).toString(this.dateFormat))
                }
                if (this.rangeMaxDays && b.parse(q.endDate) - b.parse(j) > this.rangeMaxDays * 24 * 60 * 60 * 1000) {
                    q.endDate = (new b(j)).addDays(this.rangeMinDays).toString(this.dateFormat);
                    k.datepicker("setDate", q.endDate);
                    l = true;
                    setTimeout(M.bind(function () {
                        this.dateRangeSetted = false;
                        k.datepicker("show")
                    }, this), 1)
                }
            }
            if (b.parse(q.startDate) >= b.parse(q.endDate)) {
                if (this.isAllowSameDate && b.parse(q.startDate) == b.parse(q.endDate)) {
                    this.dateRangeSetted = true
                } else {
                    var n = "";
                    if (p.input.is(this.startInput)) {
                        n = (new b(q.startDate)).addDays(this.rangeMinDays).toString(this.dateFormat);
                        q.endDate = n
                    } else {
                        n = (new b(q.endDate)).addDays(-this.rangeMinDays).toString(this.dateFormat);
                        q.startDate = n
                    }
                    k.datepicker("setDate", n);
                    if (this.dateRangeSetted) {
                        if (p.input.is(this.startInput)) {
                            l = true
                        } else {
                            m = true
                        }
                        setTimeout(M.bind(function () {
                            this.dateRangeSetted = false;
                            k.datepicker("show")
                        }, this), 1)
                    } else {
                        this.dateRangeSetted = true
                    }
                }
            } else {
                this.dateRangeSetted = true
            }
            if (this.isDoublePick && p.input.is(this.startInput) && !this.isCached && !l) {
                l = true;
                setTimeout(M.bind(function () {
                    this.dateRangeSetted = false;
                    k.datepicker("show")
                }, this), 1)
            }
            if (!(q.startDate == this.startDate && q.endDate == this.endDate)) {
                this.startDate = q.startDate;
                this.endDate = q.endDate;
                M.Event(this).fire("date range picker changed", q)
            }
            if (this.isDoublePick) {
                var i = new b(this.startDate)
                    , o = new b(this.endDate);
                if (!i.valid()) {
                    this.startDate = (new b()).addDays(40).toString(this.dateFormat)
                }
                if (!o.valid()) {
                    this.endDate = (new b(this.startDate)).addDays(1).toString(this.dateFormat)
                }
                if (p.input.is(this.startInput) && b.parse(q.startDate) < b.parse(q.endDate) && this.isCached && !l) {
                    this.isCached = true;
                    M.Event(this).fire("date range picker doublepicked", {
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                }
                if (p.input.is(this.startInput) && this.isAllowSameDate && b.parse(q.startDate) <= b.parse(q.endDate) && this.isCached && !l) {
                    this.isCached = true;
                    M.Event(this).fire("date range picker doublepicked", {
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                }
                if (p.input.is(this.endInput) && !m) {
                    this.isCached = true;
                    M.Event(this).fire("date range picker doublepicked", {
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                }
            }
        },
        setDate: function (i) {
            this.startDate = i.startDate;
            this.endDate = i.endDate;
            this.preCheck();
            this.startInput.datepicker("setDate", i.startDate);
            this.endInput.datepicker("setDate", i.endDate)
        },
        closeDate: function (j, k) {
            var i = this;
            this.timer = setTimeout(function () {
                $("#ui-datepicker-div").removeClass(i.customCss)
            }, 1000);
            $("#ui-datepicker-div").data("removeClassTimer", this.timer);
            if (!this.dateRangeSetted) {
                this.dateRangeSetted = true
            }
            if (M.isFunction(this._onClose)) {
                this._onClose(j, k)
            }
        },
        beforeShow: function (i, j) {
            this.timer = $("#ui-datepicker-div").data("removeClassTimer") || this.timer;
            clearTimeout(this.timer);
            $("#ui-datepicker-div").addClass(this.customCss);
            this.showIns = j;
            if (M.isFunction(this._beforeShow)) {
                this._beforeShow(i, j)
            }
        },
        beforeShowDay: function (k) {
            var l = b.parse(this.startDate)
                , j = b.parse(this.endDate)
                , i = b.parse(k);
            var m = i == l ? this.startDayClass : (i > l && i < j ? "range_day" : (i == j ? this.endDayClass : ""));
            if (!this.dateRangeSetted) {
                if (this.showIns.input.is(this.startInput)) {
                    if (this.isAllowSameDate && l === j) {
                        m = m == this.startDayClass ? this.endDayClassUnset : ""
                    } else {
                        m = m == this.endDayClass ? this.endDayClassUnset : ""
                    }
                } else {
                    m = m == this.startDayClass ? this.startDayClassUnset : ""
                }
            }
            return [true, m]
        },
        renderDay: function (n, o, j) {
            var l = j;
            for (var k = 0; k < this.fesDateList.length; k++) {
                var p = this.fesDateList[k];
                if (p.year === n && p.month === o && p.day === j) {
                    if (p.shortName) {
                        l = '<p class="fes">' + p.shortName + "</p>"
                    }
                }
            }
            for (var k = 0; k < this.priceDateList.length; k++) {
                var m = this.priceDateList[k];
                if (m.year === n && m.month === o && m.day === j) {
                    l += '<p class="price">' + m.name + "</p>"
                }
            }
            return l
        }
    });
    g.exports = c
});
M.closure(function (i) {
    var G = i("ScrollObserver")
        , l = i("dialog/alert")
        , e = i("TopTip")
        , F = i("Storage")
        , c = window.Env || {}
        , t = $("#_j_mfwtoolbar")
        , C = t.height()
        , o = $(window).height()
        , q = $(document).height()
        , z = $("#footer")
        , d = z.outerHeight();
    $("body").css("position", "relative");
    $(window).resize(function () {
        o = $(window).height();
        q = $(document).height()
    });
    setInterval(function () {
        var I = $(document).height();
        if (I != q) {
            q = I;
            $(window).trigger("scroll")
        }
    }, 2000);
    if (!c.hideToolbar) {
        if (!c.showToolbarDownArrow) {
            t.children(".toolbar-item-down").remove()
        } else {
            t.children(".toolbar-item-down").show()
        }
        t.show();
        D();
        G.addObserver(D);
        t.on("click", "._j_gotop", E);
        t.on("click", "._j_gobottom", w);
        t.children(".toolbar-item-code").mouseenter(function () {
            $(this).addClass("hover")
        });
        t.children(".toolbar-item-code").mouseleave(function () {
            $(this).removeClass("hover")
        });
        console.log("matchPathname", j());
        if (j()) {
            $(".toolbar-item-butler").show()
        }
        t.on("click", "._j_butler", function () {
            g($("._j_butler_dialog").is(":hidden") ? true : false)
        });
        t.on("click", "._j_butler_close", function () {
            g(false)
        });
        $(".tbd-form-item").each(function (I) {
            $(".tbd-form-item").eq(I).focusin(function () {
                $(this).addClass("form-item-active")
            });
            $(".tbd-form-item").eq(I).focusout(function () {
                if ($(".tbd-form-item").eq(I).find("input").val().length > 0) {
                    $(this).addClass("form-item-focus");
                    $(this).removeClass("form-item-active")
                } else {
                    $(this).removeClass("form-item-focus");
                    $(this).removeClass("form-item-active")
                }
            });
            $(".tbd-form-item label").click(function () {
                $(this).next().focus()
            })
        });
        var m = (c.debug ? "http://" + c.P_HOST : c.P_HTTP) + "/api.php/verifyCode";
        $("#verifyCodeImg").attr("src", m);
        $("#verifyCodeImg").attr("data-src", m);
        $("#verifyCodeImg").on("click", function (J) {
            J.preventDefault();
            var I = $(this);
            I.attr("src", I.data("src") + "?" + new Date().getTime())
        });
        $("#from_mdd_name").keyup(function (I) {
            y(this, "from");
            $("#from_mdd_get_value_from_sug").val(0)
        }).click(function (I) {
            y(this, "from");
            I.stopPropagation();
            return false
        });
        $("#arrival_mdd_name").keyup(function (I) {
            y(this, "arrival");
            $("#arrival_mdd_get_value_from_sug").val(0)
        }).click(function (I) {
            y(this, "arrival");
            I.stopPropagation();
            return false
        });
        var r = 0;
        var y = function (J, K) {
            var L = J;
            var I = $("#" + K + "_mdd_sug_top_div");
            if (r) {
                clearTimeout(r)
            }
            r = setTimeout(function () {
                var N = $(L).val();
                $.get("/customize/travel_butler/mdd_suggest", {
                    mdd_keyword: N
                }, function (O) {
                    if (N) {
                        I.show()
                    }
                    if (O.data && O.data.length) {
                        I.html(H(O.data || [], K))
                    } else {
                        I.html(K === "from" ? '<div class="unfold"><p>暂不支持该城市出发</p></div>' : '<div class="unfold"><p>找不到目的地，换一个试试</p></div>')
                    }
                }, "json")
            }, 100)
        };
        function H(L, J) {
            var K = $("<ul></ul>");
            for (var I = 0; I < L.length; I++) {
                K.append('<li class="_j_butler_select_mdd" data-type="' + J + '" data-mddname="' + L[I].name + '" data-mddid="' + L[I].departure_mdd_id + '">' + L[I].name + "</li>")
            }
            return $('<div class="unfold" id="from_mdd_sug"></div>').append(K)
        }
        $(document).on("click", "._j_butler_select_mdd", function () {
            var I = $(this).data("type");
            var J = $(this).data("mddid");
            var K = $(this).data("mddname");
            $("#" + I + "_mdd_name").attr("value", K).focus();
            $("#" + I + "_mdd_id").attr("value", J);
            $("#" + I + "_mdd_sug_top_div").hide();
            $("#" + I + "_mdd_get_value_from_sug").val(1)
        });
        $(document).click(function () {
            $("#from_mdd_sug_top_div").hide();
            if ($("#from_mdd_get_value_from_sug").val() == "0") {
                $("#from_mdd_name").val("");
                $("#from_mdd_id").val("")
            }
            $("#arrival_mdd_sug_top_div").hide();
            if ($("#arrival_mdd_get_value_from_sug").val() == "0") {
                $("#arrival_mdd_name").val("");
                $("#arrival_mdd_id").val("")
            }
        });
        var B = i("/js/Dropdown")
            , p = i("/js/hotel/module/DateRangePicker");
        var v = $("#_j_check_in_date")
            , A = $("#_j_check_out_date")
            , b = v.find("input")
            , h = A.find("input");
        var k = new p({
            startInput: b,
            endInput: h,
            startDate: (new XDate()).addDays(7).toString("yyyy-MM-dd"),
            endDate: (new XDate()).addDays(12).toString("yyyy-MM-dd"),
            minDate: (new XDate()).toString("yyyy-MM-dd"),
            maxDate: (new XDate()).addDays(365).toString("yyyy-MM-dd"),
            rangeMaxDays: 30,
            isAllowSameDate: true,
            isDoublePick: true,
            isCached: true,
            _beforeShow: function (I, J) {
                $(J.input).closest("._j_booking_date_item").addClass("focus")
            },
            _onClose: function (I, J) {
                $(J.input).closest("._j_booking_date_item").removeClass("focus")
            }
        });
        M.Event(k).on("date range picker changed", function (K) {
            var L = new Date(K.startDate);
            var I = new Date(K.endDate);
            var J = Math.ceil((I.getTime() - L.getTime()) / (1000 * 3600 * 24)) + 1;
            $("#num_days").text(J + "天")
        });
        $("#_j_check_in_date").addClass("form-item-focus");
        $("#_j_check_out_date").addClass("form-item-focus");
        var f = new Date(new Date().setDate(new Date().getDate() + 7));
        var n = new Date(new Date().setDate(new Date().getDate() + 12));
        var x = Math.ceil((n.getTime() - f.getTime()) / (1000 * 3600 * 24)) + 1;
        $("#num_days").text(x + "天");
        v.on("click", function (I) {
            b.trigger("focus")
        });
        A.on("click", function (I) {
            h.trigger("focus")
        });
        $("#adult_num").keyup(function () {
            var I = parseInt($(this).val());
            if (isNaN(I)) {
                $(this).val(1)
            } else {
                if (I > 99) {
                    $(this).val(99)
                } else {
                    if (I < 0) {
                        $(this).val(1)
                    } else {
                        $(this).val(I)
                    }
                }
            }
        });
        $("#child_num").keyup(function () {
            var I = parseInt($(this).val());
            if (isNaN(I)) {
                $(this).val(0)
            } else {
                if (I > 99) {
                    $(this).val(99)
                } else {
                    if (I < 0) {
                        $(this).val(0)
                    } else {
                        $(this).val(I)
                    }
                }
            }
        });
        var a = false;
        $("._j_butler_submit").click(function () {
            var I = {
                from_mdd_id: $.trim($("#from_mdd_id").val()),
                from_mdd_name: $.trim($("#from_mdd_name").val()),
                arrival_mdd_id: $.trim($("#arrival_mdd_id").val()),
                arrival_mdd_name: $.trim($("#arrival_mdd_name").val()),
                go_date: $("#go_date").val(),
                end_date: $("#end_date").val(),
                adult_num: $("#adult_num").val(),
                child_num: $("#child_num").val(),
                mark: $.trim($("#mark").val()),
                name: $.trim($("#name").val()),
                mobile: $("#mobile").val(),
                captcha: $.trim($("#captcha").val()),
            };
            if (!I.from_mdd_id || !I.from_mdd_name) {
                l.pop("请填写出发地");
                return false
            }
            if (!I.arrival_mdd_id || !I.arrival_mdd_name) {
                l.pop("请填写目的地");
                return false
            }
            if (!I.go_date) {
                l.pop("请填写出行日期");
                return false
            }
            if (!I.end_date) {
                l.pop("请填写返程日期");
                return false
            }
            if (!I.adult_num) {
                l.pop("请填写出行成人数");
                return false
            }
            if (!I.name) {
                l.pop("请填写联系人");
                return false
            }
            if (!s(I.mobile)) {
                l.pop("请输入正确的联系电话");
                return false
            }
            if (!I.captcha) {
                l.pop("请填写图片验证码");
                return false
            }
            if (a) {
                return
            }
            $("._j_butler_submit").addClass("disabled");
            a = true;
            $.post("/customize/travel_butler/demand", I, function (J) {
                if (J.code === 200 && J.data.demand_id) {
                    e.show("提交成功，我们会很快与你进行联系");
                    u();
                    g(false)
                } else {
                    l.pop(J.msg || "提交失败，请稍后再试")
                }
            }).always(function (J) {
                a = false;
                $("._j_butler_submit").removeClass("disabled")
            })
        });
        function s(J) {
            const I = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/g;
            return I.test(J)
        }
        function g(I) {
            if (I) {
                if ($("._j_butler_dialog").is(":hidden")) {
                    if (window.mfwPageEvent) {
                        mfwPageEvent("show", "show_n_travel_submit_demand", {
                            pos_id: "",
                            module_name: "PC旅游小管家需求单小组件",
                            item_name: "提交需求按钮",
                        })
                    }
                }
                $("._j_butler_dialog").fadeIn()
            } else {
                $("._j_butler_dialog").fadeOut()
            }
        }
        function j() {
            var J = location.pathname;
            var I = /\/i\/|\/gonglve\/|\/mdd\/|\/travel-scenic-spot\/|\/wenda\/detail-/g;
            if (J === "/") {
                return true
            }
            if (J.match(I)) {
                return true
            } else {
                return false
            }
        }
        function u() {
            $("#from_mdd_id").val("");
            $("#from_mdd_name").val("");
            $("#arrival_mdd_id").val("");
            $("#arrival_mdd_name").val("");
            $("#adult_num").val(2);
            $("#child_num").val(0);
            $("#mark").val("");
            $("#name").val("");
            $("#mobile").val("");
            $("#captcha").val("");
            $("#verifyCodeImg").trigger("click")
        }
    }
    function D() {
        var I = $(window).scrollTop();
        if (I > 500) {
            t.children(".toolbar-item-top").show()
        } else {
            t.children(".toolbar-item-top").hide()
        }
        if (z.length) {
            if (I + o > z.offset().top) {
                t.css({
                    position: "absolute",
                    bottom: d + 20
                })
            } else {
                t.css({
                    position: "",
                    bottom: ""
                })
            }
        }
    }
    function E() {
        $("html, body").animate({
            scrollTop: 0
        }, 500, function () {
            M.Event.fire("scroll to top")
        })
    }
    function w() {
        $("html, body").animate({
            scrollTop: q - o
        }, 500, function () {
            M.Event.fire("scroll to bottom")
        })
    }
});
(function () {
    var a = document.createElement("script")
        , b = window.Env && window.Env.CNZZID || 30065558;
    a.type = "text/javascript";
    a.async = true;
    a.charset = "utf-8";
    a.src = document.location.protocol + "//w.cnzz.com/c.php?id=" + b + "&async=1";
    var c = document.getElementsByTagName("script")[0];
    c.parentNode.insertBefore(a, c)
}
)();
M.closure(function (a) {
    M.log("只要你有梦想，就加入我们\n你即将见证互联网最新趋势的快速成长\n马蜂窝的一切资源都会成为你成长路上的最大助力\n你可以和马蜂窝一起书写互联网的风云奇迹\n在这里有一群和你一样，疯狂地热爱互联网和旅行的人们\n马蜂窝能为你实现梦想提供最广阔的平台");
    M.log("请将简历发送至 %csuperhr@mafengwo.com%c（ 邮件标题请以“_console”结尾）", "color:#4ae;", "color:inherit;");
    M.log("职位介绍：http://www.mafengwo.cn/s/hr.html")
});
M.closure(function (a) {
    $.get("/ajax/ajax_page_onload.php", {
        href: document.location.href,
        _t: +new Date()
    }, function (b) {
        if (b.payload && b.payload.apps) {
            var c = b.payload.apps;
            if (!M.isEmpty(c)) {
                var d = {
                    css_list: c.css || []
                };
                M.loadCssJsListSeq(d, function () {
                    if (c.html) {
                        $("body").append(c.html)
                    }
                    if (c.js && c.js.length) {
                        M.loadResource(c.js)
                    }
                })
            }
        }
    }, "json")
});
