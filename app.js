
    navigator.getUserMedia = (
      navigator.getUserMedia        ||
      navigator.webkitGetUserMedia  ||
      navigator.mozGetUserMedia     ||
      navigator.msGetUserMedia
    );
  
    var video     = document.getElementById('test2')
      , videoCanvas = document.getElementById('test')
      , width     = 640
      , height    = 0
      , streaming = false;
  
    /* Ancrage A */

    var texture   = new THREE.Texture( video )
    //, material  = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );
        material = getMaterial('PixelShader'); //bidouillage dans getmaterial rend le nom uselesse...


        var materials = {
            //shaderOff:  new THREE.MeshBasicMaterial({ map: texture, overdraw: true }),
            PixelShader:  new THREE.ShaderMaterial(THREE.PixelShader),
            
            
          };

        function getMaterial(name) {
            /*if (!materials[name]) {
              name ='shaderOff';
            }*/
        
            var m =  new THREE.ShaderMaterial(THREE.PixelShader); //CA NE MARCHE PAAAAAAAAS

            if (m instanceof THREE.ShaderMaterial) {
                m.uniforms.tDiffuse.value = texture;
                tableauPixels = new THREE.Vector2(70,70); // le tableau de gros pixel par dessus l'image
                m.uniforms.pixels.value= tableauPixels;
             // m.uniforms.tDiffuse.value = texture; //ICI UNDEFINED ALORS QUE DEFINI AU DESSUS
            }
        
            m.needsUpdate = true;
        
            return m;
          }


//video.style.display = 'none';

texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;

var renderer  = new THREE.WebGLRenderer({ antialias: true })
  , scene     = new THREE.Scene()

renderer.setSize(window.innerWidth/3, window.innerHeight/2); //la taille de la zone 3D
renderer.setClearColor(0x111111);
document.body.appendChild(renderer.domElement);

/* Ancrage C */

var camera    = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 )

camera.position.z = 1000;

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
          videoCanvas.setAttribute('autoplay','autoplay');
          video.src = window.URL.createObjectURL(localMediaStream);
          //videoCanvas.src = video.src;

          videoCanvas.addEventListener('canplay', function(ev) {
            if (!streaming) {
              height = video.videoHeight / (video.videoWidth / width);
              
              // Régle un bug sur Firefox (voir les sources)
              if (isNaN(height)) {
                height = width / (4/3);
              }
  
              video.setAttribute('width',    width);
              video.setAttribute('height',   height);
  
              streaming = true;
            }
          }, false);




  
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
  
              /* Ancrage B */

              var geometry = new THREE.BoxGeometry(width, height, height);
              var mesh = new THREE.Mesh(geometry, material);

              function render() {
                requestAnimationFrame(render);
              
                if (streaming) {
                  texture.needsUpdate = true;
                }
              
                renderer.render(scene, camera);
              }

              scene.add(mesh);



              requestAnimationFrame(render);
            }
          }, false);


          var canvas = document.querySelector('canvas');

          var stream = canvas.captureStream(25);

          videoCanvas.src = stream;




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
  ;



//videoCanvas.src =video.src;
//videoCanvas.setAttribute('autoplay', 'autoplay');
/*videoCanvas.addEventListener('canplay', function(ev) {
  if (!streaming) {
    height = video.videoHeight / (video.videoWidth / width);

    // Régle un bug sur Firefox (voir les sources)
    if (isNaN(height)) {
      height = width / (4/3);
    }

    video.setAttribute('width',    width);
    video.setAttribute('height',   height);

    streaming = true;
  }
}
)
*/

