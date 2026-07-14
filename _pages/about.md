---
permalink: /
# title: "Academic Pages is a ready-to-fork GitHub Pages template for academic personal websites"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I'm a CS PhD student at George Mason University, co-advised by [David Porfirio](https://dporfirio.github.io/) and [Sungsoo Ray Hong](http://www.rayhong.net/?i=2).  

My research spans human-computer interaction, human-robot interaction with an emphasis on building and evaluating interactive multi-robot video sensemaking systems in real-world, high-stakes environments around human attenion.

{% assign recent_news = site.posts | where_exp: "item", "item.date <= site.time" | sort: "date" | reverse %}

<section class="home-section">
  <h2 class="home-section__title">News</h2>

  {% if recent_news.size > 0 %}
    <div class="news-list">
      {% for post in recent_news %}
        {% include news-row.html post=post %}
      {% endfor %}
    </div>
  {% else %}
    <p>No news posted yet.</p>
  {% endif %}
</section>

{% assign all_publications = site.publications | sort: "date" | reverse %}

<section class="home-section">
  <h2 class="home-section__title">Recent Publications</h2>

  {% if all_publications.size > 0 %}
    <div class="pub-card-grid">
      {% for post in all_publications limit: 2 %}
        {% include publication-row.html post=post %}
      {% endfor %}
    </div>
    <p class="home-section__more">
      <a class="all-pubs-link" href="/publications/">All publications</a>
    </p>
  {% else %}
    <p>Publications will appear here soon.</p>
  {% endif %}
</section>
