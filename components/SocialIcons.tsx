import Link from "next/link";

const SOCIALS = [
  { href: "https://www.facebook.com/than.vo.31", label: "Facebook", svg: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { href: "https://www.youtube.com/channel/UCXi_10S4XrW5Wy0mUpNWPCw", label: "YouTube", svg: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>' },
  { href: "https://www.pinterest.com/thanvoartist/", label: "Pinterest", svg: '<path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.78 1.25-5.3 1.25-5.3s-.32-.64-.32-1.58c0-1.48.86-2.59 1.93-2.59.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.93 1.57 1.93 1.88 0 3.14-2.42 3.14-5.28 0-2.17-1.46-3.8-4.1-3.8-2.99 0-4.84 2.23-4.84 4.72 0 .86.25 1.46.64 1.93.18.22.21.31.14.57-.05.18-.15.62-.19.79-.06.25-.25.34-.46.25-1.32-.54-1.94-2-1.94-3.63 0-2.7 2.29-5.98 6.84-5.98 3.66 0 6.07 2.67 6.07 5.52 0 3.8-2.1 6.63-5.19 6.63-1.04 0-2.02-.56-2.36-1.21l-.64 2.48c-.23.9-.85 2.03-1.27 2.72.96.29 1.97.45 3.02.45 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>' },
  { href: "https://www.instagram.com/thanhthan394/", label: "Instagram", svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
];

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:opacity-60 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.svg }} />
        </Link>
      ))}
    </div>
  );
}
