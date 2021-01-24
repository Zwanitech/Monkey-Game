
var monkey,monkey_running,moving;
var ground;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstacleGroup, invisibleGround;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover = "By zwani";

function preload(){
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
bananaImage = loadImage("banana.png"); 
obstacleImage = loadImage("obstacle.png"); 
junngleImage = loadImage("junglp.jpg")
 
  
 
}


function setup() {
  createCanvas(400,400);
    
  Background=createSprite(200,200,600,600)
  Background.addImage(junngleImage)
  Background.velocityX=-2
//creating ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible=false;
  
 //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  //creating banana & obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGround = createSprite(400,360,900,10);
  invisibleGround.visible = false;

 
  
  
}


function draw() {
  //background("white");

  //when we press space the monkey will jump upwards.
  if(keyDown("space")&& monkey.y >= 200)
     {
     monkey.velocityY=-10;
     }
   // moving ground
    Background.velocityX = -3 

    if (Background.x < 0){
      Background.x = Background.width/2;
    }
   
  
//adds gravity
  monkey.velocityY = monkey.velocityY+0.8;
  //resetting the ground to half it's width.
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
// we are calling our functions  here.
  food();
  spawnRocks();

  if(gamestate===PLAY){
    gameover.visible=false;

  if(bananaGroup.isTouching(monkey)){
      
    bananaGroup.destroyEach();
    score = score+2;
  }
}
    if (obstacleGroup.isTouching(monkey)) {
     gamestate=END
     obstacleGroup.destroyEach();
  
  } if(gamestate===END){
    
    monkey.destroy();
    ground.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible=true;
    stroke("#ffff00");
    textSize(20);
    text("Gameover: " + gameover,180,200);
    survivalTime=0;
    Background.visible=false;
    
  }
  //colides the monkey with ground
  monkey.collide( invisibleGround);
  drawSprites();
   
  //this is to help display the survival time text on the canvas 
  stroke("white");
  textSize(20);
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival time: " + survivalTime,200,50);
  
  
 
  
         
 
}

     
function food(){
   if(World.frameCount%80==0){
 
  banana = createSprite(300,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;

  bananaGroup.add(banana);  
     switch(score){
       case 10:monkey.scale=0.12;
       case 20:monkey.scale=0.14;  
       case 30:monkey.scale=0.16;
       case 40:monkey.scale=0.18;
         break;
         default: break;
     }
      
  }
}
function spawnRocks(){
  if(World.frameCount%60==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
}
