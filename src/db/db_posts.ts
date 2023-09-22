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
		blogId: "01",
		blogName: "Peet"
	},
	{
		id: "2",
		title: "Back-end_developer",
		shortDescription: "Freelance",
		content: "In short time make your site",
		blogId: "02",
		blogName: "John"
	},
	{
		id: "3",
		title: "DevOps",
		shortDescription: "Freelancer",
		content: "I like my job",
		blogId: "03",
		blogName: "Mickle"
	},
]