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

export const FETCH_FOLDERS = "ADD_FOLDERS"
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
export const update_file_success = (mtime, fileId, centerColumnDir) => {
    console.log(UPDATE_FILE_SUCCESS)
    return {
        type: UPDATE_FILE_SUCCESS,
        mtime,
        fileId,
        centerColumnDir
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
export const select_file = (fileId, centerColumnDir) => {
    console.log(SELECT_FILE)
    return {
        type: SELECT_FILE,
        fileId,
        centerColumnDir
    }
}

export const GET_FILE_SUCCESS = "GET_FILE_SUCCESS"
export const get_file_success = (content) => {
    console.log(GET_FILE_SUCCESS)
    return {
        type: GET_FILE_SUCCESS,
        content
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
        dirId
    }
}