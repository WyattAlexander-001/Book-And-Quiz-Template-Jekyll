document.addEventListener("change", e => {
    if (!e.target.matches('.quiz input[type="radio"]')) return;
  
    const label    = e.target.closest('.choice');
    const correct  = label.dataset.correct === "true";
    const qBlock   = label.closest('.question');
    const feedback = qBlock.querySelector('.feedback');
  
    // reset highlights for this question
    qBlock.querySelectorAll('.choice').forEach(l => l.classList.remove('right','wrong'));
  
    label.classList.add(correct ? 'right' : 'wrong');
    feedback.textContent = correct ? "Correct! 🎉" : "Not quite — try again.";
    feedback.hidden = false;
  });
  