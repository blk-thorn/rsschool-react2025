# CO2 Emissions Data App

Climate Dashboard Performance Report

## Quick Overview

I ran an initial performance check using **React DevTools Profiler** to see how my app handles typical user actions.  
I wanted to understand how long things take when I interact with the app—like sorting the table, searching for a country, switching years, or adding/removing columns—and spot any areas that might be slowing it down.

---

## What I Measured

For each action, I recorded:

- **Commit Duration:** How long React took to apply updates.
- **Render Duration:** How long individual components took to render.
- **Interactions:** Which actions triggered the renders.
- **Flame Graphs:** Visual snapshots showing where components spend time rendering.
- **Ranked Charts:** Components sorted by render duration so I could see the heaviest ones.

---

## Performance Before Optimization

### Action: Sorting the table

- **Commit Duration:** <!-- insert measured time -->
- **Component Render Duration:** <!-- insert measured time -->
- **Interaction Captured:** <!-- describe if Profiler captured it -->

#### Visuals:

**Flame Graph:**  
![Flame Graph Sorting](docs/images/flame-sort-pre.png)

**Ranked Chart:**  
![Ranked Chart Sorting](docs/images/ranked-sort-pre.png)

---

### Action: Searching for a country

- **Commit Duration:** <!-- insert measured time -->
- **Component Render Duration:** <!-- insert measured time -->
- **Interaction Captured:** <!-- describe if Profiler captured it -->

#### Visuals:

**Flame Graph:**  
![Flame Graph Search](docs/images/flame-search-pre.png)

**Ranked Chart:**  
![Ranked Chart Search](docs/images/ranked-search-pre.png)

---

### Action: Switching years

- **Commit Duration:** <!-- insert measured time -->
- **Component Render Duration:** <!-- insert measured time -->
- **Interaction Captured:** <!-- describe if Profiler captured it -->

#### Visuals:

**Flame Graph:**  
![Flame Graph Year](docs/images/flame-year-pre.png)

**Ranked Chart:**  
![Ranked Chart Year](docs/images/ranked-year-pre.png)

---

### Action: Adding or removing columns

- **Commit Duration:** <!-- insert measured time -->
- **Component Render Duration:** <!-- insert measured time -->
- **Interaction Captured:** <!-- describe if Profiler captured it -->

#### Visuals:

**Flame Graph:**  
![Flame Graph Columns](docs/images/flame-columns-pre.png)

**Ranked Chart:**  
![Ranked Chart Columns](docs/images/ranked-columns-pre.png)

---

## Initial Observations

From what I measured:

- Sorting and searching feel smooth, but adding or removing columns triggers full table re-renders, which slows things down.
- Switching years is fairly quick, though for large datasets it could be optimized more.
- I think I can improve performance by using `React.memo` for components that don’t need to update every time, and `useMemo` for expensive calculations.

> This gives me a baseline to compare after optimizations.
