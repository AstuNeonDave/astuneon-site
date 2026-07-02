/* Hand-drawn vector porta echoes — concentric threshold arches */
export default function ArchRings({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 520"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M20,520 L20,220 A180,180 0 0 1 380,220 L380,520" opacity="0.5" />
      <path d="M60,520 L60,240 A140,140 0 0 1 340,240 L340,520" opacity="0.3" />
      <path
        d="M100,520 L100,260 A100,100 0 0 1 300,260 L300,520"
        opacity="0.16"
      />
    </svg>
  );
}
