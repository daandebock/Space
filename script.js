let img;
let blaster;
let explosion;

let gunX = 0;
let gunY = 200;
const bullets = [];
let invaderX = 350;
let invaderY = 200;
const invaders = [{
    x: invaderX,
    y: invaderY

}];
let teller = 0;
function preload() {
    img = loadImage('1000_F_458661624_4cAnWUWPKTWmLDlrbyHYI4jV7biS12ss.png');
    raket = loadImage('istockphoto-1249611748-1024x1024.png');
    blaster = loadSound('shot.mp3');
    explosion = loadSound('explosion.mp3');
}

function setup() {
    bg = loadImage('istockphoto-1035676256-612x612.jpeg');
    createCanvas(400, 400);
    drawInvader()
}

function draw() {
    background(bg);
    drawGun();
    drawInvader();
    fill("red");
    drawBullets();
    checkCollision();
    score();
    checkbump();




}
function drawGun() {

    image(img, gunX, gunY, 50, 20);

}
function keyPressed() {
    if (keyCode === 38) {
        gunY = gunY - 20;
    } else if (keyCode === 40) {
        gunY = gunY + 20;
    } else if (keyCode === 32) {
        const bullet = {
            x: gunX,
            y: gunY
        };
        bullets.push(bullet);
        blaster.play();

    }
}
function drawBullets() {
    bullets.forEach((element) => rect(element.x++ + 50, element.y, 5, 5))
}
function drawInvader() {
    invaders.forEach((element) => image(raket, element.x--, element.y, 50, 20))
}
function spawnInvader() {
    const invader = {
        x: 350,
        y: random(5, 350)
    }
    invaders.push(invader);
}
function checkCollision() {
    bullets.forEach((element) => {
        const distance = dist(element.x, element.y, invaders[0].x, invaders[0].y);

        if (distance < 50) {
            bullets.shift();
            invaders.shift();
            spawnInvader();
            teller++;
            explosion.play();


        }
    })

}
function removeInvader() {
    if (invaders.length > 1) {
        invaders.shift();
        console.log(invaders);
    }
}
function score() {
    textSize(20);
    fill("white");
    textAlign(CENTER);
    text('HIGHSCORE ' + teller, 200, 20);
}
function checkbump() {
    invaders.forEach((element) => {
        const distance = dist(element.x, element.y, gunX, gunY);
        if (distance < 30) {
            noLoop();
            background("white");
            textAlign(CENTER);
            fill("black")
            text("YOU LOST", 200, 200);
        }
    })
}