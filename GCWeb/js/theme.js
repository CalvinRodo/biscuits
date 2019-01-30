/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * v4.0.30-development - 2019-01-10
 *
 */
! function(a, b) {
    "use strict";
    var c = b.doc,
        d = "wb-actionmng",
        e = "." + d,
        f = "[data-" + d + "]",
        g = d + "Rn",
        h = "wb-init." + d,
        i = d + e,
        j = {},
        k = {},
        l = {},
        m = ["patch", "ajax", "addClass", "removeClass", "tblfilter", "run"].join("." + i + " ") + "." + i,
        n = function(c) {
            var f, g, h, i, j, k, m = b.init(c, d, e);
            if (m) {
                if (f = a(m), g = b.getData(f, d))
                    for (a.isArray(g) || (g = [g]), i = g.length, h = 0; h !== i; h += 1) j = g[h], (k = j.trggroup) && j.action && o(k, l, j);
                b.ready(f, d)
            }
        },
        o = function(a, b, c) {
            b[a] || (b[a] = []), b[a].push(c)
        },
        p = function(a, b, c) {
            var d, e, f;
            for (d = c[b]; e = d.shift();)(f = e.action) && (a.trigger(f + "." + i, e), delete e.action)
        },
        q = function(b, c) {
            var d = c.source,
                e = c.patches,
                f = !!c.cumulative;
            e && (a.isArray(e) || (e = [e]), a(d).trigger({
                type: "patches.wb-jsonmanager",
                patches: e,
                fpath: c.fpath,
                filter: c.filter || [],
                filternot: c.filternot || [],
                cumulative: f
            }))
        },
        r = function(c, d) {
            var e, f, g;
            d.container ? e = a(d.container) : (f = b.getId(), e = a("<div id='" + f + "'></div>"), a(c.target).after(e)), d.trigger && e.attr("data-trigger-wet", "true"), g = d.type ? d.type : "replace", e.attr("data-ajax-" + g, d.url), e.one("wb-contentupdated", function(c, d) {
                var e = c.currentTarget,
                    f = e.getAttribute("data-trigger-wet");
                e.removeAttribute("data-ajax-" + d["ajax-type"]), f && (a(e).find(b.allSelectors).addClass("wb-init").filter(":not(#" + e.id + " .wb-init .wb-init)").trigger("timerpoke.wb"), e.removeAttribute("data-trigger-wet"))
            }), e.trigger("wb-update.wb-data-ajax")
        },
        s = function(b, c) {
            var d = a(c.source || b.target);
            c.class && d.addClass(c.class)
        },
        t = function(b, c) {
            var d = a(c.source || b.target);
            c.class && d.removeClass(c.class)
        },
        u = function(b, c) {
            var d, e = b.target,
                f = a(c.source || e),
                g = c.column,
                h = parseInt(g, 10),
                i = !!c.regex,
                j = !c.smart || !!c.smart,
                k = !c.caseinsen || !!c.caseinsen;
            if ("TABLE" !== f.get(0).nodeName) throw "Table filtering can only applied on table";
            d = f.dataTable({
                retrieve: !0
            }).api(), g = !0 === h ? h : g, d.column(g).search(c.value, i, j, k).draw()
        },
        v = function(b, c) {
            var d, e, f, h, j = b.target,
                k = a(j),
                m = l[c.trggroup];
            if (m && !k.hasClass(g)) {
                for (k.addClass(g), e = m.length, d = 0; d !== e; d += 1) f = m[d], (h = f.action) && k.trigger(h + "." + i, f);
                k.removeClass(g)
            }
        };
    c.on("do." + i, function(b) {
        var c, e, f, g, h, m, n, q = b.element || b.target,
            r = q.id,
            s = b.actions || [];
        if ((q === b.target || b.currentTarget === b.target) && -1 === q.className.indexOf(d)) {
            for (a.isArray(s) || (s = [s]), f = s.length, f && (c = a(q), c.addClass(d)), r && j[r] && p(c, r, j), e = 0; e !== f; e += 1) g = s[e], (h = g.action) && (m = g.target, m ? (g.trgbefore ? o(m, j, g) : o(m, k, g), (n = g.trggroup) && o(n, l, g)) : c.trigger(h + "." + i, g));
            r && k[r] && p(c, r, k), a(b.target).removeClass(d)
        }
    }), c.on("clean." + i, function(a) {
        var b, c, d = a.element || a.target,
            e = a.trggroup;
        if ((d === a.target || a.currentTarget === a.target) && e && l[e])
            for (b = l[e]; c = b.shift();) delete c.action
    }), c.on(m, e, function(a, b) {
        var c = a.type;
        if (i === a.namespace) switch (c) {
            case "run":
                v(a, b);
                break;
            case "tblfilter":
                u(a, b);
                break;
            case "addClass":
                s(a, b);
                break;
            case "removeClass":
                t(a, b);
                break;
            case "ajax":
                r(a, b);
                break;
            case "patch":
                q(a, b)
        }
    }), c.on("timerpoke.wb " + h, f, n), b.add(f)
}(jQuery, wb),
function(a, b, c) {
    "use strict";
    var d, e = "wb-data-json",
        f = "wb-json",
        g = ["[data-json-after]", "[data-json-append]", "[data-json-before]", "[data-json-prepend]", "[data-json-replace]", "[data-json-replacewith]", "[data-" + f + "]"],
        h = ["after", "append", "before", "prepend", "val"],
        i = /(href|src|data-*|pattern|min|max|step|low|high)/,
        j = /(checked|selected|disabled|required|readonly|multiple)/,
        k = g.length,
        l = g.join(","),
        m = "wb-init." + e,
        n = "wb-update." + e,
        o = "wb-contentupdated",
        p = e + "-queue",
        q = c.doc,
        r = function(b) {
            var d, g = c.init(b, e, l);
            if (g) {
                var h, i, j, k, m, n = ["before", "replace", "replacewith", "after", "append", "prepend"],
                    o = n.length,
                    q = [];
                for (d = a(g), j = 0; j !== o; j += 1) h = n[j], null !== (m = g.getAttribute("data-json-" + h)) && q.push({
                    type: h,
                    url: m
                });
                if (c.ready(d, e), (i = c.getData(d, f)) && i.url) q.push(i);
                else if (i && a.isArray(i))
                    for (o = i.length, j = 0; j !== o; j += 1) q.push(i[j]);
                for (d.data(p, q), o = q.length, j = 0; j !== o; j += 1) k = q[j], s(g, k.url, j, k.nocache, k.nocachekey)
            }
        },
        s = function(d, f, g, h, i) {
            var j, k = a(d),
                l = {
                    url: f,
                    refId: g,
                    nocache: h,
                    nocachekey: i
                },
                m = b[e];
            !m || "http" !== f.substr(0, 4) && "//" !== f.substr(0, 2) || (j = c.getUrlParts(f), c.pageUrlParts.protocol === j.protocol && c.pageUrlParts.host === j.host || Modernizr.cors && !m.forceCorsFallback || "function" == typeof m.corsFallback && (l.dataType = "jsonp", l.jsonp = "callback", l = m.corsFallback(l))), k.trigger({
                type: "json-fetch.wb",
                fetch: l
            })
        },
        t = function(b) {
            var d, f = b.target,
                g = a(f),
                k = g.data(p),
                l = b.fetch,
                m = k[l.refId],
                n = m.type,
                q = m.prop || m.attr,
                r = m.showempty,
                s = l.response,
                t = typeof s;
            if (r || "undefined" !== t) {
                if (r && "undefined" === t && (s = ""), d = jQuery.ajaxSettings.cache, jQuery.ajaxSettings.cache = !0, n)
                    if ("replace" === n) g.html(s);
                    else if ("replacewith" === n) g.replaceWith(s);
                else if ("addclass" === n) g.addClass(s);
                else if ("removeclass" === n) g.removeClass(s);
                else if ("prop" === n && q && j.test(q)) g.prop(q, s);
                else if ("attr" === n && q && i.test(q)) g.attr(q, s);
                else {
                    if ("function" != typeof g[n] || -1 === h.indexOf(n)) throw e + " do not support type: " + n;
                    g[n](s)
                } else n = "template", u(f, m, s), m.trigger && g.find(c.allSelectors).addClass("wb-init").filter(":not(#" + f.id + " .wb-init .wb-init)").trigger("timerpoke.wb");
                jQuery.ajaxSettings.cache = d, g.trigger(o, {
                    "json-type": n,
                    content: s
                })
            }
        },
        u = function(b, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = d.mapping || [{}],
                w = d.filter || [],
                x = d.filternot || [],
                y = d.queryall,
                z = d.tobeclone,
                A = b.className,
                B = b,
                C = d.source ? document.querySelector(d.source) : b.querySelector("template");
            if (a.isArray(e) || (e = "object" != typeof e ? [e] : a.map(e, function(b, c) {
                    return "object" != typeof b || a.isArray(b) ? b = {
                        "@id": c,
                        "@value": b
                    } : b["@id"] || (b["@id"] = c), [b]
                })), h = e.length, a.isArray(t) || (t = [t]), f = t.length, "TABLE" === b.tagName && t && -1 !== A.indexOf("wb-tables-inited") && "string" == typeof t[0]) {
                for (s = a(b).dataTable({
                        retrieve: !0
                    }).api(), g = 0; g < h; g += 1)
                    if (i = e[g], v(i, w, x)) {
                        for (m = "/" + g, r = [], j = 0; j < f; j += 1) r.push(jsonpointer.get(e, m + t[j]));
                        s.row.add(r)
                    }
                return void s.draw()
            }
            if (C)
                for (C.content || c.tmplPolyfill(C), d.appendto && (B = a(d.appendto).get(0)), g = 0; g < h; g += 1)
                    if (i = e[g], v(i, w, x)) {
                        for (m = "/" + g, n = z ? C.content.querySelector(z).cloneNode(!0) : C.content.cloneNode(!0), y && (o = n.querySelectorAll(y)), j = 0; j < f || 0 === j; j += 1) k = t[j], p = o ? o[j] : k.selector ? n.querySelector(k.selector) : n, l = k.attr, l && (p.hasAttribute(l) || p.setAttribute(l, ""), p = p.getAttributeNode(l)), r = "string" == typeof i ? i : "string" == typeof k ? jsonpointer.get(e, m + k) : jsonpointer.get(e, m + k.value), k.placeholder && (q = p.textContent || "", r = q.replace(k.placeholder, r)), a.isArray(r) ? u(p, k, r) : k.isHTML ? p.innerHTML = r : p.textContent = r;
                        B.appendChild(n)
                    }
        },
        v = function(a, b, c) {
            var d, e, f, g = b.length,
                h = c.length,
                i = !1;
            if (g || h) {
                for (d = 0; d < g; d += 1)
                    if (e = b[d], f = w(jsonpointer.get(a, e.path), e.value), e.optional) i = i || f;
                    else {
                        if (!f) return !1;
                        i = !0
                    }
                if (g && !i) return !1;
                for (d = 0; d < h; d += 1)
                    if (e = c[d], (f = w(jsonpointer.get(a, e.path), e.value)) && !e.optional || f && e.optional) return !1
            }
            return !0
        },
        w = function(b, c) {
            switch (typeof b) {
                case "undefined":
                    return !1;
                case "boolean":
                case "string":
                case "number":
                    return b === c;
                case "object":
                    if (null === b) return null === c;
                    if (a.isArray(b)) {
                        if (a.isArray(c) || b.length !== c.length) return !1;
                        for (var d = 0, e = b.length; d < e; d++)
                            if (!w(b[d], c[d])) return !1;
                        return !0
                    }
                    var f = x(c),
                        g = f.length;
                    if (x(b).length !== g) return !1;
                    for (var d = 0; d < g; d++)
                        if (!w(b[d], c[d])) return !1;
                    return !0;
                default:
                    return !1
            }
        },
        x = function(b) {
            if (a.isArray(b)) {
                for (var c = new Array(b.length), d = 0; d < c.length; d++) c[d] = "" + d;
                return c
            }
            if (Object.keys) return Object.keys(b);
            var c = [];
            for (var e in b) b.hasOwnProperty(e) && c.push(e);
            return c
        },
        y = function(b) {
            var c = b.target,
                d = a(c),
                e = d.data(p),
                f = e.length,
                g = b["wb-json"];
            if (!g.url || !g.type && !g.source) throw "Data JSON update not configured properly";
            e.push(g), d.data(p, e), s(c, g.url, f)
        };
    q.on("json-failed.wb", l, function() {
        throw "Bad JSON Fetched from url in " + e
    }), Modernizr.load({
        test: "content" in document.createElement("template"),
        nope: "site!deps/template" + c.getMode() + ".js"
    }), q.on("timerpoke.wb " + m + " " + n + " json-fetched.wb", l, function(a) {
        if (a.currentTarget === a.target) switch (a.type) {
            case "timerpoke":
            case "wb-init":
                r(a);
                break;
            case "wb-update":
                y(a);
                break;
            default:
                t(a)
        }
        return !0
    });
    for (d = 0; d !== k; d += 1) c.add(g[d])
}(jQuery, window, wb),
function(a, b, c) {
    "use strict";
    var d = "wb-template",
        e = "template",
        f = "wb-init." + d,
        g = c.doc,
        h = function(a) {
            if (!a.content) {
                var c, d, e = a;
                for (c = e.childNodes, d = b.createDocumentFragment(); c[0];) d.appendChild(c[0]);
                e.content = d
            }
        },
        i = function(b) {
            var f = c.init(b, d, e);
            f && (h(f), c.ready(a(f), d))
        };
    c.tmplPolyfill = h, g.on("timerpoke.wb " + f, e, i), c.add(e)
}(jQuery, document, wb),
function(a, b, c) {
    "use strict";
    var d = "wb-doaction",
        e = "a[data-" + d + "],button[data-" + d + "]",
        f = "do.wb-actionmng",
        g = c.doc;
    g.on("click", e, function(b) {
        var h = b.target,
            i = a(h);
        if (b.currentTarget !== b.target && (i = i.parentsUntil("main", e), h = i[0]), "BUTTON" === h.nodeName || "A" === h.nodeName) return c.isReady ? i.trigger({
            type: f,
            actions: c.getData(i, d)
        }) : g.one("wb-ready.wb", function() {
            i.trigger({
                type: f,
                actions: c.getData(i, d)
            })
        }), !1
    })
}(jQuery, window, wb),
function(a, b, c) {
    "use strict";
    var d = "wb-fieldflow",
        e = "." + d,
        f = d + "-form",
        g = d + "-sub",
        h = d + "-init",
        i = "." + h,
        j = d + c.getId(),
        k = "[name^=" + j + "]",
        l = d + "-label",
        m = d + "-header",
        n = "." + f,
        o = "wb-init" + e,
        p = "draw" + e,
        q = "action" + e,
        r = "submit" + e,
        s = "submited" + e,
        t = "ready" + e,
        u = "clean" + e,
        v = "reset" + e,
        w = "createctrl" + e,
        x = d + "-register",
        y = d + "-hdnfld",
        z = d + "-config",
        A = d + "-push",
        B = d + "-submit",
        C = d + "-action",
        D = d + "-origin",
        E = "data-" + d + "-source",
        F = d + "-flagoptvalue",
        G = c.doc,
        H = {
            toggle: {
                stateOn: "visible",
                stateOff: "hidden"
            },
            i18n: {
                en: {
                    btn: "Continue",
                    defaultsel: "Make your selection...",
                    required: "required"
                },
                fr: {
                    btn: "Allez",
                    defaultsel: "Sélectionnez dans la liste...",
                    required: "obligatoire"
                }
            },
            action: "ajax",
            prop: "url"
        },
        I = [
            ["redir", "query", "ajax", "addClass", "removeClass", "removeClass", "append", "tblfilter", "toggle"].join("." + q + " ") + "." + q, ["ajax", "toggle", "redir", "addClass", "removeClass"].join("." + r + " ") + "." + r, ["tblfilter", d].join("." + p + " ") + "." + p, ["select", "checkbox", "radio"].join("." + w + " ") + "." + w
        ].join(" "),
        J = function(b) {
            var g, h, i, j, k, l = c.init(b, d, e);
            if (l) {
                g = a(l), h = l.id, H.i18n[c.lang] && (H.i18n = H.i18n[c.lang]), i = c.getData(g, d), i && i.i18n && (i.i18n = a.extend({}, H.i18n, i.i18n)), j = a.extend({}, H, i), j.defaultIfNone && !a.isArray(j.defaultIfNone) && (j.defaultIfNone = [j.defaultIfNone]), g.data(z, j), k = j.i18n, String.prototype.startsWith || (String.prototype.startsWith = function(a, b) {
                    return b = b || 0, this.substr(b, a.length) === a
                });
                var m, n, o, q = c.getId();
                if (j.noForm) {
                    for (m = "<div class='mrgn-tp-md'><div id='" + q + "'></div></div>", n = l.parentElement;
                        "FORM" !== n.nodeName;) n = n.parentElement;
                    a(n.parentElement).addClass(f)
                } else m = "<div class='wb-frmvld " + f + "'><form><div id='" + q + "'>", m = m + '</div><input type="submit" value="' + k.btn + '" class="btn btn-primary mrgn-bttm-md" /> </form></div>';
                g.addClass("hidden"), m = a(m), g.after(m), j.noForm || (n = m.find("form"), m.trigger("wb-init.wb-frmvld")), o = a(n), K(o, x, h), j.outputctnrid || (j.outputctnrid = q), j.source || (j.source = l), j.srctype || (j.srctype = d), j.inline = !!j.inline, g.trigger(j.srctype + "." + p, j), j.unhideelm && a(j.unhideelm).removeClass("hidden"), j.hideelm && a(j.hideelm).addClass("hidden"), c.ready(g, d), j.ext && (j.form = o.get(0), g.trigger(j.ext + "." + t, j))
            }
        },
        K = function(a, b, c, d) {
            var e = a.data(b);
            return e && !d || (e = []), e.push(c), a.data(b, e)
        },
        L = function(a, b) {
            var c = b.form,
                d = b.url;
            d && c.setAttribute("action", d)
        },
        M = function(a, b) {
            var c = b.$selElm,
                d = b.name,
                e = b.value;
            d && b.provEvt.setAttribute("name", d), e && c.val(e), c.attr("data-" + F, F)
        },
        N = function(b, c) {
            var d, e = c.provEvt;
            c.live ? (c.container || (d = a("<div></div>"), a(e.parentNode).append(d), c.container = d.get(0)), a(b.target).trigger("ajax." + r, c)) : (c.preventSubmit = !0, K(a(e), B, c))
        },
        O = function(b, d) {
            var e, f, g, h = d.clean;
            d.container ? e = a(d.container) : (f = c.getId(), e = a("<div id='" + f + "'></div>"), a(d.form).append(e), h = "#" + f), h && a(d.origin).one(u, function() {
                a(h).empty()
            }), d.trigger && e.attr("data-trigger-wet", "true"), g = d.type ? d.type : "replace", e.attr("data-ajax-" + g, d.url), e.one("wb-contentupdated", function(b, d) {
                var e = b.currentTarget,
                    f = e.getAttribute("data-trigger-wet");
                e.removeAttribute("data-ajax-" + d["ajax-type"]), f && (a(e).find(c.allSelectors).addClass("wb-init").filter(":not(#" + e.id + " .wb-init .wb-init)").trigger("timerpoke.wb"), e.removeAttribute("data-trigger-wet"))
            }), e.trigger("wb-update.wb-data-ajax")
        },
        P = function(b, c) {
            var d = a(c.origin),
                e = a(b.target).data(z),
                f = c.toggle;
            f && "string" == typeof f && (f = {
                selector: f
            }), f = a.extend({}, f, e.toggle), d.addClass("wb-toggle"), d.trigger("toggle.wb-toggle", f), f.type = "off", d.one(u, function() {
                d.addClass("wb-toggle"), d.trigger("toggle.wb-toggle", f), d.removeClass("wb-toggle")
            })
        },
        Q = function(b, c) {
            if (b.namespace === q) {
                var e = c.srctype ? c.srctype : d;
                if (c.container = c.provEvt.parentNode.id, !c.source) throw "A source is required to append a field flow control.";
                a(b.currentTarget).trigger(e + "." + p, c)
            }
        },
        R = function(b, c) {
            if (b.namespace === q) {
                var d, e = c.source,
                    f = a(e).dataTable({
                        retrieve: !0
                    }).api(),
                    g = c.column,
                    h = parseInt(g, 10),
                    i = !!c.regex,
                    j = !c.smart || !!c.smart,
                    k = !c.caseinsen || !!c.caseinsen;
                g = !0 === h ? h : g, d = f.column(g), d.search(c.value, i, j, k).draw(), a(c.provEvt).one(u, function() {
                    d.search("").draw()
                })
            }
        },
        S = function(b, c) {
            if (b.namespace === p) {
                var d, e, f, g, h, i, j, k, l, m, n, o, q, r = c.column,
                    s = c.csvextract,
                    t = c.source,
                    u = a(t),
                    v = [],
                    x = c.label,
                    y = c.defaultselectedlabel,
                    z = c.lblselector,
                    A = c.fltrseq ? c.fltrseq : [],
                    B = c.limit ? c.limit : 10;
                if (!u.hasClass("wb-tables-inited")) return u.one("wb-ready.wb-tables", function() {
                    a(b.target).trigger("tblfilter." + p, c)
                }), !1;
                if (e = u.dataTable({
                        retrieve: !0
                    }).api(), e.rows({
                        search: "applied"
                    }).data().length <= B) return !0;
                if (q = c.renderas ? c.renderas : "select", !r && A.length) {
                    if (l = A.shift(), !l.column) throw "Column is undefined in the filter sequence";
                    r = l.column, s = l.csvextract, y = l.defaultselectedlabel, x = l.label, z = l.lblselector
                }
                if (d = e.column(r, {
                        search: "applied"
                    }), s)
                    for (f = d.data(), h = 0, i = f.length; h !== i; h += 1) v = v.concat(f[h].split(","));
                else
                    for (f = d.nodes(), h = 0, i = f.length; h !== i; h += 1)
                        for (g = a(f[h]).find("li"), j = 0, k = g.length; j !== k; j += 1) v.push(a(g[j]).text());
                v = v.sort().filter(function(a, b, c) {
                    return !b || a !== c[b - 1]
                });
                var C = b.target,
                    D = a(C),
                    E = [],
                    F = c.actions ? c.actions : [];
                for (A.length && (m = A[0], o = {
                        action: "append",
                        srctype: "tblfilter",
                        source: t,
                        renderas: m.renderas ? m.renderas : q,
                        fltrseq: A,
                        limit: B
                    }), h = 0, i = v.length; h !== i; h += 1) l = v[h], n = {
                    label: l,
                    actions: [{
                        action: "tblfilter",
                        source: t,
                        column: r,
                        value: l
                    }]
                }, o && n.actions.push(o), E.push(n);
                x || (x = d.header().textContent), c.outputctnrid || (c.outputctnrid = c.provEvt.parentElement.id), D.trigger(q + "." + w, {
                    actions: F,
                    source: u.get(0),
                    outputctnrid: c.outputctnrid,
                    label: x,
                    defaultselectedlabel: y,
                    lblselector: z,
                    items: E,
                    inline: c.inline
                })
            }
        },
        T = function(b, e) {
            if (b.namespace === p) {
                var f, h, i, j, k, n, o, q = b.target,
                    r = a(q),
                    s = a(e.source),
                    t = s.get(0),
                    u = e.lblselector || "." + l,
                    v = e.itmselector || "ul:first() > li";
                s.hasClass(g) && (f = c.getData(s, d), s.data(z, f), e = a.extend({}, e, f)), n = e.actions || [], o = e.renderas ? e.renderas : "select", t.id || (t.id = c.getId()), i = s.children().first(), i.hasClass(m) ? (j = i.html(), v = "." + m + " + " + v) : (h = i.find(u), j = h.length ? h.html() : s.find("> p").html(), u = null), k = W(s.find(v)), e.outputctnrid || (e.outputctnrid = e.provEvt.parentElement.id), r.trigger(o + "." + w, {
                    actions: n,
                    source: t,
                    attributes: e.attributes,
                    outputctnrid: e.outputctnrid,
                    label: j,
                    lblselector: u,
                    defaultselectedlabel: e.defaultselectedlabel,
                    required: !e.isoptional,
                    noreqlabel: e.noreqlabel,
                    items: k,
                    inline: e.inline
                })
            }
        },
        U = function(b, d) {
            var e, f, g, i, k, l, m, n, o, p = d.outputctnrid,
                q = a("#" + p),
                r = d.actions,
                s = d.lblselector,
                t = !!d.required,
                u = !d.noreqlabel,
                v = d.items,
                w = b.target,
                y = a(w),
                B = d.source,
                C = d.attributes,
                F = y.data(z).i18n,
                G = c.getId(),
                H = "<label for='" + G + "'",
                I = "</span>",
                J = d.defaultselectedlabel ? d.defaultselectedlabel : F.defaultsel;
            if (t && u && (H += " class='required'", I += " <strong class='required'>(" + F.required + ")</strong>"), H += "><span class='field-name'>", I += "</label>", s ? (e = a("<div>" + d.label + "</div>"), f = e.find(s), f.html(H + f.html() + I)) : e = a(H + d.label + I), g = "<select id='" + G + "' name='" + j + G + "' class='full-width form-control mrgn-bttm-md " + h + "' data-" + D + "='" + w.id + "' " + E + "='" + B.id + "'", t && (g += " required"), C && "object" == typeof C)
                for (k in C) C.hasOwnProperty(k) && (g += " " + k + "='" + C[k] + "'");
            for (g += "><option value=''>" + J + "</option>", k = 0, l = v.length; k !== l; k += 1)
                if (o = v[k], o.group) {
                    for (g += "<optgroup label='" + o.label + "'>", n = o.group.length, m = 0; m !== n; m += 1) g += X(o.group[m]);
                    g += "</optgroup>"
                } else g += X(o);
            g += "</select>", i = a(g), q.append(e).append(i), r && r.length > 0 && i.data(A, r), K(y, x, G)
        },
        V = function(b, d) {
            var e, f, g, i, k, l, m, n, o, p = d.outputctnrid,
                q = d.actions,
                r = d.lblselector,
                s = !!d.required,
                t = !d.noreqlabel,
                u = d.items,
                v = b.target,
                w = a(v),
                y = d.source,
                B = w.data(z).i18n,
                C = d.attributes,
                F = c.getId(),
                G = "<legend class='h5 ",
                H = "</span>",
                I = "<fieldset id='" + F + "' data-" + D + "='" + v.id + "' " + E + "='" + y.id + "' class='" + h + " mrgn-bttm-md'",
                J = "",
                L = d.typeRadCheck,
                M = d.inline,
                N = j + F;
            if (C && "object" == typeof C)
                for (k in C) C.hasOwnProperty(k) && (I += " " + k + "='" + C[k] + "'");
            for (e = a(I + "></fieldset>"), s && t && (G += " required", H += " <strong class='required'>(" + B.required + ")</strong>"), G += "'>", H += "</legend>", r ? (g = a("<div>" + d.label + "</div>"), f = g.find(r), e.append(G + f.html() + H).append(f.nextAll()), i = f.prevAll()) : e.append(a(G + d.label + H)), k = 0, l = u.length; k !== l; k += 1)
                if (o = u[k], o.group)
                    for (J += "<p>" + o.label + "</p>", n = o.group.length, m = 0; m !== n; m += 1) J += Z(o.group[m], N, L, M, s);
                else J += Z(o, N, L, M, s);
            e.append(J), a("#" + p).append(e), i && e.before(i), q && q.length > 0 && e.data(A, q), K(w, x, F)
        },
        W = function(b, e) {
            var f, h, i, j, k, m, n, o, p, q, r, s, t, u = b.get(),
                v = u.length,
                w = [];
            for (f = 0; f !== v; f += 1) {
                if (h = u[f], j = "", k = null, i = "", p = h.firstChild, o = h.childNodes, n = o.length, !p) throw "You have a markup error, There may be an empyt <li> elements in your list.";
                for (t = [], "A" === p.nodeName && (j = p.getAttribute("href"), i = a(p).html(), n = 1, t.push({
                        action: "redir",
                        url: j
                    })), m = 1; m !== n; m += 1) {
                    if (q = o[m], r = a(q), r.hasClass(g)) {
                        s = q.id || c.getId(), q.id = s, j = d + "-" + s, t.push({
                            action: "append",
                            srctype: d,
                            source: "#" + s
                        });
                        break
                    }
                    if ("UL" === q.nodeName) {
                        if (e) throw "Recursive error, please check your code";
                        k = W(r.children(), !0)
                    }
                    r.hasClass(l) && (i = r.html())
                }
                i || (i = p.nodeValue), h.id || (h.id = c.getId()), w.push({
                    bind: h.id,
                    label: i,
                    actions: t,
                    group: k
                })
            }
            return w
        },
        X = function(a) {
            var b = a.label,
                c = "<option value='" + b + "'";
            return c += Y(a), c += ">" + b + "</option>"
        },
        Y = function(a) {
            var b = "",
                c = {};
            return c.bind = a.bind || "", c.actions = a.actions || [], b += " data-" + d + "='" + JSON.stringify(c) + "'"
        },
        Z = function(a, b, d, e, f) {
            var g = a.label,
                h = c.getId(),
                i = e ? "-inline" : "",
                j = " for='" + h + "'><input id='" + h + "' type='" + d + "' name='" + b + "' value='" + g + "'";
            return j = e ? "<label class='" + d + i + "'" + j : "<div class='" + d + "'><label" + j, j += Y(a), f && (j += " required='required'"), j += " /> " + g + "</label>", e || (j += "</div>"), j
        };
    G.on(v, e + ", ." + g, function(b) {
        var c, d, e, f, g, h, i, j, k = b.target,
            l = [];
        if (k === b.currentTarget && (c = a(k), (d = c.data(z)) && d.reset))
            for (e = d.reset, a.isArray(e) ? l = e : l.push(e), g = l.length, f = 0; f !== g; f += 1) h = l[f], (i = h.action) && (j = h.live, !1 !== j && (h.live = !0), c.trigger(i + "." + q, h))
    }), G.on("change", n + " " + i, function(e) {
        var f, g, h, i, j, k, l, m, n = e.currentTarget,
            o = a(n),
            p = o.nextAll(),
            r = a("#" + n.getAttribute("data-" + D)),
            s = a("#" + n.getAttribute(E)),
            t = r.data(x),
            w = o.find(":checked", o),
            y = o.get(0).form;
        if (i = p.length) {
            for (h = i; 0 !== h; h -= 1)(l = p[h]) && (m = t.indexOf(l.id), m > -1 && t.splice(m, 1), a("#" + l.getAttribute(E)).trigger(v).trigger(u), a(l).trigger(u));
            r.data(x, t), p.remove()
        }
        s.trigger(v).trigger(u), o.trigger(u), o.data(B, []);
        var F, G, H, I, J, K, L, M, N, O, P = [],
            Q = [],
            R = [];
        for (F = r.data(z), G = s.data(z), G && F && (F = a.extend({}, F, G)), w.length && w.val() && F && F.default && (g = F.default, a.isArray(g) ? P = g : P.push(g)), J = F.action, K = F.prop, C = F.actionData || {}, g = o.data(A), g && (P = P.concat(g)), h = 0, i = w.length; h !== i; h += 1)
            if (f = w.get(h), (H = c.getData(f, d)) && (N = H.bind, P = P.concat(H.actions), N && (O = b.getElementById(N), I = O.getAttribute("data-" + d)))) {
                if (I.startsWith("{") || I.startsWith("[")) {
                    try {
                        g = JSON.parse(I)
                    } catch (b) {
                        a.error("Bad JSON object " + I)
                    }
                    a.isArray(g) || (g = [g])
                } else g = {}, g.action = J, g[K] = I, g = a.extend(!0, {}, C, g), g = [g];
                P = P.concat(g)
            }
        if (!P.length) return !0;
        for (h = 0, i = P.length; h !== i; h += 1) j = P[h], k = j.target, k && k !== N ? R.push(j) : Q.push(j);
        for (L = F.base || {}, M = R.length, h = 0, i = Q.length; h !== i; h += 1) j = a.extend({}, L, Q[h]), j.origin = s.get(0), j.provEvt = n, j.$selElm = w, j.form = y, M && (j.actions = R), r.trigger(j.action + "." + q, j);
        return !0
    }), G.on("submit", n + " form", function(b) {
        var c, d, e, f, g, h, i, j, l, m, n, o, p, t, v, w = b.currentTarget,
            A = a(w),
            C = A.data(x),
            E = A.data(y) || [],
            F = C ? C.length : 0,
            G = [],
            H = [],
            I = !1;
        for (F && (e = a("#" + C[F - 1]), f = e.data(x), a("#" + f[f.length - 1]).trigger(u), e.trigger(u)), d = 0; d !== F; d += 1)
            for (e = a("#" + C[d]), g = e.data(x), m = g.length, l = 0; l !== m; l += 1) {
                if (h = a("#" + g[l]), i = a("#" + h.data(D)), H.push(i), j = i.data(z), !(t = h.data(B)) && j.defaultIfNone) {
                    for (t = j.defaultIfNone, n = 0, o = t.length; n !== o; n += 1) p = t[n], p.origin = i.get(0), p.$selElm = i.prev().find("input, select").eq(0), p.provEvt = p.$selElm.get(0), p.form = w, i.trigger(p.action + "." + q, p);
                    t = h.data(B)
                }
                if (t)
                    for (n = 0, o = t.length; n !== o; n += 1) p = t[n], p.form = w, e.trigger(p.action + "." + r, p), G.push({
                        $elm: e,
                        data: p
                    }), I = I || p.preventSubmit, v = p.provEvt
            }
        if (!I) {
            for (A.find(k).removeAttr("name"), F = E.length, d = 0; d !== F; d += 1) a(E[d]).remove();
            E = [];
            var J, K, L, M, N, O, P;
            if ((J = A.attr("action")) && (K = J.indexOf("?")) > 0) {
                for (L = J.substring(K + 1), P = L.split("&"), F = P.length, d = 0; d !== F; d += 1) M = P[d], N = M, M.indexOf("=") > 0 && (O = M.split("=", 2), N = O[0], M = O[1]), c = a("<input type='hidden' name='" + N + "' value='" + M + "' />"), A.append(c), E.push(c.get(0));
                A.data(y, E)
            }
        }
        for (F = H.length, d = 0; d !== F; d += 1) i = H[d], j = i.data(z), j.action && G.push({
            $elm: i,
            data: j
        });
        for (F = G.length, d = 0; d !== F; d += 1) p = G[d], p.data.lastProvEvt = v, p.$elm.trigger(p.data.action + "." + s, p.data);
        if (I) return b.preventDefault(), b.stopPropagation ? b.stopImmediatePropagation() : b.cancelBubble = !0, !1
    }), G.on("keyup", n + " select", function(b) {
        if (-1 !== navigator.userAgent.indexOf("Gecko")) return !(!b.keyCode || 1 !== b.keyCode && 9 !== b.keyCode && 16 !== b.keyCode && !b.altKey && !b.ctrlKey) || (a(b.target).trigger("change"), !0)
    }), G.on(I, e, function(b, c) {
        var e = b.type;
        switch (b.namespace) {
            case p:
                switch (e) {
                    case d:
                        T(b, c);
                        break;
                    case "tblfilter":
                        S(b, c)
                }
                break;
            case w:
                switch (e) {
                    case "select":
                        U(b, c);
                        break;
                    case "checkbox":
                        c.typeRadCheck = "checkbox", V(b, c);
                        break;
                    case "radio":
                        c.typeRadCheck = "radio", V(b, c)
                }
                break;
            case q:
                switch (e) {
                    case "append":
                        Q(b, c);
                        break;
                    case "redir":
                        K(a(c.provEvt), B, c, !0);
                        break;
                    case "ajax":
                        N(b, c);
                        break;
                    case "tblfilter":
                        R(b, c);
                        break;
                    case "toggle":
                        c.live ? P(b, c) : (c.preventSubmit = !0, K(a(c.provEvt), B, c));
                        break;
                    case "addClass":
                        if (!c.source || !c.class) return;
                        c.live ? a(c.source).addClass(c.class) : (c.preventSubmit = !0, K(a(c.provEvt), B, c));
                        break;
                    case "removeClass":
                        if (!c.source || !c.class) return;
                        c.live ? a(c.source).removeClass(c.class) : (c.preventSubmit = !0, K(a(c.provEvt), B, c));
                        break;
                    case "query":
                        M(b, c)
                }
                break;
            case r:
                switch (e) {
                    case "redir":
                        L(b, c);
                        break;
                    case "ajax":
                        O(b, c);
                        break;
                    case "toggle":
                        P(b, c);
                        break;
                    case "addClass":
                        a(c.source).addClass(c.class);
                        break;
                    case "removeClass":
                        a(c.source).removeClass(c.class);
                        break;
                    case "query":
                        M(b, c)
                }
        }
    }), G.on("timerpoke.wb " + o, e, function(a) {
        switch (a.type) {
            case "timerpoke":
            case "wb-init":
                J(a)
        }
        return !0
    }), c.add(e)
}(jQuery, document, wb),
function(a, b) {
    "use strict";
    var c = b.doc,
        d = "json-fetch",
        e = d + ".wb",
        f = {},
        g = {},
        h = function(b, c, d, e, f, g) {
            if (!window.jsonpointer) return setTimeout(function() {
                h(b, c, d, e, f, g)
            }, 100), !1;
            g && (d = jsonpointer.get(d, g)), a("#" + b).trigger({
                type: "json-fetched.wb",
                fetch: {
                    response: d,
                    status: e,
                    xhr: f,
                    refId: c
                }
            }, this)
        };
    c.on(e, function(c) {
        var d, e, i, j, k, l, m = c.element || c.target,
            n = c.fetch,
            o = n.url.split("#"),
            p = o[0],
            q = n.nocache,
            r = n.nocachekey || b.cacheBustKey || "wbCacheBust",
            s = o[1] || !1,
            t = n.refId;
        if (m === c.target || c.currentTarget === c.target) {
            if (m.id || (m.id = b.getId()), k = m.id, s) {
                if (i = s.split("/"), j = i[0], 91 === j.charCodeAt(0)) return void a("#" + k).trigger({
                    type: "postpone.wb-jsonmanager",
                    postpone: {
                        callerId: k,
                        refId: t,
                        dsname: j,
                        selector: s.substring(j.length)
                    }
                });
                n.url = p
            }
            q && (d = "nocache" === q ? b.guid() : b.sessionGUID(), e = r + "=" + d, p = -1 !== p.indexOf("?") ? p + "&" + e : p + "?" + e, n.url = p), Modernizr.load({
                load: "site!deps/jsonpointer" + b.getMode() + ".js",
                complete: function() {
                    if (!n.nocache) {
                        if (l = f[p]) return void h(k, t, l, "success", void 0, s);
                        if (g[p]) return void g[p].push({
                            callerId: k,
                            refId: t,
                            selector: s
                        });
                        g[p] = []
                    }
                    a.ajax(n).done(function(a, b, c) {
                        var d, e, i, j;
                        if (!n.nocache) try {
                            f[p] = a
                        } catch (a) {
                            return
                        }
                        if (h(k, t, a, b, c, s), g[p])
                            for (j = g[p], e = j.length, d = 0; d !== e; d += 1) i = j[d], h(i.callerId, i.refId, a, b, c, i.selector)
                    }).fail(function(b, c, d) {
                        a("#" + k).trigger({
                            type: "json-failed.wb",
                            fetch: {
                                xhr: b,
                                status: c,
                                error: d,
                                refId: t
                            }
                        }, this)
                    }, this)
                }
            })
        }
    })
}(jQuery, wb),
function(a, b, c) {
    "use strict";

    function d(a, b, c, d) {
        var e = a.data(b);
        return e && !d || (e = []), e.push(c), a.data(b, e)
    }
    var e = "wb-jsonmanager",
        f = "[data-" + e + "]",
        g = "wb-init." + e,
        h = "postpone." + e,
        i = "patches." + e,
        j = [],
        k = {},
        l = {},
        m = {},
        n = c.doc,
        o = {
            ops: [{
                name: "wb-count",
                fn: function(b, c, d) {
                    var e, f, g = b[c],
                        h = 0,
                        i = this.filter || [],
                        j = this.filternot || [];
                    if (a.isArray(i) || (i = [i]), a.isArray(j) || (j = [j]), (i.length || j.length) && a.isArray(g))
                        for (e = g.length, f = 0; f !== e; f += 1) r(g[f], i, j) && (h += 1);
                    else a.isArray(g) && (h = g.length);
                    jsonpatch.apply(d, [{
                        op: "add",
                        path: this.set,
                        value: h
                    }])
                }
            }, {
                name: "wb-first",
                fn: function(b, c, d) {
                    var e = b[c];
                    a.isArray(e) && 0 !== e.length && jsonpatch.apply(d, [{
                        op: "add",
                        path: this.set,
                        value: e[0]
                    }])
                }
            }, {
                name: "wb-last",
                fn: function(b, c, d) {
                    var e = b[c];
                    a.isArray(e) && 0 !== e.length && jsonpatch.apply(d, [{
                        op: "add",
                        path: this.set,
                        value: e[e.length - 1]
                    }])
                }
            }, {
                name: "wb-nbtolocal",
                fn: function(a, c, d) {
                    var e = a[c],
                        f = this.locale || b.wb.lang,
                        g = this.suffix || "",
                        h = this.prefix || "";
                    "string" == typeof e && (e = parseFloat(e), isNaN(e)) || jsonpatch.apply(d, [{
                        op: "replace",
                        path: this.path,
                        value: h + e.toLocaleString(f) + g
                    }])
                }
            }, {
                name: "wb-toDateISO",
                fn: function(a, b, d) {
                    this.set ? jsonpatch.apply(d, [{
                        op: "add",
                        path: this.set,
                        value: c.date.toDateISO(a[b])
                    }]) : jsonpatch.apply(d, [{
                        op: "replace",
                        path: this.path,
                        value: c.date.toDateISO(a[b])
                    }])
                }
            }, {
                name: "wb-toDateTimeISO",
                fn: function(a, b, d) {
                    this.set ? jsonpatch.apply(d, [{
                        op: "add",
                        path: this.set,
                        value: c.date.toDateISO(a[b], !0)
                    }]) : jsonpatch.apply(d, [{
                        op: "replace",
                        path: this.path,
                        value: c.date.toDateISO(a[b], !0)
                    }])
                }
            }],
            opsArray: [{
                name: "wb-toDateISO",
                fn: function(a) {
                    var b, c = this.set,
                        d = this.path,
                        e = a.length;
                    for (b = 0; b !== e; b += 1) c ? jsonpatch.apply(a, [{
                        op: "wb-toDateISO",
                        set: "/" + b + c,
                        path: "/" + b + d
                    }]) : jsonpatch.apply(a, [{
                        op: "wb-toDateISO",
                        path: "/" + b + d
                    }])
                }
            }, {
                name: "wb-toDateTimeISO",
                fn: function(a) {
                    var b, c = this.set,
                        d = this.path,
                        e = a.length;
                    for (b = 0; b !== e; b += 1) c ? jsonpatch.apply(a, [{
                        op: "wb-toDateTimeISO",
                        set: "/" + b + c,
                        path: "/" + b + d
                    }]) : jsonpatch.apply(a, [{
                        op: "wb-toDateTimeISO",
                        path: "/" + b + d
                    }])
                }
            }],
            opsRoot: [],
            settings: {}
        },
        p = function(a, b, c, d) {
            a.after('<p lang="en"><strong>JSON Manager Debug</strong> (' + b + ')</p><ul lang="en"><li>JSON: <pre><code>' + JSON.stringify(c) + "</code></pre></li><li>Patches: <pre><code>" + JSON.stringify(d) + "</code></pre>")
        },
        q = function(d) {
            var g, h, i, k, l, m, n, p, q, r = c.init(d, e, f),
                s = b[e] || {};
            r && (g = a(r), Modernizr.load({
                load: "site!deps/json-patch" + c.getMode() + ".js",
                testReady: function() {
                    return b.jsonpatch
                },
                complete: function() {
                    var b = c.getData(g, e);
                    if (!o.registered) {
                        if (h = o.ops.concat(s.ops || []), i = o.opsArray.concat(s.opsArray || []), k = o.opsRoot.concat(s.opsRoot || []), h.length)
                            for (l = 0, m = h.length; l !== m; l++) n = h[l], jsonpatch.registerOps(n.name, n.fn);
                        if (i.length)
                            for (l = 0, m = i.length; l !== m; l++) n = i[l], jsonpatch.registerOpsArray(n.name, n.fn);
                        if (k.length)
                            for (l = 0, m = k.length; l !== m; l++) n = k[l], jsonpatch.registerOpsRoot(n.name, n.fn);
                        o.settings = a.extend({}, o.settings, s.settings || {}), o.registered = !0
                    }
                    if (!(q = b.name) || q in j) throw "Dataset name must be unique";
                    j.push(q), p = b.url, p ? (g.trigger({
                        type: "json-fetch.wb",
                        fetch: {
                            url: p,
                            nocache: b.nocache,
                            nocachekey: b.nocachekey
                        }
                    }), 35 === p.charCodeAt(0) && 91 === p.charCodeAt(1) && c.ready(g, e)) : c.ready(g, e)
                }
            }))
        },
        r = function(a, b, c) {
            var d, e, f, g = b.length,
                h = c.length,
                i = !1;
            if (g || h) {
                for (d = 0; d < g; d += 1)
                    if (e = b[d], f = s(jsonpointer.get(a, e.path), e.value), e.optional) i = i || f;
                    else {
                        if (!f) return !1;
                        i = !0
                    }
                if (g && !i) return !1;
                for (d = 0; d < h; d += 1)
                    if (e = c[d], (f = s(jsonpointer.get(a, e.path), e.value)) && !e.optional || f && e.optional) return !1
            }
            return !0
        },
        s = function(b, c) {
            switch (typeof b) {
                case "undefined":
                    return !1;
                case "boolean":
                case "string":
                case "number":
                    return b === c;
                case "object":
                    if (null === b) return null === c;
                    if (a.isArray(b)) {
                        if (a.isArray(c) || b.length !== c.length) return !1;
                        for (var d = 0, e = b.length; d < e; d++)
                            if (!s(b[d], c[d])) return !1;
                        return !0
                    }
                    var f = t(c),
                        g = f.length;
                    if (t(b).length !== g) return !1;
                    for (var d = 0; d < g; d++)
                        if (!s(b[d], c[d])) return !1;
                    return !0;
                default:
                    return !1
            }
        },
        t = function(b) {
            if (a.isArray(b)) {
                for (var c = new Array(b.length), d = 0; d < c.length; d++) c[d] = "" + d;
                return c
            }
            if (Object.keys) return Object.keys(b);
            var c = [];
            for (var e in b) b.hasOwnProperty(e) && c.push(e);
            return c
        },
        u = function(b, c, d, e) {
            var f, g, h;
            if (a.isArray(d) || (d = [d]), a.isArray(e) || (e = [e]), f = jsonpointer.get(b, c), a.isArray(f))
                for (h = f.length - 1, g = h; - 1 !== g; g -= 1) r(f[g], d, e) || jsonpatch.apply(b, [{
                    op: "remove",
                    path: c + "/" + g
                }]);
            return b
        };
    c.ie && (Number.prototype.toLocaleString = function(a) {
        var b, c = this.toString().split("."),
            d = c[0],
            e = c[1],
            f = d.length,
            g = f % 3 || 3,
            h = d.substr(0, g),
            i = "fr" === a,
            j = i ? " " : ",";
        for (b = g; b < f; b += 3) h = h + j + d.substr(b, 3);
        return e.length && (h = i ? h + "," + e : h + "." + e), h
    }), n.on("json-failed.wb", f, function(b) {
        var d, f = b.target;
        f === b.currentTarget && (d = a(f), d.addClass("jsonfail"), c.ready(d, e))
    }), n.on("json-fetched.wb", f, function(b) {
        var d, f, g, h, i, j, n, o, q, r, s, t, v = b.target,
            w = a(v),
            x = b.fetch.response,
            y = a.isArray(x);
        if (v === b.currentTarget) {
            d = c.getData(w, e), f = "[" + d.name + "]", q = d.patches || [], t = d.fpath, r = d.filter || [], s = d.filternot || [], a.isArray(q) || (q = [q]), x = y ? a.extend([], x) : a.extend({}, x), t && (x = u(x, t, r, s)), q.length && (y && d.wraproot && (j = {}, j[d.wraproot] = x, x = j), jsonpatch.apply(x, q)), d.debug && p(w, "initEvent", x, q);
            try {
                k[f] = x
            } catch (a) {
                return
            }
            if (l[f] = d, !d.wait && m[f])
                for (n = m[f], i = n.length, h = 0; h !== i; h += 1) {
                    if (j = n[h], o = j.selector, o.length) try {
                        g = jsonpointer.get(x, o)
                    } catch (a) {
                        throw f + " - JSON selector not found: " + o
                    } else g = x;
                    a("#" + j.callerId).trigger({
                        type: "json-fetched.wb",
                        fetch: {
                            response: g,
                            status: "200",
                            refId: j.refId,
                            xhr: null
                        }
                    }, this)
                }
            c.ready(w, e)
        }
    }), n.on(i, f, function(b) {
        var d, f, g, h, i, j, l, n, o, q = b.target,
            r = a(q),
            s = b.patches,
            t = b.fpath,
            v = b.filter || [],
            w = b.filternot || [],
            x = !!b.cumulative;
        if (q === b.currentTarget && a.isArray(s)) {
            if (!(d = c.getData(r, e))) return !0;
            if (f = "[" + d.name + "]", !m[f]) throw "Applying patched on undefined dataset name: " + f;
            for (g = k[f], x || (g = a.extend(!0, a.isArray(g) ? [] : {}, g)), t && (g = u(g, t, v, w)), jsonpatch.apply(g, s), d.debug && p(r, "patchesEvent", g, s), i = m[f], l = i.length, j = 0; j !== l; j += 1) {
                if (n = i[j], o = n.selector, o.length) try {
                    h = jsonpointer.get(g, o)
                } catch (a) {
                    throw f + " - JSON selector not found: " + o
                } else h = g;
                a("#" + n.callerId).trigger({
                    type: "json-fetched.wb",
                    fetch: {
                        response: h,
                        status: "200",
                        refId: n.refId,
                        xhr: null
                    }
                }, this)
            }
        }
    }), n.on(h, function(b) {
        var c, d = b.postpone,
            e = d.dsname,
            f = d.callerId,
            g = d.refId,
            h = d.selector;
        if (m[e] || (m[e] = []), m[e].push({
                callerId: f,
                refId: g,
                selector: h
            }), k[e] && !l[e].wait) {
            if (c = k[e], h.length) try {
                c = jsonpointer.get(c, h)
            } catch (a) {
                throw e + " - JSON selector not found: " + h
            }
            a("#" + f).trigger({
                type: "json-fetched.wb",
                fetch: {
                    response: c,
                    status: "200",
                    refId: g,
                    xhr: null
                }
            }, this)
        }
    }), n.on("op.action.wb-fieldflow", ".wb-fieldflow", function(b, c) {
        c.op && (c.preventSubmit = !0, d(a(c.provEvt), "wb-fieldflow-submit", c))
    }), n.on("op.submit.wb-fieldflow", ".wb-fieldflow", function(b, c) {
        var d, e = c.op,
            f = c.source;
        if (!e) return !0;
        a.isArray(e) ? d = e : (d = [], d.push(e)), a(f).trigger({
            type: "patches.wb-jsonmanager",
            patches: d
        })
    }), n.on("timerpoke.wb " + g, f, q), c.add(f)
}(jQuery, window, wb),
function(a, b) {
    "use strict";

    function c(a) {
        if ("true" !== a.getAttribute("aria-expanded")) {
            var b = a.parentElement.parentElement,
                c = b.querySelector("[aria-haspopup][aria-expanded=true]:not([data-keep-expanded=md-min])");
            c && !l && d(c, !0), a.setAttribute("aria-expanded", "true"), k = a, setTimeout(function() {
                k = !1
            }, s)
        }
    }

    function d(a, b) {
        if (a.hasAttribute("aria-haspopup") || (a = a.previousElementSibling), !b) {
            var c = a.nextElementSibling.querySelector("[role=menuitem]:focus"),
                d = a.parentElement.parentElement.querySelector("[role=menuitem]:focus");
            if (c || d === a) return
        }
        a.setAttribute("aria-expanded", "false")
    }

    function e(a) {
        "md-min" !== a.dataset.keepExpanded && (clearTimeout(i), i = setTimeout(function() {
            c(a)
        }, s))
    }

    function f(a) {
        "md-min" !== a.dataset.keepExpanded && (clearTimeout(j), j = setTimeout(function() {
            d(a)
        }, s))
    }

    function g(a, b) {
        var c, d = document.querySelectorAll("[role=menu] [role=menu] [role=menuitem][aria-haspopup=true]"),
            e = d.length,
            f = b ? "true" : "false",
            g = a ? "vertical" : "horizontal",
            h = f;
        for (c = 0; c < e; c++) h = d[c].nextElementSibling.querySelector("[role=menuitem]:focus") ? "true" : f, d[c].setAttribute("aria-expanded", h), d[c].parentElement.previousElementSibling.setAttribute("aria-orientation", g)
    }

    function h(a) {
        return 9 === a ? "tab" : 13 === a || 32 === a ? "enter" : 27 === a ? "esc" : 39 === a ? "right" : 37 === a ? "left" : 40 === a ? "down" : 38 === a && "up"
    }
    var i, j, k, l, m, n = "gcweb-v2",
        o = ".gcweb-v2",
        p = "wb-init" + o,
        q = b.doc,
        r = o + " [data-ajax-replace]," + o + " [data-ajax-append]," + o + " [data-ajax-prepend]," + o + " [data-wb-ajax]",
        s = 350,
        t = function(a) {
            var c = b.init(a, n, o);
            c && (c.querySelector(r) || u(c.firstChild))
        },
        u = function(c) {
            var d = a(c).parentsUntil(o).parents(),
                e = document.querySelector("html").className;
            l = -1 !== e.indexOf("smallview"), m = -1 !== e.indexOf("mediumview"), (l || m) && g(!1, m), b.ready(d, n)
        };
    q.on("mouseenter", ".gcweb-v2 [aria-haspopup]", function(a) {
        l || (clearTimeout(j), e(a.currentTarget))
    }), q.on("focusin", ".gcweb-v2 [aria-haspopup]", function(a) {
        l || c(a.currentTarget)
    }), q.on("mouseenter focusin", ".gcweb-v2 [aria-haspopup] + [role=menu]", function(a) {
        "md-min" !== a.currentTarget.previousElementSibling.dataset.keepExpanded && (l || clearTimeout(j))
    }), q.on("mouseleave", ".gcweb-v2 [aria-haspopup]", function(a) {
        l || (clearTimeout(i), f(a.currentTarget))
    }), q.on("focusout", ".gcweb-v2 [aria-haspopup]", function(a) {
        l || f(a.currentTarget)
    }), q.on("mouseleave focusout", ".gcweb-v2 [aria-haspopup] + [role=menu]", function(a) {
        "md-min" !== a.currentTarget.previousElementSibling.dataset.keepExpanded && (l || f(a.currentTarget))
    }), q.on("click", ".gcweb-v2 [aria-haspopup]", function(a) {
        var b = a.currentTarget;
        (l || "BUTTON" === b.nodeName) && ("true" === b.getAttribute("aria-expanded") ? k !== b && d(b, !0) : c(b)), a.stopImmediatePropagation(), a.preventDefault()
    }), q.on(b.resizeEvents, function(a) {
        switch (a.type) {
            case "xxsmallview":
            case "xsmallview":
            case "smallview":
                l = !0, g(!1, !1);
                break;
            case "mediumview":
                l = !1, g(!1, !0);
                break;
            case "largeview":
            case "xlargeview":
            default:
                l = !1, g(!0, !0)
        }
    }), q.on("keydown", function(a) {
        27 === a.keyCode && d(document.querySelector(".gcweb-v2 button"))
    }), q.on("keydown", ".gcweb-v2 button, .gcweb-v2 [role=menuitem]", function(a) {
        var b, d = a.currentTarget,
            e = h(a.charCode || a.keyCode),
            f = document.querySelector("[role=menuitem]:focus") || d,
            g = f.parentElement,
            i = g.parentElement,
            j = "BUTTON" === f.nodeName;
        f.nextElementSibling && (b = f.nextElementSibling.querySelector("[role='menuitem']"));
        var k;
        g.nextElementSibling ? (k = g.nextElementSibling.querySelector("[role=menuitem]")) || (k = g.nextElementSibling.nextElementSibling.querySelector("[role=menuitem]")) : k = !l && f.dataset.keepExpanded && b ? b : !l && i.previousElementSibling.dataset.keepExpanded ? i.parentElement.parentElement.querySelector("[role=menuitem]") : i.querySelector("[role=menuitem]");
        var m, n = i.previousElementSibling;
        g.previousElementSibling ? (m = g.previousElementSibling.querySelector("[role=menuitem]")) || (m = g.previousElementSibling.previousElementSibling.querySelector("[role=menuitem]")) : m = !l && i.lastElementChild.querySelector("[role=menuitem]").dataset.keepExpanded ? i.lastElementChild.querySelector("[role=menuitem]").nextElementSibling.lastElementChild.querySelector("[role=menuitem]") : !l && i.previousElementSibling.dataset.keepExpanded && n ? n : j ? f.nextElementSibling.lastElementChild.querySelector("[role=menuitem]") : i.lastElementChild.querySelector("[role=menuitem]");
        for (var o, p, q = g; q.nextElementSibling;)
            if (q = q.nextElementSibling, "separator" === q.getAttribute("role")) {
                o = !(!q.hasAttribute("aria-orientation") || "vertical" !== q.getAttribute("aria-orientation")), p = q.nextElementSibling.querySelector("[role=menuitem]");
                break
            }
        var r, s;
        for (q = g; q.previousElementSibling;) {
            if (q = q.previousElementSibling, "separator" === q.getAttribute("role")) {
                if (s) break;
                r = !(!q.hasAttribute("aria-orientation") || "vertical" !== q.getAttribute("aria-orientation")), s = q.previousElementSibling
            }
            s && (s = q)
        }
        s && (s = s.querySelector("[role=menuitem]")), j || f.setAttribute("tabindex", "-1");
        var t;
        if ("down" === e && k) t = k;
        else if ("up" === e && m) t = m;
        else if (!j && "right" === e && b || "enter" === e && b) t = b;
        else if (o && "right" === e) t = p;
        else if (r && "left" === e) t = s;
        else if (!j && "left" === e || !j && "esc" === e) t = n;
        else if ("tab" === e) return;
        if (j || "left" !== e && "esc" !== e || l && "true" === t.getAttribute("aria-expanded") && t.setAttribute("aria-expanded", "false"), t) {
            if (l || j) {
                var u = t.parentElement.parentElement.previousElementSibling;
                "true" !== u.getAttribute("aria-expanded") && c(u)
            }
            t.setAttribute("tabindex", "0"), t.focus(), a.stopImmediatePropagation(), a.preventDefault()
        }
    }), q.on("ajax-fetched.wb ajax-failed.wb", r, function(a) {
        var b = a.target;
        a.currentTarget === b && u(b)
    }), q.on("timerpoke.wb " + p, o, t), b.add(o)
}(jQuery, wb),
function(a, b, c) {
    "use strict";
    var d, e = "wb-urlmapping",
        f = "[data-" + e + "]",
        g = "wb-init." + e,
        h = "domapping." + e,
        i = c.doc,
        j = {
            op: "move",
            path: "{base}",
            from: "{base}/{qval}"
        },
        k = function(b) {
            var g, j = c.init(b, e, f);
            j && (g = a(j), d || (d = j), c.ready(g, e), c.isReady ? g.trigger(h) : i.one("wb-ready.wb", function() {
                g.trigger(h)
            }))
        },
        l = function(b, c, e) {
            var f, g, h, i, k, l, o, p;
            for (e = a.isArray(e) ? a.extend([], e) : [e], g = e.length, f = 0; f !== g; f += 1)
                if (h = e[f], i = h.action) {
                    if (k = h.match, p = h.default, o = !1, k && !p) throw "'match' and 'default' property need to be set";
                    if (p && c.length && "string" == typeof k) try {
                        l = new RegExp(k), o = l.exec(c), o = o || p
                    } catch (a) {}
                    switch (!h.qval && o && (h.qval = o), i) {
                        case "patch":
                            var q = h.patches,
                                r = h.base || "/";
                            q || (q = [j], h.cumulative = !0), a.isArray(q) || (q = [q]), q = m(q, h.qval, r), h.patches = q;
                            break;
                        case "ajax":
                            h.trigger && b[0] !== d && (h.trigger = !1), h.url = n(h.url, h.qval);
                            break;
                        case "tblfilter":
                            h.value = n(h.value, h.qval)
                    }
                }
            b.trigger({
                type: "do.wb-actionmng",
                actions: e
            })
        },
        m = function(b, c, d) {
            var e, f, g, h = b.length,
                i = [];
            for (d || (d = "/"), e = 0; e !== h; e += 1) f = b[e], g = a.extend({}, f), f.path && (g.path = n(f.path, c, d)), f.from && (g.from = n(f.from, c, d)), f.value && (g.value = n(f.value, c, d)), i.push(g);
            return i
        },
        n = function(a, b, c) {
            return b ? c ? a.replace(/\{qval\}/, b).replace(/\{base\}/, c) : a.replace(/\{qval\}/, b) : a
        },
        o = function() {
            for (var a = {}, c = /\+/g, d = /([^&=]+)=?([^&]*)/g, e = function(a) {
                    return decodeURIComponent(a.replace(c, " "))
                }, f = b.location.search.substring(1), g = d.exec(f); g;) a[e(g[1])] = e(g[2]), g = d.exec(f);
            return a
        };
    i.on(h, f, function(d) {
        var f, g, h, i = a(d.target),
            j = o(),
            k = a.extend({}, b[e] || {}, c.getData(i, e));
        for (f in j)
            if (g = j[f], "object" == typeof(h = k[f + "=" + g] || k[f]) && (l(i, g, h), !k.multiplequery)) break
    }), i.on("timerpoke.wb " + g, f, k), c.add(f)
}(jQuery, window, wb),
function(a, b, c) {
    "use strict";
    var d = c.doc,
        e = "#wb-srch-q",
        f = a(e),
        g = a("#" + f.attr("list")),
        h = function(b) {
            b.length > 0 && a(this).trigger({
                type: "ajax-fetch.wb",
                fetch: {
                    url: c.pageUrlParts.protocol + "//clients1.google.com/complete/search?client=partner&sugexp=gsnos%2Cn%3D13&gs_rn=25&gs_ri=partner&partnerid=" + window.encodeURIComponent("008724028898028201144:knjjdikrhq0+lang:" + c.lang) + "&types=t&ds=cse&cp=3&gs_id=b&hl=" + c.lang + "&q=" + encodeURI(b),
                    dataType: "jsonp",
                    jsonp: "callback"
                }
            })
        };
    d.on("change keyup", e, function(a) {
        var b = a.target,
            c = a.target.value,
            d = a.which;
        switch (a.type) {
            case "change":
                h.call(b, c);
                break;
            case "keyup":
                a.ctrlKey || a.altKey || a.metaKey || (32 === d || d > 47 && d < 91 || d > 95 && d < 112 || d > 159 && d < 177 || d > 187 && d < 223) && h.call(b, c)
        }
    }), d.on("ajax-fetched.wb", e, function(a) {
        var b, d, e = a.fetch.response[1],
            h = e.length,
            i = "";
        for (g.empty(), b = 0; b < h; b += 1) d = e[b], i += '<option label="' + d[0] + '" value="' + d[0] + '"></option>';
        c.ielt10 && (i = "<select>" + i + "</select>"), g.append(i), f.trigger("wb-update.wb-datalist")
    }), window["wb-data-ajax"] = {
        corsFallback: function(a) {
            return a.url = a.url.replace(".html", ".htmlp"), a
        }
    }, a("[data-reveal]").change(function() {
        var b = a(this),
            c = b.attr("data-reveal");
        return b.is(":checked") ? a(c).removeClass("hide") : a(c).addClass("hide")
    })
}(jQuery, document, wb);
