const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    physics: { default: 'arcade' },
    scene: { preload, create, update }
};

let player, bullets, enemies, lastFired = 0;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'https://i.imgur.com/KLhD80A.png');
    this.load.image('bullet', 'https://i.imgur.com/6NEZ8qk.png');
    this.load.image('enemy', 'https://i.imgur.com/zV8XHyz.png');
}

function create() {
    player = this.physics.add.sprite(200, 500, 'player').setCollideWorldBounds(true);
    bullets = this.physics.add.group();
    enemies = this.physics.add.group();

    this.physics.add.collider(bullets, enemies, (bullet, enemy) => {
        bullet.destroy();
        enemy.destroy();
    });

    this.input.on('pointerdown', () => {
        let bullet = bullets.create(player.x, player.y - 20, 'bullet');
        if (bullet) bullet.setVelocityY(-300);
    });

    this.time.addEvent({ delay: 1000, callback: () => {
        let enemy = enemies.create(Phaser.Math.Between(50, 350), 10, 'enemy');
        if (enemy) enemy.setVelocityY(100);
    }, loop: true });
}

function update() {}
