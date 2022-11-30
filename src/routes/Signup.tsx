import {
	Container,
	Heading,
	Highlight,
	Link,
	Stack,
	VStack,
} from "@chakra-ui/layout";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Button,
	useToast,
} from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import StyledButton from "../components/StyledButton";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import useUserProfile from "../lib/useUserProfile";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignUp, postSMSAuth, verifySMSAuthCode } from "../api";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

export const Signup = () => {
	const navigate = useNavigate();
	const { isLoggedIn, userLoading } = useUserProfile();

	interface IForm {
		username: string;
		phone_number: string;
		password: string;
		password_confirm: string;
		auth_code: string;
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		watch,
		setValue,
	} = useForm<IForm>();
	const queryClient = useQueryClient();
	const toast = useToast();

	const mutation = useMutation(postSignUp, {
		onSuccess: (data) => {
			toast({
				title: "회원가입 성공",
				status: "success",
			});
			navigate("/signin");
		},
		onError: (error) => {
			toast({
				title: "회원가입 실패",
				status: "error",
			});
		},
	});

	const onSubmit = ({ username, phone_number, password, auth_code }: IForm) => {
		mutation.mutate({
			username,
			phone_number,
			password,
			auth_code,
		});
	};

	const [phoneNumberAuthenticated, setPhoneNumberAuthenticated] =
		useState(false);

	const SMSAuthModalBtn = () => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const sendSMSMutation = useMutation(postSMSAuth, {
			onSuccess: (data) => {
				toast({
					title: "인증번호를 전송했습니다",
					status: "info",
				});
			},
			onError: (error) => {
				toast({
					title: "인증번호 전송실패",
					status: "error",
				});
			},
		});

		return (
			<>
				{phoneNumberAuthenticated ? (
					<Button isDisabled>인증완료</Button>
				) : (
					<Button
						onClick={() => {
							getValues("phone_number") &&
								sendSMSMutation.mutate(getValues("phone_number"));
							onOpen();
						}}
					>
						인증
					</Button>
				)}

				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent pb={3}>
						<ModalCloseButton />
						<ModalHeader>인증하기</ModalHeader>
						<ModalBody as={VStack} borderRadius={15} spacing={6}>
							<Container as={"form"}>
								<FormControl>
									<FormLabel>인증번호</FormLabel>
									<Input
										type="number"
										placeholder={"인증번호"}
										isInvalid={Boolean(errors.auth_code?.message)}
										{...register("auth_code", {
											required: "인증번호를 입력해주세요.",
										})}
									/>
									<FormHelperText>
										문자로 발송된 인증번호 4자리를 입력해주세요.
									</FormHelperText>
								</FormControl>
							</Container>
							<StyledButton
								btnName={"인증하기"}
								type={"submit"}
								onClick={() => {
									const send = async () => {
										const resp = await verifySMSAuthCode(
											getValues("phone_number"),
											getValues("auth_code")
										);
										if (resp === "error") {
											toast({
												title: "인증실패 : 올바른 인증번호를 입력하세요",
												status: "error",
											});
											setValue("auth_code", "");
										}
										if (resp.message === "phone number authenticated") {
											setPhoneNumberAuthenticated(true);
											onClose();
										}
									};
									send();
								}}
							/>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		);
	};

	if (!userLoading) {
		if (isLoggedIn) navigate("/");
		else
			return (
				<VStack spacing={3}>
					<Heading size={"lg"}>가입하기</Heading>
					<FormControl>
						<FormLabel>유저명</FormLabel>
						<Input
							type="text"
							placeholder={"유저명"}
							isInvalid={Boolean(errors.username?.message)}
							{...register("username", {
								required: "유저명을 입력해주세요.",
							})}
						/>
						<FormHelperText>
							공백과 특수기호는 입력할 수 없습니다.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>휴대폰 번호</FormLabel>
						<InputGroup>
							<Input
								type="text"
								placeholder={"01012345678"}
								isInvalid={Boolean(errors.phone_number?.message)}
								{...register("phone_number", {
									required: "휴대폰 번호를 입력해주세요.",
								})}
								isDisabled={phoneNumberAuthenticated}
							/>
							<InputRightElement
								w={"fit-content"}
								children={<SMSAuthModalBtn />}
							/>
						</InputGroup>
						<FormHelperText>"-"없이 입력해주세요.</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>비밀번호</FormLabel>
						<Input
							type="password"
							placeholder={"비밀번호"}
							isInvalid={Boolean(errors.password?.message)}
							{...register("password", {
								required: "비밀번호를 입력해주세요.",
							})}
						/>
						<FormHelperText>
							영문, 숫자 포함 8자리 이상 입력해주세요.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>비밀번호 확인</FormLabel>
						<Input
							type="password"
							placeholder={"비밀번호 확인"}
							isInvalid={Boolean(errors.password_confirm?.message)}
							{...register("password_confirm", {
								required: "비밀번호를 확인해주세요.",
								validate: (value: string) => {
									if (watch("password") != value) {
										return "비밀번호가 달라요.";
									}
								},
							})}
						/>
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
					<StyledButton
						btnName={"회원가입"}
						hasArrow={true}
						onClick={handleSubmit(onSubmit)}
					/>
				</VStack>
			);
	}
};
