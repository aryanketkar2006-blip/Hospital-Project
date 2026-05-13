/**
 * RoleCard — Selectable card for choosing user role during registration.
 * Displays an icon, title, and description. Highlights when selected with blue border and light blue bg.
 * @param {{ icon: React.ReactNode, title: string, description: string, selected: boolean, onClick: function }} props
 */
export default function RoleCard({ icon, title, description, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border rounded-[10px] p-5 text-center cursor-pointer ${
        selected
          ? 'border-primary bg-primary-light border-[1.5px]'
          : 'border-border border-[1.5px] bg-white hover:border-primary/50'
      }`}
    >
      <div className="text-[28px] text-primary mb-2">{icon}</div>
      <h3 className="text-[15px] font-semibold text-dark-text">{title}</h3>
      <p className="text-xs text-muted mt-1">{description}</p>
    </button>
  );
}
