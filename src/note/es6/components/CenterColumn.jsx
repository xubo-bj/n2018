import React, { Fragment } from "react"
import styles from "../../sass/CenterColumn.scss"
import CenterColumnToolbar from "./CenterColumnToolbar.jsx"
import CenterColumnWorkspace from "./CenterColumnWorkspace.jsx"
class CenterColumn extends React.Component {
    render() {
        return (
            <Fragment>
                <CenterColumnToolbar />
                <CenterColumnWorkspace/>
            </Fragment>
        )
    }
}
export default CenterColumn 