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
 * 
 * @class CamHandlers define different types of navigation behaviour. This class is intended to be subclassed.
 * 
 * @author Markus Schütz
 */
function CamHandler(){
	
}


CamHandler.prototype.update = function(time){
	// override in subclass
};

CamHandler.prototype.invokeKeyDown = function(event){
	// override in subclass
};

CamHandler.prototype.invokeKeyUp = function(event){
	// override in subclass
};

CamHandler.prototype.invokeKeyPress = function(event){
	// override in subclass
};

CamHandler.prototype.invokeMouseDown = function(event){
	// override in subclass
};

CamHandler.prototype.invokeMouseUp = function(event){
	// override in subclass
};

CamHandler.prototype.invokeMouseMove = function(event, diffX, diffY){
	// override in subclass
};

CamHandler.prototype.invokeMouseDrag = function(event, pressedKeys, diffX, diffY){
	// override in subclass
};

CamHandler.prototype.invokeMouseWheel = function(delta){
	// override in subclass
};