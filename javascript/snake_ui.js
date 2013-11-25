(function(root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function(el) {
    this.$el = el
    this.board = null;
    this.generateApplesId = 58;
    this.generateStepId = 64;
    this.score = 0;
    this.highScore = 0;
  }

  View.prototype.start = function() {
    var snake = new SnakeGame.Snake();
    this.board = new SnakeGame.Board(snake);

    for(var i=0; i < SnakeGame.Board.HEIGHT; i++) {
      var row="<div class='row' id=row-" + i + "></div>";
      this.$el.append(row);

      var cols = "";
      for(var j=0; j < SnakeGame.Board.HEIGHT; j++) {
        cols += "<div class='col' id=col-" + j +  "></div>";
      }
      this.$el.find("#row-"+i).html(cols);
    }
    $(document).keydown(this.handleKeyEvent.bind(this));

  }

  View.prototype.handleKeyEvent = function(event) {
    event.preventDefault();
    if(event.keyCode === 37 && this.board.snake.dir != "E") {
      //left
      this.board.snake.dir = "W";
    }
    if(event.keyCode === 38 && this.board.snake.dir != "S") {
      //up
      this.board.snake.dir = "N";
    }
    if(event.keyCode === 39 && this.board.snake.dir != "W") {
      //right
      this.board.snake.dir = "E";
    }
    if(event.keyCode === 40 && this.board.snake.dir != "N") {
      //down
      this.board.snake.dir = "S";
    }
    if (event.keyCode === 32) {
      clearInterval(this.generateApplesId);
      clearInterval(this.generateStepId);

      this.updateScore();
      var boardCenter = Math.floor(SnakeGame.Board.HEIGHT/2);
      this.board.snake.segments = [[boardCenter, boardCenter]];
      this.generateApplesId = setInterval(this.generateApples.bind(this), 5000);
      this.generateApples();
      this.generateStepId = setInterval(this.step.bind(this), 100);

    }

  }

  View.prototype.step = function(board) {

    var appleEaten = this.board.snake.move(this.board.apples);
    this.removeApple(appleEaten);

    if(appleEaten) {
      this.score += 10;
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
      this.updateScore();
    }

    if(this.gameOver()) {
      this.score = 0;
      clearInterval(this.generateApplesId);
      clearInterval(this.generateStepId);
      $(".board").effect("shake");
    }

    for(var i=0; i < SnakeGame.Board.HEIGHT; i++) {
      for(var j=0; j < SnakeGame.Board.HEIGHT; j++) {
        $("#row-" + i).find("#col-"+j).removeClass("snake");
        $("#row-" + i).find("#col-"+j).removeClass("apple");
        //$("#row-" + i).find("#col-"+j).empty();
      }
    }
    this.board.snake.segments.forEach(function(segment) {
      $("#row-" + segment[0]).find("#col-"+segment[1]).addClass("snake");
    });
    this.board.apples.forEach(function(apple) {
      $("#row-" + apple[0]).find("#col-"+apple[1]).addClass("apple");
      //$("#row-" + apple[0]).find("#col-"+apple[1]).html("<i class='fa fa-apple'></i>");

    });

  }
  
  View.prototype.updateScore = function() {
    $(".score").text("Score: " + this.score);
    $(".highScore").text("High Score: " + this.highScore);
  }

  View.prototype.generateApples = function() {
    var view = this;
    this.board.apples = [];
    var numberApples = 5;
    for(var i = 0; i < numberApples; i++) {
      var row = Math.floor((Math.random()*(SnakeGame.Board.HEIGHT)));
      var col = Math.floor((Math.random()*(SnakeGame.Board.HEIGHT)));

      var snakeLocation = false;
      this.board.snake.segments.forEach(function(segment) {
        if( segment.compare([row, col]) ) {
          snakeLocation = true;
          i--;
        } 
      });

      if(!snakeLocation) {
        view.board.apples.push([row, col]);
      }
    }
  }

  View.prototype.removeApple = function(appleEaten) {
    if(appleEaten) {
      var newApples = [];
      this.board.apples.forEach(function(apple) {
        //custom compare method in array.js
        if(!(apple.compare(appleEaten))) { 
          newApples.push(apple);
        }
      });
      this.board.apples = newApples;
    }
  }

  View.prototype.gameOver = function() {
    var head = this.board.snake.segments[0];
    for( var i = 0; i < this.board.snake.segments.length; i++) {
      if (i != 0 && this.board.snake.segments[i].compare(head)) {
        return true;
      }
    }
    
    if (head[0] < 0 || head[1] < 0) {
      return true;
    }

    if (head[0] >= SnakeGame.Board.HEIGHT || head[1] >= SnakeGame.Board.HEIGHT) {
      return true;
    }
    return false;
  }

})(this);
