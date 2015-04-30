(function () {
    var controller = {
        start : function () {
            /*********** トップ変数一覧 ***********/
            // 定数
            var MAX_NUM  = 25;
            var BAYMAX   = "ｺﾝﾆﾁﾜ.\nﾜﾀｼﾊ, ﾍﾞｲﾏｯｸｽﾃﾞｽ.\n\n      （ ■―■ ）\n     ／           ＼\n    /                ＼\n （_（            (＿)\n        ゝ      ノ\n           ∪￣∪";

            // 変数
            var prevVal  = 0;

            // object
            var counter  = {};
            var $table   = $('#panel');


            /*********** オブジェクト・関数定義一覧 ***********/
            // counter関数: 実行した回数を返すcounterオブジェクト
            /* @initValue: 初期値はMAX_NUM
             * @method   : counter.reset()  -> 初期値へ戻す
             * @method   : counter.down()   -> 0になるまでカウントダウン
             */
            (function () {
                var count = MAX_NUM;
                counter.reset = function () {
                    count = MAX_NUM;
                    return count;
                };
                counter.down = function () {
                    if (count === 0) {
                        counter.reset();
                    }
                    return count--;
                };
            })();


            // panelsオブジェクト: 各パネルの生成とクリック時の処理を設定する
            /* @getjQueryObj._getArray()     -> MAX_NUM分の配列を生成して返す
             * @getjQueryObj._shuffleArray() -> 渡された配列をランダムに入れ替えて返す
             * @getjQueryObj._createObj()    -> 5列の<tr>要素を$Objectにしてまとめて返す
             * @getjQueryObj.init()          -> getJqueryObjの初期化
             *
             * @clickEvent._checkVal._isOther()  -> 既にクリック済みかどうか、booleanを返す
             * @clickEvent._checkVal._isNext()   -> 次にクリックできるものかどうか、booleanを返す
             * @clickEvent._thatsAll()           -> 全てのパネルがクリックされた時の処理を設定
             * @clickEvent._action()             -> clickイベントに設定する関数。引数には$objectを渡す
             * @clickEvent.init()                -> clickEventの初期化
             *
             * @panels.init() -> 初期化
             */
            var panels = {
                getjQueryObj : {
                    _getArray : function () {
                        var i;
                        var ary = [];
                        for (i = MAX_NUM; i > 0; i--) {
                            ary.push(i);
                        }
                        return ary;
                    },
                    _shuffleArray : function (ary) {
                        var i = ary.length;
                        while(i) {
                            var j  = Math.floor(Math.random() * i);
                            var t  = ary[--i];
                            ary[i] = ary[j];
                            ary[j] = t;
                        }
                        return ary;
                    },
                    _createObj : function () {
                        var box;
                        var i    = 0;  // _aryの配列へのアクセス番号に使用
                        var j    = 1;  // ループ回数のカウントに使用
                        var ary  = [];
                        var _ary = this._shuffleArray(this._getArray());
                        for (i, j; i < MAX_NUM; i++, j++) {
                            if (j === 1) {
                                box = '<tr><td>' + _ary[i] + '</td>';
                            } else if (j % 5 === 0 && j !== MAX_NUM) {
                                box = '<td>' + _ary[i] + '</td></tr><tr>';
                            } else if (j === MAX_NUM) {
                                box = '<td>' + _ary[i] + '</td></tr>';
                            } else {
                                box = '<td>' + _ary[i] + '</td>';
                            }
                            ary.push(box);
                        }
                        return $(ary.join(''));
                    },
                    init : function () {
                        return this._createObj();
                    }
                },
                // クリックした時の処理
                clickEvent : {
                    _checkVal : {
                        _isOther : function ($obj) {
                            var b = $obj.hasClass('is-active') ? false : true;
                            return b;
                        },
                        _isNext : function (v) {
                            var b = ((prevVal + 1) === v) ? true : false;
                            return b;
                        }
                    },
                    _thatsAll : function () {
                        alert(BAYMAX);
                        panels.init();
                    },
                    _action : function ($obj) {
                        var v = $obj.text();
                            v = +v;
                        // 正しいクリックであれば
                        // フラグをたて、残りパネルのカウントダウンをし、現在の値をprevValへ代入
                        if (this._checkVal._isOther($obj) && this._checkVal._isNext(v)) {
                            $obj.addClass('is-active');
                            counter.down();
                            prevVal = v;
                        }
                        // 全てのパネルがクリックされた時
                        if (prevVal === MAX_NUM) {
                            this._thatsAll();
                        }
                    },
                    init : function ($obj) {
                        return this._action($obj);
                    }
                },
                // panels.init()
                init : function () {
                    var $elm = this.getjQueryObj.init();
                    var _this = this;

                    // トップ変数の初期化
                    prevVal = 0;
                    counter.reset();

                    // DOM生成
                    $table.html($elm);

                    // イベント設定
                    $table.on('click', 'td', function () {
                        _this.clickEvent.init($(this));
                        return false;
                    });
                }
            };


            /*********** その他イベント一覧と初期化 ***********/
            ({
                // ページ読み込み時
                loadPage : function () {
                    $(window).on('load', function () {
                        panels.init();
                    });
                },
                // 再構築ボタンがクリックされた時
                clickReplay : function () {
                    $('#replay').find('button').click(function () {
                        panels.init();
                        return false;
                    });
                },
                init : function () {
                    this.loadPage();
                    this.clickReplay();
                }
            }).init();

        } // END start
    };


    $(function () {
        controller.start();
    });


})();