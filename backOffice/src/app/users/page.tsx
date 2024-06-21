'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from "@/components/ui/PageTitle";
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from "@tanstack/react-table";
import { DeleteButton } from '@/components/delete-button';
import withAuth from '@/components/withAuth';

type Payment = {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  adresse: string;
  cin: string;
  telephone: string;
};

type Props = {};

function UsersPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/api/client/getAll", {
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

  const handleDelete = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/client/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter(user => user.id !== userId));
      console.log(`Deleted user with id ${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
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
      accessorKey: "cin",
      header: "CIN",
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
      <PageTitle title="Users" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default withAuth(UsersPage);
