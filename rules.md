# Role: Senior Fullstack Next.js Developer (v16+ Expert)

## Project Tech Stack
- Framework: Next.js 24.11 (App Router)
- Language: TypeScript (Strict)
- Styling: Tailwind CSS + CSS Variables
- UI Components: shadcn/ui
- Animations: Framer Motion
- I18n: Sub-path routing (/pl, /en) with Dictionary-based translations.

## Navigation & Layout
1. **Desktop Header:**
   - Must be "Sticky" (pinned to top).
   - Implement a scroll effect: when scrolling down, the header height/padding should decrease (shrink effect).
2. **Mobile Navigation:**
   - Use a Hamburger menu.
   - On click: Open a **Full-screen Overlay menu**.
   - Content: Large, readable links (same as desktop) + Language switcher at the very bottom.
   - **Scroll Lock:** While the menu is open, the background (body) must have overflow hidden (no scrolling allowed).

## Data & i18n
- **Data:** Fetch from `/data/*.json` via **GET** requests to `/app/api/`.
- **i18n:** No hardcoded strings. All content from `messages/pl.json` and `messages/en.json`.
- **Static Export:** Use `generateStaticParams` for routes to support `output: 'export'`.

## Styling & Design
- **Visuals:** Strictly follow the provided screenshot for colors and spacing.
- **CSS Variables:** Use `--primary`, `--secondary`, `--accent` in `globals.css`.
- **Animations:** Modern "Reveal on Scroll" using Framer Motion.

## Footer Specification
- **Position:** Always at the very bottom of the page.
- **Content:** All text must be lowercase.
- **Components:** Include a Link to `https://emer.co` containing the `Emerco` SVG component, followed by the current year: `<span>{new Date().getFullYear()}</span>`.
- **Emerco SVG:** Implement as a React component using the provided path data (viewBox="0 0 92 15"), ensuring it accepts a `className` for sizing (default: `h-2 w-auto`).

## Error Handling & Image Management
- Implement `loading.tsx` and `error.tsx`.
- Use `next/image` with `unoptimized: true` (for static export compatibility).
- Use placeholders from Unsplash if images are missing.

## Final Build Verification
- Ensure `next.config.ts` is set to `output: 'export'`.
- **CRITICAL:** Always include `trailingSlash: true` in `next.config.ts` alongside `output: 'export'`! This guarantees that paths generate as `/route/index.html` instead of `/route.html`, avoiding `403 Forbidden` errors on standard web servers (Apache/Nginx).
- Check if all Client Components avoid Node.js-only APIs.
- Confirm: "Is the mobile menu locking the scroll? Is the header shrinking on desktop?"

## Brand Assets & Components
1. **Logo Component (Emerco):**
   - Use the following SVG component for branding.
   - **MANDATORY:** Always pass `className` for sizing and coloring (use Tailwind classes like `w-32 h-auto text-primary`).

