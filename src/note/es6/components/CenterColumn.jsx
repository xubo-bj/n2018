
import React, { Fragment } from "react"
import styles from "../../sass/CenterColumn.scss"
class CenterColumn extends React.Component {
    render() {
        return (
            <Fragment>
                <div className={styles.header}>1</div>
                <div className={styles.content}>2</div>
            </Fragment>
        )
    }
}
export default CenterColumn 