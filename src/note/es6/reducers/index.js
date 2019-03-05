import {
    TOGGLE_LEFT_MENU_ONE
} from "../actions"
const leftMenuOneDisplay = (display = "none", action) => {
    switch (action.type) {
        case TOGGLE_LEFT_MENU_ONE:
            return action.display
        default:
            return display
    }
}


import {
    CREATE_NEW_FOLDER_PROMPT
} from "../actions"
const tree = (treeObj = {}, action) => {
    switch (action.type) {
        case CREATE_NEW_FOLDER_PROMPT:
            {
                return treeObj
            }
        default:
            return treeObj
    }
}

import {
    SELECT_DIR
} from "../actions"
const currentDir = (dir = [], action) => {
    switch (action.type) {
        case SELECT_DIR:
            return action.dir
        default:
            return dir
    }
}

import {
    combineReducers
} from 'redux'
export default combineReducers({
    leftMenuOneDisplay,
    tree,
    currentDir
})
