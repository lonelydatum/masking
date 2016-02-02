"use strict";



class Mask{
	constructor(canvas, image, feather){
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

	circle(data, _feather_) {	    		
		this.shape("CIRCLE", data, _feather_);
	}

	rect(data, _feather_){
		this.shape("RECT", data, _feather_);
	}

	shape(type, data, _feather_){
		this.feather = (_feather_ !== undefined)? _feather_ : this.feather;	
		
		this.shadowBefore();	                       	     
	    
	    switch(type){
	    	case "CIRCLE":
	    	this.tx.arc(data.x, data.y, data.r, 0, 2 * Math.PI);	
	    	break;

	    	case "RECT":
	    	this.tx.fillRect(data.x, data.y, data.w, data.h);
	    	break;
	    }	    
	    this.tx.closePath();
	    this.tx.fill();
	    this.shadowAfter()
	}

	shadowBefore(){
		this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
	    // document.appendChild(this.temp);
	    this.tx.translate(-this.width, 0);
	    this.tx.shadowOffsetX = this.width;    
	    this.tx.shadowColor = '#FF0000';
	    this.tx.shadowBlur = this.feather;
	}

	shadowAfter(){
		this.ctx.save();
	    this.ctx.globalCompositeOperation = 'destination-in';
	    this.ctx.drawImage(this.temp, 0, 0);
	    this.ctx.restore();
	}
}


module.exports = Mask;





