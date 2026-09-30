import { useState } from "react";
import "./App.css";

function App() {
  const products = [
    { id: 1, name: "T-Shirt", price: 500 },
    { id: 2, name: "Jeans", price: 1200 },
    { id: 3, name: "Shoes", price: 1500 },
    { id: 4, name: "Watch", price: 800 },
  ];

  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;

  const gst = afterDiscount * 0.18;
  const grandTotal = afterDiscount + gst;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert("Invalid Coupon Code");
    }
  };

  return (
    <div className="container">
      <h1>Online Shopping Cart</h1>

      <h2>Product List</h2>

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <h3>{product.name}</h3>

            <p>Price: ₹{product.price}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <span>
              {item.name} - ₹{item.price}
            </span>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(
                  item.id,
                  Number(e.target.value)
                )
              }
            />

            <button onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <div className="summary">
        <h2>Bill Summary</h2>

        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>

        <div className="coupon-section">
          <p className="coupon-hint">
            💡 Hint: Save 10 is the coupon code
          </p>

          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />

          <button onClick={applyCoupon}>
            Apply Coupon
          </button>
        </div>

        <p>Discount: {discount}%</p>

        <p>
          Discount Amount: ₹{discountAmount.toFixed(2)}
        </p>

        <p>GST (18%): ₹{gst.toFixed(2)}</p>

        <h2>
          Grand Total: ₹{grandTotal.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default App;