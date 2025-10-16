/* Práctica 02. */
console.log('02. Práctica de errores B.');

// "Debuggeando el rebote"
// 🧩 Hay errores de tipo, sintaxis, referencia y lógica.

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

// Tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Propiedades de la pelota
let ball = {
    x: 100,
    y: 100,
    radius: 60,
    color: "red",
    speedX: 6,
    speedY: 3
};

// Función para dibujar la pelota
function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Función para actualizar la posición
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimiento de la pelota
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Rebote en los bordes
    if (ball.x > canvas.width - ball.radius || ball.x < 0 + ball.radius) {
    ball.speedX *= -1;
    } else if (ball.y > canvas.height - ball.radius|| ball.y < 0 + ball.radius) {
    ball.speedY = ball.speedY * -1;
    }


    drawBall();
    requestAnimationFrame(update);
}

// Ejecutar animación
update();