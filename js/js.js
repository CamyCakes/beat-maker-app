function init(initSettings) {
	const initButtons = initSettings.keys;
	const drumPadButtonCont = document.querySelector('.keys');
	const newDrumPadButton = document.querySelector('.create-key');
	window.documentOpened = new Date().getTime();

	initButtons.forEach(button => {
		let newButton = new DrumPadButton(button);
		drumPadButtonCont.append(newButton);
	});

	// newDrumPadButton.addEventListener('click', function(e) {
	// 	this.newButton = true;
	// 	let newButton = new DrumPadButton(this);
	// 	drumPadButtonCont.append(newButton);
	// });

	// Binds loop maker ui
	const recordNewTrack = document.querySelectorAll('.track');
	recordNewTrack.forEach(track => {
		return new Track(track);
	});	
}

function c(m){
	console.log(m)
}