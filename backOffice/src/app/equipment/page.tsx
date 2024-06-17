'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '@/components/ui/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { DeleteButton } from '@/components/delete-button';
import withAuth from '@/components/withAuth';
import SaveEquipment from '@/components/component/SaveEquipment';

type Equipment = {
  id: number;
  designation: string;
  description: string;
};

const Equipment = () => {
  const [data, setData] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/equipement/getAll');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (equipment: Equipment) => {
    try {
      await axios.delete(`http://localhost:8080/api/equipement/delete/${equipment.id}`);
      setData(prevData => prevData.filter(item => item.id !== equipment.id));
      console.log('Deleted successfully', equipment);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const columns: ColumnDef<Equipment>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'designation',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => <DeleteButton onClick={() => handleDelete(row.original)} />,
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Equipment" />
      <SaveEquipment />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default withAuth(Equipment);
