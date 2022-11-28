import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface IStyledButtonProps {
	themeColor?: string;
	onClick?: () => void;
	disabled?: Boolean;
	hasArrow?: Boolean;
	btnName: string;
	btnNameColor?: string;
}

const StyledButton = ({
	themeColor = "#5538EE",
	onClick,
	disabled,
	hasArrow,
	btnName,
	btnNameColor = "white",
}: IStyledButtonProps) => {
	const ArrorBox = () => {
		if (hasArrow) {
			return (
				<Box position={"absolute"} right={5}>
					<AiOutlineArrowRight width={24} height={24} />
				</Box>
			);
		} else {
			return null;
		}
	};

	return (
		<Button
			bgColor={themeColor}
			color={btnNameColor}
			width={327}
			borderRadius={48}
			position={"relative"}
			height={"48px"}
			onClick={onClick}
			isDisabled={disabled ? true : undefined}
			_disabled={{
				backgroundColor: "#DEE1E1",
			}}
			cursor={"pointer"}
		>
			{btnName}
			<ArrorBox />
		</Button>
	);
};

export default StyledButton;
