import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/LeftColumnWorkspace.scss"
const DirTree = (props) => {

}
const LeftColumnWorkspace = (props) => {
    return (
        <Fragment>
            <div className={styles["my-dir"]}>
                <i className={styles["my-dir-icon"]} />
                <span className={styles["my-dir-name"]}>我的文件夹</span>
            </div>
            {/* <DirTree /> */}
        </Fragment>
    )

}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftColumnWorkspace)
