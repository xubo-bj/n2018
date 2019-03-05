import { combineReducers } from 'redux'
import {
    TOGGLE_LEFT_MENU_ONE
} from "../actions"
const leftMenuOneDisplay= (display= "none", action) => {
    switch (action.type) {
        case TOGGLE_LEFT_MENU_ONE:
            return action.display
        default:
            return display
    }
}
export default combineReducers({
    leftMenuOneDisplay
})
