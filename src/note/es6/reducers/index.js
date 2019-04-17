import {
    EditorState,
    convertFromRaw
} from 'draft-js';
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
    UPDATE_FILE_SUCCESS,
    UPDATE_FILE_FAILURE,
    GET_FILE_SUCCESS,
    NO_FILE_IN_FOLDER,
    CLICK_FOLDER_IN_CENTER_COLUMN,
    SHOW_CENTER_DIR_MENU,
    HIDE_CENTER_DIR_MENU,
    SHOW_CENTER_FILE_MENU,
    HIDE_CENTER_FILE_MENU,
    RETURN_TO_PARENT_FOLDER,
    DELETE_FILE_SUCCESS,

} = require("../actions")

const leftMenuOneDisplay = (display = "none", action) => {
    switch (action.type) {
        case SHOW_LEFT_MENU_ONE:
            return "block"
        case HIDE_LEFT_MENU_ONE:
        case SHOW_LEFT_MENU_TWO:
        case SHOW_LEFT_MENU_THREE:
        case SHOW_CENTER_DIR_MENU:
        case SHOW_CENTER_FILE_MENU:
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
        case SHOW_CENTER_DIR_MENU:
        case SHOW_CENTER_FILE_MENU:
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
        case SHOW_CENTER_DIR_MENU:
        case SHOW_CENTER_FILE_MENU:
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
        case CLICK_FOLDER_IN_CENTER_COLUMN:
        case NO_FILE_IN_FOLDER:
        case SHOW_CENTER_DIR_MENU:
            return action.dirId
        case SHOW_LEFT_MENU_THREE:
            return action._id
        case SHOW_LEFT_MENU_TWO:
            return shinelonId
        case CREATE_NEW_FOLDER_SUCCESS:
            {
                return action.newId
            }
        case RETURN_TO_PARENT_FOLDER:
            {
                return action.parentDirId == null ? shinelonId : action.parentDirId
            }
        default:
            return _id
    }
}

