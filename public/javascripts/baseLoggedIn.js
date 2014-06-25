(function(c, a) {
    window.mixpanel = a;
    var b, d, h, e;
    b = c.createElement("script"),
    b.type = "text/javascript",
    b.async = !0,
    b.src = ("https:" === c.location.protocol ? "https:": "http:") + "//cdn.mxpnl.com/libs/mixpanel-2.2.min.js",
    d = c.getElementsByTagName("script")[0],
    d.parentNode.insertBefore(b, d),
    a._i = [],
    a.init = function(b, c, f) {
        function d(a, b) {
            var c = b.split(".");
            2 == c.length && (a = a[c[0]], b = c[1]),
            a[b] = function() {
                a.push([b].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }
        var g = a;
        for (f !== void 0 ? g = a[f] = [] : f = "mixpanel", g.people = g.people || [], h = ["disable", "track", "track_pageview", "track_links", "track_forms", "register", "register_once", "unregister", "identify", "alias", "name_tag", "set_config", "people.set", "people.increment", "people.track_charge", "people.append"], e = 0; h.length > e; e++) d(g, h[e]);
        a._i.push([b, c, f])
    },
    a.__SV = 1.2
})(document, window.mixpanel || []),
function(e) {
    e.jPanelMenu = function(t) { (t === void 0 || null == t) && (t = {});
        var n = {
            options: e.extend({
                menu: "#menu",
                trigger: ".menu-trigger",
                excludedPanelContent: "style, script",
                direction: "left",
                openPosition: "250px",
                animated: !0,
                closeOnContentClick: !0,
                keyboardShortcuts: [{
                    code: 27,
                    open: !1,
                    close: !0
                },
                {
                    code: 37,
                    open: !1,
                    close: !0
                },
                {
                    code: 39,
                    open: !0,
                    close: !0
                },
                {
                    code: 77,
                    open: !0,
                    close: !0
                }],
                duration: 150,
                openDuration: t.duration || 150,
                closeDuration: t.duration || 150,
                easing: "ease-in-out",
                openEasing: t.easing || "ease-in-out",
                closeEasing: t.easing || "ease-in-out",
                before: function() {},
                beforeOpen: function() {},
                beforeClose: function() {},
                after: function() {},
                afterOpen: function() {},
                afterClose: function() {},
                beforeOn: function() {},
                afterOn: function() {},
                beforeOff: function() {},
                afterOff: function() {}
            },
            t),
            settings: {
                transitionsSupported: "WebkitTransition" in document.body.style || "MozTransition" in document.body.style || "msTransition" in document.body.style || "OTransition" in document.body.style || "Transition" in document.body.style,
                shiftFixedChildren: !1,
                panelPosition: "static",
                positionUnits: "px"
            },
            menu: "#jPanelMenu-menu",
            panel: ".jPanelMenu-panel",
            fixedChildren: [],
            timeouts: {},
            clearTimeouts: function() {
                clearTimeout(n.timeouts.open),
                clearTimeout(n.timeouts.afterOpen),
                clearTimeout(n.timeouts.afterClose)
            },
            setPositionUnits: function() {
                var e = !1,
                t = ["%", "px", "em"];
                for (unitID in t) {
                    var r = t[unitID]; ("" + n.options.openPosition).substr( - r.length) == r && (e = !0, n.settings.positionUnits = r)
                }
                e || (n.options.openPosition = parseInt(n.options.openPosition) + n.settings.positionUnits)
            },
            checkFixedChildren: function() {
                n.disableTransitions();
                var t = {
                    position: e(n.panel).css("position")
                };
                if (t[n.options.direction] = "auto" == e(n.panel).css(n.options.direction) ? 0 : e(n.panel).css(n.options.direction), e(n.panel).find("> *").each(function() {
                    "fixed" == e(this).css("position") && "auto" == e(this).css(n.options.direction) && n.fixedChildren.push(this)
                }), n.fixedChildren.length > 0) {
                    var r = {
                        position: "relative"
                    };
                    r[n.options.direction] = "1px",
                    n.setPanelStyle(r),
                    0 == parseInt(e(n.fixedChildren[0]).offset().left) && (n.settings.shiftFixedChildren = !0)
                }
                n.setPanelStyle(t)
            },
            setjPanelMenuStyles: function() {
                var t = "#fff",
                r = e("html").css("background-color"),
                i = e("body").css("background-color");
                t = "transparent" != i && "rgba(0, 0, 0, 0)" != i ? i: "transparent" != r && "rgba(0, 0, 0, 0)" != r ? r: "#fff",
                0 == e("#jPanelMenu-style-master").length && e("body").append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;' + n.options.direction + ":0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;" + n.options.direction + ":0;top:0;z-index:2;width:100%;min-height:100%;background:" + t + "}</style>")
            },
            setMenuState: function(t) {
                var n = t ? "open": "closed";
                e("body").attr("data-menu-position", n)
            },
            getMenuState: function() {
                return e("body").attr("data-menu-position")
            },
            menuIsOpen: function() {
                return "open" == n.getMenuState() ? !0 : !1
            },
            setMenuStyle: function(t) {
                e(n.menu).css(t)
            },
            setPanelStyle: function(t) {
                e(n.panel).css(t)
            },
            showMenu: function() {
                n.setMenuStyle({
                    display: "block"
                }),
                n.setMenuStyle({
                    "z-index": "1"
                })
            },
            hideMenu: function() {
                n.setMenuStyle({
                    "z-index": "-1"
                }),
                n.setMenuStyle({
                    display: "none"
                })
            },
            enableTransitions: function(t, r) {
                var i = t / 1e3,
                s = n.getCSSEasingFunction(r);
                n.disableTransitions(),
                e("body").append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{-webkit-transition: all ' + i + "s " + s + "; -moz-transition: all " + i + "s " + s + "; -o-transition: all " + i + "s " + s + "; transition: all " + i + "s " + s + ";}</style>")
            },
            disableTransitions: function() {
                e("#jPanelMenu-style-transitions").remove()
            },
            enableFixedTransitions: function(t, r, i, s) {
                var o = i / 1e3,
                u = n.getCSSEasingFunction(s);
                n.disableFixedTransitions(r),
                e("body").append('<style id="jPanelMenu-style-fixed-' + r + '">' + t + "{-webkit-transition: all " + o + "s " + u + "; -moz-transition: all " + o + "s " + u + "; -o-transition: all " + o + "s " + u + "; transition: all " + o + "s " + u + ";}</style>")
            },
            disableFixedTransitions: function(t) {
                e("#jPanelMenu-style-fixed-" + t).remove()
            },
            getCSSEasingFunction: function(e) {
                switch (e) {
                case "linear":
                    return e;
                case "ease":
                    return e;
                case "ease-in":
                    return e;
                case "ease-out":
                    return e;
                case "ease-in-out":
                    return e;
                default:
                    return "ease-in-out"
                }
            },
            getJSEasingFunction: function(e) {
                switch (e) {
                case "linear":
                    return e;
                default:
                    return "swing"
                }
            },
            openMenu: function(t) { (t === void 0 || null == t) && (t = n.options.animated),
                n.clearTimeouts(),
                n.options.before(),
                n.options.beforeOpen(),
                n.setMenuState(!0),
                n.setPanelStyle({
                    position: "relative"
                }),
                n.showMenu();
                var r = {
                    none: t ? !1 : !0,
                    transitions: t && n.settings.transitionsSupported ? !0 : !1
                };
                if (r.transitions || r.none) {
                    r.none && n.disableTransitions(),
                    r.transitions && n.enableTransitions(n.options.openDuration, n.options.openEasing);
                    var i = {};
                    i[n.options.direction] = n.options.openPosition,
                    n.setPanelStyle(i),
                    n.settings.shiftFixedChildren && e(n.fixedChildren).each(function() {
                        var t = e(this).prop("tagName").toLowerCase() + " " + e(this).attr("class"),
                        i = t.replace(" ", "."),
                        t = t.replace(" ", "-");
                        r.none && n.disableFixedTransitions(t),
                        r.transitions && n.enableFixedTransitions(i, t, n.options.openDuration, n.options.openEasing);
                        var s = {};
                        s[n.options.direction] = n.options.openPosition,
                        e(this).css(s)
                    }),
                    n.timeouts.afterOpen = setTimeout(function() {
                        n.disableTransitions(),
                        n.settings.shiftFixedChildren && e(n.fixedChildren).each(function() {
                            var t = e(this).prop("tagName").toLowerCase() + " " + e(this).attr("class"),
                            t = t.replace(" ", "-");
                            n.disableFixedTransitions(t)
                        }),
                        n.options.after(),
                        n.options.afterOpen(),
                        n.initiateContentClickListeners()
                    },
                    n.options.openDuration)
                } else {
                    var s = n.getJSEasingFunction(n.options.openEasing),
                    o = {};
                    o[n.options.direction] = n.options.openPosition,
                    e(n.panel).stop().animate(o, n.options.openDuration, s,
                    function() {
                        n.options.after(),
                        n.options.afterOpen(),
                        n.initiateContentClickListeners()
                    }),
                    n.settings.shiftFixedChildren && e(n.fixedChildren).each(function() {
                        var t = {};
                        t[n.options.direction] = n.options.openPosition,
                        e(this).stop().animate(t, n.options.openDuration, s)
                    })
                }
            },
            closeMenu: function(t) { (t === void 0 || null == t) && (t = n.options.animated),
                n.clearTimeouts(),
                n.options.before(),
                n.options.beforeClose(),
                n.setMenuState(!1);
                var r = {
                    none: t ? !1 : !0,
                    transitions: t && n.settings.transitionsSupported ? !0 : !1
                };
                if (r.transitions || r.none) {
                    r.none && n.disableTransitions(),
                    r.transitions && n.enableTransitions(n.options.closeDuration, n.options.closeEasing);
                    var i = {};
                    i[n.options.direction] = 0 + n.settings.positionUnits,
                    n.setPanelStyle(i),
                    n.settings.shiftFixedChildren && e(n.fixedChildren).each(function() {
                        var t = e(this).prop("tagName").toLowerCase() + " " + e(this).attr("class"),
                        i = t.replace(" ", "."),
                        t = t.replace(" ", "-");
                        r.none && n.disableFixedTransitions(t),
                        r.transitions && n.enableFixedTransitions(i, t, n.options.closeDuration, n.options.closeEasing);
                        var s = {};
                        s[n.options.direction] = 0 + n.settings.positionUnits,
                        e(this).css(s)
                    }),
                    n.timeouts.afterClose = setTimeout(function() {
                        n.setPanelStyle({
                            position: n.settings.panelPosition
                        }),
                        n.disableTransitions(),
                        n.settings.shiftFixedChildren && e(n.fixedChildren).each(function() {
                            var t = e(this).prop("tagName").toLowerCase() + " " + e(this).attr("class"),
                            t = t.replace(" ", "-");
                            n.disableFixedTransitions(t)
                        }),
                        n.hideMenu(),
                        n.options.after(),
                        n.options.afterClose(),
                        n.destroyContentClickListeners()
                    },
                    n.options.closeDuration)
                } else {
                    var s = n.getJSEasingFunction(n.options.closeEasing),
                    o = {};
                    o[n.options.direction] = 0 + n.settings.positionUnits,
                    e(n.panel).stop().animate(o, n.options.closeDuration, s,
                    function() {
                        n.setPanelStyle({
                            position: n.settings.panelPosition
                        }),
                        n.hideMenu(),
                        n.options.after(),
                        n.options.afterClose(),
                        n.destroyContentClickListeners()
                    }),
                    n.settings.shiftFixedChildren && e(n.fixedChildren).each(function() {
                        var t = {};
                        t[n.options.direction] = 0 + n.settings.positionUnits,
                        e(this).stop().animate(t, n.options.closeDuration, s)
                    })
                }
            },
            triggerMenu: function(e) {
                n.menuIsOpen() ? n.closeMenu(e) : n.openMenu(e)
            },
            initiateClickListeners: function() {
                e(document).on("click", n.options.trigger,
                function() {
                    return n.triggerMenu(n.options.animated),
                    !1
                })
            },
            destroyClickListeners: function() {
                e(document).off("click", n.options.trigger, null)
            },
            initiateContentClickListeners: function() {
                return n.options.closeOnContentClick ? (e(document).on("click", n.panel,
                function() {
                    n.menuIsOpen() && n.closeMenu(n.options.animated)
                }), e(document).on("touchend", n.panel,
                function() {
                    n.menuIsOpen() && n.closeMenu(n.options.animated)
                }), void 0) : !1
            },
            destroyContentClickListeners: function() {
                return n.options.closeOnContentClick ? (e(document).off("click", n.panel, null), e(document).off("touchend", n.panel, null), void 0) : !1
            },
            initiateKeyboardListeners: function() {
                var t = ["input", "textarea"];
                e(document).on("keydown",
                function(r) {
                    var i = e(r.target),
                    s = !1;
                    if (e.each(t,
                    function() {
                        i.is("" + this) && (s = !0)
                    }), s) return ! 0;
                    for (mapping in n.options.keyboardShortcuts) if (r.which == n.options.keyboardShortcuts[mapping].code) {
                        var o = n.options.keyboardShortcuts[mapping];
                        return o.open && o.close ? n.triggerMenu(n.options.animated) : !o.open || o.close || n.menuIsOpen() ? !o.open && o.close && n.menuIsOpen() && n.closeMenu(n.options.animated) : n.openMenu(n.options.animated),
                        !1
                    }
                })
            },
            destroyKeyboardListeners: function() {
                e(document).off("keydown", null)
            },
            setupMarkup: function() {
                e("html").addClass("jPanelMenu"),
                e("body > *").not(n.menu + ", " + n.options.excludedPanelContent).wrapAll('<div class="' + n.panel.replace(".", "") + '"/>'),
                e(n.options.menu).clone().attr("id", n.menu.replace("#", "")).insertAfter("body > " + n.panel)
            },
            resetMarkup: function() {
                e("html").removeClass("jPanelMenu"),
                e("body > " + n.panel + " > *").unwrap(),
                e(n.menu).remove()
            },
            init: function() {
                n.options.beforeOn(),
                n.initiateClickListeners(),
                "[object Array]" === Object.prototype.toString.call(n.options.keyboardShortcuts) && n.initiateKeyboardListeners(),
                n.setjPanelMenuStyles(),
                n.setMenuState(!1),
                n.setupMarkup(),
                n.setMenuStyle({
                    width: n.options.openPosition
                }),
                n.checkFixedChildren(),
                n.setPositionUnits(),
                n.closeMenu(!1),
                n.options.afterOn()
            },
            destroy: function() {
                n.options.beforeOff(),
                n.closeMenu(),
                n.destroyClickListeners(),
                "[object Array]" === Object.prototype.toString.call(n.options.keyboardShortcuts) && n.destroyKeyboardListeners(),
                n.resetMarkup();
                var t = {};
                t[n.options.direction] = "auto",
                e(n.fixedChildren).each(function() {
                    e(this).css(t)
                }),
                n.fixedChildren = [],
                n.options.afterOff()
            }
        };
        return {
            on: n.init,
            off: n.destroy,
            trigger: n.triggerMenu,
            open: n.openMenu,
            close: n.closeMenu,
            isOpen: n.menuIsOpen,
            menu: n.menu,
            getMenu: function() {
                return e(n.menu)
            },
            panel: n.panel,
            getPanel: function() {
                return e(n.panel)
            }
        }
    }
} (jQuery),
function(w, undefined) {
    var timeKeeper, doc = w.document,
    docElem = doc.documentElement,
    classtext = "overthrow-enabled",
    canBeFilledWithPoly = "ontouchmove" in doc,
    overflowProbablyAlreadyWorks = "WebkitOverflowScrolling" in docElem.style || !canBeFilledWithPoly && w.screen.width > 1200 ||
    function() {
        var ua = w.navigator.userAgent,
        webkit = ua.match(/AppleWebKit\/([0-9]+)/),
        wkversion = webkit && webkit[1],
        wkLte534 = webkit && wkversion >= 534;
        return ua.match(/Android ([0-9]+)/) && RegExp.$1 >= 3 && wkLte534 || ua.match(/ Version\/([0-9]+)/) && RegExp.$1 >= 0 && w.blackberry && wkLte534 || ua.indexOf(/PlayBook/) > -1 && RegExp.$1 >= 0 && wkLte534 || ua.match(/Fennec\/([0-9]+)/) && RegExp.$1 >= 4 || ua.match(/wOSBrowser\/([0-9]+)/) && RegExp.$1 >= 233 && wkLte534 || ua.match(/NokiaBrowser\/([0-9\.]+)/) && 7.3 === parseFloat(RegExp.$1) && webkit && wkversion >= 533
    } (),
    defaultEasing = function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    },
    enabled = !1,
    toss = function(elem, options) {
        var endLeft, endTop, i = 0,
        sLeft = elem.scrollLeft,
        sTop = elem.scrollTop,
        o = {
            top: "+0",
            left: "+0",
            duration: 100,
            easing: w.overthrow.easing
        };
        if (options) for (var j in o) options[j] !== undefined && (o[j] = options[j]);
        return "string" == typeof o.left ? (o.left = parseFloat(o.left), endLeft = o.left + sLeft) : (endLeft = o.left, o.left = o.left - sLeft),
        "string" == typeof o.top ? (o.top = parseFloat(o.top), endTop = o.top + sTop) : (endTop = o.top, o.top = o.top - sTop),
        timeKeeper = setInterval(function() {
            i++<o.duration ? (elem.scrollLeft = o.easing(i, sLeft, o.left, o.duration), elem.scrollTop = o.easing(i, sTop, o.top, o.duration)) : (endLeft !== elem.scrollLeft && (elem.scrollLeft = endLeft), endTop !== elem.scrollTop && (elem.scrollTop = endTop), intercept())
        },
        1),
        {
            top: endTop,
            left: endLeft,
            duration: o.duration,
            easing: o.easing
        }
    },
    closest = function(target, ascend) {
        return ! ascend && target.className && target.className.indexOf("overthrow") > -1 && target || closest(target.parentNode)
    },
    intercept = function() {
        clearInterval(timeKeeper)
    },
    enable = function() {
        if (!enabled && (enabled = !0, (overflowProbablyAlreadyWorks || canBeFilledWithPoly) && (docElem.className += " " + classtext), w.overthrow.forget = function() {
            docElem.className = docElem.className.replace(classtext, ""),
            doc.removeEventListener && doc.removeEventListener("touchstart", start, !1),
            w.overthrow.easing = defaultEasing,
            enabled = !1
        },
        !overflowProbablyAlreadyWorks && canBeFilledWithPoly)) {
            var elem, lastDown, lastRight, inputs, lastTops = [],
            lastLefts = [],
            resetVertTracking = function() {
                lastTops = [],
                lastDown = null
            },
            resetHorTracking = function() {
                lastLefts = [],
                lastRight = null
            },
            finishScroll = function() {
                var top = 8 * (lastTops[0] - lastTops[lastTops.length - 1]),
                left = 8 * (lastLefts[0] - lastLefts[lastLefts.length - 1]),
                duration = Math.max(Math.abs(left), Math.abs(top)) / 8;
                top = (top > 0 ? "+": "") + top,
                left = (left > 0 ? "+": "") + left,
                !isNaN(duration) && duration > 0 && (Math.abs(left) > 80 || Math.abs(top) > 80) && toss(elem, {
                    left: left,
                    top: top,
                    duration: duration
                })
            },
            setPointers = function(val) {
                inputs = elem.querySelectorAll("textarea, input");
                for (var i = 0,
                il = inputs.length; il > i; i++) inputs[i].style.pointerEvents = val
            },
            changeScrollTarget = function(startEvent, ascend) {
                if (doc.createEvent) {
                    var tEnd, newTarget = (!ascend || ascend === undefined) && elem.parentNode || elem.touchchild || elem;
                    newTarget !== elem && (tEnd = doc.createEvent("HTMLEvents"), tEnd.initEvent("touchend", !0, !0), elem.dispatchEvent(tEnd), newTarget.touchchild = elem, elem = newTarget, newTarget.dispatchEvent(startEvent))
                }
            },
            start = function(e) {
                if (intercept(), resetVertTracking(), resetHorTracking(), elem = closest(e.target), elem && elem !== docElem && !(e.touches.length > 1)) {
                    setPointers("none");
                    var touchStartE = e,
                    scrollT = elem.scrollTop,
                    scrollL = elem.scrollLeft,
                    height = elem.offsetHeight,
                    width = elem.offsetWidth,
                    startY = e.touches[0].pageY,
                    startX = e.touches[0].pageX,
                    scrollHeight = elem.scrollHeight,
                    scrollWidth = elem.scrollWidth,
                    move = function(e) {
                        var ty = scrollT + startY - e.touches[0].pageY,
                        tx = scrollL + startX - e.touches[0].pageX,
                        down = ty >= (lastTops.length ? lastTops[0] : 0),
                        right = tx >= (lastLefts.length ? lastLefts[0] : 0);
                        ty > 0 && scrollHeight - height > ty || tx > 0 && scrollWidth - width > tx ? e.preventDefault() : changeScrollTarget(touchStartE),
                        lastDown && down !== lastDown && resetVertTracking(),
                        lastRight && right !== lastRight && resetHorTracking(),
                        lastDown = down,
                        lastRight = right,
                        elem.scrollTop = ty,
                        elem.scrollLeft = tx,
                        lastTops.unshift(ty),
                        lastLefts.unshift(tx),
                        lastTops.length > 3 && lastTops.pop(),
                        lastLefts.length > 3 && lastLefts.pop()
                    },
                    end = function() {
                        finishScroll(),
                        setPointers("auto"),
                        setTimeout(function() {
                            setPointers("none")
                        },
                        450),
                        elem.removeEventListener("touchmove", move, !1),
                        elem.removeEventListener("touchend", end, !1)
                    };
                    elem.addEventListener("touchmove", move, !1),
                    elem.addEventListener("touchend", end, !1)
                }
            };
            doc.addEventListener("touchstart", start, !1)
        }
    };
    w.overthrow = {
        set: enable,
        forget: function() {},
        easing: defaultEasing,
        toss: toss,
        intercept: intercept,
        closest: closest,
        support: overflowProbablyAlreadyWorks ? "native": canBeFilledWithPoly && "polyfilled" || "none"
    },
    enable()
} (this),
function($) {
    var $special, resizeTimeout, $event = $.event;
    $special = $event.special.debouncedresize = {
        setup: function() {
            $(this).on("resize", $special.handler)
        },
        teardown: function() {
            $(this).off("resize", $special.handler)
        },
        handler: function(event, execAsap) {
            var context = this,
            args = arguments,
            dispatch = function() {
                event.type = "debouncedresize",
                $event.dispatch.apply(context, args)
            };
            resizeTimeout && clearTimeout(resizeTimeout),
            execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold)
        },
        threshold: 150
    }
} (jQuery);
var nd = nd || {};
nd.windowResizing = nd.windowResizing || {},
$(function() {
    nd.windowResizing.leftNavigationPanel = $.jPanelMenu({
        menu: "#navigation-side",
        trigger: ".btn-navbar",
        openPosition: "250px",
        animated: !1,
        keyboardShortcuts: !1,
        beforeOpen: function() {
            $(".navbar").css("left", "250px"),
            $(".jPanelMenu-panel").css("position", "relative"),
            $(".navbar.navbar-absolute").removeClass("navbar-absolute"),
            nd.androidAppBanner && nd.androidAppBanner.unload()
        },
        beforeClose: function() {
            $(".navbar").css("left", "0"),
            $(".jPanelMenu-panel").css("position", "static")
        },
        afterOn: function() {
            $("#jPanelMenu-menu").hide()
        }
    }),
    nd.windowResizing.leftNavigationPanel.on();
    var ua = navigator.userAgent,
    androidVersion = ua.match(/Android ([0-9.]+)/);
    null != androidVersion && 3 > parseFloat(androidVersion[1]) && $("html").addClass("is-gingerbread"),
    $(window).on("debouncedresize",
    function() {
        window.innerWidth > 979 && nd.windowResizing.leftNavigationPanel.close()
    })
});
var nd = nd || {};
nd.utils = nd.utils || {},
nd.utils.pluralize = function(n) {
    return 1 == n ? "": "s"
},
nd.utils.phoneNumberIsValid = function(n) {
    var stripped = n.replace(/[\s-)()\.]/g, "");
    return 10 == stripped.length || 11 == stripped.length ? !0 : !1
},
$(function() {
    $("#search_form .search-button").click(function(event) {
        var searchInput = $("#search_form .search-query");
        return "" === $.trim(searchInput.val()) ? (event.preventDefault(), !1) : void 0
    }),
    $("#search_form .search-query").keypress(function(event) {
        var searchInput = $("#search_form .search-query");
        return 13 === event.keyCode && "" === $.trim(searchInput.val()) ? (event.preventDefault(), !1) : void 0
    })
});
var nd = nd || {};
nd.muteUser = nd.muteUser || {},
nd.muteUser.muteUser = function(mutee_id, callback) {
    return function() {
        function muteCallback() {
            $("#mute_saving").removeClass("hide"),
            "function" == typeof callback ? ($("#confirm_mute_modal_" + mutee_id).modal("hide"), callback()) : document.location.reload(!0)
        }
        $.ajax({
            type: "POST",
            url: "/ajax/confirm_mute_user/",
            data: {
                mutee_id: mutee_id
            },
            success: muteCallback,
            dataType: "json"
        })
    }
},
nd.muteUser.showMuteConfirmModal = function(mutee_id, callback) {
    function muteModalCallback(data) {
        if ("html" in data) {
            for (; $("#confirm_mute_modal_" + mutee_id).length > 0;) $("#confirm_mute_modal_" + mutee_id).remove();
            $("body").append(data.html),
            $("#confirm_mute_modal_" + mutee_id).modal(),
            $("#mute_user_btn_" + mutee_id).click(nd.muteUser.muteUser(mutee_id, callback))
        }
    }
    $.ajax({
        type: "GET",
        url: "/ajax/confirm_mute_user/",
        data: {
            mutee_id: mutee_id
        },
        success: muteModalCallback,
        dataType: "json"
    })
},
nd.muteUser.unmuteUser = function(mutee_id, callback) {
    return function() {
        function unmuteCallback() {
            $("#unmute_saving").removeClass("hide"),
            "function" == typeof callback ? ($("#confirm_unmute_modal_" + mutee_id).modal("hide"), callback()) : document.location.reload(!0)
        }
        $.ajax({
            type: "POST",
            url: "/ajax/confirm_unmute_user/",
            data: {
                mutee_id: mutee_id
            },
            success: unmuteCallback,
            dataType: "json"
        })
    }
},
nd.muteUser.showUnmuteConfirmModal = function(mutee_id, callback) {
    function unmuteModalCallback(data) {
        if ("html" in data) {
            for (; $("#confirm_unmute_modal_" + mutee_id).length > 0;) $("#confirm_unmute_modal_" + mutee_id).remove();
            $("body").append(data.html),
            $("#confirm_unmute_modal_" + mutee_id).modal(),
            $("#unmute_user_btn_" + mutee_id).click(nd.muteUser.unmuteUser(mutee_id, callback))
        }
    }
    $.ajax({
        type: "GET",
        url: "/ajax/confirm_unmute_user/",
        data: {
            mutee_id: mutee_id
        },
        success: unmuteModalCallback,
        dataType: "json"
    })
},
nd.muteUser.init = function() {
    $(document).on("click", "[data-toggle = mute-unmute][data-value = mute]",
    function() {
        nd.muteUser.showMuteConfirmModal($(this).data("target"))
    }),
    $(document).on("click", "[data-toggle = mute-unmute][data-value = unmute]",
    function() {
        nd.muteUser.showUnmuteConfirmModal($(this).data("target"))
    })
};
var nd = nd || {};
nd.privateMessage = nd.privateMessage || {},
nd.privateMessage.privateMessageSubmitCallback = function($modal) {
    return function(data) {
        if (data.errors) for (var field in data.errors) errorField = $modal.find('[data-class="' + field + '_error"]'),
        errorField.html(data.errors[field] + "<br/>"),
        errorField.show();
        else $modal.find(".modal-body").html("<center><b>Your message has been sent!</b></center><br/>"),
        $modal.find('[data-class="pm_submit"]').hide(),
        $modal.find('[data-class="pm_cancel"]').hide(),
        setTimeout(function() {
            return $modal.modal("hide"),
            $modal.remove(),
            !1
        },
        2e3)
    }
},
nd.privateMessage.handlePrivateMessageSubmit = function(event) {
    var $modal = $(event.target).parents(".modal"),
    $form = $modal.find("form"),
    $submitButton = $(event.currentTarget);
    $submitButton.text("Sending...").addClass("disabled"),
    $form.find(".error").hide();
    var error = !1;
    if ("" == $form.find('input[name="subject"][type="text"]').val()) {
        var field = $form.find('[data-class="subject_error"]');
        field.html("Message subject cannot be empty.<br/>"),
        field.show(),
        error = !0
    }
    if ("" == $form.find(':input[name="body"]').val()) {
        var field = $form.find('[data-class="body_error"]');
        field.html("Message body cannot be empty.<br/>"),
        field.show(),
        error = !0
    }
    if (error) return $submitButton.one("click", nd.privateMessage.handlePrivateMessageSubmit),
    $submitButton.text("Submit").removeClass("disabled"),
    !1;
    var data = $form.serialize();
    return $.post("/ajax/private_message_submit/", data, nd.privateMessage.privateMessageSubmitCallback($modal), "json"),
    !1
},
nd.privateMessage.handlePrivateMessage = function(target, subject) {
    var $target = $(target),
    uid = $target.data("target"),
    existingModal = $('[data-recipient-id="' + uid + '"]');
    if (existingModal.length > 0) existingModal.modal();
    else {
        var params = {
            uid: $target.data("target"),
            thread_id: $target.data("thread-id") || "",
            subject: subject || ""
        };
        $.post("/ajax/private_message_form/", params, nd.privateMessage.privateMessageCallback(uid), "json")
    }
    return ! 1
},
nd.privateMessage.privateMessageCallback = function(recipientId) {
    return function(data) {
        if (data) {
            var privateMessageModal = $(data.html);
            privateMessageModal.attr("data-recipient-id", recipientId);
            var submitButton = privateMessageModal.find('[data-class="pm_submit"]');
            submitButton.one("click", nd.privateMessage.handlePrivateMessageSubmit),
            $("body").append(privateMessageModal),
            privateMessageModal.modal(),
            privateMessageModal.find("input[placeholder], textarea[placeholder]").placeholder()
        }
        return ! 1
    }
},
nd.privateMessage.initialize = function() {
    $(document).on("click", "[data-action=private-message]",
    function() {
        return nd.privateMessage.handlePrivateMessage($(this), $(this).data("subject"))
    })
},
nd.privateMessage.populateCount = function() {
    $.ajax({
        url: "/ajax/unread_inbox_message_count/",
        success: function(data) {
            data.count ? data.count > 99 ? $(".unread-inbox-message-count").text("99+") : $(".unread-inbox-message-count").text(data.count) : $(".unread-inbox-message-count").text("")
        },
        dataType: "json"
    })
};

