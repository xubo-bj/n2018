/**
 * pop menu in the toolbar of left-column
 */
export const SHOW_LEFT_MENU_ONE = "SHOW_LEFT_MENU_ONE"
export const show_left_menu_one = () => {
    console.log(SHOW_LEFT_MENU_ONE)
    return {
        type: SHOW_LEFT_MENU_ONE
    }
}
export const HIDE_LEFT_MENU_ONE = "HIDE_LEFT_MENU_ONE"
export const hide_left_menu_one = () => {
    console.log(HIDE_LEFT_MENU_ONE)
    return {
        type: HIDE_LEFT_MENU_ONE
    }
}


export const SHOW_LEFT_MENU_TWO = "SHOW_LEFT_MENU_TWO"
export const show_left_menu_two = (clientX, clientY) => {
    console.log(SHOW_LEFT_MENU_TWO)
    return {
        type: SHOW_LEFT_MENU_TWO,
        clientX,
        clientY
    }
}
export const HIDE_LEFT_MENU_TWO = "HIDE_LEFT_MENU_TWO"
export const hide_left_menu_two = () => {
    console.log(HIDE_LEFT_MENU_TWO)
    return {
        type: HIDE_LEFT_MENU_TWO,
    }
}


export const SHOW_LEFT_MENU_THREE = "SHOW_LEFT_MENU_THREE"
export const show_left_menu_three = (clientX, clientY, _id) => {
    console.log(SHOW_LEFT_MENU_THREE)
    return {
        type: SHOW_LEFT_MENU_THREE,
        clientX,
        clientY,
        _id
    }
}
export const HIDE_LEFT_MENU_THREE = "HIDE_LEFT_MENU_THREE"
export const hide_left_menu_three = () => {
    console.log(HIDE_LEFT_MENU_THREE)
    return {
        type: HIDE_LEFT_MENU_THREE,
    }
}

/**
 * create new folder
 */
export const EDIT_NEW_FOLDER_NAME = "EDIT_NEW_FOLDER_NAME"
export const edit_new_folder_name = (name,currentDirId)=>{
    console.log(EDIT_NEW_FOLDER_NAME)
    return{
        type:EDIT_NEW_FOLDER_NAME,
        name,
        currentDirId
    }
}


export const CREATE_NEW_FOLDER_PROMPT = "CREATE_NEW_FOLDER_PROMPT"
export const create_new_folder_prompt = (currentDirId) => {
    console.log(CREATE_NEW_FOLDER_PROMPT)
    return {
        type: CREATE_NEW_FOLDER_PROMPT,
        currentDirId
    }
}
export const CREATE_NEW_FOLDER_SUBMIT = "CREATE_NEW_FOLDER_SUBMIT"
export const create_new_folder_submit = () => {
    console.log(CREATE_NEW_FOLDER_SUBMIT)
    return {
        type: CREATE_NEW_FOLDER_SUBMIT
    }
}


export const CREATE_NEW_FOLDER_SUCCESS = "CREATE_NEW_FOLDER_SUCCESS"
export const create_new_folder_success = (parentId, newId, name, time) => {
    console.log(CREATE_NEW_FOLDER_SUCCESS)
    return {
        type: CREATE_NEW_FOLDER_SUCCESS,
        parentId,
        newId,
        name,
        time
    }
}
export const CREATE_NEW_FOLDER_FAILURE = "CREATE_NEW_FOLDER_FAILURE"
export const create_new_folder_failure = () => {
    console.log(CREATE_NEW_FILE_FAILURE)
    return {
        type: CREATE_NEW_FOLDER_FAILURE
    }
}



export const SELECT_DIR = "SELECT_DIR"
export const select_dir = (dirId, fileId) => {
    console.log(SELECT_DIR)
    return {
        type: SELECT_DIR,
        dirId,
        fileId
    }
}

export const TOGGLE_DIR = "TOGGLE_DIR"
export const toggle_dir = _id => {
    console.log(TOGGLE_DIR)
    return {
        type: TOGGLE_DIR,
        _id
    }
}

export const FETCH_FOLDERS = "FETCH_FOLDERS"
export const fetch_folders = folders => {
    console.log(FETCH_FOLDERS)
    return {
        type: FETCH_FOLDERS,
        folders
    }
}

export const CHANGE_EDITOR_STATE = "CHANGE_EDITOR_STATE"
export const change_editor_state = state => {
    console.log(CHANGE_EDITOR_STATE)
    return {
        type: CHANGE_EDITOR_STATE,
        state
    }
}


export const CHANGE_FILE_NAME = "CHANGE_FILE_NAME"
export const change_file_name = (name, fileId, centerColumnDir) => {
    console.log(CHANGE_FILE_NAME)
    return {
        type: CHANGE_FILE_NAME,
        name,
        fileId,
        centerColumnDir
    }
}



export const CREATE_NEW_FILE_START = "CREATE_NEW_FILE_START"
export const create_new_file_start = (currentDirId) => {
    console.log(CREATE_NEW_FILE_START)
    return {
        type: CREATE_NEW_FILE_START,
        currentDirId
    }
}
export const CREATE_NEW_FILE_SUBMIT = "CREATE_NEW_FILE_SUBMIT"
export const create_new_file_submit = () => {
    console.log(CREATE_NEW_FILE_SUBMIT)
    return {
        type: CREATE_NEW_FILE_SUBMIT
    }
}


export const CREATE_NEW_FILE_SUCCESS = "CREATE_NEW_FILE_SUCCESS"
export const create_new_file_success = (parentDirId, newFileId, name, time) => {
    console.log(CREATE_NEW_FILE_SUCCESS)
    return {
        type: CREATE_NEW_FILE_SUCCESS,
        parentDirId,
        newFileId,
        name,
        time
    }
}
export const CREATE_NEW_FILE_FAILURE = "CREATE_NEW_FILE_FAILURE"
export const create_new_file_failure = () => {
    console.log(CREATE_NEW_FILE_FAILURE)
    return {
        type: CREATE_NEW_FILE_FAILURE
    }
}


