import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const categories = [
  { id: 1, type: "Music" },
  { id: 2, type: "Movies" },
  { id: 3, type: "Sports" },
  { id: 4, type: "Tech" },
];
const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');


  return (
    <>
      <Link to={`/create/?category=${category || ''}`} className="block mx-auto my-5 px-6 py-3 bg-blue-500 text-white rounded-md text-center">
        Create Podcast
      </Link>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-3">
              <Link to="/" className="text-blue-500 hover:underline">
                All Categories
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td className="border p-3">
                <Link to={`/?category=${category.type}`} className="text-blue-500 hover:underline">
                  {category.type}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Categories;