const centerColumnDir = (_id = shinelonId, action) => {
    switch (action.type) {
        case SELECT_DIR:
        case CLICK_FOLDER_IN_CENTER_COLUMN:
        case NO_FILE_IN_FOLDER:
            return action.dirId
        case CREATE_NEW_FOLDER_SUCCESS:
            {
                return action.newId
            }
        case CREATE_NEW_FILE_START:
            {
                return action.currentDirId
            }
        case RETURN_TO_PARENT_FOLDER:
            {
                // return action.parentDirId == null ? shinelonId : action.parentDirId
                return action.parentDirId
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
        case CREATE_NEW_FOLDER_PROMPT:
            {
                let _id = action.currentDirId
                let targetDir = treeObj[_id]
                targetDir.folded = false
                targetDir.dirs.push({
                    editable: true,
                    name: "新建文件夹"
                })
                return Object.assign({}, treeObj)
            }
        case CHANGE_FILE_NAME:
            {
                let {
                    name,
                    fileId,
                    centerColumnDir
                } = action
                let targetFile = treeObj[centerColumnDir].files.filter(file => file._id == fileId)[0]
                targetFile.name = name
                return Object.assign({}, treeObj)
            }
        case CREATE_NEW_FILE_START:
            {
                let _id = action.currentDirId
                let targetDir = treeObj[_id]
                targetDir.files.push({
                    _id: "tempId",
                    name: "无标题笔记",
                    ctime: new Date(),
                    mtime: new Date()
                })
                return Object.assign({}, treeObj)
            }
        case CREATE_NEW_FILE_SUCCESS:
            {
                let targetDir = treeObj[action.parentDirId]
                let targetFile = targetDir.files.filter(file => file._id == "tempId")[0]
                targetFile._id = action.newFileId,
                targetFile.name = action.name
                return Object.assign({}, treeObj)
            }
        case UPDATE_FILE_SUCCESS:
            {
                let targetDir = treeObj[action.centerColumnDir]
                let targetFile = targetDir.files.filter(file => file._id == action.fileId)[0]
                targetFile.mtime = action.mtime
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
        case NO_FILE_IN_FOLDER:
        case CLICK_FOLDER_IN_CENTER_COLUMN:
            {
                let targetDir = treeObj[action.dirId]
                targetDir.folded = false
                if (targetDir.parentId != null) {
                    treeObj[targetDir.parentId].folded = false
                }
                return Object.assign({}, treeObj)
            }
        case DELETE_FILE_SUCCESS:
            {
                let files = treeObj[action.dirId].files
                let filteredFiles = files.filter(elem => elem._id != action.fileId)
                treeObj[action.dirId].files = filteredFiles
                return Object.assign({}, treeObj)
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
        case GET_FILE_SUCCESS:
            {
                return EditorState.createWithContent(convertFromRaw(action.content))
            }
        case CREATE_NEW_FILE_SUCCESS:
            {
                return EditorState.createEmpty()
            }
        case DELETE_FILE_SUCCESS:
        case RETURN_TO_PARENT_FOLDER:
            {
                let rawContentState = action.rawContentState
                if (rawContentState == null) {
                    return null 
                } else {
                    return EditorState.createWithContent(convertFromRaw(rawContentState))
                }
            }
        default:
            {
                // console.log("default ---")
                // return EditorState.createWithContent(convertFromRaw(state))
                return state
            }
    }
}

const fileId = (id = null, action) => {
    switch (action.type) {
        case CREATE_NEW_FILE_START:
            {
                return "tempId"
            }
        case CREATE_NEW_FILE_SUCCESS:
            {
                return action.newFileId
            }
        case GET_FILE_SUCCESS:
        case SELECT_DIR:
        case RETURN_TO_PARENT_FOLDER:
            {
                return action.fileId
            }
        case NO_FILE_IN_FOLDER:
        case CREATE_NEW_FOLDER_SUCCESS: {
                return null
        }
        case DELETE_FILE_SUCCESS: {
            return action.newDisplayFileId
        }
        default:
        return id
    }
}

const centerFileMenu = (state = {
    display: "none",
    clientX: 0,
    clientY: 0
}, action) => {
    switch (action.type) {
        case SHOW_CENTER_FILE_MENU:
            {
                return {
                    display: "block",
                    clientX: action.clientX,
                    clientY: action.clientY,
                }
            }
        case HIDE_CENTER_FILE_MENU:
        case SHOW_LEFT_MENU_ONE:
        case SHOW_LEFT_MENU_TWO:
        case SHOW_LEFT_MENU_THREE:
        case SHOW_CENTER_DIR_MENU:
            return {
                display: "none",
                clientX: state.clientX,
                clientY: state.clientY
            }
        default:
            return state
    }
}

const centerDirMenu = (state = {
    display: "none",
    clientX: 0,
    clientY: 0
}, action) => {
    switch (action.type) {
        case SHOW_CENTER_DIR_MENU:
            {
                return {
                    display: "block",
                    clientX: action.clientX,
                    clientY: action.clientY,
                }
            }
        case HIDE_CENTER_DIR_MENU:
        case SHOW_LEFT_MENU_ONE:
        case SHOW_LEFT_MENU_TWO:
        case SHOW_LEFT_MENU_THREE:
        case SHOW_CENTER_FILE_MENU:
            return {
                display: "none",
                clientX: state.clientX,
                clientY: state.clientY
            }
        default:
            return state
    }
}

const fileIdInProcessing = (fileId = null, action) => {
    switch (action.type) {
        case SHOW_CENTER_FILE_MENU:
            {
                return action.fileId
            }
        case DELETE_FILE_SUCCESS:
            {
                return null
            }
        default:
            return fileId
    }
}

const filesObj = (obj = {}, action) => {
    switch (action.type) {
        case UPDATE_FILE_SUCCESS:{
            obj[action.fileId] = action.rawContentState
            return Object.assign({},obj)
        }
        case GET_FILE_SUCCESS:{
            obj[action.fileId] = action.content
            return Object.assign({},obj)
        }
        default:
            return obj
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
    filesObj,
    currentDirId,
    centerColumnDir,
    showMask,
    editorState,
    fileId,
    centerDirMenu,
    centerFileMenu,
    fileIdInProcessing
})