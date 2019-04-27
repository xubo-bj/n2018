import {
    update_file_success,
    update_file_failure,
    fetch_folders,
    create_new_folder_submit,
    create_new_folder_success,
    create_new_folder_failure,
    get_file_from_local,
    get_file_success,
    rename_file_confirm,
} from "../actions"
import {convertToRaw} from "draft-js"
import axios from "axios"

export const getFolders = (dispatch, dirId) => {
    dispatch((dispatch, getState) => {
        let {
            tree
        } = getState()
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


export const updateFileInBackground = (dispatch, fileId, dirId, name, content) => {
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
            dispatch(update_file_success(mtime, fileId, dirId, content,name))
        }
    }).catch(err => {
        console.log('err', err);
        dispatch(update_file_failure())
    })
}
export const submitCreateNewFolder = (dispatch) => {
    dispatch(create_new_folder_submit())
    dispatch((dispatch, getState) => {
        let {
            createNewFolder,
            currentDirId
        } = getState()
        let name = createNewFolder.newFolderRef.current.textContent.trim()
        axios.post("note/create-folder/", {
            name,
            dirId: currentDirId
        }, {
            headers: {
                "Content-Type": "application/json",
                'X-Requested-With': 'axios'
            },
            timeout: 1000, // default is `0` (no timeout),
            responseType: 'json' // default
        }).then(res => {
            let {
                parentId,
                newId,
                name,
                time
            } = res.data
            dispatch(create_new_folder_success(parentId, newId, name, time))
        }).catch(err => {
            console.log('err', err);
            dispatch(create_new_folder_failure())
        })
    })
}


export const switchFile = (dispatch, selectedFileId) => {
    dispatch((dispatch, getState) => {
        let {
            filesObj,
            fileId,
            centerColumnDir,
            tree,
            editorState
        } = getState()
        let name = tree[centerColumnDir].files.filter(file => file._id == fileId)[0].name
        let content = convertToRaw(editorState.getCurrentContent())
        if (selectedFileId == fileId) {
            return
        } else {
            if (filesObj[selectedFileId] != undefined) {
                dispatch(get_file_from_local(filesObj[selectedFileId].content, selectedFileId, filesObj[selectedFileId].name))
            } else {
                axios.get("note/get-file", {
                    params: {
                        selectedFileId
                    },
                    headers: {
                        'X-Requested-With': 'axios'
                    },
                    timeout: 1000, // default is `0` (no timeout),
                    responseType: 'json' // default
                }).then(res => {
                    if (res.data.success == "ok") {
                        dispatch(get_file_success(res.data.content, selectedFileId, name))
                    } else {
                        console.log("success no", res.data)
                    }
                }).catch(err => {
                    console.log('err1', err);
                    // dispatch(create_new_folder_failure())
                })
            }
            updateFileInBackground(dispatch, fileId, centerColumnDir, name, content)
        }
    })
}

export const confirmNewFileName = dispatch => {
    dispatch((dispatch, getState) => {
        let {
            renameFileState,
            centerColumnDir,
            fileId
        } = getState(),
            name = renameFileState.fileRef.current.textContent.trim()
        dispatch(rename_file_confirm(centerColumnDir, fileId, name))
    })
}