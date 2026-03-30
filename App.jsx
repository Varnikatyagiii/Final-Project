import React from "react";

//export default function App() {
  // const scrollToSection = (id) => {
  //   const el = document.getElementById(id);
  //   const yOffset = -70; // offset for fixed navbar height
  //   const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  //   window.scrollTo({ top: y, behavior: "smooth" });
  //};

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Message sent!");
//   };

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", boxSizing: "border-box" }}>

//       {/* Navbar */}
//       <nav style={styles.nav}>
//         <h2 style={styles.logo}>MySite</h2>
//         <div style={{ display: "flex", flexWrap: "wrap" }}>
//           <button onClick={() => scrollToSection("home")} style={styles.navBtn}>Home</button>
//           <button onClick={() => scrollToSection("about")} style={styles.navBtn}>About</button>
//           <button onClick={() => scrollToSection("contact")} style={styles.navBtn}>Contact</button>
//         </div>
//       </nav>

//       {/* Home Section */}
//       <section id="home" style={{ ...styles.section, ...styles.home }}>
//         <h1>Welcome to My Website 🚀</h1>
//         <p>This is a modern React homepage.</p>
//         <button style={styles.mainBtn} onClick={() => scrollToSection("contact")}>
//           Get in Touch
//         </button>
//       </section>

//       {/* About Section */}
//       <section id="about" style={{ ...styles.section, ...styles.about }}>
//         <h1>About Us</h1>
//         <p style={{ maxWidth: "600px" }}>
//           We build modern, responsive web applications using React.
//           This section is perfect for showcasing your skills or company.
//         </p>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" style={{ ...styles.section, ...styles.contact }}>
//         <h1 style={{color:"#fff"}}>Contact Us</h1>
//         <form style={styles.form} onSubmit={handleSubmit}>
//           <input type="text" placeholder="Your Name" style={styles.input} required />
//           <input type="email" placeholder="Your Email" style={styles.input} required />
//           <textarea placeholder="Your Message" style={styles.textarea}></textarea>
//           <button type="submit" style={styles.submitBtn}>Send Message</button>
//         </form>
//       </section>

//     </div>
//   );
// }

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 60px",
//     background: "#222",
//     color: "#fff",
//     position: "fixed",
//     width: "100%",
//     top: 0,
//     zIndex: 1000,
//     boxSizing: "border-box",   // ✅ Fix 1: prevents overflow
//   },
//   logo: {
//     margin: 0
//   },
//   navBtn: {
//     margin: "0 10px",
//     padding: "8px 15px",
//     border: "none",
//     background: "transparent",
//     color: "#fff",
//     cursor: "pointer",
//     fontSize: "16px"
//   },
//   section: {
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "80px 40px 40px",  // ✅ Fix 2: top padding accounts for navbar
//     textAlign: "center"
//   },
//   home: {
//     background: "linear-gradient(to right, #00adb5, #007b83)",
//     color: "#fff"
//   },
//   about: {
//     background: "#f4f4f4"
//   },
//   contact: {
//     background: "#222",
//     color: "#fff"
//   },
//   mainBtn: {
//     marginTop: "20px",
//     padding: "15px 20px",
//     border: "none",
//     background: "#fff",
//     color: "#007b83",
//     cursor: "pointer",
//     borderRadius: "5px"
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     width: "300px"
//   },
//   input: {
//     margin: "10px 0",
//     padding: "10px",
//     borderRadius: "5px",
//     border: "none"
//   },
//   textarea: {
//     margin: "10px 0",
//     padding: "10px",
//     borderRadius: "5px",
//     border: "none",
//     minHeight: "100px"
//   },
//   submitBtn: {
//     padding: "10px",
//     background: "#00adb5",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//     borderRadius: "5px"
//   }
// };
// import ClickCounter from './task';
// function App() {
//   return (
//     <div>
//       <ClickCounter />
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const products = [
    { id: 1, name: "Shoes", price: 2000 },
    { id: 2, name: "T-Shirt", price: 800 },
    { id: 3, name: "Watch", price: 3000 },
  ];

  // 🔥 Load cart from localStorage (runs once)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // 🔥 Update totals + save to localStorage (runs whenever cart changes)
  useEffect(() => {
    const price = cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );

    const items = cart.reduce((sum, item) => sum + item.qty, 0);

    setTotalPrice(price);
    setTotalItems(items);

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Increase qty
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease qty
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Shopping Cart</h1>

      {/* Badge */}
      <h3>Items in Cart: {totalItems}</h3>

      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ₹{p.price}
          <button onClick={() => addToCart(p)}>Add</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id}>
          {item.name} - ₹{item.price} × {item.qty}
          <button onClick={() => increaseQty(item.id)}>+</button>
          <button onClick={() => decreaseQty(item.id)}>-</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <h2>Total: ₹{totalPrice}</h2>
    </div>
  );
}

export default App;