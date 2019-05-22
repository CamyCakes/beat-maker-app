// Starts recording the sequence and timing of beats
// Returns the new track sequence

function Track() {
    let newTrackSequence = [];
    let loop = false;

	this.record = function() {
		window.addEventListener('keydown', recordKey);
	};

	// Removes the event listener for recording new tracks
	this.stop = function() {
		window.removeEventListener('keydown', recordKey);
	};

	this.getTrackUI = function() {
		let trackUI = document.createElement('div');
		trackUI.classList.add('track');

		let deleteButton = document.createElement('span');
		deleteButton.innerHTML = '&times;';
		deleteButton.classList.add('delete-track');
		deleteButton.addEventListener('click', deleteTrack);

		let playButton = document.createElement('div');
		playButton.innerHTML = 'Play';
		playButton.addEventListener('click', playTrack);

		let stopButton = document.createElement('div');
		stopButton.innerHTML = 'Stop';
		stopButton.addEventListener('click', stopTrack);

		trackUI.append(playButton, stopButton, deleteButton);

		return trackUI;
    };

    this.loop = function(loop){
        loop = loop;
    }

	function playTrack() {
        let offset = -1 * (0 - newTrackSequence[0].start);
        let x = newTrackSequence.length;
        let totalLength = newTrackSequence[x];

		// Plays the sound timeline
		newTrackSequence.forEach(function(beat) {
			// Trim first beat
            let startTime = beat.start - offset;
			window.setTimeout(play, startTime);

			function play() {
				let tmpAud = document.createElement('audio');
				tmpAud.src = beat.sound;
				tmpAud.play();
				tmpAud.ended = function() {
					console.log('ended');
				};
            }
        });

        console.log(totalLength);
        
        // playTrack();
	}

	function deleteTrack() {
		this.parentElement.remove();
	}

	function stopTrack() {
		console.log('stopped');
	}

	function recordKey(e) {
		newTrackSequence.push({
			start: e.timeStamp,
			sound: document.querySelector('audio[data-key="' + e.keyCode + '"]').src,
		});
	}
}
