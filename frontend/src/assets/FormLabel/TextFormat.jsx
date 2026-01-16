import React, { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
// --- ADDED $createParagraphNode TO THIS IMPORT LINE ---
import { $getRoot, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND, $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical';

import { HeadingNode, $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';

const theme = {
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    underline: 'editor-text-underline',
  },
  paragraph: 'editor-paragraph',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
  }
};

function InitialStatePlugin({ initialValue }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      
      // CASE 1: The form was reset (initialValue is empty)
      // We check for "" or " " (based on your previous reset logic)
      if (!initialValue || initialValue.trim() === "") {
        if (root.getTextContentSize() !== 0) {
          root.clear();
          // Lexical needs at least one empty paragraph to stay functional
          const paragraph = $createParagraphNode();
          root.append(paragraph);
        }
        return;
      }

      // CASE 2: Initializing with content (Existing logic)
      const isEmpty = root.getTextContentSize() === 0;
      if (isEmpty) {
        root.clear();
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialValue, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        root.append(...nodes);
      }
    });
  }, [editor, initialValue]);

  return null;
}
function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          onChange(htmlString); 
        });
      }}
    />
  );
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatHeading = (headingSize) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // This will now work because $createParagraphNode is imported correctly
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  return (
    <div className="toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '8px', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <button type="button" className="toolbar-item" onClick={formatParagraph}>Normal</button>
      <div style={{ width: '1px', background: '#ccc', margin: '0 4px' }} />
      <button type="button" className="toolbar-item" onClick={() => formatHeading('h1')}>H1</button>
      <button type="button" className="toolbar-item" onClick={() => formatHeading('h2')}>H2</button>
      <button type="button" className="toolbar-item" onClick={() => formatHeading('h3')}>H3</button>
      <div style={{ width: '1px', background: '#ccc', margin: '0 4px' }} />
      <button type="button" className="toolbar-item" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}><b>B</b></button>
      <button type="button" className="toolbar-item" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}><i>I</i></button>
      <button type="button" className="toolbar-item" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}><u>U</u></button>
      <div style={{ width: '1px', background: '#ccc', margin: '0 4px' }} />
      <button type="button" className="toolbar-item" onClick={() => editor.dispatchCommand(UNDO_COMMAND)}>Undo</button>
      <button type="button" className="toolbar-item" onClick={() => editor.dispatchCommand(REDO_COMMAND)}>Redo</button>
    </div>
  );
}

export default function TextFormat({ onChange, initialValue }) {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    nodes: [HeadingNode],
    onError: (error) => console.error(error),
  };

  return (
    <div className="editor-wrapper" style={{ border: '1px solid #ccc', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div style={{ position: 'relative', background: '#fff' }}>
          <RichTextPlugin
            contentEditable={<ContentEditable style={{ minHeight: '200px', padding: '15px', outline: 'none' }} />}
            placeholder={<div style={{ position: 'absolute', top: '15px', left: '15px', color: '#aaa', pointerEvents: 'none' }}>Write your blog content here...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <InitialStatePlugin initialValue={initialValue} />
          <MyOnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>

      <style>{`
        /* Base text set to 0.9rem */
        .editor-paragraph { font-size: 0.9rem; margin: 0 0 8px 0; }
        .editor-heading-h1 { font-size: 2.5rem; font-weight: 600; margin: 0 0 12px 0; }
        .editor-heading-h2 { font-size: 2rem; font-weight: 600; margin: 0 0 10px 0; }
        .editor-heading-h3 { font-size: 1.5rem; font-weight: 500; margin: 0 0 8px 0; }
        
        .editor-text-bold { font-weight: bold; }
        .editor-text-italic { font-style: italic; }
        .editor-text-underline { text-decoration: underline; }
        
        .toolbar-item { 
          cursor: pointer; 
          padding: 5px 10px; 
          border: 1px solid #ccc; 
          background: #fff; 
          border-radius: 4px; 
          font-size: 14px;
        }
        .toolbar-item:hover { background: #eee; }
      `}</style>
    </div>
  );
}