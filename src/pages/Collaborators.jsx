import React, { useEffect, useState } from "react";
import { getAllComercios } from "../firebase/firestore";
import ComercioCard from "../components/ComercioCard";
import CollaboratorModal from "../components/CollaboratorModal";
import LoadingSpinner from "../components/LoadingSpinner";
import DoodleBackground from "../components/Dooackground";
import Footer from "../components/Footer";
import "../styles/Collaborators.scss";
import { useTranslation } from "react-i18next";

function Collaborators() {
  const { t } = useTranslation();
  const [comercios, setComercios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // para el modal

  useEffect(() => {
    getAllComercios().then((data) => {
      setComercios(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <DoodleBackground type="party">
      <section className="collaborators">
        <h1 className="collaborators__title">{t("comercios_colaboradores")}</h1>
        <p className="collaborators__subtitle">{t("comercios_text")}</p>

        <div className="collaborators__grid">
          {comercios.map((c) => (
            <ComercioCard key={c.id} comercio={c} onViewMore={() => setSelected(c)} />
          ))}
        </div>

        {selected && (
          <CollaboratorModal comercio={selected} onClose={() => setSelected(null)} />
        )}
      </section>
      <Footer />
    </DoodleBackground>
  );
}

export default Collaborators;