```tsx
export const Emerco = ({ className }: { className: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 92 15" 
    xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" 
    style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }}
  >
    <path 
      fill="currentColor" 
      d="M3.96 7.927c.078.297.19.573.335.829.314.552.773.981 1.376 1.287.604.306 1.322.459 2.154.459.578 0 1.092-.085 1.542-.255.451-.17.939-.459 1.466-.867l1.912 2.702a7.662 7.662 0 0 1-1.682 1.122 8.695 8.695 0 0 1-1.823.65 8.146 8.146 0 0 1-1.848.216c-1.495 0-2.795-.301-3.9-.905-1.104-.603-1.963-1.427-2.574-2.472C.306 9.648 0 8.454 0 7.112c0-1.037.17-1.989.51-2.855a6.797 6.797 0 0 1 1.427-2.256A6.347 6.347 0 0 1 4.117.523C4.958.174 5.88 0 6.882 0c.952 0 1.823.17 2.613.51a6.112 6.112 0 0 1 3.377 3.594c.306.833.442 1.742.408 2.727l-.025 1.096H3.96Zm-.013-2.294h5.561v-.025a2.282 2.282 0 0 0-.395-1.135 2.373 2.373 0 0 0-.905-.777 2.812 2.812 0 0 0-1.275-.28c-.663 0-1.228.131-1.695.395-.467.263-.82.645-1.058 1.147a3.457 3.457 0 0 0-.233.675Zm22.696-3.227c.194-.302.425-.582.695-.838a5.402 5.402 0 0 1 1.159-.842 5.917 5.917 0 0 1 1.326-.522 5.28 5.28 0 0 1 1.325-.179c1.071 0 1.963.209 2.677.625.714.416 1.253 1.041 1.618 1.873.366.833.548 1.844.548 3.034v8.258h-4.103V5.888c0-.544-.077-.994-.23-1.351a1.673 1.673 0 0 0-.675-.803c-.298-.178-.667-.267-1.109-.267-.357 0-.684.059-.981.178a2.34 2.34 0 0 0-.765.484 2.197 2.197 0 0 0-.497.714 2.268 2.268 0 0 0-.179.918v8.054h-4.103V5.863c0-.51-.077-.943-.23-1.3a1.718 1.718 0 0 0-.688-.816 2.012 2.012 0 0 0-1.071-.28c-.356 0-.684.059-.981.178a2.36 2.36 0 0 0-.765.484 2.212 2.212 0 0 0-.497.714 2.2 2.2 0 0 0-.178.892v8.08h-4.104V.28h3.874l.086 1.641A4.506 4.506 0 0 1 20.15.726a5.333 5.333 0 0 1 1.249-.522c.433-.119.87-.179 1.312-.179.663 0 1.266.102 1.81.306a3.62 3.62 0 0 1 1.428.982c.268.296.499.66.694 1.093Zm14.736 5.521c.078.297.19.573.335.829.314.552.773.981 1.376 1.287.604.306 1.322.459 2.154.459.578 0 1.092-.085 1.542-.255.451-.17.939-.459 1.466-.867l1.912 2.702a7.644 7.644 0 0 1-1.683 1.122 8.667 8.667 0 0 1-1.822.65 8.146 8.146 0 0 1-1.848.216c-1.496 0-2.795-.301-3.9-.905-1.105-.603-1.963-1.427-2.575-2.472-.611-1.045-.917-2.239-.917-3.581 0-1.037.17-1.989.51-2.855a6.797 6.797 0 0 1 1.427-2.256A6.353 6.353 0 0 1 41.535.523C42.377.174 43.298 0 44.301 0c.952 0 1.823.17 2.613.51a6.112 6.112 0 0 1 3.377 3.594c.306.833.442 1.742.408 2.727l-.025 1.096h-9.295Zm-.013-2.294h5.561v-.025a2.273 2.273 0 0 0-.396-1.135 2.37 2.37 0 0 0-.904-.777 2.812 2.812 0 0 0-1.275-.28c-.663 0-1.228.131-1.695.395-.467.263-.82.645-1.058 1.147a3.457 3.457 0 0 0-.233.675Zm14.872-3.282A5.425 5.425 0 0 1 58.218.51c.629-.34 1.3-.51 2.014-.51.306 0 .591.025.854.076s.506.111.727.179l-1.122 4.512a2.539 2.539 0 0 0-.752-.294 4.156 4.156 0 0 0-.981-.114c-.374 0-.723.063-1.045.191-.323.127-.595.31-.816.548a2.662 2.662 0 0 0-.523.841 2.974 2.974 0 0 0-.191 1.096v6.78h-4.104V.28h3.875l.084 2.071ZM71.422 14.07c-1.308 0-2.481-.306-3.517-.917a6.708 6.708 0 0 1-2.46-2.511c-.603-1.062-.905-2.264-.905-3.607 0-1.342.302-2.545.905-3.607a6.698 6.698 0 0 1 2.46-2.51C68.941.306 70.114 0 71.422 0c1.207 0 2.315.212 3.327.637 1.011.425 1.814 1.02 2.408 1.785l-2.217 2.65a5.33 5.33 0 0 0-.841-.764 4.02 4.02 0 0 0-1.071-.561 3.7 3.7 0 0 0-1.224-.204c-.645 0-1.215.149-1.707.446-.493.298-.875.71-1.147 1.236-.272.527-.408 1.13-.408 1.81 0 .646.14 1.232.42 1.759.281.527.667.943 1.16 1.249a3.124 3.124 0 0 0 1.682.459c.442 0 .85-.055 1.224-.166.374-.11.718-.276 1.032-.497.315-.221.608-.493.88-.816l2.192 2.677c-.578.73-1.381 1.308-2.409 1.733a8.552 8.552 0 0 1-3.301.637Zm13.218 0c-1.41 0-2.663-.306-3.76-.917a6.93 6.93 0 0 1-2.599-2.498c-.638-1.054-.956-2.26-.956-3.62 0-1.359.318-2.566.956-3.619A6.914 6.914 0 0 1 80.88.918C81.977.306 83.23 0 84.64 0c1.411 0 2.664.306 3.76.918a6.824 6.824 0 0 1 2.587 2.498c.629 1.053.943 2.26.943 3.619 0 1.36-.314 2.566-.943 3.62a6.839 6.839 0 0 1-2.587 2.498c-1.096.611-2.349.917-3.76.917Zm0-3.517c.612 0 1.156-.153 1.632-.459a3.199 3.199 0 0 0 1.121-1.249c.272-.527.399-1.13.382-1.81.017-.68-.11-1.287-.382-1.822a3.175 3.175 0 0 0-1.121-1.262 2.952 2.952 0 0 0-1.632-.459c-.612 0-1.16.153-1.644.459a3.14 3.14 0 0 0-1.134 1.262c-.272.535-.4 1.142-.383 1.822-.017.68.111 1.283.383 1.81.272.527.65.943 1.134 1.249a3.011 3.011 0 0 0 1.644.459Zm-23.286-.994a2.269 2.269 0 1 1-.001 4.537 2.269 2.269 0 0 1 .001-4.537Z" 
    />
  </svg>
);