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

No painel, em **`/studio`** (ex.: luisabandos-site.vercel.app/studio), com login do Sanity:

- **Fotos por categoria**: arraste várias fotos de uma vez, mude a ordem arrastando, clique numa foto para editar nome, lugar, data e marcar **Mostrar na home**.
- **Home**, **Página Projetos**, **Página Sobre mim** e **Contato e informações gerais**: todos os textos.

Depois de **Publicar**, o site atualiza sozinho em até 1 minuto. Detalhes técnicos em `docs/CMS.md`.

Os arquivos em `src/content/` (textos, `photos.ts` e `images/`) são o conteúdo de antes do painel. Eles servem para o botão **Importar** do painel e como reserva para uma página que ainda não existe lá.

## Páginas

| Endereço | Página |
| --- | --- |
| `/` | Home |
| `/projetos` | Todas as fotos, com filtros por categoria |
| `/projetos/eventos` (e as outras categorias) | Projetos já filtrado. Dá para mandar o link direto para alguém |
| `/sobre` | Sobre mim |

Na tela cheia, uma foto aberta pela home mostra a **categoria** (com link para Projetos filtrado), o lugar e a data. Nas outras páginas mostra o nome, o lugar e a data. Uma categoria sem fotos some dos filtros sozinha.

**Padrão das fotos:** JPEG com o lado maior entre 2500 e 3000 px, perfil de cor sRGB. O CDN do Sanity gera sozinho as versões menores (WebP) para cada tela, a cor média e a miniatura borrada que aparecem enquanto a foto carrega.

Itens marcados com `PROVISÓRIO` ainda precisam de dado real: nomes/lugares/datas das fotos, e-mail, WhatsApp, links do Behance e LinkedIn, a bio e a trajetória do Sobre mim e as descrições das categorias (só a de Eventos veio do Figma).

## Google, compartilhamento e ícones

- Endereço oficial: `https://luisabandos.com` (`SITE_URL` em `src/lib/seo.ts`). Todas as páginas apontam para ele (canonical), mesmo abertas pelo endereço da Vercel.
- No painel, **Contato e informações gerais → Google e compartilhamento**: título e descrição do Google, a **imagem de compartilhamento** (WhatsApp, redes; vazio = primeira foto do topo) e o código de verificação do Google Search Console. A página de uma categoria usa a primeira foto dela na prévia.
- `luisabandos.com/sitemap.xml` lista as páginas e as fotos (Google Imagens); `robots.txt` deixa o painel fora do Google.
- Home e Sobre mim levam a ficha da Luísa para o Google (dados estruturados `Person`, com o Instagram e os outros perfis dos links do site).
- Favicon e ícones: `src/app/favicon.ico`, `icon.svg`, `apple-icon.png` e `public/icon-*.png` (manifesto em `src/app/manifest.ts`). "LB" na fonte do nome (Archivo ExtraBold) sobre preto.

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
2. **Add New → Project** e importar o repositório `luisabandos-site/luisabandos-site` do GitHub.
3. A Vercel reconhece o Next.js sozinha; é só clicar em **Deploy**.
4. Para usar um domínio próprio: **Settings → Domains** no projeto.
