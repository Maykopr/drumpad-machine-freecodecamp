type DrumPadProps = {
	padId: string;
	keyTrigger: string;
	clipUrl: string;
	playSound: () => void;
};

const DrumPad = ({ padId, keyTrigger, clipUrl, playSound }: DrumPadProps) => {
	return (
		<div className="drumpad-container">
			<button className="drum-pad" id={padId} onClick={playSound}>
				<audio className="clip" id={keyTrigger} src={clipUrl}></audio>
				{keyTrigger}
			</button>
		</div>
	);
};

export { DrumPad };
