function buildQuiz(id) {
    const data = QUIZ_DATA[id];
    const box  = document.getElementById("quiz-container");
    const head = document.getElementById("quiz-title");
  
    if (!data) {
      head.textContent = "Quiz not found";
      box.innerHTML = `<p>No quiz with id <code>${id}</code>.</p>`;
      return;
    }
  
    head.textContent = `Quiz – ${id.replace(/_/g, " ").toUpperCase()}`;
    let html = "";
  
    data.forEach((q, qi) => {
      html += `<div class="question"><p><strong>${q.question}</strong></p><ol type="A">`;
      q.choices.forEach((c, ci) => {
        const flag = ci === q.answer;
        html += `
          <li>
            <label class="choice" data-correct="${flag}">
              <input type="radio" name="q${qi}">
              <span class="letter">${String.fromCharCode(65 + ci)}</span>
              <span class="text">${c}</span>
            </label>
          </li>`;
      });
      html += `</ol><p class="feedback" hidden></p></div>`;
    });
  
    box.innerHTML = html;
  }
  
  function handlePick(e) {
    if (!e.target.matches('.choice input')) return;
  
    const label    = e.target.closest('.choice');
    const correct  = label.dataset.correct === "true";
    const qBlock   = label.closest('.question');
    const feedback = qBlock.querySelector('.feedback');
  
    qBlock.querySelectorAll('.choice').forEach(l => l.classList.remove('right','wrong'));
    label.classList.add(correct ? 'right' : 'wrong');
    feedback.textContent = correct ? "Correct! 🎉" : "Not quite — try again.";
    feedback.hidden = false;
  }
  
  function router() {
    const id = location.hash.slice(1);   // remove the leading '#'
    if (id) buildQuiz(id);
  }
  
  window.addEventListener("hashchange", router);
  document.addEventListener("change", handlePick);
  router();          // run on first load
  