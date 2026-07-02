/* Hand-drawn vector olive branch — engraved-line style marginalia */
export default function OliveBranch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M100,12 C92,80 108,170 96,308" />
      <path d="M100,42 Q80,32 63,44 Q80,54 100,42 Z" />
      <path d="M98,66 Q118,55 135,65 Q118,77 98,66 Z" />
      <path d="M97,98 Q76,89 62,103 Q78,112 97,98 Z" />
      <path d="M99,130 Q120,121 136,133 Q119,142 99,130 Z" />
      <path d="M96,164 Q76,156 63,171 Q79,179 96,164 Z" />
      <path d="M98,198 Q118,190 133,203 Q117,211 98,198 Z" />
      <path d="M96,234 Q78,227 66,241 Q80,248 96,234 Z" />
      <path d="M97,266 Q116,259 130,272 Q115,279 97,266 Z" />
      <circle cx="109" cy="53" r="5" />
      <circle cx="89" cy="82" r="5" />
      <circle cx="111" cy="112" r="4.5" />
    </svg>
  );
}
