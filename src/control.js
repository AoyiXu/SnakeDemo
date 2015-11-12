define(function(require, exports, module){
	var $ = require("jquery");
	var Snake = require("./class/snake");
	var Food = require("./class/food");
	var config = require("./config");
	var utils = require("./utils");

	module.exports = {
		snake : null,
		food : null,

		init : function(){
			var me = this;
			if(me.snake){
				me.snake.destory();
			}
			if(me.food){
				me.food.destory();
			}

			me.snake = new Snake();

			var snake = me.snake;
			var initNodePosition = utils.initialNodePosition;
			var nodeHeight = config.NODE_HEIGHT;
			snake.addHead(initNodePosition[0], initNodePosition[1]);
			snake.add(initNodePosition[0], initNodePosition[1] - nodeHeight);
			snake.add(initNodePosition[0], initNodePosition[1] - nodeHeight*2);

			sessionStorage.SNAKEOBJ = JSON.stringify(snake);

			me.food = new Food();
			me._bindUI();
			$('#content').focus();
		},

		_bindUI : function(){
			var me = this;
			if(!me.snake) return;
			$('#content').on('keydown', function(e){
				var snake = me.snake;
				var first = snake.body[0];
				var second = snake.body[1];
				var frontDirection;
				// 判断当前路径前方的方向
				if(first.x === second.x){
					if(first.y > second.y){
						frontDirection = 0;
					} else {
						frontDirection = 2;
					}
				}
				if(first.y === second.y){
					if(first.x > second.x){
						frontDirection = 1;
					} else {
						frontDirection = 3;
					}
				}

				if(e.keyCode === 37){
					// left arrow
					if(frontDirection === 1 || (snake.running && frontDirection === 3)){
						return;
					}
					snake.direction = 3;
					me.start();
				} else if (e.keyCode === 38){
					// up arrow
					if(frontDirection === 2 || (snake.running && frontDirection === 0)){
						return;
					}
					snake.direction = 0;
					me.start();

				} else if (e.keyCode === 39){
					// right arrow
					if(frontDirection === 3 || (snake.running && frontDirection === 1)){
						return;
					}
					snake.direction = 1;
					me.start();

				} else if (e.keyCode === 40){
					// down arrow
					if(frontDirection === 0 || (snake.running && frontDirection === 2)){
						return;
					}
					snake.direction = 2;
					me.start();

				} else if (e.keyCode === 32){
					// space
					if(snake.running){
						me.stop();
					} else {
						me.start();
					}
				} else if (e.keyCode === 27){
					// ESC
					me.stop();
					var r = confirm("Do you want to exit the game?");
					if(r){
						me.init();
					} else {
						me.start();
					}
				}
			});
		},

		start : function(){
			var me = this;
			var snake = me.snake;
			if(!snake.moveInterval){
				snake.moveInterval = setInterval(function(){

					var nextPosition = snake._getNextPosition();
					// border check
					var eArea = utils.effectiveArea;
					if(nextPosition.x < 0 || nextPosition.x >= eArea.eWidth 
						|| nextPosition.y < 0 || nextPosition.y >= eArea.eHeight){
						me.knocked();
						return;
					}
					// self check
					var node;
					for (var i = 0; i < snake.body.length; i++) {
						node = snake.body[i];
						if(nextPosition.x === node.x && nextPosition.y === node.y){
							me.knocked();
							return;
						}
					};

					if(nextPosition.x === me.food.node.x 
						&& nextPosition.y === me.food.node.y){
						sessionStorage.SNAKEOBJ = JSON.stringify(snake);
						snake.eat(me.food);
					} else {
						snake.move();
					}

				}, snake.speed);
			}
			snake.running = true;
		},

		stop : function(){
			var me = this;
			var snake = me.snake;
			if(snake.moveInterval){
				clearInterval(snake.moveInterval);
				snake.moveInterval = null;
			}
			snake.running = false;
		},

		knocked : function(){
			var me = this;
			me.stop();
			alert("Game Over!");
			me.init();
		}
	}
})