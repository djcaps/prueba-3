var bg_img;
var NPC,NPC1,NPC1_img,NPC2,NPC2_img,NPC3,NPC3_img,NPC4,NPC4_img,NPC5,NPC5_img;
var invisibleground;
var laser,laser2,laser_group;
var PC,PC_img;
var GameOver,GameOverimg;
var Restart,RestartImg;
var Vida_img,Vida,VidaExtra_img,VidaExtra;
var Medalla;
var score =0;
var PLAY = 1;
var END = 2;
var gameState = PLAY;
var laser_sound;
var Starwars_sound;

function preload()
{
  bg_img = loadImage("fondo_0.png");
  NPC1_img = loadImage("NPC1_0.png");
  NPC2_img = loadImage("NPC2_0.png");
  NPC3_img = loadImage("NPC3_0.png");
  NPC4_img = loadImage("NPC4_0.png");
  NPC5_img = loadImage("NPC5_0.png");
  PC_img = loadImage("PC_0.png");
  Vida_img = loadImage("vida_0.png");
  GameOverimg=loadImage("game0ver_0.png")
  VidaExtra_img = loadImage("vida extra_0.png");
  Medalla = loadImage("medalla_0.png");
  laser_sound = loadSound("001094906_prev.mp3");
  Starwars_sound = loadSound("StarWars.mp3")
  RestartImg = loadImage("reset_0.png");
}

function setup() {
  createCanvas(1000,1200);
  frameRate(80);

  PC=createSprite(500, 1100, 50, 50);
  PC.addImage(PC_img);
  

 //creando mi suelo para mi PC principal
  invisibleground=createSprite(500,1150,1000,10);
  invisibleground.visible=false;

  GameOver = createSprite(450,600);
  GameOver.addImage(GameOverimg);
  GameOver.visible=false;

  Restart = createSprite(450,440);
  Restart.addImage(RestartImg);
  Restart.scale=0.2;
  Restart.visible=false;

  rectMode(CENTER);
  textSize(15);
  //Creacion de grupos enemigos
  NPC1_group=new Group();
  NPC2_group=new Group();
  NPC3_group=new Group();
  NPC4_group=new Group();
  NPC5_group=new Group();

  //Creacion de mi grupo de lasers
  laser_group=new Group(); 
}

function draw() 
{
  background(51);
  image(bg_img,0,0,1000,1200);

  //Añadir puntaje
  stroke("black");
  textSize(15);
  fill("white");
  text("Score: "+score,500,70);


  if (gameState===PLAY){

  Starwars_sound.play();
  //Starwars_sound.setVolume(0.5);
    
    if (keyDown("RIGHT_ARROW")){
      PC.x=PC.x+5;
    }
  
    if (keyDown("LEFT_ARROW")){
      PC.x=PC.x-5;
    }

    if(keyWentDown("SPACE")){
      spawnlaser();
      laser_sound.play();
    }

    var Select_Nave=Math.round(random(1,5));

    if(frameCount%80===0){
      if(Select_Nave===1) {
        spawnNPC1();
      }
      else if(Select_Nave===2){
        spawnNPC2();
      }
      else if(Select_Nave===3){
        spawnNPC3();
      }
      else if(Select_Nave===4){
        spawnNPC4();
      }
      else if(Select_Nave===5){
        spawnNPC5();
      }
    }

        /*Condicion para cambiar mi estado de juego a END*/
   if(PC.isTouching(NPC1_group)){
     gameState=END;
    NPC1_group.setVelocityY=0;
   }

   if(PC.isTouching(NPC2_group)){
     gameState=END;
     NPC2_group.setVelocityY=0;
   }

   if(PC.isTouching(NPC3_group)){
    gameState=END;
    NPC3_group.setVelocityY=0;
   }

   if(PC.isTouching(NPC4_group)){
     gameState=END;
     NPC4_group.setVelocityY=0;
   }

   if(PC.isTouching(NPC5_group)){
     gameState=END;
     NPC5_group.setVelocityY=0;
   }

   //Creacion de laseres
   
   if(laser_group.isTouching(NPC1_group)){
     NPC1_group.destroyEach();
     laser_group.destroyEach();
     score=score+25
   }

   if(laser_group.isTouching(NPC2_group)){
    NPC2_group.destroyEach();
    laser_group.destroyEach();
    score=score+50
  }

  if(laser_group.isTouching(NPC3_group)){
    NPC3_group.destroyEach();
    laser_group.destroyEach();
    score=score+75
  }

  if(laser_group.isTouching(NPC4_group)){
    NPC4_group.destroyEach();
    laser_group.destroyEach();
    score=score+100
  }

  if(laser_group.isTouching(NPC5_group)){
    NPC5_group.destroyEach();
    laser_group.destroyEach();
    score=score+200
  }

  if(NPC1_group.isTouching(invisibleground)){
    score=score-1;
  }



  if(NPC2_group.isTouching(invisibleground)){
    score=score-2;
  }

  if(NPC3_group.isTouching(invisibleground)){
    score=score-3;
  }

  if(NPC4_group.isTouching(invisibleground)){
    score=score-4;
  }


  if(NPC5_group.isTouching(invisibleground)){
    score=score-5;
  }

}



  else if(gameState===END) {
    GameOver.visible=true;
    Restart.visible=true;
    Starwars_sound.stop();

    if(mousePressedOver(Restart)){
      reset();
    }
  }

  drawSprites();
}

