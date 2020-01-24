class Controller {

    constructor(boardWidth, boardHeight, boardPortion) {
        this.board = new Board(boardWidth, boardHeight, boardPortion);
        this.player = new Player(30,this.board.portion*2,{x:10, y: this.board.height - this.board.portion *2 - this.board.portion }, 10);
        this.view = new View();

        this.createMap();
        this.view.setArrayBricks(this.board.width, this.board.height, this.board.portion);
        this.view.setPlayer(this.player);

        this.setPlayerMoveListener();
        this.setPlayerStopListener();
        this.setPlayerJumpListener();

        this.view.startGame(this.player, this.board);
    }

    setPlayerMoveListener() {
        this.view.movePlayerListener((event) => {
            switch (event.key) {
                case 'ArrowRight':
                    this.player.direction = 'right';
                    this.startPlayerMoving();
                    break;
                case 'ArrowLeft':
                    this.player.direction = 'left';
                    this.startPlayerMoving();
                    break;
            }
        });
    }
    startPlayerMoving() {
        this.player.startPlayerMoving(setInterval(() => {
            if (this.player.direction === 'right') {
                if (this._canPlayerMoveRight([this.player.position.x + this.player.velX, this.player.position.y ]) && !this._moveHtmlToRight(this.player.position.x)) this.player.position.x += this.player.velX;
            } else {
                if (this.player.position.x > 0 && this._canPlayerMoveLeft([this.player.position.x + this.player.velX, this.player.position.y ]) && !this._moveHtmlToLeft(this.player.position.x)) this.player.position.x -= this.player.velX;

            }
        }, 20));
    }

    _moveHtmlToRight(posX) {
        const midBoard = this.board.width / 1.5;
        if (posX > midBoard) {
            document.querySelector('#htmlCanvas').scrollLeft += 20;
            return true;
        }
        return false;

    }
    _moveHtmlToLeft(posX) {
        const midBoard = this.board.width / 2.7;
        const htmlBoard = document.querySelector('#htmlCanvas');
        if (posX < midBoard && htmlBoard.scrollLeft > 0) {
            htmlBoard.scrollLeft -= 20;
            return true;
        }
        return false;
    }

    _canPlayerMoveRight(position) {
        let response = true;
        this.view.arrayBricks.forEach( brick => {
            if (brick[0] === position[0] - this.board.portion - this.player.width) {
                response = false;
            }
        });
        //TODO disabled can move
        response = true;
        return response;
    }
    _canPlayerMoveLeft (position) {
        let response = true;
        this.view.arrayBricks.forEach( brick => {
            if (brick[0] === position[0] && brick[1] === position[1] ) {
                response = false;
            }
        });
        //TODO disabled can move
        response = true;
        return response;
    }

    setPlayerStopListener() {
        this.view.stopPlayerListener( () => {
            this.player.stopPlayerMoving();
        });
    }
    setPlayerJumpListener() {
        this.view.jumpPlayerListener((event) => {
            if (event.key === 'ArrowUp' && !this.player.jumping && !this.player.falling) {
                this.player.startPlayerJumping(setInterval(() => {
                    if (this.player.position.y < this.player.height * this.board.gravity) {
                        this.player.stopPlayerJumping();
                        this.startPlayerFalling();
                    } else {
                        this.player.position.y -= 3;
                    }
                }, 1));
            }
        });
    }

    startPlayerFalling() {
        this.player.startPlayerFalling(setInterval(() => {
            if (this.player.position.y < this.board.height - this.board.portion - this.player.height) {
                this.player.position.y += 3;
            } else {
                this.player.stopPlayerFalling();
            }
        },1));
    }

    createMap() {
        this.view.addBoardToHtml(this.board.width, this.board.height)
    }

}