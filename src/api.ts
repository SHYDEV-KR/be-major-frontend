import axios from "axios";
import { QueryFunctionContext } from "@tanstack/query-core";
import Cookie from "js-cookie";

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://127.0.0.1:8000/api/v1/"
			: "https://be-major.onrender.com/api/v1/",
	withCredentials: true,
});

export const getHome = () =>
	instance.get("moims").then((response) => response.data);

export const getMoim = ({ queryKey }: QueryFunctionContext) => {
	const [_, moimId] = queryKey;

	return instance.get(`moims/${moimId}`).then((response) => response.data);
};

export const getMoimOwner = ({ queryKey }: QueryFunctionContext) => {
	const [_, moimId] = queryKey;

	return instance
		.get(`moims/${moimId}/owner`)
		.then((response) => response.data);
};

export const getMyProfile = () =>
	instance.get(`users/my-profile`).then((response) => response.data);

export const getMyPortfolios = () => {
	return instance
		.get(`users/my-profile/urls`)
		.then((response) => response.data);
};

export const getPortfolio = (portfolioId: string) => {
	return instance
		.get(`portfolios/urls/${portfolioId}`)
		.then((response) => response.data);
};

export const getEditLeaderApply = () => {
	return instance
		.get(`users/my-profile/urls`)
		.then((response) => response.data);
};

export const signout = () =>
	instance
		.get(`users/log-out`, {
			headers: {
				"X-CSRFToken": Cookie.get("csrftoken") || "",
			},
		})
		.then((response) => response.data);

export const getMyMoimListAsLeader = () => {
	return instance
		.get(`users/my-profile/moims/leader`)
		.then((response) => response.data);
};

export const getMyMoimListAsCrew = () => {
	return instance
		.get(`users/my-profile/moims/crew`)
		.then((response) => response.data);
};

export const getMyMoimListAsOwner = () => {
	return instance
		.get(`users/my-profile/moims/owner`)
		.then((response) => response.data);
};

export const getCrewJoin = (crewJoinId: string) => {
	return instance
		.get(`moims/crew-join/${crewJoinId}`)
		.then((response) => response.data);
};

export const getLeaderApply = (leaderApplyId: string) => {
	return instance
		.get(`moims/leader-apply/${leaderApplyId}`)
		.then((response) => response.data);
};

export interface IPhoneNumberLoginVariables {
	phone_number: string;
	password: string;
}

export const phoneNumberLogIn = ({
	phone_number,
	password,
}: IPhoneNumberLoginVariables) =>
	instance
		.post(
			`/users/log-in`,
			{ phone_number, password },
			{
				headers: {
					"X-CSRFToken": Cookie.get("csrftoken") || "",
				},
			}
		)
		.then((response) => response.data);

export const postSMSAuth = (phone_number: string) =>
	instance
		.post(
			`/users/sms-auth/`,
			{ phone_number },
			{
				headers: {
					"X-CSRFToken": Cookie.get("csrftoken") || "",
				},
			}
		)
		.then((response) => response.data);

export const verifySMSAuthCode = async (
	phone_number: string,
	auth_code: string
) => {
	try {
		const response = await instance.get(
			`/users/sms-auth/?phone_number=${phone_number}&auth_number=${auth_code}`,
			{
				headers: {
					"X-CSRFToken": Cookie.get("csrftoken") || "",
				},
			}
		);
		return response.data;
	} catch (error) {
		return "error";
	}
};

export interface ISignUpVariables {
	username: string;
	phone_number: string;
	password: string;
	auth_code: string;
}

export const postSignUp = ({
	username,
	phone_number,
	password,
	auth_code,
}: ISignUpVariables) =>
	instance
		.post(
			`/users/join`,
			{ username, phone_number, password, auth_code },
			{
				headers: {
					"X-CSRFToken": Cookie.get("csrftoken") || "",
				},
			}
		)
		.then((response) => response.data);

interface ICrewJoinVariable {
	description: string;
	moimId: string;
}

export const postCrewJoin = ({ description, moimId }: ICrewJoinVariable) =>
	instance
		.post(
			`/moims/${moimId}/crew-join`,
			{ description },
			{
				headers: {
					"X-CSRFToken": Cookie.get("csrftoken") || "",
				},
			}
		)
		.then((response) => response.data);

export interface IMoimVariables {
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
	owner: number;
}

export const postMoim = ({
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
	owner,
}: IMoimVariables) => {
	return instance
		.post(
			`/moims/`,
			{
				title,
				topics: [topics],
				moim_types: [moim_types],
				description,
				target_amount: Number(target_amount),
				min_participants: Number(min_participants),
				max_participants: Number(max_participants),
				first_date,
				total_moim_times,
				is_online,
				location,
				expiration_date,
				owner: { id: owner },
			},
			{
				headers: {
					"X-CSRFToken": Cookie.get("csrftoken") || "",
					"Content-Type": "application/json",
				},
			}
		)
		.then((response) => response.data);
};
