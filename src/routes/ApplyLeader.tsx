import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";
import {
	FormControl,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
	Divider,
	Grid,
	Heading,
	HStack,
	Link,
	Text,
	VStack,
	Box,
	Container,
} from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Textarea } from "@chakra-ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Children, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getMyPortfolios, getEditLeaderApply, getLeaderApply } from "../api";
import { LoadingPage } from "../components/LoadingPage";
import { PortfolioCard } from "../components/PortfolioCard";
import StyledButton from "../components/StyledButton";
import { SubHeader } from "../components/SubHeader";
import useUserProfile from "../lib/useUserProfile";
import { IleaderApply, Iportfolio } from "../types";
import { Button } from "@chakra-ui/button";
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
import ProtectedPage from "../components/ProtectedPage";

interface IApplyLeaderForm {
	portfolioList: {
		id: number;
		title: string;
		short_description: string;
		url: string;
	}[];
}

interface IPortfolioCardModalBtn {
	id: number;
	title: string;
	short_description: string;
	url: string;
}

const PortfolioCardModalBtn = ({
	id,
	title,
	short_description,
	url,
}: IPortfolioCardModalBtn) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button variant={"link"} onClick={onOpen}>
				{title}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent pb={3}>
					<ModalCloseButton />
					<ModalHeader>포트폴리오 상세</ModalHeader>
					<ModalBody borderRadius={15} as={VStack} alignItems={"flex-start"}>
						<Heading size={"md"}>{title}</Heading>
						<Link color={"blue.400"}>{url}</Link>
						<Divider />
						<Heading pt={3} size={"sm"}>
							포트폴리오 설명
						</Heading>
						<Box
							p={6}
							border={"1px solid #DCDCDC"}
							borderRadius={15}
							width={"100%"}
							h={"max-content"}
						>
							{short_description}
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

const ApplyLeaderForm = ({ portfolioList }: IApplyLeaderForm) => {
	return (
		<VStack spacing={3} pt={12}>
			<FormControl>
				<FormLabel>하고 싶은 말</FormLabel>
				<Textarea placeholder={"하고 싶은 말"} />
				<FormHelperText>
					어떤 분야의 어떤 역량을 가지고 있는지 자세하게 적어주세요.
				</FormHelperText>
			</FormControl>
			<FormControl>
				<FormLabel>포트폴리오 선택</FormLabel>
				<VStack
					spacing={5}
					maxH={"250px"}
					overflow={"hidden"}
					overflowY={"scroll"}
					border={"1px solid #DEE3EE"}
					borderRadius={6}
				>
					<CheckboxGroup>
						<Divider />
						{portfolioList.map((portfolio) => (
							<Container key={portfolio.id} px={6} mt={0}>
								<HStack justifyContent={"space-between"} width={"100%"} pb={3}>
									<VStack alignItems={"flex-start"}>
										<PortfolioCardModalBtn
											id={portfolio.id}
											title={portfolio.title}
											url={portfolio.url}
											short_description={portfolio.short_description}
										/>
										<Text fontSize={"14px"} color={"#72777A"}>
											{portfolio.url}
										</Text>
									</VStack>
									<Checkbox
										colorScheme="purple"
										value={`${portfolio.id}`}
									></Checkbox>
								</HStack>
								<Divider />
							</Container>
						))}
					</CheckboxGroup>
				</VStack>
				<FormHelperText>
					모임의 성격과 가장 잘 맞는 포트폴리오를 제출해주세요.
				</FormHelperText>
			</FormControl>
			<hr />
		</VStack>
	);
};

export const ApplyLeaderCreate = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { moimId } = useParams();

	const { isLoading, data } = useQuery<Iportfolio[]>({
		queryKey: [`moims`, moimId, `apply-leader`, `create`],
		queryFn: getMyPortfolios,
	});

	if (isLoading) return <LoadingPage />;
	else
		return (
			<ProtectedPage>
				<VStack>
					<SubHeader headerTitle={"리더 지원서 작성하기"} />
					<ApplyLeaderForm portfolioList={data} />
					<StyledButton btnName={"지원서 제출하기"} />
				</VStack>
			</ProtectedPage>
		);
};

export const ApplyLeaderDetail = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { moimId, leaderApplyId } = useParams();
	const navigate = useNavigate();

	const { isLoading, data } = useQuery<IleaderApply>({
		queryKey: [`moims`, moimId, `apply-leader`, leaderApplyId],
		queryFn: () => getLeaderApply(leaderApplyId),
		onError: () => navigate("/not-found"),
		retry: false,
	});

	if (isLoading) return <LoadingPage />;
	else
		return (
			<VStack spacing={6}>
				<SubHeader headerTitle={`${data?.owner.user}님의 리더 지원서`} />
				<Grid
					pt={12}
					width={"100%"}
					gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr" }}
					gap={6}
				>
					<VStack>
						<Heading size={"md"} alignSelf={"flex-start"}>
							하고 싶은 말
						</Heading>
						<Box
							p={6}
							border={"1px solid #DCDCDC"}
							borderRadius={15}
							width={"100%"}
							h={"max-content"}
						>
							{data?.description}
						</Box>
					</VStack>
					<VStack alignItems={"flex-start"}>
						<Heading size={"md"}>제출한 포트폴리오</Heading>
						{data?.portfolios.map((portfolio) => (
							<PortfolioCard
								key={portfolio.id}
								id={portfolio.id}
								title={portfolio.title}
								description={portfolio.short_description}
								url={portfolio.url}
								viewOnly={true}
							/>
						))}
					</VStack>
				</Grid>
			</VStack>
		);
};

export const ApplyLeaderEdit = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { moimId, leaderApplyId } = useParams();

	const { isLoading, data } = useQuery<Iportfolio[]>({
		queryKey: [`moims`, moimId, `apply-leader`, leaderApplyId, `edit`],
		queryFn: getEditLeaderApply, // 이거 바꿔야함
	});

	if (isLoading) return <LoadingPage />;
	else
		return (
			<ProtectedPage>
				<VStack>
					<SubHeader headerTitle={"리더 지원서 수정하기"} />
					<ApplyLeaderForm portfolioList={data} />
					<StyledButton btnName={"수정하기"} />
					<StyledButton
						btnName={"지원 취소하기"}
						themeColor={"#E3E5E5"}
						btnNameColor={"red"}
					/>
				</VStack>
			</ProtectedPage>
		);
};
