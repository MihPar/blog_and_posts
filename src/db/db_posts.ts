export type Obj = {
	id: string
	title: string
	shortDescription: string
	content: string
	blogId: string
	blogName: string
}

export const posts: Obj[] = [
	{
		id: "1",
		title: "Front-end_developer",
		shortDescription: "Freelancer",
		content: "I make web-site very well",
		blogId: "1",
		blogName: "Pet"
	},
	{
		id: "2",
		title: "Back-end_developer",
		shortDescription: "Freelance",
		content: "In short time make your site",
		blogId: "1",
		blogName: "Pet"
	},
	{
		id: "3",
		title: "DevOps",
		shortDescription: "Freelancer",
		content: "I like my job",
		blogId: "2",
		blogName: "John"
	},
]