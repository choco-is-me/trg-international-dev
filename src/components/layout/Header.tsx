import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_MAIN_MENU } from "@/lib/queries";

interface MenuItem {
	id: string;
	label: string;
	url: string;
	path: string;
	parentId: string | null;
	childItems?: {
		nodes: {
			id: string;
			label: string;
			path: string;
			url: string;
		}[];
	};
}

const Header: React.FC = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { data, loading, error } = useQuery(GET_MAIN_MENU);

	// Extract menu items from the data structure
	const menuItems = data?.menus?.nodes[0]?.menuItems?.nodes || [];

	// Filter top-level menu items (items without a parent)
	const topLevelMenuItems = menuItems.filter(
		(item: MenuItem) => !item.parentId
	);

	return (
		<header className="bg-white shadow-sm">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<Link href="/" className="flex items-center">
					<span className="text-primary font-bold text-xl">
						TRG International
					</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex space-x-8">
					{loading ? (
						// Loading placeholders
						<div className="flex space-x-8">
							<div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
						</div>
					) : error ? (
						// Fallback items
						<>
							<Link
								href="/"
								className="text-gray-700 hover:text-primary transition-colors"
							>
								Home
							</Link>
							<Link
								href="/about"
								className="text-gray-700 hover:text-primary transition-colors"
							>
								About
							</Link>
						</>
					) : (
						// Dynamic menu from WordPress
						topLevelMenuItems.map((item: MenuItem) => (
							<div key={item.id} className="group relative">
								<Link
									href={item.path || item.url}
									className="text-gray-700 hover:text-primary transition-colors"
								>
									{item.label}
								</Link>

								{/* Dropdown for items with children */}
								{item.childItems &&
									item.childItems.nodes.length > 0 && (
										<div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
											<div className="py-1">
												{item.childItems.nodes.map(
													(child) => (
														<Link
															key={child.id}
															href={
																child.path ||
																child.url
															}
															className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
														>
															{child.label}
														</Link>
													)
												)}
											</div>
										</div>
									)}
							</div>
						))
					)}
				</nav>

				{/* Mobile menu button */}
				<button
					className="md:hidden text-gray-700"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<nav className="md:hidden bg-white border-t py-4 px-4">
					{loading ? (
						<div className="space-y-4">
							<div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
							<div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
						</div>
					) : error ? (
						<ul className="space-y-3">
							<li>
								<Link
									href="/"
									className="block text-gray-700"
									onClick={() => setMobileMenuOpen(false)}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="block text-gray-700"
									onClick={() => setMobileMenuOpen(false)}
								>
									About
								</Link>
							</li>
						</ul>
					) : (
						<ul className="space-y-3">
							{topLevelMenuItems.map((item: MenuItem) => (
								<li key={item.id}>
									<Link
										href={item.path || item.url}
										className="block text-gray-700"
										onClick={() => setMobileMenuOpen(false)}
									>
										{item.label}
									</Link>

									{/* Mobile submenu */}
									{item.childItems &&
										item.childItems.nodes.length > 0 && (
											<ul className="ml-4 mt-2 space-y-2">
												{item.childItems.nodes.map(
													(child) => (
														<li key={child.id}>
															<Link
																href={
																	child.path ||
																	child.url
																}
																className="block text-gray-600 text-sm"
																onClick={() =>
																	setMobileMenuOpen(
																		false
																	)
																}
															>
																{child.label}
															</Link>
														</li>
													)
												)}
											</ul>
										)}
								</li>
							))}
						</ul>
					)}
				</nav>
			)}
		</header>
	);
};

export default Header;
