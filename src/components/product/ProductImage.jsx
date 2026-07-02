import { useId } from 'react'
import './ProductImage.css'

/**
 * Renders a self-contained SVG illustration for a product based on its `art`
 * descriptor. No network requests are made, so imagery works offline and never
 * produces broken-image console errors.
 *
 * The illustration is decorative: callers always render the product name as
 * text nearby, so the SVG is marked aria-hidden to avoid redundant announcements.
 */

const TRUNK = '#7a5c41'
const TRUNK_DARK = '#5f452f'
const SOIL = '#5a4632'

export default function ProductImage({ product, className = '' }) {
  const gradientId = useId()
  const art = product?.art ?? { kind: 'plant', shape: 'round', leaf: '#3f8f5b' }
  const skyId = `${gradientId}-sky`

  return (
    <svg
      className={`product-image ${className}`.trim()}
      viewBox="0 0 400 400"
      role="img"
      aria-label={`Illustration of ${product?.name ?? 'product'}`}
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4efe3" />
          <stop offset="100%" stopColor="#e5eddd" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="400" fill={`url(#${skyId})`} />
      <circle cx="200" cy="185" r="150" fill="#ffffff" opacity="0.45" />

      {art.kind === 'supply'
        ? renderSupply(art)
        : renderPlant(art)}

      {/* Ground line */}
      <ellipse cx="200" cy="372" rx="150" ry="14" fill="#000000" opacity="0.05" />
    </svg>
  )
}

/* ----------------------------------------------------------------- Plants */

function renderPlant(art) {
  const foliage = FOLIAGE[art.shape] ?? FOLIAGE.round
  return (
    <>
      {renderPot(art)}
      {foliage(art)}
    </>
  )
}

function renderPot(art) {
  const pot = art.pot ?? '#c47a4b'
  return (
    <g>
      {/* soil */}
      <ellipse cx="200" cy="300" rx="52" ry="12" fill={SOIL} />
      {/* pot body */}
      <path
        d="M150 302 L250 302 L238 372 Q200 380 162 372 Z"
        fill={pot}
      />
      {/* rim */}
      <rect x="144" y="292" width="112" height="18" rx="6" fill={pot} />
      <rect x="144" y="292" width="112" height="6" rx="3" fill="#ffffff" opacity="0.18" />
      {/* shading */}
      <path d="M210 304 L250 302 L238 372 Q224 376 214 377 Z" fill="#000000" opacity="0.08" />
    </g>
  )
}

function trunk(height = 92, width = 16) {
  const top = 300 - height
  return (
    <rect
      x={200 - width / 2}
      y={top}
      width={width}
      height={height}
      rx={width / 2}
      fill={TRUNK}
    />
  )
}

