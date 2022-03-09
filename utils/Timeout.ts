import { generateUUID } from "./UUID";
import { clearTimeout } from "timers";

export default class Timeout {
	constructor(timeoutMil: number, callback: () => void) {
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