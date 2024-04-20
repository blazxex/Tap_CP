import { WIDTH,HEIGHT,OffsetFromOrigin} from "./constant.js";
import {clickEvent, selectCardEvent, setupEvent} from "./eventCenter.js";
import Button from "./Button.js";
import Scoreboard from "./Scoreboard.js";
import { dataManager } from "./DataManager.js";
import { fetchUserItem, upgradeItem } from "./api.js";
import * as WebFontLoader from "../lib/WebFontLoader.js";

export default class PlayerUI extends Phaser.Scene{
    currentSelectedCardIndex;
    constructor() {
		super({ key: 'PlayerUI',active:true });
        this.selectedCard = null;
        this.levelText = null;
        this.pointText = null;
        this.currentSelectedCardIndex = 0;
	}
    preload (){
        this.load.image('kuromaru', "./asset/kuromaru.png")
        this.load.image('playerImg',"./asset/player.png")
        this.load.image('card1', "./asset/card1.png");
        this.load.image('card2', "./asset/card2.png");
        this.load.image('card3', "./asset/card3.png");
        this.load.image('diamondSword', "./asset/diamond.png");
        this.load.image('cppIcon', "./asset/cppIcon.png");
        this.load.image('pythonIcon', "./asset/pythonIcon.png");
        this.load.image('javaIcon', "./asset/javaIcon.png");
        this.load.image('attack-particle','./asset/pythonIcon.png')
        //* load sprite sheet
        this.load.spritesheet("player-IDLE", "./asset/player-Sheet.png",{
            frameWidth:256,
            frameHeight:256
        });
        this.load.spritesheet("player-attack-1", "./asset/player-attack-Sheet.png",{
            frameWidth:256,
            frameHeight:256
        });
        this.load.spritesheet("player-attack-2", "./asset/player-attack-left-Sheet.png",{
            frameWidth:256,
            frameHeight:256
        });
        
        // sfx
        this.load.audio('hit', "./asset/sfx/hit.wav");

    }

    async create (){
        //* set up event
        clickEvent.on('OnClick',this.onClickHandler, this)

        
        //* Setup player image
        this.player = this.add.sprite(WIDTH/2, OffsetFromOrigin(HEIGHT,.3),"player-IDLE");
        this.anims.create({
            key:"player-Idle",
            frames: this.anims.generateFrameNumbers("player-IDLE"),
            frameRate:4,
            repeat:-1
        })

        this.anims.create({
            key:"player-Attack-1",
            frames: this.anims.generateFrameNumbers("player-attack-1"),
            frameRate:10,
        })

        this.anims.create({
            key:"player-Attack-2",
            frames: this.anims.generateFrameNumbers("player-attack-2"),
            frameRate:10,
        })
        this.player.play("player-Idle");

        //* Level text and Score text
        this.pointText = this.add.text(.665*WIDTH, .35*HEIGHT, `Score : ${formatNumber(dataManager.store.values.userScore)}`).setFontFamily('Arial').setFontSize(64).setColor('#ffff00');


        const item = await fetchUserItem();
        console.log(item);
        //* Card button
        var card1 = new Button(this,.7*WIDTH, .2*HEIGHT,.5,'cppIcon','card01',item.item.item_0,0);
        this.add.existing(card1);
        card1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            dataManager.store.values.userDamage = card1.damge;
            this.selectCard(card1,0);
        });


        var card2 = new Button(this,.7*WIDTH+150, .2*HEIGHT,.5,'pythonIcon','card02',item.item.item_1,1);
        this.add.existing(card2);
        card2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            dataManager.store.values.userDamage = card2.damge;
            this.selectCard(card2,1);
        });

        var card3 = new Button(this,.7*WIDTH+300, .2*HEIGHT,.5,'javaIcon','card03',item.item.item_2,2);
        this.add.existing(card3);
        card3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            dataManager.store.values.userDamage = card2.damge;
            this.selectCard(card3,2);
        });

        this.selectCard(card1,0) // select card 1 as default

        //* hit sound
        this.hitSound = this.sound.add('hit');
        this.hitSound.setVolume(0.2);

        setInterval(async () => {
            await this.pointText.setText(`Score : ${formatNumber(dataManager.store.values.userScore)}`)
        }, 50);

        WebFontLoader.default.load({
            custom:{
                families: ['Kenny'],
            },
            active : () => {
                this.pointText.setFontFamily('Kenny')
            }
        });

        this.attackPar = this.add.particles(0, 0, 'attack-particle', {
            speed: 200,
            lifespan: 200,
            scale: { start: 0.2, end: 0 },
            speed: { min: 200, max: 350 },
            emitting: false,
        });
    }

    onClickHandler(){
        let inp = this.input.activePointer;
        this.attackPar.emitParticleAt(inp.x, inp.y, 4);
        this.pointText.setText(`Score : ${formatNumber(dataManager.store.values.userScore)}`)
        // for animation
        let mode = getRndInteger(1,2);
        this.player.play('player-Attack-'+mode);
        this.player.chain('player-Idle');
        //sound
        this.hitSound.play();
    }

    selectCard(clickedCard,ind) {
        // If another card is already selected, disable it
        if (this.selectedCard !== null && this.selectedCard !== clickedCard) {
            this.selectedCard.whiteFill.setAlpha(0); 
            console.log(`Cleared tint and enabled interaction for previously selected card: ${this.selectedCard.name}`);
        }
        
        this.currentSelectedCardIndex = ind;
        // Update the selected card
        selectCardEvent.emit('OnSelectCard',ind);
        this.selectedCard = clickedCard;
        this.selectedCard.whiteFill.setAlpha(.4); 
        console.log(`Set tint to white and disabled interaction for selected card: ${this.selectedCard.name}`);
    }
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function formatNumber(num) {
    if (num < 1000) {
        // If the number is less than 1000, just convert it to a string and return.
        return num.toString();
    } else {
        // If the number is 1000 or greater, convert to a string in the format of "1.2k".
        // Divide the number by 1000 and use toFixed(1) to keep one decimal place.
        return (num / 1000).toFixed(1) + 'k';
    }
}

