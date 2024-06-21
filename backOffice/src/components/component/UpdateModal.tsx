import React, { useState } from 'react';

type Payment = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  telephone: string;
};

type UpdateModalProps = {
  installer: Payment | null;
  onClose: () => void;
  onUpdate: (updatedInstaller: Payment) => void;
};

export function UpdateModal({ installer, onClose, onUpdate }: UpdateModalProps) {
  const [formData, setFormData] = useState<Payment | null>(installer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Payment | null) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onUpdate(formData);
    }
  };

  if (!installer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Update Installer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData?.nom || ''}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Prenom</label>
            <input
              type="text"
              name="prenom"
              value={formData?.prenom || ''}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData?.email || ''}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Adresse</label>
            <input
              type="text"
              name="adresse"
              value={formData?.adresse || ''}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Telephone</label>
            <input
              type="text"
              name="telephone"
              value={formData?.telephone || ''}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
