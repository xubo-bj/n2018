import React from "react"
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import { connect } from "react-redux"
import { toggle_left_menu_one, toggle_left_menu_two } from "../actions"
import styles from "../../sass/App.scss"
const App = ({ hideLeftMenu }) => (
    <div onClick={hideLeftMenu} className={styles.container}>
        <Header />
        <Content />
    </div>
)
const mapDispatchToProps = dispatch => ({
    hideLeftMenu: () => dispatch(
        (dispatch, getState) => {
            let {
                leftMenuOneDisplay,
                leftMenuTwo
            } = getState()
            if (leftMenuOneDisplay == "block") {
                dispatch(toggle_left_menu_one("none"))
            }
            if (leftMenuTwo.display == "block") {
                dispatch(toggle_left_menu_two("none", 0, 0))
            }
        })
})
export default connect(null, mapDispatchToProps)(App)