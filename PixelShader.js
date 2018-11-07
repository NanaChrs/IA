THREE.PixelShader = {

    uniforms: {

        "tDiffuse": { value: null }, //la texture
        "pixels" : { value : new THREE.Vector2(64, 48) } //nombres de pixels sur l'image / resolution = 64/48

    },

    vertexShader: [

        "varying vec2 vUv;", //sauvegarde des UV des vertex pour les transmettre au fragment shader qui n'y a aps acces

        "void main() {",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);", //transformation standard pour calculer la position d'un sommet
            //"vUv = vec2(1.0 - uv.x, uv.y);" //effet miroir pour la webcam (enlever pour d'autres usages...)
            "}",

    ].join( "\n" ),

    fragmentShader: [

        "uniform sampler2D tDiffuse;", //declarations
        "uniform vec2 pixels;",
        "varying vec2 vUv;", //les UV

        "void main() {",
            "vec2 center = (floor(vUv * pixels) + 0.5) / pixels;", //calcule du centre
            "vec4 color = texture2D(tDiffuse, center);", //recuperation de la couleur du centre a tout le carrer
            "gl_FragColor = color;", //application de la couleur au fragment
        "}",
    

    ].join( "\n" )
};