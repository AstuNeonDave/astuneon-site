import { VERSIONS } from "./versions";

export default function VersionNav({
  current,
  className,
}: {
  current: number;
  className?: string;
}) {
  return (
    <nav className={className} aria-label="Versions">
      {VERSIONS.map((v) => (
        <a
          key={v.n}
          href={`/v${v.n}`}
          aria-current={v.n === current ? "page" : undefined}
        >
          {v.roman}
        </a>
      ))}
    </nav>
  );
}
