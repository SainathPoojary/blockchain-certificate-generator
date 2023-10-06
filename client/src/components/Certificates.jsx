import React from "react";
import { useUserContext } from "../context/UserContext";

export default function Certificates() {
  const { user } = useUserContext();

  const getDateString = (date) => {
    const newDate = new Date(date);
    if (isNaN(newDate)) {
      // if date is in milliseconds, convert to number
      const milliseconds = parseInt(date);
      return;
    }
    return newDate.toLocaleDateString();
  };

  return (
    <div className="flex-[4] relative w-full p-10 overflow-x-auto bg-gray-900">
      <table className="w-full text-sm text-left text-primary dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Course
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {user.certificates &&
            user.certificates.map((certificate) => (
              <tr
                key={certificate._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {certificate.name}
                </th>
                <td className="px-6 py-4">{certificate.email}</td>
                <td className="px-6 py-4">{certificate.course}</td>
                <td className="px-6 py-4">
                  {new Date(parseInt(certificate.date)).toLocaleDateString()}
                </td>
                <td className="px-1 py-4">
                  <a
                    href={`http://localhost:4000/uploads/${certificate.url}`}
                    target="_blank"
                    className="bg-secondary px-6 py-2 text-white rounded-xl"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
