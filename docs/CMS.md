# Painel de edição (Sanity)

O conteúdo do site é editado no Sanity Studio, que roda dentro deste mesmo
app em `/studio` (`src/app/studio`). Projeto `l0zuihns`, dataset `production`
(público). O ID fica em `src/sanity/env.ts` e pode ser trocado pelas variáveis
`NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`.

## Como o site lê o conteúdo

`getSiteContent()` (`src/lib/content.ts`) faz uma consulta GROQ só
(`src/lib/sanity/query.ts`) e converte o resultado para `SiteContent`
(`src/lib/sanity/map.ts`). Nenhum componente fala com o Sanity.

- **Atualização:** a consulta é guardada em cache por 60 s (`REVALIDATE`).
  Depois de publicar, o site mostra a mudança em até 1 minuto.
- **Reserva:** uma página única que ainda não existe no painel usa o conteúdo
  local de `src/content`. Se o Sanity estiver fora do ar, a leitura falha e a
  Vercel continua servindo a última versão boa.
- **Fotos:** vêm do CDN do Sanity com o loader de `src/lib/sanity/image.ts`
  (largura e qualidade pedidas pelo `<Image>`, sempre WebP). Recorte do painel vira `rect`, o ponto de
  foco (hotspot) vira `focus`, `metadata.lqip` vira a prévia borrada e
  `palette.dominant` a cor de fundo. Sem data no painel, usa a data EXIF.

## Modelo (`src/sanity/schemas`)

| Tipo | O que é |
| --- | --- |
| `category` | Categoria: nome, endereço (slug), posição, descrição, palavras de "O que eu faço" e as fotos (`photo[]`, na ordem da galeria) |
| `photo` | Imagem com nome, lugar, data, texto alternativo e `showOnHome` |
| `home` | Topo (nome, fotos que trocam, funções, redes), Sobre mim, rótulos de Projetos e de "O que eu faço" |
| `projectsPage` / `aboutPage` / `settings` | Textos de Projetos, Sobre mim, contato, rodapé, menu e SEO |

`home`, `projectsPage`, `aboutPage` e `settings` são documentos únicos (o id é
o próprio nome do tipo). A galeria da home são as fotos com `showOnHome`; a
lista "Todos" de Projetos mistura as categorias espalhando cada uma por igual
(`mix` em `map.ts`); o hover de "O que eu faço" usa as 2 primeiras fotos de cada
categoria.

## Importação inicial

A ferramenta **Importar** do painel (`src/sanity/import`) envia as fotos de
`src/content/images` e cria os documentos a partir de `src/content/site.ts`.
Pode rodar de novo: fotos já enviadas (mesmo nome de arquivo) não sobem outra
vez e documentos existentes não são trocados.

## Testar sem o Sanity

`SANITY_TEST_API_HOST` aponta a leitura para um servidor local que responda
como a API do Sanity (`/v<data>/data/query/<dataset>`), útil para testar com
dados de mentira.

## Acesso

- Pessoas: sanity.io/manage → projeto → Members.
- O endereço do site precisa estar em sanity.io/manage → API → CORS origins,
  com "Allow credentials", para o login do painel funcionar. Um domínio novo
  precisa ser adicionado lá também.
