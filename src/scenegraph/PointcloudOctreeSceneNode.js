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
 * @param name
 * @param mno
 * @param parent
 * @class
 * @augments SceneNode
 */
function PointcloudOctreeSceneNode(mno, parent){
	SceneNode.call(this, name, parent);
	this.mno = mno;
	
}

PointcloudOctreeSceneNode.prototype = new SceneNode(inheriting);
PointcloudOctreeSceneNode.base = SceneNode.prototype;

PointcloudOctreeSceneNode.prototype.render = function(camera, lights) {

	if(this.mno == null){
		return;
	}
	if(!this.visible){
		return;
	}

	this.mno.render(this, camera, lights);
};

PointcloudOctreeSceneNode.prototype.addTime = function addTime(time){
	this.age += time;
	
	this.mno.addTime(time);
};

