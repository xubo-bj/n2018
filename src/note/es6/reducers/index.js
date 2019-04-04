import { EditorState } from 'draft-js';
const shinelonId = require("../../../../config").note.mongodb.shinelonId
const {
    SHOW_LEFT_MENU_ONE,
    HIDE_LEFT_MENU_ONE,
    SHOW_LEFT_MENU_TWO,
    HIDE_LEFT_MENU_TWO,
    SHOW_LEFT_MENU_THREE,
    HIDE_LEFT_MENU_THREE,
    SELECT_DIR,
    CREATE_NEW_FOLDER_PROMPT,
    CREATE_NEW_FOLDER_SUBMIT,
    CREATE_NEW_FOLDER_SUCCESS,
    CREATE_NEW_FOLDER_FAILURE,
    TOGGLE_DIR,
    FETCH_FOLDERS,
    CHANGE_EDITOR_STATE,
    CHANGE_FILE_NAME,
    CREATE_NEW_FILE_START,
    CREATE_NEW_FILE_SUBMIT,
    CREATE_NEW_FILE_SUCCESS,
    CREATE_NEW_FILE_FAILURE,
    SELECT_FILE
} = require("../actions")

const leftMenuOneDisplay = (display = "none", action) => {
    switch (action.type) {
        case SHOW_LEFT_MENU_ONE:
            return "block"
        case HIDE_LEFT_MENU_ONE:
        case SHOW_LEFT_MENU_TWO:
        case SHOW_LEFT_MENU_THREE:
            return "none"
        default:
            return display
    }
}
const leftMenuTwo = (r = {
    display: "none",
    clientX: 0,
    clientY: 0
}, action) => {
    switch (action.type) {
        case SHOW_LEFT_MENU_TWO:
            return {
                display: "block",
                clientX: action.clientX,
                clientY: action.clientY
            }
        case HIDE_LEFT_MENU_TWO:
        case SHOW_LEFT_MENU_ONE:
        case SHOW_LEFT_MENU_THREE:
            return {
                display: "none",
                clientX: r.clientX,
                clientY: r.clientY
            }
        default:
            return r
    }
}

const leftMenuThree = (r = {
    display: "none",
    clientX: 0,
    clientY: 0,
}, action) => {
    switch (action.type) {
        case SHOW_LEFT_MENU_THREE:
            return {
                display: "block",
                clientX: action.clientX,
                clientY: action.clientY,
            }
        case HIDE_LEFT_MENU_THREE:
        case SHOW_LEFT_MENU_ONE:
        case SHOW_LEFT_MENU_TWO:
            return {
                display: "none",
                clientX: r.clientX,
                clientY: r.clientY
            }
        default:
            return r
    }
}

const currentDirId = (_id = shinelonId, action) => {
    switch (action.type) {
        case SELECT_DIR:
            return action._id
        case SHOW_LEFT_MENU_THREE:
            return action._id
        case SHOW_LEFT_MENU_TWO:
            return shinelonId
        default:
            return _id
    }
}

const centerColumnDir = (_id = shinelonId, action) => {
    switch (action.type) {
        case SELECT_DIR:
            return action._id
        case CREATE_NEW_FOLDER_SUCCESS: {
            return action.newId
        }
        case CREATE_NEW_FILE_START:{
            return action.currentDirId
        }
        default:
            return _id
    }
}


let defaultV = {
    _id: shinelonId,
    dirs: [],
    docs: [],
    folded: false
}
const tree = (treeObj = {
    [shinelonId]: defaultV
}, action) => {
    switch (action.type) {
        case CREATE_NEW_FOLDER_PROMPT: {
            let _id = action.currentDirId
            let targetDir = treeObj[_id]
            targetDir.folded = false
            targetDir.dirs.push({
                editable: true,
                name: "新建文件夹"
            })
            return Object.assign({}, treeObj)
        }
        case CREATE_NEW_FILE_START: {
            let _id = action.currentDirId
            let targetDir = treeObj[_id]
            targetDir.files.push({
                _id:"tempId",
                name: "无标题笔记",
                ctime:new Date(),
                mtime:new Date()
            })
            return Object.assign({}, treeObj)
        }
        case CREATE_NEW_FILE_SUCCESS:{
            let targetDir = treeObj[action.parentDirId]
            let targetFile= targetDir.files.filter(file=>file._id == "tempId")[0]
            targetFile._id = action.newFileId,
            targetFile.name = action.name
            return Object.assign({}, treeObj)
        }
        case CREATE_NEW_FOLDER_SUCCESS:
            {
                let {
                    parentId,
                    newId,
                    name,
                    time
                } = action
                let newDir = {
                    _id: newId,
                    name: name,
                    ctime: time,
                    mtime: time,
                    folded: true,
                    dirs: [],
                    files: []
                }

                let parentDir = treeObj[parentId]
                let dirs = parentDir.dirs.filter(dir => dir.editable == null)

                dirs.push(newDir)
                parentDir.dirs = dirs

                let newTreeObj = Object.assign({}, treeObj, {
                    [newId]: newDir
                })
                return newTreeObj
            }
        case TOGGLE_DIR:
            {
                let targetDir = treeObj[action._id]
                if (targetDir.folded == true) {
                    targetDir.folded = false
                } else {
                    descendantDirsTraversal(targetDir, treeObj)
                }
                return Object.assign({}, treeObj)
            }
        case FETCH_FOLDERS:
            {
                return Object.assign({}, treeObj, action.folders)
            }
        default:
            return treeObj
    }
}

function descendantDirsTraversal(targetDir, treeArray) {
    targetDir.folded = true
    for (let i = 0; i < targetDir.dirs.length; i++) {
        let childTargetDir = treeArray[targetDir.dirs[i]._id]
        if (childTargetDir != undefined) {
            descendantDirsTraversal(childTargetDir, treeArray)
        }
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

const editorState = (state = null, action) => {
    switch (action.type) {
        case CHANGE_EDITOR_STATE:
            {
                return action.state
            }
        default:
            return state
    }
}

const fileId = (id= null, action) => {
    switch (action.type) {
        case CREATE_NEW_FILE_START:{
            return "tempId"
        }
        case CREATE_NEW_FILE_SUCCESS:{
            return action.newFileId
        }
        case SELECT_FILE:{
            return action.fileId
        }
        default:
            return id
    }
}



const {
    combineReducers
} = require("redux")
module.exports = combineReducers({
    leftMenuOneDisplay,
    leftMenuTwo,
    leftMenuThree,
    tree,
    currentDirId,
    centerColumnDir,
    showMask,
    editorState,
    fileId
})