const FOLIAGE = {
  round: (art) => (
    <g>
      {trunk(70)}
      <circle cx="200" cy="196" r="78" fill={art.leaf} />
      <circle cx="156" cy="212" r="46" fill={art.leaf} />
      <circle cx="244" cy="212" r="46" fill={art.leaf} />
      <circle cx="200" cy="160" r="52" fill={art.leafDark ?? art.leaf} opacity="0.85" />
      <circle cx="178" cy="184" r="20" fill="#ffffff" opacity="0.12" />
      {renderFruit(art)}
    </g>
  ),

  split: (art) => (
    <g>
      {trunk(64)}
      {[-1, 1].map((dir) => (
        <g key={dir}>
          <ellipse
            cx={200 + dir * 46}
            cy={196}
            rx="52"
            ry="70"
            fill={art.leaf}
            transform={`rotate(${dir * 16} ${200 + dir * 46} 196)`}
          />
          <path
            d={`M${200 + dir * 46} 150 L${200 + dir * 46} 240`}
            stroke={art.leafDark ?? '#2c6b41'}
            strokeWidth="3"
            opacity="0.5"
          />
        </g>
      ))}
      <ellipse cx="200" cy="176" rx="46" ry="66" fill={art.leafDark ?? art.leaf} />
      {/* fenestration notches */}
      <circle cx="176" cy="196" r="7" fill="#e9efe1" />
      <circle cx="224" cy="200" r="7" fill="#e9efe1" />
    </g>
  ),

  pine: (art) => (
    <g>
      {trunk(40, 12)}
      {[0, 1, 2, 3].map((i) => {
        const y = 116 + i * 46
        const half = 34 + i * 20
        return (
          <path
            key={i}
            d={`M200 ${y} L${200 + half} ${y + 54} Q200 ${y + 44} ${200 - half} ${y + 54} Z`}
            fill={i % 2 === 0 ? art.leaf : art.leafDark ?? art.leaf}
          />
        )
      })}
    </g>
  ),

  cone: (art) => (
    <g>
      {trunk(30, 12)}
      <path d="M200 96 L262 286 Q200 300 138 286 Z" fill={art.leaf} />
      <path
        d="M200 96 L262 286 Q231 293 200 294 Z"
        fill="#000000"
        opacity="0.08"
      />
      {[150, 200, 250].map((y) => (
        <path
          key={y}
          d={`M${200 - (y - 60) * 0.5} ${y} Q200 ${y + 12} ${200 + (y - 60) * 0.5} ${y}`}
          stroke={art.leafDark ?? '#214f33'}
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
      ))}
    </g>
  ),

  palm: (art) => (
    <g>
      {/* braided trunk hint */}
      {trunk(96, 20)}
      {art.braided && (
        <path
          d="M196 300 Q214 264 196 228 Q178 192 200 208"
          stroke={TRUNK_DARK}
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
      )}
      {[-40, -20, 0, 20, 40].map((angle) => (
        <ellipse
          key={angle}
          cx="200"
          cy="150"
          rx="16"
          ry="62"
          fill={angle === 0 ? art.leafDark ?? art.leaf : art.leaf}
          transform={`rotate(${angle} 200 196)`}
        />
      ))}
      <circle cx="200" cy="150" r="12" fill={art.leafDark ?? art.leaf} />
    </g>
  ),

  fan: (art) => (
    <g>
      {trunk(70, 12)}
      {[-52, -26, 0, 26, 52].map((angle, i) => (
        <g key={angle} transform={`rotate(${angle} 200 230)`}>
          <rect x="197" y="120" width="6" height="112" fill={TRUNK} />
          <ellipse
            cx="200"
            cy="120"
            rx="30"
            ry="46"
            fill={i % 2 === 0 ? art.leaf : art.leafDark ?? art.leaf}
          />
        </g>
      ))}
    </g>
  ),

  weeping: (art) => (
    <g>
      {trunk(58, 14)}
      <ellipse cx="200" cy="176" rx="86" ry="52" fill={art.leaf} />
      <ellipse cx="200" cy="160" rx="60" ry="40" fill={art.leafDark ?? art.leaf} opacity="0.8" />
      {[-70, -40, -12, 16, 44, 72].map((dx) => (
        <path
          key={dx}
          d={`M${200 + dx} 196 q6 40 0 84`}
          stroke={art.leaf}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </g>
  ),

  bonsai: (art) => (
    <g>
      {/* shallow tray */}
      <rect x="140" y="322" width="120" height="26" rx="6" fill={art.pot ?? '#6f7268'} />
      <rect x="150" y="316" width="100" height="10" rx="4" fill={art.pot ?? '#6f7268'} />
      {/* curved trunk */}
      <path
        d="M200 320 Q176 280 196 250 Q214 226 200 196"
        stroke={TRUNK}
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M198 260 Q232 250 252 232"
        stroke={TRUNK}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* canopy pads */}
      <ellipse cx="196" cy="188" rx="52" ry="26" fill={art.leaf} />
      <ellipse cx="258" cy="220" rx="34" ry="18" fill={art.leaf} />
      <ellipse cx="150" cy="214" rx="30" ry="16" fill={art.leafDark ?? art.leaf} />
      <ellipse cx="210" cy="176" rx="30" ry="16" fill={art.leafDark ?? art.leaf} opacity="0.8" />
    </g>
  ),
}

function renderFruit(art) {
  if (!art.fruit) return null
  const spots = [
    [172, 184],
    [222, 176],
    [200, 214],
    [156, 210],
    [244, 208],
  ]
  return (
    <g>
      {spots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" fill={art.fruit} stroke="#ffffff" strokeWidth="1.5" opacity="0.95" />
      ))}
    </g>
  )
}

/* ---------------------------------------------------------------- Supplies */

