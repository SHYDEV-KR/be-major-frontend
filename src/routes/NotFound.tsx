import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import StyledButton from "../components/StyledButton";

export default function NotFound() {
	return (
		<VStack
			bg="gray.100"
			justifyContent={"center"}
			minH="100vh"
			bgColor={"#B5B6B6"}
		>
			<VStack spacing={6} bg={"white"} px={3} py={6} borderRadius={16}>
				<Heading>Page not found.</Heading>
				<Text color={"#72777A"} pb={3}>
					Except for your career :)
				</Text>
				<RouterLink to="/">
					<StyledButton btnName={"홈으로 가기"} />
				</RouterLink>
			</VStack>
		</VStack>
	);
}
