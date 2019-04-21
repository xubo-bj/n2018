import { update_file_success,
    update_file_failure,
    fetch_folders
} from "../actions"

import axios from "axios"

export const getFolders = (dispatch, dirId) => {
    dispatch((dispatch, getState) => {
        let { tree } = getState()
        let d0 = tree[dirId]
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
        console.log("4")
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
