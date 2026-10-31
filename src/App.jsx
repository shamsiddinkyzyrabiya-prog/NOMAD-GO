import { useState } from "react";
import "./App.css";

const tours = [
  {
    id: 1,
    name: "Ысык-Көл",
    category: "Көл",
    price: 4500,
    duration: "3 күн",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    description: "Кыргызстандын бермети — Ысык-Көлгө саякат."
  },
  {
    id: 2,
    name: "Ала-Арча",
    category: "Тоо",
    price: 2500,
    duration: "1 күн",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    description: "Бийик тоолор жана укмуштуудай жаратылыш."
  },
  {
    id: 3,
    name: "Соң-Көл",
    category: "Көл",
    price: 6000,
    duration: "2 күн",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    description: "Тоолордун арасындагы керемет көл."
  },
  {
    id: 4,
    name: "Бурана мунарасы",
    category: "Тарых",
    price: 2000,
    duration: "1 күн",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    description: "Кыргызстандын тарыхый мурастары менен таанышуу."
  },
  {
    id: 5,
    name: "Жети-Өгүз",
    category: "Тоо",
    price: 5000,
    duration: "2 күн",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1",
    description: "Кызыл аскалардын кооз көрүнүшү."
  },
  {
    id: 6,
    name: "Көл-Суу",
    category: "Көл",
    price: 8500,
    duration: "3 күн",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Кыргызстандын эң кооз көлдөрүнүн бири."
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Баары");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [dark, setDark] = useState(false);

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Баары" || tour.category === category;

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id]
    );
  };

  return (
    <div className={dark ? "app dark" : "app"}>

      <header className="header">
        <a href="#home" className="logo">NOMAD<span>GO</span></a>

        <nav>
          <a href="#home">Башкы бет</a>
          <a href="#tours">Турлар</a>
          <a href="#about">Биз жөнүндө</a>
          <a href="#contact">Байланыш</a>
        </nav>

        <div className="header-actions">
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={() => alert("Сакталган турлар: " + favorites.length)}>
            ❤️ {favorites.length}
          </button>
          <button onClick={() => alert("Себеттеги турлар: " + cart.length)}>
            🛒 {cart.length}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-label">🇰🇬 KYRGYZSTAN TOURISM</span>

          <h1>
            Кыргызстанды
            <br />
            <span>биз менен ач!</span>
          </h1>

          <p>
            Укмуштуудай тоолор, кооз көлдөр жана
            унутулгус саякаттар сени күтөт.
          </p>

          <a href="#tours" className="main-button">
            Саякатты баштоо →
          </a>
        </div>
      </section>

      <section className="search-section">
        <h2>Өзүңө жаккан саякатты тап</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Турдун атын жаз..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Баары</option>
            <option>Көл</option>
            <option>Тоо</option>
            <option>Тарых</option>
          </select>

          <button onClick={() => document.getElementById("tours").scrollIntoView()}>
            Издөө
          </button>
        </div>
      </section>

      <section className="tours-section" id="tours">
        <div className="section-heading">
          <span>POPULAR DESTINATIONS</span>
          <h2>Популярдуу багыттар</h2>
          <p>Кыргызстандын эң кооз жерлерине саякат жаса.</p>
        </div>

        <div className="tour-grid">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <div className="tour-card" key={tour.id}>
                <div className="tour-image">
                  <img src={tour.image} alt={tour.name} />

                  <button
                    className="favorite"
                    onClick={() => toggleFavorite(tour.id)}
                  >
                    {favorites.includes(tour.id) ? "❤️" : "🤍"}
                  </button>

                  <span className="duration">{tour.duration}</span>
                </div>

                <div className="tour-info">
                  <span className="category">{tour.category}</span>
                  <h3>{tour.name}</h3>
                  <p>{tour.description}</p>

                  <div className="tour-bottom">
                    <strong>{tour.price.toLocaleString("ru-RU")} сом</strong>

                    <button onClick={() => setCart([...cart, tour])}>
                      + Себетке
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Мындай тур табылган жок.</p>
          )}
        </div>
      </section>

      <section className="why-section" id="about">
        <div className="section-heading">
          <span>WHY NOMADGO</span>
          <h2>Эмне үчүн бизди тандашат?</h2>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div>🏔️</div>
            <h3>Кооз багыттар</h3>
            <p>Кыргызстандын эң кызыктуу жерлери.</p>
          </div>

          <div className="why-card">
            <div>💰</div>
            <h3>Жеткиликтүү баалар</h3>
            <p>Ар кандай бюджетке ылайыктуу турлар.</p>
          </div>

          <div className="why-card">
            <div>🧭</div>
            <h3>Ыңгайлуу саякат</h3>
            <p>Саякатыңды алдын ала пландаштыр.</p>
          </div>

          <div className="why-card">
            <div>❤️</div>
            <h3>Унутулгус көз ирмемдер</h3>
            <p>Жаңы жерлерди ачып, жакшы эскерүүлөрдү жарат.</p>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <h2>Кийинки саякатыңды биз менен башта!</h2>
        <p>Кыргызстандын кооздугун NOMADGO менен ач.</p>
        <a href="#tours" className="main-button">Турларды тандоо</a>
      </section>

      <footer className="footer">
        <h2>NOMADGO</h2>
        <p>Кыргызстандын кооздугун дүйнөгө ачабыз 🇰🇬</p>
        <p>© 2026 NOMADGO. Бардык укуктар корголгон.</p>
      </footer>

    </div>
  );
}

export default App;