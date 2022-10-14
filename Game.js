const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  zoom: 1,
  fps: { target: 60 },
  backgroundColor: "fff",
  physics: {
    default: "arcade",
  },
  //scene: [LoadScene, StartScene, GameScene, EndScene],
  scene: [GameScene,HintScene, EndScene,LoadScene, StartScene ],
  audio: {
    disableWebAudio: true,
  },
};

const game = new Phaser.Game(config);
