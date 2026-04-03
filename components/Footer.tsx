import SocialIcons from "./SocialIcons";

interface FooterProps {
  fixed?: boolean;
}

export default function Footer({ fixed = false }: FooterProps) {
  const cls = fixed
    ? "fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/40 backdrop-blur-sm"
    : "border-t border-gray-200 bg-white";

  const textCls = fixed ? "text-white/60" : "text-gray-400";

  return (
    <footer className={cls}>
      <div className={`max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-xs ${textCls}`}>
        <span>All content © Võ Thành Thân</span>
        <SocialIcons />
      </div>
    </footer>
  );
}
