import {
	FormControl,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Highlight, Link, Text, VStack } from "@chakra-ui/layout";
import StyledButton from "../components/StyledButton";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";

export const Signin = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<VStack spacing={3}>
			<Heading size={"lg"}>로그인</Heading>
			<FormControl>
				<Input type="text" placeholder={"휴대폰 번호"} />
			</FormControl>
			<FormControl>
				<Input type="password" placeholder={"비밀번호"} />
			</FormControl>
			<Link
				alignSelf={"flex-start"}
				color={"gray.400"}
				fontSize={"sm"}
				as={RouterLink}
				to={"/reset-password"}
			>
				비밀번호를 잊으셨나요?
			</Link>
			<Link
				alignSelf={"flex-start"}
				color={"gray.400"}
				fontSize={"sm"}
				as={RouterLink}
				to={"/signup"}
			>
				<Highlight query={"회원가입"} styles={{ color: "#8400FF" }}>
					계정이 없으신가요? 회원가입
				</Highlight>
			</Link>
			<hr />
			<StyledButton btnName={"로그인"} hasArrow={true} />
		</VStack>
	);
};
