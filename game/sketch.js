var food;
var bombGroup;
var gameState = "play"
var score = 0;
function preload() {

  boyImage = loadAnimation("fat boy 1 bg.png", "fat boy 2 bg.png", "fat boy 3 bg.png", "fat boy 4 bg.png");
  cloudImage = loadImage("cloud.png")
  bomb1Image = loadImage("bomb 1 bg.png")
  burgerImage = loadImage("burger.png")
  pizzaImage = loadImage("pizza.png")
  chipsImage = loadImage("chips.png")
  donutImage = loadImage("donut bg.png")
  toffeeImage = loadImage("toffee png.png")
  friesImage = loadImage("fries png.png")

  chewingSound = loadSound("chewing sound.mp3")
  gameoverImage = loadImage("game over.png")
  bombImage = loadImage("bomb 1 bg.png")
  bomb2Image = loadImage("bomb 2.png")
}

function setup() {
  createCanvas(1500, 600);
  bg = createSprite(1000, 450, 1500, 600);
  bg.addImage(cloudImage)
  bg.velocityX = -2;
  bg.scale = 2;
  // bg.x=bg.width/2;

  gameover = createSprite(750, 300, 200, 50);
  gameover.addImage(gameoverImage)
  gameover.visible = false;

  boy = createSprite(100, 450, 20, 50);
  boy.addAnimation("running", boyImage);
  boy.scale = 0.5;


  ground = createSprite(750, 500, 1500, 10);
  ground.velocityX = -2;
  //ground.x=ground.width/2;
  ground.visible = false;

  foodGroup = new Group()
  bombGroup = new Group()

  toffeeImage.resize(300, 300)
}

function draw() {

  background("black");

  if (gameState === "play") {
    if (bg.x < 500) {
      bg.x = 1000;
    }

    if (ground.x < 80) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space")) {
      boy.velocityY = -10
    }
    boy.velocityY = boy.velocityY + 0.5
    boy.debug = "true"
    boy.setCollider("rectangle", 0, 0, 5, 5)

    foodGroup.collide(boy, explosion);


    if (bombGroup.isTouching(boy)) {
      gameState = "over";
    }

    boy.collide(ground);
    createFood();
    createBomb();
  }

  if (gameState === "over") {
    bg.velocityX = 0;
    gameover.visible = true
    boy.visible = false;
    bomb.addImage(bomb2Image);
    bomb.velocityX = 0;
    bomb.scale = 2.5;
    foodGroup.destroyEach();
    //bombGroup.destroyEach();
    //
  }

  drawSprites();
  fill("Green");
  textSize(50);
  text("You ate " + score + " food", 600, 50)

}

function explosion(foodGroup, boy) {
  foodGroup.remove();
  // spriteB.score++;
  chewingSound.play();
  score = score + 1;
}



function createFood() {
  if (frameCount % 50 === 0) {
    food = createSprite(Math.round(random(100, 1000)), Math.round(random(300, 500)))
    rand = Math.round(random(1, 6))
    switch (rand) {
      case 1: food.addImage(burgerImage)
        break;
      case 2: food.addImage(friesImage)
        break;
      case 3: food.addImage(pizzaImage)
        break;
      case 4: food.addImage(chipsImage)
        break;
      case 5: food.addImage(donutImage)
        break;
      case 6: food.addImage(toffeeImage)
        break;
      default: break;
    }

    foodGroup.add(food)
    food.scale = 0.2;
    food.velocityX = -4;
  }
}


function createBomb() {
  if (frameCount % 200 === 0) {
    bomb = createSprite(Math.round(random(0, 1000)), Math.round(random(300, 500)))
    bomb.addImage(bombImage)
    bomb.scale = 0.2;
    bomb.velocityX = -5;
    bombGroup.add(bomb)
  }
}
