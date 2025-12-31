var deadline = new Date("September 19, 2026 13:59:59");

function updateTimer(deadline){
	var time = deadline - new Date();
	return{
		'days': Math.floor(time / (1000 * 60 * 60 * 24)),
		'hours': Math.floor((time / (1000 * 60 * 60)) % 24),
		'minutes': Math.floor((time / 1000 / 60) % 60),
		'total': time
	};
}

function startTimer(deadline){
	var timerInterval = setInterval(function(){
		var timer = updateTimer(deadline);
		$('#timerDays').text(timer.days);
		$('#timerHours').text(timer.hours);
		$('#timerMinutes').text(timer.minutes);
		if (timer.total < 1) {
			clearInterval(timerInterval);
			$('#timerDays').text('0');
			$('#carouselTimerDays').text('0');
			$('#timerHours').text('0');
			$('#carouselTimerHours').text('0');
			$('#timerMinutes').text('0');
			$('#carouselTimerMinutes').text('0');
		}
	}, 1000);
}

$(document).ready(function(){
	startTimer(deadline);
});