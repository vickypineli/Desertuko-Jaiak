//src/pages/Home/CollaboratorsPage.jsx
import React, { useEffect, useState } from "react";
import { getAllComercios } from "/src/firebase/firestore";
import ComercioCard from "/src/components/shops/ComercioCard.jsx";
import CollaboratorModal from "/src/components/collaborators/CollaboratorModal.jsx";
import LoadingSpinner from "/src/components/common/LoadingSpinner.jsx";
import DoodleBackground from "/src/components/common/DoodleBackground.jsx";
import Footer from "/src/components/common/Footer.jsx";
import "/src/styles/pages/Collaborators.scss";
import { useTranslation } from "react-i18next";

function CollaboratorsPage() {
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

export default CollaboratorsPage;
