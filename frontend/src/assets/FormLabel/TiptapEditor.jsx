import './Editor.css';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Box, Button, ButtonGroup, Stack, Divider } from '@mui/material';

const TiptapEditor = ({ onChange, initialValue }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialValue || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync with database data when it loads
  useEffect(() => {
    if (editor && initialValue !== editor.getHTML()) {
      editor.commands.setContent(initialValue || '');
    }
  }, [initialValue, editor]);

  // Force focus when clicking anywhere in the container
  const handleContainerClick = () => {
    if (editor) {
      editor.chain().focus().run();
    }
  };

  if (!editor) return null;

  return (
    <Box 
      sx={{ 
        border: '1px solid #e2e8f0', 
        borderRadius: 2, 
        mt: 1, 
        bgcolor: '#fff', 
        // overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* TOOLBAR */}
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ 
          position: 'sticky',
          zIndex: 9,
          top:0,
          left:0,
          p: 1, 
          borderBottom: '1px solid #e2e8f0', 
          flexWrap: 'wrap', 
          gap: 1, 
          bgcolor: '#f8fafc' 
        }}
      >
        {/* Text Styles */}
        <ButtonGroup size="small" variant="outlined">
          <Button 
            onClick={() => editor.chain().focus().toggleBold().run()} 
            variant={editor.isActive('bold') ? 'contained' : 'outlined'}
            sx={{ fontWeight: 'bold' }}
          >B</Button>
          <Button 
            onClick={() => editor.chain().focus().toggleItalic().run()} 
            variant={editor.isActive('italic') ? 'contained' : 'outlined'}
            sx={{ fontStyle: 'italic' }}
          >I</Button>
        </ButtonGroup>

        {/* Headings */}
        <ButtonGroup size="small" variant="outlined">
          <Button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            variant={editor.isActive('heading', { level: 1 }) ? 'contained' : 'outlined'}
          >H1</Button>
          <Button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            variant={editor.isActive('heading', { level: 2 }) ? 'contained' : 'outlined'}
          >H2</Button>
          <Button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            variant={editor.isActive('heading', { level: 3 }) ? 'contained' : 'outlined'}
          >H3</Button>
           <Button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            variant={editor.isActive('heading', { level: 4 }) ? 'contained' : 'outlined'}
          >H4</Button>
        </ButtonGroup>

        {/* Lists */}
        <Button 
          size="small" 
          variant={editor.isActive('bulletList') ? 'contained' : 'outlined'} 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >• List</Button>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Table Actions */}
        <ButtonGroup size="small" variant="outlined" color="primary">
          <Button onClick={() => editor.chain().focus().insertTable({ rows: 1, cols: 1, withHeaderRow: true }).run()}>
            + Table
          </Button>
          <Button onClick={() => editor.chain().focus().addColumnAfter().run()}>+ Col</Button>
          <Button onClick={() => editor.chain().focus().addRowAfter().run()}>+ Row</Button>
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined" color="error">
          <Button onClick={() => editor.chain().focus().deleteColumn().run()}>Del Col</Button>
          <Button onClick={() => editor.chain().focus().deleteRow().run()}>Del Row</Button>
          <Button onClick={() => editor.chain().focus().deleteTable().run()}>Clear Table</Button>
        </ButtonGroup>
      </Stack>

      {/* EDITABLE AREA */}
      <Box 
        onClick={handleContainerClick}
        sx={{ 
          p: 2, 
          minHeight: '300px', 
          cursor: 'text',
          '& .tiptap': {
            outline: 'none',
            minHeight: '300px',
            height: '100%',
          }
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default TiptapEditor;