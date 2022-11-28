import {
	FormControl,
	FormHelperText,
	FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import {
	Text,
	Box,
	VStack,
	Divider,
	Heading,
	HStack,
	Link,
	Stack,
	Grid,
	Highlight,
} from "@chakra-ui/layout";
import { Outlet } from "react-router";
import { SubHeader } from "../components/SubHeader";
import { Select } from "@chakra-ui/react";
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	Button,
	ButtonGroup,
	Tag,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Textarea,
	Checkbox,
	Image,
} from "@chakra-ui/react";
import StyledButton from "../components/StyledButton";
import { MoimCard } from "../components/MoimCard";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PortfolioCard } from "../components/PortfolioCard";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";

export const MoimRoot = () => {
	return (
		<Box minW={"327px"}>
			<Outlet />
		</Box>
	);
};

export const MoimCreate = () => {
	const [step, setStep] = useState(1);

	const prevStep = () => {
		setStep((prev) => prev - 1);
	};

	const nextStep = () => {
		setStep((prev) => prev + 1);
	};

	const disabledBtnStyle = {
		backgroundColor: "#DFE1E1",
		cursor: "not-allowed",
	};

	interface IBaseProps {
		children: ReactNode;
	}

	const Base = ({ children }: IBaseProps) => (
		<VStack>
			<SubHeader headerTitle={"모임 생성하기"} />
			<VStack pt={12} w={"100%"} spacing={3}>
				{children}
			</VStack>
		</VStack>
	);

	const Step1 = () => {
		useEffect(() => {
			window.scrollTo(0, 0);
		}, []);
		return (
			<>
				<Heading size="md" alignSelf={"flex-start"} pt={6}>
					모임 기본정보
				</Heading>
				<FormControl>
					<FormLabel>모임 제목</FormLabel>
					<Input type="text" maxLength={20} placeholder={"모임 제목"} />
					<FormHelperText>최대 20자까지 작성 가능합니다.</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>모임 주제</FormLabel>
					<Select placeholder="모임 주제 선택">
						{["개발", "디자인", "기획"].map((moimType, id) => (
							<option value={moimType} key={id}>
								{moimType}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>모임 형식</FormLabel>
					<Select placeholder="모임 형식 선택">
						{["스터디", "강의", "커피챗"].map((moimType, id) => (
							<option value={moimType} key={id}>
								{moimType}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>모임 설명</FormLabel>
					<Textarea placeholder="모임의 취지 등 모임에 대한 자세한 설명" />
				</FormControl>
				<FormControl>
					<FormLabel>목표 금액</FormLabel>
					<InputGroup>
						<Input type="number" placeholder={"목표 금액"} />
						<InputRightAddon children="원" />
					</InputGroup>
					<FormHelperText>
						모임 리더에게 지불할 목표 금액을 입력해주세요.
					</FormHelperText>
				</FormControl>
				<ButtonGroup
					gap="4"
					w={"100%"}
					display={"grid"}
					gridTemplateColumns={"1fr 1fr"}
				>
					<Button
						bg="#6B4EFF"
						color={"white"}
						isDisabled
						_disabled={disabledBtnStyle}
					>
						&larr; 이전
					</Button>
					<Button bg="#6B4EFF" color={"white"} onClick={nextStep}>
						다음 &rarr;
					</Button>
				</ButtonGroup>
			</>
		);
	};

	const Step2 = () => {
		useEffect(() => {
			window.scrollTo(0, 0);
		}, []);
		const [participantsLimit, setParticipantLimit] = useState({
			min: 1,
			max: 10,
		});
		const [sliderValue, setSliderValue] = useState(1);

		return (
			<>
				<Heading size="md" alignSelf={"flex-start"} pt={6}>
					인원과 장소
				</Heading>
				<FormControl>
					<FormLabel>최소 / 최대 참석 인원</FormLabel>
					<RangeSlider
						defaultValue={[1, 10]}
						min={1}
						max={20}
						step={1}
						onChangeEnd={([min, max]) =>
							setParticipantLimit({ ...participantsLimit, min: min, max: max })
						}
					>
						<RangeSliderTrack bg="#E3E5E5">
							<RangeSliderFilledTrack bg="#6B4EFF" />
						</RangeSliderTrack>
						<RangeSliderThumb
							boxSize={6}
							index={0}
							bg={"#6B4EFF"}
							color={"white"}
						>
							{participantsLimit.min}
						</RangeSliderThumb>
						<RangeSliderThumb
							boxSize={6}
							index={1}
							bg={"#6B4EFF"}
							color={"white"}
						>
							{participantsLimit.max}
						</RangeSliderThumb>
					</RangeSlider>
					<FormHelperText>
						최소인원이 달성되면 모임을 시작할 수 있습니다.
					</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>첫 만남</FormLabel>
					<Input type="date" />
					<FormHelperText>처음 모임을 가질 날짜를 설정해주세요.</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>모임 횟수</FormLabel>
					<Slider
						id="slider"
						defaultValue={1}
						min={1}
						max={8}
						onChange={(v) => setSliderValue(v)}
					>
						<SliderTrack>
							<SliderFilledTrack bg="#6B4EFF" />
						</SliderTrack>
						<SliderThumb bg="#6B4EFF" color={"white"} boxSize={6}>
							{sliderValue}
						</SliderThumb>
					</Slider>
					<FormHelperText>
						모임을 가지고자 하는 횟수를 입력해주세요.
					</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>장소</FormLabel>
					<Checkbox colorScheme="green">온라인 모임이에요.</Checkbox>
					<Input placeholder="지역(서울, 경기 등) / 온라인 모임 방식(Zoom 등)" />
					<FormHelperText>모임 장소를 정해주세요.</FormHelperText>
				</FormControl>
				<ButtonGroup
					gap="4"
					w={"100%"}
					display={"grid"}
					gridTemplateColumns={"1fr 1fr"}
				>
					<Button bg="#6B4EFF" color={"white"} onClick={prevStep}>
						&larr; 이전
					</Button>
					<Button bg="#6B4EFF" color={"white"} onClick={nextStep}>
						다음 &rarr;
					</Button>
				</ButtonGroup>
			</>
		);
	};

	const Step3 = () => {
		useEffect(() => {
			window.scrollTo(0, 0);
		}, []);

		return (
			<>
				<Heading size="md" alignSelf={"flex-start"} pt={6}>
					모임 생성하기
				</Heading>
				<FormControl>
					<FormLabel>펀딩 마감일</FormLabel>
					<Input type="date" />
					<FormHelperText>펀딩을 마감할 날짜를 정해주세요.</FormHelperText>
				</FormControl>
				<ButtonGroup
					gap="4"
					w={"100%"}
					display={"grid"}
					gridTemplateColumns={"1fr 1fr"}
				>
					<Button bg="#6B4EFF" color={"white"} onClick={prevStep}>
						&larr; 이전
					</Button>
					<Button
						bg="#6B4EFF"
						color={"white"}
						isDisabled
						_disabled={disabledBtnStyle}
					>
						다음 &rarr;
					</Button>
				</ButtonGroup>
				<VStack py={6}>
					<StyledButton btnName={"모임 생성하기"} hasArrow={true} />
				</VStack>
			</>
		);
	};

	switch (step) {
		case 1:
			return (
				<Base>
					<Step1 />
				</Base>
			);
		case 2:
			return (
				<Base>
					<Step2 />
				</Base>
			);
		case 3:
			return (
				<Base>
					<Step3 />
				</Base>
			);
		default:
			return null;
	}
};

export const MoimDetail = () => {
	const moimExample = {
		id: 1,
		title: "배민 3년차 PM과 함께 실무능력 A to Z",
		owner: {
			username: "USER1",
			avatar: "/logo.png",
		},
		moimTypes: ["커피챗"],
		topics: ["서비스 기획", "실무스킬"],
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula nunc urna, aliquam blandit erat consectetur in. Ut ut justo vel lacus tristique egestas non a turpis. Praesent id tincidunt mi, et fermentum erat. Aliquam at turpis facilisis, vulputate mi vitae, ultricies orci. Nam commodo hendrerit massa at dictum. Donec dignissim varius pharetra. Vestibulum rutrum orci sit amet elit ultrices condimentum. Ut vel feugiat turpis, ac elementum lectus. Maecenas tristique consectetur vehicula. Morbi aliquet maximus quam, convallis pellentesque nunc tempus a. Curabitur ultrices, dui sed consectetur imperdiet, nisl tortor suscipit magna, eget sagittis justo ex eu augue. Donec suscipit et augue nec ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras tellus lacus, fermentum tincidunt felis ut, efficitur vulputate ex. Etiam et arcu ac arcu tincidunt pulvinar.",
		leader: {
			username: "류지현",
			avatar: "/logo.png",
			leaderApplyId: 1,
		},
		targetAmount: 100000,
		current: 7,
		min: 4,
		max: 8,
		moimTimes: 5,
		firstDate: "2022-11-28",
		expirationDate: "2022-11-29",
		isOnline: false,
		location: "서울",
		isCrew: true,
		crewJoinId: 1,
		leaderApplyId: 1,
		isOwner: false,
		isClosed: false,
		hasApplied: false,
		isLeader: true,
		hasLeader: true,
	};
	const remainingDays = Math.ceil(
		(new Date(moimExample.expirationDate).getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24)
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<VStack>
			<Heading size={"md"}>모임 상세정보</Heading>
			<Grid
				gridTemplateColumns={"2fr 1fr"}
				w={"100%"}
				bg={"white"}
				position={"fixed"}
				bottom={0}
				zIndex={999}
				px={[6, 35, 75, 140, 280]}
				borderTop={"1px solid #DCDCDC"}
			>
				<VStack alignItems={"flex-start"} py={6}>
					<Heading size={"sm"}>마감까지 {remainingDays}일</Heading>
					{moimExample.min - moimExample.current > 0 ? (
						<Heading size={"sm"}>
							<Highlight
								query={`${moimExample.min - moimExample.current}명 남았어요`}
								styles={{ color: "#6B4EFF" }}
							>
								{`최소 인원까지 ${
									moimExample.min - moimExample.current
								}명 남았어요`}
							</Highlight>
						</Heading>
					) : moimExample.max - moimExample.current !== 0 ? (
						<Heading size={"sm"}>
							<Highlight
								query={`${moimExample.max - moimExample.current}명 남았어요`}
								styles={{ color: "#6B4EFF" }}
							>
								{`최대 인원까지 ${
									moimExample.max - moimExample.current
								}명 남았어요`}
							</Highlight>
						</Heading>
					) : (
						<Heading size={"sm"}>
							<Highlight query={`마감됐어요!`} styles={{ color: "#6B4EFF" }}>
								{`인원 모집이 마감됐어요!`}
							</Highlight>
						</Heading>
					)}
				</VStack>
				<VStack alignSelf={"center"} justifySelf={"flex-end"}>
					{moimExample.isOwner ? (
						<Link
							as={RouterLink}
							to={`owner`}
							_hover={{ textDecoration: "none" }}
						>
							<Button bg={"#6B4EFF"} color={"white"} borderRadius={100}>
								모임 관리
							</Button>
						</Link>
					) : moimExample.isCrew ? (
						<Link
							as={RouterLink}
							to={`crew-join/${moimExample.crewJoinId}/edit`}
							_hover={{ textDecoration: "none" }}
						>
							<Button bg={"#6B4EFF"} color={"white"} borderRadius={100}>
								신청서 수정
							</Button>
						</Link>
					) : moimExample.isClosed ? (
						<Button
							bg={"#6B4EFF"}
							color={"white"}
							borderRadius={100}
							isDisabled
						>
							모집 마감
						</Button>
					) : moimExample.max - moimExample.current !== 0 ? (
						<Link
							as={RouterLink}
							to={`crew-join/create`}
							_hover={{ textDecoration: "none" }}
						>
							<Button bg={"#6B4EFF"} color={"white"} borderRadius={100}>
								참여하기
							</Button>
						</Link>
					) : (
						<Button
							bg={"#6B4EFF"}
							color={"white"}
							borderRadius={100}
							isDisabled
						>
							모집 마감
						</Button>
					)}
				</VStack>
			</Grid>
			<Grid
				pt={6}
				gap={12}
				gridTemplateColumns={{
					sm: "1fr",
					md: "1fr 1fr",
				}}
			>
				<Stack w={"100%"} alignItems={"center"}>
					<Card
						minW="xs"
						maxW="sm"
						maxH={"fit-content"}
						borderRadius={15}
						bg={"#F9F9FA"}
					>
						<Image
							src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
							alt="Green double couch with wooden legs"
							borderRadius={15}
							boxSize={"sm"}
							maxH={48}
						/>
						<CardBody paddingTop={"16px"}>
							<Stack spacing="3">
								{moimExample.hasLeader ? (
									<>
										<Heading size="sm" mt={"16px"}>
											{moimExample.title}
										</Heading>
									</>
								) : (
									<>
										<Heading size="sm">
											<Text fontSize={"sm"} color={"#6B4EFF"}>
												리더 모집 중
											</Text>
											{moimExample.title}
										</Heading>
									</>
								)}
								<HStack>
									{moimExample.moimTypes.map((moimType, key) => (
										<Tag
											fontSize={"xs"}
											key={key}
											bg={"#6B4EFF"}
											color={"white"}
											borderRadius={100}
										>
											#{moimType}
										</Tag>
									))}
									{moimExample.topics.map((topic, key) => (
										<Tag fontSize={"xs"} key={key} borderRadius={100}>
											#{topic}
										</Tag>
									))}
								</HStack>
								<Text fontSize={"sm"} color={"#6B4EFF"}>
									{Math.round((moimExample.current / moimExample.min) * 100)}%
									펀딩 완료(
									{remainingDays}일 남음)
								</Text>
								<hr />
								<VStack w={"100%"} spacing={12} py={6}>
									<Stack w={"100%"}>
										<Heading size={"md"} alignSelf={"flex-start"}>
											1인 부담 금액
										</Heading>
										<FormControl>
											<InputGroup w={"fit-content"}>
												<Input
													type="text"
													value={`${(moimExample.targetAmount / moimExample.max)
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ~ ${(
														moimExample.targetAmount / moimExample.min
													)
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
													readOnly
												/>
												<InputRightAddon children="원" />
											</InputGroup>

											<FormHelperText>
												크루 1인이 부담하는 최소 ~ 최대 금액이에요.
												<br />
												(모임 인원에 따라 변동 가능)
											</FormHelperText>
										</FormControl>
									</Stack>
									<Stack w={"100%"}>
										<Heading size={"md"} alignSelf={"flex-start"}>
											일정과 장소
										</Heading>
										{moimExample.moimTimes > 1 ? (
											<Stat>
												<Text
													fontWeight={"bold"}
												>{`${moimExample.firstDate} / 총 ${moimExample.moimTimes}회`}</Text>
												<StatHelpText>{`${moimExample.firstDate}에 첫 모임을 가지고, 총 ${moimExample.moimTimes}회 만나요.`}</StatHelpText>
											</Stat>
										) : (
											<Stat>
												<Text
													fontWeight={"bold"}
												>{`${moimExample.firstDate}`}</Text>
												<StatHelpText>{`${moimExample.firstDate}에 모임을 가져요.`}</StatHelpText>
											</Stat>
										)}
										<Stat>
											{moimExample.isOnline ? (
												<>
													<Text fontWeight={"bold"}>{`온라인`}</Text>
													<StatHelpText>{`온라인으로 진행되는 모임이에요.`}</StatHelpText>
												</>
											) : (
												<>
													<Text
														fontWeight={"bold"}
													>{`${moimExample.location}`}</Text>
													<StatHelpText>{`${moimExample.location}에서 모임을 가져요.`}</StatHelpText>
												</>
											)}
										</Stat>
									</Stack>
									<Stack w={"100%"}>
										<Heading size={"md"} alignSelf={"flex-start"}>
											최소 / 최대 크루 인원
										</Heading>
										<FormControl>
											<RangeSlider
												defaultValue={[moimExample.min, moimExample.max]}
												min={1}
												max={20}
												step={1}
												isDisabled
											>
												<RangeSliderTrack bg="#E3E5E5">
													<RangeSliderFilledTrack bg="#6B4EFF" />
												</RangeSliderTrack>
												<RangeSliderThumb
													boxSize={6}
													index={0}
													_disabled={{
														bg: "#6B4EFF",
													}}
													bg={"#6B4EFF"}
													color={"white"}
												>
													{moimExample.min}
												</RangeSliderThumb>
												<RangeSliderThumb
													boxSize={6}
													index={1}
													_disabled={{
														bg: "#6B4EFF",
													}}
													bg={"#6B4EFF"}
													color={"white"}
												>
													{moimExample.max}
												</RangeSliderThumb>
											</RangeSlider>
											<FormHelperText>
												{moimExample.min}명이 모이면 모임이 시작될 수 있어요!
											</FormHelperText>
											<FormHelperText>
												{moimExample.max}명까지 모임에 참여할 수 있어요.
											</FormHelperText>
										</FormControl>
									</Stack>
								</VStack>
							</Stack>
						</CardBody>
					</Card>
				</Stack>
				<VStack w={"100%"} spacing={12} p={6}>
					<Stack w={"100%"}>
						<Heading size={"md"} alignSelf={"flex-start"}>
							모임장
						</Heading>
						<HStack w={"100%"} justifyContent={"space-between"}>
							<HStack>
								<Image
									src={moimExample.owner.avatar}
									borderRadius={"50%"}
									width={"40px"}
									height={"40px"}
								></Image>
								<VStack alignItems={"flex-start"} spacing={0} pl={1}>
									<Text>{moimExample.owner.username}</Text>
								</VStack>
							</HStack>
						</HStack>
					</Stack>
					<Stack w={"100%"}>
						<Heading size={"md"} alignSelf={"flex-start"}>
							목표 금액
						</Heading>
						<FormControl>
							<InputGroup w={"fit-content"}>
								<Input
									type="text"
									value={moimExample.targetAmount
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									readOnly
								/>
								<InputRightAddon children="원" />
							</InputGroup>

							<FormHelperText>리더에게 지불되는 금액입니다.</FormHelperText>
						</FormControl>
					</Stack>
					<Stack w={"100%"}>
						<Heading size={"md"} alignSelf={"flex-start"}>
							모임 리더
						</Heading>
						{moimExample.hasLeader ? (
							<>
								<HStack w={"100%"} justifyContent={"space-between"}>
									<HStack>
										<Image
											src={moimExample.leader?.avatar}
											borderRadius={"50%"}
											width={"40px"}
											height={"40px"}
										></Image>
										<VStack alignItems={"flex-start"} spacing={0} pl={1}>
											<Text>{moimExample.leader?.username}</Text>
										</VStack>
									</HStack>
									<Link
										as={RouterLink}
										to={`apply-leader/${moimExample.leader.leaderApplyId}`}
										_hover={{ textDecoration: "none" }}
									>
										<Button
											size={"xs"}
											bg={"#5538EE"}
											color={"white"}
											borderRadius={12}
											px={3}
										>
											리더 지원서 보기
										</Button>
									</Link>
								</HStack>
							</>
						) : moimExample.hasApplied ? (
							<HStack w={"100%"} justifyContent={"space-between"}>
								<HStack>
									<Heading size={"sm"}>아직 모임 리더가 없어요.</Heading>
								</HStack>
								<Link
									as={RouterLink}
									to={`apply-leader/${moimExample.leaderApplyId}`}
									_hover={{ textDecoration: "none" }}
								>
									<Button
										size={"xs"}
										bg={"#5538EE"}
										color={"white"}
										borderRadius={12}
										px={3}
									>
										지원서 수정 &rarr;
									</Button>
								</Link>
							</HStack>
						) : (
							<HStack w={"100%"} justifyContent={"space-between"}>
								<HStack>
									<Heading size={"sm"}>아직 모임 리더가 없어요.</Heading>
								</HStack>
								{
									<Link
										as={RouterLink}
										to={`apply-leader/create`}
										_hover={{ textDecoration: "none" }}
									>
										<Button
											size={"xs"}
											bg={"#5538EE"}
											color={"white"}
											borderRadius={12}
											px={3}
										>
											리더 지원하기 &rarr;
										</Button>
									</Link>
								}
							</HStack>
						)}
					</Stack>
					<Stack w={"100%"}>
						<Heading size={"md"} alignSelf={"flex-start"}>
							형식과 주제
						</Heading>
						<HStack>
							{moimExample.moimTypes.map((moimType, key) => (
								<Tag
									borderRadius={100}
									fontSize={"xs"}
									key={key}
									bg={"#6B4EFF"}
									color={"white"}
								>
									#{moimType}
								</Tag>
							))}
							{moimExample.topics.map((topic, key) => (
								<Tag borderRadius={100} fontSize={"xs"} key={key}>
									#{topic}
								</Tag>
							))}
						</HStack>
					</Stack>
					<Stack w={"100%"}>
						<Heading size={"md"} alignSelf={"flex-start"}>
							모임 설명
						</Heading>
						<Text>{moimExample.description}</Text>
					</Stack>
				</VStack>
			</Grid>
		</VStack>
	);
};

export const MoimOwner = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	interface ILeaderSetModalProps {
		id: number;
		username: string;
	}

	const LeaderSetModal = ({ id, username }: ILeaderSetModalProps) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		return (
			<>
				<Button
					position={"absolute"}
					right={0}
					variant={"link"}
					color={"#6B4EFF"}
					onClick={onOpen}
				>
					지정
				</Button>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>리더 지정</ModalHeader>
						<ModalCloseButton />
						<ModalBody borderRadius={15} as={VStack}>
							<Heading size={"md"}>
								{username}님을 리더로 지정하시겠어요?
							</Heading>
							<Text color={"#72777A"}>지정 후에는 되돌릴 수 없어요.</Text>
						</ModalBody>

						<ModalFooter as={VStack}>
							<StyledButton btnName={"취소"} />
							<Button variant={"link"} color={"#6B4EFF"} py={3}>
								지정
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		);
	};

	const crewJoinListExample = [
		{
			id: 1,
			owner: {
				id: 1,
				avatar: "/logo.png",
				username: "김크루",
			},
			description: "열심히핳게요!",
		},
		{
			id: 2,
			owner: {
				id: 2,
				avatar: "/logo.png",
				username: "박크루",
			},
			description: "열심히핳게요!",
		},
		{
			id: 3,
			owner: {
				id: 3,
				avatar: "/logo.png",
				username: "모크루",
			},
			description: "열심히핳게요! 공부하고시퍼요",
		},
	];

	const leaderApplyListExample = [
		{
			id: 1,
			owner: {
				id: 1,
				avatar: "/logo.png",
				username: "김크루",
			},
			description: "열심히핳게요!",
			portfolios: [
				{
					id: 1,
					title: "포폴 1",
					description: "포폴포폴포폴",
					url: "http://naver.com",
				},
				{
					id: 2,
					title: "포폴 2",
					description: "포폴포폴포폴",
					url: "http://naver.com",
				},
			],
		},
		{
			id: 2,
			owner: {
				id: 2,
				avatar: "/logo.png",
				username: "김크루",
			},
			description: "열심히핳게요!",
			portfolios: [
				{
					id: 1,
					title: "포폴 1",
					description: "포폴포폴포폴",
					url: "http://naver.com",
				},
				{
					id: 2,
					title: "포폴 2",
					description: "포폴포폴포폴",
					url: "http://naver.com",
				},
				{
					id: 3,
					title: "포폴 3",
					description: "포폴포폴포폴",
					url: "http://naver.com",
				},
			],
		},
	];

	return (
		<VStack>
			<SubHeader headerTitle={"모임 관리"} />
			<VStack pt={12} w={"100%"} spacing={3}>
				<Tabs
					isFitted
					_selected={{ color: "white", bg: '"#6B4EFF"' }}
					w={"100%"}
				>
					<TabList mb="1em">
						<Tab>크루 신청서 보기</Tab>
						<Tab>리더 지원서 보기</Tab>
					</TabList>
					<TabPanels>
						<TabPanel px={0}>
							<Heading size={"md"} pb={3}>
								현재 참가 신청한 크루 : {crewJoinListExample.length}명
							</Heading>
							<VStack
								spacing={5}
								maxH={"350px"}
								overflow={"hidden"}
								overflowY={"scroll"}
								border={"1px solid #DEE3EE"}
								borderRadius={6}
							>
								<Divider />
								{crewJoinListExample.map((crewJoin) => (
									<>
										<HStack
											justifyContent={"space-between"}
											key={crewJoin.id}
											width={"100%"}
											px={6}
										>
											<VStack alignItems={"flex-start"}>
												<Text>{crewJoin.owner.username}</Text>
												<Text fontSize={"sm"} color={"#72777A"}>
													{crewJoin.description}
												</Text>
											</VStack>
										</HStack>
										<Divider />
									</>
								))}
							</VStack>
							<Divider pb={6} />
							<StyledButton btnName={"펀딩 종료하기"} />
						</TabPanel>
						<TabPanel px={0}>
							<Heading size={"md"} pb={3}>
								현재 지원한 리더 : {leaderApplyListExample.length}명
							</Heading>
							<VStack spacing={5} pt={3}>
								{leaderApplyListExample.map((leaderApply) => (
									<>
										<HStack
											justifyContent={"space-between"}
											key={leaderApply.id}
											width={"100%"}
										>
											<VStack alignItems={"flex-start"} w={"100%"}>
												<VStack
													alignItems={"flex-start"}
													w={"100%"}
													position={"relative"}
												>
													<Text>{leaderApply.owner.username}</Text>
													<Text fontSize={"sm"} color={"#72777A"}>
														{leaderApply.description}
													</Text>
													<LeaderSetModal
														id={leaderApply.owner.id}
														username={leaderApply.owner.username}
													/>
												</VStack>
												<Accordion allowToggle w={"100%"}>
													<AccordionItem>
														<h2>
															<AccordionButton w={"100%"} minW={"327px"}>
																<Box flex="1" textAlign="left">
																	{leaderApply.owner.username}의 포트폴리오 보기
																</Box>
																<AccordionIcon />
															</AccordionButton>
														</h2>
														<AccordionPanel pb={4} px={0}>
															<VStack>
																{leaderApply.portfolios.map((portfolio) => (
																	<PortfolioCard
																		key={portfolio.id}
																		id={portfolio.id}
																		title={portfolio.title}
																		description={portfolio.description}
																		url={portfolio.url}
																		viewOnly={true}
																	/>
																))}
															</VStack>
														</AccordionPanel>
													</AccordionItem>
												</Accordion>
											</VStack>
										</HStack>
										<Divider />
									</>
								))}
							</VStack>
							<HStack w={"100%"}></HStack>
							<Divider />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</VStack>
		</VStack>
	);
};
