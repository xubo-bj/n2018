import React,{Fragment} from "react"
import LeftColumnToolbar from "./LeftColumnToolbar.jsx"
import LeftColumnWorkspace from "./LeftColumnWorkspace.jsx"
class LeftColumn extends React.Component{
    render(){
        return(
            <Fragment>
                <LeftColumnToolbar />
                <LeftColumnWorkspace/>
            </Fragment>
        )
    }
}
export default LeftColumn