/**
 * The zsh prompt above each section. Colours are literal rather than tokens (spec §2) —
 * they mimic a terminal prompt and are not part of the palette.
 */
export default function PromptLine({ command }: { command: string }) {
  return (
    <div className="no-scrollbar mb-5 overflow-x-auto font-mono text-[13px] whitespace-nowrap">
      <span className="font-medium text-[#a6e3a1]">roland@oslo</span>
      <span className="text-fg-faint">:</span>
      <span className="font-medium text-[#89b4fa]">~/site</span>
      <span className="p-git text-[#f9e2af]">git:(main)</span>
      <span className="mr-[7px] ml-2 text-[#f38ba8]">&#10095;</span>
      <span className="text-fg">{command}</span>
    </div>
  );
}
