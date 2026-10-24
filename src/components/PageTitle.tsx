import styles from "./PageTitle.module.css";

type Props = {
  title: string;
  /** Linha embaixo do título, ex.: a função da Luísa num filme. */
  subtitle?: string;
  /** Número em sobrescrito ao lado do título, ex.: (70). */
  count?: number;
  /** Texto à direita do título. */
  children?: React.ReactNode;
  /** Alinhamento do texto à direita (no celular ele vai para baixo do título). */
  align?: "left" | "right";
  /** Deixa o título quebrar linha (nomes compridos, como os de projetos e filmes). */
  wrap?: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** A partir daqui, um título que quebra linha fica menor para não ocupar a tela toda. */
const LONG_TITLE = 16;

const longestWord = (title: string) => Math.max(...title.split(/\s+/).map((word) => word.length));

/** Topo das páginas internas: título gigante, texto ao lado e divisória. */
export function PageTitle({ title, subtitle, count, children, align = "left", wrap }: Props) {
  return (
    <div className={styles.root}>
      <div>
        <h1
          className={styles.title}
          data-wrap={wrap || undefined}
          data-long={(wrap && title.length > LONG_TITLE) || undefined}
          style={wrap ? ({ "--longest-word": longestWord(title) } as React.CSSProperties) : undefined}
        >
          {title}
          {count !== undefined && <span className={styles.count}>({pad(count)})</span>}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {children && (
        <div className={styles.aside} data-align={align}>
          {children}
        </div>
      )}
    </div>
  );
}
