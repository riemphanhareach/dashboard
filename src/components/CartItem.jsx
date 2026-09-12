import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl gap-2">
      {/* Name and Price */}
      <div className="min-w-0 flex-1">
        <h4 className="font-bold text-xs text-slate-800 truncate">{item.name}</h4>
        <span className="text-xs font-black text-orange-600 block mt-0.5">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      {/* Stepper (+ / -) */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:text-orange-600 hover:bg-slate-100"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-5 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:text-orange-600 hover:bg-slate-100"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        title="Remove item"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

