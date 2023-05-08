import { Color, ShaderMaterial, Uniform, UniformsUtils, Vector3 } from "three";
import vertexshader from 'raw-loader!./fade/fade.shader.vert';
import fragmentshader from 'raw-loader!./fade/fade.shader.frag';

export namespace CustomShader {
  export const Fade = (color1: Color, color2: Color) => {
    var uniforms = {
      col1: { type: "c", value: color1 },
      col2: { type: "c", value: color2 },
    };
    var parameters = { fragmentShader: fragmentshader, vertexShader: vertexshader, uniforms: uniforms };
    return new ShaderMaterial(parameters);
  }
}
