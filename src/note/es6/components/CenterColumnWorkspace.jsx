import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/CenterColumnWorkspace.scss"
import axios from 'axios';
import {
    get_file_success,
    click_folder_in_center_column,
    no_file_in_folder,
    show_center_dir_menu,
    show_center_file_menu,
    delete_file_success,
} from "../actions"
import { convertToRaw } from 'draft-js';
import { updateFileInBackground, getFolders } from "./utility"
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
        centerFileMenu: state.centerFileMenu,
    }
}

const mapDispatchToProps = dispatch => ({
    selectFile: e => {

        let editingFolderFlag = false
        dispatch((dispatch,getState)=>{
            editingFolderFlag = getState().createNewFolder.isTypingFolderName
        })
        if(editingFolderFlag){
            return
        }


        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        let selectedFileId = target.dataset.id

        dispatch((dispatch, getState) => {
            let { filesObj, fileId, centerColumnDir, tree, editorState } = getState()
            let name = tree[centerColumnDir].files.filter(file => file._id == selectedFileId)[0].name
            let content = convertToRaw(editorState.getCurrentContent())
            if (selectedFileId == fileId) {
                return
            } else {
                if (filesObj[selectedFileId] != undefined) {
                    dispatch(get_file_success(filesObj[selectedFileId], selectedFileId))
                } else {
                    axios.get("note/get-file", {
                        params: {
                            selectedFileId
                        },
                        headers: {
                            'X-Requested-With': 'axios'
                        },
                        timeout: 1000, // default is `0` (no timeout),
                        responseType: 'json' // default
                    }).then(res => {
                        if (res.data.success == "ok") {
                            dispatch(get_file_success(res.data.content, selectedFileId))
                        } else {
                            console.log("success no", res.data)
                        }
                    }).catch(err => {
                        console.log('err1', err);
                        // dispatch(create_new_folder_failure())
                    })
                }
                updateFileInBackground(dispatch, fileId, centerColumnDir, name, content)
            }
        })
    },
    openFolder: e => {

        let editingFolderFlag = false
        dispatch((dispatch,getState)=>{
            editingFolderFlag = getState().createNewFolder.isTypingFolderName
        })
        if(editingFolderFlag){
            return
        }
        
        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        let dirId = target.dataset.id
        dispatch((dispatch, getState) => {
            let { tree, filesObj, centerColumnDir, fileId, editorState } = getState(),
                currentFiles = [...tree[centerColumnDir].files],
                currentName = null,
                currentContent = null

            if (fileId != null) {
                currentName = currentFiles.filter(file => file._id == fileId)[0].name
                currentContent = convertToRaw(editorState.getCurrentContent())
            }


            let nextFiles = tree[dirId].files
            if (nextFiles.length == 0) {
                dispatch(no_file_in_folder(dirId))
            } else {
                let fileId = tree[dirId].files[0]._id
                dispatch(click_folder_in_center_column(dirId))
                if (filesObj[fileId] != undefined) {
                    dispatch(get_file_success(filesObj[fileId], fileId))
                } else {
                    axios.get("note/get-file", {
                        params: {
                            selectedFileId: fileId
                        },
                        headers: {
                            'X-Requested-With': 'axios'
                        },
                        timeout: 1000, // default is `0` (no timeout),
                        responseType: 'json' // default
                    }).then(res => {
                        if (res.data.success == "ok") {
                            dispatch(get_file_success(res.data.content, fileId))
                        } else {

                        }
                    }).catch(err => {
                        console.log('err1', err);
                        // dispatch(create_new_folder_failure())
                    })
                }
            }

            getFolders(dispatch, dirId)

            if (fileId != null) {
                updateFileInBackground(dispatch, fileId, centerColumnDir, currentName, currentContent)
            }

        })

    },
    showDirMenu: e => {
        e.preventDefault()

        let editingFolderFlag = false
        dispatch((dispatch,getState)=>{
            editingFolderFlag = getState().createNewFolder.isTypingFolderName
        })
        if(editingFolderFlag){
            return
        }

        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        dispatch(show_center_dir_menu(e.clientX, e.clientY, target.dataset.id))
    },
    showFileMenu: e => {
        e.preventDefault()

        let editingFolderFlag = false
        dispatch((dispatch,getState)=>{
            editingFolderFlag = getState().createNewFolder.isTypingFolderName
        })
        if(editingFolderFlag){
            return
        }

        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        dispatch(show_center_file_menu(e.clientX, e.clientY, target.dataset.id))
    },
    deleleFile: e => {
        dispatch((dispatch, getState) => {
            let { fileIdInProcessing, centerColumnDir, tree, fileId } = getState()
            let newDisplayFileId = fileId
            if (fileId == fileIdInProcessing) {
                let files = tree[centerColumnDir].files
                let afterDeleteFiles = files.filter(file => file._id != fileIdInProcessing)
                if (afterDeleteFiles.length != 0) {
                    newDisplayFileId = afterDeleteFiles[0]._id
                } else {
                    newDisplayFileId = null
                }
            }
            axios.delete("note/delete-file/", {
                params: {
                    dirId: centerColumnDir,
                    deletedFileId: fileIdInProcessing,
                    newDisplayFileId
                },
                headers: {
                    'X-Requested-With': 'axios'
                },
                timeout: 1000, // default is `0` (no timeout),
                responseType: 'json' // default
            }).then(res => {
                if (res.data.success === "ok") {
                    dispatch(delete_file_success(centerColumnDir, fileIdInProcessing, newDisplayFileId, res.data.content))
                }
            }).catch(err => {
                console.log('err', err);
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