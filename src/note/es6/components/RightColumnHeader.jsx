import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/RightColumnHeader.scss"
import { change_file_name, update_file_success, update_file_failure } from "../actions"
import axios from 'axios';
import { convertToRaw} from 'draft-js';

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
        dispatch((dispatch,getState)=>{
            let {fileId,centerColumnDir} = getState()
            dispatch(change_file_name(event.target.value.trim(),fileId,centerColumnDir))
        })
    },
    updateFile: e => {
        dispatch((dispatch, getState) => {
            let state = getState()
            console.log("state",state)
            let content  = convertToRaw(state.editorState.getCurrentContent())

            axios.put("note/update-file", {
                name:state.tree[state.centerColumnDir].files.filter(file=>file._id == state.fileId)[0].name,
                content,
                fileId: state.fileId,
                dirId:state.centerColumnDir
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
                    let {success,mtime} = res.data
                    if(success){
                        dispatch(update_file_success(mtime, state.fileId, state.centerColumnDir,content))
                    }
                }).catch(err => {
                    console.log('err', err);
                    dispatch(update_file_failure())
                })
        })
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(MyEditor)