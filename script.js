var MyApp = {}; // Globally scoped object

//document.getElementById("calculateButton").addEventListener("click", step1, false);

//import * as THREE from './build/three.module.js';
import * as THREE from 'https://unpkg.com/three@v0.138.0/build/three.module.js';


//import * as SkeletonUtils from './jsm/utils/SkeletonUtils.js';

//import { OrbitControls } from './jsm/controls/OrbitControls.js';
//import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';

//import { OrbitControls } from 'https://unpkg.com/three@v0.138.0/examples/jsm/controls/OrbitControls.js';
//import { GLTFLoader } from 'https://unpkg.com/three@v0.138.0/examples/jsm/loaders/GLTFLoader.js';

//import { RGBELoader } from './jsm/loaders/RGBELoader.js';
//import { RoughnessMipmapper } from './jsm/utils/RoughnessMipmapper.js';

// Trigger three.js on scroll
var fired = false;
window.addEventListener("scroll", function () {
    if (window.pageYOffset >= 500 && fired === false) {
        step1();
        fired = true;
    } else if (window.pageYOffset < 500 && fired === true) {
        fired = false
    }
}, true)

//function fire() { console.log("Test OK") }


// This is the entire three.js script to be executed
function step1() {

    // Convert all units in kg
    MyApp.number = document.getElementById("inputAmountCO2").value;

    // Define validity range (otherwise too many objects slow down the rendering)... It can be resolved with instances in the future 
    if (MyApp.number < 1 || MyApp.number > 50000) {
        alert('Please insert a number from 1 to 50000 Kg')
        return
    }

    // Define size of containers (kg)
    MyApp.gasCanister_size = 13
    MyApp.tankerTruck_size = 20000
    MyApp.tankerShip_size = 45000000 // This is just for graphical representation, gas tanker ships are larger

    // Write how many containers can store the input CO2 quantity
    if (MyApp.number > 0 && MyApp.number <= MyApp.tankerTruck_size) { // Gas canister
        document.getElementById("text_CO2_storage").innerHTML = MyApp.objNumb;
        MyApp.objNumb = Math.ceil(MyApp.number / MyApp.gasCanister_size);
        if (MyApp.objNumb==1){
            document.getElementById("text_CO2_storage").innerHTML = MyApp.number + " kg of CO2 in liquid form can be contained in " + MyApp.objNumb + " gas canister (" + MyApp.gasCanister_size + "kg each).";
        } else {
            document.getElementById("text_CO2_storage").innerHTML = MyApp.number + " kg of CO2 in liquid form can be contained in " + MyApp.objNumb + " gas canisters (" + MyApp.gasCanister_size + "kg each).";
        };
        MyApp.Storage_Dir = "models/gltf/low-poly_gas_canister/";
        MyApp.Storage_ModelName = "scene.gltf";
        [MyApp.location_x_storage, MyApp.location_y_storage] = grid_layout(MyApp.objNumb, 0.5);
        MyApp.Storage_cameraPosition = [-3, 1, 3];
        MyApp.Storage_cameraRotation = [-15, -45, -0];
    }
    else if (MyApp.number > MyApp.tankerTruck_size && MyApp.number <= MyApp.tankerShip_size) { // Tanker truck
        document.getElementById("text_CO2_storage").innerHTML = MyApp.objNumb;
        MyApp.objNumb = Math.ceil(MyApp.number / MyApp.tankerTruck_size);
        if (MyApp.objNumb==1){
            document.getElementById("text_CO2_storage").innerHTML = MyApp.number + " kg of CO2 in liquid form can be contained in " + MyApp.objNumb + " tanker truck (" + MyApp.tankerTruck_size + "kg each).";
        } else {
            document.getElementById("text_CO2_storage").innerHTML = MyApp.number + " kg of CO2 in liquid form can be contained in " + MyApp.objNumb + " tanker trucks (" + MyApp.tankerTruck_size + "kg each).";
        };        
        MyApp.Storage_Dir = "models/gltf/low_poly_truck_tank/";
        MyApp.Storage_ModelName = "scene.gltf";
        [MyApp.location_x_storage, MyApp.location_y_storage] = grid_layout(MyApp.objNumb, 10);
        MyApp.Storage_cameraPosition = [-30, 10, 30];
        MyApp.Storage_cameraRotation = [-15, -45, -15];
    }
    else if (MyApp.number > MyApp.tankerShip_size && MyApp.number <= MyApp.tankerShip_size * 1000) { // Tanker ship
        document.getElementById("text_CO2_storage").innerHTML = MyApp.objNumb;
        MyApp.objNumb = Math.ceil(MyApp.number / MyApp.tankerShip);
        if (MyApp.objNumb==1){
            document.getElementById("text_CO2_storage").innerHTML = MyApp.number + " kg of CO2 in liquid form can be contained in " + MyApp.objNumb + " tanker ship (" + MyApp.tankerShip_size + "kg each).";
        } else {
            document.getElementById("text_CO2_storage").innerHTML = MyApp.number + " kg of CO2 in liquid form can be contained in " + MyApp.objNumb + " tanker ships (" + MyApp.tankerShip_size + "kg each).";
        };         
        MyApp.Storage_Dir = "models/gltf/low_poly_cargo_ship/";
        MyApp.Storage_ModelName = "scene.gltf";
        [MyApp.location_x_storage, MyApp.location_y_storage] = grid_layout(MyApp.objNumb, 150);
        MyApp.Storage_cameraPosition = [-60, 10, 60];
        MyApp.Storage_cameraRotation = [-15, -45, -15];
    };

    // Define size of sequestration
    MyApp.tree_size = 500 // Assuming a tree can absorb 500 kg of CO2 in 30 years, its expected lifetime
    //MyApp.rockAbs_size = 100;

    // Write how many elements are necessary to absorb the input CO2 quantity 
    //if (document.getElementById("radio_trees").checked) {
    MyApp.seqNumb = Math.ceil(MyApp.number / MyApp.tree_size); 
    if (MyApp.seqNumb==1){
        document.getElementById("text_CO2_absorption").innerHTML = "This amount can be absorbed by " + MyApp.seqNumb + " tree.";
    } else {
        document.getElementById("text_CO2_absorption").innerHTML = "This amount can be absorbed by " + MyApp.seqNumb + " trees.";
    }
    MyApp.Sequestration_Dir = "models/gltf/giant_low_poly_tree/";
    MyApp.Sequestration_ModelName = "scene.gltf";
    [MyApp.location_x_sequestration, MyApp.location_y_sequestration] = grid_layout(MyApp.seqNumb, 6);
    MyApp.Sequestration_cameraPosition = [-30, 10, 30];
    MyApp.Sequestration_cameraRotation = [-15, -45, -11];

    //} else if (document.getElementById("radio_rock").checked) {
    //MyApp.seqNumb = Math.ceil(MyApp.number / MyApp.rockAbs_size); //100 kg co2 every m3 of rock... TO BE FIXED
    //document.getElementById("text_CO2_absorption").innerHTML = "This amount can be absorbed by geologic transformation to a calcite block with volume " + MyApp.seqNumb + " m3.";
    //MyApp.Sequestration_Dir = "models/gltf/low_poly_stone_block/";
    //MyApp.Sequestration_ModelName = "scene.gltf";
    // };


    // Distribute elements in a grid
    function grid_layout(numObj, spacing) {

        const columns = Math.ceil(Math.sqrt(numObj));
        const rows = columns;
        let x_coord = []
        let y_coord = []

        const x0 = 0 - (columns-1) * spacing / 2;
        const y0 = 0 - (columns-1) * spacing / 2;

        let objcount = 0;

        for (let i = 0; i < columns; i++) {

            for (let j = 0; j < rows; j++) {

                x_coord.push(x0 + spacing * i);
                y_coord.push(y0 + spacing * j);

                objcount = objcount + 1

                if (objcount == (numObj)) {
                    return [x_coord, y_coord]
                };

            };
        };

    };


    // Three.js rendering

    function empty(elem) {
        while (elem.lastChild) elem.removeChild(elem.lastChild);
    }

    main(MyApp);

    function main(MyApp) {

        // Pre-initialization 

        // Clean up variables (useful when running the script twice)
        if (window.scene) {
            cancelAnimationFrame(this.id);// Stop the animation
            this.renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
            this.scene = null;
            this.projector = null;
            this.camera = null;
            this.controls = null;

            this.element = null;
            this.content = null;
            this.sceneElement = null;
            this.scenes = null;
            this.texture = null;
            this.loader = null;
            this.canvas = null;
            this.renderer = null;
            empty(this.modelContainer);
        }

        let renderer, canvas;

        const scenes = [];

        init(MyApp);
        animate();

        // Initialization 
        function init(MyApp) {

            canvas = document.getElementById("c");

            const content = document.getElementById('content');

            const list_scene_name = ["Storage", "Sequestration"];
            const list_scene_div_id = ["div_storage", "div_sequestration"];

            // Do this for every div
            for (let i = 0; i < list_scene_name.length; i++) {

                const scene = new THREE.Scene();
                scene.userData.element = document.getElementById(list_scene_div_id[i])
                const camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 200);

                //new RGBELoader().setPath('textures/equirectangular/').load('royal_esplanade_1k.hdr', function (texture) {
                //texture.mapping = THREE.EquirectangularReflectionMapping;
                //scene.background = texture;
                //scene.environment = texture;

                scene.background = new THREE.Color(0xa0a0a0);
                scene.fog = new THREE.Fog(0xa0a0a0, 50, 200);

/*                 const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
                hemiLight.position.set(0, 100, 0);
                scene.add(hemiLight); */

                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
                scene.add(ambientLight);

                const dirLight = new THREE.DirectionalLight(0xffffff);
                dirLight.position.set(60, 160, 100);
                dirLight.castShadow = true;
                dirLight.shadow.camera.top = 50;
                dirLight.shadow.camera.bottom = - 25;
                dirLight.shadow.camera.left = - 25;
                dirLight.shadow.camera.right = 25;
                dirLight.shadow.camera.near = 0.1;
                dirLight.shadow.camera.far = 200;
                dirLight.shadow.mapSize.set(1024, 1024);
                scene.add(dirLight);

                const ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
                ground.rotation.x = - Math.PI / 2;
                ground.position.y = 0;
                ground.receiveShadow = true;
                scene.add(ground);

                // model

                // use of RoughnessMipmapper is optional
                //const roughnessMipmapper = new RoughnessMipmapper( renderer );


                if (i == 0) { // Plot the storage objects
                    const loader = new GLTFLoader().setPath(MyApp.Storage_Dir);
                    camera.position.set(MyApp.Storage_cameraPosition[0], MyApp.Storage_cameraPosition[1], MyApp.Storage_cameraPosition[2]);
                    camera.rotation.set(MyApp.Storage_cameraRotation[0], MyApp.Storage_cameraRotation[1], MyApp.Storage_cameraRotation[2]);
                    scene.userData.camera = camera;
                    for (let j = 0; j < Math.ceil(MyApp.objNumb); j++) {
                        loader.load(MyApp.Storage_ModelName, function (gltf) {
                            gltf.scene.position.set(MyApp.location_x_storage[j], 0, MyApp.location_y_storage[j]);
                            gltf.scene.traverse(function (node) {

                                if (node.isMesh) { node.castShadow = true; }

                            });
                            scene.add(gltf.scene);
                        });
                    };
                } else if (i == 1) { // Plot the sequestration objects
                    const loader = new GLTFLoader().setPath(MyApp.Sequestration_Dir);
                    camera.position.set(MyApp.Sequestration_cameraPosition[0], MyApp.Sequestration_cameraPosition[1], MyApp.Sequestration_cameraPosition[2]);
                    camera.rotation.set(MyApp.Sequestration_cameraRotation[0], MyApp.Sequestration_cameraRotation[1], MyApp.Sequestration_cameraRotation[2]);
                    scene.userData.camera = camera;
                    for (let j = 0; j < Math.ceil(MyApp.seqNumb); j++) {
                        loader.load(MyApp.Sequestration_ModelName, function (gltf) {
                            gltf.scene.position.set(MyApp.location_x_sequestration[j], 0, MyApp.location_y_sequestration[j]);
                            gltf.scene.scale.set(1, 0.5+Math.random(), 1);

                            gltf.scene.traverse(function (node) {

                                if (node.isMesh) { node.castShadow = true; }

                            });
                            scene.add(gltf.scene);
                        });
                    };
                }

                //});
                const controls = new OrbitControls(scene.userData.camera, scene.userData.element);
                controls.minDistance = 1;
                controls.maxDistance = 100;
                controls.enablePan = true;
                controls.enableZoom = true;
                controls.enableDamping = true;
                controls.maxPolarAngle = Math.PI / 2.25;
                scene.userData.controls = controls;

                scenes.push(scene);

            };

            renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.setClearColor(0xffffff, 1);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

            render();

        }

        function updateSize() {

            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            if (canvas.width !== width || canvas.height !== height) {

                renderer.setSize(width, height, false);
            }

        }


        function animate() {

            requestAnimationFrame(animate);
            render();
            //requestAnimationFrame(animate);

            //setTimeout( function() {
            //    requestAnimationFrame( animate );
            //}, 1000 / 30 );
        }

        function render() {
            updateSize();


            // The following is to make the canvas look good even when resizing the page
            canvas.style.transform = `translateY(${window.scrollY}px)`;
            renderer.setClearColor(0xffffff);
            renderer.setScissorTest(false);
            renderer.clear();
            renderer.setClearColor(0xe0e0e0);
            renderer.setScissorTest(true);

            scenes.forEach(function (scene) {

                // get the element that is a place holder for where we want to
                // draw the scene
                const element = scene.userData.element;

                // get its position relative to the page's viewport
                const rect = element.getBoundingClientRect();

                // check if it's offscreen. If so skip it
                if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
                    rect.right < 0 || rect.left > renderer.domElement.clientWidth) {

                    return; // it's off screen

                };

                // set the viewport
                const width = rect.right - rect.left;
                const height = rect.bottom - rect.top;
                const left = rect.left;
                const bottom = renderer.domElement.clientHeight - rect.bottom;

                renderer.setViewport(left, bottom, width, height);
                renderer.setScissor(left, bottom, width, height);

                const camera = scene.userData.camera;

                renderer.render(scene, camera);
            });
        };

    };

};
