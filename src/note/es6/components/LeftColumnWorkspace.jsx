import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/LeftColumnWorkspace.scss"
import {
    create_new_folder_prompt,
    create_new_folder_submit,
    create_new_folder_success,
    create_new_folder_failure,
    toggle_left_menu_one,
    toggle_left_menu_two
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
        let { _id, tree } = this.props
        let targetDir = tree.find(doc => doc._id === _id)
        if (targetDir == null) {
            return null
        }

        if (targetDir.folded) {
            return null
        } else if (targetDir.dirs.length === 0) {
            return null
        } else {
            return (
                <ul className={styles.ul}>
                    {targetDir.dirs.map(dir => {
                        if (dir._id) {
                            return (
                                <li key={dir._id} className={styles.li} data-id={dir._id}
                                    style={{ paddingLeft: this.props.level * 20 + "px" }}>
                                    <i className={styles["arrow-closed"]}></i>
                                    <div className={styles.dir}>
                                        <i className={styles["dir-closed"]} />
                                        <span className={styles.dirName}>{dir.name}</span>
                                    </div>
                                    <DirTree tree={tree} _id={dir._id} level={this.props.level + 1}
                                        createNewFolderSumbit={this.props.createNewFolderSumbit} />
                                </li>
                            )
                        } else {
                            return (
                                <li key={"editable"} className={styles.li}
                                    style={{ paddingLeft: this.props.level * 20 + "px" }}>
                                    <i className={styles["arrow-closed"]} />
                                    <div className={styles.dir}>
                                        <i className={styles["dir-closed"]} />
                                        <span className={styles.dirName}
                                            onKeyDown={this.keydown}
                                            ref={elem => this.editableElem = elem}
                                            contentEditable={dir.editable}
                                        >{dir.name}</span>
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
    return (
        <Fragment>
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
                    <li className={styles["menu-option"]}>新建文件</li>
                    <li className={styles["menu-option"]} onClick={props.createNewFolderPrompt}>新建文件夹</li>
                </ul>
            </div>
            <DirTree tree={props.tree} _id={shinelonId} level={1}
                createNewFolderSumbit={props.createNewFolderSumbit} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        leftMenuTwo: state.leftMenuTwo,
        tree: state.tree
    }
}
const mapDispatchToProps = dispatch => ({
    rightClickRootDir: e => {
        e.preventDefault()
        dispatch((dispatch, getState) => {
            // let { leftMenuOneDisplay } = getState()
            // if (leftMenuOneDisplay == "block") {
            //     dispatch(toggle_left_menu_one("none"))
            // }
            dispatch(toggle_left_menu_two("block", e.clientX, e.clientY))
        })
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
                    let { parentId, newId, name, time } = res.data
                    dispatch(create_new_folder_success(parentId, newId, name, time))
                }).catch(err => {
                    console.log('err', err);
                    dispatch(create_new_folder_failure())
                })
        })
    },
    createNewFolderPrompt: () => {
        dispatch((dispatch, getState) => {
            let currentDirId = getState().currentDirId
            dispatch(create_new_folder_prompt(currentDirId))
        })
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnWorkspace)
