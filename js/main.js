import { Pilota } from "./pilota.js";
// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/


var canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let num = 1;
let pilotes = []
function loop() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (num == 1) {
    for (let n = 0; n < 25; n++) {
      let mida = random(10, 20)
      let x = random((0 + mida), (width - mida))
      let y = random((0 + mida), (height - mida))
      let velX = random(-7, 7)
      let velY = random(-7, 7)
      let pilota = new Pilota(x, y, velX, velY, randomRGB(), mida);
      pilotes.push(pilota)
    }

  }

  pilotes.forEach(pilota => {
    pilota.dibuixa(ctx);
    pilota.mou(width, height);
    pilotes.forEach(pilota2 => {
      if (pilota != pilota2) {
        pilota.coloisiona(pilota2)
      }
    })
  });



  num = 2
  requestAnimationFrame(loop);
}
loop()

// funció per generar un número aleatori entre dues xifres
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// funció per generar un color aleatori
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


