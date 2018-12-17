//import { isNull } from "util";
var socket=io.connect('http://localhost:8080');
var video=document.getElementById("video");
var video_width = video.width;
var video_height = video.height;
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');
var webgl_overlay = document.getElementById('webgl');
var gl= null;
var i=1;
var str = "";
var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(video);


var jSON={};
socket.on("jsonList",function(element){
	// console.log(element);
	try {
		element.forEach(function(e){
			console.log(document.querySelector("option#"+e.replace(".json","")));
			if (document.querySelector("option#"+e.replace(".json",""))==null){
				var option=document.createElement("option");
				var select=document.getElementById("filtres");
				option.textContent=e.replace(".json","");
				option.value=e.replace(".json","");
				option.id=e.replace(".json","");
				select.appendChild(option);
			}
		});
	}
	catch (err){
		console.log(err);
	}
	
});


socket.on("loadComplete", function(element){
    console.log(element);
    filtreCss=element["filtresCSS"];
    filtre2D=element["filtres2D"];
	filtreDeform=element["filtresDéformants"];

	lesboutons = document.querySelectorAll('input[type="checkbox"]'); //recupere la totalité des boutons pour cliquer dessus apres
	//console.log(lesboutons);
	
	filtreCss.forEach(function(fcs){
	    filters.forEach(function(flt){	            
	        for(i=0; i<lesboutons.length; i++){
	            if(lesboutons[i].id==flt.name){
	                if ((fcs[1].includes(flt.start) && !lesboutons[i].checked)||(lesboutons[i].checked && !fcs[1].includes(flt.start))){
	                    lesboutons[i].click();
	                }
	            }
	        }
	    });
	    listcanvas=document.querySelectorAll("canvas");
	    listcanvas.forEach(function(cnv){
	        if(cnv.id==fcs[0]){
	            cnv.style.filter=fcs[1];
	            console.log(cnv.style.filter);
	        }
	    })
        
    });

	filtre2D.forEach(function(fcs){
	    filters2D.forEach(function(flt){
            for(i=0; i<lesboutons.length; i++){
                if(lesboutons[i].id==flt.start){
                    if ((fcs[0]==flt.start && !lesboutons[i].checked)||(lesboutons[i].checked && fcs[0]!=flt.start)){
                        console.log(flt.start);
                        console.log(lesboutons[i].checked);
	                    lesboutons[i].click();
	                }
	            }
	        }
	    });
        
	});
	if (filtreDeform != undefined){
	    filtreDeform.forEach(function(fcs){
	        changements.forEach(function(flt){
	            for(i=0; i<lesboutons.length; i++){
	                if((lesboutons[i].id==flt.name)){
	                    if ((fcs.name==flt.name && !lesboutons[i].checked && fcs.value!=0)||(lesboutons[i].checked && fcs.name!=flt.name)){
	                        console.log(flt.start);
	                        console.log(lesboutons[i].checked);
	                        lesboutons[i].click();
	                        flt.value==fcs.value;
	                    }
	                }
	            }
	        });
        
	    });
	}
})


// filtre dessin
var ptX = new Array(); // tableau des coords modifiés des points en x
var ptY = new Array(); // tableau des coords modifiés des points en y
var pt62X = new Array(); // tableau des coords initiales du centre en x
var pt62Y = new Array(); // tableau des coords initiales du centre en y
var X = new Array(); // tableau des coords initiales des points en x
var Y = new Array(); // tableau des coords initiales des points en y
var trait = new Array(); // tableau des traits

//var filter2D=[];
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var canvass=["All", "Video"];

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


var filters2D =[{
	name:"Zorro",
	start:"zorro",
	cancel:zorro
	},{
	name:"Visage",
	start:"visage2D",
	cancel:visage2D
},{
	name:"Nez",
	start:"nez2D",
	cancel:nez2D
},{
	name:"Bouche",
	start:"bouche2D",
	cancel:bouche2D
},{
	name:"Yeux",
	start:"yeux2D",
	cancel:yeux2D
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
},{
	name:"Dessin",
	start:"dessin",
	cancel:dessin
}];

