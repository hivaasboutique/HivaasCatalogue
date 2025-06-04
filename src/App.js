import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { FaWhatsapp } from 'react-icons/fa';  

function App() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
  const [showWishlist, setShowWishlist] = useState(false); // 👈 Toggle for dropdown
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showCatalogHelp, setShowCatalogHelp] = useState(false);


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
      <img
        src="/bannner.png"
        alt="Hivaas Banner"
        style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "1rem" }}>
        {/* Size Guide Toggle */}
        <div
          onClick={() => setShowSizeGuide(!showSizeGuide)}
          style={{
            display: "inline-block",
            padding: "6px 12px",           // Smaller padding
            backgroundColor: "#3b2a1e",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            userSelect: "none",
            marginBottom: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "12px",              // Smaller font
            fontStyle: "italic", 
          }}
        >
          {showSizeGuide
            ? "Hide the size guide"
            : "Click here to view the size guide for your reference"}
        </div>
    
        {showSizeGuide && (
          <img
            src="/size_guide.png"
            alt="Size Guide"
            style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem" }}
          />
        )}

        {/* How to Use the Catalog Toggle */}
        <div
          onClick={() => setShowCatalogHelp(!showCatalogHelp)}
          style={{
            display: "inline-block",
            padding: "6px 12px",           // Smaller padding
            backgroundColor: "#3b2a1e",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            userSelect: "none",
            marginBottom: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "12px",              // Smaller font
            fontStyle: "italic",
          }}
        >
          {showCatalogHelp
            ? "Hide catalog help"
            : "Click here to know how to use the Hivaa's Product Catalog"}
        </div>
      </div>

      {/* Catalog Help Paragraph - Styled Box */}
      {showCatalogHelp && (
        <div
          style={{
            marginTop: "0.5rem",
            padding: "1rem",
            backgroundColor: "#f5eee7", // light brown background
            borderRadius: "5px",
            fontSize: "14px",
            maxWidth: "600px",
            lineHeight: "1.5",
            fontStyle: "italic",
            color: "#3b2a1e",
          }}
        >
          You can use the filters at the top to narrow down products based on your preferences.
          Be sure to select the size(s) you’re looking for in each product you like. You can click 
          on a product image for a full screen view of that image. You can even choose multiple sizes
          in the same product. If you like several products, add them to your wishlist and send the
          entire wishlist to us via WhatsApp. You can also send a single product directly to WhatsApp. 
          Happy shopping!
        </div>
      )}


      {message && <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>}

      {wishlist.length > 0 && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            onClick={() => setShowWishlist(!showWishlist)}
            style={{
              backgroundColor: "#6e4c3b", // dark brown
              color: "white",
              padding: "10px 20px",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "8px",
              marginBottom: "12px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            {showWishlist ? "Hide Wishlist" : `Click here to view your Wishlist - (${wishlist.length})`}
          </button>

          {showWishlist && (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1.2rem",
                backgroundColor: "#f3eee9",
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              {wishlist.map((item) => (
                <div
                  key={item.product_code}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#fffbe8"
                  }}
                >
                  <strong>{item.product_code}</strong>: {item.description} (₹{item.price})<br />
                  <span style={{ fontSize: "0.9rem", color: "#555" }}>
                    Sizes: {item.selectedSizes.join(", ")}
                  </span>
                </div>
              ))}

              {/* WhatsApp Button Inside Dropdown */}
              <button
                onClick={() => {
                  const messageLines = wishlist.map((item) => {
                    return `${item.product_code}: ${item.description} (₹${item.price}) - Sizes: ${item.selectedSizes.join(", ")}`;
                  });
                  const message =
                    "Hi, I'm interested in the following products:\n" + messageLines.join("\n");
                  const encodedMessage = encodeURIComponent(message);
                  const phoneNumber = "918073879674"; // Replace with your WhatsApp number
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                  window.open(whatsappUrl, "_blank");
                }}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#6e4c3b", // WhatsApp green
                  color: "white",
                  padding: "10px 18px",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <FaWhatsapp size={18} color="white" />
                Send Wishlist to WhatsApp
              </button>
            </div>
          )}
        </div>
      )}


      {/* Product List */}
      <ProductList
        products={products}
        wishlist={wishlist}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
      />
    </div>
  );
}

export default App;
