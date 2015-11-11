define(function(require, exports, module){
	var $ = require("jquery");

	function Snode(x, y){
		this.el = null;
		this.x = x;
		this.y = y;

		this.color = null;

		this.create(x, y);
	}

	module.exports = Snode;

	Snode.prototype.create = function(x, y){
		if(this.el){
			this.el.remove();
		}
		this.el = $('<div class="node"></div>').appendTo('#content');
		this.el.css('bottom', y);
		this.el.css('left', x);
	};

	Snode.prototype.destory = function(){
		this.el.remove();
		this.el = null;
	}
})