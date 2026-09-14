---
layout: portfolio
is_home: true
permalink: /
seo_title: "Puqi Zhou | Human-Centered Robotics Researcher"
description: "Puqi Zhou is a Ph.D. researcher at George Mason University working on human-centered robotics, human-robot interaction, shared autonomy, multi-robot systems, and human attention modeling."
---

<section class="hero" aria-labelledby="name">
  <div class="hero-copy">
    <div class="hero-heading">
      <h1 id="name">Puqi Zhou</h1>
      <div class="interest-presentation" data-interest-presentation>
        <ul class="research-interests" aria-label="Research interests">
          <li>Human–Robot Interaction</li>
          <li>Multi-Robot Systems</li>
          <li>Robot Autonomy</li>
          <li>Human–Computer Interaction</li>
          <li>Human Attention</li>
          <li>High-Stakes</li>
        </ul>
      </div>
    </div>
    <figure class="portrait">
      <img src="{{ '/images/profile-800.webp' | relative_url }}" srcset="{{ '/images/profile-480.webp' | relative_url }} 480w, {{ '/images/profile-800.webp' | relative_url }} 800w" sizes="(max-width: 1023px) 124px, (max-width: 1144px) 42vw, 377px" width="800" height="757" alt="Puqi Zhou outdoors with a small robot on his shoulder." fetchpriority="high">
    </figure>
    <p class="hero-background">I'm a Computer Science Ph.D. student at George Mason University, advised by <a href="https://dporfirio.github.io/">David Porfirio</a>.</p>
    <p class="hero-intro">I build and study interactive <strong>multi-robot systems</strong> around <span class="ink-mark">human attention,</span> designing <span class="ink-mark">interfaces</span> and <span class="ink-mark">autonomy</span> for people working with robots in <span class="ink-mark">real-world</span> settings.</p>
    {% include profile-links.html %}
    <div class="availability">
      <p><strong>Seeking research internships</strong> · Spring / Summer 2027</p>
    </div>
  </div>
</section>

<section id="directions" class="home-section" aria-labelledby="directions-title">
  <div class="section-heading"><h2 id="directions-title"><span>Research Directions</span></h2></div>
  {% include research-directions.html %}
</section>

{% assign recent_news = site.posts | where: 'published', true | where_exp: 'item', 'item.date <= site.time' | sort: 'date' | reverse %}
{% if recent_news.size > 0 %}
<section id="news" class="home-section" aria-labelledby="news-title">
  <div class="section-heading"><h2 id="news-title"><span>News</span></h2><a href="{{ '/news/' | relative_url }}">All news <span aria-hidden="true">→</span></a></div>
  <div class="news-list news-scroll" tabindex="0" role="region" aria-label="Scrollable news updates">
    {% for post in recent_news %}
      {% include news-entry.html post=post %}
    {% endfor %}
  </div>
</section>
{% endif %}

<section id="publications" class="home-section" aria-labelledby="publications-title">
  <div class="section-heading"><h2 id="publications-title"><span>Selected Publications</span></h2><a href="{{ '/publications/' | relative_url }}">All publications <span aria-hidden="true">→</span></a></div>
  {% include selected-publications.html %}
</section>
