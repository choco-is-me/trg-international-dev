import React from "react";
import Image from "next/image";
import Link from "next/link";
import { convertWordPressUrlToNextPath } from "@/lib/utils";

interface HeroBannerProps {
	heroImage: string;
	imageAlt: string;
	title: string;
	description: string;
	ctaText: string;
	ctaUrl: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
	heroImage,
	imageAlt,
	title,
	description,
	ctaText,
	ctaUrl,
}) => {
	// Convert WordPress URL to Next.js path if needed
	const linkHref = ctaUrl.startsWith("http")
		? ctaUrl
		: convertWordPressUrlToNextPath(ctaUrl);

	return (
		<div className="relative w-full h-[500px] overflow-hidden">
			{/* Hero Image */}
			<div className="absolute inset-0">
				<Image
					src={heroImage}
					alt={imageAlt}
					fill
					className="object-cover"
					priority
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl">
					{title}
				</h1>
				<p className="text-xl text-white/90 mb-8 max-w-2xl">
					{description}
				</p>
				{ctaUrl && (
					<div>
						<Link
							href={linkHref}
							className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
							target={
								ctaUrl.startsWith("http") ? "_blank" : undefined
							}
							rel={
								ctaUrl.startsWith("http")
									? "noopener noreferrer"
									: undefined
							}
						>
							{ctaText || "Learn More"}
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default HeroBanner;
