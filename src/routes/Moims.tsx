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
	Container,
} from "@chakra-ui/layout";
import { Outlet, useNavigate, useParams } from "react-router";
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
	VisuallyHiddenInput,
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
	useToast,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMoim, getMoimOwner, postMoim } from "../api";
import { LoadingPage } from "../components/LoadingPage";
import { ImoimDetail, ImoimOwnerDetail } from "../types";
import useUserProfile from "../lib/useUserProfile";
import { useForm } from "react-hook-form";
import ProtectedPage from "../components/ProtectedPage";

export const MoimRoot = () => {
	return (
		<Box minW={"327px"}>
			<Outlet />
		</Box>
	);
};

interface IForm {
	title: string;
	topics: string;
	moim_types: string;
	description: string;
	target_amount: string;
	min_participants: number;
	max_participants: number;
	first_date: string;
	total_moim_times: number;
	is_online: boolean;
	location: string;
	expiration_date: string;
}

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

	const navigate = useNavigate();
	const toast = useToast();
	const { userLoading, isLoggedIn, user } = useUserProfile();

	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<IForm>();

	const mutation = useMutation(postMoim, {
		onSuccess: (data) => {
			toast({
				title: "?????? ?????? ??????!",
				status: "success",
			});
			navigate("/");
		},
		onError: (error) => {
			toast({
				title: "?????? ?????? ??????",
				status: "error",
			});
		},
	});

	const onSubmit = ({
		title,
		topics,
		moim_types,
		description,
		target_amount,
		min_participants,
		max_participants,
		first_date,
		total_moim_times,
		is_online,
		location,
		expiration_date,
	}: IForm) => {
		mutation.mutate({
			title,
			topics,
			moim_types,
			description,
			target_amount,
			min_participants,
			max_participants,
			first_date,
			total_moim_times,
			is_online,
			location,
			expiration_date,
			owner: user.id,
		});
	};

	const Base = ({ children }: IBaseProps) => (
		<ProtectedPage>
			<VStack>
				<SubHeader headerTitle={"?????? ????????????"} />
				<VStack pt={12} w={"100%"} spacing={3}>
					{children}
				</VStack>
			</VStack>
		</ProtectedPage>
	);

	const Step1 = () => {
		useEffect(() => {
			window.scrollTo(0, 0);
		}, []);

		return (
			<>
				<Heading size="md" alignSelf={"flex-start"} pt={6}>
					?????? ????????????
				</Heading>
				<FormControl>
					<FormLabel>?????? ??????</FormLabel>
					<Input
						type="text"
						maxLength={20}
						placeholder={"?????? ??????"}
						isInvalid={Boolean(errors.title?.message)}
						{...register("title", {
							required: "?????? ????????? ??????????????????.",
						})}
					/>
					<FormHelperText>?????? 20????????? ?????? ???????????????.</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>?????? ??????</FormLabel>
					<Select
						placeholder="?????? ?????? ??????"
						isInvalid={Boolean(errors.topics?.message)}
						{...register("topics", {
							required: "?????? ????????? ??????????????????.",
						})}
					>
						{[
							"?????????",
							"IT?????????????????",
							"??????????????????????",
							"?????????",
							"???????????????",
							"????????????",
							"??????",
							"?????????",
							"??????",
						].map((topic, id) => (
							<option value={topic} key={id}>
								{topic}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>?????? ??????</FormLabel>
					<Select
						placeholder="?????? ?????? ??????"
						isInvalid={Boolean(errors.moim_types?.message)}
						{...register("moim_types", {
							required: "?????? ????????? ??????????????????.",
						})}
					>
						{["?????????", "???????????????", "?????????", "??????"].map((moimType, id) => (
							<option value={moimType} key={id}>
								{moimType}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>?????? ??????</FormLabel>
					<Textarea
						placeholder="????????? ?????? ??? ????????? ?????? ????????? ??????"
						isInvalid={Boolean(errors.description?.message)}
						{...register("description", {
							required: "?????? ????????? ????????????.",
						})}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>?????? ??????</FormLabel>
					<InputGroup>
						<Input
							type="number"
							placeholder={"?????? ??????"}
							isInvalid={Boolean(errors.target_amount?.message)}
							{...register("target_amount", {
								required: "?????? ????????? ????????????.",
							})}
						/>
						<InputRightAddon children="???" />
					</InputGroup>
					<FormHelperText>
						?????? ???????????? ????????? ?????? ????????? ??????????????????.
					</FormHelperText>
				</FormControl>
				<ButtonGroup
					gap="4"
					w={"100%"}
					display={"grid"}
					gridTemplateColumns={"1fr 1fr"}
				>
					<Button
						borderRadius={150}
						bg="#6B4EFF"
						color={"white"}
						isDisabled
						_disabled={disabledBtnStyle}
					>
						&larr; ??????
					</Button>
					<Button
						borderRadius={150}
						bg="#6B4EFF"
						color={"white"}
						onClick={() => {
							if (
								!getValues([
									"title",
									"description",
									"target_amount",
									"topics",
									"moim_types",
								]).includes("")
							)
								nextStep();
						}}
					>
						?????? &rarr;
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
					????????? ??????
				</Heading>
				<FormControl>
					<FormLabel>?????? / ?????? ?????? ??????</FormLabel>
					<RangeSlider
						defaultValue={[1, 10]}
						min={1}
						max={20}
						step={1}
						onChangeEnd={([min, max]) => {
							setParticipantLimit({ min: min, max: max });
							setValue("min_participants", min);
							setValue("max_participants", max);
						}}
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
						??????????????? ???????????? ????????? ????????? ??? ????????????.
					</FormHelperText>
					<VisuallyHiddenInput
						type={"number"}
						{...register("min_participants", {
							required: "?????? ????????? ??????????????????.",
						})}
						value={participantsLimit.min}
					/>
					<VisuallyHiddenInput
						type={"number"}
						{...register("max_participants", {
							required: "?????? ????????? ??????????????????.",
						})}
						value={participantsLimit.max}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>??? ??????</FormLabel>
					<Input
						type="date"
						isInvalid={Boolean(errors.first_date?.message)}
						{...register("first_date", {
							required: "??? ?????? ????????? ??????????????????.",
						})}
					/>
					<FormHelperText>?????? ????????? ?????? ????????? ??????????????????.</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>?????? ??????</FormLabel>
					<Slider
						id="slider"
						defaultValue={1}
						min={1}
						max={8}
						onChange={(v) => {
							setSliderValue(v);
							setValue("total_moim_times", v);
						}}
					>
						<SliderTrack>
							<SliderFilledTrack bg="#6B4EFF" />
						</SliderTrack>
						<SliderThumb bg="#6B4EFF" color={"white"} boxSize={6}>
							{sliderValue}
						</SliderThumb>
					</Slider>
					<FormHelperText>
						????????? ???????????? ?????? ????????? ??????????????????.
					</FormHelperText>
				</FormControl>
				<FormControl>
					<FormLabel>??????</FormLabel>
					<Checkbox colorScheme="green" {...register("is_online")}>
						????????? ???????????????.
					</Checkbox>
					<Input
						placeholder="??????(??????, ?????? ???) / ????????? ?????? ??????(Zoom ???)"
						isInvalid={Boolean(errors.location?.message)}
						{...register("location", {
							required: "?????? ????????? ??????????????????.",
						})}
					/>
					<FormHelperText>?????? ????????? ???????????????.</FormHelperText>
				</FormControl>
				<ButtonGroup
					gap="4"
					w={"100%"}
					display={"grid"}
					gridTemplateColumns={"1fr 1fr"}
				>
					<Button
						borderRadius={150}
						bg="#6B4EFF"
						color={"white"}
						onClick={prevStep}
					>
						&larr; ??????
					</Button>
					<Button
						borderRadius={150}
						bg="#6B4EFF"
						color={"white"}
						onClick={() => {
							if (
								!getValues([
									"location",
									"is_online",
									"total_moim_times",
									"min_participants",
									"max_participants",
									"first_date",
								]).includes("")
							)
								nextStep();
						}}
					>
						?????? &rarr;
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
					?????? ????????????
				</Heading>
				<FormControl>
					<FormLabel>?????? ?????????</FormLabel>
					<Input
						type="date"
						isInvalid={Boolean(errors.expiration_date?.message)}
						{...register("expiration_date", {
							required: "?????? ????????? ????????? ????????? ??????????????????.",
						})}
					/>
					<FormHelperText>????????? ????????? ????????? ???????????????.</FormHelperText>
				</FormControl>
				<ButtonGroup
					gap="4"
					w={"100%"}
					display={"grid"}
					gridTemplateColumns={"1fr 1fr"}
				>
					<Button
						borderRadius={150}
						bg="#6B4EFF"
						color={"white"}
						onClick={prevStep}
					>
						&larr; ??????
					</Button>
					<Button
						borderRadius={150}
						bg="#6B4EFF"
						color={"white"}
						isDisabled
						_disabled={disabledBtnStyle}
					>
						?????? &rarr;
					</Button>
				</ButtonGroup>
				<VStack py={6}>
					<StyledButton
						btnName={"?????? ????????????"}
						hasArrow={true}
						onClick={handleSubmit(onSubmit)}
						isLoading={mutation.isLoading}
					/>
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
	const { moimId } = useParams();
	const { isLoading, error, data } = useQuery<ImoimDetail>(
		[`moims`, moimId],
		getMoim
	);
	const { user, userLoading, isLoggedIn } = useUserProfile();

	const remainingDays = (date: string) =>
		Math.ceil(
			(new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
		);

	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading) return <LoadingPage />;
	else
		return (
			<VStack>
				<Heading size={"md"}>?????? ????????????</Heading>
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
						<Heading size={"sm"}>
							???????????? {remainingDays(data?.expiration_date)}???
						</Heading>
						{data?.min_participants - data?.current_number_of_participants >
						0 ? (
							<Heading size={"sm"}>
								<Highlight
									query={`${
										data?.min_participants -
										data?.current_number_of_participants
									}??? ????????????`}
									styles={{ color: "#6B4EFF" }}
								>
									{`?????? ???????????? ${
										data?.min_participants -
										data?.current_number_of_participants
									}??? ????????????`}
								</Highlight>
							</Heading>
						) : data?.max_participants -
								data?.current_number_of_participants !==
						  0 ? (
							<Heading size={"sm"}>
								<Highlight
									query={`${
										data?.max_participants -
										data?.current_number_of_participants
									}??? ????????????`}
									styles={{ color: "#6B4EFF" }}
								>
									{`?????? ???????????? ${
										data?.max_participants -
										data?.current_number_of_participants
									}??? ????????????`}
								</Highlight>
							</Heading>
						) : (
							<Heading size={"sm"}>
								<Highlight query={`???????????????!`} styles={{ color: "#6B4EFF" }}>
									{`?????? ????????? ???????????????!`}
								</Highlight>
							</Heading>
						)}
					</VStack>
					<VStack alignSelf={"center"} justifySelf={"flex-end"}>
						{data?.is_owner ? (
							<Link
								as={RouterLink}
								to={`owner`}
								_hover={{ textDecoration: "none" }}
							>
								<Button bg={"#6B4EFF"} color={"white"} borderRadius={100}>
									?????? ??????
								</Button>
							</Link>
						) : data?.is_leader || data?.has_applied ? (
							<Button
								bg={"#6B4EFF"}
								color={"white"}
								borderRadius={100}
								isDisabled
							>
								????????? ???????????????
							</Button>
						) : data?.is_crew ? (
							<Link
								as={RouterLink}
								to={`crew-join/${data?.my_crew_join_id}/edit`}
								_hover={{ textDecoration: "none" }}
							>
								<Button bg={"#6B4EFF"} color={"white"} borderRadius={100}>
									????????? ??????
								</Button>
							</Link>
						) : data?.is_closed ? (
							<Button
								bg={"#6B4EFF"}
								color={"white"}
								borderRadius={100}
								isDisabled
							>
								?????? ??????
							</Button>
						) : data?.max_participants -
								data?.current_number_of_participants !==
						  0 ? (
							<Button
								bg={"#6B4EFF"}
								color={"white"}
								borderRadius={100}
								onClick={() => {
									!isLoggedIn
										? navigate("/signin")
										: navigate("crew-join/create");
								}}
							>
								????????????
							</Button>
						) : (
							<Button
								bg={"#6B4EFF"}
								color={"white"}
								borderRadius={100}
								isDisabled
							>
								?????? ??????
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
								src={`/img/moim_thumbnails/${data?.topics[0]}.png`}
								alt={`${data?.topics[0]}`}
								borderRadius={15}
								boxSize={"sm"}
								maxH={48}
							/>
							<CardBody paddingTop={"16px"}>
								<Stack spacing="3">
									{data?.has_leader ? (
										<>
											<Heading size="sm" mt={"16px"}>
												{data?.title}
											</Heading>
										</>
									) : (
										<>
											<Heading size="sm">
												<Text fontSize={"sm"} color={"#6B4EFF"}>
													?????? ?????? ???
												</Text>
												{data?.title}
											</Heading>
										</>
									)}
									<HStack>
										{data?.moim_types.map((moimType, key) => (
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
										{data?.topics.map((topic, key) => (
											<Tag fontSize={"xs"} key={key} borderRadius={100}>
												#{topic}
											</Tag>
										))}
									</HStack>
									<Text fontSize={"sm"} color={"#6B4EFF"}>
										<>
											{Math.round(
												(data?.current_number_of_participants /
													data?.min_participants) *
													100
											)}
											% ?????? ??????(
											{remainingDays(data?.expiration_date)}??? ??????)
										</>
									</Text>
									<hr />
									<VStack w={"100%"} spacing={12} py={6}>
										<Stack w={"100%"}>
											<Heading size={"md"} alignSelf={"flex-start"}>
												1??? ?????? ??????
											</Heading>
											<FormControl>
												<InputGroup w={"fit-content"}>
													<Input
														type="text"
														value={`${Math.floor(
															data?.target_amount / data?.max_participants
														)
															.toString()
															.replace(
																/\B(?=(\d{3})+(?!\d))/g,
																","
															)} ~ ${Math.ceil(
															data?.target_amount / data?.min_participants
														)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
														readOnly
													/>
													<InputRightAddon children="???" />
												</InputGroup>

												<FormHelperText>
													?????? 1?????? ???????????? ?????? ~ ?????? ???????????????.
													<br />
													(?????? ????????? ?????? ?????? ??????)
												</FormHelperText>
											</FormControl>
										</Stack>
										<Stack w={"100%"}>
											<Heading size={"md"} alignSelf={"flex-start"}>
												????????? ??????
											</Heading>
											{data?.total_moim_times > 1 ? (
												<Stat>
													<Text
														fontWeight={"bold"}
													>{`${data?.first_date} / ??? ${data?.total_moim_times}???`}</Text>
													<StatHelpText>{`${data?.first_date}??? ??? ????????? ?????????, ??? ${data?.total_moim_times}??? ?????????.`}</StatHelpText>
												</Stat>
											) : (
												<Stat>
													<Text
														fontWeight={"bold"}
													>{`${data?.first_date}`}</Text>
													<StatHelpText>{`${data?.first_date}??? ????????? ?????????.`}</StatHelpText>
												</Stat>
											)}
											<Stat>
												{data?.is_online ? (
													<>
														<Text fontWeight={"bold"}>{`?????????`}</Text>
														<StatHelpText>{`??????????????? ???????????? ???????????????.`}</StatHelpText>
													</>
												) : (
													<>
														<Text
															fontWeight={"bold"}
														>{`${data?.location}`}</Text>
														<StatHelpText>{`${data?.location}?????? ????????? ?????????.`}</StatHelpText>
													</>
												)}
											</Stat>
										</Stack>
										<Stack w={"100%"}>
											<Heading size={"md"} alignSelf={"flex-start"}>
												?????? / ?????? ?????? ??????
											</Heading>
											<FormControl>
												<RangeSlider
													defaultValue={[
														data?.min_participants,
														data?.max_participants,
													]}
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
														{data?.min_participants}
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
														{data?.max_participants}
													</RangeSliderThumb>
												</RangeSlider>
												<FormHelperText>
													{data?.min_participants}?????? ????????? ????????? ????????? ???
													?????????!
												</FormHelperText>
												<FormHelperText>
													{data?.max_participants}????????? ????????? ????????? ???
													?????????.
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
								?????????
							</Heading>
							<HStack w={"100%"} justifyContent={"space-between"}>
								<HStack>
									<Image
										src={
											data.owner.avatar !== "" ? data.owner.avatar : "/logo.png"
										}
										borderRadius={"50%"}
										width={"40px"}
										height={"40px"}
									></Image>
									<VStack alignItems={"flex-start"} spacing={0} pl={1}>
										<Text>{data?.owner.user}</Text>
									</VStack>
								</HStack>
							</HStack>
						</Stack>
						<Stack w={"100%"}>
							<Heading size={"md"} alignSelf={"flex-start"}>
								?????? ??????
							</Heading>
							<FormControl>
								<InputGroup w={"fit-content"}>
									<Input
										type="text"
										value={data?.target_amount
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										readOnly
									/>
									<InputRightAddon children="???" />
								</InputGroup>

								<FormHelperText>???????????? ???????????? ???????????????.</FormHelperText>
							</FormControl>
						</Stack>
						<Stack w={"100%"}>
							<Heading size={"md"} alignSelf={"flex-start"}>
								?????? ??????
							</Heading>
							{data?.has_leader ? (
								<>
									<HStack w={"100%"} justifyContent={"space-between"}>
										<HStack>
											<Image
												src={
													data.leader.avatar !== ""
														? data.leader.avatar
														: "/logo.png"
												}
												borderRadius={"50%"}
												width={"40px"}
												height={"40px"}
											></Image>
											<VStack alignItems={"flex-start"} spacing={0} pl={1}>
												<Text>{data?.leader?.user}</Text>
											</VStack>
										</HStack>
										<Link
											as={RouterLink}
											to={`apply-leader/${data?.leader_apply_id}`}
											_hover={{ textDecoration: "none" }}
										>
											<Button
												size={"xs"}
												bg={"#5538EE"}
												color={"white"}
												borderRadius={12}
												px={3}
											>
												?????? ????????? ??????
											</Button>
										</Link>
									</HStack>
								</>
							) : data?.has_applied ? (
								<HStack w={"100%"} justifyContent={"space-between"}>
									<HStack>
										<Heading size={"sm"}>?????? ?????? ????????? ?????????.</Heading>
									</HStack>
									<Link
										as={RouterLink}
										to={`apply-leader/${data?.my_leader_apply_id}`}
										_hover={{ textDecoration: "none" }}
									>
										<Button
											size={"xs"}
											bg={"#5538EE"}
											color={"white"}
											borderRadius={12}
											px={3}
										>
											????????? ?????? &rarr;
										</Button>
									</Link>
								</HStack>
							) : (
								<HStack w={"100%"} justifyContent={"space-between"}>
									<HStack>
										<Heading size={"sm"}>?????? ?????? ????????? ?????????.</Heading>
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
												?????? ???????????? &rarr;
											</Button>
										</Link>
									}
								</HStack>
							)}
						</Stack>
						<Stack w={"100%"}>
							<Heading size={"md"} alignSelf={"flex-start"}>
								????????? ??????
							</Heading>
							<HStack>
								{data?.moim_types.map((moimType, key) => (
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
								{data?.topics.map((topic, key) => (
									<Tag borderRadius={100} fontSize={"xs"} key={key}>
										#{topic}
									</Tag>
								))}
							</HStack>
						</Stack>
						<Stack w={"100%"}>
							<Heading size={"md"} alignSelf={"flex-start"}>
								?????? ??????
							</Heading>
							<Text>{data?.description}</Text>
						</Stack>
					</VStack>
				</Grid>
			</VStack>
		);
};

export const MoimOwner = () => {
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
					??????
				</Button>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>?????? ??????</ModalHeader>
						<ModalCloseButton />
						<ModalBody borderRadius={15} as={VStack}>
							<Heading size={"md"}>
								{username}?????? ????????? ??????????????????????
							</Heading>
							<Text color={"#72777A"}>?????? ????????? ????????? ??? ?????????.</Text>
						</ModalBody>

						<ModalFooter as={VStack}>
							<StyledButton btnName={"??????"} />
							<Button variant={"link"} color={"#6B4EFF"} py={3}>
								??????
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		);
	};

	const { moimId } = useParams();
	const navigate = useNavigate();
	const { isLoggedIn } = useUserProfile();
	const { isLoading, data } = useQuery<ImoimOwnerDetail>({
		queryKey: [`moims`, moimId, `owner`],
		queryFn: getMoimOwner,
		retry: false,
		onError: () => {
			if (isLoggedIn) {
				navigate("/my-profile/moims/owner");
			} else {
				navigate(`/signin`);
			}
		},
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading) return <LoadingPage />;
	else
		return (
			<ProtectedPage>
				<VStack>
					<SubHeader headerTitle={"?????? ??????"} />
					<VStack pt={12} w={"100%"} spacing={3}>
						<Tabs
							isFitted
							_selected={{ color: "white", bg: '"#6B4EFF"' }}
							w={"100%"}
						>
							<TabList mb="1em">
								<Tab>?????? ????????? ??????</Tab>
								<Tab>?????? ????????? ??????</Tab>
							</TabList>
							<TabPanels>
								<TabPanel px={0}>
									<Heading size={"md"} pb={3}>
										?????? ?????? ????????? ?????? : {data?.joined_crews.length}???
									</Heading>
									<VStack
										spacing={5}
										h={"350px"}
										overflow={"hidden"}
										overflowY={"scroll"}
										border={"1px solid #DEE3EE"}
										borderRadius={6}
									>
										<Divider />
										{data?.joined_crews.map((crewJoin) => (
											<Container key={crewJoin.id}>
												<HStack
													justifyContent={"space-between"}
													width={"100%"}
													px={6}
													pb={3}
												>
													<VStack alignItems={"flex-start"}>
														<Text>{crewJoin.owner.user}</Text>
														<Text fontSize={"sm"} color={"#72777A"}>
															{crewJoin.description}
														</Text>
													</VStack>
												</HStack>
												<Divider />
											</Container>
										))}
									</VStack>
									<Divider pb={6} />
									<StyledButton btnName={"?????? ????????????"} />
								</TabPanel>
								<TabPanel px={0}>
									<Heading size={"md"} pb={3}>
										?????? ????????? ?????? : {data?.applied_leaders.length}???
									</Heading>
									<VStack spacing={5} pt={3}>
										{data?.applied_leaders.map((leaderApply) => (
											<Container key={leaderApply.id}>
												<HStack justifyContent={"space-between"}>
													<VStack alignItems={"flex-start"} w={"100%"}>
														<VStack
															alignItems={"flex-start"}
															w={"100%"}
															position={"relative"}
														>
															<Text>{leaderApply.owner.user}</Text>
															<Text fontSize={"sm"} color={"#72777A"}>
																{leaderApply.description}
															</Text>
															<LeaderSetModal
																id={leaderApply.owner.id}
																username={leaderApply.owner.user}
															/>
														</VStack>
														<Accordion allowToggle w={"100%"}>
															<AccordionItem>
																<h2>
																	<AccordionButton>
																		<Box flex="1" textAlign="left">
																			{leaderApply.owner.user}??? ??????????????? ??????
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
																				description={
																					portfolio.short_description
																				}
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
											</Container>
										))}
									</VStack>
									<Divider />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</VStack>
				</VStack>
			</ProtectedPage>
		);
};
