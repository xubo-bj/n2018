const shinelonId = require("../../../../config").note.mongodb.shinelonId
import {
    TOGGLE_LEFT_MENU_ONE,
    SELECT_DIR,
    CREATE_NEW_FOLDER_PROMPT,
    CREATE_NEW_FOLDER_SUBMIT,
    CREATE_NEW_FOLDER_SUCCESS
} from "../actions"



const leftMenuOneDisplay = (display = "none", action) => {
    switch (action.type) {
        case TOGGLE_LEFT_MENU_ONE:
            return action.display
        default:
            return display
    }
}


const currentDirId = (dirId = shinelonId, action) => {
    switch (action.type) {
        case SELECT_DIR:
            return action.dirId
        default:
            return dirId
    }
}


let defaultV = {
    _id: shinelonId,
    dirs: [],
    docs: [],
    folded: false
}
let test = {
        _id: shinelonId,
        dirs: [{
                _id: 1,
                name: "编程指南"
            },
            {
                _id: 2,
                name: "编程指南新编"
            }
        ],
        docs: [],
        folded: false
    },
    t1 = {
        _id: 1,
        name: "编程指南",
        folded: false,
        dirs: [{
                _id: 3,
                name: "编程指南3"
            },
            {
                _id: 4,
                name: "编程指南新编4"
            }
        ]

    }


const tree = (treeArray = [defaultV], action) => {
    switch (action.type) {
        case CREATE_NEW_FOLDER_PROMPT:
            {
                let _id = action.currentDirId
                let targetDir = treeArray.find(dir => dir._id === _id)
                targetDir.dirs.push({
                    editable: true,
                    name: "新建文件夹"
                })
                let newTree = [...treeArray]
                return newTree
            }
        case CREATE_NEW_FOLDER_SUCCESS:
            {
                let parentDir = treeArray.find(dir=>dir._id == action.parentId)
                

            }
        default:
            return treeArray
    }
}




import {
    combineReducers
} from 'redux'
export default combineReducers({
    leftMenuOneDisplay,
    tree,
    currentDirId
})
