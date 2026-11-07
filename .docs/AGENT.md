# Portfolio Project Instructions

Apply these checks whenever implementing or changing anything in this project.

## Before making changes

1. Read `.docs/RULES.md` from the project root and follow its project-specific standards.
2. Before changing application code, consult `.docs/ARCHITECTURE.md`. Verify relevant details against the source and configuration; if the document is missing or outdated, inspect the implementation before making architecture assumptions.
3. Before adding or changing a screen, route, page section, or UI component, consult `.docs/DESIGN.md`. Follow the documented visual system, responsive behavior, interaction patterns, and accessibility guidance. Update the design document when a change alters an established design token, reusable pattern, or documented UI behavior.
4. Inspect the relevant existing implementation and preserve unrelated work.

## After implementation

- From the project root, run `graphify update .` after each implementation or project change so `graphify-out/` reflects the current project.
- If the Graphify command is unavailable or fails, report that plainly and continue without claiming the graph was refreshed.
