import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FaustProvider } from "@faustwp/core";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { Roboto } from "next/font/google";

// Load Roboto font using Next.js font system
const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<FaustProvider pageProps={pageProps}>
			<ApolloProvider client={client}>
				<div className={`${roboto.variable}`}>
					<Component {...pageProps} />
				</div>
			</ApolloProvider>
		</FaustProvider>
	);
}
