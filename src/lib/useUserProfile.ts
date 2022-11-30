import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api";

export default function useUserProfile() {
	const { isLoading, data, isError } = useQuery({
		queryKey: ["users", "my-profile"],
		queryFn: getMyProfile,
		retry: false,
	});

	return {
		userLoading: isLoading,
		user: data,
		isLoggedIn: !isError,
	};
}
