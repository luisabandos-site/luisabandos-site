/** "Trabalho onde tem *gente, luz*: palcos" → o trecho entre asteriscos em itálico. */
export function withEmphasis(text: string) {
  return text.split("*").map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}
