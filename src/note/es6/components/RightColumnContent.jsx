import React, { Fragment } from "react"
import { connect } from 'react-redux'
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import styles from "../../sass/RightColumnContent.scss"
import { change_editor_state, get_file_success } from "../actions"
import axios from 'axios';
const shinelonId = require("../../../../config").note.mongodb.shinelonId

class Toolbar extends React.Component {
  render() {
    return (
      <div className={styles.toolbar}>

      </div>
    )
  }
}

const mapStateToPropsOnToolbar = state => {
  return {
  }
}

const mapDispatchToPropsOnToolbar = dispatch => ({
})


// const ToolbarBindingRedux = connect(mapStateToPropsOnToolbar,mapDispatchToPropsOnToolbar)(Toolbar)


/**
 * 
 */
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { editorState: EditorState.createEmpty() };
    // this.onChange = (editorState) => this.setState({ editorState });
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }
  componentDidMount() {
    if (this.props.initialRender) {
      if (this.props.fileId != null) {
        let tree = this.props.tree,
          fileName = tree[shinelonId].files.filter(file => file._id == this.props.fileId)[0].name

        axios.get("note/get-file", {
          params: {
            selectedFileId: this.props.fileId
          },
          headers: {
            'X-Requested-With': 'axios'
          },
          timeout: 1000, // default is `0` (no timeout),
          responseType: 'json' // default
        }).then(res => {
          if (res.data.success == "ok") {
            this.props.fetchInitailFileContent(res.data.content, this.props.fileId, fileName)
          } else {

          }
        }).catch(err => {
          console.log('err1', err);
          // dispatch(create_new_folder_failure())
        })
      }
    }
  }

  render() {
    return (
      <div className={styles.editor} onClick={this.focusEditor}>
        <Editor
          ref={this.setEditor}
          editorState={this.props.editorState}
          onChange={this.props.onChangeEditorState}
        />
      </div>
    );
  }
}

const mapStateToPropsOnMyEditor = state => {
  return {
    editorState: state.editorState == null ? EditorState.createEmpty() : state.editorState,
    fileId: state.fileId,
    initialRender: state.editorState == null ? true : false,
    tree:state.tree
  }
}
const mapDispatchToPropsOnMyEditor = dispatch => ({
  onChangeEditorState: (editorState) => {
    dispatch(change_editor_state(editorState))
  },
  fetchInitailFileContent: (content, fileId, name) => {
    dispatch(get_file_success(content, fileId, name))
  }
})
const MyEditorBindingRedux = connect(mapStateToPropsOnMyEditor, mapDispatchToPropsOnMyEditor)(MyEditor)



/**
 * 
 */
export default class RightColumnCotent extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <Toolbar />
        <MyEditorBindingRedux />
      </div>
    )
  }
}