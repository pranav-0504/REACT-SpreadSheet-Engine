import React, { useState } from "react";

const COLS = "ABCDEFGHIJ".split("");
const ROWS = Array.from({ length: 10 }, (_, i) => i + 1);

const createEmptyGrid = () => {
  const grid = {};
  COLS.forEach(c => {
    ROWS.forEach(r => {
      grid[`${c}${r}`] = { value: "", display: "" };
    });
  });
  return grid;
};

export default function App() {
  const [cells, setCells] = useState(createEmptyGrid());

  const evaluateCell = (key, visited = new Set()) => {
    if (visited.has(key)) return "#CIRCULAR";
    visited.add(key);

    const cell = cells[key];
    if (!cell.value.startsWith("=")) return cell.value;

    try {
      let expr = cell.value.slice(1);

      expr = expr.replace(/[A-J](10|[1-9])/g, ref => {
        const val = evaluateCell(ref, new Set(visited));
        if (val === "#CIRCULAR" || val === "#ERROR") {
          throw new Error();
        }
        return Number(val) || 0;
      });

      // eslint-disable-next-line no-eval
      return eval(expr);
    } catch {
      return "#ERROR";
    }
  };

  const recompute = newCells => {
    const updated = { ...newCells };
    Object.keys(updated).forEach(k => {
      updated[k].display = evaluateCell(k);
    });
    return updated;
  };

  const handleChange = (key, val) => {
    const updated = {
      ...cells,
      [key]: { ...cells[key], value: val }
    };
    setCells(recompute(updated));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Spreadsheet Engine</h2>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th></th>
            {COLS.map(c => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {ROWS.map(r => (
            <tr key={r}>
              <th>{r}</th>
              {COLS.map(c => {
                const key = `${c}${r}`;
                return (
                  <td key={key}>
                    <input
                      style={{ width: 80 }}
                      value={cells[key].value}
                      onChange={e => handleChange(key, e.target.value)}
                    />
                    <div>{cells[key].display}</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
