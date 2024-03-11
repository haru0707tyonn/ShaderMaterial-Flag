import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shaders/vertexShader";
import fragmentShader from "./shaders/fragmentShader";
import * as dat from "lil-gui"; // UIデバッグを使うために必要　nom install lil-gui
import jpFlag from "./textures/jp-flag.png"; // 23 デプロイした場合などに画像パスが読み込まれないバグを防ぐ

// デバッグ
const gui = new dat.GUI({ width:300 }); // widthで横幅が広がる

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load(jpFlag); // 23

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
// console.log(geometry.attributes.uv); // 24

// Material 8
const material = new THREE.ShaderMaterial({ // shaderのマテリアル Rawは未加工　記述する必要がある
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  side: THREE.DoubleSide, // 平面の裏側も表示
  uniforms: { // 18 グローバル変数vertexShaderでもfragmentShaderでも使える
    uFrequency: { value: new THREE.Vector2(10, 5) }, // 19 二次元ベクトル　インポートするときは vec2で値を取得するときは.x , .y と記述する
    uTime: { value: 0 }, // 21
    uColor: { value: new THREE.Color("pink") }, // 22 #0000ffなどでもOK
    uTexture: { value: flagTexture },
  },
  // wireframe: true,
});

// デバッグを追加 20
gui
.add(material.uniforms.uFrequency.value, "x")
.min(0) // 最小値
.max(20) // 最大値
.step(0.001) // ステップ数
.name("frequencyX");
gui
  .add(material.uniforms.uFrequency.value, "y")
  .min(0) // 最小値
  .max(20) // 最大値
  .step(0.001) // ステップ数
  .name("frequencyY");

// Mesh
const mesh = new THREE.Mesh(geometry, material);
// mesh.rotation.x = Math.PI / 2;
mesh.scale.y = 2 / 3; // 26 大きさ変更
scene.add(mesh);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  //時間取得
  const elapsedTime = clock.getElapsedTime(); // 経過時間
  // console.log(elapsedTime);
  material.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
