import React, { useState } from "react";
import { FaWhatsapp } from 'react-icons/fa';  
import ReactDOM from "react-dom";


const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

function ProductCard({ product, inWishlist, addToWishlist, removeFromWishlist }) {
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ].filter((img) => img && img.trim() !== "");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const isSoldOut = String(product.in_stock).toLowerCase() === "false";



  const sizesAvailable =
    typeof product.sizes === "string"
      ? JSON.parse(product.sizes)
      : product.sizes;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleWishlistClick = () => {
    if (selectedSizes.length === 0) {
      alert("Please select at least one size before adding to wishlist.");
      return;
    }

    if (inWishlist) {
      removeFromWishlist(product);
      setSelectedSizes([]);
    } else {
      addToWishlist(product, selectedSizes);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e0d6cf",
        padding: "1rem",
        margin: "1rem",
        width: "270px",
        textAlign: "center",
        position: "relative",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        backgroundColor: "#fff",
        fontFamily: "sans-serif",
        cursor: "default",
        opacity: isSoldOut ? 0.5 : 1,
        pointerEvents: isSoldOut ? "none" : "auto",
      }}
      onMouseEnter={(e) => {
        if (!isSoldOut) {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.12)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSoldOut) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.08)";
        }
      }}
    >

      {images.length > 0 ? (
        <>
          {/* Clickable image */}
          <img
            src={images[currentIndex]}
            alt={product.description}
            style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "pointer", borderRadius: "8px" }}
            onClick={() => setIsModalOpen(true)}
          />
          <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
            <button
              onClick={goPrev}
              style={{
                backgroundColor: "#6e4c3b",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                marginRight: "10px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#563d2e"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#6e4c3b"}
            >
              Prev
            </button>
            <span style={{ margin: "0 1rem" }}>
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={goNext}
              style={{
                backgroundColor: "#6e4c3b",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#563d2e"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#6e4c3b"}
            >
              Next
            </button>
          </div>

        </>
      ) : (
        <p>No images available</p>
      )}

      <h3 style={{ fontSize: "1rem", marginTop: "0.8rem", color: "#3b2a1e" }}>{product.description}</h3>
      {isSoldOut && (
        <div
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: "1rem",
            marginTop: "8px",
            userSelect: "none",
          }}
        >
          Sold Out
        </div>
      )}
      <p style={{ margin: "0.3rem 0", fontSize: "0.9rem" }}><strong>Product Code:</strong> {product.product_code}</p>
      <p style={{ margin: "0.3rem 0", fontSize: "1rem" }}><strong>Price:</strong> ₹{product.price}</p>
      <p style={{ margin: "0.3rem 0", fontSize: "0.9rem" }}><strong>Product Type:</strong> {product.type}</p>


      {/* Size Selection */}
      <div style={{ marginTop: "0.4rem", textAlign: "left" }}>
        <strong>Select Sizes:</strong>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "0.5rem" }}>
          {AVAILABLE_SIZES.map((size) => {
            const isAvailable = sizesAvailable?.[size];
            const isSelected = selectedSizes.includes(size);

            return (
              <label
                key={size}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: isSelected ? "2px solid #6e4c3b" : "1px solid #ccc",
                  backgroundColor: isAvailable ? (isSelected ? "#6e4c3b" : "#f8f4f1") : "#eae0da",
                  color: isAvailable ? (isSelected ? "white" : "#3b2a1e") : "#a9a9a9",
                  cursor: isAvailable ? "pointer" : "not-allowed",
                  fontSize: "0.9rem",
                  userSelect: "none",
                  textDecoration: isAvailable ? "none" : "line-through"  
                }}
              >
                <input
                  type="checkbox"
                  value={size}
                  checked={isSelected}
                  onChange={() => isAvailable && toggleSize(size)}
                  disabled={!isAvailable}
                  style={{ display: "none" }}
                />
                {size}
              </label>
            );
          })}
        </div>
      </div>


      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
        {/* Add/Remove from Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          disabled={selectedSizes.length === 0} 
          style={{
            padding: "8px 11px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "15px",
            cursor: selectedSizes.length === 0 ? "not-allowed" : "pointer",
            backgroundColor: selectedSizes.length === 0 ? "#e0d6cf" : "#bdafa6",  
            color: "#3b2a1e",              
            fontWeight: "bold",
            marginBottom: "10px",  // space between buttons
            width: "fit-content",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            opacity: selectedSizes.length === 0 ? 0.6 : 1,
            transition: "background-color 0.2s ease",
          }}
        >
          {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>

        {/* Send to WhatsApp Button */}
        <button
          disabled={selectedSizes.length === 0}
          onClick={() => {
            const sizeString = selectedSizes.join(", ");
            const message = `Hi, I'm interested in Product Code: ${product.product_code} - ${product.description}. Sizes: ${sizeString}`;
            const encodedMessage = encodeURIComponent(message);
            const phoneNumber = "918073879674"; // Replace with your WhatsApp number (with country code)
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, "_blank");
          }}
          style={{
            backgroundColor: selectedSizes.length === 0 ? "#e0d6cf" : "#6e4c3b",
            padding: "6px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
            color: "white",
            fontWeight: "bold",
            cursor: selectedSizes.length === 0 ? "not-allowed" : "pointer",
            opacity: selectedSizes.length === 0 ? 0.6 : 1,
            transition: "background-color 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "fit-content"
          }}
        >
          <FaWhatsapp color="#25D366" size={18} />
          Send to WhatsApp
        </button>

        {/* Instruction message */}
        {selectedSizes.length === 0 && (
          <small style={{ color: "#6e4c3b", marginTop: "8px", textAlign: "center", fontStyle: "italic" }}>
            Select at least one size to add the product to the wishlist or to send it to us on WhatsApp.
          </small>
        )}

      </div>



      {/* Modal for full image */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            onClick={() => setIsModalOpen(false)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
            }}
          >
            <img
              src={images[currentIndex]}
              alt={product.description}
              style={{
                maxHeight: "90%",
                maxWidth: "90%",
                boxShadow: "0 0 15px white",
                cursor: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </div>
  );
}

export default ProductCard;
