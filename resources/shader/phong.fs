

precision highp float;

const int LIGHT_TYPE_OMNI = 0;
const int LIGHT_TYPE_SPOT = 1;
const int LIGHT_TYPE_DIRECTIONAL = 2;

varying vec3 vNormal;
varying vec2 vTextureCoord;
varying vec3 world_pos;
varying vec4 lightSpacePos;

uniform mat4 world;
uniform samplerCube uShadowMap;
uniform vec3 uLightPos;
uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform int uLightType;
uniform int uNumLights;
uniform vec3 uViewPos;
uniform bool castShadows;
uniform mat4 lightView;
uniform mat4 lightProj;


void main(void){
	vec4 col = vec4(0.0, 0.0, 0.0, 1.0);

	vec3 pos = world_pos;
	vec3 L = normalize(uLightPos - pos);
	vec3 N = normalize(vNormal);
	vec3 R = reflect(L, N);
	vec3 E = normalize(uViewPos - pos);
	float distance = length(uLightPos - pos);
	
	if(uLightType == LIGHT_TYPE_OMNI){
		float diffuse = clamp(dot(N, L), 0.0, 1.0);
		float specular  = max(dot(E, -R),  0.0);
		specular  = pow(specular , 32.0);
		
		col.xyz = uLightColor*diffuse;
		col.xyz = col.xyz + vec3(1,1,1)*specular;
	}else if(uLightType == LIGHT_TYPE_SPOT){
		float angle = dot(uLightDir, -L);
		if(angle > 0.8){
			float diffuse = clamp(dot(N, L), 0.0, 1.0);
			float spotEffect = pow(angle, 22.0);
			float constantAttenuation = 0.02;
			float linearAttenuation = 0.01;
			float quadraticAttenuation = 0.01;
            float att = spotEffect / (constantAttenuation + linearAttenuation * distance + quadraticAttenuation * distance * distance);
                 
            col.xyz = att * (uLightColor * diffuse);
            col.xyz = uLightColor * spotEffect;
		}else{
			//col.xyz = vec3(0.0, 0.0, 1.0);
		}
	}
	
	if(castShadows){
		vec4 pl = lightProj*lightView*vec4(pos, 1.0);
		pl.xyz = pl.xyz/pl.w;
		
		vec3 d = vec3(0.0, 0.0, 0.0);
		d.x = L.x;
		d.y = L.y;
		d.z = -L.z;
	
		vec4 refDepth = textureCube(uShadowMap, d);
		float depth = length(uLightPos - pos);
		
		float shadow = 0.0;
		if(refDepth.x <= 0.0){
			shadow = 0.0;
		}else if( depth - 0.51 > refDepth.x){
			col = vec4(0.0, 0.0, 0.0, 1.0);
		}else{
		
		}
	}
	
	gl_FragColor = col;

} 





