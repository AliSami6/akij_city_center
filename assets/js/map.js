// Porto Google Maps Plugin
((t = {}, o) => {
  const s = "__gmap";
  class i {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      if (e.data(s)) return this;
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
      const e = this;
      if (typeof gmaps !== "undefined" || typeof google !== "undefined") {
        e.$el.gMap(e.options);
      } else {
        t.fn.showErrorMessage(
          "Failed to Load File",
          "Failed to load: Google Maps API Script",
        );
      }
      return this;
    }
  }
  i.defaults = {
    controls: {
      panControl: true,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true,
    },
    scrollwheel: false,
    markers: [],
    zoom: 14,
  };
  o.extend(t, { PluginMap: i });
  o.fn.themePluginMap = function (t) {
    return this.map(function () {
      const e = o(this);
      return e.data(s) ? e.data(s) : new i(e, t);
    });
  };
}).apply(this, [window.theme, jQuery]);
