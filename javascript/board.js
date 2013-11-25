(function(root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

	var Board = SnakeGame.Board = function(snake) {
		this.snake = snake;
		this.board = [];
		this.apples = [];

		for(var i=0; i<HEIGHT; i++) {
			row = new Array(HEIGHT);
			this.board.push(row);
		}
	}

	var HEIGHT = Board.HEIGHT = 16;

	Board.prototype.render = function() {
    this.board.forEach(function(row) {
      for(var i=0; i < row.length; i++) {
        row[i] = ".";
      }
    });

    this.snake.segments.forEach(function(segment) {
      this.board.board[segment[0]][segment[1]] = "S";
    });
    
    return this.board.board;
	}

})(this);
