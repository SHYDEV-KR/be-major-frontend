import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../lib/useUserProfile";

interface IProtectedPageProps {
	children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
	const { isLoggedIn, userLoading } = useUserProfile();
	const navigate = useNavigate();
	useEffect(() => {
		if (!userLoading) {
			if (!isLoggedIn) {
				navigate("/signin");
			}
		}
	}, [userLoading, isLoggedIn, navigate]);
	return <>{children}</>;
}
