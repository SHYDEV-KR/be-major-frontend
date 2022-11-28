import {
	FormControl,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect } from "react";
import { Outlet } from "react-router";
import StyledButton from "../components/StyledButton";

export const PortfolioRoot = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<Outlet />
		</>
	);
};

export const PortfolioCreate = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<VStack spacing={3}>
			<Heading size={"md"}>포트폴리오 추가하기</Heading>
			<FormControl>
				<FormLabel>제목</FormLabel>
				<Input type="text" placeholder={"포트폴리오 제목"} />
				<FormHelperText>
					포트폴리오를 대표하는 제목을 설정해주세요.
				</FormHelperText>
			</FormControl>
			<FormControl>
				<FormLabel>설명</FormLabel>
				<Textarea placeholder={"포트폴리오 설명"} />
				<FormHelperText>포트폴리오에 대해서 설명해주세요.</FormHelperText>
			</FormControl>
			<FormControl>
				<FormLabel>URL</FormLabel>
				<Input type="url" placeholder={"https://example.com"} />
				<FormHelperText>포트폴리오 URL을 첨부해주세요.</FormHelperText>
			</FormControl>
			<hr />
			<StyledButton btnName={"추가"} />
		</VStack>
	);
};

export const PortfolioEdit = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<VStack spacing={3}>
			<Heading size={"md"}>포트폴리오 수정하기</Heading>
			<FormControl>
				<FormLabel>제목</FormLabel>
				<Input type="text" placeholder={"포트폴리오 제목"} />
				<FormHelperText>
					포트폴리오를 대표하는 제목을 설정해주세요.
				</FormHelperText>
			</FormControl>
			<FormControl>
				<FormLabel>설명</FormLabel>
				<Textarea placeholder={"포트폴리오 설명"} />
				<FormHelperText>포트폴리오에 대해서 설명해주세요.</FormHelperText>
			</FormControl>
			<FormControl>
				<FormLabel>URL</FormLabel>
				<Input type="url" placeholder={"https://example.com"} />
				<FormHelperText>포트폴리오 URL을 첨부해주세요.</FormHelperText>
			</FormControl>
			<hr />
			<StyledButton btnName={"수정"} />
			<StyledButton
				btnName={"포트폴리오 삭제하기"}
				themeColor={"#E3E5E5"}
				btnNameColor={"red"}
			/>
		</VStack>
	);
};
