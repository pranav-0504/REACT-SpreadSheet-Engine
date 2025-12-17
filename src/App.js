import React, { useState } from "react";

// Columns and rows configuration will bee:
const columns = ["A","B","C","D","E","F","G","H","I","J"];
const rows = [1,2,3,4,5,6,7,8,9,10];

// Creating initial empty spreadsheett:
function initializeGrid() {
  const data = {};

  for (let c of columns) {
    for (let r of rows) {
      data[`${c}${r}`] = {
        value: "",
        display: ""
      };
    }
  }

  return data;
}

export default function App() {
  const [cells, setCells] = useState(initializeGrid());

  // Evaluate a single cell value
  const evaluateCell = (cellKey, grid, visitedCells = new Set()) => {
    // Circular dependency check
    if (visitedCells.has(cellKey)) {
      return "#CIRCULAR";
    }

    visitedCells.add(cellKey);

    const currentCell = grid[cellKey];

    // Normal value (not a formula)
    if (!currentCell.value.startsWith("=")) {
      return currentCell.value;
    }

    try {
      let expression = currentCell.value.substring(1);

      // Replace all cell references with their values
      expression = expression.replace(/[A-J](10|[1-9])/g, ref => {
        const refValue = evaluateCell(ref, grid, new Set(visitedCells));

        if (refValue === "#CIRCULAR" || refValue === "#ERROR") {
          throw new Error("Invalid reference");
        }

        return Number(refValue) || 0;
      });

      // Evaluate final expression
      // eslint-disable-next-line no-eval
      return eval(expression);
    } catch (err) {
      return "#ERROR";
    }
  };

  // Recalculate all cells after any change in the grid by the user:
  const recalculateGrid = updatedGrid => {
    const newGrid = { ...updatedGrid };

    for (let key in newGrid) {
      newGrid[key].display = evaluateCell(key, newGrid);
    }

    return newGrid;
  };

  // Handle input change
  const handleInputChange = (cellKey, newValue) => {
    const updatedGrid = {
      ...cells,
      [cellKey]: {
        ...cells[cellKey],
        value: newValue
      }
    };

    setCells(recalculateGrid(updatedGrid));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Spreadsheet Engine</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th></th>
            {columns.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(row => (
            <tr key={row}>
              <th>{row}</th>
              {columns.map(col => {
                const cellKey = `${col}${row}`;
                return (
                  <td key={cellKey}>
                    <input
                      style={{ width: "80px" }}
                      value={cells[cellKey].value}
                      onChange={e =>
                        handleInputChange(cellKey, e.target.value)
                      }
                    />
                    <div>{cells[cellKey].display}</div>
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









