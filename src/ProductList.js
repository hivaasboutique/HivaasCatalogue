import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";


const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

function ProductList({wishlist, addToWishlist, removeFromWishlist, keyword, setKeyword}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [sortOption, setSortOption] = useState("none");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  //const [keyword, setKeyword] = useState(""); // New state for keyword search
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const dropdownRefSizes = useRef();
  const dropdownRefTypes = useRef();
  const dropdownRefSort = useRef();   
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const uniqueTypes = Array.from(new Set(products.map((p) => p.type))).filter(Boolean);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const recommendedProducts = products.slice(0, 5); // first 5 products as recommended (customize as you want)
  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedTypes([]);
    setSortOption("none");
    setKeyword("")
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://hivaas-backend-api.onrender.com/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) => {
      // Filter by sizes
      let sizesMatch =
        selectedSizes.length === 0 ||
        (product.sizes &&
          selectedSizes.some((size) => {
            let sizesObj =
              typeof product.sizes === "string"
                ? JSON.parse(product.sizes)
                : product.sizes;
            return sizesObj[size];
          }));

      // Filter by product types
      let typesMatch =
        selectedTypes.length === 0 || selectedTypes.includes(product.type);

      // Filter by keyword in description (case-insensitive)
      let keywordMatch =
        keyword.trim() === "" ||
        product.description.toLowerCase().includes(keyword.toLowerCase());

      return sizesMatch && typesMatch && keywordMatch;
    });

    // Sort filtered products by price
    if (sortOption === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, sortOption, selectedSizes, selectedTypes, keyword]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRefSizes.current && !dropdownRefSizes.current.contains(event.target)) {
        setIsSizeDropdownOpen(false);
      }
      if (dropdownRefTypes.current && !dropdownRefTypes.current.contains(event.target)) {
        setIsTypeDropdownOpen(false);
      }
      if (dropdownRefSort.current && !dropdownRefSort.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontSize: "1.2rem", color: "#6e4c3b" }}>
        Loading products... Please wait. Our boutique is getting ready ✨
      </div>
    );
  }

  return (
    <div>
      {/* Filter Controls - Centered */}
      <div
        style={{
          margin: "1rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Sort by Price */}
        <div ref={dropdownRefSort} style={{ position: "relative" }}>
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#000000",
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              background: "#ebd8e4",
              padding: "0.1rem 0.2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "inline-block",
              cursor: "pointer"
            }}
          >
            Sort by Price: {sortOption === "none" ? "None" : sortOption === "highToLow" ? "High to Low" : "Low to High"}{" "}
            {isSortDropdownOpen ? "▲" : "▼"}
          </button>

          {isSortDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                border: "1px solid #ccc",
                backgroundColor: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                zIndex: 100,
                padding: "0.5rem",
                borderRadius: "4px"
              }}
            >
              <div
                style={{ cursor: "pointer", marginBottom: "0.25rem" }}
                onClick={() => {
                  setSortOption("none");
                  setIsSortDropdownOpen(false);
                }}
              >
                None
              </div>
              <div
                style={{ cursor: "pointer", marginBottom: "0.25rem" }}
                onClick={() => {
                  setSortOption("highToLow");
                  setIsSortDropdownOpen(false);
                }}
              >
                High to Low
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSortOption("lowToHigh");
                  setIsSortDropdownOpen(false);
                }}
              >
                Low to High
              </div>
            </div>
          )}
        </div>


        {/* Size dropdown */}
        <div ref={dropdownRefSizes} style={{ position: "relative" }}>
          <button
            onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
            style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "#000000",
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.9rem",
                letterSpacing: "0.5px",
                background: "#ebd8e4",
                padding: "0.1rem 0.2rem",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                display: "inline-block",
                cursor: "pointer"
            }}
            >

            Select Size {selectedSizes.length > 0 ? `(${selectedSizes.length})` : ""}
            {isSizeDropdownOpen ? "▲" : "▼"}
          </button>
          {isSizeDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                border: "1px solid #ccc",
                backgroundColor: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                zIndex: 100,
                padding: "0.5rem",
                borderRadius: "4px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {AVAILABLE_SIZES.map((size) => (
                <label
                  key={size}
                  style={{ display: "block", cursor: "pointer", marginBottom: "0.25rem" }}
                >
                  <input
                    type="checkbox"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                    style={{ marginRight: "6px" }}
                  />
                  {size}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Product Type dropdown */}
        <div ref={dropdownRefTypes} style={{ position: "relative" }}>
        <button
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "#000000",
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.9rem",
                letterSpacing: "0.5px",
                background: "#ebd8e4",
                padding: "0.1rem 0.2rem",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                display: "inline-block",
                cursor: "pointer"
            }}
            >

            Select Product Type {selectedTypes.length > 0 ? `(${selectedTypes.length})` : ""}{" "}
            {isTypeDropdownOpen ? "▲" : "▼"}
          </button>
          {isTypeDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                border: "1px solid #ccc",
                backgroundColor: "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                zIndex: 100,
                padding: "0.5rem",
                borderRadius: "4px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {uniqueTypes.map((type) => (
                <label
                  key={type}
                  style={{ display: "block", cursor: "pointer", marginBottom: "0.25rem" }}
                >
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    style={{ marginRight: "6px" }}
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      {(selectedSizes.length > 0 || selectedTypes.length > 0 || keyword) && (
        <div style={{ marginTop: "0.5rem", textAlign: "center", fontWeight: "bold" }}>
          {selectedSizes.length > 0 && (
            <span style={{ margin: "0 6px" }}>
              Size: {selectedSizes.join(", ")}
            </span>
          )}
          {selectedTypes.length > 0 && (
            <span style={{ margin: "0 6px" }}>
              Type: {selectedTypes.join(", ")}
            </span>
          )}
          {keyword && (
            <span style={{ margin: "0 6px" }}>
              Keyword: {keyword}
            </span>
          )}
        </div>
      )}
      
      {filteredProducts.length > 0 && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#5c4033",
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            letterSpacing: "0.5px",
            background: "#f3eee9",
            padding: "0.1rem 0.7rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "inline-block",
          }}
        >
          Showing <span style={{ fontWeight: "bold" }}>{filteredProducts.length}</span> products
        </div>
      )}

      <div
        className="product-list"
        style={{ display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: "center" }}
      >
        {filteredProducts.length > 0 ? (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center", // centers your cards
                gap: "20px",               // spacing between cards
                padding: "20px",           // optional padding
              }}
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.product_code}
                  product={product}
                  inWishlist={wishlist.some((item) => item.product_code === product.product_code)}
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", gap: "1rem" }}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor: currentPage === 1 ? "#eee" : "#bdafa6",
                  color: "#3b2a1e",
                  fontWeight: "bold",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>
              <span style={{ alignSelf: "center", fontWeight: "bold", color: "#3b2a1e" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor: currentPage === totalPages ? "#eee" : "#bdafa6",
                  color: "#3b2a1e",
                  fontWeight: "bold",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>No products found for selected filters.</p>
            <h3>Recommended Products</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
                padding: "20px",
              }}
            >
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.product_code}
                  product={product}
                  inWishlist={wishlist.some((item) => item.product_code === product.product_code)}
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
