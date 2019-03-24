import React, { Fragment } from "react"
import { Editor, EditorState } from 'draft-js';
import styles from "../../sass/RightColumnContent.scss"

class Toolbar extends React.Component {
  render() {
    return (
      <div className={styles.toolbar}>

      </div>
    )
  }
}

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
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
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

class RightColumnCotent extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <Toolbar />
        <MyEditor />
</div>
    )
  }
}
export default RightColumnCotent