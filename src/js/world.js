import * as THREE from './3rdparty/threejs/build/three.module.js';
import { OrbitControls } from './3rdparty/threejs/examples/jsm/controls/OrbitControls.js';

const {
  AxesHelper,
  BoxGeometry,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} = THREE;

const defaults = {
  canvasSelector: '#c',
  isDev: true,
};
const callbacks = [];

let camera, renderer, scene, settings;

/**
 * 
 * @param {*} callback 
 */
export function addRenderCallback(callback) {
  callbacks.push(callback);
}

export function getCamera() {
  return camera;
}

export function getScene() {
  return scene;
}

/**
 * General setup.
 * @param {*} config 
 */
export function setup(config = {}) {
  settings = { ...defaults, ...config };
  setupWorld();
  requestAnimationFrame(render);
}

/**
 * Render the 3D scene.
 * @param {Number} time 
 */
function render(time) {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  callbacks.forEach(callback => callback(time));
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

/**
 * 
 * @param {*} renderer 
 * @returns {Boolean} True if the size changed.
 */
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const { clientHeight, clientWidth } = canvas;
  const needResize = canvas.width !== clientWidth || canvas.height !== clientHeight;
  if (needResize) {
    renderer.setSize(clientWidth, clientHeight, false);
  }
  return needResize;
}

/**
 * Setup the renderer and world basics.
 */
function setupWorld() {
  const canvas = document.querySelector(settings.canvasSelector);
  renderer = new WebGLRenderer({ canvas });

  scene = new Scene();

  // camera
  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  // light
  const color = 0xffffff;
  const intensity = 1;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  if (settings.isDev) {

    // axes
    const length = 5;
    const axes = new AxesHelper(length);
    axes.material.depthTest = true;
    axes.renderOrder = 1;
    scene.add(axes);

    // grid
    const grid = new GridHelper(10, 10, 0xcccccc, 0xcccccc);
    grid.position.set(0, 0, 0);
    scene.add(grid);

    // orbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();
  }
}
