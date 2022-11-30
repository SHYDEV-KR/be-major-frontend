export interface Imoim {
	id: number;
	title: string;
	moim_types: string[];
	topics: string[];
	min_participants: number;
	current_number_of_participants: number;
	expiration_date: string;
	has_leader: boolean;
}

export interface ImoimDetail {
	id: number;
	title: string;
	owner: {
		user: string;
		avatar: string;
	};
	moim_types: string[];
	topics: string[];
	description: string;
	leader?: {
		user: string;
		avatar: string;
	};
	leader_apply_id?: number;
	target_amount: number;
	current_number_of_participants: number;
	min_participants: number;
	max_participants: number;
	total_moim_times: number;
	first_date: string;
	expiration_date: string;
	is_online: boolean;
	location: string;
	my_crew_join_id: number;
	my_leader_apply_id: number;
	is_crew: boolean;
	is_owner: boolean;
	is_leader: boolean;
	is_closed: boolean;
	has_applied: boolean;
	has_leader: boolean;
}

export interface IMoimCardProps {
	id: number;
	hasLeader: Boolean;
	title: string;
	moimTypes: string[];
	topics: string[];
	leader?: {};
	current: number;
	min: number;
	expirationDate: string;
}

export interface IMoimCardNoImageProps {
	id: number;
	hasLeader: Boolean;
	isClosed: Boolean;
	title: string;
	moimTypes: string[];
	topics: string[];
	leader?: {};
	expirationDate: string;
	current: number;
	min: number;
	hasApplied: Boolean;
	isCrew: Boolean;
	isLeader: Boolean;
	isOwner: Boolean;
	typeOfPage: string;
}

export interface Iportfolio {
	id: number;
	title: string;
	short_description: string;
	url: string;
	is_owner: boolean;
}

export interface IleaderApply {
	id: number;
	description: string;
	owner: {
		id: number;
		avatar: string;
		user: string;
	};
	portfolios: Iportfolio[];
}

export interface IcrewJoin {
	id: number;
	description: string;
	owner: {
		id: number;
		avatar: string;
		user: string;
	};
}

export interface ImoimOwnerDetail extends ImoimDetail {
	joined_crews: IcrewJoin[];
	applied_leaders: IleaderApply[];
}
