
window.onload = function () {
    var arrowPos = 0;
    var ballPos = 0;
    var attemptCount = 0;
    var ball = document.querySelector('.ball');
    var arrow = document.querySelector('.bet-arrow');
    var container = document.querySelector('.contents');
    var overlay = document.querySelector('.overlay');
    var attempts = document.querySelector('.attempts');
    var ballIsMoving = false;

    container.addEventListener('click', throwBall);
    document.addEventListener('rotarydetent', rotaryEventHandler);
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back") {
			try {
			    tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
		}
	});


    function rotaryEventHandler(event) {
    	if(ballIsMoving) {
    		return;
    	}
    	
        var direction = event.detail.direction;

        if (direction === "CW") {
        	arrowPos++;
        } else if (direction === "CCW") {
        	arrowPos--;
        }
    
        moveArrow();
    }


    function moveBall(){
    	var degrees = (360/37) * ballPos + 2;
    	ball.style.transform = 'rotate(' + degrees + 'deg)';
    }


    function moveArrow(){
    	var degrees = (360/37) * arrowPos;
    	arrow.style.transform = 'rotate(' + degrees + 'deg)';
    }

    
    function throwBall(){
    	if(overlay.style.display === 'block'){
    		overlay.style.display = 'none';
    		return;
    	}
    	
    	var random = (Math.floor((Math.random() * 40) + 10) / 1000) + 1; // Random number between 1.02 and 1.06
    	var speed = 2;
    	
    	ballIsMoving = true;
    	attemptCount++;
    	
    	var repeat = function(){
    	    clearInterval(interval);

    	    if(speed < 500){
	    	    speed = Math.pow(speed, random);
	    	    interval = setInterval(repeat, speed);
	    		ballPos++;
	    		moveBall();
    		} else {
    			checkResults();
    		}
    	};
    	var interval = setInterval(repeat, speed);
    }
    
    
    function checkResults(){
    	var finalBallPos = ballPos % 37;
    	var finalArrowPos = arrowPos % 37;
    	
    	ballIsMoving = false;
    	
    	if(finalArrowPos < 0){
    		finalArrowPos = 37 + finalArrowPos;
    	}
    	
    	if(finalArrowPos === finalBallPos){
    		attempts.innerHTML = attemptCount;
    		overlay.style.display = 'block';
    	}
    }
};
