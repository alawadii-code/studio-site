export default function ArtPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`art-placeholder ${className}`}>
      <span className="font-body text-[11px] tracking-[0.25em] uppercase text-mist px-4 text-center">
        {label}
      </span>
    </div>
  );
}
