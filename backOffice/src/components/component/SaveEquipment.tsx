import React, { useState } from "react";
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AddButton } from "./add-button";

type Equipment = {
  id: number;
  designation: string;
  description: string;
};

export default function SaveEquipment({ onAdd }: { onAdd: (equipment: Equipment) => void }) {
  const [equipment, setEquipment] = useState({
    designation: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEquipment(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8080/api/equipement/save", equipment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Equipment saved successfully:", equipment);
      onAdd(response.data); // Add the new equipment to the list
    } catch (error) {
      console.error("Error saving equipment:", error);
    }
  };

  return (
    <>
      <div className="space-y-2 flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
          <Label htmlFor="designation">Nom</Label>
          <Input id="designation" value={equipment.designation} onChange={handleChange} />
        </div>
        <div className="w-1/2 px-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" value={equipment.description} onChange={handleChange} />
        </div>
      </div>
      <div className="px-2">
        <AddButton onClick={handleSubmit} />
      </div>
    </>
  );
}
