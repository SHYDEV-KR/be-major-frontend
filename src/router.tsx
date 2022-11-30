import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import { Signup } from "./routes/Signup";
import NotFound from "./routes/NotFound";
import { Signin } from "./routes/Signin";
import { ResetPassword } from "./routes/ResetPassword";
import { MoimRoot, MoimCreate, MoimDetail, MoimOwner } from "./routes/Moims";
import {
	ApplyLeaderCreate,
	ApplyLeaderDetail,
	ApplyLeaderEdit,
} from "./routes/ApplyLeader";
import { CrewJoinCreate, CrewJoinEdit } from "./routes/CrewJoin";
import {
	PortfolioRoot,
	PortfolioCreate,
	PortfolioEdit,
} from "./routes/Portfolios";
import {
	MyProfileRoot,
	MyProfile,
	MyPortfolioList,
	MyMoimListAsCrew,
	MyMoimListAsLeader,
	MyMoimListAsOwner,
} from "./routes/MyProfile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{
				element: <Home />,
				path: "",
			},
			{
				element: <Signup />,
				path: "signup",
			},
			{
				element: <Signin />,
				path: "signin",
			},
			{
				element: <ResetPassword />,
				path: "reset-password",
			},
			{
				element: <MoimRoot />,
				path: "moims",
				children: [
					{
						path: "create",
						element: <MoimCreate />,
					},
					{
						path: ":moimId",
						element: <MoimDetail />,
					},
					{
						path: ":moimId/owner",
						element: <MoimOwner />,
					},
					{
						path: ":moimId/apply-leader/create",
						element: <ApplyLeaderCreate />,
					},
					{
						path: ":moimId/apply-leader/:leaderApplyId",
						element: <ApplyLeaderDetail />,
					},
					{
						path: ":moimId/apply-leader/:leaderApplyId/edit",
						element: <ApplyLeaderEdit />,
					},
					{
						path: ":moimId/crew-join/create",
						element: <CrewJoinCreate />,
					},
					{
						path: ":moimId/crew-join/:crewJoinId/edit",
						element: <CrewJoinEdit />,
					},
				],
			},
			{
				path: "portfolios",
				element: <PortfolioRoot />,
				children: [
					{
						path: "create",
						element: <PortfolioCreate />,
					},
					{
						path: ":portfolioId/edit",
						element: <PortfolioEdit />,
					},
				],
			},
			{
				path: "my-profile",
				element: <MyProfileRoot />,
				children: [
					{
						path: "",
						element: <MyProfile />,
					},
					{
						path: "portfolios",
						element: <MyPortfolioList />,
					},
					{
						path: "moims/crew",
						element: <MyMoimListAsCrew />,
					},
					{
						path: "moims/leader",
						element: <MyMoimListAsLeader />,
					},
					{
						path: "moims/owner",
						element: <MyMoimListAsOwner />,
					},
				],
			},
		],
	},
	{
		path: "not-found",
		element: <NotFound />,
	},
]);

export default router;
