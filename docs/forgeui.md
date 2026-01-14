# ForgeUI Documentation

**ForgeUI — UI composition engine for React**

This documentation defines how ForgeUI works internally.
It is not marketing. It is the contract of the system.

---

## 1. What ForgeUI Is (and Is Not)

### What it is

* A **UI composition engine** for React
* Driven by **JSON as source of truth**
* Built on **primitives + patterns**, not templates
* Generates **real, editable React code**

### What it is NOT

* Not a no‑code website builder
* Not a template marketplace
* Not an AI that "decides everything"

ForgeUI assists composition — it does not replace engineering.

---

## 2. System Overview

ForgeUI is divided into four major layers:

1. **Core Engine** – validates and manages the UI model
2. **Renderer** – turns JSON into a live preview (in‑memory)
3. **Studio** – visual builder + code panel
4. **Exporter** – generates a real React project

Each layer is isolated by design.

---

## 3. Core Concepts

### 3.1 Primitives

Primitives are the smallest building blocks.
They are predictable, composable, and limited.

Examples:

* Layout: `Box`, `Stack`, `Grid`
* Content: `Text`, `Image`, `Button`
* Visual: `Shape`, `Divider`
* Feedback: `LinearProgress`, `RadialProgress`

No business logic lives in primitives.

---

### 3.2 Patterns

Patterns are **composition recipes**, not components.

They describe *relationships*, not fixed UI.

Examples:

* Hero section
* Feature list
* Gamified progress block

Patterns consume primitives and output JSON trees.

---

### 3.3 UI Model (JSON)

The JSON model is the **single source of truth**.

```ts
Node {
  id: string
  type: string
  props?: Record<string, any>
  children?: Node[]
  motion?: MotionConfig
  assetId?: string
}
```

This model drives:

* Preview rendering
* Code visualization
* Exported React code

---

## 4. Motion System

Motion is **declarative**, never hardcoded.

```ts
MotionConfig {
  entrance?: "fade" | "slide" | "scale"
  intensity?: "soft" | "medium" | "strong"
  speed?: "slow" | "normal" | "fast"
}
```

Motion is applied via wrappers (e.g. Framer Motion).

---

## 5. Asset System

Assets are abstract references, not file paths.

### Preview

* Uses memory blobs or base64

### Export

* Generates real files
* Resolves correct import paths

```ts
ImageAsset {
  id: string
  previewSrc: string
  exportSrc?: string
  meta?: {
    aspect: string
    width?: number
    height?: number
  }
}
```

---

## 6. Preview vs Export

### Preview

* Runs entirely in memory
* No filesystem
* Fast iteration

### Export

* Generates a full React + Vite project
* Clean folder structure
* Editable by any developer

Preview is disposable.
Export is permanent.

---

## 7. Code Panel

ForgeUI includes a **controlled code view**:

* JSX‑like representation
* Synced with JSON
* Editable within safe boundaries

Changes in code update the model.
Changes in model update the code.

---

## 8. MVP Scope

Included:

* Core engine
* Primitive system
* Pattern engine
* Motion tokens
* Image upload
* Preview renderer
* Project export (ZIP)

Excluded:

* Hosting
* Auth
* Collaboration
* AI auto‑design autonomy

---

## 9. Design Principles

* Composition over configuration
* Constraints over freedom
* Engine over UI
* Determinism over randomness

---

## 10. Status

ForgeUI is under active development.

The first milestone is a stable engine capable of:

* Rendering
* Editing
* Exporting

Everything else is secondary.

---

End of document.
