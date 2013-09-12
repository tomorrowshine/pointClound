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
 * @class extensions for Arrays
 * 
 * @author Markus Schütz
 */
Array = Array;

/**
 * remove all occurences of element in the array
 */
Array.prototype.remove=function(element){
	var index = null;
	while((index = this.indexOf(element)) != -1){
		this.splice(index, 1);
	}
};

Array.prototype.contains = function(element){
	var index = this.indexOf(element);
	return index != -1;
};

Object.defineProperties(Array.prototype, {
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
