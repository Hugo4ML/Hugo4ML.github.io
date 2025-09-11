"use strict";

var vertexShaderSource = `#version 300 es

in vec3 position;

void main() {
  gl_Position = vec4(position, 1.0);
}
`;

var fragmentShaderSource = `#version 300 es

precision highp float;

out vec4 _fragColor;

void main() {
  _fragColor = vec4(1, 0, 0.5, 1);
}
`;

document.title = "(0.14) Simple project";
const canvas = document.getElementById("canvas");

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
  gl.shaderSource(vertexShader, vertexShaderSource);
  //fetch("../glsl/vertexShader.glvs").then(file => file.text()).then(source => gl.shaderSource(vertexShader, source));
  //fetch("../glsl/vertexShader.glvs").then(file => file.text()).then(console.log);
  gl.compileShader(vertexShader);
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  //gl.shaderSource(fragmentShader, fragmentShaderSource);

  let fragmentShaderFile = await fetch("../glsl/fragmentShader.glfs");
  let fragmentShaderSource = await fragmentShaderFile.text();
  gl.shaderSource(fragmentShader, await fragmentShaderSource);
  
  gl.compileShader(await fragmentShader);
  
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, await fragmentShader);
  gl.linkProgram(await program);

  let positions = new Float32Array([
    0, 0, 0,
    0, 0.5, 0,
    0.7, 0, 0
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
  
  gl.clearColor(0.5, 0.3, 0.4, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(await program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

main(canvas);

