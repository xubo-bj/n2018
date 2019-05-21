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
    delete_folder,
    create_new_file_start,
    create_new_file_success,
    create_new_file_failure,
    change_editor_state,
} from "../actions"
import {
    convertToRaw,
    EditorState,
    AtomicBlockUtils,
} from "draft-js"
import axios from "axios"
import {
    isEqual
} from "lodash"

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
            dispatch(update_file_success(mtime, fileId, dirId, content, name))
        }
    }).catch(err => {
        console.log('err', err);
        dispatch(update_file_failure())
    })
}
export const submitCreateNewFolder = (dispatch) => {
    dispatch(create_new_folder_submit())
    updateFile(dispatch)
    dispatch((dispatch, getState) => {
        let {
            folderNameState,
            currentDirId,
            tree
        } = getState()
        let name = folderNameState.folderRef.current.textContent.trim(),
            parentAncestors = tree[currentDirId].ancestors,
            ancestors = [...parentAncestors]

        ancestors.push(currentDirId)

        axios.post("note/create-folder/", {
            name,
            dirId: currentDirId,
            ancestors
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
            dispatch(create_new_folder_success(parentId, newId, name, time, ancestors))
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

export const getFileFromServer = (dispatch, selectedFileId) => {
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
    if (folderNameState.isTypingFolderName || renameFileState.isEditingFileName || folderNameState.isRenamingFolder) {
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
                console.log("mtime :===========", mtime)
            }
        }).catch(err => {
            console.log('err', err);
            dispatch(update_file_failure())
        })
    })
}

function traversalFiles(tree, targetDir, fileIds = []) {
    for (let i = 0; i < targetDir.files.length; i++) {
        fileIds.push(targetDir.files[i]._id)
    }
    for (let i = 0; i < targetDir.dirs.length; i++) {
        let nextDir = tree[targetDir.dirs[i]._id]
        if (nextDir != undefined) {
            traversalFiles(tree, nextDir, fileIds)
        }
    }
    return fileIds
}

export const createNewFilePrompt = dispatch => {
    dispatch((dispatch, getState) => {
        let {
            currentDirId,
            tree
        } = getState(),
            ancestors = tree[currentDirId].ancestors
        updateFile(dispatch)
        dispatch(create_new_file_start(currentDirId))
        let name = tree[currentDirId].files.filter(file => file._id == "tempId")[0].name
        axios.post("note/create-file/", {
            name,
            dirId: currentDirId,
            ancestors
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
                newFileId,
                name,
                time
            } = res.data
            if (success == "ok") {
                dispatch(create_new_file_success(currentDirId, newFileId, name, time, ancestors))
            } else {
                dispatch(create_new_file_failure())
            }
        }).catch(err => {
            console.log('err', err);
            dispatch(create_new_file_failure())
        })
    })
}


export const deleteFolder = dispatch => {
    dispatch((dispatch, getState) => {
        let {
            currentDirId,
            centerColumnDir,
            tree
        } = getState()
        let fileIds = traversalFiles(tree, tree[currentDirId])
        let centerDirAncestors = tree[centerColumnDir].ancestors
        if (centerDirAncestors.indexOf(currentDirId) != -1 || currentDirId == centerColumnDir) {
            centerColumnDir = tree[currentDirId].parentId
        }
        let parentId = tree[currentDirId].parentId
        dispatch(delete_folder(centerColumnDir, currentDirId, parentId, fileIds))
        axios.delete("note/delete-folder/", {
            params: {
                currentDirId,
                parentId
            },
            headers: {
                'X-Requested-With': 'axios'
            },
            timeout: 1000, // default is `0` (no timeout),
            responseType: 'json' // default
        }).then(res => {
            if (res.data.success === "ok") {} else {

            }
        }).catch(err => {
            console.log('err', err);
        })
    })

}

export const uploadImage = (file,dispatch,editorState) => {
    let image = new Image(),
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext('2d'),
        reader = new FileReader() //读取客户端上的文件   
    reader.onload = function () {
        var url = reader.result //读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，   
        image.src = url //reader读取的文件内容是base64,利用这个url就能实现上传前预览图片   
    }
    image.onload = () => {
        let w = image.naturalWidth,
            h = image.naturalHeight;
        canvas.width = w;
        canvas.height = h
        ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h)
        let data = canvas.toDataURL("image/jpeg", 0.3)
        data = data.split(',')[1]
        data = window.atob(data)
        let ia = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
        }
        //canvas.toDataURL 返回的默认格式就是 image/png   
        var blob = new Blob([ia], {
            type: "image/jpeg"
        });

        fetch("/note/upload-image", {
                method: "POST",
                body: blob
            }).then(res => res.text())
            .then(text => {
                if (text !== "failure") {
                    console.log("text  :",text)
                    let str = `http://${window.location.hostname}:3000/note/image/` + text.slice(1,-1)

                    console.log("str ---------",str)
                    const contentState = editorState.getCurrentContent();
                    const contentStateWithEntity = contentState.createEntity(
                        "image",
                        'IMMUTABLE', {
                            src: str
                        }
                    );
                    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                    const newEditorState = EditorState.set(
                        editorState, {
                            currentContent: contentStateWithEntity
                        }
                    );

                    dispatch(change_editor_state(
                        AtomicBlockUtils.insertAtomicBlock(
                            newEditorState,
                            entityKey,
                            ' '
                        )
                    ))
                }
            })
    };
    reader.readAsDataURL(file);
}

