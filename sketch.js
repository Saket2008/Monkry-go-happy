var monkey, monkeyRunning, monkeyCollided, bananaImage, obstacleImage, bananaGroup, obstacleGroup, backgroundPic, backgrounds, invisibleG, restart, restartPic, gameOver, gameOverPic;

var score = 0;
var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var touch = 0;

function preload() {
  
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyCollided = loadAnimation("Monkey_11.png");
  
  backgroundPic = loadImage("jungle.jpg");
  
  obstacleImage = loadImage("stone.png");
  
  bananaImage = loadImage("banana.png");
  
  restartPic = loadImage("restart.png");
  
  gameOverPic = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 300);
  
  backgrounds = createSprite(450, 50);
  backgrounds.addImage(backgroundPic);
  backgrounds.scale = 1;
  backgrounds.velocityX = -4;
  if ((backgrounds.x - 150) < 0){
    backgrounds.x = 450;
  }
  
  monkey = createSprite(60,230,20,10);
  monkey.addAnimation("running", monkeyRunning);
  monkey.scale = 0.15;
  
  invisibleG = createSprite(200, 275, 400, 5);
  invisibleG.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  restart = createSprite(300, 150);
  restart.addImage(restartPic);
  restart.visible = false;
  restart.scale = 0.5;
  
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverPic);
  gameOver.visible = false;
  gameOver.scale = 0.65
}

function draw() {
 background(220);
  
  if (gameState === PLAY) 
  {
    monkey.velocityY = monkey.velocityY + 0.8 
  
  if ((backgrounds.x - 150) < 0){
    backgrounds.x = 450;
  }
  
  if (keyDown("space") && monkey.y > 226){
    monkey.velocityY = -12
  }
  
  spawnKele();
  spawnObstacles();
    
  if (bananaGroup.isTouching(monkey)){
    score = score + 2;
    bananaGroup.destroyEach();
  }
    
  if (monkey.isTouching(obstacleGroup)){
    touch = touch + 1;
    monkey.scale = 0.1;
  }
   
  if (touch === 2){
    gameState = END
  }
  }
  else if (gameState === END) 
  {
   restart.visible = true;
   gameOver.visible = true;
   monkey.changeAnimation("collided", monkeyCollided);
   monkey.velocityY = 0;
   backgrounds.velocityX = 0;
   obstacleGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
   bananaGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
    
   if (mousePressedOver(restart)){
     reset();
   }
  }
  
  monkey.collide(invisibleG);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function spawnObstacles() 
{
  if(frameCount % 300 === 0) 
  {
    var obstacle = createSprite(600,250,10,40);
    obstacle.velocityX = - (6 + 3*score/10);
    
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.10;
    obstacle.lifetime = 100;
    
    monkey.depth = obstacle.depth + 1;
    
    obstacle.setCollider("circle", 0, 0, 100);
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnKele() 
{
  if(World.frameCount % 80 === 0) 
  {
    var bananas = createSprite(600,random(75, 125),10,40);
    
    bananas.velocityX = - (6 + 3*score/10);
    
    bananas.addImage(bananaImage);
    restart.depth = bananas.depth + 1;
    gameOver.depth = bananas.depth + 1;
    
    //assign scale and lifetime to the obstacle           
    bananas.scale = 0.055;
    bananas.lifetime = 100;
    
    //add each obstacle to the group
    
    bananaGroup.add(bananas);
  }
}

function reset()
{
 score = 0;
 touch = 0;
 gameOver.visible = false;
 restart.visible = false;
 obstacleGroup.destroyEach();
 bananaGroup.destroyEach();
 monkey.changeAnimation("running", monkeyRunning);
 gameState = PLAY;
 backgrounds.velocityX = -4;
 monkey.scale = 0.15
}
