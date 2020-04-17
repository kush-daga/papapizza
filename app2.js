const flightPath = {
    curviness: 0.2,
    autoRotate: false,
    values: [
        { x: 0, y: 100 },
        {
            x: 300,
            y: -10,
        },
        {
            x: 500,
            y: -40,
        },
        {
            x: 700,
            y: -80,
        },
        {
            x: 680,
            y: -100,
        },

        {
            x: 700,
            y: -160,
        },
        {
            x: 660,
            y: -200,
        },
        {
            x: 640,
            y: -250,
        },
        {
            x: 600,
            y: -300,
        },
        {
            x: 300,
            y: -400,
        },
        {
            x: 100,
            y: -640,
        },
        {
            x: 10,
            y: -1000,
        },
    ],
};
// function onScroll() {
//     var text = document.getElementById("test");
//     var lol = document.getElementById("animationObject");
//     var position = lol.getBoundingClientRect();
//     var x = position.left;
//     var y = position.top;
//     x = Math.floor(x);
//     y = Math.floor(y);
//     text.textContent = x + "/" + y;
// }
var fromSetting = {
    ease: Power1.easeInOut,
    zIndex: 2,
    opacity: 0,
};
var toSetting = {
    bezier: flightPath,
    fontSize: "0px",
    zIndex: -2,
    opacity: 6,
};
// window.addEventListener("scroll", onScroll);
const tween = new TimelineLite();
tween
    .fromTo("#animationObject", 2, fromSetting, toSetting)
    .fromTo("#animationObject2", 2, fromSetting, toSetting, "-=1")
    .fromTo("#animationObject3", 2, fromSetting, toSetting, "-=1")
    .fromTo("#animationObject4", 2, fromSetting, toSetting, "-=1")
    .fromTo("#animationObject5", 2, fromSetting, toSetting, "-=1");

const controller = new ScrollMagic.Controller();
const sceneScroll = new ScrollMagic.Scene({
    triggerElement: ".animation",
    duration: 4000,
    triggerHook: 0,
})
    .setTween(tween)
    .setPin(".animation")
    .addTo(controller);

//variables for setup

let containerPizzaSlice;
let cameraPizzaSlice;
let rendererPizzaSlice;
let scenePizzaSlice;
let pizzaSlice;

function init() {
    containerPizzaSlice = document.querySelector(".animation");
    //Create scene
    scenePizzaSlice = new THREE.Scene();
    const fov = 35;
    const aspect =
        containerPizzaSlice.clientWidth / containerPizzaSlice.clientHeight; //aspect ratio basically
    const near = 0.1; //near clipping distance
    const far = 500; //far clipping distance
    //CAMERA
    cameraPizzaSlice = new THREE.PerspectiveCamera(fov, aspect, near, far);
    cameraPizzaSlice.position.set(0, 0, 45);

    const ambientPizzaSlice = new THREE.AmbientLight(0x404040, 2);
    scenePizzaSlice.add(ambientPizzaSlice);
    const lightPizzaSlice = new THREE.DirectionalLight(0xffffff, 2);
    lightPizzaSlice.position.set(10, 50, 100);

    scenePizzaSlice.add(lightPizzaSlice);
    //RENDERER
    rendererPizzaSlice = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    rendererPizzaSlice.setSize(
        containerPizzaSlice.clientWidth,
        containerPizzaSlice.clientHeight
    );
    rendererPizzaSlice.setPixelRatio(window.devicePixelRatio);
    containerPizzaSlice.appendChild(rendererPizzaSlice.domElement);
    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("./pizza_slice/scene.gltf", function (gltf) {
        scenePizzaSlice.add(gltf.scene);
        pizzaSlice = gltf.scene.children[0];
        animate();
    });
}

init();

function onWindowResizeSlice() {
    cameraPizzaSlice.aspect =
        containerPizzaSlice.clientWidth / containerPizzaSlice.clientHeight;
    cameraPizzaSlice.updateProjectionMatrix();

    rendererPizzaSlice.setSize(
        containerPizzaSlice.clientWidth,
        containerPizzaSlice.clientHeight
    );
}

window.addEventListener("resize", onWindowResizeSlice);
var progress;
var positionY = 0;
function animate() {
    sceneScroll.on("progress", function (event) {
        // console.log("Scene progress changed to " + event.progress);
        progress = event.progress;
    });
    var state = sceneScroll.state();
    if (state === "DURING") {
        pizzaSlice.rotation.y = progress * Math.PI * 2;
        cameraPizzaSlice.position.set(0, 0, 55 - progress * 30);
    }
    pizzaSlice.rotation.x = -0.05;

    // console.log(pizzaSlice.rotation.z);
    pizzaSlice.rotation.z = 4.7;
    requestAnimationFrame(animate);

    rendererPizzaSlice.render(scenePizzaSlice, cameraPizzaSlice);
}
