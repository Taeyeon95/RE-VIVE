import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DailySavingsPoint } from '../../utils/statsCalc';

interface Props {
  data: DailySavingsPoint[];
}

export function SavingsChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="text-label-sm border-primary/5 shadow-soft flex h-48 items-center justify-center rounded-xl border bg-white text-on-surface-variant">
        아직 기록이 없어요
      </div>
    );
  }

  return (
    <div className="border-primary/5 shadow-soft h-56 w-full rounded-xl border bg-white p-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e3de" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`${Number(value).toLocaleString()}원`, '절약액']} />
          <Bar dataKey="amount" fill="#fd8b00" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
