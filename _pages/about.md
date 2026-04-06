---
permalink: /
# title: "Academic Pages is a ready-to-fork GitHub Pages template for academic personal websites"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
{% assign recent_news = site.posts | where_exp: "item", "item.date <= site.time" | sort: "date" | reverse %}
{% assign recent_research = site.publications | sort: "date" | reverse %}

I'm a CS PhD student at George Mason University, co-advised by [Sungsoo Ray Hong](http://www.rayhong.net/?i=2) and [David Porfirio](https://dporfirio.github.io/).  

My research spans human-computer interaction, human-robot interaction with an emphasis on building and evaluating interactive multi-robot video sensemaking systems in real-world, high-stakes environments. With a focus on building scalable, practical multi-agent systems that assist domain experts in dynamic environments.

<!-- You can find my CV here [Puqi's CV]() -->

<section class="home-section">
  <div class="home-section__head">
    <h2>News</h2>
    <a class="home-section__more" href="/news/">More</a>
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
    <h2>Research</h2>
    <a class="home-section__more" href="/publications/">More</a>
  </div>

  {% if recent_research.size > 0 %}
    <div class="home-cards">
      {% for post in recent_research limit: 3 %}
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
    <p>Research updates will appear here soon.</p>
  {% endif %}
</section>
