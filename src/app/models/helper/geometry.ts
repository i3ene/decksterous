import { BufferAttribute, BufferGeometry, Color, Mesh, ShaderMaterial, Triangle, UniformsUtils, Vector3 } from "three";

export namespace GeometryHelper {
  function lerpNumber(n1: number, n2: number, t: number) {
    return n1 + ((n2 - n1) * t);
  }

  function lerpColor(color1: Color, color2: Color, t: number) {
    let color: Color = new Color();
    color.r = lerpNumber(color1.r, color2.r, t);
    color.g = lerpNumber(color1.g, color2.g, t);
    color.b = lerpNumber(color1.b, color2.b, t);
    return color;
  }

  export function linearGradient(geometry: BufferGeometry | Mesh, color1: Color, color2: Color, min: number, max: number) {
    if (geometry instanceof Mesh) geometry = geometry.geometry;
    const positionAttribute = geometry.getAttribute('position');
    const colors: number[] = [];

    for (let i = 0; i < positionAttribute.count; i ++) {
      var vertex = new Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);

      var t = (vertex.y - min) / (max - min);
      var color = lerpColor(color1, color2, 1 - t);
      var rgb = [color.r, color.g, color.b, 1];
      colors.push(...rgb);
    }

    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 4));
  }

  export function opacityGradient(geometry: BufferGeometry | Mesh, alpha1: number, alpha2: number, min: number, max: number) {
    if (geometry instanceof Mesh) geometry = geometry.geometry;
    const colorAttribute = geometry.getAttribute('color');
    const positionAttribute = geometry.getAttribute('position');
    const colors: number[] = [];

    for (let i = 0; i < positionAttribute.count; i ++) {
      var vertex = new Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);

      var t = (vertex.y - min) / (max - min);
      var alpha = lerpNumber(alpha1, alpha2, 1 - t);
      colorAttribute.setW(i, alpha)
    }
  }
}
