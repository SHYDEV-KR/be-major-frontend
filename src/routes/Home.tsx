import { Grid, Heading, HStack, Link, VStack } from "@chakra-ui/layout";
import { MoimCard } from "../components/MoimCard";
import StyledButton from "../components/StyledButton";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import { SubHeader } from "../components/SubHeader";
import { useEffect } from "react";

export default function Home() {
	const gridColumnSystem = {
		sm: "repeat(1, 1fr)",
		md: "repeat(2, 1fr)",
		lg: "1fr 2fr 1fr",
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const moims = [
		{
			id: 1,
			title: "배민 3년차 PM과 함께 실무능력 A to Z",
			hasLeader: true,
			moimTypes: ["커피챗"],
			topics: ["서비스 기획", "실무스킬"],
			min: 6,
			current: 2,
			expirationDate: "2023-01-01",
		},
		{
			id: 2,
			title: "같이 개발 스터디합시다.",
			hasLeader: false,
			moimTypes: ["스터디"],
			topics: ["개발", "백엔드"],
			min: 2,
			current: 2,
			expirationDate: "2022-12-29",
		},
		{
			id: 3,
			title: "같이 개발자랑 커피챗하실분?",
			hasLeader: false,
			moimTypes: ["커피챗"],
			topics: ["개발", "백엔드"],
			min: 4,
			current: 1,
			expirationDate: "2022-11-29",
		},
		{
			id: 4,
			title: "같이 개발자랑 커피챗하실분?",
			hasLeader: false,
			moimTypes: ["커피챗"],
			topics: ["개발", "백엔드"],
			min: 4,
			current: 1,
			expirationDate: "2022-11-29",
		},
	];

	return (
		<VStack position={"relative"}>
			<SubHeader
				to={"/moims/create"}
				btnName={"모임 생성하기"}
				headerTitle={"홈"}
				hasBtn={true}
			/>
			<Grid templateColumns={gridColumnSystem} gap={6} pt={12}>
				{moims.map((moim) => (
					<MoimCard
						id={moim.id}
						key={moim.id}
						title={moim.title}
						hasLeader={moim.hasLeader}
						moimTypes={moim.moimTypes}
						topics={moim.topics}
						current={moim.current}
						min={moim.min}
						expirationDate={moim.expirationDate}
					/>
				))}
			</Grid>
		</VStack>
	);
}
