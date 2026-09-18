# Portfolio maintenance

The site remains Jekyll / AcademicPages. Main pages use `_layouts/portfolio.html` and `assets/css/portfolio.scss`. Individual publication pages and older academic history preserve their existing routes and templates. Source Sans 3 is loaded from Google Fonts with display=swap and also applies to legacy pages through `_sass/_themes.scss`. Purple is the owner's selected accent. No frontend framework, JavaScript dependency, or font binary was added.

## Page structure

- Homepage: `_pages/about.md`. The hero introduces the GMU Ph.D. affiliation and David Porfirio, then connects human-centered multi-robot systems, attention and behavior models, adaptive interfaces, and shared autonomy. Four interest labels sit beside the name: Human–Robot Interaction, Multi-Robot Systems, Human Attention, and Shared Autonomy. Desktop/tablet use two rows of two; phones use a compact column. The existing purple sweep and 20% enlargement repeat over 5.6 seconds. Reduced motion and disabled JavaScript preserve all four labels. The hero links to CV, Google Scholar, GitHub, LinkedIn, and Email and retains Spring / Summer 2027 internship availability. The existing portrait, four-stage Research Directions, scrollable News, and two Selected Publications remain.
- Directions: `_data/research_directions.yml` and `_includes/research-directions.html`. Understand → Model → Design → Deploy distinguish observation of attention, attention prediction, adaptive interfaces/shared autonomy, and professional workflows. Each native disclosure includes a short objective. `public_work` and `earlier_work` reference explicitly public publication records. `current_work` contains the owner-provided descriptive titles and summaries, each labeled Current work. These topics do not create additional publication records. Home and Publications share this component, with compact topics for the sidebar.
- Selected Publications: `_includes/selected-publications.html`; the two public publication records supply images, full official titles, authors, venues, summaries, and links.
- All Publications: `_pages/publications.html` and `_includes/publication-entry.html`. Under the All Publications heading, a narrow left sidebar holds four compact Research Directions disclosures; all seven public entries start alongside it. Expanding a direction does not push the desktop publication list downward. At 900px and below, directions become four short rows above the papers. The shared directions include accepts `compact=true` and uses each record’s `compact_topic`; the homepage retains its full four-stage arc and topic wording. Each publication row has a small teaser at the left and venue, title, authors, and links at the right. On phones the teaser stays beside the title, with authors and links spanning the row below. See [publication-images.md](publication-images.md) for public image provenance.
- About: `_pages/bio.md`, at `/about/`; `/about.html` redirects here. The homepage remains `/`.
- News: the homepage shows all five dated, explicitly public posts in a compact scrollable region between Research Directions and Selected Publications. Native scrolling works with pointer, touch, and keyboard, without JavaScript or automatic motion. The region has a visible scrollbar, accessible name, and keyboard focus style. The original PAPERS and AWARDS category badges appear on both home and archive entries; the blue and green label text has sufficient contrast. `_pages/news.html`, at `/news/`, retains all five public posts and is linked through All news, the footer, and About.
- CV: `_pages/cv.md` embeds `/files/cv.pdf`. Edit `docs/cv.tex` and run `bash scripts/build_cv.sh` with TeX Live installed. The script compiles twice and rejects layout/reference warnings before replacing the PDF. Source and scripts are excluded from the public site. The two-page layout follows [David Porfirio's CV](https://dporfirio.github.io/content/CV.pdf): light Source Sans typography, small-cap headings with thin rules, a two-column contact header, degree and date columns, numbered author-first citations, and quiet page footers. Sections follow the reference order: Research Interests, Education, Research Positions, Conference Papers, Workshop Papers and Companion Proceedings, Honors and Awards, Teaching Experience, Advising and Mentorship, and External Service; Technical Skills follows at the end. Citations use surnames and initials, year and month, title, and italic proceedings. Each publication category starts at 1; numbering continues across page breaks, with papers ordered newest first within each category. The author's name is bold and all existing links remain clickable. The CV omits the Mason AI Day and PhD Symposium awards at the owner's request; their historical news posts are separate. Skills include the documented research methods: eye tracking, video annotation, user studies, and interaction prototyping. The CV includes Attune (UIST 2026), David Porfirio as the current Ph.D. advisor, updated research experience, and Doctoral Research Scholarship (2026–2027, Tier 1). Earlier advisors are scoped to their project; dates are preserved. Award wording follows the [GMU program description](https://graduate.gmu.edu/financial-support/grants-fellowships-and-awards/internal-funding-resources/doctoral-research), which uses Doctoral Research Scholarship for the funding and Doctoral Research Scholars for the program.
- Navigation: `_data/navigation.yml`. The order is About, Publications, CV. Research and Publications are merged into one destination. About is the first item and links to `/`, where the personal introduction appears. Navigation loads documents, with the current page marked; it does not scroll through homepage sections. The existing `/about/` bio URL remains available.

Links have visible hover, press, and keyboard focus states. Publication images explicitly show “View project”. `_includes/publication-destination.html` resolves image/title and research-flow links to an existing project, otherwise the available paper/DOI, with the original internal record as a fallback. The original publication routes remain intact. This avoids a detour through the old template before opening the actual project. Paper/DOI action links retain their specific destinations. Direction summaries have plus/minus controls below their topic on desktop, separated from the arrows between stages. On phones the control sits to the right of the stacked stage/topic text. Pale purple brush underlines highlight selected topic words, configured through each direction’s `emphasis` list; the hero uses the same treatment. These marks use CSS and leave the text readable without color. Disclosures work with pointer, keyboard, and JavaScript disabled. Reduced motion is respected. No custom page transitions or scrolling script is used.

## Pets

`_data/pets.yml` is currently empty because names and photos have not yet been provided. `_includes/pets.html` supports a photo gallery on About. `_includes/header-pets.html` supports transparent cutouts below the Puqi Zhou header, each linking to the pet section on About. Only actual owner-provided images may be added; no invented animals or placeholder photos are rendered.

## Assets and links

Portrait WebP derivatives reuse `images/profile.jpg`. The Attune interface is Figure 4 of the existing public paper at https://ari-lab-gmu.github.io/Attune_UIST26/static/pdfs/paper.pdf. The ground-robot photo is from Figure 1 of the public CHI paper at https://arxiv.org/abs/2602.08882. Optimized images were reused from the earlier local redesign backup. No synthetic research imagery was used.

The original Attune DOI returned 404 in the previous link check, so curated entries use its public paper and project links; the DOI remains recorded. Other ACM endpoints may reject automated clients with 403. The legacy LinkedIn link now handles the original full URL correctly.

## Public-content controls

Publications and news default to `published: false`; only explicitly public records opt in. Private static PDFs and images must stay outside public source folders. `local/`, `docs/`, `scripts/`, and `tests/` are excluded from builds. Do not build production with `--unpublished` or `--drafts`.

The owner replaced generic review-status badges with three descriptive current-work titles: Predicting Attention in Multi-Robot Supervision; Shared Social Autonomy for Robot Teleoperation; Ground Robots for Urban Missing-Person Search. Use these approved titles and summaries without inferring submission venues, results, or additional publication records. The old `review_work` data and status toggle have been removed.

The public audit rejects review/submission status everywhere, including metadata and PDFs. The old badge exception has been removed. Identifying private project names and venue patterns remain blocked.

The public CV is rebuilt from its public-only LaTeX source. The private preprint entry and links remain excluded. The original PDF stays in `local/private-originals/` and is not copied into the public site.

```sh
PATH=/opt/homebrew/opt/ruby@3.3/bin:$PATH bundle exec jekyll build --safe
python3 scripts/audit_public_site.py _site
```

## Preview and verification

The research-identity update is verified in `local/qa/research-identity/`: Home and Publications at 1440, 1024, 768, 390, and 320 px, with collapsed and expanded directions, no horizontal overflow, and no automated accessibility violations. Keyboard and no-JavaScript disclosures, reduced motion, four interest labels, three Current work entries, LinkedIn, and the served PDF were checked. The two-page CV was visually reviewed and its extracted text checked for Attune, the current advisor, scholarship, and Tier 1. Jekyll build and the strict public-content audit pass.

The verification notes below record earlier design iterations; the current four-label and Current work behavior is described above.

Use Jekyll's built-in server so original extensionless publication URLs resolve correctly. A plain Python file server does not provide this routing.

```sh
PATH=/opt/homebrew/opt/ruby@3.3/bin:$PATH bundle exec jekyll serve --safe --host 127.0.0.1 --port 4000
```

Local preview: http://127.0.0.1:4000/ . Screenshots and browser reports are excluded in `local/qa/combined-publications/`. At 1440, 1024, and 390 px, both collapsed and expanded directions passed automated accessibility checks; extra overflow checks cover 320, 768, and 1280 px. Real clicks on both selected images and titles reached their existing external project pages directly with HTTP 200. All publications opens the merged research/publications page, with all seven illustrated entries. The original extensionless publication routes and CV still return HTTP 200. The homepage scrollable region and the News archive both retain five public items. Keyboard, no-JavaScript expansion, Source Sans 3, and the PDF response were checked. Headless Chrome reports its internal PDF viewer extension request as canceled when navigating away from CV; the CV file returns HTTP 200 and valid PDF data.

All original HTML/PDF routes remain present. Run the public-content audit after rebuilding to check rendered text, PDFs, and asset filenames.

Potential later refinements: higher-resolution public robot photography and short, captioned public project walkthroughs. Pet photo processing remains pending the owner's actual images.

The latest News/navigation update is verified in `local/qa/news-labels-and-about/`: labels at 1440, 1024, and 390 px, no overflow or News accessibility violations, and an actual click from News through the rightmost About link back to `/`.

The merged Publications page is verified in `local/qa/combined-publications/`: seven loaded teaser images with alt text, left-aligned thumbnails at 1440/1024/390 px, no overflow or automated accessibility findings, native keyboard and no-JavaScript disclosures, and the `/research/` redirect reaching `/publications/` in local preview. The privacy exception moved from Research to Publications; negative checks confirm identifying names, metadata, extra badges, and badges on the old redirect route remain blocked.

The attention-focused introduction and brush-marked Directions are verified in `local/qa/attention-and-directions/`. Home and Publications pass 1440/1024/390 px visual and automated accessibility checks; native expansion and the no-JavaScript route still work. No private research content changed.

The research-interest labels and native scrolling News region are verified in `local/qa/interests-and-scrollable-news/` at 1440/1024/390 px, with an additional 320 px check. All five public news items can be reached with keyboard scrolling, focus can leave the region, and scrolling works without JavaScript. Home and News archive checks passed with no horizontal overflow or automated accessibility findings. The owner preferred Human–Robot Interaction as the first interest label, so the additional Human-Centered Robotics badge was removed.

The name-side labels and uncropped shoulder-robot portrait are verified in `local/qa/name-and-portrait/`. Checks cover 320–1440 px, including the compact-hero breakpoint: labels remain beside the name with identical static styling, the portrait keeps the source image's aspect ratio, and there is no horizontal overflow. Desktop, laptop, and phone screenshots also passed automated accessibility checks with Source Sans 3 loaded.

The compact introduction and unboxed interests are verified in `local/qa/compact-aligned-hero/`: desktop panels align at 1024–1440 px, the person and shoulder robot remain visible in screenshots, and 320–1440 px checks find no horizontal overflow. The layout remains functional without JavaScript.

The ordered looping labels are verified in `local/qa/ordered-interests/` at 1440/1024/768/640/390/320 px. The two-row ordering and 20% enlargement were checked explicitly. Continuous frame checks through the second cycle confirm that all six labels remain visible, each enlarges in turn, and neither labels nor the hero overlap or shift. No playback button remains. Reduced motion, CSS-animation removal, and the no-JavaScript fallback preserve all six labels. Desktop panels stay aligned; screenshots and automated accessibility checks passed.

The compact Publications directions are verified in `local/qa/compact-publication-directions/`: 170–180px sidebar on desktop, four compact rows on smaller screens, all seven loaded publication teasers, keyboard/no-JavaScript expansion, and the unchanged homepage topic wording. Checks at 320/390/768/900/901/1024/1440px find no horizontal overflow or automated accessibility violations. The first paper starts alongside the sidebar on desktop and around 446px down the page on phones. The public-content audit passes with only the previously authorized generic status badges.
