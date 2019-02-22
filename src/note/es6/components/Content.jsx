import React from "react"
import styles from "../../sass/Content.scss"
import { log } from "util";
class Content extends React.Component {
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
                    <div className={styles["drag-line"]}
                        data-role="dragLine"
                    ></div>
                </div>
                <div className={styles["content-center"]}>
                    <div className={styles["drag-line"]}
                        data-role="dragLine"
                    ></div>
                </div>
                <div className={styles["content-right"]}></div>
            </div>
        )
    }
}
export default Content