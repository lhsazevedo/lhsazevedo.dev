---
title: "Refreshing the new PHP.net navbar and search design"
lang: en
layout: post
date: 2024-11-10 23:45
image: /assets/images/php-navbar.png
headerImage: true
tag:
- open source
- ui/ux
- accessibility
- progressive enhancement
star: true
category: blog
author: lhs_azevedo
description: The process of designing and implementing the new PHP.net navbar and search UI.
---

## The need for a refresh
If you haven't visited [PHP.net](https://www.php.net) in a while, you might have
missed some recent facelifts. The most notable update was the new [release
page](https://www.php.net/releases/8.3) for PHP 8, launched in November 2020.
This refresh not only modernized the brand look but also does an excellent job
at showcasing what's new in PHP. Following there were two minor improvements:
the new home hero section[^1] and the thanks page also got some love[^2].

With those improvements, some other areas that had not been updated started to
feel a bit off, and one of them was the navigation bar and its search UI:

<figure class="bigger-image">
    <a
        target="_blank"
        href="/assets/images/2024-11-07-refreshing-the-php-navbar-design/previous.png"
    >
        <img
            alt="Previous PHP.net navbar screenshot"
            src="/assets/images/2024-11-07-refreshing-the-php-navbar-design/previous.png"
        >
    </a>
    <figcaption class="caption">Previous PHP.net navbar</figcaption>
</figure>

The previous navbar had three main issues:
1. **Contrast**: The light blue background made the white text hard to read,
   possibly explaining the choice of the back PHP logo.
2. **Search UX**: Search results were displayed in a scrollable dropdown divided
   into 5 categories, each one with its own scroll, creating a nested scrolling
   experience that made it challenging for users to navigate and find the
   desired result, particularly on mobile.
3. **Missing pages**: A significant number of manual page, especially in the
   Language Reference section, were missing from the search index. For example,
   searching for "types" would not list the [Language Reference >
   Types](https://www.php.net/manual/en/language.types.php) page. This is
   critical for new users that are not familiar with the language and
   documentation structure.

## Fresh but familiar
Back in 2022, discussions began within the community about what a potential
PHP.net redesign. [A new
design](https://github.com/php/web-php/pull/602#issuecomment-1207166889) was
proposed, sparkling interesting ideas and feedback from members. However, due to
the large scope of the proposal and conflicting schedules of the team members,
the discussion was put on hold.

Reaching consensus gets harder as the scope and number of people involved
increases. An alternative approach for these cases is to focus on smaller
incremental changes, and follow a [consent over
consensus](https://www.hoop.app/blog/choose-consent-over-consensus-for-better-decision-making)
method for decision-making.

With that in mind, I went ahead and decided to pick up a smaller component from
one of my iterations[^3] in the full redesign proposal that seemed to be well
received by the community, the navbar:

<figure class="bigger-image">
    <a
        target="_blank"
        href="/assets/images/2024-11-07-refreshing-the-php-navbar-design/new.png"
    >
        <img
            alt="New navbar design"
            src="/assets/images/2024-11-07-refreshing-the-php-navbar-design/new.png"
        >
    </a>
    <figcaption class="caption">New navbar design</figcaption>
</figure>

It became clear early on that redesigning the navbar without addressing the
search UX would create a mixed experience that would be perceived as worse than
the previous version. For this, I took inspiration from Algolia's DocSearch UI,
widely used in documentation sites nowadays. Here's the result:

<figure class="bigger-image">
    <a
        target="_blank"
        href="/assets/images/2024-11-07-refreshing-the-php-navbar-design/new-search.png"
    >
        <img
            alt="New search dialog"
            src="/assets/images/2024-11-07-refreshing-the-php-navbar-design/new-search.png"
        >
    </a>
    <figcaption class="caption">
        New search dialog design, inspired by Algolia's search
    </figcaption>
</figure>

## Paying off technical debt
The PHP.net front-end codebase has accumulated some technical debt over the
years. The stylesheets are based on Bootstrap 2 and it's float based responsive
grid system (remember the `.clearfix` era?) and make heavy use of nested rules
that complicates maintenance and reusability. On the JavaScript side, the
previous search UI was a custom JQuery plugin that used Twitter's
[typeahead.js](https://twitter.github.io/typeahead.js/) for autocomplete and
[Hogan.js](https://twitter.github.io/hogan.js/) for templating — both of which
are no longer maintained.

This presented an ideal opportunity to remove these dependencies from the
navbar, making it more maintainable and future-proof. The markup was rewritten
from scratch using the Bootstrap 5 offcanvas navigation component as a base
reference. The styles now use current CSS features such as flexbox and CSS
variables, and follows the Block Element Modifier (BEM) methodology adopted in
previous contributions to avoid specificity issues and naming conflicts.

The existing search was implemented client-side using a JSON index of the manual
pages. While this may not be the best approach for a large site like PHP.net,
replacing it with a server-side implementation was beyond this proposal's scope.
Instead, I focused on removing the JQuery dependency in the existing search and
fixing the most critical issues[^4][^5] it had, which resulted in significant
short-term improvements with relatively minimal effort. The new interactive UI
was implemented using vanilla JavaScript with accessibility and progressive
enhancement in mind, as we'll see in the next sections.

## Progressive enhancement
This was an interesting requirement that I hadn't anticipated: both the mobile
navigation and the search should work even if JS is disabled or fails to load.
Admittedly, this wasn't something I fully considered before, and while one may
think that this is a rare scenario, it's actually not. JavaScript, unlike HTML,
is not fault-tolerant, and errors or network issues can critical features that
rely exclusively on it.

Surprisingly, many major programming language sites currently require JavaScript
for essential functions like mobile navigation and search. As of this writing,
sites such as [Kotlin](https://kotlinlang.org/docs/home.html),
[Rust](https://doc.rust-lang.org/book/),
[Swift](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/),
[MDN](developer.mozilla.org) and [Dart](https://dart.dev/) all require
JS for one or both of these functions. This dependency is also common in
most Algolia's DocSearch powered documentation and sites using the MkDocs
default theme.

A simple solution to this problem is to use progressive enhancement. This
strategy emphasizes fault tolerant web technologies like HTML and CSS to provide
a baseline implementation, and use JavaScript to enhance the experience. This
approach ensures accessibility across devices and network conditions, while
still offering a more interactive and dynamic experience when possible. The
[GOV.UK](https://gov.uk/) website is an excellent example of this practice and
served as reference for our implementation.

## Accessibility
Accessibility was another area I've been wanting to get more involved with, and
this contribution was really a great opportunity to do so. Implementing the ARIA
roles and attributes correctly, ensuring focus indication and management, and
making the new features keyboard accessible were definitely fun tasks. Recently,
I had the chance to experiment Playwright for testing, and it was reassuring to
find that the codebase already had some visual regression tests in place. So new
end-to-end tests were added using Playwright's emphasis on semantic HTML, roles
and ARIA attributes to ensure the new UI remains accessible.

## Conclusion
Redesigning and implementing the PHP.net navbar and search UI was both an
interesting and rewarding experience. With the valuable review and feedback from
the active maintainers I was able to polish the design, improve the user
experience, address technical debt and enhance accessibility while still keeping
it familiar to the visitors in a way that some of them might not even notice the
changes at all.

There are still a lot of areas that can be improved in the PHP.net site,
especially in the documentation section. So, if you are looking for a way to
contribute to open source and/or improve your design and development skills,
this is a great opportunity. Just remember to keep the scope small and focused,
discuss your ideas with the community and maintainers before starting the work,
and be open to feedback and suggestions while resolving objections over
opinions.

## Notes

[^1]: [PR: Improve homepage hero design](https://github.com/php/web-php/pull/459)
[^2]: [PR: Modernize top half of Thanks page](https://github.com/php/web-php/pull/684)
[^3]: [Conservative redesign approach](https://github.com/php/web-php/pull/602#issuecomment-1207166889)
[^4]: [PR: Improve search index generation for PHP.net](https://github.com/php/phd/pull/154)
[^5]: [PR: Fix search index for entries without parent book](https://github.com/php/phd/pull/160)
