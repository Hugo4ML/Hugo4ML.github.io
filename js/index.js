"use strict";

import * as goodLuck from "./goodLuck.js";

document.title = "(0.08) Simple project";

const canvas = document.getElementById("canvas");

const gl = canvas.getContext("webgl2");
if(!gl) {
  console.log("Failed to create a webGL2 context.");
} else {
  let vertexShader = new goodLuck.Shader(gl, "../glsl/vertexShader.glvs");
  let fragmentShader = new goodLuck.Shader(gl, "../glsl/fragmentShader.glfs");
  let shaderProgram = new goodLuck.ShaderProgram(gl, vertexShader, fragmentShader);

  let positions = new Float32Array([
    0, 0, 0,
    0, 0.5, 0,
    0.7, 0, 0
  ]);
  
  let vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  
  let positionL = gl.getAttribLocation("position");

  let vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionL);
  gl.vertexAttribPointer(positionL, 3, gl.FLOAT, false, 0, 0);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
  gl.clearColor(0.5, 0.3, 0.4, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram();
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
