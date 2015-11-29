/// <reference path="../../typings/tsd.d.ts" />
import {default as actions} from "../../src/actions/index";
import {IAction, ActionTypes} from "../../src/infrastructure/index";
import {assert} from "chai";

describe("action", () => {
	describe("changeWidth", () => {
		let action:IAction;
		beforeEach(() => {
			action = actions.changeWidth(200);
		});
		
		it("should return action with type CHANGE_WIDTH", () => {
			assert.equal(action.type, ActionTypes.CHANGE_WIDTH);
		});
		
		it("should return action with payload 200", () => {
			assert.equal(action.payload, 200);
		});
	})
	
	describe("changeHeight", () => {
		let action:IAction;
		beforeEach(() => {
			action = actions.changeHeight(150);			
		});
		
		it("should return action with type CHANGE_HEIGHT", () =>{
			assert.equal(action.type, ActionTypes.CHANGE_HEIGHT);
		});
		
		it("should return action with payload 150", () => {
			assert.equal(action.payload, 150);
		});
	});
	
	describe("changeColor", () => {
		let action:IAction;
		beforeEach(() => {
			 action = actions.changeColor("red");
		});
		
		it("should return action with type CHANGE_COLOR", () => {
			assert.equal(action.type, ActionTypes.CHANGE_COLOR);
		})
		
		it("should return action with payload red", () => {
			assert.equal(action.payload, "red");					
		});
	})
})