const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const originalWidth = 800;
const originalHeight = 400;
canvas.width = originalWidth;
canvas.height = originalHeight;

let gamePaused = false;
let menuVisible = true;

const paddleWidth = 10, paddleHeight = 100;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = parseInt(document.getElementById('ballSpeed').value);
let ballSpeedY = parseInt(document.getElementById('ballSpeed').value);
let ballSize = parseInt(document.getElementById('ballSize').value);

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
    ballSpeedX = parseInt(document.getElementById('ballSpeed').value);
    ballSpeedY = parseInt(document.getElementById('ballSpeed').value);
    ballSize = parseInt(document.getElementById('ballSize').value);
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * ballSpeedX;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * ballSpeedY;
}

function gameLoop() {
    if (!gamePaused) {
        draw();
        update();
    }
    requestAnimationFrame(gameLoop);
}

function showMenu() {
    document.getElementById('menu').style.display = 'block';
    gamePaused = true;
    menuVisible = true;
}

function hideMenu() {
    document.getElementById('menu').style.display = 'none';
    gamePaused = false;
    menuVisible = false;
}

function showSettings() {
    document.getElementById('settingsMenu').style.display = 'flex';
}

function hideSettings() {
    document.getElementById('settingsMenu').style.display = 'none';
}

document.getElementById('startBtn').addEventListener('click', function() {
    hideMenu();
    gamePaused = false;
});

document.getElementById('settingsBtn').addEventListener('click', function() {
    hideMenu();
    showSettings();
});


document.getElementById('backBtn').addEventListener('click', function() {
    hideSettings();
    showMenu();
});

document.getElementById('quitBtn').addEventListener('click', function() {
    resetBall();
    hideMenu(); 
    hideSettings();
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    showMenu();
    draw();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!menuVisible) {
            hideSettings();
            showMenu();
            gamePaused = true;
        }
    }
});

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
hideSettings();
showMenu();
