import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

type ViewerType = {
  content: string | undefined;
};

const UiViewer = ({ content }: ViewerType) => {
  return (
    <>
      <Viewer initialValue={content} />
    </>
  );
};
export default UiViewer;
