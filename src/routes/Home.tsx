import { Grid, Heading, HStack, Link, VStack } from "@chakra-ui/layout";
import { MoimCard } from "../components/MoimCard";
import StyledButton from "../components/StyledButton";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { SubHeader } from "../components/SubHeader";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "../api";
import { LoadingPage } from "../components/LoadingPage";
import { Imoim } from "../types";

export default function Home() {
	const gridColumnSystem = {
		sm: "repeat(1, 1fr)",
		md: "repeat(2, 1fr)",
		lg: "1fr 2fr 1fr",
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { isLoading, data } = useQuery<Imoim[]>(["moims"], getHome);

	if (isLoading) {
		return <LoadingPage />;
	} else {
		return (
			<VStack position={"relative"}>
				<SubHeader
					to={"/moims/create"}
					btnName={"모임 생성하기"}
					headerTitle={"홈"}
					hasBtn={true}
				/>
				<Grid templateColumns={gridColumnSystem} gap={6} pt={12}>
					{data?.map((moim) => {
						return (
							<MoimCard
								id={moim.id}
								key={moim.id}
								title={moim.title}
								hasLeader={moim.has_leader}
								moimTypes={moim.moim_types}
								topics={moim.topics}
								current={moim.current_number_of_participants}
								min={moim.min_participants}
								expirationDate={moim.expiration_date}
							/>
						);
					})}
					{data?.length === 0 ? (
						<VStack>
							<Heading fontSize={"2xl"}>모임이 없습니다.</Heading>
							<Heading fontSize={"lg"}>모임을 만들어보세요!</Heading>
						</VStack>
					) : null}
				</Grid>
			</VStack>
		);
	}
}
