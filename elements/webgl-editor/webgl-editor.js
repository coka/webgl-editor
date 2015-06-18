Polymer
({
  is: "webgl-editor",

  properties:
  {
    mesh: { type: Object, value: new THREE.Mesh() },
    animationStatus: { type: Boolean, value: false }
  },

  observers:
  [
    "tx_to_float(mesh.position.x)",
    "ty_to_float(mesh.position.y)",
    "tz_to_float(mesh.position.z)",
    "rx_to_float(mesh.rotation.x)",
    "ry_to_float(mesh.rotation.y)",
    "rz_to_float(mesh.rotation.z)",
    "sx_to_float(mesh.scale.x)",
    "sy_to_float(mesh.scale.y)",
    "sz_to_float(mesh.scale.z)"
  ],

  // editor-attribute-view input fields return strings
  tx_to_float: function(e) { this.set("mesh.position.x", parseFloat(e)); },
  ty_to_float: function(e) { this.set("mesh.position.y", parseFloat(e)); },
  tz_to_float: function(e) { this.set("mesh.position.z", parseFloat(e)); },
  rx_to_float: function(e) { this.set("mesh.rotation.x", parseFloat(e)); },
  ry_to_float: function(e) { this.set("mesh.rotation.y", parseFloat(e)); },
  rz_to_float: function(e) { this.set("mesh.rotation.z", parseFloat(e)); },
  sx_to_float: function(e) { this.set("mesh.scale.x",    parseFloat(e)); },
  sy_to_float: function(e) { this.set("mesh.scale.y",    parseFloat(e)); },
  sz_to_float: function(e) { this.set("mesh.scale.z",    parseFloat(e)); }
});
