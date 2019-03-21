import React, { Fragment } from "react"
import styles from "../../sass/RightColumn.scss"
import RightColumnHeader from "./RightColumnHeader.jsx"
import RightColumnContent from "./RightColumnContent.jsx"
class RightColumn extends React.Component {
    render() {
        return (
            <Fragment>
                <div className={styles.header}>
                    <RightColumnHeader />
                </div>
                <div className={styles.content}>
                    <RightColumnContent />
                </div>
            </Fragment>
        )
    }
}
export default RightColumn 