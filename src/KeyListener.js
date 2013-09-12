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
 * @class 
 */
function KeyListener(){

}

KeyListener.pressedKeys = new Array();

KeyListener.listener = new Array();

KeyListener.addListener = function(listener){
	KeyListener.listener.push(listener);
};

KeyListener.removeListener = function(listener){
	KeyListener.listener.remove(listener);
};

KeyListener.keyDown = function(event){
	if(!KeyListener.pressedKeys.contains(event.which)){
		KeyListener.pressedKeys.push(event.which);
	}
	
	for(var i = 0; i < KeyListener.listener.length; i++){
		KeyListener.listener[i].invokeKeyDown(event);
	}
	
	event.stopPropagation();
};

KeyListener.keyUp = function(event){
	KeyListener.pressedKeys.remove(event.which);
	for(var i = 0; i < KeyListener.listener.length; i++){
		KeyListener.listener[i].invokeKeyUp(event);
	}
};

KeyListener.keyPress = function(event){
	for(var i = 0; i < KeyListener.listener.length; i++){
		KeyListener.listener[i].invokeKeyPress(event);
	}
};