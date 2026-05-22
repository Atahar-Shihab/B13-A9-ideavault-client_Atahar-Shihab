export default function Marquee({ children, direction = "left", className = "", fadeColor = "from-base-100" }) {
  const animClass = direction === "right" ? "animate-marquee-right" : "animate-marquee-left";
  return (
    <div className={`marquee-wrapper relative overflow-hidden ${className}`}>
      <div className={`flex gap-4 w-max ${animClass}`}>
        {children}
        {children}
      </div>
      <div className={`pointer-events-none absolute top-0 left-0 w-24 h-full bg-gradient-to-r ${fadeColor} to-transparent z-10`} />
      <div className={`pointer-events-none absolute top-0 right-0 w-24 h-full bg-gradient-to-l ${fadeColor} to-transparent z-10`} />
    </div>
  );
}
