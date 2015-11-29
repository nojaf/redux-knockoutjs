import {IAction, ActionTypes} from "../infrastructure/index";

function changeWidth(width:number):IAction{
	return {
		type:ActionTypes.CHANGE_WIDTH,
		payload:width
	}
}

function changeHeight(height:number):IAction{
	return {
		type:ActionTypes.CHANGE_HEIGHT,
		payload:height	
	};
}

function changeColor(color:string):IAction {
	return {
		type:ActionTypes.CHANGE_COLOR,
		payload:color
	}
}

export default {
	changeWidth,
	changeHeight,
	changeColor
}