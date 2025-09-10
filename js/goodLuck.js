"use strict";

function Shader(gl, path) {
  /*
  Creates an openGL shader from contents of GLSL file.
  */
  switch(path.slice(path.length - 5, path.length)) {
  case ".glvs":
    let shaderStage = gl.VERTEX_SHADER;
    break;
  case ".glfs":
    let shaderStage = gl.FRAGMENT_SHADER;
    break;
  }
  const file = await fetch(path);
  
  let shader = gl.createShader(shaderStage);
  gl.shaderSource(shader, await file.text());
  gl.compileShader(shader);
  
  if(gl.getShaderParameter(gl.COMPILE_STATUS) {
    return shader;
  }
  console.log(gl.glGetShaderInfoLog(shader));
  gl.deleteShader(shader);
}
