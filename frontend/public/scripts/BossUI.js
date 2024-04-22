import { WIDTH, HEIGHT,OffsetFromOrigin } from "./constant.js";
import { fetchBoss } from "./api.js";
import { clickEvent } from "./eventCenter.js";

export default class BossUI extends Phaser.Scene {
    constructor() {
        super({ key: 'BossUI', active: true });
        this.bossname = null;
        this.totalHp = null;
        this.currentHp = null;
        this.hpBarFill = null;
        this.hpBarFillBack = null;
        this.hpBarWidth = 600; // Width of the HP bar
        this.hpBarHeight = 30; // Height of the HP bar
        this.hpBarX = WIDTH / 2 - this.hpBarWidth / 2; // X coordinate of the HP bar
        this.hpBarY = 120; // Y coordinate of the HP bar (positioned above the boss image)
    }

    preload() {
        this.load.image('hp-bar', "./asset/healthbar.png");
        this.load.spritesheet("Al-kwharizmi", "./asset/Al-kwharizmi.png",{
            frameWidth:384,
            frameHeight:384
        });
        this.load.spritesheet("Kadane", "./asset/Kadane.png",{
            frameWidth:384,
            frameHeight:384
        });
        this.load.spritesheet("Eijktra", "./asset/Eijktra.png",{
            frameWidth:384,
            frameHeight:384
        });
    }

    async create() {
        // listen to event
        clickEvent.on("OnClick", this.onClickHandler, this);
        // Fetch the data of the boss
        // Create and scale the boss image
        this.bossImage = this.add.sprite(WIDTH/2+10, OffsetFromOrigin(HEIGHT/2,.3),"Eijktra");
        this.anims.create({
            key:"Al-kwharizmi",
            frames: this.anims.generateFrameNumbers("Al-kwharizmi"),
            frameRate:4,
            repeat:-1
        })
        this.anims.create({
            key:"Kadane",
            frames: this.anims.generateFrameNumbers("Kadane"),
            frameRate:4,
            repeat:-1
        })
        this.anims.create({
            key:"Eijktra",
            frames: this.anims.generateFrameNumbers("Eijktra"),
            frameRate:4,
            repeat:-1
        })
        this.bossImage.play("Eijktra");
        //const scaleX = WIDTH / this.bossImage.width;
        //const scaleY = HEIGHT / this.bossImage.height;
        //this.bossImage.setScale(.5 * scaleX, .7 * scaleY);

        // Create HP bar
        this.createHpBar();

        const tween = this.add.tween({
            targets: this.bossImage, // Corrected targets property
            y: HEIGHT/2+10,
            duration: 3000,
            yoyo: true,
            ease: 'Quad.inOut',
            repeat: -1
        });

        // Update boss data and move boss every 0.5 seconds
        setInterval(async () => {
            await this.updateBossData();
        }, 500);

    }

    async updateBossData() {
        // Fetch the updated data of the boss
        const bossData = await fetchBoss();
        if (bossData !== undefined) {
            // If bossData is defined, update UI with boss data
            this.bossname = bossData.bossname;
            this.totalHp = bossData.totalHp;
            this.currentHp = bossData.currentHp;
            // Update the HP bar
            this.updateHpBar();
        }
    }

    onClickHandler() {
        this.bossImage.setTint(0xff0000);
        setTimeout(()=> {
            this.bossImage.setTint(0xffffff);
        }, 50); 
    }

    createHpBar() {
        this.hpBar = this.add.sprite(WIDTH/2,this.hpBarY,"hp-bar");
        // this.hpBarFillBack = this.add.graphics();
        this.hpBarFill = this.add.graphics();
        this.updateHpBar();
    }

    updateHpBar() {
        const hpBarLength = this.hpBarWidth * (this.currentHp / this.totalHp);
        // if (this.hpBarFillBack && this.hpBarFill) {
        if (this.hpBarFill) {
            // this.hpBarFillBack.clear();
            // this.hpBarFillBack.fillStyle(0x000000); // Black color for HP bar background
            // this.hpBarFillBack.fillRect(this.hpBarX, this.hpBarY, this.hpBarWidth, this.hpBarHeight);
            this.hpBarFill.clear();
            this.hpBarFill.fillStyle(0xb47076); // Green color for HP bar
            this.hpBarFill.fillRect(this.hpBarX, this.hpBarY-10, hpBarLength, this.hpBarHeight);
        }
    }
}
