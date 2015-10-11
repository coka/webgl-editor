Polymer
({
  is: 'editor-viewport',

  // member variables
  properties:
  {
    width: { type: Number, value: 0 },
    height: { type: Number, value: 0 },
    renderer: { type: Object, value: new THREE.WebGLRenderer({ antialias: true }) },
    scene: { type: Object, value: new THREE.Scene() },
    camera: { type: Object, value: new THREE.PerspectiveCamera() },
    mesh: { type: Object },
    rotation: { type: Object },
    animationStatus: { type: Boolean, notify: true },
  },

  // listeners
  listeners:
  {
    tap: 'tapHandler',
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

    this.initRenderer(this.width, this.height);
    this.initCamera(60.0, this.width / this.height, 0.1, 1000.0);
    this.initLighting();
    this.initScene();
  },

  initRenderer: function(width, height)
  {
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xcccccc);
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    this.appendChild(this.renderer.domElement);
  },

  initCamera: function(fov, aspect, near, far, position)
  {
    this.camera.fov = fov;
    this.camera.aspect = aspect;
    this.camera.near = near;
    this.camera.far = far;
    this.camera.updateProjectionMatrix();

    this.camera.position.copy(new THREE.Vector3(20.0, 20.0, 20.0));
    this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
  },

  initScene: function()
  {
    this.createGrid(10);

    var geometry = new THREE.BoxGeometry(5.0, 5.0, 5.0);
    var material = new THREE.MeshPhongMaterial({
      ambient: 0x444444,
      color: 0xee3987,
      shininess: 300,
      specular: 0x33AA33,
      shading: THREE.SmoothShading,
    });
    geometry.receiveShadow = true;
    geometry.castShadow = true;
    this.mesh.geometry = geometry;
    this.mesh.material = material;

    this.scene.add(this.mesh);
  },

  initLighting: function()
  {
    var ambient = new THREE.AmbientLight(0x666666);
    this.scene.add(ambient);
    var direct = new THREE.DirectionalLight(0xdfebff, 1.75);
    direct.position.set(0, 10, 10);
    direct.castShadow = true;
    direct.shadowCameraVisible = true;

    direct.shadowMapWidth = direct.shadowMapHeight = 2048;

    var DISTANCE = 50;

    direct.shadowCameraLeft = -DISTANCE;
    direct.shadowCameraRight = DISTANCE;
    direct.shadowCameraTop = DISTANCE;
    direct.shadowCameraBottom = -DISTANCE;

    direct.shadowCameraFar = 500;
    direct.shadowDarkness = 0.5;
    this.scene.add(direct);
  },

  createGrid: function(gridSize)
  {
    for (var i = -gridSize; i <= gridSize; i++)
    {
      var xLine;
      var zLine;
      var xGeometry;
      var zGeometry;
      var xMaterial;
      var zMaterial;

      xGeometry = new THREE.Geometry();
      xGeometry.vertices.push(new THREE.Vector3(-gridSize, 0, i));
      xGeometry.vertices.push(new THREE.Vector3(gridSize, 0, i));

      xMaterial = new THREE.LineBasicMaterial();
      if (i === 0) {
        xMaterial.color = new THREE.Color(0xff0000);
      } else {
        xMaterial.color = new THREE.Color(0x3d3d3d);
      }

      xLine = new THREE.Line(xGeometry, xMaterial);

      this.scene.add(xLine);

      zGeometry = new THREE.Geometry();
      zGeometry.vertices.push(new THREE.Vector3(i, 0, -gridSize));
      zGeometry.vertices.push(new THREE.Vector3(i, 0,  gridSize));

      zMaterial = new THREE.LineBasicMaterial();
      if (i === 0) {
        zMaterial.color = new THREE.Color(0x0000ff);
      } else {
        zMaterial.color = new THREE.Color(0x3d3d3d);
      }

      zLine = new THREE.Line(zGeometry, zMaterial);

      this.scene.add(zLine);
    }
  },

  update: function()
  {
    if (this.animationStatus) { this.set('rotation.y', this.rotation.y + 1.0); }
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
    var _this = this;

    function render()
    {
      requestAnimationFrame(render);
      _this.renderer.render(_this.scene, _this.camera);
      _this.update();
    }

    render();

    function resize() { _this.resize(); }

    window.addEventListener('resize', resize);
  },
});
