define(function(require, exports, module){
	var Snode = require("./snode");
	var config = require("./../config");
	var utils = require("./../utils");

	module.exports = Food;

	function Food(){
		this.node = null;
	}

	Food.prototype.create = function(){
		var me = this;
		var eArea = utils.effectiveArea;
		// random
		var fx = parseInt(Math.random()*eArea.eWidth, 10);
		var fy = parseInt(Math.random()*eArea.eHeight, 10);
		fx = fx - (fx % config.NODE_WIDTH);
		fy = fy - (fy % config.NODE_HEIGHT);

		var snake = JSON.parse(sessionStorage.SNAKEOBJ);
		if(snake && snake.body.length > 0){
			var snode;
			for (var i = 0; i < snake.body.length; i++) {
				snode = snake.body[i];
				if(fx === snode.x && fy === snode.y){
					me.create();
					return;
				}
			};
		}

		me.node = new Snode(fx, fy);
		me.node.el.addClass('food');
	}

	Food.prototype.refresh = function(){
		if(this.node){
			this.destory();
		}
		this.create();
	}

	Food.prototype.destory = function(){
		if(this.node){
			this.node.destory();
			this.node = null;
		}
	}

})