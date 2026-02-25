# Accessibility Checklist

Use this checklist when adding or reviewing components in Blue Line.

## Before Opening a PR

### Keyboard Navigation
- [ ] All interactive elements are focusable (use `<button>`, `<a>`, or `tabindex="0"`)
- [ ] Focus order follows visual reading order
- [ ] `:focus-visible` style is present (2px solid `var(--primary)`)
- [ ] No focus traps (user can Tab in and out)
- [ ] Modals trap focus correctly (Tab cycles within modal, Escape closes)

### Color & Contrast
- [ ] Text on background meets 4.5:1 contrast ratio
- [ ] Large text (18px+ or 14px+ bold) meets 3:1
- [ ] UI components (borders, icons) meet 3:1 against adjacent colors
- [ ] No state is indicated by color alone (add border, icon, text, or weight)
- [ ] Use `--text-muted-accessible` for placeholder/hint text (not `--text-muted`)
- [ ] Test in both light and dark mode

### Touch Targets
- [ ] All clickable elements are at least 24x24px
- [ ] If visual size is smaller (e.g., 16px icon), add padding to reach 24px touch area
- [ ] Minimum 8px spacing between adjacent touch targets

### ARIA
- [ ] Custom checkboxes use `role="checkbox"` + `aria-checked`
- [ ] Custom radio buttons use `role="radio"` + `aria-checked`
- [ ] Toggle switches use `role="switch"` + `aria-checked`
- [ ] Modals use `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- [ ] Icon-only buttons have `aria-label`
- [ ] Loading buttons have `aria-busy="true"`
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Error messages are linked via `aria-describedby`

### Reduced Motion
- [ ] Component transitions are covered by the `prefers-reduced-motion` block
- [ ] No auto-playing animations that can't be paused

### Screen Reader
- [ ] Content makes sense when read linearly (no visual-only context)
- [ ] Status changes are announced via `aria-live` regions where appropriate
- [ ] Tables use `<th>` for headers with `scope="col"` or `scope="row"`

## Testing Tools

1. **Keyboard**: Tab through the component, verify all states are reachable
2. **Browser zoom**: Zoom to 200%, verify layout doesn't break
3. **Lighthouse**: Run accessibility audit in Chrome DevTools
4. **axe DevTools**: Browser extension for detailed WCAG checking
5. **Color contrast**: Use Chrome DevTools color picker (shows contrast ratio)
6. **Screen reader**: Test with VoiceOver (macOS) or NVDA (Windows)
