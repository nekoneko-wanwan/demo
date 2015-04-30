var start = function() {

    /* 定数 */
    var DB = sessionStorage;

    // 再読み込み時に混乱するので一旦削除
    DB.clear();

    // データ保存
    DB.setItem('mouse', 'nezumi');
    DB.setItem('dog', 'inu');
    DB.setItem('cat', 'neko');

    // データ取得
    function getAllData(n) {
        for (var key in DB) {
            console.log(n + '回目 ' + key + ' is ' + DB.getItem(key));
        }
        if (DB.length < 1) console.log('データはありません');
    }
    getAllData(1);

    // データの上書き・削除
    DB.setItem('cat', 'tama');
    DB.removeItem('dog');
    getAllData(2);

    /* ----- ここまでセットした順番とは一致しない ※当然forinの問題では無い ------ */

    // 順番を保持するために塊としてJSON文字列に変換してセットする
    var animalData = {
        mouse: 'nezumi',
        dog  : 'inu',
        cat  : 'neko'
    };
    DB.setItem('animals', JSON.stringify(animalData));

    // 上記のgetAllDataでは取得できないため別の関数を再度定義
    function getAllData2(key, n) {
        var obj = JSON.parse(DB.getItem(key));
        for (var k in obj) {
            console.log('(animalsの中) ' + n + '回目 ' + k + ' is ' + obj[k]);
        }
    }
    getAllData2('animals', 3);

    // 一度すべてのデータを洗い出してみる
    getAllData(4);

};

window.onload = function() {
    start();
};