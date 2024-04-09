export default class MainScene extends Phaser.Scene{
    constructor() {
		super({ key: 'mainScene' });
	}
    preload ()
    {
        this.load.image('fuuka', "./asset/fuuka.png")
        this.load.image('kuromaru', "./asset/kuromaru.png")
    }

    create ()
    {
        this.add.image(400, 300, 'fuuka');
        this.add.image(400, 300, 'kuromaru');
    }
}