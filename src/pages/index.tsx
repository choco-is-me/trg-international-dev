import { GetStaticProps } from "next";
import { client } from "@/lib/apollo-client";
import { GET_PAGE_WITH_HERO } from "@/lib/queries";
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

export default function HomePage({ page }: PageProps) {
	if (!page) {
		return (
			<Layout>
				<div className="container mx-auto py-8 px-4 text-center">
					<h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
					<p>The main page could not be found.</p>
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
				{/* Remove the h1 title that was here */}
				{page.content && (
					<div dangerouslySetInnerHTML={{ __html: page.content }} />
				)}
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		// Hard-code the URI to "main-page" since this is specifically for the home page
		const uri = "/main-page";

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
		console.error("Error fetching main page data:", error);
		return {
			notFound: true,
		};
	}
};
