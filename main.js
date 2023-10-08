import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

// GLTF?
// Graphics Library Transmission Format
// is a standard file format for three-dimensional scenes and models.

// .gltf(JSON/ASCII) or .glb(binary)
// 3차원 장면과 모델을 표현하는 파일 포맷

console.log(THREE);

// To actually be able to display anything with three,
// we need three things
// scene, camera, and renderer.
// so that we can render the scene with camera.

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, // fov, is the extent of the scene - the value is in degrees.
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near, clipping plane
  1000 // far. clipping plane, to get better performance
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// BufferGeometry => BoxGeometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
});
boxMaterial.castShadow = true;

// Mesh: Class representing triangular polygon mesh based objects.
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.set(0, 0, 0);
cube.castShadow = true;

// plane
const ceilGeometry = new THREE.PlaneGeometry(10, 10);
const ceilMaterial = new THREE.MeshStandardMaterial();
const ceil = new THREE.Mesh(ceilGeometry, ceilMaterial);
ceil.rotateX(-Math.PI * 0.5);
ceil.position.set(0, -1, 0);
ceil.receiveShadow = true;

window.addEventListener("click", () => {
  console.log("aa");
  console.log(currentIntersect);
});

scene.add(ceil);

// light
const spotLight = new THREE.SpotLight(
  0xffffff, // color
  500, // intensity
  100, // distance
  1 // angle
);
spotLight.position.set(1, 3, 1);
spotLight.map = new THREE.TextureLoader().load("./texture.tiff");
spotLight.lookAt(cube.position);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 15;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

const ambLight = new THREE.AmbientLight();

scene.add(cube);
scene.add(spotLight);
scene.add(ambLight);

// camera
camera.position.x = 5;
camera.position.y = 10;
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, -5, 0));

// const orbit = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  spotLight.position.x = Math.sin(Date.now() * 0.001) * 5;

  renderer.render(scene, camera);

  // 여기서부터 다시 이어나갑시다..
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
}

window.addEventListener("resize", () => {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
