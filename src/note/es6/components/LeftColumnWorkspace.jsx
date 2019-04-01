import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/LeftColumnWorkspace.scss"
import {
    create_new_folder_prompt,
    create_new_folder_submit,
    create_new_folder_success,
    create_new_folder_failure,
    show_left_menu_two,
    show_left_menu_three,
    select_dir,
    toggle_dir,
    fetch_folders,
    create_new_file_prompt,
    create_new_file_submit,
    create_new_file_success,
    create_new_file_failure
} from "../actions"
import axios from 'axios';
const shinelonId = require("../../../../config").note.mongodb.shinelonId

class DirTree extends React.Component {
    constructor(props) {
        super(props)
        this.keydown = this.keydown.bind(this)
    }
    componentDidUpdate() {
        if (this.editableElem != null) {
            let s = window.getSelection();
            if (s.rangeCount > 0) s.removeAllRanges();
            let range = document.createRange();
            range.selectNodeContents(this.editableElem);
            s.addRange(range);
        }
    }
    keydown(e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            this.props.createNewFolderSumbit(this.editableElem.textContent.trim())
        }
    }
    render() {
        let { _id, tree, centerColumnDir, level, createNewFolderSumbit, toggleDir } = this.props
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
                        if (dir._id) {
                            let childTargetDir = tree[dir._id]
                            return (
                                <li key={dir._id} className={styles.li} data-id={dir._id}>
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
                                        <div className={styles.dir}>
                                            <i className={childTargetDir.folded ? styles["dir-closed"] : styles["dir-open"]} />
                                            <span className={styles.dirName}>{childTargetDir.name}</span>
                                        </div>
                                    </div>
                                    <DirTree tree={tree} _id={dir._id} level={level + 1}
                                        createNewFolderSumbit={createNewFolderSumbit}
                                        toggleDir={toggleDir}
                                        centerColumnDir={centerColumnDir}
                                    />
                                </li>
                            )
                        } else {
                            return (
                                <li key={"editable"} className={styles.li}>
                                    <div className={styles["li-content"]}
                                        style={{ paddingLeft: level * 20 + "px" }}>
                                        <i className={styles["arrow-hidden"]} />
                                        <div className={styles.dir}>
                                            <i className={styles["dir-closed"]} />
                                            <span className={styles.dirName}
                                                onKeyDown={this.keydown}
                                                ref={elem => this.editableElem = elem}
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

const LeftColumnWorkspace = (props) => {
    const { tree, rightClickDir, createNewFolderSumbit, toggleDir, leftClickDir, centerColumnDir } = props
    return (
        <div className={styles.workspace}>
            <div className={styles["my-dir"]} data-id={shinelonId}
                onContextMenu={props.rightClickRootDir}
            >
                <i className={styles["my-dir-icon"]} />
                <span className={styles["my-dir-name"]}>我的文件夹</span>
                <ul className={styles["pop-menu"]}
                    style={{
                        display: props.leftMenuTwo.display,
                        left: props.leftMenuTwo.clientX + "px",
                        top: props.leftMenuTwo.clientY + "px"
                    }}>
                    <li className={styles["menu-option"]} onClick={props.createNewFilePromptInRoot}>新建文件</li>
                    <li className={styles["menu-option"]} onClick={props.createNewFolderPromptInRoot}>新建文件夹</li>
                </ul>
            </div>
            <DirTree tree={tree} _id={shinelonId} level={1} rightClickDir={rightClickDir}
                createNewFolderSumbit={createNewFolderSumbit} toggleDir={toggleDir}
                centerColumnDir={centerColumnDir}
                leftClickDir={leftClickDir} />
            <ul className={styles["pop-menu"]}
                style={{
                    display: props.leftMenuThree.display,
                    left: props.leftMenuThree.clientX + "px",
                    top: props.leftMenuThree.clientY + "px"
                }}>
                <li className={styles["menu-option"]}>新建文件</li>
                <li className={styles["menu-option"]} onClick={props.createNewFolderPrompt}>新建文件夹</li>
                <li className={styles["menu-option"]}>重命名</li>
                <li className={styles["menu-option"]}>移动到</li>
                <li className={styles["menu-option"]}>复制</li>
                <li className={styles["menu-option"]}>删除</li>
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        centerColumnDir: state.centerColumnDir,
        leftMenuTwo: state.leftMenuTwo,
        leftMenuThree: state.leftMenuThree,
        tree: state.tree
    }
}
const mapDispatchToProps = dispatch => ({
    leftClickDir: e => {

        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentNode
        }
        dispatch(select_dir(target.dataset.id))
    },
    rightClickRootDir: e => {
        e.preventDefault()
        dispatch((dispatch, getState) => {
            dispatch(show_left_menu_two(e.clientX, e.clientY))
        })
    },
    rightClickDir: e => {
        e.preventDefault()
        let target = e.target
        while (target.tagName.toLowerCase() != "li") {
            target = target.parentNode
        }
        dispatch(show_left_menu_three(e.clientX, e.clientY, target.dataset.id))
    },
    createNewFolderSumbit: (name) => {
        dispatch(create_new_folder_submit())
        dispatch((dispatch, getState) => {
            let currentDirId = getState().currentDirId
            axios.post("note/create-folder/", {
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
                    console.log('res :', res.data);

                    let { parentId, newId, name, time } = res.data
                    dispatch(create_new_folder_success(parentId, newId, name, time))
                }).catch(err => {
                    console.log('err', err);
                    dispatch(create_new_folder_failure())
                })
        })
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
    createNewFilePromptInRoot: () => {
        dispatch(create_new_file_prompt(shinelonId))
    },
    toggleDir: (e, _id) => {
        e.stopPropagation()
        dispatch(toggle_dir(_id))

        dispatch((dispatch, getState) => {
            let { tree } = getState()
            let d0 = tree[_id]
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
                console.log('fetch-folders');
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
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnWorkspace)