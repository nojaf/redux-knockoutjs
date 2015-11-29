import {IAction, ActionTypes} from "../infrastructure/index";

function changeWidth(width:number):IAction{
	return {
		type:ActionTypes.CHANGE_WIDTH,
		payload:width
	}
}

export default {
	changeWidth
}