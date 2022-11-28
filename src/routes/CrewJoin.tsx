import {
	FormControl,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect } from "react";
import StyledButton from "../components/StyledButton";

export const CrewJoinCreate = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<VStack spacing={3}>
			<Heading size={"md"}>모임 신청서 작성하기</Heading>
			<FormControl>
				<FormLabel>하고 싶은 말</FormLabel>
				<Textarea placeholder={"하고 싶은 말"} />
				<FormHelperText>
					어떤 동기에서 모임을 신청하는지 작성해주세요.
				</FormHelperText>
			</FormControl>
			<hr />
			<StyledButton btnName={"신청하기"} />
		</VStack>
	);
};

export const CrewJoinEdit = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<VStack spacing={3}>
			<Heading size={"md"}>모임 신청서 수정하기</Heading>
			<FormControl>
				<FormLabel>하고 싶은 말</FormLabel>
				<Textarea placeholder={"하고 싶은 말"} />
				<FormHelperText>
					어떤 동기에서 모임을 신청하는지 작성해주세요.
				</FormHelperText>
			</FormControl>
			<hr />
			<StyledButton btnName={"저장하기"} />
			<StyledButton
				btnName={"신청 취소하기"}
				themeColor={"#E3E5E5"}
				btnNameColor={"red"}
			/>
		</VStack>
	);
};
