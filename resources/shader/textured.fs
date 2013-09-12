
precision highp float;

varying vec3 vNormal;
varying vec2 vTextureCoord;

uniform sampler2D uTexture;

void main(void)
{
  //gl_FragColor = texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));
  gl_FragColor = vec4(0,1,0,1);
 /* gl_FragColor = vec4(vNormal, 1);
  gl_FragColor.x = abs(gl_FragColor.x);
  gl_FragColor.y = abs(gl_FragColor.y);
  gl_FragColor.z = abs(gl_FragColor.z);*/
  
  gl_FragColor = vec4(vTextureCoord, 0, 1);
} 