var changements=[{
	name:"Taille des yeux",
	value:0},
	{
	name:"Taille du visage",
	value:0
},{
	name:"Taille de la bouche",
	value:0
},{
	name:"Taille du nez",
	value:0
},{
	name:"Taille des sourcils",
	value:0
},{
	name:"Orientation des yeux",
	value:0
},{
	name:"Allongement des yeux",
	value:0
},{
	name:"Triste",
	value:0
},{
	name:"Colère",
	value:0
},{
	name:"Heureux",
	value:0
},{
	name:"Surprise",
	value:0
}];

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

var deform = new deformation();
gl=deform.init(webgl_overlay);


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
];

function getElementOfList(liste, name){
	var result = null;
	liste.forEach(function(e){
		//console.log(e.name);
		//console.log(name);
		if (e.name==name){
			result=e;
		}
		
	});
	return result;
}

function checktrue(liste){
	var chris=false;
	liste.forEach(function(e){
		if (e.value!=0){
			chris=true;
		}
	});
	return chris;
}

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
	if (point1 != undefined){
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

}

function nofilltriangle(point1,point2,point3,color,context){
	if (point1 != undefined){
		context.beginPath();
		context.strokeStyle=color;
		context.lineWidth="0.7";
		context.moveTo(point1[0],point1[1]);
		context.lineTo(point2[0],point2[1]);
		context.lineTo(point3[0],point3[1]);
		context.closePath();
		context.stroke();
	}
}

