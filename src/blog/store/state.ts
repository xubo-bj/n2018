export interface stateShape {
	currentTab: string[];
	tagName: string;
}

const state: stateShape = {
	currentTab: ["dashboard"],
	tagName: "default name"
};
export default state;
