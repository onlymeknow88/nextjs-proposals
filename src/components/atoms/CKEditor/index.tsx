import React, { useEffect, useState } from "react";
import CKEditorComponent from "./CKEditorComponent";

interface InputProps {
  label: string;
  error: boolean;
  name: any;
  disabled?: boolean;
  value: any;
  onChange?: (event: any, editor: any) => void;
  children: React.ReactNode;
}

export const CKEditor = (props: any) => {
  const {
    label,
    error,
    disabled,
    children,
    value,
    name,
    onChange,
    ...nativeProps
  } = props;
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <label
        aria-label="label"
        className={`${
          error === true ? "text-red-500" : ""
        } text-sm md:w-[25rem] lg:w-[19.5rem] font-medium`}
      >
        {label}
        <span className="text-danger">*</span>
      </label>
      <div className="ck-editor-custom">
        <CKEditorComponent
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
          {...nativeProps}
          editorLoaded={editorLoaded}
        />
        {children}
      </div>
    </>
  );
};
