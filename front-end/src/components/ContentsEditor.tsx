/* eslint-disable @typescript-eslint/no-explicit-any */
// ! ckeditor5 does not support typescript yet
// ? https://github.com/ckeditor/ckeditor5-react/issues/253

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

// import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import uploadAdapter from "@/util/uploadAdapter";

interface CustomEditorProps {
  fieldName: string;
  onChange: (data: string) => void;
}

const ContentsEditor = ({ fieldName, onChange }: CustomEditorProps) => {
  function uploadPlugin(editor: any) {
    console.log("fieldName", fieldName);
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }
  const customColorPalette = [
    {
      color: "hsl(240, 3%, 11%)",
      label: "",
    },
    {
      color: "hsl(0, 100%, 59%)",
      label: "",
    },
    {
      color: "hsl(35, 100%, 50%)",
      label: "",
    },
    {
      color: "hsl(48, 100%, 50%)",
      label: "",
    },
    {
      color: "hsl(135, 59%, 49%)",
      label: "",
    },
    {
      color: "hsl(177, 100%, 39%)",
      label: "",
    },
    {
      color: "hsl(240, 1%, 29%)",
      label: "",
    },
    {
      color: "hsl(199, 94%, 67%)",
      label: "",
    },
    {
      color: "hsl(211, 100%, 50%)",
      label: "",
    },
    {
      color: "hsl(241, 61%, 59%)",
      label: "",
    },
    {
      color: "hsl(280, 68%, 60%)",
      label: "",
    },
    {
      color: "hsl(16, 27%, 50%)",
      label: "",
    },
    {
      color: "hsl(240, 2%, 57%)",
      label: "",
    },
    {
      color: "hsl(177, 100%, 75%)",
      label: "",
    },
    {
      color: "hsl(69, 100%, 50%)",
      label: "",
    },
    {
      color: "hsl(60, 100%, 50%)",
      label: "",
    },
    {
      color: "hsl(131, 100%, 60%)",
      label: "",
    },
    {
      color: "hsl(165, 100%, 50%)",
      label: "",
    },
    {
      color: "hsl(240, 24%, 96%)",
      label: "",
    },
    {
      color: "hsl(180, 100%, 89%)",
      label: "",
    },
    {
      color: "hsl(68, 100%, 79%)",
      label: "",
    },
    {
      color: "hsl(49, 49%, 93%)",
      label: "",
    },
    {
      color: "hsl(141, 100%, 89%)",
      label: "",
    },
    {
      color: "hsl(0, 0%, 100%)",
      label: "",
      hasBorder: true,
    },
  ];

  const editorConfig = {
    extraPlugins: [uploadPlugin],
    removePlugins: ["MediaEmbedToolbar"],
    fontColor: { colors: customColorPalette },
    fontBackgroundColor: { colors: customColorPalette },
    image: {
      upload: { types: ["jpeg", "png", "gif", "bmp", "webp"] },
      resizeOptions: [
        {
          name: "resizeImage:50",
          value: "50",
          icon: "medium",
        },
        {
          name: "resizeImage:75",
          value: "75",
          icon: "large",
        },
        {
          name: "resizeImage:100",
          value: "100",
          icon: "original",
        },
      ],
      toolbar: [
        "toggleImageCaption",
        "|",
        "imageStyle:alignBlockLeft",
        "imageStyle:block",
        "imageStyle:alignBlockRight",
        "|",
        "resizeImage:50",
        "resizeImage:75",
        "resizeImage:100",
        "resizeImage",
      ],
    },
    table: {
      tableProperties: {
        borderColors: customColorPalette,
        backgroundColors: customColorPalette,
      },
      tableCellProperties: {
        borderColors: customColorPalette,
        backgroundColors: customColorPalette,
      },
    },
    toolbar: {
      items: [
        "bold",
        "italic",
        "|",
        "link",
        "imageUpload",
        "mediaEmbed",
        "|",
        "insertTable",
        "|",
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
    },
    fontSize: {
      options: [12, 14, 16, 18, 20, 22, 24],
    },
    mediaEmbed: {
      previewsInData: true,
    },
  };
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data="<p>상세 설명을 입력해주세요</p>"
        onChange={(_event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </>
  );
};

export default ContentsEditor;
