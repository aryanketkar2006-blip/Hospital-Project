/**
 * BedOccupancyChart — Horizontal bar chart showing bed occupancy by ward.
 * Displays ward name, fraction (occupied/total), percentage, and a color-coded progress bar.
 * @param {{ data: Array<{ ward: string, occupied: number, total: number, color: string }> }} props
 */
export default function BedOccupancyChart({ data }) {
  return (
    <div className="space-y-4 mt-4">
      {data.map((ward) => {
        const percent = Math.round((ward.occupied / ward.total) * 100);
        return (
          <div key={ward.ward}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] text-body-text">{ward.ward}</span>
              <span className="text-[13px] text-muted">
                {ward.occupied}/{ward.total} ({percent}%)
              </span>
            </div>
            <div className="h-2 bg-light-gray rounded overflow-hidden">
              <div
                className="h-full rounded"
                style={{
                  width: `${percent}%`,
                  backgroundColor: ward.color,
                  transition: 'width 150ms ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
