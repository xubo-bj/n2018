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

export interface searchKeyWordShape {
	searchKeyWord: string;
}
export interface displaySearchPageShape {
	displaySearchPage: boolean;
}
export interface searchResultShape {
	searchResult: string[];
}
export interface keyWordInSearchShape {
	keyWordInSearch: string | null;
}
export interface stateShape
	extends searchKeyWordShape,
		displaySearchPageShape,
		searchResultShape,
		keyWordInSearchShape {}

const state: stateShape = {
	searchKeyWord: "",
	displaySearchPage: false,
	searchResult: [],
	keyWordInSearch: null
};

export default state;
