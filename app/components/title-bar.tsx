/**
 * Window chrome. Holds the three traffic-light dots and the file path, nothing else —
 * contact links live in the sidebar (spec §1).
 */
export default function TitleBar() {
  return (
    <header className="sticky top-0 z-[60] flex h-[38px] items-center gap-[14px] border-b border-line bg-chrome px-[14px]">
      <div aria-hidden="true" className="flex gap-2">
        <i className="size-[11px] rounded-full bg-[#ff5f57]" />
        <i className="size-[11px] rounded-full bg-[#febc2e]" />
        <i className="size-[11px] rounded-full bg-[#28c840]" />
      </div>
      <div className="font-mono text-[12px] tracking-[0.02em] text-faint-chrome">
        ~/roland &nbsp;&mdash;&nbsp; <b className="font-medium text-fg-dim">about.tsx</b>
      </div>
    </header>
  );
}
