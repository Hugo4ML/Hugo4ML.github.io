"use strict";

WebGL2RenderingContext.prototype.readShader = async function(path) {
  /*
  Creates an openGL shader from contents of GLSL file.
  */
  switch(path.slice(path.length - 5, path.length)) {
  case ".glvs":
    let shaderStage = this.VERTEX_SHADER;
    break;
  case ".glfs":
    let shaderStage = this.FRAGMENT_SHADER;
    break;
  }
  const file = await fetch(path);
  
  let shader = this.createShader(shaderStage);
  this.shaderSource(shader, await file.text());
  this.compileShader(shader);
  
  if(this.getShaderParameter(this.COMPILE_STATUS) {
    return shader;
  }
  console.log(this.glGetShaderInfoLog(shader));
  this.deleteShader(shader);
}
