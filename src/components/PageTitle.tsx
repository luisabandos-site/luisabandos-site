import styles from "./PageTitle.module.css";

type Props = {
  title: string;
  /** Número em sobrescrito ao lado do título, ex.: (70). */
  count?: number;
  /** Texto à direita do título. */
  children?: React.ReactNode;
  /** Alinhamento do texto à direita (no celular ele vai para baixo do título). */
  align?: "left" | "right";
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Topo das páginas internas: título gigante, texto ao lado e divisória. */
export function PageTitle({ title, count, children, align = "left" }: Props) {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        {title}
        {count !== undefined && <span className={styles.count}>({pad(count)})</span>}
      </h1>
      {children && (
        <div className={styles.aside} data-align={align}>
          {children}
        </div>
      )}
    </div>
  );
}
