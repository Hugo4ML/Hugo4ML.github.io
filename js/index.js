"use strict";

import * as input from "./input.js";

function Snake() {
  this.position = {
    x: 0.0,
    y: 0.0
  };
}

async function main() {
  /*
  Main function. Declared as asynchronous to make better use of promises and read files.
  */
  window.document.title = "(0.1.11) Simple project";
  
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
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 5 * 32 / 8, 0);
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 5 * 32 / 8, 2 * 32 / 8);
  
  
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, 4 * 5 * 32 / 8, gl.STATIC_DRAW);
  
  let colors = [
    new Float32Array([0.4, 0.5, 0.2]),
    new Float32Array([0.4, 0.5, 0.2]),
    new Float32Array([0.4, 0.5, 0.2]),
    new Float32Array([0.4, 0.5, 0.2])
  ];
  for(let vertex = 0; vertex < 4; ++vertex) {
    gl.bufferSubData(gl.ARRAY_BUFFER, vertex * 5 * 32 / 8 + 2 * 32 / 8, colors[vertex]);
  }
  
  const ebo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array([
    0, 1, 2,
    0, 2, 3
  ]), gl.STATIC_DRAW);
  
  //gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 5 * 32 / 8, 0);
  //gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 5 * 32 / 8, 2 * 32 / 8);
  
  let color = [0.5, 0.3, 0.4, 1.0];

  let snake = new Snake();
  
  let time = Date.now();
  let deltaInnerWidth = undefined, deltaInnerHeight = undefined;
  setInterval(async function() {
    //Calculate delta time.
    let deltaTime = Date.now() - time;
    time = Date.now();
    
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

    if(keyboard.ArrowDown.down) {
      snake.position.y -= 0.01 * deltaTime;
      console.log(snake.position.y);
    }
    if(keyboard.ArrowUp.down) {
      snake.position.y += 0.01 * deltaTime;
      console.log(snake.position.y);
    }
    if(keyboard.ArrowRight.down) {
      snake.position.x -= 0.01 * deltaTime;
      console.log(snake.position.x);
    }
    if(keyboard.ArrowLeft.down) {
      snake.position.x += 0.01 * deltaTime;
      console.log(snake.position.x);
    }

    let positions = [
      new Float32Array([0.0 / 3, 0.0 / 3]),
      new Float32Array([1.0 / 3, 0.0 / 3]),
      new Float32Array([1.0 / 3, 1.0 / 3]),
      new Float32Array([0.0 / 3, 1.0 / 3])
    ];
    for(let vertex = 0; vertex < 4; ++vertex) {
      positions[vertex][0] += snake.position.x;
      positions[vertex][1] += snake.position.y;
      gl.bufferSubData(gl.ARRAY_BUFFER, vertex * 5 * 32 / 8, positions[vertex]);
    }
    
    gl.clearColor(color[0], color[1], color[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.useProgram(await program);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);
  }, 1000 / 60);
}

main();
