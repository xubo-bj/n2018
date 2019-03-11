/**
 * pop menu in the toolbar of left-column
 */
export const TOGGLE_LEFT_MENU_ONE = "TOGGLE_LEFT_MENU_ONE"
export const toggle_left_menu_one = display => {
    return {
        type: TOGGLE_LEFT_MENU_ONE,
        display
    }
}


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
export const select_dir = (dirId)=>({
    type:SELECT_DIR,
    dirId
})