(function(){

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
	},{
		name: "bjr"
		

	},{
		name:"Reset",
		filter:""
	}];

	var video=document.getElementById("video");
	var canvas=document.getElementById("canvas");
	var canvasContext = canvas.getContext("2d");

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
    start();

    function addButtons(liste){
    	var buttonsDiv = document.getElementById("filterButtons");    

        liste.forEach(function(item){
        	if (item.name=="Reset"){
        		var div= document.createElement("button");
        		div.className="ui button";
        		var textLabel=document.createTextNode(item.name);
        		div.appendChild(textLabel);
        	}
        	else{
        		// Création de la div de la checkbox	
				var div = document.createElement("div");
				div.className="ui toggle checkbox";

				//Création du label du bouton
				var label= document.createElement("label");
				var textLabel= document.createTextNode(item.name);
				label.appendChild(textLabel);

				//Création de l'input
				var input=document.createElement("input");
				input.type="checkbox";
				input.id=item.name;
				//Assemblage du tout
				div.appendChild(input);
				div.appendChild(label);
        	}
		console.log(div);
		buttonsDiv.appendChild(div);
		
      });

      
    }
    addButtons(filters);
})();