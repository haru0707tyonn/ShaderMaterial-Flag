uniform vec2 uFrequency; // index.jsから値をインポート
uniform float uTime; // 21

varying vec2 vUv; // 24 VertexShaderからfragmentShaderに変数を渡すときに使う
varying float vElevation; // 25 影をつける

void main() { // 書き方はC言語に似ている 自動的に実行されるので main(); を書く必要はない
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // modelPosition.x += 0.3; // 14 物体の位置を変更
    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;  // 17 21 25 modelPosition.xは物体の端から端 　x0.1をすることで振幅が減る x軸の波
    elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
    
    modelPosition.z += elevation;

    // modelPosition.y *= 0.6; // 26 大きさが変わる 今回がindex.jsにて行う

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vUv = uv; // 24
    vElevation = elevation; // 25
}