import {
    update_file_success,
    update_file_failure
} from "../actions"
import {
    convertToRaw
} from "draft-js"

import axios from "axios"
export const updateFile = (dispatch, getState) => {
    let state = getState()
    let content = convertToRaw(state.editorState.getCurrentContent())

    axios.put("note/update-file", {
        name: state.tree[state.centerColumnDir].files.filter(file => file._id == state.fileId)[0].name,
        content,
        fileId: state.fileId,
        dirId: state.centerColumnDir
    }, {
        headers: {
            "Content-Type": "application/json",
            'X-Requested-With': 'axios'
        },
        timeout: 1000, // default is `0` (no timeout),
        responseType: 'json' // default
    }).then(res => {
        console.log('res :', res.data);
        let {
            success,
            mtime
        } = res.data
        if (success) {
            dispatch(update_file_success(mtime, state.fileId, state.centerColumnDir, content))
        }
    }).catch(err => {
        console.log('err', err);
        dispatch(update_file_failure())
    })
}