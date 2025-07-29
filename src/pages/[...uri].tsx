import { GetStaticProps, GetStaticPaths } from "next";
import { client } from "@/lib/apollo-client";
import { GET_PAGE_WITH_HERO, GET_ALL_PAGES } from "@/lib/queries";
import Layout from "@/components/layout/Layout";
import HeroBanner from "@/components/blocks/HeroBanner";

interface PageProps {
	page: {
		title: string;
		content: string | null;
		heroBanner?: {
			heroImage?: {
				node?: {
					id: string;
					sourceUrl: string;
					altText: string;
				};
			};
			title?: string;
			description?: string;
			ctaButtonText?: string;
			ctaButtonUrl?: string;
		} | null;
	} | null;
}

export default function Page({ page }: PageProps) {
	if (!page) {
		return (
			<Layout>
				<div className="container mx-auto py-8 px-4 text-center">
					<h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
					<p>The requested page could not be found.</p>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			{page?.heroBanner?.heroImage?.node && (
				<HeroBanner
					heroImage={page.heroBanner.heroImage.node.sourceUrl}
					imageAlt={
						page.heroBanner.heroImage.node.altText ||
						page.heroBanner.title ||
						""
					}
					title={page.heroBanner.title || ""}
					description={page.heroBanner.description || ""}
					ctaText={page.heroBanner.ctaButtonText || ""}
					ctaUrl={page.heroBanner.ctaButtonUrl || ""}
				/>
			)}

			<div className="container mx-auto py-8 px-4">
				<h1 className="text-3xl font-bold mb-6">{page.title}</h1>
				{page.content && (
					<div dangerouslySetInnerHTML={{ __html: page.content }} />
				)}
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const uri = params?.uri ? `/${(params.uri as string[]).join("/")}` : "/";

	try {
		const { data } = await client.query({
			query: GET_PAGE_WITH_HERO,
			variables: { uri },
		});

		if (!data || !data.page) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				page: data.page,
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error("Error fetching page data:", error);
		return {
			notFound: true,
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		// Use the GET_ALL_PAGES query to fetch all page URIs
		const { data } = await client.query({
			query: GET_ALL_PAGES,
		});

		// Format the paths as required by Next.js
		const paths = data.pages.nodes.map((page: { uri: string }) => {
			// Remove leading slash and split by slashes to get path segments
			const segments = page.uri.replace(/^\/|\/$/g, "").split("/");
			return {
				params: { uri: segments.length > 0 ? segments : [""] },
			};
		});

		return {
			paths,
			fallback: "blocking", // Still generate unknown paths on demand
		};
	} catch (error) {
		console.error("Error fetching all pages:", error);
		return {
			paths: [],
			fallback: "blocking",
		};
	}
};
