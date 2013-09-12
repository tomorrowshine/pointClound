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
function ShaderManager() {

}

ShaderManager.vertexShader = new Object();
ShaderManager.fragmentShader = new Object();
ShaderManager.shader = new Array();

ShaderManager.loadVertexShader = function(name, source) {
	var vertexShader = ShaderManager.loadShader(gl.VERTEX_SHADER, source);
	ShaderManager.vertexShader[name] = vertexShader;
};

ShaderManager.loadFragmentShader = function(name, source) {
	var fragmentShader = ShaderManager.loadShader(gl.FRAGMENT_SHADER, source);
	ShaderManager.fragmentShader[name] = fragmentShader;
};

ShaderManager.getVertexShader = function(name) {
	if(ShaderManager.vertexShader[name] == null){
		ShaderManager.loadVertexShader(name, ShaderManager.getShaderSource(name));
	}
	return ShaderManager.vertexShader[name];
};

ShaderManager.getFragmentShader = function(name) {
	if(ShaderManager.fragmentShader[name] == null){
		ShaderManager.loadFragmentShader(name, ShaderManager.getShaderSource(name));
	}
	return ShaderManager.fragmentShader[name];
};

ShaderManager.loadShader = function(shaderType, shaderSource) {
	var shader = gl.createShader(shaderType);
	if (!shader) {
		return null;
	}
	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
};

ShaderManager.getShaderSource = function(name){
	var url = Config.shaderDir + "/" + name;
	
	return load_binary_resource(url);
};

ShaderManager.addShader = function(shader){
	if(ShaderManager.getShader(shader.name) != null){
		var message= "shader has already been created: " + shader.name;
		Logger.error(message);
		throw message;
	}
	
	ShaderManager.shader.push(shader);
};

ShaderManager.getShader = function(name){
	for(var i = 0; i < this.shader.length; i++){
		var shader = this.shader[i];
		if(shader.name == name){
			return shader;
		}
	}
	
	return null;
};