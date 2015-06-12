Polymer
({
  is: "editor-viewport",

  // member variables
  properties:
  {
    width: { type: Number, value: 0 },
    height: { type: Number, value: 0 },
    renderer: { type: Object, value: new THREE.WebGLRenderer({ antialias: true }) },
    scene: { type: Object, value: new THREE.Scene() },
    camera: { type: Object, value: new THREE.PerspectiveCamera() },
    mesh: { type: Object, value: new THREE.Mesh() },
    translateX: { type: Number, notify: true, observer: "translateXChanged" },
    translateY: { type: Number, notify: true, observer: "translateYChanged" },
    translateZ: { type: Number, notify: true, observer: "translateZChanged" },
    rotateX: { type: Number, notify: true, observer: "rotateXChanged" },
    rotateY: { type: Number, notify: true, observer: "rotateYChanged" },
    rotateZ: { type: Number, notify: true, observer: "rotateZChanged" },
    scaleX: { type: Number, notify: true, observer: "scaleXChanged" },
    scaleY: { type: Number, notify: true, observer: "scaleYChanged" },
    scaleZ: { type: Number, notify: true, observer: "scaleZChanged" },
    animationStatus: { type: Boolean, notify: true }
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

  // observer functions
  translateXChanged: function() { this.mesh.position.x = this.translateX; },
  translateYChanged: function() { this.mesh.position.y = this.translateY; },
  translateZChanged: function() { this.mesh.position.z = this.translateZ; },
  rotateXChanged:    function() { this.mesh.rotation.x = this.rotateX *  Math.PI / 180.0; },
  rotateYChanged:    function() { this.mesh.rotation.y = this.rotateY *  Math.PI / 180.0; },
  rotateZChanged:    function() { this.mesh.rotation.z = this.rotateZ *  Math.PI / 180.0; },
  scaleXChanged:     function() { this.mesh.scale.x = this.scaleX; },
  scaleYChanged:     function() { this.mesh.scale.y = this.scaleY; },
  scaleZChanged:     function() { this.mesh.scale.z = this.scaleZ; },

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
    this.renderer.setClearColor(0xcccccc);

    this.appendChild(this.renderer.domElement);
  },

  init_camera: function(fov, aspect, near, far, position)
  {
    this.camera.fov = fov;
    this.camera.aspect = aspect;
    this.camera.near = near;
    this.camera.far = far;
    this.camera.updateProjectionMatrix();

    this.camera.position.copy(new THREE.Vector3(20.0, 20.0, 20.0));
    this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
  },

  init_scene: function()
  {
    this.create_grid(10);

    var geometry = new THREE.BoxGeometry(5.0, 5.0, 5.0);
    var material = new THREE.MeshBasicMaterial({ color: 0xee3987 });
    this.mesh.geometry = geometry;
    this.mesh.material = material;

    this.scene.add(this.mesh);
  },

  create_grid: function(gridSize)
  {
    for (var i = -gridSize; i <= gridSize; i++)
    {
      var xLine, zLine, xGeometry, zGeometry, xMaterial, zMaterial;

      xGeometry = new THREE.Geometry();
      xGeometry.vertices.push(new THREE.Vector3(-gridSize, 0, i));
      xGeometry.vertices.push(new THREE.Vector3( gridSize, 0, i));

      xMaterial = new THREE.LineBasicMaterial();
      if (i === 0) { xMaterial.color = new THREE.Color(0xff0000); }
      else         { xMaterial.color = new THREE.Color(0x3d3d3d); }

      xLine = new THREE.Line(xGeometry, xMaterial);

      this.scene.add(xLine);

      zGeometry = new THREE.Geometry();
      zGeometry.vertices.push(new THREE.Vector3(i, 0, -gridSize));
      zGeometry.vertices.push(new THREE.Vector3(i, 0,  gridSize));

      zMaterial = new THREE.LineBasicMaterial();
      if (i === 0) { zMaterial.color = new THREE.Color(0x0000ff); }
      else         { zMaterial.color = new THREE.Color(0x3d3d3d); }

      zLine = new THREE.Line(zGeometry, zMaterial);

      this.scene.add(zLine);
    }
  },

  update: function()
  {
    if (this.animationStatus) { this.rotateY += 1.0; }
  },

  toggleAnimation: function()
  {
    this.animationStatus = !this.animationStatus;
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
