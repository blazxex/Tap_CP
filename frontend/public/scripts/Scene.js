import { WIDTH, HEIGHT, scaleX, scaleY, scale } from "./constant.js";
import { clickEvent, selectCardEvent, setupEvent } from "./eventCenter.js";
import { fetchUser, fetchBoss, attack, fetchUserScore } from "./api.js";
import { dataManager } from "./DataManager.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "mainScene", active: true });
    this.currentSelectcard = 0;
  }
  async preload() {
    this.load.image("sky", "./asset/bg.webp");
  }
  async create() {
    selectCardEvent.on(
      "OnSelectCard",
      (ind) => (this.currentSelectcard = ind),
      this
    );

    this.bg = this.add.image(WIDTH / 2, HEIGHT / 2, "sky");
    this.bg.setScale(scale);


    this.input.on("pointerup", async (pointer) => {
      const isAttackSuccess = attack(this.currentSelectcard);
      let damage = 0;
      let atp = dataManager.store.values.userDamage;
      let currentLang = dataManager.store.values.userLang;
      let currentWeakness = dataManager.store.values.bossWeakness;
      if (currentWeakness === currentLang) damage = atp;
      else damage = atp / 2;
      dataManager.store.values.userScore += damage;
      clickEvent.emit("OnClick"); // emit event with score
    });
  }
}
