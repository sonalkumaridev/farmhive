import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

    return (
        <div className="cart-page">
            <div className="container py-5" style={{ marginTop: "70px" }}>
                <h2 className="text-warning fw-bold mb-4">Your Cart</h2>

                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <h3>Your cart is empty</h3>
                        <Link to="/products" className="btn btn-warning mt-3">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="card mb-3 border-warning shadow-sm"
                                >
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded-start"
                                                style={{ height: "100px", objectFit: "cover", width: "100%" }}
                                            />
                                        </div>
                                        <div className="col-md-10">
                                            <div className="card-body d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="card-title text-warning mb-1">
                                                        {item.name}
                                                    </h5>
                                                    <p className="card-text mb-0">
                                                        Unit Price: ₹{item.price}
                                                    </p>
                                                </div>

                                                <div className="d-flex align-items-center">
                                                    <button
                                                        className="btn btn-sm btn-outline-warning me-2"
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity - 1)
                                                        }
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="fs-5 fw-bold mx-2">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="btn btn-sm btn-outline-warning ms-2"
                                                        onClick={() =>
                                                            updateQuantity(item.id, item.quantity + 1)
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="text-end">
                                                    <p className="fw-bold fs-5 mb-0">
                                                        ₹ {item.price * item.quantity}
                                                    </p>
                                                    <button
                                                        className="btn btn-danger btn-sm mt-2"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-warning shadow-sm">
                                <div className="card-body">
                                    <h4 className="card-title text-warning mb-4">Order Summary</h4>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Total Items:</span>
                                        <span>
                                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                        </span>
                                    </div>
                                    <hr className="border-secondary" />
                                    <div className="d-flex justify-content-between fs-4 fw-bold mb-4">
                                        <span>Total Amount:</span>
                                        <span className="text-warning">₹ {totalPrice}</span>
                                    </div>
                                    <button className="btn btn-warning w-100 fw-bold fs-5">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .cart-page {
          min-height: 100vh;
        }
      `}</style>
        </div>
    );
};

export default Cart;
