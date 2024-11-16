import React from "react";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBulletList,
  BtnBold,
  BtnItalic,
  BtnNumberedList,
} from "react-simple-wysiwyg";

const WysiwigEditor = ({ value, onChange }) => {
  return (
    <EditorProvider>
      <Editor value={value} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnBulletList />
          <BtnNumberedList />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};

export default WysiwigEditor;
