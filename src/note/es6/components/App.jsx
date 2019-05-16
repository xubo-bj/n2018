import React from "react"
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import { connect } from "react-redux"
import { updateFile, submitCreateNewFolder, confirmNewFileName,
renameFolderConfirm
} from "./utility"

import {
    hide_left_menu_one, hide_left_menu_two, hide_left_menu_three,
    hide_center_dir_menu, hide_center_file_menu,hide_font_size_menu,
    hide_font_family_menu,
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
    render() {
        let { clickMouseLeft, clickMouseRight } = this.props
        return (
            <div onClick={clickMouseLeft} className={styles.container}
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
            let { folderNameState, renameFileState ,fontSizeMenu,
                fontFamilyMenu,
            } = getState()
            if (folderNameState.isTypingFolderName) {
                e.preventDefault()
                submitCreateNewFolder(dispatch)
            }
            if (renameFileState.isEditingFileName) {
                e.preventDefault()
                confirmNewFileName(dispatch)
            }
            if(fontSizeMenu.display == "block"){
                e.preventDefault()
                dispatch(hide_font_size_menu())
                return
            }
            if(fontFamilyMenu.display == "block"){
                e.preventDefault()
                dispatch(hide_font_family_menu())
            }
        })
    }
    ,
    clickMouseLeft: (e) => dispatch(
        (dispatch, getState) => {
            let {
                leftMenuOneDisplay,
                leftMenuTwo,
                leftMenuThree,
                centerDirMenu,
                centerFileMenu,
                folderNameState,
                renameFileState,
                fontSizeMenu,
                fontFamilyMenu,
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
                if (e.target.dataset.desc != "rename") {
                    confirmNewFileName(dispatch)
                }
            }
            if (folderNameState.isRenamingFolder) {
                if (e.target.dataset.desc != "rename") {
                    renameFolderConfirm(dispatch)
                }
            }
            if (fontSizeMenu.display == "block") {
                if (!(e.target.dataset.desc == "showFontSize" ||
                    e.target.parentElement.dataset.desc == "showFontSize")) {
                    dispatch(hide_font_size_menu())
                }
            }
            if (fontFamilyMenu.display == "block") {
                if (!(e.target.dataset.desc == "showFontFamily" ||
                    e.target.parentElement.dataset.desc == "showFontFamily")) {
                dispatch(hide_font_family_menu())
                }
            }
        }
    ),
    updateFile2: () => {
        updateFile(dispatch)
    },

})
export default connect(null, mapDispatchToProps)(App)