import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";

export const Footer = () => {
	return (
		<VStack spacing={0} alignItems={"flex-start"} p={6}>
			<Heading size={"sm"}>BE_MAJOR</Heading>
			<Text color={"#72777A"} fontSize={"xs"}>
				Copyright © 2022 glassbreaker.
			</Text>
			<Text color={"#72777A"} fontSize={"xs"}>
				All rights reserved.
			</Text>
		</VStack>
	);
};
