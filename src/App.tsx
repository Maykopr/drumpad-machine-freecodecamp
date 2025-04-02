import { useState } from "react";
import "./custom.scss";
import sounds from "./sounds";
import { ControlButton, ControlDisplay, ControlVolume } from "./components/Controls";
import { DrumPadBank } from "./components/DrumPadBank";

const App = () => {
	const [power, setPower] = useState(true);
	const [display, setDisplay] = useState("Welcome");
	const [currentPadBank, setCurrentPadBank] = useState(sounds[0]);
	const [currentPadBankId, setCurrentPadBankId] = useState("Default Bank");
	const [sliderValue, setSliderValue] = useState(0.5);

	const updateDisplay = (name: string) => {
		if (power) {
			setDisplay(name);
		}
	};

	const togglePower = () => {
		setPower((power) => !power);
		setDisplay(() => (power ? "" : "Welcome"));
		setCurrentPadBank((visiblePads) => (visiblePads.length > 0 ? [] : sounds[0]));
	};

	const toggleBank = () => {
		if (power) {
			const newBank = currentPadBankId === "Default Bank" ? sounds[0] : sounds[1];
			const newBankId = currentPadBankId === "Default Bank" ? "Custom Bank" : "Default Bank";
			setCurrentPadBank(newBank);
			setCurrentPadBankId(newBankId);
			setDisplay(newBankId);
		}
	};

	const adjustVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (power) {
			const newVolume = parseFloat(event.target.value);
			setSliderValue(newVolume);
			setDisplay(`Volume: ${Math.round(newVolume * 100)}`);
			setTimeout(() => {
				setDisplay(String.fromCharCode(160));
			}, 1000);
		}
	};

	return (
		<div id="drum-machine" className="app">
			<DrumPadBank currentPadBank={currentPadBank} updateDisplay={updateDisplay} sliderValue={sliderValue} />
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
