import React from "react"
import styles from "../../sass/CenterColumnToolbar.scss"
import { connect } from 'react-redux'
import { return_to_parent_folder } from "../actions"
import axios from "axios"
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
            let { tree, filesObj, centerColumnDir } = getState(),
                parentDirId = tree[centerColumnDir].parentId
            if (parentDirId == null) {
                return
            }
            let files = tree[parentDirId].files
            if (files.length == 0) {
                dispatch(return_to_parent_folder(parentDirId, null, null))
            } else {
                let fileId = files[0]._id
                if (filesObj[fileId] != undefined) {
                    dispatch(return_to_parent_folder(parentDirId, fileId, filesObj[fileId]))
                } else {
                    dispatch(return_to_parent_folder(parentDirId, fileId, filesObj[fileId]))
                    axios.get("note/get-file", {
                        params: {
                            fileId
                        },
                        headers: {
                            'X-Requested-With': 'axios'
                        },
                        timeout: 1000, // default is `0` (no timeout),
                        responseType: 'json' // default
                    }).then(res => {
                        if (res.data.success == "ok") {
                            dispatch(return_to_parent_folder(parentDirId, fileId, res.data.content))
                        } else {

                        }
                    }).catch(err => {
                        console.log('err1', err);
                        // dispatch(create_new_folder_failure())
                    })
                }
            }
        })
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CenterColumnToolbar)