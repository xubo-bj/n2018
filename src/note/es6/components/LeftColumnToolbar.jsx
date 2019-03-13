import React from "react"
import styles from "../../sass/LeftColumnToolbar.scss"
import { connect } from 'react-redux'
import { toggle_left_menu_one,
    toggle_left_menu_two,
    create_new_folder_prompt } from "../actions"
const LeftColumnToolbar = (props) => (
    <div className={styles.container}>
        <div className={styles["pop-btn"]} onClick={props.displayLeftMenuOne}>
            <i className={styles.icon} />
            <span className={styles.text}>新文档</span>
            <i className={styles.arrow} />
        </div>
        <ul className={styles["pop-menu"]} style={{ display: props.leftMenuOneDisplay }}>
            <li className={styles["menu-option"]}>新建文件</li>
            <li className={styles["menu-option"]} onClick={props.createNewFolderPrompt}>新建文件夹</li>
        </ul>
    </div>
)
const mapStateToProps = state => ({
    leftMenuOneDisplay: state.leftMenuOneDisplay
})
const mapDispatchToProps = dispatch => ({
    displayLeftMenuOne: e => {
        e.stopPropagation()
        dispatch((dispatch,getState)=>{
            let { leftMenuTwo } = getState()
            if(leftMenuTwo.display == "block"){
                dispatch(toggle_left_menu_two("none",0,0))
            }
        dispatch(toggle_left_menu_one("block"))
        })
    },
    createNewFolderPrompt:()=>{
        dispatch((dispatch,getState)=>{
            let currentDirId = getState().currentDirId
            dispatch(create_new_folder_prompt(currentDirId))
        })
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnToolbar)
