var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var keysDown = {}
addEventListener("keydown", function(e){keysDown[e.keyCode] = true});
addEventListener("keyup", function(e){delete keysDown[e.keyCode]});

var x = 0;
var y = 0;
var score = 0;
var speed = 5;

var ball = function(){x = 0;y = 0};

var balls = ["", "", "", "", "", "", ""];
var thisball;
for (i = 0;i < balls.length;i++)
{
    thisball = new ball();
    thisball.x = (Math.random()) * c.width;
    thisball.y = 30;
    balls[i] = thisball;
}

var clear = function(){
    c.height = c.height;
}

var colliderect = function(ax, ay, blx, brx, bty, bby){
    r = false;
    if ((ax >= blx && ax <= brx) && (ay >= bty && ay <= bby))
    {
        r = true;
    }
    return r;
}

var start = function(){
    ctx.fillStyle = "#000000"
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseLine = "top";
    ctx.fillText("type space to start", 32, 32);
    if (keysDown[32] == true)
    {
        clearInterval(start_interval_ID);
        setInterval(update, 20);
    }
}

var update = function(){
    clear();

    ctx.fillStyle = "#00FF00";
    for (i = 0;i < balls.length;i++)
    {
        ctx.arc(balls[i].x, balls[i].y, 20, 0, 2 * Math.PI);
        balls[i].y += speed;
        ctx.closePath();
        ctx.fill();
    }

    y = 500;
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(x, y, 200 , 75);

    ctx.fillStyle = "#000000"
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseLine = "top";
    ctx.fillText(score, 32, 32);

    if (keysDown[37] == true && x > 0)
    {
        x -= 10;
    }
    if (keysDown[39] == true && x < (c.width - 200))
    {
        x += 10;
    }

    if (keysDown[38] == true && speed < 10)
    {
        speed += 0.5;
    }
    if (keysDown[40] == true && speed > 1)
    {
        speed -= 0.5;
    }

    for (i = 0;i < balls.length;i++)
    {
        if (colliderect(balls[i].x, balls[i].y, x, x + 200, y, y + 75))
        {
            score += 1;
            balls[i].y = 10;
            balls[i].x = (Math.random()) * c.width;
        }

        if (balls[i].y >= 600)
        {
            balls[i].y = 10;
            balls[i].x = (Math.random()) * c.width;
        }
    }
}

var start_interval_ID = setInterval(start, 100);
