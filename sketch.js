var PLAY = 1;
var END = 0;
var gameState = PLAY;
var win=2
var backgroundMove
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,gameover,gameoverimage,restart,resatrtimage,winimage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1;

var score=60
var c=0
var p=0


function preload(){
  trex_running = loadAnimation("1.png.png","3.png.png","4.png.png");
  trex_collided = loadAnimation("1.png.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("power_up-removebg-preview.png")
 backgroundImage = loadImage("PiZLYr.png");
  

winline1=loadImage("winimg-removebg-preview.png"
)
  winimage=loadImage("you win.jpg")
  obstacle1 = loadImage("spikes-removebg-preview.png"
);
  
  gameoverimage=loadImage("looser-removebg-preview.png")
  restartimage=loadImage("spikes-removebg-preview.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
    background = createSprite(180,10,300,300);
  background.addImage(backgroundImage);
  background.scale = 1.5
  
  
  trex = createSprite(80,240,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.3
  
  
  
  ground = createSprite(width/2,height-180,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  console.log(width,height)
  
  invisibleGround = createSprite(width/2,height-200,width,10);
  invisibleGround.visible = false;
  
  youwon=createSprite(width/2,height/2,width,height)
  youwon.addImage( winimage)
  youwon.scale=1.5
  gameover=createSprite(width/2,height/2)
  gameover.addImage(gameoverimage)
  gameover.scale=0.7
  restart=createSprite(800,800)
  restart.addImage(restartimage)
  restart.scale=0.5
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  win=createGroup()
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,40);
  

}

function draw() {

  //displaying score
  text("Time remaining: "+ score, 400,50);
  
  
  
  
  if(gameState === PLAY){
    //move the ground
    
    background.velocityX=-0.5
    ground.velocityX = -4;
    //scoring
   //score = score + Math.round(frameCount/60);
    if(frameCount%30===0 && score>0)
    {
      score --
      score=score+c
      
     
   }
  youwon.visible=false
    gameover.visible=false
    restart.visible=false
    if (background.x < 400){
      background.x = background.width/2;
    }
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >=height-230) {
        trex.velocityY = -17;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    winLine()
    
    
    if(obstaclesGroup.isTouching(trex)){
        //score=Math.round(score-0.60);
     c=-2
    }
     else if(cloudsGroup.isTouching(trex)){
        //score=Math.round(score-0.60);
       cloud.remove();
     c=5
   
    }
    c=0
    if (score < 1) {
      gameState = END
      
    }
    
    
    
    
  }
   if(win.isTouching(trex)){
        //score=Math.round(score-0.60);
      gameState = win    
  }
  
     
   
  
  
   else if (gameState === END) {
      ground.velocityX = 0;
     trex.changeAnimation("collided",trex_collided)
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     background.velocityX=0
     obstaclesGroup.setLifetimeEach(-1)
     cloudsGroup.setLifetimeEach(-1)
      win.setVelocityXEach(0);
     gameover.visible=true
    restart.visible=true
     if(mousePressedOver(restart)){
    gameState=PLAY
     obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
       win.destroyEach()
    score=60
    trex.changeAnimation("running",trex_running)
        }
   }
  else if (gameState === win) {
      ground.velocityX = 0;
     trex.changeAnimation("collided",trex_collided)
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
      background.velocityX=0
     obstaclesGroup.setLifetimeEach(-1)
     cloudsGroup.setLifetimeEach(-1)
       
  score=60
    youwon.visible=true
     
    restart.visible=true
     if(mousePressedOver(restart)){
    gameState=PLAY
     obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
         win.destroyEach()
     gameState=PLAY
    score=0
    trex.changeAnimation("running",trex_running)
        }
   }
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  if(mousePressedOver(restart)){
    gameState=PLAY
  }
  
  
  drawSprites();
  textSize(35);
   text("Time remaining: "+ score, 200,50)
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(width+10,height-200,10,40);
   obstacle.velocityX = -6;
   obstacle.scale=0.30
    //generate random obstacles
   
   obstacle.addImage(obstacle1);
    obstaclesGroup.add(obstacle)
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 200 === 0) {
     cloud = createSprite(width+10,height-400,40,10);
    cloud.y = Math.round(random(height-350,height-260));
    cloud.addImage(cloudImage);
    cloud.scale = 0.15;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 1400;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1 ;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}
function winLine() {
  //write code here to spawn the clouds
   if (frameCount % 1600 === 0) {
     winner= createSprite(width+10,height-240,40,300);
     winner.addImage(winline1 )
    winner.velocityX = -4;
    winner.scale=0.6
    
    win.add(winner)
   
    }
}
