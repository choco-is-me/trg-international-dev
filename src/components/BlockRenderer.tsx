import React from "react";
import HeroBanner from "@/components/blocks/HeroBanner";
// Import other block components as needed

// Define specific types for each block based on the actual GraphQL response
interface HeroBannerBlock {
	type: "hero_banner";
	attributes: {
		heroImage: {
			node: {
				id: string;
				sourceUrl: string;
				altText: string;
			};
		};
		title: string;
		description: string;
		ctaButtonText: string;
		ctaButtonUrl: string;
	};
}

// Union type of all possible block types
type Block = HeroBannerBlock; // | OtherBlock | etc.

interface BlockRendererProps {
	blocks: Block[];
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
	if (!blocks || blocks.length === 0) {
		return null;
	}

	return (
		<>
			{blocks.map((block, index) => {
				switch (block.type) {
					case "hero_banner":
						return (
							<HeroBanner
								key={index}
								heroImage={
									block.attributes.heroImage.node.sourceUrl
								}
								imageAlt={
									block.attributes.heroImage.node.altText ||
									"Hero image"
								}
								title={block.attributes.title}
								description={block.attributes.description}
								ctaText={block.attributes.ctaButtonText}
								ctaUrl={block.attributes.ctaButtonUrl}
							/>
						);
					// Add other block types as needed
					default:
						// Type-safe exhaustive checking
						return null;
				}
			})}
		</>
	);
};

export default BlockRenderer;
