// Sets up and handles all track recordings

function Track(target) {
	let newTrackSequence = [];
	let trackStart = 0;
	let trackStop = 0;
	let trackLength = 0;
	let play = false;

	/* ---- Record Button ----- */

	let recordButton = target.querySelector(".record");
	recordButton.addEventListener("click", recordTrack);

	function recordTrack() {
		
		newTrackSequence = [];

		target.classList.add("recording");

		recordButton.addEventListener("click", stopRecording);
		recordButton.removeEventListener("click", recordTrack);

		window.addEventListener("keydown", recordKey);
		trackStart = new Date().getTime();

		// Finds the src of the audio tag associted with the key press
		// Records timestamp of keypres
		function recordKey(e) {
			let s = document.querySelector(
				'audio[data-key="' + e.keyCode + '"]'
			).src;
			newTrackSequence.push({
				start: e.timeStamp,
				sound: s
			});
		}

		function stopRecording() {
			target.classList.remove("recording");
			window.removeEventListener("keydown", recordKey);

			recordButton.addEventListener("click", recordTrack);
			recordButton.removeEventListener("click", stopRecording);

			trackStop = new Date().getTime();
			trackLength = trackStop - trackStart;
		}
	}

	/* ---- Play Button ----- */

	let playButton = target.querySelector(".play");
	playButton.addEventListener("click", playTrack);

	function playTrack() {
		if (!newTrackSequence.length) return;
		
		playButton.parentElement.classList.add("playing");
		play = true;
		
		let offset = -1 * (0 - newTrackSequence[0].start);
		let lastBeat = newTrackSequence[newTrackSequence.length - 1];

		let tmpAudio = document.createElement("audio");
		tmpAudio.src = lastBeat.sound;

		// Plays the sound timeline
		newTrackSequence.forEach(function(beat) {
			// Trim first beat
			let startTime = beat.start - offset;
			window.setTimeout(play, startTime);

			function play() {
				let tmpAud = document.createElement("audio");
				tmpAud.src = beat.sound;
				tmpAud.play();
			}
		});

		window.setTimeout(function() {
			if (!play){
				return;
			} 
			playTrack();
		}, trackLength);
	}

	/* ---- Stop Playing Button ----- */

	let stopButton = target.querySelector(".stop");
	stopButton.addEventListener("click", stopPlayingTrack);
	function stopPlayingTrack() {
		this.parentElement.classList.remove("playing");
		play = false;
	}
}
