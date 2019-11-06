export interface searchKeyWordShape {
	searchKeyWord: string;
}
export interface displaySearchPageShape {
	displaySearchPage: boolean;
}
export interface searchResultShape {
	searchResult: string[];
}
// export interface keyWordInSearchShape {
// 	keyWordInSearch: string | null;
// }
export interface historyRecordShape {
	historyRecord: string[];
}
export interface stateShape
	extends searchKeyWordShape,
		displaySearchPageShape,
		searchResultShape,
		historyRecordShape {}

const state: stateShape = {
	searchKeyWord: "",
	displaySearchPage: false,
	searchResult: [],
	// keyWordInSearch: null,
	historyRecord: []
};

export default state;
