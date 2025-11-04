import React from "react";
import "/src/styles/components/ShopModal.scss";

const ShopModal = ({ product, onClose }) => {
  return (
    <div className="shop-modal__overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        <button className="shop-modal__close" onClick={onClose}>
          ✕
        </button>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="shop-modal__image"
        />
        <h2 className="shop-modal__title">{product.name}</h2>
        <p className="shop-modal__price">{product.price} €</p>
        {product.category && (
          <p className="shop-modal__category">{product.category}</p>
        )}
        {product.description && (
          <p className="shop-modal__description">{product.description}</p>
        )}
        <p className="shop-modal__stock">
          {product.stock > 0
            ? `Disponible (${product.stock} uds)`
            : "Agotado 😢"}
        </p>
      </div>
    </div>
  );
};

export default ShopModal;