function renderSupply(art) {
  const renderer = SUPPLIES[art.shape] ?? SUPPLIES.soil
  return renderer(art)
}

const SUPPLIES = {
  food: (art) => (
    <g>
      <path d="M150 150 L250 150 L262 330 Q200 342 138 330 Z" fill={art.pot ?? '#7a5c41'} />
      <path d="M150 150 L250 150 L246 176 L154 176 Z" fill="#000000" opacity="0.12" />
      <rect x="150" y="150" width="100" height="18" rx="4" fill="#3f2f22" />
      <rect x="160" y="206" width="80" height="86" rx="10" fill="#f4efe3" />
      <circle cx="200" cy="238" r="20" fill={art.leaf ?? '#6f9a72'} />
      <path d="M200 238 q22 -22 40 -8 q-8 22 -40 8" fill="#4f7a52" />
      <rect x="172" y="270" width="56" height="8" rx="4" fill="#c9c1ad" />
    </g>
  ),

  shears: (art) => (
    <g>
      <g transform="rotate(-16 200 210)">
        <path d="M200 120 L214 250 L186 250 Z" fill={art.leaf ?? '#9a9d94'} />
        <circle cx="186" cy="300" r="30" fill="none" stroke={art.pot ?? '#3f423e'} strokeWidth="14" />
      </g>
      <g transform="rotate(16 200 210)">
        <path d="M200 120 L214 250 L186 250 Z" fill="#c7cabf" />
        <circle cx="214" cy="300" r="30" fill="none" stroke={art.pot ?? '#3f423e'} strokeWidth="14" />
      </g>
      <circle cx="200" cy="222" r="9" fill="#6f7268" />
    </g>
  ),

  meter: (art) => (
    <g>
      <rect x="192" y="170" width="16" height="170" rx="8" fill="#c7cabf" />
      <path d="M200 340 L210 366 L190 366 Z" fill="#9a9d94" />
      <circle cx="200" cy="150" r="58" fill={art.pot ?? '#e5dcc8'} stroke="#c9c1ad" strokeWidth="6" />
      <path d="M150 150 A50 50 0 0 1 250 150" fill="none" stroke="#d84c3e" strokeWidth="4" opacity="0.35" />
      <path d="M150 150 A50 50 0 0 1 200 100" fill="none" stroke={art.leaf ?? '#43966a'} strokeWidth="6" />
      <line x1="200" y1="150" x2="176" y2="118" stroke="#3f423e" strokeWidth="5" strokeLinecap="round" />
      <circle cx="200" cy="150" r="8" fill="#3f423e" />
    </g>
  ),

  pot: (art) => (
    <g>
      <ellipse cx="200" cy="176" rx="70" ry="18" fill="#000000" opacity="0.08" />
      <path d="M132 176 L268 176 L248 320 Q200 332 152 320 Z" fill={art.pot ?? '#b5623a'} />
      <ellipse cx="200" cy="176" rx="68" ry="16" fill={art.leaf ?? '#c47a4b'} />
      <ellipse cx="200" cy="176" rx="52" ry="11" fill={SOIL} />
      <rect x="140" y="326" width="120" height="16" rx="6" fill={art.pot ?? '#b5623a'} opacity="0.8" />
      <path d="M226 182 L248 320 Q228 328 214 330 Z" fill="#000000" opacity="0.1" />
    </g>
  ),

  soil: (art) => (
    <g>
      <path d="M146 168 L254 168 L266 326 Q200 340 134 326 Z" fill={art.pot ?? '#7a5c41'} />
      <path d="M146 168 L254 168 L250 196 L150 196 Z" fill="#000000" opacity="0.14" />
      <rect x="146" y="168" width="108" height="14" rx="4" fill="#3f2f22" />
      <ellipse cx="200" cy="250" rx="42" ry="30" fill="#efe7d6" />
      <path d="M172 252 q10 -18 28 -14 q18 -18 30 4 q-6 18 -30 20 q-24 4 -28 -10" fill={SOIL} />
      <circle cx="188" cy="248" r="4" fill="#3f2a1c" />
      <circle cx="210" cy="256" r="4" fill="#3f2a1c" />
      <circle cx="200" cy="240" r="4" fill="#3f2a1c" />
    </g>
  ),
}
