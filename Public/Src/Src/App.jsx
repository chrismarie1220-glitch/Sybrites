import { useState, useEffect } from "react";

const INITIAL_PRODUCTS = [
  { id: 1, brand: "Hermès", name: "Birkin 30", color: "Noir Togo", condition: "Excellent", year: 2019, price: 24500, originalRetail: 11400, hardware: "Gold", size: "30cm", category: "Birkin", tag: "Rare Find", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", description: "An iconic Birkin in classic Noir Togo leather. Supple, scratch-resistant and beautifully aged. Blind stamp D (2019). Complete with original box, dustbag, clochette, keys and lock.", sold: false },
  { id: 2, brand: "Chanel", name: "Classic Flap Medium", color: "Beige Caviar", condition: "Very Good", year: 2021, price: 9800, originalRetail: 9000, hardware: "Gold", size: "Medium", category: "Classic", tag: "Investment Piece", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80", description: "The quintessential Chanel in timeless beige caviar leather with 24k gold hardware. Series 30 (2021). Includes authenticity card, dustbag and box.", sold: false },
  { id: 3, brand: "Louis Vuitton", name: "Speedy Bandoulière 30", color: "Monogram Canvas", condition: "Like New", year: 2022, price: 1850, originalRetail: 1700, hardware: "Gold", size: "30", category: "Speedy", tag: "Like New", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80", description: "Carried fewer than 5 times. Monogram canvas is pristine with no patina. Comes with strap, padlock and keys, dustbag and receipt.", sold: false },
  { id: 4, brand: "Bottega Veneta", name: "Jodie Medium", color: "Fondant Intrecciato", condition: "Excellent", year: 2022, price: 2400, originalRetail: 2800, hardware: "Silver", size: "Medium", category: "Jodie", tag: "Below Retail", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80", description: "The cult Jodie in warm fondant intrecciato lambskin. Weave is tight and uniform with minimal signs of wear. Includes dustbag.", sold: false },
  { id: 5, brand: "Hermès", name: "Kelly 28", color: "Craie Epsom", condition: "Very Good", year: 2018, price: 19800, originalRetail: 10100, hardware: "Palladium", size: "28cm", category: "Kelly", tag: "Rare Find", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80", description: "An elusive Kelly 28 Sellier in chalky Craie Epsom. Stamp C (2018). Full set with box, dustbag, clochette, keys and lock.", sold: false },
  { id: 6, brand: "Gucci", name: "Dionysus Small", color: "Dusty Pink Velvet", condition: "Good", year: 2020, price: 1250, originalRetail: 2200, hardware: "Antique Gold", size: "Small", category: "Dionysus", tag: "Great Value", img: "https://images.unsplash.com/photo-1614179818511-f30e2e31f773?w=600&q=80", description: "A statement piece in dusty pink velvet with antique gold tiger-head closure. Light wear on base corners — noted and reflected in price. Includes dustbag.", sold: false },
  { id: 7, brand: "Dior", name: "Lady Dior Medium", color: "Blush Cannage", condition: "Like New", year: 2023, price: 5900, originalRetail: 5500, hardware: "Silver", size: "Medium", category: "Lady Dior", tag: "Almost New", img: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&q=80", description: "Virtually unworn Lady Dior in blush lambskin with silver hardware. Comes complete with all four charms, strap, dustbag and box.", sold: false },
  { id: 8, brand: "Prada", name: "Re-Edition 2005", color: "Black Re-Nylon", condition: "Excellent", year: 2021, price: 980, originalRetail: 1190, hardware: "Silver", size: "Mini", category: "Re-Edition", tag: "Below Retail", img: "https://images.unsplash.com/photo-1612902456551-b8e38d28cde3?w=600&q=80", description: "The bag that defined the 2000s revival. Black Re-Nylon in immaculate condition — triangular logo plaque perfectly intact.", sold: false },
  { id: 9, brand: "Saint Laurent", name: "Loulou Medium", color: "Ivory Matelassé", condition: "Very Good", year: 2022, price: 1680, originalRetail: 2150, hardware: "Gold", size: "Medium", category: "Loulou", tag: "Below Retail", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80", description: "Dreamy ivory matelassé chevron with gold chain. Shows light scuffing on chain links — otherwise excellent. Dustbag included.", sold: false },
  { id: 10, brand: "Celine", name: "Classic Box Small", color: "Caramel Box Calf", condition: "Excellent", year: 2020, price: 2900, originalRetail: 3300, hardware: "Gold", size: "Small", category: "Box", tag: "Investment Piece", img: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&q=80", description: "The timeless Celine Box in smooth caramel box calf leather. Full set with dustbag, box and shoulder strap.", sold: false },
  { id: 11, brand: "Fendi", name: "Baguette 1997", color: "Tan Zucca Canvas", condition: "Very Good", year: 2023, price: 1450, originalRetail: 1700, hardware: "Gold", size: "Standard", category: "Baguette", tag: "Iconic", img: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=600&q=80", description: "The original IT bag reimagined. 25th anniversary edition in tan Zucca canvas — a collector's dream. Includes box and dustbag.", sold: false },
  { id: 12, brand: "Balenciaga", name: "City Classic", color: "Anthracite Leather", condition: "Good", year: 2019, price: 740, originalRetail: 1650, hardware: "Aged Silver", size: "Classic", category: "City", tag: "Great Value", img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4be8?w=600&q=80", description: "The quintessential moto bag in buttery anthracite leather. Naturally worn fringe and zipper pulls add character. Includes mirror and strap.", sold: false },
];

const tagColors = { "Rare Find": "#b8860b", "Investment Piece": "#5c7a5c", "Like New": "#4a6fa5", "Almost New": "#4a6fa5", "Below Retail": "#8b4b6e", "Great Value": "#7a6b3d", "Iconic": "#6b4c3b" };
const conditionDots = { "Like New": 5, Excellent: 4, "Very Good": 3, Good: 2 };
const allBrands = ["All", ...new Set(INITIAL_PRODUCTS.map(p => p.brand))];
const conditions = ["All", "Like New", "Excellent", "Very Good", "Good"];
const fmt = n => Number(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const FInput = ({ label, value, onChange, type = "text", placeholder, required }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187", marginBottom: 6 }}>{label}{required && " *"}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, border: "none", borderBottom: "1px solid #d4c9b8", background: "transparent", padding: "8px 0", outline: "none", color: "#1a1410" }} />
  </div>
);
const FSelect = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187", marginBottom: 6 }}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, border: "none", borderBottom: "1px solid #d4c9b8", background: "transparent", padding: "8px 0", outline: "none", color: "#1a1410", appearance: "none" }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

export default function Sybrites() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [consignments, setConsignments] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [view, setView] = useState("shop");
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [shipping, setShipping] = useState({ firstName: "", lastName: "", address: "", city: "", state: "", zip: "", country: "United States" });
  const [payment, setPayment] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
  const [orderRef] = useState("SYB-" + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [sell, setSell] = useState({ firstName: "", lastName: "", email: "", phone: "", brand: "", name: "", color: "", condition: "Excellent", year: "", originalRetail: "", accessories: "", notes: "" });
  const [sellDone, setSellDone] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [np, setNp] = useState({ brand: "", name: "", color: "", condition: "Excellent", year: "", price: "", originalRetail: "", hardware: "", size: "", category: "", tag: "Rare Find", img: "", description: "" });

  const addToCart = p => { if (!cart.find(i => i.id === p.id)) setCart(c => [...c, p]); };
  const removeFromCart = id => setCart(c => c.filter(i => i.id !== id));
  const toggleWishlist = id => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const cartSub = cart.reduce((s, i) => s + i.price, 0);
  const cartTax = Math.round(cartSub * 0.08);
  const cartShip = cartSub > 5000 ? 0 : 45;
  const cartTotal = cartSub + cartTax + cartShip;

  const filteredProducts = products.filter(p => !p.sold).filter(p => {
    const mb = selectedBrand === "All" || p.brand === selectedBrand;
    const mc = selectedCondition === "All" || p.condition === selectedCondition;
    const ms = !searchQuery || [p.brand, p.name, p.color, p.category].some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return mb && mc && ms;
  }).sort((a, b) => sortBy === "price-asc" ? a.price - b.price : sortBy === "price-desc" ? b.price - a.price : sortBy === "newest" ? b.year - a.year : 0);

  const placeOrder = () => {
    const ids = cart.map(i => i.id);
    setProducts(p => p.map(x => ids.includes(x.id) ? { ...x, sold: true } : x));
    setCart([]); setCartOpen(false); setView("confirm"); setStep(1);
  };

  const submitSell = () => {
    setConsignments(c => [...c, { ...sell, id: Date.now(), submittedAt: new Date().toISOString(), status: "Pending Review" }]);
    setSellDone(true);
  };

  const addProduct = () => {
    setProducts(p => [...p, { ...np, id: Date.now(), price: Number(np.price), originalRetail: Number(np.originalRetail), year: Number(np.year), sold: false }]);
    setNp({ brand: "", name: "", color: "", condition: "Excellent", year: "", price: "", originalRetail: "", hardware: "", size: "", category: "", tag: "Rare Find", img: "", description: "" });
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    .nl{font-family:'Josefin Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#1a1410;background:none;border:none;cursor:pointer;transition:opacity .2s;padding:0}
    .nl:hover{opacity:.5}
    .bp{background:#1a1410;color:#faf8f5;border:none;padding:12px 28px;font-family:'Josefin Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .25s}
    .bp:hover{background:#b8860b}
    .bg{background:#b8860b;color:#1a1410;border:none;padding:12px 28px;font-family:'Josefin Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .25s}
    .bg:hover{background:#d4a017}
    .bo{background:transparent;color:#1a1410;border:1px solid #1a1410;padding:10px 24px;font-family:'Josefin Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .25s}
    .bo:hover{background:#1a1410;color:#faf8f5}
    .card{background:#fff;transition:transform .3s,box-shadow .3s;cursor:pointer}
    .card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(26,20,16,.1)}
    .fp{font-family:'Josefin Sans',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:8px 18px;border:1px solid #d4c9b8;background:transparent;cursor:pointer;transition:all .2s;color:#1a1410}
    .fp.on{background:#1a1410;color:#faf8f5;border-color:#1a1410}
    .fp:hover:not(.on){border-color:#1a1410}
    .ov{position:fixed;inset:0;background:rgba(26,20,16,.55);z-index:50;backdrop-filter:blur(2px)}
    .dr{position:fixed;right:0;top:0;height:100%;width:min(440px,100vw);background:#faf8f5;z-index:51;box-shadow:-4px 0 40px rgba(0,0,0,.15);display:flex;flex-direction:column}
    .mo{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:51;padding:20px}
    .mb{background:#faf8f5;max-width:860px;width:100%;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column}
    @media(min-width:640px){.mb{flex-direction:row}}
    .sb{display:flex}
    .st{flex:1;padding:14px 8px;font-family:'Josefin Sans',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;text-align:center;border-bottom:2px solid #e8e0d5;color:#9d9187}
    .st.on{border-bottom-color:#1a1410;color:#1a1410;font-weight:600}
    .st.dn{border-bottom-color:#b8860b;color:#b8860b}
    .dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:3px}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    @media(max-width:500px){.g2{grid-template-columns:1fr}}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#d4c9b8}
    select{font-family:'Josefin Sans',sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;border:1px solid #d4c9b8;background:transparent;padding:8px 28px 8px 10px;cursor:pointer;color:#1a1410;appearance:none;outline:none}
    input[type=text],input[type=email],input[type=tel],input[type=number],input[type=password]{font-family:'Josefin Sans',sans-serif;font-size:11px;letter-spacing:1px;border:none;border-bottom:1px solid #d4c9b8;background:transparent;padding:8px 0;outline:none;color:#1a1410}
    input::placeholder{color:#c4b8a8}
  `;

  const Header = () => (
    <header style={{ borderBottom: "1px solid #e8e0d5", background: "#faf8f5", position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0ebe3" }}>
          <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, color: "#9d9187", textTransform: "uppercase" }}>Authenticated · Insured · 14-Day Returns</p>
          <div style={{ display: "flex", gap: 20 }}>
            <button className="nl" style={{ fontSize: 9 }} onClick={() => { setView("sell"); setCartOpen(false); }}>Sell With Us</button>
            <button className="nl" style={{ fontSize: 9 }} onClick={() => setView("admin")}>Admin</button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <button className="nl" onClick={() => { setView("shop"); setSelectedBrand("All"); }}>New In</button>
            <button className="nl" onClick={() => { setView("shop"); setSelectedBrand("Hermès"); }}>Hermès</button>
            <button className="nl" onClick={() => { setView("shop"); setSelectedBrand("Chanel"); }}>Chanel</button>
            <button className="nl" onClick={() => { setView("shop"); setSelectedBrand("All"); }}>All</button>
          </nav>
          <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setView("shop")}>
            <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: 5, textTransform: "uppercase", color: "#9d9187", marginBottom: 2 }}>Pre-Owned Luxury</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 300, letterSpacing: 5, textTransform: "uppercase" }}>Sybrites</h1>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <button className="nl" style={{ fontSize: 13 }}>♡ {wishlist.length}</button>
            <button className="bo" style={{ padding: "8px 18px" }} onClick={() => setCartOpen(true)}>Bag ({cart.length})</button>
          </div>
        </div>
      </div>
    </header>
  );

  const CartDrawer = () => (
    <>
      <div className="ov" onClick={() => setCartOpen(false)} />
      <div className="dr">
        <div style={{ padding: "26px 26px 18px", borderBottom: "1px solid #e8e0d5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#9d9187" }}>Your</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 300 }}>Shopping Bag</h3>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9d9187" }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 26px" }}>
          {cart.length === 0
            ? <div style={{ textAlign: "center", padding: "60px 0" }}><p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontStyle: "italic", color: "#9d9187" }}>Your bag is empty</p></div>
            : cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 14, paddingBottom: 20, marginBottom: 20, borderBottom: "1px solid #f0ebe3" }}>
                <img src={item.img} alt={item.name} style={{ width: 76, height: 86, objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187" }}>{item.brand}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16 }}>{item.name}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17 }}>{fmt(item.price)}</p>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, color: "#9d9187", cursor: "pointer", textDecoration: "underline" }}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "18px 26px 26px", borderTop: "1px solid #e8e0d5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" }}>Total</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>{fmt(cartTotal)}</p>
            </div>
            <button className="bp" style={{ width: "100%", padding: "15px" }} onClick={() => { setCartOpen(false); setView("checkout"); setStep(1); }}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );

  const ProductModal = ({ p }) => (
    <>
      <div className="ov" onClick={() => setActiveProduct(null)} />
      <div className="mo">
        <div className="mb">
          <div style={{ flex: "0 0 50%", position: "relative", minHeight: 340, background: "#f0ebe3" }}>
            <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 360 }} />
          </div>
          <div style={{ flex: 1, padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <button onClick={() => setActiveProduct(null)} style={{ background: "none", border: "none", fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187", cursor: "pointer", marginBottom: 20, padding: 0 }}>← Back</button>
              <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#9d9187", marginBottom: 4 }}>{p.brand}</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, marginBottom: 6 }}>{p.name}</h2>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#6b5d52", marginBottom: 18 }}>{p.color}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: "#6b5d52", lineHeight: 1.7, marginBottom: 18 }}>{p.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 18 }}>
                {[["Hardware", p.hardware], ["Size", p.size], ["Year", p.year], ["Condition", p.condition]].map(([l, v]) => (
                  <div key={l}><p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187", marginBottom: 1 }}>{l}</p><p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14 }}>{v}</p></div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, marginBottom: 4 }}>{fmt(p.price)}</p>
              <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, color: "#9d9187", letterSpacing: 1, marginBottom: 16 }}>Retail {fmt(p.originalRetail)}</p>
              <button className="bp" style={{ width: "100%", padding: 14, fontSize: 11 }} onClick={() => { addToCart(p); setActiveProduct(null); setCartOpen(true); }}>
                {cart.find(i => i.id === p.id) ? "Already in Bag ✓" : "Add to Bag"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const ShopView = () => (
    <>
      <div style={{ background: "#1a1410", color: "#faf8f5", padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 50%, #2d2218, #1a1410 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 620, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "#b8860b", marginBottom: 14 }}>Curated · Authenticated · Rare</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,5vw,58px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.1, marginBottom: 18 }}>Icons That Outlast Every Season</h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: "#c4b8a8", marginBottom: 30, lineHeight: 1.6 }}>A curated selection of the world's most coveted handbags — authenticated, graded, and ready to carry your story.</p>
          <button className="bg" onClick={() => document.getElementById("col").scrollIntoView({ behavior: "smooth" })}>Explore the Collection</button>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #e8e0d5", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 20px", display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {allBrands.map(b => <button key={b} className={`fp ${selectedBrand === b ? "on" : ""}`} onClick={() => setSelectedBrand(b)}>{b}</button>)}
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <input placeholder="Search…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: 160 }} />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="featured">Featured</option><option value="price-asc">Price ↑</option><option value="price-desc">Price ↓</option><option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
      <main id="col" style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 2 }}>
          {filteredProducts.map(product => (
            <div key={product.id} className="card" onClick={() => setActiveProduct(product)}>
              <div style={{ position: "relative", paddingBottom: "108%", overflow: "hidden", background: "#f0ebe3" }}>
                <img src={product.img} alt={product.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", background: tagColors[product.tag] || "#1a1410" }}>
                  <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#fff" }}>{product.tag}</span>
                </div>
              </div>
              <div style={{ padding: "18px 16px 16px" }}>
                <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187", marginBottom: 3 }}>{product.brand}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, marginBottom: 4 }}>{product.name}</h3>
                <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, color: "#9d9187", marginBottom: 12 }}>{product.color} · {product.year}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 500 }}>{fmt(product.price)}</p>
                  <button className="bp" style={{ padding: "9px 16px", fontSize: 9 }} onClick={e => { e.stopPropagation(); addToCart(product); }}>
                    {cart.find(i => i.id === product.id) ? "In Bag ✓" : "Add to Bag"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );

  const CheckoutView = () => {
    const sl = s => step > s ? "dn" : step === s ? "on" : "";
    const canStep2 = contact.email.includes("@");
    const canStep3 = shipping.firstName && shipping.address && shipping.city;
    const canStep4 = payment.cardName && payment.cardNumber.length >= 15;
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px" }}>
        <button className="nl" style={{ marginBottom: 28, fontSize: 10 }} onClick={() => setView("shop")}>← Continue Shopping</button>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 300, fontStyle: "italic", marginBottom: 28 }}>Checkout</h2>
        <div className="sb" style={{ marginBottom: 36 }}>
          {["Contact", "Shipping", "Payment", "Review"].map((s, i) => (
            <div key={s} className={`st ${sl(i + 1)}`}>{step > i + 1 ? "✓ " : ""}{s}</div>
          ))}
        </div>
        {step === 1 && (
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 24 }}>Contact Information</h3>
            <FInput label="Email Address" type="email" value={contact.email} onChange={v => setContact(p => ({ ...p, email: v }))} required />
            <FInput label="Phone Number" type="tel" value={contact.phone} onChange={v => setContact(p => ({ ...p, phone: v }))} />
            <button className="bp" onClick={() => setStep(2)} style={{ opacity: canStep2 ? 1 : 0.4, marginTop: 8 }} disabled={!canStep2}>Continue to Shipping</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 24 }}>Shipping Address</h3>
            <div className="g2"><FInput label="First Name" value={shipping.firstName} onChange={v => setShipping(p => ({ ...p, firstName: v }))} required /><FInput label="Last Name" value={shipping.lastName} onChange={v => setShipping(p => ({ ...p, lastName: v }))} /></div>
            <FInput label="Street Address" value={shipping.address} onChange={v => setShipping(p => ({ ...p, address: v }))} required />
            <div className="g2"><FInput label="City" value={shipping.city} onChange={v => setShipping(p => ({ ...p, city: v }))} required /><FInput label="State" value={shipping.state} onChange={v => setShipping(p => ({ ...p, state: v }))} /></div>
            <div className="g2"><FInput label="ZIP" value={shipping.zip} onChange={v => setShipping(p => ({ ...p, zip: v }))} /><FSelect label="Country" value={shipping.country} onChange={v => setShipping(p => ({ ...p, country: v }))} options={["United States", "United Kingdom", "Canada", "France", "Germany", "Australia", "Japan", "Other"]} /></div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button className="bo" onClick={() => setStep(1)}>Back</button>
              <button className="bp" onClick={() => setStep(3)} style={{ opacity: canStep3 ? 1 : 0.4 }} disabled={!canStep3}>Continue to Payment</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 6 }}>Payment Details</h3>
            <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, color: "#9d9187", marginBottom: 24, textTransform: "uppercase", letterSpacing: 1.5 }}>🔒 Demo mode — no real charges</p>
            <FInput label="Name on Card" value={payment.cardName} onChange={v => setPayment(p => ({ ...p, cardName: v }))} required />
            <FInput label="Card Number" placeholder="•••• •••• •••• ••••" value={payment.cardNumber} onChange={v => setPayment(p => ({ ...p, cardNumber: v }))} required />
            <div className="g2"><FInput label="Expiry MM/YY" value={payment.expiry} onChange={v => setPayment(p => ({ ...p, expiry: v }))} /><FInput label="CVV" value={payment.cvv} onChange={v => setPayment(p => ({ ...p, cvv: v }))} /></div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button className="bo" onClick={() => setStep(2)}>Back</button>
              <button className="bp" onClick={() => setStep(4)} style={{ opacity: canStep4 ? 1 : 0.4 }} disabled={!canStep4}>Review Order</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 24 }}>Review Your Order</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 14, paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid #f0ebe3" }}>
                <img src={item.img} alt={item.name} style={{ width: 68, height: 76, objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187" }}>{item.brand}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16 }}>{item.name}</p>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, alignSelf: "center" }}>{fmt(item.price)}</p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e8e0d5", paddingTop: 18, marginBottom: 22 }}>
              {[["Subtotal", fmt(cartSub)], ["Shipping", cartShip === 0 ? "Complimentary" : fmt(cartShip)], ["Tax (8%)", fmt(cartTax)]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, color: "#9d9187", textTransform: "uppercase" }}>{l}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15 }}>{v}</p>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e8e0d5", paddingTop: 12, marginTop: 6 }}>
                <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Total</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22 }}>{fmt(cartTotal)}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="bo" onClick={() => setStep(3)}>Back</button>
              <button className="bg" style={{ flex: 1, padding: 15, fontSize: 11 }} onClick={placeOrder}>Place Order — {fmt(cartTotal)}</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ConfirmView = () => (
    <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, color: "#b8860b", marginBottom: 18 }}>✦</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 300, fontStyle: "italic", marginBottom: 10 }}>Thank You</h2>
      <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#9d9187", marginBottom: 28 }}>Order {orderRef} Confirmed</p>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, lineHeight: 1.7, color: "#6b5d52", marginBottom: 36 }}>Your pieces are being prepared with the utmost care. Expect delivery within 3–5 business days, fully insured.</p>
      <button className="bp" onClick={() => setView("shop")}>Continue Shopping</button>
    </div>
  );

  const SellView = () => (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px" }}>
      <button className="nl" style={{ marginBottom: 28, fontSize: 10 }} onClick={() => setView("shop")}>← Back to Collection</button>
      <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#b8860b", marginBottom: 8 }}>Consignment</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 300, fontStyle: "italic", marginBottom: 14 }}>Sell With Sybrites</h2>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, lineHeight: 1.7, color: "#6b5d52", maxWidth: 520, marginBottom: 36 }}>We handle authentication, photography, listing, and the sale. You earn up to 70% commission with no upfront costs.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 20, background: "#f9f6f2", padding: "24px 20px", marginBottom: 44 }}>
        {[["01", "Submit", "Fill in this form in 2 minutes"], ["02", "We Authenticate", "Experts verify & grade your piece"], ["03", "We List", "Pro photography & curated listing"], ["04", "You Get Paid", "Up to 70% on final sale price"]].map(([n, t, d]) => (
          <div key={n}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: "#b8860b", marginBottom: 4 }}>{n}</p>
            <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{t}</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: "#9d9187", lineHeight: 1.5 }}>{d}</p>
          </div>
        ))}
      </div>
      {sellDone ? (
        <div style={{ textAlign: "center", padding: "44px 0" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, color: "#b8860b", marginBottom: 14 }}>◇</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, marginBottom: 10 }}>Submission Received</h3>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#6b5d52", lineHeight: 1.7, marginBottom: 28 }}>Thank you, {sell.firstName}. Our team will be in touch within 48 hours.</p>
          <button className="bo" onClick={() => { setSellDone(false); setSell({ firstName: "", lastName: "", email: "", phone: "", brand: "", name: "", color: "", condition: "Excellent", year: "", originalRetail: "", accessories: "", notes: "" }); }}>Submit Another Piece</button>
        </div>
      ) : (
        <>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 22 }}>Your Details</h3>
          <div className="g2"><FInput label="First Name" value={sell.firstName} onChange={v => setSell(p => ({ ...p, firstName: v }))} required /><FInput label="Last Name" value={sell.lastName} onChange={v => setSell(p => ({ ...p, lastName: v }))} required /></div>
          <div className="g2"><FInput label="Email" type="email" value={sell.email} onChange={v => setSell(p => ({ ...p, email: v }))} required /><FInput label="Phone" type="tel" value={sell.phone} onChange={v => setSell(p => ({ ...p, phone: v }))} /></div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 22, marginTop: 12 }}>About Your Piece</h3>
          <div className="g2"><FInput label="Brand" value={sell.brand} onChange={v => setSell(p => ({ ...p, brand: v }))} required placeholder="e.g. Hermès" /><FInput label="Style / Model" value={sell.name} onChange={v => setSell(p => ({ ...p, name: v }))} required placeholder="e.g. Birkin 30" /></div>
          <div className="g2"><FInput label="Colour & Material" value={sell.color} onChange={v => setSell(p => ({ ...p, color: v }))} /><FSelect label="Condition" value={sell.condition} onChange={v => setSell(p => ({ ...p, condition: v }))} options={["Like New", "Excellent", "Very Good", "Good", "Fair"]} /></div>
          <div className="g2"><FInput label="Year Purchased" value={sell.year} onChange={v => setSell(p => ({ ...p, year: v }))} /><FInput label="Original Retail ($)" value={sell.originalRetail} onChange={v => setSell(p => ({ ...p, originalRetail: v }))} /></div>
          <FInput label="Accessories Included" value={sell.accessories} onChange={v => setSell(p => ({ ...p, accessories: v }))} placeholder="Box, dustbag, receipt…" />
          <button className="bp" style={{ padding: "13px 32px", marginTop: 8, opacity: sell.firstName && sell.email && sell.brand && sell.name ? 1 : 0.4 }}
            disabled={!sell.firstName || !sell.email || !sell.brand || !sell.name} onClick={submitSell}>Submit for Review</button>
        </>
      )}
    </div>
  );

  const AdminView = () => {
    if (!adminAuthed) return (
      <div style={{ maxWidth: 380, margin: "90px auto", padding: "0 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 300, marginBottom: 28 }}>Admin Access</h2>
        <div style={{ marginBottom: 20, textAlign: "left" }}>
          <label style={{ display: "block", fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187", marginBottom: 6 }}>Password</label>
          <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} style={{ width: "100%" }} />
        </div>
        <button className="bp" style={{ width: "100%", padding: 14, marginBottom: 12 }} onClick={() => { if (adminPass === "sybrites2024") setAdminAuthed(true); else alert("Incorrect password"); }}>Enter</button>
        <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, color: "#9d9187" }}>Demo password: sybrites2024</p>
        <button className="nl" style={{ marginTop: 20, fontSize: 10 }} onClick={() => setView("shop")}>← Back to Store</button>
      </div>
    );
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 300 }}>Admin Dashboard</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="bo" style={{ padding: "8px 16px", fontSize: 10 }} onClick={() => setView("shop")}>← Store</button>
            <button className="bo" style={{ padding: "8px 16px", fontSize: 10 }} onClick={() => { setAdminAuthed(false); setAdminPass(""); }}>Log Out</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 36 }}>
          {[["Listed", products.filter(p => !p.sold).length, "#b8860b"], ["Sold", products.filter(p => p.sold).length, "#5c7a5c"], ["Consignments", consignments.length, "#4a6fa5"]].map(([l, v, c]) => (
            <div key={l} style={{ background: "#fff", padding: "18px 22px", borderLeft: `3px solid ${c}` }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: c }}>{v}</p>
              <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187" }}>{l}</p>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", padding: "26px", marginBottom: 30 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 22 }}>Add New Listing</h3>
          <div className="g2"><FInput label="Brand" value={np.brand} onChange={v => setNp(p => ({ ...p, brand: v }))} /><FInput label="Style Name" value={np.name} onChange={v => setNp(p => ({ ...p, name: v }))} /></div>
          <div className="g2"><FInput label="Colour" value={np.color} onChange={v => setNp(p => ({ ...p, color: v }))} /><FSelect label="Condition" value={np.condition} onChange={v => setNp(p => ({ ...p, condition: v }))} options={["Like New", "Excellent", "Very Good", "Good"]} /></div>
          <div className="g2"><FInput label="Price ($)" value={np.price} onChange={v => setNp(p => ({ ...p, price: v }))} type="number" /><FInput label="Year" value={np.year} onChange={v => setNp(p => ({ ...p, year: v }))} type="number" /></div>
          <div className="g2"><FInput label="Hardware" value={np.hardware} onChange={v => setNp(p => ({ ...p, hardware: v }))} /><FInput label="Size" value={np.size} onChange={v => setNp(p => ({ ...p, size: v }))} /></div>
          <FInput label="Image URL" value={np.img} onChange={v => setNp(p => ({ ...p, img: v }))} placeholder="https://…" />
          <button className="bp" onClick={addProduct} style={{ opacity: np.brand && np.name && np.price ? 1 : 0.4 }} disabled={!np.brand || !np.name || !np.price}>Add to Database</button>
        </div>
        <div style={{ background: "#fff", padding: "26px", overflowX: "auto" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 20 }}>All Products ({products.length})</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "2px solid #e8e0d5" }}>
              {["Brand", "Style", "Price", "Status", "Actions"].map(h => (
                <th key={h} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#9d9187", padding: "8px 10px", textAlign: "left" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f0ebe3", opacity: p.sold ? 0.5 : 1 }}>
                  <td style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, padding: "11px 10px" }}>{p.brand}</td>
                  <td style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, padding: "11px 10px" }}>{p.name}</td>
                  <td style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, padding: "11px 10px" }}>{fmt(p.price)}</td>
                  <td style={{ padding: "11px 10px" }}><span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, color: p.sold ? "#9d9187" : "#5c7a5c" }}>{p.sold ? "Sold" : "Active"}</span></td>
                  <td style={{ padding: "11px 10px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setProducts(pr => pr.map(x => x.id === p.id ? { ...x, sold: !x.sold } : x))} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, border: "1px solid #d4c9b8", background: "transparent", padding: "4px 8px", cursor: "pointer" }}>{p.sold ? "Relist" : "Mark Sold"}</button>
                      <button onClick={() => setProducts(pr => pr.filter(x => x.id !== p.id))} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, border: "1px solid #e8c8c8", background: "transparent", color: "#8b4b6e", padding: "4px 8px", cursor: "pointer" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer style={{ background: "#faf8f5", borderTop: "1px solid #e8e0d5", padding: "36px 24px", textAlign: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, fontStyle: "italic", marginBottom: 10 }}>Sybrites</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 14, flexWrap: "wrap" }}>
        {[["Shop", () => setView("shop")], ["Sell With Us", () => setView("sell")], ["Admin", () => setView("admin")]].map(([l, fn]) => (
          <button key={l} className="nl" style={{ fontSize: 9 }} onClick={fn}>{l}</button>
        ))}
      </div>
      <p style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: "#9d9187" }}>Pre-Owned Luxury · Est. 2024 · All Rights Reserved</p>
    </footer>
  );

  return (
    <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", background: "#faf8f5", minHeight: "100vh", color: "#1a1410" }}>
      <style>{css}</style>
      <Header />
      {view === "shop" && <ShopView />}
      {view === "checkout" && <CheckoutView />}
      {view === "confirm" && <ConfirmView />}
      {view === "sell" && <SellView />}
      {view === "admin" && <AdminView />}
      {view !== "checkout" && view !== "confirm" && <Footer />}
      {cartOpen && <CartDrawer />}
      {activeProduct && view === "shop" && <ProductModal p={activeProduct} />}
    </div>
  );
}
