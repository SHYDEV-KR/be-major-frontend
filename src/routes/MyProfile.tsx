import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import {
	HStack,
	Link,
	Text,
	Box,
	VStack,
	Stack,
	Heading,
	Grid,
} from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import StyledButton from "../components/StyledButton";
import { SubHeader } from "../components/SubHeader";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import { PortfolioCard } from "../components/PortfolioCard";
import { MoimCardNoImage } from "../components/MoimCardNoImage";
import useUserProfile from "../lib/useUserProfile";
import {
	getMyMoimListAsCrew,
	getMyMoimListAsLeader,
	getMyMoimListAsOwner,
	getMyPortfolios,
	getMyProfile,
} from "../api";
import { LoadingPage } from "../components/LoadingPage";
import { ImoimDetail, Iportfolio } from "../types";
import { useQuery } from "@tanstack/react-query";

export const MyProfileRoot = () => {
	return (
		<Box minW={"327px"}>
			<Outlet />
		</Box>
	);
};

export const MyProfile = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const BtnModal = () => (
		<Modal onClose={onClose} size={"sm"} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>내 모임</ModalHeader>
				<ModalCloseButton />
				<ModalBody as={VStack} spacing={3} pb={6}>
					<Link
						as={RouterLink}
						to={"moims/crew"}
						_hover={{ textDecoration: "none" }}
					>
						<StyledButton btnName={"크루로 참여한 모임"} />
					</Link>
					<Link
						as={RouterLink}
						to={"moims/leader"}
						_hover={{ textDecoration: "none" }}
					>
						<StyledButton btnName={"리더로 지원한 모임"} />
					</Link>
					<Link
						as={RouterLink}
						to={"moims/owner"}
						_hover={{ textDecoration: "none" }}
					>
						<StyledButton btnName={"내가 생성한 모임"} />
					</Link>
				</ModalBody>
			</ModalContent>
		</Modal>
	);

	const { isLoggedIn, userLoading, user } = useUserProfile();
	const navigate = useNavigate();
	if (!isLoggedIn) navigate("/signin");
	else if (userLoading) return <LoadingPage />;
	else
		return (
			<VStack>
				<SubHeader headerTitle={"내 프로필"} />
				<HStack justifyContent={"space-between"} width={"100%"} pt={12}>
					<HStack>
						<Image
							src={user?.avatar !== "" ? user?.avatar : "/logo.png"}
							borderRadius={"50%"}
							width={"40px"}
							height={"40px"}
							border={"1px solid #DCDCDC"}
						></Image>
						<VStack alignItems={"flex-start"} spacing={0} pl={1}>
							<Text>{user?.user.username}</Text>
							<Text color={"#72777A"}>{user?.user.phone_number}</Text>
						</VStack>
					</HStack>
					<Button
						size={"xs"}
						bg={"#5538EE"}
						color={"white"}
						borderRadius={12}
						px={3}
						onClick={onOpen}
					>
						내 모임
					</Button>
					<BtnModal />
				</HStack>
				<VStack w={"100%"} spacing={3}>
					<FormControl>
						<FormLabel>전공</FormLabel>
						<Input
							type="text"
							placeholder={"전공"}
							defaultValue={user?.major}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>이메일</FormLabel>
						<Input
							type="email"
							placeholder={"이메일"}
							defaultValue={user?.email}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>성별</FormLabel>
						<Select defaultValue={user?.gender}>
							<option value="male">남자</option>
							<option value="female">여자</option>
							<option value="else">기타</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>생년월일</FormLabel>
						<Input type="date" defaultValue={user?.date_of_birth} />
					</FormControl>
					<StyledButton btnName={"프로필 저장"} />
					<Link
						as={RouterLink}
						to={"portfolios"}
						_hover={{ textDecoration: "none" }}
					>
						<StyledButton btnName={"포트폴리오 관리"} />
					</Link>
				</VStack>
			</VStack>
		);
};

export const MyPortfolioList = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const gridColumnSystem = {
		sm: "repeat(1, 1fr)",
	};

	const { isLoggedIn, userLoading, user } = useUserProfile();
	const navigate = useNavigate();

	const { isLoading, data } = useQuery<Iportfolio[]>({
		queryKey: [`my-profile`, `portfolios`],
		queryFn: getMyPortfolios,
	});

	if (isLoading || userLoading) return <LoadingPage />;
	else if (!isLoggedIn) navigate("/signin");
	else
		return (
			<VStack>
				<SubHeader
					headerTitle={"포트폴리오 관리"}
					hasBtn={true}
					btnName={"추가"}
					to={`/portfolios/create`}
				/>
				<Grid templateColumns={gridColumnSystem} gap={3} pt={12} w={"100%"}>
					{data.map((portfolio) => (
						<PortfolioCard
							key={portfolio.id}
							id={portfolio.id}
							title={portfolio.title}
							description={portfolio.short_description}
							url={portfolio.url}
						/>
					))}
				</Grid>
			</VStack>
		);
};

