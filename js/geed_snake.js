function GeedSnake(allTds,snake){
	this.allTds = allTds;
	this.snake = snake;
	this.snakeHeadX = 0;
	this.snakeHeadY = 0;
	
}
GeedSnake.prototype = {
	snakeBody:3,
	init:function(){
		this.snakeHeadY = this.snakeBody-1;
		for (var i = 0;i<this.snakeBody;i++) {
			this.snake[i] = this.allTds[0][i];
			this.allTds[0][i].className = 'red';
		}
		
	}
}