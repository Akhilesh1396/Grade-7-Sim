hattempt = 0
class HintScene extends Phaser.Scene {
  constructor() {
    super({
      key: "HintScene",
    });
  }

  preload() {

    this.load.image("overlay", "assets/GameSceneAssets/overlay.png");

    this.load.image("hint", "assets/GameSceneAssets/hint.png");
    this.load.image("hint2", "assets/GameSceneAssets/hint2.png");
    this.load.image("hintClose", "assets/GameSceneAssets/hintClose.png");
  }

  create() {

    this.overlay = this.add.image(0,0,'overlay').setOrigin(0).setAlpha(0)

    this.hint = this.add.image(400,100,'hint').setOrigin(0.5,0).setAlpha(0)

    this.hintClose = this.add.image(586,95,'hintClose').setOrigin(0).setAlpha(0).setInteractive({ cursor: "pointer" });

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
