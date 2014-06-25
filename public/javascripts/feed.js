(function(b) {
    var m, t, u, f, D, j, E, n, z, A, K, r, i, q = 0,
    e = {},
    o = [],
    p = 0,
    d = {},
    l = [],
    G = null,
    v = new Image,
    J = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
    W = /[^\.]\.(swf)\s*$/i,
    L = 1,
    y = 0,
    s = "",
    h = !1,
    B = b.extend(b("<div/>")[0], {
        prop: 0
    }),
    M = b.browser.msie && 7 > b.browser.version && !window.XMLHttpRequest,
    N = function() {
        t.hide(),
        v.onerror = v.onload = null,
        G && G.abort(),
        m.empty()
    },
    O = function() { ! 1 === e.onError(o, q, e) ? (t.hide(), h = !1) : (e.titleShow = !1, e.width = "auto", e.height = "auto", m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'), F())
    },
    I = function() {
        var c, g, k, C, P, w, a = o[q];
        if (N(), e = b.extend({},
        b.fn.fancybox.defaults, b(a).data("fancybox") === void 0 ? e: b(a).data("fancybox")), w = e.onStart(o, q, e), w === !1) h = !1;
        else if ("object" == typeof w && (e = b.extend(e, w)), k = e.title || (a.nodeName ? b(a).attr("title") : a.title) || "", a.nodeName && !e.orig && (e.orig = b(a).children("img:first").length ? b(a).children("img:first") : b(a)), "" === k && e.orig && e.titleFromAlt && (k = e.orig.attr("alt")), c = e.href || (a.nodeName ? b(a).attr("href") : a.href) || null, (/^(?:javascript)/i.test(c) || "#" == c) && (c = null), e.type ? (g = e.type, c || (c = e.content)) : e.content ? g = "html": c && (g = c.match(J) ? "image": c.match(W) ? "swf": b(a).hasClass("iframe") ? "iframe": 0 === c.indexOf("#") ? "inline": "ajax"), g) switch ("inline" == g && (a = c.substr(c.indexOf("#")), g = b(a).length > 0 ? "inline": "ajax"), e.type = g, e.href = c, e.title = k, e.autoDimensions && ("html" == e.type || "inline" == e.type || "ajax" == e.type ? (e.width = "auto", e.height = "auto") : e.autoDimensions = !1), e.modal && (e.overlayShow = !0, e.hideOnOverlayClick = !1, e.hideOnContentClick = !1, e.enableEscapeButton = !1, e.showCloseButton = !1), e.padding = parseInt(e.padding, 10), e.margin = parseInt(e.margin, 10), m.css("padding", e.padding + e.margin), b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",
        function() {
            b(this).replaceWith(j.children())
        }), g) {
        case "html":
            m.html(e.content),
            F();
            break;
        case "inline":
            if (b(a).parent().is("#fancybox-content") === !0) {
                h = !1;
                break
            }
            b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",
            function() {
                b(this).replaceWith(j.children())
            }).bind("fancybox-cancel",
            function() {
                b(this).replaceWith(m.children())
            }),
            b(a).appendTo(m),
            F();
            break;
        case "image":
            h = !1,
            b.fancybox.showActivity(),
            v = new Image,
            v.onerror = function() {
                O()
            },
            v.onload = function() {
                h = !0,
                v.onerror = v.onload = null,
                e.width = v.width,
                e.height = v.height,
                b("<img />").attr({
                    id: "fancybox-img",
                    src: v.src,
                    alt: e.title
                }).appendTo(m),
                Q()
            },
            v.src = c;
            break;
        case "swf":
            e.scrolling = "no",
            C = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + e.width + '" height="' + e.height + '"><param name="movie" value="' + c + '"></param>',
            P = "",
            b.each(e.swf,
            function(x, H) {
                C += '<param name="' + x + '" value="' + H + '"></param>',
                P += " " + x + '="' + H + '"'
            }),
            C += '<embed src="' + c + '" type="application/x-shockwave-flash" width="' + e.width + '" height="' + e.height + '"' + P + "></embed></object>",
            m.html(C),
            F();
            break;
        case "ajax":
            h = !1,
            b.fancybox.showActivity(),
            e.ajax.win = e.ajax.success,
            G = b.ajax(b.extend({},
            e.ajax, {
                url: c,
                data: e.ajax.data || {},
                error: function(x) {
                    x.status > 0 && O()
                },
                success: function(x, H, R) {
                    if (200 == ("object" == typeof R ? R: G).status) {
                        if ("function" == typeof e.ajax.win) {
                            if (w = e.ajax.win(c, x, H, R), w === !1) return t.hide(),
                            void 0; ("string" == typeof w || "object" == typeof w) && (x = w)
                        }
                        m.html(x),
                        F()
                    }
                }
            }));
            break;
        case "iframe":
            Q()
        } else O()
    },
    F = function() {
        var a = e.width,
        c = e.height;
        a = ("" + a).indexOf("%") > -1 ? parseInt((b(window).width() - 2 * e.margin) * parseFloat(a) / 100, 10) + "px": "auto" == a ? "auto": a + "px",
        c = ("" + c).indexOf("%") > -1 ? parseInt((b(window).height() - 2 * e.margin) * parseFloat(c) / 100, 10) + "px": "auto" == c ? "auto": c + "px",
        m.wrapInner('<div style="width:' + a + ";height:" + c + ";overflow: " + ("auto" == e.scrolling ? "auto": "yes" == e.scrolling ? "scroll": "hidden") + ';position:relative;"></div>'),
        e.width = m.width(),
        e.height = m.height(),
        Q()
    },
    Q = function() {
        var a, c;
        if (t.hide(), f.is(":visible") && !1 === d.onCleanup(l, p, d)) b.event.trigger("fancybox-cancel"),
        h = !1;
        else {
            if (h = !0, b(j.add(u)).unbind(), b(window).unbind("resize.fb scroll.fb"), b(document).unbind("keydown.fb"), f.is(":visible") && "outside" !== d.titlePosition && f.css("height", f.height()), l = o, p = q, d = e, d.overlayShow ? (u.css({
                "background-color": d.overlayColor,
                opacity: d.overlayOpacity,
                cursor: d.hideOnOverlayClick ? "pointer": "auto",
                height: b(document).height()
            }), u.is(":visible") || (M && b("select:not(#fancybox-tmp select)").filter(function() {
                return "hidden" !== this.style.visibility
            }).css({
                visibility: "hidden"
            }).one("fancybox-cleanup",
            function() {
                this.style.visibility = "inherit"
            }), u.show())) : u.hide(), i = X(), s = d.title || "", y = 0, n.empty().removeAttr("style").removeClass(), d.titleShow !== !1 && (a = b.isFunction(d.titleFormat) ? d.titleFormat(s, l, p, d) : s && s.length ? "float" == d.titlePosition ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + s + '</td><td id="fancybox-title-float-right"></td></tr></table>': '<div id="fancybox-title-' + d.titlePosition + '">' + s + "</div>": !1, s = a, s && "" !== s)) switch (n.addClass("fancybox-title-" + d.titlePosition).html(s).appendTo("body").show(), d.titlePosition) {
            case "inside":
                n.css({
                    width:
                    i.width - 2 * d.padding,
                    marginLeft: d.padding,
                    marginRight: d.padding
                }),
                y = n.outerHeight(!0),
                n.appendTo(D),
                i.height += y;
                break;
            case "over":
                n.css({
                    marginLeft:
                    d.padding,
                    width: i.width - 2 * d.padding,
                    bottom: d.padding
                }).appendTo(D);
                break;
            case "float":
                n.css("left", -1 * parseInt((n.width() - i.width - 40) / 2, 10)).appendTo(f);
                break;
            default:
                n.css({
                    width:
                    i.width - 2 * d.padding,
                    paddingLeft: d.padding,
                    paddingRight: d.padding
                }).appendTo(f)
            }
            n.hide(),
            f.is(":visible") ? (b(E.add(z).add(A)).hide(), a = f.position(), r = {
                top: a.top,
                left: a.left,
                width: f.width(),
                height: f.height()
            },
            c = r.width == i.width && r.height == i.height, j.fadeTo(d.changeFade, .3,
            function() {
                var g = function() {
                    j.html(m.contents()).fadeTo(d.changeFade, 1, S)
                };
                b.event.trigger("fancybox-change"),
                j.empty().removeAttr("filter").css({
                    "border-width": d.padding,
                    width: i.width - 2 * d.padding,
                    height: e.autoDimensions ? "auto": i.height - y - 2 * d.padding
                }),
                c ? g() : (B.prop = 0, b(B).animate({
                    prop: 1
                },
                {
                    duration: d.changeSpeed,
                    easing: d.easingChange,
                    step: T,
                    complete: g
                }))
            })) : (f.removeAttr("style"), j.css("border-width", d.padding), "elastic" == d.transitionIn ? (r = V(), j.html(m.contents()), f.show(), d.opacity && (i.opacity = 0), B.prop = 0, b(B).animate({
                prop: 1
            },
            {
                duration: d.speedIn,
                easing: d.easingIn,
                step: T,
                complete: S
            })) : ("inside" == d.titlePosition && y > 0 && n.show(), j.css({
                width: i.width - 2 * d.padding,
                height: e.autoDimensions ? "auto": i.height - y - 2 * d.padding
            }).html(m.contents()), f.css(i).fadeIn("none" == d.transitionIn ? 0 : d.speedIn, S)))
        }
    },
    Y = function() { (d.enableEscapeButton || d.enableKeyboardNav) && b(document).bind("keydown.fb",
        function(a) {
            27 == a.keyCode && d.enableEscapeButton ? (a.preventDefault(), b.fancybox.close()) : 37 != a.keyCode && 39 != a.keyCode || !d.enableKeyboardNav || "INPUT" === a.target.tagName || "TEXTAREA" === a.target.tagName || "SELECT" === a.target.tagName || (a.preventDefault(), b.fancybox[37 == a.keyCode ? "prev": "next"]())
        }),
        d.showNavArrows ? ((d.cyclic && l.length > 1 || 0 !== p) && z.show(), (d.cyclic && l.length > 1 || p != l.length - 1) && A.show()) : (z.hide(), A.hide())
    },
    S = function() {
        b.support.opacity || (j.get(0).style.removeAttribute("filter"), f.get(0).style.removeAttribute("filter")),
        e.autoDimensions && j.css("height", "auto"),
        f.css("height", "auto"),
        s && s.length && n.show(),
        d.showCloseButton && E.show(),
        Y(),
        d.hideOnContentClick && j.bind("click", b.fancybox.close),
        d.hideOnOverlayClick && u.bind("click", b.fancybox.close),
        b(window).bind("resize.fb", b.fancybox.resize),
        d.centerOnScroll && b(window).bind("scroll.fb", b.fancybox.center),
        "iframe" == d.type && b('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (b.browser.msie ? 'allowtransparency="true""': "") + ' scrolling="' + e.scrolling + '" src="' + d.href + '"></iframe>').appendTo(j),
        f.show(),
        h = !1,
        b.fancybox.center(),
        d.onComplete(l, p, d);
        var a, c;
        l.length - 1 > p && (a = l[p + 1].href, a !== void 0 && a.match(J) && (c = new Image, c.src = a)),
        p > 0 && (a = l[p - 1].href, a !== void 0 && a.match(J) && (c = new Image, c.src = a))
    },
    T = function(a) {
        var c = {
            width: parseInt(r.width + (i.width - r.width) * a, 10),
            height: parseInt(r.height + (i.height - r.height) * a, 10),
            top: parseInt(r.top + (i.top - r.top) * a, 10),
            left: parseInt(r.left + (i.left - r.left) * a, 10)
        };
        i.opacity !== void 0 && (c.opacity = .5 > a ? .5 : a),
        f.css(c),
        j.css({
            width: c.width - 2 * d.padding,
            height: c.height - y * a - 2 * d.padding
        })
    },
    U = function() {
        return [b(window).width() - 2 * d.margin, b(window).height() - 2 * d.margin, b(document).scrollLeft() + d.margin, b(document).scrollTop() + d.margin]
    },
    X = function() {
        var a = U(),
        c = {},
        g = d.autoScale,
        k = 2 * d.padding;
        return c.width = ("" + d.width).indexOf("%") > -1 ? parseInt(a[0] * parseFloat(d.width) / 100, 10) : d.width + k,
        c.height = ("" + d.height).indexOf("%") > -1 ? parseInt(a[1] * parseFloat(d.height) / 100, 10) : d.height + k,
        g && (c.width > a[0] || c.height > a[1]) && ("image" == e.type || "swf" == e.type ? (g = d.width / d.height, c.width > a[0] && (c.width = a[0], c.height = parseInt((c.width - k) / g + k, 10)), c.height > a[1] && (c.height = a[1], c.width = parseInt((c.height - k) * g + k, 10))) : (c.width = Math.min(c.width, a[0]), c.height = Math.min(c.height, a[1]))),
        c.top = parseInt(Math.max(a[3] - 20, a[3] + .5 * (a[1] - c.height - 40)), 10),
        c.left = parseInt(Math.max(a[2] - 20, a[2] + .5 * (a[0] - c.width - 40)), 10),
        c
    },
    V = function() {
        var a = e.orig ? b(e.orig) : !1,
        c = {};
        return a && a.length ? (c = a.offset(), c.top += parseInt(a.css("paddingTop"), 10) || 0, c.left += parseInt(a.css("paddingLeft"), 10) || 0, c.top += parseInt(a.css("border-top-width"), 10) || 0, c.left += parseInt(a.css("border-left-width"), 10) || 0, c.width = a.width(), c.height = a.height(), c = {
            width: c.width + 2 * d.padding,
            height: c.height + 2 * d.padding,
            top: c.top - d.padding - 20,
            left: c.left - d.padding - 20
        }) : (a = U(), c = {
            width: 2 * d.padding,
            height: 2 * d.padding,
            top: parseInt(a[3] + .5 * a[1], 10),
            left: parseInt(a[2] + .5 * a[0], 10)
        }),
        c
    },
    Z = function() {
        t.is(":visible") ? (b("div", t).css("top", -40 * L + "px"), L = (L + 1) % 12) : clearInterval(K)
    };
    b.fn.fancybox = function(a) {
        return b(this).length ? (b(this).data("fancybox", b.extend({},
        a, b.metadata ? b(this).metadata() : {})).unbind("click.fb").bind("click.fb",
        function(c) {
            c.preventDefault(),
            h || (h = !0, b(this).blur(), o = [], q = 0, c = b(this).attr("rel") || "", c && "" != c && "nofollow" !== c ? (o = b("a[rel=" + c + "], area[rel=" + c + "]"), q = o.index(this)) : o.push(this), I())
        }), this) : this
    },
    b.fancybox = function(a, c) {
        var g;
        if (!h) {
            if (h = !0, g = c !== void 0 ? c: {},
            o = [], q = parseInt(g.index, 10) || 0, b.isArray(a)) {
                for (var k = 0,
                C = a.length; C > k; k++)"object" == typeof a[k] ? b(a[k]).data("fancybox", b.extend({},
                g, a[k])) : a[k] = b({}).data("fancybox", b.extend({
                    content: a[k]
                },
                g));
                o = jQuery.merge(o, a)
            } else "object" == typeof a ? b(a).data("fancybox", b.extend({},
            g, a)) : a = b({}).data("fancybox", b.extend({
                content: a
            },
            g)),
            o.push(a); (q > o.length || 0 > q) && (q = 0),
            I()
        }
    },
    b.fancybox.showActivity = function() {
        clearInterval(K),
        t.show(),
        K = setInterval(Z, 66)
    },
    b.fancybox.hideActivity = function() {
        t.hide()
    },
    b.fancybox.next = function() {
        return b.fancybox.pos(p + 1)
    },
    b.fancybox.prev = function() {
        return b.fancybox.pos(p - 1)
    },
    b.fancybox.pos = function(a) {
        h || (a = parseInt(a), o = l, a > -1 && l.length > a ? (q = a, I()) : d.cyclic && l.length > 1 && (q = a >= l.length ? 0 : l.length - 1, I()))
    },
    b.fancybox.cancel = function() {
        h || (h = !0, b.event.trigger("fancybox-cancel"), N(), e.onCancel(o, q, e), h = !1)
    },
    b.fancybox.close = function() {
        function a() {
            u.fadeOut("fast"),
            n.empty().hide(),
            f.hide(),
            b.event.trigger("fancybox-cleanup"),
            j.empty(),
            d.onClosed(l, p, d),
            l = e = [],
            p = q = 0,
            d = e = {},
            h = !1
        }
        if (!h && !f.is(":hidden")) if (h = !0, d && !1 === d.onCleanup(l, p, d)) h = !1;
        else if (N(), b(E.add(z).add(A)).hide(), b(j.add(u)).unbind(), b(window).unbind("resize.fb scroll.fb"), b(document).unbind("keydown.fb"), j.find("iframe").attr("src", M && /^https/i.test(window.location.href || "") ? "javascript:void(false)": "about:blank"), "inside" !== d.titlePosition && n.empty(), f.stop(), "elastic" == d.transitionOut) {
            r = V();
            var c = f.position();
            i = {
                top: c.top,
                left: c.left,
                width: f.width(),
                height: f.height()
            },
            d.opacity && (i.opacity = 1),
            n.empty().hide(),
            B.prop = 1,
            b(B).animate({
                prop: 0
            },
            {
                duration: d.speedOut,
                easing: d.easingOut,
                step: T,
                complete: a
            })
        } else f.fadeOut("none" == d.transitionOut ? 0 : d.speedOut, a)
    },
    b.fancybox.resize = function() {
        u.is(":visible") && u.css("height", b(document).height()),
        b.fancybox.center(!0)
    },
    b.fancybox.center = function(a) {
        var c, g;
        h || (g = a === !0 ? 1 : 0, c = U(), !g && (f.width() > c[0] || f.height() > c[1]) || f.stop().animate({
            top: parseInt(Math.max(c[3] - 20, c[3] + .5 * (c[1] - j.height() - 40) - d.padding)),
            left: parseInt(Math.max(c[2] - 20, c[2] + .5 * (c[0] - j.width() - 40) - d.padding))
        },
        "number" == typeof a ? a: 200))
    },
    b.fancybox.init = function() {
        b("#fancybox-wrap").length || (b("body").append(m = b('<div id="fancybox-tmp"></div>'), t = b('<div id="fancybox-loading"><div></div></div>'), u = b('<div id="fancybox-overlay"></div>'), f = b('<div id="fancybox-wrap"></div>')), D = b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f), D.append(j = b('<div id="fancybox-content"></div>'), E = b('<a id="fancybox-close"></a>'), n = b('<div id="fancybox-title"></div>'), z = b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), A = b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')), E.click(b.fancybox.close), t.click(b.fancybox.cancel), z.click(function(a) {
            a.preventDefault(),
            b.fancybox.prev()
        }), A.click(function(a) {
            a.preventDefault(),
            b.fancybox.next()
        }), b.fn.mousewheel && f.bind("mousewheel.fb",
        function(a, c) {
            h ? a.preventDefault() : (0 == b(a.target).get(0).clientHeight || b(a.target).get(0).scrollHeight === b(a.target).get(0).clientHeight) && (a.preventDefault(), b.fancybox[c > 0 ? "prev": "next"]())
        }), b.support.opacity || f.addClass("fancybox-ie"), M && (t.addClass("fancybox-ie6"), f.addClass("fancybox-ie6"), b('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)": "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D)))
    },
    b.fn.fancybox.defaults = {
        padding: 10,
        margin: 40,
        opacity: !1,
        modal: !1,
        cyclic: !1,
        scrolling: "auto",
        width: 560,
        height: 340,
        autoScale: !0,
        autoDimensions: !0,
        centerOnScroll: !1,
        ajax: {},
        swf: {
            wmode: "transparent"
        },
        hideOnOverlayClick: !0,
        hideOnContentClick: !1,
        overlayShow: !0,
        overlayOpacity: .6,
        overlayColor: "#000",
        titleShow: !0,
        titlePosition: "float",
        titleFormat: null,
        titleFromAlt: !1,
        transitionIn: "fade",
        transitionOut: "fade",
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        changeFade: "fast",
        easingIn: "swing",
        easingOut: "swing",
        showCloseButton: !0,
        showNavArrows: !0,
        enableEscapeButton: !0,
        enableKeyboardNav: !0,
        onStart: function() {},
        onCancel: function() {},
        onComplete: function() {},
        onCleanup: function() {},
        onClosed: function() {},
        onError: function() {}
    },
    b(document).ready(function() {
        b.fancybox.init()
    })
})(jQuery),
function($) {
    var defaults = {
        className: "autosizejs",
        append: "",
        callback: !1
    },
    hidden = "hidden",
    borderBox = "border-box",
    lineHeight = "lineHeight",
    copy = '<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',
    copyStyle = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
    oninput = "oninput",
    onpropertychange = "onpropertychange",
    test = $(copy)[0];
    test.setAttribute(oninput, "return"),
    $.isFunction(test[oninput]) || onpropertychange in test ? ($(test).css(lineHeight, "99px"), "99px" === $(test).css(lineHeight) && copyStyle.push(lineHeight), $.fn.autosize = function(options) {
        return options = $.extend({},
        defaults, options || {}),
        this.each(function() {
            function adjust() {
                var height, overflow, original;
                active || (active = !0, mirror.value = ta.value + options.append, mirror.style.overflowY = ta.style.overflowY, original = parseInt(ta.style.height, 10), mirror.style.width = $ta.css("width"), mirror.scrollTop = 0, mirror.scrollTop = 9e4, height = mirror.scrollTop, overflow = hidden, height > maxHeight ? (height = maxHeight, overflow = "scroll") : minHeight > height && (height = minHeight), height += boxOffset, ta.style.overflowY = overflow, original !== height && (ta.style.height = height + "px", callback && options.callback.call(ta)), setTimeout(function() {
                    active = !1
                },
                1))
            }
            var mirror, active, resize, ta = this,
            $ta = $(ta),
            minHeight = $ta.height(),
            maxHeight = parseInt($ta.css("maxHeight"), 10),
            i = copyStyle.length,
            boxOffset = 0,
            value = ta.value,
            callback = $.isFunction(options.callback);
            if (($ta.css("box-sizing") === borderBox || $ta.css("-moz-box-sizing") === borderBox || $ta.css("-webkit-box-sizing") === borderBox) && (boxOffset = $ta.outerHeight() - $ta.height()), !$ta.data("mirror") && !$ta.data("ismirror")) {
                for (mirror = $(copy).data("ismirror", !0).addClass(options.className)[0], resize = "none" === $ta.css("resize") ? "none": "horizontal", $ta.data("mirror", $(mirror)).css({
                    overflow: hidden,
                    overflowY: hidden,
                    wordWrap: "break-word",
                    resize: resize
                }), maxHeight = maxHeight && maxHeight > 0 ? maxHeight: 9e4; i--;) mirror.style[copyStyle[i]] = $ta.css(copyStyle[i]);
                $("body").append(mirror),
                onpropertychange in ta ? oninput in ta ? ta[oninput] = ta.onkeyup = adjust: ta[onpropertychange] = adjust: (ta[oninput] = adjust, ta.value = "", ta.value = value),
                $(window).resize(adjust),
                $ta.bind("autosize", adjust),
                adjust()
            }
        })
    }) : $.fn.autosize = function() {
        return this
    }
} (jQuery),
function($) {
    function log() {
        if ($.fn.ajaxSubmit.debug) {
            var msg = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(msg) : window.opera && window.opera.postError && window.opera.postError(msg)
        }
    }
    $.fn.ajaxSubmit = function(options) {
        function fileUpload(a) {
            function getDoc(frame) {
                var doc = frame.contentWindow ? frame.contentWindow.document: frame.contentDocument ? frame.contentDocument: frame.document;
                return doc
            }
            function doSubmit() {
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log("state = " + state),
                        "uninitialized" == state.toLowerCase() && setTimeout(checkState, 50)
                    } catch(e) {
                        log("Server abort: ", e, " (", e.name, ")"),
                        cb(SERVER_ABORT),
                        timeoutHandle && clearTimeout(timeoutHandle),
                        timeoutHandle = void 0
                    }
                }
                var t = $form.attr("target"),
                a = $form.attr("action");
                form.setAttribute("target", id),
                method || form.setAttribute("method", "POST"),
                a != s.url && form.setAttribute("action", s.url),
                s.skipEncodingOverride || method && !/post/i.test(method) || $form.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }),
                s.timeout && (timeoutHandle = setTimeout(function() {
                    timedOut = !0,
                    cb(CLIENT_TIMEOUT_ABORT)
                },
                s.timeout));
                var extraInputs = [];
                try {
                    if (s.extraData) for (var n in s.extraData) extraInputs.push($('<input type="hidden" name="' + n + '" />').attr("value", s.extraData[n]).appendTo(form)[0]);
                    s.iframeTarget || ($io.appendTo("body"), io.attachEvent ? io.attachEvent("onload", cb) : io.addEventListener("load", cb, !1)),
                    setTimeout(checkState, 15),
                    form.submit()
                } finally {
                    form.setAttribute("action", a),
                    t ? form.setAttribute("target", t) : $form.removeAttr("target"),
                    $(extraInputs).remove()
                }
            }
            function cb(e) {
                if (!xhr.aborted && !callbackProcessed) {
                    try {
                        doc = getDoc(io)
                    } catch(ex) {
                        log("cannot access response document: ", ex),
                        e = SERVER_ABORT
                    }
                    if (e === CLIENT_TIMEOUT_ABORT && xhr) return xhr.abort("timeout"),
                    void 0;
                    if (e == SERVER_ABORT && xhr) return xhr.abort("server abort"),
                    void 0;
                    if (doc && doc.location.href != s.iframeSrc || timedOut) {
                        io.detachEvent ? io.detachEvent("onload", cb) : io.removeEventListener("load", cb, !1);
                        var errMsg, status = "success";
                        try {
                            if (timedOut) throw "timeout";
                            var isXml = "xml" == s.dataType || doc.XMLDocument || $.isXMLDoc(doc);
                            if (log("isXml=" + isXml), !isXml && window.opera && (null == doc.body || "" == doc.body.innerHTML) && --domCheckCount) return log("requeing onLoad callback, DOM not available"),
                            setTimeout(cb, 250),
                            void 0;
                            var docRoot = doc.body ? doc.body: doc.documentElement;
                            xhr.responseText = docRoot ? docRoot.innerHTML: null,
                            xhr.responseXML = doc.XMLDocument ? doc.XMLDocument: doc,
                            isXml && (s.dataType = "xml"),
                            xhr.getResponseHeader = function(header) {
                                var headers = {
                                    "content-type": s.dataType
                                };
                                return headers[header]
                            },
                            docRoot && (xhr.status = Number(docRoot.getAttribute("status")) || xhr.status, xhr.statusText = docRoot.getAttribute("statusText") || xhr.statusText);
                            var dt = (s.dataType || "").toLowerCase(),
                            scr = /(json|script|text)/.test(dt);
                            if (scr || s.textarea) {
                                var ta = doc.getElementsByTagName("textarea")[0];
                                if (ta) xhr.responseText = ta.value,
                                xhr.status = Number(ta.getAttribute("status")) || xhr.status,
                                xhr.statusText = ta.getAttribute("statusText") || xhr.statusText;
                                else if (scr) {
                                    var pre = doc.getElementsByTagName("pre")[0],
                                    b = doc.getElementsByTagName("body")[0];
                                    pre ? xhr.responseText = pre.textContent ? pre.textContent: pre.innerText: b && (xhr.responseText = b.textContent ? b.textContent: b.innerText)
                                }
                            } else "xml" != dt || xhr.responseXML || null == xhr.responseText || (xhr.responseXML = toXml(xhr.responseText));
                            try {
                                data = httpData(xhr, dt, s)
                            } catch(e) {
                                status = "parsererror",
                                xhr.error = errMsg = e || status
                            }
                        } catch(e) {
                            log("error caught: ", e),
                            status = "error",
                            xhr.error = errMsg = e || status
                        }
                        xhr.aborted && (log("upload aborted"), status = null),
                        xhr.status && (status = xhr.status >= 200 && 300 > xhr.status || 304 === xhr.status ? "success": "error"),
                        "success" === status ? (s.success && s.success.call(s.context, data, "success", xhr), g && $.event.trigger("ajaxSuccess", [xhr, s])) : status && (void 0 == errMsg && (errMsg = xhr.statusText), s.error && s.error.call(s.context, xhr, status, errMsg), g && $.event.trigger("ajaxError", [xhr, s, errMsg])),
                        g && $.event.trigger("ajaxComplete", [xhr, s]),
                        g && !--$.active && $.event.trigger("ajaxStop"),
                        s.complete && s.complete.call(s.context, xhr, status),
                        callbackProcessed = !0,
                        s.timeout && clearTimeout(timeoutHandle),
                        setTimeout(function() {
                            s.iframeTarget || $io.remove(),
                            xhr.responseXML = null
                        },
                        100)
                    }
                }
            }
            var el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle, form = $form[0],
            useProp = !!$.fn.prop;
            if (a) if (useProp) for (i = 0; a.length > i; i++) el = $(form[a[i].name]),
            el.prop("disabled", !1);
            else for (i = 0; a.length > i; i++) el = $(form[a[i].name]),
            el.removeAttr("disabled");
            if ($(":input[name=submit],:input[id=submit]", form).length) return alert('Error: Form elements must not have name or id of "submit".'),
            void 0;
            if (s = $.extend(!0, {},
            $.ajaxSettings, options), s.context = s.context || s, id = "jqFormIO" + (new Date).getTime(), s.iframeTarget ? ($io = $(s.iframeTarget), n = $io.attr("name"), null == n ? $io.attr("name", id) : id = n) : ($io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />'), $io.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })), io = $io[0], xhr = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(status) {
                    var e = "timeout" === status ? "timeout": "aborted";
                    log("aborting upload... " + e),
                    this.aborted = 1,
                    $io.attr("src", s.iframeSrc),
                    xhr.error = e,
                    s.error && s.error.call(s.context, xhr, e, status),
                    g && $.event.trigger("ajaxError", [xhr, s, e]),
                    s.complete && s.complete.call(s.context, xhr, e)
                }
            },
            g = s.global, g && !$.active++&&$.event.trigger("ajaxStart"), g && $.event.trigger("ajaxSend", [xhr, s]), s.beforeSend && s.beforeSend.call(s.context, xhr, s) === !1) return s.global && $.active--,
            void 0;
            if (!xhr.aborted) {
                sub = form.clk,
                sub && (n = sub.name, n && !sub.disabled && (s.extraData = s.extraData || {},
                s.extraData[n] = sub.value, "image" == sub.type && (s.extraData[n + ".x"] = form.clk_x, s.extraData[n + ".y"] = form.clk_y)));
                var CLIENT_TIMEOUT_ABORT = 1,
                SERVER_ABORT = 2;
                s.forceSync ? doSubmit() : setTimeout(doSubmit, 10);
                var data, doc, callbackProcessed, domCheckCount = 50,
                toXml = $.parseXML ||
                function(s, doc) {
                    return window.ActiveXObject ? (doc = new ActiveXObject("Microsoft.XMLDOM"), doc.async = "false", doc.loadXML(s)) : doc = (new DOMParser).parseFromString(s, "text/xml"),
                    doc && doc.documentElement && "parsererror" != doc.documentElement.nodeName ? doc: null
                },
                parseJSON = $.parseJSON ||
                function(s) {
                    return window.eval("(" + s + ")")
                },
                httpData = function(xhr, type, s) {
                    var ct = xhr.getResponseHeader("content-type") || "",
                    xml = "xml" === type || !type && ct.indexOf("xml") >= 0,
                    data = xml ? xhr.responseXML: xhr.responseText;
                    return xml && "parsererror" === data.documentElement.nodeName && $.error && $.error("parsererror"),
                    s && s.dataFilter && (data = s.dataFilter(data, type)),
                    "string" == typeof data && ("json" === type || !type && ct.indexOf("json") >= 0 ? data = parseJSON(data) : ("script" === type || !type && ct.indexOf("javascript") >= 0) && $.globalEval(data)),
                    data
                }
            }
        }
        if (!this.length) return log("ajaxSubmit: skipping submit process - no element selected"),
        this;
        var method, action, url, $form = this;
        "function" == typeof options && (options = {
            success: options
        }),
        method = this.attr("method"),
        action = this.attr("action"),
        url = "string" == typeof action ? $.trim(action) : "",
        url = url || window.location.href || "",
        url && (url = (url.match(/^([^#]+)/) || [])[1]),
        options = $.extend(!0, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false": "about:blank"
        },
        options);
        var veto = {};
        if (this.trigger("form-pre-serialize", [this, options, veto]), veto.veto) return log("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),
        this;
        if (options.beforeSerialize && options.beforeSerialize(this, options) === !1) return log("ajaxSubmit: submit aborted via beforeSerialize callback"),
        this;
        var traditional = options.traditional;
        void 0 === traditional && (traditional = $.ajaxSettings.traditional);
        var qx, a = this.formToArray(options.semantic);
        if (options.data && (options.extraData = options.data, qx = $.param(options.data, traditional)), options.beforeSubmit && options.beforeSubmit(a, this, options) === !1) return log("ajaxSubmit: submit aborted via beforeSubmit callback"),
        this;
        if (this.trigger("form-submit-validate", [a, this, options, veto]), veto.veto) return log("ajaxSubmit: submit vetoed via form-submit-validate trigger"),
        this;
        var q = $.param(a, traditional);
        qx && (q = q ? q + "&" + qx: qx),
        "GET" == options.type.toUpperCase() ? (options.url += (options.url.indexOf("?") >= 0 ? "&": "?") + q, options.data = null) : options.data = q;
        var callbacks = [];
        if (options.resetForm && callbacks.push(function() {
            $form.resetForm()
        }), options.clearForm && callbacks.push(function() {
            $form.clearForm()
        }), !options.dataType && options.target) {
            var oldSuccess = options.success ||
            function() {};
            callbacks.push(function(data) {
                var fn = options.replaceTarget ? "replaceWith": "html";
                $(options.target)[fn](data).each(oldSuccess, arguments)
            })
        } else options.success && callbacks.push(options.success);
        options.success = function(data, status, xhr) {
            for (var context = options.context || options,
            i = 0,
            max = callbacks.length; max > i; i++) callbacks[i].apply(context, [data, status, xhr || $form, $form])
        };
        var fileInputs = $("input:file", this).length > 0,
        mp = "multipart/form-data",
        multipart = $form.attr("enctype") == mp || $form.attr("encoding") == mp;
        if (options.iframe !== !1 && (fileInputs || options.iframe || multipart)) options.closeKeepAlive ? $.get(options.closeKeepAlive,
        function() {
            fileUpload(a)
        }) : fileUpload(a);
        else {
            if ($.browser.msie && "get" == method && options.type === void 0) {
                var ieMeth = $form[0].getAttribute("method");
                "string" == typeof ieMeth && (options.type = ieMeth)
            }
            $.ajax(options)
        }
        return this.trigger("form-submit-notify", [this, options]),
        this
    },
    $.fn.ajaxForm = function(options) {
        if (0 === this.length) {
            var o = {
                s: this.selector,
                c: this.context
            };
            return ! $.isReady && o.s ? (log("DOM not ready, queuing ajaxForm"), $(function() {
                $(o.s, o.c).ajaxForm(options)
            }), this) : (log("terminating; zero elements found by selector" + ($.isReady ? "": " (DOM not ready)")), this)
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin",
        function(e) {
            e.isDefaultPrevented() || (e.preventDefault(), $(this).ajaxSubmit(options))
        }).bind("click.form-plugin",
        function(e) {
            var target = e.target,
            $el = $(target);
            if (!$el.is(":submit,input:image")) {
                var t = $el.closest(":submit");
                if (0 == t.length) return;
                target = t[0]
            }
            var form = this;
            if (form.clk = target, "image" == target.type) if (void 0 != e.offsetX) form.clk_x = e.offsetX,
            form.clk_y = e.offsetY;
            else if ("function" == typeof $.fn.offset) {
                var offset = $el.offset();
                form.clk_x = e.pageX - offset.left,
                form.clk_y = e.pageY - offset.top
            } else form.clk_x = e.pageX - target.offsetLeft,
            form.clk_y = e.pageY - target.offsetTop;
            setTimeout(function() {
                form.clk = form.clk_x = form.clk_y = null
            },
            100)
        })
    },
    $.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    },
    $.fn.formToArray = function(semantic) {
        var a = [];
        if (0 === this.length) return a;
        var form = this[0],
        els = semantic ? form.getElementsByTagName("*") : form.elements;
        if (!els) return a;
        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; max > i; i++) if (el = els[i], n = el.name) if (semantic && form.clk && "image" == el.type) el.disabled || form.clk != el || (a.push({
            name: n,
            value: $(el).val()
        }), a.push({
            name: n + ".x",
            value: form.clk_x
        },
        {
            name: n + ".y",
            value: form.clk_y
        }));
        else if (v = $.fieldValue(el, !0), v && v.constructor == Array) for (j = 0, jmax = v.length; jmax > j; j++) a.push({
            name: n,
            value: v[j]
        });
        else null !== v && v !== void 0 && a.push({
            name: n,
            value: v
        });
        if (!semantic && form.clk) {
            var $input = $(form.clk),
            input = $input[0];
            n = input.name,
            n && !input.disabled && "image" == input.type && (a.push({
                name: n,
                value: $input.val()
            }), a.push({
                name: n + ".x",
                value: form.clk_x
            },
            {
                name: n + ".y",
                value: form.clk_y
            }))
        }
        return a
    },
    $.fn.formSerialize = function(semantic) {
        return $.param(this.formToArray(semantic))
    },
    $.fn.fieldSerialize = function(successful) {
        var a = [];
        return this.each(function() {
            var n = this.name;
            if (n) {
                var v = $.fieldValue(this, successful);
                if (v && v.constructor == Array) for (var i = 0,
                max = v.length; max > i; i++) a.push({
                    name: n,
                    value: v[i]
                });
                else null !== v && v !== void 0 && a.push({
                    name: this.name,
                    value: v
                })
            }
        }),
        $.param(a)
    },
    $.fn.fieldValue = function(successful) {
        for (var val = [], i = 0, max = this.length; max > i; i++) {
            var el = this[i],
            v = $.fieldValue(el, successful);
            null === v || void 0 === v || v.constructor == Array && !v.length || (v.constructor == Array ? $.merge(val, v) : val.push(v))
        }
        return val
    },
    $.fieldValue = function(el, successful) {
        var n = el.name,
        t = el.type,
        tag = el.tagName.toLowerCase();
        if (void 0 === successful && (successful = !0), successful && (!n || el.disabled || "reset" == t || "button" == t || ("checkbox" == t || "radio" == t) && !el.checked || ("submit" == t || "image" == t) && el.form && el.form.clk != el || "select" == tag && -1 == el.selectedIndex)) return null;
        if ("select" == tag) {
            var index = el.selectedIndex;
            if (0 > index) return null;
            for (var a = [], ops = el.options, one = "select-one" == t, max = one ? index + 1 : ops.length, i = one ? index: 0; max > i; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (v || (v = op.attributes && op.attributes.value && !op.attributes.value.specified ? op.text: op.value), one) return v;
                    a.push(v)
                }
            }
            return a
        }
        return $(el).val()
    },
    $.fn.clearForm = function() {
        return this.each(function() {
            $("input,select,textarea", this).clearFields()
        })
    },
    $.fn.clearFields = $.fn.clearInputs = function() {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var t = this.type,
            tag = this.tagName.toLowerCase();
            re.test(t) || "textarea" == tag ? this.value = "": "checkbox" == t || "radio" == t ? this.checked = !1 : "select" == tag && (this.selectedIndex = -1)
        })
    },
    $.fn.resetForm = function() {
        return this.each(function() { ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    },
    $.fn.enable = function(b) {
        return void 0 === b && (b = !0),
        this.each(function() {
            this.disabled = !b
        })
    },
    $.fn.selected = function(select) {
        return void 0 === select && (select = !0),
        this.each(function() {
            var t = this.type;
            if ("checkbox" == t || "radio" == t) this.checked = select;
            else if ("option" == this.tagName.toLowerCase()) {
                var $sel = $(this).parent("select");
                select && $sel[0] && "select-one" == $sel[0].type && $sel.find("option").selected(!1),
                this.selected = select
            }
        })
    },
    $.fn.ajaxSubmit.debug = !1
} (jQuery),
function($) {
    function escapeSelector(str) {
        return str.replace(/(:|\.)/g, "\\$1")
    }
    var version = "1.4.10",
    defaults = {
        exclude: [],
        excludeWithin: [],
        offset: 0,
        direction: "top",
        scrollElement: null,
        scrollTarget: null,
        beforeScroll: function() {},
        afterScroll: function() {},
        easing: "swing",
        speed: 400,
        autoCoefficent: 2
    },
    getScrollable = function(opts) {
        var scrollable = [],
        scrolled = !1,
        dir = opts.dir && "left" == opts.dir ? "scrollLeft": "scrollTop";
        return this.each(function() {
            if (this != document && this != window) {
                var el = $(this);
                el[dir]() > 0 ? scrollable.push(this) : (el[dir](1), scrolled = el[dir]() > 0, scrolled && scrollable.push(this), el[dir](0))
            }
        }),
        scrollable.length || this.each(function() {
            "BODY" === this.nodeName && (scrollable = [this])
        }),
        "first" === opts.el && scrollable.length > 1 && (scrollable = [scrollable[0]]),
        scrollable
    };
    $.fn.extend({
        scrollable: function(dir) {
            var scrl = getScrollable.call(this, {
                dir: dir
            });
            return this.pushStack(scrl)
        },
        firstScrollable: function(dir) {
            var scrl = getScrollable.call(this, {
                el: "first",
                dir: dir
            });
            return this.pushStack(scrl)
        },
        smoothScroll: function(options) {
            options = options || {};
            var opts = $.extend({},
            $.fn.smoothScroll.defaults, options),
            locationPath = $.smoothScroll.filterPath(location.pathname);
            return this.unbind("click.smoothscroll").bind("click.smoothscroll",
            function(event) {
                var link = this,
                $link = $(this),
                exclude = opts.exclude,
                excludeWithin = opts.excludeWithin,
                elCounter = 0,
                ewlCounter = 0,
                include = !0,
                clickOpts = {},
                hostMatch = location.hostname === link.hostname || !link.hostname,
                pathMatch = opts.scrollTarget || ($.smoothScroll.filterPath(link.pathname) || locationPath) === locationPath,
                thisHash = escapeSelector(link.hash);
                if (opts.scrollTarget || hostMatch && pathMatch && thisHash) {
                    for (; include && exclude.length > elCounter;) $link.is(escapeSelector(exclude[elCounter++])) && (include = !1);
                    for (; include && excludeWithin.length > ewlCounter;) $link.closest(excludeWithin[ewlCounter++]).length && (include = !1)
                } else include = !1;
                include && (event.preventDefault(), $.extend(clickOpts, opts, {
                    scrollTarget: opts.scrollTarget || thisHash,
                    link: link
                }), $.smoothScroll(clickOpts))
            }),
            this
        }
    }),
    $.smoothScroll = function(options, px) {
        var opts, $scroller, scrollTargetOffset, speed, scrollerOffset = 0,
        offPos = "offset",
        scrollDir = "scrollTop",
        aniProps = {},
        aniOpts = {};
        "number" == typeof options ? (opts = $.fn.smoothScroll.defaults, scrollTargetOffset = options) : (opts = $.extend({},
        $.fn.smoothScroll.defaults, options || {}), opts.scrollElement && (offPos = "position", "static" == opts.scrollElement.css("position") && opts.scrollElement.css("position", "relative"))),
        opts = $.extend({
            link: null
        },
        opts),
        scrollDir = "left" == opts.direction ? "scrollLeft": scrollDir,
        opts.scrollElement ? ($scroller = opts.scrollElement, scrollerOffset = $scroller[scrollDir]()) : $scroller = $("html, body").firstScrollable(),
        opts.beforeScroll.call($scroller, opts),
        scrollTargetOffset = "number" == typeof options ? options: px || $(opts.scrollTarget)[offPos]() && $(opts.scrollTarget)[offPos]()[opts.direction] || 0,
        aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset,
        speed = opts.speed,
        "auto" === speed && (speed = aniProps[scrollDir] || $scroller.scrollTop(), speed /= opts.autoCoefficent),
        aniOpts = {
            duration: speed,
            easing: opts.easing,
            complete: function() {
                opts.afterScroll.call(opts.link, opts)
            }
        },
        opts.step && (aniOpts.step = opts.step),
        $scroller.length ? $scroller.stop().animate(aniProps, aniOpts) : opts.afterScroll.call(opts.link, opts)
    },
    $.smoothScroll.version = version,
    $.smoothScroll.filterPath = function(string) {
        return string.replace(/^\//, "").replace(/(index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    },
    $.fn.smoothScroll.defaults = defaults
} (jQuery),
function(e) {
    "use strict";
    function r(e) {
        var n = ["Moz", "Webkit", "O", "ms"],
        r = e.charAt(0).toUpperCase() + e.substr(1);
        if (e in t.style) return e;
        for (var i = 0; n.length > i; ++i) {
            var s = n[i] + r;
            if (s in t.style) return s
        }
    }
    function i() {
        return t.style[n.transform] = "",
        t.style[n.transform] = "rotateY(90deg)",
        "" !== t.style[n.transform]
    }
    function a(e) {
        return "string" == typeof e && this.parse(e),
        this
    }
    function f(e, t, n) {
        t === !0 ? e.queue(n) : t ? e.queue(t, n) : n()
    }
    function l(t) {
        var n = [];
        return e.each(t,
        function(t) {
            t = e.camelCase(t),
            t = e.transit.propertyMap[t] || t,
            t = p(t),
            -1 === e.inArray(t, n) && n.push(t)
        }),
        n
    }
    function c(t, n, r, i) {
        var s = l(t);
        e.cssEase[r] && (r = e.cssEase[r]);
        var o = "" + v(n) + " " + r;
        parseInt(i, 10) > 0 && (o += " " + v(i));
        var u = [];
        return e.each(s,
        function(e, t) {
            u.push(t + " " + o)
        }),
        u.join(", ")
    }
    function h(t, r) {
        r || (e.cssNumber[t] = !0),
        e.transit.propertyMap[t] = n.transform,
        e.cssHooks[t] = {
            get: function(n) {
                var r = e(n).css("transform");
                return r && "none" !== r || (r = new a),
                r.get(t)
            },
            set: function(n, r) {
                var i = e(n).css("transform");
                i && "none" !== i || (i = new a),
                i.setFromString(t, r),
                e(n).css({
                    transform: i
                })
            }
        }
    }
    function p(e) {
        return e.replace(/([A-Z])/g,
        function(e) {
            return "-" + e.toLowerCase()
        })
    }
    function d(e, t) {
        return "string" != typeof e || e.match(/^[\-0-9\.]+$/) ? "" + e + t: e
    }
    function v(t) {
        var n = t;
        return e.fx.speeds[n] && (n = e.fx.speeds[n]),
        d(n, "ms")
    }
    e.transit = {
        version: "0.1.3",
        propertyMap: {
            marginLeft: "margin",
            marginRight: "margin",
            marginBottom: "margin",
            marginTop: "margin",
            paddingLeft: "padding",
            paddingRight: "padding",
            paddingBottom: "padding",
            paddingTop: "padding"
        },
        enabled: !0,
        useTransitionEnd: !1
    };
    var t = document.createElement("div"),
    n = {},
    s = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    n.transition = r("transition"),
    n.transitionDelay = r("transitionDelay"),
    n.transform = r("transform"),
    n.transformOrigin = r("transformOrigin"),
    n.transform3d = i(),
    e.extend(e.support, n);
    var o = {
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "MSTransitionEnd"
    },
    u = n.transitionEnd = o[n.transition] || null;
    t = null,
    e.cssEase = {
        _default: "ease",
        "in": "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        snap: "cubic-bezier(0,1,.5,1)"
    },
    e.cssHooks.transform = {
        get: function(t) {
            return e(t).data("transform")
        },
        set: function(t, r) {
            var i = r;
            i instanceof a || (i = new a(i)),
            t.style[n.transform] = "WebkitTransform" !== n.transform || s ? "" + i: i.toString(!0),
            e(t).data("transform", i)
        }
    },
    e.cssHooks.transformOrigin = {
        get: function(e) {
            return e.style[n.transformOrigin]
        },
        set: function(e, t) {
            e.style[n.transformOrigin] = t
        }
    },
    e.cssHooks.transition = {
        get: function(e) {
            return e.style[n.transition]
        },
        set: function(e, t) {
            e.style[n.transition] = t
        }
    },
    h("scale"),
    h("translate"),
    h("rotate"),
    h("rotateX"),
    h("rotateY"),
    h("rotate3d"),
    h("perspective"),
    h("skewX"),
    h("skewY"),
    h("x", !0),
    h("y", !0),
    a.prototype = {
        setFromString: function(e, t) {
            var n = "string" == typeof t ? t.split(",") : t.constructor === Array ? t: [t];
            n.unshift(e),
            a.prototype.set.apply(this, n)
        },
        set: function(e) {
            var t = Array.prototype.slice.apply(arguments, [1]);
            this.setter[e] ? this.setter[e].apply(this, t) : this[e] = t.join(",")
        },
        get: function(e) {
            return this.getter[e] ? this.getter[e].apply(this) : this[e] || 0
        },
        setter: {
            rotate: function(e) {
                this.rotate = d(e, "deg")
            },
            rotateX: function(e) {
                this.rotateX = d(e, "deg")
            },
            rotateY: function(e) {
                this.rotateY = d(e, "deg")
            },
            scale: function(e, t) {
                void 0 === t && (t = e),
                this.scale = e + "," + t
            },
            skewX: function(e) {
                this.skewX = d(e, "deg")
            },
            skewY: function(e) {
                this.skewY = d(e, "deg")
            },
            perspective: function(e) {
                this.perspective = d(e, "px")
            },
            x: function(e) {
                this.set("translate", e, null)
            },
            y: function(e) {
                this.set("translate", null, e)
            },
            translate: function(e, t) {
                void 0 === this._translateX && (this._translateX = 0),
                void 0 === this._translateY && (this._translateY = 0),
                null !== e && (this._translateX = d(e, "px")),
                null !== t && (this._translateY = d(t, "px")),
                this.translate = this._translateX + "," + this._translateY
            }
        },
        getter: {
            x: function() {
                return this._translateX || 0
            },
            y: function() {
                return this._translateY || 0
            },
            scale: function() {
                var e = (this.scale || "1,1").split(",");
                return e[0] && (e[0] = parseFloat(e[0])),
                e[1] && (e[1] = parseFloat(e[1])),
                e[0] === e[1] ? e[0] : e
            },
            rotate3d: function() {
                for (var e = (this.rotate3d || "0,0,0,0deg").split(","), t = 0; 3 >= t; ++t) e[t] && (e[t] = parseFloat(e[t]));
                return e[3] && (e[3] = d(e[3], "deg")),
                e
            }
        },
        parse: function(e) {
            var t = this;
            e.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,
            function(e, n, r) {
                t.setFromString(n, r)
            })
        },
        toString: function(e) {
            var t = [];
            for (var r in this) if (this.hasOwnProperty(r)) {
                if (!n.transform3d && ("rotateX" === r || "rotateY" === r || "perspective" === r || "transformOrigin" === r)) continue;
                "_" !== r[0] && (e && "scale" === r ? t.push(r + "3d(" + this[r] + ",1)") : e && "translate" === r ? t.push(r + "3d(" + this[r] + ",0)") : t.push(r + "(" + this[r] + ")"))
            }
            return t.join(" ")
        }
    },
    e.fn.transition = e.fn.transit = function(t, r, i, s) {
        var o = this,
        a = 0,
        l = !0;
        "function" == typeof r && (s = r, r = void 0),
        "function" == typeof i && (s = i, i = void 0),
        t.easing !== void 0 && (i = t.easing, delete t.easing),
        t.duration !== void 0 && (r = t.duration, delete t.duration),
        t.complete !== void 0 && (s = t.complete, delete t.complete),
        t.queue !== void 0 && (l = t.queue, delete t.queue),
        t.delay !== void 0 && (a = t.delay, delete t.delay),
        r === void 0 && (r = e.fx.speeds._default),
        i === void 0 && (i = e.cssEase._default),
        r = v(r);
        var h = c(t, r, i, a),
        p = e.transit.enabled && n.transition,
        d = p ? parseInt(r, 10) + parseInt(a, 10) : 0;
        if (0 === d) {
            var m = function(e) {
                o.css(t),
                s && s.apply(o),
                e && e()
            };
            return f(o, l, m),
            o
        }
        var g = {},
        y = function(r) {
            var i = !1,
            a = function() {
                i && o.unbind(u, a),
                d > 0 && o.each(function() {
                    this.style[n.transition] = g[this] || null
                }),
                "function" == typeof s && s.apply(o),
                "function" == typeof r && r()
            };
            d > 0 && u && e.transit.useTransitionEnd ? (i = !0, o.bind(u, a)) : window.setTimeout(a, d),
            o.each(function() {
                d > 0 && (this.style[n.transition] = h),
                e(this).css(t)
            })
        },
        b = function(e) {
            var t = 0;
            "MozTransition" === n.transition && 25 > t && (t = 25),
            window.setTimeout(function() {
                y(e)
            },
            t)
        };
        return f(o, l, b),
        this
    },
    e.transit.getTransitionValue = c
} (jQuery),
function($) {
    $.fn.each2 === void 0 && $.fn.extend({
        each2: function(c) {
            for (var j = $([0]), i = -1, l = this.length; l > ++i && (j.context = j[0] = this[i]) && c.call(j[0], i, j) !== !1;);
            return this
        }
    })
} (jQuery),
function($, undefined) {
    "use strict";
    function indexOf(value, array) {
        var v, i = 0,
        l = array.length;
        if (value === undefined) return - 1;
        if (value.constructor === String) {
            for (; l > i; i += 1) if (0 === value.localeCompare(array[i])) return i
        } else for (; l > i; i += 1) if (v = array[i], v.constructor === String) {
            if (0 === v.localeCompare(value)) return i
        } else if (v === value) return i;
        return - 1
    }
    function equal(a, b) {
        return a === b ? !0 : a === undefined || b === undefined ? !1 : null === a || null === b ? !1 : a.constructor === String ? 0 === a.localeCompare(b) : b.constructor === String ? 0 === b.localeCompare(a) : !1
    }
    function splitVal(string, separator) {
        var val, i, l;
        if (null === string || 1 > string.length) return [];
        for (val = string.split(separator), i = 0, l = val.length; l > i; i += 1) val[i] = $.trim(val[i]);
        return val
    }
    function getSideBorderPadding(element) {
        return element.outerWidth() - element.width()
    }
    function installKeyUpChangeEvent(element) {
        var key = "keyup-change-value";
        element.bind("keydown",
        function() {
            $.data(element, key) === undefined && $.data(element, key, element.val())
        }),
        element.bind("keyup",
        function() {
            var val = $.data(element, key);
            val !== undefined && element.val() !== val && ($.removeData(element, key), element.trigger("keyup-change"))
        })
    }
    function installFilteredMouseMove(element) {
        element.bind("mousemove",
        function(e) {
            var lastpos = $.data(document, "select2-lastpos"); (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) && $(e.target).trigger("mousemove-filtered", e)
        })
    }
    function debounce(quietMillis, fn, ctx) {
        ctx = ctx || undefined;
        var timeout;
        return function() {
            var args = arguments;
            window.clearTimeout(timeout),
            timeout = window.setTimeout(function() {
                fn.apply(ctx, args)
            },
            quietMillis)
        }
    }
    function thunk(formula) {
        var value, evaluated = !1;
        return function() {
            return evaluated === !1 && (value = formula(), evaluated = !0),
            value
        }
    }
    function installDebouncedScroll(threshold, element) {
        var notify = debounce(threshold,
        function(e) {
            element.trigger("scroll-debounced", e)
        });
        element.bind("scroll",
        function(e) {
            indexOf(e.target, element.get()) >= 0 && notify(e)
        })
    }
    function killEvent(event) {
        event.preventDefault(),
        event.stopPropagation()
    }
    function measureTextWidth(e) {
        if (!sizer) {
            var style = e[0].currentStyle || window.getComputedStyle(e[0], null);
            sizer = $("<div></div>").css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: style.fontSize,
                fontFamily: style.fontFamily,
                fontStyle: style.fontStyle,
                fontWeight: style.fontWeight,
                letterSpacing: style.letterSpacing,
                textTransform: style.textTransform,
                whiteSpace: "nowrap"
            }),
            $("body").append(sizer)
        }
        return sizer.text(e.val()),
        sizer.width()
    }
    function markMatch(text, term, markup) {
        var match = text.toUpperCase().indexOf(term.toUpperCase()),
        tl = term.length;
        return 0 > match ? (markup.push(text), undefined) : (markup.push(text.substring(0, match)), markup.push("<span class='select2-match'>"), markup.push(text.substring(match, match + tl)), markup.push("</span>"), markup.push(text.substring(match + tl, text.length)), undefined)
    }
    function ajax(options) {
        var timeout, requestSequence = 0,
        handler = null,
        quietMillis = options.quietMillis || 100;
        return function(query) {
            window.clearTimeout(timeout),
            timeout = window.setTimeout(function() {
                requestSequence += 1;
                var requestNumber = requestSequence,
                data = options.data,
                transport = options.transport || $.ajax,
                traditional = options.traditional || !1,
                type = options.type || "GET";
                data = data.call(this, query.term, query.page, query.context),
                null !== handler && handler.abort(),
                handler = transport.call(null, {
                    url: options.url,
                    dataType: options.dataType,
                    data: data,
                    type: type,
                    traditional: traditional,
                    success: function(data) {
                        if (! (requestSequence > requestNumber)) {
                            var results = options.results(data, query.page);
                            query.callback(results)
                        }
                    }
                })
            },
            quietMillis)
        }
    }
    function local(options) {
        var dataText, data = options,
        text = function(item) {
            return "" + item.text
        };
        return $.isArray(data) || (text = data.text, $.isFunction(text) || (dataText = data.text, text = function(item) {
            return item[dataText]
        }), data = data.results),
        function(query) {
            var process, t = query.term,
            filtered = {
                results: []
            };
            return "" === t ? (query.callback({
                results: data
            }), undefined) : (process = function(datum, collection) {
                var group, attr;
                if (datum = datum[0], datum.children) {
                    group = {};
                    for (attr in datum) datum.hasOwnProperty(attr) && (group[attr] = datum[attr]);
                    group.children = [],
                    $(datum.children).each2(function(i, childDatum) {
                        process(childDatum, group.children)
                    }),
                    group.children.length && collection.push(group)
                } else query.matcher(t, text(datum)) && collection.push(datum)
            },
            $(data).each2(function(i, datum) {
                process(datum, filtered.results)
            }), query.callback(filtered), undefined)
        }
    }
    function tags(data) {
        return $.isFunction(data) ? data: function(query) {
            var t = query.term,
            filtered = {
                results: []
            };
            $(data).each(function() {
                var isObject = this.text !== undefined,
                text = isObject ? this.text: this; ("" === t || query.matcher(t, text)) && filtered.results.push(isObject ? this: {
                    id: this,
                    text: this
                })
            }),
            query.callback(filtered)
        }
    }
    function checkFormatter(formatter) {
        if ($.isFunction(formatter)) return ! 0;
        if (!formatter) return ! 1;
        throw Error("formatterName must be a function or a falsy value")
    }
    function evaluate(val) {
        return $.isFunction(val) ? val() : val
    }
    function countResults(results) {
        var count = 0;
        return $.each(results,
        function(i, item) {
            item.children ? count += countResults(item.children) : count++
        }),
        count
    }
    function defaultTokenizer(input, selection, selectCallback, opts) {
        var token, index, i, l, separator, original = input,
        dupe = !1;
        if (!opts.createSearchChoice || !opts.tokenSeparators || 1 > opts.tokenSeparators.length) return undefined;
        for (;;) {
            for (index = -1, i = 0, l = opts.tokenSeparators.length; l > i && (separator = opts.tokenSeparators[i], index = input.indexOf(separator), !(index >= 0)); i++);
            if (0 > index) break;
            if (token = input.substring(0, index), input = input.substring(index + separator.length), token.length > 0 && (token = opts.createSearchChoice(token, selection), token !== undefined && null !== token && opts.id(token) !== undefined && null !== opts.id(token))) {
                for (dupe = !1, i = 0, l = selection.length; l > i; i++) if (equal(opts.id(token), opts.id(selection[i]))) {
                    dupe = !0;
                    break
                }
                dupe || selectCallback(token)
            }
        }
        return 0 != original.localeCompare(input) ? input: undefined
    }
    function clazz(SuperClass, methods) {
        var constructor = function() {};
        return constructor.prototype = new SuperClass,
        constructor.prototype.constructor = constructor,
        constructor.prototype.parent = SuperClass.prototype,
        constructor.prototype = $.extend(constructor.prototype, methods),
        constructor
    }
    if (window.Select2 === undefined) {
        var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer;
        KEY = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function(k) {
                switch (k = k.which ? k.which: k) {
                case KEY.LEFT:
                case KEY.RIGHT:
                case KEY.UP:
                case KEY.DOWN:
                    return ! 0
                }
                return ! 1
            },
            isControl: function(e) {
                var k = e.which;
                switch (k) {
                case KEY.SHIFT:
                case KEY.CTRL:
                case KEY.ALT:
                    return ! 0
                }
                return e.metaKey ? !0 : !1
            },
            isFunctionKey: function(k) {
                return k = k.which ? k.which: k,
                k >= 112 && 123 >= k
            }
        },
        nextUid = function() {
            var counter = 1;
            return function() {
                return counter++
            }
        } (),
        $(document).delegate("body", "mousemove",
        function(e) {
            $.data(document, "select2-lastpos", {
                x: e.pageX,
                y: e.pageY
            })
        }),
        $(document).ready(function() {
            $(document).delegate("body", "mousedown touchend",
            function(e) {
                var attr, target = $(e.target).closest("div.select2-container").get(0);
                target ? $(document).find("div.select2-container-active").each(function() {
                    this !== target && $(this).data("select2").blur()
                }) : (target = $(e.target).closest("div.select2-drop").get(0), $(document).find("div.select2-drop-active").each(function() {
                    this !== target && $(this).data("select2").blur()
                })),
                target = $(e.target),
                attr = target.attr("for"),
                "LABEL" === e.target.tagName && attr && attr.length > 0 && (target = $("#" + attr), target = target.data("select2"), target !== undefined && (target.focus(), e.preventDefault()))
            })
        }),
        AbstractSelect2 = clazz(Object, {
            bind: function(func) {
                var self = this;
                return function() {
                    func.apply(self, arguments)
                }
            },
            init: function(opts) {
                var results, search, resultsSelector = ".select2-results";
                this.opts = opts = this.prepareOpts(opts),
                this.id = opts.id,
                opts.element.data("select2") !== undefined && null !== opts.element.data("select2") && this.destroy(),
                this.enabled = !0,
                this.container = this.createContainer(),
                this.containerId = "s2id_" + (opts.element.attr("id") || "autogen" + nextUid()),
                this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"),
                this.container.attr("id", this.containerId),
                this.body = thunk(function() {
                    return opts.element.closest("body")
                }),
                opts.element.attr("class") !== undefined && this.container.addClass(opts.element.attr("class").replace(/validate\[[\S ]+] ?/, "")),
                this.container.css(evaluate(opts.containerCss)),
                this.container.addClass(evaluate(opts.containerCssClass)),
                this.opts.element.data("select2", this).hide().before(this.container),
                this.container.data("select2", this),
                this.dropdown = this.container.find(".select2-drop"),
                this.dropdown.addClass(evaluate(opts.dropdownCssClass)),
                this.dropdown.data("select2", this),
                this.results = results = this.container.find(resultsSelector),
                this.search = search = this.container.find("input.select2-input"),
                search.attr("tabIndex", this.opts.element.attr("tabIndex")),
                this.resultsPage = 0,
                this.context = null,
                this.initContainer(),
                this.initContainerWidth(),
                installFilteredMouseMove(this.results),
                this.dropdown.delegate(resultsSelector, "mousemove-filtered", this.bind(this.highlightUnderEvent)),
                installDebouncedScroll(80, this.results),
                this.dropdown.delegate(resultsSelector, "scroll-debounced", this.bind(this.loadMoreIfNeeded)),
                $.fn.mousewheel && results.mousewheel(function(e, delta, deltaX, deltaY) {
                    var top = results.scrollTop();
                    deltaY > 0 && 0 >= top - deltaY ? (results.scrollTop(0), killEvent(e)) : 0 > deltaY && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height() && (results.scrollTop(results.get(0).scrollHeight - results.height()), killEvent(e))
                }),
                installKeyUpChangeEvent(search),
                search.bind("keyup-change", this.bind(this.updateResults)),
                search.bind("focus",
                function() {
                    search.addClass("select2-focused"),
                    " " === search.val() && search.val("")
                }),
                search.bind("blur",
                function() {
                    search.removeClass("select2-focused")
                }),
                this.dropdown.delegate(resultsSelector, "mouseup", this.bind(function(e) {
                    $(e.target).closest(".select2-result-selectable:not(.select2-disabled)").length > 0 ? (this.highlightUnderEvent(e), this.selectHighlighted(e)) : this.focusSearch(),
                    killEvent(e)
                })),
                this.dropdown.bind("click mouseup mousedown",
                function(e) {
                    e.stopPropagation()
                }),
                $.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()),
                (opts.element.is(":disabled") || opts.element.is("[readonly='readonly']")) && this.disable()
            },
            destroy: function() {
                var select2 = this.opts.element.data("select2");
                select2 !== undefined && (select2.container.remove(), select2.dropdown.remove(), select2.opts.element.removeData("select2").unbind(".select2").show())
            },
            prepareOpts: function(opts) {
                var element, select, idKey, ajaxUrl;
                if (element = opts.element, "select" === element.get(0).tagName.toLowerCase() && (this.select = select = opts.element), select && $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"],
                function() {
                    if (this in opts) throw Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                }), opts = $.extend({},
                {
                    populateResults: function(container, results, query) {
                        var populate, id = this.opts.id,
                        self = this;
                        populate = function(results, container, depth) {
                            var i, l, result, selectable, compound, node, label, innerContainer, formatted;
                            for (i = 0, l = results.length; l > i; i += 1) result = results[i],
                            selectable = id(result) !== undefined,
                            compound = result.children && result.children.length > 0,
                            node = $("<li></li>"),
                            node.addClass("select2-results-dept-" + depth),
                            node.addClass("select2-result"),
                            node.addClass(selectable ? "select2-result-selectable": "select2-result-unselectable"),
                            compound && node.addClass("select2-result-with-children"),
                            node.addClass(self.opts.formatResultCssClass(result)),
                            label = $("<div></div>"),
                            label.addClass("select2-result-label"),
                            formatted = opts.formatResult(result, label, query),
                            formatted !== undefined && label.html(self.opts.escapeMarkup(formatted)),
                            node.append(label),
                            compound && (innerContainer = $("<ul></ul>"), innerContainer.addClass("select2-result-sub"), populate(result.children, innerContainer, depth + 1), node.append(innerContainer)),
                            node.data("select2-data", result),
                            container.append(node)
                        },
                        populate(results, container, 0)
                    }
                },
                $.fn.select2.defaults, opts), "function" != typeof opts.id && (idKey = opts.id, opts.id = function(e) {
                    return e[idKey]
                }), select ? (opts.query = this.bind(function(query) {
                    var children, firstChild, process, data = {
                        results: [],
                        more: !1
                    },
                    term = query.term;
                    process = function(element, collection) {
                        var group;
                        element.is("option") ? query.matcher(term, element.text(), element) && collection.push({
                            id: element.attr("value"),
                            text: element.text(),
                            element: element.get(),
                            css: element.attr("class")
                        }) : element.is("optgroup") && (group = {
                            text: element.attr("label"),
                            children: [],
                            element: element.get(),
                            css: element.attr("class")
                        },
                        element.children().each2(function(i, elm) {
                            process(elm, group.children)
                        }), group.children.length > 0 && collection.push(group))
                    },
                    children = element.children(),
                    this.getPlaceholder() !== undefined && children.length > 0 && (firstChild = children[0], "" === $(firstChild).text() && (children = children.not(firstChild))),
                    children.each2(function(i, elm) {
                        process(elm, data.results)
                    }),
                    query.callback(data)
                }), opts.id = function(e) {
                    return e.id
                },
                opts.formatResultCssClass = function(data) {
                    return data.css
                }) : "query" in opts || ("ajax" in opts ? (ajaxUrl = opts.element.data("ajax-url"), ajaxUrl && ajaxUrl.length > 0 && (opts.ajax.url = ajaxUrl), opts.query = ajax(opts.ajax)) : "data" in opts ? opts.query = local(opts.data) : "tags" in opts && (opts.query = tags(opts.tags), opts.createSearchChoice = function(term) {
                    return {
                        id: term,
                        text: term
                    }
                },
                opts.initSelection = function(element, callback) {
                    var data = [];
                    $(splitVal(element.val(), opts.separator)).each(function() {
                        var id = this,
                        text = this,
                        tags = opts.tags;
                        $.isFunction(tags) && (tags = tags()),
                        $(tags).each(function() {
                            return equal(this.id, id) ? (text = this.text, !1) : undefined
                        }),
                        data.push({
                            id: id,
                            text: text
                        })
                    }),
                    callback(data)
                })), "function" != typeof opts.query) throw "query function not defined for Select2 " + opts.element.attr("id");
                return opts
            },
            monitorSource: function() {
                this.opts.element.bind("change.select2", this.bind(function() {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                }))
            },
            triggerChange: function(details) {
                details = details || {},
                details = $.extend({},
                details, {
                    type: "change",
                    val: this.val()
                }),
                this.opts.element.data("select2-change-triggered", !0),
                this.opts.element.trigger(details),
                this.opts.element.data("select2-change-triggered", !1),
                this.opts.element.click(),
                this.opts.blurOnChange && this.opts.element.blur()
            },
            enable: function() {
                this.enabled || (this.enabled = !0, this.container.removeClass("select2-container-disabled"))
            },
            disable: function() {
                this.enabled && (this.close(), this.enabled = !1, this.container.addClass("select2-container-disabled"))
            },
            opened: function() {
                return this.container.hasClass("select2-dropdown-open")
            },
            positionDropdown: function() {
                var bodyOffset, above, css, offset = this.container.offset(),
                height = this.container.outerHeight(),
                width = this.container.outerWidth(),
                dropHeight = this.dropdown.outerHeight(),
                viewportBottom = $(window).scrollTop() + document.documentElement.clientHeight,
                dropTop = offset.top + height,
                dropLeft = offset.left,
                enoughRoomBelow = viewportBottom >= dropTop + dropHeight,
                enoughRoomAbove = offset.top - dropHeight >= this.body().scrollTop(),
                aboveNow = this.dropdown.hasClass("select2-drop-above");
                "static" !== this.body().css("position") && (bodyOffset = this.body().offset(), dropTop -= bodyOffset.top, dropLeft -= bodyOffset.left),
                aboveNow ? (above = !0, !enoughRoomAbove && enoughRoomBelow && (above = !1)) : (above = !1, !enoughRoomBelow && enoughRoomAbove && (above = !0)),
                above ? (dropTop = offset.top - dropHeight, this.container.addClass("select2-drop-above"), this.dropdown.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")),
                css = $.extend({
                    top: dropTop,
                    left: dropLeft,
                    width: width
                },
                evaluate(this.opts.dropdownCss)),
                this.dropdown.css(css)
            },
            shouldOpen: function() {
                var event;
                return this.opened() ? !1 : (event = $.Event("open"), this.opts.element.trigger(event), !event.isDefaultPrevented())
            },
            clearDropdownAlignmentPreference: function() {
                this.container.removeClass("select2-drop-above"),
                this.dropdown.removeClass("select2-drop-above")
            },
            open: function() {
                return this.shouldOpen() ? (window.setTimeout(this.bind(this.opening), 1), !0) : !1
            },
            opening: function() {
                var cid = this.containerId,
                selector = this.containerSelector,
                scroll = "scroll." + cid,
                resize = "resize." + cid;
                this.container.parents().each(function() {
                    $(this).bind(scroll,
                    function() {
                        var s2 = $(selector);
                        0 == s2.length && $(this).unbind(scroll),
                        s2.select2("close")
                    })
                }),
                $(window).bind(resize,
                function() {
                    var s2 = $(selector);
                    0 == s2.length && $(window).unbind(resize),
                    s2.select2("close")
                }),
                this.clearDropdownAlignmentPreference(),
                " " === this.search.val() && this.search.val(""),
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),
                this.updateResults(!0),
                this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()),
                this.dropdown.show(),
                this.positionDropdown(),
                this.dropdown.addClass("select2-drop-active"),
                this.ensureHighlightVisible(),
                this.focusSearch()
            },
            close: function() {
                if (this.opened()) {
                    var self = this;
                    this.container.parents().each(function() {
                        $(this).unbind("scroll." + self.containerId)
                    }),
                    $(window).unbind("resize." + this.containerId),
                    this.clearDropdownAlignmentPreference(),
                    this.dropdown.hide(),
                    this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),
                    this.results.empty(),
                    this.clearSearch(),
                    this.opts.element.trigger($.Event("close"))
                }
            },
            clearSearch: function() {},
            ensureHighlightVisible: function() {
                var children, index, child, hb, rb, y, more, results = this.results;
                if (index = this.highlight(), !(0 > index)) {
                    if (0 == index) return results.scrollTop(0),
                    undefined;
                    children = results.find(".select2-result-selectable"),
                    child = $(children[index]),
                    hb = child.offset().top + child.outerHeight(),
                    index === children.length - 1 && (more = results.find("li.select2-more-results"), more.length > 0 && (hb = more.offset().top + more.outerHeight())),
                    rb = results.offset().top + results.outerHeight(),
                    hb > rb && results.scrollTop(results.scrollTop() + (hb - rb)),
                    y = child.offset().top - results.offset().top,
                    0 > y && results.scrollTop(results.scrollTop() + y)
                }
            },
            moveHighlight: function(delta) {
                for (var choices = this.results.find(".select2-result-selectable"), index = this.highlight(); index > -1 && choices.length > index;) {
                    index += delta;
                    var choice = $(choices[index]);
                    if (choice.hasClass("select2-result-selectable") && !choice.hasClass("select2-disabled")) {
                        this.highlight(index);
                        break
                    }
                }
            },
            highlight: function(index) {
                var choices = this.results.find(".select2-result-selectable").not(".select2-disabled");
                return 0 === arguments.length ? indexOf(choices.filter(".select2-highlighted")[0], choices.get()) : (index >= choices.length && (index = choices.length - 1), 0 > index && (index = 0), choices.removeClass("select2-highlighted"), $(choices[index]).addClass("select2-highlighted"), this.ensureHighlightVisible(), undefined)
            },
            countSelectableResults: function() {
                return this.results.find(".select2-result-selectable").not(".select2-disabled").length
            },
            highlightUnderEvent: function(event) {
                var el = $(event.target).closest(".select2-result-selectable");
                if (el.length > 0 && !el.is(".select2-highlighted")) {
                    var choices = this.results.find(".select2-result-selectable");
                    this.highlight(choices.index(el))
                } else 0 == el.length && this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            },
            loadMoreIfNeeded: function() {
                var below, results = this.results,
                more = results.find("li.select2-more-results"),
                page = this.resultsPage + 1,
                self = this,
                term = this.search.val(),
                context = this.context;
                0 !== more.length && (below = more.offset().top - results.offset().top - results.height(), 0 >= below && (more.addClass("select2-active"), this.opts.query({
                    term: term,
                    page: page,
                    context: context,
                    matcher: this.opts.matcher,
                    callback: this.bind(function(data) {
                        self.opened() && (self.opts.populateResults.call(this, results, data.results, {
                            term: term,
                            page: page,
                            context: context
                        }), data.more === !0 ? (more.detach().appendTo(results).text(self.opts.formatLoadMore(page + 1)), window.setTimeout(function() {
                            self.loadMoreIfNeeded()
                        },
                        10)) : more.remove(), self.positionDropdown(), self.resultsPage = page)
                    })
                })))
            },
            tokenize: function() {},
            updateResults: function(initial) {
                function postRender() {
                    results.scrollTop(0),
                    search.removeClass("select2-active"),
                    self.positionDropdown()
                }
                function render(html) {
                    results.html(self.opts.escapeMarkup(html)),
                    postRender()
                }
                var data, input, search = this.search,
                results = this.results,
                opts = this.opts,
                self = this;
                if (initial === !0 || this.showSearchInput !== !1 && this.opened()) {
                    if (search.addClass("select2-active"), opts.maximumSelectionSize >= 1 && (data = this.data(), $.isArray(data) && data.length >= opts.maximumSelectionSize && checkFormatter(opts.formatSelectionTooBig, "formatSelectionTooBig"))) return render("<li class='select2-selection-limit'>" + opts.formatSelectionTooBig(opts.maximumSelectionSize) + "</li>"),
                    undefined;
                    if (search.val().length < opts.minimumInputLength && checkFormatter(opts.formatInputTooShort, "formatInputTooShort")) return render("<li class='select2-no-results'>" + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + "</li>"),
                    undefined;
                    render("<li class='select2-searching'>" + opts.formatSearching() + "</li>"),
                    input = this.tokenize(),
                    input != undefined && null != input && search.val(input),
                    this.resultsPage = 1,
                    opts.query({
                        term: search.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: opts.matcher,
                        callback: this.bind(function(data) {
                            var def;
                            if (this.opened()) {
                                if (this.context = data.context === undefined ? null: data.context, this.opts.createSearchChoice && "" !== search.val() && (def = this.opts.createSearchChoice.call(null, search.val(), data.results), def !== undefined && null !== def && self.id(def) !== undefined && null !== self.id(def) && 0 === $(data.results).filter(function() {
                                    return equal(self.id(this), self.id(def))
                                }).length && data.results.unshift(def)), 0 === data.results.length && checkFormatter(opts.formatNoMatches, "formatNoMatches")) return render("<li class='select2-no-results'>" + opts.formatNoMatches(search.val()) + "</li>"),
                                undefined;
                                results.empty(),
                                self.opts.populateResults.call(this, results, data.results, {
                                    term: search.val(),
                                    page: this.resultsPage,
                                    context: null
                                }),
                                data.more === !0 && checkFormatter(opts.formatLoadMore, "formatLoadMore") && (results.append("<li class='select2-more-results'>" + self.opts.escapeMarkup(opts.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function() {
                                    self.loadMoreIfNeeded()
                                },
                                10)),
                                this.postprocessResults(data, initial),
                                postRender()
                            }
                        })
                    })
                }
            },
            cancel: function() {
                this.close()
            },
            blur: function() {
                this.close(),
                this.container.removeClass("select2-container-active"),
                this.dropdown.removeClass("select2-drop-active"),
                this.search[0] === document.activeElement && this.search.blur(),
                this.clearSearch(),
                this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
            },
            focusSearch: function() {
                this.search.show(),
                this.search.focus(),
                window.setTimeout(this.bind(function() {
                    this.search.show(),
                    this.search.focus(),
                    this.search.val(this.search.val())
                }), 10)
            },
            selectHighlighted: function() {
                var index = this.highlight(),
                highlighted = this.results.find(".select2-highlighted").not(".select2-disabled"),
                data = highlighted.closest(".select2-result-selectable").data("select2-data");
                data && (highlighted.addClass("select2-disabled"), this.highlight(index), this.onSelect(data))
            },
            getPlaceholder: function() {
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder
            },
            initContainerWidth: function() {
                function resolveContainerWidth() {
                    var style, attrs, matches, i, l;
                    if ("off" === this.opts.width) return null;
                    if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth() ? "auto": this.opts.element.outerWidth() + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if (style = this.opts.element.attr("style"), style !== undefined) for (attrs = style.split(";"), i = 0, l = attrs.length; l > i; i += 1) if (matches = attrs[i].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/), null !== matches && matches.length >= 1) return matches[1];
                        return "resolve" === this.opts.width ? (style = this.opts.element.css("width"), style.indexOf("%") > 0 ? style: 0 === this.opts.element.outerWidth() ? "auto": this.opts.element.outerWidth() + "px") : null
                    }
                    return $.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }
                var width = resolveContainerWidth.call(this);
                null !== width && this.container.attr("style", "width: " + width)
            }
        }),
        SingleSelect2 = clazz(AbstractSelect2, {
            createContainer: function() {
                var container = $("<div></div>", {
                    "class": "select2-container"
                }).html(["    <a href='#' onclick='return false;' class='select2-choice'>", "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>", "   <div><b></b></div>", "</a>", "    <div class='select2-drop select2-offscreen'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return container
            },
            opening: function() {
                this.search.show(),
                this.parent.opening.apply(this, arguments),
                this.dropdown.removeClass("select2-offscreen")
            },
            close: function() {
                this.opened() && (this.parent.close.apply(this, arguments), this.dropdown.removeAttr("style").addClass("select2-offscreen").insertAfter(this.selection).show())
            },
            focus: function() {
                this.close(),
                this.selection.focus()
            },
            isFocused: function() {
                return this.selection[0] === document.activeElement
            },
            cancel: function() {
                this.parent.cancel.apply(this, arguments),
                this.selection.focus()
            },
            initContainer: function() {
                var selection, container = this.container,
                dropdown = this.dropdown,
                clickingInside = !1;
                this.selection = selection = container.find(".select2-choice"),
                this.search.bind("keydown", this.bind(function(e) {
                    if (this.enabled) {
                        if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) return killEvent(e),
                        undefined;
                        if (this.opened()) switch (e.which) {
                        case KEY.UP:
                        case KEY.DOWN:
                            return this.moveHighlight(e.which === KEY.UP ? -1 : 1),
                            killEvent(e),
                            undefined;
                        case KEY.TAB:
                        case KEY.ENTER:
                            return this.selectHighlighted(),
                            killEvent(e),
                            undefined;
                        case KEY.ESC:
                            return this.cancel(e),
                            killEvent(e),
                            undefined
                        } else {
                            if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) return;
                            if (this.opts.openOnEnter === !1 && e.which === KEY.ENTER) return;
                            if (this.open(), e.which === KEY.ENTER) return
                        }
                    }
                })),
                this.search.bind("focus", this.bind(function() {
                    this.selection.attr("tabIndex", "-1")
                })),
                this.search.bind("blur", this.bind(function() {
                    this.opened() || this.container.removeClass("select2-container-active"),
                    window.setTimeout(this.bind(function() {
                        this.selection.attr("tabIndex", this.opts.element.attr("tabIndex"))
                    }), 10)
                })),
                selection.bind("mousedown", this.bind(function() {
                    clickingInside = !0,
                    this.opened() ? (this.close(), this.selection.focus()) : this.enabled && this.open(),
                    clickingInside = !1
                })),
                dropdown.bind("mousedown", this.bind(function() {
                    this.search.focus()
                })),
                selection.bind("focus", this.bind(function() {
                    this.container.addClass("select2-container-active"),
                    this.search.attr("tabIndex", "-1")
                })),
                selection.bind("blur", this.bind(function() {
                    this.opened() || this.container.removeClass("select2-container-active"),
                    window.setTimeout(this.bind(function() {
                        this.search.attr("tabIndex", this.opts.element.attr("tabIndex"))
                    }), 10)
                })),
                selection.bind("keydown", this.bind(function(e) {
                    if (this.enabled) {
                        if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) return killEvent(e),
                        undefined;
                        if (! (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || this.opts.openOnEnter === !1 && e.which === KEY.ENTER)) {
                            if (e.which == KEY.DELETE) return this.opts.allowClear && this.clear(),
                            undefined;
                            if (this.open(), e.which === KEY.ENTER) return killEvent(e),
                            undefined;
                            if (48 > e.which) return killEvent(e),
                            undefined;
                            var keyWritten = String.fromCharCode(e.which).toLowerCase();
                            e.shiftKey && (keyWritten = keyWritten.toUpperCase()),
                            this.search.focus(),
                            this.search.val(keyWritten),
                            killEvent(e)
                        }
                    }
                })),
                selection.delegate("abbr", "mousedown", this.bind(function(e) {
                    this.enabled && (this.clear(), killEvent(e), this.close(), this.triggerChange(), this.selection.focus())
                })),
                this.setPlaceholder(),
                this.search.bind("focus", this.bind(function() {
                    this.container.addClass("select2-container-active")
                }))
            },
            clear: function() {
                this.opts.element.val(""),
                this.selection.find("span").empty(),
                this.selection.removeData("select2-data"),
                this.setPlaceholder()
            },
            initSelection: function() {
                if ("" === this.opts.element.val()) this.close(),
                this.setPlaceholder();
                else {
                    var self = this;
                    this.opts.initSelection.call(null, this.opts.element,
                    function(selected) {
                        selected !== undefined && null !== selected && (self.updateSelection(selected), self.close(), self.setPlaceholder())
                    })
                }
            },
            prepareOpts: function() {
                var opts = this.parent.prepareOpts.apply(this, arguments);
                return "select" === opts.element.get(0).tagName.toLowerCase() && (opts.initSelection = function(element, callback) {
                    var selected = element.find(":selected");
                    $.isFunction(callback) && callback({
                        id: selected.attr("value"),
                        text: selected.text()
                    })
                }),
                opts
            },
            setPlaceholder: function() {
                var placeholder = this.getPlaceholder();
                if ("" === this.opts.element.val() && placeholder !== undefined) {
                    if (this.select && "" !== this.select.find("option:first").text()) return;
                    this.selection.find("span").html(this.opts.escapeMarkup(placeholder)),
                    this.selection.addClass("select2-default"),
                    this.selection.find("abbr").hide()
                }
            },
            postprocessResults: function(data, initial) {
                var selected = 0,
                self = this,
                showSearchInput = !0;
                this.results.find(".select2-result-selectable").each2(function(i, elm) {
                    return equal(self.id(elm.data("select2-data")), self.opts.element.val()) ? (selected = i, !1) : undefined
                }),
                this.highlight(selected),
                initial === !0 && (showSearchInput = this.showSearchInput = countResults(data.results) >= this.opts.minimumResultsForSearch, this.dropdown.find(".select2-search")[showSearchInput ? "removeClass": "addClass"]("select2-search-hidden"), $(this.dropdown, this.container)[showSearchInput ? "addClass": "removeClass"]("select2-with-searchbox"))
            },
            onSelect: function(data) {
                var old = this.opts.element.val();
                this.opts.element.val(this.id(data)),
                this.updateSelection(data),
                this.close(),
                this.selection.focus(),
                equal(old, this.id(data)) || this.triggerChange()
            },
            updateSelection: function(data) {
                var formatted, container = this.selection.find("span");
                this.selection.data("select2-data", data),
                container.empty(),
                formatted = this.opts.formatSelection(data, container),
                formatted !== undefined && container.append(this.opts.escapeMarkup(formatted)),
                this.selection.removeClass("select2-default"),
                this.opts.allowClear && this.getPlaceholder() !== undefined && this.selection.find("abbr").show()
            },
            val: function() {
                var val, data = null,
                self = this;
                if (0 === arguments.length) return this.opts.element.val();
                if (val = arguments[0], this.select) this.select.val(val).find(":selected").each2(function(i, elm) {
                    return data = {
                        id: elm.attr("value"),
                        text: elm.text()
                    },
                    !1
                }),
                this.updateSelection(data),
                this.setPlaceholder();
                else {
                    if (this.opts.initSelection === undefined) throw Error("cannot call val() if initSelection() is not defined");
                    if (!val) return this.clear(),
                    undefined;
                    this.opts.element.val(val),
                    this.opts.initSelection(this.opts.element,
                    function(data) {
                        self.opts.element.val(data ? self.id(data) : ""),
                        self.updateSelection(data),
                        self.setPlaceholder()
                    })
                }
            },
            clearSearch: function() {
                this.search.val("")
            },
            data: function(value) {
                var data;
                return 0 === arguments.length ? (data = this.selection.data("select2-data"), data == undefined && (data = null), data) : (value && "" !== value ? (this.opts.element.val(value ? this.id(value) : ""), this.updateSelection(value)) : this.clear(), undefined)
            }
        }),
        MultiSelect2 = clazz(AbstractSelect2, {
            createContainer: function() {
                var container = $("<div></div>", {
                    "class": "select2-container select2-container-multi"
                }).html(["    <ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi' style='display:none;'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return container
            },
            prepareOpts: function() {
                var opts = this.parent.prepareOpts.apply(this, arguments);
                return "select" === opts.element.get(0).tagName.toLowerCase() && (opts.initSelection = function(element, callback) {
                    var data = [];
                    element.find(":selected").each2(function(i, elm) {
                        data.push({
                            id: elm.attr("value"),
                            text: elm.text()
                        })
                    }),
                    $.isFunction(callback) && callback(data)
                }),
                opts
            },
            initContainer: function() {
                var selection, selector = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"),
                this.selection = selection = this.container.find(selector),
                this.search.bind("keydown", this.bind(function(e) {
                    if (this.enabled) {
                        if (e.which === KEY.BACKSPACE && "" === this.search.val()) {
                            this.close();
                            var choices, selected = selection.find(".select2-search-choice-focus");
                            if (selected.length > 0) return this.unselect(selected.first()),
                            this.search.width(10),
                            killEvent(e),
                            undefined;
                            choices = selection.find(".select2-search-choice"),
                            choices.length > 0 && choices.last().addClass("select2-search-choice-focus")
                        } else selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                        if (this.opened()) switch (e.which) {
                        case KEY.UP:
                        case KEY.DOWN:
                            return this.moveHighlight(e.which === KEY.UP ? -1 : 1),
                            killEvent(e),
                            undefined;
                        case KEY.ENTER:
                        case KEY.TAB:
                            return this.selectHighlighted(),
                            killEvent(e),
                            undefined;
                        case KEY.ESC:
                            return this.cancel(e),
                            killEvent(e),
                            undefined
                        }
                        e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.BACKSPACE || e.which === KEY.ESC || (this.opts.openOnEnter !== !1 || e.which !== KEY.ENTER) && (this.open(), (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) && killEvent(e))
                    }
                })),
                this.search.bind("keyup", this.bind(this.resizeSearch)),
                this.search.bind("blur", this.bind(function(e) {
                    this.container.removeClass("select2-container-active"),
                    this.search.removeClass("select2-focused"),
                    this.clearSearch(),
                    e.stopImmediatePropagation()
                })),
                this.container.delegate(selector, "mousedown", this.bind(function(e) {
                    this.enabled && ($(e.target).closest(".select2-search-choice").length > 0 || (this.clearPlaceholder(), this.open(), this.focusSearch(), e.preventDefault()))
                })),
                this.container.delegate(selector, "focus", this.bind(function() {
                    this.enabled && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                })),
                this.clearSearch()
            },
            enable: function() {
                this.enabled || (this.parent.enable.apply(this, arguments), this.search.removeAttr("disabled"))
            },
            disable: function() {
                this.enabled && (this.parent.disable.apply(this, arguments), this.search.attr("disabled", !0))
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                    var self = this;
                    this.opts.initSelection.call(null, this.opts.element,
                    function(data) {
                        data !== undefined && null !== data && (self.updateSelection(data), self.close(), self.clearSearch())
                    })
                }
            },
            clearSearch: function() {
                var placeholder = this.getPlaceholder();
                placeholder !== undefined && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(placeholder).addClass("select2-default"), this.resizeSearch()) : this.search.val(" ").width(10)
            },
            clearPlaceholder: function() {
                this.search.hasClass("select2-default") ? this.search.val("").removeClass("select2-default") : " " === this.search.val() && this.search.val("")
            },
            opening: function() {
                this.parent.opening.apply(this, arguments),
                this.clearPlaceholder(),
                this.resizeSearch(),
                this.focusSearch()
            },
            close: function() {
                this.opened() && this.parent.close.apply(this, arguments)
            },
            focus: function() {
                this.close(),
                this.search.focus()
            },
            isFocused: function() {
                return this.search.hasClass("select2-focused")
            },
            updateSelection: function(data) {
                var ids = [],
                filtered = [],
                self = this;
                $(data).each(function() {
                    0 > indexOf(self.id(this), ids) && (ids.push(self.id(this)), filtered.push(this))
                }),
                data = filtered,
                this.selection.find(".select2-search-choice").remove(),
                $(data).each(function() {
                    self.addSelectedChoice(this)
                }),
                self.postprocessResults()
            },
            tokenize: function() {
                var input = this.search.val();
                input = this.opts.tokenizer(input, this.data(), this.bind(this.onSelect), this.opts),
                null != input && input != undefined && (this.search.val(input), input.length > 0 && this.open())
            },
            onSelect: function(data) {
                this.addSelectedChoice(data),
                this.select && this.postprocessResults(),
                this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.positionDropdown()) : this.close(),
                this.triggerChange({
                    added: data
                }),
                this.focusSearch()
            },
            cancel: function() {
                this.close(),
                this.focusSearch()
            },
            addSelectedChoice: function(data) {
                var formatted, choice = $("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                id = this.id(data),
                val = this.getVal();
                formatted = this.opts.formatSelection(data, choice),
                choice.find("div").replaceWith("<div>" + this.opts.escapeMarkup(formatted) + "</div>"),
                choice.find(".select2-search-choice-close").bind("mousedown", killEvent).bind("click dblclick", this.bind(function(e) {
                    this.enabled && ($(e.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function() {
                        this.unselect($(e.target)),
                        this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),
                        this.close(),
                        this.focusSearch()
                    })).dequeue(), killEvent(e))
                })).bind("focus", this.bind(function() {
                    this.enabled && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                })),
                choice.data("select2-data", data),
                choice.insertBefore(this.searchContainer),
                val.push(id),
                this.setVal(val)
            },
            unselect: function(selected) {
                var data, index, val = this.getVal();
                if (selected = selected.closest(".select2-search-choice"), 0 === selected.length) throw "Invalid argument: " + selected + ". Must be .select2-search-choice";
                data = selected.data("select2-data"),
                index = indexOf(this.id(data), val),
                index >= 0 && (val.splice(index, 1), this.setVal(val), this.select && this.postprocessResults()),
                selected.remove(),
                this.triggerChange({
                    removed: data
                })
            },
            postprocessResults: function() {
                var val = this.getVal(),
                choices = this.results.find(".select2-result-selectable"),
                compound = this.results.find(".select2-result-with-children"),
                self = this;
                choices.each2(function(i, choice) {
                    var id = self.id(choice.data("select2-data"));
                    indexOf(id, val) >= 0 ? choice.addClass("select2-disabled").removeClass("select2-result-selectable") : choice.removeClass("select2-disabled").addClass("select2-result-selectable")
                }),
                compound.each2(function(i, e) {
                    0 == e.find(".select2-result-selectable").length ? e.addClass("select2-disabled") : e.removeClass("select2-disabled")
                }),
                choices.each2(function(i, choice) {
                    return ! choice.hasClass("select2-disabled") && choice.hasClass("select2-result-selectable") ? (self.highlight(0), !1) : undefined
                })
            },
            resizeSearch: function() {
                var minimumWidth, left, maxWidth, containerLeft, searchWidth, sideBorderPadding = getSideBorderPadding(this.search);
                minimumWidth = measureTextWidth(this.search) + 10,
                left = this.search.offset().left,
                maxWidth = this.selection.width(),
                containerLeft = this.selection.offset().left,
                searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding,
                minimumWidth > searchWidth && (searchWidth = maxWidth - sideBorderPadding),
                40 > searchWidth && (searchWidth = maxWidth - sideBorderPadding),
                this.search.width(searchWidth)
            },
            getVal: function() {
                var val;
                return this.select ? (val = this.select.val(), null === val ? [] : val) : (val = this.opts.element.val(), splitVal(val, this.opts.separator))
            },
            setVal: function(val) {
                var unique;
                this.select ? this.select.val(val) : (unique = [], $(val).each(function() {
                    0 > indexOf(this, unique) && unique.push(this)
                }), this.opts.element.val(0 === unique.length ? "": unique.join(this.opts.separator)))
            },
            val: function() {
                var val, data = [],
                self = this;
                if (0 === arguments.length) return this.getVal();
                if (val = arguments[0], !val) return this.opts.element.val(""),
                this.updateSelection([]),
                this.clearSearch(),
                undefined;
                if (this.setVal(val), this.select) this.select.find(":selected").each(function() {
                    data.push({
                        id: $(this).attr("value"),
                        text: $(this).text()
                    })
                }),
                this.updateSelection(data);
                else {
                    if (this.opts.initSelection === undefined) throw Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element,
                    function(data) {
                        var ids = $(data).map(self.id);
                        self.setVal(ids),
                        self.updateSelection(data),
                        self.clearSearch()
                    })
                }
                this.clearSearch()
            },
            onSortStart: function() {
                if (this.select) throw Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0),
                this.searchContainer.hide()
            },
            onSortEnd: function() {
                var val = [],
                self = this;
                this.searchContainer.show(),
                this.searchContainer.appendTo(this.searchContainer.parent()),
                this.resizeSearch(),
                this.selection.find(".select2-search-choice").each(function() {
                    val.push(self.opts.id($(this).data("select2-data")))
                }),
                this.setVal(val),
                this.triggerChange()
            },
            data: function(values) {
                var ids, self = this;
                return 0 === arguments.length ? this.selection.find(".select2-search-choice").map(function() {
                    return $(this).data("select2-data")
                }).get() : (values || (values = []), ids = $.map(values,
                function(e) {
                    return self.opts.id(e)
                }), this.setVal(ids), this.updateSelection(values), this.clearSearch(), undefined)
            }
        }),
        $.fn.select2 = function() {
            var opts, select2, value, multiple, args = Array.prototype.slice.call(arguments, 0),
            allowedMethods = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "disable", "positionDropdown", "data"];
            return this.each(function() {
                if (0 === args.length || "object" == typeof args[0]) opts = 0 === args.length ? {}: $.extend({},
                args[0]),
                opts.element = $(this),
                "select" === opts.element.get(0).tagName.toLowerCase() ? multiple = opts.element.attr("multiple") : (multiple = opts.multiple || !1, "tags" in opts && (opts.multiple = multiple = !0)),
                select2 = multiple ? new MultiSelect2: new SingleSelect2,
                select2.init(opts);
                else {
                    if ("string" != typeof args[0]) throw "Invalid arguments to select2 plugin: " + args;
                    if (0 > indexOf(args[0], allowedMethods)) throw "Unknown method: " + args[0];
                    if (value = undefined, select2 = $(this).data("select2"), select2 === undefined) return;
                    if (value = "container" === args[0] ? select2.container: select2[args[0]].apply(select2, args.slice(1)), value !== undefined) return ! 1
                }
            }),
            value === undefined ? this: value
        },
        $.fn.select2.defaults = {
            width: "copy",
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function(result, container, query) {
                var markup = [];
                return markMatch(result.text, query.term, markup),
                markup.join("")
            },
            formatSelection: function(data) {
                return data ? data.text: undefined
            },
            formatResultCssClass: function() {
                return undefined
            },
            formatNoMatches: function() {
                return "No matches found"
            },
            formatInputTooShort: function(input, min) {
                return "Please enter " + (min - input.length) + " more characters"
            },
            formatSelectionTooBig: function(limit) {
                return "You can only select " + limit + " item" + (1 == limit ? "": "s")
            },
            formatLoadMore: function() {
                return "Loading more results..."
            },
            formatSearching: function() {
                return "Searching..."
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumSelectionSize: 0,
            id: function(e) {
                return e.id
            },
            matcher: function(term, text) {
                return text.toUpperCase().indexOf(term.toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: defaultTokenizer,
            escapeMarkup: function(markup) {
                return markup && "string" == typeof markup ? markup.replace(/&/g, "&amp;") : markup
            },
            blurOnChange: !1
        },
        window.Select2 = {
            query: {
                ajax: ajax,
                local: local,
                tags: tags
            },
            util: {
                debounce: debounce,
                markMatch: markMatch
            },
            "class": {
                "abstract": AbstractSelect2,
                single: SingleSelect2,
                multi: MultiSelect2
            }
        }
    }
} (jQuery),
function(e) {
    "use strict";
    e.localtime = function() {
        var a = {
            localtime: "yyyy-MM-dd HH:mm:ss"
        },
        t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        r = ["th", "st", "nd", "rd"],
        c = function(e) {
            return e >= 13 ? e - 12 : "0" === e ? 12 : e
        },
        s = function(e, s) {
            var i = "" + e.getFullYear(),
            o = "" + (e.getMonth() + 1),
            n = "" + e.getDate(),
            l = "" + e.getHours(),
            b = "" + e.getMinutes(),
            u = "" + e.getSeconds(),
            m = "" + e.getMilliseconds(),
            f = e.getTimezoneOffset(),
            d = f > 0 ? "-": "+";
            if (f = Math.abs(f), void 0 === s) {
                var h;
                for (h in a) if (a.hasOwnProperty(h)) {
                    s = a[h];
                    break
                }
                if (void 0 === s) return "" + e
            }
            for (var k = "",
            g = "",
            p = 0; s.length > p; p++) if (g += s.charAt(p), "'" === g) for (p++; s.length > p; p++) {
                var M = s.charAt(p);
                if ("'" === M) {
                    g = "";
                    break
                }
                k += M
            } else if ("\\" === g && s.length - 1 > p && "'" === s.charAt(p + 1)) p++,
            k += "'",
            g = "";
            else if (p === s.length - 1 || s.charAt(p) !== s.charAt(p + 1)) {
                switch (g) {
                case "d":
                    k += n;
                    break;
                case "dd":
                    k += ("0" + n).slice( - 2);
                    break;
                case "M":
                    k += o;
                    break;
                case "MM":
                    k += ("0" + o).slice( - 2);
                    break;
                case "MMM":
                    k += t[o - 1].substr(0, 3);
                    break;
                case "MMMMM":
                    k += t[o - 1];
                    break;
                case "yy":
                    k += i.slice( - 2);
                    break;
                case "yyyy":
                    k += i;
                    break;
                case "H":
                    k += l;
                    break;
                case "HH":
                    k += ("0" + l).slice( - 2);
                    break;
                case "h":
                    k += c(l);
                    break;
                case "hh":
                    k += ("0" + c(l)).slice( - 2);
                    break;
                case "m":
                    k += b;
                    break;
                case "mm":
                    k += ("0" + b).slice( - 2);
                    break;
                case "s":
                    k += u;
                    break;
                case "ss":
                    k += ("0" + u).slice( - 2);
                    break;
                case "S":
                    k += m;
                    break;
                case "SS":
                    k += ("0" + m).slice( - 2);
                    break;
                case "SSS":
                    k += ("00" + m).slice( - 3);
                    break;
                case "o":
                    switch (n) {
                    case "11":
                    case "12":
                    case "13":
                        k += r[0];
                        break;
                    default:
                        var y = n % 10;
                        y > 3 && (y = 0),
                        k += r[y]
                    }
                    break;
                case "a":
                case "tt":
                    k += l >= 12 ? "PM": "AM";
                    break;
                case "t":
                    k += l >= 12 ? "P": "A";
                    break;
                case "z":
                    k += d + parseInt(f / 60, 10);
                    break;
                case "zz":
                    k += d + ("0" + parseInt(f / 60, 10)).slice( - 2);
                    break;
                case "zzz":
                    k += d + ("0" + parseInt(f / 60, 10)).slice( - 2) + ":" + ("0" + f % 60).slice( - 2);
                    break;
                default:
                    k += g
                }
                g = ""
            }
            return k
        };
        return {
            setFormat: function(e) {
                a = "object" == typeof e ? e: {
                    localtime: e
                }
            },
            getFormat: function() {
                return a
            },
            parseISOTimeString: function(a) {
                a = e.trim("" + a);
                var t = /^(\d{4})-([01]\d)-([0-3]\d)[T| ]([0-2]\d):([0-5]\d)(?::([0-5]\d)(?:\.(\d{3}))?)?Z$/.exec(a);
                if (t) {
                    var r = parseInt(t[1], 10),
                    c = parseInt(t[2], 10) - 1,
                    s = parseInt(t[3], 10),
                    i = parseInt(t[4], 10),
                    o = parseInt(t[5], 10),
                    n = t[6] ? parseInt(t[6], 10) : 0,
                    l = t[7] ? parseInt(t[7], 10) : 0,
                    b = new Date(Date.UTC(r, c, s, i, o, n, l));
                    if (b.getUTCFullYear() !== r || b.getUTCMonth() !== c || b.getUTCDate() !== s) throw Error(t[1] + "-" + t[2] + "-" + t[3] + " is not a valid date");
                    if (b.getUTCHours() !== i) throw Error(t[4] + ":" + t[5] + " is not a valid time");
                    return b
                }
                throw Error(a + " is not a supported date/time string")
            },
            toLocalTime: function(a, t) {
                return "[object Date]" !== Object.prototype.toString.call(a) && (a = e.localtime.parseISOTimeString(a)),
                "" === t && (t = void 0),
                s(a, t)
            },
            formatObject: function(a, t) {
                a.is(":input") ? a.val(e.localtime.toLocalTime(a.val(), t)) : a.text(e.localtime.toLocalTime(a.text(), t))
            },
            formatPage: function() {
                var a, t, r = function() {
                    e.localtime.formatObject(e(this), a)
                },
                c = e.localtime.getFormat();
                for (t in c) c.hasOwnProperty(t) && (a = c[t], e("." + t).each(r));
                e("[data-localtime-format]").each(function() {
                    e.localtime.formatObject(e(this), e(this).attr("data-localtime-format"))
                })
            }
        }
    } ()
} (jQuery),
jQuery(document).ready(function(e) {
    "use strict";
    e.localtime.formatPage()
}),
function(e, t) {
    function i(t, n) {
        var r, i, o, u = t.nodeName.toLowerCase();
        return "area" === u ? (r = t.parentNode, i = r.name, t.href && i && "map" === r.nodeName.toLowerCase() ? (o = e("img[usemap=#" + i + "]")[0], !!o && s(o)) : !1) : (/input|select|textarea|button|object/.test(u) ? !t.disabled: "a" === u ? t.href || n: n) && s(t)
    }
    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function() {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    var n = 0,
    r = /^ui-id-\d+$/;
    e.ui = e.ui || {},
    e.ui.version || (e.extend(e.ui, {
        version: "1.9.2",
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
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        _focus: e.fn.focus,
        focus: function(t, n) {
            return "number" == typeof t ? this.each(function() {
                var r = this;
                setTimeout(function() {
                    e(r).focus(),
                    n && n.call(r)
                },
                t)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0),
            /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function(n) {
            if (n !== t) return this.css("zIndex", n);
            if (this.length) for (var i, s, r = e(this[0]); r.length && r[0] !== document;) {
                if (i = r.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(r.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                r = r.parent()
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++n)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                r.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(n) {
                return !! e.data(n, t)
            }
        }) : function(t, n, r) {
            return !! e.data(t, r[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var n = e.attr(t, "tabindex"),
            r = isNaN(n);
            return (r || n >= 0) && i(t, !r)
        }
    }), e(function() {
        var t = document.body,
        n = t.appendChild(n = document.createElement("div"));
        n.offsetHeight,
        e.extend(n.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }),
        e.support.minHeight = 100 === n.offsetHeight,
        e.support.selectstart = "onselectstart" in n,
        t.removeChild(n).style.display = "none"
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"],
    function(n, r) {
        function u(t, n, r, s) {
            return e.each(i,
            function() {
                n -= parseFloat(e.css(t, "padding" + this)) || 0,
                r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
            }),
            n
        }
        var i = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"],
        s = r.toLowerCase(),
        o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight
        };
        e.fn["inner" + r] = function(n) {
            return n === t ? o["inner" + r].call(this) : this.each(function() {
                e(this).css(s, u(this, n) + "px")
            })
        },
        e.fn["outer" + r] = function(t, n) {
            return "number" != typeof t ? o["outer" + r].call(this, t) : this.each(function() {
                e(this).css(s, u(this, t, !0, n) + "px")
            })
        }
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(n) {
            return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
        }
    } (e.fn.removeData)),
    function() {
        var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        e.ui.ie = t.length ? !0 : !1,
        e.ui.ie6 = 6 === parseFloat(t[1], 10)
    } (), e.fn.extend({
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
            function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), e.extend(e.ui, {
        plugin: {
            add: function(t, n, r) {
                var i, s = e.ui[t].prototype;
                for (i in r) s.plugins[i] = s.plugins[i] || [],
                s.plugins[i].push([n, r[i]])
            },
            call: function(e, t, n) {
                var r, i = e.plugins[t];
                if (i && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (r = 0; i.length > r; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
            }
        },
        contains: e.contains,
        hasScroll: function(t, n) {
            if ("hidden" === e(t).css("overflow")) return ! 1;
            var r = n && "left" === n ? "scrollLeft": "scrollTop",
            i = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
        },
        isOverAxis: function(e, t, n) {
            return e > t && t + n > e
        },
        isOver: function(t, n, r, i, s, o) {
            return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
        }
    }))
} (jQuery),
function(e, t) {
    var n = 0,
    r = Array.prototype.slice,
    i = e.cleanData;
    e.cleanData = function(t) {
        for (var r, n = 0; null != (r = t[n]); n++) try {
            e(r).triggerHandler("remove")
        } catch(s) {}
        i(t)
    },
    e.widget = function(t, n, r) {
        var i, s, o, u, a = t.split(".")[0];
        t = t.split(".")[1],
        i = a + "-" + t,
        r || (r = n, n = e.Widget),
        e.expr[":"][i.toLowerCase()] = function(t) {
            return !! e.data(t, i)
        },
        e[a] = e[a] || {},
        s = e[a][t],
        o = e[a][t] = function(e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
        },
        e.extend(o, s, {
            version: r.version,
            _proto: e.extend({},
            r),
            _childConstructors: []
        }),
        u = new n,
        u.options = e.widget.extend({},
        u.options),
        e.each(r,
        function(t, i) {
            e.isFunction(i) && (r[t] = function() {
                var e = function() {
                    return n.prototype[t].apply(this, arguments)
                },
                r = function(e) {
                    return n.prototype[t].apply(this, e)
                };
                return function() {
                    var s, t = this._super,
                    n = this._superApply;
                    return this._super = e,
                    this._superApply = r,
                    s = i.apply(this, arguments),
                    this._super = t,
                    this._superApply = n,
                    s
                }
            } ())
        }),
        o.prototype = e.widget.extend(u, {
            widgetEventPrefix: s ? u.widgetEventPrefix: t
        },
        r, {
            constructor: o,
            namespace: a,
            widgetName: t,
            widgetBaseClass: i,
            widgetFullName: i
        }),
        s ? (e.each(s._childConstructors,
        function(t, n) {
            var r = n.prototype;
            e.widget(r.namespace + "." + r.widgetName, o, n._proto)
        }), delete s._childConstructors) : n._childConstructors.push(o),
        e.widget.bridge(t, o)
    },
    e.widget.extend = function(n) {
        for (var u, a, i = r.call(arguments, 1), s = 0, o = i.length; o > s; s++) for (u in i[s]) a = i[s][u],
        i[s].hasOwnProperty(u) && a !== t && (n[u] = e.isPlainObject(a) ? e.isPlainObject(n[u]) ? e.widget.extend({},
        n[u], a) : e.widget.extend({},
        a) : a);
        return n
    },
    e.widget.bridge = function(n, i) {
        var s = i.prototype.widgetFullName || n;
        e.fn[n] = function(o) {
            var u = "string" == typeof o,
            a = r.call(arguments, 1),
            f = this;
            return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o,
            u ? this.each(function() {
                var r, i = e.data(this, s);
                return i ? e.isFunction(i[o]) && "_" !== o.charAt(0) ? (r = i[o].apply(i, a), r !== i && r !== t ? (f = r && r.jquery ? f.pushStack(r.get()) : r, !1) : void 0) : e.error("no such method '" + o + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'")
            }) : this.each(function() {
                var t = e.data(this, s);
                t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
            }),
            f
        }
    },
    e.Widget = function() {},
    e.Widget._childConstructors = [],
    e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, r) {
            r = e(r || this.defaultElement || this)[0],
            this.element = e(r),
            this.uuid = n++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.options = e.widget.extend({},
            this.options, this._getCreateOptions(), t),
            this.bindings = e(),
            this.hoverable = e(),
            this.focusable = e(),
            r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === r && this.destroy()
                }
            }), this.document = e(r.style ? r.ownerDocument: r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(n, r) {
            var s, o, u, i = n;
            if (0 === arguments.length) return e.widget.extend({},
            this.options);
            if ("string" == typeof n) if (i = {},
            s = n.split("."), n = s.shift(), s.length) {
                for (o = i[n] = e.widget.extend({},
                this.options[n]), u = 0; s.length - 1 > u; u++) o[s[u]] = o[s[u]] || {},
                o = o[s[u]];
                if (n = s.pop(), r === t) return o[n] === t ? null: o[n];
                o[n] = r
            } else {
                if (r === t) return this.options[n] === t ? null: this.options[n];
                i[n] = r
            }
            return this._setOptions(i),
            this
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t,
            "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")),
            this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(t, n, r) {
            var i, s = this;
            "boolean" != typeof t && (r = n, n = t, t = !1),
            r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()),
            e.each(r,
            function(r, o) {
                function u() {
                    return t || s.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? s[o] : o).apply(s, arguments) : void 0
                }
                "string" != typeof o && (u.guid = o.guid = o.guid || u.guid || e.guid++);
                var a = r.match(/^(\w+)\s*(.*)$/),
                f = a[1] + s.eventNamespace,
                l = a[2];
                l ? i.delegate(l, f, u) : n.bind(f, u)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.unbind(t).undelegate(t)
        },
        _delay: function(e, t) {
            function n() {
                return ("string" == typeof e ? r[e] : e).apply(r, arguments)
            }
            var r = this;
            return setTimeout(n, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t),
            this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t),
            this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, n, r) {
            var i, s, o = this.options[t];
            if (r = r || {},
            n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t: this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent, s) for (i in s) i in n || (n[i] = s[i]);
            return this.element.trigger(n, r),
            !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
        }
    },
    e.each({
        show: "fadeIn",
        hide: "fadeOut"
    },
    function(t, n) {
        e.Widget.prototype["_" + t] = function(r, i, s) {
            "string" == typeof i && (i = {
                effect: i
            });
            var o, u = i ? i === !0 || "number" == typeof i ? n: i.effect || n: t;
            i = i || {},
            "number" == typeof i && (i = {
                duration: i
            }),
            o = !e.isEmptyObject(i),
            i.complete = s,
            i.delay && r.delay(i.delay),
            o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
                e(this)[t](),
                s && s.call(r[0]),
                n()
            })
        }
    }),
    e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function() {
        return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
    })
} (jQuery),
function(e, t) {
    function h(e, t, n) {
        return [parseInt(e[0], 10) * (l.test(e[0]) ? t / 100 : 1), parseInt(e[1], 10) * (l.test(e[1]) ? n / 100 : 1)]
    }
    function p(t, n) {
        return parseInt(e.css(t, n), 10) || 0
    }
    e.ui = e.ui || {};
    var n, r = Math.max,
    i = Math.abs,
    s = Math.round,
    o = /left|center|right/,
    u = /top|center|bottom/,
    a = /[\+\-]\d+%?/,
    f = /^\w+/,
    l = /%$/,
    c = e.fn.position;
    e.position = {
        scrollbarWidth: function() {
            if (n !== t) return n;
            var r, i, s = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
            o = s.children()[0];
            return e("body").append(s),
            r = o.offsetWidth,
            s.css("overflow", "scroll"),
            i = o.offsetWidth,
            r === i && (i = s[0].clientWidth),
            s.remove(),
            n = r - i
        },
        getScrollInfo: function(t) {
            var n = t.isWindow ? "": t.element.css("overflow-x"),
            r = t.isWindow ? "": t.element.css("overflow-y"),
            i = "scroll" === n || "auto" === n && t.width < t.element[0].scrollWidth,
            s = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
            return {
                width: i ? e.position.scrollbarWidth() : 0,
                height: s ? e.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var n = e(t || window),
            r = e.isWindow(n[0]);
            return {
                element: n,
                isWindow: r,
                offset: n.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: n.scrollLeft(),
                scrollTop: n.scrollTop(),
                width: r ? n.width() : n.outerWidth(),
                height: r ? n.height() : n.outerHeight()
            }
        }
    },
    e.fn.position = function(t) {
        if (!t || !t.of) return c.apply(this, arguments);
        t = e.extend({},
        t);
        var n, l, d, v, m, g = e(t.of),
        y = e.position.getWithinInfo(t.within),
        b = e.position.getScrollInfo(y),
        w = g[0],
        E = (t.collision || "flip").split(" "),
        S = {};
        return 9 === w.nodeType ? (l = g.width(), d = g.height(), v = {
            top: 0,
            left: 0
        }) : e.isWindow(w) ? (l = g.width(), d = g.height(), v = {
            top: g.scrollTop(),
            left: g.scrollLeft()
        }) : w.preventDefault ? (t.at = "left top", l = d = 0, v = {
            top: w.pageY,
            left: w.pageX
        }) : (l = g.outerWidth(), d = g.outerHeight(), v = g.offset()),
        m = e.extend({},
        v),
        e.each(["my", "at"],
        function() {
            var n, r, e = (t[this] || "").split(" ");
            1 === e.length && (e = o.test(e[0]) ? e.concat(["center"]) : u.test(e[0]) ? ["center"].concat(e) : ["center", "center"]),
            e[0] = o.test(e[0]) ? e[0] : "center",
            e[1] = u.test(e[1]) ? e[1] : "center",
            n = a.exec(e[0]),
            r = a.exec(e[1]),
            S[this] = [n ? n[0] : 0, r ? r[0] : 0],
            t[this] = [f.exec(e[0])[0], f.exec(e[1])[0]]
        }),
        1 === E.length && (E[1] = E[0]),
        "right" === t.at[0] ? m.left += l: "center" === t.at[0] && (m.left += l / 2),
        "bottom" === t.at[1] ? m.top += d: "center" === t.at[1] && (m.top += d / 2),
        n = h(S.at, l, d),
        m.left += n[0],
        m.top += n[1],
        this.each(function() {
            var o, u, a = e(this),
            f = a.outerWidth(),
            c = a.outerHeight(),
            w = p(this, "marginLeft"),
            x = p(this, "marginTop"),
            T = f + w + p(this, "marginRight") + b.width,
            N = c + x + p(this, "marginBottom") + b.height,
            C = e.extend({},
            m),
            k = h(S.my, a.outerWidth(), a.outerHeight());
            "right" === t.my[0] ? C.left -= f: "center" === t.my[0] && (C.left -= f / 2),
            "bottom" === t.my[1] ? C.top -= c: "center" === t.my[1] && (C.top -= c / 2),
            C.left += k[0],
            C.top += k[1],
            e.support.offsetFractions || (C.left = s(C.left), C.top = s(C.top)),
            o = {
                marginLeft: w,
                marginTop: x
            },
            e.each(["left", "top"],
            function(r, i) {
                e.ui.position[E[r]] && e.ui.position[E[r]][i](C, {
                    targetWidth: l,
                    targetHeight: d,
                    elemWidth: f,
                    elemHeight: c,
                    collisionPosition: o,
                    collisionWidth: T,
                    collisionHeight: N,
                    offset: [n[0] + k[0], n[1] + k[1]],
                    my: t.my,
                    at: t.at,
                    within: y,
                    elem: a
                })
            }),
            e.fn.bgiframe && a.bgiframe(),
            t.using && (u = function(e) {
                var n = v.left - C.left,
                s = n + l - f,
                o = v.top - C.top,
                u = o + d - c,
                h = {
                    target: {
                        element: g,
                        left: v.left,
                        top: v.top,
                        width: l,
                        height: d
                    },
                    element: {
                        element: a,
                        left: C.left,
                        top: C.top,
                        width: f,
                        height: c
                    },
                    horizontal: 0 > s ? "left": n > 0 ? "right": "center",
                    vertical: 0 > u ? "top": o > 0 ? "bottom": "middle"
                };
                f > l && l > i(n + s) && (h.horizontal = "center"),
                c > d && d > i(o + u) && (h.vertical = "middle"),
                h.important = r(i(n), i(s)) > r(i(o), i(u)) ? "horizontal": "vertical",
                t.using.call(this, e, h)
            }),
            a.offset(e.extend(C, {
                using: u
            }))
        })
    },
    e.ui.position = {
        fit: {
            left: function(e, t) {
                var f, n = t.within,
                i = n.isWindow ? n.scrollLeft: n.offset.left,
                s = n.width,
                o = e.left - t.collisionPosition.marginLeft,
                u = i - o,
                a = o + t.collisionWidth - s - i;
                t.collisionWidth > s ? u > 0 && 0 >= a ? (f = e.left + u + t.collisionWidth - s - i, e.left += u - f) : e.left = a > 0 && 0 >= u ? i: u > a ? i + s - t.collisionWidth: i: u > 0 ? e.left += u: a > 0 ? e.left -= a: e.left = r(e.left - o, e.left)
            },
            top: function(e, t) {
                var f, n = t.within,
                i = n.isWindow ? n.scrollTop: n.offset.top,
                s = t.within.height,
                o = e.top - t.collisionPosition.marginTop,
                u = i - o,
                a = o + t.collisionHeight - s - i;
                t.collisionHeight > s ? u > 0 && 0 >= a ? (f = e.top + u + t.collisionHeight - s - i, e.top += u - f) : e.top = a > 0 && 0 >= u ? i: u > a ? i + s - t.collisionHeight: i: u > 0 ? e.top += u: a > 0 ? e.top -= a: e.top = r(e.top - o, e.top)
            }
        },
        flip: {
            left: function(e, t) {
                var p, d, n = t.within,
                r = n.offset.left + n.scrollLeft,
                s = n.width,
                o = n.isWindow ? n.scrollLeft: n.offset.left,
                u = e.left - t.collisionPosition.marginLeft,
                a = u - o,
                f = u + t.collisionWidth - s - o,
                l = "left" === t.my[0] ? -t.elemWidth: "right" === t.my[0] ? t.elemWidth: 0,
                c = "left" === t.at[0] ? t.targetWidth: "right" === t.at[0] ? -t.targetWidth: 0,
                h = -2 * t.offset[0];
                0 > a ? (p = e.left + l + c + h + t.collisionWidth - s - r, (0 > p || i(a) > p) && (e.left += l + c + h)) : f > 0 && (d = e.left - t.collisionPosition.marginLeft + l + c + h - o, (d > 0 || f > i(d)) && (e.left += l + c + h))
            },
            top: function(e, t) {
                var d, v, n = t.within,
                r = n.offset.top + n.scrollTop,
                s = n.height,
                o = n.isWindow ? n.scrollTop: n.offset.top,
                u = e.top - t.collisionPosition.marginTop,
                a = u - o,
                f = u + t.collisionHeight - s - o,
                l = "top" === t.my[1],
                c = l ? -t.elemHeight: "bottom" === t.my[1] ? t.elemHeight: 0,
                h = "top" === t.at[1] ? t.targetHeight: "bottom" === t.at[1] ? -t.targetHeight: 0,
                p = -2 * t.offset[1];
                0 > a ? (v = e.top + c + h + p + t.collisionHeight - s - r, e.top + c + h + p > a && (0 > v || i(a) > v) && (e.top += c + h + p)) : f > 0 && (d = e.top - t.collisionPosition.marginTop + c + h + p - o, e.top + c + h + p > f && (d > 0 || f > i(d)) && (e.top += c + h + p))
            }
        },
        flipfit: {
            left: function() {
                e.ui.position.flip.left.apply(this, arguments),
                e.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                e.ui.position.flip.top.apply(this, arguments),
                e.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function() {
        var t, n, r, i, s, o = document.getElementsByTagName("body")[0],
        u = document.createElement("div");
        t = document.createElement(o ? "div": "body"),
        r = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        },
        o && e.extend(r, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (s in r) t.style[s] = r[s];
        t.appendChild(u),
        n = o || document.documentElement,
        n.insertBefore(t, n.firstChild),
        u.style.cssText = "position: absolute; left: 10.7432222px;",
        i = e(u).offset().left,
        e.support.offsetFractions = i > 10 && 11 > i,
        t.innerHTML = "",
        n.removeChild(t)
    } (),
    e.uiBackCompat !== !1 &&
    function(e) {
        var n = e.fn.position;
        e.fn.position = function(r) {
            if (!r || !r.offset) return n.call(this, r);
            var i = r.offset.split(" "),
            s = r.at.split(" ");
            return 1 === i.length && (i[1] = i[0]),
            /^\d/.test(i[0]) && (i[0] = "+" + i[0]),
            /^\d/.test(i[1]) && (i[1] = "+" + i[1]),
            1 === s.length && (/left|center|right/.test(s[0]) ? s[1] = "center": (s[1] = s[0], s[0] = "center")),
            n.call(this, e.extend(r, {
                at: s[0] + i[0] + " " + s[1] + i[1],
                offset: t
            }))
        }
    } (jQuery)
} (jQuery),
function(e) {
    var n = 0;
    e.widget("ui.autocomplete", {
        version: "1.9.2",
        defaultElement: "<input>",
        options: {
            appendTo: "body",
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function() {
            var t, n, r;
            this.isMultiLine = this._isMultiLine(),
            this.valueMethod = this.element[this.element.is("input,textarea") ? "val": "text"],
            this.isNewMenu = !0,
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
            this._on(this.element, {
                keydown: function(i) {
                    if (this.element.prop("readOnly")) return t = !0,
                    r = !0,
                    n = !0,
                    void 0;
                    t = !1,
                    r = !1,
                    n = !1;
                    var s = e.ui.keyCode;
                    switch (i.keyCode) {
                    case s.PAGE_UP:
                        t = !0,
                        this._move("previousPage", i);
                        break;
                    case s.PAGE_DOWN:
                        t = !0,
                        this._move("nextPage", i);
                        break;
                    case s.UP:
                        t = !0,
                        this._keyEvent("previous", i);
                        break;
                    case s.DOWN:
                        t = !0,
                        this._keyEvent("next", i);
                        break;
                    case s.ENTER:
                    case s.NUMPAD_ENTER:
                        this.menu.active && (t = !0, i.preventDefault(), this.menu.select(i));
                        break;
                    case s.TAB:
                        this.menu.active && this.menu.select(i);
                        break;
                    case s.ESCAPE:
                        this.menu.element.is(":visible") && (this._value(this.term), this.close(i), i.preventDefault());
                        break;
                    default:
                        n = !0,
                        this._searchTimeout(i)
                    }
                },
                keypress: function(r) {
                    if (t) return t = !1,
                    r.preventDefault(),
                    void 0;
                    if (!n) {
                        var i = e.ui.keyCode;
                        switch (r.keyCode) {
                        case i.PAGE_UP:
                            this._move("previousPage", r);
                            break;
                        case i.PAGE_DOWN:
                            this._move("nextPage", r);
                            break;
                        case i.UP:
                            this._keyEvent("previous", r);
                            break;
                        case i.DOWN:
                            this._keyEvent("next", r)
                        }
                    }
                },
                input: function(e) {
                    return r ? (r = !1, e.preventDefault(), void 0) : (this._searchTimeout(e), void 0)
                },
                focus: function() {
                    this.selectedItem = null,
                    this.previous = this._value()
                },
                blur: function(e) {
                    return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(e), this._change(e), void 0)
                }
            }),
            this._initSource(),
            this.menu = e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo || "body")[0]).menu({
                input: e(),
                role: null
            }).zIndex(this.element.zIndex() + 1).hide().data("menu"),
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault(),
                    this.cancelBlur = !0,
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var n = this.menu.element[0];
                    e(t.target).closest(".ui-menu-item").length || this._delay(function() {
                        var t = this;
                        this.document.one("mousedown",
                        function(r) {
                            r.target !== t.element[0] && r.target !== n && !e.contains(n, r.target) && t.close()
                        })
                    })
                },
                menufocus: function(t, n) {
                    if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(),
                    this.document.one("mousemove",
                    function() {
                        e(t.target).trigger(t.originalEvent)
                    }),
                    void 0;
                    var r = n.item.data("ui-autocomplete-item") || n.item.data("item.autocomplete"); ! 1 !== this._trigger("focus", t, {
                        item: r
                    }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
                },
                menuselect: function(e, t) {
                    var n = t.item.data("ui-autocomplete-item") || t.item.data("item.autocomplete"),
                    r = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function() {
                        this.previous = r,
                        this.selectedItem = n
                    })),
                    !1 !== this._trigger("select", e, {
                        item: n
                    }) && this._value(n.value),
                    this.term = this._value(),
                    this.close(e),
                    this.selectedItem = n
                }
            }),
            this.liveRegion = e("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertAfter(this.element),
            e.fn.bgiframe && this.menu.element.bgiframe(),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching),
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove()
        },
        _setOption: function(e, t) {
            this._super(e, t),
            "source" === e && this._initSource(),
            "appendTo" === e && this.menu.element.appendTo(this.document.find(t || "body")[0]),
            "disabled" === e && t && this.xhr && this.xhr.abort()
        },
        _isMultiLine: function() {
            return this.element.is("textarea") ? !0 : this.element.is("input") ? !1 : this.element.prop("isContentEditable")
        },
        _initSource: function() {
            var t, n, r = this;
            e.isArray(this.options.source) ? (t = this.options.source, this.source = function(n, r) {
                r(e.ui.autocomplete.filter(t, n.term))
            }) : "string" == typeof this.options.source ? (n = this.options.source, this.source = function(t, i) {
                r.xhr && r.xhr.abort(),
                r.xhr = e.ajax({
                    url: n,
                    data: t,
                    dataType: "json",
                    success: function(e) {
                        i(e)
                    },
                    error: function() {
                        i([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(e) {
            clearTimeout(this.searching),
            this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, e))
            },
            this.options.delay)
        },
        search: function(e, t) {
            return e = null != e ? e: this._value(),
            this.term = this._value(),
            e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : void 0
        },
        _search: function(e) {
            this.pending++,
            this.element.addClass("ui-autocomplete-loading"),
            this.cancelSearch = !1,
            this.source({
                term: e
            },
            this._response())
        },
        _response: function() {
            var e = this,
            t = ++n;
            return function(r) {
                t === n && e.__response(r),
                e.pending--,
                e.pending || e.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function(e) {
            e && (e = this._normalize(e)),
            this._trigger("response", null, {
                content: e
            }),
            !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
        },
        close: function(e) {
            this.cancelSearch = !0,
            this._close(e)
        },
        _close: function(e) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
        },
        _change: function(e) {
            this.previous !== this._value() && this._trigger("change", e, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t: e.map(t,
            function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                }: e.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                },
                t)
            })
        },
        _suggest: function(t) {
            var n = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(n, t),
            this.menu.refresh(),
            n.show(),
            this._resizeMenu(),
            n.position(e.extend({
                of: this.element
            },
            this.options.position)),
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, n) {
            var r = this;
            e.each(n,
            function(e, n) {
                r._renderItemData(t, n)
            })
        },
        _renderItemData: function(e, t) {
            return this._renderItem(e, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function(t, n) {
            return e("<li>").append(e("<a>").text(n.label)).appendTo(t)
        },
        _move: function(e, t) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this._value(this.term), this.menu.blur(), void 0) : (this.menu[e](t), void 0) : (this.search(null, t), void 0)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(e, t) { (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
        }
    }),
    e.extend(e.ui.autocomplete, {
        escapeRegex: function(e) {
            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, n) {
            var r = RegExp(e.ui.autocomplete.escapeRegex(n), "i");
            return e.grep(t,
            function(e) {
                return r.test(e.label || e.value || e)
            })
        }
    }),
    e.widget("ui.autocomplete", e.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(e) {
                    return e + (e > 1 ? " results are": " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(e) {
            var t;
            this._superApply(arguments),
            this.options.disabled || this.cancelSearch || (t = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.text(t))
        }
    })
} (jQuery),
function($, undefined) {
    function Datepicker() {
        this.debug = !1,
        this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
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
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        },
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
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
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        },
        $.extend(this._defaults, this.regional[""]),
        this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }
    function bindHover(e) {
        var t = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(t, "mouseout",
        function() {
            $(this).removeClass("ui-state-hover"),
            -1 != this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"),
            -1 != this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
        }).delegate(t, "mouseover",
        function() {
            $.datepicker._isDisabledDatepicker(instActive.inline ? e.parent()[0] : instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), $(this).addClass("ui-state-hover"), -1 != this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"), -1 != this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
        })
    }
    function extendRemove(e, t) {
        $.extend(e, t);
        for (var n in t)(null == t[n] || t[n] == undefined) && (e[n] = t[n]);
        return e
    }
    $.extend($.ui, {
        datepicker: {
            version: "1.9.2"
        }
    });
    var PROP_NAME = "datepicker",
    dpuuid = (new Date).getTime(),
    instActive;
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function() {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(e) {
            return extendRemove(this._defaults, e || {}),
            this
        },
        _attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch(err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase(),
            inline = "div" == nodeName || "span" == nodeName;
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({},
            settings || {},
            inlineSettings || {}),
            "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function(e, t) {
            var n = e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: n,
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: t,
                dpDiv: t ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
            }
        },
        _connectDatepicker: function(e, t) {
            var n = $(e);
            t.append = $([]),
            t.trigger = $([]),
            n.hasClass(this.markerClassName) || (this._attachments(n, t), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",
            function(e, n, r) {
                t.settings[n] = r
            }).bind("getData.datepicker",
            function(e, n) {
                return this._get(t, n)
            }), this._autoSize(t), $.data(e, PROP_NAME, t), t.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function(e, t) {
            var n = this._get(t, "appendText"),
            r = this._get(t, "isRTL");
            t.append && t.append.remove(),
            n && (t.append = $('<span class="' + this._appendClass + '">' + n + "</span>"), e[r ? "before": "after"](t.append)),
            e.unbind("focus", this._showDatepicker),
            t.trigger && t.trigger.remove();
            var i = this._get(t, "showOn");
            if (("focus" == i || "both" == i) && e.focus(this._showDatepicker), "button" == i || "both" == i) {
                var s = this._get(t, "buttonText"),
                o = this._get(t, "buttonImage");
                t.trigger = $(this._get(t, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: o,
                    alt: s,
                    title: s
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == o ? s: $("<img/>").attr({
                    src: o,
                    alt: s,
                    title: s
                }))),
                e[r ? "before": "after"](t.trigger),
                t.trigger.click(function() {
                    return $.datepicker._datepickerShowing && $.datepicker._lastInput == e[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != e[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(e[0])) : $.datepicker._showDatepicker(e[0]),
                    !1
                })
            }
        },
        _autoSize: function(e) {
            if (this._get(e, "autoSize") && !e.inline) {
                var t = new Date(2009, 11, 20),
                n = this._get(e, "dateFormat");
                if (n.match(/[DM]/)) {
                    var r = function(e) {
                        for (var t = 0,
                        n = 0,
                        r = 0; e.length > r; r++) e[r].length > t && (t = e[r].length, n = r);
                        return n
                    };
                    t.setMonth(r(this._get(e, n.match(/MM/) ? "monthNames": "monthNamesShort"))),
                    t.setDate(r(this._get(e, n.match(/DD/) ? "dayNames": "dayNamesShort")) + 20 - t.getDay())
                }
                e.input.attr("size", this._formatDate(e, t).length)
            }
        },
        _inlineDatepicker: function(e, t) {
            var n = $(e);
            n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker",
            function(e, n, r) {
                t.settings[n] = r
            }).bind("getData.datepicker",
            function(e, n) {
                return this._get(t, n)
            }), $.data(e, PROP_NAME, t), this._setDate(t, this._getDefaultDate(t), !0), this._updateDatepicker(t), this._updateAlternate(t), t.settings.disabled && this._disableDatepicker(e), t.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(e, t, n, r, i) {
            var s = this._dialogInst;
            if (!s) {
                this.uuid += 1;
                var o = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + o + '" style="position: absolute; top: -100px; width: 0px;"/>'),
                this._dialogInput.keydown(this._doKeyDown),
                $("body").append(this._dialogInput),
                s = this._dialogInst = this._newInst(this._dialogInput, !1),
                s.settings = {},
                $.data(this._dialogInput[0], PROP_NAME, s)
            }
            if (extendRemove(s.settings, r || {}), t = t && t.constructor == Date ? this._formatDate(s, t) : t, this._dialogInput.val(t), this._pos = i ? i.length ? i: [i.pageX, i.pageY] : null, !this._pos) {
                var u = document.documentElement.clientWidth,
                a = document.documentElement.clientHeight,
                f = document.documentElement.scrollLeft || document.body.scrollLeft,
                l = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [u / 2 - 100 + f, a / 2 - 150 + l]
            }
            return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
            s.settings.onSelect = n,
            this._inDialog = !0,
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            $.blockUI && $.blockUI(this.dpDiv),
            $.data(this._dialogInput[0], PROP_NAME, s),
            this
        },
        _destroyDatepicker: function(e) {
            var t = $(e),
            n = $.data(e, PROP_NAME);
            if (t.hasClass(this.markerClassName)) {
                var r = e.nodeName.toLowerCase();
                $.removeData(e, PROP_NAME),
                "input" == r ? (n.append.remove(), n.trigger.remove(), t.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == r || "span" == r) && t.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function(e) {
            var t = $(e),
            n = $.data(e, PROP_NAME);
            if (t.hasClass(this.markerClassName)) {
                var r = e.nodeName.toLowerCase();
                if ("input" == r) e.disabled = !1,
                n.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                });
                else if ("div" == r || "span" == r) {
                    var i = t.children("." + this._inlineClass);
                    i.children().removeClass("ui-state-disabled"),
                    i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)
                }
                this._disabledInputs = $.map(this._disabledInputs,
                function(t) {
                    return t == e ? null: t
                })
            }
        },
        _disableDatepicker: function(e) {
            var t = $(e),
            n = $.data(e, PROP_NAME);
            if (t.hasClass(this.markerClassName)) {
                var r = e.nodeName.toLowerCase();
                if ("input" == r) e.disabled = !0,
                n.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                });
                else if ("div" == r || "span" == r) {
                    var i = t.children("." + this._inlineClass);
                    i.children().addClass("ui-state-disabled"),
                    i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)
                }
                this._disabledInputs = $.map(this._disabledInputs,
                function(t) {
                    return t == e ? null: t
                }),
                this._disabledInputs[this._disabledInputs.length] = e
            }
        },
        _isDisabledDatepicker: function(e) {
            if (!e) return ! 1;
            for (var t = 0; this._disabledInputs.length > t; t++) if (this._disabledInputs[t] == e) return ! 0;
            return ! 1
        },
        _getInst: function(e) {
            try {
                return $.data(e, PROP_NAME)
            } catch(t) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(e, t, n) {
            var r = this._getInst(e);
            if (2 == arguments.length && "string" == typeof t) return "defaults" == t ? $.extend({},
            $.datepicker._defaults) : r ? "all" == t ? $.extend({},
            r.settings) : this._get(r, t) : null;
            var i = t || {};
            if ("string" == typeof t && (i = {},
            i[t] = n), r) {
                this._curInst == r && this._hideDatepicker();
                var s = this._getDateDatepicker(e, !0),
                o = this._getMinMaxDate(r, "min"),
                u = this._getMinMaxDate(r, "max");
                extendRemove(r.settings, i),
                null !== o && i.dateFormat !== undefined && i.minDate === undefined && (r.settings.minDate = this._formatDate(r, o)),
                null !== u && i.dateFormat !== undefined && i.maxDate === undefined && (r.settings.maxDate = this._formatDate(r, u)),
                this._attachments($(e), r),
                this._autoSize(r),
                this._setDate(r, s),
                this._updateAlternate(r),
                this._updateDatepicker(r)
            }
        },
        _changeDatepicker: function(e, t, n) {
            this._optionDatepicker(e, t, n)
        },
        _refreshDatepicker: function(e) {
            var t = this._getInst(e);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(e, t) {
            var n = this._getInst(e);
            n && (this._setDate(n, t), this._updateDatepicker(n), this._updateAlternate(n))
        },
        _getDateDatepicker: function(e, t) {
            var n = this._getInst(e);
            return n && !n.inline && this._setDateFromField(n, t),
            n ? this._getDate(n) : null
        },
        _doKeyDown: function(e) {
            var t = $.datepicker._getInst(e.target),
            n = !0,
            r = t.dpDiv.is(".ui-datepicker-rtl");
            if (t._keyEvent = !0, $.datepicker._datepickerShowing) switch (e.keyCode) {
            case 9:
                $.datepicker._hideDatepicker(),
                n = !1;
                break;
            case 13:
                var i = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", t.dpDiv);
                i[0] && $.datepicker._selectDay(e.target, t.selectedMonth, t.selectedYear, i[0]);
                var s = $.datepicker._get(t, "onSelect");
                if (s) {
                    var o = $.datepicker._formatDate(t);
                    s.apply(t.input ? t.input[0] : null, [o, t])
                } else $.datepicker._hideDatepicker();
                return ! 1;
            case 27:
                $.datepicker._hideDatepicker();
                break;
            case 33:
                $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                break;
            case 34:
                $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                break;
            case 35:
                (e.ctrlKey || e.metaKey) && $.datepicker._clearDate(e.target),
                n = e.ctrlKey || e.metaKey;
                break;
            case 36:
                (e.ctrlKey || e.metaKey) && $.datepicker._gotoToday(e.target),
                n = e.ctrlKey || e.metaKey;
                break;
            case 37:
                (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, r ? 1 : -1, "D"),
                n = e.ctrlKey || e.metaKey,
                e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                break;
            case 38:
                (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, -7, "D"),
                n = e.ctrlKey || e.metaKey;
                break;
            case 39:
                (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, r ? -1 : 1, "D"),
                n = e.ctrlKey || e.metaKey,
                e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                break;
            case 40:
                (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, 7, "D"),
                n = e.ctrlKey || e.metaKey;
                break;
            default:
                n = !1
            } else 36 == e.keyCode && e.ctrlKey ? $.datepicker._showDatepicker(this) : n = !1;
            n && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function(e) {
            var t = $.datepicker._getInst(e.target);
            if ($.datepicker._get(t, "constrainInput")) {
                var n = $.datepicker._possibleChars($.datepicker._get(t, "dateFormat")),
                r = String.fromCharCode(e.charCode == undefined ? e.keyCode: e.charCode);
                return e.ctrlKey || e.metaKey || " " > r || !n || n.indexOf(r) > -1
            }
        },
        _doKeyUp: function(e) {
            var t = $.datepicker._getInst(e.target);
            if (t.input.val() != t.lastVal) try {
                var n = $.datepicker.parseDate($.datepicker._get(t, "dateFormat"), t.input ? t.input.val() : null, $.datepicker._getFormatConfig(t));
                n && ($.datepicker._setDateFromField(t), $.datepicker._updateAlternate(t), $.datepicker._updateDatepicker(t))
            } catch(r) {
                $.datepicker.log(r)
            }
            return ! 0
        },
        _showDatepicker: function(e) {
            if (e = e.target || e, "input" != e.nodeName.toLowerCase() && (e = $("input", e.parentNode)[0]), !$.datepicker._isDisabledDatepicker(e) && $.datepicker._lastInput != e) {
                var t = $.datepicker._getInst(e);
                $.datepicker._curInst && $.datepicker._curInst != t && ($.datepicker._curInst.dpDiv.stop(!0, !0), t && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                var n = $.datepicker._get(t, "beforeShow"),
                r = n ? n.apply(e, [e, t]) : {};
                if (r !== !1) {
                    extendRemove(t.settings, r),
                    t.lastVal = null,
                    $.datepicker._lastInput = e,
                    $.datepicker._setDateFromField(t),
                    $.datepicker._inDialog && (e.value = ""),
                    $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(e), $.datepicker._pos[1] += e.offsetHeight);
                    var i = !1;
                    $(e).parents().each(function() {
                        return i |= "fixed" == $(this).css("position"),
                        !i
                    });
                    var s = {
                        left: $.datepicker._pos[0],
                        top: $.datepicker._pos[1]
                    };
                    if ($.datepicker._pos = null, t.dpDiv.empty(), t.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), $.datepicker._updateDatepicker(t), s = $.datepicker._checkOffset(t, s, i), t.dpDiv.css({
                        position: $.datepicker._inDialog && $.blockUI ? "static": i ? "fixed": "absolute",
                        display: "none",
                        left: s.left + "px",
                        top: s.top + "px"
                    }), !t.inline) {
                        var o = $.datepicker._get(t, "showAnim"),
                        u = $.datepicker._get(t, "duration"),
                        a = function() {
                            var e = t.dpDiv.find("iframe.ui-datepicker-cover");
                            if (e.length) {
                                var n = $.datepicker._getBorders(t.dpDiv);
                                e.css({
                                    left: -n[0],
                                    top: -n[1],
                                    width: t.dpDiv.outerWidth(),
                                    height: t.dpDiv.outerHeight()
                                })
                            }
                        };
                        t.dpDiv.zIndex($(e).zIndex() + 1),
                        $.datepicker._datepickerShowing = !0,
                        $.effects && ($.effects.effect[o] || $.effects[o]) ? t.dpDiv.show(o, $.datepicker._get(t, "showOptions"), u, a) : t.dpDiv[o || "show"](o ? u: null, a),
                        (!o || !u) && a(),
                        t.input.is(":visible") && !t.input.is(":disabled") && t.input.focus(),
                        $.datepicker._curInst = t
                    }
                }
            }
        },
        _updateDatepicker: function(e) {
            this.maxRows = 4;
            var t = $.datepicker._getBorders(e.dpDiv);
            instActive = e,
            e.dpDiv.empty().append(this._generateHTML(e)),
            this._attachHandlers(e);
            var n = e.dpDiv.find("iframe.ui-datepicker-cover"); ! n.length || n.css({
                left: -t[0],
                top: -t[1],
                width: e.dpDiv.outerWidth(),
                height: e.dpDiv.outerHeight()
            }),
            e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var r = this._getNumberOfMonths(e),
            i = r[1],
            s = 17;
            if (e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), i > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + i).css("width", s * i + "em"), e.dpDiv[(1 != r[0] || 1 != r[1] ? "add": "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add": "remove") + "Class"]("ui-datepicker-rtl"), e == $.datepicker._curInst && $.datepicker._datepickerShowing && e.input && e.input.is(":visible") && !e.input.is(":disabled") && e.input[0] != document.activeElement && e.input.focus(), e.yearshtml) {
                var o = e.yearshtml;
                setTimeout(function() {
                    o === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),
                    o = e.yearshtml = null
                },
                0)
            }
        },
        _getBorders: function(e) {
            var t = function(e) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                } [e] || e
            };
            return [parseFloat(t(e.css("border-left-width"))), parseFloat(t(e.css("border-top-width")))]
        },
        _checkOffset: function(e, t, n) {
            var r = e.dpDiv.outerWidth(),
            i = e.dpDiv.outerHeight(),
            s = e.input ? e.input.outerWidth() : 0,
            o = e.input ? e.input.outerHeight() : 0,
            u = document.documentElement.clientWidth + (n ? 0 : $(document).scrollLeft()),
            a = document.documentElement.clientHeight + (n ? 0 : $(document).scrollTop());
            return t.left -= this._get(e, "isRTL") ? r - s: 0,
            t.left -= n && t.left == e.input.offset().left ? $(document).scrollLeft() : 0,
            t.top -= n && t.top == e.input.offset().top + o ? $(document).scrollTop() : 0,
            t.left -= Math.min(t.left, t.left + r > u && u > r ? Math.abs(t.left + r - u) : 0),
            t.top -= Math.min(t.top, t.top + i > a && a > i ? Math.abs(i + o) : 0),
            t
        },
        _findPos: function(e) {
            for (var t = this._getInst(e), n = this._get(t, "isRTL"); e && ("hidden" == e.type || 1 != e.nodeType || $.expr.filters.hidden(e));) e = e[n ? "previousSibling": "nextSibling"];
            var r = $(e).offset();
            return [r.left, r.top]
        },
        _hideDatepicker: function(e) {
            var t = this._curInst;
            if (t && (!e || t == $.data(e, PROP_NAME)) && this._datepickerShowing) {
                var n = this._get(t, "showAnim"),
                r = this._get(t, "duration"),
                i = function() {
                    $.datepicker._tidyDialog(t)
                };
                $.effects && ($.effects.effect[n] || $.effects[n]) ? t.dpDiv.hide(n, $.datepicker._get(t, "showOptions"), r, i) : t.dpDiv["slideDown" == n ? "slideUp": "fadeIn" == n ? "fadeOut": "hide"](n ? r: null, i),
                n || i(),
                this._datepickerShowing = !1;
                var s = this._get(t, "onClose");
                s && s.apply(t.input ? t.input[0] : null, [t.input ? t.input.val() : "", t]),
                this._lastInput = null,
                this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))),
                this._inDialog = !1
            }
        },
        _tidyDialog: function(e) {
            e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(e) {
            if ($.datepicker._curInst) {
                var t = $(e.target),
                n = $.datepicker._getInst(t[0]); (t[0].id != $.datepicker._mainDivId && 0 == t.parents("#" + $.datepicker._mainDivId).length && !t.hasClass($.datepicker.markerClassName) && !t.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || t.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != n) && $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(e, t, n) {
            var r = $(e),
            i = this._getInst(r[0]);
            this._isDisabledDatepicker(r[0]) || (this._adjustInstDate(i, t + ("M" == n ? this._get(i, "showCurrentAtPos") : 0), n), this._updateDatepicker(i))
        },
        _gotoToday: function(e) {
            var t = $(e),
            n = this._getInst(t[0]);
            if (this._get(n, "gotoCurrent") && n.currentDay) n.selectedDay = n.currentDay,
            n.drawMonth = n.selectedMonth = n.currentMonth,
            n.drawYear = n.selectedYear = n.currentYear;
            else {
                var r = new Date;
                n.selectedDay = r.getDate(),
                n.drawMonth = n.selectedMonth = r.getMonth(),
                n.drawYear = n.selectedYear = r.getFullYear()
            }
            this._notifyChange(n),
            this._adjustDate(t)
        },
        _selectMonthYear: function(e, t, n) {
            var r = $(e),
            i = this._getInst(r[0]);
            i["selected" + ("M" == n ? "Month": "Year")] = i["draw" + ("M" == n ? "Month": "Year")] = parseInt(t.options[t.selectedIndex].value, 10),
            this._notifyChange(i),
            this._adjustDate(r)
        },
        _selectDay: function(e, t, n, r) {
            var i = $(e);
            if (!$(r).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(i[0])) {
                var s = this._getInst(i[0]);
                s.selectedDay = s.currentDay = $("a", r).html(),
                s.selectedMonth = s.currentMonth = t,
                s.selectedYear = s.currentYear = n,
                this._selectDate(e, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear))
            }
        },
        _clearDate: function(e) {
            var t = $(e);
            this._getInst(t[0]),
            this._selectDate(t, "")
        },
        _selectDate: function(e, t) {
            var n = $(e),
            r = this._getInst(n[0]);
            t = null != t ? t: this._formatDate(r),
            r.input && r.input.val(t),
            this._updateAlternate(r);
            var i = this._get(r, "onSelect");
            i ? i.apply(r.input ? r.input[0] : null, [t, r]) : r.input && r.input.trigger("change"),
            r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(e) {
            var t = this._get(e, "altField");
            if (t) {
                var n = this._get(e, "altFormat") || this._get(e, "dateFormat"),
                r = this._getDate(e),
                i = this.formatDate(n, r, this._getFormatConfig(e));
                $(t).each(function() {
                    $(this).val(i)
                })
            }
        },
        noWeekends: function(e) {
            var t = e.getDay();
            return [t > 0 && 6 > t, ""]
        },
        iso8601Week: function(e) {
            var t = new Date(e.getTime());
            t.setDate(t.getDate() + 4 - (t.getDay() || 7));
            var n = t.getTime();
            return t.setMonth(0),
            t.setDate(1),
            Math.floor(Math.round((n - t) / 864e5) / 7) + 1
        },
        parseDate: function(e, t, n) {
            if (null == e || null == t) throw "Invalid arguments";
            if (t = "object" == typeof t ? "" + t: t + "", "" == t) return null;
            var r = (n ? n.shortYearCutoff: null) || this._defaults.shortYearCutoff;
            r = "string" != typeof r ? r: (new Date).getFullYear() % 100 + parseInt(r, 10);
            for (var i = (n ? n.dayNamesShort: null) || this._defaults.dayNamesShort, s = (n ? n.dayNames: null) || this._defaults.dayNames, o = (n ? n.monthNamesShort: null) || this._defaults.monthNamesShort, u = (n ? n.monthNames: null) || this._defaults.monthNames, a = -1, f = -1, l = -1, c = -1, h = !1, p = function(t) {
                var n = e.length > y + 1 && e.charAt(y + 1) == t;
                return n && y++,
                n
            },
            d = function(e) {
                var n = p(e),
                r = "@" == e ? 14 : "!" == e ? 20 : "y" == e && n ? 4 : "o" == e ? 3 : 2,
                i = RegExp("^\\d{1," + r + "}"),
                s = t.substring(g).match(i);
                if (!s) throw "Missing number at position " + g;
                return g += s[0].length,
                parseInt(s[0], 10)
            },
            v = function(e, n, r) {
                var i = $.map(p(e) ? r: n,
                function(e, t) {
                    return [[t, e]]
                }).sort(function(e, t) {
                    return - (e[1].length - t[1].length)
                }),
                s = -1;
                if ($.each(i,
                function(e, n) {
                    var r = n[1];
                    return t.substr(g, r.length).toLowerCase() == r.toLowerCase() ? (s = n[0], g += r.length, !1) : undefined
                }), -1 != s) return s + 1;
                throw "Unknown name at position " + g
            },
            m = function() {
                if (t.charAt(g) != e.charAt(y)) throw "Unexpected literal at position " + g;
                g++
            },
            g = 0, y = 0; e.length > y; y++) if (h)"'" != e.charAt(y) || p("'") ? m() : h = !1;
            else switch (e.charAt(y)) {
            case "d":
                l = d("d");
                break;
            case "D":
                v("D", i, s);
                break;
            case "o":
                c = d("o");
                break;
            case "m":
                f = d("m");
                break;
            case "M":
                f = v("M", o, u);
                break;
            case "y":
                a = d("y");
                break;
            case "@":
                var b = new Date(d("@"));
                a = b.getFullYear(),
                f = b.getMonth() + 1,
                l = b.getDate();
                break;
            case "!":
                var b = new Date((d("!") - this._ticksTo1970) / 1e4);
                a = b.getFullYear(),
                f = b.getMonth() + 1,
                l = b.getDate();
                break;
            case "'":
                p("'") ? m() : h = !0;
                break;
            default:
                m()
            }
            if (t.length > g) {
                var w = t.substr(g);
                if (!/^\s+/.test(w)) throw "Extra/unparsed characters found in date: " + w
            }
            if ( - 1 == a ? a = (new Date).getFullYear() : 100 > a && (a += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (r >= a ? 0 : -100)), c > -1) for (f = 1, l = c;;) {
                var E = this._getDaysInMonth(a, f - 1);
                if (E >= l) break;
                f++,
                l -= E
            }
            var b = this._daylightSavingAdjust(new Date(a, f - 1, l));
            if (b.getFullYear() != a || b.getMonth() + 1 != f || b.getDate() != l) throw "Invalid date";
            return b
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
        _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(e, t, n) {
            if (!t) return "";
            var r = (n ? n.dayNamesShort: null) || this._defaults.dayNamesShort,
            i = (n ? n.dayNames: null) || this._defaults.dayNames,
            s = (n ? n.monthNamesShort: null) || this._defaults.monthNamesShort,
            o = (n ? n.monthNames: null) || this._defaults.monthNames,
            u = function(t) {
                var n = e.length > h + 1 && e.charAt(h + 1) == t;
                return n && h++,
                n
            },
            a = function(e, t, n) {
                var r = "" + t;
                if (u(e)) for (; n > r.length;) r = "0" + r;
                return r
            },
            f = function(e, t, n, r) {
                return u(e) ? r[t] : n[t]
            },
            l = "",
            c = !1;
            if (t) for (var h = 0; e.length > h; h++) if (c)"'" != e.charAt(h) || u("'") ? l += e.charAt(h) : c = !1;
            else switch (e.charAt(h)) {
            case "d":
                l += a("d", t.getDate(), 2);
                break;
            case "D":
                l += f("D", t.getDay(), r, i);
                break;
            case "o":
                l += a("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;
            case "m":
                l += a("m", t.getMonth() + 1, 2);
                break;
            case "M":
                l += f("M", t.getMonth(), s, o);
                break;
            case "y":
                l += u("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0": "") + t.getYear() % 100;
                break;
            case "@":
                l += t.getTime();
                break;
            case "!":
                l += 1e4 * t.getTime() + this._ticksTo1970;
                break;
            case "'":
                u("'") ? l += "'": c = !0;
                break;
            default:
                l += e.charAt(h)
            }
            return l
        },
        _possibleChars: function(e) {
            for (var t = "",
            n = !1,
            r = function(t) {
                var n = e.length > i + 1 && e.charAt(i + 1) == t;
                return n && i++,
                n
            },
            i = 0; e.length > i; i++) if (n)"'" != e.charAt(i) || r("'") ? t += e.charAt(i) : n = !1;
            else switch (e.charAt(i)) {
            case "d":
            case "m":
            case "y":
            case "@":
                t += "0123456789";
                break;
            case "D":
            case "M":
                return null;
            case "'":
                r("'") ? t += "'": n = !0;
                break;
            default:
                t += e.charAt(i)
            }
            return t
        },
        _get: function(e, t) {
            return e.settings[t] !== undefined ? e.settings[t] : this._defaults[t]
        },
        _setDateFromField: function(e, t) {
            if (e.input.val() != e.lastVal) {
                var i, s, n = this._get(e, "dateFormat"),
                r = e.lastVal = e.input ? e.input.val() : null;
                i = s = this._getDefaultDate(e);
                var o = this._getFormatConfig(e);
                try {
                    i = this.parseDate(n, r, o) || s
                } catch(u) {
                    this.log(u),
                    r = t ? "": r
                }
                e.selectedDay = i.getDate(),
                e.drawMonth = e.selectedMonth = i.getMonth(),
                e.drawYear = e.selectedYear = i.getFullYear(),
                e.currentDay = r ? i.getDate() : 0,
                e.currentMonth = r ? i.getMonth() : 0,
                e.currentYear = r ? i.getFullYear() : 0,
                this._adjustInstDate(e)
            }
        },
        _getDefaultDate: function(e) {
            return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
        },
        _determineDate: function(e, t, n) {
            var r = function(e) {
                var t = new Date;
                return t.setDate(t.getDate() + e),
                t
            },
            i = function(t) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(e, "dateFormat"), t, $.datepicker._getFormatConfig(e))
                } catch(n) {}
                for (var r = (t.toLowerCase().match(/^c/) ? $.datepicker._getDate(e) : null) || new Date, i = r.getFullYear(), s = r.getMonth(), o = r.getDate(), u = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, a = u.exec(t); a;) {
                    switch (a[2] || "d") {
                    case "d":
                    case "D":
                        o += parseInt(a[1], 10);
                        break;
                    case "w":
                    case "W":
                        o += 7 * parseInt(a[1], 10);
                        break;
                    case "m":
                    case "M":
                        s += parseInt(a[1], 10),
                        o = Math.min(o, $.datepicker._getDaysInMonth(i, s));
                        break;
                    case "y":
                    case "Y":
                        i += parseInt(a[1], 10),
                        o = Math.min(o, $.datepicker._getDaysInMonth(i, s))
                    }
                    a = u.exec(t)
                }
                return new Date(i, s, o)
            },
            s = null == t || "" === t ? n: "string" == typeof t ? i(t) : "number" == typeof t ? isNaN(t) ? n: r(t) : new Date(t.getTime());
            return s = s && "Invalid Date" == "" + s ? n: s,
            s && (s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0)),
            this._daylightSavingAdjust(s)
        },
        _daylightSavingAdjust: function(e) {
            return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
        },
        _setDate: function(e, t, n) {
            var r = !t,
            i = e.selectedMonth,
            s = e.selectedYear,
            o = this._restrictMinMax(e, this._determineDate(e, t, new Date));
            e.selectedDay = e.currentDay = o.getDate(),
            e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(),
            e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(),
            (i != e.selectedMonth || s != e.selectedYear) && !n && this._notifyChange(e),
            this._adjustInstDate(e),
            e.input && e.input.val(r ? "": this._formatDate(e))
        },
        _getDate: function(e) {
            var t = !e.currentYear || e.input && "" == e.input.val() ? null: this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return t
        },
        _attachHandlers: function(e) {
            var t = this._get(e, "stepMonths"),
            n = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function() {
                var e = {
                    prev: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(n, -t, "M")
                    },
                    next: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(n, +t, "M")
                    },
                    hide: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                    },
                    today: function() {
                        window["DP_jQuery_" + dpuuid].datepicker._gotoToday(n)
                    },
                    selectDay: function() {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                        !1
                    },
                    selectMonth: function() {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(n, this, "M"),
                        !1
                    },
                    selectYear: function() {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(n, this, "Y"),
                        !1
                    }
                };
                $(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(e) {
            var t = new Date;
            t = this._daylightSavingAdjust(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
            var n = this._get(e, "isRTL"),
            r = this._get(e, "showButtonPanel"),
            i = this._get(e, "hideIfNoPrevNext"),
            s = this._get(e, "navigationAsDateFormat"),
            o = this._getNumberOfMonths(e),
            u = this._get(e, "showCurrentAtPos"),
            a = this._get(e, "stepMonths"),
            f = 1 != o[0] || 1 != o[1],
            l = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
            c = this._getMinMaxDate(e, "min"),
            h = this._getMinMaxDate(e, "max"),
            p = e.drawMonth - u,
            d = e.drawYear;
            if (0 > p && (p += 12, d--), h) {
                var v = this._daylightSavingAdjust(new Date(h.getFullYear(), h.getMonth() - o[0] * o[1] + 1, h.getDate()));
                for (v = c && c > v ? c: v; this._daylightSavingAdjust(new Date(d, p, 1)) > v;) p--,
                0 > p && (p = 11, d--)
            }
            e.drawMonth = p,
            e.drawYear = d;
            var m = this._get(e, "prevText");
            m = s ? this.formatDate(m, this._daylightSavingAdjust(new Date(d, p - a, 1)), this._getFormatConfig(e)) : m;
            var g = this._canAdjustMonth(e, -1, d, p) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e": "w") + '">' + m + "</span></a>": i ? "": '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e": "w") + '">' + m + "</span></a>",
            y = this._get(e, "nextText");
            y = s ? this.formatDate(y, this._daylightSavingAdjust(new Date(d, p + a, 1)), this._getFormatConfig(e)) : y;
            var b = this._canAdjustMonth(e, 1, d, p) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w": "e") + '">' + y + "</span></a>": i ? "": '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w": "e") + '">' + y + "</span></a>",
            w = this._get(e, "currentText"),
            E = this._get(e, "gotoCurrent") && e.currentDay ? l: t;
            w = s ? this.formatDate(w, E, this._getFormatConfig(e)) : w;
            var S = e.inline ? "": '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(e, "closeText") + "</button>",
            x = r ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (n ? S: "") + (this._isInRange(e, E) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + w + "</button>": "") + (n ? "": S) + "</div>": "",
            T = parseInt(this._get(e, "firstDay"), 10);
            T = isNaN(T) ? 0 : T;
            for (var N = this._get(e, "showWeek"), C = this._get(e, "dayNames"), L = (this._get(e, "dayNamesShort"), this._get(e, "dayNamesMin")), A = this._get(e, "monthNames"), O = this._get(e, "monthNamesShort"), M = this._get(e, "beforeShowDay"), _ = this._get(e, "showOtherMonths"), D = this._get(e, "selectOtherMonths"), H = (this._get(e, "calculateWeek") || this.iso8601Week, this._getDefaultDate(e)), B = "", j = 0; o[0] > j; j++) {
                var F = "";
                this.maxRows = 4;
                for (var I = 0; o[1] > I; I++) {
                    var q = this._daylightSavingAdjust(new Date(d, p, e.selectedDay)),
                    R = " ui-corner-all",
                    U = "";
                    if (f) {
                        if (U += '<div class="ui-datepicker-group', o[1] > 1) switch (I) {
                        case 0:
                            U += " ui-datepicker-group-first",
                            R = " ui-corner-" + (n ? "right": "left");
                            break;
                        case o[1] - 1 : U += " ui-datepicker-group-last",
                            R = " ui-corner-" + (n ? "left": "right");
                            break;
                        default:
                            U += " ui-datepicker-group-middle",
                            R = ""
                        }
                        U += '">'
                    }
                    U += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + R + '">' + (/all|left/.test(R) && 0 == j ? n ? b: g: "") + (/all|right/.test(R) && 0 == j ? n ? g: b: "") + this._generateMonthYearHeader(e, p, d, c, h, j > 0 || I > 0, A, O) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
                    for (var z = N ? '<th class="ui-datepicker-week-col">' + this._get(e, "weekHeader") + "</th>": "", W = 0; 7 > W; W++) {
                        var X = (W + T) % 7;
                        z += "<th" + ((W + T + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"': "") + ">" + '<span title="' + C[X] + '">' + L[X] + "</span></th>"
                    }
                    U += z + "</tr></thead><tbody>";
                    var V = this._getDaysInMonth(d, p);
                    d == e.selectedYear && p == e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, V));
                    var J = (this._getFirstDayOfMonth(d, p) - T + 7) % 7,
                    K = Math.ceil((J + V) / 7),
                    Q = f ? this.maxRows > K ? this.maxRows: K: K;
                    this.maxRows = Q;
                    for (var G = this._daylightSavingAdjust(new Date(d, p, 1 - J)), Y = 0; Q > Y; Y++) {
                        U += "<tr>";
                        for (var Z = N ? '<td class="ui-datepicker-week-col">' + this._get(e, "calculateWeek")(G) + "</td>": "", W = 0; 7 > W; W++) {
                            var et = M ? M.apply(e.input ? e.input[0] : null, [G]) : [!0, ""],
                            tt = G.getMonth() != p,
                            nt = tt && !D || !et[0] || c && c > G || h && G > h;
                            Z += '<td class="' + ((W + T + 6) % 7 >= 5 ? " ui-datepicker-week-end": "") + (tt ? " ui-datepicker-other-month": "") + (G.getTime() == q.getTime() && p == e.selectedMonth && e._keyEvent || H.getTime() == G.getTime() && H.getTime() == q.getTime() ? " " + this._dayOverClass: "") + (nt ? " " + this._unselectableClass + " ui-state-disabled": "") + (tt && !_ ? "": " " + et[1] + (G.getTime() == l.getTime() ? " " + this._currentClass: "") + (G.getTime() == t.getTime() ? " ui-datepicker-today": "")) + '"' + (tt && !_ || !et[2] ? "": ' title="' + et[2] + '"') + (nt ? "": ' data-handler="selectDay" data-event="click" data-month="' + G.getMonth() + '" data-year="' + G.getFullYear() + '"') + ">" + (tt && !_ ? "&#xa0;": nt ? '<span class="ui-state-default">' + G.getDate() + "</span>": '<a class="ui-state-default' + (G.getTime() == t.getTime() ? " ui-state-highlight": "") + (G.getTime() == l.getTime() ? " ui-state-active": "") + (tt ? " ui-priority-secondary": "") + '" href="#">' + G.getDate() + "</a>") + "</td>",
                            G.setDate(G.getDate() + 1),
                            G = this._daylightSavingAdjust(G)
                        }
                        U += Z + "</tr>"
                    }
                    p++,
                    p > 11 && (p = 0, d++),
                    U += "</tbody></table>" + (f ? "</div>" + (o[0] > 0 && I == o[1] - 1 ? '<div class="ui-datepicker-row-break"></div>': "") : ""),
                    F += U
                }
                B += F
            }
            return B += x + ($.ui.ie6 && !e.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>': ""),
            e._keyEvent = !1,
            B
        },
        _generateMonthYearHeader: function(e, t, n, r, i, s, o, u) {
            var a = this._get(e, "changeMonth"),
            f = this._get(e, "changeYear"),
            l = this._get(e, "showMonthAfterYear"),
            c = '<div class="ui-datepicker-title">',
            h = "";
            if (s || !a) h += '<span class="ui-datepicker-month">' + o[t] + "</span>";
            else {
                var p = r && r.getFullYear() == n,
                d = i && i.getFullYear() == n;
                h += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                for (var v = 0; 12 > v; v++)(!p || v >= r.getMonth()) && (!d || i.getMonth() >= v) && (h += '<option value="' + v + '"' + (v == t ? ' selected="selected"': "") + ">" + u[v] + "</option>");
                h += "</select>"
            }
            if (l || (c += h + (!s && a && f ? "": "&#xa0;")), !e.yearshtml) if (e.yearshtml = "", s || !f) c += '<span class="ui-datepicker-year">' + n + "</span>";
            else {
                var m = this._get(e, "yearRange").split(":"),
                g = (new Date).getFullYear(),
                y = function(e) {
                    var t = e.match(/c[+-].*/) ? n + parseInt(e.substring(1), 10) : e.match(/[+-].*/) ? g + parseInt(e, 10) : parseInt(e, 10);
                    return isNaN(t) ? g: t
                },
                b = y(m[0]),
                w = Math.max(b, y(m[1] || ""));
                for (b = r ? Math.max(b, r.getFullYear()) : b, w = i ? Math.min(w, i.getFullYear()) : w, e.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; w >= b; b++) e.yearshtml += '<option value="' + b + '"' + (b == n ? ' selected="selected"': "") + ">" + b + "</option>";
                e.yearshtml += "</select>",
                c += e.yearshtml,
                e.yearshtml = null
            }
            return c += this._get(e, "yearSuffix"),
            l && (c += (!s && a && f ? "": "&#xa0;") + h),
            c += "</div>"
        },
        _adjustInstDate: function(e, t, n) {
            var r = e.drawYear + ("Y" == n ? t: 0),
            i = e.drawMonth + ("M" == n ? t: 0),
            s = Math.min(e.selectedDay, this._getDaysInMonth(r, i)) + ("D" == n ? t: 0),
            o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(r, i, s)));
            e.selectedDay = o.getDate(),
            e.drawMonth = e.selectedMonth = o.getMonth(),
            e.drawYear = e.selectedYear = o.getFullYear(),
            ("M" == n || "Y" == n) && this._notifyChange(e)
        },
        _restrictMinMax: function(e, t) {
            var n = this._getMinMaxDate(e, "min"),
            r = this._getMinMaxDate(e, "max"),
            i = n && n > t ? n: t;
            return i = r && i > r ? r: i
        },
        _notifyChange: function(e) {
            var t = this._get(e, "onChangeMonthYear");
            t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
        },
        _getNumberOfMonths: function(e) {
            var t = this._get(e, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function(e, t) {
            return this._determineDate(e, this._get(e, t + "Date"), null)
        },
        _getDaysInMonth: function(e, t) {
            return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function(e, t) {
            return new Date(e, t, 1).getDay()
        },
        _canAdjustMonth: function(e, t, n, r) {
            var i = this._getNumberOfMonths(e),
            s = this._daylightSavingAdjust(new Date(n, r + (0 > t ? t: i[0] * i[1]), 1));
            return 0 > t && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())),
            this._isInRange(e, s)
        },
        _isInRange: function(e, t) {
            var n = this._getMinMaxDate(e, "min"),
            r = this._getMinMaxDate(e, "max");
            return (!n || t.getTime() >= n.getTime()) && (!r || t.getTime() <= r.getTime())
        },
        _getFormatConfig: function(e) {
            var t = this._get(e, "shortYearCutoff");
            return t = "string" != typeof t ? t: (new Date).getFullYear() % 100 + parseInt(t, 10),
            {
                shortYearCutoff: t,
                dayNamesShort: this._get(e, "dayNamesShort"),
                dayNames: this._get(e, "dayNames"),
                monthNamesShort: this._get(e, "monthNamesShort"),
                monthNames: this._get(e, "monthNames")
            }
        },
        _formatDate: function(e, t, n, r) {
            t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
            var i = t ? "object" == typeof t ? t: this._daylightSavingAdjust(new Date(r, n, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return this.formatDate(this._get(e, "dateFormat"), i, this._getFormatConfig(e))
        }
    }),
    $.fn.datepicker = function(e) {
        if (!this.length) return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv), $.datepicker.initialized = !0);
        var t = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" != e && "getDate" != e && "widget" != e ? "option" == e && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t)) : this.each(function() {
            "string" == typeof e ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this].concat(t)) : $.datepicker._attachDatepicker(this, e)
        }) : $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t))
    },
    $.datepicker = new Datepicker,
    $.datepicker.initialized = !1,
    $.datepicker.uuid = (new Date).getTime(),
    $.datepicker.version = "1.9.2",
    window["DP_jQuery_" + dpuuid] = $
} (jQuery),
function(e) {
    var n = !1;
    e.widget("ui.menu", {
        version: "1.9.2",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element,
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, e.proxy(function(e) {
                this.options.disabled && e.preventDefault()
            },
            this)),
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
            this._on({
                "mousedown .ui-menu-item > a": function(e) {
                    e.preventDefault()
                },
                "click .ui-state-disabled > a": function(e) {
                    e.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(t) {
                    var r = e(t.target).closest(".ui-menu-item"); ! n && r.not(".ui-state-disabled").length && (n = !0, this.select(t), r.has(".ui-menu").length ? this.expand(t) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(t) {
                    var n = e(t.currentTarget);
                    n.siblings().children(".ui-state-active").removeClass("ui-state-active"),
                    this.focus(t, n)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(e, t) {
                    var n = this.active || this.element.children(".ui-menu-item").eq(0);
                    t || this.focus(e, n)
                },
                blur: function(t) {
                    this._delay(function() {
                        e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            }),
            this.refresh(),
            this._on(this.document, {
                click: function(t) {
                    e(t.target).closest(".ui-menu").length || this.collapseAll(t),
                    n = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var t = e(this);
                t.data("ui-menu-submenu-carat") && t.remove()
            }),
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(t) {
            function a(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var n, r, i, s, o, u = !0;
            switch (t.keyCode) {
            case e.ui.keyCode.PAGE_UP:
                this.previousPage(t);
                break;
            case e.ui.keyCode.PAGE_DOWN:
                this.nextPage(t);
                break;
            case e.ui.keyCode.HOME:
                this._move("first", "first", t);
                break;
            case e.ui.keyCode.END:
                this._move("last", "last", t);
                break;
            case e.ui.keyCode.UP:
                this.previous(t);
                break;
            case e.ui.keyCode.DOWN:
                this.next(t);
                break;
            case e.ui.keyCode.LEFT:
                this.collapse(t);
                break;
            case e.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                break;
            case e.ui.keyCode.ENTER:
            case e.ui.keyCode.SPACE:
                this._activate(t);
                break;
            case e.ui.keyCode.ESCAPE:
                this.collapse(t);
                break;
            default:
                u = !1,
                r = this.previousFilter || "",
                i = String.fromCharCode(t.keyCode),
                s = !1,
                clearTimeout(this.filterTimer),
                i === r ? s = !0 : i = r + i,
                o = RegExp("^" + a(i), "i"),
                n = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return o.test(e(this).children("a").text())
                }),
                n = s && -1 !== n.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : n,
                n.length || (i = String.fromCharCode(t.keyCode), o = RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return o.test(e(this).children("a").text())
                })),
                n.length ? (this.focus(t, n), n.length > 1 ? (this.previousFilter = i, this.filterTimer = this._delay(function() {
                    delete this.previousFilter
                },
                1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            u && t.preventDefault()
        },
        _activate: function(e) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(e) : this.select(e))
        },
        refresh: function() {
            var t, n = this.options.icons.submenu,
            r = this.element.find(this.options.menus);
            r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = e(this),
                r = t.prev("a"),
                i = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
                r.attr("aria-haspopup", "true").prepend(i),
                t.attr("aria-labelledby", r.attr("id"))
            }),
            t = r.add(this.element),
            t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }),
            t.children(":not(.ui-menu-item)").each(function() {
                var t = e(this);
                /[^\-—–\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
            }),
            t.children(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            } [this.options.role]
        },
        focus: function(e, t) {
            var n, r;
            this.blur(e, e && "focus" === e.type),
            this._scrollIntoView(t),
            this.active = t.first(),
            r = this.active.children("a").addClass("ui-state-focus"),
            this.options.role && this.element.attr("aria-activedescendant", r.attr("id")),
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),
            e && "keydown" === e.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            },
            this.delay),
            n = t.children(".ui-menu"),
            n.length && /^mouse/.test(e.type) && this._startOpening(n),
            this.activeMenu = t.parent(),
            this._trigger("focus", e, {
                item: t
            })
        },
        _scrollIntoView: function(t) {
            var n, r, i, s, o, u;
            this._hasScroll() && (n = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, r = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - n - r, s = this.activeMenu.scrollTop(), o = this.activeMenu.height(), u = t.height(), 0 > i ? this.activeMenu.scrollTop(s + i) : i + u > o && this.activeMenu.scrollTop(s + i - o + u))
        },
        blur: function(e, t) {
            t || clearTimeout(this.timer),
            this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {
                item: this.active
            }))
        },
        _startOpening: function(e) {
            clearTimeout(this.timer),
            "true" === e.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(),
                this._open(e)
            },
            this.delay))
        },
        _open: function(t) {
            var n = e.extend({
                of: this.active
            },
            this.options.position);
            clearTimeout(this.timer),
            this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
            t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(n)
        },
        collapseAll: function(t, n) {
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                var r = n ? this.element: e(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element),
                this._close(r),
                this.blur(t),
                this.activeMenu = r
            },
            this.delay)
        },
        _close: function(e) {
            e || (e = this.active ? this.active.parent() : this.element),
            e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(e) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(e, t))
        },
        expand: function(e) {
            var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            t && t.length && (this._open(t.parent()), this._delay(function() {
                this.focus(e, t)
            }))
        },
        next: function(e) {
            this._move("next", "first", e)
        },
        previous: function(e) {
            this._move("prev", "last", e)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(e, t, n) {
            var r;
            this.active && (r = "first" === e || "last" === e ? this.active["first" === e ? "prevAll": "nextAll"](".ui-menu-item").eq( - 1) : this.active[e + "All"](".ui-menu-item").eq(0)),
            r && r.length && this.active || (r = this.activeMenu.children(".ui-menu-item")[t]()),
            this.focus(n, r)
        },
        nextPage: function(t) {
            var n, r, i;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return n = e(this),
                0 > n.offset().top - r - i
            }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last": "first"]())), void 0) : (this.next(t), void 0)
        },
        previousPage: function(t) {
            var n, r, i;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return n = e(this),
                n.offset().top - r + i > 0
            }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())), void 0) : (this.next(t), void 0)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(t) {
            this.active = this.active || e(t.target).closest(".ui-menu-item");
            var n = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0),
            this._trigger("select", t, n)
        }
    })
} (jQuery);
var nd = nd || {};
nd.feed = nd.feed || {},
nd.feed.TOPICS_UPDATED = "topics-updated",
nd.feed.POST_DELETED = "post-deleted",
nd.feed.NEVER_HIDE_COMMENT_CONTAINER = !1,
function($) {
    var likeCallbacks = [];
    nd.feed.afterLike = function(callback) {
        likeCallbacks.push(callback)
    },
    nd.feed.runLikeCallbacks = function(data, element) {
        $.each(likeCallbacks,
        function(index, callback) {
            callback(data, element)
        })
    }
} (jQuery),
nd.feed.createLikeCallback = function(data, likeButton) {
    var likedContentId = likeButton.data("contentid"),
    likedContentType = likeButton.data("contenttype"),
    like = $("#like_" + likedContentId),
    likeContainer = like.parents("[data-class=like-container]"),
    commentContainer = like.parents("[data-class=comment-like-container]");
    nd.feed.runLikeCallbacks(data, likeButton),
    data.html ? (like.html(data.html), likeContainer.show(), commentContainer.show()) : (likeContainer.hide(), "0" == commentContainer.data("num-comments") && commentContainer.hide()),
    "post" == likedContentType ? (likeButton.addClass("liked"), nd.feed.incrementCount(likeButton), data.is_welcome ? (likeButton.attr("disabled", "disabled"), likeButton.children("[data-class=label]").text("Welcomed!")) : (likeButton.data("action", "unlike"), likeButton.children("[data-class=label]").text("Thanked!"))) : (likeButton.data("action", "unlike"), likeButton.children("[data-class=label]").text("Thanked!")),
    likeButton.data("remove-like-url", "/likes/" + data.requestors_like_id + "/"),
    nd.feed.initLikeHandlers()
},
nd.feed.deleteLikeCallback = function(data, likeButton) {
    var likedContentId = likeButton.data("contentid"),
    likedContentType = likeButton.data("contenttype"),
    like = $("#like_" + likedContentId),
    likeContainer = like.parents("[data-class=like-container]"),
    commentContainer = like.parents("[data-class=comment-like-container]");
    data.html ? (like.html(data.html), likeContainer.show(), commentContainer.show()) : (likeContainer.hide(), "0" == commentContainer.data("num-comments") && commentContainer.hide()),
    "post" == likedContentType && likeButton.removeClass("liked"),
    likeButton.data("action", "like"),
    likeButton.children("[data-class=label]").text("Thank"),
    nd.feed.decrementCount(likeButton),
    nd.feed.initLikeHandlers()
},
nd.feed.handleLikeClick = function() {
    var target = $(this);
    target.attr("disabled") || ("unlike" == target.data("action") ? $.ajax({
        url: target.data("remove-like-url"),
        type: "DELETE",
        dataType: "json",
        success: function(response) {
            nd.feed.deleteLikeCallback(response, target)
        }
    }) : $.post(target.data("add-like-url"), {},
    function(response) {
        nd.feed.createLikeCallback(response, target)
    },
    "json"))
},
nd.feed.initLikeHandlers = function() {
    $("a[data-action=like]").unbind(),
    $("a[data-action=unlike]").unbind(),
    $("a[data-action=like]").click(nd.feed.handleLikeClick),
    $("a[data-action=unlike]").click(nd.feed.handleLikeClick);
    var popoverOptions = {
        placement: "top",
        trigger: "click",
        delay: {
            hide: 2e3
        },
        html: !0
    };
    $("a[data-action=other-likers]").popover(popoverOptions)
},
nd.feed.incrementCount = function(actionLink) {
    var countSpan = actionLink.children("[data-class=count]");
    if (0 != countSpan.length) {
        countSpan = countSpan.first();
        var count = parseInt(countSpan.text(), 10);
        count++,
        countSpan.text(count),
        countSpan.show()
    }
},
nd.feed.decrementCount = function(actionLink) {
    var countSpan = actionLink.children("[data-class=count]");
    if (0 != countSpan.length) {
        countSpan = countSpan.first();
        var count = parseInt(countSpan.text(), 10);
        count--,
        countSpan.text(count),
        0 == count && countSpan.hide()
    }
},
nd.feed.initPhotoHandlers = function() {
    $("a[data-action=photo-click]").fancybox()
},
nd.feed.handleCommentClick = function(event) {
    var contentId = $(event.currentTarget).data("contentid"),
    contentType = $(event.currentTarget).data("contenttype");
    $("#comment_body").val(""),
    $("body").trigger("click");
    var commentContentId = $("#comment_" + contentType + "_id").val();
    $("div[data-action=start-comment][data-contentid=" + contentId + "][data-contenttype=" + contentType + "]").hide();
    var commentBox = $("#comment_box");
    null != commentContentId && contentId != commentContentId && ($("#comment_body").val(""), $("#comment_" + contentType + "_id").val(contentId));
    var commentContainer = $("#comment_container_" + contentId);
    return nd.feed.configureCommentBox($(event.currentTarget), contentId, contentType),
    commentContainer.show(),
    commentContainer.append(commentBox),
    commentBox.show(),
    setTimeout(function() {
        $("#comment_body").focus()
    },
    1),
    nd.feed.handleOutsideCommentClick(contentType, contentId),
    !1
},
nd.feed.configureCommentBox = function(eventTarget, contentId, contentType) {
    if ("post" == contentType) {
        var postCityName = eventTarget.data("cityname"),
        nnPost = eventTarget.data("nnpost"),
        leadPost = eventTarget.data("leadspost");
        if (postCityName) {
            var recipient_hoods_count = eventTarget.data("recipient_hoods_count");
            $("#city_comment_name").text(postCityName),
            $("#recipient_hoods_count").text(recipient_hoods_count + " " + (1 == recipient_hoods_count ? "neighborhood": "neighborhoods")),
            $("#city_comment_warning").removeClass("hide")
        } else $("#city_comment_warning").addClass("hide");
        nnPost ? leadPost ? ($("#nn_leads_comment_link").data("id", contentId), $("#nn_leads_comment_warning").removeClass("hide"), $("#nn_comment_warning").addClass("hide")) : ($("#nn_comment_link").data("id", contentId), $("#nn_leads_comment_warning").addClass("hide"), $("#nn_comment_warning").removeClass("hide")) : $("#nn_comment_warning").addClass("hide")
    }
},
nd.feed.handleOutsideCommentClick = function(content_type, content_id) {
    $("body").click(function(e) {
        var t = $(e.target);
        if (null != t && t !== void 0 && 0 == t.closest("#comment_box").length && "" == $("#comment_body").val()) {
            if ($("#comment_box").hide(), nd.feed.NEVER_HIDE_COMMENT_CONTAINER) $("[data-action=start-comment][data-contentid=" + content_id + "][data-contenttype=" + content_type + "]").show();
            else {
                var visibleMedia = $("#comment_container_" + content_id + '>[class|="media"]:visible');
                0 === visibleMedia.length ? $("#comment_container_" + content_id).hide() : content_type && content_id && $("#comment_container_" + content_id + '>[data-comment-content-id="' + content_id + '"]').length > 0 && $("[data-action=start-comment][data-contentid=" + content_id + "][data-contenttype=" + content_type + "]").show()
            }
            $("body").unbind()
        }
    })
},
nd.feed.clearMiniCommentBox = function(event) {
    return $(event.currentTarget).css("display", "none"),
    nd.feed.handleCommentClick(event)
},
nd.feed.handleCommentSpinner = function(enable) {
    enable ? ($("#comment_submit").unbind().click(function() {
        return ! 1
    }), $("#comment_submit").hide(), $("#loading_comment_submit").show()) : ($("#loading_comment_submit").hide(), $("#comment_submit").show())
},
nd.feed.submitCommentCallback = function(data) {
    var miniCommentBox = $('[data-action="start-comment"][data-contentid="' + data.content_id + '"]');
    data.html && ($("#comment_box").hide(), miniCommentBox.before(data.html), $("#comment_" + data.comment_id).show()),
    miniCommentBox.show(),
    $("#comment_body").val(""),
    nd.feed.handleCommentSpinner(!1),
    nd.feed.initCommentHandlers();
    var $replyLink = $("[data-action=comment][data-contenttype=" + data.content_type + "][data-contentid=" + data.content_id + "]");
    nd.feed.incrementCount($replyLink);
    var $viewAllCommentsLink = $("[data-content-id=" + data.content_id + "][data-action=view-all-comments-link]");
    nd.feed.incrementCount($viewAllCommentsLink),
    nd.feed.initDeleteHandlers()
},
nd.feed.submitComment = function() {
    if ("" == $("#comment_body").val()) return ! 1;
    nd.feed.handleCommentSpinner(!0);
    var data = $("#comment_form").serialize();
    return $.post("/ajax/submit_comment/", data, nd.feed.submitCommentCallback, "json"),
    !1
},
nd.feed.handleDeleteCommentClick = function(event) {
    $("[data-group=delete-comment-action]").hide();
    var authorDelete = !1;
    $(this).data("action") == LEAD_DELETE_ACTION ? ($("#comment_non_author_delete_title").show(), $("#lead_delete_comment_body").show(), $("#confirm_hide_comment").show()) : $(this).data("action") == GROUP_MODERATOR_DELETE_ACTION ? ($("#comment_non_author_delete_title").show(), $("#moderator_delete_comment_body").show(), $("#confirm_hide_comment").show()) : (authorDelete = !0, $("#comment_author_delete_title").show(), $("#delete_comment_body").show(), $("#confirm_delete_comment").show());
    var flaggedContentPage = "flagged-content-page" == $(this).data("class");
    authorDelete || flaggedContentPage || $("#delete-comment-form").show();
    var commentId = $(event.target).data("comment-id"),
    data = {
        comment_id: commentId
    };
    $("#delete-comment-form #error_reason").removeClass("error"),
    $("[data-id=delete-comment-submit]").unbind("click"),
    $("[data-id=delete-comment-submit]").click(function() {
        var checkedRadio = $("#delete-comment-form input:radio:checked");
        return 0 != checkedRadio.length || authorDelete || flaggedContentPage ? (data.reason = checkedRadio.val(), $.post("/ajax/delete_comment/", data, nd.feed.deleteCommentCallback, "json"), !1) : ($("#delete-comment-form #error_reason").addClass("error"), !1)
    }),
    $("#confirm_comment_delete_modal").modal("show")
},
nd.feed.deleteCommentCallback = function(data) {
    if (data.success && 1 == data.success && data.comment_id) {
        var comment = $("#comment_" + data.comment_id);
        if (0 == data.delete_status) {
            comment.fadeOut("slow",
            function() {
                comment.html(data.hidden_comment_html).fadeIn("slow")
            });
            var unresolvedRow = $("[data-id=unresolved_row_" + data.comment_id + "]");
            unresolvedRow.fadeOut("slow")
        } else {
            var $viewAllCommentsLink = $("[data-content-id=" + data.content_id + "][data-action=view-all-comments-link]"),
            numCommentsLeft = parseInt($viewAllCommentsLink.children("[data-class=count]")) - 1;
            if (nd.feed.decrementCount($viewAllCommentsLink), 0 == numCommentsLeft && !nd.feed.NEVER_HIDE_COMMENT_CONTAINER) {
                $("[data-action=start-comment][data-contentid=" + data.content_id + "]").hide();
                var visibleMedia = $("#comment_container_" + data.content_id + '>[class|="media"]:visible');
                1 === visibleMedia.length && visibleMedia.is(comment) && $("#comment_container_" + data.content_id).hide()
            }
            setTimeout(function() {
                comment.remove()
            },
            500);
            var $replyLink = $("[data-action=comment][data-contenttype=" + data.content_type + "][data-contentid=" + data.content_id + "]");
            nd.feed.decrementCount($replyLink)
        }
    }
    return $("#confirm_comment_delete_modal .confirm_delete_comment").unbind("click"),
    $("#confirm_comment_delete_modal").modal("hide"),
    !1
},
nd.feed.viewAllComments = function() {
    var contentId = $(this).data("content-id"),
    $loadingButton = $("#loading_comments_" + contentId),
    $viewAllCommentsLink = $("[data-action=view-all-comments][data-content-id=" + contentId + "]"),
    $errorMessage = $("#comment_error_" + contentId),
    before_timestamp = parseInt($viewAllCommentsLink.data("before-comment"));
    $viewAllCommentsLink.hide(),
    $loadingButton.show(),
    $.get("/feeds/comments/" + contentId + "/", {
        before_timestamp: before_timestamp
    },
    function(data) {
        $loadingButton.hide(),
        data.success ? ($viewAllCommentsLink.replaceWith(data.html), $("[data-comment-content-id=" + contentId + "]").slideDown(), nd.feed.initFeedHandlers()) : ($viewAllCommentsLink.show(), $errorMessage.show())
    },
    "json")
},
nd.feed.viewPrevComments = function() {
    var $this = $(this),
    contentId = $this.data("content-id"),
    $summarizer = $this.parents("[data-action=view-prev-comments]");
    $summarizer.hide(),
    $summarizer.prevAll("[data-comment-content-id=" + contentId + "]").slideDown()
},
nd.feed.showFullComment = function() {
    var commentId = $(this).data("comment-id");
    return $("#comment_more_" + commentId).hide(),
    $("#comment_all_" + commentId).show(),
    !1
},
nd.feed.initCommentHandlers = function() {
    $("#comment_body").trigger("change"),
    $("#comment_submit").unbind(),
    $("#comment_submit").click(nd.feed.submitComment),
    $("a[data-action=comment]").unbind(),
    $("a[data-action=comment]").click(nd.feed.handleCommentClick),
    $("div[data-action=start-comment]").unbind(),
    $("div[data-action=start-comment]").focusin(nd.feed.clearMiniCommentBox),
    $("a[data-group=delete-comment]").unbind(),
    $("a[data-group=delete-comment]").click(nd.feed.handleDeleteCommentClick),
    $("a[data-action=view-all-comments-link]").unbind(),
    $("a[data-action=view-all-comments-link]").click(nd.feed.viewAllComments),
    $("a[data-action=view-prev-comments-link]").unbind(),
    $("a[data-action=view-prev-comments-link]").click(nd.feed.viewPrevComments),
    $("a[data-action=show-full-comment]").unbind(),
    $("a[data-action=show-full-comment]").click(nd.feed.showFullComment)
};
var LEAD_DELETE_ACTION = "lead-delete",
GROUP_MODERATOR_DELETE_ACTION = "moderator-delete",
DELETE_REGULAR_POST_TYPE = "post",
DELETE_PHOTO_POST_TYPE = "photo",
DELETE_EVENT_POST_TYPE = "event",
DELETE_URGENT_ALERT_POST_TYPE = "urgent alert";
nd.feed.deleteStoryCallback = function(data) {
    if (data.success && 1 == data.success && (data.story_id || data.event_id || data.photo_id)) {
        if ($(document).trigger(nd.feed.POST_DELETED), data.is_nma) {
            var nma_intro_post = $("#s_" + data.story_id);
            nma_intro_post.fadeOut();
            var nma_delete_block = $("#nma_delete_" + data.story_id);
            nma_delete_block.fadeOut()
        } else {
            var story = $("#s_" + data.story_id);
            if (story.fadeOut(), setTimeout(function() {
                story.remove()
            },
            1e3), data.related_post_ids && data.related_post_ids.length > 0) {
                for (var relatedStoryIds = [], i = 0; data.related_post_ids.length > i; ++i) relatedStoryIds.push("#s_" + data.related_post_ids[i]);
                var relatedItems = $(relatedStoryIds.join());
                relatedItems.fadeOut(function() {
                    relatedItems.remove()
                })
            }
            data.nf_event_module_html && $("#nf_events").html($(data.nf_event_module_html).html())
        }
        var unresolvedRow = null;
        data.story_id ? unresolvedRow = $("[data-id=unresolved_row_" + data.story_id + "]") : data.event_id ? unresolvedRow = $("[data-id=unresolved_row_" + data.event_id + "]") : data.photo_id && (unresolvedRow = $("[data-id=unresolved_row_" + data.photo_id + "]")),
        unresolvedRow.fadeOut("slow")
    }
    return $("#confirm_post_delete_modal").modal("hide"),
    !1
},
nd.feed.handleDeleteStoryClick = function(event) {
    var postType = $(this).data("content_type");
    $("[data-group=delete-post-action]").hide();
    var authorDelete = !1;
    if ($(this).data("action") == LEAD_DELETE_ACTION ? ($("#lead_delete_post_body").show(), $("#non_author_delete_title").show(), $("#confirm_hide_post").show()) : $(this).data("action") == GROUP_MODERATOR_DELETE_ACTION ? ($("#moderator_delete_post_body").show(), $("#non_author_delete_title").show(), $("#confirm_hide_post").show()) : (authorDelete = !0, $("#delete_post_body").show(), $("#author_delete_title").show(), $("#confirm_delete_post").show()), $("[data-singular=1]").show(), $("[data-plural=1]").hide(), $("[data-group=post-sub-action]").hide(), postType == DELETE_PHOTO_POST_TYPE) {
        $("[data-group=delete-post-type]").text(postType);
        var photoCount = $(this).data("photo_count");
        photoCount > 1 && ($("[data-singular=1]").hide(), $("[data-plural=1]").show())
    } else if (postType == DELETE_EVENT_POST_TYPE) {
        $("#delete_post_event").show(),
        $("[data-group=delete-post-type]").text(postType),
        $("#delete_attached_event_photos").hide();
        var photoCount = $(this).data("photo_count");
        photoCount > 0 && $("#delete_attached_event_photos").toggle()
    } else postType == DELETE_URGENT_ALERT_POST_TYPE ? ($("#delete_post_urgent_alert").show(), $("[data-group=delete-post-type]").text(postType)) : $("[data-group=delete-post-type]").text(DELETE_REGULAR_POST_TYPE);
    $("[data-group=delete-post-type]").show(),
    $("#confirm_post_delete_modal").modal("show");
    var target = $(event.target),
    story_id = target.data("story-id"),
    event_id = target.data("event-id"),
    photo_id = target.data("photo-id"),
    data = {
        post: story_id,
        event: event_id,
        photo: photo_id
    };
    $("[data-id=confirm_delete_post]").unbind("click"),
    $("[data-id=confirm_delete_post]").one("click",
    function() {
        return $.post("/ajax/delete_story/", data, nd.feed.deleteStoryCallback, "json"),
        !1
    }),
    $("#delete-post-form #error_reason").removeClass("error");
    var flaggedContentPage = "flagged-content-page" == $(this).data("class");
    authorDelete || flaggedContentPage || $("#delete-post-form").show(),
    $("[data-id=confirm_hide_post]").unbind("click"),
    $("[data-id=confirm_hide_post]").one("click",
    function() {
        var checkedRadio = $("#delete-post-form input:radio:checked");
        return 0 != checkedRadio.length || authorDelete || flaggedContentPage ? (data.reason = checkedRadio.val(), $.post("/ajax/delete_flagged_content/", data, nd.feed.deleteStoryCallback, "json"), !1) : ($("#delete-post-form #error_reason").addClass("error"), !1)
    })
},
nd.feed.initDeleteHandlers = function() {
    $("a[data-group=delete-story]").unbind(),
    $("a[data-group=delete-story]").click(nd.feed.handleDeleteStoryClick)
},
nd.feed.handleCloseStoryClick = function(event) {
    var target = $(event.target),
    storyId = target.data("story-id"),
    data = {
        status: 2,
        story_id: storyId
    };
    return $.post("/ajax/delete_story/", data, nd.feed.deleteStoryCallback, "json"),
    !1
},
nd.feed.fetchRecommendationForm = function(target) {
    if (target) {
        var $editModal = $("#category_edit_modal"),
        $editForm = $editModal.find("#topictag_form"),
        $editSubmit = $editForm.find("#topictag_submit");
        $editSubmit.attr("disabled", "disabled").toggleClass("disable", !0),
        $editModal.modal("show"),
        $.getJSON("/ajax/fetch_recommendation_form/", null,
        function(data) {
            $("#category-edit-spinner").hide(),
            $editSubmit.removeAttr("disabled").toggleClass("disable", !1),
            $editForm.length || ($editModal.find("div.modal-body").append(data.modal_html), nd.feed.handleEditTopicTagsClick(null, target))
        })
    }
},
nd.feed.addCategoriesToPostForm = function(categoryData) {
    var newTags = [],
    spanTemplate = $("<span></span>").data("group", "category-label");
    if ($("#category-fields #category-controls [data-group=category-label]").remove(), categoryData.bsf) newTags.push($("label[for=cb_bsf]").text().replace(/\s/g, ""));
    else if (categoryData.csf) newTags.push($("label[for=cb_csf]").text().replace(/\s/g, ""));
    else if (categoryData.resource) newTags.push($("label[for=cb_resource]").text().replace(/\s/g, ""));
    else {
        if (!categoryData.topics) return $("#post_form a[data-action=edit-categories]").show(),
        $("#category-fields").hide(),
        void 0;
        $(("" + categoryData.topics).split(",")).each(function() {
            newTags.push($("label[for=id_topic_" + this + "]").text())
        })
    }
    for (var i = 0; newTags.length > i; i++) {
        var categoryLabel = "" + newTags[i];
        newTags.length - 2 > i && (categoryLabel = ",&nbsp;" + categoryLabel),
        $("#category-fields #category-controls").prepend(spanTemplate.clone().html(categoryLabel))
    }
    $("#post_form a[data-action=edit-categories]").hide(),
    $("#category-fields").show(),
    $("#category-fields a").unbind().click(function() {
        $("a[data-action=edit-categories][data-new-post=true]").click()
    })
},
nd.feed.activateCategoryEditModalSpinner = function() {
    var modalBodyHeightReal = $("#category_edit_modal .modal-body").height();
    return $("#topictag_form").hide(),
    $("#category_edit_modal [data-group=modal-button]").css("visibility", "hidden"),
    $("#category-edit-spinner").css({
        height: modalBodyHeightReal + "px"
    }).show(),
    !1
},
nd.feed.topictagFormCheckboxClick = function(target) {
    for (var elem = $(target), choices = ["cb_bsf", "cb_csf", "cb_free", "cb_general", "cb_service", "cb_lostfound", "cb_resource"], i = 0; choices.length > i; i++) choices[i] != elem.attr("id") && $("#" + choices[i]).attr("checked", !1);
    "cb_service" == elem.attr("id") ? $("#local_details").is(":visible") ? $("#local_details").hide() : $("#local_details").show() : $("#local_details").hide()
},
nd.feed.handleEditTopicTagsClick = function(event, target) {
    target = target || event && $(event.target);
    var categoryAttributes = ["bsf", "csf", "resource", "free", "lostfound", "general", "service"],
    topicsAttribute = target.data("topics"),
    postId = target.data("post-id"),
    $editModal = $("#category_edit_modal"),
    $editForm = $editModal.find("#topictag_form"),
    $editModalSubmit = $editModal.find("#topictag_submit"),
    $localDetails = $editForm.find("#local_details");
    return $editForm.length ? ($editForm.find("input[name=story_id]").val(postId), $editForm.find("input[type=checkbox]:checked").selected(!1), $localDetails.hide(), topicsAttribute || target.data("service") ? ($("#cb_service").selected(!0), topicsAttribute && $.each(("" + topicsAttribute).split(","),
    function(i, topic_id) {
        $("#id_topic_" + topic_id).selected(!0)
    }), $localDetails.show()) : $.each(categoryAttributes,
    function(i, attr) {
        return target.data(attr) ? ($("#cb_" + attr).selected(!0), !1) : void 0
    }), $("#resource_section").toggle(!target.data("hide-resource")), $("#disabled_resource_section").toggle(target.data("hide-resource")), $editModalSubmit.off("click"), $editModalSubmit.one("click",
    function() {
        return $editModalSubmit.off("click"),
        nd.feed.activateCategoryEditModalSpinner(),
        $.post("/ajax/submit_topictags_form/", $editForm.serialize(),
        function(data) {
            data.success && data.story_id && ($(document).trigger(nd.feed.TOPICS_UPDATED), "html" in data && $("#topic_list_" + data.story_id + " [data-class=topics-label]").replaceWith(data.html), $.each(categoryAttributes,
            function(i, attr) {
                attr === data.category ? target.data(attr, !0) : target.data(attr, !1)
            }), target.data("topics", data.topics), $("a[data-action=edit-categories][data-post-id=" + data.story_id + "]").html("general" === data.category ? "Add category": "Change category")),
            $editModal.on("hidden",
            function() {
                $editForm.show(),
                $editModal.find("[data-group=modal-button]").delay(1e3).css("visibility", "visible"),
                $("#category-edit-spinner").hide()
            }),
            $editModal.modal("hide")
        },
        "json"),
        !1
    }), $editModal.modal("show"), !1) : (nd.feed.fetchRecommendationForm(target), !1)
},
nd.feed.initTopictagEditHandlers = function() {
    $("a[data-action=edit-categories]").unbind(),
    $("a[data-action=edit-categories]").click(nd.feed.handleEditTopicTagsClick)
},
nd.feed.handleFlagCallback = function(data) {
    if (data) {
        if (1 != data.flag) return;
        var link;
        if (data.postargs.post ? link = $("[data-flag-type=post][data-flag-id=" + data.postargs.post + "]") : data.postargs.comment ? link = $("[data-flag-type=comment][data-flag-id=" + data.postargs.comment + "]") : data.postargs.event ? link = $("[data-flag-type=event][data-flag-id=" + data.postargs.event + "]") : data.postargs.photo && (link = $("[data-flag-type=photo][data-flag-id=" + data.postargs.photo + "]")), link) {
            var displayType = link.data("flag-display");
            "button" === displayType ? link.replaceWith('<span class="btn btn-mini liked"><i class="glyphicon-flag"></i> Flagged</span>') : link.replaceWith('<a href="javascript:void(0);">Flagged</span>')
        }
    }
    return ! 1
},
nd.feed.handleFlagClick = function(event) {
    var target = $(event.target),
    id = target.data("flag-id"),
    type = target.data("flag-type"),
    isMultiple = target.data("multiple") ? target.data("multiple") : !1;
    isMultiple ? ($("#flag_content_modal [data-singular=1]").hide(), $("#flag_content_modal [data-plural=1]").show()) : ($("#flag_content_modal [data-singular=1]").show(), $("#flag_content_modal [data-plural=1]").hide());
    var flagTextType = target.data("flag-text-type") ? target.data("flag-text-type") : type;
    return $("#flag_content_modal [data-group=flag-type]").text(flagTextType),
    $("#flag_content_modal input:radio:checked").prop("checked", !1),
    $("#flag_content_modal #error_reason").removeClass("error"),
    $("#flag_content_modal").modal("show"),
    $("#flag_content_modal #confirm_flag_content").unbind("click"),
    $("#flag_content_modal #confirm_flag_content").click(function() {
        var data = {};
        data[type] = id;
        var checkedRadio = $("#flag_content_modal input:radio:checked");
        return 0 == checkedRadio.length ? ($("#flag_content_modal #error_reason").addClass("error"), void 0) : (data.reason = checkedRadio.val(), $.post("/ajax/flag_content/", data, nd.feed.handleFlagCallback, "json"), $("#flag_content_modal").modal("hide"), void 0)
    }),
    !1
},
nd.feed.initFlagHandlers = function() {
    $("[data-action=flag]").unbind(),
    $("[data-action=flag]").click(nd.feed.handleFlagClick)
},
nd.feed.VIEW_MORE_EVENT = "nd.view_more",
nd.feed.viewMoreHandler = function() {
    var viewMoreElements = $("#feed_view_more");
    viewMoreElements.off(nd.feed.VIEW_MORE_EVENT),
    viewMoreElements.one(nd.feed.VIEW_MORE_EVENT,
    function() {
        var $this = $(this),
        dataAction = $this.data("action");
        return $this.addClass("disabled").html('<img src="/static/nextdoorv2/images/spinners/16-ajax-loader-green-dark.gif"> Loading more stories...'),
        $this.parent("#feed_view_more_container").show(),
        $.get(dataAction, {},
        function(data) {
            data.success ? ($this.parent("#feed_view_more_container").remove(), $("#nf_stories").append(data.html), nd.feed.initFeedHandlers()) : ($this.addClass("error"), $this.html(data.error))
        },
        "json"),
        !1
    });
    var $window = $(window);
    $window.scroll(function() {
        100 >= $(document).height() - $window.scrollTop() - $window.height() && $("#feed_view_more").trigger(nd.feed.VIEW_MORE_EVENT)
    }),
    nd.feed.checkDocumentHeightViewMore()
},
nd.feed.checkDocumentHeightViewMore = function() {
    $(window).height() == $(document).height() && $("#feed_view_more").trigger(nd.feed.VIEW_MORE_EVENT)
},
nd.feed.initViewMoreStoriesHandlers = function() {
    nd.feed.viewMoreHandler()
},
nd.feed.initExpandStoryHandlers = function() {
    $(document).on("click", "[data-action=expand-story]", nd.feed.expandStory)
},
nd.feed.initCommentStatusHandlers = function() {
    $("a[data-group=comment-status]").unbind(),
    $("a[data-group=comment-status]").click(nd.feed.handleCommentStatusClick)
},
nd.feed.handleCommentStatusClick = function(event) {
    var target = $(event.target),
    post_id = target.data("story-id"),
    data = {
        post_id: post_id
    };
    return $.post("/ajax/toggle_post_for_comments/", data, nd.feed.closeStoryForCommentsCallback, "json"),
    !0
},
nd.feed.closeStoryForCommentsCallback = function(data) {
    return data.success && 1 == data.success && (1 == data.closed_status ? ($("[data-action=comment][data-contentid=" + data.story_id + "]").addClass("hide"), $("[data-action=start-comment][data-contentid=" + data.story_id + "]").addClass("hide"), $("[data-action=start-comment][data-contentid=" + data.story_id + "]").css("display", "none"), $("[data-group=comment-status][data-story-id=" + data.story_id + "]").text("Enable replies"), $("[data-group=closed-for-comment-footer][data-contentid=" + data.story_id + "]").removeClass("hide")) : ($("[data-action=comment][data-contentid=" + data.story_id + "]").removeClass("hide"), $("[data-action=start-comment][data-contentid=" + data.story_id + "]").removeClass("hide"), $("[data-action=start-comment][data-contentid=" + data.story_id + "]").css("display", "block"), $("[data-group=comment-status][data-story-id=" + data.story_id + "]").text("Disable replies"), $("[data-group=closed-for-comment-footer][data-contentid=" + data.story_id + "]").addClass("hide"))),
    !1
},
nd.feed.expandStory = function(event) {
    var storyId = $(event.target).data("storyid");
    return $("#view_more_announce_" + storyId).hide(),
    $("#body_extra_announce_" + storyId).show(),
    !1
},
nd.feed.enableWelcomeAllButtons = function() {
    var enabledWelcomeAlls = $("[data-action=welcome-all][disabled!=disabled]");
    enabledWelcomeAlls.one("click",
    function(event) {
        var welcomeAllButton = $(event.currentTarget),
        nmaId = welcomeAllButton.data("containerid");
        $("#welcome_all_spinner_" + nmaId).show(),
        $.ajax({
            type: "POST",
            url: "/ajax/welcome_neighbors/",
            data: {
                container_id: nmaId
            },
            success: function(data) {
                welcomeAllButton.text("Welcomed all").addClass("liked").attr("disabled", "disabled"),
                $("#welcome_all_spinner_" + nmaId).hide(),
                nd.feed.runLikeCallbacks(JSON.parse(data), welcomeAllButton);
                for (var welcomeBtns = $("#s_" + nmaId + " .welc-btn[disabled!=disabled]"), i = 0; welcomeBtns.length > i; i++) {
                    var $welcomeButton = $(welcomeBtns[i]);
                    nd.feed.incrementCount($welcomeButton),
                    $welcomeButton.addClass("liked").attr("disabled", "disabled"),
                    $welcomeButton.find("[data-class=label]").text("Welcomed!")
                }
            }
        })
    })
},
nd.feed.enableViewDetailsButtons = function() {
    $("[data-action=view-hide-nmas]").off("click"),
    $("[data-action=view-hide-nmas]").on("click",
    function() {
        var target = $(this).data("target");
        "expand" == $(this).data("toggle") ? ($(target).show(), $(this).data("toggle", "collapse"), $(this).children("[data-class=label]").text("Hide Details")) : ($(target).hide(), $(this).data("toggle", "expand"), $(this).children("[data-class=label]").text("View Details"))
    })
},
nd.feed.initTimestampTooltip = function() {},
nd.feed.initFeedHandlers = function() {
    nd.feed.initLikeHandlers(),
    nd.feed.initPhotoHandlers(),
    nd.feed.initCommentHandlers(),
    nd.feed.initDeleteHandlers(),
    nd.feed.initTopictagEditHandlers(),
    nd.feed.initFlagHandlers(),
    nd.feed.initCommentStatusHandlers(),
    nd.feed.initViewMoreStoriesHandlers(),
    nd.feed.initExpandStoryHandlers(),
    nd.feed.enableWelcomeAllButtons(),
    nd.feed.enableViewDetailsButtons(),
    $("#comment_body").autosize(),
    nd.feed.initTimestampTooltip()
};
var nd = nd || {};
nd.postBox = nd.postBox || {};
var DESKTOP_MIN_WIDTH = 767;
nd.postBox.MESSAGE_SUBJECT_STRING,
nd.postBox.MESSAGE_BODY_STRING,
nd.postBox.OTHER_TOPIC_ID,
nd.postBox.SHOW_FAKE_BOX,
nd.postBox.STORY_SUBMITTED = "story_submitted";
var feedTypeToPostSource = [];
feedTypeToPostSource.allactivity = 4,
feedTypeToPostSource.neighborhood = 5,
feedTypeToPostSource.nearby = 6,
feedTypeToPostSource.group = 7,
feedTypeToPostSource.classifieds = 8,
feedTypeToPostSource.free = 9,
feedTypeToPostSource.crimeandsafety = 10,
feedTypeToPostSource.general = 11,
feedTypeToPostSource.lostandfound = 12,
feedTypeToPostSource.topic = 13,
feedTypeToPostSource.documents = 14,
feedTypeToPostSource.city = 15,
feedTypeToPostSource.leads = 16,
nd.postBox.NN_POST_WARNING_MODAL_SEEN = !1,
nd.postBox.initializePostBox = function(otherTopicId, feedType, groupId, userGroups, nearbyMemberCount, verified) {
    nd.postBox.OTHER_TOPIC_ID = otherTopicId,
    nd.postBox.MESSAGE_SUBJECT_STRING = $("#input_subject").attr("placeholder"),
    nd.postBox.MESSAGE_BODY_STRING = $("#input_message").attr("placeholder");
    var defaultAudienceHtml = $("#menu_audience_placeholder").html();
    $("#menu_audience_placeholder").data("defaultHtml", defaultAudienceHtml);
    var defaultCategoryHtml = $("#menu_category_placeholder").html();
    $("#menu_category_placeholder").data("defaultHtml", defaultCategoryHtml),
    $("#city_broadcast_recipients_postbox").select2({
        containerCssClass: "input-block-level select2-postbox-context",
        dropdownCssClass: "select2-postbox-context",
        formatResult: nd.postBox.select2Format
    }),
    $("#postbox_fake").on("click",
    function() {
        nd.postBox.showPostBox(feedType, groupId, userGroups, nearbyMemberCount, verified)
    }),
    $("#photo_id").on("change", nd.postBox.fileUploadDisplay),
    $("#file-upload-remove").on("click", nd.postBox.resetFileUpload),
    $("#menu_audience").on("show",
    function() {
        $("#audience_caret").transition({
            rotate: "-180deg"
        },
        200, "in"),
        $("#menu_audience_placeholder").show(),
        $("#menu_audience_selected").hide()
    }),
    $("#menu_audience").on("hide",
    function() {
        $("#audience_caret").transition({
            rotate: "0deg"
        },
        200, "in"),
        $('#menu_audience input[type="radio"]:checked').val() && nd.postBox.returnSelection("audience", "#menu_audience_toggle", "#menu_audience")
    }),
    $('#menu_audience input[type="radio"]').on("click",
    function() {
        $("#menu_audience").collapse("hide")
    }),
    nd.postBox.initNeighborhoodSelection($("#postbox")),
    $("#menu_category").on("show",
    function() {
        $("#menu_category_toggle").toggleClass("input-last"),
        $("#menu_category").toggleClass("input-last"),
        $("#category_caret").transition({
            rotate: "-180deg"
        },
        200, "in"),
        $("#menu_category_placeholder").show(),
        $("#menu_category_selected").hide()
    }),
    $("#menu_category").on("hide",
    function() {
        $("#category_caret").transition({
            rotate: "0deg"
        },
        200, "in"),
        $('#menu_category input[type="radio"]:checked').val() && nd.postBox.returnSelection("category", "#menu_category_toggle", "#menu_category")
    }),
    $('#menu_category input[type="radio"]').on("change",
    function() {
        $("#menu_category").collapse("hide"),
        "recommendations" != $(this).attr("id") && nd.recommendationCategorySelectionModal.resetSelections()
    }),
    $("#menu_category").on("hidden",
    function() {
        $("#menu_category_toggle").toggleClass("input-last"),
        $("#menu_category").toggleClass("input-last")
    }),
    $("#post_button").on("click", nd.postBox.submitStory),
    $("#close_button").on("click", nd.postBox.postBoxCollapse),
    $("#add_new_button, #add_new_button_desktop").on("click",
    function() {
        nd.postBox.addNewClick(feedType, groupId, userGroups, nearbyMemberCount, verified),
        $(this).hide()
    }),
    $("#nn_post_warning_modal_post_button").one("click", nd.postBox.handleNearbyPostWarningModalPostButtonClick),
    $("#nn_post_warning_modal_revise_button").click(function() {
        $("#menu_audience").collapse("show")
    })
},
nd.postBox.selectOnMapLinkClick = function() {
    $("#city_broadcast_recipients_postbox").select2("close"),
    nd.cityNeighborhoodSelectionModal.displayMap(),
    $("#city_neighborhood_selection_modal").modal("show")
},
nd.postBox.select2Format = function(state) {
    return "Individual Neighborhoods" == state.text || "Neighborhoods" == state.text ? state.text + '<a class="pull-right hidden-phone" href="#" ' + 'onClick="nd.postBox.selectOnMapLinkClick();">Select on a map</a>': state.text
},
nd.postBox.initNeighborhoodSelection = function($form) {
    var selMap, updateModalSummary, $formInput = $form.find("[name=nearby_selective_hoods]"),
    $selectionModal = $("#neighborhood-selection-modal");
    updateModalSummary = function() {
        var $summary = $selectionModal.find("#nearby_summary_counts"),
        $hoods = $('[data-class="neighborhood-control"]'),
        $neighborhoodCount = $summary.find("#nearby_neighborhood_count"),
        $memberCount = $summary.find("#nearby_member_count"),
        neighborhoodCount = 0,
        memberCount = 0;
        $hoods.each(function() {
            $(this).find("input[name=nearby_selective_hoods_checkbox]:checked").length > 0 && (neighborhoodCount += 1, memberCount += $(this).find(".neighborhood-meta").data("member-count"))
        }),
        $neighborhoodCount.pluralize(neighborhoodCount - 1),
        $memberCount.pluralize(memberCount),
        1 === neighborhoodCount ? $summary.find("[data-class=count-modifier]").hide() : $summary.find("[data-class=count-modifier]").show()
    },
    $selectionModal.find("input[name=nearby_selective_hoods_checkbox]").click(updateModalSummary),
    $('[data-toggle="selection-modal"]').on("click",
    function() {
        var $this = $(this),
        inputVal = $formInput.val(),
        values = [],
        mainHoodId = parseInt($("input[name=nearby_selective_hoods_checkbox]:hidden").val(), 10),
        onHoodIds = [];
        "" !== inputVal && (values = inputVal.split(",")),
        $selectionModal.find("[name=nearby_selective_hoods_checkbox]").each(function() {
            var selectValue = 0 === values.length || $.inArray($(this).val(), values) >= 0;
            $(this).prop("checked", selectValue),
            selectValue && onHoodIds.push(parseInt($(this).val(), 10))
        }),
        updateModalSummary(),
        $selectionModal.modal(),
        void 0 === selMap ? (selMap = new nd.neighborhoodMap.SelectionMap("neighborhood_selection_map", $this.data("type"), $this.data("id"), "modal"), selMap.initializeMap(mainHoodId, onHoodIds), $selectionModal.find("[name=nearby_selective_hoods_checkbox]").change(function() {
            var checkedIds = [],
            selectedId = parseInt($(this).val(), 10);
            $("[name=nearby_selective_hoods_checkbox]:checked").each(function() {
                checkedIds.push(parseInt($(this).val(), 10))
            }),
            selMap.styleBoundaries(mainHoodId, checkedIds, selectedId)
        })) : selMap.styleBoundaries(mainHoodId, onHoodIds, null)
    }),
    $selectionModal.find('[data-action="submit-neighborhood-selection"]').click(function() {
        var selectionCounts, $possibleHoods = $selectionModal.find("input[name=nearby_selective_hoods_checkbox]"),
        $selectedHoods = $possibleHoods.filter(":checked"),
        $formNeighborhoodCount = $form.find("#form_nearby_neighborhood_count"),
        $formNeighborCount = $form.find("#form_nearby_member_count");
        if (selectionCounts = nd.postBox.getSelectionModalCounts($selectionModal), 1 === $selectedHoods.length) nd.postBox.resetSelectionModal($form, $selectionModal),
        $form.find('[data-type="neighborhood"]').prop("checked", !0).click();
        else if ($formNeighborhoodCount.pluralize(selectionCounts.neighborhoodCount - 1), $formNeighborCount.pluralize(selectionCounts.neighborCount), $possibleHoods.length !== $selectedHoods.length) {
            var hiddenSelectiveHoods = [];
            $selectedHoods.each(function(i, element) {
                hiddenSelectiveHoods.push($(element).val())
            }),
            $formInput.val(hiddenSelectiveHoods),
            $form.find('[data-type="broadcaster"]').prop("checked", !0).click()
        } else $formInput.val(""),
        $form.find('[data-type="broadcaster"]').prop("checked", !0).click()
    })
},
nd.postBox.getSelectionModalCounts = function($selectionModal) {
    var $hoodControl = $selectionModal.find('[data-class="neighborhood-control"]'),
    neighborhoodCount = 0,
    neighborCount = 0,
    totalNeighborhoodCount = 0,
    totalNeighborCount = 0;
    return $hoodControl.each(function() {
        var curNeighborCount = $(this).find(".neighborhood-meta").data("member-count");
        $(this).find("input[name=nearby_selective_hoods_checkbox]:checked").length > 0 && (neighborhoodCount += 1, neighborCount += curNeighborCount),
        totalNeighborhoodCount += 1,
        totalNeighborCount += curNeighborCount
    }),
    {
        neighborhoodCount: neighborhoodCount,
        totalNeighborhoodCount: totalNeighborhoodCount,
        neighborCount: neighborCount,
        totalNeighborCount: totalNeighborCount
    }
},
nd.postBox.resetSelectionModal = function($form, $selectionModal) {
    var $formNeighborhoodCount = $form.find("#form_nearby_neighborhood_count"),
    $formNeighborCount = $form.find("#form_nearby_member_count"),
    selectionCounts = nd.postBox.getSelectionModalCounts($selectionModal);
    $formNeighborhoodCount.pluralize(selectionCounts.totalNeighborhoodCount - 1),
    $formNeighborCount.pluralize(selectionCounts.totalNeighborCount),
    $form.find("[name=nearby_selective_hoods]").val("")
},
nd.postBox.preselectOptions = function(feedType, groupId, userGroups, nearbyMemberCount, verified) { ("neighborhood" === feedType || null === nearbyMemberCount && 0 == userGroups) && ($('#menu_audience input[data-type="neighborhood"]').attr("checked", !0), nd.postBox.returnSelection("audience", "#menu_audience_toggle", "#menu_audience")),
    "nearby" === feedType && (verified ? ($('#menu_audience input[data-type="broadcaster"]').attr("checked", !0), nd.postBox.returnSelection("audience", "#menu_audience_toggle", "#menu_audience")) : ($('#menu_audience input[data-type="neighborhood"]').attr("checked", !0), nd.postBox.returnSelection("audience", "#menu_audience_toggle", "#menu_audience"))),
    "leads" === feedType && ($('#menu_audience input[data-type="leads"]').attr("checked", !0), nd.postBox.returnSelection("audience", "#menu_audience_toggle", "#menu_audience")),
    "documents" === feedType && ($('#menu_audience input[data-type="neighborhood"]').attr("checked", !0), nd.postBox.returnSelection("audience", "#menu_audience_toggle", "#menu_audience"), $("#menu_category #documents").attr("checked", !0), nd.postBox.returnSelection("documents", "#menu_category_toggle", "#menu_category")),
    "topic" === feedType && $("#menu_category #recommendations").attr("checked", !0),
    "classifieds" === feedType && ($("#menu_category #classifieds").attr("checked", !0), nd.postBox.returnSelection("category", "#menu_category_toggle", "#menu_category")),
    "crimeandsafety" === feedType && ($("#menu_category #crime_and_safety").attr("checked", !0), nd.postBox.returnSelection("category", "#menu_category_toggle", "#menu_category")),
    "group" === feedType && ($("#menu_audience #group_id_" + groupId).attr("checked", !0), nd.postBox.returnSelection("audience", "#menu_audience_toggle", "#menu_audience")),
    "general" === feedType && ($("#menu_category #general").attr("checked", !0), nd.postBox.returnSelection("category", "#menu_category_toggle", "#menu_category")),
    "free" === feedType && ($("#menu_category #free").attr("checked", !0), nd.postBox.returnSelection("category", "#menu_category_toggle", "#menu_category")),
    "lostandfound" === feedType && ($("#menu_category #lost_and_found").attr("checked", !0), nd.postBox.returnSelection("category", "#menu_category_toggle", "#menu_category")),
    "city" === feedType && ($('#menu_audience input[data-type="neighborhood"]').attr("checked", !0), nd.postBox.returnSelection("audience", "#menu_audience_toggle", "#menu_audience"), $("#city_broadcast_recipients_postbox, #city_broadcast_recipients_emergency").on("change",
    function(event) {
        var updatedVal = event.val;
        event.added && (updatedVal = "" === event.added.id ? [event.added.id] : $.grep(event.val,
        function(item) {
            return "" !== item
        })),
        $(this).select2("val", updatedVal)
    }));
    var fakeBoxFeeds = ["neighborhood", "nearby", "group", "city", "allactivity", "leads"];
    nd.postBox.SHOW_FAKE_BOX = $.inArray(feedType, fakeBoxFeeds) > -1 ? !0 : !1
},
nd.postBox.showNearbyPostWarningModal = function() {
    nd.postBox.NN_POST_WARNING_MODAL_SEEN || (nd.postBox.NN_POST_WARNING_MODAL_SEEN = !0, nd.tracker.track("NN Post Warning Modal Shown", {}));
    var hood_count = parseInt($('#form_nearby_neighborhood_count [data-class="count"]').html(), 10),
    member_count = parseInt($('#form_nearby_member_count [data-class="count"]').html(), 10),
    hood_text = " nearby neighborhood" + nd.utils.pluralize(hood_count),
    member_text = " neighbor" + nd.utils.pluralize(member_count);
    $('[data-name="nn_post_warning_hoods"]').html(hood_count + hood_text),
    $('[data-name="nn_post_warning_members"]').html(member_count + member_text),
    $("#nn_post_warning_modal").modal("show")
},
nd.postBox.submitStory = function(event) {
    if (nd.postBox.clearPostBoxErrors(), nd.postBox.checkPostboxForErrors()) return ! 1;
    var post_type = $("#menu_audience input[type=radio]:checked").data("type");
    $("#post_button").data("show-nn-post-warning-modal") === !0 && "broadcaster" === post_type ? nd.postBox.showNearbyPostWarningModal() : (nd.postBox.NN_POST_WARNING_MODAL_SEEN && nd.tracker.track("NN Post Warning Modal Seen and User Switched", {}), nd.postBox.submitStoryHelper(event))
},
nd.postBox.handleNearbyPostWarningModalPostButtonClick = function(event) {
    $("#nn_post_warning_modal_checkbox").is(":checked") ? $.post("/ajax_nn_post_warning/", {
        display: 0
    },
    function() {
        $("#post_button").data("show-nn-post-warning-modal", !1)
    }) : $("#nn_post_warning_modal_post_button").one("click", nd.postBox.handleNearbyPostWarningModalPostButtonClick),
    nd.postBox.NN_POST_WARNING_MODAL_SEEN && nd.tracker.track("NN Post Warning Modal Seen and User Continued", {}),
    nd.postBox.submitStoryHelper(event)
},
nd.postBox.submitStoryHelper = function(event) {
    if (nd.postBox.showPostSpinner(), void 0 !== $("#menu_category input[type=radio]:checked")[0] && "recommendations" === $("#menu_category input[type=radio]:checked")[0].id) {
        var topicIds = nd.recommendationCategorySelectionModal.getSelectedIds();
        topicIds && topicIds.length > 0 ? $("#topic_selector").val(topicIds.join(",")) : $("#topic_selector").val(nd.postBox.OTHER_TOPIC_ID)
    } else $("#topic_selector").val(null);
    return $("#postbox_real").ajaxSubmit({
        type: "POST",
        dataType: "json",
        success: function(data) {
            nd.postBox.submitStoryCallback(data)
        },
        error: function() {
            nd.postBox.showFileUploadError($("#file_upload_error"), "Sorry, but we are unable to post your message at this time. Please try again later.")
        }
    }),
    event.preventDefault(),
    !1
},
nd.postBox.checkPostboxForErrors = function() {
    var errorFound = !1,
    displayError = function(elementID) {
        errorFound = !0,
        $(elementID).addClass("error"),
        $(elementID).on("click focus",
        function() {
            $(elementID).removeClass("error")
        })
    },
    displaySelect2Error = function(elementID) {
        errorFound = !0,
        $(elementID).removeClass("select2-default"),
        $(elementID).addClass("error"),
        $(elementID).css("color", "#e23a24"),
        $(elementID).on("click focus",
        function() {
            $(elementID).removeClass("error"),
            $(elementID).addClass("select2-default"),
            $(elementID).css("color", "#5f5c5c")
        })
    };
    return (void 0 === $('#menu_audience input[type="radio"]:checked').val() || nd.postBox.isCityAudience() && !$("#city_broadcast_recipients_postbox").val()) && displayError("#menu_audience_toggle"),
    null === $("#city_broadcast_recipients_postbox").val() && displaySelect2Error(".select2-input"),
    void 0 === $('#menu_category input[type="radio"]:checked').val() && displayError("#menu_category_toggle"),
    "" === $.trim($("#input_subject").val()) && displayError("#input_subject"),
    "" === $.trim($("#input_message").val()) && displayError("#input_message"),
    errorFound ? ($("#postbox_error").show(), !0) : ($("#postbox_error").hide(), !1)
},
nd.postBox.submitStoryCallback = function(data) {
    if (data) if ("error" in data) nd.postBox.hidePostSpinner(),
    "invalid extension" === data.error ? nd.postBox.showFileUploadError($("#file_upload_error"), data.error_string) : "file size exceeded" === data.error ? nd.postBox.showFileUploadError($("#file_upload_error"), data.error_string) : "missing title" === data.error ? nd.postBox.showFileUploadError($("#file_upload_error"), data.error_string) : "validation error" === data.error && nd.postBox.showFileUploadError($("#file_upload_error"), data.error_string);
    else if (data.story_id) {
        var storyHtml = $(data.html);
        $("#nf_stories").prepend(storyHtml),
        $("#s_" + data.story_id).hide(),
        $("#s_" + data.story_id).fadeIn("slow"),
        nd.feed.initFeedHandlers(),
        nd.postBox.hidePostSpinner(),
        nd.postBox.postBoxCollapse(),
        $(document).trigger(nd.postBox.STORY_SUBMITTED)
    } else {
        var photo_error = data.photo;
        photo_error && ($("#story_error").html("" + photo_error), $("#story_error").show())
    }
},

