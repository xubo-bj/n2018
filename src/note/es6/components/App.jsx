import React from "react"
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import { connect } from "react-redux"
import { hide_left_menu_one, hide_left_menu_two, hide_left_menu_three } from "../actions"
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
                leftMenuTwo,
                leftMenuThree
            } = getState()
            if (leftMenuOneDisplay == "block") {
                dispatch(hide_left_menu_one())
                return
            }
            if (leftMenuTwo.display == "block") {
                dispatch(hide_left_menu_two())
                return
            }
            if (leftMenuThree.display == "block") {
                dispatch(hide_left_menu_three())
            }

        })
})
export default connect(null, mapDispatchToProps)(App)