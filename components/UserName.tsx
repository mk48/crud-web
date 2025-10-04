import useUser from "@/hooks/use-user";
import Link from "next/link";
import { CircleDot, CircleX } from "lucide-react";

interface props {
  userId: string;
}

const UserName: React.FC<props> = ({ userId }) => {
  const { data, isLoading, isError } = useUser(userId);

  //----------------- Render
  if (isLoading) {
    return <CircleDot size="0.9rem" className="animate-bounce" />;
  }

  if (isError) {
    return <CircleX size="0.9rem" />;
  }

  return (
    <Link className="hover:underline" href={`/user/${userId}`}>
      {data?.email}
    </Link>
  );
};

export default UserName;
