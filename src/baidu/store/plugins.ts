import { stateShape } from "./state";
export const myPluginWithSnapshot = (store: any) => {
	// let prevState = _.cloneDeep(store.state);
	store.subscribe((mutation: any, state: stateShape) => {
		// console.log("mutation", mutation.type);
		console.log("plugin", state.searchResult);
		// console.log("state", state.currentTab);
		// console.log("state :\n", state);
		// let nextState = _.cloneDeep(state);
		// compare `prevState` and `nextState`...
		// save state for next mutation
		// prevState = nextState;
	});
};
