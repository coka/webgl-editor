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
    camera: { type: Object, value: new THREE.PerspectiveCamera() },
    mesh: { type: Object, value: new THREE.Mesh() },
    isAnimated: { type: Boolean, notify: true }
  },

  // listeners
  listeners:
  {
    tap: "tapHandler"
  },

  // handlers
  tapHandler: function()
  {
    this.toggleAnimation();
  },

  // public methods
  init: function()
  {
    this.width = this.offsetWidth;
    this.height = this.offsetHeight;

    this.init_renderer(this.width, this.height);
    this.init_camera(60.0, this.width / this.height, 0.1, 1000.0);
    this.init_scene();
  },

  init_renderer: function(width, height)
  {
    this.renderer.setSize(width, height);

    this.appendChild(this.renderer.domElement);
  },

  init_camera: function(fov, aspect, near, far, position)
  {
    this.camera.fov = fov;
    this.camera.aspect = aspect;
    this.camera.near = near;
    this.camera.far = far;
    this.camera.updateProjectionMatrix();

    this.camera.position.copy(new THREE.Vector3(0.0, 0.0, 10.0));
  },

  init_scene: function()
  {
    var geometry = new THREE.BoxGeometry(3.0, 3.0, 3.0);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.mesh.geometry = geometry;
    this.mesh.material = material;

    this.scene.add(this.mesh);
  },

  update: function()
  {
    if (this.isAnimated) { this.mesh.rotation.y += 0.025; }
  },

  toggleAnimation: function()
  {
    this.isAnimated = !this.isAnimated;
  },

  resize: function()
  {
    this.width = this.offsetWidth;
    this.height = this.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  },

  // fires when the element is inserted into the document
  attached: function()
  {
    this.init();

    // mandatory weirdness
    var scope = this;

    function render()
    {
      requestAnimationFrame(render);
      scope.renderer.render(scope.scene, scope.camera);
      scope.update();
    }
    render();

    function resize() { scope.resize(); }
    window.addEventListener("resize", resize);
  }
});
