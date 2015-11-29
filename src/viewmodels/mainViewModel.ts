/// <reference path="../../typings/tsd.d.ts" />
import ko from "knockout";
import store from "../store/index";
import {IApplicationState, IAction} from "../infrastructure/index";
import {default as actions} from "../actions/index";

class MainViewModel {
	private applicationState:KnockoutObservable<IApplicationState>;
	color:KnockoutComputed<string>;
	height:KnockoutComputed<string>;
	width:KnockoutComputed<string>;
	statePrint:KnockoutComputed<string>;
	errors:KnockoutComputed<Array<string>>;
	hasErrors:KnockoutComputed<boolean>;
	
	private unsubscribe:Function;
	
	constructor(){
		this.applicationState = ko.observable(this.getState());
		
		this.unsubscribe = store.subscribe(() => {
			console.info("store changed");
			this.applicationState(this.getState());
		});
		
		this.color = ko.pureComputed<string>(() => this.applicationState().color);
		this.height = ko.pureComputed<string>(() => `${this.applicationState().height}px`);
		this.width = ko.pureComputed<string>(() => `${this.applicationState().width}px`);
		this.statePrint = ko.pureComputed<string>(() => ko.toJSON(this.applicationState()));
		this.errors = ko.pureComputed<Array<string>>(() => this.applicationState().errors);
		this.hasErrors = ko.pureComputed<boolean>(() => {return (this.errors() && this.errors().length > 0)});
	}
	
	updateWidth(data:any, e:Event){
		this.updateDimension(e, actions.changeWidth);
	}
	
	updateHeight(data:any, e:Event){
		this.updateDimension(e, actions.changeHeight);
	}
	
	private updateDimension(e:Event,actionCreator:Function):void{
		var value = this.getValueAsInt(<HTMLInputElement>e.target);
		if(value){
			this.dispatch(actionCreator(value));			
		}
	}
	
	private getValueAsInt(input:HTMLInputElement):number{
		return <any>input.value;
	}
	
	updateColor(data:any, e:Event){
		this.dispatch(actions.changeColor((<HTMLInputElement>e.target).value));
	}
	
	private getState():IApplicationState{
		return store.getState() || {color:"", width:"", height:"", erros:[]};
	}

	private dispatch(action:IAction){
		return store.dispatch(action);
	}
}

export var mainViewModel = new MainViewModel();