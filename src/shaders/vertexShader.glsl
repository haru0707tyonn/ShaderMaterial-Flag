// vertexShaderは頂点
// 9 uniformはグローバル変数を入れる　 4x4の行列 一文字も間違えずに（エラーになる）
uniform mat4 projectionMatrix; // カメラがどこからどこまでを映すかの情報
uniform mat4 modelMatrix; // 物体の位置の情報（行列）　回転、大きさなど
uniform mat4 viewMatrix; // カメラの位置（行列）

attribute vec3 position; // x,y,zの座標 attributeは頂点情報などを入れる

float a = 1.0; // 整数値だけ（1）の記述だとエラー
float b = 2.0;
float c = a + b; // 同じ型同士の計算は可能

void main() { // 書き方はC言語に似ている 自動的に実行されるので main(); を書く必要はない
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.x += 0.3; // 14 物体の位置を変更

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}