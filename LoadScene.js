class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadScene",
    });
  }

  preload() {
    //this.load.scenePlugin('WebpackLoader',WebpackLoader,'loader','loader')
    this.load.atlas("load", "assets/StartSceneAssets/loadAnims/loadAnim.png", "assets/StartSceneAssets/loadAnims/loadAnim.json");
    this.load.atlas("load2", "assets/StartSceneAssets/loadAnims/loadAnim2.png", "assets/StartSceneAssets/loadAnims/loadAnim2.json");
  }

  create() {
    //StartScene.load.start()

    this.loadAnim = this.add.sprite(config.width / 2, config.height / 2, "load").setScale(0.25);
    this.loadAnim2 = this.add
      .sprite(config.width / 2, config.height / 2, "load2")
      .setVisible(false)
      .setScale(0.5);

    this.anims.create({
      key: "loading",
      frames: this.anims.generateFrameNames("load", {
        start: 0,
        end: 8,
        zeroPad: 0,
        prefix: "LOAD",
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "loading2",
      frames: this.anims.generateFrameNames("load2", {
        start: 9,
        end: 40,
        zeroPad: 0,
        prefix: "LOAD",
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: 0,
    });

    this.startSceneAssetsLoad(); //no change
    //to be loaded while user is going through the tutorial
    this.endSceneAssetsLoad(); //to be loaded anywhere during the gamescene
    this.audioLoad();

    this.load.start();

    this.load.on(
      "progress",
      function (value) {
        this.loadAnim.play("loading");
      },
      this
    );

    this.load.on(
      "complete",
      function () {
        //this.load.on("progress",function (value) {},this);
        //console.log("complete");
        this.loadAnim.destroy();
        this.loadAnim2.setVisible(true).play("loading2");
        this.loadAnim2.on(
          Phaser.Animations.Events.ANIMATION_COMPLETE,
          function () {
            this.scene.stop("LoadScene");
            this.scene.launch("GameScene");
            this.scene.launch("HintScene");
          },
          this
        );
      },
      this
    );
  }

  audioLoad() {
    //audio loaded here

  }

  endSceneAssetsLoad() {
    //this.load.multiatlas("DoorAnim", "assets/EndSceneAssets/Door animation/DoorAnim.json", "assets/EndSceneAssets/Door animation");

    //this.load.video('logo','assets/EndSceneAssets/LOGO.mp4');
  }

  startSceneAssetsLoad() {
    this.load.image("play_button", "assets/StartSceneAssets/play_button.png");
    this.load.image("play_button_on", "assets/StartSceneAssets/play_button_on.png");

    
    this.load.image("overlay", "assets/GameSceneAssets/overlay.png");

    this.load.image("hint", "assets/GameSceneAssets/hint.png");
    this.load.image("hint2", "assets/GameSceneAssets/hint2.png");
    this.load.image("hintClose", "assets/GameSceneAssets/hintClose.png");

    this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
    this.load.plugin('rexflashplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexflashplugin.min.js', true);
    this.load.image("bg", "assets/GameSceneAssets/bg.png");
    this.load.atlas('arrowBreatheAnim','/assets/GameSceneAssets/arrowBreatheAnim.png','/assets/GameSceneAssets/arrowBreatheAnim.json')
this.load.atlas('arrowRevealAnim','/assets/GameSceneAssets/arrowRevealAnim.png','/assets/GameSceneAssets/arrowRevealAnim.json')
this.load.atlas("endConfetti","assets/GameSceneAssets/checkConfettiAnim.png","assets/GameSceneAssets/checkConfettiAnim.json");

this.load.image("wrong", "assets/GameSceneAssets/wrong.png");
this.load.image("correct", "assets/GameSceneAssets/correct.png");

this.load.image("rightText","assets/GameSceneAssets/rightText.png")

this.load.image("rightText_on","assets/GameSceneAssets/rightText_on.png")
this.load.image("leftText","assets/GameSceneAssets/leftText.png")
this.load.image("leftText_on","assets/GameSceneAssets/leftText_on.png")    

    this.load.image("mhand", "assets/GameSceneAssets/mhand.png");
    this.load.image("hhand", "assets/GameSceneAssets/hhand.png");
    for(let i=1;i<9;i++){
    this.load.image("plus"+i, "assets/GameSceneAssets/"+i+".png");
    }
    for(let i=1;i<9;i++){
      this.load.image("minus"+i, "assets/GameSceneAssets/-"+i+".png");
      }

    this.load.image("towers", "assets/GameSceneAssets/towers.png");
    this.load.image("sun1", "assets/GameSceneAssets/sun1.png");
    this.load.image("sun2", "assets/GameSceneAssets/sun2.png");
    this.load.image("cloud1", "assets/GameSceneAssets/cloud1.png");
    this.load.image("cloud2", "assets/GameSceneAssets/cloud2.png");
    this.load.image("cloud3", "assets/GameSceneAssets/cloud3.png");    

    this.load.image("Input-1", "assets/GameSceneAssets/Input-1.png");
    this.load.image("Input-2", "assets/GameSceneAssets/Input-2.png");
    this.load.image("Input-3", "assets/GameSceneAssets/Input-3.png");
    this.load.image("Input-4", "assets/GameSceneAssets/Input-4.png");
    this.load.image('cursor','/assets/GameSceneAssets/cursor.png');
    this.load.image('meter','/assets/GameSceneAssets/meter.png');
    this.load.image('marker','/assets/GameSceneAssets/marker.png');

    this.load.image("line1", "assets/GameSceneAssets/line1.png");
    this.load.image("line2", "assets/GameSceneAssets/line2.png");
    this.load.image("line3", "assets/GameSceneAssets/line3.png");
    this.load.image("line4", "assets/GameSceneAssets/line4.png");
    this.load.image("line5", "assets/GameSceneAssets/line5.png");
    this.load.image("line6", "assets/GameSceneAssets/line6.png");
    this.load.image("line7", "assets/GameSceneAssets/line7.png");

  }

  update() {
    //console.log(this.load.inflight.size);
  }
}
