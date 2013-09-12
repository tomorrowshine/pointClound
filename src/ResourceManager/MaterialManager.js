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
 * 
 * keeps track of all material instances. 
 * materials register themselves upon creation.
 */
function MaterialManager(){
	
}

MaterialManager.materials = new Array();

MaterialManager.addMaterial = function(material){
	if(MaterialManager.getMaterial(material.name) != null){
		var message= "material has already been created: " + material.name;
		Logger.error(message);
		throw message;
	}
	
	this.materials.push(material);
};

MaterialManager.getMaterial = function(name){
	for(var i = 0; i < this.materials.length; i++){
		var material = this.materials[i];
		if(material.name == name){
			return material;
		}
	}
	
	return null;
};
