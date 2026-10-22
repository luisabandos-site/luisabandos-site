# Luísa Bandos — site-portfólio

Site de fotografia da Luísa Bandos, feito em **Next.js** a partir do layout do Figma.

## Tecnologias

- **Next.js 16 (App Router) + React 19 + TypeScript**: base do site, gera páginas estáticas rápidas e otimiza as fotos automaticamente (AVIF/WebP, tamanhos certos para cada tela).
- **CSS Modules**: estilos de cada parte ficam junto do componente.
- **Motion**: animações (hover do "O que eu faço", tela cheia das fotos, entradas).
- **Lenis**: rolagem suave.
- **Fontes**: Archivo (texto e nome gigante, no lugar da PP Object Sans, que é paga) e Geist (rótulos).
- Pronto para publicar na **Vercel**.

## Onde editar textos e fotos

Por enquanto o conteúdo fica em arquivos simples:

| O quê | Arquivo |
| --- | --- |
| Textos da home, da página Projetos e da Sobre mim (inclusive a ordem das fotos em Projetos) | `src/content/site.ts` |
| Fotos (arquivo, nome, lugar, data, categoria, texto alternativo) | `src/content/photos.ts` |
| Categorias (nome, endereço e texto de cada filtro) | `src/content/categories.ts` |
| Arquivos das imagens | `src/content/images/` |

## Páginas

| Endereço | Página |
| --- | --- |
| `/` | Home |
| `/projetos` | Todas as fotos, com filtros por categoria |
| `/projetos/eventos` (e as outras categorias) | Projetos já filtrado. Dá para mandar o link direto para alguém |
| `/sobre` | Sobre mim |

Na tela cheia, uma foto aberta pela home mostra a **categoria** (com link para Projetos filtrado), o lugar e a data. Nas outras páginas mostra o nome, o lugar e a data. Uma categoria sem fotos some dos filtros sozinha.

Dá para editar direto pelo GitHub (botão de lápis no arquivo). Ao salvar na branch principal, a Vercel publica sozinha.

**Padrão das fotos:** JPEG com o lado maior em 3000 px, qualidade 90, perfil de cor sRGB. O site gera sozinho as versões menores (AVIF/WebP) para cada tela. Cada foto em `photos.ts` também guarda a cor média (`color`) e uma miniatura borrada (`blur`), que aparecem enquanto a foto carrega.

Itens marcados com `PROVISÓRIO` ainda precisam de dado real: nomes/lugares/datas das fotos, e-mail, WhatsApp, links do Behance e LinkedIn, o domínio, a bio e a trajetória do Sobre mim e as descrições das categorias (só a de Eventos veio do Figma).

O próximo passo planejado é um painel de edição (CMS, ex.: Sanity), para a Luísa trocar fotos e textos sem mexer em código. O site já foi estruturado para isso; veja `docs/CMS.md`.

## Rodar no computador

Precisa de Node.js 22.

```bash
npm install
npm run dev     # abre em http://localhost:3000
npm run build   # gera a versão de produção
npm run lint    # checa o código
```

## Publicar na Vercel

1. Entrar na conta da Vercel da Luísa.
2. **Add New → Project** e importar o repositório `lasanhaaa/luisabandos` do GitHub.
3. A Vercel reconhece o Next.js sozinha; é só clicar em **Deploy**.
4. Para usar um domínio próprio: **Settings → Domains** no projeto.
