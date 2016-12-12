window.onload = function() {

  var currentPos = 0;
  var $digits;
  var morse = {
    'A' : '.-',
    'B' : '-...',
    'C' : '-.-.',
    'D' : '-..',
    'E' : '.',
    'F' : '..-.',
    'G' : '--.',
    'H' : '....',
    'I' : '..',
    'J' : '.---',
    'K' : '-.-',
    'L' : '.-..',
    'M' : '--',
    'N' : '-.',
    'Ñ' : '--.--',
    'O' : '---',
    'P' : '.--.',
    'Q' : '--.-',
    'R' : '.-.',
    'S' : '...',
    'T' : '-',
    'U' : '..-',
    'V' : '...-',
    'W' : '.--',
    'X' : '-..-',
    'Y' : '-.--',
    'Z' : '--..',
    'nro0' : '-----',
    'nro1' : '.----',
    'nro2' : '..---',
    'nro3' : '...--',
    'nro4' : '....-',
    'nro5' : '.....',
    'nro6' : '-....',
    'nro7' : '--...',
    'nro8' : '---..',
    'nro9' : '----.',
    key: function(n) {
        return this[Object.keys(this)[n]];
    }
  };


  // add eventListener for tizenhwkey
  document.addEventListener('tizenhwkey', function(e) {
    if (e.keyName === "back") {
      try {
        tizen.application.getCurrentApplication().exit();
      } catch (ignore) {}
    }
  });
    
  // Rotary event
  document.addEventListener('rotarydetent', function(e) {
    /* Get the direction value from the event */
    var direction = e.detail.direction;

    if (direction == 'CW'){
      updatePos(true);
    } else if (direction == 'CCW'){
      updatePos(false);
    }
  });

  function drawDigits(){
    var text = '';
    $digits = $('#digits');

    Object.keys(morse).forEach(function(key) {
      if(key != 'key'){ 
        key = key.replace('nro', '');
        text += key;
      }
    });

    $digits.text(text);
    $digits.circleType({fitText:true});
  }

  function updatePos(up){
    var $code = $('#code');

    $('.char' + currentPos).removeClass('selected');

    if (up) {
      currentPos++;
      if(currentPos > $digits.text().length){
        currentPos = 1;
      }
    } else {
      currentPos--;
      if(currentPos < 1){
        currentPos = $digits.text().length;
      }
    }

    $('.char' + currentPos).addClass('selected');

    $code.text(morse.key(currentPos - 1));
  }


  function init(){
    drawDigits();
    updatePos(true);
  }

  init();
};