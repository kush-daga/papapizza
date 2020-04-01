//variables for setup

let container;
let camera;
let renderer;
let scene;
let pizza;

function init1() {
    container = document.querySelector(".scene");

    //Create scene
    scene = new THREE.Scene();
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight; //aspect ratio basically
    const near = 0.1; //near clipping distance
    const far = 500; //far clipping distance
    //CAMERA
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 35, 210);

    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(10, 50, 300);

    scene.add(light);
    //RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    //Load Model
    let loader1 = new THREE.GLTFLoader();
    loader1.load("./pizza/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        pizza = gltf.scene.children[0];
        animate1();
    });
}
key = 1;
count = 1;
sign = 1;
time = 1;
function animate1() {
    requestAnimationFrame(animate1);
    key++;
    time++;
    // console.log(pizza.rotation.x);
    pizza.rotation.z += -0.005;
    pizza.rotation.x += sign * 0.002;
    // console.log(key, "//", count, "//", sign);
    pizza.rotation.y += 0.005;
    if (key > 500) {
        pizza.rotation.y -= 0.015;
        pizza.rotation.x -= sign * 0.004;
    }
    if (key > 800) {
        key = 1;
        count++;
    }
    if (count === 3) {
        sign = sign * -1;
        count = 1;
    }

    if (time > 2500) {
        pizza.rotation.x = -1.2;
        pizza.rotation.y = 0;
        pizza.rotation.z += 0.003;
    }
    renderer.render(scene, camera);
}
init1();

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
