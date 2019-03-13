const shinelonId = require("../../../../config").note.mongodb.shinelonId
const {
    TOGGLE_LEFT_MENU_ONE,
    TOGGLE_LEFT_MENU_TWO,
    SELECT_DIR,
    CREATE_NEW_FOLDER_PROMPT,
    CREATE_NEW_FOLDER_SUBMIT,
    CREATE_NEW_FOLDER_SUCCESS
} = require("../actions")

const leftMenuOneDisplay = (display = "none", action) => {
    switch (action.type) {
        case TOGGLE_LEFT_MENU_ONE:
            return action.display
        case TOGGLE_LEFT_MENU_TWO:
            {
                if (action.display == "block") {
                    return "none"
                }
                return display
            }
        default:
            return display
    }
}
const leftMenuTwo = (r = {
    display: "none",
    clientX: "0px;",
    clientY: "0px"
}, action) => {
    switch (action.type) {
        case TOGGLE_LEFT_MENU_TWO:
            return {
                display: action.display,
                clientX: action.clientX,
                clientY: action.clientY
            }
        case TOGGLE_LEFT_MENU_ONE:
            {
                if (action.display == "block") {
                    return {
                        display: "none",
                        clientX: 0,
                        clientY: 0
                    }
                }
                return r
            }
        default:
            return r
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
                let {
                    parentId,
                    newId,
                    name,
                    time
                } = action
                treeArray.push({
                    _id: newId,
                    name: name,
                    ctime: time,
                    mtime: time,
                    folded: true,
                    dirs: [],
                    files: []
                })
                let parentDir = treeArray.find(dir => dir._id == parentId)
                let dirs = parentDir.dirs.filter(dir => dir.editable == null)
                dirs.push({
                    _id: newId,
                    name: name,
                    ctime: time,
                    mtime: time,
                })
                parentDir.dirs = dirs
                return [...treeArray]
            }
        default:
            return treeArray
    }
}

const showMask = (flag = false, action) => {
    switch (action.type) {
        case CREATE_NEW_FOLDER_PROMPT:
            {
                return true
            }
        default:
            return flag
    }
}




const {
    combineReducers
} = require("redux")
module.exports = combineReducers({
    leftMenuOneDisplay,
    leftMenuTwo,
    tree,
    currentDirId,
    showMask
})
