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
 * @augments SceneNode
 */
function MeshNode(name, mesh, parent){
	SceneNode.call(this, name, parent);
	this.mesh = mesh;
}

MeshNode.prototype = new SceneNode(inheriting);

MeshNode.prototype.render = function(camera){
	if(this.visible){
		this.mesh.render(this, camera);
	}
};
