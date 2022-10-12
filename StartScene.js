
class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: "StartScene",
    });
  }

  preload() {}

  create() {
//    config.audio.bgAudio = this.sound.add("bgMusic");

    this.playButton = this.add.image(529, 580, "play_button").setInteractive({ cursor: "pointer" }).setOrigin(0, 0);

    this.playButton.on(
      "pointerover",
      function (pointer) {
        this.playButton.setTexture("play_button_on");
        //this.scene.pause("GameLoadScene");
      },
      this
    );

    this.playButton.on(
      "pointerout",
      function (pointer) {
        this.playButton.setTexture("play_button");
        //this.scene.resume("GameLoadScene");
      },
      this
    );

    this.playButton.on(
      "pointerdown",
      function (pointer) {
        this.scale.startFullscreen();

//        config.audio.bgAudio.setLoop(true).setVolume(0.1).play();

        // this.gamename.setScale(0);
        this.playButton.setScale(0);

        

        this.time.delayedCall(
          500,
          () => {
            this.scene.start("GameScene");

            //this.scene.start("FinalScene");

            this.scene.stop("StartScene");

            //this.scene.start("EndScene");
          },
          [],
          this
        );

      },
      this
    );
  }

  startloads() {
  }

  update() {  }
}
