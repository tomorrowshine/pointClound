
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
function Sphere(name, parent){
	SceneNode.call(this, name, parent);
	var tesselation = 24;
	this._mesh = null;
	this.tesselation = tesselation;
}

Sphere.prototype = new SceneNode(inheriting);

Object.defineProperty(Sphere.prototype, "mesh", {
	get: function(){
		if(this._mesh  == null){
			this._mesh  = new Mesh("sphere");
			var subMesh = new SubMesh(this._mesh);
			this._mesh .addSubMesh(subMesh);
			
			
			var vertices = [];
			var normals = [];
			var texCoords = [];
			var indices = [];
			
			var angleStep = Math.PI / this.tesselation ;
			var steps = (2*Math.PI) / angleStep;
			var slices = this.tesselation;
			
			var i = 0;
			for(var u = 0; u <= slices; u++){
				for(var step = 0; step < steps; step++){
					var angle = step*angleStep;
					
					var lala = Math.cos((Math.PI * u) / slices);
					var x = Math.cos(angle)*Math.sqrt(1-lala*lala);
					var y = Math.sin(angle)*Math.sqrt(1-lala*lala);
					var z = lala;
					
					vertices.push(x);
					vertices.push(y);
					vertices.push(z);

					normals.push(x);
					normals.push(y);
					normals.push(z);
					
					texCoords.push((x/2) + 0.5);
					texCoords.push((y/2) * 0.5);
//					texCoords.push(0);
//					texCoords.push(0);
					
					if(i >= steps){
						indices.push(i-steps);
						indices.push(i);
						if(step == steps-1){
							indices.push(i+1-steps);
						}else{
							indices.push(i+1);
						}
						
						if(step == steps-1){
							var index = Math.max(0, i+1-steps-steps);
							indices.push(index);
						}else{
							indices.push(i-steps+1);
						}
						indices.push(i-steps);
						if(step == steps-1){
							indices.push(i+1-steps);
						}else{
							indices.push(i+1);
						}
					}
					
					i++;
				}
			}
			
			subMesh.setVertexBufferData("POSITION", new Float32Array(vertices));
			subMesh.setVertexBufferData("NORMAL", new Float32Array(normals));
			subMesh.setVertexBufferData("TEXCOORD_0", new Float32Array(texCoords));
			subMesh.setIndexBufferData(new Uint16Array(indices));
			
			var material = MaterialManager.getMaterial("default");
			this._mesh.setMaterial(material);
		}
		
		return this._mesh;
	}
});

Sphere.prototype.render = function(renderQueue, camera){
	this.mesh.render(this, renderQueue, camera);
};