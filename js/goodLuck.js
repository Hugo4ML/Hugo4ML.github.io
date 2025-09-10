"use strict";

class Shader extends WebGLShader {
  /*
  Manages webGL shader object.
  */
  constructor(gl, path) {
    /*
    Generates and stores shader from data contained in file.
    */
    let shaderStage = undefined;
    switch(path.slice(path.length - 5, path.length)) {
    case ".glvs":
      shaderStage = gl.VERTEX_SHADER;
      break;
    case ".glfs":
      shaderStage = gl.FRAGMENT_SHADER;
      break;
    }
    super(gl.createShader(shaderStage));
    fetch(path).then(file => file.text()).then(text => gl.shaderSource(this, text));
    gl.compileShader(this);
    
    if(!gl.getShaderParameter(gl.COMPILE_STATUS)) {
      console.log(gl.glGetShaderInfoLog(this));
      gl.deleteShader(this);
    }
  }
}

/*
function Shader(gl, path) {
  
  Creates an openGL shader from contents of GLSL file.
  
  let shaderStage = undefined;
  switch(path.slice(path.length - 5, path.length)) {
  case ".glvs":
    shaderStage = gl.VERTEX_SHADER;
    break;
  case ".glfs":
    shaderStage = gl.FRAGMENT_SHADER;
    break;
  }
  Object.assign(this, gl.createShader(shaderStage));
  fetch(path).then(file => file.text()).then(text => gl.shaderSource(this, text));
  gl.compileShader(this);
  
  if(!gl.getShaderParameter(gl.COMPILE_STATUS)) {
    console.log(gl.glGetShaderInfoLog(this));
    gl.deleteShader(this);
  }
}
*/
function ShaderProgram(gl, vertexShader, fragmentShader) {
  /*
  Create a shader program attaching all specified shaders.
  */
  Object.assign(this, gl.createProgram());
  gl.attachShader(vertexShader);
  gl.attachShader(fragmentShader);
  gl.linkProgram(this);
  
  if(!gl.getProgramParameter(gl.LINK_STATUS)) {
    console.log(gl.glGetProgramInfoLog(this));
    gl.deleteShader(this);
  }
}

export {Shader, ShaderProgram};
