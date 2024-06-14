const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const originalWidth = 800;
const originalHeight = 400;
canvas.width = originalWidth;
canvas.height = originalHeight;

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;

let paddle1MoveUp = false, paddle1MoveDown = false;
let paddle2MoveUp = false, paddle2MoveDown = false;

let scorePlayer1 = 0;
let scorePlayer2 = 0;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = '#fff';
    context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball
    context.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

    // Draw middle dashed line
    context.beginPath();
    context.setLineDash([10, 15]);
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = '#fff';
    context.stroke();

    // Draw scores
    context.font = '40px Arial';
    context.fillStyle = '#fff';
    context.fillText(scorePlayer1, canvas.width / 4, 50);
    context.fillText(scorePlayer2, canvas.width * 3 / 4 - 20, 50);
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballSize / 2 > canvas.height || ballY - ballSize / 2 < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballSize / 2 < paddleWidth) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            scorePlayer2++;
            resetBall();
        }
    }

    if (ballX + ballSize / 2 > canvas.width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            scorePlayer1++;
            resetBall();
        }
    }

    // Paddle movement
    if (paddle1MoveUp && paddle1Y > 0) {
        paddle1Y -= 5;
    }
    if (paddle1MoveDown && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += 5;
    }
    if (paddle2MoveUp && paddle2Y > 0) {
        paddle2Y -= 5;
    }
    if (paddle2MoveDown && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += 5;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 5;
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            paddle1MoveUp = true;
            break;
        case 's':
            paddle1MoveDown = true;
            break;
        case 'ArrowUp':
            paddle2MoveUp = true;
            break;
        case 'ArrowDown':
            paddle2MoveDown = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            paddle1MoveUp = false;
            break;
        case 's':
            paddle1MoveDown = false;
            break;
        case 'ArrowUp':
            paddle2MoveUp = false;
            break;
        case 'ArrowDown':
            paddle2MoveDown = false;
            break;
    }
});

gameLoop();