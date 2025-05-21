<h2>Quiz List</h2>
<ul>
  {% for id in site.data.quizzes %}
    <li><a href="/quizzes/#{{ id[0] }}">Quiz – {{ id[0] | replace:'_',' ' | capitalize }}</a></li>
  {% endfor %}
</ul>
