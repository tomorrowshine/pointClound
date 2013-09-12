

precision highp float;

varying vec3 vNormal;
varying vec2 vTextureCoord;
varying vec3 world_pos;

uniform mat4 world;
uniform sampler2D uTexture;
uniform vec3 lightPos;
uniform vec3 uViewPos;

const int NUM_LIGHTS = %NUM_LIGHTS%;

void main(void){
	vec3 pos = world_pos;
	vec3 normal = normalize(vNormal);
	vec3 L = normalize(lightPos - pos);
	vec3 N = vNormal;
	vec3 R = reflect(L, N);
	vec3 E = normalize(uViewPos - pos);
	
	float angle = clamp(dot(normal, L), 0.0, 1.0);
	float gloss = clamp(dot(E, -R),  0.0, 1.0);
	gloss = pow(gloss, 32.0);
	//gloss = 0.0;
	
	vec3 col = vec3(0.8,0.8,0.8)*angle + vec3(1,1,1)*gloss;
//	vec3 col = vec3(1,1,1)*pow(dot(E, R), 30.0);
	col = col + vec3(0.1,0.1,0.1);
	
	gl_FragColor = vec4(col, 1);
	//gl_FragColor = vec4(1,0,0,1);
	//gl_FragColor = vec4(vNormal, 1);
} 