function degToRad(degrees) { return degrees * Math.PI / 180.0; } // global

Polymer
({
  is: 'webgl-editor',

  properties:
  {
    mesh: { type: Object, value: new THREE.Mesh() },
    rotation: { type: Object, value: new THREE.Vector3() },
    animationStatus: { type: Boolean, value: false },
  },

  observers:
  [
    'txToFloat(mesh.position.x)',
    'tyToFloat(mesh.position.y)',
    'tzToFloat(mesh.position.z)',
    'rxToFloat(rotation.x)',
    'ryToFloat(rotation.y)',
    'rzToFloat(rotation.z)',
    'sxToFloat(mesh.scale.x)',
    'syToFloat(mesh.scale.y)',
    'szToFloat(mesh.scale.z)',
  ],

  // editor-attribute-view input fields return strings
  txToFloat: function(e) { this.set('mesh.position.x', parseFloat(e)); },

  tyToFloat: function(e) { this.set('mesh.position.y', parseFloat(e)); },

  tzToFloat: function(e) { this.set('mesh.position.z', parseFloat(e)); },

  rxToFloat: function(e) { this.set('mesh.rotation.x', degToRad(parseFloat(e))); },

  ryToFloat: function(e) { this.set('mesh.rotation.y', degToRad(parseFloat(e))); },

  rzToFloat: function(e) { this.set('mesh.rotation.z', degToRad(parseFloat(e))); },

  sxToFloat: function(e) { this.set('mesh.scale.x', parseFloat(e)); },

  syToFloat: function(e) { this.set('mesh.scale.y', parseFloat(e)); },

  szToFloat: function(e) { this.set('mesh.scale.z', parseFloat(e)); },
});
