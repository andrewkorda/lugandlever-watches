interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className = "h-11", light = false }: LogoProps) {
  const textColor = light ? "#FFFFFF" : "#141416";
  const subtextColor = light ? "#A1A1AA" : "#52525B";
  const orangeColor = "#F15A24";

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* L & L Logo Emblem */}
      <img
        src={light ? "/logo-emblem.png" : "/logo-emblem-light.png"}
        alt="Lug & Lever Emblem"
        className="h-full w-auto object-contain flex-shrink-0"
      />

      {/* Industrial Wordmark Lockup */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center tracking-tight leading-none">
          <span 
            className="text-[25px] font-black uppercase font-display select-none tracking-[-0.01em]"
            style={{ color: textColor }}
          >
            LUG
          </span>
          <span 
            className="text-[21px] font-black mx-1.5 uppercase leading-none select-none"
            style={{ color: orangeColor }}
          >
            &
          </span>
          <span 
            className="text-[25px] font-black uppercase font-display select-none tracking-[-0.01em]"
            style={{ color: textColor }}
          >
            LEVER
          </span>
        </div>
        <span 
          className="text-[9.5px] font-extrabold tracking-[0.24em] uppercase mt-1 leading-none select-none"
          style={{ color: subtextColor, fontFamily: "'Inter', sans-serif" }}
        >
          THE COLLECTORS COLLECTIVE
        </span>
      </div>
    </div>
  );
}