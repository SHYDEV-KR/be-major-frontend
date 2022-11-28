import { Stack, Box, Divider, VStack, Link } from "@chakra-ui/layout";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import Header from "./Header";
import { useDisclosure } from "@chakra-ui/hooks";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/modal";
import { Link as RouterLink } from "react-router-dom";

export default function Root() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Stack>
			<Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"xs"}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton p={3} />
					<DrawerHeader>메뉴</DrawerHeader>
					<DrawerBody>
						<VStack>
							<Link as={RouterLink} to="/signin" onClick={onClose}>
								<Box width={"100%"}>로그인</Box>
							</Link>
							<Link as={RouterLink} to="/signup" onClick={onClose}>
								<Box width={"100%"}>회원가입</Box>
							</Link>
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<Header onOpen={onOpen} />
			<Box
				px={6}
				pt={"50px"}
				maxW={"960px !important"}
				mx="auto !important"
				minH={"calc(100vh + 75px)"}
			>
				<Outlet />
			</Box>
			<Divider />
			<Footer />
		</Stack>
	);
}
