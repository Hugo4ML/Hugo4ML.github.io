"use strict";

document.title = "(0.27) Simple project";
const canvas = document.getElementById("canvas");

function Keyboard() {
  let keys = [
    {
        key: "Backspace",
        keyCode: 8
    },
    {
        key: "Tab",
        keyCode: 9
    },
    {
        key: "Enter",
        keyCode: 13
    },
    {
        key: "Shift",
        keyCode: 16
    },
    {
        key: "Control",
        keyCode: 17
    },
    {
        key: "Alt",
        keyCode: 18
    },
    {
        key: " ",
        keyCode: 32
    },
    {
        key: "ArrowLeft",
        keyCode: 37
    },
    {
        key: "ArrowUp",
        keyCode: 38
    },
    {
        key: "ArrowRight",
        keyCode: 39
    },
    {
        key: "ArrowDown",
        keyCode: 40
    },
    {
        key: "0",
        keyCode: 48
    },
    {
        key: "1",
        keyCode: 49
    },
    {
        key: "2",
        keyCode: 50
    },
    {
        key: "3",
        keyCode: 51
    },
    {
        key: "4",
        keyCode: 52
    },
    {
        key: "5",
        keyCode: 53
    },
    {
        key: "6",
        keyCode: 54
    },
    {
        key: "7",
        keyCode: 55
    },
    {
        key: "8",
        keyCode: 56
    },
    {
        key: "9",
        keyCode: 57
    },
    {
        key: "a",
        keyCode: 65
    },
    {
        key: "b",
        keyCode: 66
    },
    {
        key: "c",
        keyCode: 67
    },
    {
        key: "d",
        keyCode: 68
    },
    {
        key: "e",
        keyCode: 69
    },
    {
        key: "f",
        keyCode: 70
    },
    {
        key: "g",
        keyCode: 71
    },
    {
        key: "h",
        keyCode: 72
    },
    {
        key: "i",
        keyCode: 73
    },
    {
        key: "j",
        keyCode: 74
    },
    {
        key: "k",
        keyCode: 75
    },
    {
        key: "l",
        keyCode: 76
    },
    {
        key: "m",
        keyCode: 77
    },
    {
        key: "n",
        keyCode: 78
    },
    {
        key: "o",
        keyCode: 79
    },
    {
        key: "p",
        keyCode: 80
    },
    {
        key: "q",
        keyCode: 81
    },
    {
        key: "r",
        keyCode: 82
    },
    {
        key: "s",
        keyCode: 83
    },
    {
        key: "t",
        keyCode: 84
    },
    {
        key: "u",
        keyCode: 85
    },
    {
        key: "v",
        keyCode: 86
    },
    {
        key: "w",
        keyCode: 87
    },
    {
        key: "x",
        keyCode: 88
    },
    {
        key: "y",
        keyCode: 89
    },
    {
        key: "z",
        keyCode: 90
    },
    {
        key: "+",
        keyCode: 187
    },
    {
        key: ",",
        keyCode: 188
    },
    {
        key: "-",
        keyCode: 189
    },
    {
        key: ".",
        keyCode: 190
    },
    {
        key: "ç",
        keyCode: 191
    },
    {
        key: "ñ",
        keyCode: 192
    },
    {
        key: "Dead",
        keyCode: 219
    },
    {
        key: "º",
        keyCode: 220
    },
    {
        key: "¡",
        keyCode: 221
    },
    {
        key: "Dead",
        keyCode: 222
    },
    {
        key: "AltGraph",
        keyCode: 225
    }
  ];
  for(const key of keys) {
    this[key.key] = {
      down: false,
      up: true
    };
    this[key.keyCode] = this[key.key];
  }
}

Keyboard.prototype.keydown = function(event) {
  this[event.key] = {
    down: true,
    up: false
  }
  console.log(event.key);
}

Keyboard.prototype.keyup = function(event) {
  this[event.key] = {
    down: false,
    up: true
  }
}

let keyboard = new Keyboard();
document.addEventListener("keydown", keyboard.keydown);
document.addEventListener("keyup", keyboard.keyup);

let color = [0.5, 0.3, 0.4];

async function main(canvas) {
  /*
  Main function. Declared as asynchronous to make better use of promises and read files.
  */
  const gl = canvas.getContext("webgl2");
  if(!gl) {
    console.log("Failed to create a webGL2 context.");
    return;
  }

  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, await (await fetch("../glsl/vertexShader.glvs")).text());
  gl.compileShader(await vertexShader);
  
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, await (await fetch("../glsl/fragmentShader.glfs")).text());
  gl.compileShader(await fragmentShader);
  
  let program = gl.createProgram();
  gl.attachShader(program, await vertexShader);
  gl.attachShader(program, await fragmentShader);
  gl.linkProgram(await program);

  let positions = new Float32Array([
    0.1, 0, 0,
    0.2, 0.5, 0,
    0.7, 0.3, 0
  ]);
  
  let vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  
  let positionL = gl.getAttribLocation(await program, "position");

  let vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionL);
  gl.vertexAttribPointer(positionL, 3, gl.FLOAT, false, 0, 0);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
  //gl.clearColor(0.5, 0.3, 0.4, 1.0);
  gl.clearColor(color[0], color[1], color[2], 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //gl.useProgram(await program);
  //gl.drawArrays(gl.TRIANGLES, 0, 3);

  setInterval(function() {
    if(keyboard["ArrowUp"].down) {
      console.log("Interval");
      color[0] += 0.025;
    }
    
    if(keyboard[37].down) {
      console.log("37");
      color[0] += 0.025;
    }

    if(keyboard[39].up) {
      console.log("RIG");
      color[0] += 0.025;
    }
    
    gl.clearColor(color[0], color[1], color[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, 33);
}

main(canvas);
/*
let array = [];

document.addEventListener("keydown", function(event) {
  let included = false;
  for(let item of array) {
    if(item.keyCode == event.keyCode) {
      included = true;
    }
  }
  if(!included) {
    array.push({
      key: event.key,
      keyCode: event.keyCode
    });
    array.sort((a, b) => a.keyCode - b.keyCode);
  }
  console.log(array);
});*/
