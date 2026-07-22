import { FiHome } from "react-icons/fi";
import { cn } from "@shared/utils/cn";

const VARIANT_CLASSES = {
  solid: "bg-gradient-to-br from-primary-700 to-primary-900 text-white shadow-md shadow-primary-900/20",
  glass: "bg-white/15 text-white backdrop-blur-md ring-1 ring-white/30",
};

export default function BrandMark({ size = 36, variant = "solid", className }) {
  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-xl", VARIANT_CLASSES[variant], className)}
      style={{ width: size, height: size }}
    >
      <FiHome size={Math.round(size * 0.55)} />
    </span>
  );
}
