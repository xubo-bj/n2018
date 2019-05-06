import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/CenterColumnWorkspace.scss"
import axios from 'axios';
import {
    rename_folder_prompt,
    get_file_from_local,
    click_folder_in_center_column,
    no_file_in_folder,
    show_center_dir_menu,
    show_center_file_menu,
    delete_file_success,
    rename_file_prompt,
} from "../actions"
import {
    renameFolderConfirm, inEditingNameState, updateFile, deleteFolder,
    getFileFromServer, confirmNewFileName, getFolders, addScrollbar
} from "./utility"

class CenterColumnWorkspace extends React.Component {
    constructor(props) {
        super(props)
        this.confirmName = this.confirmName.bind(this)
    }
    componentDidMount() {
        addScrollbar.initialize(this)
    }
    componentDidUpdate() {
        (function renameFileOrFolder() {
            let fileRef = this.props.renameFileState.fileRef
            let folderRef = this.props.folderNameState.folderRef
            let ref = fileRef || folderRef
            if (ref != null) {
                let s = window.getSelection();
                if (s.rangeCount > 0) s.removeAllRanges()
                let range = document.createRange()
                range.selectNodeContents(ref.current)
                s.addRange(range);
            }
        }.bind(this))();

        (function updateScollbar() {
            let wrapperHeight = this.$wrapper.offsetHeight,
                wrapperScrollHeight = this.$wrapper.scrollHeight,
                wrapperScrollTop = this.$wrapper.scrollTop,
                scrollbarHeight = Math.round(wrapperHeight * wrapperHeight / wrapperScrollHeight)
            this.$scrollbar.style.height = scrollbarHeight + "px"
            this.$scrollbar.style.top = Math.round(wrapperScrollTop * wrapperHeight / wrapperScrollHeight + wrapperScrollTop) + "px"
        }.bind(this))();


    }
    confirmName(e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            let { renameFileState, folderNameState, renameFolderConfirm_2, confirmFileName } = this.props
            if (renameFileState.isEditingFileName) {
                confirmFileName()
            }
            if (folderNameState.isRenamingFolder) {
                renameFolderConfirm_2()
            }
        }
    }
    clickInEditingFolder(e) {
        e.stopPropagation()
    }
    render() {
        let { openFolder, showDirMenu, dirs, centerDirMenu, selectFile,
            renameFileState, renameFolderPrompt, tree, folderNameState,
            deleleFile, renameFile, fileId, showFileMenu,
            files, centerFileMenu, deleteFolder_2,
        } = this.props
        return (
            <div className={styles.workspace}
                ref={elem => this.$wrapper = elem}
            >
                <ul className={styles["ul-dirs"]}
                    onClick={openFolder}
                    onContextMenu={showDirMenu}
                >
                    {dirs && dirs.map(dir => {
                        if (dir.editable) {
                            return null
                        } else {
                            let childDir = tree[dir._id]
                            return (
                                <li Key={dir._id} className={styles["li-dir"]} data-id={dir._id}>
                                    <svg className={styles["dir-icon"]}>
                                        <use xlinkHref="/note/images/centerColumn.svg#folder" transform="scale(0.5)" />
                                    </svg>
                                    {childDir.centerColumnEditable ?
                                        <span className={styles["dir-name"]}
                                            onKeyDown={this.confirmName}
                                            onClick={this.clickInEditingFolder}
                                            ref={folderNameState.folderRef}
                                            contentEditable={true}
                                        >{dir.name}</span>
                                        :
                                        <span className={styles["dir-name"]}>{dir.name}</span>
                                    }
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
                    <li className={styles["menu-option"]} data-desc="rename"
                        onClick={renameFolderPrompt}
                    >重命名</li>
                    <li className={styles["menu-option"]} onClick={deleteFolder_2}>删除</li>
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
                                        onKeyDown={this.confirmName}
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
                    <li className={styles["menu-option"]} onClick={renameFile} data-desc="rename">重命名</li>
                    <li className={styles["menu-option"]} onClick={deleleFile}>删除</li>
                </ul>
                <div className={styles["scrollbar"]}
                    ref={elem => this.$scrollbar = elem}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    let current = state.tree[state.centerColumnDir]
    let { renameFileState, folderNameState } = state
    return {
        dirs: current.dirs.length > 0 ? [...current.dirs] : null,
        files: current.files.length > 0 ? [...current.files] : null,
        fileId: state.fileId,
        centerDirMenu: state.centerDirMenu,
        centerFileMenu: state.centerFileMenu,
        renameFileState,
        tree: state.tree,
        folderNameState
    }
}



const mapDispatchToProps = dispatch => ({
    selectFile: e => {
        dispatch((dispatch, getState) => {
            if (inEditingNameState(getState)) {
                return
            }
            let target = e.target
            while (target.tagName.toLowerCase() != "li") {
                target = target.parentElement
            }
            let selectedFileId = target.dataset.id,
                { fileId, filesObj } = getState()
            if (selectedFileId == fileId) {
                return
            } else {
                updateFile(dispatch)
                if (filesObj[selectedFileId] != undefined) {
                    dispatch(get_file_from_local(filesObj[selectedFileId].content, selectedFileId, filesObj[selectedFileId].name))
                } else {
                    getFileFromServer(dispatch, selectedFileId)
                }
            }

        })
    },
    showFileMenu: e => {
        e.preventDefault()
        dispatch((dispatch, getState) => {
            if (inEditingNameState(getState)) {
                return
            }
            let target = e.target
            while (target.tagName.toLowerCase() != "li") {
                target = target.parentElement
            }
            let selectedFileId = target.dataset.id
            if (document.body.clientHeight - e.clientY > 60) {
                dispatch(show_center_file_menu(e.clientX, e.clientY, selectedFileId))
            } else {
                dispatch(show_center_file_menu(e.clientX, e.clientY - 60, selectedFileId))
            }

            let {
                filesObj,
                fileId,
            } = getState()
            if (selectedFileId == fileId) {
                return
            } else {
                updateFile(dispatch)
                if (filesObj[selectedFileId] != undefined) {
                    dispatch(get_file_from_local(filesObj[selectedFileId].content, selectedFileId, filesObj[selectedFileId].name))
                } else {
                    getFileFromServer(dispatch, selectedFileId)
                }
            }


        })
    },
    openFolder: e => {
        dispatch((dispatch, getState) => {

            if (inEditingNameState(getState)) {
                return
            }

            updateFile(dispatch)

            let target = e.target
            while (target.tagName.toLowerCase() != "li") {
                target = target.parentElement
            }
            let dirId = target.dataset.id

            let { tree, filesObj } = getState()
            let nextFiles = tree[dirId].files
            if (nextFiles.length == 0) {
                dispatch(no_file_in_folder(dirId))
            } else {
                let fileId = nextFiles[0]._id
                dispatch(click_folder_in_center_column(dirId))
                if (filesObj[fileId] != undefined) {
                    dispatch(get_file_from_local(filesObj[fileId].content, fileId, filesObj[fileId].name))
                } else {
                    getFileFromServer(dispatch, fileId)
                }
            }

            getFolders(dispatch, dirId)

        })

    },
    showDirMenu: e => {
        e.preventDefault()
        dispatch((dispatch, getState) => {
            if (inEditingNameState(getState)) {
                return
            }
            let target = e.target
            while (target.tagName.toLowerCase() != "li") {
                target = target.parentElement
            }
            if (document.body.clientHeight - e.clientY > 60) {
                dispatch(show_center_dir_menu(e.clientX, e.clientY, target.dataset.id))
            } else {
                dispatch(show_center_dir_menu(e.clientX, e.clientY - 60, target.dataset.id))
            }
        })
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
    confirmFileName: () => {
        confirmNewFileName(dispatch)
    },
    renameFolderPrompt: e => {
        dispatch((dispatch, getState) => {
            let { currentDirId } = getState()
            dispatch(rename_folder_prompt(currentDirId, "center"))
        })
    },
    renameFolderConfirm_2: () => {
        renameFolderConfirm(dispatch)
    },
    deleteFolder_2: () => {
        deleteFolder(dispatch)
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