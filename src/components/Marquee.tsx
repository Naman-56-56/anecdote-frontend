export default function Marquee() {
  return (
    <div className="flex h-10 w-full items-center bg-[#0a0a0a] text-white">
      <div className="marquee-container w-full">
        {/* We use two blocks of text side-by-side to create a seamless infinite scroll loop */}
        <div className="marquee-content shrink-0 items-center">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="px-8 text-[11px] font-medium uppercase tracking-[0.1em]">
              Free shipping on orders $75 and above
            </span>
          ))}
        </div>
        <div className="marquee-content shrink-0 items-center">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={`dup-${i}`} className="px-8 text-[11px] font-medium uppercase tracking-[0.1em]">
              Free shipping on orders $75 and above
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
