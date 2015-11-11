define(function(require, exports, module){
	var $ = require("jquery");
	var Snake = require("./class/snake");
	var config = require("./config");

	module.exports = {
		snake : null,

		init : function(){
			if(this.snake){
				this.snake.destory();
			}
			this.snake = new Snake();
			this._bindUI();
			$('#content').focus();
		},

		_bindUI : function(){
			var that = this;
			var snake = that.snake;
			if(!snake) return;
			$('#content').on('keydown', function(e){
				if(e.keyCode === 37){
					// left arrow
					if(snake.direction === 1 || (snake.running && snake.direction === 3)){
						return;
					}
					snake.direction = 3;
					snake.start();
				} else if (e.keyCode === 38){
					// up arrow
					if(snake.direction === 2 || (snake.running && snake.direction === 0)){
						return;
					}
					snake.direction = 0;
					snake.start();

				} else if (e.keyCode === 39){
					// right arrow
					if(snake.direction === 3 || (snake.running && snake.direction === 1)){
						return;
					}
					snake.direction = 1;
					snake.start();

				} else if (e.keyCode === 40){
					// down arrow
					if(snake.direction === 0 || (snake.running && snake.direction === 2)){
						return;
					}
					snake.direction = 2;
					snake.start();

				} else if (e.keyCode === 32){
					// space
					if(snake.running){
						snake.stop();
					} else {
						snake.start();
					}
				} else if (e.keyCode === 27){
					// ESC
					snake.stop();
					var r = confirm("Do you want to reset the game?");
					if(r){
						that.init();
					} else {
						snake.start();
					}
				}
			});
		}
	}
})