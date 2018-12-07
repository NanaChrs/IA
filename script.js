var video=document.getElementById("video");
var canvas=document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var str = "";
var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(video);
//var filter2D=[];
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var canvass=["All", "Video"];
//var canvasInput = document.getElementById('drawCanvas');
//var cc = canvasInput.getContext('2d');


var filters =[{
		name: "Flou",
		filter:"blur(4px)",
		range:"blur(",
		dim:"px) ",
		start:"blur"
	},{
		name: "Noir et Blanc",
		filter:"grayscale(50%)",
		range:"grayscale(",
		dim:"%) ",
		start:"grayscale"
	},{
		name:"Lumineux",
		filter:"brightness(50%)",
		range:"brightness(",
		dim:"%) ",
		start:"brightness"
	},{
		name:"Rotation de couleurs",
		filter:"hue-rotate(45deg)",
		range:"hue-rotate(",
		dim:"deg) ",
		start:"hue-rotate"
	},{
		name:"Inversion",
		filter:"invert(50%)",
		range:"invert(",
		dim:"%) ",
		start:"invert"
	},{
		name:"Saturé",
		filter:"saturate(50%)",
		range: "saturate(",
		dim:"%) ",
		start:"saturate"
	},{
		name:"Sepia",
		filter:"sepia(50%)",
		range:"sepia(",
		dim:"%) ",
		start:"sepia"
	},{
		name:"Contraste",
		filter:"contrast(50%)",
		range:"contrast(",
		dim:"%) ",
		start:"contrast"
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
	name:"Yeux",
	start:"yeux",
	cancel:yeux
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
	start:"lunettes",
	cancel:lunettes
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

function getOptionByValue(name){
	result = null;
	var jeSuisUnePetiteVariable=document.querySelectorAll("option");
	//console.log(jeSuisUnePetiteVariable);
	jeSuisUnePetiteVariable.forEach(function(item){
		//console.log(item);
		if(item.value==name){
			//console.log("jsuisdedasn");
			result = item;
		}
	});

	return result;
	
}

function getCanvasByName(name){
	result = null;
	var jeSuisUnePetiteVariable=document.querySelectorAll("canvas");
	//console.log(jeSuisUnePetiteVariable);
	jeSuisUnePetiteVariable.forEach(function(item){
		//console.log(item);
		if(item.id==name){
			//console.log("jsuisdedasn");
			result = item;
		}
	});

	return result;
	
}

function getCreatedElementById(id,element){
	result = null;
	var jeSuisUnePetiteVariable=document.querySelectorAll(element);
	//console.log(jeSuisUnePetiteVariable);
	jeSuisUnePetiteVariable.forEach(function(item){
		//console.log(item);
		if(item.id==id){
			//console.log("jsuisdedasn");
			result = item;
		}
	});

	return result;
}



function circle(x,y,rayon, context){
	//var context=canvas.getContext("2d");
	context.beginPath();
	context.lineWidth="2";
	context.arc(x, y, rayon, 0, 2 * Math.PI);
	context.stroke();
}
	
function fillCircle(x,y,rayon,couleur, context)
{
	//var context=canvas.getContext("2d");
	context.beginPath();
	context.fillStyle=couleur;
	context.arc(x, y, rayon, 0, 2 * Math.PI);
	context.fill();
	//canvasContext.filter="blur(3px)"
}
/*
function clearZone(x1,y1,x2,y2, context)
{
	//var context=canvas.getContext("2d");
	context.clearRect(x1,y1,x2,y2);
}*/

function triangle(point1,point2,point3,color, context){
	//var canvasContext = document.getElementById("canvas1"); 
	//console.log(context)
	//var context = canvas.getContext("2d");	}
	context.beginPath();
	context.fillStyle=color;
	context.strokeStyle=color;
	context.moveTo(point1[0],point1[1]);
	context.lineTo(point2[0],point2[1]);
	context.lineTo(point3[0],point3[1]);
	context.closePath();
	context.stroke();
	context.fill();

}

function nofilltriangle(point1,point2,point3,color,context){
	context.beginPath();
	context.strokeStyle=color;
	context.lineWidth="0.7";
	context.moveTo(point1[0],point1[1]);
	context.lineTo(point2[0],point2[1]);
	context.lineTo(point3[0],point3[1]);
	context.closePath();
	context.stroke();
}

function mickey(color){
	/*var canvas = document.getElementById("canvas1");
	var context = canvas.getContext("2d");*/
	
	var context=getCanvasByName("mickey").getContext("2d");
	context.clearRect(0,0,2000,2000);
	requestAnimationFrame(mickey);
	//clearZone(0,0,2000,2000, context);
	var positions = ctracker.getCurrentPosition();
	var distance = 2 * (positions[19][1]-positions[1][1]);
	var taille = Math.sqrt((positions[14][0]-positions[0][0])**2+(positions[14][1]-positions[0][1])**2)*(1/3);
	fillCircle(positions[19][0],positions[19][1]+distance,taille,color,context);
	fillCircle(positions[15][0],positions[15][1]+distance,taille,color,context);
}

function visage(color){
	//requestAnimFrame(visage);
	var canvas = getCanvasByName("visage");
	var context = canvas.getContext("2d");
	requestAnimationFrame(visage);
	context.clearRect(0,0,2000,2000);
	var positions = ctracker.getCurrentPosition();

	for (let index = 0; index < 14; index++) { //bas visage
		nofilltriangle(positions[index],positions[index+1],positions[index+1],color,context);
	}
	for (let index = 15; index < 18; index++) {//sourcil droit
		nofilltriangle(positions[index],positions[index+1],positions[index+1],color,context);
	}
	for (let index = 19; index < 22; index++) {//sourcil gauche
		nofilltriangle(positions[index],positions[index+1],positions[index+1],color,context);
	}
	for (let index = 44; index < 55; index++) {//contour bouche
		nofilltriangle(positions[index],positions[index+1],positions[index+1],color,context);
	}
	for (let index = 56; index < 58; index++) {//bas levres
		nofilltriangle(positions[index],positions[index+1],positions[index+1],color,context);
	}
	for (let index = 59; index < 61; index++) {//haut levres
		nofilltriangle(positions[index],positions[index+1],positions[index+1],color,context);
	}
	nofilltriangle(positions[44],positions[44],positions[55],color,context);//jointures
	nofilltriangle(positions[44],positions[44],positions[56],color,context);
	nofilltriangle(positions[44],positions[44],positions[61],color,context);
	nofilltriangle(positions[50],positions[50],positions[58],color,context);
	nofilltriangle(positions[50],positions[50],positions[59],color,context);
	for (let index = 34; index < 36; index++) {//droite nez
		nofilltriangle(positions[index],positions[index+1],positions[index+1],color,context);
	}
	for (let index = 38; index < 40; index++) {//gauche nez
		nofilltriangle(positions[index],positions[index+1],positions[index+1],color,context);
	}
	nofilltriangle(positions[36],positions[36],positions[42],color,context);//details nez
	nofilltriangle(positions[42],positions[42],positions[37],color,context);
	nofilltriangle(positions[37],positions[37],positions[43],color,context);
	nofilltriangle(positions[43],positions[43],positions[38],color,context);

	nofilltriangle(positions[41],positions[41],positions[33],color,context);//haut nez
	nofilltriangle(positions[41],positions[41],positions[62],color,context);

	nofilltriangle(positions[23],positions[23],positions[66],color,context);//oeil gauche
	nofilltriangle(positions[23],positions[23],positions[63],color,context);
	nofilltriangle(positions[63],positions[63],positions[24],color,context);
	nofilltriangle(positions[24],positions[24],positions[64],color,context);
	nofilltriangle(positions[64],positions[64],positions[25],color,context);
	nofilltriangle(positions[65],positions[25],positions[25],color,context);
	nofilltriangle(positions[65],positions[65],positions[26],color,context);
	nofilltriangle(positions[26],positions[26],positions[66],color,context);

	nofilltriangle(positions[30],positions[30],positions[68],color,context);//oeil droit
	nofilltriangle(positions[29],positions[68],positions[68],color,context);
	nofilltriangle(positions[29],positions[29],positions[67],color,context);
	nofilltriangle(positions[28],positions[67],positions[67],color,context);
	nofilltriangle(positions[28],positions[28],positions[70],color,context);
	nofilltriangle(positions[31],positions[70],positions[70],color,context);
	nofilltriangle(positions[31],positions[31],positions[69],color,context);
	nofilltriangle(positions[30],positions[69],positions[69],color,context);
}

function points(color){
	var i = 0;
	var context=getCanvasByName("points").getContext("2d");
	context.clearRect(0,0,2000,2000);
	requestAnimFrame(points);
	var positions = ctracker.getCurrentPosition();
	//clearZone(0,0,2000,2000);
	for (i; i<=70;i++){
		fillCircle(positions[i][0],positions[i][1],2,color,context);
	}

}

function lunettes(thecolor){
	//console.log(typeof thecolor); la coueluer ne fonctionne pas avec la fonction addcolorstop, on a un changement de type intempestif ainsi que une incrementation infini de la variable
	var canvas=getCanvasByName("lunettes");
	var context = canvas.getContext("2d");
	requestAnimationFrame(lunettes);
	context.clearRect(0,0,2000,2000);
	var positions = ctracker.getCurrentPosition();
	
	

	taille = Math.sqrt((positions[14][0] - positions[0][0])*(positions[14][0] - positions[0][0])+(positions[14][1] - positions[0][1])*(positions[14][1] - positions[0][1]));
	taille = taille / 5;
	//var my_gradient=context.createLinearGradient(0,positions[27][1]-taille,0,positions[27][1]+taille);
	//var my_gradient=context.createLinearGradient(0,positions[21][1],0,positions[41][1]); //gradient mouvant chelou
	
	var my_gradient=context.createLinearGradient(0,positions[27][1]-taille,0,positions[27][1]+taille);
	var my_gradient2=context.createLinearGradient(0,positions[32][1]-taille,0,positions[32][1]+taille);
	
	my_gradient.addColorStop(0,"black");
	my_gradient.addColorStop(0.8,"#ff5397");
	my_gradient.addColorStop(1,"white");

	my_gradient2.addColorStop(0,"black");
	my_gradient2.addColorStop(0.8,"#ff5397");
	my_gradient2.addColorStop(1,"white");
	
	triangle(positions[27],positions[27], positions[32],"black",context);
	triangle(positions[27],positions[27], positions[0],"black",context);
	triangle(positions[32],positions[32], positions[14],"black",context);
	fillCircle(positions[27][0],positions[27][1],taille,my_gradient,context);
	fillCircle(positions[32][0],positions[32][1],taille,my_gradient2,context);
	circle(positions[27][0],positions[27][1],taille,context);
	circle(positions[32][0],positions[32][1],taille,context);
	canvas.style.opacity = "0.5";

}

function yeux(color) {
	
	var context=getCanvasByName("yeux").getContext("2d");
	context.clearRect(0,0,2000,2000);
	requestAnimFrame(yeux);
	var positions = ctracker.getCurrentPosition();
	// do something with the positions ...
	// print the positions
	var positionString = "";
	//fillCircle(positions[27][0],positions[27][1]);
	//clearZone(0,0,2000,2000);
	var taille=positions[27][1]-positions[24][1];
	fillCircle(positions[27][0],positions[27][1],taille,color,context);
	var taille2=positions[32][1]-positions[29][1];
	fillCircle(positions[32][0],positions[32][1],taille2,color,context);
	
   }

function zorro(color){
	/*var canvas = document.getElementById("canvas1");
	var context = canvas.getContext("2d");*/
	var context=getCanvasByName("zorro").getContext("2d");
	context.clearRect(0,0,2000,2000);
	requestAnimationFrame(zorro);
	//console.log(context)
	//clearZone(0,0,2000,2000);
	var positions = ctracker.getCurrentPosition();

	triangle(positions[0],positions[1],positions[23],color,context);
	triangle(positions[0],positions[19],positions[23],color,context);
	triangle(positions[63],positions[19],positions[23],color,context);
	triangle(positions[63],positions[19],positions[20],color,context);
	triangle(positions[20],positions[19],positions[24],color,context);
	triangle(positions[63],positions[20],positions[24],color,context);
	triangle(positions[20],positions[24],positions[21],color,context);
	triangle(positions[24],positions[21],positions[64],color,context);
	triangle(positions[21],positions[22],positions[64],color,context);
	triangle(positions[22],positions[64],positions[25],color,context);
	triangle(positions[22],positions[25],positions[33],color,context);
	triangle(positions[25],positions[33],positions[41],color,context);
	triangle(positions[30],positions[33],positions[41],color,context);
	triangle(positions[30],positions[33],positions[18],color,context);
	triangle(positions[30],positions[18],positions[68],color,context);
	triangle(positions[17],positions[18],positions[68],color,context);
	triangle(positions[29],positions[17],positions[68],color,context);
	triangle(positions[17],positions[16],positions[29],color,context);
	triangle(positions[29],positions[16],positions[67],color,context);
	triangle(positions[16],positions[15],positions[67],color,context);
	triangle(positions[15],positions[67],positions[28],color,context);
	triangle(positions[15],positions[28],positions[14],color,context);

	triangle(positions[13],positions[40],positions[31],color,context);

	triangle(positions[28],positions[70],positions[13],color,context);
	triangle(positions[31],positions[70],positions[13],color,context);
	triangle(positions[69],positions[31],positions[40],color,context);
	triangle(positions[69],positions[30],positions[40],color,context);
	triangle(positions[40],positions[41],positions[30],color,context);
	triangle(positions[14],positions[13],positions[28],color,context);

	triangle(positions[40],positions[34],positions[25],color,context);

	triangle(positions[26],positions[34],positions[1],color,context);
	
	triangle(positions[26],positions[65],positions[34],color,context);
	triangle(positions[65],positions[25],positions[34],color,context);
	triangle(positions[26],positions[66],positions[1],color,context);
	triangle(positions[66],positions[23],positions[1],color,context);
	triangle(positions[22],positions[18],positions[33],color,context);
	triangle(positions[41],positions[33],positions[25],color,context);
	triangle(positions[65],positions[25],positions[41],color,context);
	triangle(positions[34],positions[41],positions[65],color,context);
	triangle(positions[65],positions[26],positions[34],color,context);
	

}

function addButtons2D(liste){
	var buttonsDiv = document.getElementById("buttons2D");
	//var boutons;    
	var container=document.getElementById("container");

  	liste.forEach(function(item){
			// Création de la div de la checkbox
				
		
		//test[item.start]=can.getContext("2d");
		
	var div = document.createElement("div");
	var bouton = document.createElement("div");
	bouton.className="ui toggle checkbox";
	//div.style="display: flex; flex-direction: row; align-content: space-around;"

	//Création du label du bouton
	var label= document.createElement("label");
	var textLabel= document.createTextNode(item.name);
	label.appendChild(textLabel);

	//Création de l'input
	var input=document.createElement("input");
	input.addEventListener('click', function(){

		if (this.checked){
			var can = document.createElement("canvas");
			can.id = item.start;
			can.width="1080";
			can.height="607";
			can.className="canvas";
			container.insertAdjacentElement("afterbegin", can);
			document.querySelectorAll("select").forEach(function(element){

				var li=document.createElement("option");
				li.className=item.name;
				element.insertAdjacentElement("beforeend",li);
				li.textContent=item.name;
			});
			//console.log(item.start);
			//console.log(test);
			canvass.push(item.name);
			if(document.querySelectorAll("option#option"+item.start)==null){
				document.querySelectorAll("select").forEach(function(element){
					var li=document.createElement("option");
					li.textContent=li.value=item.name;
					li.id="option"+item.start;
					element.insertAdjacentElement("beforeend",li);
				});
			}
			//console.log(canvass);
			window[item.start]("#FFFFFF");
			if (getCreatedElementById(item.start+"color","input")==null){
				
				if (item.start!="lunettes"){
					var color=document.createElement("input");
					new jscolor(color);
					color.id=item.start+"color";
					color.addEventListener('change',function(){
						window[item.start]("#"+color.value);
					});
					color.style="margin-left:2%;";
					//window[item.start](color.value);
					div.append(color);
				}
				
				

			
				
			}
			else{
				getCreatedElementById(item.start+"color","input").style="margin-left:2%";
			}
			
			//requestAnimationFrame(item.cancel);
			//console.log(requestAnimationFrame(item.cancel))
			//var color = document.
		}
		else{
			canvass.splice(canvass.indexOf(item.name),1);
			document.querySelectorAll("select").forEach(function(elem){
				document.querySelectorAll("option."+item.name).forEach(function(element){
					elem.removeChild(element);
				});
			});
			
			//console.log(canvass);
			//console.log("je cancel ");
			try{
				getCreatedElementById(item.start+"color","input").style="display: none";
			}
			catch(err){
				console.log(err);
			}
			
			cancelAnimationFrame(requestAnimationFrame(item.cancel));
			//console.log("cnvas#"+item.start);
			container.removeChild(getCanvasByName(item.start));
			//delete getCanvasByName("zorro");
			//clearZone(0,0,2000,2000,getCanvasByName(item.start));
			
			
		}
		//console.log(item.start);
	});
		//canvas=test;
		
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
			
			

			var ul=document.createElement("select");
			ul.className="select"+item.start;
			canvass.forEach(function(item){
				var li=document.createElement("option");
				li.className=li.textContent=item;
				ul.appendChild(li);
			})
			bouton.insertAdjacentElement("afterend",ul);
			ul.addEventListener('click',function(){
				document.querySelectorAll("canvas.canvas").forEach(function(elem){
					elem.style.filter=str.replace(stringette,"");
				});
				video.style.filter = str;
				if (this.value=="All"){
					document.querySelectorAll("canvas.canvas").forEach(function(elem){
						elem.style.filter=str;
					});
					video.style.filter = str;
				}
				else if (this.value=="Video"){
					video.style.filter=str;
				}
				else{
					var value=this.value;
					console.log(value);
					document.querySelectorAll("canvas.canvas").forEach(function(elem){
						console.log(elem.id);
						if (elem.id==value){
							elem.style.filter=str.replace(stringette,"");
						}
						
					});
				}
				

			})
			
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
					//console.log(str);
					video.style.filter = str;
				});
				
			}


			else{
				
				
				getInputRangeByName(item.name).value=50;
				getInputRangeByName(item.name).style="";
			}
		}
		else{
			//console.log(getCreatedElementById("select"+item.name,"select"));
			document.querySelectorAll("select.select"+item.start).forEach(function(elem){
				div.removeChild(elem);
			});
			
			getInputRangeByName(item.name).style="display: none;";
			str = str.replace(stringette, "");
			/*console.log(stringette);
			console.log(str);*/
			document.querySelectorAll("canvas.canvas").forEach
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




(function(){
	//Permet d'utiliser le bon nom de fonction selon le navigateur utilisé
	navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

	if (navigator.mediaDevices.getUserMedia) {
      function gotStream(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          //var vendorURL = window.URL || window.webkitURL;
          video.srcObject = stream; 
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
              width: 1080,
              height: 607
          }
        }, 
        gotStream, 
        error);
      }}


	// }
	// var constraints = { audio: false, video: { framerate:120, width: 1080, height: 607 } };
	// var video = document.querySelector('video');
	// navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
	// video.srcObject = mediaStream;
	// })
	// .catch(function(err) { console.log(err.name + ": " + err.message); });*/
	
	// var video = document.querySelector("video");
 
	// if (navigator.mediaDevices.getUserMedia) {       
	// 	navigator.mediaDevices.getUserMedia({video: {width:1080, height:607}})
	// .then(function(stream) {
	// 	video.srcObject = stream;
	// })
	// .catch(function(err0r) {
	// 	console.log("Something went wrong!");
	// });
	// }
	
    

	
	

    var ctracker = new clm.tracker();
  	ctracker.init();
  	ctracker.start(video);
	start();


	document.body.onload=addButtons(filters);
	document.body.onload=addButtons2D(filters2D);
	video.play();
	//filter2D(filter2D);
	//clearZone(0,0,2000,2000);

	


  	


    
    
})();




	

