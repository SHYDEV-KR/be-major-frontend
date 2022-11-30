import { Card, CardHeader, CardBody, Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { Heading, HStack, Link, Stack, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { Url } from "url";

interface IPortfolioCardProps {
	id: number;
	title: string;
	description: string;
	url: string;
	viewOnly?: boolean;
}

export const PortfolioCard = ({
	id,
	title,
	description,
	url,
	viewOnly = false,
}: IPortfolioCardProps) => {
	const navigate = useNavigate();
	return (
		<Card
			w="100%"
			minH={"100px"}
			maxH={"max-content"}
			borderRadius={15}
			bg={"#E7E7FF"}
			pb={3}
		>
			<CardHeader pb={2}>
				{!viewOnly ? (
					<Button
						bg={"#6B4EFF"}
						color={"white"}
						borderRadius={150}
						size={"xs"}
						px={4}
						position={"absolute"}
						right={4}
						top={4}
						onClick={() => navigate(`/portfolios/${id}/edit`)}
					>
						수정
					</Button>
				) : null}
				<Heading size={"sm"} noOfLines={1} me={12}>
					{title}
				</Heading>
				<Link
					py={1}
					fontSize={"xs"}
					href={url}
					noOfLines={1}
					color={"purple.500"}
				>
					{url}
				</Link>
			</CardHeader>
			<CardBody pt={1} minH="64px" maxH={"64px"} overflowY={"scroll"}>
				<Text fontSize={"xs"} color={"gray.500"}>
					{description}
				</Text>
			</CardBody>
		</Card>
	);
};
