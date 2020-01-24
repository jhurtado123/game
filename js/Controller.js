class Controller {

    constructor(boardWidth, boardHeight, boardPortion) {
        this.board = new Board(boardWidth, boardHeight, boardPortion);
        this.player = new Player(this.board.portion,this.board.portion*2,{x:10, y: this.board.height - this.board.portion *2 - this.board.portion }, 10);
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
            if (this.player.position.y < this.board.height - this.board.portion - this.player.height && this._canPlayerContinueFalling() ) {
                this.player.position.y += 3;
            } else {
                this.player.stopPlayerFalling();
            }
        },1));
    }
    //https://www.w3schools.com/graphics/game_obstacles.asp
    _canPlayerContinueFalling() {
        let response = true;

        const posY = this.player.position.y - this.player.height;
        const posX = this._getRoundedXPosition(this.player.position.x);

        this.view.arrayBricks.forEach(brick => {
           if (brick[0] === posX && brick[1] === posY) {
               response = false;
           }
        });

        return response;
    }

    /*
        Redondea el número al mas cercano a la porcion
        302 -> 300
        326 -> 350
        356 -> 350
        389 -> 400
     */
    _getRoundedXPosition(position) {

        const portion = this.board.portion;
        if (position % 100 < portion) {
            if (position % 100 < portion / 2) {
                position = position - (position % 100);
            } else {
                position = (position - (position % 100)) + portion;
            }

        } else {
            if (position % 100 < portion * 2 - ((portion*2) / 4) ) {
                position = (position - (position % 100)) + portion;
            } else {
                position = (position - (position % 100)) + portion * 2;
            }
        }

        return position;
    }

    createMap() {
        this.view.addBoardToHtml(this.board.width, this.board.height)
    }

}