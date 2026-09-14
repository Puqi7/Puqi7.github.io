# Portfolio maintenance

The site remains Jekyll / AcademicPages. Main pages use `_layouts/portfolio.html` and `assets/css/portfolio.scss`. Individual publication pages and older academic history preserve their existing routes and templates. Source Sans 3 is loaded from Google Fonts with display=swap and also applies to legacy pages through `_sass/_themes.scss`. Purple is the owner's selected accent. No frontend framework, JavaScript dependency, or font binary was added.

## Page structure

- Homepage: `_pages/about.md`. It opens with the Ph.D. affiliation and advisor, followed by a direct statement about interactive multi-robot systems around human attention. The proposed question hook and the homepage graduation line were removed at the owner’s request. Research Directions is a four-stage interactive arc, followed by a compact scrollable public News list and two illustrated Selected Publications. Six small interest labels sit to the right of the name, including on phones: Human–Robot Interaction, Multi-Robot Systems, Robot Autonomy, Human–Computer Interaction, Human Attention, and High-Stakes. All six interests are always visible beside the name. Desktop and tablet layouts use two rows of three: Human–Robot Interaction / Multi-Robot Systems / Robot Autonomy, followed by Human–Computer Interaction / Human Attention / High-Stakes. Phones retain the same order in a compact column. Labels use 12px resting text. A purple emphasis layer sweeps from left to right across each label while it enlarges by 20%, then settles back to the smaller size. The six-item sequence continuously repeats every 8.4 seconds. At the owner’s request, no playback controls are rendered; system reduced-motion preferences stop the animation while keeping all labels visible. Reduced motion, disabled CSS animation, and disabled JavaScript all preserve the complete list. The original text is never hidden; duplicate visual emphasis layers are excluded from the accessibility tree. The homepage-only script is `assets/js/research-interests.js`; no animation library is used. Reduced padding and paragraph spacing keep the introduction compact. The desktop portrait and introduction panel have matching top and bottom edges; the right-aligned image preserves the person and shoulder robot. On narrower screens the portrait returns to its natural aspect ratio beside the affiliation paragraph.
- Directions: `_data/research_directions.yml` and `_includes/research-directions.html`. Each flow step (Understand, Model, Design, Deploy) is itself a native disclosure. Public work uses a `public_work` list that references existing publication URLs; only explicitly public publication records resolve, and the venue is reused from the record. General ongoing work uses a separate `review_work` list of broad descriptions. Status belongs to each work item, not to the whole stage. Understand includes Attune (UIST 2026); Deploy includes the public CHI 2026 work alongside a separate generic review entry. There is no second direction list or introductory paragraph beneath the section heading. Model also lists Theia under Earlier work; Design lists collaborative VR learning and Volumivive. These references use the same public-record filter and explicitly describe their earlier MR/VR contexts. MuV2 and M5 remain in All Publications. The merged `/publications/` page reuses this component at the top. `/research/` now redirects to `/publications/`, including in local preview and with JavaScript disabled.
- Selected Publications: `_includes/selected-publications.html`; the two public publication records supply images, full official titles, authors, venues, summaries, and links.
- All Publications: `_pages/publications.html` and `_includes/publication-entry.html`. The page opens with Research Directions, then all seven public entries. Each row has a small teaser at the left and venue, title, authors, and links at the right. On phones the teaser stays beside the title, with authors and links spanning the row below. See [publication-images.md](publication-images.md) for public image provenance.
- About: `_pages/bio.md`, at `/about/`; `/about.html` redirects here. The homepage remains `/`.
- News: the homepage shows all five dated, explicitly public posts in a compact scrollable region between Research Directions and Selected Publications. Native scrolling works with pointer, touch, and keyboard, without JavaScript or automatic motion. The region has a visible scrollbar, accessible name, and keyboard focus style. The original PAPERS and AWARDS category badges appear on both home and archive entries; the blue and green label text has sufficient contrast. `_pages/news.html`, at `/news/`, retains all five public posts and is linked through All news, the footer, and About.
- CV: `_pages/cv.md`, at `/cv/`, retaining the sanitized `/files/cv.pdf`.
- Navigation: `_data/navigation.yml`. The order is About, Publications, CV. Research and Publications are merged into one destination. About is the first item and links to `/`, where the personal introduction appears. Navigation loads documents, with the current page marked; it does not scroll through homepage sections. The existing `/about/` bio URL remains available.

Links have visible hover, press, and keyboard focus states. Publication images explicitly show “View project”. `_includes/publication-destination.html` resolves image/title and research-flow links to an existing project, otherwise the available paper/DOI, with the original internal record as a fallback. The original publication routes remain intact. This avoids a detour through the old template before opening the actual project. Paper/DOI action links retain their specific destinations. Direction summaries have plus/minus controls below their topic on desktop, separated from the arrows between stages. On phones the control sits to the right of the stacked stage/topic text. Pale purple brush underlines highlight selected topic words, configured through each direction’s `emphasis` list; the hero uses the same treatment. These marks use CSS and leave the text readable without color. Disclosures work with pointer, keyboard, and JavaScript disabled. Reduced motion is respected. No custom page transitions or scrolling script is used.

## Pets

`_data/pets.yml` is currently empty because names and photos have not yet been provided. `_includes/pets.html` supports a photo gallery on About. `_includes/header-pets.html` supports transparent cutouts below the Puqi Zhou header, each linking to the pet section on About. Only actual owner-provided images may be added; no invented animals or placeholder photos are rendered.

## Assets and links

