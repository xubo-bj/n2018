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
export const CREATE_NEW_FOLDER_CONFIRM = "CREATE_NEW_FOLDER_CONFIRM"
export const CREATE_NEW_FOLDER_SUCCESS = "CREATE_NEW_FOLDER_SUCCESS"
export const CREATE_NEW_FOLDER_FAILURE= "CREATE_NEW_FOLDER_FAILURE"