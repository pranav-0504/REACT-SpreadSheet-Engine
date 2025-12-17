# Spreadsheet Engine with Formula Evaluation

A React-based spreadsheet application that supports Excel-like formulas, cell dependencies, automatic recalculation, and circular reference detection — built entirely on the client side.

## 🚀 Live Demo
🔗 https://spread-sheet-engine-react.vercel.app/

---

## 📌 Features

### Grid
- 10×10 spreadsheet grid
- Columns labeled **A–J** and rows **1–10**
- Editable cells supporting text, numbers, and formulas

### Formula Evaluation
- Formulas start with `=`
- Supports:
  - Basic arithmetic: `+`, `-`, `*`, `/`
  - Cell references (e.g. `A1`, `B2`)
  - Multiple references in one formula
  - Parentheses (e.g. `(A1 + B1) / 2`)

### Dependency Management
- Automatically tracks cell dependencies
- Updates all dependent cells when a referenced cell changes
- Prevents unnecessary recomputation

### Circular Reference Detection
- Detects circular dependencies such as:
  - `A1 = B1 + 1`
  - `B1 = A1 + 1`
- Displays `#CIRCULAR` instead of freezing the app

### Error Handling
- Gracefully handles:
  - Invalid formulas
  - Unknown cell references
  - Malformed expressions
- Displays `#ERROR` without affecting other cells

---

## 🧪 Example

| Cell | Input    | Output |
|-----|----------|--------|
| A1  | `5`      | `5`    |
| B1  | `=A1+3`  | `8`    |
| C1  | `=B1*2`  | `16`   |

Updating `A1` to `10` automatically updates:
- `B1 → 13`
- `C1 → 26`

---

## 🛠 Tech Stack
- **React (Create React App)**
- JavaScript (ES6+)
- CSS

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/pranav-0504/REACT-SpreadSheet-Engine.git
cd REACT-SpreadSheet-Engine
npm install
npm start
