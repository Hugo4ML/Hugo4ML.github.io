"use strict";
/*
document.title = "(0.23) Simple project";
const canvas = document.getElementById("canvas");

let color = [0.5, 0.3, 0.4];

function Keyboard() {
  let keys = [
    "Unidentified",
    "Cancel", "Backspace", "Tab", "Clear", "Enter",
    "Shift", "Control", "Alt",
    "Pause", "CapsLock", "Escape",
    "henkan", "muhenkan",
    "",
    "PageUp", "PageDown",
    "End", "Home",
    "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown",
    "Select", "Print", "Execute", "F13", "Insert", "Delete", "Help",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    ":", ";", "<", "=", "-", "@",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];
  
}

Keyboard.prototype.keydown = function(event) {
  this[event.key] = {
    down: true,
    up: false
  }
  if(event.key == "@") {
    color[0] += 0.25;
  }
  
  if(event.key == "2") {
    color[1] += 0.25;
  }
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

async function main(canvas) {
  /*
  Main function. Declared as asynchronous to make better use of promises and read files.
  
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
    gl.clearColor(color[0], color[1], color[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, 33);
}

main(canvas);*/

let array = [];

document.addEventListener("keydown", function(event) {
  let included = false;
  for(let item in array) {
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
});

console.log("HOIIII");
