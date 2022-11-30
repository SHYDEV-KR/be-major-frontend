import {
	Stack,
	Box,
	Divider,
	VStack,
	Link,
	Text,
	Heading,
} from "@chakra-ui/layout";
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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useUserProfile from "../lib/useUserProfile";
import { Button } from "@chakra-ui/button";
import { signout } from "../api";
import { Image } from "@chakra-ui/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function Root() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user, userLoading, isLoggedIn } = useUserProfile();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return (
		<Stack>
			<Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"xs"}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton p={3} />
					<DrawerHeader>메뉴</DrawerHeader>
					<DrawerBody>
						{isLoggedIn ? (
							<VStack>
								<Link as={RouterLink} to="/my-profile" onClick={onClose}>
									<Image
										src={user?.avatar}
										borderRadius={"50%"}
										width={"56px"}
										height={"56px"}
										border={"1px solid #DCDCDC"}
									/>
									<Box width={"100%"}>내 프로필</Box>
								</Link>
								<VStack w={"100%"} pt={6}>
									<Heading
										alignSelf={"flex-start"}
										size={"md"}
										w={"100%"}
										py={1}
										_hover={{ bg: "#DCDCDC" }}
										onClick={() => {
											navigate("/my-profile/moims/crew");
										}}
									>
										크루로 참여한 모임
									</Heading>
									<Heading
										alignSelf={"flex-start"}
										size={"md"}
										w={"100%"}
										py={1}
										_hover={{ bg: "#DCDCDC" }}
										onClick={() => {
											onClose();
											navigate("/my-profile/moims/leader");
										}}
									>
										리더로 지원한 모임
									</Heading>
									<Heading
										alignSelf={"flex-start"}
										size={"md"}
										w={"100%"}
										py={1}
										_hover={{ bg: "#DCDCDC" }}
										onClick={() => {
											onClose();
											navigate("/my-profile/moims/owner");
										}}
									>
										내가 생성한 모임
									</Heading>
								</VStack>
								<Box py={4} w={"100%"}>
									<Divider />
								</Box>
								<Text
									as={Button}
									variant={"link"}
									onClick={async () => {
										await signout();
										queryClient.refetchQueries(["users", "my-profile"]);
										onClose();
										navigate("/");
									}}
									alignSelf={"flex-start"}
									w={"100%"}
									py={1}
									borderRadius={150}
								>
									로그아웃
								</Text>
							</VStack>
						) : (
							<VStack w={"100%"} pt={6}>
								<Heading
									alignSelf={"flex-start"}
									size={"md"}
									w={"100%"}
									py={1}
									_hover={{ bg: "#DCDCDC" }}
									onClick={() => {
										onClose();
										navigate("/signin");
									}}
								>
									로그인
								</Heading>
								<Heading
									alignSelf={"flex-start"}
									size={"md"}
									w={"100%"}
									py={1}
									_hover={{ bg: "#DCDCDC" }}
									onClick={() => {
										onClose();
										navigate("/signup");
									}}
								>
									회원가입
								</Heading>
							</VStack>
						)}
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