export class addScrollbar {
    constructor(component) {
        this.scrollbar = component.$scrollbar
        this.wrapper = component.$wrapper
        this.scrollbarHeight = null
        this.startWrapperScrollTop = null
        this.startClientY = null
        this.wrapperHeight = null
        this.wrapperScrollHeight = null
        this.flag = false
        this.inside = false
        this.dragMoveCenterScrollbar = this.dragMoveCenterScrollbar.bind(this)
        this.init()
    }
    static initialize(component) {
        new addScrollbar(component)
    }

    dragMoveCenterScrollbar(e) {
        if (this.flag) {
            let distance = e.clientY - this.startClientY,
                scrollTop = Math.round(this.startWrapperScrollTop + distance * this.wrapperScrollHeight / this.wrapperHeight)
            if (scrollTop >= 0 && scrollTop + this.wrapperHeight <= this.wrapperScrollHeight) {
                this.wrapper.scrollTop = scrollTop
                this.scrollbar.style.top = Math.round(scrollTop + scrollTop * this.wrapperHeight / this.wrapperScrollHeight) + 'px'
            } else if (scrollTop < 0) {
                this.wrapper.scrollTop = 0
                this.scrollbar.style.top = "0px"
            } else {
                this.wrapper.scrollTop = this.wrapperScrollHeight - this.wrapperHeight
                this.scrollbar.style.top = this.wrapperScrollHeight - this.scrollbarHeight + "px"
            }
        }
    }
    addMouseDownEvent() {
        this.scrollbar.addEventListener("mousedown", e => {
            this.flag = true
            this.startClientY = e.clientY
            // document.body.addEventListener("mousemove", this.dragMoveCenterScrollbar)
        })
    }
    addMouseMoveEvent() {
        document.body.addEventListener("mousemove", this.dragMoveCenterScrollbar)

    }
    addMouseUpEvent() {
        document.body.addEventListener("mouseup", e => {
            if (this.flag) {
                this.flag = false
                // document.body.removeEventListener("mousemove", this.dragMoveCenterScrollbar)
                if (!this.inside) {
                    this.scrollbar.style.display = "none"
                }
            }
        })
    }
    addMouseEnterEvent() {
        this.wrapper.addEventListener("mouseenter", e => {
            this.startWrapperScrollTop = this.wrapper.scrollTop
            this.wrapperHeight = this.wrapper.offsetHeight
            this.wrapperScrollHeight = this.wrapper.scrollHeight
            let barHeight = Math.round(this.wrapperHeight * this.wrapperHeight / this.wrapperScrollHeight)
            this.scrollbarHeight = barHeight
            this.scrollbar.style.height = barHeight + "px"
            if (this.wrapperScrollHeight > this.wrapperHeight) {
                this.scrollbar.style.display = "block"
            }
            this.inside = true
        })

    }
    addMouseLeaveEvent() {
        this.wrapper.addEventListener("mouseleave", e => {
            this.inside = false
            if (!this.flag) {
                this.scrollbar.style.display = "none"
            }
        })
    }
    addWheelEvent() {
        this.wrapper.addEventListener("wheel", function (e) {
            let step = 40,
                distance = e.deltaY > 0 ? step : step * (-1),
                scrollTop = Math.round(this.wrapper.scrollTop + distance * this.wrapperScrollHeight / this.wrapperHeight)
            if (scrollTop >= 0 && scrollTop + this.wrapperHeight <= this.wrapperScrollHeight) {
                this.wrapper.scrollTop = scrollTop
                this.scrollbar.style.top = Math.round(scrollTop + scrollTop * this.wrapperHeight / this.wrapperScrollHeight) + 'px'
            } else if (scrollTop < 0) {
                this.wrapper.scrollTop = 0
                this.scrollbar.style.top = "0px"
            } else {
                this.wrapper.scrollTop = this.wrapperScrollHeight - this.wrapperHeight
                this.scrollbar.style.top = this.wrapperScrollHeight - this.scrollbarHeight + "px"
            }
        }.bind(this))
    }
    initializeValue() {
        let height = this.wrapper.offsetHeight,
            scrollHeight = this.wrapper.scrollHeight,
            barHeight = Math.round(height * height / scrollHeight)
        this.scrollbar.style.height = barHeight + "px"
        document.body.offsetHeight
        this.scrollbarHeight = barHeight
    }
    init() {
        this.initializeValue()
        this.addMouseDownEvent()
        this.addMouseMoveEvent()
        this.addMouseUpEvent()
        this.addMouseEnterEvent()
        this.addMouseLeaveEvent()
        this.addWheelEvent()
    }
}