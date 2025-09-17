"use strict";

import * as input from "./input.js";

window.document.title = "(0.49) Simple project";
const canvas = window.document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

function resizeCanvasToDisplaySize() {
  //DEMO TO SEE IF THIS REMOVES FLICKERING.
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;
 
  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
 
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}
function resize() {
  /*
  Resize page contents.
  */
  let minimum = window.innerWidth / 16 <= window.innerHeight / 9? window.innerWidth / 16: window.innerHeight / 9;
  canvas.width = minimum * 16, canvas.height = minimum * 9;
  canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px";
  canvas.style.top = (window.innerHeight - canvas.height) / 2 + "px";
  canvas.style.borderWidth = minimum / 16 + "px";
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}
//resize();
//resizeCanvasToDisplaySize()
//window.addEventListener("resize", resizeCanvasToDisplaySize);

let keyboard = new input.Keyboard();
window.addEventListener("keydown", event => keyboard.keydown(event));
window.addEventListener("keyup", event => keyboard.keyup(event));

let color = [0.5, 0.3, 0.4];

async function main(canvas) {
  /*
  Main function. Declared as asynchronous to make better use of promises and read files.
  */
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
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    if(keyboard["ArrowUp"].down) {
      console.log("Interval");
      color[0] += 0.025;
    }
    if(keyboard["ArrowDown"].down) {
      console.log("Interval");
      color[0] -= 0.025;
    }
    if(keyboard["ArrowLeft"].down) {
      console.log("Interval");
      color[1] += 0.025;
    }
    if(keyboard["ArrowRight"].down) {
      console.log("Interval");
      color[1] -= 0.025;
    }
    
    gl.clearColor(color[0], color[1], color[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, 33);
}

main(canvas);
/*
let array = [];

window.addEventListener("keydown", function(event) {
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
