import React, { useEffect, useRef } from "react";
import axios from "axios";
import {
  UploadAdapter,
  FileLoader,
} from "@ckeditor/ckeditor5-upload/src/filerepository";
import { Editor } from "@ckeditor/ckeditor5-core";

interface InputProps {
  onChange: any;
  editorLoaded: boolean;
  name: string;
  disabled?: boolean;
  value: string;
}

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const response = await axios.request({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_API}/api/uploadCkeditor`,
            data: {
              files: file,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          resolve({
            default: `${response.data.url}`,
          });
        } catch (error) {
          reject("Hello");
        }
      });
    },
    abort: () => {},
  };
}

function uploadPlugin(editor: Editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

function CKEditorComponent({
  onChange,
  editorLoaded,
  disabled,
  name,
  value,
}: InputProps) {
  const editorRef = useRef<any>(null);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          name={name}
          disabled={disabled}
          editor={ClassicEditor}
          config={{
            toolbar: [
              "undo",
              "redo",
              // "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              // "blockQuote",
              "imageUpload",
              // "inserTable",
            ],
            extraPlugins: [uploadPlugin],
          }}
          data={value}
          onReady={(editor: any) => {}}
          onBlur={(event: any, editor: any) => {}}
          onFocus={(event: any, editor: any) => {}}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}

export default CKEditorComponent;
