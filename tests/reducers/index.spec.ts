/// <reference path="../../typings/tsd.d.ts" />
import {IAction, ActionTypes} from "../../src/infrastructure/index";
import {default as actions} from "../../src/actions/index";
import {assert} from "chai";
import rootReducer from "../../src/reducers/index";

describe("reducers", () => {
	describe("unknown action", () => {
		it("should return the initialState", () => {
			const initialState = {};
			Object.freeze(initialState);

			const state = rootReducer(initialState, {type:<ActionTypes>147,payload:null});
			assert.deepEqual(initialState, state);			
		});
	})
	
	describe("changeWidth", () => {
		it("should add an error when the width is not numeric", () => {
			const initialState = {};
			Object.freeze(initialState);
			
			const state = rootReducer(initialState, actions.changeWidth(<any>"invalid"));
			assert.equal(state.errors.length,1);
		});
		
		it("should add the with if it's valid", () => {
			const initialState = {};
			Object.freeze(initialState);

			const state = rootReducer(initialState, actions.changeWidth(150));
			assert.equal(state.width, 150);			
		});
		
		it("should remove an error when valid", () => {
			const initialState = {errors:["Width should be numeric","other error"]};
			Object.freeze(initialState);

			const state = rootReducer(initialState, actions.changeWidth(150));
			assert.equal(state.errors.length, 1);		
		});
	});
	
	describe("changeHeight", () => {
		it("should add an error when the height is not numeric", () => {
			const initialState = {};
			Object.freeze(initialState);
			
			const state = rootReducer(initialState, actions.changeHeight(null));
			assert.equal(state.errors.length,1);
		});
		
		it("should not add the same error twice", () => {
			const initialState = {};
			Object.freeze(initialState);
			
			const secondState = rootReducer(initialState, actions.changeHeight(null));
			Object.freeze(secondState);
			
			const state = rootReducer(secondState, actions.changeHeight(null));
			assert.equal(state.errors.length,1);
		});
		
		it("should remove an error when new height is valid", () => {
			const initialState = {};
			Object.freeze(initialState);
			
			const secondState = rootReducer(initialState, actions.changeHeight(null));
			Object.freeze(secondState);
			
			const state = rootReducer(secondState, actions.changeHeight(7));
			assert.equal(state.errors.length,0);
		})
	});
	
	describe("changeColor", () => {
		it("should change the color", () => {
			const initialState = {};
			Object.freeze(initialState);
			
			const state = rootReducer(initialState, actions.changeColor("red"));
			assert.equal(state.color, "red");
		})
	})
})