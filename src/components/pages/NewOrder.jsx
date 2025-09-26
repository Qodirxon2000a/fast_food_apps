import { useEffect, useState } from "react";
import axios from "axios";
import "../css/NewOrder.css";

function NewOrder() {
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // API'dan ma'lumot olish
  useEffect(() => {
    axios.get("http://localhost:5000/service")
      .then((res) => {
        setServices(res.data);

        // unique kategoriyalarni ajratish
        const cats = [...new Set(res.data.map((s) => s.category_id?.name))];
        setCategories(cats);
      })
      .catch((err) => console.error(err));
  }, []);

  // Taomni savatga qo‘shish
  const addToCart = (item) => {
    const exist = cart.find((c) => c._id === item._id);
    if (exist) {
      setCart(
        cart.map((c) =>
          c._id === item._id ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // Savatdan miqdorni kamaytirish
  const removeFromCart = (id) => {
    const exist = cart.find((c) => c._id === id);
    if (exist.qty === 1) {
      setCart(cart.filter((c) => c._id !== id));
    } else {
      setCart(
        cart.map((c) =>
          c._id === id ? { ...c, qty: c.qty - 1 } : c
        )
      );
    }
  };

  // Umumiy summa
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Buyurtma berish
  const submitOrder = () => {
    if (cart.length === 0) {
      alert("Savat bo‘sh!");
      return;
    }

    axios.post("http://localhost:5000/orders", {
      items: cart.map((c) => ({ serviceId: c._id, qty: c.qty })),
      total,
    })
      .then(() => {
        alert("Buyurtma qabul qilindi!");
        setCart([]);
      })
      .catch((err) => console.error(err));
  };

  // Filterlangan mahsulotlar
  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category_id?.name === selectedCategory);

  return (
    <div className="new-order">
      <div className="menu">
        <h2>Menyudan tanlang</h2>

        {/* Kategoriya filterlari */}
        <div className="categories">
          <button
            className={selectedCategory === "all" ? "active" : ""}
            onClick={() => setSelectedCategory("all")}
          >
            Barchasi
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredServices.map((item) => (
            <div key={item._id} className="card">
              <img src={`http://localhost:5000${item.image}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.category_id?.name}</p>
              <strong>{item.price.toLocaleString()} so‘m</strong>
              <button onClick={() => addToCart(item)}>Qo‘shish</button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart">
        <h2>Buyurtma savati</h2>
        {cart.length === 0 ? (
          <p>Savat bo‘sh</p>
        ) : (
          <ul>
            {cart.map((c) => (
              <li key={c._id}>
                <span>{c.name} ({c.qty}x)</span>
                <div>
                  <button onClick={() => removeFromCart(c._id)}>-</button>
                  <button onClick={() => addToCart(c)}>+</button>
                </div>
                <strong>{(c.price * c.qty).toLocaleString()} so‘m</strong>
              </li>
            ))}
          </ul>
        )}
        <h3>Jami: {total.toLocaleString()} so‘m</h3>
        <button className="submit" onClick={submitOrder}>Buyurtma berish</button>
      </div>
    </div>
  );
}

export default NewOrder;
