precision highp float;

varying vec2 vDepth;

void main(void){
	gl_FragColor = vec4(vDepth.x, 0.0, 0.0, 1.0);
} 