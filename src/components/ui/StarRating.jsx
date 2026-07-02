import { StarIcon } from './Icons'
import './StarRating.css'

/**
 * Displays a 0–5 star rating. Purely presentational; exposes an accessible
 * label like "Rated 4.6 out of 5". Optionally shows the review count.
 */
export default function StarRating({ rating = 0, reviews, size = 16 }) {
  const rounded = Math.round(rating * 2) / 2 // nearest half for fill decision
  const label = `Rated ${rating} out of 5`

  return (
    <span className="star-rating">
      <span className="star-rating__stars" role="img" aria-label={label}>
        {[1, 2, 3, 4, 5].map((position) => (
          <StarIcon
            key={position}
            size={size}
            filled={position <= Math.round(rounded)}
            className="star-rating__star"
          />
        ))}
      </span>
      <span className="star-rating__value" aria-hidden="true">
        {rating.toFixed(1)}
      </span>
      {typeof reviews === 'number' && (
        <span className="star-rating__count text-muted" aria-hidden="true">
          ({reviews})
        </span>
      )}
    </span>
  )
}
