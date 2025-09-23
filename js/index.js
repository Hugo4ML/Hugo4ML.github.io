"use strict";

import * as input from "./input.js";

async function main() {
  /*
  Main function. Declared as asynchronous to make better use of promises and read files.
  */
  window.document.title = "(0.1.04) Simple project";
  
  const keyboard = new input.Keyboard();
  window.addEventListener("keydown", event => keyboard.keydown(event));
  window.addEventListener("keyup", event => keyboard.keyup(event));
  
  const canvas = window.document.getElementById("canvas");
  const gl = canvas.getContext("webgl2");
  if(!gl) {
    return;
  }

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, await (await fetch("../glsl/vertexShader.glvs")).text());
  gl.compileShader(await vertexShader);
  
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, await (await fetch("../glsl/fragmentShader.glfs")).text());
  gl.compileShader(await fragmentShader);
  
  const program = gl.createProgram();
  gl.attachShader(program, await vertexShader);
  gl.attachShader(program, await fragmentShader);
  gl.linkProgram(await program);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(0);
  gl.enableVertexAttribArray(1);
  
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, 4 * 5 * 32 / 8, gl.STATIC_DRAW);
  let positions = [
    new Float32Array([0.0 / 3, 0.0 / 3]),
    new Float32Array([1.0 / 3, 0.0 / 3]),
    new Float32Array([1.0 / 3, 1.0 / 3]),
    new Float32Array([0.0 / 3, 1.0 / 3])
  ];
  let colors = [
    new Float32Array([0.4, 0.5, 0.2]),
    new Float32Array([0.4, 0.5, 0.2]),
    new Float32Array([0.4, 0.5, 0.2]),
    new Float32Array([0.4, 0.5, 0.2])
  ];
  for(let vertex = 0; vertex < 5; ++vertex) {
    gl.bufferSubData(gl.ARRAY_BUFFER, vertex * 5 * 32 / 8 + 0,          positions[vertex]);
    gl.bufferSubData(gl.ARRAY_BUFFER, vertex * 5 * 32 / 8 + 2 * 32 / 8, colors[vertex]);
  }

  const ebo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array([
    0, 1, 2,
    0, 2, 3
  ]), gl.STATIC_DRAW);
  
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 2 * 32 / 8, 0);
  
  let color = [0.5, 0.3, 0.4, 1.0];
  
  let deltaInnerWidth = undefined, deltaInnerHeight = undefined;
  setInterval(async function() {
    if(deltaInnerWidth !== window.innerWidth || deltaInnerHeight !== window.innerHeight) {
      //Resize page.
      let minimum = window.innerWidth / 16 <= window.innerHeight / 9? window.innerWidth / 16: window.innerHeight / 9;
      canvas.width = minimum * 16, canvas.height = minimum * 9;
      canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px", canvas.style.top = (window.innerHeight - canvas.height) / 2 + "px";
      canvas.style.borderWidth = minimum / 32 + "px";
      deltaInnerWidth = window.innerWidth, deltaInnerHeight = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    };
    
    if(keyboard.keysDown) {
      if(color[0] < 1) {
        color[0] += 0.025;
      }
    }
    
    if(!keyboard.keysDown) {
      if(color[0] > 0) {
        color[0] -= 0.025;
      }
    }
    
    gl.clearColor(color[0], color[1], color[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.useProgram(await program);
    //gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_INT, 0);
  }, 1000 / 60);
}

main();
