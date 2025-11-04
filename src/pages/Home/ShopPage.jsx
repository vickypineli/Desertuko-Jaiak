import React, { useEffect, useState } from "react";
import { getAllProducts } from "/src/firebase/firestore";
import DoodleBackground from "/src/components/common/Dooackground.jsx";
import LoadingSpinner from "/src/components/common/LoadingSpinner";
import Footer from "/src/components/common/Footer";
import ShopModal from "/src/components/shops/ShopModal.jsx";
import "/src/styles/pages/ShopPage.scss";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <DoodleBackground type="shop">
      <section className="shop-page">
        <h1 className="shop-page__title">Merchandising</h1>
        <p className="shop-page__subtitle">
          Consigue productos oficiales de Desertuko Jaiak 🎉
        </p>

        <div className="shop-page__grid">
          {products.map((p) => (
            <div
              key={p.id}
              className="shop-page__card"
              onClick={() => setSelected(p)}
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="shop-page__image"
              />
              <div className="shop-page__info">
                <h3>{p.name}</h3>
                <p className="shop-page__price">{p.price} €</p>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <ShopModal product={selected} onClose={() => setSelected(null)} />
        )}
      </section>
      <Footer />
    </DoodleBackground>
  );
};

export default ShopPage;