export const UPDATE_FILE_SUCCESS = "UPDATE_FILE_SUCCESS"
export const update_file_success = (mtime, fileId, dirId,rawContentState,name) => {
    console.log(UPDATE_FILE_SUCCESS)
    return {
        type: UPDATE_FILE_SUCCESS,
        mtime,
        fileId,
         dirId,
        rawContentState,
        name
    }
}

export const UPDATE_FILE_FAILURE = "UPDATE_FILE_FAILURE"
export const update_file_failure = () => {
    console.log(UPDATE_FILE_FAILURE)
    return {
        type: UPDATE_FILE_FAILURE
    }
}


export const SELECT_FILE = "SELECT_FILE"
export const select_file = (fileId) => {
    console.log(SELECT_FILE)
    return {
        type: SELECT_FILE,
        fileId,
    }
}

export const GET_FILE_SUCCESS = "GET_FILE_SUCCESS"
export const get_file_success = (content,fileId,name) => {
    console.log(GET_FILE_SUCCESS)
    return {
        type: GET_FILE_SUCCESS,
        content,
        fileId,
        name
    }
}

export const GET_FILE_FROM_LOCAL = "GET_FILE_FROM_LOCAL"
export const get_file_from_local = (content,fileId,name)=>{
    console.log(GET_FILE_FROM_LOCAL)
    return{
        type:GET_FILE_FROM_LOCAL,
        name,
        content,
        fileId
    }
}


export const NO_FILE_IN_FOLDER = "NO_FILE_IN_FOLDER"
export const no_file_in_folder = (dirId) => {
    console.log(NO_FILE_IN_FOLDER)
    return {
        type: NO_FILE_IN_FOLDER,
        dirId
    }
}

export const CLICK_FOLDER_IN_CENTER_COLUMN = "CLICK_FOLDER_IN_CENTER_COLUMN"
export const click_folder_in_center_column = (dirId) => {
    console.log(CLICK_FOLDER_IN_CENTER_COLUMN)
    return {
        type: CLICK_FOLDER_IN_CENTER_COLUMN,
        dirId,
    }
}

export const SHOW_CENTER_DIR_MENU = "SHOW_CENTER_DIR_MENU"
export const show_center_dir_menu = (clientX, clientY, dirId) => {
    console.log(SHOW_CENTER_DIR_MENU)
    return {
        type: SHOW_CENTER_DIR_MENU,
        clientX,
        clientY,
        dirId
    }
}

export const HIDE_CENTER_DIR_MENU = "HIDE_CENTER_DIR_MENU"
export const hide_center_dir_menu = () => {
    console.log(HIDE_CENTER_DIR_MENU)
    return {
        type: HIDE_CENTER_DIR_MENU,
    }
}

export const SHOW_CENTER_FILE_MENU = "SHOW_CENTER_FILE_MENU"
export const show_center_file_menu = (clientX, clientY, fileId) => {
    console.log(SHOW_CENTER_FILE_MENU)
    return {
        type: SHOW_CENTER_FILE_MENU,
        clientX,
        clientY,
        fileId
    }
}

export const HIDE_CENTER_FILE_MENU = "HIDE_CENTER_FILE_MENU"
export const hide_center_file_menu = () => {
    console.log(HIDE_CENTER_FILE_MENU)
    return {
        type: HIDE_CENTER_FILE_MENU,
    }
}

export const RETURN_TO_PARENT_FOLDER = "RETURN_TO_PARENT_FOLDER"
export const return_to_parent_folder =(parentDirId,fileId,rawContentState)=>{
    console.log(RETURN_TO_PARENT_FOLDER)
    return{
        type:RETURN_TO_PARENT_FOLDER,
        parentDirId,
        fileId,
        rawContentState
    }
}

export const DELETE_FILE_SUCCESS = "DELETE_FILE_SUCCESS"
export const delete_file_success = (dirId,fileId,newDisplayFileId,rawContentState)=>{
    console.log(DELETE_FILE_SUCCESS)
    return{
        type:DELETE_FILE_SUCCESS,
        dirId,
        fileId,
        newDisplayFileId,
        rawContentState
    }
}

export const RENAME_FILE_PROMPT = "RENAME_FILE_PROMPT"
export const rename_file_prompt = (dirId,fileId)=>{
    console.log(RENAME_FILE_PROMPT)
    return{
        type:RENAME_FILE_PROMPT,
        dirId,
        fileId
    }
}

export const RENAME_FILE_CONFIRM = "RENAME_FILE_CONFIRM"
export const rename_file_confirm = (dirId,fileId,name)=>{
    console.log(RENAME_FILE_CONFIRM)
    return{
        type:RENAME_FILE_CONFIRM,
        dirId,
        fileId,
        name
    }
}

export const RENAME_FOLDER_PROMPT = "RENAME_FOLDER_PROMPT"
export const rename_folder_prompt =(dirId)=>{
    console.log(RENAME_FOLDER_PROMPT)
    return{
        type:RENAME_FOLDER_PROMPT,
        dirId
    }
}

export const RENAME_FOLDER_CONFIRM_LOCALLY = "RENAME_FOLDER_CONFIRM_LOCALLY"
export const rename_folder_confirm_locallly = (parentId,renameDirId,name)=>{
    console.log(RENAME_FOLDER_CONFIRM_LOCALLY)
    return{
        type:RENAME_FOLDER_CONFIRM_LOCALLY,
        parentId,
        renameDirId,
        name
    }
}