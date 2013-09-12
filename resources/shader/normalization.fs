precision highp float;

uniform sampler2D uGaussSplatTex;
uniform sampler2D uDepthTex;

varying vec2 vTextureCoord;

void main(void){

	
	vec4 accumPixel = texture2D( uGaussSplatTex, vTextureCoord );
	if (accumPixel.a <= 0.0)
		discard;

	gl_FragColor = vec4( accumPixel.rgb / accumPixel.a, 1.0 );
	
	//gl_FragColor = vec4(accumPixel.xyz, 1.0);

}
