import {
    rename_folder_confirm_locallly,
    update_file_success,
    update_file_failure,
    fetch_folders,
    create_new_folder_submit,
    create_new_folder_success,
    create_new_folder_failure,
    get_file_success,
    rename_file_confirm,
} from "../actions"
import {convertToRaw} from "draft-js"
import axios from "axios"
import {isEqual} from "lodash"

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

export const updateFile = (dispatch) => {
        dispatch((dispatch, getState) => {
        let {
            tree,
            filesObj,
            centerColumnDir,
            fileId: currentFileId,
            editorState
        } = getState(),
            currentFiles = [...tree[centerColumnDir].files]
        if (currentFileId != null) {
            let currentName = currentFiles.filter(file => file._id == currentFileId)[0].name,
                currentContent = convertToRaw(editorState.getCurrentContent()),
                contentIsSame = isEqual(currentContent, filesObj[currentFileId] && filesObj[currentFileId].content),
                nameIsSame = !!filesObj[currentFileId] && (filesObj[currentFileId].name.trim() === currentName.trim())
            if (!contentIsSame || !nameIsSame) {
                updateFileInBackground(dispatch, currentFileId, centerColumnDir, currentName.trim(), currentContent)
            }
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
            folderNameState,
            currentDirId
        } = getState()
        let name = folderNameState.folderRef.current.textContent.trim()
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

export const getFileFromServer = (dispatch,selectedFileId) => {
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
            dispatch(get_file_success(res.data.content, selectedFileId, res.data.name))
        } else {

        }
    }).catch(err => {
        console.log('err1', err);
        // dispatch(create_new_folder_failure())
    })
}

export const inEditingNameState = getState => {
    let {
        folderNameState,
        renameFileState
    } = getState()
    if (folderNameState.isTypingFolderName || renameFileState.isEditingFileName ||folderNameState.isRenamingFolder) {
        return true
    } else {
        return false
    }
}

export const renameFolderConfirm = dispatch => {
        dispatch((dispatch, getState) => {
        let {
            currentDirId,
            tree,
            folderNameState
        } = getState(),
            parentId = tree[currentDirId].parentId,
            name = folderNameState.folderRef.current.textContent.trim()
        dispatch(rename_folder_confirm_locallly(parentId, currentDirId, name))
    axios.put("note/update-folder", {
        name,
        parentId,
        currentDirId,
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

        }
    }).catch(err => {
        console.log('err', err);
        dispatch(update_file_failure())
    })
    })
}