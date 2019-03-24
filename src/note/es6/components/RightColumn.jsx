import React, { Fragment } from "react"
import RightColumnHeader from "./RightColumnHeader.jsx"
import RightColumnContent from "./RightColumnContent.jsx"
class RightColumn extends React.Component {
    render() {
        return (
            <Fragment>
                    <RightColumnHeader />
                    <RightColumnContent />
            </Fragment>
        )
    }
}
export default RightColumn 