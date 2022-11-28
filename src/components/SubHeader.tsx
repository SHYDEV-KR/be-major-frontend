import { Button } from "@chakra-ui/button";
import { Heading, HStack, Link } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";

interface ISubHeaderProps {
	btnName?: string;
	hasBtn?: boolean;
	to?: string;
	headerTitle: string;
	onClick?: () => void;
	btnBg?: string;
	btnTextcolor?: string;
}

export const SubHeader = ({
	headerTitle,
	to = "",
	btnName,
	hasBtn,
	onClick,
	btnBg = "#5538EE",
	btnTextcolor = "white",
}: ISubHeaderProps) => {
	if (hasBtn) {
		return (
			<HStack
				position={"fixed"}
				zIndex={"999"}
				bg={"white"}
				h={12}
				justifyContent={"center"}
				alignItems={"center"}
				w={"100%"}
				px={6}
			>
				<Heading size={"lg"}>{headerTitle}</Heading>
				<Link
					as={RouterLink}
					to={to}
					position={"absolute"}
					px={6}
					right={[6, 35, 75, 140, 200]}
					_hover={{ textDecoration: "none" }}
				>
					<Button
						size={"xs"}
						bg={btnBg}
						color={btnTextcolor}
						borderRadius={12}
						px={3}
					>
						{btnName}
					</Button>
				</Link>
			</HStack>
		);
	} else {
		return (
			<HStack
				position={"fixed"}
				zIndex={"999"}
				bg={"white"}
				h={12}
				justifyContent={"center"}
				alignItems={"center"}
				w={"100%"}
				px={6}
				mx="auto !important"
			>
				<Heading size={"lg"}>{headerTitle}</Heading>
			</HStack>
		);
	}
};
