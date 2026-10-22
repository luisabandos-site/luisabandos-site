# Plugando um CMS (ex.: Sanity)

O site lê todo o conteúdo por uma única função: `getSiteContent()` em
`src/lib/content.ts`. Ela devolve um objeto `SiteContent` (tipos em
`src/content/types.ts`). Para trocar os arquivos locais por um CMS, basta
fazer essa função buscar os dados no CMS e devolver o mesmo formato;
nenhum componente precisa mudar.

## Mapeamento sugerido de documentos

| Tipo no CMS | Campos | Usado em |
| --- | --- | --- |
| `photo` | imagem, `title` (nome), `location` (lugar), `date`, `alt`, `category` (referência) | Galerias, retrato, hover dos serviços, tela cheia |
| `category` | `title`, `slug`, `description` | Filtros da página Projetos (`/projetos/<slug>`) e legenda da tela cheia na home |
| `service` | `title`, `slug`, `tags[]`, `preview` (2 fotos), `href` | "O que eu faço" |
| `home` (singleton) | hero (nome, fotos que trocam em loop, funções, redes), sobre (manifesto, bio, cidade, retrato), projetos (lista ordenada de fotos), serviços (lista), contato, rodapé | Página inicial |
| `projectsPage` (singleton) | título, descrição, textos dos botões, ordem das categorias, lista ordenada de todas as fotos | `/projetos` |
| `aboutPage` (singleton) | título, cidade, frase (trecho entre `*` em itálico), bio, retrato, funções, trajetória por ano | `/sobre` |

No Sanity, a imagem já traz largura, altura, cor média e miniatura borrada
(`asset->metadata.dimensions`, `asset->metadata.palette.dominant.background` e
`asset->metadata.lqip`), que viram `width`, `height`, `color` e `blur` do tipo `Photo`.
O hotspot da imagem (`hotspot.x`/`hotspot.y`) vira `focus` (ex.: `"54% 90%"`), o ponto
que fica à vista quando a foto é cortada para caber na tela.

## Passos

1. Criar o projeto no Sanity e o Studio (pode ficar em `/studio` neste mesmo app).
2. Liberar `cdn.sanity.io` em `images.remotePatterns` no `next.config.ts`.
3. Reescrever `getSiteContent()` com uma consulta GROQ.
4. Configurar revalidação (webhook do Sanity → `revalidatePath("/", "layout")`) para o site inteiro atualizar ao publicar.
