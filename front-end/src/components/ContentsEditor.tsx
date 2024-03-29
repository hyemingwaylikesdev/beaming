/* eslint-disable @typescript-eslint/no-explicit-any */
// ! ckeditor5 does not support typescript yet
// ? https://github.com/ckeditor/ckeditor5-react/issues/253

import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";

import uploadAdapter from "@/util/uploadAdapter";

interface CustomEditorProps {
  onChange: (data: string) => void;
}

const ContentsEditor = ({ onChange }: CustomEditorProps) => {
  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      <CKEditor
        editor={CustomEditor}
        onReady={(editor) => {
          uploadPlugin(editor);
        }}
        data="<p>상세정보</p>"
        onChange={(_event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </>
  );
};

export default ContentsEditor;
