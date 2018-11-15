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
	canvasContext.beginPath();
	context.lineWidth="2";
	context.arc(x, y, rayon, 0, 2 * Math.PI);
	context.stroke();
}
	
function fillCircle(x,y,rayon,couleur)
{
	canvasContext.beginPath();
	context.fillStyle=couleur
	context.arc(x, y, rayon, 0, 2 * Math.PI);
	context.fill();
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

			//Assemblage du tout
			div.appendChild(input);
			div.appendChild(label);

        	console.log(document.getElementById('Contraste'));
        	buttonsDiv.insertAdjacentElement("afterbegin", div); 


  		
		
      });

        

      
    }
   	

    document.body.onload=start();
	document.body.onload=addButtons(filters);

	var ctracker = new clm.tracker();
  	ctracker.init();
  	ctracker.start(video);
	//var canvasInput = document.getElementById('drawCanvas');
  //var cc = canvasInput.getContext('2d');
  function drawLoop() {
    requestAnimationFrame(drawLoop);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    ctracker.draw(canvas);
  }
  drawLoop();
    
    
})();




	

