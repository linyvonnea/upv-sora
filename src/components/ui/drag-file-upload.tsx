import { FilePondUploader } from "./filepond-uploader";

export default function DragFileUpload({
  documentTitle,
  onUpload,
}: {
  documentTitle: string;
  onUpload: (title: string, url: string) => void;
}) {
  return (
    <FilePondUploader
      onUpload={({ url }) => onUpload(documentTitle, url)} // ignore `size` if not needed
    />
  );
}