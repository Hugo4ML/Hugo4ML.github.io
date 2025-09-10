"use strict";

import * as goodLuck from "./goodLuck.js";

document.title = "(0.07) Simple project";

const canvas = document.getElementById("canvas");

const gl = canvas.getContext("webgl2");
if(!gl) {
  console.log("Failed to create a webGL2 context.");
} else {
  let vertexShader = new Shader(gl, "../glsl/vertexShader.glvs");
  let fragmentShader = new Shader(gl, "../glsl/fragmentShader.glfs");
  let shaderProgram = new ShaderProgram(gl, vertexShader, fragmentShader);
  gl.clearColor(0.5, 0.3, 0.4, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
