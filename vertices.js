var vertices= [
    // jawline
    [0,1,23,0],
    [1,23,66,1],
    [1,2,66,1],
    [2,66,26,2],
    [2,26,35,2],
    [2,35,36,2],
    [2,36,3,2],
    [36,44,45,36],
    [3,4,44,3],
    [3,44,36,3],
    [4,44,55,4],
    [4,5,55,4],
    [5,55,54,5],
    [5,6,54,5],
    [6,53,54,6],
    [6,7,53,6],
    [7,8,53,7],
    [8,52,53,8],
    [8,9,52,8],
    [9,51,52,9],
    [9,10,51,9],
    [10,50,51,10],
    [10,11,50,10],
    [11,38,50,11],
    [11,12,38,11],
    [12,38,39,12],
    [12,31,39,12],
    [12,31,70,12],
    [12,13,70,12],
    [13,28,70,13],
    [13,14,28,13],
    // right eyebrow
    [14,15,28,14],
    [15,28,67,15],
    [15,16,67,15],
    [16,67,29,16],
    [16,17,29,16],
    [17,68,29,17],
    [17,18,68,17],
    [18,68,30,18],
    [18,30,33,18],
    // below eyes
    [30,40,69,30],
    [39,40,69,39],
    [39,31,69,39],
    [26,65,35,26],
    [34,35,65,34],
    [25,34,65,25],
    // left eyebrow
    [22,25,33,22],
    [22,25,64,22],
    [21,22,64,21],
    [21,24,64,21],
    [20,21,24,20],
    [20,24,63,20],
    [19,20,63,19],
    [19,23,63,19],
    [19,23,0,19],
    // below nose
    [36,45,46,36],
    [36,42,46,36],
    [42,37,46,42],
    [37,46,47,37],
    [46,37,47,46],
    [37,47,48,37],
    [38,48,49,38],
    [37,43,48,37],
    [43,38,48,43],
    [38,49,50,38],
    // nose region
    [22,18,33,22],
    [40,41,30,40],
    [25,33,41,25],
    [33,41,30,33],
    [25,34,41,25],
    [41,40,62,41],
    [34,41,62,34],
    [34,35,62,34],
    [35,36,62,35],
    [36,42,62,36],
    [42,37,62,42],
    [37,43,62,37],
    [43,38,62,43],
    [38,39,62,38],
    [39,40,62,39],
    // mouth
    [44,45,61,44],
    [45,46,61,45],
    [46,47,61,46],
    [47,61,60,47],
    [47,59,60,47],
    [47,48,59,47],
    [48,49,59,48],
    [49,50,59,49],
    [50,51,58,50],
    [51,52,58,51],
    [52,57,58,52],
    [52,53,57,52],
    [53,54,57,53],
    [54,56,57,54],
    [54,55,56,54],
    [44,55,56,44],
    // left eye
    [23,63,27,23],
    [63,24,27,63],
    [24,64,27,24],
    [64,25,27,64],
    [25,65,27,25],
    [65,26,27,65],
    [26,66,27,26],
    [66,23,27,66],
    // right eye
    [28,67,32,28],
    [67,29,32,67],
    [29,68,32,29],
    [68,30,32,68],
    [30,69,32,30],
    [69,31,32,69],
    [31,70,32,31],
    [28,32,70,28]
  ];

  const loadShader = function (gl, shaderSource, shaderType, optErrorCallback) {
    var errFn = optErrorCallback || error;
    // Create the shader object
    var shader = gl.createShader(shaderType);
  
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
  
    // Compile the shader
    gl.compileShader(shader);
  
    // Check the compile status
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      var lastError = gl.getShaderInfoLog(shader);
      errFn("*** Error compiling shader '" + shader + "':" + lastError);
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  };

  const error = function (msg) {
    if (!LOGGING_ENABLED) { return; }
    if (window.console) {
      if (window.console.error) {
        window.console.error(msg);
      } else if (window.console.log) {
        window.console.log(msg);
      }
    }
    throw msg;
  }

  
  const create3DContext = function (canvas, optAttribs) {
    var names = ['webgl', 'experimental-webgl'];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii], optAttribs);
      } catch (e) {}
      if (context) {
        break;
      }
    }
    return context;
  };
  const setupWebGL = function (canvas, optAttribs) {
    // const showLink = function (str) {
    //   var container = canvas.parentNode;
    //   if (container) {
    //     container.innerHTML = makeFailHTML(str);
    //   }
    // };
  
    if (!window.WebGLRenderingContext) {
      // showLink(GET_A_WEBGL_BROWSER);
      return null;
    }
  
    var context = create3DContext(canvas, optAttribs);
    if (!context) {
      // showLink(OTHER_PROBLEM);
      return null;
    }
    return context;
  };

  const getWebGLContext = function (canvas) {
    if ( window !== window.top) {
        document.body.className = 'iframe';
  
      // make the canvas backing store the size it's displayed.
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  
    var gl = setupWebGL(canvas);
    return gl;
  };

