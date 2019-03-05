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

export const CREATE_NEW_FOLDER_PROMPT = "CREATE_NEW_FOLDER_PROMPT"
export const create_new_folder_prompt = (currentDir) => ({
    type: CREATE_NEW_FOLDER_PROMPT,
    currentDir
})
export const CREATE_NEW_FOLDER_CONFIRM = "CREATE_NEW_FOLDER_CONFIRM"
export const CREATE_NEW_FOLDER_SUCCESS = "CREATE_NEW_FOLDER_SUCCESS"
export const CREATE_NEW_FOLDER_FAILURE= "CREATE_NEW_FOLDER_FAILURE"



export const SELECT_DIR = "SELECT_DIR"
export const select_dir = (dir)=>({
    type:SELECT_DIR,
    dir
})