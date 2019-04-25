import React from "react"
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import { connect } from "react-redux"
import axios from "axios"
import { isEqual } from "lodash"
import { updateFileInBackground,submitCreateNewFolder } from "./utility"
import { convertToRaw } from "draft-js"

import {
    hide_left_menu_one, hide_left_menu_two, hide_left_menu_three,
    hide_center_dir_menu, hide_center_file_menu,
} from "../actions"
import styles from "../../sass/App.scss"
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.props.updateFile)
        window.addEventListener("blur", this.props.updateFile)
    }
    render() {
        let { hideLeftMenu,clickMouseRight} = this.props
        return (
            <div onClick={hideLeftMenu} className={styles.container}
            onContextMenu={clickMouseRight}
            >
                <Header />
                <Content />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    clickMouseRight:e=>{
        dispatch((dispatch,getState)=>{
            let { createNewFolder} = getState()
            if (createNewFolder.isTypingFolderName) {
                e.preventDefault()
                submitCreateNewFolder(dispatch)
            }
        })
    }
    ,
    hideLeftMenu: () => dispatch(
        (dispatch, getState) => {
            let {
                leftMenuOneDisplay,
                leftMenuTwo,
                leftMenuThree,
                centerDirMenu,
                centerFileMenu,
                createNewFolder
            } = getState()
            if (leftMenuOneDisplay == "block") {
                dispatch(hide_left_menu_one())
                return
            }
            if (leftMenuTwo.display == "block") {
                dispatch(hide_left_menu_two())
                return
            }
            if (leftMenuThree.display == "block") {
                dispatch(hide_left_menu_three())
                return
            }
            if (centerDirMenu.display == "block") {
                dispatch(hide_center_dir_menu())
                return
            }
            if (centerFileMenu.display == "block") {
                dispatch(hide_center_file_menu())
            }
            if (createNewFolder.isTypingFolderName) {
                submitCreateNewFolder(dispatch)
            }

        }),
    updateFile: () => {
        dispatch((dispatch, getState) => {
            let { fileId, centerColumnDir, editorState, filesObj, tree } = getState(),
                currentfiles = [...tree[centerColumnDir].files],
                currentName = null,
                currentContent = null

            if (fileId != null) {
                currentName = currentfiles.filter(file => file._id == fileId)[0].name
                currentContent = convertToRaw(editorState.getCurrentContent())
            }
            let needUpdate = !isEqual(currentContent, filesObj[fileId])
            if (fileId != null && needUpdate) {
                updateFileInBackground(dispatch, fileId, centerColumnDir, currentName, currentContent)
            }
        }
        )
    },

})
export default connect(null, mapDispatchToProps)(App)