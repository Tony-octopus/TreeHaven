/**
 * Inline SVG icon set. Icons inherit `currentColor` and default to a 1em box so
 * they scale with surrounding text. Marked aria-hidden — pair with visible or
 * visually-hidden text for accessible labels.
 */

function Base({ children, size = 24, strokeWidth = 1.8, fill = 'none', ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export function LeafLogo({ size = 28, ...rest }) {
  return (
    <Base size={size} {...rest}>
      <path d="M4 20c9 1 15-4 16-16C9 4 3 9 4 20Z" />
      <path d="M4 20C7 14 11 10 16 8" />
    </Base>
  )
}

export function CartIcon(props) {
  return (
    <Base {...props}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M3 4h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21 8H6" />
    </Base>
  )
}

export function SearchIcon(props) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Base>
  )
}

export function MenuIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Base>
  )
}

export function CloseIcon(props) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  )
}

export function CheckIcon(props) {
  return (
    <Base {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Base>
  )
}

export function ChevronRight(props) {
  return (
    <Base {...props}>
      <path d="m9 6 6 6-6 6" />
    </Base>
  )
}

export function ArrowRight(props) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  )
}

export function TrashIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
    </Base>
  )
}

export function MinusIcon(props) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
    </Base>
  )
}

export function PlusIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  )
}

export function StarIcon({ filled = false, ...props }) {
  return (
    <Base fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
    </Base>
  )
}

export function TruckIcon(props) {
  return (
    <Base {...props}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </Base>
  )
}

export function ShieldIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  )
}

export function SproutIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 20v-7" />
      <path d="M12 13c0-3 2-5 6-5 0 3-2 5-6 5Z" />
      <path d="M12 13c0-3-2-5-6-5 0 3 2 5 6 5Z" />
    </Base>
  )
}

export function SunIcon(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Base>
  )
}

export function DropIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3Z" />
    </Base>
  )
}

export function GaugeIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 13l4-3" />
      <path d="M4 18a8 8 0 1 1 16 0" />
    </Base>
  )
}

export function RulerIcon(props) {
  return (
    <Base {...props}>
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
    </Base>
  )
}

export function MailIcon(props) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Base>
  )
}

export function PhoneIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 5c0 8 7 15 15 15l-2-4-4-1-2 2c-2-1-4-3-5-5l2-2-1-4z" />
    </Base>
  )
}

export function PinIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </Base>
  )
}
