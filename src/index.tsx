import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as serviceWorker from "./serviceWorker";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<ColorModeScript />
			<ChakraProvider theme={theme}>
				<RouterProvider router={router} />
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
