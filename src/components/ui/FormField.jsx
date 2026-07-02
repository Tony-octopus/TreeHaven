/**
 * Reusable, accessible form field. Renders an input, textarea, or select and
 * wires up the label, hint, validation state, and error message with the right
 * ARIA attributes. Any extra props (value, onChange, type, autoComplete, ...)
 * are forwarded to the underlying control.
 */
export default function FormField({
  id,
  label,
  error,
  hint,
  required = false,
  options,
  multiline = false,
  className = '',
  ...controlProps
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const shared = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    ...controlProps,
  }

  return (
    <div className={`field${error ? ' field--invalid' : ''}${className ? ` ${className}` : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && <span className="req" aria-hidden="true"> *</span>}
      </label>

      {options ? (
        <select className="select" {...shared}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea className="textarea" {...shared} />
      ) : (
        <input className="input" {...shared} />
      )}

      {hint && !error && (
        <span className="field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
