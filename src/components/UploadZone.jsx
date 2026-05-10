import { FileUpload } from "@/components/ui/file-upload";

export default function UploadZone({ onFile }) {
  const handleChange = (files) => {
    if (files?.[0]) onFile(files[0]);
  };

  return (
    <div className="w-full border-2 border-dashed border-neutral-200 rounded-xl overflow-hidden">
      <FileUpload onChange={handleChange} />
    </div>
  );
}
