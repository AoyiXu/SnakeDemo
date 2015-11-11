define(function(require, exports, module){
	var config = require("./config");

	function getEffectiveArea(){
		var tmpConfig = config;
		var eWidth = tmpConfig.AREA_WIDTH - (tmpConfig.AREA_WIDTH % tmpConfig.NODE_WIDTH);
		var eHeight = tmpConfig.AREA_HEIGHT - (tmpConfig.AREA_HEIGHT % tmpConfig.NODE_HEIGHT);

		return {
			eWidth : eWidth,
			eHeight : eHeight
		};
	}

	function getInitNodePosition(){
		var tmpConfig = config;
		var eArea = getEffectiveArea();
		var fx = (eArea.eWidth - tmpConfig.NODE_WIDTH)/2;
		var fy = (eArea.eHeight - tmpConfig.NODE_HEIGHT)/2;

		return new Array(fx, fy);
	}

	exports.getEffectiveArea = getEffectiveArea;
	exports.getInitNodePosition = getInitNodePosition;
})