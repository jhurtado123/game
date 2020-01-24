class View {

    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.interval = null;
        this.level = [
            [],
            [],
            [],
            [],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
            [],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X','X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X','X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X','X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ];
        this.arrayBricks = [];
    }

    updateGraphics(player, board) {
        this.ctx.clearRect(0, 0, 1400, 600);
        this.setPlayer(player);

        if (!this.interval) {
             //this.interval = window.requestAnimationFrame(this.updateGraphics.bind(this));
        }
    }

    startGame(player, board) {

        this.interval = setInterval(() => this.updateGraphics(player, board), 1);
        this.createHTMLComponent();
        this.buildHTMLGraphics(board.width, board.height, board.portion);

    }

    createHTMLComponent() {
        const htmlCanvas = document.createElement('div');
        htmlCanvas.id = 'htmlCanvas';
        document.querySelector('#root').appendChild(htmlCanvas);
    }

    movePlayerListener(callback) {
        document.addEventListener('keydown', callback);
    }

    stopPlayerListener(callback) {
        document.addEventListener('keyup', callback);
    }

    jumpPlayerListener(callback) {
        document.addEventListener('keydown', callback);
    }

    setPlayer(player) {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(player.position.x, player.position.y, player.width, player.height);
    }

    buildHTMLGraphics(width, height, portion)  {
        let yPos = 0;
        let xPos = 0;

        for (let y = 0; y < this.level.length; y++) {
            for (let x = 0; x < this.level[y].length; x++) {
                switch (this.level[y][x]) {
                    case 'X':
                        const block = document.createElement('div');
                        document.querySelector('#htmlCanvas').appendChild(block);
                        block.style.position = 'absolute';
                        block.style.top = `${yPos}px`;
                        block.style.left = `${xPos}px`;
                        block.style.width = `${portion}px`;
                        block.style.height = `${portion}px`;
                        block.className = `block`;
                        break;

                }
                xPos += portion;
            }
            xPos = 0;
            yPos += portion;
        }
        document.querySelector('#htmlCanvas').scrollLeft = 0;
    }

    setArrayBricks(width, height, portion) {
        let yPos = 0;
        let xPos = 0;

        for (let y = 0; y < this.level.length; y++) {
            for (let x = 0; x < this.level[y].length; x++) {
                switch (this.level[y][x]) {
                    case 'X':
                        this.arrayBricks.push([xPos, yPos]);
                        break;

                }
                xPos += portion;
            }
            xPos = 0;
            yPos += portion;
        }
    }

    addBoardToHtml(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.id = 'canvasRoot';
        canvas.style.border = "1px solid black";
        document.querySelector('#root').appendChild(canvas);
        this.canvas = document.querySelector('#canvas');
        this.ctx = canvas.getContext('2d');
    }

}