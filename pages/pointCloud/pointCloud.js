// pages/pointCloud.js
import { createScopedThreejs } from 'threejs-miniprogram'
import registerOrbit from "../../test-cases/orbit"

Component({
  properties: {
    point: {
      type: String,
      value: ""
    },
  },

  data: {
  },
  
  observers: {
    'point': function(point) {
      
    }
  },

  attached() {
    var that = this;
    this.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        this.canvas = canvas
        const THREE = createScopedThreejs(canvas)
        this.THREE = THREE;

        this.initModel(THREE);
        const points = this.handleMatrixStream(this.properties.point);
        this.geometry = new THREE.BufferGeometry();//创建图形对象
        this.points = new THREE.Points(this.geometry, this.material);//将上述对象配置到点模型对象上
        this.scene.add(this.points); 

        function animate() {
          canvas.requestAnimationFrame(animate);
          that.controls.update()
          that.renderer.render(that.scene, that.camera);
        }
        
        animate();
        that.allowRenderPoint = true;

        that.interval = setInterval(() => {
          if (!that.allowRenderPoint) {
            return;
          }
          that.allowRenderPoint = false;
          const points = that.handleMatrixStream(that.properties.point);
          for (let i = 0; i < points.length; ++i) {
            let interval = points.length / 60 * 1000;
            setTimeout(() => {
              that.geometry.attributes.position = new that.THREE.BufferAttribute(new Float32Array(points[i]), 3);
              if (i == points.length - 1) {
                setTimeout(() => {
                  that.allowRenderPoint = true;
                }, interval);
              }
            }, interval * i);
          }
        }, 17);
      });
      
  },
  detached() {
    console.log("detached")
    clearInterval(this.interval);
  },

  
  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {
      this.canvas.dispatchTouchEvent({...e, type:'touchstart'})
    },
    touchMove(e) {
      this.canvas.dispatchTouchEvent({...e, type:'touchmove'})
    },
    touchEnd(e) {
      this.canvas.dispatchTouchEvent({...e, type:'touchend'})
    },
    handleMatrixStream(stream) {
      let frames = stream.split("abc").filter(item => item != '');
      var res = [];
      frames.forEach((frame) => {
        let frameBox = []
        frame = frame.split(" d ").filter(item => item != '');
        frame.forEach((point) => {
          point = point.split(" ").filter(item => item != '');
          point.forEach((position) => {
            frameBox.push(parseFloat(position));
          }); 
        });
        res.push(frameBox);
      });
      return res;
    },

    initModel(THREE) {
      this.camera = new THREE.PerspectiveCamera(45, this.canvas.width / this.canvas.height, 0.01, 100);
      this.camera.position.set(3, 3, 3);
      // this.camera.lookAt(new THREE.Vector3(100000, 1101000, 10120.120));

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xe0e0e0);

      var light = new THREE.HemisphereLight(0xffffff, 0x444444);
      light.position.set(0, 10, 0);
      this.scene.add(light);
      light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 20, 10);
      this.scene.add(light);

          // ground
      var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
      mesh.rotation.x = - Math.PI / 2;
      this.scene.add(mesh);
      var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
      grid.material.opacity = 0.2;
      grid.material.transparent = true;
      this.scene.add(grid);
    
      this.material = new THREE.PointsMaterial({
        color: 0x00ffff,//模型颜色
        size: 0.05//模型大小
      });//配置模型的材质对象        

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
      this.renderer.setSize(this.canvas.width, this.canvas.height);
      this.renderer.gammaOutput = true;
      this.renderer.gammaFactor = 2.2;

      const { OrbitControls } = registerOrbit(THREE)
      this.controls = new OrbitControls( this.camera, this.renderer.domElement );
      this.controls.update();
    },

  }
})
