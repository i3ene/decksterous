import { BufferAttribute, BufferGeometry, Color, Mesh, ShaderMaterial, Triangle, UniformsUtils, Vector3 } from "three";

export namespace GeometryHelper {
  function lerpColor(color1: Color, color2: Color, t: number) {
    let color: Color = new Color();
    color.r = color1.r + ((color2.r - color1.r) * t);
    color.g = color1.g + ((color2.g - color1.g) * t);
    color.b = color1.b + ((color2.b - color1.b) * t);
    return color;
  }

  export function fadeColor(geometry: BufferGeometry | Mesh, color1: Color, color2: Color, min: number, max: number) {
    if (geometry instanceof Mesh) geometry = geometry.geometry;
    const positionAttribute = geometry.getAttribute('position');
    const colors: number[] = [];

    for (let i = 0; i < positionAttribute.count; i ++) {
      var vertex = new Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);

      var alpha = (vertex.y - min) / (max - min);
      var color = lerpColor(color1, color2, 1-alpha);
      var rgb = [color.r, color.g, color.b];
      colors.push(...rgb);
    }

    geometry.setAttribute( 'color', new BufferAttribute(new Float32Array(colors), 3 ) );
  }
}