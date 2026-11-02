# JABRI SERVIÇOS — Website institucional

Site One Page responsivo, em português brasileiro, com formulário de orçamento que prepara uma mensagem para o WhatsApp e suporte PWA básico.

## Requisitos

- Navegador moderno.
- Git instalado (opcional, para publicação).
- Conta GitHub para usar GitHub Pages.

## Executar localmente

O Service Worker e a instalação PWA exigem HTTP/HTTPS (não funcionam corretamente abrindo o HTML diretamente como `file://`).

Com Python instalado, na pasta do projeto execute:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `jabri-servicos`.
2. Envie todos os arquivos e pastas deste projeto para a raiz do repositório.
3. No GitHub, acesse **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)` e salve.
6. Aguarde a publicação e abra a URL indicada pelo GitHub.

### Ajustes obrigatórios antes de publicar

- Substitua `SEU-USUARIO` e `SEU-REPOSITORIO` em `robots.txt` e `sitemap.xml` pela URL real do GitHub Pages.
- Depois de publicar, adicione a tag `rel=canonical` em `index.html` apontando para a URL final. Não há canonical pré-preenchida para evitar indexar um endereço fictício.
- Se usar domínio próprio, atualize a URL canônica, sitemap e configuração de domínio.
- Confira visualmente o recorte do logotipo e a imagem ilustrativa do hero em diferentes telas.

## WhatsApp

O número usado no link de contato e no formulário é `5548991879755`. O formulário não envia dados para um servidor: ele valida os campos no navegador, monta uma mensagem e abre o WhatsApp. O visitante precisa revisar e enviar a mensagem manualmente. Fotos devem ser anexadas pelo visitante diretamente na conversa.

## PWA e modo offline

O manifesto e o Service Worker permitem instalar o site em navegadores compatíveis e armazenar em cache o núcleo da página. A navegação e os recursos locais já armazenados podem abrir offline. O formulário não consegue enviar solicitações sem conexão; o envio ao WhatsApp depende de internet. Fontes externas também podem não estar disponíveis offline.

## Privacidade

Este projeto não possui banco de dados, analytics, cadastro ou armazenamento próprio de solicitações. Os dados preenchidos permanecem no navegador até a navegação/fechamento e são inseridos na mensagem que o cliente escolhe enviar pelo WhatsApp. O link de privacidade no rodapé abre o e-mail da empresa para contato; recomenda-se publicar uma política LGPD completa antes do lançamento público.

## Limitações e itens pendentes

- Não há painel administrativo nem recebimento automático de pedidos.
- Não há upload de imagens para servidor; anexos são enviados pelo cliente no WhatsApp.
- As avaliações e a galeria real não foram inventadas; a seção de portfólio está marcada como espaço reservado.
- A imagem do profissional é identificada como ilustrativa.
- Atualize os links canônicos e sitemap após definir a URL final.
- Configure domínio próprio e HTTPS se desejado.

## Testes locais sugeridos

- Enviar formulário com dados válidos e verificar o texto e o número no WhatsApp.
- Tentar enviar sem preencher campos obrigatórios.
- Selecionar múltiplas categorias e adicionar/remover detalhes.
- Testar menu mobile, links âncora e botões de contato.
- Em DevTools → Application, verificar Manifest, Service Worker e Cache Storage.
- Simular offline após primeira visita e confirmar abertura da página em cache.
