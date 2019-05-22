function init(initSettings) {
	const initButtons = initSettings.keys;
	const drumPadButtonCont = document.querySelector('.keys');
	const newDrumPadButton = document.querySelector('.create-key');

	initButtons.forEach(button => {
		let newButton = new DrumPadButton(button);
		drumPadButtonCont.append(newButton);
	});

	newDrumPadButton.addEventListener('click', function(e) {
		this.newButton = true;
		let newButton = new DrumPadButton(this);
		drumPadButtonCont.append(newButton);
	});

	const recordNewTrack = document.querySelector('#record-loop-button');
	recordNewTrack.addEventListener('click', trackRecorderInit);

	function trackRecorderInit() {
		// Lets create new track and put it into the container
		// Keydowns add beats to the track
		let newTrack = new Track();
        newTrack.record();

        newTrack.loop(true);

        // Prevents this from re-initing another track
		this.removeEventListener('click', trackRecorderInit);

		// Update UI
		this.classList.add('recording');

		// When clicked again, stop recording processes track, reset and send to UI
		this.addEventListener('click', processTrack);
		function processTrack() {
			newTrack.stop();

			this.classList.remove('recording');
			this.addEventListener('click', trackRecorderInit);
            this.removeEventListener('click', processTrack);

			let outputContainer = document.querySelector('.record-loop-container');
			outputContainer.append(newTrack.getTrackUI());
		}
	}
}
