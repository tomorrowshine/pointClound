
precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 world;
uniform mat4 view;
uniform mat4 proj;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void)
{
  gl_Position = proj * view * world * vec4(aVertexPosition, 1.0);
  gl_PointSize = 10.0;  
  vTextureCoord = aTextureCoord;
  vNormal = aNormal;
} 