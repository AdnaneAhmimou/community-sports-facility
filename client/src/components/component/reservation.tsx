"use client";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import withAuth from "@/components/component/withAuth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectSingleEventHandler } from "react-day-picker";
import { set } from "date-fns";

interface Installer {
  id: number;
  nom: string;
  prenom: string;
}

interface Equipment {
  id: number;
  designation: string;
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

export function Reservation() {
  const [loading, setLoading] = useState(true);
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEquipment, setSelectedEquipment] = useState<number[]>([]);
  const [selectedInstallers, setSelectedInstallers] = useState<number[]>([]);
  const [client, setClient] = useState<any>(null); // in order to get the client id from the token

  useEffect(() => {
    axios
      .get<Installer[]>("http://localhost:8080/api/installateur/getAll")
      .then((response) => setInstallers(response.data))
      .catch((error) => console.error("Error fetching installers:", error));

    axios
      .get<Equipment[]>("http://localhost:8080/api/equipement/getAll")
      .then((response) => setEquipment(response.data))
      .catch((error) => console.error("Error fetching equipment:", error));

    // const token = localStorage.getItem("token");
    // if (token) {
    //   const decodedToken = parseJwt(token);
    //   console.log("decodedToken", decodedToken);

    //   if (decodedToken && decodedToken.sub) {
    //     setClient({email: decodedToken.sub});
    //     console.log("client", decodedToken.client);
    //   }
    //   setLoading(false);
    // }
  }, []);

  const handleDateChange: SelectSingleEventHandler = (
    day: SetStateAction<Date | undefined>
  ) => {
    if (day instanceof Date) {
      setSelectedDate(day);
    }
  };

  const handleEquipmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setSelectedEquipment((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((item) => item !== value);
      } else {
        return [...prevState, value];
      }
    });
  };

  const handleInstallerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setSelectedInstallers((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((item) => item !== value);
      } else {
        return [...prevState, value];
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (client) {
      axios
        .post("http://localhost:8080/api/reservation/create", {
          date: selectedDate?.toISOString(),
          equipmentIds: selectedEquipment,
          installerIds: selectedInstallers,
          clientId: client.id,
        })
        .then((response) => {
          console.log("Reservation created:", response.data);
          alert("Reservation created successfully");
        })
        .catch((error) => {
          console.error("Error creating reservation:", error);
        });
    } else {
      console.error("Client is not defined");
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white text-black">
          <h1 className="text-3xl font-bold mb-6">Reserve Sport Equipment</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-1" htmlFor="date">
                Date of Reservation
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full justify-start text-left font-normal bg-white text-black border-black"
                    id="date"
                    variant="outline"
                  >
                    <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                    {selectedDate ? selectedDate.toDateString() : " "}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-auto p-0 bg-white text-black"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block font-medium mb-1">Equipment</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {equipment.map((item) => (
                  <Label key={item.id} className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      value={item.id}
                      className="small-checkbox"
                      onChange={handleEquipmentChange}
                      checked={selectedEquipment.includes(item.id)}
                    />
                    <span>{item.designation}</span>
                  </Label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Installers</label>
              <div className="grid grid-cols-3 gap-4">
                {installers.map((installer) => (
                  <Label
                    key={installer.id}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      type="checkbox"
                      value={installer.id}
                      className="small-checkbox"
                      onChange={handleInstallerChange}
                      checked={selectedInstallers.includes(installer.id)}
                    />
                    <span>
                      {installer.nom} {installer.prenom}
                    </span>
                  </Label>
                ))}
              </div>
            </div>
            <Button className="w-full bg-black text-white" type="submit">
              Reserve
            </Button>
          </form>
        </div>
      </div>
    );
  };

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

export default withAuth(Reservation);
