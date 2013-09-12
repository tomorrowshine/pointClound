// see PointSizeDepth.fs.cg

precision highp float;

// vDepth.x:	The linear depth. 
// vDepth.y:	DepthMap depth. 
varying vec2 	vDepth; 
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
	
	gl_FragColor = vec4(vDepth.x, 0.0, 0.0, 1.0);
} 