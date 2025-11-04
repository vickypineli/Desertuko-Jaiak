// src/pages/Admin/ShopsAdmin.jsx
import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../firebase/firestore";
import ShopForm from "../../components/ShopForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../styles/ShopsAdmin.scss";

const ShopsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="shops-admin">
      <div className="shops-admin__header">
        <h2>Productos de Merchandising</h2>
        <button
          className="shops-admin__add-btn"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          Añadir producto
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="shops-admin__table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="shops-admin__img"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.price} €</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="shops-admin__edit"
                    onClick={() => {
                      setEditing(p);
                      setShowForm(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="shops-admin__delete"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <ShopForm
          product={editing}
          onClose={() => setShowForm(false)}
          onSave={(updated) => {
            if (editing) {
              setProducts(
                products.map((p) => (p.id === updated.id ? updated : p))
              );
            } else {
              setProducts([...products, updated]);
            }
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default ShopsAdmin;


