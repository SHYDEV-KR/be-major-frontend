import { Image } from "@chakra-ui/image";
import { VStack } from "@chakra-ui/layout";

export const LoadingPage = () => (
	<VStack maxW={"100vw"} minH={"70vh"} justifyContent={"center"}>
		<Image src={"/loading.png"} maxH={"50px"} />
	</VStack>
);
