#velocityJSを試してみた

#構成要素


##/root/simple/
基本的な使い方

* 記述方法
* オプションの設定


##/root/svg/
SVGを使ってロゴの文字をなぞるように描写し、最後に塗りつぶすようなアニメーション

* インラインSVGの処理
* 外部ファイルのSVGを処理する
* ※htmlに埋め込む `<object id="logo" data="index.svg" type="image/svg+xml">`


##/root/timeline/
アニメーションを一括して定義

* アニメーションの実装とそれ以外のロジックの分離
* 参考: http://developers.linecorp.com/blog/?p=3230
