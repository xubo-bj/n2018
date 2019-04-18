import React from "react"
import styles from "../../sass/CenterColumnToolbar.scss"
import { connect } from 'react-redux'
import { return_to_parent_folder ,
    get_file_success,
} from "../actions"
import axios from "axios"
import {updateFileInBackground} from "./utility"
import {convertToRaw} from "draft-js"


const shinelonId = require("../../../../config").note.mongodb.shinelonId
const CenterColumnToolbar = (props) =>
    <div className={styles.toolbar}>
        <i className={shinelonId == props.centerColumnDir ? styles["return-btn-root"] : styles["return-btn"]}
            onClick={props.returnToParentDir}
        />
        <div className={styles["search-container"]}>
            <i className={styles["search-icon"]} />
            <input type="text" placeholder={"搜索"} className={styles["input-box"]} />
        </div>
        <i className={styles["sort-btn"]} />
    </div>
const mapStateToProps = state => ({
    centerColumnDir: state.centerColumnDir
})
const mapDispatchToProps = dispatch => ({
    returnToParentDir: e => {
        dispatch((dispatch, getState) => {
            let { tree, filesObj, centerColumnDir, fileId: currentFileId, editorState } = getState(),
                parentDirId = tree[centerColumnDir].parentId,
                name = tree[centerColumnDir].files.filter(file => file._id == currentFileId)[0].name,
                content = convertToRaw(editorState.getCurrentContent())


            if (parentDirId == null) {
                return
            }
            let files = tree[parentDirId].files
            if (files.length == 0) {
                dispatch(return_to_parent_folder(parentDirId, null, null))
            } else {
                let nextFileId = files[0]._id
                if (filesObj[nextFileId] != undefined) {
                    dispatch(return_to_parent_folder(parentDirId, nextFileId, filesObj[nextFileId]))
                } else {
                    dispatch(return_to_parent_folder(parentDirId, nextFileId, null))
                    axios.get("note/get-file", {
                        params: {
                            selectedFileId: nextFileId
                        },
                        headers: {
                            'X-Requested-With': 'axios'
                        },
                        timeout: 1000, // default is `0` (no timeout),
                        responseType: 'json' // default
                    }).then(res => {
                        if (res.data.success == "ok") {
                            // dispatch(return_to_parent_folder(parentDirId, fileId, res.data.content))
                            dispatch(get_file_success(res.data.content,nextFileId))
                        } else {

                        }
                    }).catch(err => {
                        console.log('err1', err);
                        // dispatch(create_new_folder_failure())
                    })
                }
            }

            updateFileInBackground(dispatch,currentFileId,centerColumnDir,name,content)

// export const updateFileInBackground = (dispatch,fileId,dirId,name,content)=>{




        })
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CenterColumnToolbar)