import React from "react"
import { connect } from 'react-redux'
import styles from "../../sass/Content.scss"
import LeftColumn from "./LeftColumn.jsx"
import CenterColumn from "./CenterColumn.jsx"
import RightColumn from "./RightColumn.jsx"

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
                        <span className={styles["prompt-text"]}>没有找到文件</span>
                        <button className={styles["new-file"]}>新建笔记</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    fileId:state.fileId
})
export default connect(mapStateToProps)(Content)