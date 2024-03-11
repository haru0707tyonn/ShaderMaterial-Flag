uniform vec3 uColor; // r, g, b
uniform sampler2D uTexture; // 23 textureをつけるときのお決まりの型

varying vec2 vUv; // 24 VertexShaderからfragmentShaderに変数を渡すときに使う
varying float vElevation; // 25　影をつける

void main() {
    vec4 textureColor = texture2D(uTexture, vUv); // 24
    // gl_FragColor = vec4(uColor, 1.0); // R G B a（透明度）　透明度を設定するにはindex.jsのほうにtransparent: trueを記述する必要がある　 1を超える値はいれない
    textureColor.rgb *= vElevation * 2.5 + 0.7; // 25 影をつける
    gl_FragColor = textureColor;
}