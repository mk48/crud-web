import { Column } from "@tanstack/react-table";
import { ArrowUpDown, MoveUp, MoveDown } from "lucide-react";
import { Button } from "./ui/button";

interface props {
  children: React.ReactNode;
  column: Column<any, any>;
}

const ToggleSortColumnHeader: React.FC<props> = ({
  column,
  children,
}) => {
  const sortIcon = column.getIsSorted() ? (
    column.getIsSorted() === "asc" ? (
      <MoveDown className="ml-2 flex-none size-4" />
    ) : (
      <MoveUp className="ml-2 flex-none size-4" />
    )
  ) : (
    <ArrowUpDown className="ml-2 flex-none size-4" />
  );

  return (
    <div
      className="flex items-center cursor-pointer whitespace-normal break-words p-2 hover:bg-gray-100"
      //variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
        {children}
        {sortIcon}
    </div>
  );
};

export default ToggleSortColumnHeader;
