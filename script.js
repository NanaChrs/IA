

var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
      camera.position.set(0,0,100);
      camera.lookAt(0,0,0);
      var material = new THREE.LineBasicMaterial({color: 0x00ff00});
      var geo = new THREE.Geometry();
      geo.vertices.push(new THREE.Vector3(-10,0,0));
      geo.vertices.push(new THREE.Vector3(0,10,0));
      geo.vertices.push(new THREE.Vector3(10,0,0));
      geo.vertices.push(new THREE.Vector3(10,0,0));
      var line=new THREE.Line(geo, material);
      var geometry = new THREE.BoxGeometry( 1, 1, 3 );
      var material = new THREE.MeshLambertMaterial();
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      scene.add(line);
      camera.position.z=15;

      var lights = [];
      lights[ 0 ] = new THREE.PointLight( 0xff00ff, 1, 0 );
      lights[ 1 ] = new THREE.PointLight( 0xffff00, 1, 0 );
      lights[ 2 ] = new THREE.PointLight( 0x00ffff, 1, 0 );

      lights[ 0 ].position.set( 0, 200, 0 );
      lights[ 1 ].position.set( 100, 200, 100 );
      lights[ 2 ].position.set( - 100, - 200, - 100 );

      scene.add( lights[ 0 ] );
      scene.add( lights[ 1 ] );
      scene.add( lights[ 2 ] );
      

      function animate() {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z+=0.01;
      line.rotation.x+=0.01;
      line.rotation.y+=0.01;
      renderer.render( scene, camera );
      }
      animate();