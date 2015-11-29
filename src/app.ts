/// <reference path="../typings/tsd.d.ts" />
import {mainViewModel} from "./viewmodels/mainViewModel";
import ko from "knockout";
import {component, componentName} from "./components/colorCanvas";

(function(){
	window.onload = () => {
		ko.components.register(componentName, component);
		
		var node:HTMLElement = document.getElementById("app");
		ko.applyBindings(mainViewModel, node);
	};
})();