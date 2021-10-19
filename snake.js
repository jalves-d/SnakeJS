document.addEventListener("DOMContentLoaded", () => {
	const squares = document.querySelectorAll('.grid div')
	const scoreDisplay = document.querySelector('span')
	const startButton = document.querySelector('.button-19')
	const widht = 10

	let currentIndex = 0
	let appleIndex = 0
	let currentSnake = [2, 1, 0]
	let direction = 1
	let score = 0
	let speed = 0.9
	let interval = 0
	let intervalTime = 0

	function move() {
		if ((currentSnake[0] + widht >= (widht * widht) && direction === widht) ||
		(currentSnake[0] % widht === widht -1 && direction === 1) ||
		(currentSnake[0] % widht === 0 && direction === -1) ||
		(currentSnake[0] - widht < 0 && direction === -widht) ||
		squares[currentSnake[0] + direction].classList.contains('snake'))
		{
			return clearInterval(interval)
		}
		const tail = currentSnake.pop()
		squares[tail].classList.remove('snake')
		currentSnake.unshift(currentSnake[0] + direction)
		if (squares[currentSnake[0]].classList.contains('apple'))
		{
			squares[currentSnake[0]].classList.remove('apple')
			squares[tail].classList.add('snake')
			currentSnake.push(tail)
			randomApple()
			score++
			scoreDisplay.textContent = score
			if (score === 42)
				return clearInterval(interval);
			clearInterval(interval)
			intervalTime = intervalTime * speed
			interval = setInterval(move, intervalTime)
		}
		squares[currentSnake[0]].classList.add('snake')
	};

	function randomApple() {
		do{
		  appleIndex = Math.floor(Math.random() * squares.length)
		} while(squares[appleIndex].classList.contains('snake'))
		squares[appleIndex].classList.add('apple')
	};

	function startgame() {
		currentSnake.forEach(element => squares[element].classList.remove('snake'))
		squares[appleIndex].classList.remove('apple')
		clearInterval(interval)
		score = 0
		randomApple()
		direction = 1
		scoreDisplay.innerText = score
		intervalTime = 1000
		currentSnake = [2, 1, 0]
		currentIndex = 0
		currentSnake.forEach(element => squares[element].classList.add('snake'))
		interval = setInterval(move, intervalTime)
	};

	function control(e) {
		squares[currentIndex].classList.remove('snake')

		if (e.keyCode === 39){
			direction = 1
		}
		else if (e.keyCode === 38){
			direction = -widht
		}
		else if (e.keyCode === 37){
			direction = -1
		}
		else if (e.keyCode === 40){
			direction = +widht
		}
	};

	document.addEventListener('keyup', control)
	startButton.addEventListener('click', startgame)
})


