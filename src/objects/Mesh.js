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
 * @author Markus Schütz
 */
MeshType = {
	TRIANGLES : 0,
	LINES: 1,
	POINTS: 2
};

/**
 * 
 * @param name
 * @class
 * @author Markus Schütz
 */
function Mesh(name){
	this.name = name;
	this.subMeshes = new Array();
	this.setType(MeshType.TRIANGLES);
	
	// depending on MeshType, this can be either lineWidth or pointSize
	this.primitiveSize = 1.0;
}

Mesh.prototype.setType = function(type){
	this.type = type;
	if(type == MeshType.TRIANGLES){
		this.glType = gl.TRIANGLES;
	}else if(type == MeshType.LINES){
		this.glType = gl.LINES;
	}else if(type == MeshType.POINTS){
		this.glType = gl.POINTS;
	}else{
		throw "unknown mesh type: " + type + ". use one of the MeshType members.";
	}
};

Mesh.prototype.render = function(meshNode, renderQueue, camera){
	for(var i = 0; i < this.subMeshes.length; i++){
		var subMesh = this.subMeshes[i];
		subMesh.render(meshNode, renderQueue, camera);
	}
};

Mesh.prototype.addSubMesh = function(subMesh){
	this.subMeshes.push(subMesh);
};

Mesh.prototype.setMaterial = function(material){
	for(var i = 0; i < this.subMeshes.length; i++){
		var subMesh = this.subMeshes[i];
		subMesh.setMaterial(material);
	}
};

/**
 * 
 * @param mesh
 * @class
 * @author Markus Schütz
 */
function SubMesh(mesh){
	this.mesh = mesh;
	// beinhaltet alle vertex buffer des meshes
	this.vbos = new Object();
	// index buffer
	this.ibo = null;
	this.vertexCount = 0;
	this.material = null;
	this.indices = null;
}

SubMesh.prototype.setMaterial = function(material){
	this.material = material;
};


SubMesh.prototype.setVertexBufferData = function(name, data){
	// wenn vertex buffer noch nicht vorhanden -> neuen erstellen
	if(this.vbos[name] == null){
		this.vbos[name] = gl.createBuffer();
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbos[name]);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
};

SubMesh.prototype.setIndexBufferData = function(data){
	if(this.ibo == null){
		this.ibo = gl.createBuffer();
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
	this.indices = data;
};

SubMesh.prototype.setVertexCount = function(vertexCount){
	this.vertexCount = vertexCount;
};

SubMesh.prototype.render = function(meshNode, renderQueue, camera){
	if(renderQueue.preferredMaterial != null){
		renderQueue.preferredMaterial.renderSubMesh(this, meshNode, renderQueue, camera);
	}else{
		this.material.renderSubMesh(this, meshNode, renderQueue, camera);
	}
};


















