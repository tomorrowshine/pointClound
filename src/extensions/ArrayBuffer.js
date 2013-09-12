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
 * extensions for ArrayBuffers
 * 
 * @author Markus Schütz
 *
 * @class
 */
ArrayBuffer = ArrayBuffer;

ArrayBuffer.prototype.subarray = function(offset, length){
	if(length == null){
		length = this.byteLength - offset;
	}
	
	var sub = new ArrayBuffer(length);
	var subView = new Int8Array(sub);
	var thisView = new Int8Array(this);
	
	for(var i = 0; i < length; i++ ){
		subView[i] = thisView[offset+i];
	}
	
	return sub;
}