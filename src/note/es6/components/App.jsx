import React from "react"
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import { connect } from "react-redux"
import { updateFile, submitCreateNewFolder, confirmNewFileName,
renameFolderConfirm
} from "./utility"

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
        window.addEventListener('beforeunload', this.props.updateFile2)
        window.addEventListener("blur", this.props.updateFile2)
    }
    componentDidUpdate() {
        console.log("--------APP update----------")
    }
    render() {
        let { hideLeftMenu, clickMouseRight } = this.props
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
    clickMouseRight: e => {
        dispatch((dispatch, getState) => {
            let { folderNameState, renameFileState } = getState()
            if (folderNameState.isTypingFolderName) {
                e.preventDefault()
                submitCreateNewFolder(dispatch)
            }
            if (renameFileState.isEditingFileName) {
                e.preventDefault()
                confirmNewFileName(dispatch)
            }
        })
    }
    ,
    hideLeftMenu: (e) => dispatch(
        (dispatch, getState) => {
            let {
                leftMenuOneDisplay,
                leftMenuTwo,
                leftMenuThree,
                centerDirMenu,
                centerFileMenu,
                folderNameState,
                renameFileState
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
            if (folderNameState.isTypingFolderName) {
                submitCreateNewFolder(dispatch)
            }
            if (renameFileState.isEditingFileName) {
                if (e.target.dataset.desc == "rename") {
                    return
                }
                confirmNewFileName(dispatch)
            }
            if(folderNameState.isRenamingFolder){
                if (e.target.dataset.desc == "rename") {
                    return
                }
                renameFolderConfirm(dispatch)
            }
        }
    ),
    updateFile2: () => {
        updateFile(dispatch)
    },

})
export default connect(null, mapDispatchToProps)(App)