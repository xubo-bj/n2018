import React from "react"
import { connect } from 'react-redux'
import styles from "../../sass/LeftColumnWorkspace.scss"
import {
    rename_folder_prompt,
    create_new_folder_prompt,
    show_left_menu_two,
    show_left_menu_three,
    select_dir,
    toggle_dir,
    create_new_file_start,
    create_new_file_success,
    create_new_file_failure,
    get_file_from_local,
    no_file_in_folder
} from "../actions"
import axios from 'axios';
import {
    getFolders, updateFile, getFileFromServer,
    inEditingNameState, submitCreateNewFolder
} from "./utility"
const shinelonId = require("../../../../config").note.mongodb.shinelonId

class DirTree extends React.Component {
    constructor(props) {
        super(props)
        this.keydown = this.keydown.bind(this)
    }
    componentDidUpdate() {
        if (this.props.newFolderRef != null && this.$isEditingFolderNmae!= null) {
            let s = window.getSelection();
            if (s.rangeCount > 0) s.removeAllRanges();
            let range = document.createRange();
            range.selectNodeContents(this.props.newFolderRef.current);
            s.addRange(range);
        }
    }
    keydown(e) {
        if (e.keyCode == 13) {
console.log("fjsflfsl")
            e.preventDefault()
            let {createNewFolderSubmit,isTypingFolderName,isRenameFolderName} = this.props
            if(isTypingFolderName){
                createNewFolderSubmit()
            }
            if(isRenameFolderName){
console.log("fjsflfsl")
            }
        }
    }
    clickInEditingFolder(e) {
        e.stopPropagation()
    }
    render() {
        let { _id, tree, centerColumnDir, level, createNewFolderSubmit, toggleDir, newFolderRef,
            isTypingFolderName, isRenameFolderName } = this.props
        let targetDir = tree[_id]
        if (targetDir == null) {
            return null
        }
        if (targetDir.folded) {
            return null
        } else if (targetDir.dirs.length === 0) {
            return null
        } else {
            return (
                <ul className={styles.ul}
                    onContextMenu={this.props.rightClickDir || null}
                    onClick={this.props.leftClickDir}
                >
                    {targetDir.dirs.map(dir => {
                        if (!dir.editable) {
                            let childTargetDir = tree[dir._id]
                            return (
                                <li Key={dir._id} className={styles.li} data-id={dir._id}>
                                    <div className={centerColumnDir == dir._id ? styles["li-content-selected"] : styles["li-content"]}
                                        style={{ paddingLeft: level * 20 + "px" }}>
                                        <i className={childTargetDir.dirs.length == 0
                                            ? styles["arrow-hidden"]
                                            : (childTargetDir.folded ? styles["arrow-closed"] : styles["arrow-open"])
                                        }
                                            onClick={childTargetDir.dirs.length > 0
                                                ? e => toggleDir(e, dir._id)
                                                : null
                                            } />
                                        <div className={styles.dir}
                                            ref={childTargetDir.editable ? elem => this.$isEditingFolderNmae = elem : null}>
                                            <i className={childTargetDir.folded ? styles["dir-closed"] : styles["dir-open"]} />

                                            {!childTargetDir.editable ?
                                                <span className={styles.dirName}>{childTargetDir.name}</span>
                                                :
                                                <span className={styles.dirName}
                                                    onKeyDown={this.keydown}
                                                    onClick={this.clickInEditingFolder}
                                                    ref={newFolderRef}
                                                    contentEditable={true}
                                                >{childTargetDir.name}</span>
                                            }

                                        </div>
                                        <i className={styles["arrow-menu"]} data-mark="arrow-menu" />
                                    </div>
                                    <DirTree tree={tree} _id={dir._id} level={level + 1}
                                        createNewFolderSubmit={createNewFolderSubmit}
                                        toggleDir={toggleDir}
                                        centerColumnDir={centerColumnDir}
                                        newFolderRef={newFolderRef}
                                        isTypingFolderName={isTypingFolderName}
                                        isRenameFolderName={isRenameFolderName}
                                    />
                                </li>
                            )
                        } else {
                            return (
                                <li Key={"editable"} className={styles.li} ref={elem => this.$isEditingFolderNmae= elem}>
                                    <div className={styles["li-content"]}
                                        style={{ paddingLeft: level * 20 + "px" }}>
                                        <i className={styles["arrow-hidden"]} />
                                        <div className={styles.dir}>
                                            <i className={styles["dir-closed"]} />
                                            <span className={styles.dirName}
                                                onKeyDown={this.keydown}
                                                onClick={this.clickInEditingFolder}
                                                ref={newFolderRef}
                                                contentEditable={dir.editable}
                                            >{dir.name}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    }
                    )}
                </ul>
            )
        }
    }
}

class LeftColumnWorkspace extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { tree, rightClickDir, createNewFolderSubmit, toggleDir, leftClickDir,
            centerColumnDir, leftMenuTwo, newFolderRef, rightClickRootDir,
            createNewFilePrompt, createNewFolderPromptInRoot, leftMenuThree,
            createNewFolderPrompt,renameFolderPrompt,isTypingFolderName,isRenameFolderName
        } = this.props
        return (
            <div className={styles.workspace}>
                <div data-id={shinelonId}
                    className={centerColumnDir == shinelonId ? styles["my-dir-selected"] : styles["my-dir"]}
                    onContextMenu={rightClickRootDir}
                    onClick={leftClickDir}
                >
                    <i className={styles["my-dir-icon"]} />
                    <span className={styles["my-dir-name"]}>我的文件夹</span>
                </div>
                <ul className={styles["pop-menu"]}
                    style={{
                        display: leftMenuTwo.display,
                        left: leftMenuTwo.clientX + "px",
                        top: leftMenuTwo.clientY + "px"
                    }}>
                    <li className={styles["menu-option"]} onClick={createNewFilePrompt}>新建笔记</li>
                    <li className={styles["menu-option"]} onClick={createNewFolderPromptInRoot}>新建文件夹</li>
                </ul>
                <DirTree tree={tree} _id={shinelonId} level={1} rightClickDir={rightClickDir}
                    createNewFolderSubmit={createNewFolderSubmit} toggleDir={toggleDir}
                    centerColumnDir={centerColumnDir}
                    leftClickDir={leftClickDir}
                    newFolderRef={newFolderRef}
                    isTypingFolderName={isTypingFolderName}
                    isRenameFolderName={isRenameFolderName}
                />
                <ul className={styles["pop-menu"]}
                    style={{
                        display: leftMenuThree.display,
                        left: leftMenuThree.clientX + "px",
                        top: leftMenuThree.clientY + "px"
                    }}>
                    <li className={styles["menu-option"]} onClick={createNewFilePrompt}>新建笔记</li>
                    <li className={styles["menu-option"]} onClick={createNewFolderPrompt}>新建文件夹</li>
                    <li className={styles["menu-option"]} onClick={renameFolderPrompt}>重命名</li>
                    <li className={styles["menu-option"]}>移动到</li>
                    <li className={styles["menu-option"]}>复制</li>
                    <li className={styles["menu-option"]}>删除</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        centerColumnDir: state.centerColumnDir,
        leftMenuTwo: state.leftMenuTwo,
        leftMenuThree: state.leftMenuThree,
        tree: state.tree,
        newFolderRef: state.folderNameState.folderRef,
        isTypingFolderName: state.folderNameState.isTypingFolderName,
        isRenameFolderName: state.folderNameState.isRenameFolderName
    }
}
const mapDispatchToProps = dispatch => ({
    leftClickDir: e => {
        dispatch((dispatch, getState) => {
            if (inEditingNameState(getState)) {
                return
            }
            let target = e.target
            if (target.dataset.mark == "arrow-menu") {
                e.stopPropagation()
                while (target.tagName.toLowerCase() != "li") {
                    target = target.parentElement
                }
                dispatch(show_left_menu_three(e.clientX, e.clientY, target.dataset.id))
            } else {
                while (target.dataset.id == undefined) {
                    target = target.parentElement
                }

                let dirId = target.dataset.id
                if (centerColumnDir == dirId) {
                    return
                }

                updateFile(dispatch)

                let { tree, centerColumnDir, filesObj } = getState()
                let files = tree[dirId].files
                if (files.length == 0) {
                    dispatch(no_file_in_folder(dirId))
                } else {
                    let fileId = tree[dirId].files[0]._id
                    dispatch(select_dir(dirId, fileId))
                    if (filesObj[fileId] != undefined) {
                        dispatch(get_file_from_local(filesObj[fileId].content, fileId, filesObj[fileId].name))
                    } else {
                        getFileFromServer(dispatch, fileId)
                    }
                }

                getFolders(dispatch, dirId)

            }

        })
    },
    rightClickRootDir: e => {
        e.preventDefault()
        dispatch((dispatch, getState) => {
            if (inEditingNameState(getState)) {
                return
            }
            dispatch(show_left_menu_two(e.clientX, e.clientY))
        })
    },
    rightClickDir: e => {
        e.preventDefault()

        dispatch((dispatch, getState) => {
            if (inEditingNameState(getState)) {
                return
            }
        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentElement
        }
        dispatch(show_left_menu_three(e.clientX, e.clientY, target.dataset.id))
        })
    },
    createNewFolderSubmit: () => {
        submitCreateNewFolder(dispatch)
    },
    createNewFolderPromptInRoot: () => {
        dispatch(create_new_folder_prompt(shinelonId))
    },
    createNewFolderPrompt: () => {
        dispatch((dispatch, getState) => {
            let { currentDirId } = getState()
            dispatch(create_new_folder_prompt(currentDirId))
        })
    },
    createNewFilePrompt: () => {
        dispatch((dispatch, getState) => {

            let state = getState()
            let currentDirId = state.currentDirId
            dispatch(create_new_file_start(currentDirId))
            let name = state.tree[currentDirId].files.filter(file => file._id == "tempId")[0].name
            axios.post("note/create-file/", {
                name,
                dirId: currentDirId
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
                        dispatch(create_new_file_success(currentDirId, newFileId, name, time))
                    } else {
                        dispatch(create_new_file_failure())
                    }
                }).catch(err => {
                    console.log('err', err);
                    dispatch(create_new_file_failure())
                })
        })
    },
    toggleDir: (e, _id) => {
        dispatch((dispatch, getState) => {
            if (inEditingNameState(getState)) {
                return
            }
            e.stopPropagation()
            dispatch(toggle_dir(_id))
            getFolders(dispatch, _id)
        })
    },
    renameFolderPrompt:e=>{
        dispatch((dispatch,getState)=>{
            let {currentDirId} = getState()
            dispatch(rename_folder_prompt(currentDirId))
        })

    }
})





export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnWorkspace)