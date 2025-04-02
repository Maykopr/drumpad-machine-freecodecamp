type ControlButtonProps = {
	label: string;
	click: () => void;
};

type ControlPadProps = {
	children: React.ReactNode;
};

type ControlDisplayProps = {
	display: string;
};

type ControlVolumeProps = {
	sliderValue: number;
	adjustVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ControlButton({ label, click }: ControlButtonProps) {
	return (
		<div className="control">
			<p>{label}</p>
			<button className="control__button" onClick={click}></button>
		</div>
	);
}

const ControlPad = ({ children }: ControlPadProps) => {
	return <div className="controls-container">{children}</div>;
};

function ControlDisplay({ display }: ControlDisplayProps) {
	return (
		<div id="display" className="display">
			{display}
		</div>
	);
}

function ControlVolume({ sliderValue, adjustVolume }: ControlVolumeProps) {
	return (
		<div className="volume-slider">
			<input type="range" min="0" max="1" step="0.01" value={sliderValue} onChange={adjustVolume} />
		</div>
	);
}

export { ControlButton, ControlPad, ControlDisplay, ControlVolume };