export const MyMoimListAsCrew = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { isLoading, data } = useQuery<ImoimDetail[]>(
		["my-profile", "moims", "crew"],
		getMyMoimListAsCrew
	);

	if (isLoading) return <LoadingPage />;
	else
		return (
			<VStack spacing={6}>
				<SubHeader headerTitle={`크루로 참여한 모임`} />
				<Grid pt={12} width={"100%"} gridTemplateColumns={"1fr"} gap={6}>
					<VStack>
						{data ? (
							data?.map((moim) => (
								<MoimCardNoImage
									key={moim.id}
									id={moim.id}
									title={moim.title}
									topics={moim.topics}
									moimTypes={moim.moim_types}
									hasLeader={moim.has_leader}
									isClosed={moim.is_closed}
									min={moim.min_participants}
									current={moim.current_number_of_participants}
									expirationDate={moim.expiration_date}
									isCrew={moim.is_crew}
									isLeader={moim.is_leader}
									isOwner={moim.is_owner}
									typeOfPage={"crew"}
									hasApplied={moim.has_applied}
								/>
							))
						) : (
							<VStack alignItems={"center"}>
								<Heading size={"md"}>참여 신청한 모임이 없습니다!</Heading>
							</VStack>
						)}
					</VStack>
				</Grid>
			</VStack>
		);
};

export const MyMoimListAsLeader = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { isLoading, data } = useQuery<ImoimDetail[]>(
		["my-profile", "moims", "leader"],
		getMyMoimListAsLeader
	);

	if (isLoading) return <LoadingPage />;
	else
		return (
			<VStack spacing={6}>
				<SubHeader headerTitle={`리더로 지원한 모임`} />
				<Grid pt={12} width={"100%"} gridTemplateColumns={"1fr"} gap={6}>
					<VStack>
						{data ? (
							data?.map((moim) => (
								<MoimCardNoImage
									key={moim.id}
									id={moim.id}
									title={moim.title}
									topics={moim.topics}
									moimTypes={moim.moim_types}
									hasLeader={moim.has_leader}
									isClosed={moim.is_closed}
									min={moim.min_participants}
									current={moim.current_number_of_participants}
									expirationDate={moim.expiration_date}
									isCrew={moim.is_crew}
									isLeader={moim.is_leader}
									isOwner={moim.is_owner}
									typeOfPage={"leader"}
									hasApplied={moim.has_applied}
								/>
							))
						) : (
							<VStack alignItems={"center"}>
								<Heading size={"md"}>리더로 지원한 모임이 없습니다!</Heading>
							</VStack>
						)}
					</VStack>
				</Grid>
			</VStack>
		);
};
export const MyMoimListAsOwner = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { isLoading, data } = useQuery<ImoimDetail[]>(
		["my-profile", "moims", "owner"],
		getMyMoimListAsOwner
	);

	if (isLoading) return <LoadingPage />;
	return (
		<VStack spacing={6}>
			<SubHeader headerTitle={`내가 생성한 모임`} />
			<Grid pt={12} width={"100%"} gridTemplateColumns={"1fr"} gap={6}>
				<VStack>
					{data ? (
						data?.map((moim) => (
							<MoimCardNoImage
								key={moim.id}
								id={moim.id}
								title={moim.title}
								topics={moim.topics}
								moimTypes={moim.moim_types}
								hasLeader={moim.has_leader}
								isClosed={moim.is_closed}
								min={moim.min_participants}
								current={moim.current_number_of_participants}
								expirationDate={moim.expiration_date}
								isCrew={moim.is_crew}
								isLeader={moim.is_leader}
								isOwner={moim.is_owner}
								typeOfPage={"owner"}
								hasApplied={moim.has_applied}
							/>
						))
					) : (
						<VStack alignItems={"center"}>
							<Heading size={"md"}>생성한 모임이 없습니다!</Heading>
						</VStack>
					)}
				</VStack>
			</Grid>
		</VStack>
	);
};
