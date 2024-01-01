import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const categories = [
  { id: 1, type: "Music" },
  { id: 2, type: "Arts" },
  { id: 3, type: "Comedy" },
  { id: 4, type: "Fiction" },
  { id: 5, type: "Health" },
  { id: 6, type: "Business" },
];

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <Link
        to={`/create/?category=${category || ""}`}
        className="block mx-auto my-5 px-6 py-3 bg-blue-500 text-white rounded-md text-center"
      >
        Create Podcast
      </Link>

      <table className="w-full rounded-md border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-3">
              <Link
                to="/"
                className={`text-blue-500 ${
                  !category ? "font-semibold" : ""
                } hover:underline`}
              >
                All Categories
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categoryItem) => (
            <tr key={categoryItem.id}>
              <td colSpan="2">
                <Link
                  to={`/?category=${categoryItem.type}`}
                  className="w-full block"
                >
                  <div
                    className={`border p-3 pl-10 m-2 ${
                      category === categoryItem.type
                        ? "bg-blue-500"
                        : "selection:bg-blue-500"
                    } ${
                      category === categoryItem.type ? "" : "hover:bg-slate-200"
                    }`}
                  >
                    <span
                      className={`text-${
                        category === categoryItem.type ? "white" : "blue-500"
                      } `}
                    >
                      {categoryItem.type}
                    </span>
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Categories;
