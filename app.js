(function() {
  navigator.getUserMedia = (
    navigator.getUserMedia        /*||
    /*navigator.webkitGetUserMedia  ||
    navigator.mozGetUserMedia     ||
    navigator.msGetUserMedia*/
  );

  var video     = document.querySelector('video')
    , width     = 640
    , height    = 0
    , streaming = false;

  /*----------------------------------------------------------------------------------------------------------- Ancrage A */

  var texture   = new THREE.Texture( video )
    , material  = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );

video.style.display = 'none';

texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;

var renderer  = new THREE.WebGLRenderer({ antialias: true })
  , scene     = new THREE.Scene()

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x111111);
document.body.appendChild(renderer.domElement);

/*-------------------------------------------------------------------------------------------------------- Ancrage C */

var camera    = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 )
  , controls  = new THREE.OrbitControls(camera, renderer.domElement );

camera.position.z = 1000;

controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;


var geometry = new THREE.BoxGeometry(width, height, height);
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

requestAnimationFrame(render);


function render() {
  requestAnimationFrame(render);

  if (streaming) {
      texture.needsUpdate = true;
  }

  controls.update();
  renderer.render(scene, camera);
}


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}










  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      {
         video: true,
         audio: false
      },

      //
      // Fonction appelée en cas de réussite
      //
      function(localMediaStream) {
        video.setAttribute('autoplay', 'autoplay');
        video.src = window.URL.createObjectURL(localMediaStream);

        video.addEventListener('canplay', function(ev) {
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            // Régle un bug sur Firefox (voir les sources)
            if (isNaN(height)) {
              height = width / (4/3);
            }

            video.setAttribute('width',    width);
            video.setAttribute('height',   height);

            streaming = true;

            /* -----------------------------------------------------------------------------------------------Ancrage B */
          }
        }, false);
      },

      //
      // Fonction appelée en cas d'échec
      //
      function(err) {
         console.log("Une erreur est survenue: " + err);
      }
    );
  }
  else {
    console.log('Ce navigateur ne supporte pas la méthode getUserMedia');
  }
});

















