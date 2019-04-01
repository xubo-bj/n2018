import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/CenterColumnWorkspace.scss"
import {
    create_new_folder_prompt,
    create_new_folder_submit,
    create_new_folder_success,
    create_new_folder_failure,
    show_left_menu_two,
    show_left_menu_three,
    select_dir,
    toggle_dir,
    fetch_folders
} from "../actions"
import axios from 'axios';
const shinelonId = require("../../../../config").note.mongodb.shinelonId

const CenterColumnWorkspace = props =>{

    return(
    <div className={styles.workspace}>
        <ul className={styles["ul-dirs"]}>
        {props.dirs.map(dir=>{
            return(
            <li className={styles["li-dir"]}>
                <svg className={styles["dir-icon"]}>
                    <use xlinkHref="/note/images/centerColumn.svg#folder" transform="scale(0.5)" />
                </svg>
                <span className={styles["dir-name"]}>{dir.name}</span>
                <span className={styles["dir-mtime"]}>2019-02-22</span>
            </li>
            )
        })


            // <li className={styles["li-dir"]}>
            //     <svg className={styles["dir-icon"]}>
            //         <use xlinkHref="/note/images/centerColumn.svg#folder" transform="scale(0.5)" />
            //     </svg>
            //     <span className={styles["dir-name"]}>星辰大海我们是共产主义接班人星辰大海我们是共产主义接班人</span>
            //     <span className={styles["dir-mtime"]}>2019-02-22</span>
            // </li>
        }
        </ul>
        <ul className={styles["ul-files"]}>
            <li className={styles["li-file"]}>
                <svg className={styles["file-icon"]}>
                    <use xlinkHref="/note/images/centerColumn.svg#file" transform="scale(0.5)" />
                </svg>
                <span className={styles["file-name"]}>星辰大海我们是共产主义接班人星辰大海我们是共产主义接班人</span>
                <span className={styles["file-mtime"]}>2019-02-22</span>

            </li>
        </ul>
    </div>
    )
}
const mapStateToProps = state => {
    let current = state.tree[state.currentDirId]
    return {
        dirs: current.dirs,
        files: current.files
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CenterColumnWorkspace)