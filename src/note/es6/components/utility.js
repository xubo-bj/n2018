import { update_file_success,
    update_file_failure
} from "../actions"

import axios from "axios"

export const updateFileInBackground = (dispatch,fileId,dirId,name,content)=>{
    axios.put("note/update-file", {
        name,
        content,
        fileId,
        dirId
    }, {
        headers: {
            "Content-Type": "application/json",
            'X-Requested-With': 'axios'
        },
        timeout: 1000, // default is `0` (no timeout),
        responseType: 'json' // default
    }).then(res => {
        let {
            success,
            mtime
        } = res.data
        if (success) {
            dispatch(update_file_success(mtime, fileId, dirId, content))
        }
    }).catch(err => {
        console.log('err', err);
        dispatch(update_file_failure())
    })
}
