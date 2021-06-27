var fairy , fairyVoice, fairyImg;
var bgImg;
var fairyHappy, fairyHappyImg;
var starImg, star, starBody;
var fairyMirrorImg, fairyMirror;
var END = 0;
var PLAY =1;
var gameState = PLAY;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
	starImg = loadImage("images/star.png");
	fairyHappyImg = loadImage("images/happyFairy.png")
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starNight.png");
	fairyMirrorImg = loadAnimation("images/fairyMirror1.png","images/fairyMirror2.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");	
}

function setup() {
	createCanvas(800, 650);
	fairy = createSprite(130, 490);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;
	fairyVoice.play();
	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	fairyMirror = createSprite(100,100);
	fairyMirror.addAnimation("fairyMirror",fairyMirrorImg);
	fairyMirror.scale = 0.85;
	fairyMirror.visible = false;

	fairyHappy = createSprite(400,200);
	fairyHappy.addImage(fairyHappyImg);
	fairyHappy.visible = false;

	fairyMirror.x = fairy.x;
	fairyMirror.y = fairy.y;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}

function draw() {
  background(bgImg);

  fairy.setCollider("rectangle",70,0,900,200);
  fairyMirror.setCollider("rectangle",0,0,300,100);
  keyPressed();
  drawSprites();
  //text(mouseX + ','+ mouseY,10,45);
  star.x= starBody.position.x;
  star.y= starBody.position.y; 

  if(gameState === END){
	  fairy.visible = false;
	  fairyMirror.visible = false;
	  fairyHappy.visible = true;
	  star.x = 460;
	  star.y = 230;
	  stroke("white");
	  fill("white");
	  textSize(20);
	  text("Yay! You have made the fairy happy!",250,450);
  }
}

function keyPressed() {
	if(gameState === PLAY){
		if (keyDown("down") || touches.length > 0 && gameState === PLAY){
			Body.setStatic(starBody,false);
		}
		if(starBody.position.y>470){
			Body.setStatic(starBody,true);
		}
		if(keyDown("right")&& gameState === PLAY){
			fairy.x = fairy.x+5;
			fairyMirror.x = fairyMirror.x+5;
			fairy.visible = true;
			fairyMirror.visible = false;
		}
		if(keyDown("left")&& gameState === PLAY){
			fairy.addAnimation("fairyMirror",fairyMirrorImg);
			fairy.x = fairy.x-5;
			fairyMirror.x = fairyMirror.x-5;
			fairyMirror.visible = true;
			fairy.visible = false;	
		}
		if(fairy.isTouching(star)){
			gameState = END;
		}
	}

}
