import { useEffect, useRef, useState } from "react";
import "./App.css";
import Timer from "./Timer";

type TimerData = {
	name: string;
	startTimestamp: number;
};

function App() {
	const [timers, setTimes] = useState<TimerData[]>(loadTimers());
	const [nameInput, setNameInput] = useState<string>("");
	const [now, setNow] = useState<number>(Date.now());
	useInterval(() => {
		setNow(Date.now());
	}, 1000);

	function addTimer() {
		const newTimes = [
			...timers,
			{
				name: nameInput,
				startTimestamp: Date.now(),
			},
		];
		saveTimers(newTimes);
		setTimes(newTimes);
	}

	function removeTimer(i: number) {
		const newTimes = [...timers.slice(0, i), ...timers.slice(i + 1)];
		saveTimers(newTimes);
		setTimes(newTimes);
	}

	function resetTimer(i: number) {
		const newTimes = [
			...timers.slice(0, i),
			{
				name: timers[i].name,
				startTimestamp: Date.now(),
			},
			...timers.slice(i + 1),
		];
		saveTimers(newTimes);
		setTimes(newTimes);
	}

	return (
		<>
			{timers.map((timer, index) => (
				<Timer
					key={index}
					name={timer.name}
					startTimestamp={timer.startTimestamp}
					onRemove={() => {
						removeTimer(index);
					}}
					onReset={() => {
						resetTimer(index);
					}}
					now={now}
				/>
			))}
			<hr></hr>
			<input
				type="text"
				value={nameInput}
				onChange={(e) => setNameInput(e.target.value)}
			></input>
			<button onClick={addTimer}>Create Timer</button>
		</>
	);
}

// Local storage idea taken from https://stackoverflow.com/questions/64497681/how-to-save-state-of-the-page-when-refreshing-html-js
function saveTimers(timers: TimerData[]) {
	localStorage.setItem("timers", JSON.stringify(timers));
}

function loadTimers(): TimerData[] {
	const storageItem = localStorage.getItem("timers");
	try {
		if (storageItem) {
			return JSON.parse(storageItem);
		}
	} catch (e) {}
	return [];
}

// I'm copying the useInterval hook from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: () => void, delay: number) {
	const savedCallback = useRef(callback);

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export default App;
