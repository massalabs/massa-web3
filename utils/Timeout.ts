import { generateUUID } from "./UUID";
import { clearTimeout, clearInterval } from "timers";

export class Timeout {
	constructor(timeoutMil: number, callback: () => void) {
		this.getId = this.getId.bind(this);
		this.clear = this.clear.bind(this);

		const that = this;
		this.isCleared = false;
		this.isCalled = false;
		this.timeoutHook = setTimeout(() => {
			if (!that.isCleared) {
				this.isCalled = true;
				callback();
			}
		}, timeoutMil);
	}
	private id: string;
	private isCleared: boolean;
	private isCalled: boolean;
	private timeoutHook: NodeJS.Timer;

	public getId(): string {
		if (!this.id)
			this.id = generateUUID();

		return this.id;
	}

	public clear(): void {
		if (!this.isCleared) {
			clearTimeout(this.timeoutHook);
			this.isCleared = true;
		}
	}
}

export class Interval {
	constructor(timeoutMil: number, callback: () => void) {
		this.getId = this.getId.bind(this);
		this.clear = this.clear.bind(this);

		const that = this;
		this.isCleared = false;
		this.isCalled = false;
		this.intervalHook = setInterval(() => {
			if (!that.isCleared) {
				this.isCalled = true;
				callback();
			}
		}, timeoutMil);
	}
	private id: string;
	private isCleared: boolean;
	private isCalled: boolean;
	private intervalHook: NodeJS.Timer;

	public getId(): string {
		if (!this.id)
			this.id = generateUUID();

		return this.id;
	}

	public clear(): void {
		if (!this.isCleared) {
			clearInterval(this.intervalHook);
			this.isCleared = true;
		}
	}
}
