import React,{Fragment} from "react"
import styles from  "../../sass/LeftColumn.scss"
class RightColumn   extends React.Component{
    render(){
        return(
            <Fragment>
                <div className={styles.header}>1</div>
                <div className={styles.content}>2</div>
            </Fragment>
        )
    }
}
export default RightColumn 