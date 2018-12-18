var yeuxbrides = function(deformPoints,coeff) {
    coeff=coeff/10;
    var baisse=[25,28];
    var leve=[23,30];
    baisse.forEach(function(pt) {
        deformPoints[pt][0] = deformPoints[pt][0]-coeff;
    });
    leve.forEach(function(pt) {
        deformPoints[pt][0] = deformPoints[pt][0]+coeff;	
    });
}

var monstre = function(deformPoints,coeff) {
    coeff=coeff/100;
    var etirer=[44, 45, 49, 50, 51, 55];
    var retrecirOeilDroit=[23, 63, 24, 64, 25, 65, 26, 66];
    var retrecirOeilGauche=[29, 68, 30, 69, 31, 70, 28, 67];
    for (var i = 0;i < etirer.length;i++) {
        var diff = (deformPoints[etirer[i]][0]-deformPoints[60][0]);
        deformPoints[etirer[i]][0] = deformPoints[etirer[i]][0]-diff*coeff;
        deformPoints[etirer[i]][1] = deformPoints[etirer[i]][1]+10*coeff;
    }
    for (var i = 0;i < retrecirOeilGauche.length;i++) {
        var diff = deformPoints[retrecirOeilGauche[i]][0]-deformPoints[32][0];
        deformPoints[retrecirOeilGauche[i]][0] = deformPoints[retrecirOeilGauche[i]][0]+diff*coeff;
        diff = deformPoints[retrecirOeilGauche[i]][1]-deformPoints[32][1];
        deformPoints[retrecirOeilGauche[i]][1] = deformPoints[retrecirOeilGauche[i]][1]+diff*coeff;
    }
    for (var i = 0;i < retrecirOeilDroit.length;i++) {
        var diff = deformPoints[retrecirOeilDroit[i]][0]-deformPoints[27][0];
        deformPoints[retrecirOeilDroit[i]][0] = deformPoints[retrecirOeilDroit[i]][0]+diff*coeff;
        diff = deformPoints[retrecirOeilDroit[i]][1]-deformPoints[27][1];
        deformPoints[retrecirOeilDroit[i]][1] = deformPoints[retrecirOeilDroit[i]][1]+diff*coeff;
    }		
}

var visage = function(deformPoints,coeff) {
    coeff=coeff/25;
    var baisse=[14,13,12,11,10,9,8];
    var leve=[0,1,2,3,4,5,6,];
    baisse.forEach(function(pt) {
        deformPoints[pt][0] = deformPoints[pt][0]-coeff*5;
    });
    leve.forEach(function(pt) {
        deformPoints[pt][0] = deformPoints[pt][0]+coeff*5;	
    });	
}

var nez = function(deformPoints,coeff) {
    coeff=coeff*(5/100);
    var point=[34,35,36,42,37,43,38,39,40,62];
    
    for (var i = 0;i < point.length;i++) {
        var diff = (deformPoints[point[i]][0]-deformPoints[41][0])*coeff/10;
        deformPoints[point[i]][0] = deformPoints[point[i]][0]-diff;
        diff = (deformPoints[point[i]][1]-deformPoints[41][1])*coeff/10;
        deformPoints[point[i]][1] = deformPoints[point[i]][1]-diff;
    }
}

var sourcils = function(deformPoints,coeff){
    coeff=coeff/25;
    var leve=[19,20,21,22,18,17,16,15];
    leve.forEach(function(pt) {
        deformPoints[pt][1] = deformPoints[pt][1]+coeff*5;
    });
}

var yeuxor = function(deformPoints,coeff) {
    coeff=coeff/25;
    var baissebcp=[25,30];
    var levebcp=[23,28];
    var baissepeu=[64,68,65,69];
    var levepeu=[67,70,63,66];
    baissebcp.forEach(function(pt) {
        deformPoints[pt][1] = deformPoints[pt][1]-coeff*5;
    });
    levebcp.forEach(function(pt) {
        deformPoints[pt][1] = deformPoints[pt][1]+coeff*5;	
    });	
    baissepeu.forEach(function(pt) {
        deformPoints[pt][1] = deformPoints[pt][1]-coeff*2.5;
    });
    levepeu.forEach(function(pt) {
        deformPoints[pt][1] = deformPoints[pt][1]+coeff*2.5;	
    });	
}

var yeux = function(deformPoints,coeff){	
    coeff=coeff/50;
    var etirerOeilDroit=[23, 63, 24, 64, 25, 65, 26, 66];
    var etirerOeilGauche=[29, 68, 30, 69, 31, 70, 28, 67];

    for (var i = 0;i < etirerOeilGauche.length;i++) {
        var diff = (deformPoints[etirerOeilGauche[i]][0]-deformPoints[32][0])*coeff;
        deformPoints[etirerOeilGauche[i]][0] = deformPoints[etirerOeilGauche[i]][0]-diff;
        diff = (deformPoints[etirerOeilGauche[i]][1]-deformPoints[32][1])*coeff;
        deformPoints[etirerOeilGauche[i]][1] = deformPoints[etirerOeilGauche[i]][1]-diff;
    }
    for (var i = 0;i < etirerOeilDroit.length;i++) {
        var diff = (deformPoints[etirerOeilDroit[i]][0]-deformPoints[27][0])*coeff;
        deformPoints[etirerOeilDroit[i]][0] = deformPoints[etirerOeilDroit[i]][0]-diff;
        diff = (deformPoints[etirerOeilDroit[i]][1]-deformPoints[27][1])*coeff;
        deformPoints[etirerOeilDroit[i]][1] = deformPoints[etirerOeilDroit[i]][1]-diff;
    }
}

