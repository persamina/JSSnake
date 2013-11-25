(function(root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

	var Snake = SnakeGame.Snake = function() {
		this.dir = "N";
		this.segments = [[3,3]];
	}

	Snake.prototype.move = function(apples) {
		var delta = this.getDelta();
    var lastIndex = this.segments.length - 1;
    var appleEaten = false;

		var newHead = [this.segments[0][0]+ delta[0], this.segments[0][1]+ delta[1]]; 
		this.segments.unshift(newHead);
    apples.forEach(function(apple) {
      //custom compare method in array.js
      if(apple.compare(newHead)) {
        appleEaten = newHead;
      }
    });
    if(!appleEaten) { 
      this.segments.pop(); 
    }
		return appleEaten;
	}

	Snake.prototype.getDelta = function() {
		if (this.dir === "N") {
			return [-1,0];
		}
		if (this.dir === "E") {
			return [0,1];
		}
		if (this.dir === "S") {
			return [1,0];
		}
		if (this.dir === "W") {
			return [0,-1];
		}

	}

	Snake.prototype.turn = function(newDir) {
		this.dir = newDir;
	}

  var Coor = SnakeGame.Coor = function() {

  }

  Coor.prototype.plus = function() {
    return "plus";
  }

})(this);
