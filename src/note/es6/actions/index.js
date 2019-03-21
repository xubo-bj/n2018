/**
 * pop menu in the toolbar of left-column
 */
export const SHOW_LEFT_MENU_ONE = "SHOW_LEFT_MENU_ONE"
export const show_left_menu_one = () => {
    return {
        type: SHOW_LEFT_MENU_ONE
    }
}
export const HIDE_LEFT_MENU_ONE = "HIDE_LEFT_MENU_ONE"
export const hide_left_menu_one = () => {
    return {
        type: HIDE_LEFT_MENU_ONE
    }
}


export const SHOW_LEFT_MENU_TWO = "SHOW_LEFT_MENU_TWO"
export const show_left_menu_two = (clientX, clientY) => ({
    type: SHOW_LEFT_MENU_TWO,
    clientX,
    clientY
})
export const HIDE_LEFT_MENU_TWO = "HIDE_LEFT_MENU_TWO"
export const hide_left_menu_two = () => ({
    type: HIDE_LEFT_MENU_TWO,
})


export const SHOW_LEFT_MENU_THREE = "SHOW_LEFT_MENU_THREE"
export const show_left_menu_three= (clientX, clientY,_id) => ({
    type: SHOW_LEFT_MENU_THREE,
    clientX,
    clientY,
    _id
})
export const HIDE_LEFT_MENU_THREE = "HIDE_LEFT_MENU_THREE"
export const hide_left_menu_three= () => ({
    type: HIDE_LEFT_MENU_THREE,
})

/**
 * create new folder
 */
export const CREATE_NEW_FOLDER_PROMPT = "CREATE_NEW_FOLDER_PROMPT"
export const create_new_folder_prompt = (currentDirId) => ({
    type: CREATE_NEW_FOLDER_PROMPT,
    currentDirId
})
export const CREATE_NEW_FOLDER_SUBMIT = "CREATE_NEW_FOLDER_SUBMIT"
export const create_new_folder_submit= () => ({
    type: CREATE_NEW_FOLDER_SUBMIT
})


export const CREATE_NEW_FOLDER_SUCCESS = "CREATE_NEW_FOLDER_SUCCESS"
export const create_new_folder_success= (parentId,newId,name,time) => ({
    type:CREATE_NEW_FOLDER_SUCCESS,
    parentId,
    newId,
    name,
    time
})
export const CREATE_NEW_FOLDER_FAILURE= "CREATE_NEW_FOLDER_FAILURE"
export const create_new_folder_failure = ()=>({
    type:CREATE_NEW_FOLDER_FAILURE
})



export const SELECT_DIR = "SELECT_DIR"
export const select_dir = (_id)=>({
    type:SELECT_DIR,
    _id
})

export const TOGGLE_DIR = "TOGGLE_DIR"
export const toggle_dir = _id=>({
    type:TOGGLE_DIR,
    _id
})

export const FETCH_FOLDERS = "ADD_FOLDERS"
export const fetch_folders = folders=>({
    type:FETCH_FOLDERS,
    folders
})