function spawnNPC1(){
    //Genera Naves Enemigas al azar
      NPC1=createSprite(random(40,950),0,10,40); 
      NPC1.addImage(NPC1_img);
      NPC1.velocityY=4;
      NPC1.lifetime=300;  
    //Añade cada obstaculo a cada grupo de obstaculos
      NPC1_group.add(NPC1);
}

function spawnNPC2(){
  //Genera Naves Enemigas al azar
    NPC2=createSprite(random(40,950),0,10,40); 
    NPC2.addImage(NPC2_img);
    NPC2.velocityY=4;
    NPC2.lifetime=300; 
  //Añade cada obstaculo a cada grupo de obstaculos
    NPC2_group.add(NPC2);
}

function spawnNPC3(){
  //Genera Naves Enemigas al azar
    NPC3=createSprite(random(40,950),0,10,40); 
    NPC3.addImage(NPC3_img);
    NPC3.velocityY=4;
    NPC3.lifetime=300; 
  //Añade cada obstaculo a cada grupo de obstaculos
    NPC3_group.add(NPC3);
}

function spawnNPC4(){
  //Genera Naves Enemigas al azar
    NPC4=createSprite(random(40,950),0,10,40); 
    NPC4.addImage(NPC4_img);
    NPC4.velocityY=4;
    NPC4.lifetime=300; 
  //Añade cada obstaculo a cada grupo de obstaculos
    NPC4_group.add(NPC4);
}

function spawnNPC5(){
  //Genera Naves Enemigas al azar
    NPC5=createSprite(random(40,950),0,10,40); 
    NPC5.addImage(NPC5_img);
    NPC5.velocityY=4;
    NPC5.lifetime=300; 
  //Añade cada obstaculo a cada grupo de obstaculos
    NPC5_group.add(NPC5);
}

  function spawnlaser(){
    laser=createSprite(PC.x-10,PC.y-45,5,25);
    laser.velocityY=-5;
    laser.shapeColor="red";
    laser_group.add(laser);
    //Laser 2
    laser2=createSprite(PC.x+10,PC.y-45,5,25);
    laser2.velocityY=-5;
    laser2.shapeColor="red";
    laser_group.add(laser2);
  }

  //Creacion de mi funcion reset 
  function reset(){
    gameState = PLAY;
    GameOver.visible=false;
    Restart.visible=false;
    score=0;
  }