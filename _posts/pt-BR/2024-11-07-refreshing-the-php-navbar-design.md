---
title: "Renovando a barra de navegação e busca do PHP.net"
lang: pt-BR
layout: post
date: 2024-11-10 23:45
image: /assets/images/php-navbar.png
headerImage: true
tag:
- open source
- ui/ux
- acessibilidade
- melhoria progressiva
star: true
category: blog
author: lhs_azevedo
description: O processo de design e implementação da nova barra de navegação e interface de busca do PHP.net.
---

## A necessidade de renovação
Se faz um tempo que você não visita o [PHP.net](https://www.php.net), talvez
tenha perdido alguns ajustes estéticos recentes. A mudança mais notável foi a
nova [página de lançamentos](https://www.php.net/releases/8.3) para o PHP 8,
lançada em novembro de 2020. Esse redesign não só modernizou a identidade visual
da marca, mas também fez um excelente trabalho em apresentar o que há de novo no
PHP. Em seguida, outras duas páginas também receberam um pouco de atenção: a
[nova seção principal da home](https://github.com/php/web-php/pull/459) e a
[página de agradecimentos](https://github.com/php/web-php/pull/684).

Com essas melhorias, outras áreas do site que ainda não tinham sido renovadas
começaram a se destacar, e uma delas foi a barra de navegação e sua interface de
busca:

<figure class="bigger-image">
    <a
        target="_blank"
        href="/assets/images/2024-11-07-refreshing-the-php-navbar-design/previous.png"
    >
        <img
            alt="Captura de tela da navbar anterior do PHP.net"
            src="/assets/images/2024-11-07-refreshing-the-php-navbar-design/previous.png"
        >
    </a>
    <figcaption class="caption">Navbar anterior do PHP.net</figcaption>
</figure>

A navbar anterior tinha três problemas principais:
1. **Contraste**: O fundo azul claro tornava o texto branco difícil de ler, o
   que talvez explique a escolha do logo preto do PHP.
2. **UX de busca**: Os resultados da busca eram exibidos em um dropdown dividido
   em 5 categorias, cada uma com sua própria rolagem, criando uma experiência de
   rolagem aninhada que dificultava a navegação e a localização do resultado
   desejado, especialmente em dispositivos móveis.
3. **Páginas ausentes**: Muitas páginas do manual, especialmente da seção de
   Referência de Linguagem, não estavam sendo indexadas corretamente. Por
   exemplo, buscar por "types" não exibia a página de [Language Reference >
   Types](https://www.php.net/manual/en/language.types.php). Isso é crítico para
   novos usuários que ainda estão aprendendo os básicos da linguágem ou não
   estão familiarizados com a estrutura documentação.

## Uma abordagem incremental
Em 2022, começaram discussões na comunidade sobre um potencial redesign do
PHP.net. [Um novo
design](https://github.com/php/web-php/pull/602#issuecomment-1207166889) foi
proposto, trazendo ideias e feedback interessantes da comunidade. Contudo,
devido ao escopo extenso e conflitos de agenda dos membros, a discussão não
avançou muito.

No processo de tomada de decisões em grupo, atingir um consenso fica cada vez
mais difícil conforme o escopo e o número de pessoas envolvidas aumentam. Uma
abordagem alternativa para esses casos é focar em mudanças incrementais menores
e seguir o método de consentimento ao invés de consenso para a tomada de
decisões[^con1][^con2].

Seguindo esses princípios, concluí que começar com um componente menor seria uma
ideia melhor. Escolhi um de [uma iteração
minha](https://github.com/php/web-php/pull/602#issuecomment-1207166889) na
proposta de redesign completo que pareceu ter sido bem recebido pela comunidade:
a barra de navegação.

<figure class="bigger-image">
    <a
        target="_blank"
        href="/assets/images/2024-11-07-refreshing-the-php-navbar-design/pt-BR/new.png"
    >
        <img
            alt="Novo design da navbar"
            src="/assets/images/2024-11-07-refreshing-the-php-navbar-design/pt-BR/new.png"
        >
    </a>
    <figcaption class="caption">
        Novo design da navbar (clique para ampliar)
    </figcaption>
</figure>

Desde o início, ficou claro que redesenhar a navbar sem abordar a busca criaria
uma experiência mista que poderia ser percebida como pior que a versão anterior.
Para isso, me inspirei na interface do DocSearch da Algolia, amplamente usada em
sites de documentação atualmente. Aqui está o resultado:

<figure class="bigger-image">
    <a
        target="_blank"
        href="/assets/images/2024-11-07-refreshing-the-php-navbar-design/pt-BR/new-search.png"
    >
        <img
            alt="Novo diálogo de busca"
            src="/assets/images/2024-11-07-refreshing-the-php-navbar-design/pt-BR/new-search.png"
        >
    </a>
    <figcaption class="caption">
        Novo design do diálogo de busca
    </figcaption>
</figure>

## Quitando a dívida técnica
O código front-end do PHP.net acumulou uma certa dívida técnica ao longo dos
anos. As folhas de estilo CSS são baseadas no Bootstrap 2 e seu sistema de
responsivo baseado em floats (lembra da era `.clearfix`?), e fazem uso intenso
de regras aninhadas, o que complica a manutenção e a reutilização. No lado do
JavaScript, a interface de busca anterior era um plugin JQuery customizado que
usava o [typeahead.js](https://twitter.github.io/typeahead.js/) do Twitter para
autocomplete e o [Hogan.js](https://twitter.github.io/hogan.js/) para templates,
ambos descontinuados.

Isso se mostrou uma oportunidade ideal para remover essas dependências da
navbar, tornando-a mais fácil de manter e pronta para o futuro. O markup foi
reescrito do zero, usando o componente de navegação offcanvas do Bootstrap 5
como referência. Os estilos agora utilizam recursos modernos de CSS, como
flexbox e variáveis, e seguem a metodologia Block Element Modifier (BEM) adotada
em contribuições anteriores para evitar problemas com conflitos e
especificidade.

A busca existente foi implementada no lado do cliente usando um índice JSON das
páginas do manual. Embora essa talvez não seja a melhor abordagem para um site
grande como o PHP.net, substituir por uma implementação no servidor estaria além
do escopo desta proposta. Em vez disso, foquei em remover a dependência do
JQuery e corrigir os problemas mais críticos[^3][^4], o que resultou em
melhorias significativas no curto prazo com esforço relativamente mínimo. A nova
interface foi implementada usando JavaScript puro, com acessibilidade e melhoria
progressiva em mente, como veremos nas próximas seções.

## Melhoria progressiva
Este foi um requisito bem interessante que eu não havia previsto: tanto a
navegação mobile quanto a busca devem funcionar mesmo que o JavaScript esteja
desativado ou falhe ao carregar. Admito que isso não era algo em que eu tinha
pensado antes, e embora alguém possa pensar que isso é raro, na verdade, não é.
Diferente do HTML, o JavaScript não é tolerante a falhas, e erros ou problemas
de rede podem impactar funções críticas que dependem exclusivamente dele.

Surpreendentemente, muitos sites de grandes linguagens de programação exigem
JavaScript para funções essenciais como navegação mobile e busca. No momento,
sites como [Kotlin](https://kotlinlang.org/docs/home.html),
[Rust](https://doc.rust-lang.org/book/),
[Swift](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/),
[MDN](developer.mozilla.org) e [Dart](https://dart.dev/) exigem JS para uma ou
ambas as funções. Essa dependência também é comum em muitos sites com DocSearch
da Algolia e sites usando o tema padrão do MkDocs.

Uma solução simples para esse problema é usar melhoria progressiva. Essa
estratégia recomenda o uso de tecnologias tolerantes a falhas como HTML e CSS
para fornecer uma implementação base, e só então usar JavaScript para aprimorar
a experiência. Essa abordagem garante acessibilidade em vários dispositivos e
condições de rede, enquanto ainda oferece uma experiência mais interativa e
dinâmica quando possível. O site [GOV.UK](https://gov.uk/) é um excelente
exemplo dessa prática e serviu como referência para nossa implementação.

## Acessibilidade
A acessibilidade foi outra área em que eu queria me aprofundar, e essa
contribuição foi uma ótima oportunidade para isso. Implementar os atributos e
roles ARIA corretamente, garantir a indicação e o gerenciamento de foco, e
tornar os novos recursos acessíveis pelo teclado definitivamente foram tarefas
divertidas. Recentemente, tive a chance de experimentar o Playwright para
testes, e foi reconfortante descobrir que o código já tinha alguns testes de
regressão visual. Assim, novos testes de ponta a ponta foram adicionados, usando
a ênfase do Playwright em HTML semântico para garantir que a nova interface
permaneça acessível.

## Conclusão
Redesenhar e implementar a navbar e a interface de busca do PHP.net foi uma
experiência interessante e gratificante. Com a valiosa revisão e feedback dos
mantenedores ativos, consegui aprimorar o design, melhorar a experiência do
usuário, lidar com a dívida técnica e aprimorar a acessibilidade, mas ainda
mantendo-a familiar para os visitantes.

Fico feliz em compartilhar que o PR que eu propus e implementei foi aceito, e a
nova navbar está no ar em [PHP.net](https://www.php.net). Mas ainda há muito a
melhorado, especialmente na seção de documentação. Se você está procurando uma
forma de contribuir para o open source e/ou melhorar suas habilidades de design
e desenvolvimento, essa é uma ótima oportunidade. Apenas lembre-se de manter o
escopo pequeno e focado, discutir suas ideias com a comunidade antes de iniciar
o trabalho, e estar aberto a feedback e sugestões enquanto foca os esforços em
integrar as objeções.

## Notas

[^con1]: [Choose Consent Over Consensus For Better Decision Making](https://www.hoop.app/blog/choose-consent-over-consensus-for-better-decision-making)
[^con2]: [Tomada de decisão por consentimento](https://www.sociocracyforall.org/pt-br/tomada-de-decisao-por-consentimento/)
[^3]: [PR: Melhora geração de índice de busca para PHP.net](https://github.com/php/phd/pull/154)
[^4]: [PR: Corrige índice para páginas sem livro pai](https://github.com/php/phd/pull/160)
