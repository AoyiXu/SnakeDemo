define(function(require, exports, module){
	var Snode = require("./snode");
	var Food = require("./food");
	var config = require("./../config");

	function Snake(){
		this.body = [];
		this.running = false;
		this.knockedFlag = false;
		this.direction = 0;
		this.speedLevel = 3;
	}

	module.exports = Snake;

	Snake.prototype.add = function(x, y){
		var me = this;
		var snode = new Snode(x, y);
		snode.el.addClass("snake-body");
		me.body.push(snode);
	};


	Snake.prototype.addHead = function(x, y){
		var me = this;
		var snode = new Snode(x, y);
		if(me.body.length>0){
			me.body[0].el.removeClass("snake-head");
		}
		snode.el.addClass("snake-body snake-head");
		me.body.unshift(snode);
	};

	Snake.prototype.removeTail = function(){
		var me = this;
		if(me.body.length > 1){
			var tail = me.body[me.body.length-1];
			tail.destory();
			me.body.pop();
		}
	};

	Snake.prototype.move = function(x, y){
		var me = this;
		var nextPosition = me._getNextPosition();
		me.addHead(nextPosition.x, nextPosition.y);
		me.removeTail();
	};

	Snake.prototype.eat = function(food){
		var me = this;
		if(food instanceof Food){
			me.addHead(food.node.x, food.node.y);
			sessionStorage.SNAKEOBJ = JSON.stringify(me);
			food.refresh();
		}
	};

	Snake.prototype._getNextPosition = function(){
		var me = this;
		var nextX, nextY;
		var head = me.body[0];
		switch(me.direction){
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
		return {
			x : nextX,
			y : nextY
		}
	}

	Snake.prototype.destory = function(){
		var me = this;
		if(me.body.length>0){
			for (var i = 0; i < me.body.length; i++) {
				me.body[i].destory();
			};
		}

	};
})