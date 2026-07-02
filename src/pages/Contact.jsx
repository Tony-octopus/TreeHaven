import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import FormField from '../components/ui/FormField'
import { MailIcon, PhoneIcon, PinIcon, CheckIcon } from '../components/ui/Icons'
import { collectErrors, required, validateEmail } from '../utils/validation'
import './Contact.css'

const SUBJECTS = [
  { value: 'general', label: 'General question' },
  { value: 'order', label: 'Help with an order' },
  { value: 'care', label: 'Plant care advice' },
  { value: 'wholesale', label: 'Wholesale & partnerships' },
]

const CONTACT_METHODS = [
  {
    icon: MailIcon,
    title: 'Email',
    value: 'hello@treehaven.example',
    href: 'mailto:hello@treehaven.example',
  },
  {
    icon: PhoneIcon,
    title: 'Phone',
    value: '(503) 555-0142',
    href: 'tel:+15035550142',
  },
  {
    icon: PinIcon,
    title: 'Nursery',
    value: '42 Grove Lane, Portland, OR',
  },
]

const INITIAL = { name: '', email: '', subject: 'general', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (event) => {
    const { value } = event.target
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = collectErrors({
      name: required(form.name, 'Name'),
      email: validateEmail(form.email),
      message:
        required(form.message, 'Message') ||
        (form.message.trim().length < 10
          ? 'Please share a little more detail (10+ characters).'
          : ''),
    })
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }

    setSubmitted(true)
    setForm(INITIAL)
  }

  return (
    <div className="contact">
      <PageHeader
        eyebrow="Contact"
        title="We’d love to hear from you"
        subtitle="Questions about a tree, an order, or plant care? Our team typically replies within one business day."
      />

      <section className="section">
        <div className="container contact__layout">
          <aside className="contact__info">
            <h2>Reach us directly</h2>
            <ul className="contact__methods" role="list">
              {CONTACT_METHODS.map(({ icon: Icon, title, value, href }) => (
                <li key={title} className="contact__method">
                  <span className="contact__method-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <div>
                    <span className="contact__method-title">{title}</span>
                    {href ? (
                      <a href={href}>{value}</a>
                    ) : (
                      <span className="text-muted">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact__hours card">
              <h3>Nursery hours</h3>
              <dl>
                <div>
                  <dt>Mon – Fri</dt>
                  <dd>9am – 6pm</dd>
                </div>
                <div>
                  <dt>Saturday</dt>
                  <dd>10am – 4pm</dd>
                </div>
                <div>
                  <dt>Sunday</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="contact__form-wrap card">
            {submitted ? (
              <div className="contact__success" role="status">
                <span className="contact__success-icon" aria-hidden="true">
                  <CheckIcon size={32} />
                </span>
                <h2>Message sent!</h2>
                <p className="text-muted">
                  Thanks for reaching out. We’ll get back to you within one
                  business day.
                </p>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <h2>Send a message</h2>
                <FormField
                  id="name"
                  label="Your name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={update('name')}
                  error={errors.name}
                />
                <FormField
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  error={errors.email}
                />
                <FormField
                  id="subject"
                  label="Subject"
                  options={SUBJECTS}
                  value={form.subject}
                  onChange={update('subject')}
                />
                <FormField
                  id="message"
                  label="Message"
                  multiline
                  rows={5}
                  required
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={update('message')}
                  error={errors.message}
                />
                <button type="submit" className="btn btn--lg">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
