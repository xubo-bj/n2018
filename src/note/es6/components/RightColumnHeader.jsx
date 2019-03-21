import React,{Fragment} from "react"
import { Editor, EditorState } from 'draft-js';
import styles from "../../sass/RightColumnHeader.scss"

class MyEditor extends React.Component {

    render() {
        return (
            <Fragment>
                <input type="text"
                className={styles["title"]}
                />
                <input type="button" value={"保存"}
                className={styles["submit-btn"]}
                />
            </Fragment>
        )
    }
}

export default MyEditor