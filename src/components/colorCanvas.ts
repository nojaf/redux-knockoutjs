/// <reference path="../../typings/tsd.d.ts" />
import ko from "knockout";

export const componentName = "color-canvas";
export const component = {
	viewModel:function(params){
		this.style = ko.pureComputed(() => {
			return {
				"display":"block",
				"backgroundColor":params.color(),
				"width":params.width(),
				"height":params.height()
			};
		});
	},
	template:`
		<div data-bind="style: style"></div>
	`
};