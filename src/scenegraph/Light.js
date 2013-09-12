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
function LightType() {
}

/**
 * @constant
 */
LightType.OMNI = 0;

/**
 * @constant
 */
LightType.SPOT = 1;

/**
 * @constant
 */
LightType.DIRECTIONAL = 2;

/**
 * 
 * @param name
 * @param parent
 * @class
 * @augments SceneNode
 */
function Light(name, parent) {
	SceneNode.call(this, name, parent);
	this.type = LightType.OMNI;
	this.colour = [1, 1, 1];
	this.castShadows = false;
}

Light.prototype = new SceneNode(inheriting);

Light.prototype.notifyChildAttachedToParent = function() {
	this.scene.lights[this.name] = this;
};

Object.defineProperty(Light.prototype, "red", {
	get: function(){
		return this.colour[0];
	},
	set: function(value){
		this.colour[0] = value;
	}
});

Object.defineProperty(Light.prototype, "green", {
	get: function(){
		return this.colour[1];
	},
	set: function(value){
		this.colour[1] = value;
	}
});

Object.defineProperty(Light.prototype, "blue", {
	get: function(){
		return this.colour[2];
	},
	set: function(value){
		this.colour[2] = value;
	}
});