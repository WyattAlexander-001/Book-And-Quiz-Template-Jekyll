---
layout: default
title: Quizzes
---

<h2>Quiz List</h2>
<ul>
  {% for key in site.data.quizzes %}
    <li><a href="/quizzes/{{ key[0] }}/">Quiz for {{ key[0] | capitalize }}</a></li>
  {% endfor %}
</ul>
