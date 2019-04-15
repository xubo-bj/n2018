import React from "react"
import styles from "../../sass/CenterColumnToolbar.scss"
import { connect } from 'react-redux'
import { return_to_parent_folder } from "../actions"
const shinelonId = require("../../../../config").note.mongodb.shinelonId
const CenterColumnToolbar = (props) =>
    <div className={styles.toolbar}>
        <i className={shinelonId == props.centerColumnDir ? styles["return-btn-root"] : styles["return-btn"]}
            onClick={props.returnToParentDir}
        />
        <div className={styles["search-container"]}>
            <i className={styles["search-icon"]} />
            <input type="text" placeholder={"搜索"} className={styles["input-box"]} />
        </div>
        <i className={styles["sort-btn"]} />
    </div>
const mapStateToProps = state => ({
    centerColumnDir: state.centerColumnDir
})
const mapDispatchToProps = dispatch => ({
    returnToParentDir: e => {
        dispatch((dispatch, getState) => {
            let { tree, centerColumnDir } = getState(),
                parentDirId = tree[centerColumnDir].parentId
            dispatch(return_to_parent_folder(parentDirId))
        })
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CenterColumnToolbar)