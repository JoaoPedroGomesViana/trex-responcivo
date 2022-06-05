var PLAY=1
var END=0
var gameState=PLAY
var grupocaquitos
var gruponuvens



var trex, trex_running, edges;
var groundImage;
var solo
var soloinvisivel 
var pontos=0
var pulo
var morte 
var checkpoint

function preload(){

  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
nuvemImage = loadImage("cloud.png")
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png")
obstacle4 = loadImage("obstacle4.png")
obstacle5 = loadImage("obstacle5.png")
obstacle6 = loadImage("obstacle6.png")
trexcollided = loadImage("trex_collided.png")
gameover = loadImage("gameOver.png")
restart = loadImage("restart.png")
pulo = loadSound("jump.mp3")
morte = loadSound("die.mp3")
checkpoint = loadSound("checkpoint.mp3")

}

function setup(){

  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,height-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexcollided)
  edges = createEdgeSprites();
  fimdejogo = createSprite(width/2,height/2)
  fimdejogo.addImage(gameover)
  reiniciar = createSprite(width/2,height/2+40)
  reiniciar.addImage(restart)
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  trex.debug=false
  trex.setCollider("circle",5,5,40)
  solo = createSprite(200,height-20,400,20)
  solo.addImage(groundImage)
  soloinvisivel = createSprite(200,height-10,400,20)
  soloinvisivel.visible=false
grupocaquitos= new Group
gruponuvens= new Group


}


function draw(){

  //definir a cor do plano de fundo 
  background("white");
  text("pontos: "+pontos,width/2,50)
  
if(gameState===PLAY){
  fimdejogo.visible=false
  reiniciar.visible=false
  pontos=pontos+Math.round(frameRate()/60)
  solo.velocityX=-(3+pontos/100)
  if (solo.x<0){
    solo.x=solo.width/2
    }
    console.log(trex.y)
    if ((touches.length > 0 || keyDown('space')) && trex.y >= height - 60) {
      trex.velocityY = -10;
      pulo.play()
      touches=[]
    }
    
    trex.velocityY = trex.velocityY + 0.5;
    gerarcaquitos()
    gerarnuvens()
   if(grupocaquitos.isTouching(trex)){
     gameState=END
morte.play()
   } 
if(pontos>0 && pontos%100===0){
  checkpoint.play()
}
}else if(gameState===END){
  fimdejogo.visible=true
  reiniciar.visible=true
  solo.velocityX=0
grupocaquitos.setVelocityXEach(0)
gruponuvens.setVelocityXEach(0)
trex.changeAnimation("collided",trexcollided)
grupocaquitos.setLifetimeEach(-1)
gruponuvens.setLifetimeEach(-1)
trex.velocityY=0
}
  
  
  //registrando a posição y do trex
 
  
  //pular quando tecla de espaço for pressionada
  
  
 //impedir que o trex caia
  trex.collide(soloinvisivel)
  if (touches.length > 0 || mousePressedOver(reiniciar)) {
  reset()
}
  drawSprites();


}
function gerarnuvens(){
  if (frameCount%60===0){
 var nuvem = createSprite(width+20,height/2,40,10)
  nuvem.velocityX = -3
nuvem.addImage(nuvemImage)
nuvem.y=Math.round(random(10,80))
console.log(trex.depth)
console.log(nuvem.depth)
nuvem.depth=trex.depth
trex.depth=trex.depth+1
nuvem.lifetime= width

gruponuvens.add(nuvem)

}
 

}
function gerarcaquitos(){
  if (frameCount%60===0){
    var obstacle = createSprite(width,height-35,10,40)
    obstacle.velocityX = -(6+pontos/100)
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
break;
default:break

    }
obstacle.scale=0.5
obstacle.lifetime=width
grupocaquitos.add(obstacle)

  }

}

function reset(){
  gameState=PLAY
  grupocaquitos.destroyEach()
  gruponuvens.destroyEach()
  pontos=0
  trex.changeAnimation("running",trex_running)
}