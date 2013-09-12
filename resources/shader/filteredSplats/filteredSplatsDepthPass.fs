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

// vDepth.x:	The linear depth. 
// vDepth.y:	DepthMap depth. 
//varying vec2 	vDepth; 
varying vec3	vPos;
//varying vec3	vViewPos;
//varying vec3	vNormal;
//varying vec3	vViewNormal;
//varying vec3	vViewTangent1;
//varying vec3	vViewTangent2;

uniform vec2	uWindowSize;
uniform vec2 	uNearWindowSize;
uniform float	uNear;

//float getDistance(){
//	float u = 2.0*(gl_PointCoord.x - 0.5);
//	float v = 2.0*(gl_PointCoord.y - 0.5);
//	vec2 uv = vec2(u,v);
//	
//	vec2 a = normalize(vec2(-vNormal.y, vNormal.x));
//	vec2 b = normalize(vec2(vNormal.x, vNormal.y));
//	b = b * (1.0/vNormal.z);
//	
//	float val = pow(dot(a, uv), 2.0) + pow(dot(b, uv), 2.0);
//	return 1.0 - val;
//}
//
float getDistance(){
	float a = pow(2.0*(gl_PointCoord.x - 0.5), 2.0);
	float b = pow(2.0*(gl_PointCoord.y - 0.5), 2.0);
	float c = 1.0 - (a + b);
	
	return c;
}

//float getDistance(){
//	float u = gl_FragCoord.x / uWindowSize.x;
//	float v = gl_FragCoord.y / uWindowSize.y;
//	
//	vec3 V = vec3(0,0,0);
//	V.x = u*(uNearWindowSize.x - uNearWindowSize.x/2.0);
//	V.y = v*(uNearWindowSize.y - uNearWindowSize.y/2.0);
//	V.z = uNear;
//	V = normalize(V);
//	
//	
//	
//	
//}

//float getDistance(){
//	vec3 N = normalize(vViewNormal);
//	vec3 P = vec3(0.0, 0.0, 0.0);
//	vec3 Cc = vViewPos;
//	vec3 T1 = vViewTangent1;
//	vec3 T2 = vViewTangent2;
//	T1 = N.yzx;
//	T2 = N.zxy;
//	
//	float u = (gl_FragCoord.x / uWindowSize.x)-0.5;
//	float v = (gl_FragCoord.y / uWindowSize.y)-0.5;
////	float u = 2.0*(gl_PointCoord.x - 0.5);
////	float v = 2.0*((1.0-gl_PointCoord.y)-0.5);
//	
//	vec3 V = vec3(0,0,0);
//	V.x = u*uNearWindowSize.x;
//	V.y = v*uNearWindowSize.y;
//	V.z = -uNear;
//	V = normalize(V);
//	
//	float d = -dot(N, Cc);
////	d = 2.0;
//	float t = -(dot(P,N)+d)/dot(V, N);
//	t = max(t, 0.0);
//	vec3 I = P + V*t - Cc;
////	
//	float val = pow(dot(T1, I), 2.0) + pow(dot(T2, I), 2.0);
//	val = val *	 5000.0;
//	
////	return t;
//	return 1.0 - val;
//}

void main(void){
	if(getDistance() <= 0.0){
		discard;
	}
	
	vec3 id = vec3(1.0,1.0,1.0);
//	gl_FragColor = vec4(getDistance()*id, 1.0);
	gl_FragColor = vec4(vPos, 1.0);
//	gl_FragColor = vec4(0.15*vDepth.x*id, 1.0);
//	gl_FragColor = vec4(vDepth.y*id, 1.0);
} 