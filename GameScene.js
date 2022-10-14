level =0;
hneed = false;
textEntry = null;
inputactive  = false;
enableflash = false;
disableflash = false;
ExecuteAnswer = 0;
rect = null;
rect2=null;
displayValue = false;

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  preload() {
  }

  create() {

    //this.scene.launch("HintScene")

    this.anims.create({
      key: 'endConfetti',
      frames: this.anims.generateFrameNames('endConfetti', {
          start: 0,
          end: 47,
          zeroPad: 0,
          prefix: 'checkconfetti',
          suffix: '.png'
      }),
      frameRate: 40,
      repeat: 0
  });

    this.anims.create({
      key: 'pop',
      frames: this.anims.generateFrameNames('arrowRevealAnim', {
          start: 0,
          end: 30,
          zeroPad: 0,
          prefix: 'REVEAL',
          suffix: '.png'
      }),
      frameRate: 30,
      repeat: 0
  });


  this.anims.create({
      key: 'breathe',
      frames: this.anims.generateFrameNames('arrowBreatheAnim', {
          start: 0,
          end: 30,
          zeroPad: 0,
          prefix: 'BREATHE',
          suffix: '.png'
      }),
      frameRate: 30,
      repeat: -1
  });



    this.add.image(0,0,'bg').setOrigin(0)
    this.add.image(0,0,'towers').setOrigin(0).setDepth(5);

    this.answered = false
    this.cloud1 = this.add.image(-150,30,'cloud1').setOrigin(0);
    
    this.cloud2 = this.add.image(800,18,'cloud2').setOrigin(0);

    this.cloud3 = this.add.image(-150,18,'cloud3').setOrigin(0);

    this.line = this.add.image(400,29,'line1').setOrigin(0.5,0).setDepth(10).setAlpha(0);
    this.sun1 = this.add.image(120,300,'sun1').setDepth(2);
    this.sun2 = this.add.image(120,300,'sun2').setAlpha(1).setDepth(1);
    this.mhand = this.add.image(400,242,'mhand').setOrigin(0.5,0.8667).setDepth(6);
    this.hhand = this.add.image(400,242,'hhand').setOrigin(0.5,0.9).setDepth(6).setAngle(180);

    this.next = this.add.sprite(732,402,'arrowRevealAnim').setScale(0.5).setDepth(6).setInteractive({ cursor: "pointer" });
    
    this.meter = this.add.image(400,327,'meter').setOrigin(0.5,0).setDepth(6).setAlpha(0);
    //this.marker = this.add.image(378  405.2,319,'marker').setOrigin(0.5,0).setDepth(7).setInteractive({ cursor: "pointer" });
    this.marker = this.add.image(405.2,319,'marker').setOrigin(0.5,0).setDepth(7).setInteractive({ cursor: "pointer" }).setAlpha(0);
    //-(6*27.875)

    this.leftText = this.add.image(126,295,'leftText').setOrigin(0).setDepth(6).setInteractive({ cursor: "pointer" }).setAlpha(0);
    this.rightText = this.add.image(504,295,'rightText').setOrigin(0).setDepth(6).setInteractive({ cursor: "pointer" }).setAlpha(0);
    this.endConfetti = this.add.sprite(400,400,'endConfetti').setDepth(10);
    this.reply = this.add.image(400,400,'correct').setDepth(9).setAlpha(0)

    this.input1 = this.add.image(585,28,'Input-1').setOrigin(0).setDepth(11).setInteractive({ cursor: "pointer" }).setAlpha(0)
    this.cursor = this.add.sprite(604,40 ,"cursor").setOrigin(0).setDepth(11).setVisible(false);

    this.flash1 = this.plugins.get('rexflashplugin').add(this.cursor, {
      duration: 700,
      repeat: 1000
                  });

    this.marker.on("pointerover",
    ()=>{
      this.marker.setScale(1.1)
     },this)
     this.marker.on("pointerout",
     ()=>{
       this.marker.setScale(1)
      },this)

    this.input.setDraggable(this.marker);

    rect = this.add.rexRoundRectangle(405, 355,5,10,5, 0x808080,1).setOrigin(1,0).setDepth(6).setVisible(false);
    rect2 = this.add.rexRoundRectangle(405, 355,5,10,5, 0x808080,1).setOrigin(0,0).setDepth(6).setVisible(false);

    this.minus8 = this.add.image(405-(8*27.875), 393.5,"minus8").setOrigin(0.5).setDepth(11).setVisible(false)
    this.minus7 = this.add.image(405-(7*27.875), 393.5,"minus7").setOrigin(0.5).setDepth(11).setVisible(false)
    this.minus6 = this.add.image(405-(6*27.875), 393.5,"minus6").setOrigin(0.5).setDepth(11).setVisible(false)
    this.minus5 = this.add.image(405-(5*27.875), 393.5,"minus5").setOrigin(0.5).setDepth(11).setVisible(false)
    this.minus4 = this.add.image(405-(4*27.875), 393.5,"minus4").setOrigin(0.5).setDepth(11).setVisible(false)
    this.minus3 = this.add.image(405-(3*27.875), 393.5,"minus3").setOrigin(0.5).setDepth(11).setVisible(false)
    this.minus2 = this.add.image(405-(2*27.875), 393.5,"minus2").setOrigin(0.5).setDepth(11).setVisible(false)
    this.minus1 = this.add.image(405-(1*27.875), 393.5,"minus1").setOrigin(0.5).setDepth(11).setVisible(false)
    
    this.plus8 = this.add.image(406.2+(8*27.875), 393.5,"plus8").setOrigin(0.5).setDepth(11).setVisible(false)
    this.plus7 = this.add.image(406.2+(7*27.875), 393.5,"plus7").setOrigin(0.5).setDepth(11).setVisible(false)
    this.plus6 = this.add.image(406.2+(6*27.875), 393.5,"plus6").setOrigin(0.5).setDepth(11).setVisible(false)
    this.plus5 = this.add.image(406.2+(5*27.875), 393.5,"plus5").setOrigin(0.5).setDepth(11).setVisible(false)
    this.plus4 = this.add.image(406.2+(4*27.875), 393.5,"plus4").setOrigin(0.5).setDepth(11).setVisible(false)
    this.plus3 = this.add.image(406.2+(3*27.875), 393.5,"plus3").setOrigin(0.5).setDepth(11).setVisible(false)
    this.plus2 = this.add.image(406.2+(2*27.875), 393.5,"plus2").setOrigin(0.5).setDepth(11).setVisible(false)
    this.plus1 = this.add.image(406.2+(1*27.875), 393.5,"plus1").setOrigin(0.5).setDepth(11).setVisible(false)
    
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
     // gameObject.setDepth(5);

     if(dragX <640 && dragX>170){
      if(dragX>405){
        rect.setVisible(false)
        rect2.setVisible(true)
      }
      else{
        rect2.setVisible(false)
        rect.setVisible(true)

      }
      gameObject.x = dragX;
      //gameObject.y = dragY;

      //this.rect.x = dragX;
      this.graphicX = dragX;
      rect.setSize(405-this.graphicX,10);
      rect2.setSize(this.graphicX-405,10);



     }

    });


    
    this.input.on("dragend", function (pointer, gameObject, dropped) {

      gameObject.disableInteractive()
      displayValue = true

      if(gameObject.x <405-(7.5*27.875) ){
        gameObject.x = 405-(8*27.875)
      }
      else if(gameObject.x <405-(6.5*27.875) ){
        gameObject.x = 405-(7*27.875)
      }
      else if(gameObject.x <405-(5.5*27.875) ){
        gameObject.x = 405-(6*27.875)
      }      
      else if(gameObject.x <405-(4.5*27.875) ){
        gameObject.x = 405-(5*27.875)
      } 
      else if(gameObject.x <405-(3.5*27.875) ){
        gameObject.x = 405-(4*27.875)
      }
      else if(gameObject.x <405-(2.5*27.875) ){
        gameObject.x = 405-(3*27.875)
      }
      else if(gameObject.x <405-(1.5*27.875) ){
        gameObject.x = 405-(2*27.875)
      }
      else if(gameObject.x <405-(0.5*27.875) ){
        gameObject.x = 405-(1*27.875)
      }
      else if(gameObject.x >406.2+(7.5*27.875) ){
        gameObject.x = 406.2+(8*27.875)
      }
      else if(gameObject.x >406.2+(6.5*27.875) ){
        gameObject.x = 406.2+(7*27.875)
      }
      else if(gameObject.x >406.2+(5.5*27.875) ){
        gameObject.x = 406.2+(6*27.875)
      }
      else if(gameObject.x >406.2+(4.5*27.875) ){
        gameObject.x = 406.2+(5*27.875)
      }
      else if(gameObject.x >406.2+(3.5*27.875) ){
        gameObject.x = 406.2+(4*27.875)
      }
      else if(gameObject.x >406.2+(2.5*27.875) ){
        gameObject.x = 406.2+(3*27.875)
      }
      else if(gameObject.x >406.2+(1.5*27.875) ){
        gameObject.x = 406.2+(2*27.875)
      }
      else if(gameObject.x >406.2+(0.5*27.875) ){
        gameObject.x = 406.2+(1*27.875)
      }
      else{

        //gameObject.x = 405.2

      }

      rect.setSize(405-gameObject.x,10)//.setFillStyle(	0x33cc66,1);
      rect2.setSize(gameObject.x-405,10)//.setFillStyle(	0x33cc66,1);

      if(gameObject.x ==405-(4*27.875)){
        rect.setFillStyle(0x33cc66,1)

        ExecuteAnswer =1

      }
      else{
        rect.setFillStyle(	0xcc3300,1)
        rect2.setFillStyle(	0xcc3300,1)
        ExecuteAnswer =-1
      }


    })
    //rect.setFillStyle(	0x33cc66,1)
    //  32px radius on the corners
    //this.graphicX = 290

    //this.add.graphics().fillStyle(0x808080, 1);
    //this.rect = this.add.graphics().fillRoundedRect(this.graphicX,355,(410-this.graphicX), 10, 5).setDepth(6);

    textEntry = this.add.text(605, 58,"", { fontFamily: "font1", fontSize: "40px", fill: "#000000" }).setOrigin(0.5).setDepth(5).setDepth(11);

    this.input.keyboard.on('keydown', function (event) {
    if (event.keyCode == 8 && textEntry.text.length > 0 &&inputactive)
        {
            textEntry.text = "";

            enableflash = true
            
        }
        else if (((event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 48 && event.keyCode <= 57))&&(textEntry.text.length < 1)&&inputactive)
        {
            textEntry.text += event.key;
            disableflash=true
        } 
    });
              
                  
    this.input1.on("pointerdown",
    ()=>{ 
      this.input1.setTexture('Input-2')
inputactive = true;

if(textEntry.text==''){enableflash = true
}
    },
    this
  );

    this.leftText.on("pointerdown",
    ()=>{ this.leftText.setTexture('leftText_on').disableInteractive();

    this.rightText.disableInteractive();
    this.reply.setTexture('correct')
    this.endConfetti.play('endConfetti')
    this.tweens.add({
      targets:this.reply,
        alpha:1,
       ease: "sine.easeOut",
        duration: 400,
      repeat: 0,
      onComplete:()=>{
        this.next.play('pop').setVisible(true)
        this.time.delayedCall(500, () => {
            this.next.play('breathe')
        },[],this);
      }
      });  
  },this);


  this.rightText.on("pointerdown",
  ()=>{ this.rightText.setTexture('rightText_on').disableInteractive();
  
  this.leftText.disableInteractive();
  this.reply.setTexture('wrong');

  this.tweens.add({
    targets:this.reply,
      alpha:1,
     ease: "sine.easeOut",
      duration: 400,
    repeat: 0,
    onComplete:()=>{hneed = true;}
    });


    this.tweens.add({
      targets:this.reply,
        alpha:0,
       ease: "sine.easeOut",
       delay:1000,
        duration: 400,
      repeat: 0,
      onComplete:()=>{

        //this.rightText.setTexture('rightText').setInteractive()
        this.leftText.setInteractive()
      }
      });



},
  this
);



    //this.endConfetti.play('endConfetti')
    this.next.on(
      "pointerdown",
      function () {
      //this.cameras.main.flash();    
      //inputactive=false
      this.reply.setAlpha(0)
      this.line.setAlpha(0)
      this.next.setVisible(false)
      level++
      this.gamestart()
      }, this);

    this.gamestart()


    this.tweens.add({
      targets:[this.cloud1],
        x:1000,
       ease: "linear",
        duration: 60000,
      repeat: -1
      });

      this.tweens.add({
        targets:[this.cloud2],
          x:-200,
         ease: "linear",
         delay:2000,
          duration: 60000,
        repeat: -1
        });


      this.tweens.add({
        targets:[this.cloud3],
          x:1000,
         ease: "linear",
          duration: 60000,
          delay:500,
        repeat: -1
        });


        
  
  }
  gamestart(){

    if (level==0){
      this.tweens.add({
        targets:this.line,
          alpha:1,
         ease: "sine.easeOut",
          duration: 400,
        repeat: 0,
        onComplete:()=>{
          this.next.play('pop').setVisible(true)
          this.time.delayedCall(500, () => {
              this.next.play('breathe')
          },[],this);
        }
        });
    }

    else if(level==1){
      this.line.setTexture('line2')
      this.tweens.add({
        targets:this.line,
          alpha:1,
         ease: "sine.easeOut",
          duration: 400,
        repeat: 0,
        onComplete:()=>{
          this.next.play('pop').setVisible(true)
          this.time.delayedCall(500, () => {
              this.next.play('breathe')
          },[],this);
        }
        });
    }

    else if(level==2){
      this.tweens.timeScale =20;

        this.sunrise = 3000*this.tweens.timeScale;


        this.tweens.add({
          targets:this.mhand,
            angle:360,
           ease: "linear",
            duration: this.sunrise/6,
          repeat: 5
          });
  
          
        this.tweens.add({
          targets:this.hhand,
            angle:0,
           ease: "linear",
            duration: this.sunrise,
          repeat: 0
          });
    

    this.tweens.add({
      targets:[this.sun1,this.sun2],
      x:400,
       ease: "sine.easeIn",
        duration: this.sunrise,
          repeat: 0,
          onStart: () => {

            this.tweens.add({
              targets:this.sun1,
              alpha:0,
               ease: "Linear",
                duration: this.sunrise,
                  repeat: 0
              });

             // this.tweens.add({
             //   targets:this.sun2,
             //   alpha:1,
             //    ease: "Linear",
            //      duration: this.sunrise,
              //      repeat: 0
              //  });
          },
          onComplete:()=>{
            this.tweens.timeScale =1;

            this.line.setTexture('line3')
            this.tweens.add({
              targets:this.line,
                alpha:1,
               ease: "sine.easeOut",
                duration: 400,
                delay:1000,
              repeat: 0,
              onComplete:()=>{
                this.next.play('pop').setVisible(true)
                this.time.delayedCall(500, () => {
                    this.next.play('breathe')
                },[],this);
              }
              });

          }
      });

      this.tweens.add({
        targets:[this.sun1,this.sun2],
          y:100,
         ease: "sine.easeOut",
          duration: this.sunrise,
        repeat: 0
        });
    }

    else if(level==3){
      this.line.setTexture('line4')
      this.tweens.add({
        targets:this.line,
          alpha:1,
         ease: "sine.easeOut",
          duration: 400,
        repeat: 0,
        onComplete:()=>{
          this.next.play('pop').setVisible(true)
          this.time.delayedCall(500, () => {
              this.next.play('breathe')
          },[],this);
        }
        });
    }

    else if(level==4){

      this.line.setTexture('line5')
      this.tweens.add({
        targets:this.line,
          alpha:1,
         ease: "sine.easeOut",
          duration: 400,
        repeat: 0,
        onComplete:()=>{
          
          this.tweens.add({
            targets:[this.leftText,this.rightText],
              alpha:1,
             ease: "sine.easeOut",
              duration: 400,
            repeat: 0,})

        }
        });


    }

    else if(level==5){
      hattempt =0
      this.leftText.setAlpha(0)
      this.rightText.setAlpha(0)
      this.answered = true
      this.line.setTexture('line6')
      this.tweens.add({
        targets:[this.line,this.input1],
          alpha:1,
         ease: "sine.easeOut",
          duration: 400,
        repeat: 0,
      })
    }

    else if(level ==7){
      this.input1.setAlpha(0)
      textEntry.text=""
      this.line.setTexture('line7')
      this.tweens.add({
        targets:this.line,
          alpha:1,
         ease: "sine.easeOut",
          duration: 400,
        repeat: 0,
        onComplete:()=>{

          this.tweens.add({
            targets:[this.meter,this.marker],
              alpha:1,
             ease: "sine.easeOut",
              duration: 400,
            repeat: 0
          })

        }
      })

    }


  }

  update() {

    if(displayValue){
      displayValue = false

      if(this.marker.x ==405-(8*27.875) ){
        this.minus8.setVisible(true)
      }
      else if(this.marker.x ==405-(7*27.875) ){
        this.minus7.setVisible(true)
      }
      else if(this.marker.x ==405-(6*27.875) ){
        this.minus6.setVisible(true)
      }
      else if(this.marker.x ==405-(5*27.875) ){
        this.minus5.setVisible(true)
      }
      else if(this.marker.x ==405-(4*27.875) ){
        this.minus4.setVisible(true)
      }
      else if(this.marker.x ==405-(3*27.875) ){
        this.minus3.setVisible(true)
      }
      else if(this.marker.x ==405-(2*27.875) ){
        this.minus2.setVisible(true)
      }
      else if(this.marker.x ==405-(1*27.875) ){
        this.minus1.setVisible(true)
      }

      else if(this.marker.x ==406.2+(1*27.875) ){
        this.plus1.setVisible(true)
      }
      else if(this.marker.x ==406.2+(2*27.875) ){
        this.plus2.setVisible(true)
      }
      else if(this.marker.x ==406.2+(3*27.875) ){
        this.plus3.setVisible(true)
      }
      else if(this.marker.x ==406.2+(4*27.875) ){
        this.plus4.setVisible(true)
      }
      else if(this.marker.x ==406.2+(5*27.875) ){
        this.plus5.setVisible(true)
      }
      else if(this.marker.x ==406.2+(6*27.875) ){
        this.plus6.setVisible(true)
      }
      else if(this.marker.x ==406.2+(7*27.875) ){
        this.plus7.setVisible(true)
      }
      else if(this.marker.x ==406.2+(8*27.875) ){
        this.plus8.setVisible(true)
      }
      
    }
    if(ExecuteAnswer==1){
      ExecuteAnswer=0
      this.reply.setTexture('correct').setDepth(15)
    this.endConfetti.play('endConfetti')
    this.tweens.add({
      targets:this.reply,
        alpha:1,
       ease: "sine.easeOut",
        duration: 400,
      repeat: 0,
      onComplete:()=>{
        this.line.setAlpha(0)
        //this.next.play('pop').setVisible(true)
        //this.time.delayedCall(500, () => {
        //    this.next.play('breathe')
        //},[],this);
      }

        
      });  

      this.tweens.add({
        targets:this.reply,
          alpha:0,
         ease: "sine.easeOut",
          duration: 400,
          delay:5000,
        repeat: 0,
        onComplete:()=>{
          this.scene.pause("GameScene"); 
        }
      })
      
    }

    else if(ExecuteAnswer==-1){
ExecuteAnswer=0
      this.reply.setTexture('wrong').setDepth(15);

  this.tweens.add({
    targets:this.reply,
      alpha:1,
     ease: "sine.easeOut",
      duration: 400,
    repeat: 0
    });


    this.tweens.add({
      targets:this.reply,
        alpha:0,
       ease: "sine.easeOut",
       delay:2000,
        duration: 400,
      repeat: 0,
      onComplete:()=>{
this.marker.setInteractive()
rect.setFillStyle(0x808080,1)
rect2.setFillStyle(0x808080,1)
      }
      });

    }

    if(enableflash){
      enableflash= false
      if(level==5){
          this.flash1.flash()}    
  }
  else if(disableflash){
    disableflash = false

    if(level==5){
        this.flash1.stop()
    this.cursor.setVisible(false)}
}


if(textEntry.text ==4 && level ==5){
  inputactive = false

  this.answered = false
textEntry.setColor("#149A53")
this.input1.setTexture('Input-3').disableInteractive()
level++;
this.reply.setTexture('correct')
    this.endConfetti.play('endConfetti')
    this.tweens.add({
      targets:this.reply,
        alpha:1,
       ease: "sine.easeOut",
        duration: 400,
      repeat: 0,
      onComplete:()=>{
        this.next.play('pop').setVisible(true)
        this.time.delayedCall(500, () => {
            this.next.play('breathe')
        },[],this);
      }
      });  

}
else if(textEntry.text.length>0 && this.answered){
  this.answered = false
  this.input1.setTexture("Input-4").disableInteractive()
  textEntry.setColor("#C22300")
  this.reply.setTexture('wrong');

  inputactive = false

  this.tweens.add({
    targets:this.reply,
      alpha:1,
     ease: "sine.easeOut",
      duration: 400,
    repeat: 0,
    onComplete:()=>{hneed = true;}
    });

    this.tweens.add({
      targets:this.reply,
        alpha:0,
       ease: "sine.easeOut",
       delay:2000,
        duration: 400,
      repeat: 0,
      onComplete:()=>{
        this.input1.setTexture('Input-1').setInteractive()
textEntry.text =""
        this.answered=true
        textEntry.setColor("#000000")
      }
      });


}



    }


    unusedcode(){
      
    

    

    }
}
