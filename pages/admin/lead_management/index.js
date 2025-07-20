import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AdminNavigation } from "../../../components/Navigation";

import dbConnect from "../../../dbConnect";
import leadModel from "../../../model/leadModel";
import amityModel from "../../../model/amityModel";
import manipalModel from "../../../model/manipalModel";
import lpuModel from "../../../model/lpuModel";
import nmimsModel from "../../../model/nmimsModel";

export async function getServerSideProps() {
  await dbConnect();

  const mainLeads = await leadModel.find({}).lean();
  const amityLeads = await amityModel.find({}).lean();
  const manipalLeads = await manipalModel.find({}).lean();
  const lpuLeads = await lpuModel.find({}).lean();
  const nmimsLeads = await nmimsModel.find({}).lean();

  const formattedLeads = [
    ...mainLeads.map(e => ({
      ...e,
      name: e.name || `${e.first_name || ""} ${e.last_name || ""}`,
      phone: e.phone || e.phoneNumber,
      email: e.email,
      state: e.state || e.location,
      course: e.course || "-",
      gender: e.gender || "-",
      dob: e.dob || "-",
      submitTime: e.createdAt,
      source: "Website Form"
    })),
    ...amityLeads.map(e => ({
      ...e,
      name: `${e.first_name} ${e.last_name}`,
      phone: e.phoneNumber,
      email: e.email,
      state: e.location,
      course: e.course,
      gender: "-",
      dob: "-",
      submitTime: e.submit_time,
      source: "Amity"
    })),
    ...manipalLeads.map(e => ({
      ...e,
      name: e.name,
      phone: e.phoneNumber,
      email: e.email,
      state: e.location,
      course: "-",
      gender: "-",
      dob: "-",
      submitTime: e.date,
      source: "Manipal"
    })),
    ...lpuLeads.map(e => ({
      ...e,
      name: e.name,
      phone: e.phoneNumber,
      email: e.email,
      state: e.location,
      course: e.course,
      gender: "-",
      dob: "-",
      submitTime: e.date,
      source: "LPU"
    })),
    ...nmimsLeads.map(e => ({
      ...e,
      name: e.name,
      phone: e.phoneNumber,
      email: e.email,
      state: e.location,
      course: "-",
      gender: "-",
      dob: "-",
      submitTime: e.date,
      source: "NMIMS"
    }))
  ];

  formattedLeads.sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime));

  return {
    props: {
      leads: JSON.parse(JSON.stringify(formattedLeads))
    }
  };
}

export default function LeadManagement({ leads }) {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setData(leads);
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="container mx-auto">
        <h1 className="mt-8 text-3xl font-semibold lg:text-4xl lg:mt-12 mx-auto" style={{ color: "#4f46e5" }}>
          All Leads
        </h1>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:mt-6">
          <thead style={{ backgroundColor: "#4f46e5" }} className="text-xs text-white uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Date Of Birth</th>
              <th className="px-6 py-3">State</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Source</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">Submit Time</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {data.map((e, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <td className="px-6 py-4">{e.name}</td>
                <td className="px-6 py-4">{e.email}</td>
                <td className="px-6 py-4">{e.phone}</td>
                <td className="px-6 py-4">{e.dob}</td>
                <td className="px-6 py-4">{e.state}</td>
                <td className="px-6 py-4">{e.course}</td>
                <td className="px-6 py-4">{e.source}</td>
                <td className="px-6 py-4">{e.gender}</td>
                <td className="px-6 py-4">
                  {new Date(e.submitTime).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
