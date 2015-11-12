define(function(require, exports, module){
	var config = require("./config");

	var effectiveArea = getEffectiveArea();
	var initialNodePosition = getInitNodePosition();

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
		var eArea = effectiveArea;
		var fx = eArea.eWidth/2 - tmpConfig.NODE_WIDTH;
		var fy = eArea.eHeight/2 - tmpConfig.NODE_HEIGHT;

		return new Array(fx, fy);
	}

	exports.effectiveArea = effectiveArea;
	exports.initialNodePosition = initialNodePosition;
})