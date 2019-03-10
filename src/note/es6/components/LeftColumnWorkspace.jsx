import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/LeftColumnWorkspace.scss"
import { create_new_folder_submit ,create_new_folder_success} from "../actions"
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
            let { _id, tree, createNewFolderSumbit } = this.props
            let targetDir = tree.find(doc => doc._id === _id),
                name = (targetDir.dirs.find(dir => dir._id == null)).name
            createNewFolderSumbit(name)
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
                <ul className={styles.list}>
                    {targetDir.dirs.map(dir => {
                        if (dir._id) {
                            return (
                                <li key={dir._id} className={styles.item}>
                                    <i className={styles.dirIcon} />
                                    <span className={styles.dirName}>{dir.name}</span>
                                    <DirTree tree={tree} _id={dir._id}
                                        createNewFolderSumbit={this.props.createNewFolderSumbit} />
                                </li>
                            )
                        } else {
                            return (
                                <li key={"editable"} className={styles.item}>
                                    <i className={styles.dirIcon} />
                                    <span className={styles.dirName}
                                        onKeyDown={this.keydown}
                                        ref={elem => this.editableElem = elem}
                                        contentEditable={dir.editable}
                                    >{dir.name}</span>
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
            <div className={styles["my-dir"]}>
                <i className={styles["my-dir-icon"]} />
                <span className={styles["my-dir-name"]}>我的文件夹</span>
            </div>
            <DirTree tree={props.tree} _id={shinelonId}
                createNewFolderSumbit={props.createNewFolderSumbit} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        tree: state.tree
    }
}
const mapDispatchToProps = dispatch => ({
    createNewFolderSumbit: (name) => {
        dispatch(create_new_folder_submit())
        dispatch((dispatch, getState) => {
            let currentDirId = getState().currentDirId
                fetch("note/create-folder/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        dirId: currentDirId
                    })
                }).then(res => res.json())
                .then(res=> {
                    console.log('res',res);
                    dispatch(create_new_folder_success(res.parentId,res.newId,res.name,res.time))
                })
        })
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnWorkspace)
