/** Dados estruturados para o Google (não aparecem na página). */
export function JsonLd({ data }: { data: object }) {
  // "<" escapado para o texto nunca fechar a tag <script> antes da hora.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
