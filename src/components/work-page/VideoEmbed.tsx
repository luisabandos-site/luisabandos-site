import styles from "./WorkPage.module.css";

/**
 * Link do YouTube ou do Vimeo → endereço do player. O do YouTube é a versão
 * sem cookies. Link que não é de nenhum dos dois devolve undefined.
 */
export function playerUrl(url: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }
  const host = parsed.hostname.replace(/^www\.|^m\./, "");
  const path = parsed.pathname.split("/").filter(Boolean);

  if (host === "youtu.be" && path[0]) return `https://www.youtube-nocookie.com/embed/${path[0]}`;
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const id = parsed.searchParams.get("v") ?? (["embed", "shorts", "live"].includes(path[0]) ? path[1] : undefined);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const [id, hash] = path.filter((part) => part !== "video");
    if (!id || !/^\d+$/.test(id)) return undefined;
    const privateHash = hash ?? parsed.searchParams.get("h");
    return `https://player.vimeo.com/video/${id}${privateHash ? `?h=${privateHash}` : ""}`;
  }
  return undefined;
}

/** Vídeo do projeto ou filme, em 16:9, carregado só quando chega perto da tela. */
export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const src = playerUrl(url);
  if (!src) {
    return (
      <p className={styles.videoFallback}>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Assistir ao vídeo
        </a>
      </p>
    );
  }
  return (
    <div className={styles.video}>
      <iframe
        src={src}
        title={`Vídeo: ${title}`}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
