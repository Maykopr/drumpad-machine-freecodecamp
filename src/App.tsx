import { useState, useEffect, useCallback } from "react";
import "./custom.scss";
import sounds from "./sounds";
import { ControlButton, ControlDisplay, ControlVolume } from "./components/Controls";
import { DrumPad } from "./components/DrumPad";

const App = () => {
	const [power, setPower] = useState(true);
	const [display, setDisplay] = useState("Welcome");
	const [currentPadBank, setCurrentPadBank] = useState(sounds[0]);
	const [currentPadBankId, setCurrentPadBankId] = useState("Default Bank");
	const [sliderValue, setSliderValue] = useState(0.5);

	const updateDisplay = useCallback(
		(name: string) => {
			if (power) {
				setDisplay(name);
			}
		},
		[power]
	);

	const togglePower = useCallback(() => {
		setPower((prevPower) => !prevPower);
		setDisplay((prevPower) => (prevPower ? "" : "Welcome"));
		setCurrentPadBank((prevPads) => (prevPads.length > 0 ? [] : sounds[0]));
	}, []);

	const toggleBank = useCallback(() => {
		if (power) {
			const newBank = currentPadBankId === "Default Bank" ? sounds[0] : sounds[1];
			const newBankId = currentPadBankId === "Default Bank" ? "Custom Bank" : "Default Bank";
			setCurrentPadBank(newBank);
			setCurrentPadBankId(newBankId);
			setDisplay(newBankId);
		}
	}, [power, currentPadBankId]);

	const adjustVolume = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (power) {
				const newVolume = parseFloat(event.target.value);
				setSliderValue(newVolume);
				setDisplay(`Volume: ${Math.round(newVolume * 100)}`);
				setTimeout(() => {
					setDisplay(String.fromCharCode(160));
				}, 1000);
			}
		},
		[power]
	);

	const playSound = useCallback(
		(padId: string, keyTrigger: string) => {
			if (power) {
				const audioElement = document.getElementById(keyTrigger) as HTMLAudioElement;
				if (!(audioElement instanceof HTMLAudioElement)) {
					console.error("Elemento encontrado não é um elemento de audio");
					return;
				}
				audioElement.currentTime = 0;
				audioElement.volume = sliderValue;
				audioElement.play();
				updateDisplay(padId.replace(/-/g, " "));
			}
		},
		[power, sliderValue, updateDisplay]
	);

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			const pad = currentPadBank.find((pad) => pad.keyTrigger === event.key.toUpperCase());
			if (pad) {
				playSound(pad.id, pad.keyTrigger);
			}
		},
		[currentPadBank, playSound]
	);

	useEffect(() => {
		if (power) {
			window.addEventListener("keydown", handleKeyPress);
			return () => {
				window.removeEventListener("keydown", handleKeyPress);
			};
		}
	}, [handleKeyPress, power]);

	return (
		<div id="drum-machine" className="app">
			<div className="pad-bank">
				{currentPadBank.map((pad) => (
					<DrumPad
						key={pad.id}
						padId={pad.id}
						keyTrigger={pad.keyTrigger}
						clipUrl={pad.url}
						playSound={() => playSound(pad.id, pad.keyTrigger)}
					/>
				))}
			</div>
			<div className="controls-container">
				<ControlButton label="Power" click={togglePower} />
				<ControlDisplay display={display} />
				<ControlVolume sliderValue={sliderValue} adjustVolume={adjustVolume} />
				<ControlButton label="Bank" click={toggleBank} />
			</div>
		</div>
	);
};

export default App;
