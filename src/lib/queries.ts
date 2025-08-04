import { gql } from "@apollo/client";

export const GET_PAGE_WITH_HERO = gql`
	query GetPageWithHero($uri: ID!) {
		page(id: $uri, idType: URI) {
			id
			title
			content
			heroBanner {
				heroImage {
					node {
						id
						sourceUrl
						altText
					}
				}
				title
				description
				ctaButtonText
				ctaButtonUrl
			}
		}
	}
`;

export const GET_ALL_PAGES = gql`
	query GetAllPages {
		pages(first: 100) {
			nodes {
				uri
			}
		}
	}
`;

export const GET_MAIN_MENU = gql`
	query GetMainMenu {
		menu(id: "trg-international-menu", idType: NAME) {
			menuItems {
				nodes {
					id
					label
					url
					path
					parentId
					childItems {
						nodes {
							id
							label
							url
							path
						}
					}
				}
			}
		}
	}
`;

export const GET_FOOTER_MENU = gql`
	query GetFooterMenu {
		menu(id: "trg-international-menu", idType: NAME) {
			menuItems {
				nodes {
					id
					label
					url
					path
				}
			}
		}
	}
`;
