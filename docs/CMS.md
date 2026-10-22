# Plugando um CMS (ex.: Sanity)

O site lê todo o conteúdo por uma única função: `getSiteContent()` em
`src/lib/content.ts`. Ela devolve um objeto `SiteContent` (tipos em
`src/content/types.ts`). Para trocar os arquivos locais por um CMS, basta
fazer essa função buscar os dados no CMS e devolver o mesmo formato;
nenhum componente precisa mudar.

## Mapeamento sugerido de documentos

| Tipo no CMS | Campos | Usado em |
| --- | --- | --- |
| `photo` | imagem, `title` (nome), `location` (lugar), `date`, `alt` | Galeria, retrato, hover dos serviços, tela cheia |
| `service` | `title`, `slug`, `tags[]`, `preview` (2 fotos), `href` | "O que eu faço" |
| `home` (singleton) | hero (nome, foto, funções, redes), sobre (manifesto, bio, cidade, retrato), projetos (lista ordenada de fotos), serviços (lista), contato, rodapé | Página inicial |

No Sanity, a imagem já traz largura, altura, cor média e miniatura borrada
(`asset->metadata.dimensions`, `asset->metadata.palette.dominant.background` e
`asset->metadata.lqip`), que viram `width`, `height`, `color` e `blur` do tipo `Photo`.

## Passos

1. Criar o projeto no Sanity e o Studio (pode ficar em `/studio` neste mesmo app).
2. Liberar `cdn.sanity.io` em `images.remotePatterns` no `next.config.ts`.
3. Reescrever `getSiteContent()` com uma consulta GROQ.
4. Configurar revalidação (webhook do Sanity → `revalidatePath("/")`) para o site atualizar ao publicar.
