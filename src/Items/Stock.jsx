import React, { useState, useEffect } from "react";
import stockk from "../assets/stock.jpg";
import "./Items.css";

const donnéesLocales = [
  { id: 1, nom: "bornes", quantite: 45, seuil: 50 },
  { id: 2, nom: "fils", quantite: 80, seuil: 30 },
  { id: 3, nom: "batteries", quantite: 15, seuil: 25 }
];

const Stock = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulation de chargement (sans backend)
  useEffect(() => {
    const timer = setTimeout(() => {
      setProduits(donnéesLocales);
      setLoading(false);
    }, 1000); // Simulation délai de chargement

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="Stock" className="stock-container">
      <div className="stock-card">
        <h1 className="stock-title">Stock</h1>

        {loading ? (
          <p className="stock-loading">Chargement...</p>
        ) : (
          <div className="stock-list">
            {produits.length === 0 ? (
              <p>Aucun produit en stock.</p>
            ) : (
              <table className="stock-table">
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Seuil</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {produits.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nom}</td>
                      <td>{p.quantite}</td>
                      <td>{p.seuil}</td>
                      <td>
                        <span
                          className={`badge ${
                            p.quantite <= p.seuil ? "danger" : "ok"
                          }`}
                        >
                          {p.quantite <= p.seuil
                            ? "⚠️ Stock bas"
                            : "✅ OK"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <hr />

        <div className="stock-features">
          <h2>➕ Entrée / ➖ Sortie</h2>
          <p>(À implémenter avec journalisation)</p>

          <h2>📷 Scanner QR Code</h2>
          <p>(Fonctionnalité mobile à venir)</p>

          <h2>📊 Évolution du stock</h2>
          <p>(Graphiques à intégrer avec Chart.js ou Recharts)</p>
        </div>
      </div>
    </div>
  );
};

export default Stock;
