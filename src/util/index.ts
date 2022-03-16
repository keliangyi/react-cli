export function tuple<T extends unknown[]>(...arg: T): T {
	return arg;
}
