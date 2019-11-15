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
export interface newsArrayShape {
	newsArray: object[];
}
export interface stateShape
	extends searchKeyWordShape,
		displaySearchPageShape,
		searchResultShape,
		displayUserInfoShape,
		newsArrayShape,
		historyRecordShape {}

const state: stateShape = {
	searchKeyWord: "",
	displaySearchPage: false,
	searchResult: [],
	historyRecord: [],
	displayUserInfo: false,
	newsArray: []
};

export default state;
