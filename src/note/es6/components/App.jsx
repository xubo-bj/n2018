import React from "react"
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import { connect } from "react-redux"
import { toggle_left_menu_one } from "../actions"
import styles from "../../sass/App.scss"
const App = ({hideLeftMenuOne}) => (
    <div onClick={hideLeftMenuOne} className={styles.container}>
        <Header />
        <Content />
    </div>
)
const mapDispatchToProps = dispatch => ({
    hideLeftMenuOne: () => dispatch(toggle_left_menu_one("none"))
})
export default connect(null, mapDispatchToProps)(App)