var video=document.getElementById("video");
var canvas=document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
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


/*var filters2d=[{
	name: "Yeux rouges",
	function: 
}]*/
	
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

function getInputRangeByName(name){
	result = null;
	var jeSuisUnePetiteVariable=document.querySelectorAll("input.slider");
	//console.log(jeSuisUnePetiteVariable);
	jeSuisUnePetiteVariable.forEach(function(item){
		//console.log(item);
		if(item.name==name){
			console.log("jsuisdedasn");
			result = item;
		}
	});

	return result;
	
}



function circle(x,y,rayon)
			{
	canvasContext.beginPath();
	canvasContext.lineWidth="2";
	canvasContext.arc(x, y, rayon, 0, 2 * Math.PI);
	canvasContext.stroke();
}
	
function fillCircle(x,y,rayon,couleur)
{
	canvasContext.beginPath();
	canvasContext.fillStyle=couleur
	canvasContext.arc(x, y, rayon, 0, 2 * Math.PI);
	canvasContext.fill();
	//canvasContext.filter="blur(3px)"
}
function clearZone(x1,y1,x2,y2)
{
	canvasContext.clearRect(x1,y1,x2,y2);
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
    	//var boutons;    

      liste.forEach(function(item){
				// Création de la div de la checkbox	
				var div = document.createElement("div");
				var bouton = document.createElement("div");
				bouton.className="ui toggle checkbox";

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
						console.log(getInputRangeByName(item.name));
						if (getInputRangeByName(item.name)==null){
							var range=document.createElement("input");
							range.className="slider";
							range.name=item.name;
							range.type="range";
							div.appendChild(range);
						}
						else{
							getInputRangeByName(item.name).style="";
						}
					}
					else{
						getInputRangeByName(item.name).style="display: none;";
						str = str.replace(stringette, "");

						console.log(document.querySelectorAll("input.slider"));
						/*document.getElementsByName(item.name).style.display="none";*/
					}
				//video.style.filter="contrast(500%)";
					video.style.filter = str;
				

			});
			//input.checked=false;
			input.type="checkbox";
			input.id=item.name;

			//Assemblage du tout
			
			bouton.appendChild(input);
			bouton.appendChild(label);
			div.appendChild(bouton);

      console.log(document.getElementById('Contraste'));
      buttonsDiv.insertAdjacentElement("afterbegin", div); 


  		
		
      });

        

      
    }
    var ctracker = new clm.tracker();
  	ctracker.init();
  	ctracker.start(video);

    function positionLoop() {
		requestAnimFrame(positionLoop);
			var positions = ctracker.getCurrentPosition();
			// do something with the positions ...
			// print the positions
			var positionString = "";
			//fillCircle(positions[27][0],positions[27][1]);
			clearZone(0,0,2000,2000);
			var taille=positions[27][1]-positions[24][1];
			fillCircle(positions[27][0],positions[27][1],taille,'#FF0000');
			var taille2=positions[32][1]-positions[29][1];
			fillCircle(positions[32][0],positions[32][1],taille2,'#FF0000');
		
   	}

    document.body.onload=start();
	document.body.onload=addButtons(filters);

	
	var canvasInput = document.getElementById('drawCanvas');
  	var cc = canvasInput.getContext('2d');

  	function drawLoop(){
  		requestAnimFrame(drawLoop);
  		cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
  		ctracker.draw(canvasInput);
  	}

  drawLoop();
  positionLoop();
    
    
})();




	

