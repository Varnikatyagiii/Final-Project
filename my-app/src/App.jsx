import React from "react";

export default function App() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    const yOffset = -70; // offset for fixed navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", boxSizing: "border-box" }}>

      {/* Navbar */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>MySite</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <button onClick={() => scrollToSection("home")} style={styles.navBtn}>Home</button>
          <button onClick={() => scrollToSection("about")} style={styles.navBtn}>About</button>
          <button onClick={() => scrollToSection("contact")} style={styles.navBtn}>Contact</button>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" style={{ ...styles.section, ...styles.home }}>
        <h1>Welcome to My Website 🚀</h1>
        <p>This is a modern React homepage.</p>
        <button style={styles.mainBtn} onClick={() => scrollToSection("contact")}>
          Get in Touch
        </button>
      </section>

      {/* About Section */}
      <section id="about" style={{ ...styles.section, ...styles.about }}>
        <h1>About Us</h1>
        <p style={{ maxWidth: "600px" }}>
          We build modern, responsive web applications using React.
          This section is perfect for showcasing your skills or company.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ ...styles.section, ...styles.contact }}>
        <h1 style={{color:"#fff"}}>Contact Us</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" style={styles.input} required />
          <input type="email" placeholder="Your Email" style={styles.input} required />
          <textarea placeholder="Your Message" style={styles.textarea}></textarea>
          <button type="submit" style={styles.submitBtn}>Send Message</button>
        </form>
      </section>

    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 60px",
    background: "#222",
    color: "#fff",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000,
    boxSizing: "border-box",   // ✅ Fix 1: prevents overflow
  },
  logo: {
    margin: 0
  },
  navBtn: {
    margin: "0 10px",
    padding: "8px 15px",
    border: "none",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px"
  },
  section: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 40px 40px",  // ✅ Fix 2: top padding accounts for navbar
    textAlign: "center"
  },
  home: {
    background: "linear-gradient(to right, #00adb5, #007b83)",
    color: "#fff"
  },
  about: {
    background: "#f4f4f4"
  },
  contact: {
    background: "#222",
    color: "#fff"
  },
  mainBtn: {
    marginTop: "20px",
    padding: "15px 20px",
    border: "none",
    background: "#fff",
    color: "#007b83",
    cursor: "pointer",
    borderRadius: "5px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px"
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "none"
  },
  textarea: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    minHeight: "100px"
  },
  submitBtn: {
    padding: "10px",
    background: "#00adb5",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px"
  }
};
