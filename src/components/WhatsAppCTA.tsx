import { buildWhatsappUrl, whatsappMessage } from "@/content/clinic";

export default function WhatsAppCTA({
  reference,
  label = "تواصل معنا عبر واتساب",
  className = "",
}: {
  reference?: string;
  label?: string;
  className?: string;
}) {
  const href = buildWhatsappUrl(whatsappMessage(reference));
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3.5 text-[15px] font-semibold text-[#128C4A] transition-colors hover:bg-[#25D366]/20 ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.2.4.6 2.3-2.4-.6-.4.2A8.2 8.2 0 1 1 12 3.8Zm-3 3.9c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9.2.2 2 3.1 4.9 4.2 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4-.3-.1-1.7-.8-2-.9-.2-.1-.4-.2-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.1.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.6-.9-2.1-.2-.5-.4-.4-.6-.4Z" />
      </svg>
      {label}
    </a>
  );
}
