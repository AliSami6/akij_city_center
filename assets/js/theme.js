window.theme = {};
window.theme.fn = {
  getOptions(e) {
    if (typeof e == "object") {
      return e;
    } else if (typeof e == "string") {
      try {
        return JSON.parse(e.replace(/'/g, '"').replace(";", ""));
      } catch (e) {
        return {};
      }
    } else {
      return {};
    }
  },
  execPluginFunction(e, t) {
    const s = Array.prototype.slice.call(arguments, 2);
    const i = e.split(".");
    const o = i.pop();
    for (let e = 0; e < i.length; e++) {
      t = t[i[e]];
    }
    return t[o](...s);
  },
  intObs(e, o, t, a) {
    const s = document.querySelectorAll(e);
    let i = { rootMargin: "0px 0px 200px 0px" };
    if (Object.keys(t).length) {
      i = $.extend(i, t);
    }
    const n = new IntersectionObserver((e) => {
      for (const t of e) {
        if (t.intersectionRatio > 0) {
          if (typeof o === "string") {
            const s = Function("return " + o)();
          } else {
            const i = o;
            i.call($(t.target));
          }
          if (!a) {
            n.unobserve(t.target);
          }
        }
      }
    }, i);
    $(s).each(function () {
      n.observe($(this)[0]);
    });
  },
  intObsInit(e, o) {
    const t = document.querySelectorAll(e);
    const s = { rootMargin: "200px" };
    const a = new IntersectionObserver((e) => {
      for (const t of e) {
        if (t.intersectionRatio > 0) {
          const s = $(t.target);
          let e;
          const i = theme.fn.getOptions(s.data("plugin-options"));
          if (i) e = i;
          theme.fn.execPluginFunction(o, s, e);
          a.unobserve(t.target);
        }
      }
    }, s);
    $(t).each(function () {
      a.observe($(this)[0]);
    });
  },
  dynIntObsInit(e, n, r) {
    const t = document.querySelectorAll(e);
    $(t).each(function () {
      const s = $(this);
      let e;
      const t = theme.fn.getOptions(s.data("plugin-options"));
      if (t) e = t;
      const i = theme.fn.mergeOptions(r, e);
      const o = { rootMargin: theme.fn.getRootMargin(n, i), threshold: 0 };
      if (!i.forceInit) {
        const a = new IntersectionObserver((e) => {
          for (const t of e) {
            if (t.intersectionRatio > 0) {
              theme.fn.execPluginFunction(n, s, i);
              a.unobserve(t.target);
            }
          }
        }, o);
        a.observe(s[0]);
      } else {
        theme.fn.execPluginFunction(n, s, i);
      }
    });
  },
  getRootMargin(e, { accY: t }) {
    switch (e) {
      case "themePluginCounter":
        return t ? `0px 0px ${t}px 0px` : "0px 0px 200px 0px";
        break;
      case "themePluginAnimate":
        return t ? `0px 0px ${t}px 0px` : "0px 0px 200px 0px";
        break;
      case "themePluginIcon":
        return t ? `0px 0px ${t}px 0px` : "0px 0px 200px 0px";
        break;
      case "themePluginRandomImages":
        return t ? `0px 0px ${t}px 0px` : "0px 0px 200px 0px";
        break;
      default:
        return "0px 0px 200px 0px";
        break;
    }
  },
  mergeOptions(e, t) {
    const s = {};
    for (var i in e) {
      s[i] = e[i];
    }
    for (var i in t) {
      s[i] = t[i];
    }
    return s;
  },
  execOnceTroughEvent(e, t, s) {
    const i = this,
      o = i.formatDataName(t);
    $(e).on(t, function () {
      if (!$(this).data(o)) {
        s.call($(this));
        $(this).data(o, true);
        $(this).off(t);
      }
    });
    return this;
  },
  execOnceTroughWindowEvent(e, t, s) {
    const i = this,
      o = i.formatDataName(t);
    $(e).on(t, function () {
      if (!$(this).data(o)) {
        s();
        $(this).data(o, true);
        $(this).off(t);
      }
    });
    return this;
  },
  formatDataName(e) {
    e = e.replace(".", "");
    return e;
  },
  isElementInView(e) {
    const t = e[0].getBoundingClientRect();
    return t.top <= window.innerHeight / 3;
  },
  getScripts(e, t) {
    const s = $.map(e, (e) => $.getScript((t || "") + e));
    s.push(
      $.Deferred(({ resolve: e }) => {
        $(e);
      }),
    );
    return $.when(...s);
  },
  showErrorMessage(e, t) {
    if ($("html").hasClass("disable-local-warning")) {
      return;
    }
    $(".modalThemeErrorMessage").remove();
    $("body").append(
      '<div class="modal fade" id="modalThemeErrorMessage"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' +
        e +
        '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">' +
        t +
        '</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button></div></div></div></div>',
    );
    var s = document.getElementById("modalThemeErrorMessage");
    var s = bootstrap.Modal.getOrCreateInstance(s);
    s.show();
  },
};
((a = {}, h) => {
  try {
    if ("file://" === location.origin) {
      if (h("[data-icon]").length || h("iframe").length) {
        a.fn.showErrorMessages(
          "Local Environment Warning",
          'SVG Objects, Icons, YouTube and Vimeo Videos might not show correctly on local environment. For better result, please preview on a server.<br><br><a target="_blank" href="#" class="fw-semibold"><i class="fa-solid fa-link"></i> How to Disable Local Environment Warning</a>',
        );
      }
    }
  } catch (e) {}
  h.extend({
    browserSelector() {
      ((e) => {
        (jQuery.browser = jQuery.browser || {}).mobile =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
            e,
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            e.substr(0, 4),
          );
      })(navigator.userAgent || navigator.vendor || window.opera);
      const e = "ontouchstart" in window || navigator.msMaxTouchPoints;
      const t = navigator.userAgent,
        s = t.toLowerCase(),
        i = (e) => s.includes(e),
        o = "gecko",
        a = "webkit",
        n = "safari",
        r = "opera",
        l = document.documentElement,
        d = [
          !/opera|webtv/i.test(s) && /msie\s(\d)/.test(s)
            ? `ie ie${parseFloat(navigator.appVersion.split("MSIE")[1])}`
            : i("firefox/2")
              ? `${o} ff2`
              : i("firefox/3.5")
                ? `${o} ff3 ff3_5`
                : i("firefox/3")
                  ? `${o} ff3`
                  : i("gecko/")
                    ? o
                    : i("opera")
                      ? r +
                        (/version\/(\d+)/.test(s)
                          ? ` ${r}${RegExp.jQuery1}`
                          : /opera(\s|\/)(\d+)/.test(s)
                            ? ` ${r}${RegExp.jQuery2}`
                            : "")
                      : i("konqueror")
                        ? "konqueror"
                        : i("chrome")
                          ? `${a} chrome`
                          : i("iron")
                            ? `${a} iron`
                            : i("applewebkit/")
                              ? `${a} ${n}${/version\/(\d+)/.test(s) ? ` ${n}${RegExp.jQuery1}` : ""}`
                              : i("mozilla/")
                                ? o
                                : "",
          i("j2me")
            ? "mobile"
            : i("iphone")
              ? "iphone"
              : i("ipod")
                ? "ipod"
                : i("mac")
                  ? "mac"
                  : i("darwin")
                    ? "mac"
                    : i("webtv")
                      ? "webtv"
                      : i("win")
                        ? "win"
                        : i("freebsd")
                          ? "freebsd"
                          : i("x11") || i("linux")
                            ? "linux"
                            : "",
          "js",
        ];
      c = d.join(" ");
      if (h.browser.mobile) {
        c += " mobile";
      }
      if (e) {
        c += " touch";
      }
      l.className += ` ${c}`;
      const p = /Edge/.test(navigator.userAgent);
      if (p) {
        h("html").removeClass("chrome").addClass("edge");
      }
      if (h("body").hasClass("dark")) {
        h("html").addClass("dark");
      }
      if (h("body").hasClass("boxed")) {
        h("html").addClass("boxed");
      }
    },
  });
  h.browserSelector();
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    h(document).ready((e) => {
      e(".thumb-info").attr("onclick", "return true");
    });
  }
  if ("IntersectionObserver" in window) {
    document.addEventListener("DOMContentLoaded", function () {
      function e(e) {
        e.map((e) => {
          if (e.isIntersecting) {
            e.target.style.backgroundImage =
              "url('" + e.target.dataset.bgSrc + "')";
            s.unobserve(e.target);
          }
        });
      }
      const t = document.querySelectorAll(".lazyload");
      const s = new IntersectionObserver(e, { rootMargin: "100px" });
      t.forEach((e) => s.observe(e));
    });
  } else {
    const o = document.querySelectorAll(".lazyload");
    o.forEach((e) => {
      e.style.backgroundImage = "url('" + e.dataset.bgSrc + "')";
    });
  }
  if (h('a[data-bs-toggle="tab"]').length) {
    h('a[data-bs-toggle="tab"]').on("shown.bs.tab", function ({ target: e }) {
      const t = h(h(e).attr("href"));
      if (t.length) {
        t.find(".owl-carousel").trigger("refresh.owl.carousel");
      }
      h(this).parents(".nav-tabs").find(".active").removeClass("active");
      h(this).addClass("active").parent().addClass("active");
    });
    if (window.location.hash) {
      h(window).on("load", () => {
        if (window.location.hash !== "*" && h(window.location.hash).get(0)) {
          new bootstrap.Tab(
            h(
              'a.nav-link[href="' +
                window.location.hash +
                '"]:not([data-hash])',
            )[0],
          ).show();
        }
      });
    }
  }
  if (
    !h("html").hasClass("disable-onload-scroll") &&
    window.location.hash &&
    !["#*"].includes(window.location.hash)
  ) {
    window.scrollTo(0, 0);
    h(window).on("load", () => {
      setTimeout(() => {
        const e = window.location.hash;
        let t = h(window).width() < 768 ? 180 : 90;
        if (!h(e).length) {
          return;
        }
        if (
          h("a[href$='" + window.location.hash + "']").is("[data-hash-offset]")
        ) {
          t = parseInt(
            h("a[href$='" + window.location.hash + "']")
              .first()
              .attr("data-hash-offset"),
          );
        } else if (h("html").is("[data-hash-offset]")) {
          t = parseInt(h("html").attr("data-hash-offset"));
        }
        if (isNaN(t)) {
          t = 0;
        }
        h("body").addClass("scrolling");
        h("html, body").animate(
          { scrollTop: h(e).offset().top - t },
          600,
          "easeOutQuad",
          () => {
            h("body").removeClass("scrolling");
          },
        );
      }, 1);
    });
  }
  h.fn.extend({
    textRotator(o) {
      const e = { fadeSpeed: 500, pauseSpeed: 100, child: null };
      var o = h.extend(e, o);
      return this.each(function () {
        const t = o;
        const s = h(this);
        const e = h(s.children(), s);
        e.each(function () {
          h(this).hide();
        });
        if (!t.child) {
          var i = h(s).children(":first");
        } else {
          var i = t.child;
        }
        h(i).fadeIn(t.fadeSpeed, () => {
          h(i)
            .delay(t.pauseSpeed)
            .fadeOut(t.fadeSpeed, function () {
              let e = h(this).next();
              if (e.length == 0) {
                e = h(s).children(":first");
              }
              h(s).textRotator({
                child: e,
                fadeSpeed: t.fadeSpeed,
                pauseSpeed: t.pauseSpeed,
              });
            });
        });
      });
    },
  });
  const e = {
    $wrapper: h(".notice-top-bar"),
    $closeBtn: h(".notice-top-bar-close"),
    $header: h("#header"),
    $body: h(".body"),
    init() {
      const e = this;
      if (!h.cookie("portoNoticeTopBarClose")) {
        e.build().events();
      } else {
        e.$wrapper
          .parent()
          .prepend("\x3c!-- Notice Top Bar removed by cookie --\x3e");
        e.$wrapper.remove();
      }
      return this;
    },
    build() {
      const e = this;
      h(window).on("load", () => {
        setTimeout(() => {
          e.$body.css({
            "margin-top": e.$wrapper.outerHeight(),
            transition: "ease margin 300ms",
          });
          h("#noticeTopBarContent").textRotator({
            fadeSpeed: 500,
            pauseSpeed: 5e3,
          });
          if (["absolute", "fixed"].includes(e.$header.css("position"))) {
            e.$header.css({
              top: e.$wrapper.outerHeight(),
              transition: "ease top 300ms",
            });
          }
          h(window).trigger("notice.top.bar.opened");
        }, 1e3);
      });
      return this;
    },
    events() {
      const t = this;
      t.$closeBtn.on("click", (e) => {
        e.preventDefault();
        t.$body.animate({ "margin-top": 0 }, 300, () => {
          t.$wrapper.remove();
          t.saveCookie();
        });
        if (["absolute", "fixed"].includes(t.$header.css("position"))) {
          t.$header.animate({ top: 0 }, 300);
        }
        if (t.$header.hasClass("header-effect-shrink")) {
          t.$header.find(".header-body").animate({ top: 0 }, 300);
        }
        h(window).trigger("notice.top.bar.closed");
      });
      return this;
    },
    checkCookie() {
      const e = this;
      if (h.cookie("portoNoticeTopBarClose")) {
        return true;
      } else {
        return false;
      }
      return this;
    },
    saveCookie() {
      const e = this;
      h.cookie("portoNoticeTopBarClose", true);
      return this;
    },
  };
  if (h(".notice-top-bar").length) {
    e.init();
  }
  if (h(".image-hotspot").length) {
    h(".image-hotspot")
      .append('<span class="ring"></span>')
      .append('<span class="circle"></span>');
  }
  if (h(".progress-reading").length) {
    function t() {
      const e = h(document).scrollTop();
      pageHeight = h(document).height() - h(window).height();
      progress = (100 * e) / pageHeight;
      h(".progress-reading .progress-bar").width(parseInt(progress) + "%");
    }
    h(document).on("scroll ready", () => {
      t();
    });
    h(document).ready(() => {
      h(window).afterResize(() => {
        t();
      });
    });
  }
  if (h("body[data-plugin-page-transition]").length) {
    let s = false;
    h(document).on("click", "a", function (e) {
      s = h(this);
    });
    h(window).on("beforeunload", (e) => {
      if (typeof s === "object") {
        const t = s.attr("href");
        if (
          t.indexOf("mailto:") != 0 &&
          t.indexOf("tel:") != 0 &&
          !s.data("rm-from-transition")
        ) {
          h("body").addClass("page-transition-active");
        }
      }
    });
    h(window).on("pageshow", ({ persisted: e, originalEvent: t }) => {
      if (e || t.persisted) {
        if (h("html").hasClass("safari")) {
          window.location.reload();
        }
        h("body").removeClass("page-transition-active");
      }
    });
  }
  if (h("[data-clone-element]").length) {
    h("[data-clone-element]").each(function () {
      const t = h(this),
        s = t.html(),
        i = t.attr("data-clone-element");
      for (let e = 0; e < i; e++) {
        t.html(t.html() + s);
      }
    });
  }
  if (h("[data-clone-element-to]").length) {
    h("[data-clone-element-to]").each(function () {
      const e = h(this);
      const t = e.html();
      const s = h(e.attr("data-clone-element-to"));
      s.html(s.html() + t);
    });
  }
  h(".thumb-info-floating-caption").each(function () {
    h(this)
      .addClass("thumb-info-floating-element-wrapper")
      .append(
        '<span class="thumb-info-floating-element thumb-info-floating-caption-title d-none">' +
          h(this).data("title") +
          "</span>",
      );
    if (h(this).data("type")) {
      h(".thumb-info-floating-caption-title", h(this))
        .append(
          '<div class="thumb-info-floating-caption-type">' +
            h(this).data("type") +
            "</div>",
        )
        .css({ "padding-bottom": 22 });
    }
    if (h(this).hasClass("thumb-info-floating-caption-clean")) {
      h(".thumb-info-floating-element", h(this)).addClass("bg-transparent");
    }
  });
  if (h(".thumb-info-floating-element-wrapper").length) {
    if (typeof gsap !== "undefined") {
      h(".thumb-info-floating-element-wrapper")
        .on("mouseenter", function ({ clientX: e, clientY: t }) {
          if (!h(this).data("offset")) {
            h(this).data("offset", 0);
          }
          const s = parseInt(h(this).data("offset"));
          h(".thumb-info-floating-element-clone").remove();
          h(".thumb-info-floating-element", h(this))
            .clone()
            .addClass("thumb-info-floating-element-clone p-fixed p-events-none")
            .attr("style", "transform: scale(0.1);")
            .removeClass("d-none")
            .appendTo("body");
          h(".thumb-info-floating-element-clone")
            .css({ left: e + s, top: t + s })
            .fadeIn(300);
          gsap.to(".thumb-info-floating-element-clone", 0.5, {
            css: { scaleX: 1, scaleY: 1 },
          });
          h(document)
            .off("mousemove")
            .on("mousemove", ({ clientX: e, clientY: t }) => {
              gsap.to(".thumb-info-floating-element-clone", 0.5, {
                css: { left: e + s, top: t + s },
              });
            });
        })
        .on("mouseout", () => {
          gsap.to(".thumb-info-floating-element-clone", 0.5, {
            css: { scaleX: 0.5, scaleY: 0.5, opacity: 0 },
          });
        });
    } else {
      a.fn.showErrorMessage(
        "Failed to Load File",
        "Failed to load: GSAP - Include the following file(s): (vendor/gsap/gsap.min.js)",
      );
    }
  }
  h(window).on("load", () => {
    h(".thumb-info-wrapper-direction-aware").each(function () {
      h(this).hoverdir({
        speed: 300,
        easing: "ease",
        hoverDelay: 0,
        inverse: false,
        hoverElem: ".thumb-info-wrapper-overlay",
      });
    });
  });
  h(".thumb-info-container-full-img").each(function () {
    const t = h(this);
    h("[data-full-width-img-src]", t).each(function () {
      const e = "img" + Math.floor(Math.random() * 1e4);
      h(this).attr("data-rel", e);
      t.append(
        '<div style="background-image: url(' +
          h(this).attr("data-full-width-img-src") +
          ');" id="' +
          e +
          '" class="thumb-info-container-full-img-large opacity-0"></div>',
      );
    });
    h(".thumb-info", t).on("mouseenter", function (e) {
      h(".thumb-info-container-full-img-large").removeClass("active");
      h("#" + h(this).attr("data-rel")).addClass("active");
    });
  });
  h("[data-toggle-text-click]").on("click", function () {
    h(this).text(function (e, t) {
      return t === h(this).attr("data-toggle-text-click")
        ? h(this).attr("data-toggle-text-click-alt")
        : h(this).attr("data-toggle-text-click");
    });
  });
  h("[data-toggle-class]").on("click", function (e) {
    e.preventDefault();
    h(this).toggleClass(h(this).data("toggle-class"));
  });
  if (h(".shape-divider").length) {
    s();
    h(window).on("resize", () => {
      s();
    });
  }
  if (h(".shape-divider-horizontal-animation").length) {
    a.fn.intObs(
      ".shape-divider-horizontal-animation",
      function () {
        for (let e = 0; e <= 1; e++) {
          const t = h(this).find("svg:nth-child(1)").clone();
          h(this).append(t);
        }
        h(this).addClass("start");
      },
      {},
    );
  }
  function s() {
    if (h(window).width() < 1950) {
      h(".shape-divider svg[preserveAspectRatio]").each(function () {
        if (!h(this).parent().hasClass("shape-divider-horizontal-animation")) {
          h(this).attr("preserveAspectRatio", "xMinYMin");
        } else {
          h(this).attr("preserveAspectRatio", "none");
        }
      });
    } else {
      h(".shape-divider svg[preserveAspectRatio]").each(function () {
        h(this).attr("preserveAspectRatio", "none");
      });
    }
  }
  h("[data-content-switcher]").on("change", function (e, t) {
    const s = h(this).is(":checked") ? "1" : "2",
      i = h(this).attr("data-content-switcher-content-id");
    h("[data-content-switcher-id=" + i + "]")
      .addClass("initialized")
      .removeClass("active");
    const o = h(
      "[data-content-switcher-id=" +
        i +
        "][data-content-switcher-rel=" +
        s +
        "]",
    );
    o.addClass("active");
    o.parent().css("height", o.height());
  });
  h("[data-content-switcher]").trigger("change");
  const i = h(window);
  i.on("resize dynamic.height.resize", () => {
    h("[data-dynamic-height]").each(function () {
      const e = h(this),
        t = JSON.parse(
          e.data("dynamic-height").replace(/'/g, '"').replace(";", ""),
        );
      if (i.width() < 576) {
        e.height(t[4]);
      }
      if (i.width() > 575 && i.width() < 768) {
        e.height(t[3]);
      }
      if (i.width() > 767 && i.width() < 992) {
        e.height(t[2]);
      }
      if (i.width() > 991 && i.width() < 1200) {
        e.height(t[1]);
      }
      if (i.width() > 1199) {
        e.height(t[0]);
      }
    });
  });
  if (i.width() < 992) {
    i.trigger("dynamic.height.resize");
  }
  if (h("[data-trigger-play-video]").length) {
    a.fn.execOnceTroughEvent(
      "[data-trigger-play-video]",
      "mouseover.trigger.play.video",
      function () {
        const t = h(h(this).data("trigger-play-video"));
        h(this).on("click", function (e) {
          e.preventDefault();
          if (h(this).data("trigger-play-video-remove") == "yes") {
            h(this).animate({ opacity: 0 }, 300, function () {
              t[0].play();
              h(this).remove();
            });
          } else {
            setTimeout(() => {
              t[0].play();
            }, 300);
          }
        });
      },
    );
  }
  if (h("video[data-auto-play]").length) {
    h(window).on("load", () => {
      h("video[data-auto-play]").each(function () {
        const e = h(this);
        setTimeout(() => {
          if (h("#" + e.attr("id")).length) {
            if (
              h('[data-trigger-play-video="#' + e.attr("id") + '"]').data(
                "trigger-play-video-remove",
              ) == "yes"
            ) {
              h('[data-trigger-play-video="#' + e.attr("id") + '"]').animate(
                { opacity: 0 },
                300,
                () => {
                  e[0].play();
                  h(
                    '[data-trigger-play-video="#' + e.attr("id") + '"]',
                  ).remove();
                },
              );
            } else {
              setTimeout(() => {
                e[0].play();
              }, 300);
            }
          }
        }, 100);
      });
    });
  }
  if (h("[data-remove-min-height]").length) {
    h(window).on("load", () => {
      h("[data-remove-min-height]").each(function () {
        h(this).css({ "min-height": 0 });
      });
    });
  }
  if (h("[data-title-border]").length) {
    const n = h('<span class="page-header-title-border"></span>'),
      r = h("[data-title-border]"),
      i = h(window);
    r.before(n);
    const l = () => {
      n.width(r.width());
    };
    i.afterResize(() => {
      l();
    });
    l();
    n.addClass("visible");
  }
  ((i) => {
    const e = {
      $wrapper: i(".footer-reveal"),
      init() {
        const e = this;
        e.build();
        e.events();
      },
      build() {
        const e = this,
          t = e.$wrapper.outerHeight(true),
          s = i(window).height() - i(".header-body").height();
        if (t > s) {
          i("#footer").removeClass("footer-reveal");
          i("body").css("margin-bottom", 0);
        } else {
          i("#footer").addClass("footer-reveal");
          i("body").css("margin-bottom", t);
        }
      },
      events() {
        const e = this,
          t = i(window);
        t.on("load", () => {
          t.afterResize(() => {
            e.build();
          });
        });
      },
    };
    if (i(".footer-reveal").length) {
      e.init();
    }
  })(jQuery);
  if (h("[data-reinit-plugin]").length) {
    h("[data-reinit-plugin]").on("click", function (e) {
      e.preventDefault();
      const t = h(this).data("reinit-plugin"),
        s = h(this).data("reinit-plugin-function"),
        i = h(this).data("reinit-plugin-element"),
        o = a.fn.getOptions(h(this).data("reinit-plugin-options"));
      h(i).data(t).destroy();
      setTimeout(() => {
        a.fn.execPluginFunction(s, h(i), o);
      }, 1e3);
    });
  }
  if (h("[data-copy-to-clipboard]").length) {
    a.fn.intObs(
      "[data-copy-to-clipboard]",
      function () {
        const i = h(this);
        i.wrap(
          '<div class="copy-to-clipboard-wrapper position-relative"></div>',
        );
        const e = h(
          '<a href="#" class="btn btn-primary btn-px-2 py-1 text-0 position-absolute top-8 right-8">COPY</a>',
        );
        i.parent().prepend(e);
        e.on("click", function (e) {
          e.preventDefault();
          const t = h(this),
            s = h('<textarea class="d-block opacity-0" style="height: 0;">');
          t.parent().append(s);
          s.val(i.text());
          s[0].select();
          s[0].setSelectionRange(0, 99999);
          document.execCommand("copy");
          t.addClass("copied");
          setTimeout(() => {
            t.removeClass("copied");
          }, 1e3);
          s.remove();
        });
      },
      { rootMargin: "0px 0px 0px 0px" },
    );
  }
  if (h(".marquee").length && h.isFunction(h.fn.marquee)) {
    h(".marquee").marquee({
      duration: 5e3,
      gap: 0,
      delayBeforeStart: 0,
      direction: "left",
      duplicated: true,
    });
  }
  if (h(".style-switcher-open-loader").length) {
    const d = new URLSearchParams(window.location.search);
    let n = false;
    h(".style-switcher-open-loader").on("click", function (e) {
      e.preventDefault();
      const t = h(this);
      t.addClass("style-switcher-open-loader-loading");
      const s = h(this).data("base-path"),
        i = h(this).data("skin-src");
      const o = document.createElement("script");
      o.src = s + "master/style-switcher/style.switcher.localstorage.js";
      const a = document.createElement("script");
      a.src = s + "master/style-switcher/style.switcher.js";
      a.id = "styleSwitcherScript";
      a.setAttribute("data-base-path", s);
      a.setAttribute("data-skin-src", i);
      a.onload = () => {
        setTimeout(() => {
          function e() {
            if (!h(".style-switcher-open").length) {
              window.setTimeout(e, 100);
            } else {
              h(".style-switcher-open").trigger("click");
              if (n) {
                setTimeout(() => {
                  h(".style-switcher-open").trigger("click");
                }, 2e3);
              }
            }
          }
          e();
        }, 500);
      };
      document.body.appendChild(o);
      document.body.appendChild(a);
    });
    let e = h("html").data("style-switcher-options");
    let t = false;
    if (e) {
      e = e.replace(/'/g, '"');
      if (JSON.parse(e).showSwitcher) {
        t = true;
      }
      if (JSON.parse(e).hideStyleSwitcherAfterShow) {
        n = true;
      }
    }
    if (d.has("showStyleSwitcher")) {
      t = true;
    }
    if (d.has("hideStyleSwitcherAfterShow")) {
      n = true;
    }
    if (t) {
      h(".style-switcher-open-loader").trigger("click");
    }
  }
}).apply(this, [window.theme, jQuery]);
try {
  if (window.location !== window.parent.location) {
    $(window).on("load", () => {
      $el = $("<a />")
        .addClass("remove-envato-frame")
        .attr({ href: window.location.href, target: "_parent" })
        .text("Remove Frame");
      $("body").append($el);
    });
  }
} catch (e) {
  console.log(e);
}
((n = {}, r) => {
  const s = "__animate";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = r.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      if (e.options.flagClassOnly) {
        const t = e.options.wrapper.attr("data-appear-animation-delay")
          ? e.options.wrapper.attr("data-appear-animation-delay")
          : e.options.delay;
        e.options.wrapper.css({
          "animation-delay": t + "ms",
          "transition-delay": t + "ms",
        });
        e.options.wrapper.addClass(
          e.options.wrapper.attr("data-appear-animation"),
        );
        return this;
      }
      if (r("body").hasClass("loading-overlay-showing")) {
        r(window).on("loading.overlay.ready", () => {
          e.animate();
        });
      } else {
        e.animate();
      }
      return this;
    }
    animate() {
      const e = this;
      const t = this.options.wrapper;
      let s = 0;
      let i = this.options.duration;
      const o = t.offset().top;
      const a = r(window).scrollTop();
      if (t.data("appear-animation-svg")) {
        t.find("[data-appear-animation]").each(function () {
          const e = r(this);
          let t;
          const s = n.fn.getOptions(e.data("plugin-options"));
          if (s) t = s;
          e.themePluginAnimate(t);
        });
        return this;
      }
      if (e.options.firstLoadNoAnim) {
        t.removeClass("appear-animation");
        if (t.closest(".owl-carousel").get(0)) {
          setTimeout(() => {
            t.closest(".owl-carousel").on("change.owl.carousel", () => {
              e.options.firstLoadNoAnim = false;
              t.removeData("__animate");
              t.themePluginAnimate(e.options);
            });
          }, 500);
        }
        return this;
      }
      t.addClass("appear-animation animated");
      if (
        (!r("html").hasClass("no-csstransitions") &&
          r(window).width() > e.options.minWindowWidth &&
          o >= a) ||
        e.options.forceAnimation == true
      ) {
        s = t.attr("data-appear-animation-delay")
          ? t.attr("data-appear-animation-delay")
          : e.options.delay;
        i = t.attr("data-appear-animation-duration")
          ? t.attr("data-appear-animation-duration")
          : e.options.duration;
        if (i != "750ms") {
          t.css("animation-duration", i);
        }
        t.css("animation-delay", s + "ms");
        t.addClass(
          t.attr("data-appear-animation") + " appear-animation-visible",
        );
        t.trigger("animation:show");
      } else {
        t.addClass("appear-animation-visible");
      }
      return this;
    }
  }
  i.defaults = {
    accX: 0,
    accY: -80,
    delay: 100,
    duration: "750ms",
    minWindowWidth: 0,
    forceAnimation: false,
    flagClassOnly: false,
  };
  r.extend(n, { PluginAnimate: i });
  r.fn.themePluginAnimate = function (t) {
    return this.map(function () {
      const e = r(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((t = {}, a) => {
  const i = "__animatedContent";
  class s {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      const s = this;
      this.$el = e;
      this.initialText = e.text();
      this.setData().setOptions(t).build().events();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = a.extend(true, {}, s.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const i = this;
      if (a(window).width() < i.options.minWindowWidth) {
        return this;
      }
      if (i.options.firstLoadNoAnim) {
        i.$el.css({ visibility: "visible" });
        if (i.$el.closest(".owl-carousel").get(0)) {
          setTimeout(() => {
            i.$el.closest(".owl-carousel").on("change.owl.carousel", () => {
              i.options.firstLoadNoAnim = false;
              i.build();
            });
          }, 500);
        }
        return this;
      }
      i.setMinHeight();
      if (i.options.contentType == "letter") {
        i.$el.addClass("initialized");
        const o = i.$el.text().split("");
        i.$el.text("");
        if (i.options.animationName == "typeWriter") {
          i.$el.append(
            '<span class="letters-wrapper"></span><span class="typeWriter"></pre>',
          );
          let s = 0;
          setTimeout(() => {
            const t = () => {
              const e = setTimeout(() => {
                const e = o[s];
                i.$el
                  .find(".letters-wrapper")
                  .append(
                    '<span class="letter ' +
                      (i.options.letterClass
                        ? i.options.letterClass + " "
                        : "") +
                      '">' +
                      e +
                      "</span>",
                  );
                s++;
                t();
              }, i.options.animationSpeed);
              if (s >= o.length) {
                clearTimeout(e);
              }
            };
            t();
          }, i.options.startDelay);
        } else {
          setTimeout(() => {
            for (let e = 0; e < o.length; e++) {
              const t = o[e];
              i.$el.append(
                '<span class="animated-letters-wrapper ' +
                  i.options.wrapperClass +
                  '"><span class="animated-letters-item letter ' +
                  (i.options.letterClass ? i.options.letterClass + " " : "") +
                  i.options.animationName +
                  ' animated" style="animation-delay: ' +
                  e * i.options.animationSpeed +
                  'ms;">' +
                  (t == " " ? "&nbsp;" : t) +
                  "</span></span>",
              );
            }
          }, i.options.startDelay);
        }
      } else if (i.options.contentType == "word") {
        const e = i.$el.text().split(" ");
        let s = i.options.startDelay;
        i.$el.empty();
        a.each(e, (e, t) => {
          i.$el.append(
            a(
              '<span class="animated-words-wrapper ' +
                i.options.wrapperClass +
                '">',
            ).html(
              '<span class="animated-words-item ' +
                i.options.wordClass +
                ' appear-animation" data-appear-animation="' +
                i.options.animationName +
                '" data-appear-animation-delay="' +
                s +
                '">' +
                t +
                "&nbsp;</span>",
            ),
          );
          s = s + i.options.animationSpeed;
        });
        if (
          a.isFunction(a.fn["themePluginAnimate"]) &&
          a(".animated-words-item[data-appear-animation]").length
        ) {
          t.fn.dynIntObsInit(
            ".animated-words-item[data-appear-animation]",
            "themePluginAnimate",
            t.PluginAnimate.defaults,
          );
        }
        i.$el.addClass("initialized");
      }
      return this;
    }
    setMinHeight() {
      const e = this;
      if (e.$el.closest(".owl-carousel").get(0)) {
        e.$el.closest(".owl-carousel").addClass("d-block");
        e.$el.css("min-height", e.$el.height());
        e.$el.closest(".owl-carousel").removeClass("d-block");
      } else {
        e.$el.css("min-height", e.$el.height());
      }
      return this;
    }
    destroy() {
      const e = this;
      e.$el.html(e.initialText).css("min-height", "");
      return this;
    }
    events() {
      const e = this;
      e.$el.on("animated.letters.destroy", () => {
        e.destroy();
      });
      e.$el.on("animated.letters.initialize", () => {
        e.build();
      });
      return this;
    }
  }
  s.defaults = {
    contentType: "letter",
    animationName: "fadeIn",
    animationSpeed: 50,
    startDelay: 500,
    minWindowWidth: 768,
    letterClass: "",
    wordClass: "",
    wrapperClass: "",
  };
  a.extend(t, { PluginAnimatedContent: s });
  a.fn.themePluginAnimatedContent = function (t) {
    return this.map(function () {
      const e = a(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new s(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((t = {}, s) => {
  const i = "__beforeafter";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (s.isFunction(s.fn.twentytwenty)) {
        const e = this;
        e.options.wrapper.waitForImages(() => {
          e.options.wrapper.twentytwenty(e.options);
        });
      } else {
        t.fn.showErrorMessage(
          "Failed to Load File",
          "Failed to load: twentytwenty - Include the following file(s): (vendor/twentytwenty/css/twentytwenty.css, vendor/twentytwenty/js/jquery.event.move.js, vendor/twentytwenty/js/jquery.twentytwenty.js)",
        );
      }
      return this;
    }
  }
  o.defaults = {
    forceInit: true,
    default_offset_pct: 0.5,
    orientation: "horizontal",
    before_label: "Before",
    after_label: "After",
    no_overlay: false,
    move_slider_on_hover: false,
    move_with_handle_only: true,
    click_to_move: false,
  };
  s.extend(t, { PluginBeforeAfter: o });
  s.fn.themePluginBeforeAfter = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((i = {}, o) => {
  const s = "__carouselLight";
  class a {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.clickFlag = true;
      this.setData()
        .setOptions(t)
        .build()
        .owlNav()
        .owlDots()
        .autoPlay()
        .events();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = o.extend(true, {}, a.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      e.$el.css("opacity", 1).find(".owl-item:first-child").addClass("active");
      e.$el.trigger("initialized.owl.carousel");
      e.carouselNavigate();
      return this;
    }
    changeSlide(e) {
      const t = this,
        s = t.$el.find(".owl-item.active");
      t.$el.find(".owl-item.active").addClass("removing");
      s.removeClass("fadeIn").addClass("fadeOut animated");
      setTimeout(() => {
        setTimeout(() => {
          s.removeClass("active");
        }, 400);
        e.addClass("active").removeClass("fadeOut").addClass("fadeIn animated");
      }, 200);
      t.$el
        .find(".owl-dot")
        .removeClass("active")
        .eq(e.index())
        .addClass("active");
      t.$el.trigger({
        type: "change.owl.carousel",
        nextSlideIndex: e.index(),
        prevSlideIndex: s.index(),
      });
      setTimeout(() => {
        t.$el.trigger({
          type: "changed.owl.carousel",
          nextSlideIndex: e.index(),
          prevSlideIndex: s.index(),
        });
      }, 500);
    }
    owlNav() {
      const t = this,
        e = t.$el.find(".owl-next"),
        s = t.$el.find(".owl-prev");
      s.on("click", (e) => {
        e.preventDefault();
        if (t.options.disableAutoPlayOnClick) {
          window.clearInterval(t.autoPlayInterval);
        }
        if (t.avoidMultipleClicks()) {
          return false;
        }
        t.owlPrev();
      });
      e.on("click", (e) => {
        e.preventDefault();
        if (t.options.disableAutoPlayOnClick) {
          window.clearInterval(t.autoPlayInterval);
        }
        if (t.avoidMultipleClicks()) {
          return false;
        }
        t.owlNext();
      });
      return this;
    }
    owlDots() {
      const i = this,
        e = i.$el.find(".owl-dot");
      e.on("click", function (e) {
        let t = o(this);
        e.preventDefault();
        if (i.options.disableAutoPlayOnClick) {
          window.clearInterval(i.autoPlayInterval);
        }
        if (i.avoidMultipleClicks()) {
          return false;
        }
        const s = o(this).index();
        if (t.hasClass("active")) {
          return false;
        }
        i.changeSlide(i.$el.find(".owl-item").eq(s));
      });
      return this;
    }
    owlPrev() {
      const e = this;
      if (e.$el.find(".owl-item.active").prev().get(0)) {
        e.changeSlide(e.$el.find(".owl-item.active").prev());
      } else {
        e.changeSlide(e.$el.find(".owl-item:last-child"));
      }
    }
    owlNext() {
      const e = this;
      if (e.$el.find(".owl-item.active").next().get(0)) {
        e.changeSlide(e.$el.find(".owl-item.active").next());
      } else {
        e.changeSlide(e.$el.find(".owl-item").eq(0));
      }
    }
    avoidMultipleClicks() {
      const e = this;
      if (!e.clickFlag) {
        return true;
      }
      if (e.clickFlag) {
        e.clickFlag = false;
        setTimeout(() => {
          e.clickFlag = true;
        }, 1e3);
      }
      return false;
    }
    autoPlay() {
      const e = this,
        t = this.options.wrapper;
      if (e.options.autoplay) {
        e.autoPlayInterval = window.setInterval(() => {
          e.owlNext();
        }, e.options.autoplayTimeout);
      }
      return this;
    }
    carouselNavigate() {
      const i = this,
        t = this.options.wrapper,
        e = t;
      if (o("[data-carousel-navigate]").get(0)) {
        o('[data-carousel-navigate-id="#' + t.attr("id") + '"]').each(
          function () {
            const e = o(this),
              t = o(e.data("carousel-navigate-id")).get(0),
              s = e.data("carousel-navigate-to");
            if (t) {
              e.on("click", () => {
                if (i.options.disableAutoPlayOnClick) {
                  window.clearInterval(i.autoPlayInterval);
                }
                i.changeSlide(i.$el.find(".owl-item").eq(parseInt(s) - 1));
              });
            }
          },
        );
        t.on("change.owl.carousel", (e) => {
          o('[data-carousel-navigate-id="#' + t.attr("id") + '"]').removeClass(
            "active",
          );
        });
        t.on("changed.owl.carousel", ({ nextSlideIndex: e }) => {
          o(
            '[data-carousel-navigate-id="#' +
              t.attr("id") +
              '"][data-carousel-navigate-to="' +
              (e + 1) +
              '"]',
          ).addClass("active");
        });
      }
      return this;
    }
    events() {
      const n = this;
      n.$el.on("change.owl.carousel", (e) => {
        n.$el
          .find(
            "[data-appear-animation]:not(.background-image-wrapper), [data-plugin-animated-letters]",
          )
          .addClass("invisible");
        n.$el
          .find("[data-plugin-animated-letters]")
          .trigger("animated.letters.destroy");
        n.$el
          .find(".owl-item:not(.active) [data-carousel-onchange-show]")
          .removeClass("d-none");
      });
      n.$el.on("changed.owl.carousel", (e) => {
        setTimeout(() => {
          if (n.$el.find(".owl-item.cloned [data-appear-animation]").get(0)) {
            n.$el
              .find(".owl-item.cloned [data-appear-animation]")
              .each(function () {
                const e = o(this);
                let t;
                const s = i.fn.getOptions(e.data("plugin-options"));
                if (s) t = s;
                e.themePluginAnimate(t);
              });
          }
          n.$el
            .find(
              ".owl-item.active [data-appear-animation]:not(.background-image-wrapper), [data-plugin-animated-letters]",
            )
            .removeClass("invisible");
          n.$el
            .find(".owl-item.active [data-plugin-animated-letters]")
            .trigger("animated.letters.initialize");
          n.$el
            .find(".owl-item.cloned.active [data-plugin-video-background]")
            .trigger("video.background.initialize");
        }, 500);
      });
      if (n.options.swipeEvents) {
        n.$el.swipe({
          swipe(e, t, s, i, o, a) {
            switch (t) {
              case "right":
                n.owlPrev();
                break;
              case "left":
                n.owlNext();
                break;
            }
          },
          allowPageScroll: "vertical",
        });
      }
    }
  }
  a.defaults = {
    autoplay: true,
    autoplayTimeout: 7e3,
    disableAutoPlayOnClick: true,
    swipeEvents: true,
  };
  o.extend(i, { PluginCarouselLight: a });
  o.fn.themePluginCarouselLight = function (t) {
    return this.map(function () {
      const e = o(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new a(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((r = {}, l) => {
  const i = "__carousel";
  class s {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      this.$el = e;
      if (e.find("[data-icon]").get(0)) {
        const s = this;
        l(window).on("icon.rendered", function () {
          if (e.data(i)) {
            return this;
          }
          setTimeout(() => {
            s.setData().setOptions(t).build();
          }, 1e3);
        });
        return this;
      }
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = l.extend(true, {}, s.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!l.isFunction(l.fn.owlCarousel)) {
        return this;
      }
      const e = this,
        o = this.options.wrapper;
      o.addClass("owl-theme");
      o.addClass("owl-loading");
      if (l("html").attr("dir") == "rtl") {
        this.options = l.extend(true, {}, this.options, { rtl: true });
      }
      if (this.options.items == 1) {
        this.options.responsive = {};
      }
      if (this.options.items > 4) {
        this.options = l.extend(true, {}, this.options, {
          responsive: { 1199: { items: this.options.items } },
        });
      }
      if (this.options.autoHeight) {
        const t = [];
        o.find(".owl-item").each(function () {
          if (l(this).hasClass("active")) {
            t.push(l(this).height());
          }
        });
        l(window).afterResize(() => {
          o.find(".owl-stage-outer").height(Math.max.apply(null, t));
        });
        l(window).on("load", () => {
          o.find(".owl-stage-outer").height(Math.max.apply(null, t));
        });
      }
      o.owlCarousel(this.options).addClass("owl-carousel-init animated fadeIn");
      setTimeout(() => {
        o.removeClass("animated fadeIn");
      }, 1e3);
      if (o.closest(".owl-carousel-wrapper").get(0)) {
        setTimeout(() => {
          o.closest(".owl-carousel-wrapper").css({ height: "" });
        }, 500);
      }
      if (o.prev().hasClass("owl-carousel-loader")) {
        o.prev().remove();
      }
      e.navigationOffsets();
      if (o.hasClass("nav-outside")) {
        l(window).on("owl.carousel.nav.outside", () => {
          if (l(window).width() < 992) {
            e.options.stagePadding = 40;
            o.addClass("stage-margin");
          } else {
            e.options.stagePadding = 0;
            o.removeClass("stage-margin");
          }
          o.owlCarousel("destroy").owlCarousel(e.options);
          e.navigationOffsets();
        });
        l(window).on("load", () => {
          l(window).afterResize(() => {
            l(window).trigger("owl.carousel.nav.outside");
          });
        });
        l(window).trigger("owl.carousel.nav.outside");
      }
      if (o.hasClass("nav-svg-arrows-1")) {
        const s =
          "" +
          '<svg version="1.1" viewBox="0 0 15.698 8.706" width="17" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
          '<polygon stroke="#212121" stroke-width="0.1" fill="#212121" points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 "/>' +
          "</svg>";
        o.find(".owl-next, .owl-prev").append(s);
      }
      if (o.attr("data-sync")) {
        o.on(
          "change.owl.carousel",
          ({ namespace: e, property: t, relatedTarget: s }) => {
            if (e && t.name === "position") {
              const i = s.relative(t.value, true);
              l(o.data("sync")).owlCarousel("to", i, 300, true);
            }
          },
        );
      }
      if (o.hasClass("carousel-center-active-item")) {
        const i = o.find(".owl-item.active"),
          a = Math.floor((o.find(".owl-item.active").length - 1) / 2),
          n = i.eq(a);
        n.addClass("current");
        o.on("change.owl.carousel", (e) => {
          o.find(".owl-item").removeClass("current");
          setTimeout(() => {
            const e = o.find(".owl-item.active"),
              t = Math.floor((o.find(".owl-item.active").length - 1) / 2),
              s = e.eq(t);
            s.addClass("current");
          }, 100);
        });
        o.trigger("refresh.owl.carousel");
      }
      if (e.options.animateIn || e.options.animateOut) {
        o.on("change.owl.carousel", (e) => {
          o.find(
            "[data-appear-animation], [data-plugin-animated-letters]",
          ).addClass("d-none");
          o.find("[data-plugin-animated-letters]").trigger(
            "animated.letters.destroy",
          );
          o.find(
            ".owl-item:not(.active) [data-carousel-onchange-show]",
          ).removeClass("d-none");
        });
        o.on("changed.owl.carousel", (e) => {
          setTimeout(() => {
            o.find("[data-appear-animation]").each(function () {
              const e = l(this);
              let t;
              const s = r.fn.getOptions(e.data("plugin-options"));
              if (s) t = s;
              e.themePluginAnimate(t);
            });
            o.find(
              ".owl-item.active [data-appear-animation], [data-plugin-animated-letters]",
            ).removeClass("d-none");
            o.find(".owl-item.active [data-plugin-animated-letters]").trigger(
              "animated.letters.initialize",
            );
            o.find(
              ".owl-item.cloned.active [data-plugin-video-background]",
            ).trigger("video.background.initialize");
          }, 10);
        });
      }
      if (o.find("[data-icon]").length) {
        o.on("change.owl.carousel drag.owl.carousel", () => {
          o.find(".owl-item.cloned [data-icon]").each(function () {
            const e = l(this);
            let t;
            const s = r.fn.getOptions(e.data("plugin-options"));
            if (s) t = s;
            e.themePluginIcon(t);
          });
        });
      }
      if (o.find("[data-plugin-video-background]").get(0)) {
        l(window).resize();
      }
      o.removeClass("owl-loading");
      o.css("height", "auto");
      e.carouselNavigate();
      if (e.options.refresh) {
        o.owlCarousel("refresh");
      }
      return this;
    }
    navigationOffsets() {
      const e = this,
        t = this.options.wrapper,
        s = t.find(".owl-nav").css("transform") == "none" ? false : true,
        i = t.find(".owl-dots").css("transform") == "none" ? false : true;
      if (e.options.navHorizontalOffset && !e.options.navVerticalOffset) {
        if (!s) {
          t.find(".owl-nav").css({
            transform:
              "translate3d(" + e.options.navHorizontalOffset + ", 0, 0)",
          });
        } else {
          t.find(".owl-nav").css({ left: e.options.navHorizontalOffset });
        }
      }
      if (e.options.navVerticalOffset && !e.options.navHorizontalOffset) {
        if (!s) {
          t.find(".owl-nav").css({
            transform: "translate3d(0, " + e.options.navVerticalOffset + ", 0)",
          });
        } else {
          t.find(".owl-nav").css({
            top: "calc( 50% - " + e.options.navVerticalOffset + " )",
          });
        }
      }
      if (e.options.navVerticalOffset && e.options.navHorizontalOffset) {
        if (!s) {
          t.find(".owl-nav").css({
            transform:
              "translate3d(" +
              e.options.navHorizontalOffset +
              ", " +
              e.options.navVerticalOffset +
              ", 0)",
          });
        } else {
          t.find(".owl-nav").css({
            top: "calc( 50% - " + e.options.navVerticalOffset + " )",
            left: e.options.navHorizontalOffset,
          });
        }
      }
      if (e.options.dotsHorizontalOffset && !e.options.dotsVerticalOffset) {
        t.find(".owl-dots").css({
          transform:
            "translate3d(" + e.options.dotsHorizontalOffset + ", 0, 0)",
        });
      }
      if (e.options.dotsVerticalOffset && !e.options.dotsHorizontalOffset) {
        if (!i) {
          t.find(".owl-dots").css({
            transform:
              "translate3d(0, " + e.options.dotsVerticalOffset + ", 0)",
          });
        } else {
          t.find(".owl-dots").css({
            top: "calc( 50% - " + e.options.dotsVerticalOffset + " )",
          });
        }
      }
      if (e.options.dotsVerticalOffset && e.options.dotsHorizontalOffset) {
        t.find(".owl-dots").css({
          transform:
            "translate3d(" +
            e.options.dotsHorizontalOffset +
            ", " +
            e.options.dotsVerticalOffset +
            ", 0)",
        });
      }
      return this;
    }
    carouselNavigate() {
      const e = this,
        t = this.options.wrapper,
        i = t.data("owl.carousel");
      if (l("[data-carousel-navigate]").get(0)) {
        l('[data-carousel-navigate-id="#' + t.attr("id") + '"]').each(
          function () {
            const e = l(this),
              t = l(e.data("carousel-navigate-id")).get(0),
              s = e.data("carousel-navigate-to");
            if (t) {
              e.on("click", () => {
                i.to(parseInt(s) - 1);
              });
            }
          },
        );
        t.on("change.owl.carousel", () => {
          l('[data-carousel-navigate-id="#' + t.attr("id") + '"]').removeClass(
            "active",
          );
        });
        t.on("changed.owl.carousel", ({ item: e }) => {
          l(
            '[data-carousel-navigate-id="#' +
              t.attr("id") +
              '"][data-carousel-navigate-to="' +
              (e.index + 1) +
              '"]',
          ).addClass("active");
        });
      }
      return this;
    }
  }
  s.defaults = {
    loop: true,
    responsive: {
      0: { items: 1 },
      479: { items: 1 },
      768: { items: 2 },
      979: { items: 3 },
      1199: { items: 4 },
    },
    navText: [],
    refresh: false,
  };
  l.extend(r, { PluginCarousel: s });
  l.fn.themePluginCarousel = function (t) {
    return this.map(function () {
      const e = l(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new s(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, o) => {
  const s = "__chartCircular";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = o.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!o.isFunction(o.fn.easyPieChart)) {
        return this;
      }
      const e = this,
        t = this.options.wrapper,
        s = t.attr("data-percent") ? t.attr("data-percent") : 0,
        i = t.find(".percent");
      o.extend(true, e.options, {
        onStep(e, t, s) {
          i.html(parseInt(s));
        },
      });
      t.attr("data-percent", 0);
      t.easyPieChart(e.options);
      setTimeout(() => {
        t.data("easyPieChart").update(s);
        t.attr("data-percent", s);
      }, e.options.delay);
      return this;
    }
  }
  i.defaults = {
    accX: 0,
    accY: -150,
    delay: 1,
    barColor: "#D4AF37",
    trackColor: "#f2f2f2",
    scaleColor: false,
    scaleLength: 5,
    lineCap: "round",
    lineWidth: 13,
    size: 175,
    rotate: 0,
    animate: { duration: 2500, enabled: true },
  };
  o.extend(e, { PluginChartCircular: i });
  o.fn.themePluginChartCircular = function (t) {
    return this.map(function () {
      const e = o(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, a) => {
  const s = "__countdown";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = a.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!a.isFunction(a.fn.countTo)) {
        return this;
      }
      const s = this,
        e = this.options.wrapper,
        i = s.options.numberClass ? " " + s.options.numberClass : "",
        o = s.options.wrapperClass ? " " + s.options.wrapperClass : "";
      if (s.options.uppercase) {
        e.countdown(s.options.date).on("update.countdown", function (e) {
          const t = a(this).html(
            e.strftime(
              s.options.insertHTMLbefore +
                '<span class="days' +
                o +
                '"><span class="' +
                i +
                '">%D</span> ' +
                s.options.textDay +
                "</span> " +
                '<span class="hours' +
                o +
                '"><span class="' +
                i +
                '">%H</span> ' +
                s.options.textHour +
                "</span> " +
                '<span class="minutes' +
                o +
                '"><span class="' +
                i +
                '">%M</span> ' +
                s.options.textMin +
                "</span> " +
                '<span class="seconds' +
                o +
                '"><span class="' +
                i +
                '">%S</span> ' +
                s.options.textSec +
                "</span> " +
                s.options.insertHTMLafter,
            ),
          );
        });
      } else {
        e.countdown(s.options.date).on("update.countdown", function (e) {
          const t = a(this).html(
            e.strftime(
              s.options.insertHTMLbefore +
                '<span class="days' +
                o +
                '"><span class="' +
                i +
                '">%D</span> ' +
                s.options.textDay +
                "</span> " +
                '<span class="hours' +
                o +
                '"><span class="' +
                i +
                '">%H</span> ' +
                s.options.textHour +
                "</span> " +
                '<span class="minutes' +
                o +
                '"><span class="' +
                i +
                '">%M</span> ' +
                s.options.textMin +
                "</span> " +
                '<span class="seconds' +
                o +
                '"><span class="' +
                i +
                '">%S</span> ' +
                s.options.textSec +
                "</span> " +
                s.options.insertHTMLafter,
            ),
          );
        });
      }
      return this;
    }
  }
  i.defaults = {
    date: "2030/06/10 12:00:00",
    textDay: "DAYS",
    textHour: "HRS",
    textMin: "MIN",
    textSec: "SEC",
    uppercase: true,
    numberClass: "",
    wrapperClass: "",
    insertHTMLbefore: "",
    insertHTMLafter: "",
  };
  a.extend(e, { PluginCountdown: i });
  a.fn.themePluginCountdown = function (t) {
    return this.map(function () {
      const e = a(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, o) => {
  const s = "__counter";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = o.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!o.isFunction(o.fn.countTo)) {
        return this;
      }
      const s = this,
        i = this.options.wrapper;
      if (s.options.comma) {
        s.options.formatter = (e, { decimals: t }) =>
          e.toFixed(t).toString().replace(".", ",");
      }
      o.extend(s.options, {
        onComplete() {
          if (i.data("append")) {
            if (s.options.appendWrapper) {
              const e = o(s.options.appendWrapper);
              e.append(i.data("append"));
              i.html(i.html() + e[0].outerHTML);
            } else {
              i.html(i.html() + i.data("append"));
            }
          }
          if (i.data("prepend")) {
            if (s.options.prependWrapper) {
              const t = o(s.options.prependWrapper);
              t.append(i.data("prepend"));
              i.html(i.html() + t[0].outerHTML);
            } else {
              i.html(i.data("prepend") + i.html());
            }
          }
        },
      });
      i.countTo(s.options);
      return this;
    }
  }
  i.defaults = {
    accX: 0,
    accY: 0,
    appendWrapper: false,
    prependWrapper: false,
    speed: 3e3,
    refreshInterval: 100,
    decimals: 0,
    comma: false,
    onUpdate: null,
    onComplete: null,
  };
  o.extend(e, { PluginCounter: i });
  o.fn.themePluginCounter = function (t) {
    return this.map(function () {
      const e = o(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, n) => {
  const s = "__cursorEffect";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build().events();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = n.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      e.clientX = -100;
      e.clientY = -100;
      if (e.options.hideMouseCursor) {
        e.$el.addClass("hide-mouse-cursor");
      }
      const t = document.createElement("DIV");
      t.className = "cursor-outer";
      const s = document.createElement("DIV");
      s.className = "cursor-inner";
      if (e.options.cursorOuterColor) {
        t.style = "border-color: " + e.options.cursorOuterColor + ";";
      }
      if (e.options.cursorInnerColor) {
        s.style = "background-color: " + e.options.cursorInnerColor + ";";
      }
      if (e.options.size) {
        switch (e.options.size) {
          case "small":
            e.$el.addClass("cursor-effect-size-small");
            break;
          case "big":
            e.$el.addClass("cursor-effect-size-big");
            break;
        }
      }
      if (e.options.style) {
        e.$el.addClass(e.options.style);
      }
      document.body.prepend(t);
      document.body.prepend(s);
      const i = () => {
        t.style.transform =
          "translate(" + e.clientX + "px, " + e.clientY + "px)";
        s.style.transform =
          "translate(" + e.clientX + "px, " + e.clientY + "px)";
        e.loopInside = requestAnimationFrame(i);
      };
      e.loop = requestAnimationFrame(i);
      return this;
    }
    events() {
      const i = this,
        o = n(".cursor-outer"),
        a = n(".cursor-inner");
      const t = o[0].getBoundingClientRect(),
        s = o.css("border-radius");
      document.addEventListener("mousemove", ({ clientX: e, clientY: t }) => {
        if (!i.isStuck) {
          i.clientX = e - 20;
          i.clientY = t - 20;
        }
        o.removeClass("opacity-0");
      });
      i.isStuck = false;
      n("[data-cursor-effect-hover]").on("mouseenter", function (e) {
        o.addClass("cursor-outer-hover");
        a.addClass("cursor-inner-hover");
        const t = n(this).data("cursor-effect-hover-color");
        o.addClass("cursor-color-" + t);
        a.addClass("cursor-color-" + t);
        switch (n(this).data("cursor-effect-hover")) {
          case "fit":
            const s = n(this)[0].getBoundingClientRect();
            i.clientX = s.x;
            i.clientY = s.y;
            o.css({
              width: s.width,
              height: s.height,
              "border-radius": n(this).css("border-radius"),
            }).addClass("cursor-outer-fit");
            a.addClass("opacity-0");
            i.isStuck = true;
            break;
          case "plus":
            a.addClass("cursor-inner-plus");
            break;
        }
      });
      n("[data-cursor-effect-hover]").on("mouseleave", function () {
        o.removeClass("cursor-outer-hover");
        a.removeClass("cursor-inner-hover");
        const e = n(this).data("cursor-effect-hover-color");
        o.removeClass("cursor-color-" + e);
        a.removeClass("cursor-color-" + e);
        switch (n(this).data("cursor-effect-hover")) {
          case "fit":
            o.css({
              width: t.width,
              height: t.height,
              "border-radius": s,
            }).removeClass("cursor-outer-fit");
            a.removeClass("opacity-0");
            i.isStuck = false;
            break;
          case "plus":
            a.removeClass("cursor-inner-plus");
            break;
        }
      });
      n(window).on("scroll", () => {
        if (o.hasClass("cursor-outer-fit")) {
          o.addClass("opacity-0").removeClass("cursor-outer-fit");
        }
      });
      return this;
    }
    destroy() {
      const e = this;
      e.$el.removeClass(
        "hide-mouse-cursor cursor-effect-size-small cursor-effect-size-big cursor-effect-style-square",
      );
      cancelAnimationFrame(e.loop);
      cancelAnimationFrame(e.loopInside);
      document.querySelector(".cursor-outer").remove();
      document.querySelector(".cursor-inner").remove();
      e.$el.removeData(s, e);
    }
  }
  i.defaults = {};
  n.extend(e, { PluginCursorEffect: i });
  n.fn.themePluginCursorEffect = function (t) {
    return this.map(function () {
      const e = n(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((o = {}, d) => {
  const s = "__floatElement";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = d.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      const t = this.options.wrapper;
      const s = d(window);
      let i;
      if (t.data("plugin-float-element-svg")) {
        t.find("[data-plugin-float-element]").each(function () {
          const e = d(this);
          let t;
          const s = o.fn.getOptions(e.data("plugin-options"));
          if (s) t = s;
          e.themePluginFloatElement(t);
        });
        return this;
      }
      if (e.options.style) {
        t.attr("style", e.options.style);
      }
      if (s.width() > e.options.minWindowWidth) {
        if (e.options.startPos == "none") {
          i = "";
        } else if (e.options.startPos == "top") {
          t.css({ top: 0 });
          i = "";
        } else {
          t.css({ bottom: 0 });
          i = "-";
        }
        if (e.options.transition) {
          t.css({
            transition:
              "ease-out transform " +
              e.options.transitionDuration +
              "ms " +
              e.options.transitionDelay +
              "ms",
          });
        }
        e.movement(i);
        s.on("scroll", () => {
          e.movement(i);
        });
      }
      return this;
    }
    movement(e) {
      const t = this,
        s = this.options.wrapper,
        i = d(window),
        o = i.scrollTop(),
        a = s.offset().top,
        n = a - o,
        r = t.options.isInsideSVG ? 2 : 100;
      const l = (r * n) / i.height();
      if (s.visible(true)) {
        if (!t.options.horizontal) {
          s.css({
            transform: "translate3d(0, " + e + l / t.options.speed + "%, 0)",
          });
        } else {
          s.css({
            transform: "translate3d(" + e + l / t.options.speed + "%, 0, 0)",
          });
        }
      }
    }
  }
  i.defaults = {
    startPos: "top",
    speed: 3,
    horizontal: false,
    isInsideSVG: false,
    transition: false,
    transitionDelay: 0,
    transitionDuration: 500,
    minWindowWidth: 991,
  };
  d.extend(o, { PluginFloatElement: i });
  d.fn.themePluginFloatElement = function (t) {
    return this.map(function () {
      const e = d(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((o = {}, a) => {
  const s = "__gdpr";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      const s = this;
      this.$el = e;
      this.setData().setOptions(t).build().events();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = a.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      if (!a.cookie("porto-privacy-bar")) {
        setTimeout(() => {
          e.options.wrapper.addClass("show");
        }, e.options.cookieBarShowDelay);
      }
      if (a.cookie("porto-gdpr-preferences")) {
        const t = a.cookie("porto-gdpr-preferences").split(",");
        for (let e = 0; e < t.length; e++) {
          if (a('input[value="' + t[e] + '"]').get(0)) {
            if (a('input[value="' + t[e] + '"]').is(":checkbox")) {
              a('input[value="' + t[e] + '"]').prop("checked", true);
            }
          }
        }
      }
      return this;
    }
    events() {
      const i = this;
      i.options.wrapper.find(".gdpr-agree-trigger").on("click", (e) => {
        e.preventDefault();
        a(".gdpr-preferences-form")
          .find(".gdpr-input")
          .each(function () {
            if (a(this).is(":checkbox") || a(this).is(":hidden")) {
              a(this).prop("checked", true);
            }
          });
        a(".gdpr-preferences-form").trigger("submit").removeClass("show");
        i.removeCookieBar();
      });
      i.options.wrapper.find(".gdpr-preferences-trigger").on("click", (e) => {
        e.preventDefault();
        a(".gdpr-preferences-popup").addClass("show");
      });
      a(".gdpr-close-popup").on("click", (e) => {
        e.preventDefault();
        a(".gdpr-preferences-popup").removeClass("show");
      });
      a(".gdpr-preferences-popup").on("click", ({ target: e }) => {
        if (!a(e).closest(".gdpr-preferences-popup-content").get(0)) {
          a(".gdpr-preferences-popup").removeClass("show");
        }
      });
      a(".gdpr-preferences-form").on("submit", function (e) {
        e.preventDefault();
        const t = a(this);
        t.find('button[type="submit"]').text("SAVING...");
        const s = [];
        t.find(".gdpr-input").each(function () {
          if (
            (a(this).is(":checkbox") && a(this).is(":checked")) ||
            a(this).is(":hidden")
          ) {
            s.push(a(this).val());
          }
        });
        a.cookie("porto-privacy-bar", true, { expires: i.options.expires });
        setTimeout(() => {
          t.find('button[type="submit"]')
            .text("SAVED!")
            .removeClass("btn-primary")
            .addClass("btn-success");
          setTimeout(() => {
            a(".gdpr-preferences-popup").removeClass("show");
            i.removeCookieBar();
            t.find('button[type="submit"]')
              .text("SAVE PREFERENCES")
              .removeClass("btn-success")
              .addClass("btn-primary");
            if (a.cookie("porto-gdpr-preferences")) {
              a.cookie("porto-gdpr-preferences", s, {
                expires: i.options.expires,
              });
              location.reload();
            } else {
              a.cookie("porto-gdpr-preferences", s, {
                expires: i.options.expires,
              });
              if (
                a.isFunction(a.fn["themePluginGDPRWrapper"]) &&
                a("[data-plugin-gdpr-wrapper]").length
              ) {
                a(() => {
                  a("[data-plugin-gdpr-wrapper]:not(.manual)").each(
                    function () {
                      const e = a(this);
                      let t;
                      e.removeData("__gdprwrapper");
                      const s = o.fn.getOptions(e.data("plugin-options"));
                      if (s) t = s;
                      e.themePluginGDPRWrapper(t);
                    },
                  );
                });
              }
            }
          }, 500);
        }, 1e3);
      });
      a(".gdpr-reset-cookies").on("click", (e) => {
        e.preventDefault();
        i.clearCookies();
        location.reload();
      });
      a(".gdpr-open-preferences").on("click", (e) => {
        e.preventDefault();
        a(".gdpr-preferences-popup").toggleClass("show");
      });
      return this;
    }
    removeCookieBar() {
      const e = this;
      e.options.wrapper.addClass("removing").on("transitionend", () => {
        setTimeout(() => {
          e.options.wrapper.removeClass("show removing");
        }, 500);
      });
      return this;
    }
    clearCookies() {
      const e = this;
      a.removeCookie("porto-privacy-bar");
      a.removeCookie("porto-gdpr-preferences");
      return this;
    }
  }
  i.defaults = { cookieBarShowDelay: 3e3, expires: 365 };
  a.extend(o, { PluginGDPR: i });
  a.fn.themePluginGDPR = function (t) {
    return this.map(function () {
      const e = a(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__gdprwrapper";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      const s = this;
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const t = this;
      if (
        s.cookie("porto-gdpr-preferences") &&
        s.cookie("porto-gdpr-preferences").includes(t.options.checkCookie)
      ) {
        s.ajax({
          url: t.options.ajaxURL,
          cache: false,
          complete({ responseText: e }) {
            setTimeout(() => {
              t.options.wrapper.html(e).addClass("show");
            }, 1e3);
          },
        });
      } else {
        t.options.wrapper.addClass("show");
      }
      return this;
    }
  }
  o.defaults = {};
  s.extend(e, { PluginGDPRWrapper: o });
  s.fn.themePluginGDPRWrapper = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__hoverEffect";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      if (e.$el.hasClass("hover-effect-3d")) {
        e.options.effect = "3d";
      }
      if (e.options.effect == "magnetic") {
        e.magnetic();
      }
      if (e.options.effect == "3d") {
        e.hover3d();
      }
      return this;
    }
    magnetic() {
      const a = this;
      a.$el.mousemove(function ({ clientX: e, clientY: t }) {
        const s = this.getBoundingClientRect();
        const i = e - s.left - s.width / 2;
        const o = t - s.top - s.height / 2;
        this.style.transform =
          "translate(" +
          i * a.options.magneticMx +
          "px, " +
          o * a.options.magneticMx +
          "px)";
      });
      a.$el.mouseleave(function (e) {
        this.style.transform = "translate3d(0px, 0px, 0px)";
      });
      return this;
    }
    hover3d() {
      const e = this;
      if (s.isFunction(s.fn["hover3d"])) {
        e.$el.hover3d({
          selector: e.options.selector,
          sensitivity: e.options.sensitivity,
        });
      }
      return this;
    }
  }
  o.defaults = {
    effect: "magnetic",
    magneticMx: 0.15,
    magneticMy: 0.3,
    magneticDeg: 12,
    selector: ".thumb-info, .hover-effect-3d-wrapper",
    sensitivity: 20,
  };
  s.extend(e, { PluginHoverEffect: o });
  s.fn.themePluginHoverEffect = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, h) => {
  const s = "__icon";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = h.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const n = this;
      let r = this.options.wrapper;
      const l = n.options.color;
      const d = r.offset().top;
      const c = h(window).scrollTop();
      let p = n.options.animated && !n.options.strokeBased ? 200 : 100;
      if (window.location.protocol === "file:") {
        r.css({ opacity: 1, width: r.attr("width") });
        if (n.options.extraClass) {
          r.addClass(n.options.extraClass);
        }
        if (n.options.extraClass.indexOf("-color-light") > 0) {
          r.css({ filter: "invert(1)" });
        }
        h(window).trigger("icon.rendered");
        return;
      }
      if (n.options.duration) {
        p = n.options.duration;
      }
      const e = r.attr("src");
      if (e.split(".").pop() == "svg") {
        const t = h.get({
          url: e,
          success(e, t, { responseText: s }) {
            const i = n.options.fadeIn
                ? h(
                    '<div class="animated-icon animated fadeIn">' +
                      s +
                      "</div>",
                  )
                : h('<div class="animated-icon animated">' + s + "</div>"),
              o = "icon_" + Math.floor(Math.random() * 26) + Date.now();
            i.find("svg").attr("id", o);
            i.find("svg").attr(
              "data-filename",
              r
                .attr("src")
                .split(/(\\|\/)/g)
                .pop(),
            );
            if (r.attr("width")) {
              i.find("svg")
                .attr("width", r.attr("width"))
                .attr("height", r.attr("width"));
            }
            if (r.attr("height")) {
              i.find("svg").attr("height", r.attr("height"));
            }
            if (n.options.svgViewBox) {
              i.find("svg").attr("viewBox", n.options.svgViewBox);
            }
            r.replaceWith(i);
            if (n.options.extraClass) {
              i.addClass(n.options.extraClass);
            }
            if (n.options.removeClassAfterInit) {
              i.removeClass(n.options.removeClassAfterInit);
            }
            if (n.options.onlySVG) {
              h(window).trigger("icon.rendered");
              return this;
            }
            r = i;
            const a = new Vivus(o, {
              start: "manual",
              type: "sync",
              selfDestroy: true,
              duration: p,
              onReady({ el: e }) {
                const t = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "style",
                );
                let s = "";
                if (
                  (n.options.animated && !n.options.strokeBased) ||
                  (!n.options.animated && l && !n.options.strokeBased)
                ) {
                  s =
                    "stroke-width: 0.1px; fill-opacity: 0; transition: ease fill-opacity 300ms;";
                  t.textContent =
                    "#" +
                    o +
                    " path, #" +
                    o +
                    " line, #" +
                    o +
                    " rect, #" +
                    o +
                    " circle, #" +
                    o +
                    " polyline { fill: " +
                    l +
                    "; stroke: " +
                    l +
                    "; " +
                    s +
                    (n.options.svgStyle ? n.options.svgStyle : "") +
                    " } .finished path { fill-opacity: 1; }";
                  e.appendChild(t);
                }
                if (
                  (n.options.animated && n.options.strokeBased) ||
                  (!n.options.animated && l && n.options.strokeBased)
                ) {
                  t.textContent =
                    "#" +
                    o +
                    " path, #" +
                    o +
                    " line, #" +
                    o +
                    " rect, #" +
                    o +
                    " circle, #" +
                    o +
                    " polyline { stroke: " +
                    l +
                    "; " +
                    (n.options.svgStyle ? n.options.svgStyle : "") +
                    "}";
                  e.appendChild(t);
                }
                h.event.trigger("theme.plugin.icon.svg.ready");
              },
            });
            if (!n.options.animated) {
              setTimeout(() => {
                a.finish();
              }, 10);
              r.css({ opacity: 1 });
            }
            if (n.options.animated && h(window).width() > 767) {
              if (r.visible(true)) {
                n.startIconAnimation(a, r);
              } else if (d < c) {
                n.startIconAnimation(a, r);
              }
              h(window).on("scroll", () => {
                if (r.visible(true)) {
                  n.startIconAnimation(a, r);
                }
              });
            } else {
              r.css({ opacity: 1 });
              a.finish();
              h(window).on("theme.plugin.icon.svg.ready", () => {
                setTimeout(() => {
                  a.el.setAttribute("class", "finished");
                  a.finish();
                }, 300);
              });
            }
            h(window).trigger("icon.rendered");
          },
        });
      } else {
        r.removeAttr("data-icon");
      }
      return this;
    }
    startIconAnimation(e, t) {
      const s = this;
      h({ to: 0 }).animate(
        { to: 1 },
        s.options.strokeBased ? s.options.delay : s.options.delay + 300,
        () => {
          t.css({ opacity: 1 });
        },
      );
      h({ to: 0 }).animate({ to: 1 }, s.options.delay, () => {
        e.play(1);
        setTimeout(() => {
          e.el.setAttribute("class", "finished");
        }, e.duration * 5);
      });
    }
  }
  i.defaults = {
    color: "#2388ED",
    animated: false,
    delay: 300,
    onlySVG: false,
    removeClassAfterInit: false,
    fadeIn: true,
    accY: 0,
  };
  h.extend(e, { PluginIcon: i });
  h.fn.themePluginIcon = function (t) {
    return this.map(function () {
      const e = h(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__inviewportstyle";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, {});
      return this;
    }
    build() {
      const e = this,
        t = e.$el.get(0);
      e.$el.css(e.options.style);
      if (typeof window.IntersectionObserver === "function") {
        const s = observeElementInViewport.observeElementInViewport(
          t,
          () => {
            e.$el.css(e.options.styleIn);
            e.$el.addClass(e.options.classIn).removeClass(e.options.classOut);
          },
          () => {
            e.$el.css(e.options.styleOut);
            e.$el.addClass(e.options.classOut).removeClass(e.options.classIn);
          },
          {
            viewport: e.options.viewport,
            threshold: e.options.threshold,
            modTop: e.options.modTop,
            modBottom: e.options.modBottom,
          },
        );
      }
      return this;
    }
  }
  o.defaults = {
    viewport: window,
    threshold: [0],
    modTop: "-200px",
    modBottom: "-200px",
    style: { transition: "all 1s ease-in-out" },
    styleIn: "",
    styleOut: "",
    classIn: "",
    classOut: "",
  };
  s.extend(e, { PluginInViewportStyle: o });
  s.fn.themePluginInViewportStyle = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__lightbox";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!s.isFunction(s.fn.magnificPopup)) {
        return this;
      }
      this.options.wrapper.magnificPopup(this.options);
      return this;
    }
  }
  o.defaults = {
    tClose: "Close (Esc)",
    tLoading: "Loading...",
    gallery: {
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    image: { tError: '<a href="%url%">The image</a> could not be loaded.' },
    ajax: { tError: '<a href="%url%">The content</a> could not be loaded.' },
    callbacks: {
      open() {
        s("html").addClass("lightbox-opened");
      },
      close() {
        s("html").removeClass("lightbox-opened");
      },
    },
  };
  s.extend(e, { PluginLightbox: o });
  s.fn.themePluginLightbox = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((s = {}, a) => {
  const t = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
    "</div>",
  ].join("");
  const i = [
    '<div class="loading-overlay loading-overlay-percentage">',
    '<div class="page-loader-progress-wrapper"><span class="page-loader-progress">0</span><span class="page-loader-progress-symbol">%</span></div>',
    "</div>",
  ].join("");
  const o = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><div class="cssload-thecube"><div class="cssload-cube cssload-c1"></div><div class="cssload-cube cssload-c2"></div><div class="cssload-cube cssload-c4"></div><div class="cssload-cube cssload-c3"></div></div></div>',
    "</div>",
  ].join("");
  const n = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><span class="cssload-cube-progress"><span class="cssload-cube-progress-inner"></span></span></div>',
    "</div>",
  ].join("");
  const r = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><div class="cssload-float-rings-loader"><div class="cssload-float-rings-inner cssload-one"></div><div class="cssload-float-rings-inner cssload-two"></div><div class="cssload-float-rings-inner cssload-three"></div></div></div>',
    "</div>",
  ].join("");
  const l = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><div class="cssload-float-bars-container"><ul class="cssload-float-bars-flex-container"><li><span class="cssload-float-bars-loading"></span></li></div></div></div>',
    "</div>",
  ].join("");
  const d = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><div class="cssload-speeding-wheel-container"><div class="cssload-speeding-wheel"></div></div></div>',
    "</div>",
  ].join("");
  const c = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><div class="cssload-zenith-container"><div class="cssload-zenith"></div></div></div>',
    "</div>",
  ].join("");
  const p = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><div class="cssload-spinning-square-loading"></div></div>',
    "</div>",
  ].join("");
  const h = [
    '<div class="loading-overlay">',
    '<div class="bounce-loader"><div class="wrapper-pulse"><div class="cssload-pulse-loader"></div></div></div>',
    "</div>",
  ].join("");
  const u = function (e, t, s) {
    return this.initialize(e, t, s);
  };
  u.prototype = {
    options: {
      css: {},
      hideDelay: 500,
      progressMinTimeout: 0,
      effect: "default",
    },
    initialize(e, t, s) {
      this.$wrapper = e;
      this.setVars().setOptions(t, s).build().events().dynamicShowHideEvents();
      this.$wrapper.data("loadingOverlay", this);
    },
    setVars() {
      this.$overlay = this.$wrapper.find(".loading-overlay");
      this.pageStatus = null;
      this.progress = null;
      this.animationInterval = 33;
      return this;
    },
    setOptions(e, t) {
      if (!this.$overlay.get(0)) {
        this.matchProperties();
      }
      if (t) {
        this.options = a.extend(true, {}, this.options, e);
      } else {
        this.options = a.extend(
          true,
          {},
          this.options,
          e,
          s.fn.getOptions(this.$wrapper.data("plugin-options")),
        );
      }
      this.loaderClass = this.getLoaderClass(this.options.css.backgroundColor);
      return this;
    },
    build() {
      const e = this;
      if (!this.$overlay.closest(document.documentElement).get(0)) {
        if (!this.$cachedOverlay) {
          switch (e.options.effect) {
            case "percentageProgress1":
              this.$overlay = a(i).clone();
              break;
            case "percentageProgress2":
              this.$overlay = a(i).clone();
              this.$overlay
                .addClass("loading-overlay-percentage-effect-2")
                .prepend(
                  '<div class="loading-overlay-background-layer"></div>',
                );
              break;
            case "cubes":
              this.$overlay = a(o).clone();
              break;
            case "cubeProgress":
              this.$overlay = a(n).clone();
              break;
            case "floatRings":
              this.$overlay = a(r).clone();
              break;
            case "floatBars":
              this.$overlay = a(l).clone();
              break;
            case "speedingWheel":
              this.$overlay = a(d).clone();
              break;
            case "zenith":
              this.$overlay = a(c).clone();
              break;
            case "spinningSquare":
              this.$overlay = a(p).clone();
              break;
            case "pulse":
              this.$overlay = a(h).clone();
              break;
            case "default":
            default:
              this.$overlay = a(t).clone();
              break;
          }
          if (this.options.css) {
            this.$overlay.css(this.options.css);
            this.$overlay.find(".loader").addClass(this.loaderClass);
          }
        } else {
          this.$overlay = this.$cachedOverlay.clone();
        }
        this.$wrapper.prepend(this.$overlay);
      }
      if (!this.$cachedOverlay) {
        this.$cachedOverlay = this.$overlay.clone();
      }
      if (
        ["percentageProgress1", "percentageProgress2"].includes(
          e.options.effect,
        )
      ) {
        e.updateProgress();
        if (e.options.isDynamicHideShow) {
          setTimeout(() => {
            e.progress = "complete";
            a(".page-loader-progress").text(100);
            if (["percentageProgress2"].includes(e.options.effect)) {
              a(".loading-overlay-background-layer").css({ width: "100%" });
            }
          }, 2800);
        }
      }
      return this;
    },
    events() {
      const t = this;
      if (this.options.startShowing) {
        t.show();
      }
      if (this.$wrapper.is("body") || this.options.hideOnWindowLoad) {
        a(window).on("load error", () => {
          setTimeout(() => {
            t.hide();
          }, t.options.progressMinTimeout);
        });
      }
      if (this.options.listenOn) {
        a(this.options.listenOn)
          .on("loading-overlay:show beforeSend.ic", (e) => {
            e.stopPropagation();
            t.show();
          })
          .on("loading-overlay:hide complete.ic", (e) => {
            e.stopPropagation();
            t.hide();
          });
      }
      this.$wrapper
        .on("loading-overlay:show beforeSend.ic", (e) => {
          if (e.target === t.$wrapper.get(0)) {
            e.stopPropagation();
            t.show();
            return true;
          }
          return false;
        })
        .on("loading-overlay:hide complete.ic", (e) => {
          if (e.target === t.$wrapper.get(0)) {
            e.stopPropagation();
            t.hide();
            return true;
          }
          return false;
        });
      if (
        ["percentageProgress1", "percentageProgress2"].includes(
          t.options.effect,
        )
      ) {
        a(window).on("load", () => {
          setTimeout(() => {
            t.pageStatus = "complete";
            a(".page-loader-progress").text(100);
            if (["percentageProgress2"].includes(t.options.effect)) {
              a(".loading-overlay-background-layer").css({ width: "100%" });
            }
          }, t.options.progressMinTimeout);
        });
      }
      return this;
    },
    show() {
      this.build();
      this.position = this.$wrapper.css("position").toLowerCase();
      if (
        this.position != "relative" ||
        this.position != "absolute" ||
        this.position != "fixed"
      ) {
        this.$wrapper.css({ position: "relative" });
      }
      this.$wrapper.addClass("loading-overlay-showing");
    },
    hide() {
      const e = this;
      setTimeout(function () {
        e.$wrapper.removeClass("loading-overlay-showing");
        if (
          this.position != "relative" ||
          this.position != "absolute" ||
          this.position != "fixed"
        ) {
          e.$wrapper.css({ position: "" });
        }
        a(window).trigger("loading.overlay.ready");
      }, e.options.hideDelay);
    },
    updateProgress() {
      const e = this;
      const t = () => {
        if (e.pageStatus == "complete") {
          a(".page-loader-progress").text(100);
          setTimeout(() => {
            a(".page-loader-progress").addClass("d-none");
          }, 700);
        } else {
          if (e.progress == null) {
            e.progress = 1;
          }
          e.progress = e.progress + 1;
          if (e.progress >= 0 && e.progress <= 30) {
            e.animationInterval += 1;
            a(".page-loader-progress").text(e.progress);
          } else if (e.progress > 30 && e.progress <= 60) {
            e.animationInterval += 2;
            a(".page-loader-progress").text(e.progress);
          } else if (e.progress > 60 && e.progress <= 80) {
            e.animationInterval += 40;
            a(".page-loader-progress").text(e.progress);
          } else if (e.progress > 80 && e.progress <= 90) {
            e.animationInterval += 80;
            a(".page-loader-progress").text(e.progress);
          } else if (e.progress > 90 && e.progress <= 95) {
            e.animationInterval += 150;
            a(".page-loader-progress").text(e.progress);
          } else if (e.progress > 95 && e.progress <= 99) {
            e.animationInterval += 400;
            a(".page-loader-progress").text(e.progress);
          } else if (e.progress >= 100) {
            a(".page-loader-progress").text(99);
          }
          if (["percentageProgress2"].includes(e.options.effect)) {
            a(".loading-overlay-background-layer").css({
              width: e.progress + "%",
            });
          }
          self.loopInside = setTimeout(t, e.animationInterval);
        }
      };
      t();
      return this;
    },
    matchProperties() {
      let e, t, s;
      s = ["backgroundColor", "borderRadius"];
      t = s.length;
      for (e = 0; e < t; e++) {
        const i = {};
        i[s[e]] = this.$wrapper.css(s[e]);
        a.extend(this.options.css, i);
      }
    },
    getLoaderClass(e) {
      if (!e || e === "transparent" || e === "inherit") {
        return "black";
      }
      let t, s, i, o, a;
      const n = (e) => {
        let t, s;
        if (e.includes("#")) {
          t = e.replace("#", "");
        } else {
          s = e.match(/\d+/g);
          t =
            ("0" + parseInt(s[0], 10).toString(16)).slice(-2) +
            ("0" + parseInt(s[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(s[2], 10).toString(16)).slice(-2);
        }
        if (t.length === 3) {
          t = t + t;
        }
        return t;
      };
      t = n(e);
      s = parseInt(t.substr(0, 2), 16);
      i = parseInt(t.substr(2, 2), 16);
      o = parseInt(t.substr(4, 2), 16);
      a = (s * 299 + i * 587 + o * 114) / 1e3;
      return a >= 128 ? "black" : "white";
    },
    dynamicShowHide(e) {
      const t = this;
      a("body").removeData("loadingOverlay");
      a(".loading-overlay").remove();
      if (e == "") {
        return this;
      }
      a("body").loadingOverlay(
        { effect: e ? e : "pulse", isDynamicHideShow: true },
        true,
      );
      a("body").data("loadingOverlay").show();
      setTimeout(() => {
        a("body").data("loadingOverlay").hide();
      }, 3e3);
      return this;
    },
    dynamicShowHideEvents() {
      const t = this;
      a(document)
        .off("click.loading-overlay-button")
        .on(
          "click.loading-overlay-button",
          ".loading-overlay-button",
          function (e) {
            e.preventDefault();
            t.dynamicShowHide(a(this).data("effect"));
          },
        );
      a(document)
        .off("change.loading-overlay-select")
        .on(
          "change.loading-overlay-select",
          ".loading-overlay-select",
          function () {
            t.dynamicShowHide(a(this).val());
          },
        );
      return this;
    },
  };
  a.extend(s, { LoadingOverlay: u });
  a.fn.loadingOverlay = function (i, o) {
    return this.each(function () {
      const e = a(this);
      const t = e.data("loadingOverlay");
      if (t) {
        return t;
      } else {
        const s = i || e.data("loading-overlay-options") || {};
        return new u(e, s, o);
      }
    });
  };
  a("[data-loading-overlay]").loadingOverlay();
}).apply(this, [window.theme, jQuery]);
((e = {}, i) => {
  const s = "__masonry";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = i.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!i.isFunction(i.fn.isotope)) {
        return this;
      }
      const s = this,
        e = i(window);
      s.$loader = false;
      if (s.options.wrapper.parents(".masonry-loader").get(0)) {
        s.$loader = s.options.wrapper.parents(".masonry-loader");
        s.createLoader();
      }
      s.options.wrapper.one("layoutComplete", (e, t) => {
        s.removeLoader();
      });
      s.options.wrapper.waitForImages(() => {
        s.options.wrapper.isotope(s.options);
      });
      i(window).on("resize", () => {
        setTimeout(() => {
          s.options.wrapper.isotope("layout");
        }, 300);
      });
      setTimeout(() => {
        s.removeLoader();
      }, 3e3);
      return this;
    }
    createLoader() {
      const e = this;
      const t = [
        '<div class="bounce-loader">',
        '<div class="bounce1"></div>',
        '<div class="bounce2"></div>',
        '<div class="bounce3"></div>',
        "</div>",
      ].join("");
      e.$loader.append(t);
      return this;
    }
    removeLoader() {
      const e = this;
      if (e.$loader) {
        e.$loader.removeClass("masonry-loader-showing");
        setTimeout(() => {
          e.$loader.addClass("masonry-loader-loaded");
        }, 300);
      }
    }
  }
  o.defaults = {};
  i.extend(e, { PluginMasonry: o });
  i.fn.themePluginMasonry = function (t) {
    return this.map(function () {
      const e = i(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__matchHeight";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!s.isFunction(s.fn.matchHeight)) {
        return this;
      }
      const e = this;
      e.options.wrapper.matchHeight(e.options);
      return this;
    }
  }
  o.defaults = { byRow: true, property: "height", target: null, remove: false };
  s.extend(e, { PluginMatchHeight: o });
  s.fn.themePluginMatchHeight = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, u) => {
  const s = "__parallax";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = u.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const r = this;
      const a = u(window);
      let e;
      let n;
      let l;
      let d;
      let c;
      if (r.options.mouseParallax) {
        a.mousemove(({ clientX: i, clientY: o }) => {
          u(".parallax-mouse-object", r.options.wrapper).each(function () {
            const e = u(this).attr("data-value");
            const t = (i * e) / 250;
            const s = (o * e) / 250;
            u(this).css(
              "transform",
              "translateX(" + t + "px) translateY(" + s + "px)",
            );
          });
        });
        return this;
      }
      if (
        r.options.scrollableParallax &&
        u(window).width() > r.options.scrollableParallaxMinWidth
      ) {
        const p = r.options.wrapper.find(".scrollable-parallax-wrapper");
        if (p.get(0)) {
          let n =
            u(window).scrollTop() >
            r.options.wrapper.offset().top + u(window).outerHeight()
              ? r.options.cssValueEnd
              : r.options.cssValueStart;
          const h = r.options.cssValueUnit ? r.options.cssValueUnit : "";
          p.css({
            "background-image":
              "url(" + r.options.wrapper.data("image-src") + ")",
            "background-size": "cover",
            "background-position": "center",
            "background-attachment": "fixed",
            transition:
              "ease " +
              r.options.cssProperty +
              " " +
              r.options.transitionDuration,
            width: n + "%",
          });
          u(window).on("scroll", (e) => {
            if (r.options.wrapper.visible(true)) {
              const e = u(window),
                t = e.scrollTop(),
                s = r.options.wrapper.offset().top,
                i = s - t;
              const o = Math.abs(
                +(i - e.height()) /
                  (r.options.startOffset ? r.options.startOffset : 7),
              );
              if (o <= r.options.cssValueEnd && n <= r.options.cssValueEnd) {
                n = r.options.cssValueStart + o;
              }
              if (n > r.options.cssValueEnd) {
                n = r.options.cssValueEnd;
              }
              if (n < r.options.cssValueStart) {
                n = r.options.cssValueStart;
              }
              const a = {};
              a[r.options.cssProperty] = n + h;
              p.css(a);
            }
          });
        }
        return;
      }
      if (r.options.fadeIn) {
        d = u('<div class="parallax-background fadeIn animated"></div>');
      } else {
        d = u('<div class="parallax-background"></div>');
      }
      d.css({
        "background-image": "url(" + r.options.wrapper.data("image-src") + ")",
        "background-size": "cover",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: r.options.parallaxHeight,
      });
      if (r.options.parallaxScale) {
        d.css({ transition: "transform 500ms ease-out" });
      }
      r.options.wrapper.prepend(d);
      r.options.wrapper.css({ position: "relative", overflow: "hidden" });
      const t = () => {
        a.on("scroll resize", () => {
          e = r.options.wrapper.offset();
          n = -(a.scrollTop() - (e.top - 100)) / (r.options.speed + 2);
          l = n < 0 ? Math.abs(n) : -Math.abs(n);
          c = u('html[dir="rtl"]').get(0) ? " rotateY(180deg)" : "";
          e = r.options.wrapper.offset();
          n = -(a.scrollTop() - (e.top - 100)) / (r.options.speed + 2);
          l = n < 0 ? Math.abs(n) : -Math.abs(n);
          c = u('html[dir="rtl"]').get(0) ? " rotateY(180deg)" : "";
          if (!r.options.parallaxScale) {
            if (r.options.parallaxDirection == "bottom") {
              r.options.offset = 250;
            }
            let e = l - 50 + r.options.offset;
            if (r.options.parallaxDirection == "bottom") {
              e = e < 0 ? Math.abs(e) : -Math.abs(e);
            }
            d.css({
              transform: "translate3d(0, " + e + "px, 0)" + c,
              "background-position-x": r.options.horizontalPosition,
            });
          } else {
            const t = a.scrollTop();
            const s = r.options.wrapper.offset().top;
            const i = s - t;
            let e = Math.abs(
              +(i - a.height()) /
                (r.options.startOffset ? r.options.startOffset : 7),
            );
            e = parseInt(e >= 100 ? 100 : e);
            const o = (e / 100) * 50;
            if (!r.options.parallaxScaleInvert) {
              d.css({
                transform:
                  "scale(1." +
                  String(o).padStart(2, "0") +
                  ", 1." +
                  String(o).padStart(2, "0") +
                  ")",
              });
            } else {
              d.css({
                transform:
                  "scale(1." +
                  String(50 - o).padStart(2, "0") +
                  ", 1." +
                  String(50 - o).padStart(2, "0") +
                  ")",
              });
            }
          }
        });
        a.trigger("scroll");
      };
      if (!u.browser.mobile) {
        t();
      } else {
        if (r.options.enableOnMobile == true) {
          t();
        } else {
          r.options.wrapper.addClass("parallax-disabled");
        }
      }
      return this;
    }
  }
  i.defaults = {
    speed: 1.5,
    horizontalPosition: "50%",
    offset: 0,
    parallaxDirection: "top",
    parallaxHeight: "180%",
    parallaxScale: false,
    parallaxScaleInvert: false,
    scrollableParallax: false,
    scrollableParallaxMinWidth: 991,
    startOffset: 7,
    transitionDuration: "200ms",
    cssProperty: "width",
    cssValueStart: 40,
    cssValueEnd: 100,
    cssValueUnit: "vw",
    mouseParallax: false,
    enableOnMobile: true,
  };
  u.extend(e, { PluginParallax: i });
  u.fn.themePluginParallax = function (t) {
    return this.map(function () {
      const e = u(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__progressBar";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      const t = this.options.wrapper;
      let s = 1;
      s = t.attr("data-appear-animation-delay")
        ? t.attr("data-appear-animation-delay")
        : e.options.delay;
      t.addClass(t.attr("data-appear-animation"));
      setTimeout(() => {
        t.animate(
          { width: t.attr("data-appear-progress-animation") },
          1500,
          "easeOutQuad",
          () => {
            t.find(".progress-bar-tooltip").animate(
              { opacity: 1 },
              500,
              "easeOutQuad",
            );
          },
        );
      }, s);
      return this;
    }
  }
  o.defaults = { accX: 0, accY: -50, delay: 1 };
  s.extend(e, { PluginProgressBar: o });
  s.fn.themePluginProgressBar = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, n) => {
  const s = "__randomimages";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      this.$el = e;
      this.st = "";
      this.times = 0;
      this.perImageIndex = 0;
      if (e.is("img") && typeof t.imagesListURL == "undefined") {
        return false;
      }
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = n.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      if (n(window).width() < e.options.minWindowWidth) {
        return false;
      }
      if (e.$el.is("img")) {
        e.isInsideLightbox = e.$el.closest(".lightbox").length ? true : false;
        if (e.isInsideLightbox && e.options.lightboxImagesListURL) {
          e.options.lightboxImagesListURL.push(
            e.$el.closest(".lightbox").attr("href"),
          );
        }
        e.options.imagesListURL.push(e.$el.attr("src"));
        e.lastIndex = e.options.imagesListURL.length - 1;
        if (e.options.random == false) {
          n(".plugin-random-images").each(function (e) {
            if (e == n(".plugin-random-images").length - 1) {
              n(this).addClass("the-last");
            }
          });
        }
        setTimeout(
          () => {
            e.recursiveTimeout(
              e.perImageTag,
              e.options.delay == null ? 3e3 : e.options.delay,
            );
          },
          e.options.delay == null ? 300 : e.options.delay / 3,
        );
      } else {
        setTimeout(
          e.recursiveTimeout(
            e.perWrapper,
            e.options.delay ? e.options.delay : getPerWrapperHighDelay(),
            false,
          ),
          300,
        );
      }
      if (e.options.stopAfterFewSeconds) {
        setTimeout(() => {
          clearTimeout(e.st);
        }, e.options.stopAfterFewSeconds);
      }
      return this;
    }
    perImageTag() {
      const e = this;
      let t = e.options.random
        ? Math.floor(Math.random() * e.options.imagesListURL.length)
        : e.lastIndex;
      if (e.lastIndex !== "" && e.lastIndex == t) {
        if (e.options.random) {
          while (t == e.lastIndex) {
            t = Math.floor(Math.random() * e.options.imagesListURL.length);
          }
        } else {
          t = t - 1;
          if (t == -1) {
            t = e.options.imagesListURL.length - 1;
          }
        }
      }
      e.$el.addClass("animated");
      e.$el.removeClass(e.options.animateIn).addClass(e.options.animateOut);
      setTimeout(() => {
        e.$el
          .attr("src", e.options.imagesListURL[t])
          .removeClass(e.options.animateOut)
          .addClass(e.options.animateIn);
        if (e.isInsideLightbox && e.options.lightboxImagesListURL) {
          e.$el
            .closest(".lightbox")
            .attr("href", e.options.lightboxImagesListURL[t]);
        }
      }, 1e3);
      e.lastIndex = t;
      e.times++;
      e.perImageIndex = t;
      return this;
    }
    getPerWrapperHighDelay() {
      const e = this;
      const t = e.$el;
      let s = 0;
      t.find("img").each(function () {
        const e = n(this);
        if (e.data("rimage-delay") && parseInt(e.data("rimage-delay")) > s) {
          s = parseInt(e.data("rimage-delay"));
        }
      });
      return s;
    }
    perWrapper() {
      const a = this,
        e = a.$el;
      a.options.imagesListURL = [];
      e.find("img").each(function () {
        const e = n(this);
        a.options.imagesListURL.push(e.attr("src"));
      });
      a.options.imagesListURL = a.shuffle(a.options.imagesListURL);
      e.find("img").each(function (e) {
        const t = n(this),
          s = t.data("rimage-animate-in")
            ? t.data("rimage-animate-in")
            : a.options.animateIn,
          i = t.data("rimage-animate-out")
            ? t.data("rimage-animate-out")
            : a.options.animateOut,
          o = t.data("rimage-delay") ? t.data("rimage-delay") : 2e3;
        t.addClass("animated");
        setTimeout(() => {
          t.removeClass(s).addClass(i);
        }, o / 2);
        setTimeout(() => {
          t.attr("src", a.options.imagesListURL[e]).removeClass(i).addClass(s);
        }, o);
      });
      a.times++;
      return this;
    }
    recursiveTimeout(e, t) {
      const s = this;
      const i = () => {
        if (e !== null) {
          e.call(s);
        }
        s.st = setTimeout(i, t == null ? 1e3 : t);
        if (s.options.random == false) {
          if (s.$el.hasClass("the-last")) {
            n(".plugin-random-images").trigger("rimages.start");
          } else {
            clearTimeout(s.st);
          }
        }
        if (
          s.options.stopAtImageIndex &&
          parseInt(s.options.stopAtImageIndex) == s.perImageIndex
        ) {
          clearTimeout(s.st);
        }
        if (s.options.stopAfterXTimes == s.times) {
          clearTimeout(s.st);
        }
      };
      i();
      s.$el.on("rimages.start", () => {
        clearTimeout(s.st);
        s.st = setTimeout(i, t == null ? 1e3 : t);
      });
    }
    shuffle(t) {
      for (let e = t.length - 1; e > 0; e--) {
        const s = Math.floor(Math.random() * (e + 1));
        const i = t[e];
        t[e] = t[s];
        t[s] = i;
      }
      return t;
    }
  }
  i.defaults = {
    minWindowWidth: 0,
    random: true,
    imagesListURL: null,
    lightboxImagesListURL: null,
    delay: null,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    stopAtImageIndex: false,
    stopAfterFewSeconds: false,
    stopAfterXTimes: false,
    accY: 0,
  };
  n.extend(e, { PluginRandomImages: i });
  n.fn.themePluginRandomImages = function (t) {
    return this.map(function () {
      const e = n(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, i) => {
  const s = "__readmore";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      const s = this;
      this.$el = e;
      this.setData().setOptions(t).build().events();
      if (s.options.startOpened) {
        s.options.wrapper.find(".readmore-button-wrapper > a").trigger("click");
      }
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = i.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      e.options.wrapper.addClass("position-relative");
      e.options.wrapper.append('<div class="readmore-overlay"></div>');
      let t =
        "linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, " +
        e.options.overlayColor +
        " 100%)";
      if (i("html").hasClass("safari")) {
        t =
          "-webkit-linear-gradient(top, rgba(2, 0, 36, 0) 0%, " +
          e.options.overlayColor +
          " 100%)";
      }
      e.options.wrapper
        .find(".readmore-overlay")
        .css({
          background: t,
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: e.options.overlayHeight,
          "z-index": 1,
        });
      e.options.wrapper
        .find(".readmore-button-wrapper")
        .removeClass("d-none")
        .css({
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          "z-index": 2,
        });
      e.options.wrapper
        .find(".readmore-button-wrapper > a")
        .html(e.options.buttonOpenLabel);
      e.options.wrapper.css({
        height: e.options.maxHeight,
        "overflow-y": "hidden",
      });
      switch (e.options.align) {
        case "center":
          e.options.wrapper
            .find(".readmore-button-wrapper")
            .addClass("text-center");
          break;
        case "end":
          e.options.wrapper
            .find(".readmore-button-wrapper")
            .addClass("text-end");
          break;
        case "start":
        default:
          e.options.wrapper
            .find(".readmore-button-wrapper")
            .addClass("text-start");
          break;
      }
      return this;
    }
    events() {
      const s = this;
      s.readMore = () => {
        s.options.wrapper
          .find(".readmore-button-wrapper > a:not(.readless)")
          .on("click", function (e) {
            e.preventDefault();
            const t = i(this);
            setTimeout(() => {
              s.options.wrapper.animate(
                { height: s.options.wrapper[0].scrollHeight },
                () => {
                  if (!s.options.enableToggle) {
                    t.fadeOut();
                  }
                  t.html(s.options.buttonCloseLabel)
                    .addClass("readless")
                    .off("click");
                  s.readLess();
                  s.options.wrapper.find(".readmore-overlay").fadeOut();
                  s.options.wrapper.css({
                    "max-height": "none",
                    overflow: "visible",
                  });
                  s.options.wrapper
                    .find(".readmore-button-wrapper")
                    .animate({ bottom: -20 });
                },
              );
            }, 200);
          });
      };
      s.readLess = () => {
        s.options.wrapper
          .find(".readmore-button-wrapper > a.readless")
          .on("click", function (e) {
            e.preventDefault();
            const t = i(this);
            s.options.wrapper
              .find(".readmore-button-wrapper")
              .animate({ bottom: 0 });
            s.options.wrapper.find(".readmore-overlay").fadeIn();
            setTimeout(() => {
              s.options.wrapper
                .height(s.options.wrapper[0].scrollHeight)
                .animate({ height: s.options.maxHeight }, () => {
                  t.html(s.options.buttonOpenLabel)
                    .removeClass("readless")
                    .off("click");
                  s.readMore();
                  s.options.wrapper.css({ overflow: "hidden" });
                });
            }, 200);
          });
      };
      s.readMore();
      return this;
    }
  }
  o.defaults = {
    buttonOpenLabel:
      'Read More <i class="fas fa-chevron-down text-2 ms-1"></i>',
    buttonCloseLabel: 'Read Less <i class="fas fa-chevron-up text-2 ms-1"></i>',
    enableToggle: true,
    maxHeight: 110,
    overlayColor: "#FFF",
    overlayHeight: 100,
    startOpened: false,
    align: "left",
  };
  i.extend(e, { PluginReadMore: o });
  i.fn.themePluginReadMore = function (t) {
    return this.map(function () {
      const e = i(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__revolution";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build().events();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!s.isFunction(s.fn.revolution)) {
        return this;
      }
      if (this.options.wrapper.find("> ul > li").length == 1) {
        this.options.wrapper.addClass("slider-single-slide");
        s.extend(this.options.navigation, { bullets: { enable: false } });
      }
      if (this.options.sliderLayout == "fullscreen") {
        this.options.wrapper
          .closest(".slider-container")
          .addClass("fullscreen-slider");
      }
      this.options.wrapper.revolution(this.options);
      if (this.options.addOnTypewriter.enable) {
        RsTypewriterAddOn(s, this.options.wrapper);
      }
      if (this.options.addOnWhiteboard.enable) {
        this.options.wrapper.rsWhiteBoard();
      }
      if (this.options.addOnParticles.enable) {
        RsParticlesAddOn(this.options.wrapper);
      }
      if (this.options.addOnCountdown.enable) {
        tp_countdown(
          this.options.wrapper,
          this.options.addOnCountdown.targetdate,
          this.options.addOnCountdown.slidechanges,
        );
      }
      if (this.options.addOnSlicey.enable) {
        this.options.wrapper.revSliderSlicey();
      }
      if (this.options.addOnFilmstrip.enable) {
        RsFilmstripAddOn(
          s,
          this.options.wrapper,
          "../vendor/rs-plugin/revolution-addons/filmstrip/",
          false,
        );
      }
      if (this.options.addOnBeforeAfter.enable) {
        RevSliderBeforeAfter(
          s,
          this.options.wrapper,
          this.options.addOnBeforeAfter.options,
        );
      }
      if (this.options.addOnPanorama.enable) {
        RsAddonPanorama(s, this.options.wrapper);
      }
      if (this.options.addOnRevealer.enable) {
        RsRevealerAddOn(
          s,
          this.options.wrapper,
          this.options.revealer.spinnerHtml,
        );
      }
      if (this.options.addOnDuotone.enable) {
        RsAddonDuotone(
          s,
          this.options.wrapper,
          true,
          "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
          "1000",
        );
      }
      if (this.options.addOnBubblemorph.enable) {
        BubbleMorphAddOn(s, this.options.wrapper, false);
      }
      if (this.options.addOnDistortion.enable) {
        RsLiquideffectAddOn(s, this.options.wrapper);
      }
      return this;
    }
    events() {
      return this;
    }
  }
  o.defaults = {
    sliderType: "standard",
    sliderLayout: "fullwidth",
    delay: 9e3,
    gridwidth: 1170,
    gridheight: 500,
    spinner: "spinner3",
    disableProgressBar: "on",
    parallax: { type: "off", bgparallax: "off" },
    navigation: {
      keyboardNavigation: "off",
      keyboard_direction: "horizontal",
      mouseScrollNavigation: "off",
      onHoverStop: "off",
      touch: {
        touchenabled: "on",
        swipe_threshold: 75,
        swipe_min_touches: 1,
        swipe_direction: "horizontal",
        drag_block_vertical: false,
      },
      arrows: {
        enable: true,
        hide_onmobile: false,
        hide_under: 0,
        hide_onleave: true,
        hide_delay: 200,
        hide_delay_mobile: 1200,
        left: { h_align: "left", v_align: "center", h_offset: 30, v_offset: 0 },
        right: {
          h_align: "right",
          v_align: "center",
          h_offset: 30,
          v_offset: 0,
        },
      },
    },
    addOnTypewriter: { enable: false },
    addOnWhiteboard: { enable: false },
    whiteboard: {
      movehand: {
        src: "../vendor/rs-plugin/revolution-addons/whiteboard/assets/images/hand_point_right.png",
        width: 400,
        height: 1e3,
        handtype: "right",
        transform: { transformX: 50, transformY: 50 },
        jittering: {
          distance: "80",
          distance_horizontal: "100",
          repeat: "5",
          offset: "10",
          offset_horizontal: "0",
        },
        rotation: { angle: "10", repeat: "3" },
      },
      writehand: {
        src: "../vendor/rs-plugin/revolution-addons/whiteboard/assets/images/write_right_angle.png",
        width: 572,
        height: 691,
        handtype: "right",
        transform: { transformX: 50, transformY: 50 },
        jittering: {
          distance: "80",
          distance_horizontal: "100",
          repeat: "5",
          offset: "10",
          offset_horizontal: "0",
        },
        rotation: { angle: "10", repeat: "3" },
      },
    },
    addOnParticles: { enable: false },
    particles: {
      startSlide: "first",
      endSlide: "last",
      zIndex: "1",
      particles: {
        number: { value: 80 },
        color: { value: "#ffffff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#ffffff", opacity: 1 },
          image: { src: "" },
        },
        opacity: {
          value: 0.5,
          random: true,
          min: 0.25,
          anim: { enable: false, speed: 3, opacity_min: 0, sync: false },
        },
        size: {
          value: 2,
          random: false,
          min: 30,
          anim: { enable: false, speed: 40, size_min: 1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: true,
          min_speed: 6,
          straight: false,
          out_mode: "out",
        },
      },
      interactivity: {
        events: {
          onhover: { enable: false, mode: "repulse" },
          onclick: { enable: false, mode: "repulse" },
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 0.5 } },
          bubble: { distance: 400, size: 40, opacity: 0.4 },
          repulse: { distance: 200 },
        },
      },
    },
    addOnCountdown: {
      enable: false,
      targetdate: new Date().getTime() + 864e6,
      slidechanges: [{ days: 0, hours: 0, minutes: 0, seconds: 0, slide: 2 }],
    },
    addOnSlicey: { enable: false },
    addOnFilmstrip: { enable: false },
    addOnBeforeAfter: {
      enable: false,
      options: {
        cursor: "move",
        carousel: false,
        arrowStyles: {
          leftIcon: "fa-icon-caret-left",
          rightIcon: "fa-icon-caret-right",
          topIcon: "fa-icon-caret-up",
          bottomIcon: "fa-icon-caret-down",
          size: "35",
          color: "#ffffff",
          spacing: "10",
          bgColor: "transparent",
          padding: "0",
          borderRadius: "0",
        },
        dividerStyles: { width: "1", color: "rgba(255, 255, 255, 0.5)" },
      },
    },
    addOnPanorama: { enable: false },
    addOnRevealer: { enable: false },
    revealer: {
      direction: "open_horizontal",
      color: "#ffffff",
      duration: "1500",
      delay: "0",
      easing: "Power2.easeInOut",
      overlay_enabled: true,
      overlay_color: "#000000",
      overlay_duration: "1500",
      overlay_delay: "0",
      overlay_easing: "Power2.easeInOut",
      spinner: "1",
      spinnerColor: "#006dd2",
      spinnerHtml:
        "<div class='rsaddon-revealer-spinner rsaddon-revealer-spinner-1'><div class='rsaddon-revealer-1'><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span></div></div />",
    },
    addOnDuotone: { enable: false },
    addOnBubblemorph: { enable: false },
    addOnDistortion: { enable: false },
  };
  s.extend(e, { PluginRevolutionSlider: o });
  s.fn.themePluginRevolutionSlider = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, c) => {
  const s = "__scrollSpy";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (document.querySelector(t.target) == null) {
        return false;
      }
      this.$el = e;
      this.setData().setOptions(t);
      this.build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = c.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this,
        s =
          document.querySelector(e.options.target) != null
            ? document.querySelector(e.options.target)
            : false,
        i =
          s == "#header" || s == ".wrapper-spy"
            ? s.querySelectorAll(".header-nav .nav > li a")
            : s.querySelectorAll(".nav > li a");
      let o = Object.keys(i).map((e, t) => i[e].hash);
      o = o.filter((e) => e != "");
      e.sectionIDs = o;
      for (let t = 0; t < o.length; t++) {
        let e = "-20% 0px -79.9% 0px";
        if (c(o[t]).data("spy-offset")) {
          const r = c(o[t]).data("spy-offset"),
            l = parseInt(r) < 0 ? true : false;
          e = e
            .split(" ")
            .map((t, s) => {
              if (t.indexOf("%") > 0) {
                const i = parseInt(t.replace("%", ""));
                let e = 0;
                switch (s) {
                  case 0:
                    if (l) {
                      e = i - r;
                    } else {
                      e = Math.abs(i) + r;
                    }
                    break;
                  case 2:
                    if (l) {
                      e = i + r;
                    } else {
                      e = Math.abs(i) - r;
                    }
                    break;
                }
                if (l) {
                  e = e + "%";
                } else {
                  e = "-" + e + "%";
                }
                return e;
              } else {
                return t;
              }
            })
            .join(" ");
        }
        const a = o[t],
          n = function () {
            const e = c(this);
            if (s == "#header" || s == ".wrapper-spy") {
              c("#header .header-nav .nav > li a").removeClass("active");
              c(
                '#header .header-nav .nav > li a[href="#' + e[0].id + '"]',
              ).addClass("active");
            } else {
              c(s).find(".nav > li a").removeClass("active");
              c(s)
                .find('.nav > li a[href="#' + e[0].id + '"]')
                .addClass("active");
            }
          };
        this.scrollSpyIntObs(
          a,
          n,
          { rootMargin: e, threshold: 0 },
          true,
          t,
          true,
        );
      }
      return this;
    }
    scrollSpyIntObs(e, o, t, a, n, r) {
      const l = this;
      const s = document.querySelectorAll(e);
      let i = { rootMargin: "0px 0px 200px 0px" };
      if (Object.keys(t).length) {
        i = c.extend(i, t);
      }
      const d = new IntersectionObserver((e) => {
        for (const t of e) {
          if (t.intersectionRatio > 0) {
            if (typeof o === "string") {
              const s = Function("return " + o)();
            } else {
              const i = o;
              i.call(c(t.target));
            }
            if (!a) {
              d.unobserve(t.target);
            }
          } else {
            if (r == false) {
              if (n == l.sectionIDs.length - 1) {
                c("#header .header-nav .nav > li a").removeClass("active");
                c(
                  '#header .header-nav .nav > li a[href="#' +
                    t.target.id +
                    '"]',
                )
                  .parent()
                  .prev()
                  .find("a")
                  .addClass("active");
              }
            }
            r = false;
          }
        }
      }, i);
      c(s).each(function () {
        d.observe(c(this)[0]);
      });
      return this;
    }
  }
  i.defaults = { target: "#header" };
  c.extend(e, { PluginScrollSpy: i });
  c.fn.themePluginScrollSpy = function (t) {
    return this.map(function () {
      const e = c(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  s.extend(e, {
    PluginScrollToTop: {
      defaults: {
        wrapper: s("body"),
        offset: 150,
        buttonClass: "scroll-to-top",
        buttonAriaLabel: "Scroll To Top",
        iconClass: "fas fa-chevron-up",
        delay: 1e3,
        visibleMobile: false,
        label: false,
        easing: "easeOutBack",
      },
      initialize(e) {
        initialized = true;
        if (s("body[data-plugin-section-scroll]").get(0)) {
          return;
        }
        this.setOptions(e).build().events();
        return this;
      },
      setOptions(e) {
        this.options = s.extend(true, {}, this.defaults, e);
        return this;
      },
      build() {
        const e = this;
        let t;
        t = s("<a />")
          .addClass(e.options.buttonClass)
          .attr({ href: "#", "aria-label": e.options.buttonAriaLabel })
          .append(s("<i />").addClass(e.options.iconClass));
        if (!e.options.visibleMobile) {
          t.addClass("hidden-mobile");
        }
        if (e.options.label) {
          t.append(s("<span />").html(e.options.label));
        }
        this.options.wrapper.append(t);
        this.$el = t;
        return this;
      },
      events() {
        const t = this;
        let e = false;
        t.$el.on("click", (e) => {
          e.preventDefault();
          s("html").animate(
            { scrollTop: 0 },
            t.options.delay,
            t.options.easing,
          );
          return false;
        });
        s(window).scroll(() => {
          if (!e) {
            e = true;
            if (s(window).scrollTop() > t.options.offset) {
              t.$el.stop(true, true).addClass("visible");
              e = false;
            } else {
              t.$el.stop(true, true).removeClass("visible");
              e = false;
            }
          }
        });
        return this;
      },
    },
  });
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__scrollable";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    static updateModals() {
      o.updateBootstrapModal();
    }
    static updateBootstrapModal() {
      let e;
      e = typeof s.fn.modal !== "undefined";
      e = e && typeof s.fn.modal.Constructor !== "undefined";
      e = e && typeof s.fn.modal.Constructor.prototype !== "undefined";
      e =
        e &&
        typeof s.fn.modal.Constructor.prototype.enforceFocus !== "undefined";
      if (!e) {
        return false;
      }
      const t = s.fn.modal.Constructor.prototype.enforceFocus;
      s.fn.modal.Constructor.prototype.enforceFocus = function () {
        t.apply(this);
        const e = this.$element.find(".scrollable");
        if (e) {
          if (s.isFunction(s.fn["themePluginScrollable"])) {
            e.themePluginScrollable();
          }
          if (s.isFunction(s.fn["nanoScroller"])) {
            e.nanoScroller();
          }
        }
      };
    }
    initialize(e, t) {
      if (e.data(i)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      this.options.wrapper.nanoScroller(this.options);
      return this;
    }
  }
  o.defaults = {
    contentClass: "scrollable-content",
    paneClass: "scrollable-pane",
    sliderClass: "scrollable-slider",
    alwaysVisible: true,
    preventPageScrolling: true,
  };
  s.extend(e, { PluginScrollable: o });
  s.fn.themePluginScrollable = function (t) {
    return this.each(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
  s(() => {
    o.updateModals();
  });
}).apply(this, [window.theme, jQuery]);
((e = {}, u) => {
  const s = "__sectionScroll";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build().events();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = u.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const r = this,
        e = this.options.wrapper;
      if (u("html").hasClass("side-header-overlay-full-screen")) {
        r.$header = u(".sticky-wrapper");
      } else {
        r.$header = u("#header");
      }
      r.updateSectionsHeight();
      u(this.options.targetClass).wrap('<div class="section-wrapper"></div>');
      u(".section-wrapper").each(function () {
        u(this).height(u(this).find(".section-scroll").outerHeight());
      });
      u(".section-wrapper").first().addClass("active");
      let l = false,
        d = false,
        c = "",
        p = 0,
        h = 0;
      u(window).on("touchstart", ({ changedTouches: e }) => {
        p = e[0].screenY;
      });
      let t =
        "onwheel" in document
          ? "wheel"
          : document.onmousewheel !== undefined
            ? "mousewheel"
            : "DOMMouseScroll";
      if (u(window).width() < 992 && u("html").hasClass("touch")) {
        t =
          "onwheel" in document
            ? "wheel touchend"
            : document.onmousewheel !== undefined
              ? "mousewheel touchend"
              : "DOMMouseScroll touchend";
      }
      if (u(window).width() < 992) {
        u("html").removeClass("overflow-hidden");
        u(window).on("scroll", () => {
          let t = 0;
          u(".section-scroll").each(function () {
            if (u(this).offset().top <= u(window).scrollTop() + 50) {
              const e = u(".section-wrapper").eq(t).find(".section-scroll");
              u(".section-scroll-dots-navigation > ul > li").removeClass(
                "active",
              );
              u(".section-scroll-dots-navigation > ul > li")
                .eq(t)
                .addClass("active");
              u(window).trigger({
                type: "section.scroll.mobile.change.header.color",
                currentSection: e,
              });
            }
            t++;
          });
        });
        u(window).on(
          "section.scroll.mobile.change.header.color",
          ({ currentSection: e }) => {
            if (typeof e == "undefined") {
              return;
            }
            const t = e,
              s = t.data("section-scroll-header-color");
            u("#header .header-nav")
              .removeClass("header-nav-light-text header-nav-dark-text")
              .addClass("header-nav-" + s + "-text");
            u("#header .header-nav-features")
              .removeClass("header-nav-features-dark header-nav-features-light")
              .addClass("header-nav-features-" + s);
            u("#header .header-social-icons")
              .removeClass("social-icons-icon-dark social-icons-icon-light")
              .addClass("social-icons-icon-" + s);
            if (r.options.changeHeaderLogo && s != undefined) {
              if (s == "light") {
                u("#header .header-logo img").attr(
                  "src",
                  r.options.headerLogoLight,
                );
              } else if (s == "dark") {
                u("#header .header-logo img").attr(
                  "src",
                  r.options.headerLogoDark,
                );
              }
            }
            r.$header.css({ opacity: 1 });
          },
        );
      }
      u(window).on(t, ({ target: e, originalEvent: t }) => {
        if (u(window).width() < 992) {
          return;
        }
        if (u(window).width() < 992 && u("html").hasClass("touch")) {
          if (
            u(e).closest(".section-scroll-dots-navigation").get(0) ||
            u(e).closest(".header-body").get(0) ||
            u(e).closest(".owl-carousel").get(0)
          ) {
            return;
          }
        }
        if (u("html.side-header-overlay-full-screen.side-header-hide").get(0)) {
          return;
        }
        const s = t.wheelDelta == undefined ? t.deltaY > 0 : t.wheelDelta < 0;
        if (u(window).width() < 992 && u("html").hasClass("touch")) {
          h = event.changedTouches[0].screenY;
          if (h <= p) {
            c = "up";
          }
          if (h >= p) {
            c = "down";
          }
          if (h == p) {
            return;
          }
        }
        const i = u(".section-wrapper")
          .eq(r.getCurrentIndex())
          .find(".section-scroll");
        const o = r.getNextSection(s, c);
        let a;
        if (r.getCurrentIndex() == u(".section-wrapper").length - 1) {
          a = u(document).height();
        } else {
          a = o.offset().top;
        }
        if (u(window).width() < 992 && u("html").hasClass("touch")) {
          setTimeout(() => {
            if (
              u(".section-wrapper")
                .eq(r.getCurrentIndex())
                .find(".section-scroll")
                .hasClass("section-scroll-scrollable")
            ) {
              u("html").removeClass("overflow-hidden");
            } else {
              u("html").addClass("overflow-hidden");
            }
          }, 1200);
        }
        if (i.hasClass("section-scroll-scrollable")) {
          if (!l && !d) {
            if (s || c == "up") {
              if (u(window).scrollTop() + u(window).height() >= a) {
                l = true;
                setTimeout(() => {
                  u(window).trigger("section.scroll.change.header.color");
                  setTimeout(() => {
                    l = false;
                  }, 500);
                }, 1e3);
                if (r.getCurrentIndex() == u(".section-wrapper").length - 1) {
                  return false;
                }
                r.moveTo(i.offset().top + i.outerHeight());
                r.changeSectionActiveState(o);
                r.$header.css({ opacity: 0, transition: "ease opacity 500ms" });
              }
              if (!u("html").hasClass("touch")) {
                for (var n = 1; n < 100; n++) {
                  u("body, html").scrollTop(u(window).scrollTop() + 1);
                  if (u(window).scrollTop() + u(window).height() >= a) {
                    d = true;
                    setTimeout(() => {
                      u(window).trigger("section.scroll.change.header.color");
                      d = false;
                    }, 500);
                    break;
                  }
                }
              }
            } else {
              if (u(window).scrollTop() <= i.offset().top) {
                l = true;
                setTimeout(() => {
                  u(window).trigger("section.scroll.change.header.color");
                  setTimeout(() => {
                    l = false;
                  }, 500);
                }, 1e3);
                if (r.getCurrentIndex() == 0) {
                  return false;
                }
                r.moveTo(i.offset().top - u(window).height());
                r.changeSectionActiveState(o);
                r.$header.css({ opacity: 0, transition: "ease opacity 500ms" });
              }
              if (!u("html").hasClass("touch")) {
                for (var n = 1; n < 100; n++) {
                  u("body, html").scrollTop(u(window).scrollTop() - 1);
                  if (u(window).scrollTop() <= i.offset().top) {
                    d = true;
                    setTimeout(() => {
                      u(window).trigger("section.scroll.change.header.color");
                      d = false;
                    }, 500);
                    break;
                  }
                }
              }
            }
            r.changeDotsActiveState();
            return;
          }
        }
        if (!l && !d) {
          if (s || c == "up") {
            if (r.getCurrentIndex() == u(".section-wrapper").length - 1) {
              return false;
            }
            r.changeSectionActiveState(o);
            setTimeout(() => {
              r.moveTo(o.offset().top);
            }, 150);
          } else {
            if (r.getCurrentIndex() == 0) {
              return false;
            }
            r.changeSectionActiveState(o);
            if (o.height() > u(window).height()) {
              r.moveTo(i.offset().top - u(window).height());
            } else {
              setTimeout(() => {
                r.moveTo(o.offset().top);
              }, 150);
            }
          }
          r.changeDotsActiveState();
          r.$header.css({ opacity: 0, transition: "ease opacity 500ms" });
          o.css({
            position: "relative",
            opacity: 1,
            "z-index": 1,
            transform: "translate3d(0,0,0) scale(1)",
          });
          i.css({
            position: "fixed",
            width: "100%",
            top: 0,
            left: 0,
            opacity: 0,
            "z-index": 0,
            transform: "translate3d(0,0,-10px) scale(0.7)",
            transition: "ease transform 600ms, ease opacity 600ms",
          });
          setTimeout(() => {
            i.css({
              position: "relative",
              opacity: 1,
              transform: "translate3d(0,0,-10px) scale(1)",
            });
            u(window).trigger("section.scroll.change.header.color");
            setTimeout(() => {
              l = false;
            }, 500);
          }, 1e3);
          l = true;
        }
        return;
      });
      if (this.options.dotsNav) {
        r.dotsNavigation();
      }
      setTimeout(() => {
        if (u(window.location.hash).get(0)) {
          r.moveTo(u(window.location.hash).parent().offset().top);
          r.changeSectionActiveState(u(window.location.hash));
          r.changeDotsActiveState();
          r.updateHash(true);
        } else {
          const t = window.location.hash;
          let e = t.replace("#", "");
          if (!t) {
            e = 1;
          }
          r.moveTo(
            u(".section-wrapper")
              .eq(e - 1)
              .offset().top,
          );
          r.changeSectionActiveState(
            u(".section-wrapper")
              .eq(e - 1)
              .find(".section-scroll"),
          );
          r.changeDotsActiveState();
          r.updateHash(true);
        }
        u(window).trigger("section.scroll.ready");
        u(window).trigger("section.scroll.change.header.color");
      }, 500);
      return this;
    }
    updateSectionsHeight() {
      const e = this;
      u(".section-scroll").css({ height: "" });
      u(".section-scroll").each(function () {
        if (u(this).outerHeight() < u(window).height() + 3) {
          u(this).css({ height: "100vh" });
        } else {
          u(this).addClass("section-scroll-scrollable");
        }
      });
      u(".section-wrapper").each(function () {
        u(this).height(u(this).find(".section-scroll").outerHeight());
      });
      return this;
    }
    updateHash(e) {
      const t = this;
      if (!window.location.hash) {
        window.location.hash = 1;
      } else {
        if (!e) {
          const s = u(".section-wrapper")
              .eq(t.getCurrentIndex())
              .find(".section-scroll"),
            i = s.attr("id") ? s.attr("id") : s.parent().index() + 1;
          window.location.hash = i;
        }
      }
      return this;
    }
    getCurrentIndex() {
      const e = this;
      let t = 0;
      t = u(".section-wrapper.active").index();
      return t;
    }
    moveTo(e, t) {
      const s = this;
      u("body, html").animate({ scrollTop: e }, 1e3, "easeOutQuint");
      setTimeout(() => {
        s.updateHash();
      }, 500);
      return this;
    }
    getNextSection(e, t) {
      const s = this;
      let i = "";
      if (e || t == "up") {
        i = u(".section-wrapper")
          .eq(s.getCurrentIndex() + 1)
          .find(".section-scroll");
      } else {
        i = u(".section-wrapper")
          .eq(s.getCurrentIndex() - 1)
          .find(".section-scroll");
      }
      return i;
    }
    changeSectionActiveState(e) {
      const t = this;
      u(".section-wrapper").removeClass("active");
      e.parent().addClass("active");
      return this;
    }
    changeDotsActiveState() {
      const e = this;
      u(".section-scroll-dots-navigation > ul > li").removeClass("active");
      u(".section-scroll-dots-navigation > ul > li")
        .eq(e.getCurrentIndex())
        .addClass("active");
      return this;
    }
    dotsNavigation() {
      const s = this;
      const t = u(
          '<div class="section-scroll-dots-navigation"><ul class="list list-unstyled"></ul></div>',
        ),
        i = s.getCurrentIndex();
      if (s.options.dotsClass) {
        t.addClass(s.options.dotsClass);
      }
      for (let e = 0; e < u(".section-scroll").length; e++) {
        const o = u(".section-wrapper")
          .eq(e)
          .find(".section-scroll")
          .data("section-scroll-title");
        t.find("> ul").append(
          "<li" +
            (i == e ? ' class="active"' : "") +
            '><a href="#' +
            e +
            '" data-nav-id="' +
            e +
            '"><span>' +
            o +
            "</span></a></li>",
        );
      }
      u(".body").append(t);
      t.find("a[data-nav-id]").on("click touchstart", function (e) {
        e.preventDefault();
        const t = u(this);
        u(".section-scroll").css({
          opacity: 0,
          transition: "ease opacity 300ms",
        });
        s.$header.css({ opacity: 0, transition: "ease opacity 500ms" });
        setTimeout(() => {
          s.moveTo(u(".section-wrapper").eq(t.data("nav-id")).offset().top);
          u(".section-wrapper").removeClass("active");
          u(".section-wrapper").eq(t.data("nav-id")).addClass("active");
          u(".section-wrapper")
            .eq(s.getCurrentIndex())
            .find(".section-scroll")
            .css({ opacity: 1 });
          setTimeout(() => {
            u(".section-scroll").css({ opacity: 1 });
            u(window).trigger("section.scroll.change.header.color");
          }, 500);
          if (u(window).width() > 991) {
            s.changeDotsActiveState();
          }
        }, 500);
      });
      return this;
    }
    events() {
      const t = this;
      u(window).on("section.scroll.ready", () => {
        u(window).scrollTop(0);
      });
      u(window).on("section.scroll.change.header.color", () => {
        const e = u(".section-wrapper")
          .eq(t.getCurrentIndex())
          .find(".section-scroll")
          .data("section-scroll-header-color");
        u("#header .header-nav")
          .removeClass("header-nav-light-text header-nav-dark-text")
          .addClass("header-nav-" + e + "-text");
        u("#header .header-nav-features")
          .removeClass("header-nav-features-dark header-nav-features-light")
          .addClass("header-nav-features-" + e);
        u("#header .header-social-icons")
          .removeClass("social-icons-icon-dark social-icons-icon-light")
          .addClass("social-icons-icon-" + e);
        if (t.options.changeHeaderLogo && e != undefined) {
          if (e == "light") {
            u("#header .header-logo img").attr(
              "src",
              t.options.headerLogoLight,
            );
          } else if (e == "dark") {
            u("#header .header-logo img").attr("src", t.options.headerLogoDark);
          }
        }
        t.$header.css({ opacity: 1 });
      });
      u(document).ready(() => {
        u(window).afterResize(() => {
          t.updateSectionsHeight();
          if (u(window).width() < 992) {
            u("html").removeClass("overflow-hidden");
          }
        });
      });
      return this;
    }
  }
  i.defaults = {
    targetClass: ".section",
    dotsNav: true,
    changeHeaderLogo: true,
    headerLogoDark: "img/logo-default-slim.png",
    headerLogoLight: "img/logo-default-slim-dark.png",
  };
  u.extend(e, { PluginSectionScroll: i });
  u.fn.themePluginSectionScroll = function (t) {
    return this.map(function () {
      const e = u(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, a) => {
  const s = "__sort";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = a.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!a.isFunction(a.fn.isotope)) {
        return this;
      }
      const s = this,
        e = this.options.wrapper,
        t = a(
          '.sort-destination[data-sort-id="' + e.attr("data-sort-id") + '"]',
        ),
        i = a(window);
      if (t.get(0)) {
        s.$source = e;
        s.$destination = t;
        s.$loader = false;
        s.setParagraphHeight(t);
        if (s.$destination.parents(".sort-destination-loader").get(0)) {
          s.$loader = s.$destination.parents(".sort-destination-loader");
          s.createLoader();
        }
        t.attr("data-filter", "*");
        t.one("layoutComplete", (e, t) => {
          s.removeLoader();
          if (a("[data-plugin-sticky]").length) {
            setTimeout(() => {
              a("[data-plugin-sticky]").each(function () {
                a(this).data("__sticky").build();
                a(window).trigger("resize");
              });
            }, 500);
          }
        });
        if (a("#" + s.options.filterFieldId).length) {
          const o = a("#" + s.options.filterFieldId);
          o.keyup(function () {
            s.options.filterFieldText = a(this).val();
            s.setFilter(s.options.filter);
          });
        }
        t.waitForImages(() => {
          t.isotope(s.options);
          s.events();
        });
        setTimeout(() => {
          s.removeLoader();
        }, 3e3);
      }
      return this;
    }
    events() {
      const t = this;
      let s = null;
      const e = a(window);
      t.$source.find("a").click(function (e) {
        e.preventDefault();
        s = a(this).parent().data("option-value");
        t.setFilter(s);
        if (e.originalEvent) {
          t.$source.trigger("filtered");
        }
        return this;
      });
      t.$destination.trigger("filtered");
      t.$source.trigger("filtered");
      if (t.options.useHash) {
        t.hashEvents();
      }
      e.on("resize sort.resize", () => {
        setTimeout(() => {
          t.$destination.isotope("layout");
        }, 300);
      });
      setTimeout(() => {
        e.trigger("sort.resize");
      }, 300);
      return this;
    }
    setFilter(e) {
      const s = this;
      const t = false;
      let i = e;
      s.$source.find(".active").removeClass("active");
      s.$source
        .find(
          'li[data-option-value="' +
            e +
            '"], li[data-option-value="' +
            e +
            '"] > a',
        )
        .addClass("active");
      s.options.filter = i;
      if (s.$destination.attr("data-current-page")) {
        i =
          i +
          "[data-page-rel=" +
          s.$destination.attr("data-current-page") +
          "]";
      }
      if (s.options.filterFieldText != "") {
        i =
          i +
          "[data-sort-search*=" +
          s.options.filterFieldText.toLowerCase() +
          "]";
      }
      s.$destination
        .attr("data-filter", e)
        .isotope({ filter: i })
        .one("arrangeComplete", (e, t) => {
          if (s.options.useHash) {
            if (
              window.location.hash != "" ||
              s.options.filter.replace(".", "") != "*"
            ) {
              window.location.hash = s.options.filter.replace(".", "");
            }
          }
          a(window).trigger("scroll");
        })
        .trigger("filtered");
      return this;
    }
    hashEvents() {
      const t = this;
      let s = null;
      let i = null;
      let e = "." + location.hash.replace("#", "");
      if (a(location.hash).length) {
        e = ".";
      }
      if (e != "." && e != ".*") {
        t.setFilter(e);
      }
      a(window).on("hashchange", (e) => {
        i = "." + location.hash.replace("#", "");
        s = i == "." || i == ".*" ? "*" : i;
        t.setFilter(s);
      });
      return this;
    }
    setParagraphHeight() {
      const e = this;
      let t = 0;
      const s = a("span.thumb-info-caption p", e.$destination);
      s.each(function () {
        if (a(this).height() > t) {
          t = a(this).height() + 10;
        }
      });
      s.height(t);
      return this;
    }
    createLoader() {
      const e = this;
      const t = [
        '<div class="bounce-loader">',
        '<div class="bounce1"></div>',
        '<div class="bounce2"></div>',
        '<div class="bounce3"></div>',
        "</div>",
      ].join("");
      e.$loader.append(t);
      return this;
    }
    removeLoader() {
      const e = this;
      if (e.$loader) {
        e.$loader.removeClass("sort-destination-loader-showing");
        setTimeout(() => {
          e.$loader.addClass("sort-destination-loader-loaded");
        }, 300);
      }
    }
  }
  i.defaults = {
    useHash: true,
    itemSelector: ".isotope-item",
    layoutMode: "masonry",
    filter: "*",
    filterFieldId: false,
    filterFieldText: "",
    hiddenStyle: { opacity: 0 },
    visibleStyle: { opacity: 1 },
    stagger: 30,
    isOriginLeft: a("html").attr("dir") == "rtl" ? false : true,
  };
  a.extend(e, { PluginSort: i });
  a.fn.themePluginSort = function (t) {
    return this.map(function () {
      const e = a(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  const i = "__starrating";
  class o {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(i, this);
      return this;
    }
    setOptions(e) {
      this.options = s.extend(true, {}, o.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!s.isFunction(s.fn.rating)) {
        return this;
      }
      const e = this;
      e.options.wrapper.rating(e.options);
      e.options.wrapper
        .parents(".rating-container")
        .addClass("rating-" + e.options.color);
      if (e.options.extraClass) {
        e.options.wrapper
          .parents(".rating-container")
          .addClass(e.options.extraClass);
      }
      return this;
    }
  }
  o.defaults = {
    theme: "krajee-fas",
    color: "primary",
    showClear: false,
    showCaption: false,
  };
  s.extend(e, { PluginStarRating: o });
  s.fn.themePluginStarRating = function (t) {
    return this.map(function () {
      const e = s(this);
      if (e.data(i)) {
        return e.data(i);
      } else {
        return new o(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, r) => {
  const s = "__sticky";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build().events();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = r.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      if (!r.isFunction(r.fn.pin)) {
        return this;
      }
      const e = this,
        t = r(window);
      e.options.wrapper.pin(e.options);
      if (e.options.wrapper.hasClass("sticky-wrapper-transparent")) {
        e.options.wrapper.parent().addClass("position-absolute w-100");
      }
      t.afterResize(() => {
        e.options.wrapper.removeAttr("style").removeData("pin");
        e.options.wrapper.pin(e.options);
        t.trigger("scroll");
      });
      if (e.options.wrapper.find("img").attr("data-change-src")) {
        const s = e.options.wrapper.find("img"),
          i = s.attr("src"),
          o = s.attr("data-change-src");
        e.changeLogoSrc = (e) => {
          if (e) {
            s.attr("src", o);
          } else {
            s.attr("src", i);
          }
        };
      }
      return this;
    }
    events() {
      const e = this;
      const t = r(window);
      const s = e.options.wrapper.find("img");
      const i = e.options.wrapper.hasClass("sticky-wrapper-effect-1")
        ? "sticky-effect-active"
        : "sticky-active";
      let o = true;
      let a = false;
      t.on("scroll sticky.effect.active", () => {
        if (e.options.wrapper.hasClass(i)) {
          if (o) {
            if (s.attr("data-change-src")) {
              e.changeLogoSrc(true);
            }
            o = false;
            a = true;
          }
        } else {
          if (a) {
            if (s.attr("data-change-src")) {
              e.changeLogoSrc(false);
            }
            a = false;
            o = true;
          }
        }
      });
      let n = false;
      if (e.options.stickyStartEffectAt) {
        if (e.options.stickyStartEffectAt < t.scrollTop()) {
          e.options.wrapper.addClass("sticky-effect-active");
          t.trigger("sticky.effect.active");
        }
        t.on("scroll", () => {
          if (e.options.stickyStartEffectAt < t.scrollTop()) {
            e.options.wrapper.addClass("sticky-effect-active");
            n = true;
            t.trigger("sticky.effect.active");
          } else {
            if (n) {
              e.options.wrapper.find(".sticky-body").addClass("position-fixed");
              n = false;
            }
            if (t.scrollTop() == 0) {
              e.options.wrapper
                .find(".sticky-body")
                .removeClass("position-fixed");
            }
            e.options.wrapper.removeClass("sticky-effect-active");
          }
        });
      }
      if (r('[data-bs-toggle="collapse"]').get(0)) {
        r('[data-bs-toggle="collapse"]').on("click", () => {
          setTimeout(() => {
            e.build();
            r(window).trigger("scroll");
          }, 1e3);
        });
      }
      document.addEventListener("visibilitychange", () => {
        r(window).trigger("resize");
      });
      setInterval(() => {
        r(window).trigger("resize");
      }, 1e3);
    }
  }
  i.defaults = { minWidth: 991, activeClass: "sticky-active" };
  r.extend(e, { PluginSticky: i });
  r.fn.themePluginSticky = function (t) {
    return this.map(function () {
      const e = r(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, c) => {
  const s = "__toggle";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) {
        return this;
      }
      this.$el = e;
      this.setData().setOptions(t).build();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = c.extend(true, {}, i.defaults, e, { wrapper: this.$el });
      return this;
    }
    build() {
      const e = this;
      const t = this.options.wrapper;
      const s = t.find("> .toggle");
      let i = null;
      s.each(function () {
        i = c(this);
        if (i.hasClass("active")) {
          i.find("> p").addClass("preview-active");
          i.find("> .toggle-content").slideDown(e.options.duration);
        }
        e.events(i);
      });
      if (e.options.isAccordion) {
        e.options.duration = e.options.duration / 2;
      }
      return this;
    }
    events(e) {
      const n = this;
      let r = 0;
      let l = 0;
      let d = null;
      e.find("> label, > .toggle-titles").click(function ({ originalEvent: e }) {
        const t = c(this);
        const s = t.parent();
        const i = t.parents(".toggle");
        let o = null;
        let a = null;
        if (n.options.isAccordion && typeof e != "undefined") {
          a = i.find(".toggle.active > label, .toggle.active > .toggle-titles");
          if (a[0] == t[0]) {
            return;
          }
        }
        s.toggleClass("active");
        if (s.find("> p").get(0)) {
          o = s.find("> p");
          r = o.css("height");
          o.css("height", "auto");
          l = o.css("height");
          o.css("height", r);
        }
        d = s.find("> .toggle-content");
        if (s.hasClass("active")) {
          c(o).animate({ height: l }, n.options.duration, function () {
            c(this).addClass("preview-active");
          });
          d.slideDown(n.options.duration, () => {
            if (a) {
              a.trigger("click");
            }
          });
        } else {
          c(o).animate({ height: 0 }, n.options.duration, function () {
            c(this).removeClass("preview-active");
          });
          d.slideUp(n.options.duration);
        }
      });
    }
  }
  i.defaults = { duration: 350, isAccordion: false };
  c.extend(e, { PluginToggle: i });
  c.fn.themePluginToggle = function (t) {
    return this.map(function () {
      const e = c(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((e = {}, s) => {
  s.extend(e, {
    PluginValidation: {
      defaults: {
        formClass: "needs-validation",
        validator: {
          highlight(e) {
            s(e)
              .addClass("is-invalid")
              .removeClass("is-valid")
              .parent()
              .removeClass("has-success")
              .addClass("has-danger");
          },
          success(e, t) {
            s(t)
              .removeClass("is-invalid")
              .addClass("is-valid")
              .parent()
              .removeClass("has-danger")
              .addClass("has-success")
              .find("label.error")
              .remove();
          },
          errorPlacement(e, t) {
            if (t.attr("type") == "radio" || t.attr("type") == "checkbox") {
              e.appendTo(t.parent().parent());
            } else {
              e.insertAfter(t);
            }
          },
        },
      },
      initialize(e) {
        initialized = true;
        this.setOptions(e).build();
        return this;
      },
      setOptions(e) {
        this.options = s.extend(true, {}, this.defaults, e);
        return this;
      },
      build() {
        const e = this;
        if (!s.isFunction(s.validator)) {
          return this;
        }
        e.setMessageGroups();
        s.validator.setDefaults(e.options.validator);
        s("." + e.options.formClass).validate();
        return this;
      },
      setMessageGroups() {
        s(
          ".checkbox-group[data-msg-required], .radio-group[data-msg-required]",
        ).each(function () {
          const e = s(this).data("msg-required");
          s(this).find("input").attr("data-msg-required", e);
        });
      },
    },
  });
}).apply(this, [window.theme, jQuery]);
((e = {}, o) => {
  const s = "__videobackground";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      this.$el = e;
      this.setData().setOptions(t).build().events();
      return this;
    }
    setData() {
      this.$el.data(s, this);
      return this;
    }
    setOptions(e) {
      this.options = o.extend(true, {}, i.defaults, e, {
        path: this.$el.data("video-path"),
        wrapper: this.$el,
      });
      return this;
    }
    build() {
      const t = this;
      if (!o.isFunction(o.fn.vide) || !this.options.path) {
        return this;
      }
      if (this.options.overlay) {
        const e = this.options.overlayClass;
        this.options.wrapper.prepend(o("<div />").addClass(e));
      }
      this.options.wrapper
        .vide(this.options.path, this.options)
        .first()
        .css("z-index", 0);
      t.changePoster();
      if (t.options.wrapper.closest(".owl-carousel").get(0)) {
        t.options.wrapper
          .closest(".owl-carousel")
          .on("initialized.owl.carousel", () => {
            o(".owl-item.cloned")
              .find("[data-plugin-video-background] .vide-video-wrapper")
              .remove();
            o(".owl-item.cloned")
              .find("[data-plugin-video-background]")
              .vide(t.options.path, t.options)
              .first()
              .css("z-index", 0);
            t.changePoster(t.options.wrapper.closest(".owl-carousel"));
          });
      }
      const s = t.options.wrapper.find(".video-background-play");
      if (s.get(0)) {
        const i = t.options.wrapper.find(".video-background-play-wrapper");
        t.options.wrapper.find(".video-background-play").on("click", (e) => {
          e.preventDefault();
          if (i.get(0)) {
            i.animate({ opacity: 0 }, 300, () => {
              i.parent().height(i.outerHeight());
              i.remove();
            });
          } else {
            s.animate({ opacity: 0 }, 300, () => {
              s.remove();
            });
          }
          setTimeout(() => {
            t.options.wrapper.find("video")[0].play();
          }, 500);
        });
      }
      o(window).trigger("vide.video.inserted.on.dom");
      return this;
    }
    changePoster(e) {
      const t = this;
      if (e && t.options.changePoster) {
        e.find(
          ".owl-item [data-plugin-video-background] .vide-video-wrapper",
        ).css({ "background-image": "url(" + t.options.changePoster + ")" });
        return this;
      }
      if (t.options.changePoster) {
        t.options.wrapper
          .find(".vide-video-wrapper")
          .css({ "background-image": "url(" + t.options.changePoster + ")" });
      }
      return this;
    }
    events() {
      const e = this;
      e.options.wrapper.on("video.background.initialize", () => {
        e.build();
      });
      return this;
    }
  }
  i.defaults = {
    overlay: false,
    volume: 1,
    playbackRate: 1,
    muted: true,
    loop: true,
    autoplay: true,
    position: "50% 50%",
    posterType: "detect",
    className: "vide-video-wrapper",
  };
  o.extend(e, { PluginVideoBackground: i });
  o.fn.themePluginVideoBackground = function (t) {
    return this.map(function () {
      const e = o(this);
      if (e.data(s)) {
        return e.data(s);
      } else {
        return new i(e, t);
      }
    });
  };
}).apply(this, [window.theme, jQuery]);
((t = {}, s) => {
  let i = false;
  s.extend(t, {
    Account: {
      defaults: { wrapper: s("#headerAccount") },
      initialize(e, t) {
        if (i) {
          return this;
        }
        i = true;
        this.$wrapper = e || this.defaults.wrapper;
        this.setOptions(t).events();
        return this;
      },
      setOptions(e) {
        this.options = s.extend(
          true,
          {},
          this.defaults,
          e,
          t.fn.getOptions(this.$wrapper.data("plugin-options")),
        );
        return this;
      },
      events() {
        const t = this;
        s(window).on("load", () => {
          s(document).ready(() => {
            setTimeout(() => {
              t.$wrapper.find("input").on("focus", () => {
                t.$wrapper.addClass("open");
                s(document).mouseup(({ target: e }) => {
                  if (!t.$wrapper.is(e) && t.$wrapper.has(e).length === 0) {
                    t.$wrapper.removeClass("open");
                  }
                });
              });
            }, 1500);
          });
        });
        s("#headerSignUp").on("click", (e) => {
          e.preventDefault();
          t.$wrapper
            .addClass("signup")
            .removeClass("signin")
            .removeClass("recover");
          t.$wrapper.find(".signup-form input:first").focus();
        });
        s("#headerSignIn").on("click", (e) => {
          e.preventDefault();
          t.$wrapper
            .addClass("signin")
            .removeClass("signup")
            .removeClass("recover");
          t.$wrapper.find(".signin-form input:first").focus();
        });
        s("#headerRecover").on("click", (e) => {
          e.preventDefault();
          t.$wrapper
            .addClass("recover")
            .removeClass("signup")
            .removeClass("signin");
          t.$wrapper.find(".recover-form input:first").focus();
        });
        s("#headerRecoverCancel").on("click", (e) => {
          e.preventDefault();
          t.$wrapper
            .addClass("signin")
            .removeClass("signup")
            .removeClass("recover");
          t.$wrapper.find(".signin-form input:first").focus();
        });
      },
    },
  });
}).apply(this, [window.theme, jQuery]);
((a = {}, c) => {
  let s = false;
  c.extend(a, {
    Nav: {
      defaults: {
        wrapper: c("#mainNav"),
        scrollDelay: 600,
        scrollAnimation: "easeOutQuad",
      },
      initialize(e, t) {
        if (s) {
          return this;
        }
        s = true;
        this.$wrapper = e || this.defaults.wrapper;
        this.setOptions(t).build().events();
        return this;
      },
      setOptions(e) {
        this.options = c.extend(
          true,
          {},
          this.defaults,
          e,
          a.fn.getOptions(this.$wrapper.data("plugin-options")),
        );
        return this;
      },
      build() {
        const t = this;
        const e = c("html");
        const s = c("#header");
        const o = c("#header .header-nav-main");
        let a;
        if (t.$wrapper.find("a[data-thumb-preview]").length) {
          t.$wrapper.find("a[data-thumb-preview]").each(function () {
            a = c("<span />")
              .addClass("thumb-info thumb-info-preview")
              .append(
                c("<span />")
                  .addClass("thumb-info-wrapper")
                  .append(
                    c("<span />")
                      .addClass("thumb-info-image")
                      .css(
                        "background-image",
                        "url(" + c(this).data("thumb-preview") + ")",
                      ),
                  ),
              );
            c(this).append(a);
          });
        }
        if (
          e.hasClass("side-header") ||
          e.hasClass("side-header-hamburguer-sidebar")
        ) {
          if (
            e.hasClass("side-header-right") ||
            e.hasClass("side-header-hamburguer-sidebar-right")
          ) {
            if (!e.hasClass("side-header-right-no-reverse")) {
              s.find(".dropdown-submenu").addClass("dropdown-reverse");
            }
          }
        } else {
          let e = false;
          t.checkReverse = () => {
            if (!e) {
              t.$wrapper
                .find(".dropdown, .dropdown-submenu")
                .removeClass("dropdown-reverse");
              t.$wrapper
                .find(
                  ".dropdown:not(.manual):not(.dropdown-mega), .dropdown-submenu:not(.manual)",
                )
                .each(function () {
                  if (
                    !c(this)
                      .find(".dropdown-menu")
                      .visible(false, true, "horizontal")
                  ) {
                    c(this).addClass("dropdown-reverse");
                  }
                });
              e = true;
            }
          };
          c(window).on("resize", () => {
            e = false;
          });
          s.on("mouseover", () => {
            t.checkReverse();
          });
        }
        if (o.hasClass("header-nav-main-clone-items")) {
          o.find("nav > ul > li > a").each(function () {
            const e = c(this).parent(),
              t = c(this).clone(),
              s = c(this).clone(),
              i = c('<span class="wrapper-items-cloned"></span>');
            c(this).addClass("item-original");
            s.addClass("item-two");
            e.prepend(i);
            i.append(t).append(s);
          });
        }
        if (
          c("#header.header-floating-icons").length &&
          c(window).width() > 991
        ) {
          const n = {
            $menuFloating: c(
              "#header.header-floating-icons .header-container > .header-row",
            ),
            build() {
              const e = this;
              e.init();
            },
            init() {
              const s = this;
              let i = 0;
              c(window).scroll(function () {
                const e =
                    (100 * c(window).scrollTop()) /
                    (c(document).height() - c(window).height()),
                  t = c(this).scrollTop();
                i = c(document).height() / c(window).height();
                s.$menuFloating
                  .find(".header-column > .header-row")
                  .css({
                    transform:
                      "translateY( calc(" + e + "vh - " + t / i + "px) )",
                  });
              });
            },
          };
          n.build();
        }
        if (c(".header-nav-links-vertical-slide").length) {
          const r = {
            $mainNav: c("#mainNav"),
            $mainNavItem: c("#mainNav li"),
            build() {
              const e = this;
              e.menuNav();
            },
            menuNav() {
              const e = this;
              e.$mainNavItem.on("click", function (e) {
                const t = c(this),
                  s = c(this).parent(),
                  o = c(this).find("ul").first(),
                  a = c(this).closest(".next-menu"),
                  n = t.hasClass("dropdown") || t.hasClass("dropdown-submenu"),
                  r = t.hasClass("back-button"),
                  l =
                    o.find("> li").length * o.find("> li").outerHeight() -
                    o.outerHeight(),
                  d =
                    a.find("> li").length * a.find("> li").outerHeight() -
                    a.outerHeight();
                if (n) {
                  s.addClass("next-menu");
                  o.addClass("visible");
                  s.css({ overflow: "visible", "overflow-y": "visible" });
                  if (l > 0) {
                    o.css({ overflow: "hidden", "overflow-y": "scroll" });
                  }
                  for (i = 0; i < o.find("> li").length; i++) {
                    if (
                      o.outerHeight() <
                      c(".header-row-side-header").outerHeight() - 100
                    ) {
                      o.css({
                        height: o.outerHeight() + o.find("> li").outerHeight(),
                      });
                    }
                  }
                  o.css({ "padding-top": l + "px" });
                }
                if (r) {
                  s.parent().parent().removeClass("next-menu");
                  s.removeClass("visible");
                  if (d > 0) {
                    a.css({ overflow: "hidden", "overflow-y": "scroll" });
                  }
                }
                e.stopPropagation();
              });
            },
          };
          c(window).trigger("resize");
          if (c(window).width() > 991) {
            r.build();
          }
          c(document).ready(() => {
            c(window).afterResize(() => {
              if (c(window).width() > 991) {
                r.build();
              }
            });
          });
        }
        if (c(".header-nav-main-mobile-dark").length) {
          c(
            "#header:not(.header-transparent-dark-bottom-border):not(.header-transparent-light-bottom-border)",
          ).addClass("header-no-border-bottom");
        }
        if (c(window).width() > 991) {
          let e = false;
          s.find(".header-nav-main nav > ul > li > a").on("focus", function () {
            if (c(window).width() > 991) {
              if (!e) {
                e = true;
                c(this).trigger("blur");
                t.focusMenuWithChildren();
              }
            }
          });
        }
        return this;
      },
      focusMenuWithChildren() {
        let e;
        let t;
        let s;
        const i = document.querySelector(
          "html:not(.side-header):not(.side-header-hamburguer-sidebar):not(.side-header-overlay-full-screen) .header-nav-main > nav",
        );
        if (!i) {
          return false;
        }
        e = i.getElementsByTagName("a");
        for (t = 0, s = e.length; t < s; t++) {
          e[t].addEventListener("focus", o, true);
          e[t].addEventListener("blur", o, true);
        }
        function o() {
          let e = this;
          while (!e.className.includes("header-nav-main")) {
            if ("li" === e.tagName.toLowerCase()) {
              if (e.className.includes("accessibility-open")) {
                e.className = e.className.replace(" accessibility-open", "");
              } else {
                e.className += " accessibility-open";
              }
            }
            e = e.parentElement;
          }
        }
      },
      events() {
        const n = this;
        const r = c("html");
        let s = c("#header");
        const l = c(window);
        let i = c(".header-body").outerHeight();
        if (s.hasClass("header")) {
          s = c(".header");
        }
        s.find('a[href="#"]').on("click", (e) => {
          e.preventDefault();
        });
        if (r.hasClass("side-header-hamburguer-sidebar")) {
          s.find(".dropdown-toggle, .dropdown-submenu > a").append(
            '<i class="fas fa-chevron-down fa-chevron-right"></i>',
          );
        } else {
          s.find(".dropdown-toggle, .dropdown-submenu > a").append(
            '<i class="fas fa-chevron-down"></i>',
          );
        }
        s.find(
          '.dropdown-toggle[href="#"], .dropdown-submenu a[href="#"], .dropdown-toggle[href!="#"] .fa-chevron-down, .dropdown-submenu a[href!="#"] .fa-chevron-down',
        ).on("click", function (e) {
          e.preventDefault();
          if (l.width() < 992) {
            c(this).closest("li").toggleClass("open");
            const t =
              s.hasClass("header-effect-shrink") &&
              r.hasClass("sticky-header-active")
                ? a.StickyHeader.options.stickyHeaderContainerHeight
                : i;
            c(".header-body").animate(
              { height: c(".header-nav-main nav").outerHeight(true) + t + 10 },
              0,
            );
          }
        });
        s.find("li a.active").addClass("current-page-active");
        s.find(
          '.header-nav-click-to-open .dropdown-toggle[href="#"], .header-nav-click-to-open .dropdown-submenu a[href="#"], .header-nav-click-to-open .dropdown-toggle > i',
        ).on("click", function (e) {
          if (
            !c("html").hasClass("side-header-hamburguer-sidebar") &&
            l.width() > 991
          ) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (l.width() > 991) {
            e.preventDefault();
            e.stopPropagation();
            s.find("li a.active").removeClass("active");
            if (c(this).prop("tagName") == "I") {
              c(this).parent().addClass("active");
            } else {
              c(this).addClass("active");
            }
            if (!c(this).closest("li").hasClass("open")) {
              const t = c(this).closest("li");
              let e = false;
              if (c(this).prop("tagName") == "I") {
                c("#header .dropdown.open").removeClass("open");
                c("#header .dropdown-menu .dropdown-submenu.open").removeClass(
                  "open",
                );
              }
              if (c(this).parent().hasClass("dropdown-submenu")) {
                e = true;
              }
              c(this)
                .closest(".dropdown-menu")
                .find(".dropdown-submenu.open")
                .removeClass("open");
              c(this)
                .parent(".dropdown")
                .parent()
                .find(".dropdown.open")
                .removeClass("open");
              if (!e) {
                c(this)
                  .parent()
                  .find(".dropdown-submenu.open")
                  .removeClass("open");
              }
              t.addClass("open");
              c(document)
                .off("click.nav-click-to-open")
                .on("click.nav-click-to-open", ({ target: e }) => {
                  if (!t.is(e) && t.has(e).length === 0) {
                    t.removeClass("open");
                    t.parents(".open").removeClass("open");
                    s.find("li a.active").removeClass("active");
                    s.find("li a.current-page-active").addClass("active");
                  }
                });
            } else {
              c(this).closest("li").removeClass("open");
              s.find("li a.active").removeClass("active");
              s.find("li a.current-page-active").addClass("active");
            }
            l.trigger({ type: "resize", from: "header-nav-click-to-open" });
          }
        });
        s.find("[data-collapse-nav]").on("click", function (e) {
          c(this).parents(".collapse").removeClass("show");
        });
        s.find(".header-nav-features-toggle").on("click", function (e) {
          e.preventDefault();
          const t = c(this).parent();
          if (
            !c(this).siblings(".header-nav-features-dropdown").hasClass("show")
          ) {
            const s = c(this).siblings(".header-nav-features-dropdown");
            c(".header-nav-features-dropdown.show").removeClass("show");
            s.addClass("show");
            c(document)
              .off("click.header-nav-features-toggle")
              .on("click.header-nav-features-toggle", ({ target: e }) => {
                if (!t.is(e) && t.has(e).length === 0) {
                  c(".header-nav-features-dropdown.show").removeClass("show");
                }
              });
            if (c(this).attr("data-focus")) {
              c("#" + c(this).attr("data-focus")).focus();
            }
          } else {
            c(this)
              .siblings(".header-nav-features-dropdown")
              .removeClass("show");
          }
        });
        const e = c(".hamburguer-btn:not(.side-panel-toggle)"),
          d = c("#header.side-header, #header.side-header-overlay-full-screen");
        e.on("click", function () {
          if (c(this).attr("data-set-active") != "false") {
            c(this).toggleClass("active");
          }
          d.toggleClass("side-header-hide");
          r.toggleClass("side-header-hide");
          l.trigger("resize");
        });
        c(".toggle-side-header").on("click", () => {
          c(".hamburguer-btn-side-header.active").trigger("click");
        });
        c(".hamburguer-close:not(.side-panel-toggle)").on("click", () => {
          c(
            ".hamburguer-btn:not(.hamburguer-btn-side-header-mobile-show)",
          ).trigger("click");
        });
        c(".header-nav-main nav").on("show.bs.collapse", function () {
          c(this).removeClass("closed");
          c("html").addClass("mobile-menu-opened");
          c(".header-body").animate({
            height:
              c(".header-body").outerHeight() +
              c(".header-nav-main nav").outerHeight(true) +
              10,
          });
          if (
            c("#header").is(".header-bottom-slider, .header-below-slider") &&
            !c("html").hasClass("sticky-header-active")
          ) {
            n.scrollToTarget(c("#header"), 0);
          }
        });
        c(".header-nav-main nav").on("hide.bs.collapse", function () {
          c(this).addClass("closed");
          c("html").removeClass("mobile-menu-opened");
          c(".header-body").animate(
            {
              height:
                c(".header-body").outerHeight() -
                c(".header-nav-main nav").outerHeight(true),
            },
            function () {
              c(this).height("auto");
            },
          );
        });
        l.on("stickyHeader.activate", () => {
          if (l.width() < 992 && s.hasClass("header-effect-shrink")) {
            if (c(".header-btn-collapse-nav").attr("aria-expanded") == "true") {
              c(".header-body").animate({
                height:
                  c(".header-nav-main nav").outerHeight(true) +
                  a.StickyHeader.options.stickyHeaderContainerHeight +
                  (c(".header-nav-bar").length
                    ? c(".header-nav-bar").outerHeight()
                    : 0),
              });
            }
          }
        });
        l.on("stickyHeader.deactivate", () => {
          if (l.width() < 992 && s.hasClass("header-effect-shrink")) {
            if (c(".header-btn-collapse-nav").attr("aria-expanded") == "true") {
              c(".header-body").animate({
                height: i + c(".header-nav-main nav").outerHeight(true) + 10,
              });
            }
          }
        });
        l.on("resize.removeOpen", ({ from: e }) => {
          if (e == "header-nav-click-to-open") {
            return;
          }
          setTimeout(() => {
            if (l.width() > 991) {
              s.find(".dropdown.open").removeClass("open");
            }
          }, 100);
        });
        c(document).ready(() => {
          if (l.width() > 991) {
            let t = false;
            l.on("resize", ({ from: e }) => {
              if (e == "header-nav-click-to-open") {
                return;
              }
              s.find(".dropdown.open").removeClass("open");
              if (l.width() < 992 && t == false) {
                i = c(".header-body").outerHeight();
                t = true;
                setTimeout(() => {
                  t = false;
                }, 500);
              }
            });
          }
        });
        if (r.hasClass("side-header")) {
          if (l.width() < 992) {
            s.css({
              height:
                c(".header-body .header-container").outerHeight() +
                (parseInt(c(".header-body").css("border-top-width")) +
                  parseInt(c(".header-body").css("border-bottom-width"))),
            });
          }
          c(document).ready(() => {
            l.afterResize(() => {
              if (l.width() < 992) {
                s.css({
                  height:
                    c(".header-body .header-container").outerHeight() +
                    (parseInt(c(".header-body").css("border-top-width")) +
                      parseInt(c(".header-body").css("border-bottom-width"))),
                });
              } else {
                s.css({ height: "" });
              }
            });
          });
        }
        if (c("[data-hash]").length) {
          c("[data-hash]").on("mouseover", function () {
            const o = c(this);
            if (!o.data("__dataHashBinded")) {
              let s = o.attr("href");
              let i = o.is("[data-hash-offset]") ? o.data("hash-offset") : 0;
              const t = o.is("[data-hash-delay]") ? o.data("hash-delay") : 0;
              const a = o.is("[data-hash-force]") ? true : false;
              const e = c(window).width();
              if (o.is("[data-hash-offset-sm]") && e > 576) {
                i = o.data("hash-offset-sm");
              }
              if (o.is("[data-hash-offset-md]") && e > 768) {
                i = o.data("hash-offset-md");
              }
              if (o.is("[data-hash-offset-lg]") && e > 992) {
                i = o.data("hash-offset-lg");
              }
              if (o.is("[data-hash-offset-xl]") && e > 1200) {
                i = o.data("hash-offset-xl");
              }
              if (o.is("[data-hash-offset-xxl]") && e > 1400) {
                i = o.data("hash-offset-xxl");
              }
              if (!c(s).length) {
                s = s.split("#");
                s = "#" + s[1];
              }
              if (s.includes("#") && c(s).length) {
                o.on("click", (e) => {
                  e.preventDefault();
                  if (!c(e.target).is("i") || a) {
                    setTimeout(() => {
                      o.parents(".collapse.show").collapse("hide");
                      d.addClass("side-header-hide");
                      r.addClass("side-header-hide");
                      l.trigger("resize");
                      n.scrollToTarget(s, i);
                      if (o.data("hash-trigger-click")) {
                        const e = c(o.data("hash-trigger-click")),
                          t = o.data("hash-trigger-click-delay")
                            ? o.data("hash-trigger-click-delay")
                            : 0;
                        if (e.length) {
                          setTimeout(() => {
                            if (e.closest(".nav-tabs").length) {
                              new bootstrap.Tab(e[0]).show();
                            } else {
                              e.trigger("click");
                            }
                          }, t);
                        }
                      }
                    }, t);
                  }
                  return;
                });
              }
              c(this).data("__dataHashBinded", true);
            }
          });
        }
        if (c("#header.header-floating-icons").length) {
          c("#header.header-floating-icons [data-hash]")
            .off()
            .each(function () {
              const t = c(this).attr("href"),
                s = c(this).is("[data-hash-offset]")
                  ? c(this).data("hash-offset")
                  : 0;
              if (c(t).length) {
                c(this).on("click", (e) => {
                  e.preventDefault();
                  c("html, body").animate(
                    { scrollTop: c(t).offset().top - s },
                    600,
                    "easeOutQuad",
                    () => {},
                  );
                  return;
                });
              }
            });
        }
        if (c(".side-panel-toggle").length) {
          const o = c("html").attr("class");
          c(".side-panel-toggle").on("click", function (e) {
            const t = c(this).data("extra-class"),
              s = t ? 100 : 0,
              i = c(this).data("is-active") ? c(this).data("is-active") : false;
            e.preventDefault();
            if (i) {
              c("html").removeClass("side-panel-open");
              c(this).data("is-active", false);
              return false;
            }
            if (t) {
              c(".side-panel-wrapper").css("transition", "none");
              c("html").removeClass().addClass(o).addClass(t);
            }
            setTimeout(() => {
              c(".side-panel-wrapper").css("transition", "");
              c("html").toggleClass("side-panel-open");
            }, s);
            c(this).data("is-active", true);
          });
          c(document).on("click", ({ target: e }) => {
            if (
              !c(e).closest(".side-panel-wrapper").length &&
              !c(e).hasClass("side-panel-toggle")
            ) {
              c(
                ".hamburguer-btn.side-panel-toggle:not(.side-panel-close)",
              ).removeClass("active");
              c("html").removeClass("side-panel-open");
              c(".side-panel-toggle").data("is-active", false);
            }
          });
        }
        n.offCanvasMenu();
        return this;
      },
      scrollToTarget(e, t) {
        const s = this,
          i = c(e).offset().top;
        c("body").addClass("scrolling");
        c("html, body").animate(
          { scrollTop: c(e).offset().top - t },
          s.options.scrollDelay,
          s.options.scrollAnimation,
          () => {
            c("body").removeClass("scrolling");
            if (c(e).offset().top != i) {
              c("html, body").animate(
                { scrollTop: c(e).offset().top - t },
                1,
                s.options.scrollAnimation,
                () => {},
              );
            }
          },
        );
        return this;
      },
      offCanvasMenu() {
        const e = c("#header .header-nav-main");
        const t = c(".offcanvas-nav");
        if (t.length > 0) {
          const s = e.find("nav");
          if (s.length > 0) {
            t.html(t.html() + s.html());
            t.find("#mainNav")
              .removeAttr("id")
              .removeClass()
              .addClass("nav flex-column w-100");
            t.find(".dropdown").removeClass().addClass("dropdown");
            t.find(".dropdown-item:not(.dropdown-toggle)")
              .removeClass()
              .addClass("dropdown-item");
            t.find(".dropdown-item.dropdown-toggle")
              .removeClass()
              .addClass("dropdown-item dropdown-toggle");
            t.find(".nav-link:not(.dropdown-toggle)")
              .removeClass()
              .addClass("nav-link");
            t.find(".nav-link.dropdown-toggle")
              .removeClass()
              .addClass("nav-link dropdown-toggle");
            t.find(".dropdown-menu").removeClass().addClass("dropdown-menu");
            t.find(".dropdown-toggle").each(function () {
              const t = c(this);
              const e = t.find("i");
              e.on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                t.parents("li").toggleClass("open");
              });
              if (t.attr("href") == "#") {
                t.on("click", function () {
                  e.trigger("click");
                });
              }
            });
          }
        }
        return this;
      },
    },
  });
}).apply(this, [window.theme, jQuery]);
((t = {}, a) => {
  let s = false;
  a.extend(t, {
    Newsletter: {
      defaults: { wrapper: a("#newsletterForm") },
      initialize(e, t) {
        if (s) {
          return this;
        }
        s = true;
        this.$wrapper = e || this.defaults.wrapper;
        this.setOptions(t).build();
        return this;
      },
      setOptions(e) {
        this.options = a.extend(
          true,
          {},
          this.defaults,
          e,
          t.fn.getOptions(this.$wrapper.data("plugin-options")),
        );
        return this;
      },
      build() {
        if (!a.isFunction(a.fn.validate)) {
          return this;
        }
        const t = this,
          s = t.$wrapper.find("#newsletterEmail"),
          i = a("#newsletterSuccess"),
          o = a("#newsletterError");
        t.$wrapper.validate({
          submitHandler(e) {
            a.ajax({
              type: "POST",
              url: t.$wrapper.attr("action"),
              data: { email: s.val() },
              dataType: "json",
              success({ response: e, message: t }) {
                if (e == "success") {
                  i.removeClass("d-none");
                  o.addClass("d-none");
                  s.val("")
                    .blur()
                    .closest(".control-group")
                    .removeClass("success")
                    .removeClass("error");
                } else {
                  o.html(t);
                  o.removeClass("d-none");
                  i.addClass("d-none");
                  s.blur()
                    .closest(".control-group")
                    .removeClass("success")
                    .addClass("error");
                }
              },
            });
          },
          rules: { newsletterEmail: { required: true, email: true } },
          errorPlacement(e, t) {},
        });
        return this;
      },
    },
  });
}).apply(this, [window.theme, jQuery]);
((t = {}, i) => {
  let s = false;
  i.extend(t, {
    Search: {
      defaults: { wrapper: i("#searchForm") },
      initialize(e, t) {
        if (s) {
          return this;
        }
        s = true;
        this.$wrapper = e || this.defaults.wrapper;
        this.setOptions(t).build();
        return this;
      },
      setOptions(e) {
        this.options = i.extend(
          true,
          {},
          this.defaults,
          e,
          t.fn.getOptions(this.$wrapper.data("plugin-options")),
        );
        return this;
      },
      build() {
        if (!i.isFunction(i.fn.validate)) {
          return this;
        }
        this.$wrapper.validate({ errorPlacement(e, t) {} });
        t.fn.execOnceTroughEvent("#header", "mouseover.search.reveal", () => {
          i(".header-nav-features-search-reveal").each(function () {
            const e = i(this),
              t = i("#header"),
              s = i("html");
            e.find(".header-nav-features-search-show-icon").on("click", () => {
              e.addClass("show");
              t.addClass("search-show");
              s.addClass("search-show");
              i("#headerSearch").focus();
            });
            e.find(".header-nav-features-search-hide-icon").on("click", () => {
              e.removeClass("show");
              t.removeClass("search-show");
              s.removeClass("search-show");
            });
          });
        });
        return this;
      },
    },
  });
}).apply(this, [window.theme, jQuery]);
((b = {}, C) => {
  let s = false;
  C.extend(b, {
    StickyHeader: {
      defaults: {
        wrapper: C("#header"),
        headerBody: C("#header .header-body"),
        stickyEnabled: true,
        stickyEnableOnBoxed: true,
        stickyEnableOnMobile: false,
        stickyStartAt: 0,
        stickyStartAtElement: false,
        stickySetTop: 0,
        stickyEffect: "",
        stickyHeaderContainerHeight: false,
        stickyChangeLogo: false,
        stickyChangeLogoWrapper: true,
        stickyForce: false,
        stickyScrollUp: false,
        stickyScrollValue: 0,
      },
      initialize(e, t) {
        if (s) {
          return this;
        }
        s = true;
        this.$wrapper = e || this.defaults.wrapper;
        if (this.$wrapper.hasClass("header")) {
          this.$wrapper = C(".header[data-plugin-options]");
        }
        this.setOptions(t).build().events();
        return this;
      },
      setOptions(e) {
        this.options = C.extend(
          true,
          {},
          this.defaults,
          e,
          b.fn.getOptions(this.$wrapper.data("plugin-options")),
        );
        return this;
      },
      build() {
        if (
          C(window).width() < 992 &&
          this.options.stickyEnableOnMobile == false
        ) {
          C("html").addClass("sticky-header-mobile-disabled");
          return this;
        }
        if (
          (!this.options.stickyEnableOnBoxed && C("html").hasClass("boxed")) ||
          (C("html").hasClass("side-header-hamburguer-sidebar") &&
            !this.options.stickyForce) ||
          !this.options.stickyEnabled
        ) {
          return this;
        }
        const t = this;
        if (t.options.wrapper.hasClass("header")) {
          t.options.wrapper = C(".header");
          t.options.headerBody = C(".header .header-body");
        }
        const s = C("html");
        const i = C(window);
        const o = s.hasClass("side-header");
        const e = t.options.wrapper.find(".header-top").outerHeight();
        const a = t.options.wrapper.find(".header-container").outerHeight();
        let n;
        s.addClass("sticky-header-enabled");
        if (parseInt(t.options.stickySetTop) < 0) {
          s.addClass("sticky-header-negative");
        }
        if (t.options.stickyScrollUp) {
          s.addClass("sticky-header-scroll-direction");
        }
        if (C(".notice-top-bar").get(0)) {
          if (
            parseInt(t.options.stickySetTop) == 1 ||
            t.options.stickyEffect == "shrink"
          ) {
            C(".body").on(
              "transitionend webkitTransitionEnd oTransitionEnd",
              () => {
                setTimeout(() => {
                  if (!s.hasClass("sticky-header-active")) {
                    t.options.headerBody.animate(
                      { top: C(".notice-top-bar").outerHeight() },
                      300,
                      () => {
                        if (s.hasClass("sticky-header-active")) {
                          t.options.headerBody.css("top", 0);
                        }
                      },
                    );
                  }
                }, 0);
              },
            );
          }
        }
        if (t.options.stickyStartAtElement) {
          const h = C(t.options.stickyStartAtElement);
          C(window).on("scroll resize sticky.header.resize", () => {
            t.options.stickyStartAt = h.offset().top;
          });
          C(window).trigger("sticky.header.resize");
        }
        if (t.options.wrapper.find(".header-top").get(0)) {
          n = e + a;
        } else {
          n = a;
        }
        if (!o) {
          if (!C(".header-logo-sticky-change").get(0)) {
            t.options.wrapper.css("height", t.options.headerBody.outerHeight());
          } else {
            i.on("stickyChangeLogo.loaded", () => {
              t.options.wrapper.css(
                "height",
                t.options.headerBody.outerHeight(),
              );
            });
          }
          if (t.options.stickyEffect == "shrink") {
            C(document).ready(() => {
              if (i.scrollTop() >= t.options.stickyStartAt) {
                t.options.wrapper
                  .find(".header-container")
                  .on(
                    "transitionend webkitTransitionEnd oTransitionEnd",
                    () => {
                      t.options.headerBody.css("position", "fixed");
                    },
                  );
              } else {
                if (!s.hasClass("boxed")) {
                  t.options.headerBody.css("position", "fixed");
                }
              }
            });
            t.options.wrapper.find(".header-container").css("height", a);
            t.options.wrapper.find(".header-top").css("height", e);
          }
        }
        if (t.options.stickyHeaderContainerHeight) {
          t.options.wrapper
            .find(".header-container")
            .css(
              "height",
              t.options.wrapper.find(".header-container").outerHeight(),
            );
        }
        if (s.hasClass("boxed") && t.options.stickyEffect == "shrink") {
          t.boxedLayout();
        }
        let r = true;
        let l = false;
        const d = t.options.stickyStartAt;
        t.checkStickyHeader = () => {
          const e = C(".notice-top-bar");
          if (e.get(0)) {
            t.options.stickyStartAt = e.data("sticky-start-at")
              ? e.data("sticky-start-at")
              : C(".notice-top-bar").outerHeight();
          } else {
            if (s.hasClass("boxed")) {
              t.options.stickyStartAt = d + 25;
            } else {
              t.options.stickyStartAt = d;
            }
          }
          if (i.width() > 991 && s.hasClass("side-header")) {
            s.removeClass("sticky-header-active");
            r = true;
            return;
          }
          if (i.scrollTop() >= parseInt(t.options.stickyStartAt)) {
            if (r) {
              t.activateStickyHeader();
              r = false;
              l = true;
            }
          } else {
            if (l) {
              t.deactivateStickyHeader();
              l = false;
              r = true;
            }
          }
          if (t.options.stickyScrollUp) {
            t.options.stickyScrollNewValue = window.pageYOffset;
            if (
              t.options.stickyScrollValue - t.options.stickyScrollNewValue <
              0
            ) {
              s.removeClass("sticky-header-scroll-up").addClass(
                "sticky-header-scroll-down",
              );
            } else if (
              t.options.stickyScrollValue - t.options.stickyScrollNewValue >
              0
            ) {
              s.removeClass("sticky-header-scroll-down").addClass(
                "sticky-header-scroll-up",
              );
            }
            t.options.stickyScrollValue = t.options.stickyScrollNewValue;
          }
        };
        t.activateStickyHeader = () => {
          if (i.width() < 992) {
            if (t.options.stickyEnableOnMobile == false) {
              t.deactivateStickyHeader();
              t.options.headerBody.css({ position: "relative" });
              return false;
            }
          } else {
            if (o) {
              t.deactivateStickyHeader();
              return;
            }
          }
          s.addClass("sticky-header-active");
          if (t.options.stickyEffect == "reveal") {
            t.options.headerBody.css(
              "top",
              "-" + t.options.stickyStartAt + "px",
            );
            t.options.headerBody.animate(
              { top: t.options.stickySetTop },
              400,
              () => {},
            );
          }
          if (t.options.stickyEffect == "shrink") {
            if (t.options.wrapper.find(".header-top").get(0)) {
              t.options.wrapper
                .find(".header-top")
                .css({ height: 0, "min-height": 0, overflow: "hidden" });
            }
            if (t.options.stickyHeaderContainerHeight) {
              t.options.wrapper
                .find(".header-container")
                .css({
                  height: t.options.stickyHeaderContainerHeight,
                  "min-height": 0,
                });
            } else {
              t.options.wrapper
                .find(".header-container")
                .css({ height: (a / 3) * 2, "min-height": 0 });
              const e = a - (a / 3) * 2;
              C(".main")
                .css({
                  transform: "translate3d(0, -" + e + "px, 0)",
                  transition: "ease transform 300ms",
                })
                .addClass("has-sticky-header-transform");
              if (s.hasClass("boxed")) {
                t.options.headerBody.css("position", "fixed");
              }
            }
          }
          t.options.headerBody.css("top", t.options.stickySetTop);
          if (t.options.stickyChangeLogo) {
            t.changeLogo(true);
          }
          if (C("[data-sticky-header-style]").length) {
            C("[data-sticky-header-style]").each(function () {
              const e = C(this),
                t = b.fn.getOptions(e.data("sticky-header-style-active")),
                s = b.fn.getOptions(e.data("sticky-header-style"));
              if (i.width() > s.minResolution) {
                e.css(t);
              }
            });
          }
          C.event.trigger({ type: "stickyHeader.activate" });
        };
        t.deactivateStickyHeader = () => {
          s.removeClass("sticky-header-active");
          if (
            C(window).width() < 992 &&
            t.options.stickyEnableOnMobile == false
          ) {
            return false;
          }
          if (t.options.stickyEffect == "shrink") {
            if (s.hasClass("boxed")) {
              t.options.headerBody.css("position", "absolute");
              if (i.scrollTop() > C(".body").offset().top) {
                t.options.headerBody.css("position", "fixed");
              }
            } else {
              t.options.headerBody.css("position", "fixed");
            }
            if (t.options.wrapper.find(".header-top").get(0)) {
              t.options.wrapper
                .find(".header-top")
                .css({ height: e, overflow: "visible" });
              if (t.options.wrapper.find(".header-top [data-icon]").length) {
                b.fn.intObsInit(
                  ".header-top [data-icon]:not(.svg-inline--fa)",
                  "themePluginIcon",
                );
              }
            }
            t.options.wrapper.find(".header-container").css({ height: a });
          }
          t.options.headerBody.css("top", 0);
          if (t.options.stickyChangeLogo) {
            t.changeLogo(false);
          }
          if (C("[data-sticky-header-style]").length) {
            C("[data-sticky-header-style]").each(function () {
              const e = C(this),
                t = b.fn.getOptions(e.data("sticky-header-style-deactive")),
                s = b.fn.getOptions(e.data("sticky-header-style"));
              if (i.width() > s.minResolution) {
                e.css(t);
              }
            });
          }
          C.event.trigger({ type: "stickyHeader.deactivate" });
        };
        if (parseInt(t.options.stickyStartAt) <= 0) {
          t.activateStickyHeader();
        }
        if (t.options.stickyChangeLogo) {
          const u = t.options.wrapper.find(".header-logo"),
            f = u.find("img"),
            g = f.attr("width"),
            m = f.attr("height"),
            w = parseInt(
              f.attr("data-sticky-top") ? f.attr("data-sticky-top") : 0,
            ),
            v = parseInt(
              f.attr("data-sticky-width")
                ? f.attr("data-sticky-width")
                : "auto",
            ),
            y = parseInt(
              f.attr("data-sticky-height")
                ? f.attr("data-sticky-height")
                : "auto",
            );
          if (t.options.stickyChangeLogoWrapper) {
            u.css({ width: f.outerWidth(true), height: f.outerHeight(true) });
          }
          t.changeLogo = (e) => {
            if (e) {
              f.css({ top: w, width: v, height: y });
            } else {
              f.css({ top: 0, width: g, height: m });
            }
          };
          C.event.trigger({ type: "stickyChangeLogo.loaded" });
        }
        let c,
          p = false;
        t.checkSideHeader = () => {
          if (i.width() < 992 && p == false) {
            c = t.options.headerBody.height();
            p = true;
          }
          if (t.options.stickyStartAt == 0 && o) {
            t.options.wrapper.css("min-height", 0);
          }
          if (t.options.stickyStartAt > 0 && o && i.width() < 992) {
            t.options.wrapper.css("min-height", c);
          }
        };
        return this;
      },
      events() {
        const e = this;
        if (
          C(window).width() < 992 &&
          this.options.stickyEnableOnMobile == false
        ) {
          return this;
        }
        if (
          (!this.options.stickyEnableOnBoxed && C("body").hasClass("boxed")) ||
          (C("html").hasClass("side-header-hamburguer-sidebar") &&
            !this.options.stickyForce) ||
          !this.options.stickyEnabled
        ) {
          return this;
        }
        if (!e.options.alwaysStickyEnabled) {
          C(window).on("scroll resize", () => {
            if (
              C(window).width() < 992 &&
              e.options.stickyEnableOnMobile == false
            ) {
              e.options.headerBody.css({ position: "" });
              if (e.options.stickyEffect == "shrink") {
                e.options.wrapper.find(".header-top").css({ height: "" });
              }
              e.deactivateStickyHeader();
            } else {
              e.checkStickyHeader();
            }
          });
        } else {
          e.activateStickyHeader();
        }
        C(window).on("load resize", () => {
          e.checkSideHeader();
        });
        C(window).on("layout.boxed", () => {
          e.boxedLayout();
        });
        return this;
      },
      boxedLayout() {
        const e = this,
          t = C(window);
        if (C("html").hasClass("boxed") && e.options.stickyEffect == "shrink") {
          if (parseInt(e.options.stickyStartAt) == 0 && t.width() > 991) {
            e.options.stickyStartAt = 30;
          }
          e.options.headerBody.css({ position: "absolute", top: 0 });
          t.on("scroll", () => {
            if (t.scrollTop() > C(".body").offset().top) {
              e.options.headerBody.css({ position: "fixed", top: 0 });
            } else {
              e.options.headerBody.css({ position: "absolute", top: 0 });
            }
          });
        }
        return this;
      },
    },
  });
}).apply(this, [window.theme, jQuery]);
