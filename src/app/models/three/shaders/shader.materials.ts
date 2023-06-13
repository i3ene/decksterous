import { Color, ShaderMaterial, Texture, Uniform, UniformsUtils, Vector3 } from "three";
import fadeVert from '!!raw-loader!./fade/fade.shader.vert';
import fadeFrag from '!!raw-loader!./fade/fade.shader.frag';
import bloomVert from '!!raw-loader!./bloom/bloom.shader.vert';
import bloomFrag from '!!raw-loader!./bloom/bloom.shader.frag';

export namespace CustomShader {
  export const Fade = (color1: Color, color2: Color) => {
    var uniforms = {
      col1: { type: "c", value: color1 },
      col2: { type: "c", value: color2 },
    };
    var parameters = { fragmentShader: fadeFrag, vertexShader: fadeVert, uniforms: uniforms };
    return new ShaderMaterial(parameters);
  }

  export const Bloom = (texture: Texture) => {
    var uniforms = {
      baseTexture: { value: null },
      bloomTexture: { value: texture }
    };
    var parameters = { fragmentShader: bloomFrag, vertexShader: bloomVert, uniforms: uniforms };
    return new ShaderMaterial(parameters);
  }
}
