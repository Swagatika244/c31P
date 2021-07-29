const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine, world ;
//var base1, base2;
var bridge;
var jointPoint;
var stone;
var stones=[];
var backGround;
var zombie;
var breakButton;
var ground;

function preload(){
  zombieLR = loadAnimation("assets/zombie1.png", "assets/zombie2.png");
  zombieRL = loadAnimation("assets/zombie3.png", "assets/zombie4.png");
  zombieSad = loadAnimation("assets/sad_zombie.png");
  
  zombieLR.frameDelay =15;
  zombieRL. frameDelay =15;
  backGround = loadImage("assets/background.png");

}

function setup() {
  
  createCanvas(windowWidth, windowHeight-5);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
 //create zombie
  zombie = createSprite(250, height - 100);
  zombie.addAnimation('LeftToRight', zombieLR);
  zombie.addAnimation('RightToLeft', zombieRL);
  zombie.addAnimation('sad', zombieSad);
  zombie.velocityX = 1;
  zombie.scale = 0.1;

  bridge = new Bridge(27, {x:40, y:height/2-120});
  jointPoint = new Base(width-220,height/2-100, 40, 20);
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i=0; i<=8; i++){
    var x = random(width/2 - 200, width/2 + 300);
    var y = random(-100,100);
     stones[i] = new Stone(x, y, 80, 80);
    }
  
  

  // create button 
  breakButton = createImg('axe.png');
  breakButton.position(width-250,height/2);
  breakButton.size(80,80);
  breakButton.mouseClicked(handleButtonPress);
}

function draw() {
  background(backGround);
  Engine.update(engine);


  if(zombie.x>=width-300){
    zombie.velocityX=-3;
    zombie.changeAnimation('RightToLeft');

   }else if(zombie.x<300){
    zombie.velocityX=3;
    zombie.changeAnimation('LeftToRight');

  }

  bridge.show();

  for (var i=0; i<=8; i++ ){
    stones[i].show();
  
  if(distance(zombie, stones[i].body)===true){
    zombie.velocityX = 0;
    zombie.changeAnimation('sad');
  }
}
    
drawSprites();

}

function handleButtonPress(){
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}

function distance(body1, body2){
  var d = dist(body1.position.x, body1.position.x, body2.position.x, body2.position.y);
  if(d<50){
    return true;
  }else{
    return false;
  }
}