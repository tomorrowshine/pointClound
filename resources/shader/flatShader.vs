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

precision highp float;

attribute vec3 aVertexPosition;

uniform mat4 world;
uniform mat4 view;
uniform mat4 proj;

void main(void){
	vec4 pos = proj * view * world * vec4(aVertexPosition, 1.0);
	gl_Position = pos;
} 