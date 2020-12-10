var m
var m_r
var b
var b_i
var o
var o_i
var fg
var og
var s
var sT
var g

function preload() {
  m_r = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  b_i = loadImage("banana.png");
  o_i = loadImage("obstacle.png");

}



function setup() {
  sT = 0;
  m = createSprite(80, 315, 20, 20);
  m.addAnimation("running", m_r);
  m.scale = 0.1;
  g = createSprite(400, 350, 900, 10);
  g.velocityX = -4;
  g.x = g.width/2;
  fg = new Group();
  og = new Group();
  s = 0;
}

function c() {
  if ((keyDown("space") || keyDown("up") || keyDown("w"))) {
    m.velocityY = -12;
  }
}

function fs() {
  if (frameCount % 80 === 0) {
    b = createSprite(600,250,40,10);
    b.y = random(120,200);    
    b.velocityX = -5;
    b.lifetime = 300;
    m.depth = b.depth + 1;
    b.addImage(b_i);
    b.scale=0.05;
    fg.add(b);
  }
}

function os(){
  if(frameCount % 300 === 0) {
    o = createSprite(800,320,10,40);
    o.velocityX = -6;
    o.addImage(o_i);
    o.scale=0.15;
    o.lifetime = 300;
    og.add(o);
  }
}

function end(){
  if(og.isTouching(m)){
        g.velocityX = 0;
        m.velocityY = 0;
        og.setVelocityXEach(0);
        fg.setVelocityXEach(0);
        og.setLifetimeEach(-1);
        fg.setLifetimeEach(-1);
    }
}

function draw() {
  background("red");
  
  if(g.x<0) {
    g.x=g.width/2;
  }
  
  c();
  
  m.velocityY = m.velocityY + 0.8;
  
  m.collide(g);
  
  fs();
  os();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ s, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  sT= Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ sT, 100,50);
  
  end();
  
  drawSprites();
}