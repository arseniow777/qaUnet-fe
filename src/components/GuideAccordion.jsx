import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QNA = [
  {
    q: "Apa itu QA-UNet?",
    a: "QA-UNet adalah model segmentasi gambar hybrid yang menggabungkan Variational Quantum Circuit (VQC) sebagai bottleneck dengan Attention Gate pada arsitektur U-Net klasik untuk deteksi area banjir dari foto UAV.",
  },
  {
    q: "Gambar seperti apa yang bisa diupload?",
    a: "Foto udara (UAV/drone) area banjir dalam format JPG atau PNG. Gambar akan di-resize otomatis ke 256x256 piksel sebelum diproses.",
  },
  {
    q: "Apa perbedaan 3 model yang tersedia?",
    a: "U-Net Baseline adalah arsitektur dasar. Attention U-Net menambahkan attention gate untuk fokus ke area relevan. Quantum U-Net menggantikan bottleneck klasik dengan Variational Quantum Circuit 8 qubit.",
  },
  {
    q: "Apa arti flood percentage?",
    a: "Persentase piksel dalam gambar yang terdeteksi sebagai area banjir dari total 65.536 piksel (256x256).",
  },
  {
    q: "Bagaimana cara menggunakan slider hasil?",
    a: "Geser handle di tengah gambar hasil untuk membandingkan mask biru-putih (kiri) dengan overlay merah area banjir (kanan).",
  },
  {
    q: "Berapa lama waktu prediksi?",
    a: "U-Net Baseline dan Attention U-Net biasanya selesai dalam 1-3 detik. Quantum U-Net membutuhkan lebih lama karena simulasi quantum circuit.",
  },
];

export default function GuideAccordion() {
  return (
    <div className="space-y-3">
      <div className="space-y-1 mb-6">
        <h3 className="font-semibold text-neutral-700">Panduan Penggunaan</h3>
        <p className="text-neutral-400">Pertanyaan umum seputar penggunaan</p>
      </div>
      <Accordion type="single" collapsible className="space-y-1">
        {QNA.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-neutral-900 rounded-xs px-4"
          >
            <AccordionTrigger className="text-sm text-neutral-700 hover:text-neutral-900 py-3 hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-neutral-500 pb-3 leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
