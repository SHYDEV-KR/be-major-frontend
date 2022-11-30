import { Card, CardHeader, CardBody, CardFooter, Tag } from "@chakra-ui/react";
import { Heading, HStack, Link, Stack, Text } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import { IMoimCardNoImageProps } from "../types";

export const MoimCardNoImage = ({
	id,
	hasLeader,
	title,
	moimTypes,
	topics,
	current,
	expirationDate,
	min,
	isClosed,
	hasApplied,
	isCrew,
	isLeader,
	isOwner,
	typeOfPage,
}: IMoimCardNoImageProps) => {
	const remainDays = Math.ceil(
		(new Date(expirationDate).getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24)
	);

	const ProceedTag = () =>
		isClosed ? (
			<Tag color={"#198155"} bg={"#ECFCE5"} borderRadius={100}>
				진행 확정
			</Tag>
		) : null;

	const LeaderFailedOrSuccessTag = () => {
		if (hasApplied) {
			if (isLeader) {
				return (
					<Tag color={"#0065D0"} bg={"#C9F0FF"} borderRadius={100}>
						리더로 선발됨
					</Tag>
				);
			} else if (hasLeader && !isLeader) {
				return (
					<Tag color={"#D3180C"} bg={"#FFE5E5"} borderRadius={100}>
						리더로 선발되지 않음
					</Tag>
				);
			}
			return null;
		}
		return null;
	};

	const LeaderSetTag = () =>
		!hasLeader ? (
			<Tag color={"#A05E03"} bg={"#FFEFD7"} borderRadius={100}>
				리더 선정 필요
			</Tag>
		) : (
			<Tag color={"#198155"} bg={"#ECFCE5"} borderRadius={100}>
				리더 선정됨
			</Tag>
		);

	const MoimClosedTag = () =>
		isOwner ? (
			!isClosed ? (
				<Tag color={"#A05E03"} bg={"#FFEFD7"} borderRadius={100}>
					진행 확정 필요
				</Tag>
			) : (
				<Tag color={"#198155"} bg={"#ECFCE5"} borderRadius={100}>
					진행 확정됨
				</Tag>
			)
		) : null;

	return (
		<Link
			as={RouterLink}
			to={`/moims/${id}`}
			_hover={{ textDecoration: "none" }}
			minW={"100%"}
		>
			<Card
				minW="xs"
				maxW="sm"
				maxH={"fit-content"}
				borderRadius={15}
				bg={"#F9F9FA"}
			>
				<CardBody paddingTop={3}>
					<Stack spacing="3">
						{hasLeader ? (
							<>
								<Heading size="sm" mt={3} lineHeight={"-moz-initial"}>
									{title}
									{typeOfPage === "crew" ? (
										<>
											<ProceedTag />
										</>
									) : typeOfPage === "leader" ? (
										<>
											<LeaderFailedOrSuccessTag />
											<ProceedTag />
										</>
									) : typeOfPage === "owner" ? (
										<>
											<LeaderSetTag />
											<MoimClosedTag />
										</>
									) : null}
								</Heading>
							</>
						) : (
							<>
								<Heading size="sm" lineHeight={"-moz-initial"}>
									<Text fontSize={"xs"} color={"#6B4EFF"}>
										리더 모집 중
									</Text>
									{title} <MoimClosedTag />
								</Heading>
							</>
						)}
						<HStack>
							{moimTypes.map((moimType, key) => (
								<Tag
									key={key}
									borderRadius={100}
									fontSize={"xs"}
									bg={"#6B4EFF"}
									color={"white"}
								>
									#{moimType}
								</Tag>
							))}
							{topics.map((topic, key) => (
								<Tag fontSize={"xs"} key={key} borderRadius={100}>
									#{topic}
								</Tag>
							))}
						</HStack>
						<Text fontSize={"xs"} color={"#6B4EFF"}>
							{Math.round((current / min) * 100)}% 펀딩 완료(
							{remainDays}일 남음)
						</Text>
					</Stack>
				</CardBody>
			</Card>
		</Link>
	);
};
