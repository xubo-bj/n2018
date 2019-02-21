import React from "react"
import styles from "../../sass/Content.scss"
class Content extends React.Component {
    componentDidMount() {
        let rx = document.querySelectorAll('[data-role="dragLine"]')
        console.log('rx',rx);

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