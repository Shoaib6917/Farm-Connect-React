
import { useState } from "react";
import "./App.css";

const modules = [
  {
    title: "Crop Guide",
    icon: "🌱",
    description: "Learn about crops, growing conditions and farming tips.",
    details:
      "Explore crop selection, growing conditions, seasonal farming and general crop care.",
  },
  {
    title: "Market Prices",
    icon: "💰",
    description: "Explore agricultural market price information.",
    details:
      "Compare agricultural market information before selling produce. Live prices can be added through an API.",
  },
  {
    title: "Government Schemes",
    icon: "🏛️",
    description: "Learn about agricultural schemes and subsidies.",
    details:
      "Learn about government schemes, farmer benefits and agricultural subsidies.",
  },
  {
    title: "Weather Updates",
    icon: "🌦️",
    description: "Explore weather information useful for farming.",
    details:
      "Weather information can help farmers plan agricultural activities. Live forecasts require a weather API.",
  },
  {
    title: "Farmer Community",
    icon: "👨‍🌾",
    description: "Connect with farmers and share information.",
    details:
      "Exchange farming experiences, ideas and useful agricultural information.",
  },
  {
    title: "Expert Help",
    icon: "🧑‍🌾",
    description: "Find guidance for agricultural questions.",
    details:
      "Get general agricultural guidance and consult qualified local experts for crop-specific advice.",
  },
  {
    title: "Fertilizers & Crop Inputs",
    icon: "🧪",
    description: "Learn about fertilizers and crop nutrients.",
    details:
      "Urea provides nitrogen. DAP provides nitrogen and phosphorus. MOP provides potassium. NPK combines these nutrients. Soil testing helps identify nutrient requirements.",
  },
  {
    title: "Farmer Alerts",
    icon: "🔔",
    description: "View important farming information and alerts.",
    details:
      "View agricultural announcements, seasonal reminders and farming-related updates.",
  },
];

