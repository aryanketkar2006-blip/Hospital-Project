/**
 * FormField — Reusable form field component with label, input, and inline validation.
 * Supports text, email, password, tel, date, number, select, and textarea types.
 * @param {{ label: string, type: string, name: string, value: string, onChange: function, placeholder: string, error: string, options: Array, info: string, rows: number, min: number, max: number, required: boolean }} props
 */
export default function FormField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  options = [],
  info = '',
  rows = 2,
  min,
  max,
  required = false,
  className = '',
}) {
  const inputClasses =
    'w-full h-[44px] border border-border rounded-lg px-3 text-sm text-dark-text focus:border-primary focus:ring-2 focus:ring-primary-border outline-none';
  const errorClasses = 'text-xs text-danger mt-1';
  const infoClasses = 'text-xs text-muted mt-1';

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-dark-text mb-1.5">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm text-dark-text focus:border-primary focus:ring-2 focus:ring-primary-border outline-none resize-none"
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className={inputClasses}
        />
      )}

      {info && !error && <p className={infoClasses}>{info}</p>}
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  );
}
