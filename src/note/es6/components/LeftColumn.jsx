import React,{Fragment} from "react"
import LeftColumnToolbar from "./LeftColumnToolbar.jsx"
import styles from  "../../sass/LeftColumn.scss"
class LeftColumn extends React.Component{
    render(){
        return(
            <Fragment>
                <div className={styles.toolbar}><LeftColumnToolbar /></div>
                <div className={styles.workspace}></div>
            </Fragment>
        )
    }
}
export default LeftColumn