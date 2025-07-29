import React from "react";
import HeroBanner from "@/components/blocks/HeroBanner";
// Import other block components as needed

// Define specific types for each block
interface HeroBannerBlock {
	type: "hero_banner";
	attributes: {
		heroImage: string;
		heroTitle: string;
		heroDescription: string;
		ctaText: string;
		ctaUrl: string;
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
								heroImage={block.attributes.heroImage}
								heroTitle={block.attributes.heroTitle}
								heroDescription={
									block.attributes.heroDescription
								}
								ctaText={block.attributes.ctaText}
								ctaUrl={block.attributes.ctaUrl}
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
