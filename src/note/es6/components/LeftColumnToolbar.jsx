import React from "react"
import axios from "axios"
import styles from "../../sass/LeftColumnToolbar.scss"
import { connect } from 'react-redux'
import {
    show_left_menu_one,
    create_new_folder_prompt,
    create_new_file_start,
    create_new_file_failure,
    create_new_file_success
} from "../actions"
import {updateFile,inEditingNameState} from "./utility"
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
                    onClick={props.createNewFilePrompt}>新建笔记</li>
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
            dispatch(show_left_menu_one())
        })
    },
    createNewFolderPrompt: () => {
        dispatch((dispatch, getState) => {
            let currentDirId = getState().currentDirId
            dispatch(create_new_folder_prompt(currentDirId))
        })
    },
    createNewFilePrompt: () => {
        dispatch((dispatch, getState) => {
            let state = getState()
            let centerColumnDir = state.centerColumnDir
            updateFile(dispatch)
            dispatch(create_new_file_start(centerColumnDir))
            let name = state.tree[centerColumnDir].files.filter(file => file._id == "tempId")[0].name
            axios.post("note/create-file/", {
                name,
                dirId: centerColumnDir
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'X-Requested-With': 'axios'
                    },
                    timeout: 1000, // default is `0` (no timeout),
                    responseType: 'json' // default
                }).then(res => {
                    let { success, newFileId, name, time } = res.data
                    if (success == "ok") {
                        dispatch(create_new_file_success(centerColumnDir, newFileId, name, time))
                    } else {
                        dispatch(create_new_file_failure())
                    }
                }).catch(err => {
                    console.log('err', err);
                    dispatch(create_new_file_failure())
                })
        })
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnToolbar)