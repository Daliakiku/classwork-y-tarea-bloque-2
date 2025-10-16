/* 04. Errores silenciosos. */
console.log('04. Errores silenciosos.');

// --- CONFIGURACIÓN ---
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 300;

// Pelota
let ball = {
    x: 250,
    y: 50,
    radius: 25,
    color: 'green'
};

// Velocidad y gravedad
let speed = { x: 4, y: 0 };
let gravity = 0.5;
let bounceFactor = 1.0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function updateBall() {
    // Movimiento
    ball.x += speed.x;
    ball.y += speed.y;

    // // Gravedad
    // if (speed.y >= 0){ //if speed is positive, increase speed
    //     speed.y += gravity;
    // } else if (speed.y < 0){ //if speed is negative, meaning the ball is traveling upwards, reduce speed
    //     speed.y -= gravity;
    // }

    speed.y += gravity;

    // Rebote en el piso y techo
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius; // Adjust position to stay within bounds
        speed.y *= -bounceFactor;
    } else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius; // Adjust position to stay within bounds
        speed.y *= -bounceFactor;
    }

    // Rebote en los lados
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius; // Adjust position to stay within bounds
        speed.x *= -bounceFactor;
    } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius; // Adjust position to stay within bounds
        speed.x *= -bounceFactor;
    }
    
}


function animate() {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateBall();
    drawBall();
    requestAnimationFrame(animate);
}

animate();