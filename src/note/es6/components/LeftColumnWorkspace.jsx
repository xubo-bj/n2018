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
    get_file_from_local,
    no_file_in_folder
} from "../actions"
import {
    getFolders, updateFile, getFileFromServer,
    inEditingNameState, submitCreateNewFolder,
    renameFolderConfirm, deleteFolder, createNewFilePrompt,
    addScrollbar
} from "./utility"
const shinelonId = require("../../../../config").note.mongodb.shinelonId

class DirTree extends React.Component {
    constructor(props) {
        super(props)
        this.keydown = this.keydown.bind(this)
    }
    componentDidUpdate() {
        (function renameFolderSelection() {
            if (this.props.newFolderRef != null && this.$isEditingFolderNmae != null) {
                let s = window.getSelection();
                if (s.rangeCount > 0) s.removeAllRanges();
                let range = document.createRange();
                range.selectNodeContents(this.props.newFolderRef.current);
                s.addRange(range);
            }
        }.bind(this))();
    }
    keydown(e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            let { createNewFolderSubmit, isTypingFolderName, isRenamingFolder, renameFolderConfirm_2 } = this.props
            if (isTypingFolderName) {
                createNewFolderSubmit()
            }
            if (isRenamingFolder) {
                renameFolderConfirm_2()
            }
        }
    }
    clickInEditingFolder(e) {
        e.stopPropagation()
    }
    render() {
        let { _id, tree, centerColumnDir, level, createNewFolderSubmit, toggleDir, newFolderRef,
            isTypingFolderName, isRenamingFolder, renameFolderConfirm_2 } = this.props
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
                                            ref={childTargetDir.leftColumnEditable ? elem => this.$isEditingFolderNmae = elem : null}>
                                            <i className={childTargetDir.folded ? styles["dir-closed"] : styles["dir-open"]} />

                                            {!childTargetDir.leftColumnEditable ?
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
                                        isRenamingFolder={isRenamingFolder}
                                        renameFolderConfirm_2={renameFolderConfirm_2}
                                    />
                                </li>
                            )
                        } else {
                            return (
                                <li Key={"editable"} className={styles.li} ref={elem => this.$isEditingFolderNmae = elem}>
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
    componentDidMount(){
        addScrollbar.initialize(this)
    }
    componentDidUpdate(){
            (function updateScollbar() {
                let wrapperHeight = this.$wrapper.offsetHeight,
                    wrapperScrollHeight = this.$wrapper.scrollHeight,
                    wrapperScrollTop = this.$wrapper.scrollTop,
                    scrollbarHeight = Math.round(wrapperHeight * wrapperHeight / wrapperScrollHeight)
                this.$scrollbar.style.height = scrollbarHeight + "px"
                this.$scrollbar.style.top = Math.round(wrapperScrollTop * wrapperHeight / wrapperScrollHeight + wrapperScrollTop) + "px"
                if (wrapperScrollHeight <= wrapperHeight) {
                    this.$scrollbar.style.display = "none"
                }
            }.bind(this))();
    }
    render() {
        const { tree, rightClickDir, createNewFolderSubmit, toggleDir, leftClickDir,
            centerColumnDir, leftMenuTwo, newFolderRef, rightClickRootDir,
            createNewFilePrompt_2, createNewFolderPromptInRoot, leftMenuThree,
            createNewFolderPrompt, renameFolderPrompt, isTypingFolderName, isRenamingFolder,
            renameFolderConfirm_2, deleteFolder_2
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
                    <li className={styles["menu-option"]} onClick={createNewFilePrompt_2}>新建笔记</li>
                    <li className={styles["menu-option"]} onClick={createNewFolderPromptInRoot}>新建文件夹</li>
                </ul>

                <div className={styles["wrapper"]}
                    ref={elem => this.$wrapper = elem}
                >
                    <DirTree tree={tree} _id={shinelonId} level={1} rightClickDir={rightClickDir}
                        createNewFolderSubmit={createNewFolderSubmit} toggleDir={toggleDir}
                        centerColumnDir={centerColumnDir}
                        leftClickDir={leftClickDir}
                        newFolderRef={newFolderRef}
                        isTypingFolderName={isTypingFolderName}
                        isRenamingFolder={isRenamingFolder}
                        renameFolderConfirm_2={renameFolderConfirm_2}
                    />
                    <div className={styles["scrollbar"]}
                        ref={elem => this.$scrollbar = elem}
                    />
                </div>
                <ul className={styles["pop-menu"]}
                    style={{
                        display: leftMenuThree.display,
                        left: leftMenuThree.clientX + "px",
                        top: leftMenuThree.clientY + "px"
                    }}>
                    <li className={styles["menu-option"]} onClick={createNewFilePrompt_2}>新建笔记</li>
                    <li className={styles["menu-option"]} onClick={createNewFolderPrompt}>新建文件夹</li>
                    <li className={styles["menu-option"]} onClick={renameFolderPrompt} data-desc="rename">重命名</li>
                    <li className={styles["menu-option"]} onClick={deleteFolder_2}>删除</li>
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
        isRenamingFolder: state.folderNameState.isRenamingFolder
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
            if (document.body.offsetHeight - e.clientY < 120) {
                dispatch(show_left_menu_three(e.clientX, e.clientY-120, target.dataset.id))
            } else {
                dispatch(show_left_menu_three(e.clientX, e.clientY, target.dataset.id))
            }
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
    createNewFilePrompt_2: () => {
        createNewFilePrompt(dispatch)
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
    renameFolderPrompt: e => {
        dispatch((dispatch, getState) => {
            let { currentDirId } = getState()
            dispatch(rename_folder_prompt(currentDirId, "left"))
        })
    },
    renameFolderConfirm_2: () => {
        renameFolderConfirm(dispatch)
    },
    deleteFolder_2: () => {
        deleteFolder(dispatch)
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnWorkspace)