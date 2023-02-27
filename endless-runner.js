// canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// player variables
var player = {
	x: canvas.width/2,
	y: canvas.height/2,
	radius: 20,
	speed: 5
}

// obstacles variables
var obstacles = [];
var obstacleSpeed = 5;
var obstacleInterval = 10;

// key variables
var leftKey = false;
var rightKey = false;
var upKey = false;
var downKey = false;

// game loop
function gameLoop() {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// update player position
	if (leftKey && player.x > player.radius) {
		player.x -= player.speed;
	}
	if (rightKey && player.x < canvas.width - player.radius) {
		player.x += player.speed;
	}
	if (upKey && player.y > player.radius) {
		player.y -= player.speed;
	}
	if (downKey && player.y < canvas.height - player.radius) {
		player.y += player.speed;
	}

	// draw player
	ctx.beginPath();
	ctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();

	// update obstacles
	if (Math.random() < obstacleInterval/1000) {
		var obstacle = {
			x: Math.random() * canvas.width,
			y: -50,
			width: 50,
			height: 50
		}
		obstacles.push(obstacle);
	}
	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].y += obstacleSpeed;
		if (obstacles[i].y > canvas.height) {
			obstacles.splice(i, 1);
		}
	}

	// draw obstacles
	for (var i = 0; i < obstacles.length; i++) {
		ctx.beginPath();
		ctx.rect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
		ctx.fillStyle = "blue";
		ctx.fill();
	}

	// check for collisions
	for (var i = 0; i < obstacles.length; i++) {
		if (Math.sqrt(Math.pow(player.x - obstacles[i].x, 2) + Math.pow(player.y - obstacles[i].y, 2)) < player.radius + obstacles[i].width/2) {
			alert("Game Over!");
			location.reload();
		}
	}

	// request next frame
	window.requestAnimationFrame(gameLoop);
}

// key events
document.addEventListener("keyup", function(event) {
	if (event.keyCode == 37) {
		leftKey = true;
        rightKey = false;
        upKey = false;
        downKey = false;
	}
	if (event.keyCode == 39) {
		rightKey = true;
        leftKey = false;
        upKey = false;
        downKey = false;
	}
	if (event.keyCode == 38) {
		upKey = true;
        leftKey = false;
        rightKey = false;
        downKey = false;
	}
	if (event.keyCode == 40) {
		downKey = true;
        leftKey = false;
        rightKey = false;
        upKey = false;
	}
});

// start game loop
window.requestAnimationFrame(gameLoop);
