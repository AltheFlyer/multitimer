export default function Timer(props: {
	name: string;
	startTimestamp: number;
	onRemove: React.MouseEventHandler<HTMLButtonElement>;
	onReset: React.MouseEventHandler<HTMLButtonElement>;
	now: number;
}) {
	const { name, startTimestamp, onRemove, onReset, now } = props;

	const lastTimeAsDate = new Date(startTimestamp);
	const timeSinceMillis = now - startTimestamp;

	const hours = Math.max(0, Math.floor(timeSinceMillis / 3600000));
	const minutes = Math.max(
		0,
		Math.floor((timeSinceMillis % 3600000) / 1000 / 60)
	);
	const seconds = Math.max(0, Math.floor((timeSinceMillis / 1000) % 60));

	return (
		<>
			<div>
				<p>
					<b>{name}</b>
				</p>
				<p>
					Last Set: {lastTimeAsDate.toDateString()}{" "}
					{lastTimeAsDate.toLocaleTimeString()}
				</p>
				<p>
					Time Since Last Reset: {hours}:
					{minutes.toString().padStart(2, "0")}:
					{seconds.toString().padStart(2, "0")}
				</p>
				<button onClick={onRemove}>Remove</button>
				<button onClick={onReset}>Reset</button>
			</div>
		</>
	);
}
