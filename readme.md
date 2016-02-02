<h1 id="how-to-use">How to use</h1>



<h3 id="install-masking-module">Install masking module</h3>
<pre><code>npm install masking -D</code></pre>

<h3 id="copy-this-html">Copy this HTML-</h3>
```html
<div id="maskFX">
	<canvas id="canvas"></canvas>	
	<img src="http://lorempixel.com/500/600/">
</div>
```
<h3 id="copy-this-js">Copy this JS</h3>
<pre><code>
var Mask = require('./Mask.js');
var maskFX = document.getElementById("maskFX")
var canvas = maskFX.querySelector("canvas");
var image = maskFX.querySelector("img");

image.onload = function(){
	var mask = new Mask(canvas, image);
	mask.circle({x:130, y:130, r:100}, 22); // 2nd paramter is feather
	// mask.rect({x:60, y:130, w:220, h:300}, 10);
}
</code></pre>