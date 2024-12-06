import { Link } from "react-router-dom";

export default function ListItem() {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">1</td>
      <td className="p-2 truncate indent-4">
        <Link to="/info/1" className="cursor-pointer">
          좋은 소식이 있습니다.
        </Link>
      </td>
      <td className="p-2 text-center truncate">제이지</td>
      <td className="p-2 text-center hidden sm:table-cell">22</td>
      <td className="p-2 text-center hidden sm:table-cell">5</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        2024.07.03 17:59:13
      </td>
    </tr>
  );
}
