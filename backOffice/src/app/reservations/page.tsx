"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/ui/PageTitle";
import { DeleteButton } from "@/components/delete-button";
import withAuth from "@/components/withAuth";
import axios from "axios";

type Payment = {
  id: number;
  nom: string;
  prenom: string;
  dateReservation: string;
  equipements: string[];
  installateurs: { nom: string; prenom: string }[];
  status: string;
};

const OrdersPage = () => {

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "nom",
      header: "Nom"
    },
    {
      accessorKey: "prenom",
      header: "Prenom"
    },
    {
      accessorKey: "dateReservation",
      header: "Date Reservation"
    },
    {
      accessorKey: "equipements",
      header: "Equipements",
      cell: ({ row }) => <div>{row.original.equipements.join(", ")}</div>
    },
    {
      accessorKey: "installateurs",
      header: "Installateurs",
      cell: ({ row }) => (
        <div>
          {row.original.installateurs.map((inst, index) => (
            <div key={index}>{`${inst.nom} ${inst.prenom}`}</div>
          ))}
        </div>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div
            className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
              "bg-red-200": row.getValue("status") === "EN_ATTENTE",
              "bg-orange-200": row.getValue("status") === "ANNULEE",
              "bg-green-200": row.getValue("status") === "CONFIRMEE"
            })}
          >
            {row.getValue("status")}
          </div>
        );
      }
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => <DeleteButton onClick={() => handleDelete(row.original)} />,
    },
  ];

  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:8080/api/reservation/getAll", { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        const transformedData = response.data.map((reservation: any) => ({
          id: reservation.id || 0, 
          nom: reservation.client?.nom || 'N/A', 
          prenom: reservation.client?.prenom || 'N/A', 
          dateReservation: reservation.dateReservation || 'N/A', 
          equipements: reservation.equipements.map((equip: any) => equip.designation) || [],
          installateurs: reservation.installateurs.map((inst: any) => ({ nom: inst.nom || 'N/A', prenom: inst.prenom || 'N/A' })) || [],
          status: reservation.status || 'N/A'
        }));
        setData(transformedData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = async (row: Payment) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/api/reservation/delete/${row.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(prevData => prevData.filter(reservation => reservation.id !== row.id));
      console.log("Deleted successfully", row);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Orders" />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default withAuth(OrdersPage);
