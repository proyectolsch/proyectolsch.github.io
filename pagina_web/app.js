
let scene, camera, renderer, clock, deltaTime, totalTime;

let arToolkitSource, arToolkitContext;

let video1; //Video
let markerRoot; 
let mesh0;

let markerRoot1; //Voval A
let mesh1;

let markerRoot2; //Vocal E
let mesh2;

let markerRoot3; //Vocal I
let mesh3;

let markerRoot4; //Vocal O
let mesh4;

let markerRoot5; //Vocal U
let mesh5;

let markerRoot6; //Bienvenida
let mesh6;

let markerRoot7; //Contexto
let mesh7;

let markerRoot8; //Prototipo
let mesh8;

let raycaster; //permite apuntar o detectar objetos en nuestra aplicacion  
let mouse = new THREE.Vector2();
let INTERSECTED; //guarda info sobre los objetos intersectados por mi raycast
let objects = []; //guarda los objetos que quiero detectar


initialize();
animate();

function initialize()
{
	scene = new THREE.Scene();

	let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
	scene.add( ambientLight );
				
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize( 1920, 1080 );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	document.body.appendChild( renderer.domElement );

	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;
	

	//raycaster
	raycaster = new THREE.Raycaster();

	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////

	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	});

	function onResize()
	{
		arToolkitSource.onResize()	
		arToolkitSource.copySizeTo(renderer.domElement)	
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
		}	
	}

	arToolkitSource.init(function onReady(){
		onResize()
	});
	
	// handle resize event
	window.addEventListener('resize', function(){
		onResize()
	});
	
	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////	

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});
	
	// copy projection matrix to camera when initialization complete
	arToolkitContext.init( function onCompleted(){
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	// build markerControls

	//MARKER 0 = Video
	markerRoot = new THREE.Group();
	scene.add(markerRoot);
	let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
		type: 'pattern', patternUrl: "data/pv.patt",
	})

	let geometry =  new THREE.PlaneGeometry(5,3);

	video1 =  document.getElementById('video1');
	let texture =  new THREE.VideoTexture(video1);
	texture.minFilter =  THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.format =  THREE.RGBFormat;
	video1.pause();
	
	let material =  new THREE.MeshBasicMaterial({map: texture});
	mesh0 =  new THREE.Mesh(geometry, material);
	mesh0.name= "video";
	mesh0.rotation.x =  -Math.PI/2;
	markerRoot.add(mesh0);
	objects.push(mesh0);

	//MARKER 1 = Vocal A
	markerRoot1 = new THREE.Group();
	scene.add(markerRoot1);
	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {type: 'pattern', patternUrl: "data/p1a.patt"})
	let geometry1 = new THREE.PlaneGeometry( 3, 2);
    let loader1 =  new THREE.TextureLoader();
    let texture1 =  loader1.load('./textures/la.png');
    let material1 =  new THREE.MeshBasicMaterial(
        {
            map: texture1,         
        }
    ); 
    let plane1 = new THREE.Mesh(geometry1, material1);
    plane1.rotation.x = -Math.PI/2;
    markerRoot1.add(plane1);

	//MARKER 2 = Vocal E
	markerRoot2 = new THREE.Group();
	scene.add(markerRoot2);
	let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {type: 'pattern', patternUrl: "data/p2e.patt"})
	let geometry2 = new THREE.PlaneGeometry( 3, 2);
    let loader2 =  new THREE.TextureLoader();
    let texture2 =  loader2.load('./textures/le.png');
    let material2 =  new THREE.MeshBasicMaterial(
        {
            map: texture2,         
        }
    ); 
    let plane2 = new THREE.Mesh(geometry2, material2);
    plane2.rotation.x = -Math.PI/2;
    markerRoot2.add(plane2);
	
	//MARKER 3 = Vocal I
	markerRoot3 = new THREE.Group();
	scene.add(markerRoot3);
	let markerControls3 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot3, {type: 'pattern', patternUrl: "data/p3i.patt"})
	let geometry3 = new THREE.PlaneGeometry( 3, 2);
    let loader3 =  new THREE.TextureLoader();
    let texture3 =  loader3.load('./textures/li.png');
    let material3 =  new THREE.MeshBasicMaterial(
        {
            map: texture3,         
        }
    ); 
    let plane3 = new THREE.Mesh(geometry3, material3);
    plane3.rotation.x = -Math.PI/2;
    markerRoot3.add(plane3);

	//MARKER 4 = Vocal O
	markerRoot4 = new THREE.Group();
	scene.add(markerRoot4);
	let markerControls4 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot4, {type: 'pattern', patternUrl: "data/p4o.patt"})
	let geometry4 = new THREE.PlaneGeometry( 3, 2);
    let loader4 =  new THREE.TextureLoader();
    let texture4 =  loader4.load('./textures/lo.png');
    let material4 =  new THREE.MeshBasicMaterial(
        {
            map: texture4,         
        }
    ); 
    let plane4 = new THREE.Mesh(geometry4, material4);
    plane4.rotation.x = -Math.PI/2;
    markerRoot4.add(plane4);

	//MARKER 5 = Vocal U
	markerRoot5 = new THREE.Group();
	scene.add(markerRoot5);
	let markerControls5 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot5, {type: 'pattern', patternUrl: "data/p5u.patt"})
	let geometry5 = new THREE.PlaneGeometry( 3, 2);
    let loader5 =  new THREE.TextureLoader();
    let texture5 =  loader5.load('./textures/lu.png');
    let material5 =  new THREE.MeshBasicMaterial(
        {
            map: texture5,         
        }
    ); 
    let plane5 = new THREE.Mesh(geometry5, material5);
    plane5.rotation.x = -Math.PI/2;
    markerRoot5.add(plane5);

	//MARKER 6 = Bienvenida
	markerRoot6 = new THREE.Group();
	scene.add(markerRoot6);
	let markerControls6 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot6, {type: 'pattern', patternUrl: "data/pb.patt"})
	let geometry6 = new THREE.PlaneGeometry( 5, 4);
    let loader6 =  new THREE.TextureLoader();
    let texture6 =  loader6.load('./textures/bienvenida.jpeg');
    let material6 =  new THREE.MeshBasicMaterial(
        {
            map: texture6,         
        }
    ); 
    let plane6 = new THREE.Mesh(geometry6, material6);
    plane6.rotation.x = -Math.PI/2;
    markerRoot6.add(plane6);

	//MARKER 7 = Contexto
	markerRoot7 = new THREE.Group();
	scene.add(markerRoot7);
	let markerControls7 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot7, {type: 'pattern', patternUrl: "data/pc.patt"})
	let geometry7 = new THREE.PlaneGeometry( 5, 4);
    let loader7 =  new THREE.TextureLoader();
    let texture7 =  loader7.load('./textures/contexto.jpeg');
    let material7 =  new THREE.MeshBasicMaterial(
        {
            map: texture7,         
        }
    ); 
    let plane7 = new THREE.Mesh(geometry7, material7);
    plane7.rotation.x = -Math.PI/2;
    markerRoot7.add(plane7);

	//MARKER 8 = Prototipo
	markerRoot8 = new THREE.Group();
	scene.add(markerRoot8);
	let markerControls8 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot8, {type: 'pattern', patternUrl: "data/pp.patt"})
	let geometry8 = new THREE.PlaneGeometry( 4, 2);
    let loader8 =  new THREE.TextureLoader();
    let texture8 =  loader8.load('./textures/prototipo.png');
    let material8=  new THREE.MeshBasicMaterial(
        {
            map: texture8,         
        }
    ); 
    let plane8 = new THREE.Mesh(geometry8, material8);
    plane8.rotation.x = -Math.PI/2;
    markerRoot8.add(plane8);

    //////////EVENT LISTERNERS/////////////////////////////////
    document.addEventListener('mousemove', onDocumentMouseMove, false);// detecta movimiento del mouse

}


//////////////FUNCIONES//////////////////////////////////

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1); //mouse pos
    raycaster.setFromCamera(mouse, camera); //creo el rayo que va desde la camara , pasa por el frustrum 
    let intersects = raycaster.intersectObjects(objects, true); //buscamos las intersecciones

    if (intersects.length > 0) {
        if (intersects[0].object != INTERSECTED) {
            if (INTERSECTED) {
             
            }
            INTERSECTED = intersects[0].object;		
			
			video1.play();
			

			console.log("intersected");

        }

    }

}



function update()
{
	// update artoolkit on every frame
	if ( arToolkitSource.ready !== false )
		arToolkitContext.update( arToolkitSource.domElement );
}


function render()
{
	renderer.render( scene, camera );
}


function animate()
{
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}