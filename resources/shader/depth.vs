
precision highp float;

attribute vec3 aVertexPosition;

uniform mat4 world;
uniform mat4 view;
uniform mat4 proj;

varying vec2 vDepth;

void main(void){
	vec4 pViewPos = view * world * vec4(aVertexPosition, 1.0); 
	gl_Position = proj * view * world * vec4(aVertexPosition, 1.0);
	vDepth = vec2( gl_Position.w, gl_Position.z / gl_Position.w * 0.5 + 0.5 );
	vDepth = vec2( length(pViewPos), 0.0  );
} 