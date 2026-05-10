import { FileUpload } from "@/components/ui/file-upload";

export default function UploadZone({ onFile }) {
  const handleChange = (files) => {
    if (files?.[0]) onFile(files[0]);
  };

  return (
    <div className="w-full border-2 border-dashed border-neutral-900 rounded-xs overflow-hidden">
      <FileUpload onChange={handleChange} />
    </div>
  );
}
