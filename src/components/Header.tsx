function Header() {
  return (
    <header className="relative z-20 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="text-xl sm:text-2xl">🌤️</div>
            <span className="text-white font-semibold text-base sm:text-lg">
              Wetter App
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
