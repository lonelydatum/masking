var Mask = require('./Mask.js');

var maskFX = document.getElementById("maskFX")
var canvas = maskFX.querySelector("canvas");
var image = maskFX.querySelector("img");








image.onload = function(){
	var mask = new Mask(canvas, image);
	mask.circle({x:130, y:130, r:100}, 22); // 2nd paramter is feather
	// mask.rect({x:60, y:130, w:220, h:300}, 10);
}


