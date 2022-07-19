var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.35;

  doorsGroup = new Group
  climbersGroup = new Group
  invisibleBlockGroup = new Group
}

function draw() {
  background(200);
  if(gameState === "play"){
    
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY = -10
    }
    
    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 6
    }

    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 6
    }

    ghost.velocityY = ghost.velocityY + 0.5
    createObstacles();
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      tower.velocityY = 0;
      gameState = "end"
    }
  }
 
  drawSprites();

  if(gameState === "end"){
    fill("white");
    stroke("black");
    textSize(50);
    text("Fim de jogo!!",160,300);

  }
}

function createObstacles(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,480));

    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    climber.addImage(climberImg);

    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    climber.x = door.x;
    invisibleBlock.x = door.x;

    ghost.depth = door.depth;
    ghost.depth += 1;

    door.lifetime = 720;
    climber.lifetime = 720;
    invisibleBlock.lifetime = 720;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = false
  }
  


}
