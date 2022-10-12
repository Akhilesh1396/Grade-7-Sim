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
            this.scene.start("StartScene");
          },
          this
        );
      },
      this
    );
  }

  audioLoad() {
    //audio loaded here

    this.load.audio("bgMusic", "assets/Audio/mysterious-cave-ambiance-1.mp3");
    this.load.audio("doorUnlock", "assets/Audio/Automatic-door-unlock-slide-open.mp3");
    this.load.audio("logoReveal", "assets/Audio/Beauty-intro-reveal-logo-2.mp3");
    this.load.audio("keyTurn", "assets/Audio/Doorknob-unlock.mp3");
    this.load.audio("correctAnswer", "assets/Audio/Feedback-correct.mp3");
    this.load.audio("incorrectAnswer", "assets/Audio/Error-prompt-alert.mp3");
    this.load.audio("chestOpen", "assets/Audio/Wood-chest-cover-opening.mp3");
    this.load.audio("gemReveal", "assets/Audio/New-level-up-2-upgrade-1up-videogame-upgrade-1up-videogame.mp3");
    this.load.audio("confetti", "assets/Audio/confetti.wav");
  }

  endSceneAssetsLoad() {
    //this.load.multiatlas("DoorAnim", "assets/EndSceneAssets/Door animation/DoorAnim.json", "assets/EndSceneAssets/Door animation");

    //this.load.video('logo','assets/EndSceneAssets/LOGO.mp4');
  }

  startSceneAssetsLoad() {
    this.load.image("play_button", "assets/StartSceneAssets/play_button.png");
    this.load.image("play_button_on", "assets/StartSceneAssets/play_button_on.png");
    this.load.image("Background", "assets/StartSceneAssets/Background.png");
    this.load.image("box", "assets/StartSceneAssets/box.png");
    this.load.image("web", "assets/StartSceneAssets/web.png");

  }

  update() {
    //console.log(this.load.inflight.size);
  }
}