nd.postBox.showPostBox = function(feedType, groupId, userGroups, nearbyMemberCount, verified) {
    $("#postbox_fake textarea").blur(),
    $("#postbox_fake").hide(),
    $("#postbox_real").addClass("in"),
    $("#postbox_real").show(),
    $("#postbox_real").children("#photo_upload_actions").show(),
    $("#postbox_real textarea").autosize({
        append: "\n"
    }),
    nd.postBox.resetBroadcastRecipients(),
    feedType && ($("#source_selector").val(feedTypeToPostSource[feedType]), nd.postBox.preselectOptions(feedType, groupId, userGroups, nearbyMemberCount, verified)),
    nd.postBox.initRecommendations()
},

nd.postBox.initRecommendations = function() {
    $("#recommendations").click(function() {
        $("#recommendation_category_selection_modal").modal("show"),
        $("#recommendation_category_selections_list").select2({
            containerCssClass: "input-block-level select2-modal-context",
            dropdownCssClass: "select2-modal-context",
            formatResult: nd.postBox.select2Format
        })
    })
},
nd.postBox.postBoxCollapse = function() {
    nd.postBox.NN_POST_WARNING_MODAL_SEEN = !1,
    nd.postBox.clearPostBoxErrors(),
    $("#menu_audience input[type=radio]").attr("checked", !1),
    $("#menu_category input[type=radio]").attr("checked", !1),
    nd.postBox.resetBroadcastRecipients(),
    $("#menu_audience_toggle").children('[data-class="menu-selected"]').hide();
    var audiencePlaceholder = $("#menu_audience_placeholder");
    audiencePlaceholder.html(audiencePlaceholder.data("defaultHtml")).show(),
    $("#input_subject").val("").attr("placeholder", nd.postBox.MESSAGE_SUBJECT_STRING).blur(),
    $("#input_message").val("").attr("placeholder", nd.postBox.MESSAGE_BODY_STRING).blur(),
    $("#menu_category_toggle").children('[data-class="menu-selected"]').hide();
    var categoryPlaceholder = $("#menu_category_placeholder");
    return categoryPlaceholder.html(categoryPlaceholder.data("defaultHtml")).show(),
    nd.postBox.resetSelectionModal($("#postbox"), $("#neighborhood-selection-modal")),
    nd.recommendationCategorySelectionModal.resetSelections(),
    $("#postbox_real").children("#menu_category").hide(),
    $("#postbox_real").children("#photo_upload_actions").hide(),
    $("#postbox_real").hide(),
    nd.postBox.SHOW_FAKE_BOX ? $("#postbox_fake").show() : $("#postbox").hide(),
    $("[name=nearby_selective_hoods]").val(""),
    $("#add_new_button, #add_new_button_desktop").show(),
    nd.postBox.resetFileUpload(),
    !1
},
nd.postBox.returnSelection = function(type, toggle, menu) {
    var audienceIcon = "group" === $(menu).find('input[type="radio"]:checked').data("type") ? "icon-nextdoorv2 icon-m-people": "icon-nextdoorv2 icon-m-pin",
    categoryIcon = "icon-nextdoorv2 icon-m-tag",
    selectedIcon = "audience" === type ? audienceIcon: categoryIcon;
    if ("audience" !== type || !nd.postBox.isCityAudience()) {
        var selectedItem = $(menu).find('input[type="radio"]:checked').parent("label").contents().not("input, small, br, :hidden"),
        selectedText = $(selectedItem).text();
        if ($.trim(selectedText).match("^Recommendations")) {
            var topics = nd.recommendationCategorySelectionModal.getSelectedTexts();
            selectedText = "Recommendations",
            topics && topics.length > 0 && (selectedText += " (" + topics.join(", ") + ")")
        }
        $(toggle).children('[data-class="placeholder"]').hide();
        var itemToShow = $('<div><i class="' + selectedIcon + '"></i><span></span></div>');
        $(itemToShow).children("span").text(selectedText),
        $(toggle).children('[data-class="menu-selected"]').html(itemToShow.html()).show()
    }
    var currOption = $("#menu_audience input[type=radio]:checked");
    $("input[name=leads_post]").val(""),
    "neighborhood" === currOption.data("type") ? ($("input[name=group]").val(""), $("input[name=neighborhood]").val(currOption.data("value")), $("#menu_category").show()) : "broadcaster" === currOption.data("type") ? ($("input[name=group]").val(currOption.data("value")), $("input[name=neighborhood]").val(""), $("#menu_category").show()) : "group" === currOption.data("type") ? ($("input[name=group]").val(currOption.data("value")), $("input[name=neighborhood]").val(""), $("#menu_category").show()) : "leads" == currOption.data("type") && ($("input[name=leads_post]").val(!0), $("input[name=group]").val(currOption.data("value")), $("input[name=neighborhood]").val(""), $("#menu_category").show())
},
nd.postBox.isCityAudience = function() {
    return $("#city_broadcast_recipients_postbox").length > 0
},
nd.postBox.fileUploadDisplay = function() {
    "" !== $("#photo_id").val() && ($("#file-upload-name").text($("#photo_id").val().split("\\").pop().split("/").pop()), $("#file-upload-remove").show())
},
nd.postBox.resetFileUpload = function() {
    $("#photo_id").val(""),
    $("#file-upload-name").text(""),
    $("#file-upload-remove").hide()
},
nd.postBox.resetBroadcastRecipients = function() {
    $("#city_broadcast_recipients_postbox, #city_broadcast_recipients_emergency").select2("val", []),
    nd.cityNeighborhoodSelectionModal && nd.cityNeighborhoodSelectionModal.resetSelections()
},

