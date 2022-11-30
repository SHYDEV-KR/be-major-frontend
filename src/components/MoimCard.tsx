import { Card, CardHeader, CardBody, CardFooter, Tag } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { Heading, HStack, Link, Stack, Text } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import { IMoimCardProps } from "../types";

export const MoimCard = ({
	id,
	hasLeader,
	title,
	moimTypes,
	topics,
	current,
	min,
	expirationDate,
}: IMoimCardProps) => {
	const remainDays = Math.ceil(
		(new Date(expirationDate).getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24)
	);

	return (
		<Link
			as={RouterLink}
			to={`/moims/${id}`}
			_hover={{ textDecoration: "none" }}
		>
			<Card
				minW="xs"
				maxW="sm"
				maxH={"fit-content"}
				borderRadius={15}
				bg={"#F9F9FA"}
			>
				<Image
					src={`/img/moim_thumbnails/${topics[0]}.png`}
					alt={`${topics[0]}`}
					borderRadius={15}
					boxSize={"sm"}
					maxH={48}
				/>
				<CardBody paddingTop={"16px"}>
					<Stack spacing="3">
						{hasLeader ? (
							<>
								<Heading size="sm" mt={"16px"} noOfLines={1}>
									{title}
								</Heading>
							</>
						) : (
							<>
								<Heading size="sm">
									<Text fontSize={"sm"} color={"#6B4EFF"}>
										리더 모집 중
									</Text>
									{title}
								</Heading>
							</>
						)}
						<HStack>
							{moimTypes.map((moimType, key) => (
								<Tag
									borderRadius={100}
									fontSize={"xs"}
									key={key}
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
						<Text fontSize={"sm"} color={"#6B4EFF"}>
							{Math.round((current / min) * 100)}% 펀딩 완료(
							{remainDays}일 남음)
						</Text>
					</Stack>
				</CardBody>
			</Card>
		</Link>
	);
};
