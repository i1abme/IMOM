import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useEffect, useRef } from "react";
import { baseInstance } from "../../api/instance";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorRef?: React.MutableRefObject<any>;
  title?: string;
  index?: number;
  onChange?: (htmlContent: string, markdownContent: string) => void;
  handleDayInputChange?: (
    value: { dayContentMd: string; dayContentHtml: string },
    name: string,
    index: number
  ) => void;
  name?: string;
  initialValue?: string | { dayContentMd?: string; dayContentHtml?: string };
}
type HookCallback = (url: string, text?: string) => void;

const UiEditor = ({
  onChange,
  handleDayInputChange,
  name,
  index,
  initialValue,
}: Props) => {
  const toolbarItems = [
    ["heading", "bold", "italic"],
    ["hr"],
    ["ul", "ol"],
    ["table", "link"],
    ["image"],
  ];
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();
      if (instance) {
        instance.setMarkdown(initialValue);
      }
    }
  }, [initialValue]);
  const handleChange = () => {
    if (
      handleDayInputChange &&
      name !== undefined &&
      index !== undefined &&
      editorRef?.current
    ) {
      const mdValue = editorRef?.current.getInstance().getMarkdown();
      const htmlValue = editorRef?.current.getInstance().getHTML();

      handleDayInputChange(
        { dayContentMd: mdValue, dayContentHtml: htmlValue },
        name,
        index
      );
    }

    if (onChange && editorRef.current) {
      const mdValue = editorRef?.current.getInstance().getMarkdown();
      const htmlValue = editorRef?.current.getInstance().getHTML();
      onChange(htmlValue, mdValue);
    }
  };

  return (
    <div className="w-full">
      <Editor
        initialValue={initialValue}
        previewStyle="vertical"
        initialEditType="markdown"
        useCommandShortcut={false}
        plugins={[colorSyntax]}
        language="ko-KR"
        theme={""}
        toolbarItems={toolbarItems}
        ref={editorRef}
        onChange={handleChange}
        hideModeSwitch
        hooks={{
          addImageBlobHook: async (blob: Blob, callback: HookCallback) => {
            try {
              const formData = new FormData();
              formData.append("file", blob);

              const response = await baseInstance.post("/images", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

              if (callback) {
                callback(response.data.data.imageUrl);
              }
            } catch (error) {
              console.error(error);
            }
          },
        }}
        customHTMLRenderer={{
          htmlBlock: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            iframe(node: any) {
              return [
                {
                  type: "openTag",
                  tagName: "iframe",
                  outerNewLine: true,
                  attributes: node.attrs,
                },
                { type: "html", content: node.childrenHTML },
                { type: "closeTag", tagName: "iframe", outerNewLine: true },
              ];
            },
          },
        }}
      />
    </div>
  );
};
export default UiEditor;
