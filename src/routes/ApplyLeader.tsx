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
	Text,
	VStack,
} from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Textarea } from "@chakra-ui/textarea";
import { Children, useEffect } from "react";
import { PortfolioCard } from "../components/PortfolioCard";
import StyledButton from "../components/StyledButton";
import { SubHeader } from "../components/SubHeader";

interface IApplyLeaderForm {
	portfolioList: {
		id: number;
		title: string;
		url: string;
	}[];
}

const ApplyLeaderForm = ({ portfolioList }: IApplyLeaderForm) => {
	return (
		<VStack spacing={3}>
			<Heading size={"md"}>리더 지원서 작성하기</Heading>
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
							<>
								<HStack
									justifyContent={"space-between"}
									key={portfolio.id}
									width={"100%"}
									px={6}
								>
									<VStack alignItems={"flex-start"}>
										<Text>{portfolio.title}</Text>
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
							</>
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

const PortfolioListExample = [
	{
		id: 1,
		title: "title1",
		url: "http://naver.com",
	},
	{
		id: 2,
		title: "title2",
		url: "http://google.com",
	},
	{
		id: 3,
		title: "title3",
		url: "http://naver.com",
	},
	{
		id: 4,
		title: "title4",
		url: "http://google.com",
	},
	{
		id: 5,
		title: "title5",
		url: "http://naver.com",
	},
	{
		id: 6,
		title: "title6",
		url: "http://google.com",
	},
];

export const ApplyLeaderCreate = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<VStack>
			<ApplyLeaderForm portfolioList={PortfolioListExample} />
			<StyledButton btnName={"지원서 제출하기"} />
		</VStack>
	);
};

export const ApplyLeaderDetail = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const leaderApplyExample = {
		id: 1,
		moim: 1,
		owner: {
			username: "류지현",
			avatar: "/logo.png",
		},
		description:
			"열심히 하겠습니다 꼭 뽑아주십쇼! 첫눈에 반한다는 소설같은 이야기 요즘 누가 믿나요. 내 포폴입니다. 드디어 찾아온, 포폴이다~~~~ 그냥 느낌으로 알아 말도 안되지만 이 순간만을 위해 살아온 것같아~~첫눈에 반한다는 소설같은 이야기 요즘 누가 믿나요. 내 포폴입니다. 드디어 찾아온, 포폴이다~~~~ 그냥 느낌으로 알아 말도 안되지만 이 순간만을 위해 살아온 것같아~~첫눈에 반한다는 소설같",
		portfolios: [
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
		],
	};

	return (
		<VStack spacing={6}>
			<SubHeader
				headerTitle={`${leaderApplyExample.owner.username}님의 리더 지원서`}
			/>
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
					<Textarea value={leaderApplyExample.description} width={"100%"} />
				</VStack>
				<VStack>
					<Heading size={"md"} alignSelf={"flex-start"}>
						제출한 포트폴리오
					</Heading>
					{leaderApplyExample.portfolios.map((portfolio) => (
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
			</Grid>
		</VStack>
	);
};

export const ApplyLeaderEdit = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<VStack>
			<ApplyLeaderForm portfolioList={PortfolioListExample} />
			<StyledButton btnName={"수정하기"} />
			<StyledButton
				btnName={"지원 취소하기"}
				themeColor={"#E3E5E5"}
				btnNameColor={"red"}
			/>
		</VStack>
	);
};
