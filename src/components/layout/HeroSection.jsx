const HeroSection = ({ badge, title, subtitle }) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '70vh' }}>
      {/* Starry/Dotted Background */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-background dark:from-slate-950 dark:via-slate-900 dark:to-background">
        {/* Dots grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-amber-900/5 via-transparent to-blue-900/5" />
      </div>

      {/* Rubber Ducks */}
      <div className="absolute top-[25%] left-[8%] text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
        🦆
      </div>
      <div className="absolute top-[55%] right-[8%] text-4xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        🦆
      </div>
      <div className="absolute bottom-[30%] left-[15%] text-3xl animate-bounce hidden md:block" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
        🦆
      </div>
      <div className="absolute top-[40%] right-[20%] text-3xl animate-bounce hidden lg:block" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
        🦆
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
        {/* Amber Badge Pill */}
        {badge && (
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl">🦆</span>
            <span className="px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-sm font-medium">
              {badge}
            </span>
            <span className="text-2xl">🦆</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl">
            {subtitle}
          </p>
        )}

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-1 text-gray-500 animate-pulse">
          <span className="text-sm">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
