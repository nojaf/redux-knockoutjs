export interface IApplicationState {
	width: number;
	height: number;
	color: string;
}

export enum ActionTypes {
	CHANGE_COLOR,
	CHANGE_WIDTH,
	CHANGE_HEIGHT
}

export interface IAction {
	type: ActionTypes,
	payload: any
}