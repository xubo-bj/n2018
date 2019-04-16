import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/CenterColumnWorkspace.scss"
import axios from 'axios';
import {
    select_file,
    get_file_success,
    click_folder_in_center_column,
    no_file_in_folder,
    fetch_folders,
    show_center_dir_menu,
    show_center_file_menu,
    delete_file,
} from "../actions"
import { convertFromRaw } from 'draft-js';
const shinelonId = require("../../../../config").note.mongodb.shinelonId


const CenterColumnWorkspace = props => {
    return (
        <div className={styles.workspace}>
            <ul className={styles["ul-dirs"]}
                onClick={props.openFolder}
                onContextMenu={props.showDirMenu}
            >
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
            <ul className={styles["pop-menu"]}
                style={{
                    display: props.centerDirMenu.display,
                    left: props.centerDirMenu.clientX + "px",
                    top: props.centerDirMenu.clientY + "px"
                }} >
                <li className={styles["menu-option"]}>重命名</li>
                <li className={styles["menu-option"]}>移动到</li>
                <li className={styles["menu-option"]}>复制</li>
                <li className={styles["menu-option"]}>删除</li>
            </ul>
            <ul className={styles["ul-files"]}
                onClick={props.selectFile}
                onContextMenu={props.showFileMenu}>
                {props.files && props.files.map(file => {
                    return (
                        <li Key={file._id} className={file._id != props.fileId ? styles["li-file"] : styles["li-file-selected"]} data-id={file._id}>
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
            <ul className={styles["pop-menu"]}
                style={{
                    display: props.centerFileMenu.display,
                    left: props.centerFileMenu.clientX + "px",
                    top: props.centerFileMenu.clientY + "px"
                }} >
                <li className={styles["menu-option"]}>重命名</li>
                <li className={styles["menu-option"]}>移动到</li>
                <li className={styles["menu-option"]}>复制</li>
                <li className={styles["menu-option"]} onClick={props.deleleFile}>删除</li>
            </ul>
        </div>
    )
}
const mapStateToProps = state => {
    let current = state.tree[state.centerColumnDir]
    return {
        dirs: current.dirs.length > 0 ? [...current.dirs] : null,
        files: current.files.length > 0 ? [...current.files] : null,
        fileId: state.fileId,
        centerDirMenu: state.centerDirMenu,
        centerFileMenu: state.centerFileMenu
    }
}

const mapDispatchToProps = dispatch => ({
    selectFile: e => {
        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        let fileId = target.dataset.id
        dispatch((dispatch, getState) => {
            let centerColumnDir = getState().centerColumnDir
            dispatch(select_file(target.dataset.id, centerColumnDir))
            axios.get("note/get-file", {
                params: {
                    fileId
                },
                headers: {
                    'X-Requested-With': 'axios'
                },
                timeout: 1000, // default is `0` (no timeout),
                responseType: 'json' // default
            }).then(res => {
                if (res.data.success == "ok") {
                    dispatch(get_file_success(convertFromRaw(res.data.content)))
                } else {

                }
            }).catch(err => {
                console.log('err1', err);
                // dispatch(create_new_folder_failure())
            })

        })
    },
    openFolder: e => {
        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        let dirId = target.dataset.id
        dispatch((dispatch, getState) => {

            let { tree } = getState()
            let files = tree[dirId].files
            if (files.length == 0) {
                dispatch(no_file_in_folder(dirId))
            } else {
                let fileId = tree[dirId].files[0]._id
                dispatch(click_folder_in_center_column(dirId, fileId))
                axios.get("note/get-file", {
                    params: {
                        fileId
                    },
                    headers: {
                        'X-Requested-With': 'axios'
                    },
                    timeout: 1000, // default is `0` (no timeout),
                    responseType: 'json' // default
                }).then(res => {
                    if (res.data.success == "ok") {
                        dispatch(get_file_success(convertFromRaw(res.data.content)))
                    } else {

                    }
                }).catch(err => {
                    console.log('err1', err);
                    // dispatch(create_new_folder_failure())
                })

            }

            let d0 = tree[dirId]
            let arr = []
            for (let i = 0; i < d0.dirs.length; i++) {
                let d1 = tree[d0.dirs[i]._id]
                if (d1 == undefined) {
                    arr.push(d0.dirs[i]._id)
                    continue
                }
                for (let j = 0; j < d1.dirs.length; j++) {
                    let d2 = tree[d1.dirs[j]._id]
                    if (d2 == undefined) {
                        arr.push(d1.dirs[j]._id)
                        continue
                    }
                }
            }
            if (arr.length > 0) {
                axios.get("note/get-folders", {
                    params: {
                        ids: JSON.stringify(arr)
                    },
                    headers: {
                        'X-Requested-With': 'axios'
                    },
                    timeout: 1000, // default is `0` (no timeout),
                    responseType: 'json' // default
                }).then(res => {
                    dispatch(fetch_folders(res.data))
                }).catch(err => {
                    console.log('err', err);
                    // dispatch(create_new_folder_failure())
                })
            }

        })

    },
    showDirMenu: e => {
        e.preventDefault()
        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        dispatch(show_center_dir_menu(e.clientX, e.clientY, target.dataset.id))
    },
    showFileMenu: e => {
        e.preventDefault()
        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        dispatch(show_center_file_menu(e.clientX, e.clientY, target.dataset.id))
    },
    deleleFile: e => {
        dispatch((dispatch, getState) => {
            let { fileIdInProcessing, centerColumnDir } = getState()
            axios.delete("note/delete-file/", {
                params: {
                    dirId: centerColumnDir,
                    fileId: fileIdInProcessing
                },
                headers: {
                    'X-Requested-With': 'axios'
                },
                timeout: 1000, // default is `0` (no timeout),
                responseType: 'json' // default
            }).then(res => {
                console.log("res.data",res.data)

            }).catch(err => {
                console.log('err', err);
                // dispatch(create_new_folder_failure())
            })
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