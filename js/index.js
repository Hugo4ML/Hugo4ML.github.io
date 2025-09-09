document.title = '(0.01) Simple project';

const canvas = document.getElementById("canvas");

const gl = canvas.getContext("webgl2");
if(!gl) {
  console.log("Failed to create a webGL2 context.");
} else {
  console.log("Webgl2 context succesfully generated.");
  gl.clearColor(0.5, 0.3, 0.2, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
