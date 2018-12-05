var video=document.getElementById("video");
var canvas=document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var str = "";
var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(video);
var filter2D=[];
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
//var canvasInput = document.getElementById('drawCanvas');
//var cc = canvasInput.getContext('2d');

var filters =[{
		name: "Flou",
		filter:"blur(4px)",
		range:"blur(",
		dim:"px) "
	},{
		name: "Noir et Blanc",
		filter:"grayscale(50%)",
		range:"grayscale(",
		dim:"%) "
	},{
		name:"Lumineux",
		filter:"brightness(50%)",
		range:"brightness(",
		dim:"%) "
	},{
		name:"Rotation de couleurs",
		filter:"hue-rotate(45deg)",
		range:"hue-rotate(",
		dim:"deg) "
	},{
		name:"Inversion",
		filter:"invert(50%)",
		range:"invert(",
		dim:"%) "
	},{
		name:"Saturé",
		filter:"saturate(50%)",
		range: "saturate(",
		dim:"%) "
	},{
		name:"Sepia",
		filter:"sepia(50%)",
		range:"sepia(",
		dim:"%) "
	},{
		name:"Contraste",
		filter:"contrast(50%)",
		range:"contrast(",
		dim:"%) "
	}];


var filters2D =[,{
	name:"Zorro",
	start:"zorro",
	cancel:zorro
	},{
	name:"Visage",
	start:"visage",
	cancel:visage
},{
	name:"Yeux rouges",
	start:"yeuxRouges",
	cancel:yeuxRouges
},{
	name:"Points",
	start:"points",
	cancel:points
},{
	name:"Mickey",
	start:"mickey",
	cancel:mickey
},{
	name:"Lunettes",
	start:"",
	end:""
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

function filter2D(liste){
	requestAnimationFrame(filter2D);
	clearZone(0,0,2000,2000);
	liste.forEach(function(item){
		item;
	})
}

function getInputRangeByName(name){
	result = null;
	var jeSuisUnePetiteVariable=document.querySelectorAll("input.slider");
	//console.log(jeSuisUnePetiteVariable);
	jeSuisUnePetiteVariable.forEach(function(item){
		//console.log(item);
		if(item.name==name){
			//console.log("jsuisdedasn");
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

function triangle(point1,point2,point3,color){
	/*var canvas = document.getElementById("canvas1"); 
	var context = canvas.getContext("2d");*/
	canvasContext.beginPath();
	canvasContext.fillStyle=color;
	canvasContext.strokeStyle=color;
	canvasContext.moveTo(point1[0],point1[1]);
	canvasContext.lineTo(point2[0],point2[1]);
	canvasContext.lineTo(point3[0],point3[1]);
	canvasContext.closePath();
	canvasContext.stroke();
	canvasContext.fill();

}

function mickey(color){
	/*var canvas = document.getElementById("canvas1");
	var context = canvas.getContext("2d");*/
	requestAnimationFrame(mickey);
	//clearZone(0,0,2000,2000);
	var positions = ctracker.getCurrentPosition();
	var distance = 2 * (positions[19][1]-positions[1][1]);
	var taille = Math.sqrt((positions[14][0]-positions[0][0])**2+(positions[14][1]-positions[0][1])**2)*(1/3);
	fillCircle(positions[19][0],positions[19][1]+distance,taille,color);
	fillCircle(positions[15][0],positions[15][1]+distance,taille,color);
}

function visage(color){
	requestAnimFrame(visage);
	//clearZone(0,0,2000,2000);
	//canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	ctracker.draw(canvas);
}

function points(color){
	var i = 0;
	requestAnimFrame(points);
	var positions = ctracker.getCurrentPosition();
	//clearZone(0,0,2000,2000);
	for (i; i<=70;i++){
		fillCircle(positions[i][0],positions[i][1],2,color);
	}

}

function yeuxRouges(color) {
	requestAnimFrame(yeuxRouges);
	var positions = ctracker.getCurrentPosition();
	// do something with the positions ...
	// print the positions
	var positionString = "";
	//fillCircle(positions[27][0],positions[27][1]);
	//clearZone(0,0,2000,2000);
	var taille=positions[27][1]-positions[24][1];
	fillCircle(positions[27][0],positions[27][1],taille,color);
	var taille2=positions[32][1]-positions[29][1];
	fillCircle(positions[32][0],positions[32][1],taille2,color);
	
   }

function zorro(color){
	/*var canvas = document.getElementById("canvas1");
	var context = canvas.getContext("2d");*/

	requestAnimationFrame(zorro);
	clearZone(0,0,2000,2000);
	var positions = ctracker.getCurrentPosition();

	triangle(positions[0],positions[1],positions[23],color);
	triangle(positions[0],positions[19],positions[23],color);
	triangle(positions[63],positions[19],positions[23],color);
	triangle(positions[63],positions[19],positions[20],color);
	triangle(positions[20],positions[19],positions[24],color);
	triangle(positions[63],positions[20],positions[24],color);
	triangle(positions[20],positions[24],positions[21],color);
	triangle(positions[24],positions[21],positions[64],color);
	triangle(positions[21],positions[22],positions[64],color);
	triangle(positions[22],positions[64],positions[25],color);
	triangle(positions[22],positions[25],positions[33],color);
	triangle(positions[25],positions[33],positions[41],color);
	triangle(positions[30],positions[33],positions[41],color);
	triangle(positions[30],positions[33],positions[18],color);
	triangle(positions[30],positions[18],positions[68],color);
	triangle(positions[17],positions[18],positions[68],color);
	triangle(positions[29],positions[17],positions[68],color);
	triangle(positions[17],positions[16],positions[29],color);
	triangle(positions[29],positions[16],positions[67],color);
	triangle(positions[16],positions[15],positions[67],color);
	triangle(positions[15],positions[67],positions[28],color);
	triangle(positions[15],positions[28],positions[14],color);

	triangle(positions[13],positions[40],positions[31],color);

	triangle(positions[28],positions[70],positions[13],color);
	triangle(positions[31],positions[70],positions[13],color);
	triangle(positions[69],positions[31],positions[40],color);
	triangle(positions[69],positions[30],positions[40],color);
	triangle(positions[40],positions[41],positions[30],color);
	triangle(positions[14],positions[13],positions[28],color);

	triangle(positions[40],positions[34],positions[25],color);

	triangle(positions[26],positions[34],positions[1],color);
	
	triangle(positions[26],positions[65],positions[34],color);
	triangle(positions[65],positions[25],positions[34],color);
	triangle(positions[26],positions[66],positions[1],color);
	triangle(positions[66],positions[23],positions[1],color);
	triangle(positions[22],positions[18],positions[33],color);
	triangle(positions[41],positions[33],positions[25],color);
	triangle(positions[65],positions[25],positions[41],color);
	triangle(positions[34],positions[41],positions[65],color);
	triangle(positions[65],positions[26],positions[34],color);
	

}

function addButtons2D(liste){
	var buttonsDiv = document.getElementById("buttons2D");
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

			if (this.checked){
				
				window[item.start]("#ffffff");
			}
			else{
				cancelAnimationFrame(requestAnimationFrame(item.cancel));
				console.log("je cancel ");
				clearZone(0,0,2000,2000);
				
				
			}
			console.log(item.start);
	});
		
		input.type="checkbox";
		input.id=item.name;
		label.htmlFor = input.id;

		//Assemblage du tout
		
		bouton.appendChild(input);
		bouton.appendChild(label);
		div.appendChild(bouton);

  //console.log(document.getElementById('Contraste'));
  buttonsDiv.insertAdjacentElement("beforeend", div); 
	
  });
  
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
						video.style.filter = str;
						
						//console.log(getInputRangeByName(item.name));
						if (getInputRangeByName(item.name)==null){
							var range=document.createElement("input");
							range.className="slider";
							range.name=item.name;
							range.type="range";
							div.appendChild(range);
							range.addEventListener('click', function(){
								var value=getInputRangeByName(item.name).value;
								var stringette=item.range+value+item.dim;
								if (item.name=="Saturé" || item.name=="Contraste" || item.name=="Lumineux"){
									var stringette=item.range+value*10+item.dim;
								}
								else if (item.name=="Flou"){
									var stringette=item.range+value/2+item.dim;
								}
								
								str=str.replace(item.filter, stringette);
								item.filter = stringette;
								console.log(str);
								video.style.filter = str;
							});
							
						}
						else{
							getInputRangeByName(item.name).value=50;
							getInputRangeByName(item.name).style="";
						}
					}
					else{
						getInputRangeByName(item.name).style="display: none;";
						str = str.replace(stringette, "");
						console.log(stringette);
						console.log(str);
						video.style.filter = str;
						//console.log(document.querySelectorAll("input.slider"));
						/*document.getElementsByName(item.name).style.display="none";*/
					}
				//video.style.filter="contrast(500%)";
					
					//console.log(str);
				

			});
			//input.checked=false;
			input.type="checkbox";
			input.id=item.name;
			label.htmlFor = input.id;

			//Assemblage du tout
			
			bouton.appendChild(input);
			bouton.appendChild(label);
			div.appendChild(bouton);

      //console.log(document.getElementById('Contraste'));
      buttonsDiv.insertAdjacentElement("beforeend", div); 
		
      });
      
	}
	

    var ctracker = new clm.tracker();
  	ctracker.init();
  	ctracker.start(video);



    document.body.onload=start();
	document.body.onload=addButtons(filters);
	document.body=addButtons2D(filters2D);
	//filter2D(filter2D);
	clearZone(0,0,2000,2000);

	


  	


    
    
})();




	

