---
permalink: /
# title: "Academic Pages is a ready-to-fork GitHub Pages template for academic personal websites"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I'm a CS PhD student at George Mason University, co-advised by [Sungsoo Ray Hong](http://www.rayhong.net/?i=2) and [David Porfirio](https://dporfirio.github.io/).  

My research spans human-computer interaction, human-robot interaction with an emphasis on building and evaluating interactive multi-robot video sensemaking systems in real-world, high-stakes environments. With a focus on building scalable, practical multi-agent systems that assist domain experts in dynamic environments.

{% assign recent_news = site.posts | where_exp: "item", "item.date <= site.time" | sort: "date" | reverse %}

<section class="home-section">
  <h2 class="home-section__title">News</h2>

  {% if recent_news.size > 0 %}
    <div class="news-list">
      {% for post in recent_news limit: 5 %}
        {% include news-row.html post=post %}
      {% endfor %}
    </div>
    <div class="home-section__actions">
      <a class="home-pill-button" href="/news/">Detail</a>
    </div>
  {% else %}
    <p>No news posted yet.</p>
  {% endif %}
</section>

<!--
{% assign all_publications = site.publications | sort: "date" | reverse %}

<section class="home-section">
  <h2 class="home-section__title">Research</h2>

  <div class="research-labels">
    <a class="research-label research-label--blue" href="/research/">Human-Computer Interaction</a>
    <a class="research-label research-label--gold" href="/research/">Human-Robot Interaction</a>
    <a class="research-label research-label--purple" href="/research/">Multi-Robot Sensemaking</a>
    <a class="research-label research-label--green" href="/research/">Multi-Agent Systems</a>
  </div>
</section>

<section class="home-section">
  <h2 class="home-section__title">Publications</h2>

  {% if all_publications.size > 0 %}
    <div class="publication-list">
      {% for post in all_publications %}
        <article class="publication-feature">
          <div class="publication-feature__media">
            {% if post.header.teaser %}
              <img src="{{ post.header.teaser | relative_url }}" alt="{{ post.title | strip_html }}">
            {% else %}
              <div class="publication-feature__placeholder">
                <span>{{ post.date | date: "%Y" }}</span>
              </div>
            {% endif %}
          </div>

          <div class="publication-feature__body">
            <h3 class="publication-feature__title">
              <a href="{{ post.url | relative_url }}">{{ post.title | markdownify | remove: "<p>" | remove: "</p>" }}</a>
            </h3>

            <p class="publication-feature__meta">
              {% if post.venue %}[{{ post.venue }} {{ post.date | date: "%Y" }}]{% else %}[{{ post.date | date: "%Y" }}]{% endif %}
            </p>

            {% if post.excerpt %}
              <p class="publication-feature__summary">{{ post.excerpt | markdownify | strip_html | strip_newlines | truncate: 220 }}</p>
            {% endif %}

            <p class="publication-feature__links">
              <a href="{{ post.url | relative_url }}">Details</a>
              {% if post.paperurl %}| <a href="{{ post.paperurl }}">Paper</a>{% endif %}
              {% if post.slidesurl %}| <a href="{{ post.slidesurl }}">Slides</a>{% endif %}
              {% if post.bibtexurl %}| <a href="{{ post.bibtexurl }}">BibTeX</a>{% endif %}
            </p>

            <div class="publication-feature__tags">
              {% if post.category == "conferences" %}
                <span class="publication-tag publication-tag--purple">Conference</span>
              {% elsif post.category == "manuscripts" %}
                <span class="publication-tag publication-tag--gold">Journal</span>
              {% else %}
                <span class="publication-tag publication-tag--blue">Publication</span>
              {% endif %}

              {% if post.venue %}
                <span class="publication-tag publication-tag--neutral">{{ post.venue }}</span>
              {% endif %}
            </div>
          </div>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p>Publications will appear here soon.</p>
  {% endif %}
</section>
-->
