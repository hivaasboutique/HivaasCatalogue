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
        src="/header.png"
        alt="Hivaas Banner"
        style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "1rem" }}>
        {/* Size Guide Toggle */}
        <button
          onClick={() => setShowSizeGuide(!showSizeGuide)}
          style={{
            display: "inline-block",
            padding: "4px 5px",
            maxWidth: "100%", // optional
            alignSelf: "flex-start",
            color: "#5c4033",
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.9rem",
            letterSpacing: "0.5px",
            background: "#f3eee9",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer"
          }}
        >
          {showSizeGuide
            ? "Hide the size guide"
            : "Click here to view the size guide for your reference"}
        </button>

        {showSizeGuide && (
          <img
            src="/size_guide.png"
            alt="Size Guide"
            style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem" }}
          />
        )}

        {/* How to Use the Catalog Toggle */}
        <button
          onClick={() => setShowCatalogHelp(!showCatalogHelp)}
          style={{
            display: "inline-block",
            padding: "4px 5px",
            maxWidth: "100%", // optional
            alignSelf: "flex-start",
            color: "#5c4033",
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.9rem",
            letterSpacing: "0.5px",
            background: "#f3eee9",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer"
          }}
        >
          {showCatalogHelp
            ? "Hide catalog help"
            : "Click here to know how to use the Hivaa's Product Catalog"}
        </button>

      </div>

      {/* Catalog Help Paragraph - Styled Box */}
      {showCatalogHelp && (
        <div
          style={{
            display: "inline-block",
            padding: "4px 5px",
            maxWidth: "100%", // optional
            alignSelf: "flex-start",
            color: "#5c4033",
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.9rem",
            letterSpacing: "0.5px",
            background: "#f3eee9",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer"
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

      {/* Product List */}
      <ProductList
        products={products}
        wishlist={wishlist}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
      />

      {/* Floating Wishlist Button & Panel */}
      {wishlist.length > 0 && (
        <>
          {showWishlist && (
            <div
              style={{
                position: "fixed",
                bottom: "80px",
                right: "20px",
                width: "300px",
                maxHeight: "400px",
                overflowY: "auto",
                backgroundColor: "#f3eee9",
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
                    border: "1px solid #ddd",
                    padding: "8px",
                    marginBottom: "8px",
                    borderRadius: "5px",
                    backgroundColor: "#fffbe8"
                  }}
                >
                  <strong>{item.product_code}</strong>: {item.description}<br />
                  <span style={{ fontSize: "0.85rem", color: "#555" }}>
                    Sizes: {item.selectedSizes.join(", ")}
                  </span>
                  <div>
                    <button
                      onClick={() => removeFromWishlist(item)}
                      style={{
                        marginTop: "5px",
                        backgroundColor: "#9b3d3d",
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
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "#6e4c3b",
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
