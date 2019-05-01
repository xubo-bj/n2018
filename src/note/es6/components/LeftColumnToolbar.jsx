import React from "react"
import styles from "../../sass/LeftColumnToolbar.scss"
import { connect } from 'react-redux'
import {
    show_left_menu_one,
    create_new_folder_prompt,
} from "../actions"
import {inEditingNameState,createNewFilePrompt} from "./utility"
const LeftColumnToolbar = (props) => (
    <div className={styles.toolbar}>
        <div className={styles.container}>
            <div className={styles["pop-btn"]} onClick={props.displayLeftMenuOne}>
                <i className={styles.icon} />
                <span className={styles.text}>新文档</span>
                <i className={styles.arrow} />
            </div>
            <ul className={styles["pop-menu"]}
                style={{ display: props.leftMenuOneDisplay }}>
                <li className={styles["menu-option"]}
                    onClick={props.createNewFilePrompt_2}>新建笔记</li>
                <li className={styles["menu-option"]}
                    onClick={props.createNewFolderPrompt}>新建文件夹</li>
            </ul>
        </div>
    </div>
)
const mapStateToProps = state => ({
    leftMenuOneDisplay: state.leftMenuOneDisplay
})
const mapDispatchToProps = dispatch => ({
    displayLeftMenuOne: e => {
        dispatch((dispatch, getState) => {
            if (inEditingNameState(getState)) {
                return
            }
            e.stopPropagation()
            let {centerColumnDir} = getState()
            dispatch(show_left_menu_one(centerColumnDir))
        })
    },
    createNewFolderPrompt: () => {
        dispatch((dispatch, getState) => {
            let currentDirId = getState().currentDirId
            dispatch(create_new_folder_prompt(currentDirId))
        })
    },
    createNewFilePrompt_2: () => {
        createNewFilePrompt(dispatch)
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnToolbar)