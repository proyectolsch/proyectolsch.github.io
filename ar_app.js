var scene, camera, renderer, clock, deltaTime, totalTime; //decalrar las variables de nuestra app. 
var arToolkitSource, arToolkitContext;

var mesh1; //Imagen
var mesh2; //Imagen
var mesh3; //Imagen
var mesh4; //Imagen
var mesh5; //Imagen
var mesh6; //3D
var mesh7; //3D2

var RhinoMesh, RhinoMesh2;

var markerRoot1;
var markerRoot2;
var markerRoot3;
var markerRoot4;
var markerRoot5;
var markerRoot6; //3D

init(); // llamado de la funcion principal que se encarga de hacer casi todo en la app
animate();

function init() {
    ////////////////////////////////////////////////////////
    //THREE Setup
    ///////////////////////////////////////////////////////
    // crear nuestra escena -  OBJETO.
    scene = new THREE.Scene(); //  crea un objeto escena.

    //creamos luces 
    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5); //creo las luz
    scene.add(ambientLight); //agrego la luz a mi escena. 

    camera = new THREE.Camera(); //creo objeto camara 
    scene.add(camera); // agrego camara a la escena

    //permite mostrar las cosas en 3d en la pantalla
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    //renderer.setSize(640, 480); //esto es resolucion VGA
    renderer.setSize(1920,1080);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';
    document.body.appendChild(renderer.domElement);


    //tiempo
    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;

    ////////////////////////////////////////////////////////
    //AR Setup
    ///////////////////////////////////////////////////////

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResizeElement()
	{
		arToolkitSource.onResizeElement()
		arToolkitSource.copyElementSizeTo(renderer.domElement)	
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)	
		}	
	}


    arToolkitSource.init(function onReady() {
        onResizeElement();
    });

    //agregamos un event listener
    window.addEventListener('resize', function () { onResizeElement() });

    //Setup ArKitContext
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono'
    });

    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });



    /////////////////////////////////////////////////
    //Marker setup
    /////////////////////////////////////////////////

    //MARKER 1 - Imagen
    markerRoot1 = new THREE.Group();
    scene.add(markerRoot1); 
    let markerControl1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
        type: 'pattern',
        patternUrl: './data/p1a.patt',
    });
    let geometry1 = new THREE.PlaneGeometry( 3, 2);
    let loader1=  new THREE.TextureLoader();
    let texture1 =  loader1.load('./textures/letra_a.png');
    let material1 =  new THREE.MeshBasicMaterial(
        {
            map: texture1,         
        }
    ); 
    let plane1 = new THREE.Mesh(geometry1, material1);
    plane1.rotation.x = -Math.PI/2;
    markerRoot1.add(plane1);
    
    //MARKER 2 - Imagen
    markerRoot2 = new THREE.Group();
    scene.add(markerRoot2); 
    let markerControl2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
        type: 'pattern',
        patternUrl: './data/p2e.patt',
    });
    let geometry2 = new THREE.PlaneGeometry( 3, 2);
    let loader2 =  new THREE.TextureLoader();
    let texture2 =  loader2.load('./textures/LE.png');
    let material2 =  new THREE.MeshBasicMaterial(
        {
            map: texture2,         
        }
    ); 
    let plane2 = new THREE.Mesh(geometry2, material2);
    plane2.rotation.x = -Math.PI/2;
    markerRoot2.add(plane2);


    //MARKER 3 - Imagen
    markerRoot3 = new THREE.Group();
    scene.add(markerRoot3); 
    let markerControl3 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot3, {
        type: 'pattern',
        patternUrl: './data/p3i.patt',
    });
    let geometry3 = new THREE.PlaneGeometry( 3, 2);
    let loader3 =  new THREE.TextureLoader();
    let texture3 =  loader3.load('./textures/LI.png');
    let material3 =  new THREE.MeshBasicMaterial(
        {
            map: texture3,         
        }
    ); 

    let plane3 = new THREE.Mesh(geometry3, material3);
    plane3.rotation.x = -Math.PI/2;
    markerRoot3.add(plane3);

    //MARKER 4 - Imagen
    markerRoot4 = new THREE.Group();
    scene.add(markerRoot4); 
    let markerControl4 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot4, {
        type: 'pattern',
        patternUrl: './data/p4o.patt',
    });
    let geometry4 = new THREE.PlaneGeometry( 3, 2);
    let loader4 =  new THREE.TextureLoader();
    let texture4 =  loader4.load('./textures/LO.png');
    let material4 =  new THREE.MeshBasicMaterial({map: texture4}); 
    let plane4 = new THREE.Mesh(geometry4, material4);
    plane4.rotation.x = -Math.PI/2;
    markerRoot4.add(plane4);

    //MARKER 5 - Imagen
    markerRoot5 = new THREE.Group();
    scene.add(markerRoot5); 
    let markerControl5 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot5, {type: 'pattern', patternUrl: './data/p5u.patt'});
    let geometry5 = new THREE.PlaneGeometry( 3, 2);
    let loader5 =  new THREE.TextureLoader();
    let texture5 =  loader5.load('./textures/LU.png');
    let material5 =  new THREE.MeshBasicMaterial({map: texture5}); 
    let plane5= new THREE.Mesh(geometry5, material5);
    plane5.rotation.x = -Math.PI/2;
    markerRoot5.add(plane5);



    

    

}










function update() {
    //actualiza contenido de nuestra app AR
    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    deltaTime = clock.getDelta();
    totalTime += deltaTime; // totalTime =  totalTime + deltaTime 
    update();
    render();
}