# SentraUjian UI Design System

The UI uses a calm Institutional Blue palette for dense operational dashboards. Shared tokens live in `packages/ui`; application styles must prefer semantic tokens over hardcoded colors.

## Rules

- Use Geist for headings, Inter for body text, and JetBrains Mono for IDs, checksums, and one-time tokens.
- Use `success`, `warning`, and `danger` with an icon and visible text; never communicate operational status by color alone.
- Use 6px input radius, 10px button radius, 14px card/modal radius, and pill radius for badges.
- Keep motion to 150ms hover/focus transitions. Do not add decorative animation or parallax.
- Loading uses layout-preserving skeletons. Offline, error, empty, stale, reconnecting, and permission states are first-class UI states.
- Forms use labels above controls, React Hook Form, Zod validation, and an error message below the invalid field.
- Icon-only controls require an accessible label. All interactive controls must be keyboard reachable and visibly focusable.
- Tables use readable status badges, sticky headers only inside scroll containers, and pagination or virtualization for large datasets.

Central Web and Edge Admin Web share tokens and primitives but keep separate navigation and layout language. Mobile follows the same semantic status meanings while adapting density to touch interaction.
