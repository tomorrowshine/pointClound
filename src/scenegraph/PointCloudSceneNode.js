
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
function PointCloudSceneNode(name, parent, pointCloud){
	SceneNode.call(this, name, parent);
	this.pointCloud = pointCloud;
	
	if(MaterialManager.getMaterial("pointCloudMat") == null){
		this.material = new PointCloudMaterial("pointCloudMat");
	}else{
		this.material = MaterialManager.getMaterial("pointCloudMat");
	}
	
	var attributes = pointCloud.pointAttributes;
	if(attributes.hasColors() && attributes.hasNormals()){
		this.material.illuminationMode = IlluminationMode.FLAT;
	}else if(attributes.hasNormals()){
		this.material.illuminationMode = IlluminationMode.PHONG;
	}else{
		this.material.illuminationMode = IlluminationMode.POSITION;
	}
//	this.material.setRenderMode(PointCloudRenderMode.WEIGHTED_CIRCLE);
	this.material.renderMode = PointCloudRenderMode.WEIGHTED_CIRCLE;
	
}

PointCloudSceneNode.prototype = new SceneNode(inheriting);
PointCloudSceneNode.base = SceneNode.prototype;

Object.defineProperty(PointCloudSceneNode.prototype, 'aabb', {
	get: function(){
		var aabb = new AABB();
		aabb.setDimensionByMinMax(this.pointCloud.aabb.min, this.pointCloud.aabb.max);
		aabb.setTransform(this.transform);
		
		return aabb;
	}
});

PointCloudSceneNode.prototype.render = function(camera, lights) {

	if(this.pointCloud == null){
		return;
	}
	if(!this.visible){
		return;
	}

	this.material.render(this, camera, lights);
};

PointCloudSceneNode.prototype.addTime = function addTime(time){

};