Portrait WebP derivatives reuse `images/profile.jpg`. The Attune interface is Figure 4 of the existing public paper at https://ari-lab-gmu.github.io/Attune_UIST26/static/pdfs/paper.pdf. The ground-robot photo is from Figure 1 of the public CHI paper at https://arxiv.org/abs/2602.08882. Optimized images were reused from the earlier local redesign backup. No synthetic research imagery was used.

The original Attune DOI returned 404 in the previous link check, so curated entries use its public paper and project links; the DOI remains recorded. Other ACM endpoints may reject automated clients with 403. The legacy LinkedIn link now handles the original full URL correctly.

## Public-content controls

Publications and news default to `published: false`; only explicitly public records opt in. Private static PDFs and images must stay outside public source folders. `local/`, `docs/`, `scripts/`, and `tests/` are excluded from builds. Do not build production with `--unpublished` or `--drafts`.

The owner subsequently requested a generic review-status label on broad research directions. `show_direction_review_status` in `_config.yml` controls these badges. This is permission to display only a general status and a broad sentence, not project names, paper titles, venues, methods, results, or imagery. The generated homepage and publications page each contain three such badges, on the general review entries within Model, Design, and Deploy. Published works do not receive review-status badges. Collapsing a disclosure is not a privacy mechanism: its text is present in the page source.

The audit remains strict by default. `--allow-direction-status` permits only the exact badge markup on the home/publications pages, up to three per page. It does not permit review status in metadata, feeds, PDFs, other pages, or arbitrary prose. Identifying names and venue patterns remain blocked everywhere. Negative checks cover metadata, identifying names, arbitrary status prose, and excess badges.

The public CV retains the earlier removal of an identifying preprint entry and its PDF link annotations. The original is excluded in `local/private-originals/`. Previously deployed copies and Git history were not altered.

```sh
PATH=/opt/homebrew/opt/ruby@3.3/bin:$PATH bundle exec jekyll build --safe
python3 scripts/audit_public_site.py _site --allow-direction-status
```

## Preview and verification

Use Jekyll's built-in server so original extensionless publication URLs resolve correctly. A plain Python file server does not provide this routing.

```sh
PATH=/opt/homebrew/opt/ruby@3.3/bin:$PATH bundle exec jekyll serve --safe --host 127.0.0.1 --port 4000
```

Local preview: http://127.0.0.1:4000/ . Screenshots and browser reports are excluded in `local/qa/combined-publications/`. At 1440, 1024, and 390 px, both collapsed and expanded directions passed automated accessibility checks; extra overflow checks cover 320, 768, and 1280 px. Real clicks on both selected images and titles reached their existing external project pages directly with HTTP 200. All publications opens the merged research/publications page, with all seven illustrated entries. The original extensionless publication routes and CV still return HTTP 200. The homepage scrollable region and the News archive both retain five public items. Keyboard, no-JavaScript expansion, Source Sans 3, and the PDF response were checked. Headless Chrome reports its internal PDF viewer extension request as canceled when navigating away from CV; the CV file returns HTTP 200 and valid PDF data.

All original HTML/PDF routes remain present. The public audit checks 59 text files, seven PDFs, and all asset filenames, with only the six expressly permitted generic badges exempted.

Potential later refinements: higher-resolution public robot photography and short, captioned public project walkthroughs. Pet photo processing remains pending the owner's actual images.

The latest News/navigation update is verified in `local/qa/news-labels-and-about/`: labels at 1440, 1024, and 390 px, no overflow or News accessibility violations, and an actual click from News through the rightmost About link back to `/`.

The merged Publications page is verified in `local/qa/combined-publications/`: seven loaded teaser images with alt text, left-aligned thumbnails at 1440/1024/390 px, no overflow or automated accessibility findings, native keyboard and no-JavaScript disclosures, and the `/research/` redirect reaching `/publications/` in local preview. The privacy exception moved from Research to Publications; negative checks confirm identifying names, metadata, extra badges, and badges on the old redirect route remain blocked.

The attention-focused introduction and brush-marked Directions are verified in `local/qa/attention-and-directions/`. Home and Publications pass 1440/1024/390 px visual and automated accessibility checks; native expansion and the no-JavaScript route still work. No private research content changed.

The research-interest labels and native scrolling News region are verified in `local/qa/interests-and-scrollable-news/` at 1440/1024/390 px, with an additional 320 px check. All five public news items can be reached with keyboard scrolling, focus can leave the region, and scrolling works without JavaScript. Home and News archive checks passed with no horizontal overflow or automated accessibility findings. The owner preferred Human–Robot Interaction as the first interest label, so the additional Human-Centered Robotics badge was removed.

The name-side labels and uncropped shoulder-robot portrait are verified in `local/qa/name-and-portrait/`. Checks cover 320–1440 px, including the compact-hero breakpoint: labels remain beside the name with identical static styling, the portrait keeps the source image's aspect ratio, and there is no horizontal overflow. Desktop, laptop, and phone screenshots also passed automated accessibility checks with Source Sans 3 loaded.

The compact introduction and unboxed interests are verified in `local/qa/compact-aligned-hero/`: desktop panels align at 1024–1440 px, the person and shoulder robot remain visible in screenshots, and 320–1440 px checks find no horizontal overflow. The layout remains functional without JavaScript.

The ordered looping labels are verified in `local/qa/ordered-interests/` at 1440/1024/768/640/390/320 px. The two-row ordering and 20% enlargement were checked explicitly. Continuous frame checks through the second cycle confirm that all six labels remain visible, each enlarges in turn, and neither labels nor the hero overlap or shift. No playback button remains. Reduced motion, CSS-animation removal, and the no-JavaScript fallback preserve all six labels. Desktop panels stay aligned; screenshots and automated accessibility checks passed.
