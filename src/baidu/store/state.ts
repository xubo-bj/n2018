/*
export interface tagShape {
    id: string;
    name: string;
}
export interface stateShape {
    currentTab: string[];
    tagName: string;
    tagLists: tagShape[];
}

const state: stateShape = {
    currentTab: ["dashboard"],
    tagName: "",
    tagLists: []
};
*/
export interface stateShape {
	searchKeyWord: string;
}
const state: stateShape = {
	searchKeyWord: ""
};

export default state;
