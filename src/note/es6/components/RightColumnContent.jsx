import React, { Fragment } from "react"
import { connect } from 'react-redux'
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import styles from "../../sass/RightColumnContent.scss"
import {select_background_color,select_font_color, change_editor_state } from "../actions"
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
    this.showPalette = () => {
      this.$inputColor.click()
    }
  }

  componentDidMount() {
    // if (this.props.initialRender) {
    if (this.props.fileId != null) {
      this.props.getFileForTheFirstTime(this.props.fileId)
    }
    // }
    this.$inputColor.addEventListener("input", e => {
      this.props.selectTextColor(e.target.value)
    })

  }
  render() {
    let { editorState, onChangeEditorState, toggleInlineStyle, handleKeyCommand,
      color, customStyleFn, toggleBlockType, undo, redo, undoStackSize, redoStackSize } = this.props
    return (
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <i className={undoStackSize > 0 ? styles["undo"] : styles["no-undo"]} onClick={undo} />
          <i className={redoStackSize > 0 ? styles["redo"] : styles["no-redo"]} onClick={redo} />
          <i className={styles["bold"]} onClick={() => toggleInlineStyle("BOLD")} />
          <i className={styles["italic"]} onClick={() => toggleInlineStyle("ITALIC")} />
          <i className={styles["underline"]} onClick={() => toggleInlineStyle("UNDERLINE")} />
          <i className={styles["color"]} onClick={this.showPalette}>
            <span className={styles["color-line"]} style={{ backgroundColor: color }} />
            <input type="color" style={{ display: "none" }} ref={elem => this.$inputColor = elem} />
          </i>
          <i className={styles["color-expand"]}>
            <i className={styles["color-arrow"]} />
          </i>
          <i className={styles["bold"]} onClick={() => toggleBlockType()} />
        </div>
          <div className={styles.editor} onClick={this.focusEditor}>
            <Editor
              ref={this.setEditor}
              editorState={editorState}
              onChange={onChangeEditorState}
              handleKeyCommand={handleKeyCommand}
              customStyleFn={customStyleFn}
            />
          </div>
        </div>
        );
      }
    }
    
const mapStateToProps = state => {
          let { editorWorkingValue,editorState } = state
        editorState = editorState == null ? EditorState.createEmpty() : editorState
  return {
    editorState,
    fileId: state.fileId,
    initialRender: state.editorState == null ? true : false,
    tree: state.tree,
    color: editorWorkingValue.color,
    undoStackSize: editorState.getUndoStack().size,
    redoStackSize: editorState.getRedoStack().size,
      }
    }
    
const mapDispatchToProps = dispatch => ({
          undo: ()=>{
          dispatch((dispatch, getState) => {
            let { editorState } = getState()
            dispatch(change_editor_state(EditorState.undo(editorState)))
          })
        },
  redo:()=>{
          dispatch((dispatch, getState) => {
            let { editorState } = getState()
            dispatch(change_editor_state(EditorState.redo(editorState)))
          })
        },
  onChangeEditorState: (editorState) => {
          dispatch(change_editor_state(editorState))
        },
  getFileForTheFirstTime: (fileId) => {
          getFileFromServer(dispatch, fileId)
        },
  toggleInlineStyle: (inlineStyle) => {
          dispatch((dispatch, getstate) => {
            let { editorState } = getstate()
            let selection = editorState.getSelection()
            let nextEditorState = EditorState.forceSelection(RichUtils.toggleInlineStyle(editorState, inlineStyle), selection)
            dispatch(change_editor_state(nextEditorState))
          })
        },
  toggleBlockType:()=>{
          dispatch((dispatch, getstate) => {
            let { editorState } = getstate()
            console.log("t sele",editorState.getSelection())
            // let selection = editorState.getSelection()
            // let nextEditorState = EditorState.forceSelection(RichUtils.toggleBlockType(editorState, inlineStyle), selection)
            // dispatch(change_editor_state(nextEditorState))
          })
        },
  handleKeyCommand: (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
          dispatch(change_editor_state(newState))
      return true;
      }
      return false;
    },
  customStyleFn: (inlineStyle, contentBlock) => {
          console.log("type ---------------  :", contentBlock.type)
    let type = contentBlock.type
    if (type.substr(0, 4) == "text") {
      return { color: type.substr(5) }
    } else if (type.substr(0, 4) == "back") {
      return { backgroundColor: type.substr(5) }
    }
  },
  selectTextColor: colorHex => {
    dispatch((dispatch, getState) => {
      let { editorState } = getState(),
        contentState = editorState.getCurrentContent(),
        selectionState = editorState.getSelection()
      console.log("selectionState", selectionState)
      let x = Modifier.applyInlineStyle(contentState, selectionState, `text${colorHex}`)
      dispatch(change_editor_state(
          EditorState.forceSelection(EditorState.createWithContent(x), selectionState)))
      dispatch(select_font_color(colorHex))
    })
  }
})
        
        
export default connect(mapStateToProps, mapDispatchToProps)(RightColumnCotent)