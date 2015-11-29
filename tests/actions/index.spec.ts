import {default as actions} from "../../src/actions/index";
import {IAction, ActionTypes} from "../../src/infrastructure/index";
import {assert} from "chai";

describe("action", () => {
	describe("changeWidth", () => {
		it("should return action with type CHANGE_WIDTH", () => {
			const action:IAction = actions.changeWidth(200);
			assert.equal(action.type, ActionTypes.CHANGE_WIDTH);
		});
		
		it("should return action with payload 200", () => {
			const action:IAction = actions.changeWidth(200);
			assert.equal(action.payload, 200);
		})
	})
})