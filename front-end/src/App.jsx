import React, { useMemo, useState, useRef, useEffect } from "react";
import "./index.css";

const solutionGrid = [
  "Galere#ait",
  "egalitaire",
  "nib#bardot",
  "iter#lions",
  "talque#ni#",
  "rtl#brases",
  "irise#l#su",
  "cis##mat#i",
  "ecartaient",
  "sessions#e"
];

const horizontalClues = [
  {'number': 'A.1', 'clue': 'VIEUX VAISSEAUX', 'word': 'GALERE', 'length': 6},
  {'number': 'A.8', 'clue': "FACON D'AVOIR", 'word': 'AIT', 'length': 3},
  {'number': 'B.1', 'clue': 'DONNE LES MEMES CHANCES', 'word': 'EGALITAIRE', 'length': 10},
  {'number': 'C.1', 'clue': 'UN RIEN VIEUX', 'word': 'NIB', 'length': 3},
  {'number': 'C.5', 'clue': 'IL SE COMPORTE COMME UN ANE', 'word': 'BARDOT', 'length': 6},
  {'number': 'D.1', 'clue': 'REACTEUR NUCLEAIRE', 'word': 'ITER', 'length': 4},
  {'number': 'D.6', 'clue': 'FELIN AU PELAGE FAUVE', 'word': 'LIONS', 'length': 5},
  {'number': 'E.1', 'clue': 'POUDRE BLANCHE POUR LES FESSES DE BEBE', 'word': 'TALQUE', 'length': 6},
  {'number': 'E.8', 'clue': 'CONJONCTION', 'word': 'NI', 'length': 2},
  {'number': 'F.1', 'clue': 'MEDIA SUR LES ONDES', 'word': 'RTL', 'length': 3},
  {'number': 'F.5', 'clue': 'PRATIQUES UNE SOUDURE', 'word': 'BRASES', 'length': 6},
  {'number': 'G.1', 'clue': 'COLORE', 'word': 'IRISE', 'length': 5},
  {'number': 'G.9', 'clue': 'QUI A ETE RETENU', 'word': 'SU', 'length': 2},
  {'number': 'H.1', 'clue': 'EN DECA DE', 'word': 'CIS', 'length': 3},
  {'number': 'H.6', 'clue': "CONSTAT D'ECHEC", 'word': 'MAT', 'length': 3},
  {'number': 'I.1', 'clue': 'METTTAIENT DE COTE', 'word': 'ECARTAIENT', 'length': 10},
  {'number': 'J.1', 'clue': "PERIODES DE TRAVAUX A L'ASSEMBLEE", 'word': 'SESSIONS', 'length': 8}
];

const verticalClues = [
  {'number': '1.A', 'clue': 'MERES', 'word': 'GENITRICES', 'length': 10},
  {'number': '2.A', 'clue': 'ELLE SEME LE DESORDRE', 'word': 'AGITATRICE', 'length': 10},
  {'number': '3.A', 'clue': 'MIS SOUS DEPENDANCE', 'word': 'LABELLISAS', 'length': 10},
  {'number': '4.A', 'clue': "IL FAIT L'ARTICLE A MADRID", 'word': 'EL', 'length': 2},
  {'number': '4.D', 'clue': 'POUR ENTRER ET SORTIR DE QUIMPER', 'word': 'RQ', 'length': 2},
  {'number': '4.I', 'clue': 'EN PLEINE URSS', 'word': 'RS', 'length': 2},
  {'number': '5.A', 'clue': 'PIECE BANCAIRE', 'word': 'RIB', 'length': 3},
  {'number': '5.E', 'clue': 'IGNAME VIOLETTE', 'word': 'UBE', 'length': 3},
  {'number': '5.I', 'clue': 'METAL SYMBOLISE', 'word': 'TI', 'length': 2},
  {'number': '6.A', 'clue': 'EXPOSER LA MARCHANDISE', 'word': 'ETALER', 'length': 6},
  {'number': '6.H', 'clue': 'DIRIGEANT DE LA CHINE POPULAIRE', 'word': 'MAO', 'length': 3},
  {'number': '7.B', 'clue': 'ATOLL DES MALDIVES', 'word': 'ARI', 'length': 3},
  {'number': '7.F', 'clue': 'DELON OU CHABAT', 'word': 'ALAIN', 'length': 5},
  {'number': '8.A', 'clue': 'DONNONS UN COUP DE MAIN', 'word': 'AIDONS', 'length': 6},
  {'number': '8.H', 'clue': 'UTILES POUR FAIRE DES PLANS', 'word': 'TES', 'length': 3},
  {'number': '9.A', 'clue': 'CELLES DU SORT SONT SOUVENT FACHEUSES', 'word': 'IRONIES', 'length': 7},
  {'number': '10.A', 'clue': 'RECIPIENT DE CHIMISTE', 'word': 'TETS', 'length': 4},
  {'number': '10.F', 'clue': "ON MONTRE PEU D'INTERET A NE PAS LA DONNER", 'word': 'SUITE', 'length': 5}
];

