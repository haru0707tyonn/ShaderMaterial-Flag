// fragmetShaderは色
precision mediump float; // RawShaderMaterialを使う場合に記述する必要がある　どれだけ詳細に決めるのか　ほかにはhighupなどがある 

void main() {
    gl_FragColor = vec4(0.0,0.5, 1.0, 1.0); // R G B a（透明度）　透明度を設定するにはindex.jsのほうにtransparent: trueを記述する必要がある　 1を超える値はいれない
}