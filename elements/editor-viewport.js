Polymer
({
  is: "editor-viewport",

  // member variables
  properties:
  {
    width: { type: Number, value: 0 },
    height: { type: Number, value: 0 },
    renderer: { type: Object, value: new THREE.WebGLRenderer() },
    scene: { type: Object, value: new THREE.Scene() },
    camera: { type: Object, value: new THREE.PerspectiveCamera() }
  },

  // public methods
  init: function()
  {
    this.width = this.offsetWidth;
    this.height = this.offsetHeight;

    this.renderer.setSize(this.width, this.height);
    this.appendChild(this.renderer.domElement);

    this.renderer.render(this.scene, this.camera);
  },

  // fires when the element is inserted into the document
  attached: function() { this.init(); }
});
