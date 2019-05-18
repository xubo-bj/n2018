import React, { Fragment } from "react"
import { connect } from 'react-redux'
import { Editor, CompositeDecorator, EditorState, RichUtils, Modifier } from 'draft-js';
import styles from "../../sass/RightColumnContent.scss"
import { show_link_input, hide_link_input, save_inline_style, use_inline_style, show_font_family_menu, show_font_size_menu, change_editor_state } from "../actions"
import { getFileFromServer } from "./utility"
const shinelonId = require("../../../../config").note.mongodb.shinelonId

class RightColumnCotent extends React.Component {
  constructor(props) {
    super(props)
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
    this.showBackgroundPalette = () => {
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
      this.props.applyInlineStyle("text", e.target.value)
    })
    this.$inputBgColor.addEventListener("input", e => {
      this.props.applyInlineStyle("back", e.target.value)
    })

  }
  componentDidUpdate() {
  }
  render() {
    let { editorState, onChangeEditorState, toggleInlineStyle, handleKeyCommand,
      color, customStyleFn, applyInlineStyle, bgColor, clearStyle, fontSizeMenu,
      undo, redo, undoStackSize, redoStackSize, showFontSizeMenu, fontSize,
      showFontFamilyMenu, fontFamilyMenu, fontFamily, copyFormat, mouseUp,
      copiedInlineStyle, linkInputBox, showLinkBox,confirmLink,
    } = this.props,
      fontNames = ["微软雅黑", "宋体", "新宋体", "仿宋", "楷体", "黑体", "Arial", "Arial Black", "Times New Roman", "Courier New"]
    return (
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <i className={undoStackSize > 0 ? styles["undo"] : styles["no-undo"]} onClick={undo} />
          <i className={redoStackSize > 0 ? styles["redo"] : styles["no-redo"]} onClick={redo} />
          <i className={styles["clear-style"]} onClick={clearStyle} />
          <i className={styles["format-painter"]} onClick={copyFormat} />


          <i className={styles["separator"]} />
          <i className={styles["font-family"]} onClick={showFontFamilyMenu} data-desc="showFontFamily">
            <span className={styles["font-name"]}>{fontFamily}</span>
            <span className={styles["expand-arrow"]} />
          </i>
          <i className={styles["font-size"]} onClick={showFontSizeMenu} data-desc="showFontSize">
            <span className={styles["number"]}>{fontSize}</span>
            <span className={styles["expand-arrow"]} />
          </i>
          <i className={styles["bold"]} onClick={() => toggleInlineStyle("BOLD")} />
          <i className={styles["italic"]} onClick={() => toggleInlineStyle("ITALIC")} />
          <i className={styles["underline"]} onClick={() => toggleInlineStyle("UNDERLINE")} />


          <i className={styles["separator"]} />
          <i className={styles["color"]} onClick={() => applyInlineStyle("text", color)}>
            <span className={styles["color-line"]} style={{ backgroundColor: color }} />
          </i>
          <i className={styles["color-expand"]} onClick={this.showColorPalette}>
            <span className={styles["color-arrow"]} />
          </i>
          <i className={styles["bg-color"]} onClick={() => applyInlineStyle("back", bgColor)}>
            <span className={styles["color-line"]} style={{ backgroundColor: bgColor }} />
          </i>
          <i className={styles["color-expand"]} onClick={this.showBackgroundPalette}>
            <span className={styles["color-arrow"]} />
          </i>

          <i className={styles["separator"]} />
          <i className={styles["add-link"]} onClick={showLinkBox} />

          <ul className={styles["font-family-menu"]}
            onClick={e => applyInlineStyle("fontFamily", e.target.dataset.fontName)}
            style={{ display: fontFamilyMenu.display, left: fontFamilyMenu.clientX - 70 + "px", top: fontFamilyMenu.clientY + 25 + "px" }}>
            {fontNames.map((value, index) =>
              <li key={index} className={styles["li"]}
                data-font-name={value}
              >{value}</li>)}
          </ul>
          <ul className={styles["font-size-menu"]}
            onClick={e => applyInlineStyle("fontSize", e.target.dataset.fontSize)}
            style={{ display: fontSizeMenu.display, left: fontSizeMenu.clientX - 40 + "px", top: fontSizeMenu.clientY + 25 + "px" }}>
            {[12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map((value, index) =>
              <li key={index} className={styles["li"]}
                data-font-size={value}
              >{value}</li>)}
          </ul>
          <input type="color" style={{ display: "none" }} ref={elem => this.$inputColor = elem} />
          <input type="color" style={{ display: "none" }} ref={elem => this.$inputBgColor = elem} />
          <div className={styles["link-container"]} onClick={e => e.stopPropagation()}
            style={{ display: linkInputBox.display, left: linkInputBox.clientX + "px", top: linkInputBox.clientY + 'px' }}
          >
            <input type="text" className={styles["link-input"]}
              placeholder="输入链接" ref={elem => this.$inputLink = elem} />
            <span className={styles["link-confirm"]} onClick={() => confirmLink(this.$inputLink)}>确定</span>
          </div>
        </div>

        <div className={styles.editor} onClick={this.focusEditor}
          onMouseUp={mouseUp} data-cursor={copiedInlineStyle.flag ? "painter" : "normal"}>
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



function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} data-href="draftjs" style={{ color: '#3b5998', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

const decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link
}]);



const mapStateToProps = state => {
  let { copiedInlineStyle, editorState, fontSizeMenu, fontFamilyMenu, linkInputBox } = state
  editorState = editorState == null ? EditorState.createEmpty(decorator) : editorState
  let inlineStyle = editorState.getCurrentInlineStyle(),
    fontSize = 14,
    color = "#FF0000",
    backgrundColor = "#FFA500",
    fontFamily = "微软雅黑"
  for (let value of inlineStyle) {
    if (/^fontSize/.test(value)) {
      fontSize = value.substr(8)
    }
    if (/^text#/.test(value)) {
      color = value.substr(4)
    }
    if (/^back#/.test(value)) {
      backgrundColor = value.substr(4)
    }
    if (/^fontFamily/.test(value)) {
      fontFamily = value.substr(10)
    }
  }
  return {
    editorState,
    fileId: state.fileId,
    initialRender: state.editorState == null ? true : false,
    tree: state.tree,
    color,
    bgColor: backgrundColor,
    undoStackSize: editorState.getUndoStack().size,
    redoStackSize: editorState.getRedoStack().size,
    fontSizeMenu,
    fontSize,
    fontFamily,
    fontFamilyMenu,
    copiedInlineStyle,
    linkInputBox,
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
  },
  customStyleFn: (inlineStyle) => {
    let obj = {}
    for (let value of inlineStyle) {
      if (/^text#/.test(value)) {
        obj.color = value.substr(4)
      }
      if (/^back#/.test(value)) {
        obj.backgroundColor = value.substr(4)
      }
      if (/^fontSize/.test(value)) {
        obj.fontSize = value.substr(8) + "px"
      }
      if (/^fontFamily/.test(value)) {
        obj.fontFamily = value.substr(10)
      }
    }
    return obj
  },
  applyInlineStyle: (target, cssValue) => {
    dispatch((dispatch, getState) => {
      let { editorState } = getState(),
        currentContentState = editorState.getCurrentContent(),
        selectionState = editorState.getSelection(),
        inlineStyle = editorState.getCurrentInlineStyle()

      let arr = []
      for (let value of inlineStyle) {
        if (target == "text") {
          if (/^text#/.test(value)) {
            arr.push(value)
          }
        } else if (target == "back") {
          if (/^back#/.test(value)) {
            arr.push(value)
          }
        } else if (target == "fontSize") {
          if (/^fontSize/.test(value)) {
            arr.push(value)
          }
        } else if (target == "fontFamily") {
          if (/^fontFamily/.test(value)) {
            arr.push(value)
          }
        }
      }
      const nextContentState = arr.reduce((contentState, value) => {
        return Modifier.removeInlineStyle(contentState, selectionState, value)
      }, currentContentState);
      let finalContentState = Modifier.applyInlineStyle(nextContentState, selectionState, `${target}${cssValue}`)
      dispatch(change_editor_state(
        EditorState.forceSelection(EditorState.createWithContent(finalContentState), selectionState))
      )

    })
  },
  showFontSizeMenu: (e) => {
    dispatch(show_font_size_menu(e.clientX, e.clientY))
  },
  showFontFamilyMenu: e => {
    dispatch(show_font_family_menu(e.clientX, e.clientY))
  },
  copyFormat: () => {
    dispatch((dispatch, getState) => {
      let { editorState } = getState(),
        inlineStyle = editorState.getCurrentInlineStyle(),
        arr = []
      for (let value of inlineStyle) {
        arr.push(value)
      }
      dispatch(save_inline_style(arr))
    })
  },
  mouseUp: e => {
    setTimeout(function () {
      dispatch((dispatch, getState) => {
        let { editorState, copiedInlineStyle } = getState(),
          selectionState = editorState.getSelection(),
          currentContentState = editorState.getCurrentContent(),
          currentInlineStyle = editorState.getCurrentInlineStyle()

        let arr = []
        for (let value of currentInlineStyle) {
          arr.push(value)
        }

        let nextContentState = arr.reduce((contentState, elem) => {
          return Modifier.removeInlineStyle(contentState, selectionState, elem)
        }, currentContentState);

        if (copiedInlineStyle.flag) {
          if (!selectionState.isCollapsed()) {
            nextContentState = copiedInlineStyle.arr.reduce((nextContentState, elem) => {
              return Modifier.applyInlineStyle(nextContentState, selectionState, elem)
            }, nextContentState)
            dispatch(change_editor_state(
              EditorState.forceSelection(EditorState.createWithContent(nextContentState), selectionState))
            )
          }
          dispatch(use_inline_style())
        }
      })
    }, 100)
  },
  showLinkBox: e => {
    e.stopPropagation()
    dispatch(show_link_input(e.clientX - 440, e.clientY + 30))
  },
  confirmLink: input => {
    dispatch((dispatch, getState) => {
      const {editorState} = getState()
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {url: input.value}
      );
      console.log("url",input.value)
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
      const selection = newEditorState.getSelection()
      let nextEditorState =  RichUtils.toggleLink(
          newEditorState,
          selection,
          entityKey
      )
      dispatch(change_editor_state(
        EditorState.forceSelection(nextEditorState, selection)
      ))
      dispatch(hide_link_input())
      input.value = ""
    })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(RightColumnCotent)