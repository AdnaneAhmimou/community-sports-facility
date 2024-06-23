'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from "@/components/ui/PageTitle";
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from "@tanstack/react-table";
import { DeleteButton } from '@/components/delete-button';
import { UpdateButton } from '@/components/ui/UpdateButton';
import withAuth from '@/components/withAuth';
import SaveInstallers from '@/components/component/SaveInstallers';
import { UpdateModal } from '@/components/component/UpdateModal';

type Payment = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  telephone: string;
};

function InstallersPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [selectedInstaller, setSelectedInstaller] = useState<Payment | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/api/installateur/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = (newInstaller: Payment) => {
    setData(prevData => [...prevData, newInstaller]);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/installateur/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdate = async (updatedInstaller: Payment) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/installateur/update/${updatedInstaller.id}`, updatedInstaller, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.map(item => (item.id === updatedInstaller.id ? updatedInstaller : item)));
      setSelectedInstaller(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "nom",
      header: "Nom",
    },
    {
      accessorKey: "prenom",
      header: "Prenom",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "adresse",
      header: "Adresse",
    },
    {
      accessorKey: "telephone",
      header: "Telephone",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <DeleteButton onClick={() => handleDelete(row.original.id)} />
          <UpdateButton onClick={() => setSelectedInstaller(row.original)} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Installers" />
      <SaveInstallers onAdd={handleAdd} />
      <DataTable columns={columns} data={data} />
      {selectedInstaller && (
        <UpdateModal
          installer={selectedInstaller}
          onClose={() => setSelectedInstaller(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default withAuth(InstallersPage);
