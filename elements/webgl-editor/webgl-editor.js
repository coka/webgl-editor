Polymer
({
  is: "webgl-editor",

  properties:
  {
    translateX: { type: Number, value: 0.0, observer: "tx_to_float" },
    translateY: { type: Number, value: 0.0, observer: "ty_to_float" },
    translateZ: { type: Number, value: 0.0, observer: "tz_to_float" },
    rotateX:    { type: Number, value: 0.0, observer: "rx_to_float" },
    rotateY:    { type: Number, value: 0.0, observer: "ry_to_float" },
    rotateZ:    { type: Number, value: 0.0, observer: "rz_to_float" },
    scaleX:     { type: Number, value: 1.0, observer: "sx_to_float" },
    scaleY:     { type: Number, value: 1.0, observer: "sy_to_float" },
    scaleZ:     { type: Number, value: 1.0, observer: "sz_to_float" },
    animationStatus: { type: Boolean, value: false }
  },

  // editor-attribute-view input fields return strings
  tx_to_float: function(e) { this.translateX = parseFloat(e); },
  ty_to_float: function(e) { this.translateY = parseFloat(e); },
  tz_to_float: function(e) { this.translateZ = parseFloat(e); },
  rx_to_float: function(e) { this.rotateX    = parseFloat(e); },
  ry_to_float: function(e) { this.rotateY    = parseFloat(e); },
  rz_to_float: function(e) { this.rotateZ    = parseFloat(e); },
  sx_to_float: function(e) { this.scaleX     = parseFloat(e); },
  sy_to_float: function(e) { this.scaleY     = parseFloat(e); },
  sz_to_float: function(e) { this.scaleZ     = parseFloat(e); }
});