function buildCells(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const cells = [];
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      const isBlock = cell === "#";
      cells.push({
        row: r,
        col: c,
        isBlock,
        isWrong: false,
        solution: solutionGrid[r][c],
        value: ""
      });
    }
  }
  
  return { rows, cols, cells };
}

function Cell({ cell, onChange, direction, toggleDirection, moveCaret, inputRef, activeCell, changeActiveCell, cells }) {
  if (cell.isBlock) return <div className="cell block" />;
  const getWordCells = () => {
    if (!activeCell) return [];
    const word = [];
    
    if (direction === "h") {
      let c = activeCell.col;
      while (c >= 0 && !cells.find(cl => cl.row === activeCell.row && cl.col === c)?.isBlock) c--;
      c++;
      while (c < solutionGrid[0].length && !cells.find(cl => cl.row === activeCell.row && cl.col === c)?.isBlock) {
        word.push(`${activeCell.row}-${c}`);
        c++;
      }
    } else {
      let r = activeCell.row;
      while (r >= 0 && !cells.find(cl => cl.row === r && cl.col === activeCell.col)?.isBlock) r--;
      r++;
      while (r < solutionGrid.length && !cells.find(cl => cl.row === r && cl.col === activeCell.col)?.isBlock) {
        word.push(`${r}-${activeCell.col}`);
        r++;
      }
    }
    
    return word;
  };
  
  const wordCells = getWordCells();
  const isSelectedWord = wordCells.includes(`${cell.row}-${cell.col}`);
  
  return (
    <div className="cell">
      {cell.number && <div className="cell-number">{cell.number}</div>}
      <input
        ref={inputRef}
        className={`cell-input ${isSelectedWord ? "selected" : ""} ${cell.isWrong ? "line-through" : ""}`}
        maxLength={1}
        value={cell.value}
        onClick={() => {changeActiveCell(cell.row, cell.col);
          if (cell.row === activeCell.row && cell.col === activeCell.col) toggleDirection();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") moveCaret(cell.row, cell.col + 1);
          else if (e.key === "ArrowLeft") moveCaret(cell.row, cell.col - 1);
          else if (e.key === "ArrowDown") moveCaret(cell.row + 1, cell.col);
          else if (e.key === "ArrowUp") moveCaret(cell.row - 1, cell.col);
          else if (/^[a-zA-Z]$/.test(e.key)) onChange(cell.row, cell.col, "");
        }}
        onChange={(e) => {
          const v = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
          onChange(cell.row, cell.col, v);
          if (v !== "") {
            if (direction === "h") {
              moveCaret(cell.row, cell.col + 1);
            } else {
              moveCaret(cell.row + 1, cell.col);
            }
          }
        }}
      />
    </div>
  );
}

