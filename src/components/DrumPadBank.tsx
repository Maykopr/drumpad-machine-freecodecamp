import { useEffect } from "react";

type DrumPadProps = {
	padId: string;
	keyTrigger: string;
	clipUrl: string;
	updateDisplay: (text: string) => void;
	sliderValue: number;
};

type DrumPadBankProps = {
	currentPadBank: Array<Pad>;
	updateDisplay: (text: string) => void;
	sliderValue: number;
};

type Pad = {
	id: string;
	keyCode: number;
	keyTrigger: string;
	url: string;
};

function DrumPad({ padId, keyTrigger, clipUrl, updateDisplay, sliderValue }: DrumPadProps) {
	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key.toUpperCase() === keyTrigger) {
			playSound();
		}
	};
	const playSound = () => {
		const audioElement = document.getElementById(keyTrigger) as HTMLAudioElement;
		if (!(audioElement instanceof HTMLAudioElement)) {
			console.error("Elemento encontrado não é um elemento de audio");
			return;
		}
		audioElement.currentTime = 0;
		audioElement.volume = sliderValue;
		audioElement.play();
		updateDisplay(padId.replace(/-/g, " "));
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<div className="drumpad-container">
			<button className="drum-pad" id={padId} onClick={playSound}>
				<audio className="clip" id={keyTrigger} src={clipUrl}></audio>
				{keyTrigger}
			</button>
		</div>
	);
}

const DrumPadBank = ({ currentPadBank, updateDisplay, sliderValue }: DrumPadBankProps) => {
	const pads = currentPadBank.map((pad) => (
		<DrumPad
			key={pad.id}
			padId={pad.id}
			keyTrigger={pad.keyTrigger}
			clipUrl={pad.url}
			updateDisplay={updateDisplay}
			sliderValue={sliderValue}
		/>
	));

	return <div className="pad-bank">{pads}</div>;
};

export { DrumPadBank, DrumPad };
