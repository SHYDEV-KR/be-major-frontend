import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../lib/useUserProfile";

interface IUnprotectedPageProps {
	children: React.ReactNode;
}
export default function UnprotectedPage({ children }: IUnprotectedPageProps) {
	const { isLoggedIn, userLoading } = useUserProfile();
	const navigate = useNavigate();
	useEffect(() => {
		if (!userLoading) {
			if (isLoggedIn) {
				navigate("/");
			}
		}
	}, [userLoading, isLoggedIn, navigate]);
	return <>{children}</>;
}
