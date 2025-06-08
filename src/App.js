import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { FaWhatsapp } from 'react-icons/fa'; 
import Header from "./Header";

function App() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
  const [showWishlist, setShowWishlist] = useState(false); // 👈 Toggle for dropdown
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showCatalogHelp, setShowCatalogHelp] = useState(false);
  const [keyword, setKeyword] = React.useState(""); // New state for keyword search

  useEffect(() => {
    fetch("https://hivaas-backend-api.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToWishlist = (product, sizes) => {
    if (!wishlist.find((item) => item.product_code === product.product_code)) {
      setWishlist((prev) => [...prev, { ...product, selectedSizes: sizes }]);
      showMessage("Added to wishlist!");
    }
  };

  const removeFromWishlist = (product) => {
    setWishlist((prev) =>
      prev.filter((item) => item.product_code !== product.product_code)
    );
    showMessage("Removed from wishlist!");
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };



  return (
    <div className="App" style={{ padding: "1rem" }}>
      <Header
        showSizeGuide={showSizeGuide}
        setShowSizeGuide={setShowSizeGuide}
        showCatalogHelp={showCatalogHelp}
        setShowCatalogHelp={setShowCatalogHelp}
        keyword={keyword}
        setKeyword={setKeyword}
      />

      {message && <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>}

      {/* Product List */}
      <ProductList
        products={products}
        wishlist={wishlist}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
        keyword={keyword}
      />

      {/* Floating Wishlist Button & Panel */}
      {wishlist.length > 0 && (
        <>
          {showWishlist && (
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                position: "fixed",
                bottom: "80px",
                right: "20px",
                width: "300px",
                maxHeight: "400px",
                overflowY: "auto",
                backgroundColor: "#962d5e",
                color: "white",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                zIndex: 1000,
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)"
              }}
            >
              <h4 style={{ marginTop: 0 }}>My Wishlist</h4>
              {wishlist.map((item) => (
                <div
                  key={item.product_code}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    border: "1px solid #ddd",
                    padding: "8px",
                    marginBottom: "8px",
                    borderRadius: "5px",
                    backgroundColor: "#fffbe8",
                    color: "black"
                  }}
                >
                  <strong>{item.product_code}</strong>: {item.description}<br />
                  <span style={{ fontSize: "0.85rem", color: "#555", fontFamily: "'Playfair Display', serif", }}>
                    Sizes: {item.selectedSizes.join(", ")}
                  </span>
                  <div>
                    <button
                      onClick={() => removeFromWishlist(item)}
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        marginTop: "5px",
                        backgroundColor: "#962d5e",
                        color: "white",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        cursor: "pointer"
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const messageLines = wishlist.map((item) => {
                    return `${item.product_code}: ${item.description} (₹${item.price}) - Sizes: ${item.selectedSizes.join(", ")}`;
                  });
                  const message =
                    "Hi, I'm interested in the following products:\n" + messageLines.join("\n");
                  const encodedMessage = encodeURIComponent(message);
                  const phoneNumber = "918073879674";
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                  window.open(whatsappUrl, "_blank");
                }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  marginTop: "10px",
                  backgroundColor: "#25D366",
                  color: "white",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <FaWhatsapp size={16} />
                Send All to WhatsApp
              </button>
            </div>
          )}

          {/* Floating Wishlist Toggle Button */}
          <button
            onClick={() => setShowWishlist(!showWishlist)}
            style={{
              fontFamily: "'Playfair Display', serif",
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "#962d5e",
              color: "white",
              padding: "12px 18px",
              borderRadius: "30px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              fontWeight: "bold",
              fontSize: "14px",
              zIndex: 1000,
              cursor: "pointer"
            }}
          >
            ❤️Your Wishlist ({wishlist.length})
          </button>
        </>
      )}


    </div>
  );
}

export default App;
