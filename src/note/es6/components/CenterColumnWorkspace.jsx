import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/CenterColumnWorkspace.scss"
import axios from 'axios';
import {
    get_file_success,
    get_file_from_local,
    click_folder_in_center_column,
    no_file_in_folder,
    show_center_dir_menu,
    show_center_file_menu,
    delete_file_success,
    rename_file_prompt,
} from "../actions"
import { convertToRaw } from 'draft-js';
import { updateFileInBackground,confirmNewFileName, getFolders, switchFile } from "./utility"
const shinelonId = require("../../../../config").note.mongodb.shinelonId

class CenterColumnWorkspace extends React.Component {
    constructor(props){
        super(props)
        this.confirmFileName = this.confirmFileName.bind(this)
    }
    componentDidUpdate() {
        let fileRef = this.props.renameFileState.fileRef
        if (fileRef!= null) {
            let s = window.getSelection();
            if (s.rangeCount > 0) s.removeAllRanges();
            let range = document.createRange();
            range.selectNodeContents(fileRef.current);
            s.addRange(range);
        }
    }
    confirmFileName(e){
        console.log("keydown ------------")
        if (e.keyCode == 13) {
            e.preventDefault()
        this.props.confirmFileName()
        }
    }
    clickInEditingFolder(e){
        e.stopPropagation()
    }
    render() {
        let {openFolder,showDirMenu,dirs,centerDirMenu,selectFile,
            renameFileState,
            deleleFile,renameFile,fileId,showFileMenu,files,centerFileMenu} = this.props
        return (
            <div className={styles.workspace}>
                <ul className={styles["ul-dirs"]}
                    onClick={openFolder}
                    onContextMenu={showDirMenu}
                >
                    {dirs && dirs.map(dir => {
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
                        display: centerDirMenu.display,
                        left: centerDirMenu.clientX + "px",
                        top: centerDirMenu.clientY + "px"
                    }} >
                    <li className={styles["menu-option"]}>重命名</li>
                    <li className={styles["menu-option"]}>移动到</li>
                    <li className={styles["menu-option"]}>复制</li>
                    <li className={styles["menu-option"]}>删除</li>
                </ul>
                <ul className={styles["ul-files"]}
                    onClick={selectFile}
                    onContextMenu={showFileMenu}>
                    {files && files.map(file => {
                        if (file.editable != true) {
                            return (
                                <li Key={file._id} className={file._id != fileId ? styles["li-file"] : styles["li-file-selected"]} data-id={file._id}>
                                    <svg className={styles["file-icon"]}>
                                        <use xlinkHref="/note/images/centerColumn.svg#file" transform="scale(0.5)" />
                                    </svg>
                                    <span className={styles["file-name"]}>{file.name}</span>
                                    <span className={styles["file-mtime"]}>{convertTimeFormat(file.mtime)}</span>
                                </li>
                            )

                        } else {
                            return (
                                <li Key={file._id} className={file._id != fileId ? styles["li-file"] : styles["li-file-selected"]} data-id={file._id}>
                                    <svg className={styles["file-icon"]}>
                                        <use xlinkHref="/note/images/centerColumn.svg#file" transform="scale(0.5)" />
                                    </svg>
                                    <span className={styles["file-name"]}
                                        onClick={this.clickInEditingFolder}
                                        ref={renameFileState.fileRef}
                                        onKeyDown={this.confirmFileName}
                                     contentEditable={true}>{file.name}</span>
                                    <span className={styles["file-mtime"]}>{convertTimeFormat(file.mtime)}</span>
                                </li>
                            )
                        }
                    })
                    }
                </ul>
                <ul className={styles["pop-menu"]}
                    style={{
                        display: centerFileMenu.display,
                        left: centerFileMenu.clientX + "px",
                        top: centerFileMenu.clientY + "px"
                    }} >
                    <li className={styles["menu-option"]} onClick={renameFile}>重命名</li>
                    <li className={styles["menu-option"]}>移动到</li>
                    <li className={styles["menu-option"]}>复制</li>
                    <li className={styles["menu-option"]} onClick={deleleFile}>删除</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let current = state.tree[state.centerColumnDir]
    let {renameFileState} = state
    return {
        dirs: current.dirs.length > 0 ? [...current.dirs] : null,
        files: current.files.length > 0 ? [...current.files] : null,
        fileId: state.fileId,
        centerDirMenu: state.centerDirMenu,
        centerFileMenu: state.centerFileMenu,
        renameFileState
    }
}

const mapDispatchToProps = dispatch => ({
    selectFile: e => {

        let editingFolderFlag = false
        dispatch((dispatch, getState) => {
            editingFolderFlag = getState().createNewFolder.isTypingFolderName
        })
        if (editingFolderFlag) {
            return
        }


        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        switchFile(dispatch, target.dataset.id)
    },
    openFolder: e => {

        let editingFolderFlag = false
        dispatch((dispatch, getState) => {
            editingFolderFlag = getState().createNewFolder.isTypingFolderName
        })
        if (editingFolderFlag) {
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
                let fileId = tree[dirId].files[0]._id,
                    name = tree[dirId].files[0].name
                dispatch(click_folder_in_center_column(dirId))
                if (filesObj[fileId] != undefined) {
                    dispatch(get_file_from_local(filesObj[fileId].content, fileId, filesObj[fileId].name))
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
                            dispatch(get_file_success(res.data.content, fileId, name))
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
        dispatch((dispatch, getState) => {
            editingFolderFlag = getState().createNewFolder.isTypingFolderName
        })
        if (editingFolderFlag) {
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
        dispatch((dispatch, getState) => {
            editingFolderFlag = getState().createNewFolder.isTypingFolderName
        })
        if (editingFolderFlag) {
            return
        }

        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }

        let selectedFileId = target.dataset.id
        dispatch(show_center_file_menu(e.clientX, e.clientY, selectedFileId))
        switchFile(dispatch, selectedFileId)

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
    },
    renameFile: e => {
        dispatch((dispatch, getState) => {
            let { centerColumnDir, fileIdInProcessing } = getState()
            dispatch(rename_file_prompt(centerColumnDir, fileIdInProcessing))
        })
    },
    confirmFileName:()=>{
        confirmNewFileName(dispatch)
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