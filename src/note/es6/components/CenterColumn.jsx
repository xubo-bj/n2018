
import React, { Fragment } from "react"
import styles from "../../sass/CenterColumn.scss"
class CenterColumn extends React.Component {
    render() {
        return (
            <Fragment>
                <div className={styles.header}>1</div>
                <div className={styles.content}>
                <div contentEditable={true} style={{border:"1px solid #000",height:"30px"}}></div>
                </div>
            </Fragment>
        )
    }
}
export default CenterColumn 