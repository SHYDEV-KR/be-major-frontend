import { Heading, Highlight, Link, Stack, VStack } from "@chakra-ui/layout";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import StyledButton from "../components/StyledButton";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useState } from "react";

export const Signup = () => {
	const [step, setStep] = useState(1);

	const prevStep = () => {
		setStep((prev) => prev - 1);
	};

	const nextStep = () => {
		setStep((prev) => prev + 1);
	};

	const SignupStep1 = () => {
		return (
			<VStack spacing={3}>
				<Heading size={"md"}>가입하기</Heading>
				<FormControl>
					<FormLabel>유저명</FormLabel>
					<Input type="text" placeholder={"유저명"} />
					<FormHelperText>공백과 특수기호는 입력할 수 없습니다.</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>비밀번호</FormLabel>
					<Input type="password" placeholder={"비밀번호"} />
					<FormHelperText>
						영문, 숫자 포함 8자리 이상 입력해주세요.
					</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>비밀번호 확인</FormLabel>
					<Input type="password" placeholder={"비밀번호 확인"} />
					<FormHelperText>비밀번호를 한 번 더 입력해주세요.</FormHelperText>
				</FormControl>
				<hr />
				<Link
					alignSelf={"flex-start"}
					color={"gray.400"}
					fontSize={"sm"}
					as={RouterLink}
					to={"/signin"}
				>
					<Highlight query={"로그인"} styles={{ color: "#8400FF" }}>
						이미 계정이 있으신가요? 로그인
					</Highlight>
				</Link>
				<StyledButton btnName={"인증하기"} onClick={nextStep} hasArrow={true} />
			</VStack>
		);
	};

	const SignupStep2 = () => {
		return (
			<VStack spacing={3}>
				<Heading size={"md"}>인증하기</Heading>
				<FormControl>
					<FormLabel>휴대폰 번호</FormLabel>
					<Input type="text" placeholder={"01012345678"} />
					<FormHelperText>"-"없이 입력해주세요.</FormHelperText>
				</FormControl>
				<StyledButton disabled={true} btnName={"인증번호 전송"} />
				<FormControl>
					<FormLabel>인증번호</FormLabel>
					<Input type="number" placeholder={"인증번호"} />
					<FormHelperText>
						문자로 발송된 인증번호 4자리를 입력해주세요.
					</FormHelperText>
				</FormControl>
				<hr />
				<Link
					alignSelf={"flex-start"}
					color={"gray.400"}
					fontSize={"sm"}
					as={RouterLink}
					to={"/signin"}
				>
					이미 계정이 있으신가요? <Link color={"#8400FF"}>로그인 &rarr;</Link>
				</Link>
				<Link
					alignSelf={"flex-start"}
					color={"gray.400"}
					fontSize={"sm"}
					onClick={prevStep}
				>
					정보를 잘못 입력하셨나요?
					<Link color={"#8400FF"}> 가입 정보 수정</Link>
				</Link>
				<StyledButton btnName={"회원가입"} hasArrow={true} onClick={() => {}} />
			</VStack>
		);
	};

	switch (step) {
		case 1:
			return <SignupStep1 />;
		case 2:
			return <SignupStep2 />;
		default:
			return null;
	}
};
