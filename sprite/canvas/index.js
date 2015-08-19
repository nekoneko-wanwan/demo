/* 
 * 画像の組み込み
 * context.drawImage(image, dx, dy)
 *    @param {obj} image new Image()
 *    @param {num} dx canvasのx座標
 *    @param {num} dy canvasのy座標
 *
 * context.drawImage(image, dx, dy, dw, dh)
 *    @param {num} dw, dh dw/dhが指定されるとdwを横幅dhを縦幅としたサイズに伸縮される
 *
 * context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
 *    元の画像をトリミングしたものをCanvas上に描画
 *    @param {num} sx, sy, sw, sh 元画像の(sx, sy)から縦横の幅(sw, sh)をトリミングし、
        トリミングされた部分をcanvasの(dx, dy)座標に、縦横(dw, dh)のサイズに伸縮
 */


var speed = 60;


function character() {
    var canvas    = document.getElementById('character');
    var context   = canvas.getContext('2d');
    var img       = new Image();
    var row       = 64;  // 一コマの横幅
    var col       = 64;  // 一コマの縦幅
    var step      = 0;   // コマ切り替えの段階
    var limit     = 7;   // コマ切り替えの上限
    var move      = 0;   // 横にスライドさせる位置
    var ax        = 3;   // 横の移動量
    canvas.width  = 500;
    canvas.height = 80;

    img.src = '../images.png?' + new Date().getTime();

    function render() {
      context.clearRect(0, 0, 500, 100);
      context.fillStyle = "rgb(200, 0, 0)";
      context.fillRect(move + row - 5, 20, 500 - move + row, 40);
      context.fillStyle = "rgb(175, 0, 0)";
      context.fillRect(move + row - 5, 55, 500 - move + row, 5);
      context.fillStyle = "rgb(255, 255, 255)";
      context.font = '16px/2 sans-serif';
      context.fillText('MY HP', move + row + 5, 45);

      context.drawImage(img, row * step, 0, row, col, move, 0, row, col);
      if (step < limit) {
        step++;
      } else {
        step = 0;
      }
      if (move < 500 - row) {
        move = move + ax;
      } else {
        move = 0;
      }
      setTimeout(render, speed);
    }

    img.onload = function() {
      render();
    };
}



character();



$('button').on('click', function(){
  var id = $(this).attr('id');

  if(id === 'anger') {
    speed = speed + -20;
  } else {
    speed = speed + 10;
  }

  if (speed <= 0) {
    speed = 0;
  }

  return false;
});


