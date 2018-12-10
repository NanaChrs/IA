var video=document.getElementById("video");
var video_width = video.width;
var video_height = video.height;
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');
var webgl_overlay = document.getElementById('webgl');
var str = "";


var filters =[{
		name: "Blur",
		filter:"blur(3px)"
	},{
		name: "Noir&Blanc",
		filter:"grayscale(100%)"
	},{
		name:"Lumineux",
		filter:"brightness(200%)"
	},{
		name:"Rotation",
		filter:"hue-rotate(90deg)"
	},{
		name:"Inversion",
		filter:"invert(100%)"
	},{
		name:"Saturé",
		filter:"saturate(800%)"
	},{
		name:"Sepia",
		filter:"sepia(400%)"
	},{
		name:"Contraste",
		filter:"contrast(500%)"
	}];
/*
function filterApply(){
	var str="";
	for (let item in filters){
		console.log(filters);
		if (item.name!="reset" && document.getElementById(item.name)!=null){
			console.log(document.getElementById(item.name));
			if (document.getElementById(item.name).checked){
				str+=item.filter+"; ";
			}
		} 
	}
	if (str!=""){
		document.getElementById("canvas").filter(str);
	}
}
*/

function circle(x,y,rayon)
			{
	overlayCC.beginPath();
	context.lineWidth="2";
	context.arc(x, y, rayon, 0, 2 * Math.PI);
	context.stroke();
}
	
function fillCircle(x,y,rayon,couleur)
{
	overlayCC.beginPath();
	overlayCC.fillStyle=couleur
	overlayCC.arc(x, y, rayon, 0, 2 * Math.PI);
	overlayCC.fill();
}
function clearZone(x1,y1,x2,y2)
{
	overlayCC.clearRect(x1,y1,x2,y2);
}




(function(){
	//Permet d'utiliser le bon nom de fonction selon le navigateur utilisé
	navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

	if (navigator.getUserMedia) {
      function gotStream(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
		  video.src = vendorURL.createObjectURL(stream); 
		  //video.src = vendorHTMLMediaElement.srcObject (stream);à inverser un jour peut etre
        }

        video.play();
      }
        
      function error(message) {
        console.log(message);
      }
      
      function start() {
        this.disabled = true;
        navigator.getUserMedia( { 
          audio: false,  
          video: {
            mandatory: {
              maxWidth: 320,
              maxHeight: 240
            }
          }
        }, 
        gotStream, 
        error);
      }


    }

    

    function addButtons(liste){
    	var buttonsDiv = document.getElementById("filterButtons");
    	var boutons;    

        liste.forEach(function(item){
    		// Création de la div de la checkbox	
			var div = document.createElement("div");
			div.className="ui toggle checkbox";

			//Création du label du bouton
			var label= document.createElement("label");
			var textLabel= document.createTextNode(item.name);
			label.appendChild(textLabel);

			//Création de l'input
			var input=document.createElement("input");
			input.addEventListener('click', function(){
				var stringette=item.filter+" ";
				if (this.checked){
					str+=stringette;
				}
				else{
					str = str.replace(stringette, "");
				}
				//video.style.filter="contrast(500%)";
				video.style.filter = str;
				

			});
			//input.checked=false;
			input.type="checkbox";
			input.id=item.name;
			label.htmlFor = input.id;

			//Assemblage du tout
			div.appendChild(input);
			div.appendChild(label);

        	buttonsDiv.insertAdjacentElement("afterbegin", div); 


  		
		
      });

        

      
    }
    var ctracker = new clm.tracker();
  	ctracker.init();
		ctracker.start(video);

		var deform = new deformation();
		deform.init(webgl_overlay);
		
		// Triangles composant la bouche
		var mouth_vertices = [
			[44,45,61,44],
			[45,46,61,45],
			[46,60,61,46],
			[46,47,60,46],
			[47,48,60,47],
			[48,59,60,48],
			[48,49,59,48],
			[49,50,59,49],
			[50,51,58,50],
			[51,52,58,51],
			[52,57,58,52],
			[52,53,57,52],
			[53,54,57,53],
			[54,56,57,54],
			[54,55,56,54],
			[55,44,56,55],
			[44,61,56,44],
			[61,60,56,61],
			[56,57,60,56],
			[57,59,60,57],
			[57,58,59,57],
			[50,58,59,50],
		];
		

		var extendVertices = [
			[0,71,72,0],
			[0,72,1,0],
			[1,72,73,1],
			[1,73,2,1],
			[2,73,74,2],
			[2,74,3,2],
			[3,74,75,3],
			[3,75,4,3],
			[4,75,76,4],
			[4,76,5,4],
			[5,76,77,5],
			[5,77,6,5],
			[6,77,78,6],
			[6,78,7,6],
			[7,78,79,7],
			[7,79,8,7],
			[8,79,80,8],
			[8,80,9,8],
			[9,80,81,9],
			[9,81,10,9],
			[10,81,82,10],
			[10,82,11,10],
			[11,82,83,11],
			[11,83,12,11],
			[12,83,84,12],
			[12,84,13,12],
			[13,84,85,13],
			[13,85,14,13],
			[14,85,86,14],
			[14,86,15,14],
			[15,86,87,15],
			[15,87,16,15],
			[16,87,88,16],
			[16,88,17,16],
			[17,88,89,17],
			[17,89,18,17],
			[18,89,93,18],
			[18,93,22,18],
			[22,93,21,22],
			[93,92,21,93],
			[21,92,20,21],
			[92,91,20,92],
			[20,91,19,20],
			[91,90,19,91],
			[19,90,71,19],
			[19,71,0,19]
		]

    function positionLoop() {
			requestAnimationFrame(positionLoop);
			var positions = ctracker.getCurrentPosition();
			// do something with the positions ...
			// print the positions
			var positionString = "";
			//fillCircle(positions[27][0],positions[27][1]);
			clearZone(0,0,video_width,video_height);
			//var taille=positions[27][1]-positions[24][1];
			//fillCircle(positions[27][0],positions[27][1],taille,'#FF0000');
			//var taille2=positions[32][1]-positions[29][1];
			//fillCircle(positions[32][0],positions[32][1],taille2,'#FF0000');
			if(positions){
				ctracker.draw(overlay);
				drawMaskLoop();
			}
		}
		 
		function drawMaskLoop() {
			//var pos = [];
			var pos = ctracker.getCurrentPosition();
			// supprimer le masque
			clearZone(0,0,video_width,video_height);
			if (pos !== undefined) {
				// create additional points around face
				var tempPos;
				var addPos = [];
				for (var i = 0;i < 23;i++) {
					tempPos = [];
					tempPos[0] = (pos[i][0] - pos[62][0])*1.3 + pos[62][0];
					tempPos[1] = (pos[i][1] - pos[62][1])*1.3 + pos[62][1];
					addPos.push(tempPos);
				}
			}
			
			// merge with pos
			var newPos = pos.concat(addPos);

			var newVertices = vertices.concat(mouth_vertices);
			// merge with newVertices
			newVertices = newVertices.concat(extendVertices);
			deform.load(video, newPos, newVertices);
			deform.draw(newPos);

			//var ph=[0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		}

    document.body.onload=start();
	document.body.onload=addButtons(filters);

	
	//var canvasInput = document.getElementById('drawCanvas');
  	//var cc = canvasInput.getContext('2d');
  	//drawLoop();
  	positionLoop();
    
    
})();




	

