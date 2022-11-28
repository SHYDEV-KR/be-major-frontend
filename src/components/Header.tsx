import { Heading, HStack, VStack, Box, Link } from "@chakra-ui/layout";
import { Children, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { AiOutlineMenu } from "react-icons/ai";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";

interface HeaderProps {
	onOpen: () => void;
}

const Header = ({ onOpen }: HeaderProps) => {
	return (
		<HStack
			position={"fixed"}
			top={0}
			left={0}
			right={0}
			bgColor={"white"}
			zIndex={999}
		>
			<HStack
				my={"10px"}
				mx={6}
				position={"relative"}
				justifyContent={"center"}
				width={"100%"}
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
							src={"/logo.png"}
							borderRadius={"50%"}
							width={"28px"}
							height={"28px"}
						></Image>
					</Link>
				</HStack>
			</HStack>
		</HStack>
	);
};

export default Header;
