import React, { Fragment } from "react"
import { Editor, EditorState } from 'draft-js';
import styles from "../../sass/RightColumnHeader.scss"

class MyEditor extends React.Component {

    render() {
        return (
            <div className={styles.header}>
                <input type="text"
                    className={styles["title"]}
                />
                <input type="button" value={"保存"}
                    className={styles["submit-btn"]}
                />
            </div>
        )
    }
}

export default MyEditor