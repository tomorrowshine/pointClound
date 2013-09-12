
precision highp float;

varying vec2 vTextureCoord;

uniform samplerCube uCubeMap;
uniform float uWidth;
uniform float uHeight;

bool isLeft(vec2 tc){
	return tc.x > 0.0 && tc.x <= 0.25 && tc.y > 1.0/3.0 && tc.y <= 2.0/3.0;
}

bool isFront(vec2 tc){
	return tc.x > 0.25 && tc.x <= 0.5 && tc.y > 1.0/3.0 && tc.y <= 2.0/3.0;
}

bool isRight(vec2 tc){
	return tc.x > 0.5 && tc.x <= 0.75 && tc.y > 1.0/3.0 && tc.y <= 2.0/3.0;
}

bool isBack(vec2 tc){
	return tc.x > 0.75 && tc.x <= 1.0 && tc.y > 1.0/3.0 && tc.y <= 2.0/3.0;
}

bool isUp(vec2 tc){
	return tc.x > 0.25 && tc.x <= 0.5 && tc.y > 2.0/3.0 && tc.y <= 1.0;
}

bool isDown(vec2 tc){
	return tc.x > 0.25 && tc.x <= 0.5 && tc.y > 0.0 && tc.y <= 1.0/3.0;
}

void main(void)
{

	vec2 tc = vTextureCoord;
	vec4 col = vec4(0.0, 0.0, 0.0, 1.0);
	
	if(isLeft(tc)){
		vec3 d = vec3(-1.0, tc.y, tc.x);
		d.z = (d.z * 4.0) * 2.0 - 1.0;
		d.y = (3.0 * d.y - 1.0) * 2.0 - 1.0;
		d.y = -d.y;
		d = normalize(d);
		
		col.x = textureCube(uCubeMap, d).x;
	}else if(isFront(tc)){
		vec3 d = vec3(tc.xy, -1.0);
		d.x = (d.x * 4.0 - 1.0) * 2.0 - 1.0;
		d.y = (3.0 * d.y - 1.0) * 2.0 - 1.0;
		d.y = -d.y;
		d.x = -d.x;
		d = normalize(d);
		
		col.y = textureCube(uCubeMap, d).x;
	}else if(isRight(tc)){
		vec3 d = vec3(1.0, tc.y, tc.x);
		d.z = (d.z * 4.0 - 2.0) * 2.0 - 1.0;
		d.y = (3.0 * d.y - 1.0) * 2.0 - 1.0;
		d.y = -d.y;
		d.z = -d.z;
		d = normalize(d);
		
		col.z = textureCube(uCubeMap, d).x;
	}else if(isBack(tc)){
		vec3 d = vec3(tc.xy, 1.0);
		d.x = (d.x * 4.0 - 3.0) * 2.0 - 1.0;
		d.y = (3.0 * d.y - 1.0) * 2.0 - 1.0;
		d.y = -d.y;
		d = normalize(d);
		
		col.x = textureCube(uCubeMap, d).x;
		col.y = textureCube(uCubeMap, d).x;
	}else if(isUp(tc)){
		vec3 d = vec3(tc.x, 1.0, tc.y);
		d.x = (d.x * 4.0 - 1.0) * 2.0 - 1.0;
		d.z = (3.0 * d.y - 1.0) * 2.0 - 1.0;
		d.z = -d.z;
		d = normalize(d);
		
		col.z= textureCube(uCubeMap, d).x;
		col.y = textureCube(uCubeMap, d).x;
	}else if(isDown(tc)){
		vec3 d = vec3(tc.x, -1.0, tc.y);
		d.x = (d.x * 4.0 - 1.0) * 2.0 - 1.0;
		d.z = (3.0 * d.y) * 2.0 - 1.0;
		d = normalize(d);
		
		col.x = textureCube(uCubeMap, d).x;
		col.z = textureCube(uCubeMap, d).x;
	}
	
	vec3 d = vec3(0.0, 0.0, 0.0);
	d.x = tc.x * 2.0 - 1.0;
	d.y = -1.0;
	d.z = tc.y * 2.0 - 1.0;
	col.yz = vec2(0.0, 0.0);
	col.x = textureCube(uCubeMap, d).x;
	
	col.xyz = col.xyz / 15.0;
	gl_FragColor = col;
	
	
	
} 