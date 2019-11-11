export interface searchKeyWordShape {
	searchKeyWord: string;
}
export interface displaySearchPageShape {
	displaySearchPage: boolean;
}
export interface searchResultShape {
	searchResult: string[];
}
export interface historyRecordShape {
	historyRecord: string[];
}
export interface displayUserInfoShape {
	displayUserInfo: boolean;
}
export interface stateShape
	extends searchKeyWordShape,
		displaySearchPageShape,
		searchResultShape,
		displayUserInfoShape,
		historyRecordShape {}

const state: stateShape = {
	searchKeyWord: "",
	displaySearchPage: false,
	searchResult: [],
	historyRecord: [],
	displayUserInfo: false
};

export default state;
