import React, { useState } from "react";
import { addProduct, updateProduct } from "../../firebase/firestore";
import "/src/styles/components/ShopForm.scss";
import defaultImage from "/src/assets/img/default-product.png"; // imagen por defecto

const ShopForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      imageUrl: defaultImage,
    }
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageUrl: URL.createObjectURL(file), imageFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const saved = product
      ? await updateProduct(product.id, formData)
      : await addProduct(formData);

    setSaving(false);
    onSave(saved);
  };

  return (
    <div className="shop-form__overlay">
      <div className="shop-form">
        <h2>{product ? "Editar producto" : "Nuevo producto"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="shop-form__image">
            <img src={formData.imageUrl} alt="preview" />
            <input type="file" onChange={handleImageChange} />
          </div>

          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Precio (€)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Categoría</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <div className="shop-form__buttons">
            <button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopForm;
