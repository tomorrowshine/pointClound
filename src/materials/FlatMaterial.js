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
 * @class render an object without illumination
 * @augments Material
 * @author Markus Schütz
 */
function FlatMaterial(name, color){
	Material.call(this, name);
	this.flatShader = new Shader( name, "flatShader.vs", "flatShader.fs");
	
	if(color != null){
		this.color = color;
	}else{
		this.color = [1.0, 0.0, 0.0, 1.0];
	}
}

FlatMaterial.prototype = new Material(inheriting);

FlatMaterial.prototype.setColor = function(color){
	this.color = color;
};

/**
 * 
 * 
 * @param object may be either a SubMesh or a PointcloudOctree
 * @param sceneNode
 * @param camera
 */
FlatMaterial.prototype.render = function(object, sceneNode, camera){
	if(object instanceof AABB){
		this.renderAABB(object, sceneNode, camera);
	}else if(object instanceof SubMesh){
		this.renderSubMesh(object, sceneNode, camera);
	}
};

FlatMaterial.prototype.renderAABB = function(aabb, sceneNode, camera){
	var shader = this.flatShader;
	
	if(aabb.min == null || aabb.max == null){
		return;
	}
	
//	if(aabb.vbo == null){
		aabb.updateVBO();
//	}
	
	gl.useProgram(shader.program);
	
	// uniforms
//	gl.uniformMatrix4fv(shader.uWorld, false, sceneNode.globalTransformation);
	gl.uniformMatrix4fv(shader.uWorld, false, M4x4.I);
	gl.uniformMatrix4fv(shader.uView, false, camera.viewMatrix);
	gl.uniformMatrix4fv(shader.uProjection, false, camera.projectionMatrix);
	gl.uniform4f(shader.uColor, this.color[0], this.color[1], this.color[2], this.color[3]);
	
	gl.enableVertexAttribArray(shader.aVertexPosition);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, aabb.vbo);
	gl.vertexAttribPointer(shader.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
	
	// linien zeichnen
	gl.drawArrays(gl.LINES, 0, aabb.points);
	
	Potree.drawCalls++;
	Potree.drawnLines += 12;
	
};

FlatMaterial.prototype.renderSubMesh = function(subMesh, meshNode, camera){
	var shader = this.flatShader;
	
	var scene = camera.scene;
	var mesh = meshNode.mesh;
	gl.useProgram(shader.program);

	// uniforms
	gl.uniformMatrix4fv(shader.uWorld, false, meshNode.globalTransformation);
	gl.uniformMatrix4fv(shader.uView, false, camera.viewMatrix);
	gl.uniformMatrix4fv(shader.uProjection, false, camera.projectionMatrix);
	var viewPos = camera.globalPosition;
	gl.uniform3f(shader.uViewPos, viewPos[0], viewPos[1], viewPos[2]);
	gl.uniform4f(shader.uColor, this.color[0], this.color[1], this.color[2], this.color[3]);
	
	// vertex attributes
	gl.enableVertexAttribArray(shader.aVertexPosition);
	gl.bindBuffer(gl.ARRAY_BUFFER, subMesh.vbos["POSITION"]);
	gl.vertexAttribPointer(shader.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
	
	if(subMesh.vbos["TEXCOORD_0"] != null && shader.aTextureCoord != null ){
		gl.enableVertexAttribArray(shader.aTextureCoord);
		gl.bindBuffer(gl.ARRAY_BUFFER, subMesh.vbos["TEXCOORD_0"]);
		gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
	}
	
	if(subMesh.ibo != null){
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, subMesh.ibo);
		gl.drawElements(mesh.glType, subMesh.indices.length, gl.UNSIGNED_BYTE, 0);
		Potree.drawCalls += 1;
	}else if(subMesh.vertexCount != null){
		gl.lineWidth(10.0);
		gl.drawArrays(mesh.glType, 0, subMesh.vertexCount);
		Potree.drawCalls += 1;
	}
};