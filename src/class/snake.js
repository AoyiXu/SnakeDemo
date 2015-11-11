define(function(require, exports, module){
	var Snode = require("./snode");
	var config = require("./../config");
	var utils = require("./../utils");

	function Snake(){
		this.body = [];
		this.running = false;
		this.direction = 0;
		this.speed = 300;
		this.moveInterval = null;

		this.init();
	}

	module.exports = Snake;

	Snake.prototype.init = function(){
		var initNodePosition = utils.getInitNodePosition();
		var nodeHeight = config.NODE_HEIGHT;
		this.addHead(new Snode(initNodePosition[0], initNodePosition[1]));
		this.add(new Snode(initNodePosition[0], initNodePosition[1] - nodeHeight));
		this.add(new Snode(initNodePosition[0], initNodePosition[1] - nodeHeight*2));
	};

	Snake.prototype.add = function(snode){
		if(snode instanceof Snode){
			snode.el.addClass("snake-body");
			this.body.push(snode);
		}
	};


	Snake.prototype.addHead = function(snode){
		if(snode instanceof Snode){
			if(this.body.length>0){
				this.body[0].el.removeClass("snake-head");
			}
			snode.el.addClass("snake-body snake-head");
			this.body.unshift(snode);
		}
	};

	Snake.prototype.removeTail = function(){
		if(this.body.length > 1){
			var tail = this.body[this.body.length-1];
			tail.destory();
			this.body.pop();
		}
	};

	Snake.prototype.start = function(){
		if(!this.moveInterval){
			var that = this;
			this.moveInterval = setInterval(function(){
				that.move();
			}, this.speed);
		}		
		this.running = true;
	};

	Snake.prototype.stop = function(){
		if(this.moveInterval){
			clearInterval(this.moveInterval);
			this.moveInterval = null;
		}
		this.running = false;
	};

	Snake.prototype.move = function(){
		var nextX, nextY;
		var head = this.body[0];
		switch(this.direction){
			case 0 :
				nextX = head.x;
				nextY = head.y + config.NODE_HEIGHT;
				break;
			case 1 : 
				nextX = head.x + config.NODE_WIDTH;
				nextY = head.y;
				break;
			case 2 : 
				nextX = head.x;
				nextY = head.y - config.NODE_HEIGHT;
				break;
			case 3 : 
				nextX = head.x - config.NODE_WIDTH;
				nextY = head.y;
				break;
			default:
				break;
		}
		this.addHead(new Snode(nextX, nextY));
		this.removeTail();
	};

	Snake.prototype.destory = function(){
		if(this.body.length>0){
			for (var i = 0; i < this.body.length; i++) {
				this.body[i].destory();
			};
		}
		if(this.moveInterval){
			clearInterval(this.moveInterval);
		}

	}
})