var nd = nd || {};
nd.profileLink = nd.profileLink || {},
nd.profileLink.initProfileLink = function() {
    $(document).on("click", '[data-class="linked-name"]',
    function() {
        return document.location = "/profile/" + $(this).data().id + "/",
        !1
    })
};
var nd = nd || {};
nd.modals = nd.modals || {},
nd.modals.init = function() {
    $(document).on("show",
    function(event) {
        $(".modal").each(function() {
            if (this != event.target && $(this).data("modal") && $(event.target).data("modal")) {
                var $this = $(this),
                modalData = $this.data("modal");
                modalData.isShown && ($this.modal("hide"), $(event.target).one("hidden",
                function() {
                    $this.modal(modalData.options)
                }))
            }
        })
    })
};
var nd = nd || {};
nd.appStoreLinkSMS = nd.appStoreLinkSMS || {},
nd.appStoreLinkSMS.init = function($numberInput, $sendSMSBtn) {
    $numberInput.keydown(function(e) {
        return 13 == e.keyCode ? (e.preventDefault(), !1) : void 0
    }),
    $numberInput.keyup(function() {
        var phoneNumber = $numberInput.val();
        nd.utils.phoneNumberIsValid(phoneNumber) ? $sendSMSBtn.removeClass("disabled").addClass("btn-primary") : $sendSMSBtn.removeClass("btn-primary").addClass("disabled")
    })
},
nd.appStoreLinkSMS.sendSMS = function(number, successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        url: "/ajax/send_app_store_link_sms/",
        data: {
            number: number
        },
        success: successCallback,
        error: errorCallback
    })
},
nd.appStoreLinkSMS.initModal = function() {
    var $numberInput = $("#mobile_phone_input"),
    $sendSMSBtn = $("#iphone_sms_submit"),
    sendBtnClick = function() {
        if (!$("#iphone_sms_submit").hasClass("disabled")) {
            $('#mobile_app_sms_modal [modal-body-state="1"]').hide(),
            $('#mobile_app_sms_modal [modal-body-state="2"]').show(),
            $("#mobile_app_sms_modal .modal-footer").hide();
            var success = function() {
                $('#mobile_app_sms_modal [modal-body-state="2"]').hide(),
                $('#mobile_app_sms_modal [modal-body-state="3"]').show()
            },
            error = function() {
                $('#mobile_app_sms_modal [modal-body-state="2"]').hide(),
                $('#mobile_app_sms_modal [modal-body-state="1"]').show(),
                $("#mobile_phone_error").show(),
                $("#mobile_app_sms_modal .modal-footer").show()
            };
            nd.appStoreLinkSMS.sendSMS($numberInput.val(), success, error)
        }
    };
    $('#mobile_app_sms_modal [data-dismiss="modal"]').click(function() {
        $('#mobile_app_sms_modal [modal-body-state="1"]').show(),
        $("#mobile_phone_error").hide(),
        $("#mobile_app_sms_modal .modal-footer").show(),
        $("#mobile_phone_input").val(""),
        $sendSMSBtn.removeClass("btn-primary").addClass("disabled")
    }),
    $sendSMSBtn.click(sendBtnClick),
    nd.appStoreLinkSMS.init($numberInput, $sendSMSBtn),
    $("#mobile_app_sms_modal_body").data("show-onload") === !0 && $("#mobile_app_sms_modal").modal("show")
},
nd.appStoreLinkSMS.initBox = function() {
    var $numberInput = $("#iphone_app_sms_input"),
    $sendSMSBtn = $("#iphone_app_sms_submit"),
    sendBtnClick = function() {
        $("#iphone_app_sms_submit").hasClass("disabled") || ($("#iphone_app_sms_module_state_1").hide(), $("#iphone_app_sms_module_state_2").show(), nd.appStoreLinkSMS.sendSMS($numberInput.val(),
        function() {
            $("#iphone_app_sms_module_state_2").hide(),
            $("#iphone_app_sms_module_state_3").show()
        }))
    };
    $sendSMSBtn.click(sendBtnClick),
    nd.appStoreLinkSMS.init($numberInput, $sendSMSBtn)
},
nd.appStoreLinkSMS.initModal(),
nd.appStoreLinkSMS.initBox(),
function($) {
    $(document).ready(function() {
        nd.modals.init(),
        nd.muteUser.init(),
        nd.privateMessage.initialize(),
        nd.profileLink.initProfileLink()
    })
} (jQuery);