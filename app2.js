const flightPath = {
    curviness: 1.55,
    autoRotate: false,
    values: [
        { x: 0, y: 100 },
        {
            x: 300,
            y: -10
        },
        {
            x: 500,
            y: -40
        },
        {
            x: 700,
            y: -80
        },
        {
            x: 680,
            y: -100
        },
        {
            x: 660,
            y: -120
        },
        {
            x: 600,
            y: -160
        },
        {
            x: 300,
            y: -320
        },
        {
            x: 100,
            y: -640
        },
        {
            x: 10,
            y: -1000
        }
    ]
};
function onScroll() {
    var text = document.getElementById("test");
    var lol = document.getElementById("animationObject");
    var position = lol.getBoundingClientRect();
    var x = position.left;
    var y = position.top;
    x = Math.floor(x);
    y = Math.floor(y);
    text.textContent = x + "/" + y;
}
window.addEventListener("scroll", onScroll);
const tween = new TimelineLite();
tween
    .fromTo(
        "#animationObject",
        1,
        {
            ease: Power1.easeInOut,
            x: 10,
            y: 200,
            height: "100px"
        },
        {
            bezier: flightPath,
            height: "0px"
        }
    )
    .fromTo(
        "#animationObject2",
        1,
        {
            ease: Power1.easeInOut,
            x: 10,
            y: 200,
            height: "100px"
        },
        {
            bezier: flightPath,
            height: "0px"
        },
        "-=0.5"
    )
    .fromTo(
        "#animationObject3",
        1,
        {
            ease: Power1.easeInOut,
            x: 10,
            y: 200,
            height: "100px"
        },
        {
            bezier: flightPath,
            height: "0px"
        },
        "-=0.5"
    )
    .fromTo(
        "#animationObject4",
        1,
        {
            ease: Power1.easeInOut,
            x: 10,
            y: 200,
            height: "100px"
        },
        {
            bezier: flightPath,
            height: "0px"
        },
        "-=0.5"
    )
    .fromTo(
        "#animationObject5",
        1,
        {
            ease: Power1.easeInOut,
            x: 10,
            y: 200,
            height: "100px"
        },
        {
            bezier: flightPath,
            height: "0px"
        },
        "-=0.5"
    );

const controller = new ScrollMagic.Controller();
const sceneScroll = new ScrollMagic.Scene({
    triggerElement: ".animation",
    duration: 4000,
    triggerHook: 0
})
    .setTween(tween)
    .setPin(".animation")
    .addIndicators()
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
    cameraPizzaSlice.position.set(0, 0, 50);

    const ambientPizzaSlice = new THREE.AmbientLight(0x404040, 2);
    scenePizzaSlice.add(ambientPizzaSlice);
    const lightPizzaSlice = new THREE.DirectionalLight(0xffffff, 2);
    lightPizzaSlice.position.set(10, 50, 100);

    scenePizzaSlice.add(lightPizzaSlice);
    //RENDERER
    rendererPizzaSlice = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    rendererPizzaSlice.setSize(
        containerPizzaSlice.clientWidth,
        containerPizzaSlice.clientHeight
    );
    rendererPizzaSlice.setPixelRatio(window.devicePixelRatio);
    containerPizzaSlice.appendChild(rendererPizzaSlice.domElement);
    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("./pizza_slice/scene.gltf", function(gltf) {
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
    sceneScroll.on("progress", function(event) {
        // console.log("Scene progress changed to " + event.progress);
        progress = event.progress;
    });
    var state = sceneScroll.state();
    if (state === "DURING") {
        pizzaSlice.rotation.y = progress * Math.PI;
    }
    pizzaSlice.rotation.x = -0.05;

    // console.log(pizzaSlice.rotation.z);
    pizzaSlice.rotation.z = 4.7;
    requestAnimationFrame(animate);

    rendererPizzaSlice.render(scenePizzaSlice, cameraPizzaSlice);
}
