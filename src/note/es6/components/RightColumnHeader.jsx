import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/RightColumnHeader.scss"
import { change_file_name } from "../actions"
import { updateFileInBackground } from "./utility"
import { convertToRaw } from "draft-js"
class MyEditor extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <input type="text"
                    className={styles["title"]}
                    value={this.props.fileName}
                    onChange={this.props.onChangeFileName}
                />
                <input type="button" value={"保存"}
                    className={styles["submit-btn"]}
                    onClick={this.props.updateFile}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    let fileName = ""
    if (state.fileId != null) {
        let arr = state.tree[state.centerColumnDir].files.filter(file => file._id == state.fileId)
        if (arr.length == 1) {
            fileName = arr[0].name
        }
    }
    return {
        fileName
    }
}

const mapDispatchToProps = dispatch => ({
    onChangeFileName: event => {
        dispatch((dispatch, getState) => {
            let { fileId, centerColumnDir } = getState()
            dispatch(change_file_name(event.target.value, fileId, centerColumnDir))
        })
    },
    updateFile: () => {
        // dispatch(updateFile)
        dispatch((dispatch, getState) => {
            let { fileId,createNewFolder, centerColumnDir, tree, editorState } = getState()
            if(createNewFolder.isTypingFolderName){
                return
            }
            let name = tree[centerColumnDir].files.filter(file => file._id == fileId)[0].name
            let content = convertToRaw(editorState.getCurrentContent())
            updateFileInBackground(dispatch, fileId, centerColumnDir, name, content)
        })
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(MyEditor)