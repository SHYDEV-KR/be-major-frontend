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
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useEffect } from "react";
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

	return (
		<VStack>
			<SubHeader headerTitle={"내 프로필"} />
			<HStack justifyContent={"space-between"} width={"100%"} pt={12}>
				<HStack>
					<Image
						src={"/logo.png"}
						borderRadius={"50%"}
						width={"40px"}
						height={"40px"}
					></Image>
					<VStack alignItems={"flex-start"} spacing={0} pl={1}>
						<Text>exusername</Text>
						<Text color={"#72777A"}>01012345678</Text>
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
					<Input type="text" placeholder={"전공"} />
				</FormControl>
				<FormControl>
					<FormLabel>이메일</FormLabel>
					<Input type="email" placeholder={"이메일"} />
				</FormControl>
				<FormControl>
					<FormLabel>성별</FormLabel>
					<RadioGroup>
						<HStack direction="row">
							<Radio value="남자">남자</Radio>
							<Radio value="여자">여자</Radio>
							<Radio value="기타">기타</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel>생년월일</FormLabel>
					<Input type="date" />
				</FormControl>
				<StyledButton btnName={"프로필 저장"} disabled={true} />
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

	const PortfolioExample = [
		{
			id: 1,
			title: "포폴1",
			description:
				"첫눈에 반한다는 소설같은 이야기 요즘 누가 믿나요. 내 포폴입니다. 드디어 찾아온, 포폴이다~~~~ 그냥 느낌으로 알아 말도 안되지만 이 순간만을 위해 살아온 것같아~~첫눈에 반한다는 소설같은 이야기 요즘 누가 믿나요. 내 포폴입니다. 드디어 찾아온, 포폴이다~~~~ 그냥 느낌으로 알아 말도 안되지만 이 순간만을 위해 살아온 것같아~~첫눈에 반한다는 소설같",
			url: "https://naver.com",
		},
		{
			id: 2,
			title: "포폴2입니다.",
			description: "이번엔 짧은 설명이지롱",
			url: "https://google.com",
		},
		{
			id: 3,
			title: "포폴2입니다.",
			description: "이번엔 짧은 설명이지롱",
			url: "https://google.com",
		},
	];
	const gridColumnSystem = {
		sm: "repeat(1, 1fr)",
		md: "repeat(2, 1fr)",
	};

	return (
		<VStack>
			<SubHeader
				headerTitle={"포트폴리오 관리"}
				hasBtn={true}
				btnName={"추가"}
				to={`/portfolios/create`}
			/>
			<Grid templateColumns={gridColumnSystem} gap={3} pt={12}>
				{PortfolioExample.map((portfolio) => (
					<PortfolioCard
						key={portfolio.id}
						id={portfolio.id}
						title={portfolio.title}
						description={portfolio.description}
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
	const moimsAsCrew = [
		{
			id: 1,
			title: "배민 3년차 PM과 함께 실무능력 A to Z",
			hasLeader: true,
			moimTypes: ["커피챗"],
			topics: ["서비스 기획", "실무스킬"],
			min: 6,
			current: 2,
			expirationDate: "2023-01-01",
			isClosed: true,
			isCrew: true,
			isLeader: true,
			isOwner: false,
			hasApplied: false,
		},
		{
			id: 2,
			title: "같이 개발 스터디합시다.",
			hasLeader: true,
			moimTypes: ["스터디"],
			topics: ["개발", "백엔드"],
			min: 2,
			current: 2,
			expirationDate: "2022-12-29",
			isClosed: false,
			isCrew: true,
			isLeader: false,
			isOwner: false,
			hasApplied: false,
		},
		{
			id: 3,
			title: "같이 개발 스터디합시다.",
			hasLeader: false,
			moimTypes: ["스터디"],
			topics: ["개발", "백엔드"],
			min: 2,
			current: 2,
			expirationDate: "2022-12-29",
			isClosed: false,
			isCrew: true,
			isLeader: true,
			isOwner: false,
			hasApplied: false,
		},
	];
	return (
		<VStack spacing={6}>
			<SubHeader headerTitle={`크루로 참여한 모임`} />
			<Grid pt={12} width={"100%"} gridTemplateColumns={"1fr"} gap={6}>
				<VStack>
					{moimsAsCrew.map((moim) => (
						<MoimCardNoImage
							key={moim.id}
							id={moim.id}
							title={moim.title}
							topics={moim.topics}
							moimTypes={moim.moimTypes}
							hasLeader={moim.hasLeader}
							isClosed={moim.isClosed}
							min={moim.min}
							current={moim.current}
							expirationDate={moim.expirationDate}
							isCrew={moim.isCrew}
							isLeader={moim.isLeader}
							isOwner={moim.isOwner}
							typeOfPage={"crew"}
							hasApplied={moim.hasApplied}
						/>
					))}
				</VStack>
			</Grid>
		</VStack>
	);
};

export const MyMoimListAsLeader = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const moimsAsLeader = [
		{
			id: 1,
			title: "배민 3년차 PM과 함께 실무능력 A to Z",
			hasLeader: true,
			moimTypes: ["커피챗"],
			topics: ["서비스 기획", "실무스킬"],
			min: 6,
			current: 2,
			expirationDate: "2023-01-01",
			isClosed: true,
			isCrew: false,
			isLeader: false,
			isOwner: false,
			hasApplied: true,
		},
		{
			id: 2,
			title: "같이 개발 스터디합시다.",
			hasLeader: true,
			moimTypes: ["스터디"],
			topics: ["개발", "백엔드"],
			min: 2,
			current: 2,
			expirationDate: "2022-12-29",
			isClosed: false,
			isCrew: false,
			isLeader: true,
			isOwner: false,
			hasApplied: true,
		},
		{
			id: 3,
			title: "같이 개발 스터디합시다.",
			hasLeader: false,
			moimTypes: ["스터디"],
			topics: ["개발", "백엔드"],
			min: 2,
			current: 2,
			expirationDate: "2022-12-29",
			isClosed: false,
			isCrew: true,
			isLeader: false,
			isOwner: false,
			hasApplied: true,
		},
	];
	return (
		<VStack spacing={6}>
			<SubHeader headerTitle={`리더로 지원한 모임`} />
			<Grid pt={12} width={"100%"} gridTemplateColumns={"1fr"} gap={6}>
				<VStack>
					{moimsAsLeader.map((moim) => (
						<MoimCardNoImage
							key={moim.id}
							id={moim.id}
							title={moim.title}
							topics={moim.topics}
							moimTypes={moim.moimTypes}
							hasLeader={moim.hasLeader}
							isClosed={moim.isClosed}
							min={moim.min}
							current={moim.current}
							expirationDate={moim.expirationDate}
							isCrew={moim.isCrew}
							isLeader={moim.isLeader}
							isOwner={moim.isOwner}
							typeOfPage={"leader"}
							hasApplied={moim.hasApplied}
						/>
					))}
				</VStack>
			</Grid>
		</VStack>
	);
};
export const MyMoimListAsOwner = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const moimsAsOwner = [
		{
			id: 1,
			title: "배민 3년차 PM과 함께 실무능력 A to Z",
			hasLeader: false,
			moimTypes: ["커피챗"],
			topics: ["서비스 기획", "실무스킬"],
			min: 6,
			current: 2,
			expirationDate: "2023-01-01",
			isClosed: false,
			isCrew: true,
			isLeader: false,
			isOwner: true,
			hasApplied: false,
		},
		{
			id: 2,
			title: "같이 개발 스터디합시다.",
			hasLeader: true,
			moimTypes: ["스터디"],
			topics: ["개발", "백엔드"],
			min: 2,
			current: 2,
			expirationDate: "2022-12-29",
			isClosed: false,
			isCrew: true,
			isLeader: false,
			isOwner: true,
			hasApplied: false,
		},
		{
			id: 3,
			title: "같이 개발 스터디합시다.",
			hasLeader: true,
			moimTypes: ["스터디"],
			topics: ["개발", "백엔드"],
			min: 2,
			current: 2,
			expirationDate: "2022-12-29",
			isClosed: true,
			isCrew: true,
			isLeader: false,
			isOwner: true,
			hasApplied: false,
		},
	];
	return (
		<VStack spacing={6}>
			<SubHeader headerTitle={`내가 생성한 모임`} />
			<Grid pt={12} width={"100%"} gridTemplateColumns={"1fr"} gap={6}>
				<VStack>
					{moimsAsOwner.map((moim) => (
						<MoimCardNoImage
							key={moim.id}
							id={moim.id}
							title={moim.title}
							topics={moim.topics}
							moimTypes={moim.moimTypes}
							hasLeader={moim.hasLeader}
							isClosed={moim.isClosed}
							min={moim.min}
							current={moim.current}
							expirationDate={moim.expirationDate}
							isCrew={moim.isCrew}
							isLeader={moim.isLeader}
							isOwner={moim.isOwner}
							typeOfPage={"owner"}
							hasApplied={moim.hasApplied}
						/>
					))}
				</VStack>
			</Grid>
		</VStack>
	);
};
