import React, { Fragment } from "react"
import { connect } from 'react-redux'
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import styles from "../../sass/RightColumnContent.scss"
import { select_background_color, select_font_color, change_editor_state } from "../actions"
import { getFileFromServer } from "./utility"
const shinelonId = require("../../../../config").note.mongodb.shinelonId

class RightColumnCotent extends React.Component {
  constructor(props) {
    super(props);
    this.setEditor = (editor) => {
      this.editor = editor;
    }
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    }
    this.showColorPalette = () => {
      this.$inputColor.click()
    }
    this.showBackgroundPalette = ()=>{
      this.$inputBgColor.click()
    }
  }

  componentDidMount() {
    // if (this.props.initialRender) {
    if (this.props.fileId != null) {
      this.props.getFileForTheFirstTime(this.props.fileId)
    }
    // }
    this.$inputColor.addEventListener("input", e => {
      this.props.selectTextColor(e.target.value, "text")
    })
    this.$inputBgColor.addEventListener("input", e => {
      this.props.selectTextColor(e.target.value, "back")
    })
    // let { editorState } = this.props,
    //   inlineStyle = editorState.getCurrentInlineStyle(),
    //   contentState = editorState.getCurrentContent(),
    //   selectionState = editorState.getSelection()
    //   for(let value of inlineStyle){
    //     if(/^text#/.test(value)){
    //       let nextContentState = Modifier.removeInlineStyle(contentState,selectionState,value.substr(4))
    //       this.props.onChangeEditorState(EditorState.createWithContent(nextContentState))
    //     }
    //   }
  }
  render() {
    let { editorState, onChangeEditorState, toggleInlineStyle, handleKeyCommand,
      color, customStyleFn, selectTextColor, bgColor,clearStyle,
      undo, redo, undoStackSize, redoStackSize } = this.props
    return (
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <i className={undoStackSize > 0 ? styles["undo"] : styles["no-undo"]} onClick={undo} />
          <i className={redoStackSize > 0 ? styles["redo"] : styles["no-redo"]} onClick={redo} />
          <i className={styles["clear-style"]} onClick={clearStyle} />
          <i className={styles["bold"]} onClick={() => toggleInlineStyle("BOLD")} />
          <i className={styles["italic"]} onClick={() => toggleInlineStyle("ITALIC")} />
          <i className={styles["underline"]} onClick={() => toggleInlineStyle("UNDERLINE")} />
          <i className={styles["color"]} onClick={() => selectTextColor(color, "text")}>
            <span className={styles["color-line"]} style={{ backgroundColor: color }} />
          </i>
          <i className={styles["color-expand"]} onClick={this.showColorPalette}>
            <i className={styles["color-arrow"]} />
          </i>
          <i className={styles["bg-color"]} onClick={() => selectTextColor(bgColor, "back")}>
            <span className={styles["color-line"]} style={{ backgroundColor: bgColor }} />
          </i>
          <i className={styles["color-expand"]} onClick={this.showBackgroundPalette}>
            <i className={styles["color-arrow"]} />
          </i>
          <input type="color" style={{ display: "none" }} ref={elem => this.$inputColor = elem} />
          <input type="color" style={{ display: "none" }} ref={elem => this.$inputBgColor = elem} />
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
  let { editorWorkingValue, editorState } = state
  editorState = editorState == null ? EditorState.createEmpty() : editorState
  return {
    editorState,
    fileId: state.fileId,
    initialRender: state.editorState == null ? true : false,
    tree: state.tree,
    color: editorWorkingValue.color,
    bgColor: editorWorkingValue.bgColor,
    undoStackSize: editorState.getUndoStack().size,
    redoStackSize: editorState.getRedoStack().size,
  }
}

const mapDispatchToProps = dispatch => ({
  undo: () => {
    dispatch((dispatch, getState) => {
      let { editorState } = getState()
      dispatch(change_editor_state(EditorState.undo(editorState)))
    })
  },
  redo: () => {
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
  handleKeyCommand: (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      dispatch(change_editor_state(newState))
      return true;
    }
    return false;
  },
  customStyleFn: (inlineStyle) => {
    let obj = {}
    for (let value of inlineStyle) {
      console.log("value ------- ",value)
      if (/^text#/.test(value)) {
        obj.color = value.substr(4)
      }
      if (/^back#/.test(value)) {
        obj.backgroundColor = value.substr(4)
      }
    }
    return obj
  },
  selectTextColor: (colorHex, target) => {
    dispatch((dispatch, getState) => {
      let { editorState } = getState(),
        currentContentState = editorState.getCurrentContent(),
        selectionState = editorState.getSelection(),
        inlineStyle = editorState.getCurrentInlineStyle()

      let arr = []
      for (let value of inlineStyle) {
        console.log("prop",value)
        if (target == "text") {
          if (/^text#/.test(value)) {
            arr.push(value)
          }
        } else {
          if (/^back#/.test(value)) {
            arr.push(value)
          }
        }
      }
      const nextContentState = arr.reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selectionState, color)
      }, currentContentState);
      let finalContentState = Modifier.applyInlineStyle(nextContentState, selectionState, `${target}${colorHex}`)
      dispatch(change_editor_state(
        EditorState.forceSelection(EditorState.createWithContent(finalContentState), selectionState)))
      if (target == "text") {
        dispatch(select_font_color(colorHex))
      } else {
        dispatch(select_background_color(colorHex))
      }
    })
  },
  clearStyle: () => {
    dispatch((dispatch, getState) => {
      let { editorState } = getState(),
        currentContentState = editorState.getCurrentContent(),
        selectionState = editorState.getSelection(),
        inlineStyle = editorState.getCurrentInlineStyle()

      let arr = []
      for (let value of inlineStyle) {
        arr.push(value)
      }

      let nextContentState = arr.reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selectionState, color)
      }, currentContentState);
      dispatch(change_editor_state(
        EditorState.forceSelection(EditorState.createWithContent(nextContentState), selectionState)))
    })
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(RightColumnCotent)