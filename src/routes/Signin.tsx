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
import useUserProfile from "../lib/useUserProfile";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { phoneNumberLogIn } from "../api";
import { useToast } from "@chakra-ui/react";

interface IForm {
	phone_number: string;
	password: string;
}

export const Signin = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const navigate = useNavigate();
	const { isLoggedIn, userLoading } = useUserProfile();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IForm>();

	const toast = useToast();
	const queryClient = useQueryClient();
	const mutation = useMutation(phoneNumberLogIn, {
		onSuccess: (data) => {
			toast({
				title: "환영합니다!",
				status: "success",
			});
			navigate("/");
			queryClient.refetchQueries(["users", "my-profile"]);
		},
		onError: (error) => {
			toast({
				title: "로그인 실패 : 다시 시도해주세요",
				status: "error",
			});
		},
	});

	const onSubmit = ({ phone_number, password }: IForm) => {
		mutation.mutate({ phone_number, password });
	};
	if (!userLoading) {
		if (isLoggedIn) navigate("/");
		else
			return (
				<VStack spacing={3} as={"form"} onSubmit={handleSubmit(onSubmit)}>
					<Heading size={"lg"}>로그인</Heading>
					<FormControl>
						<Input
							type="text"
							placeholder={"휴대폰 번호"}
							isInvalid={Boolean(errors.phone_number?.message)}
							{...register("phone_number", {
								required: "휴대폰 번호를 입력해주세요.",
							})}
						/>
					</FormControl>
					<FormControl>
						<Input
							type="password"
							placeholder={"비밀번호"}
							isInvalid={Boolean(errors.password?.message)}
							{...register("password", {
								required: "비밀번호를 입력해주세요.",
							})}
						/>
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
					<StyledButton
						btnName={"로그인"}
						hasArrow={true}
						onClick={handleSubmit(onSubmit)}
						isLoading={mutation.isLoading}
						type={"submit"}
					/>
				</VStack>
			);
	}
};
