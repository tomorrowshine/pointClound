/**
 * potree.js 
 * http://potree.org
 *
 * Copyright 2012, Markus Schütz
 * Licensed under the GPL Version 2 or later.
 * - http://potree.org/wp/?page_id=7
 * - http://www.gnu.org/licenses/gpl-3.0.html
 *
 */

/**
 * @class extensions for Float32Arrays
 * 
 * @author Markus Schütz
 */
Float32Array = Float32Array;

/**
 * @memberOf Float32Array
 */
Float32Array.prototype.toString = function() {
	var msg = "";
	for ( var i = 0; i < this.length; i++) {
		msg += this[i] + ", ";
	}
	return msg;
};

/**
 * Stellt die Werte des Arrays als NxN Matrix dar wobei N = Sqrt(length)
 * 
 */
Float32Array.prototype.toMatrixFormString = function() {
	var msg = "";
	for ( var i = 0; i < this.length; i++) {
		if (i != 0 && (i) % 4 == 0) {
			msg += "\n";
		}
		msg += this[i].toFixed(3) + "\t";
		// msg += this[i].toPrecision(2) + ", ";
	}
	return msg;
};


Object.defineProperties(Float32Array.prototype, {
	'x':  {
		get: function(){
			return this[0];
		}
	},
	'y':  {
		get: function(){
			return this[1];
		}
	},
	'z':  {
		get: function(){
			return this[2];
		}
	},
	'r':  {
		get: function(){
			return this[0];
		}
	},
	'g':  {
		get: function(){
			return this[1];
		}
	},
	'b':  {
		get: function(){
			return this[2];
		}
	},
	'a':  {
		get: function(){
			return this[3];
		}
	}
});