import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Link, Text, VStack } from "@chakra-ui/layout";
import { useEffect } from "react";
import StyledButton from "../components/StyledButton";

export const ResetPassword = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<VStack spacing={3} mt={"15vh"}>
			<Heading size={"lg"}>비밀번호 초기화</Heading>
			<Heading size={"sm"}>비밀번호를 초기화하시겠어요?</Heading>
			<Text>
				문자로 발송된 임시비밀번호를 확인해주세요. <br />이 작업은 되돌릴 수
				없어요.
			</Text>
			<FormControl>
				<Input type="text" placeholder={"휴대폰 번호"} />
			</FormControl>
			<hr />
			<StyledButton themeColor={"#EE3838"} btnName={"초기화"} hasArrow={true} />
		</VStack>
	);
};
