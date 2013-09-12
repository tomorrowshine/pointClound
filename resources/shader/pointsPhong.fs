
precision highp float;

uniform vec3 uViewPos;
uniform float glossiness;

varying vec3 vVertexColour;
varying vec3 vNormal;
varying vec3 vWorldPos;


void main(void){
	
	float a = pow(2.0*(gl_PointCoord.x - 0.5), 2.0);
	float b = pow(2.0*(gl_PointCoord.y - 0.5), 2.0);
	float c = 1.0 - (a + b);
	
	if(c < 0.0){
		discard;
	}
  	
	vec3 lightPos = vec3(100.0,-100.0,-100.0);
	vec3 L = normalize(lightPos - vWorldPos);
	vec3 V = normalize(uViewPos - vWorldPos);
	vec3 N = vNormal;
	vec3 R = reflect(L, N);
	vec3 E = normalize(uViewPos - vWorldPos);
	
	float cosa = clamp(dot(N, L), 0.0, 1.0);
	float cosB =clamp(  pow(dot(E, R), glossiness),  0.0, 1.0);
	
	//vec3 col = vVertexColour * max(0.0,cosa) + vVertexColour*cosB;
	vec3 col = vec3(1.0,1.0,1.0) * max(0.0,cosa); // + vec3(1.0,1.0,1.0)*cosB;

	//col = vec3(1.0,0.0,0.0);
	gl_FragColor = vec4(col,1.0);
} 