const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(board = [[]]) {
    this.board = board;
    this.x = 0;
    this.y = 0;
    this.board[0][0] = pathCharacter; //จุด Start 
  }
  print() {
    const displayboard = this.board.map((r) => r.join('')).join('\n');
    console.log(displayboard);
  }
  input() {
    const input = (prompt('Enter your move Up(W),DOWN(S),A(LEFT),D(RIGHT):')).toLowerCase()
    console.clear()
    switch (input) {
      case 'w':
        this.y -= 1;
        break;
      case 's':
        this.y += 1;
        break;
      case 'a':
        this.x -= 1;
        break;
      case 'd':
        this.x += 1;
        break;
      default:
        console.log('Please enter W,A,S,D')
        break;
    }
  }
  // Hatlocation(){
  // this.board[this.y][this.x] === hat
  // }
  playGame() {
    let game = true;
    while (game) {
      this.print()
      this.input()
      if (this.board[this.y][this.x] === hat) {
        console.log('You WIN!')
        game = false
      } else if (this.board[this.y][this.x] === hole) {
        console.log('You fell to the hole- LOSE!')
        game = false
      } else if (this.board[this.y][this.x] === pathCharacter) {
        console.log('You step on yourself - LOSE!')
        game = false
      } else if (this.board[this.y][this.x] === undefined) {
        console.log('Out of bound - LOSE!')
        game = false
      }
      this.board[this.y][this.x] = pathCharacter;
    }
  }
  static genratefield(height, width, percentage = 0.25) {
    const newBoard = new Array(height).fill(0).map(element => new Array(width).fill(0))
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // const ranDom = Math.floor
        const prob = Math.random();
        newBoard[y][x] = prob > percentage ? fieldCharacter : hole

      }
    }
    const hatLocation = {

      x: Math.floor(Math.random() * width),

      y: Math.floor(Math.random() * height)
    };

    while (hatLocation.x === 0 && hatLocation.y === 0) {

      hatLocation.x = Math.floor(Math.random() * width);

      hatLocation.y = Math.floor(Math.random() * height);
    }

    newBoard[hatLocation.y][hatLocation.x] = hat;

    return newBoard;
  }
}

