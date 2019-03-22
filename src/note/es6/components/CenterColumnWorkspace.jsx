import React, { Fragment } from "react"
import { connect } from 'react-redux'
import styles from "../../sass/CenterColumnWorkspace.scss"
import {
    create_new_folder_prompt,
    create_new_folder_submit,
    create_new_folder_success,
    create_new_folder_failure,
    show_left_menu_two,
    show_left_menu_three,
    select_dir,
    toggle_dir,
    fetch_folders
} from "../actions"
import axios from 'axios';
const shinelonId = require("../../../../config").note.mongodb.shinelonId

const CenterColumnWorkspace = props =>
    <div className={styles.workspace}></div>

const mapStateToProps = state => ({

})

const mapDispatchToProps= dispatch=>({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CenterColumnWorkspace)