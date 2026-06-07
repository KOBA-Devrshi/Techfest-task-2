import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:document.querySelector("#bg"),
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

camera.position.z = 30;

const starsGeometry = new THREE.BufferGeometry();

const starCount = 4000;

const positions = [];

for(let i=0;i<starCount;i++){

positions.push(
(Math.random()-0.5)*300,
(Math.random()-0.5)*300,
(Math.random()-0.5)*300
);

}

starsGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
positions,
3
)
);

const starsMaterial = new THREE.PointsMaterial({
color:0x00ffff,
size:0.5
});

const stars = new THREE.Points(
starsGeometry,
starsMaterial
);

scene.add(stars);

function createPlanet(color,size,x,y,z){

const geometry =
new THREE.SphereGeometry(size,32,32);

const material =
new THREE.MeshStandardMaterial({
color,
emissive:color
});

const planet =
new THREE.Mesh(
geometry,
material
);

planet.position.set(x,y,z);

scene.add(planet);

return planet;
}

const aiPlanet =
createPlanet(0x00ffff,4,-15,0,-40);

const robotPlanet =
createPlanet(0xff00ff,5,15,-20,-90);

const spacePlanet =
createPlanet(0xffff00,6,-10,-40,-140);

const startupPlanet =
createPlanet(0x00ff00,7,20,-60,-190);

const quantumPlanet =
createPlanet(0xffffff,8,0,-80,-250);

const light =
new THREE.PointLight(
0xffffff,
3
);

light.position.set(20,20,20);

scene.add(light);

const ambient =
new THREE.AmbientLight(
0xffffff,
1
);

scene.add(ambient);

function moveCamera(){

const t =
document.body.getBoundingClientRect().top;

camera.position.z =
30 + t * -0.05;

camera.position.y =
t * -0.01;

stars.rotation.y =
t * -0.0003;

}

document.body.onscroll =
moveCamera;

moveCamera();

let mouseX=0;
let mouseY=0;

document.addEventListener("mousemove",(e)=>{

mouseX =
(e.clientX/window.innerWidth)-0.5;

mouseY =
(e.clientY/window.innerHeight)-0.5;

});

function animate(){

requestAnimationFrame(animate);

aiPlanet.rotation.y+=0.01;
robotPlanet.rotation.y+=0.01;
spacePlanet.rotation.y+=0.01;
startupPlanet.rotation.y+=0.01;
quantumPlanet.rotation.y+=0.01;

camera.rotation.y =
mouseX*0.2;

camera.rotation.x =
mouseY*0.1;

renderer.render(
scene,
camera
);

}

animate();

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);
