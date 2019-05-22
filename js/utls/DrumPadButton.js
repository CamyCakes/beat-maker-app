/* Creates drum pad button
 ** builds markup
 ** binds keyboard events
 ** Handles UI configs
 */
function DrumPadButton(theSettings) {
    let settings = theSettings;
	let button = document.createElement("div");
	let label = document.createElement("span");
	let kbd = document.createElement("kbd");
    let audio = document.createElement("audio");
    let deleteBSound = document.createElement("div");
    
    let kCodeLabel = String.fromCharCode( settings.keyCode );
    let kCode = settings.keyCode;

	if (!settings.newButton) {
		label.innerHTML = settings.label;
		kbd.innerHTML = kCodeLabel;
        audio.src = settings.sound;
        audio.setAttribute("data-key", kCode);
	} else {
		kbd.innerHTML = "?";
		label.innerHTML = "...";
    }
    
    window.addEventListener("keydown", bindKeySound);

	let keySettings = document.createElement("div");
	keySettings.classList.add("key-settings");
	keySettings.addEventListener("click", getKeySettings, false);

	// Allows us to change the keys and labels
	label.setAttribute("contenteditable", true);
	kbd.setAttribute("contenteditable", true);

	// Prevents more than one character used
	kbd.setAttribute("onkeypress", "return (this.innerText.length < 1)");
	kbd.addEventListener("focus", focusKey);

	button.classList.add("key");
	button.append(keySettings, kbd, label, audio);

	return button;

	function bindKeySound(e) {
		if (e.keyCode === kCode) playAudio(button);
	}

	function playAudio() {
		audio.currentTime = 0; // resets audio track
        audio.play();
	}

	function focusKey() {
		this.origVal = this.innerText;
		this.innerText = "";
		this.addEventListener("focusout", focusOutKey);
		this.addEventListener("keydown", keyAssign);
	}

	function focusOutKey() {
		if (!this.innerText.length) this.innerText = this.origVal;
		this.removeEventListener("focusout", focusOutKey);
		this.removeEventListener("keydown", keyAssign);
	}

	function keyAssign(e) {
		kCode = e.keyCode;
		this.removeEventListener("keydown", keyAssign);
	}

    // Binds new sound to the selected button
    // Updates the audio tag
	function getKeySettings(e) {
		let audioTag = this.parentElement.querySelector("audio");
		let soundInput = document.createElement("input");
		soundInput.type = "file";
		soundInput.setAttribute("hidden", true);
		soundInput.click();
		soundInput.onchange = function() {
			let reader = new FileReader();
			reader.readAsDataURL(soundInput.files[0]);
			reader.onloadend = function(e) {
				audioTag.src = e.target.result;
			};
		};
	}
}
