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
 * @class  point size depends on distance from eye.
 * this may change so that point size depends on more factors like child node visibility, density of a node, etc.  
 * 
 * @augments Material
 * @author Markus Schütz
 */
function WeightedPointSizeMaterial(name){
	Material.call(this, name);
	this.shader = new Shader(name, "pointSize.vs", "colouredPoint.fs");
	
	this.pointSize = 0.3;
}

WeightedPointSizeMaterial.prototype = new Material(inheriting);

WeightedPointSizeMaterial.prototype.render = function(sceneNode, camera, lights){
	var transform = sceneNode.globalTransformation;
	var pointClouds = new Array();
	
	if(sceneNode instanceof PointCloudSceneNode){
		pointClouds.push(sceneNode.pointCloud);
	}else if(sceneNode instanceof PointcloudOctreeSceneNode){
		var renderQueue = sceneNode.mno.renderQueue;
		for(var i = 0; i < renderQueue.length; i++){
			var node = renderQueue.get(i);
			pointClouds.push(node.pointCloud);
		}
	}
	this.renderPointClouds(transform, pointClouds, camera, lights);
};

WeightedPointSizeMaterial.prototype.renderPointClouds = function renderPointClouds(transform, pointClouds, camera, lights){
	gl.enable(gl.DEPTH_TEST);
	gl.disable(gl.BLEND);
	
	for(var i = 0; i < pointClouds.length; i++){
		var pointCloud = pointClouds[i];
		var pointAttributes = pointCloud.pointAttributes;
		gl.useProgram(this.shader.program);
		
		{ // uniforms
			gl.uniformMatrix4fv(this.shader.uniforms.uWorld, false, transform);
			gl.uniformMatrix4fv(this.shader.uniforms.uView, false, camera.viewMatrix);
			gl.uniformMatrix4fv(this.shader.uniforms.uProj, false, camera.projectionMatrix);
			gl.uniform1f(this.shader.uniforms.uPointSizeMultiplicator, this.pointSize);
			gl.uniform2f(this.shader.uniforms.uViewportSize, Potree.canvas.clientWidth, Potree.canvas.clientHeight);
		}
		
		gl.bindBuffer(gl.ARRAY_BUFFER, pointCloud.vbo);
		var offset = 0;
		for(var j = 0; j < pointAttributes.size; j++){
			var attribute = pointAttributes.attributes[j];
			
			if(attribute == PointAttribute.POSITION_CARTESIAN){
				gl.enableVertexAttribArray(this.shader.attributes.aVertexPosition);
				gl.vertexAttribPointer(this.shader.attributes.aVertexPosition, 3, gl.FLOAT, false,pointAttributes.byteSize, offset);
			}else if(attribute == PointAttribute.RGBA_PACKED){
				if(this.shader.attributes.aVertexColour != null){
					gl.enableVertexAttribArray(this.shader.attributes.aVertexColour);
					gl.vertexAttribPointer(this.shader.attributes.aVertexColour, 3, gl.UNSIGNED_BYTE, false,pointAttributes.byteSize, offset);
				}
			}else if(attribute == PointAttribute.RGB_PACKED){
				if(this.shader.attributes.aVertexColour != null){
					gl.enableVertexAttribArray(this.shader.attributes.aVertexColour);
					gl.vertexAttribPointer(this.shader.attributes.aVertexColour, 3, gl.UNSIGNED_BYTE, false,pointAttributes.byteSize, offset);
				}
			}else if(attribute == PointAttribute.NORMAL_FLOATS){
				if(this.shader.attributes.aNormal != null){
					gl.enableVertexAttribArray(this.shader.attributes.aNormal);
					gl.vertexAttribPointer(this.shader.attributes.aNormal, 3, gl.FLOAT, false,pointAttributes.byteSize, offset);
				}
			}/*else if(attribute.name == PointAttributeNames.FILLER){
				
			}*/
			offset += attribute.byteSize;
		}
		
		gl.drawArrays(gl.POINTS, 0, pointCloud.size);
		
		gl.disableVertexAttribArray(this.shader.attributes.aVertexPosition);
		gl.disableVertexAttribArray(this.shader.attributes.aVertexColour);
		gl.disableVertexAttribArray(this.shader.attributes.aNormal);
	}
};