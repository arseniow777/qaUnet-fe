import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { helix } from "ldrs";

helix.register();

const MODEL_LABELS = {
  unet: "U-Net Baseline",
  attention: "Attention U-Net",
  quantum: "Quantum U-Net",
};

export default function ModelButton({ modelKey, loading, onClick }) {
  return (
    <Button
      onClick={() => onClick(modelKey)}
      disabled={loading}
      className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white gap-2 transition-all duration-200"
    >
      {loading ? (
        <l-helix size="18" speed="2.5" color="white" />
      ) : (
        MODEL_LABELS[modelKey]
      )}
    </Button>
  );
}
