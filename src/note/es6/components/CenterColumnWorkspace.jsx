import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/CenterColumnWorkspace.scss"
import axios from 'axios';
import {select_file} from "../actions"
const shinelonId = require("../../../../config").note.mongodb.shinelonId

const CenterColumnWorkspace = props => {
    return (
        <div className={styles.workspace}>
            <ul className={styles["ul-dirs"]}>
                {props.dirs && props.dirs.map(dir => {
                    if (dir.editable) {
                        return null
                    } else {
                        return (
                            <li Key={dir._id} className={styles["li-dir"]} data-id={dir._id}>
                                <svg className={styles["dir-icon"]}>
                                    <use xlinkHref="/note/images/centerColumn.svg#folder" transform="scale(0.5)" />
                                </svg>
                                <span className={styles["dir-name"]}>{dir.name}</span>
                                <span className={styles["dir-mtime"]}>{convertTimeFormat(dir.mtime)}</span>
                            </li>
                        )

                    }
                })
                }
            </ul>
            <ul className={styles["ul-files"]}
            onClick={props.selectFile}>
                {props.files && props.files.map(file => {
                    return (
                        <li Key={file._id} className={styles["li-file"]} data-id={file._id}>
                            <svg className={styles["file-icon"]}>
                                <use xlinkHref="/note/images/centerColumn.svg#file" transform="scale(0.5)" />
                            </svg>
                            <span className={styles["file-name"]}>{file.name}</span>
                            <span className={styles["file-mtime"]}>{convertTimeFormat(file.mtime)}</span>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}
const mapStateToProps = state => {
    let current = state.tree[state.centerColumnDir]
    return {
        dirs: current.dirs.length > 0 ? [...current.dirs] : null,
        files: current.files.length > 0 ? [...current.files] : null
    }
}

const mapDispatchToProps = dispatch => ({
    selectFile:e=>{
        let target  = e.target
        while(target.tagName.toLowerCase() != "li"){
            target = target.parentElement
        }
        dispatch((dispatch,getState)=>{
            let centerColumnDir = getState().centerColumnDir
            dispatch(select_file(target.dataset.id))
        })
    }
})
function convertTimeFormat(timeString) {
    let d = new Date(timeString)
    let year = d.getFullYear(),
        month = d.getMonth() + 1,
        date = d.getDate()
    month = month < 10 ? "0" + month : month
    date = date < 10 ? "0" + date : date
    return `${year}-${month}-${date}`
}




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CenterColumnWorkspace)