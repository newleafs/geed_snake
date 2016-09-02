window.onload = function(){
	documentWidth = window.screen.availWidth;
	console.log(documentWidth);
	var wrap = document.getElementById('wrap');
	var table = wrap.getElementsByTagName('table')[0];
	var tbody = table.getElementsByTagName('tbody')[0];
	var score = document.getElementById('score');
	var scoreDiv = document.getElementById('scoreDiv');

	var allTds = new Array();
	var snake = new Array();
	var timer = null;
	var direct = 0;//移动方向
	var x = 0;//食物坐标
	var y = 0;
	var sco = 0;

	//判断设备
	if (documentWidth < 500){
		forMobile();
	}else{
		wrap.style.width = '800px';
		$('.moblieBtn').css('display','none');
	}
	function forMobile(){
		$('.wrap>p').css('display','none');
	}
	//初始化地图
	var map = new Map(tbody,allTds);
	map.init();
	//初始化蛇
	var geed_snake = new GeedSnake(allTds,snake,map);
	geed_snake.init();

	var snakeHeadX = geed_snake.snakeHeadX;
	var snakeHeadY = geed_snake.snakeHeadY;

	//初始化食物
	function snake_food() {
		x=parseInt(Math.random()*map.trNum);
		y=parseInt(Math.random()*map.tdNum);
		console.log(x,y);
		if (allTds[x][y].className == 'red') {
				snake_food();
		}else{
				allTds[x][y].className ='red';
		}
	}
	snake_food();
	function snakeTailHide(snake){
		snake[0].className = '';
	}
	function snakeTailShow(snake){
		snake[snake.length-1].className = 'red';
	}
	function move(){
	
		snakeTailHide(snake);//隐藏蛇尾

		for (var i = 0;i<snake.length-1;i++) {
			snake[i] = snake[i+1];
		}

		//检测是否吃到食物
		if (allTds[snakeHeadX][snakeHeadY] == allTds[x][y]) {
			eatFood();
		}
		if (direct == 1) {
			if (snakeHeadY > 0){
				snakeHeadY = snakeHeadY-1;
			}else{
				snakeHeadY = map.tdNum-1;
			}
		}
		if (direct == 2 || direct == 0){
			if (snakeHeadY < map.tdNum-1){
				snakeHeadY = snakeHeadY+1;
			}else{
				snakeHeadY = 0;
			}
		}
		if (direct == 3){
			if (snakeHeadX >0){
				snakeHeadX = snakeHeadX-1;
			}else{
				snakeHeadX = map.trNum -1;
			}
		}
		if (direct == 4){
			if (snakeHeadX < map.trNum-1){
				snakeHeadX = snakeHeadX+1;
			}else{
				snakeHeadX = 0;
			}
		}
		eatSelf();
		snake[snake.length-1] = allTds[snakeHeadX][snakeHeadY];
		snakeTailShow(snake);//添加新蛇头
	
	}
	//检测是否吃到自己
	function eatSelf(){
		for (var k = 0;k<snake.length-1;k++){
			if (allTds[snakeHeadX][snakeHeadY] == snake[k]) {
				clearInterval(timer);
				scoreDiv.innerHTML = 'Game Over';
			}
		}
	}
	function eatFood(){
		console.log(snakeHeadX,snakeHeadY);
		snake.push(allTds[snakeHeadX][snakeHeadY]);
		snake_food();
		sco += 10;
		score.innerHTML = sco;
	}
	timer = setInterval(move,200);
	function changeDirection(keyChar){
		
		switch(keyChar){
			case 'A':
				direct = 1;
				break;
			case 'D':
				direct = 2;
				break;
			case 'W':
				direct = 3;
				break;
			case 'S':
				direct = 4;
				break;
			default:
				direct = 0;
		}
	}
	window.onkeydown = function(e){
		var keynum,keyChar;
		if (window.event) {
			keynum = e.keyCode;
		}else if(e.which){
			keynum = e.which;
		}
		keyChar = String.fromCharCode(keynum);
		if (['A','S','D','W'].indexOf(keyChar) > -1) {
			changeDirection(keyChar);
		}
	}

	//手机按钮事件
	$('.topBtn').click(function(){
		direct = 3;
	});
	$('.leftBtn').click(function(){
		direct = 1;
	});
	$('.rightBtn').click(function(){
		direct = 2;
	});
	$('.bottomBtn').click(function(){
		direct = 4;
	});
}
