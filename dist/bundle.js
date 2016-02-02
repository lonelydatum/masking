(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mask = function () {
	function Mask(canvas, image, feather) {
		_classCallCheck(this, Mask);

		this.canvas = canvas;
		this.img = image;
		this.feather = feather || 30;
		this.width = this.img.width;
		this.height = this.img.height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = canvas.getContext('2d');
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.width, this.height);

		this.temp = document.createElement('canvas');
		this.tx = this.temp.getContext('2d');
		this.temp.width = this.width;
		this.temp.height = this.height;
	}

	_createClass(Mask, [{
		key: 'circle',
		value: function circle(data, _feather_) {
			this.shape("CIRCLE", data, _feather_);
		}
	}, {
		key: 'rect',
		value: function rect(data, _feather_) {
			this.shape("RECT", data, _feather_);
		}
	}, {
		key: 'shape',
		value: function shape(type, data, _feather_) {
			this.feather = _feather_ !== undefined ? _feather_ : this.feather;

			this.shadowBefore();

			switch (type) {
				case "CIRCLE":
					this.tx.arc(data.x, data.y, data.r, 0, 2 * Math.PI);
					break;

				case "RECT":
					this.tx.fillRect(data.x, data.y, data.w, data.h);
					break;
			}
			this.tx.closePath();
			this.tx.fill();
			this.shadowAfter();
		}
	}, {
		key: 'shadowBefore',
		value: function shadowBefore() {
			this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
			// document.appendChild(this.temp);
			this.tx.translate(-this.width, 0);
			this.tx.shadowOffsetX = this.width;
			this.tx.shadowColor = '#FF0000';
			this.tx.shadowBlur = this.feather;
		}
	}, {
		key: 'shadowAfter',
		value: function shadowAfter() {
			this.ctx.save();
			this.ctx.globalCompositeOperation = 'destination-in';
			this.ctx.drawImage(this.temp, 0, 0);
			this.ctx.restore();
		}
	}]);

	return Mask;
}();

module.exports = Mask;

},{}],2:[function(require,module,exports){
"use strict";

var Mask = require('./Mask.js');

var maskFX = document.getElementById("maskFX");
var canvas = maskFX.querySelector("canvas");
var image = maskFX.querySelector("img");

image.onload = function () {
	var mask = new Mask(canvas, image);
	mask.circle({ x: 130, y: 130, r: 100 }, 22); // 2nd paramter is feather
	// mask.rect({x:60, y:130, w:220, h:300}, 10);
};

},{"./Mask.js":1}]},{},[2]);
