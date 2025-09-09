"use strict";

document.title = "(0.03) Simple project";

const canvas = document.getElementById("canvas");

const gl = canvas.getContext("webgl2");
if(!gl) {
  console.log("Failed to create a webGL2 context.");
} else {
  let vertexShader = gl.createShader(gl.VERTEX_SHADER), fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.clearColor(0.5, 0.3, 0.2, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
