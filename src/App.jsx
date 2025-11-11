import React, { useState, useEffect } from "react";
import { ShoppingCart, Package, User, Hash, RefreshCw } from "lucide-react";

export default function Cam2Cart() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = "https://cam2cart-backend.onrender.com/api/orders";

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(BACKEND_URL);
      if (!response.ok) throw new Error("Failed to fetch data from backend");

      const data = await response.json();
      setOrderData(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setOrderData({
        orderId: "ORD-2024-001",
        username: "saikrishna",
        items: [
          { id: 1, name: "Wireless Mouse", quantity: 2, price: 29.99 },
          { id: 2, name: "Mechanical Keyboard", quantity: 1, price: 89.99 },
          { id: 3, name: "USB Cable", quantity: 3, price: 9.99 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () =>
    orderData?.items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-amber-400 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="h-16 w-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-amber-200 text-lg font-medium tracking-wide">
            Fetching your royal order...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-amber-500 py-10 px-4 flex justify-center items-center text-gray-100">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-10 space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/20 pb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-400 p-3 rounded-2xl shadow-md">
              <ShoppingCart className="w-7 h-7 text-purple-900" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-amber-300 drop-shadow">
              cam2cart
            </h1>
          </div>

          <button
            onClick={fetchOrderData}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-purple-900 font-semibold rounded-xl hover:bg-amber-300 active:scale-95 transition-transform shadow-lg"
          >
            <RefreshCw className="w-4 h-4 ml-1" />
            <span >Refresh</span>
          </button>
        </div>

        {error && (
          <div className="bg-amber-200/30 text-amber-100 p-4 rounded-xl shadow-inner text-sm">
            ⚠️ Using demo data — make sure your backend is running.
          </div>
        )}

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-amber-300/20 to-purple-400/10 rounded-2xl border border-white/10">
            <Hash className="w-6 h-6 text-amber-300" />
            <div>
              <p className="text-sm text-amber-100">Order ID</p>
              <p className="text-2xl font-semibold text-white">
                {orderData?.orderId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-300/20 to-violet-400/10 rounded-2xl border border-white/10">
            <User className="w-6 h-6 text-amber-300" />
            <div>
              <p className="text-sm text-amber-100">Username</p>
              <p className="text-2xl font-semibold text-white">
                {orderData?.username}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-amber-300" />
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Order Items
            </h2>
          </div>

          <div className="space-y-4">
            {orderData?.items.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/40 to-violet-700/30 hover:from-purple-800/50 hover:to-amber-600/20 transition-all duration-300 hover:shadow-lg"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-amber-300">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-300">
                    ₹{item.price.toFixed(2)} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 border-t border-white/10 pt-6 flex justify-between items-center">
            <p className="text-2xl font-semibold text-gray-100">Total Amount</p>
            <p className="text-3xl font-extrabold text-amber-400 drop-shadow-lg">
              ₹{calculateTotal()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
