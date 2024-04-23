import { WIDTH, HEIGHT,OffsetFromOrigin, scale } from "./constant.js";
import { fetchBoss } from "./api.js";
import { clickEvent } from "./eventCenter.js";
import { dataManager } from "./DataManager.js";

export default class BossUI extends Phaser.Scene {
    constructor() {
        super({ key: 'BossUI', active: true });
        this.scale = (WIDTH > HEIGHT)?scale:1;
        this.bossName = null;
        this.totalHp = null;
        this.currentHp = null;
        this.hpBarFill = null;
        this.hpBarFillBack = null;
        this.hpBarWidth = 600; // Width of the HP bar
        this.hpBarHeight = 30; // Height of the HP bar
        this.hpBarX = WIDTH / 2 - this.hpBarWidth / 2; // X coordinate of the HP bar
        this.hpBarY = 120; // Y coordinate of the HP bar (positioned above the boss image)
        this.weakness = ['C++', 'Python', 'Java'];
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
        this.load.spritesheet("Grader", "./asset/Grader-sheet.png",{
            frameWidth:416,
            frameHeight:416
        });
    }

    async create() {
        // listen to event
        clickEvent.on("OnClick", this.onClickHandler, this);
        // Fetch the data of the boss
        // Create and scale the boss image
        this.bossImage = this.add.sprite(WIDTH/2+10, OffsetFromOrigin(HEIGHT/2,.3),"Eijktra").setScale(scale);
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
        this.anims.create({
            key:"Grader",
            frames: this.anims.generateFrameNumbers("Grader"),
            frameRate:4,
            repeat:-1
        })
        this.bossImage.play("Eijktra");

        // Create HP bar
        this.createHpBar();

        // Update boss data and move boss every 0.5 seconds
        setInterval(async () => {
            await this.updateBossData();
        }, 500);

    }

    async updateBossData() {
        // Fetch the updated data of the boss
        const bossData = await fetchBoss();
        //console.log(this.bossName)
        if (bossData !== undefined) {
            // If bossData is defined, update UI with boss data
            if(this.bossName != bossData.bossName){
                this.bossImage.destroy();
                this.anims.remove(this.bossName); // Remove the animation
                this.bossName = bossData.bossName;
                this.bossWeakness = bossData.weakness;
                dataManager.store.values.bossWeakness = this.bossWeakness;
                this.bossImage = this.add.sprite(WIDTH/2+10, OffsetFromOrigin(HEIGHT/2,.3),this.bossName);
                this.bossImage.play(this.bossName);
                const tween = this.add.tween({
                    targets: this.bossImage, // Corrected targets property
                    y: HEIGHT/2+10,
                    duration: 3000,
                    yoyo: true,
                    ease: 'Quad.inOut',
                    repeat: -1
                });
            }
            // Set the position of the text
            this.totalHp = bossData.totalHp;
            this.currentHp = bossData.currentHp;
            // Update the HP bar
            this.updateHpBar();
            if (this.bossText) {
                this.bossText.destroy();
            }
            this.bossText = this.add.text(WIDTH/5, HEIGHT/5, "BOSS NAME: " + String(this.bossName)+"\nBOSS WEAKNESS: "+ String(this.weakness[this.bossWeakness]), { fontSize: HEIGHT/50, color: '#ffff00' });
            this.bossText.setPosition(WIDTH/4, HEIGHT/5);
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
