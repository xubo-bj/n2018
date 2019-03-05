import React from "react"
import styles from "../../sass/LeftColumnToolbar.scss"
import { connect } from 'react-redux'
import { toggle_left_menu_one } from "../actions"
const LeftColumnToolbar = ({ leftMenuOneDisplay, displayLeftMenuOne }) => (
    <div className={styles.container}>
        <div className={styles["pop-btn"]} onClick={displayLeftMenuOne}>
            <i className={styles.icon} />
            <span className={styles.text}>新文档</span>
            <i className={styles.arrow} />
        </div>
        <ul className={styles["pop-menu"]} style={{ display: leftMenuOneDisplay }}>
            <li className={styles["menu-option"]}>新建文件</li>
            <li className={styles["menu-option"]}>新建文件夹</li>
        </ul>
    </div>
)
const mapStateToProps = state => ({
    leftMenuOneDisplay: state.leftMenuOneDisplay
})
const mapDispatchToProps = dispatch => ({
    displayLeftMenuOne: e => {
        e.stopPropagation()
        dispatch(toggle_left_menu_one("block"))
    },

})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnToolbar)