var bouche = function (deformPoints, coeff) {
    coeff=coeff*1/12;
    var centre =[(deformPoints[50][0]+deformPoints[44][0])/2,(deformPoints[60][1]+deformPoints[57][1])/2];
    var point=[44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61];

    for (var i = 0;i < point.length;i++) {
        var diff = (deformPoints[point[i]][0]-centre[0])*coeff/10;
        deformPoints[point[i]][0] = deformPoints[point[i]][0]-diff;
        diff = (deformPoints[point[i]][1]-centre[1])*coeff/10;
        deformPoints[point[i]][1] = deformPoints[point[i]][1]-diff;
    }
}
var emotion = function (deformPoints, coeff) {
    // emotion doit etre importee ou mise en parametre global
    if (emotion == 1) {//joie
        coeff = coeff / 100;
        var leve = [66, 26, 65, 69, 31, 70];
        var etirer = [44, 45, 49, 50, 51, 55];
        for (var i = 0; i < etirer.length; i++) {
            var diff = deformPoints[etirer[i]][0] - deformPoints[60][0];
            deformPoints[etirer[i]][0] = deformPoints[etirer[i]][0] - (diff / 1.5) * coeff;
            deformPoints[etirer[i]][1] = deformPoints[etirer[i]][1] + 7 * coeff;
        }
        for (var i = 0; i < leve.length; i++) {
            var diff = deformPoints[etirer[i]][1] - (deformPoints[27][1] + deformPoints[32][1]) / 2;
            deformPoints[leve[i]][1] = deformPoints[leve[i]][1] + (diff / 5) * coeff;
        }
    }
    else if (emotion == 2) {//tristesse
        coeff = coeff / 50;
        var baisse = [15, 16, 19, 23, 63, 66, 67, 28, 70, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 58, 59, 61];
        var leve = [17, 18, 21, 22, 25, 30, 64, 65, 68, 69]
        for (var i = 0; i < baisse.length; i++) {
            deformPoints[baisse[i]][1] = deformPoints[baisse[i]][1] - 5 * coeff;
        }
        for (var i = 0; i < leve.length; i++) {
            deformPoints[leve[i]][1] = deformPoints[leve[i]][1] + 5 * coeff;
        }
    }
    else if (emotion == 3) {//surprise
        coeff = coeff / 100;
        var etirerOeilDroit = [19, 20, 21, 22, 23, 63, 24, 64, 25, 65, 26, 66];
        var etirerOeilGauche = [15, 16, 17, 18, 29, 68, 30, 69, 31, 70, 28, 67];
        var sourcils = [15, 16, 17, 18, 19, 20, 21, 22];
        for (var i = 0; i < etirerOeilGauche.length; i++) {
            var diff = (deformPoints[etirerOeilGauche[i]][0] - deformPoints[32][0]) * coeff;
            deformPoints[etirerOeilGauche[i]][0] = deformPoints[etirerOeilGauche[i]][0] - diff / 2;
            diff = (deformPoints[etirerOeilGauche[i]][1] - deformPoints[32][1]) * coeff;
            deformPoints[etirerOeilGauche[i]][1] = deformPoints[etirerOeilGauche[i]][1] - diff / 2;
        }
        for (var i = 0; i < etirerOeilDroit.length; i++) {
            var diff = (deformPoints[etirerOeilDroit[i]][0] - deformPoints[27][0]) * coeff;
            deformPoints[etirerOeilDroit[i]][0] = deformPoints[etirerOeilDroit[i]][0] - diff / 2;
            diff = (deformPoints[etirerOeilDroit[i]][1] - deformPoints[27][1]) * coeff;
            deformPoints[etirerOeilDroit[i]][1] = deformPoints[etirerOeilDroit[i]][1] - diff / 2;
        }
        for (var i = 0; i < sourcils.length; i++) {
            deformPoints[sourcils[i]][1] = deformPoints[sourcils[i]][1] - 10 * coeff;
        }
    }
    else if (emotion == 4) {//colere
        coeff = coeff * (3 / 100);
        var baisse = [17, 18, 21, 22, 25, 30, 64, 65, 68, 69, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 58, 59, 61];
        var leve = [15, 16, 19, 23, 63, 66, 67, 28, 70];
        for (var i = 0; i < baisse.length; i++) {
            deformPoints[baisse[i]][1] = deformPoints[baisse[i]][1] - 5 * coeff;
        }
        for (var i = 0; i < leve.length; i++) {
            deformPoints[leve[i]][1] = deformPoints[leve[i]][1] + 5 * coeff;
        }
    }
}