function App() {
  const [page, setPage] = useState("Home");

  const selectedModule = modules.find((item) => item.title === page);

  function logout() {
    localStorage.removeItem("farmConnectRole");
    localStorage.removeItem("farmConnectName");
    setPage("Home");
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand" onClick={() => setPage("Home")}>
          <div className="brand-icon">🌱</div>
          <div>
            <h1>Farm Connect</h1>
            <p>Farmer Friendly Portal</p>
          </div>
        </div>

        <div className="auth-buttons">
          <button className="login-btn" onClick={() => setPage("Login")}>
            Login
          </button>
          <button className="signup-btn" onClick={() => setPage("Signup")}>
            Signup
          </button>
        </div>
      </header>

      <nav className="nav">
        <button onClick={() => setPage("Home")}>Home</button>
        {modules.map((module) => (
          <button key={module.title} onClick={() => setPage(module.title)}>
            {module.title}
          </button>
        ))}
      </nav>

      <main>
        {page === "Home" && (
          <>
            <section className="hero">
              <p className="hero-label">WELCOME TO FARM CONNECT</p>
              <h2>Smart Farming Starts Here</h2>
              <p>
                Explore agricultural information and useful farming services
                through one farmer-friendly platform.
              </p>
              <button onClick={() => setPage("Crop Guide")}>
                Explore Services
              </button>
            </section>

            <section className="section">
              <h2>Farm Connect Services</h2>
              <p className="section-description">
                Explore the services available on our portal.
              </p>

              <div className="modules">
                {modules.map((module) => (
                  <div className="card" key={module.title}>
                    <div className="card-icon">{module.icon}</div>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                    <button onClick={() => setPage(module.title)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {selectedModule && (
          <section className="detail-page">
            <div className="detail-icon">{selectedModule.icon}</div>
            <h2>{selectedModule.title}</h2>
            <p>{selectedModule.details}</p>

            {page === "Fertilizers & Crop Inputs" && (
              <div className="fertilizer-list">
                <h3>Common Fertilizers</h3>
                <ul>
                  <li><strong>Urea:</strong> Nitrogen fertilizer.</li>
                  <li><strong>DAP:</strong> Nitrogen and phosphorus.</li>
                  <li><strong>MOP:</strong> Potassium fertilizer.</li>
                  <li><strong>NPK:</strong> Nitrogen, phosphorus and potassium.</li>
                  <li><strong>Organic Manure:</strong> Adds organic matter to soil.</li>
                  <li><strong>Micronutrients:</strong> Includes zinc, iron and boron.</li>
                  <li><strong>Soil Testing:</strong> Helps identify soil nutrient needs.</li>
                </ul>
                <p className="notice">
                  Select fertilizers according to soil test results, crop needs
                  and qualified agricultural advice. Always read product labels.
                </p>
              </div>
            )}

            <button className="back-btn" onClick={() => setPage("Home")}>
              Back to Home
            </button>
          </section>
        )}

        {(page === "Login" || page === "Signup") && (
          <AuthPage
            type={page}
            onBack={() => setPage("Home")}
            onSuccess={(destination) => setPage(destination)}
          />
        )}

        {(page === "User Dashboard" || page === "Admin Dashboard") && (
          <DashboardPage type={page} onLogout={logout} />
        )}
      </main>

      <footer className="footer">
        <h3>Farm Connect</h3>
        <p>Useful agricultural information in one place.</p>
        <p>© 2026 Farm Connect | Farmer Friendly Portal</p>
      </footer>
    </div>
  );
}

function AuthPage({ type, onBack, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (type === "Signup") {
      const user = { name, email, password };
      localStorage.setItem("farmConnectUser", JSON.stringify(user));
      setMessage("Signup successful! You can now log in.");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("farmConnectRole", "admin");
      localStorage.setItem("farmConnectName", "Admin");
      onSuccess("Admin Dashboard");
      return;
    }

    const savedUser = localStorage.getItem("farmConnectUser");

    if (!savedUser) {
      setMessage("Please sign up first.");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (email === user.email && password === user.password) {
        localStorage.setItem("farmConnectRole", "user");
        localStorage.setItem("farmConnectName", user.name);
        onSuccess("User Dashboard");
      } else {
        setMessage("Invalid email or password.");
      }
    } catch {
      setMessage("Saved account data is invalid. Please sign up again.");
    }
  }

  return (
    <section className="auth-page">
      <h2>{type}</h2>

      <form onSubmit={handleSubmit}>
        {type === "Signup" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">{type}</button>
      </form>

      {message && <p className="message">{message}</p>}

      {type === "Signup" && (
        <button className="back-btn" onClick={() => onSuccess("Login")}>
          Go to Login
        </button>
      )}

      {type === "Login" && (
        <p className="admin-hint">
          Admin demo login: admin@gmail.com / admin123
        </p>
      )}

      <button className="back-btn" onClick={onBack}>
        Back to Home
      </button>
    </section>
  );
}

function DashboardPage({ type, onLogout }) {
  const name = localStorage.getItem("farmConnectName") || "Farmer";
  const isAdmin = type === "Admin Dashboard";
  const savedUser = localStorage.getItem("farmConnectUser");

  return (
    <section className="detail-page">
      <h2>{isAdmin ? "Admin Dashboard" : "Farmer Dashboard"}</h2>
      <p>Welcome, {name}!</p>
      <p>
        {isAdmin
          ? "Manage and monitor the Farm Connect portal."
          : "Access useful farming services from your dashboard."}
      </p>

      {isAdmin ? (
        <>
          <div className="modules">
            <div className="card">
              <div className="card-icon">📦</div>
              <h3>Total Modules</h3>
              <p>{modules.length} farming modules available</p>
            </div>

            <div className="card">
              <div className="card-icon">👥</div>
              <h3>User Management</h3>
              <p>
                {savedUser
                  ? "A demo user account is registered in this browser."
                  : "No demo user account registered yet."}
              </p>
            </div>

            <div className="card">
              <div className="card-icon">🌱</div>
              <h3>Module Management</h3>
              <p>Review the farming services available on the portal.</p>
            </div>
          </div>

          <h3 style={{ marginTop: "25px" }}>Available Modules</h3>
          <ul style={{ paddingLeft: "22px", lineHeight: "1.9" }}>
            {modules.map((module) => (
              <li key={module.title}>
                {module.icon} {module.title}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3>Farmer Services</h3>
          <div className="modules">
            {modules.slice(0, 4).map((module) => (
              <div className="card" key={module.title}>
                <h3>{module.icon} {module.title}</h3>
                <p>{module.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <button className="back-btn" onClick={onLogout}>
        Logout
      </button>
    </section>
  );
}

export default App;
