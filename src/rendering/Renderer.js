
/**
 * potree.js 
 * http://potree.org
 *
 * Copyright 2012, Markus Sch�tz
 * Licensed under the GPL Version 2 or later.
 * - http://potree.org/wp/?page_id=7
 * - http://www.gnu.org/licenses/gpl-3.0.html
 *
 */

/**
 * 
 * @class
 */
function Renderer(){
	
};

Renderer.render = function(scene){
	var lights = new Array();
	var pointClouds = new Array();
	var pointCloudOctrees = new Array();
	var camera = scene.activeCamera;

	var stack = new Array();
	stack.push(scene.rootNode);
	while(stack.length > 0){
		var node = stack.pop();
		for(var i in node.children){
			stack.push(node.children[i]);
		}
		
		if(node instanceof Light){
			lights.push(node);
		}else if(node instanceof PointCloudSceneNode){
			pointClouds.push(node);
		}else if(node instanceof PointcloudOctreeSceneNode){
			pointCloudOctrees.push(node);
		}
	}
	
	for(var i = 0; i < pointClouds.length; i++){
		var node = pointClouds[i];
		node.render(camera, lights);
	}
	
	for(var i = 0; i < pointCloudOctrees.length; i++){
		var node = pointCloudOctrees[i];
		node.render(camera, lights);
	}
	
	// for...of not yet supported
//	for(var node of pointClouds){
//		node.render(123, camera);
//	}
};
















