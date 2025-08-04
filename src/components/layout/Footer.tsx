import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_FOOTER_MENU } from "@/lib/queries";

interface MenuItem {
	id: string;
	label: string;
	url: string;
	path: string;
}

const Footer: React.FC = () => {
	const { data, loading, error } = useQuery(GET_FOOTER_MENU);

	// Extract menu items from the data structure - fixed this line
	const menuItems = data?.menu?.menuItems?.nodes || [];

	return (
		<footer className="bg-primary text-white">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-xl font-bold mb-4">
							TRG International
						</h3>
						<p className="mb-4">
							Empowering businesses with innovative solutions
						</p>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">
							Quick Links
						</h4>
						<ul className="space-y-2">
							{loading ? (
								// Loading state
								<>
									<li className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2"></li>
									<li className="h-4 w-20 bg-white/10 rounded animate-pulse mb-2"></li>
								</>
							) : error ? (
								// Fallback links
								<>
									<li>
										<Link
											href="/"
											className="hover:underline"
										>
											Home
										</Link>
									</li>
									<li>
										<Link
											href="/about"
											className="hover:underline"
										>
											About Us
										</Link>
									</li>
								</>
							) : (
								// Dynamic menu items from WordPress
								menuItems.map((item: MenuItem) => (
									<li key={item.id}>
										<Link
											href={item.path || item.url}
											className="hover:underline"
										>
											{item.label}
										</Link>
									</li>
								))
							)}
						</ul>
					</div>

					{/* Other footer sections can remain static or be made dynamic as needed */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Services</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="/services/service1"
									className="hover:underline"
								>
									Service 1
								</Link>
							</li>
							<li>
								<Link
									href="/services/service2"
									className="hover:underline"
								>
									Service 2
								</Link>
							</li>
							<li>
								<Link
									href="/services/service3"
									className="hover:underline"
								>
									Service 3
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">
							Contact Us
						</h4>
						<address className="not-italic">
							<p>123 Street Name</p>
							<p>City, Country</p>
							<p className="mt-2">
								Email: info@trginternational.com
							</p>
							<p>Phone: +1 234 567 8901</p>
						</address>
					</div>
				</div>

				<div className="border-t border-white/20 mt-8 pt-8 text-center">
					<p>
						&copy; {new Date().getFullYear()} TRG International. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
