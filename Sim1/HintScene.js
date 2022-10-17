hattempt = 0
class HintScene extends Phaser.Scene {
  constructor() {
    super({
      key: "HintScene",
    });
  }

  preload() {

  }

  create() {

    this.overlay = this.add.image(0,0,'overlay').setOrigin(0).setAlpha(0)

    this.hint = this.add.image(400,100,'hint').setOrigin(0.5,0).setAlpha(0)

    this.hintClose = this.add.image(586,105,'hintClose').setOrigin(0).setAlpha(0).setInteractive({ cursor: "pointer" });

    this.hintClose.on("pointerdown",
    ()=>{ 
      this.scene.resume("GameScene");
      this.overlay.setAlpha(0)
      this.hint.setAlpha(0)
      this.hintClose.setAlpha(0)
    },
    this
  );
  }

  update() {
    if(hneed&&hattempt ==0){
      hneed = false
      hattempt++
      this.scene.pause("GameScene");
      this.tweens.add({
        targets:this.overlay,
          alpha:1,
         ease: "sine.easeOut",
          duration: 400,
        repeat: 0,
        onComplete:()=>{
          if(level==5){
            this.hint.setTexture('hint2')
            this.hintClose.y = 95
          }
          this.tweens.add({
            targets:[this.hint,this.hintClose],
              alpha:1,
             ease: "sine.easeOut",
              duration: 400,
            repeat: 0,
          })

        }

        });
    


    }
    }
  
  }
