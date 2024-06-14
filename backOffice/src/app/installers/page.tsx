'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from "@/components/ui/PageTitle";
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from "@tanstack/react-table";
import { DeleteButton } from '@/components/delete-button';
import withAuth from '@/components/withAuth';
import SaveInstallers from '@/components/component/SaveInstallers';

type Payment = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  telephone: string;
};

type Props = {};

function InstallersPage() {
  const [data, setData] = useState<Payment[]>([]);

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
      cell: ({ row }) => <DeleteButton onClick={() => handleDelete(row.original.id)} />,
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Installers" />
      <SaveInstallers/>
      {/* <AddButton/> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default withAuth(InstallersPage);
