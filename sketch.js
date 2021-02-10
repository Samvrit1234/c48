var trackimg;
var infiniteroad, infiniteroad2;
var car;
var stone;
var invisibleline, invisibleline2;
var count = 0;
var PLAY = 1;
var END = 0;
var GAMESTATE = PLAY;
var stonesGroup;
var distance = 0;
function preload(){

  trackimg = loadImage("images/track.png");
  carimg = loadImage("images/car.png");
  stoneimg = loadImage("images/stone.jpg");

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  

  infiniteroad = createSprite(displayWidth/2,displayHeight/2,displayHeight);
  infiniteroad.scale = 2;
 // infiniteroad.y = infiniteroad.height/2;
 infiniteroad.velocityY = 4;
  infiniteroad.addImage("track",trackimg);

  /*infiniteroad2 = createSprite(displayWidth/2 + 3000,displayHeight/2 + 5000 , displayHeight);
  infiniteroad2.scale = 2;
  infiniteroad2.y = infiniteroad2.height/2;
  infiniteroad2.addImage("track",trackimg);*/


stonesGroup = new Group();
 

car = createSprite(displayWidth - 780,displayHeight - 100,20,20);
car.addImage("car",carimg);

invisibleline = createSprite(displayWidth -180,displayHeight - 430,10,displayHeight);
invisibleline.shapeColor = "red";
invisibleline.visible = false;


invisibleline2 = createSprite(displayWidth - 1340,displayHeight - 430,10,displayHeight);
invisibleline2.shapeColor = "red";
invisibleline2.visible = false;




  
}

function draw() {
  background(rgb(198,135,103));
  image(trackimg , 0,-displayHeight*4,displayWidth, displayHeight*5);
 
  if(GAMESTATE === PLAY){
    if (infiniteroad.y > displayHeight) {
     infiniteroad.y = height/2;
  }
    // car.velocityY = -3;
     invisibleline.velocityY = car.velocityY;
     invisibleline2.velocityY = car.velocityY;
 count = count + Math.round(getFrameRate()/60);
  if(keyDown(RIGHT_ARROW)){
   // car.velocityY = -3;
    car.velocityX = 8;
  }
  if(keyDown(LEFT_ARROW)){
   // car.velocityY = -3;
    car.velocityX = -8;
  }
  if(keyDown(UP_ARROW)){
   // car.velocityY = -3;
   // car.velocityX = 0;
    distance = distance + 50;
  }
  car.collide(invisibleline);
  car.collide(invisibleline2);
  spawnStones();
  camera.position.x = displayWidth/2;
  camera.position.y = car.y;
  }
  else if(GAMESTATE === END){
    infiniteroad.velocityY = 0;
    stonesGroup.destroyEach();
    car.velocityX = 0;
    car.velocityY = 0;
    count = 0;
  }
 
 if(stonesGroup.isTouching(car)){
   GAMESTATE = END;
 }
 /*if(distance > 1180){
   GAMESTATE = END;
 }*/
  
  drawSprites();

  fill("green");
  textSize(30);
  text("Score : " + count,displayWidth - 300,car.y);
  console.log(distance);
  
}

function spawnStones(){
  if(frameCount % 200 === 0){
 stone = createSprite(Math.round(random(car.x-180,displayWidth - 1340)),Math.round(random(displayHeight - 430,displayHeight - 100)));
    stone.addImage("stone",stoneimg);
    stone.scale = 0.15;
    stonesGroup.add(stone);
    }
   }
