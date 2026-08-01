export default function StatusBar() {
  return (
    <footer className="sticky bottom-0 z-[60] flex h-[28px] items-center gap-5 border-t border-line bg-chrome px-[14px] font-mono text-[11.5px] text-faint-chrome">
      <span>
        <span
          aria-hidden="true"
          className="mr-1.5 inline-block size-[7px] rounded-full bg-green shadow-[0_0_7px_rgba(166,227,161,.75)]"
        />
        Oslo, Norway
      </span>
      <span className="text-accent">main</span>
      <span>UTF-8</span>
      <span className="flex-1" />
      <span>Roland Sauter &middot; 2026</span>
    </footer>
  );
}
