import React from 'react';
import './index.css';

export default function Modal() {

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2 className="modalTitle">Remover produto do catálogo?</h2>
        <p className="modalDesc">Esta ação não poderá ser desfeita.</p>
        <div className="modalFooter">
          <button className="modalBtn">Manter Produto</button>
          <button className="modalBtn modalRemove">Remover</button>
        </div>
      </div>
    </div>
  );
}
