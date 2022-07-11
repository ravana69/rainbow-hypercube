console.clear();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var group = new THREE.Group();

var light = new THREE.PointLight(0xffffff, 1.8, 80);
scene.add(light);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 100, 0);
scene.add(spotLight);

var geometry = new THREE.CubeGeometry(30, 30, 30);
var texture = new THREE.TextureLoader().load( 'https://mamboleoo.be/CodePen/random/rainbowPattern.png' );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
gsap.to(texture.offset, {
  y: 1,
  duration: 5,
  repeat: -1,
  ease: "none"
});
var material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.BackSide,
  alphaTest: 0.6,
  depthTest: true,
  map: texture
});

for (let i = 0; i < 10; i++) {
  var ball = new THREE.Mesh(geometry, material);
  ball.scale.x = ((i + 1) / 5) * 1.5;
  ball.scale.y = ((i + 1) / 5) * 1.5;
  ball.scale.z = ((i + 1) / 5) * 1.5;
  ball.rotation.x = i % 2 == 0 ? -Math.PI : 0;
  ball.rotation.y = i % 2 == 0 ? -Math.PI : 0;
  group.add(ball);
}
scene.add(group);

camera.position.z = 40;

gsap.to(group.rotation, {
  y: Math.PI * 2,
  duration: 100,
  ease: "none",
  repeat: -1
});
gsap.to(group.rotation, {
  z: Math.PI * 2,
  duration: 15,
  ease: "power2.inOut",
  yoyo: true,
  repeat: -1
});
camera.position.z = 5;
gsap.to(camera.position, {
  z: 60,
  duration: 15,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true
});

var animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();
