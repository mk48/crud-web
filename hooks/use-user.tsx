import { UserModel } from "@/components/project/types";
import { MINUTE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export default function useUser(userId: string) {
  //------------------------- Query: get one user -----------------------------------
  const result = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      // TODO: call API and get user data
      return {
        userId: userId,
        email: "kumaran.veera@outlook.com",
        name: "M.Kumaran",
      } as UserModel;
    },
    staleTime: 10 * MINUTE,
  });

  return result;
}