function CluesColumn({ title, list }) {
  return (
    <div className="clues-column">
      <h3>{title}</h3>
      <ul>
        {list.map((item) => (
          <li key={`${title}-${item.number}`}>
            <strong>{item.number}</strong> {item.clue} <em>({item.length})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const { rows, cols, cells: initialCells } = useMemo(() => buildCells(solutionGrid), []);
  const [cells, setCells] = useState(initialCells);
  const [direction, setDirection] = useState("h");
  const [activeCell, setActiveCell] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRefs = useRef([]);
  
  for (let r = 0; r < rows; r++) {
    inputRefs.current[r] = [];
    for (let c = 0; c < cols; c++) {
      inputRefs.current[r][c] = null;
    }
  }
  
  useEffect(() => {
    if (activeCell && inputRefs.current[activeCell.row]) {
      const ref = inputRefs.current[activeCell.row][activeCell.col];
      if (ref) {
        ref.focus();
      }
    }
  }, [activeCell]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeCell && inputRefs.current[activeCell.row]) {
        const ref = inputRefs.current[activeCell.row][activeCell.col];
        if (ref) {
          ref.focus();
        }
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, [activeCell, cells]);
  
  const moveCaret = (r, c) => {
    if (r >= 0 && r < rows && c >= 0 && c < cols) {
      const cell = cells.find(cell => cell.row === r && cell.col === c);
      if (cell && !cell.isBlock) {
        setActiveCell({ row: r, col: c });
      }
    }
  };
  
  const handleChange = (r, c, v) => {
    setCells((prev) =>
      prev.map((cell) =>
        cell.row === r && cell.col === c ? { ...cell, value: v, isWrong: false } : cell
      )
    );
  };
  
  const fillSolution = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setCells((prev) =>
      prev.map((cell) =>
        cell.isBlock ? cell : { ...cell, value: cell.solution, isWrong: false }
      )
    );
    setTimeout(() => setIsProcessing(false), 100);
  };
  
  const reset = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setCells((prev) =>
      prev.map((cell) => (cell.isBlock ? cell : { ...cell, value: "", isWrong: false }))
    );
    setTimeout(() => setIsProcessing(false), 100);
  };
  
  const toggleDirection = () => {
    setDirection((prev) => (prev === "h" ? "v" : "h"));
  };
  
  const changeActiveCell = (r, c) => {
    setActiveCell({ row: r, col: c });
  };
  
  const verif = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setCells((prev) =>
      prev.map((cell) =>
        cell.isBlock
          ? cell
          : cell.value.toUpperCase() === cell.solution.toUpperCase()
          ? { ...cell, isWrong: false }
          : { ...cell, isWrong: true }
      )
    );
    setTimeout(() => setIsProcessing(false), 100);
  };
  
  const rowLabels = [];
  const colLabels = [];
  
  for (let i = 0; i < rows; i++) {
    colLabels.push(i + 1);
    rowLabels.push(String.fromCharCode(65 + i));
  }
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".grid-with-coords")) {
        setActiveCell(null);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  
  return (
    <div className="app">
      <h1>Projet L3 : Générateur de mot croisé</h1>
      <div className="main">
        <div className="grid-area" style={{ gridTemplateColumns: `repeat(${cols}, 44px)` }}>
          <div className="grid-with-coords" style={{ display: "grid", gridTemplateColumns: `40px repeat(${cols}, 44px)` }}>
            <div />
            {colLabels.map((col) => (
              <div key={col} className="coord-label">{col}</div>
            ))}
            {cells.map((cell) => {
              const row = cell.row;
              const col = cell.col;
              return (
                <React.Fragment key={`${row}-${col}`}>
                  {col === 0 && <div className="coord-label">{rowLabels[row]}</div>}
                  <Cell
                    cell={cell}
                    onChange={handleChange}
                    direction={direction}
                    toggleDirection={toggleDirection}
                    moveCaret={moveCaret}
                    inputRef={(el) => (inputRefs.current[cell.row][cell.col] = el)}
                    cells={cells}
                    activeCell={activeCell}
                    changeActiveCell={changeActiveCell}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <div className="controls">
            <button onClick={fillSolution} disabled={isProcessing}>
              Montrer la solution
            </button>
            <button onClick={reset} disabled={isProcessing}>
              Réinitialiser
            </button>
            <button onClick={verif} disabled={isProcessing}>
              Vérifier
            </button>
          </div>
        </div>
        <div className="clues">
          <button className="direction-btn" onClick={toggleDirection}>
            Direction : {direction === "h" ? "→ Horizontal" : "↓ Vertical"}
          </button>
          {direction === "h" ? (
            <CluesColumn title="Horizontal" list={horizontalClues} />
          ) : (
            <CluesColumn title="Vertical" list={verticalClues} />
          )}
        </div>
      </div>
      <footer style={{ marginTop: 20 }}>
        <small></small>
      </footer>
    </div>
  );
}