nd.postBox.showFileUploadError = function(element, error_string) {
    element.html(error_string),
    element.addClass("error").show()
},
nd.postBox.clearPostBoxErrors = function() {
    $("#postbox_real").find('[data-class="control-group"]').find(".error").removeClass("error"),
    $("#postbox_error").hide(),
    $("#file_upload_error").text("").hide()
},

nd.postBox.showPostSpinner = function() {
    var postBoxHeight = $("#postbox_real").outerHeight();
    return $("#postbox_real").hide(),
    $("#postbox_spinner").css("height", postBoxHeight),
    $("#postbox_spinner img").css("marginTop", postBoxHeight / 2 - 25),
    $("#postbox_spinner").show(),
    !1
},
nd.postBox.hidePostSpinner = function() {
    $("#postbox_spinner").hide(),
    $("#postbox_fake").show()
},

nd.postBox.addNewClick = function(feedType, groupId, userGroups, nearbyMemberCount, verified) {
    nd.postBox.showPostBox(feedType, groupId, userGroups, nearbyMemberCount, verified),
    $("#postbox").show(),
    $('.header ul[role="menubar"]').hide()
};

var nd = nd || {};
nd.mapUtils = nd.mapUtils || {},
nd.mapUtils.gParcelOverlay = null,
nd.mapUtils.aimStreetView = function(panorama, cameraLatLng, targetLatLng) {
    var ydiff = targetLatLng.lng() - cameraLatLng.lng(),
    xdiff = targetLatLng.lat() - cameraLatLng.lat();
    if (Math.abs(xdiff) > 1e-10 || Math.abs(ydiff) > 1e-10) {
        var theta = 180 * Math.atan2(ydiff, xdiff) / Math.PI;
        theta = (theta + 360) % 360,
        panorama.setPov({
            heading: theta,
            pitch: 0,
            zoom: 1
        })
    }
},
nd.mapUtils.addCopyright = function(gMap) {
    today = new Date,
    copyrightNode = document.createElement("div"),
    copyrightNode.id = "copyright-control",
    copyrightNode.style.fontSize = "10px",
    copyrightNode.style.fontFamily = "Arial, sans-serif",
    copyrightNode.style.margin = "0 -45px -1px 0",
    copyrightNode.style.whiteSpace = "nowrap",
    copyrightNode.style.color = "#000",
    copyrightNode.index = 0,
    copyrightNode.innerHTML = "Parcel data &copy;" + today.getFullYear() + " DMP; ",
    $(copyrightNode).css("-moz-user-select", "-moz-none"),
    $(copyrightNode).css("-khtml-user-select", "none"),
    $(copyrightNode).css("-webkit-user-select", "none"),
    $(copyrightNode).css("-user-select", "none"),
    $(copyrightNode).attr("unselectable", "on"),
    gMap.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(copyrightNode)
},
nd.mapUtils.makePolygon = function(coord_data, is_simple) {
    var all_coords = [];
    if (is_simple) for (var j = 0; coord_data.length > j; j++) all_coords[j] = new google.maps.LatLng(coord_data[j][1], coord_data[j][0]);
    else for (var j = 0; coord_data.length > j; j++) {
        var coords = [];
        cur_data = coord_data[j];
        for (var k = 0; cur_data.length > k; k++) coords[k] = new google.maps.LatLng(cur_data[k][1], cur_data[k][0]);
        all_coords[j] = coords
    }
    return new google.maps.Polygon({
        paths: all_coords,
        strokeColor: "blue",
        strokeOpacity: .8,
        strokeWeight: 2,
        fillColor: "gray",
        fillOpacity: .25
    })
},
nd.mapUtils.propagateEvents = function(object, is_boundary, callbacks, params) {
    var callback;
    google.maps.event.addListener(object, "mousemove",
    function(e) {
        google.maps.event.trigger(gMap, "mousemove", e)
    }),
    google.maps.event.addListener(object, "mousedown",
    function(e) {
        google.maps.event.trigger(gMap, "mousedown", e)
    }),
    google.maps.event.addListener(object, "mouseup",
    function(e) {
        google.maps.event.trigger(gMap, "mouseup", e)
    }),
    is_boundary && (google.maps.event.addListener(object, "click",
    function(e) {
        return google.maps.event.trigger(gMap, "click", e),
        callbacks && "click" in callbacks ? (callback = callbacks.click, callback(params, e.latLng)) : void 0
    }), google.maps.event.addListener(object, "mouseover",
    function(e) {
        return google.maps.event.trigger(gMap, "mouseover", e),
        callbacks && "mouseover" in callbacks ? (callback = callbacks.mouseover, callback(params, e.latLng)) : void 0
    }), google.maps.event.addListener(object, "mouseout",
    function(e) {
        return google.maps.event.trigger(gMap, "mouseout", e),
        callbacks && "mouseout" in callbacks ? (callback = callbacks.mouseout, callback(params, e.latLng)) : void 0
    }))
},
nd.mapUtils.calcLatLonBoundingBox = function(top, bot) {
    var originShift, topx, topy, botx, boty;
    return originShift = 6378137 * 2 * Math.PI / 2,
    topx = top.lng() * originShift / 180,
    topy = Math.log(Math.tan((90 + top.lat()) * Math.PI / 360)) / (Math.PI / 180),
    topy = topy * originShift / 180,
    botx = bot.lng() * originShift / 180,
    boty = Math.log(Math.tan((90 + bot.lat()) * Math.PI / 360)) / (Math.PI / 180),
    boty = boty * originShift / 180,
    topx + "," + boty + "," + botx + "," + topy
},
nd.mapUtils.addTileOverlay = function(gMap, layerName, hwm, hostName) {
    if (null != gMap) {
        var gMap = gMap,
        url = hostName + "/tiles?TRANSPARENT=TRUE&LAYERS=" + layerName + "&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap" + "&STYLES=&SRS=EPSG%3A3857&WIDTH=256&HEIGHT=256&HWM=" + hwm;
        nd.mapUtils.createTileOverlay(gMap, url, layerName),
        nd.mapUtils.registerTileOverlay(gMap, nd.mapUtils.gParcelOverlay)
    }
},
nd.mapUtils.createTileOverlay = function(gMap, urlTemplate, name) {
    name = name || "",
    nd.mapUtils.gParcelOverlay = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            var proj = gMap.getProjection(),
            zfactor = Math.pow(2, zoom),
            top = proj.fromPointToLatLng(new google.maps.Point(256 * coord.x / zfactor, 256 * coord.y / zfactor)),
            bot = proj.fromPointToLatLng(new google.maps.Point(256 * (coord.x + 1) / zfactor, 256 * (coord.y + 1) / zfactor)),
            bbox = nd.mapUtils.calcLatLonBoundingBox(top, bot),
            url = urlTemplate + "&BBOX=" + bbox + "&ZOOM=" + zoom;
            return url
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: !0,
        maxZoom: 9,
        minZoom: 0,
        name: name
    })
},
nd.mapUtils.registerTileOverlay = function(gMap, parcelOverlay) {
    var isPresent = !1;
    if (null != gMap && null != parcelOverlay) {
        for (var i = 0; gMap.overlayMapTypes.getLength() > i; ++i) if (gMap.overlayMapTypes.getAt(i) == parcelOverlay) {
            isPresent = !0;
            break
        }
        isPresent || gMap.overlayMapTypes.push(parcelOverlay)
    }
},
nd.mapUtils.unregisterTileOverlay = function(gMap, parcelOverlay) {
    if (null != gMap && null != parcelOverlay) for (var i = 0; gMap.overlayMapTypes.getLength() > i; ++i) gMap.overlayMapTypes.getAt(i) == parcelOverlay && gMap.overlayMapTypes.removeAt(i)
};
var nd = nd || {}; (function($) {
    var BoundaryOverlay = function(content, latLng) {
        this.span = null,
        this.content = content,
        this.latLng = latLng
    };
    nd.BoundaryOverlay = BoundaryOverlay,
    BoundaryOverlay.prototype = new google.maps.OverlayView,
    BoundaryOverlay.prototype.onAdd = function() {
        this.span = document.createElement("span"),
        $(this.span).addClass("neighborhood-name"),
        this.span.innerHTML = this.content;
        var panes = this.getPanes();
        panes.overlayMouseTarget.appendChild(this.span)
    },
    BoundaryOverlay.prototype.onRemove = function() {
        this.span.parentNode.removeChild(this.span),
        this.span = null
    },
    BoundaryOverlay.prototype.draw = function() {
        var overlayProjection = this.getProjection(),
        point = overlayProjection.fromLatLngToDivPixel(this.latLng),
        zoom = this.map.getZoom();
        if (zoom > 8) {
            $(this.span).show();
            var width = $(this.span).width(),
            height = $(this.span).height(),
            xPosition = point.x - width / 2,
            yPosition = point.y - height / 2;
            $(this.span).css({
                position: "absolute",
                left: xPosition,
                top: yPosition
            })
        } else $(this.span).hide()
    }
})(window.jQuery);
var nd = nd || {};
nd.neighborhoodMap = nd.neighborhoodMap || {},
nd.neighborhoodMap.DEFAULT_OPTIONS = {
    scrollwheel: !1,
    mapTypeControl: !1,
    zoom: 14,
    streetViewControl: !1,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: !1,
    zoomControl: !0,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.MEDIUM
    },
    styles: [{
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            visibility: "on"
        },
        {
            color: "#ffffff"
        }]
    },
    {
        featureType: "poi",
        stylers: [{
            visibility: "off"
        }]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [{
            visibility: "simplified"
        }]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [{
            color: "#ffffff"
        }]
    },
    {
        featureType: "road.arterial",
        elementType: "labels.text.stroke",
        stylers: [{
            visibility: "simplified"
        }]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#e4dddd"
        }]
    },
    {
        featureType: "administrative.neighborhood",
        elementType: "labels.text.fill",
        stylers: [{
            visibility: "off"
        }]
    },
    {
        featureType: "administrative.locality",
        stylers: [{
            visibility: "off"
        }]
    }]
},
nd.neighborhoodMap.DEFAULT_STYLE_OPTIONS = {
    markerColorDistributor: 13,
    markerColorModulus: 23,
    polygonStyle: {
        lockStatus: {
            launched: {
                strokeColor: "#E8C156",
                strokeWeight: 1,
                fillColor: "#E8C156",
                fillOpacity: .3
            },
            expired: {
                strokeColor: "#DC143C",
                strokeWeight: 1,
                fillColor: "#DC143C",
                fillOpacity: .3
            },
            trial: {
                strokeColor: "#B8860B",
                strokeWeight: 1,
                fillColor: "#B8860B",
                fillOpacity: .3
            },
            deleted: {
                strokeColor: "#808080",
                strokeWeight: 1,
                fillColor: "#808080",
                fillOpacity: .3
            }
        },
        selection: {
            main: {
                strokeColor: "#EA9556",
                strokeWeight: 1,
                fillColor: "#E8C156",
                fillOpacity: .6
            },
            on: {
                strokeColor: "#51a351",
                strokeWeight: 1,
                fillColor: "#51a351",
                fillOpacity: .3
            },
            off: {
                strokeColor: "#A9A9A9",
                strokeWeight: 1,
                fillColor: "#A9A9A9",
                fillOpacity: .3
            }
        }
    },
    polygonInteractionStyle: {
        selected: {
            strokeWeight: 2,
            fillOpacity: .6
        }
    }
},
nd.neighborhoodMap.INTERACTION_TYPE = {
    desktop: ["click", "mouseover", "mouseout"],
    tablet: ["click"]
},
nd.neighborhoodMap.HOODS_URL = "/ajax/map_hoods_data/",
nd.neighborhoodMap.TOOLS_HOODS_URL = "/ajax/get_tools_nearby_hoods/",
nd.neighborhoodMap.mapType = {},
nd.neighborhoodMap.mapType.BROADCAST_NEIGHBORHOOD = "broadcast-neighborhood",
nd.neighborhoodMap.mapType.BROADCAST_GROUP = "broadcast-group",
nd.neighborhoodMap.mapType.NEARBY_LIST_GROUP = "nearby-list-group",
nd.neighborhoodMap.mapType.NEIGHBORHOOD = "neighborhood",
nd.neighborhoodMap.mapType.POST = "post",
nd.neighborhoodMap.selectionMapOptions = {
    modal: {
        zoom: 13
    },
    full: {
        zoom: 14
    }
},
function($) {
    var Boundary = function(id, options) {
        var defaultOptions = {
            style: "launched",
            selectedStyle: "selected"
        };
        options = $.extend({},
        defaultOptions, options),
        this.id = id,
        this.map = options.map,
        this.style = this.map.getBoundaryStyle(options.style),
        this.selectedStyle = options.selectedStyle && this.map.getInteractionStyle(options.selectedStyle) || this.map.getInteractionStyle("selected"),
        this.polygon = options.polygon,
        this.polygon.setOptions(this.style),
        this.polygon.setVisible(!1),
        this.overlay = options.overlay,
        options.infoWindow && (this.infoWindow = options.infoWindow),
        this.lock_status = options.lock_status,
        this.attachHoverHandlers(),
        this.attachClickHandlers()
    };
    Boundary.prototype = {
        render: function() {
            this.polygon.setMap(this.map.googleMap),
            this.polygon.setVisible(!0),
            this.overlay.setMap(this.map.googleMap)
        },
        hide: function() {
            this.infoWindow && this.infoWindow.close(),
            this.overlay.setMap(null),
            this.polygon.setVisible(!1)
        },
        changeStyle: function(style, select) {
            this.style = this.map.getBoundaryStyle(style),
            select ? this.polygon.setOptions($.extend({},
            this.style, this.selectedStyle)) : this.polygon.setOptions(this.style)
        },
        select: function() {
            this.polygon.setOptions(this.selectedStyle)
        },
        showInfoWindow: function() {
            this.infoWindow && this.infoWindow.open(this.map.googleMap)
        },
        closeInfoWindow: function() {
            this.infoWindow && this.infoWindow.close()
        },
        getBounds: function() {
            var bounds = new google.maps.LatLngBounds;
            return this.polygon.getPaths().forEach(function(path) {
                path.forEach(function(latLng) {
                    bounds.extend(latLng)
                })
            }),
            bounds
        },
        deselect: function() {
            this.polygon.setOptions(this.style)
        },
        attachClickHandlers: function() {
            var boundary = this;
            this.polygon.addListener("click",
            function() {
                boundary.map.supportsEvent("click") && (boundary.map.select(boundary.id), boundary.map.showInfoWindow(boundary.id))
            }),
            this.infoWindow && this.infoWindow.addListener("closeclick",
            function() {
                boundary.map.supportsEvent("click") && boundary.map.deselect(boundary.id)
            })
        },
        attachHoverHandlers: function() {
            var boundary = this;
            this.polygon.addListener("mouseover",
            function() {
                boundary.map.supportsEvent("mouseover") && boundary.map.select(boundary.id)
            }),
            this.polygon.addListener("mouseout",
            function() {
                boundary.map.supportsEvent("mouseout") && boundary.map.deselect(boundary.id)
            })
        },
        addListener: function(eventType, fn) {
            var boundary = this;
            this.polygon.addListener(eventType,
            function(e) {
                boundary.map.supportsEvent(eventType) && fn(boundary, e)
            })
        }
    };
    var Map = function(elementId, boundaryId, interactionType, mapOptions, polygonStyle) {
        this.mapElement = document.getElementById(elementId),
        this.mainBoundaryId = boundaryId,
        this.interactionType = interactionType,
        this.googleMap = null,
        this.mapOptions = $.extend({},
        nd.neighborhoodMap.DEFAULT_OPTIONS, mapOptions || {}),
        this.polygonStyle = polygonStyle || "selection",
        this.styleOptions = nd.neighborhoodMap.DEFAULT_STYLE_OPTIONS,
        this.boundaries = {},
        this.latLngBounds = new google.maps.LatLngBounds,
        this.selectedBoundary = null,
        this.shownBoundaryInfoWindow = null
    };
    Map.prototype = {
        constructor: Map,
        getBoundaryStyle: function(style) {
            return this.styleOptions.polygonStyle[this.polygonStyle][style]
        },
        getInteractionStyle: function(style) {
            return this.styleOptions.polygonInteractionStyle[style]
        },
        centerMap: function(lat, lng) {
            return this.mapOptions.center = new google.maps.LatLng(lat, lng),
            this
        },
        offsetMapCenter: function(offsetX, offsetY) {
            var listener = this.googleMap.addListener("projection_changed",
            function() {
                var centerPoint, projection = this.getProjection(),
                pixelScale = Math.pow(2, this.getZoom());
                centerPoint = projection.fromLatLngToPoint(this.getCenter()),
                this.setCenter(projection.fromPointToLatLng(new google.maps.Point(centerPoint.x + offsetX / pixelScale, centerPoint.y + offsetY / pixelScale))),
                google.maps.event.removeListener(listener)
            });
            return this
        },
        addBoundary: function(boundaryData, options, render) {
            var latLng, boundary, boundaryId = boundaryData.id,
            centroid = boundaryData.centroid,
            shortName = boundaryData.short_name,
            coordData = boundaryData.coord_data,
            isSimple = boundaryData.is_simple,
            boundaryOptions = {};
            return boundaryOptions.map = this,
            boundaryOptions.polygon = nd.mapUtils.makePolygon(coordData, isSimple),
            boundaryOptions.polygon.setOptions({
                zIndex: -2
            }),
            latLng = new google.maps.LatLng(centroid[1], centroid[0]),
            boundaryOptions.overlay = new nd.BoundaryOverlay(shortName, latLng),
            $("[data-info-window-id=" + boundaryId + "]").length >= 0 && (boundaryOptions.infoWindow = new google.maps.InfoWindow({
                content: $("[data-info-window-id=" + boundaryId + "]").html(),
                position: latLng
            })),
            $.extend(boundaryOptions, options),
            boundary = new Boundary(boundaryId, boundaryOptions),
            this.boundaries[boundaryId] = boundary,
            this.latLngBounds.union(boundary.getBounds()),
            render && (boundary.render(), this.googleMap.setCenter(this.latLngBounds.getCenter())),
            this
        },
        render: function() {
            return this.googleMap = new google.maps.Map(this.mapElement, this.mapOptions),
            $.each(this.boundaries,
            function(i, boundary) {
                boundary.render()
            }),
            this.googleMap.fitBounds(this.latLngBounds),
            this.googleMap.setCenter(this.latLngBounds.getCenter()),
            nd.mapUtils.addCopyright(this.googleMap),
            this
        },
        supportsEvent: function(eventType) {
            return $.inArray(eventType, nd.neighborhoodMap.INTERACTION_TYPE[this.interactionType]) >= 0
        },
        select: function(boundaryId) {
            var map = this;
            return boundaryId in this.boundaries && $.each(this.boundaries,
            function(mapBoundaryId, mapBoundary) {
                mapBoundaryId == boundaryId ? map.selectedBoundary != boundaryId && (mapBoundary.select(), map.selectedBoundary = boundaryId) : mapBoundary.deselect()
            }),
            this
        },
        deselect: function(boundaryId) {
            return boundaryId ? boundaryId in this.boundaries && (this.boundaries[boundaryId].deselect(), this.selectedBoundary === boundaryId && (this.selectedBoundary = null)) : $.each(this.boundaries,
            function(mapBoundaryId, mapBoundary) {
                mapBoundary.deselect()
            }),
            this
        },
        showInfoWindow: function(boundaryId) {
            this.shownBoundaryInfoWindow && this.boundaries[this.shownBoundaryInfoWindow].closeInfoWindow(),
            boundaryId && (this.boundaries[boundaryId].showInfoWindow(), this.shownBoundaryInfoWindow = boundaryId)
        },
        getBoundary: function(boundaryId) {
            return this.boundaries[boundaryId]
        },
        styleBoundaries: function(getStyle, isSelected) {
            $.each(this.boundaries,
            function(i, boundary) {
                boundary.changeStyle(getStyle(boundary), isSelected(boundary))
            })
        }
    };
    var SelectionMap = function(mapElementId, type, id, size, offset) {
        this.type = type,
        this.id = id,
        this.mapElementId = mapElementId,
        this.map = null,
        this.size = size || "full",
        this.offset = offset || {}
    };
    SelectionMap.prototype = {
        constructor: SelectionMap,
        initializeMap: function(mainHoodId, onHoodIds) {
            var map, renderMap, getBoundaryStyle, selectNeighborhoodControl, neighborhoodControls = $("[data-class=neighborhood-control]"),
            isTouchDevice = !1,
            offset = this.offset;
            selectNeighborhoodControl = function(hoodId, scroll) {
                neighborhoodControls.each(function(i, control) {
                    var $control = $(control);
                    hoodId && $control.data("neighborhood-id") == hoodId ? ($control.addClass("selected"), scroll && $.smoothScroll({
                        scrollElement: $control.closest("ul.neighborhood-list"),
                        scrollTarget: $control
                    })) : $control.removeClass("selected")
                })
            },
            map = new nd.neighborhoodMap.Map(this.mapElementId, mainHoodId, isTouchDevice ? "tablet": "desktop", nd.neighborhoodMap.selectionMapOptions[this.size], "selection"),
            this.map = map,
            getBoundaryStyle = this.getBoundaryStyleFactory(mainHoodId, onHoodIds),
            renderMap = function(data) {
                var hoodBoundaryData = data.boundaries[0];
                map.centerMap(hoodBoundaryData.centroid[1], hoodBoundaryData.centroid[0]),
                $.each(data.boundaries,
                function(i, boundary) {
                    var mapBoundary, boundaryOptions = {};
                    boundaryOptions.style = getBoundaryStyle(boundary),
                    boundaryOptions.lock_status = boundary.lock_status,
                    map.addBoundary(boundary, boundaryOptions, !1),
                    mapBoundary = map.getBoundary(boundary.id),
                    mapBoundary.addListener("click",
                    function(eventBoundary) {
                        selectNeighborhoodControl(eventBoundary.id, !0)
                    }),
                    mapBoundary.addListener("mouseover",
                    function(eventBoundary) {
                        selectNeighborhoodControl(eventBoundary.id, !1)
                    }),
                    mapBoundary.addListener("mouseout",
                    function() {
                        selectNeighborhoodControl(null, !1)
                    })
                }),
                map.render().offsetMapCenter(offset.left || 0, offset.top || 0),
                map.select(mainHoodId, !1)
            };
            var params = {
                id: this.id,
                type: this.type
            };
            return $.getJSON(this.getBoundaryURL(), params, renderMap),
            neighborhoodControls.click(function() {
                var neighborhoodId = $(this).data("neighborhood-id");
                selectNeighborhoodControl(neighborhoodId, !1),
                map.select(neighborhoodId),
                map.showInfoWindow(neighborhoodId)
            }),
            neighborhoodControls.mouseover(function() {
                if (!isTouchDevice) {
                    var neighborhoodId = $(this).data("neighborhood-id");
                    selectNeighborhoodControl(neighborhoodId, !1),
                    map.select(neighborhoodId)
                }
            }),
            neighborhoodControls.mouseout(function() {
                if (!isTouchDevice) {
                    var neighborhoodId = $(this).data("neighborhood-id");
                    selectNeighborhoodControl(neighborhoodId, !1),
                    map.deselect(neighborhoodId)
                }
            }),
            $(document).on("touchstart",
            function() {
                isTouchDevice = !0,
                map && (map.interactionType = "tablet")
            }),
            map
        },
        getBoundaryURL: function() {
            return nd.neighborhoodMap.HOODS_URL
        },
        getBoundaryStyleFactory: function(mainHoodId, onHoodIds) {
            return function(boundary) {
                return boundary.id == mainHoodId ? "main": $.inArray(boundary.id, onHoodIds) >= 0 ? "on": "off"
            }
        },
        styleBoundaries: function(mainHoodId, onHoodIds, selectedId) {
            var getBoundaryStyle, isSelected;
            getBoundaryStyle = this.getBoundaryStyleFactory(mainHoodId, onHoodIds),
            isSelected = function(boundary) {
                return selectedId ? boundary.id == selectedId: !1
            },
            this.map.styleBoundaries(getBoundaryStyle, isSelected)
        }
    };
    var RegionalMap = function(mapElementId, type, id, size, offset) {
        this.type = type,
        this.mapElementId = mapElementId,
        this.map = null,
        this.size = size,
        this.offset = offset || {}
    };
    RegionalMap.prototype = {
        constructor: RegionalMap,
        initializeMap: function(boundaryData, eventHandlers) {
            var map, getBoundaryStyle, isTouchDevice = !1,
            offset = this.offset;
            map = new nd.neighborhoodMap.Map(this.mapElementId, 1, isTouchDevice ? "tablet": "desktop", nd.neighborhoodMap.selectionMapOptions[this.size], "lockStatus"),
            this.map = map,
            getBoundaryStyle = this.getBoundaryStyleFactory(null, null);
            var hoodBoundaryData = boundaryData[0];
            return map.centerMap(hoodBoundaryData.centroid[1], hoodBoundaryData.centroid[0]),
            $.each(boundaryData,
            function(i, boundary) {
                var mapBoundary, boundaryOptions = {};
                boundaryOptions.style = getBoundaryStyle(boundary),
                map.addBoundary(boundary, boundaryOptions, !1),
                mapBoundary = map.getBoundary(boundary.id);
                for (eventName in eventHandlers) mapBoundary.addListener(eventName, eventHandlers[eventName])
            }),
            map.render().offsetMapCenter(offset.left || 0, offset.top || 0),
            $(document).on("touchstart",
            function() {
                isTouchDevice = !0,
                map && (map.interactionType = "tablet")
            }),
            map
        },
        getBoundaryStyleFactory: function() {
            return function(boundary) {
                switch (boundary.lock_status) {
                case 2:
                    return "launched";
                case 3:
                    return "trial";
                case 4:
                    return "expired";
                default:
                    return "deleted"
                }
            }
        }
    };
    var ToolsSelectionMap = function(mapElementId, type, id, size, offset, radius) {
        SelectionMap.call(this, mapElementId, type, id, size, offset),
        this.radius = radius
    };
    ToolsSelectionMap.prototype = new SelectionMap,
    ToolsSelectionMap.prototype.getBoundaryURL = function() {
        return nd.neighborhoodMap.TOOLS_HOODS_URL + "?radius=" + this.radius
    },
    nd.neighborhoodMap.Map = Map,
    nd.neighborhoodMap.Boundary = Boundary,
    nd.neighborhoodMap.SelectionMap = SelectionMap,
    nd.neighborhoodMap.RegionalMap = RegionalMap,
    nd.neighborhoodMap.ToolsSelectionMap = ToolsSelectionMap
} (window.jQuery),
nd.neighborhoodMap.getCoords = function(type, id, callback) {
    var params = {
        id: id,
        type: type
    };
    $.getJSON(nd.neighborhoodMap.HOODS_URL, params, callback)
};
var nd = nd || {};
nd.nearbyPrefs = nd.nearbyPrefs || {},
nd.nearbyPrefs.NN_AJAX_QUEUE = "nn_ajax_queue",
nd.nearbyPrefs.PREFS_URL = "/ajax_change_nearby_neighborhoods_prefs/",
nd.nearbyPrefs.TOOLS_URL = "/tools/edit_nearby_neighborhoods/{0}/",
nd.nearbyPrefs.initialize = function(mapElementId, mainHoodId, onHoodIds, options) {
    var $errorModal = $("#error_modal"),
    $nearbyNeighborhoodsInfo = $("#nearby_neighborhoods_info"),
    $nearbyNeighborhoodsInfoShow = $("#nearby_neighborhoods_info_show"),
    $nearbyNeighborhoodsInfoClose = $("#nearby_neighborhoods_info_close"),
    $personalizeFormInfo = $("#personalize_form_info"),
    options = $.extend({
        useToolsMap: !1,
        radius: 2
    },
    options),
    selMap = null,
    map = null,
    url = options.useToolsMap ? nd.nearbyPrefs.TOOLS_URL.replace("{0}", mainHoodId) : nd.nearbyPrefs.PREFS_URL;
    selMap = options.useToolsMap ? new nd.neighborhoodMap.ToolsSelectionMap(mapElementId, "broadcast-neighborhood-prefs", mainHoodId, "full", {
        left: $personalizeFormInfo.outerWidth() / 2,
        top: $nearbyNeighborhoodsInfo.outerHeight() / 2
    },
    options.radius) : new nd.neighborhoodMap.SelectionMap(mapElementId, "broadcast-neighborhood-prefs", mainHoodId, "full", {
        left: $personalizeFormInfo.outerWidth() / 2,
        top: $nearbyNeighborhoodsInfo.outerHeight() / 2
    }),
    map = selMap.initializeMap(mainHoodId, onHoodIds),
    $nearbyNeighborhoodsInfoClose.click(function() {
        $nearbyNeighborhoodsInfo.addClass("collapsed"),
        $nearbyNeighborhoodsInfoShow.show(),
        $nearbyNeighborhoodsInfoClose.hide()
    }),
    $nearbyNeighborhoodsInfoShow.click(function() {
        $nearbyNeighborhoodsInfo.removeClass("collapsed"),
        $nearbyNeighborhoodsInfoClose.show(),
        $nearbyNeighborhoodsInfoShow.hide()
    }),
    $nearbyNeighborhoodsInfoClose.filter("[data-action=save-prefs-nn-introduction]").one("click",
    function() {
        $.post("/nearby_neighborhoods_prefs/", {
            hide_prefs_nn_introduction: !0
        })
    }),
    $("input[name=nearby_hoods]").change(function() {
        var neighborhoodId = $(this).attr("value"),
        changeData = {};
        $("input[name=nearby_hoods]").each(function() {
            var $this = $(this);
            changeData[$this.val()] = $this.is(":checked")
        }),
        $.postq(nd.nearbyPrefs.NN_AJAX_QUEUE, url, changeData,
        function(data) {
            var $neighborhoodControls = $("[data-class=neighborhood-control]"),
            allHoods = 0,
            onHoods = 0,
            allMemberCount = 0,
            onMemberCount = 0,
            allHouseholdCount = 0,
            onHouseholdCount = 0;
            data.success ? selMap.styleBoundaries(mainHoodId, data.user_nearby_neighborhoods, neighborhoodId) : ($errorModal.find("#modal_error_message").html(data.error), $errorModal.modal()),
            $neighborhoodControls.each(function(i, element) {
                var memberCount = parseInt($(element).find(".message-meta").data("member-count"), 10),
                householdCount = parseInt($(element).find(".message-meta").data("household-count"), 10);
                allMemberCount += memberCount,
                allHoods += 1,
                allHouseholdCount += householdCount,
                $(this).find("input[name=nearby_hoods]").prop("checked") && (onMemberCount += memberCount, onHoods += 1, onHouseholdCount += householdCount)
            }),
            $("#nearby_neighborhoods_on_member_count").pluralize(onMemberCount),
            $("#nearby_neighborhoods_off_member_count").pluralize(allMemberCount - onMemberCount),
            $("#nearby_neighborhoods_on_household_count").pluralize(onHouseholdCount),
            $("#nearby_neighborhoods_off_household_count").pluralize(allHouseholdCount - onHouseholdCount),
            $("#nearby_neighborhood_on_count").pluralize(onHoods - 1),
            $("#nearby_neighborhood_off_count").pluralize(allHoods - onHoods),
            map.select(neighborhoodId)
        },
        "json")
    })
};
var nd = nd || {};
nd.neighborhoodMapModal = nd.neighborhoodMapModal || {},
nd.neighborhoodMapModal.mapModal = function($modal, options) {
    var renderModal, cachedData, id = options.id,
    type = options.type,
    dataKey = type + "-cache";
    renderModal = function(data) {
        var map, sourceHoodId = data.source_hood_id,
        hoodBoundaryData = data.boundaries[0],
        cachedData = $modal.data(dataKey) || {};
        $modal.find("#nearby_modal_title").text(data.title),
        $modal.find("#nearby_hoods_table").replaceWith(data.data_table),
        $modal.modal("show"),
        cachedData[id] = data,
        $modal.data(dataKey, cachedData),
        map = new nd.neighborhoodMap.Map("map_modal_canvas", sourceHoodId, null, {
            zoom: 13
        },
        "selection"),
        map.centerMap(hoodBoundaryData.centroid[1], hoodBoundaryData.centroid[0]),
        $.each(data.boundaries,
        function(i, boundary) {
            var boundaryOptions = {};
            boundaryOptions.style = sourceHoodId === boundary.id ? "main": "on",
            map.addBoundary(boundary, boundaryOptions, !1),
            map.getBoundary(boundary.id)
        }),
        map.render()
    },
    cachedData = $modal.data(dataKey) || {},
    id in cachedData ? renderModal(cachedData[id]) : nd.neighborhoodMap.getCoords(type, id, renderModal)
},
nd.neighborhoodMapModal.initialize = function() {
    $(document).on("click", '[data-toggle="map-modal"]',
    function() {
        var $this = $(this),
        $modal = $($this.data("target"));
        nd.neighborhoodMapModal.mapModal($modal, $this.data())
    })
};
var nd = nd || {};
nd.recommendationCategorySelectionModal = nd.recommendationCategorySelectionModal || {},
nd.recommendationCategorySelectionModal.resetSelections = function() {
    $("#recommendation_category_selections_list").select2("val", []),
    $("#recommendations").siblings().addClass("hide")
},
nd.recommendationCategorySelectionModal.getSelectedIds = function() {
    return $("#recommendation_category_selections_list").val()
},
nd.recommendationCategorySelectionModal.getSelectedTexts = function() {
    for (var selections = $("#recommendation_category_selections_list").select2("data"), texts = [], i = 0; selections.length > i; i++) selections[i].text && texts.push(selections[i].text);
    return texts
},
nd.recommendationCategorySelectionModal.initialize = function() {
    $("#recommendation_category_selection_modal .btn-primary").click(function() {
        nd.postBox.returnSelection("category", "#menu_category_toggle", "#menu_category"),
        $("#recommendations").attr("checked", !0),
        $("#recommendations").siblings().removeClass("hide"),
        $("#recommendations").siblings().click(function() {
            $("#recommendation_category_selection_modal").modal("show")
        })
    })
};