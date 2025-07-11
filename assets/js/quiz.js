/* global React, ReactDOM */
const { useState } = React;

function Question({ q, options, answer, explanation, onNext }) {
  const [selected, setSelected] = useState(null);
  const correct = selected && selected === answer;

  return (
    <div className="my-6 p-4 border rounded">
      <p className="font-medium">{q}</p>

      {options.map(opt => (
        <button
          key={opt}
          className="block mt-2 px-3 py-2 border rounded w-full text-left
                     hover:bg-gray-100"
          disabled={!!selected}
          onClick={() => setSelected(opt)}
        >
          {opt}
        </button>
      ))}

      {selected && (
        <div className="mt-3">
          <p className={correct ? "text-green-600" : "text-red-600"}>
            {correct ? "Correct!" : "Oops…"}
          </p>
          <p className="text-sm text-gray-600">{explanation}</p>
          <button
            className="mt-2 px-3 py-1 border rounded"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function Quiz({ questions }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);

  const next = (wasCorrect) => {
    if (wasCorrect) setScore(score + 1);
    setIdx(idx + 1);
  };

  if (idx >= questions.length) {
    return (
      <div className="p-4 border rounded my-6">
        <p className="font-medium">
          You scored {score} / {questions.length}
        </p>
      </div>
    );
  }

  const q = questions[idx];
  return (
    <Question
      {...q}
      onNext={() => next(q.answer === q.selected)}
    />
  );
}

// Mount every quiz block on the page
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[id^='quiz-data-']").forEach(node => {
    const id = node.id.replace("quiz-data-", "");
    const data = JSON.parse(node.textContent);
    const mountPoint = document.getElementById(`quiz-${id}`);
    ReactDOM.render(<Quiz questions={data} />, mountPoint);
  });
});
