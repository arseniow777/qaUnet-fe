import { FileUpload } from "@/components/ui/file-upload";

export default function UploadZone({ onFile }) {
  const handleChange = (files) => {
    if (files?.[0]) onFile(files[0]);
  };

  return (
    <div className="w-full border border-dashed border-white/20 bg-white/5 rounded-xl">
      <FileUpload onChange={handleChange} />
    </div>
  );
}
