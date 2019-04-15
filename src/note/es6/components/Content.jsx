import React from "react"
import { connect } from 'react-redux'
import styles from "../../sass/Content.scss"
import LeftColumn from "./LeftColumn.jsx"
import CenterColumn from "./CenterColumn.jsx"
import RightColumn from "./RightColumn.jsx"
import axios from "axios"
import { create_new_file_start, create_new_file_success, create_new_file_failure } from "../actions"

class Content extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        let dragLines = document.querySelectorAll('[data-role="dragLine"]')
        for (let i = 0; i < dragLines.length; i++) {
            let startClientX = null,
                parent = dragLines[i].parentElement,
                width = null,
                flag = false

            let dragMove = e => {
                if (flag) {
                    let diff = e.clientX - startClientX
                    parent.style.width = parseInt(width) + diff + "px"
                }
            }
            dragLines[i].addEventListener("mousedown", e => {
                flag = true
                width = getComputedStyle(parent).getPropertyValue("width")
                startClientX = e.clientX
                document.body.addEventListener("mousemove", dragMove)
            })
            document.body.addEventListener("mouseup", e => {
                if (flag) {
                    flag = false
                    document.body.removeEventListener("mousemove", dragMove)
                }
            })
        }

    }
    render() {
        return (
            <div className={styles.content}>
                <div className={styles["content-left"]}>
                    <LeftColumn />
                    <div className={styles["drag-line"]}
                        data-role="dragLine"
                    ></div>
                </div>
                <div className={styles["content-center"]}>
                    <CenterColumn />
                    <div className={styles["drag-line"]}
                        data-role="dragLine"
                    ></div>
                </div>
                <div className={styles["content-right"]}>
                    <RightColumn />
                    <div className={styles["no-file"]} style={{ display: this.props.fileId == null ? "flex" : "none" }}>
                        <span className={styles["prompt-text"]} >没有找到文件</span>
                        <button className={styles["new-file"]} onClick={this.props.createNewFile}>新建笔记</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    fileId:state.fileId
})

const mapDispatchToProps = dispatch=>({
    createNewFile: () => {
        dispatch((dispatch, getState) => {
            let state = getState()
            let currentDirId = state.currentDirId
            dispatch(create_new_file_start(currentDirId))
            let name = state.tree[currentDirId].files.filter(file => file._id == "tempId")[0].name
            axios.post("note/create-file/", {
                name,
                dirId: currentDirId
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'X-Requested-With': 'axios'
                    },
                    timeout: 1000, // default is `0` (no timeout),
                    responseType: 'json' // default
                }).then(res => {
                    let { success, newFileId, name, time } = res.data
                    if (success == "ok") {
                        dispatch(create_new_file_success(currentDirId, newFileId, name, time))
                    } else {
                        dispatch(create_new_file_failure())
                    }
                }).catch(err => {
                    console.log('err', err);
                    dispatch(create_new_file_failure())
                })
        })
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(Content)