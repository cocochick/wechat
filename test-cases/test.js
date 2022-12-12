import registerOrbit from "./orbit"

var geometry, _canvas, vertices;
var camera, scene, renderer, controls;

export function drawPoint(canvas, THREE, points) {
  var attribute = new THREE.BufferAttribute(new Float32Array(points), 3);
  geometry.attributes.position = attribute;
  setCanvas(canvas)
  animate();
}

function setCanvas(canvas) {
  _canvas = canvas;
}

function animate() {
  _canvas.requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);
}

export function initModel(canvas, THREE) {
  init();
  function init() {
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.01, 100);
    camera.position.set(0, 0, 0);
    //camera.lookAt(new THREE.Vector3(0, 2, 0));
    camera.lookAt(new THREE.Vector3(-1, 1, -1));
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    // scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
    // clock = new THREE.Clock();
    // lights
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    scene.add(light);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    scene.add(light);
    // ground
    /*
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    scene.add(mesh);
    var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);
    */
    // material
  
    var material = new THREE.PointsMaterial({
      color: 0x00ffff,//模型颜色
      size: 0.05//模型大小
    });//配置模型的材质对象        
    function initpoint() {
      geometry = new THREE.BufferGeometry();//创建图形对象
      vertices = new Float32Array();//创建图形的顶点对象
      let points = new THREE.Points(geometry, material);//将上述对象配置到点模型对象上
      scene.add(points);
    };
    initpoint();


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
    renderer.setSize(canvas.width, canvas.height);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    const { OrbitControls } = registerOrbit(THREE)
    controls = new OrbitControls( camera, renderer.domElement );

    //camera.position.set( 5, 5, 10 );
    camera.position.set(0, 0, 1 );
    controls.update();
  }
}