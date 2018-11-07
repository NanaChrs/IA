var video=document.getElementById("videoElement");

	if (navigator.mediaDevices.getUserMedia) {       
	    navigator.mediaDevices.getUserMedia({video: true})
	  .then(function(stream) {
	    video.srcObject = stream;
	    
	  })
	  .catch(function(err0r) {
	    console.log("Something went wrong!");
	  });
	}

var scene = new THREE.Scene();

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );


var animate = function () {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};






/*
var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xff00ff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffff00, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0x00ffff, 1, 0 );
lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );
scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );*/

function cubeanim() {
	requestAnimFrame(cubeanim);
	var positions = ctracker.getCurrentPosition();
	var positionString = "";
	var camera = new THREE.PerspectiveCamera( 75, video.videoWidth/video.videoHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	console.log(cube.position);
		
	if (positions){

		camera.position.set(0,0,5);
		camera.lookAt(scene.position);
		camera.position.z = 3;
		renderer.setSize( video.videoWidth, video.videoHeight);
		document.body.appendChild(renderer.domElement);
		// camera.position.set(cube.position.x,cube.position.y,15);
		cube.position.set(positions[50][0]/300,positions[50][1]/300,0);
}
	renderer.render( scene, camera );
	
}

var ctracker = new clm.tracker();
ctracker.init();
try {
	ctracker.start(video)

	
	
	cubeanim();
}
catch (err0r){
	console.log(err0r);
}





var canvasInput = document.getElementById('canvas');
var cc = canvasInput.getContext('2d');
function drawLoop() {
	requestAnimFrame(drawLoop);
	cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
	ctracker.draw(canvasInput);
}
//drawLoop();