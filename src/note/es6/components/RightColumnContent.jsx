import React, { Fragment } from "react"
import { connect } from 'react-redux'
import { Editor, EditorState } from 'draft-js';
import styles from "../../sass/RightColumnContent.scss"
import{change_editor_state}from "../actions"

class Toolbar extends React.Component {
  render() {
    return (
      <div className={styles.toolbar}>

      </div>
    )
  }
}

const mapStateToPropsOnToolbar = state => {
  return{
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
  return{
    editorState:state.editorState
  }
}
const mapDispatchToPropsOnMyEditor = dispatch => ({
  onChangeEditorState:(editorState)=>{
    dispatch(change_editor_state(editorState))
  }
})
const MyEditorBindingRedux = connect(mapStateToPropsOnMyEditor,mapDispatchToPropsOnMyEditor)(MyEditor)



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

