import type { Link } from "@/content/types";

export const isWhatsApp = (href: string) => /^https?:\/\/(wa\.me|([a-z]+\.)?whatsapp\.com)\//.test(href);

const looksLikePhone = (text: string) => /^[\d\s+().-]+$/.test(text);

/**
 * O número do WhatsApp nunca aparece no site (pedido da Luísa): o link leva
 * para a conversa e, se o texto no painel for o número, vira "Enviar mensagem".
 */
export const hidePhone = (item: Link): Link =>
  isWhatsApp(item.href) && (!item.label.trim() || looksLikePhone(item.label)) ? { ...item, label: "Enviar mensagem" } : item;
