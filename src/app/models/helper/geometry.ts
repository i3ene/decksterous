import { BufferAttribute, BufferGeometry, Color, Mesh, ShaderMaterial, Triangle, UniformsUtils, Vector3 } from "three";

export namespace GeometryHelper {
  function lerpNumber(a: number, b: number, t: number) {
    return a + ((b - a) * t);
  }

  function lerpColor(a: Color, b: Color, t: number) {
    let color: Color = new Color();
    color.r = lerpNumber(a.r, b.r, t);
    color.g = lerpNumber(a.g, b.g, t);
    color.b = lerpNumber(a.b, b.b, t);
    return color;
  }

  export function linearGradient(geometry: BufferGeometry | Mesh, aColor: Color, bColor: Color, axis: 'x' | 'y' | 'z' = 'y') {
    geometry = parseGeometry(geometry);
    const { max, min } = getBoundingMinMax(geometry);
    const colors: number[] = [];

    getVertices(geometry).forEach((vertex: Vector3) => {
      var t = (vertex[axis] - min[axis]) / (max[axis] - min[axis]);
      var color = lerpColor(aColor, bColor, 1 - t);
      var rgb = [color.r, color.g, color.b, 1];
      colors.push(...rgb);
    });

    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 4));
  }

  export function opacityGradient(geometry: BufferGeometry | Mesh, aAlpha: number, bAlpha: number, axis: 'x' | 'y' | 'z' = 'y') {
    geometry = parseGeometry(geometry);
    const colorAttribute = geometry.getAttribute('color');
    const { max, min } = getBoundingMinMax(geometry);

    getVertices(geometry).forEach((vertex: Vector3, index: number) => {
      var t = (vertex[axis] - min[axis]) / (max[axis] - min[axis]);
      var alpha = lerpNumber(aAlpha, bAlpha, 1 - t);
      colorAttribute.setW(index, alpha);
    });
  }

  export function getVertices(geometry: BufferGeometry | Mesh) {
    geometry = parseGeometry(geometry);
    const positionAttribute = geometry.getAttribute('position');
    const vertices: Vector3[] = [];

    for (let i = 0; i < positionAttribute.count; i ++) {
      var vertex = new Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      vertices.push(vertex);
    }

    return vertices;
  }

  export function getBoundingMinMax(geometry: BufferGeometry | Mesh) {
    geometry = parseGeometry(geometry);
    return {
      max: geometry.boundingBox?.max ?? new Vector3(),
      min: geometry.boundingBox?.min ?? new Vector3()
    };
  }

  export function parseGeometry(geometry: BufferGeometry | Mesh) {
    if (geometry instanceof Mesh) geometry = geometry.geometry;
    return geometry;
  }
}
