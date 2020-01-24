class Player {

    constructor(width, height, position, velX) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.direction = 'right';
        this.velY = 1;
        this.velX = velX;
        this.playerMove = undefined;
        this.jumping = undefined;
        this.falling = undefined;

    }

    startPlayerMoving(interval) {
        clearInterval(this.playerMove);
        this.playerMove = interval;
    }
    stopPlayerMoving() {
        clearInterval(this.playerMove);
        this.playerMove = undefined;
    }
    startPlayerJumping(interval) {
        if (!this.jumping && !this.falling) {
            this.jumping = interval;
        }
    }
    stopPlayerJumping() {
        clearInterval(this.jumping);
        this.jumping = undefined;
    }
    startPlayerFalling(interval) {
        if (!this.falling) {
            this.falling = interval;
        }
    }
    stopPlayerFalling() {
        clearInterval(this.falling);
        this.falling = undefined;
    }


}