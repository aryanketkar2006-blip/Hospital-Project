/**
 * QueueTable — Displays the live OPD queue as a styled table.
 * Shows token, patient name, department, wait time, and status for each entry.
 * @param {{ data: Array<{ token: string, patient: string, department: string, wait: string, status: string }> }} props
 */
export default function QueueTable({ data }) {
  /** Maps queue status to pill background and text color */
  const statusStyles = {
    'In Progress': 'bg-primary-light text-primary',
    Waiting: 'bg-[#FEF3C7] text-[#92400E]',
    Registered: 'bg-light-gray text-muted',
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-xs text-muted font-medium px-3.5 py-2.5">Token</th>
            <th className="text-left text-xs text-muted font-medium px-3.5 py-2.5">Patient</th>
            <th className="text-left text-xs text-muted font-medium px-3.5 py-2.5 hidden sm:table-cell">Department</th>
            <th className="text-left text-xs text-muted font-medium px-3.5 py-2.5">Wait</th>
            <th className="text-left text-xs text-muted font-medium px-3.5 py-2.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.token} className="border-b border-light-gray">
              <td className="text-sm text-dark-text font-medium px-3.5 py-3">{row.token}</td>
              <td className="text-sm text-body-text px-3.5 py-3">{row.patient}</td>
              <td className="text-sm text-body-text px-3.5 py-3 hidden sm:table-cell">{row.department}</td>
              <td className="text-sm text-body-text px-3.5 py-3">{row.wait}</td>
              <td className="px-3.5 py-3">
                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[row.status] || statusStyles.Registered}`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
