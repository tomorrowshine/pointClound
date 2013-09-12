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
 * Textures have to be loaded first by invoking loadTexture(). Once its loaded, it can be accessed with getTexture()
 * 
 * @class
 */
function TextureManager(){
	
}

TextureManager.textures = new Array();


TextureManager.getTexture = function(name){
	for(var i = 0; i < this.textures.length; i++){
		var texture = this.textures[i];
		if(texture.name == name){
			return texture;
		}
	}
	
	return null;
}

/**
 * 
 * @param source
 * @param name each texture is stored with this unique name. this name can be used to retrieve the texture with getTexture 
 * @returns
 */
TextureManager.loadTexture = function(source, name){
	var textureId = gl.createTexture();
	var image = new Image();
	image.onload = function() {
		var texture = new Texture();
		texture.glid = textureId;
		texture.source = source;
		texture.name = name;
		texture.image = image;
		
		gl.bindTexture(gl.TEXTURE_2D, texture.glid);
	    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	    gl.bindTexture(gl.TEXTURE_2D, null);
		
	    TextureManager.textures.push(texture);
	};
	image.src = source;
}

/**
 * @class
 */
function Texture(){
	
}