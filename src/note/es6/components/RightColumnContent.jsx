import React, { Fragment } from "react"
import { connect } from 'react-redux'
import { Editor, EditorState,RichUtils } from 'draft-js';
import styles from "../../sass/RightColumnContent.scss"
import { change_editor_state } from "../actions"
import { getFileFromServer } from "./utility"
const shinelonId = require("../../../../config").note.mongodb.shinelonId

class RightColumnCotent extends React.Component {
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
        this.props.getFileForTheFirstTime(this.props.fileId)
      }
    }
  }
  render() {
    let { editorState, onChangeEditorState,toggleInlineStyle,handleKeyCommand ,
    color} = this.props
    return (
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <i className={styles["bold"]} onClick={() => toggleInlineStyle("BOLD")} />
          <i className={styles["italic"]} onClick={() => toggleInlineStyle("ITALIC")} />
          <i className={styles["underline"]} onClick={() => toggleInlineStyle("UNDERLINE")} />
          <i className={styles["color"]} onClick={()=>toggleInlineStyle("red")}>
          <span className={styles["color-line"]} style={{backgroundColor:color}}/>
          </i>



        </div>
        <div className={styles.editor} onClick={this.focusEditor}>
          <Editor
            ref={this.setEditor}
            editorState={editorState}
            onChange={onChangeEditorState}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let {editorWorkingValue} = state
  return {
    editorState: state.editorState == null ? EditorState.createEmpty() : state.editorState,
    fileId: state.fileId,
    initialRender: state.editorState == null ? true : false,
    tree: state.tree,
    color: editorWorkingValue.color
  }
}

const mapDispatchToProps = dispatch => ({
  onChangeEditorState: (editorState) => {
    dispatch(change_editor_state(editorState))
  },
  getFileForTheFirstTime: (fileId) => {
    getFileFromServer(dispatch, fileId)
  },
  toggleInlineStyle: (inlineStyle) => {
    dispatch((dispatch,getstate)=>{
      let {editorState} = getstate()
      let selection = editorState.getSelection()
      let nextEditorState = EditorState.forceSelection(RichUtils.toggleInlineStyle(editorState, inlineStyle), selection)
      dispatch(change_editor_state(nextEditorState))
    })
  },
  handleKeyCommand: (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      dispatch(change_editor_state(newState))
      return true;
    }
    return false;
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(RightColumnCotent)