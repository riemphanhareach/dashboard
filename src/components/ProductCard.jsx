import { Plus } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={() => !isOutOfStock && onAddToCart(product)}
      className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer select-none ${isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5 hover:border-orange-300"
        }`}
    >
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80";
          }}
        />
        {isOutOfStock ? (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
            Out of Stock
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
            {product.stock} left
          </span>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400">{product.category}</span>
          <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{product.name}</h4>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-base font-black text-orange-600">${product.price.toFixed(2)}</span>

          <button
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock) onAddToCart(product);
            }}
            className="w-8 h-8 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white flex items-center justify-center transition-colors disabled:opacity-50"
            title="Add to Cart"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

