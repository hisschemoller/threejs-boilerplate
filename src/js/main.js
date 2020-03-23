import * as THREE from './3rdparty/threejs/build/three.module.js';
import { addRenderCallback, getScene, setup } from './world.js';

setup();
addRenderCallback(render);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
getScene().add(cube);

function render(time) {
  const rot = time * 0.0005;
  cube.rotation.x = rot;
  cube.rotation.y = rot;
}
