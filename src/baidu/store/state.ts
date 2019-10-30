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

export default state;
