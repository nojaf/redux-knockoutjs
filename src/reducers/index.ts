/// <reference path="../../typings/tsd.d.ts" />
import {IApplicationState, IAction, ActionTypes} from "../infrastructure/index";
import {default as objectAssign} from "object-assign";

const widthError:string = "Width should be numeric";
const heightError:string = "Height should be numeric";

const reducerMap:Map<ActionTypes,Function> = new Map<ActionTypes, Function>();

function changeWidth(initialState:IApplicationState, width:any):IApplicationState {
	if(isValidNumeric(width)){
		return updatedErrorState(initialState, widthError, "width");
	}
	
	const errors = removeError(initialState.errors, widthError);
	return objectAssign({}, initialState, {width,errors});
}

function changeHeight(initialState:IApplicationState, height:any):IApplicationState {
	if(isValidNumeric(height)){
		return updatedErrorState(initialState, heightError, "height");
	}
	
	const errors = removeError(initialState.errors, heightError);	
	return objectAssign({}, initialState, {height, errors});
}

function isValidNumeric(input:any):boolean{
	return (!input || isNaN(input));
}

function updatedErrorState(initialState:IApplicationState, error:string, resetValue:string):IApplicationState{
	const errors = (initialState.errors ? addError(initialState.errors, error) : [error]);
	return objectAssign({}, initialState, {errors, [resetValue]:0});
}

function addError(errors:Array<string>, newError:string):Array<string>{
	if(errors.indexOf(newError) !== -1) return errors;
	return [].concat(errors, [newError]);
}

function removeError(errors:Array<string>, errorToRemove:string):Array<string>{
	if(!errors) return [];
	
	const index:number = errors.indexOf(errorToRemove);
	if(index === -1) return errors;
	
	return [].concat(errors.slice(0, index), errors.slice(index+1));
}


function changeColor(initialState:IApplicationState, color:string){
	return objectAssign({}, initialState, {"color":color});
}

reducerMap.set(ActionTypes.CHANGE_WIDTH, changeWidth);
reducerMap.set(ActionTypes.CHANGE_HEIGHT, changeHeight);
reducerMap.set(ActionTypes.CHANGE_COLOR, changeColor);

export default function rootReducer(initialState:IApplicationState = {}, action:IAction):IApplicationState{
	return reducerMap.has(action.type) ? reducerMap.get(action.type)(initialState, action.payload) : initialState;
}