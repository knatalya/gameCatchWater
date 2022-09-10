function drawPaddle() {
    if (rightPressed) {
        paddleX += 3;
        if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
    }
    else if(leftPressed) {
        paddleX -= 3;
        if (paddleX < 0) paddleX = 0;
    }
    ctx.clearRect(0, canvas.height-paddleHeight, canvas.width, paddleHeight);
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    if(y == canvas.height) {
        y = 0;
        random = Math.random() * (canvas.width - 0) + 0;
    } else if (random >= (paddleX-10) && random <= (paddleX+10) && y >= (canvas.height-paddleHeight) && y <= canvas.height) {
        y = 0;
        random = Math.random() * (canvas.width - 0) + 0;
        counter++;
    } else if (counter == 10) {
        var end = new Date();
        var ok = confirm("Ты попил водички достаточно! Потратил времени: " + (end-start)/1000 + " секунд!");
        if(ok) {
            counter = 0;
            start = new Date();
        }
    }
    y += 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height-paddleHeight);
    ctx.beginPath();
    ctx.rect(random, y, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
    else if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
    else if(e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
}

// Определяем канвас
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// Высота и ширина платформы
var paddleHeight = 10;
var paddleWidth = 10;
// Начальное расположение платформы
var paddleX = (canvas.width-paddleWidth) / 2;
// Нажатие клавиш
var rightPressed = false;
var leftPressed = false;
// Начальная точки капелек
var y = 0;
var random = 10;
// Счетчики
var counter = 0;
var start = new Date();
// Обработка событий
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(drawPaddle, 10);
setInterval(draw, 10);