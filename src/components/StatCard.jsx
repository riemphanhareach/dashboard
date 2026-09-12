export default function StatCard({ title, value, icon: Icon, color = "orange" }) {
  const iconBg = {
    orange: "bg-orange-500 text-white",
    blue: "bg-blue-500 text-white",
    emerald: "bg-emerald-500 text-white",
    red: "bg-red-500 text-white",
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${iconBg[color] || iconBg.orange}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </div>
  );
}
