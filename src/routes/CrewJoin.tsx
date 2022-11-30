import {
	FormControl,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { getCrewJoin, postCrewJoin } from "../api";
import { LoadingPage } from "../components/LoadingPage";
import ProtectedPage from "../components/ProtectedPage";
import StyledButton from "../components/StyledButton";
import useUserProfile from "../lib/useUserProfile";
import { IcrewJoin } from "../types";
import NotFound from "./NotFound";

interface IForm {
	description: string;
}

export const CrewJoinCreate = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { moimId } = useParams();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IForm>();

	const toast = useToast();
	const mutation = useMutation(postCrewJoin, {
		onSuccess: (data) => {
			toast({
				title: "모임 신청서가 제출되었습니다.",
				status: "success",
			});
			navigate(`/moims/${moimId}`);
		},
		onError: (error) => {
			toast({
				title: "제출 실패 : 다시 시도해주세요.",
				status: "error",
			});
		},
	});

	const onSubmit = ({ description }: IForm) => {
		mutation.mutate({ description, moimId });
	};

	return (
		<ProtectedPage>
			<VStack spacing={3}>
				<Heading size={"md"}>모임 신청서 작성하기</Heading>
				<FormControl>
					<FormLabel>하고 싶은 말</FormLabel>
					<Textarea
						placeholder={"하고 싶은 말"}
						isInvalid={Boolean(errors.description?.message)}
						{...register("description", {
							required: "하고 싶은 말을 입력해주세요.",
						})}
					/>
					<FormHelperText>
						어떤 동기에서 모임을 신청하는지 작성해주세요.
					</FormHelperText>
				</FormControl>
				<hr />
				<StyledButton
					btnName={"신청하기"}
					onClick={handleSubmit(onSubmit)}
					isLoading={mutation.isLoading}
				/>
			</VStack>
		</ProtectedPage>
	);
};

export const CrewJoinEdit = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const navigate = useNavigate();
	const { isLoggedIn, userLoading } = useUserProfile();

	const { moimId, crewJoinId } = useParams();
	const { isLoading, data } = useQuery<IcrewJoin>({
		queryKey: [`moims`, moimId, `crew-join`, crewJoinId, "edit"],
		queryFn: () => getCrewJoin(crewJoinId),
		onError: () => navigate("/not-found"),
		retry: false,
	});

	// const toast = useToast();
	// const queryClient = useQueryClient();
	// const mutation = useMutation(phoneNumberLogIn, {
	// 	onSuccess: (data) => {
	// 		toast({
	// 			title: "신청서가 수정되었습니다!",
	// 			status: "success",
	// 		});
	// 		queryClient.refetchQueries([
	// 			`moims`,
	// 			moimId,
	// 			`crew-join`,
	// 			crewJoinId,
	// 			"edit",
	// 		]);
	// 	},
	// 	onError: (error) => {
	// 		toast({
	// 			title: "로그인 실패 : 다시 시도해주세요",
	// 			status: "error",
	// 		});
	// 	},
	// });

	// const onSubmit = ({ description }: IForm) => {
	// 	mutation.mutate({ description });
	// };

	if (isLoading) return <LoadingPage />;
	return (
		<ProtectedPage>
			<VStack spacing={3}>
				<Heading size={"md"}>모임 신청서 수정하기</Heading>
				<FormControl>
					<FormLabel>하고 싶은 말</FormLabel>
					<Textarea
						placeholder={"하고 싶은 말"}
						defaultValue={data?.description}
					/>
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
		</ProtectedPage>
	);
};
