import { Heading, HStack, VStack, Box, Link } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import useUserProfile from "../lib/useUserProfile";

interface HeaderProps {
	onOpen: () => void;
}

const Header = ({ onOpen }: HeaderProps) => {
	const { userLoading, isLoggedIn, user } = useUserProfile();

	if (!userLoading) {
		return (
			<HStack
				position={"fixed"}
				top={0}
				left={0}
				right={0}
				bgColor={"white"}
				zIndex={999}
				width={"100vw"}
			>
				<HStack
					my={"10px"}
					ml={6}
					mr={
						document.documentElement.clientWidth === window.innerWidth ? 6 : 9
					}
					position={"relative"}
					justifyContent={"center"}
					width={"100vw"}
				>
					<IconButton
						aria-label="Menu"
						icon={<AiOutlineMenu />}
						size={"lg"}
						variant={"ghost"}
						onClick={onOpen}
						position={"absolute"}
						left={0}
					/>
					<Link as={RouterLink} to="/">
						<Image src={"/be_major_logo.png"} maxH={10}></Image>
					</Link>
					<HStack position={"absolute"} right={0}>
						<Link as={RouterLink} to="/my-profile">
							<Image
								src={
									isLoggedIn
										? user?.avatar !== ""
											? user?.avatar
											: "/logo.png"
										: "/logo.png"
								}
								borderRadius={"50%"}
								width={"28px"}
								height={"28px"}
								border={"1px solid #DCDCDC"}
							/>
						</Link>
					</HStack>
				</HStack>
			</HStack>
		);
	}
};

export default Header;
