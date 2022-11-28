import { Card, CardHeader, CardBody, CardFooter, Tag } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { Heading, HStack, Link, Stack, Text } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";

interface IMoimCardProps {
	id: number;
	hasLeader: Boolean;
	title: string;
	moimTypes: string[];
	topics: string[];
	leader?: {};
	current: number;
	min: number;
	expirationDate: string;
}

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
					src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
					alt="Green double couch with wooden legs"
					borderRadius={15}
					boxSize={"sm"}
					maxH={48}
				/>
				<CardBody paddingTop={"16px"}>
					<Stack spacing="3">
						{hasLeader ? (
							<>
								<Heading size="sm" mt={"16px"}>
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
