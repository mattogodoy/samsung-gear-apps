
window.onload = function () {
	var polygons = [
	  '-',
	  '-',
	  '-',
	  'Triángulo',
	  'Cuadrilátero',
	  'Pentágono',
	  'Hexágono',
	  'Heptágono',
	  'Octágonos',
	  'Eneágono',
	  'Decágono',
	  'Endecágono',
	  'Dodecágono',
	  'Tridecágono',
	  'Tetradecágono',
	  'Pentadecágono',
	  'Hexadecágono',
	  'Heptadecágono',
	  'Octadecágono',
	  'Eneadecágono',
	  'Icoságono',
	  'Círculo'
	];
	
	var colors = [
      '-',
      '-',
      '-',
      '#48d3e0',
      '#4cc9e0',
      '#51bfe0',
      '#56b5e0',
      '#5aabe0',
      '#5fa1e0',
      '#6497e0',
      '#698de0',
      '#6d83e0',
      '#7279e0',
      '#776fe0',
      '#7b65e0',
      '#805be0',
      '#8551e0',
      '#8a48e0',
      '#9048d7',
      '#9648cf',
      '#9c48c6',
      '#e04869'
    ];
	
	var current = 3;
	
	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
	    if(e.keyName === "back") {
	  try {
	      tizen.application.getCurrentApplication().exit();
	  } catch (ignore) {
	  }
	}
  });

  document.addEventListener('rotarydetent', function(event) {
    var direction = event.detail.direction;

    if (direction === "CW") {
      current++;
    } else if (direction === "CCW") {
      current--;
    }

    if(current < 3){
      current = 3;
    } else if(current > 21){
      current = 21;
    }

    drawPoligon(current);
  });

    
  function drawPoligon(numberOfSides){
    var size = 80;
    var Xcenter = 180;
    var Ycenter = 90;
    var ctx = document.getElementById('canvas').getContext('2d');
    var sides = numberOfSides;
    var color = colors[numberOfSides];
    
    clear();
    
    if(sides === 21){
    	sides = 100;
    }

    ctx.beginPath();
    ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

    for (var i = 1; i <= sides;i += 1) {
        ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / sides), Ycenter + size * Math.sin(i * 2 * Math.PI / sides));
    }

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = color;
    ctx.fill();

    drawNumber(numberOfSides);
    drawName(numberOfSides);
  }

  function drawNumber(numberOfSides) {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '48px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if(numberOfSides === 21){
    	numberOfSides = '∞';
    }
    
    ctx.fillText(numberOfSides, 180, 90);
  }

  function drawName(numberOfSides) {
    var nameEl = document.querySelector('.name');
    var name = polygons[numberOfSides];

    nameEl.innerHTML = name;
  }
  
  function clear(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawPoligon(current);
};
