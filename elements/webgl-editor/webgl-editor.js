function deg_to_rad(degrees) { return degrees * Math.PI / 180.0; } // global

Polymer
({
  is: "webgl-editor",

  properties:
  {
    mesh: { type: Object, value: new THREE.Mesh() },
    rotation: { type: Object, value: new THREE.Vector3() },
    animationStatus: { type: Boolean, value: false }
  },

  observers:
  [
    "tx_to_float(mesh.position.x)",
    "ty_to_float(mesh.position.y)",
    "tz_to_float(mesh.position.z)",
    "rx_to_float(rotation.x)",
    "ry_to_float(rotation.y)",
    "rz_to_float(rotation.z)",
    "sx_to_float(mesh.scale.x)",
    "sy_to_float(mesh.scale.y)",
    "sz_to_float(mesh.scale.z)"
  ],

  // editor-attribute-view input fields return strings
  tx_to_float: function(e) { this.set("mesh.position.x", parseFloat(e)); },
  ty_to_float: function(e) { this.set("mesh.position.y", parseFloat(e)); },
  tz_to_float: function(e) { this.set("mesh.position.z", parseFloat(e)); },
  rx_to_float: function(e) { this.set("mesh.rotation.x", deg_to_rad(parseFloat(e))); },
  ry_to_float: function(e) { this.set("mesh.rotation.y", deg_to_rad(parseFloat(e))); },
  rz_to_float: function(e) { this.set("mesh.rotation.z", deg_to_rad(parseFloat(e))); },
  sx_to_float: function(e) { this.set("mesh.scale.x",    parseFloat(e)); },
  sy_to_float: function(e) { this.set("mesh.scale.y",    parseFloat(e)); },
  sz_to_float: function(e) { this.set("mesh.scale.z",    parseFloat(e)); }
});
