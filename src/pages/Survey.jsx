import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import FormField from '../components/ui/FormField'
import { LeafLogo, CheckIcon } from '../components/ui/Icons'
import './Survey.css'

/**
 * Post-visit / post-purchase survey — the "communicate process".
 *
 * Designed to be non-intrusive: it is opt-in (reached by a link, never a
 * pop-up), takes under a minute, and every question except the overall rating
 * is optional. The tone is warm and conversational to "engage in a connection".
 */

const RATING_OPTIONS = [
  { value: '1', emoji: '😞', label: 'Poor' },
  { value: '2', emoji: '😕', label: 'Fair' },
  { value: '3', emoji: '🙂', label: 'Good' },
  { value: '4', emoji: '😄', label: 'Great' },
  { value: '5', emoji: '🤩', label: 'Amazing' },
]

const FINDABILITY_OPTIONS = [
  { value: 'very-easy', label: 'Very easy' },
  { value: 'easy', label: 'Fairly easy' },
  { value: 'neutral', label: 'Neither easy nor hard' },
  { value: 'hard', label: 'A little hard' },
  { value: 'very-hard', label: 'Very hard' },
]

const RECOMMEND_OPTIONS = [
  { value: 'yes', label: 'Yes, definitely!' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'no', label: 'Not yet' },
]

const INITIAL = {
  rating: '',
  findability: '',
  recommend: '',
  comment: '',
}

export default function Survey() {
  const location = useLocation()
  const cameFromOrder = location.state?.fromOrder === true
  const [form, setForm] = useState(INITIAL)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'rating' && error) setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.rating) {
      setError('Please pick a rating so we know how we did!')
      document.getElementById('rating-group')?.focus()
      return
    }
    // No backend — we simply acknowledge the feedback locally.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="survey">
        <div className="container survey__thanks">
          <span className="survey__thanks-icon" aria-hidden="true">
            <CheckIcon size={34} />
          </span>
          <span className="eyebrow">Thank you</span>
          <h1>You just made our day! 🌱</h1>
          <p className="lede text-muted">
            Thank you for sharing your thoughts — every note helps us grow a
            better TreeHaven for you and fellow plant lovers.
          </p>
          <div className="survey__thanks-actions">
            <Link to="/shop" className="btn btn--lg">
              Keep exploring
            </Link>
            <Link to="/" className="btn btn--secondary btn--lg">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="survey">
      <PageHeader
        eyebrow="Quick survey"
        title={
          cameFromOrder
            ? 'How was your shopping experience?'
            : 'We’d love to hear from you!'
        }
        subtitle="Your feedback shapes what we plant next. It takes less than a minute — and every question but the first is optional."
      />

      <section className="section">
        <div className="container survey__container">
          <form className="survey__form card" onSubmit={handleSubmit} noValidate>
            {/* Overall rating */}
            <fieldset className="survey__group" id="rating-group" tabIndex={-1}>
              <legend className="survey__legend">
                Overall, how would you rate your visit?{' '}
                <span className="req" aria-hidden="true">
                  *
                </span>
              </legend>
              <div
                className="survey__ratings"
                role="radiogroup"
                aria-label="Overall rating"
              >
                {RATING_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    role="radio"
                    aria-checked={form.rating === option.value}
                    className={`survey__rating${
                      form.rating === option.value ? ' survey__rating--active' : ''
                    }`}
                    onClick={() => update('rating', option.value)}
                  >
                    <span className="survey__rating-emoji" aria-hidden="true">
                      {option.emoji}
                    </span>
                    <span className="survey__rating-label">{option.label}</span>
                  </button>
                ))}
              </div>
              {error && (
                <p className="field__error" role="alert">
                  {error}
                </p>
              )}
            </fieldset>

            {/* Findability — ties to the faceted search */}
            <fieldset className="survey__group">
              <legend className="survey__legend">
                How easy was it to find what you were looking for?
              </legend>
              <div className="survey__options">
                {FINDABILITY_OPTIONS.map((option) => (
                  <label key={option.value} className="survey__option">
                    <input
                      type="radio"
                      name="findability"
                      value={option.value}
                      checked={form.findability === option.value}
                      onChange={(event) =>
                        update('findability', event.target.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Recommend */}
            <fieldset className="survey__group">
              <legend className="survey__legend">
                Would you recommend TreeHaven to a friend?
              </legend>
              <div className="survey__options survey__options--row">
                {RECOMMEND_OPTIONS.map((option) => (
                  <label key={option.value} className="survey__option">
                    <input
                      type="radio"
                      name="recommend"
                      value={option.value}
                      checked={form.recommend === option.value}
                      onChange={(event) => update('recommend', event.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Open comment */}
            <FormField
              id="comment"
              label="Anything else you’d like to tell us?"
              hint="Optional — but we read every word."
              multiline
              rows={4}
              placeholder="What did you love? What could we grow better?"
              value={form.comment}
              onChange={(event) => update('comment', event.target.value)}
            />

            <div className="survey__submit">
              <button type="submit" className="btn btn--lg">
                Share my feedback
              </button>
              <p className="survey__privacy text-muted">
                <LeafLogo size={16} /> Anonymous &amp; secure — no account needed.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
