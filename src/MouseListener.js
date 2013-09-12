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
 * @class
 */
function MouseListener(){
}

MouseListener.x = null;
MouseListener.y = null;
MouseListener.pressedKeys = new Array();

MouseListener.listener = new Array();

MouseListener.addListener = function(listener){
	MouseListener.listener.push(listener);
};

MouseListener.removeListener = function(listener){
	MouseListener.listener.remove(listener);
};

MouseListener.mouseDown = function(event){
	MouseListener.pressedKeys.push(event.button);

	for(var i = 0; i < MouseListener.listener.length; i++){
		MouseListener.listener[i].invokeMouseDown(event);
	}
	
	return true;
};

MouseListener.mouseUp = function(event){
	MouseListener.pressedKeys.remove(event.button);
	for(var i = 0; i < MouseListener.listener.length; i++){
		MouseListener.listener[i].invokeMouseUp(event);
	}
	
	return true;
};

MouseListener.mouseWheel = function(event){
	var evt=window.event || event; //equalize event object
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta; //check for detail first so Opera uses that instead of wheelDelta
	
	for(var i = 0; i < MouseListener.listener.length; i++){
		MouseListener.listener[i].invokeMouseWheel(delta);
	}
};

MouseListener.mouseMove = function(event){
	if(MouseListener.x == null){
		MouseListener.x = event.screenX;
		MouseListener.y = event.screenY;
	}
	
	var diffX = event.screenX - MouseListener.x;
	var diffY = event.screenY - MouseListener.y;
	MouseListener.x = event.screenX;
	MouseListener.y = event.screenY;
	
	
	
	if(MouseListener.pressedKeys.length > 0){
		for(var i = 0; i < MouseListener.listener.length; i++){
			MouseListener.listener[i].invokeMouseDrag(event, MouseListener.pressedKeys, diffX, diffY);
		}
	}else{
		for(var i = 0; i < MouseListener.listener.length; i++){
			MouseListener.listener[i].invokeMouseMove(event, diffX, diffY);
		}
	}
	
	return true;
	
};