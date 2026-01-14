# ForgeUI
UI composition engine for React

> Build dynamic React websites through visual composition, not templates.

ForgeUI is a **visual composition engine** for generating dynamic, non-repetitive React websites using **primitives, patterns, motion systems, and asset abstraction**.

Instead of relying on rigid templates, ForgeUI composes interfaces from a small set of powerful building blocks — similar to how design tools like Figma think in shapes and layout relationships, but focused on **real React code**.

---

## ✨ Why ForgeUI exists

Most site builders and AI tools today suffer from the same problem:

* Generated sites look different… but *feel the same*
* Code output is messy or locked to the platform
* Animations and images are hardcoded or overused

ForgeUI solves this by:

* Using **visual primitives**, not infinite components
* Applying **controlled variation** through patterns and tokens
* Separating **preview**, **model**, and **export** layers
* Generating **clean, editable React projects**

---

## 🧠 Core Concepts

### 1. Primitives (small & powerful)

ForgeUI is built on a minimal set of primitives:

* Layout: `Box`, `Stack`, `Grid`
* Content: `Text`, `Image`, `Button`
* Visual: `Shape`, `Divider`
* Progress: `LinearProgress`, `RadialProgress`

These primitives are composable and predictable.

---

### 2. Patterns (composition, not templates)

Patterns are **recipes**, not fixed components.

Examples:

* Hero sections
* Feature grids
* Stats blocks
* Gamified radial indicators

Patterns are assembled from primitives and can adapt visually based on context.

---

### 3. JSON Model (single source of truth)

All UI is driven by a structured JSON model:

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

The JSON model powers:

* Visual Builder
* Code Panel
* Preview Renderer
* Project Export

---

### 4. Motion System (declarative & controlled)

Animations are handled through **motion tokens**, not hardcoded effects.

```ts
MotionTokens {
  entrance: "fade" | "slide" | "scale"
  intensity: "soft" | "medium" | "strong"
  speed: "slow" | "normal" | "fast"
}
```

Motion is applied via wrappers, keeping components clean.

---

### 5. Asset System (preview vs export)

Images are abstracted as assets, not file paths.

* Preview uses blobs or base64
* Export generates real files and paths

```ts
ImageAsset {
  id: string
  previewSrc: string
  exportSrc?: string
  aspect: "square" | "landscape" | "portrait"
}
```

---

## 🧩 Features (MVP)

* Visual Builder (primitive & pattern-based)
* Real-time preview (in-memory rendering)
* Motion system with entrance animations
* Image upload with metadata
* Controlled Code Panel (JSX-like view)
* Project export as a clean React + Vite setup (ZIP)

---

## ❌ Out of scope (for MVP)

* Hosting / deployment
* Authentication
* Collaboration
* Advanced image editing
* Docker or cloud pipelines

These will be considered after the core engine is solid.

---

## 🎯 Philosophy

* Fewer primitives → more variation
* Constraints create better design
* JSON governs everything
* Preview is not the project — export is
* IA assists, never owns the system

---

## 🚧 Status

This project is currently under **active development**.

The initial focus is building:

1. Primitive API
2. JSON schema
3. Renderer engine
4. Pattern system

---

## 📌 Vision

ForgeUI aims to become:

* A serious UI composition engine
* A dev-first alternative to template-based builders
* A bridge between design thinking and production-ready React code

---

## 📜 License

MIT

---

Made with engineering-first thinking.
