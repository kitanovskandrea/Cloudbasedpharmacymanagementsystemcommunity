import { useState } from 'react';
import { Search, Plus, Trash2, ShoppingCart, User, CreditCard } from 'lucide-react';

type User = {
  id: string;
  name: string;
  role: string;
  branch: string;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
  inStock: number;
};

export function SalesDispensing({ user }: { user: User }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'insurance'>('cash');

  // Mock inventory for search
  const availableProducts = [
    { id: '1', name: 'Amoxicillin 500mg', price: 12.50, sku: 'MED-AMX-500', inStock: 450 },
    { id: '2', name: 'Lisinopril 10mg', price: 8.75, sku: 'MED-LIS-10', inStock: 22 },
    { id: '3', name: 'Ibuprofen 400mg', price: 6.25, sku: 'MED-IBU-400', inStock: 280 },
    { id: '4', name: 'Paracetamol 500mg', price: 4.50, sku: 'MED-PAR-500', inStock: 520 },
    { id: '5', name: 'Omeprazole 40mg', price: 18.00, sku: 'MED-OME-40', inStock: 320 },
    { id: '6', name: 'Atorvastatin 20mg', price: 22.50, sku: 'MED-ATO-20', inStock: 15 },
  ];

  const searchResults = searchQuery.length >= 2
    ? availableProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const addToCart = (product: typeof availableProducts[0]) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.inStock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        alert('Insufficient stock available');
      }
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          sku: product.sku,
          inStock: product.inStock,
        },
      ]);
    }
    setSearchQuery('');
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const item = cart.find((i) => i.id === itemId);
    if (item && newQuantity > 0 && newQuantity <= item.inStock) {
      setCart(
        cart.map((i) =>
          i.id === itemId ? { ...i, quantity: newQuantity } : i
        )
      );
    } else if (newQuantity > (item?.inStock || 0)) {
      alert('Insufficient stock available');
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    // In real implementation, this would:
    // 1. Process payment
    // 2. Update inventory (automatically deduct stock)
    // 3. Generate receipt
    // 4. Update sales records
    
    alert(
      `Sale completed!\n\nTotal: $${total.toFixed(2)}\nPayment: ${paymentMethod}\n\nInventory has been automatically updated.`
    );
    
    // Reset
    setCart([]);
    setCustomerName('');
    setPaymentMethod('cash');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Sales & Dispensing</h1>
        <p className="text-gray-600 mt-1">Process sales and dispense medications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Search and Selection */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="mb-4">Product Search</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {searchResults.length > 0 && (
              <div className="mt-4 border border-gray-200 rounded-lg divide-y">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          {product.sku} • Stock: {product.inStock}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">${product.price.toFixed(2)}</p>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Add Popular Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="mb-4">Popular Items</h2>
            <div className="grid grid-cols-2 gap-3">
              {availableProducts.slice(0, 6).map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <p className="text-gray-900 mb-1">{product.name}</p>
                  <p className="text-sm text-gray-600 mb-2">{product.sku}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600">${product.price.toFixed(2)}</span>
                    <Plus className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart and Checkout */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <h2>Current Sale</h2>
            </div>

            {/* Customer Info */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Customer Name (Optional)</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="mb-4 max-h-64 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Cart is empty</p>
                  <p className="text-sm">Search and add products</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600">{item.sku}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value) || 0)
                            }
                            className="w-12 text-center border border-gray-300 rounded py-1"
                            min="1"
                            max={item.inStock}
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Totals */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 pt-4 mb-4 space-y-2">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xl pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Payment Method */}
            {cart.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2 border rounded-lg text-sm transition-colors ${
                      paymentMethod === 'cash'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Cash
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 border rounded-lg text-sm transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1" />
                    Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('insurance')}
                    className={`p-2 border rounded-lg text-sm transition-colors ${
                      paymentMethod === 'insurance'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Insurance
                  </button>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Complete Sale
            </button>
          </div>

          {/* Today's Sales Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="mb-4">Today's Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Sales:</span>
                <span className="text-gray-900">$12,458</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Transactions:</span>
                <span className="text-gray-900">87</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg. Sale:</span>
                <span className="text-gray-900">$143.19</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