function dessin(color){
	var canvas=getCanvasByName("dessin");
	if (canvas != null) {
		var context=canvas.getContext("2d");
		// si la souris est appuyée, alors la position de celle-ci sur le canvas est prise
		$('canvas').mousedown(function(e){
		  console.log("hey")
		  dessin = true; // dessiner le point en question
		  ajouterPt(e.pageX - this.offsetLeft, e.pageY - this.offsetTop); //ajoute au tableau des points dessinés
		  dessine(); // dessine le point
		});
		// si la souris bouge en étant appuyée, on continue de dessiner
		$('canvas').mousemove(function(e){
		  if(dessin){
				ajouterPt(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
				dessine();
		  }
		});
		// si la souris est relâchée on arrête de dessiner
		$('canvas').mouseup(function(e){
		  dessin = false;
		});
		// si la souris quitte le canvas on arrête de dessiner
		$('canvas').mouseleave(function(e){
		  dessin = false;
		});

		// ajouter les points de la souris au tableau
		function ajouterPt(x, y, dragging){
			var positions = ctracker.getCurrentPosition();
			if (positions[62]!=undefined) {
				X.push(x);
				Y.push(y);
				ptX.push(x);
				ptY.push(y);
				pt62X.push(positions[62][0]);
				pt62Y.push(positions[62][1]);
				trait.push(dragging);
			}
		}

		function dessine(){
			context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
			
			context.strokeStyle = color; //couleur
			context.lineJoin = "round"; //arrondi les angles
			context.lineWidth = 5; //epaisseur du trait
						
			for(var i=0; i < ptX.length; i++) {		
				context.beginPath();
				if(trait[i] && i){
					context.moveTo(ptX[i-1], ptY[i-1]);
				}else{
					context.moveTo(ptX[i]-1, ptY[i]);
				}
				context.lineTo(ptX[i], ptY[i]);
				context.closePath();
				context.stroke();
			}
		}
		function moveDessin(){
			requestAnimationFrame(moveDessin);
			var positions = ctracker.getCurrentPosition();
			if (positions[62]!= undefined) {
				for(var i=0; i < ptX.length; i++) {
					ptX[i]=X[i]-pt62X[i]+positions[62][0];
					ptY[i]=Y[i]-pt62Y[i]+positions[62][1];
				}
				dessine();
			}
			else {
				context.clearRect(0,0,2000,2000);
			}
		}
		var dessin;
		moveDessin();
	}				
}

function mickey(color){
	var canvas=getCanvasByName("mickey");
	if (canvas != null) {
		var context=canvas.getContext("2d");
		
		requestAnimationFrame(mickey);
		context.clearRect(0,0,2000,2000);
		var positions = ctracker.getCurrentPosition();
		if(positions[0]!= undefined){

			//clearZone(0,0,2000,2000, context);
			var distance = 2 * (positions[19][1]-positions[1][1]);
			var taille = Math.sqrt((positions[14][0]-positions[0][0])**2+(positions[14][1]-positions[0][1])**2)*(1/3);
			fillCircle(positions[19][0],positions[19][1]+distance,taille,color,context);
			fillCircle(positions[15][0],positions[15][1]+distance,taille,color,context);
		}
	}
}

function visage2D(color){
	var canvas = getCanvasByName("visage2D");
	requestAnimationFrame(visage2D);
	//requestAnimFrame(visage);
	if (canvas != null) {
		var context = canvas.getContext("2d");
		
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
}

function points(color){
	var canvas=getCanvasByName("points");
	if (canvas != null) {
		var context=canvas.getContext("2d");
		
		requestAnimationFrame(points);
		context.clearRect(0,0,2000,2000);
		var positions = ctracker.getCurrentPosition();
		if(positions[0]!= undefined){

			var i = 0;
			
			context.clearRect(0,0,2000,2000);
			//clearZone(0,0,2000,2000);
			for (i; i<=70;i++){
				fillCircle(positions[i][0],positions[i][1],2,color,context);
			}
		}
	}

}

function bouche2D(color){
	var canvas = document.getElementById("bouche2D");
	if (canvas != null){
		var context = canvas.getContext("2d");
		requestAnimationFrame(bouche2D);
		context.clearRect(0,0,2000,2000);
		var positions = ctracker.getCurrentPosition();

		triangle(positions[44],positions[45],positions[61],color,context);
		triangle(positions[45],positions[61],positions[46],color,context);
		triangle(positions[61],positions[46],positions[47],color,context);
		triangle(positions[47],positions[60],positions[61],color,context);
		triangle(positions[47],positions[48],positions[60],color,context);
		triangle(positions[48],positions[60],positions[59],color,context);
		triangle(positions[48],positions[49],positions[59],color,context);
		triangle(positions[49],positions[50],positions[59],color,context);
		triangle(positions[50],positions[51],positions[58],color,context);
		triangle(positions[52],positions[51],positions[58],color,context);
		triangle(positions[52],positions[57],positions[58],color,context);
		triangle(positions[52],positions[57],positions[53],color,context);
		triangle(positions[54],positions[57],positions[53],color,context);
		triangle(positions[54],positions[57],positions[56],color,context);
		triangle(positions[54],positions[55],positions[56],color,context);
		triangle(positions[44],positions[55],positions[56],color,context);
	}
}

function nez2D(color){
	var canvas = getCanvasByName("nez2D");
	if (canvas != null) {
		var context=canvas.getContext("2d");
		
		requestAnimationFrame(nez2D);
		context.clearRect(0,0,2000,2000);
		var positions = ctracker.getCurrentPosition();
		if(positions[0]!= undefined){

			var taille=positions[62][1]-positions[41][1];
			taille=taille*1.2
			posx=(positions[62][0]+positions[41][0])/2;
			fillCircle(posx,positions[62][1],taille,color,context);
		}
	}
}

function positionLoop() {
	animation=requestAnimationFrame(positionLoop);
	gl.clear(gl.DEPTH_BUFFER_BIT && gl.COLOR_BUFFER_BIT && gl.STENCIL_BUFFER_BIT);
	if(i==0){
		return;
	}
	var positions = ctracker.getCurrentPosition();
	var positionString = "";
	
	if(positions[0]!=undefined){
		//ctracker.draw(overlay)
		drawMaskLoop();
	}
	if((changements[0].value==0)&&(changements[1].value==0)&&(changements[2].value==0)&&(changements[3].value==0)&&(changements[4].value==0)&&(changements[5].value==0)&&(changements[6].value==0)&&(changements[7].value==0)&&(changements[8].value==0)&&(changements[9].value==0)&&(changements[10].value==0)){
        cancelAnimationFrame(animation);
        i=0;
    }
}
 
function drawMaskLoop() {
	//var pos = [];
	var pos = ctracker.getCurrentPosition();
	
	overlayCC.clearRect(0,0,video_width,video_height);
	// supprimer le masque
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
	var newPos = pos.concat(addPos);
	var newVertices = vertices.concat(mouth_vertices);
	// merge with newVertices
	newVertices = newVertices.concat(extendVertices);
	deform.load(video, newPos, newVertices, changements);
	deform.draw(newPos);
	
}


function lunettes(thecolor){
	var canvas=getCanvasByName("lunettes");
	if (canvas != null) {
		var context=canvas.getContext("2d");
		
		requestAnimationFrame(lunettes);
		context.clearRect(0,0,2000,2000);
		var positions = ctracker.getCurrentPosition();
		if(positions[0]!= undefined){
		
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
	}

}

function yeux2D(color) {	
	var canvas=getCanvasByName("yeux2D");
	if (canvas != null) {
		var context=canvas.getContext("2d");
		
		requestAnimationFrame(yeux2D);
		context.clearRect(0,0,2000,2000);
		var positions = ctracker.getCurrentPosition();
		if(positions[0]!= undefined){

			var taille=positions[27][1]-positions[24][1];
			fillCircle(positions[27][0],positions[27][1],taille,color,context);
			var taille2=positions[32][1]-positions[29][1];
			fillCircle(positions[32][0],positions[32][1],taille2,color,context);
		}	
	}
}

function zorro(color){
	var canvas=getCanvasByName("zorro");
	if (canvas!= null){
		var context=canvas.getContext("2d");
		/*var canvas = document.getElementById("canvas1");
		var context = canvas.getContext("2d");*/
		requestAnimationFrame(zorro);
		
		context.clearRect(0,0,2000,2000);
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

}

function addButtons2D(liste){
	var buttonsDiv = document.getElementById("buttons2D");
	//var boutons;    
	var container=document.getElementById("container");

  	liste.forEach(function(item){

	var div = document.createElement("div");
	var bouton = document.createElement("div");
	bouton.className="ui toggle checkbox";
	bouton.id=item.name;

	//Création du label du bouton
	var label= document.createElement("label");
	label.setAttribute("style","color:#992222");
	var textLabel= document.createTextNode(item.name);
	label.appendChild(textLabel);

	//Création de l'input
	var input=document.createElement("input");
	input.id=item.start;
	input.addEventListener('click', function(){
		//supprimer le dessin du tableau
		if(this.id=="Dessin"){
			pt62X.length=0;
			pt62Y.length=0;
			X.length=0;
			Y.length=0;
			trait.length=0;
		}

		if (this.checked){
			var can = document.createElement("canvas");
			can.id = item.start;
			can.width="800";
			can.height="550";
			can.className="canvas";
			container.insertAdjacentElement("afterbegin", can);
			window[item.start]("#FFFFFF");
			document.querySelectorAll("select").forEach(function(element){
				if(element.className!=""){
					var li=document.createElement("option");
					li.className=item.name;
					element.insertAdjacentElement("beforeend",li);
					li.textContent=item.name;
				}
			});

			canvass.push(item.name);
			if(document.querySelectorAll("option#option"+item.start)==null){
				document.querySelectorAll("select").forEach(function(element){
					if (element.className!=""){
						var li=document.createElement("option");
						li.textContent=li.value=item.name;
						li.id="option"+item.start;
						element.insertAdjacentElement("beforeend",li);
					}
					
				});
			}
			//console.log(canvass);
			//console.log(item.start)
			if (getCreatedElementById(item.start+"color","input")==null){
				
				if (item.start!="lunettes"){
					var color=document.createElement("input");
					new jscolor(color);
					color.id=item.start+"color";
					color.addEventListener('change',function(){
						window[item.start]("#"+color.value);
						console.log(color.id)
						console.log(item.start)
					});
					color.style="margin-left:2%;";
					//window[item.start](color.value);
					div.append(color);
				}
				
			}
			else{
				getCreatedElementById(item.start+"color","input").style="margin-left:2%";
			}
			
		}
		else{
			canvass.splice(canvass.indexOf(item.name),1);
			document.querySelectorAll("select").forEach(function(elem){
				document.querySelectorAll("option."+item.name).forEach(function(element){
					if(elem.className!=""){
						elem.removeChild(element);
					}
				});
			});
			
			try{
				
				getCreatedElementById(item.start+"color","input").style="display: none";
				getCreatedElementById(item.start+"color","input").value="FFFFFF";
			}
			catch(err){
				console.log(err);
			}
			
			window.cancelAnimationFrame(item.cancel);
			//console.log("cnvas#"+item.start);
			container.removeChild(getCanvasByName(item.start));

		}
		//console.log(item.start);
	});
		//canvas=test;
		
	input.type="checkbox";
	// input.id=item.name;
	label.htmlFor = item.name;

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

  liste.forEach(function(item){
			// Création de la div de la checkbox	
	var div = document.createElement("div");
	var bouton = document.createElement("div");
	bouton.className="ui toggle checkbox";

	//Création du label du bouton
	var label= document.createElement("label");
	label.setAttribute("style","color:#992222");
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
			// ul.addEventListener('click',function(){

			// })
			
			//console.log(getInputRangeByName(item.name));
			if (getInputRangeByName(item.name)==null){
				var range=document.createElement("input");
				range.className="slider";
				range.name=item.name;
				range.type="range";
				div.appendChild(range);
				
				range.addEventListener('change', function(){
					var value=getInputRangeByName(item.name).value;
					var stringette=item.range+value+item.dim;

					if (item.name=="Saturé" || item.name=="Contraste" || item.name=="Lumineux"){
						stringette=item.range+value*10+item.dim;
					}
					else if (item.name=="Flou"){
						stringette=item.range+value/2+item.dim;
					}
					
					str=str.replace(item.filter, stringette);
					item.filter = stringette;

					var value=document.querySelector("select.select"+item.start).value;
					//console.log(document.querySelector("select.select"+item.start));

					if (value=="All"){
						document.querySelectorAll("canvas.canvas").forEach(function(elem){
							elem.style.filter=str;
						});
						video.style.filter = str;
					}
					else if (value=="Video"){
						video.style.filter=str;
					}
					else{
						var value=value.toLowerCase();
						console.log(value);
						document.querySelectorAll("canvas.canvas").forEach(function(elem){
							//console.log(elem.id);
							if (elem.id==value){
								console.log(elem)
								elem.style.filter=str;
							}
							
						});
					}
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
			
			document.querySelectorAll("canvas.canvas").forEach(function(elem){
				elem.style.filter=str;
			});
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

function addButtonsDeform(liste){
	var buttonsDiv = document.getElementById("deformation");
	//var boutons;    

  liste.forEach(function(item){
			// Création de la div de la checkbox	
	var div = document.createElement("div");
	var bouton = document.createElement("div");
	bouton.className="ui toggle checkbox";

	//Création du label du bouton
	var label= document.createElement("label");
	label.setAttribute("style","color:#992222");
	var textLabel= document.createTextNode(item.name);
	label.appendChild(textLabel);

	//Création de l'input
	var input=document.createElement("input");
	input.addEventListener('change', function(){
		if (this.checked){
			//console.log(getInputRangeByName(item.name));
			if (getInputRangeByName(item.name)==null){
				var range=document.createElement("input");
				range.className="slider";
				range.name=item.name;
				range.type="range";
				range.max=50;
				range.min=-50;
				range.value=0;

				div.appendChild(range);

				range.addEventListener('change', function(){
					i=1;
					getElementOfList(changements, item.name).value=this.value;
					positionLoop();
					// try{
					// 	// document.querySelector("canvas#shader").style="z-index:1";
					// }
					// catch(err){
					// 	//console.log(err);
					// }
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

			getElementOfList(changements, item.name).value=0;
			getInputRangeByName(item.name).value=0;
			// if (!checktrue(changements)){
			// 	document.querySelector("canvas#shader").style="z-index=-3";
			// 	// return;
			// }
			positionLoop();
			getInputRangeByName(item.name).style="display: none;";
			//str = str.replace(stringette, "");
			/*console.log(stringette);
			console.log(str);*/
			
			
			
			document.querySelectorAll("canvas.canvas").forEach(function(elem){
				elem.style.filter=str;
			});

		}
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

//Ajout des fonctions liées aux 2 boutons save et load
//Fonction associée au nom du fichier entré permettant de lancer le save si la touche entrée est adctionnée
var title=document.getElementById("title");
title.addEventListener("keyup", function(event){
	event.preventDefault();
  	if (event.keyCode === 13) {
    	document.getElementById("save").click();
  }
});

document.getElementById("save").addEventListener("click", function(){
	var jSON={};
	if (title.value==""){
		alert("Vous n'avez pas entré de nom pour votre filtre.");
	}
	else{
		if(checktrue(changements)){
			jSON['filtresDéformants']=changements;
			// console.log(jSON);
		}
		
		jSON['filtresCSS']=[["video",video.style.filter]];
		document.querySelectorAll("canvas").forEach(function(e){
			var css=[
				e.id,
				e.style.filter
			];
			jSON.filtresCSS.push(css);
			
		});

		jSON['filtres2D']=[];
		document.getElementById("buttons2D").querySelectorAll("input[type=checkbox]:checked").forEach(function(e){
				if (e.id=="dessin"){
					jSON['Dessin']=[];
					jSON.Dessin.push(pt62X);
					jSON.Dessin.push(pt62Y);
					jSON.Dessin.push(X);
					jSON.Dessin.push(Y);
					jSON.Dessin.push(trait);
					jSON.Dessin.push(document.querySelector("input#"+e.id+"color").value);
				}
				else{
					var f2D=[
						e.id,
						document.querySelector("input#"+e.id+"color").value
					];

				// console.log(f2D)
				jSON.filtres2D.push(f2D);
				}
				
			
		});
		var option=document.createElement("option");
		option.textContent=title.value;
		option.value=title.value;
		document.getElementById("filtres").appendChild(option);
		socket.emit("save",title.value, jSON);
	}
});

document.getElementById("load").addEventListener("click", function(){
	if(document.getElementById("filtres").value==""){
		alert("Aucun filtre choisi.");
	}
	else{
		// console.log(document.getElementById("filtres").value);
		socket.emit("load",document.getElementById("filtres").value);
	}
});


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
              width: 800,
              height: 550
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

		
		
	// Triangles composant la bouche


    
    document.body.onload=start();
	document.body.onload=addButtons(filters);
	document.body.onload=addButtons2D(filters2D);
	document.body.onload=addButtonsDeform(changements);
	video.play();
	
	//var canvasInput = document.getElementById('drawCanvas');
  	//var cc = canvasInput.getContext('2d');
  	//drawLoop();
	  //positionLoop();
	  //bouche(deformPoints,50);
    
    
})();




	

