import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const SellerDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const fetchMyProducts = useCallback(async () => {
    console.log("Fetching products for user:", user?.id);
    if (!user?.id) return;

    try {
      // Add timestamp to prevent caching
      const response = await fetch(
        `http://localhost:5000/api/products/my-products/${user.id}?t=${Date.now()}`
      );

      console.log("Fetch response status:", response.status);

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      console.log("Fetched products data:", data);

      // Ensure data is array
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Data is not an array:", data);
        setProducts([]);
      }

    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert("Login required");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          sellerId: user.id,
        }),
      });

      if (!res.ok) throw new Error();

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });

      // Explicitly re-fetch after save
      setTimeout(() => {
        fetchMyProducts();
      }, 500);

    } catch {
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;

    try {
      console.log("Deleting product:", id);
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Delete successful");
        fetchMyProducts();
      } else {
        console.error("Delete failed with status:", res.status);
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Delete failed");
    }
  };

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        <div className="text-xl">Please login to access the Seller Dashboard.</div>
      </div>
    );
  }

  const isDark = theme === "dark";
  const containerBg = isDark ? "#000" : "#f8f9fa";
  const textColor = isDark ? "#fff" : "#212529";
  const cardBg = isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff";
  const borderColor = isDark ? "rgba(255, 193, 7, 0.25)" : "#dee2e6";
  const inputBg = isDark ? "#212529" : "#fff";
  const inputColor = isDark ? "#fff" : "#000";
  const shadowClass = isDark ? "shadow-lg" : "shadow-sm";

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: containerBg, color: textColor, paddingTop: "80px", transition: "0.3s" }}>
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h1 className="display-4 fw-bold text-warning mb-3">Seller Dashboard</h1>
          <p className="lead text-secondary">Manage your inventory effortlessly 🚀</p>
        </div>

        <div className="row g-5">
          {/* Add Product Form */}
          <div className="col-lg-5">
            <div className={`p-4 rounded-4 ${shadowClass} border border-warning border-opacity-25`}
              style={{ background: cardBg, backdropFilter: "blur(10px)", borderColor: borderColor }}>
              <h3 className="mb-4 text-warning fw-bold border-bottom border-warning border-opacity-25 pb-2">
                <i className="bi bi-plus-circle me-2"></i>Add New Product
              </h3>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                {/* Product Name */}
                <div className="form-group">
                  <label className="form-label text-secondary small text-uppercase fw-bold">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="e.g. Organic Apples"
                    required
                  />
                </div>

                {/* Category & Price Row */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small text-uppercase fw-bold">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select bg-dark text-white border-secondary"
                      required
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Grains">Grains</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small text-uppercase fw-bold">Price ($)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-secondary border-secondary text-light">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload & Preview */}
                <div className="form-group">
                  <label className="form-label small text-uppercase fw-bold" style={{ color: isDark ? '#adb5bd' : '#6c757d' }}>Product Image</label>
                  <div className="input-group">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, image: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="form-control"
                      style={{ backgroundColor: inputBg, color: inputColor, borderColor: isDark ? '#6c757d' : '#ced4da' }}
                      required={!formData.image}
                    />
                  </div>
                  <div className="form-text small text-muted">Accepted formats: PNG, JPEG</div>

                  {formData.image && (
                    <div className="mt-3 text-center p-3 border border-dashed rounded position-relative" style={{ borderColor: isDark ? '#6c757d' : '#dee2e6', backgroundColor: isDark ? '#000' : '#f8f9fa' }}>
                      <span className="d-block small mb-2" style={{ color: isDark ? '#adb5bd' : '#6c757d' }}>Preview</span>
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "200px", objectFit: "contain" }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        style={{ width: "24px", height: "24px", padding: 0, lineHeight: "1" }}
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label small text-uppercase fw-bold" style={{ color: isDark ? '#adb5bd' : '#6c757d' }}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    style={{ backgroundColor: inputBg, color: inputColor, borderColor: isDark ? '#6c757d' : '#ced4da' }}
                    rows="3"
                    placeholder="Describe your product details..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn w-100 fw-bold py-2 mt-2 shadow-sm ${isDark ? 'btn-warning' : 'btn-success'}`}
                >
                  {loading ? (
                    <span><span className="spinner-border spinner-border-sm me-2"></span>Adding...</span>
                  ) : (
                    "🚀 Publish Product"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Product List - Grid Layout */}
          <div className="col-lg-7">
            <div className={`p-4 rounded-4 ${shadowClass} border h-100`}
              style={{ background: isDark ? '#212529' : '#fff', borderColor: borderColor }}>
              <h3 className={`mb-4 fw-bold border-bottom pb-2 ${isDark ? 'text-white border-secondary' : 'text-dark border-light'}`}>
                <i className="bi bi-box-seam me-2"></i>My Inventory ({products.length})
              </h3>

              {products.length === 0 ? (
                <div className={`text-center py-5 ${isDark ? 'text-muted' : 'text-secondary'}`}>
                  <div className="fs-1 mb-3">📦</div>
                  <p>No products listed yet. Start selling!</p>
                </div>
              ) : (
                <div className="overflow-auto pe-2" style={{ maxHeight: "800px" }}>
                  <div className="row g-3">
                    {products.map((p) => (
                      <div key={p._id} className="col-md-6">
                        <div className={`card h-100 shadow-sm border`}
                          style={{ backgroundColor: isDark ? '#000' : '#f8f9fa', borderColor: isDark ? '#495057' : '#dee2e6', color: textColor }}>
                          <div className="position-relative">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="card-img-top"
                              style={{ height: "150px", objectFit: "cover" }}
                            />
                            <span className={`position-absolute top-0 end-0 badge m-2 ${isDark ? 'bg-warning text-dark' : 'bg-success text-white'}`}>
                              ${p.price}
                            </span>
                          </div>
                          <div className="card-body p-3 d-flex flex-column">
                            <h6 className="card-title fw-bold text-truncate mb-1" title={p.name}>{p.name}</h6>
                            <div className="small mb-2" style={{ color: isDark ? '#adb5bd' : '#6c757d' }}>{p.category}</div>
                            <p className="card-text small text-truncate mb-3 flex-grow-1" style={{ maxWidth: "100%", color: isDark ? '#ced4da' : '#6c757d' }}>
                              {p.description}
                            </p>
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="btn btn-outline-danger btn-sm w-100 mt-auto"
                            >
                              <i className="bi bi-trash me-1"></i> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
