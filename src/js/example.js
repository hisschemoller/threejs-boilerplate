import * as THREE from './3rdparty/threejs/build/three.module.js';
import { GUI } from './3rdparty/threejs/examples/jsm/libs/dat.gui.module.js';
import { addRenderCallback, getScene } from './world.js';

const API = {
  speed: 0.0005,
  get axesVisible() {
    return axes.visible;
  },
  set axesVisible(isVisible) {
    axes.visible = isVisible;
  },
  get gridVisible() {
    return grid.visible;
  },
  set gridVisible(isVisible) {
    grid.visible = isVisible;
  },
}

let axes, cube, grid;

export function setExample() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x222200 });
  cube = new THREE.Mesh(geometry, material);
  getScene().add(cube);
  
  axes = new THREE.AxesHelper(2);
  cube.add(axes);
  
  grid = new THREE.GridHelper();
  cube.add(grid);
  
  const gui = new GUI();
  gui.add(API, 'speed', 0.0001, 0.01).name('speed');
  gui.add(API, 'axesVisible').name('axes');
  gui.add(API, 'gridVisible').name('grid');

  addRenderCallback(render);
}

function render(time) {
  const rot = time * API.speed;
  cube.rotation.x = rot;
  cube.rotation.y = rot;
}

