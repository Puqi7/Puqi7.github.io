---
permalink: /
# title: "Academic Pages is a ready-to-fork GitHub Pages template for academic personal websites"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
{% assign recent_news = site.posts | where_exp: "item", "item.date <= site.time" | sort: "date" | reverse %}
{% assign selected_publications = site.publications | sort: "date" | reverse %}

I'm a CS PhD student at George Mason University, co-advised by [Sungsoo Ray Hong](http://www.rayhong.net/?i=2) and [David Porfirio](https://dporfirio.github.io/).  

My research spans human-computer interaction, human-robot interaction with an emphasis on building and evaluating interactive multi-robot video sensemaking systems in real-world, high-stakes environments. With a focus on building scalable, practical multi-agent systems that assist domain experts in dynamic environments.

<!-- You can find my CV here [Puqi's CV]() -->

<section class="home-section">
  <div class="home-section__head">
    <h2>Research Interests</h2>
    <a class="home-section__more" href="/research/">Detail</a>
  </div>

  <div class="home-cards">
    <article class="home-card home-card--research">
      <p class="home-card__meta">Human-Computer Interaction</p>
      <h3 class="home-card__title">Interactive sensemaking for high-stakes work</h3>
      <p class="home-card__excerpt">Sensemaking, decision support, interactive systems</p>
    </article>

    <article class="home-card home-card--research">
      <p class="home-card__meta">Human-Robot Interaction</p>
      <h3 class="home-card__title">Human collaboration with robotic systems</h3>
      <p class="home-card__excerpt">Robot collaboration, interface design, explainability</p>
    </article>

    <article class="home-card home-card--research">
      <p class="home-card__meta">Multi-Agent Systems</p>
      <h3 class="home-card__title">Scalable AI support for domain experts</h3>
      <p class="home-card__excerpt">Multi-agent AI, expert workflows, video analysis</p>
    </article>
  </div>
</section>

<section class="home-section">
  <div class="home-section__head">
    <h2>News</h2>
    <a class="home-section__more" href="/news/">Detail</a>
  </div>

  {% if recent_news.size > 0 %}
    <div class="home-cards">
      {% for post in recent_news limit: 3 %}
        <article class="home-card">
          <p class="home-card__meta">{{ post.date | date: "%B %d, %Y" }}</p>
          <h3 class="home-card__title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.excerpt %}
            <p class="home-card__excerpt">{{ post.excerpt | markdownify | strip_html | strip_newlines | truncate: 140 }}</p>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p>No news posted yet.</p>
  {% endif %}
</section>

<section class="home-section">
  <div class="home-section__head">
    <h2>Selected Publications</h2>
    <a class="home-section__more" href="/publications/">Detail</a>
  </div>

  {% if selected_publications.size > 0 %}
    <div class="home-cards">
      {% for post in selected_publications limit: 3 %}
        <article class="home-card">
          <p class="home-card__meta">{{ post.date | date: "%Y" }}{% if post.venue %} · {{ post.venue }}{% endif %}</p>
          <h3 class="home-card__title"><a href="{{ post.url | relative_url }}">{{ post.title | markdownify | remove: "<p>" | remove: "</p>" }}</a></h3>
          {% if post.excerpt %}
            <p class="home-card__excerpt">{{ post.excerpt | markdownify | strip_html | strip_newlines | truncate: 160 }}</p>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p>Selected publications will appear here soon.</p>
  {% endif %}
</section>
