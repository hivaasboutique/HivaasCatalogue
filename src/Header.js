function Header({
  showSizeGuide,
  setShowSizeGuide,
  showCatalogHelp,
  setShowCatalogHelp,
  keyword,
  setKeyword,
  clearAllFilters,
}) {
  return (
    <>
      <img
        src="/header.png"
        alt="Hivaas Banner"
        style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
      />

      {/* New flex container for buttons + search on one line */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        {/* Left side: Size Guide and User Guide */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {/* Size Guide Toggle */}
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            style={{
              display: "inline-block",
              padding: "4px 5px",
              maxWidth: "100%",
              color: "#ffffff",
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              fontWeight: "bold",
              background: "#962d5e",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            {showSizeGuide ? "Hide size guide" : "Size guide"}
          </button>

          {/* User Guide Toggle */}
          <button
            onClick={() => setShowCatalogHelp(!showCatalogHelp)}
            style={{
              display: "inline-block",
              padding: "4px 5px",
              maxWidth: "100%",
              color: "#ffffff",
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              fontWeight: "bold",
              background: "#962d5e",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            {showCatalogHelp ? "Hide user guide" : "User Guide"}
          </button>
        </div>

        {/* Right side: search input and clear filters */}
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          {/* Keyword search input */}
          <input
            type="text"
            id="keywordSearch"
            placeholder="🔍 Search by keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              textAlign: "center",
              color: "#000000",
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              background: "#ebd8e4",
              padding: "0.1rem 0.2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "text",
              minWidth: "180px",
            }}
          />

          {/* Clear All Filters button */}
          <button
            onClick={clearAllFilters}
            style={{
              padding: "4px 8px",
              color: "#ffffff",
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              fontWeight: "bold",
              background: "#962d5e",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            Clear Keyword Filter
          </button>
        </div>
      </div>


      {/* Size Guide Image */}
      {showSizeGuide && (
        <img
          src="/size_guide.png"
          alt="Size Guide"
          style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem" }}
        />
      )}

      {/* User Guide Paragraph */}
      {showCatalogHelp && (
        <div
          style={{
            display: "inline-block",
            padding: "4px 5px",
            maxWidth: "100%",
            alignSelf: "flex-start",
            color: "#000000",
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.9rem",
            letterSpacing: "0.5px",
            background: "#ebd8e4",
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
    </>
  );
}

export default Header;
