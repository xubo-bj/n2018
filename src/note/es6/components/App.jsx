import React from "react"
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import { connect } from "react-redux"
import　axios  from "axios"
import {
    hide_left_menu_one, hide_left_menu_two, hide_left_menu_three,
    hide_center_dir_menu, hide_center_file_menu
} from "../actions"
import styles from "../../sass/App.scss"
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
      window.addEventListener('beforeunload', function(event) {
            axios.get("note/unload", {
                headers: {
                    'X-Requested-With': 'axios'
                },
                timeout: 1000, // default is `0` (no timeout),
                responseType: 'json' // default
            }).then(res => {
            }).catch(err => {
                console.log('err1', err);
                // dispatch(create_new_folder_failure())
            })
          })
    }
    render() {
        let { hideLeftMenu } = this.props
        return (
            <div onClick={hideLeftMenu} className={styles.container}>
                <Header />
                <Content />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    hideLeftMenu: () => dispatch(
        (dispatch, getState) => {
            let {
                leftMenuOneDisplay,
                leftMenuTwo,
                leftMenuThree,
                centerDirMenu,
                centerFileMenu
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
            }
            if (centerDirMenu.display == "block") {
                dispatch(hide_center_dir_menu())
            }
            if (centerFileMenu.display == "block") {
                dispatch(hide_center_file_menu())
            }
        })
})
export default connect(null, mapDispatchToProps)(App)