import { useState, type KeyboardEvent } from "react";

interface Chip {
  id: string;
  label: string;
}

const Chips = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<Chip[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const label = inputValue.trim();

    if (label.length === 0) {
      return;
    }

    const newChip: Chip = {
      id: crypto.randomUUID(),
      label,
    };

    setChips((prev) => [...prev, newChip]);
    setInputValue("");
  };

  const handleDeleteChip = (id: string) => {
    setChips((prev) => prev.filter((chip) => chip.id !== id));
  };

  return (
    <main className="main-container">
      <header className="intro">
        <p className="eyebrow">THE TAG EDITOR</p>
        <h1>
          Good ideas,
          <br />
          neatly tagged.
        </h1>
        <p className="intro-description">
          A small space for the words that matter.
        </p>
      </header>
      <section className="chips-editor" aria-label="Tag editor">
        <div className="input-heading">
          <span>Your tags</span>
          <span className="tag-count" role="status">
            {chips.length} {chips.length === 1 ? "tag" : "tags"}
          </span>
        </div>
        <div className="input-shell">
          <input
            className="input"
            type="text"
            value={inputValue}
            placeholder="Type something worth keeping..."
            aria-label="Your tags"
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
            }}
            onKeyDown={(event) => handleKeyDown(event)}
          />
          <kbd aria-hidden="true">Enter</kbd>
        </div>
        <p className="input-hint">
          Press Enter to add a tag. Select X to remove it.
        </p>
        <div className="collection">
          <p className="collection-heading">YOUR COLLECTION</p>
          {chips.length === 0 ? (
            <p className="empty-state">
              A fresh start. Add your first tag above.
            </p>
          ) : (
            <ul className="chip-container" aria-label="Added tags">
              {chips.map((chip) => (
                <li key={chip.id} className="chip">
                  <span>{chip.label}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${chip.label}`}
                    onClick={() => handleDeleteChip(chip.id)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <p className="editor-note">Less clutter. More clarity.</p>
    </main>
  );
};

export default Chips;
