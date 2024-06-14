import React, { useState } from "react";
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AddButton } from "./add-button";

export default function SaveInstallers() {
  const [installer, setInstaller] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    telephone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInstaller(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:8080/api/installateur/save", installer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Installer saved successfully:", installer);
      // Optionally, reset the form or handle success message here
    } catch (error) {
      console.error("Error saving installer:", error);
      // Optionally, handle error message here
    }
  };

  return (
    <>
      <div className="space-y-2 flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" value={installer.nom} onChange={handleChange} />
        </div>
        <div className="w-1/2 px-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input id="prenom" value={installer.prenom} onChange={handleChange} />
        </div>
        <div className="w-1/2 px-2">
          <Label htmlFor="adresse">Adresse</Label>
          <Input id="adresse" value={installer.adresse} onChange={handleChange} />
        </div>
        <div className="w-1/2 px-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" value={installer.email} onChange={handleChange} />
        </div>
        <div className="w-1/2 px-2">
          <Label htmlFor="telephone">Telephone</Label>
          <Input id="telephone" value={installer.telephone} onChange={handleChange} />
        </div>
      </div>
      <div className="px-2">
        <AddButton onClick={handleSubmit} />
      </div>
    </>
  );
}
