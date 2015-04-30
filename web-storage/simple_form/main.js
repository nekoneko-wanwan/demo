var start = function() {


    /* 定数 */
    var STORAGE_TYPE = 'localStorage'; // or sessionStorage
    var DB           = (STORAGE_TYPE === 'localStorage' ) ? localStorage : sessionStorage;


    /**
     * 最新データを取得し、テキストフィールドを更新する
     */
    var update = {
        data   : null,
        _setData: function() {
            this.data = JSON.parse(DB.getItem('userData'));
        },
        showData: function() {
            if (this.data !== null) {
                for (var key in this.data) {
                    if (this.data[key]) {
                        $('#' + key).val(this.data[key]).next('input').val(this.data[key]);
                    } else {
                        $('#' + key).val('').next('input').val('空です');
                    }
                }
            } else {
                // もしデータがなければ全inputの値を削除する
                $('input').val('');
            }
        },
        showStatus: function() {
            var arr = [];
            if (this.data !== null) {
                for (var key in this.data) {
                    // 値が空の場合で表示内容を分ける
                    if (this.data[key] === '') {
                        arr.push($('<li>' + key + ' __is__ <strong>EMPTY</strong>' + '</li>'));
                    } else {
                        arr.push($('<li>' + key + ' __is__ <strong>' +  this.data[key] + '</strong></li>'));
                    }
                }
                $('#status').html(arr);
            } else {
                $('#status').text('データはありません');
            }
        },
        init: function() {
            this._setData();
            this.showData();
            this.showStatus();
        }
    };


    /* イベントリスナーまとめ */
    var userEvent = {
        _addSave: function() {
            $('#saveBtn').on('click', function() {
                var obj = {};

                // 各inputのIDをキーとし、キーと値をobjに追加していく
                $('input[disabled!=disabled]').each(function() {
                    var name = $(this).attr('id');
                    var val  = $(this).val();

                    // 未入力の項目は空データを追加する
                    obj[name] = val ? val : '';
                });

                // 入力されたデータをuserDataとしてDBに保存
                DB.setItem('userData', JSON.stringify(obj));

                update.init();
            });
        },
        _addDelete: function() {
            // 削除ボタン押下時
            $('#delete').on('click', function() {
                DB.clear();

                update.init();
            });
        },
        _addStorage: function() {
            if (STORAGE_TYPE === 'localStorage') {
                window.addEventListener("storage", function(e){
                    var key    = '<li>キーの名前: ' + e.key + '</li>';            //変更されたキー名
                    var oldVal = '<li>古い値のリスト: ' + e.oldValue + '</li>';   //変更前の値
                    var newVal = '<li>新しい値のリスト: ' + e.newValue + '</li>'; //変更後の値
                    var url    = '<li>変更されたURL' + e.url + '</li>';           //イベント発生元のURL
                    var sa     = '<li>Storage Area' + e.storageArea + '</li>';

                    $("#changeLog").append(key + oldVal + newVal + url + sa + '<hr>');

                    // 別ウィンドウを自動更新
                    update.init();
                }, false);
            }
        },
        init: function() {
            this._addSave();
            this._addDelete();
            this._addStorage();
        }
    };


    /* 初期化 */
    userEvent.init();
    update.init();


};


$(function() {
    window.onload = function() {
        start();
    };
});