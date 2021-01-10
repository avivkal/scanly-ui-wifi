import React from 'react';
import { Navbar, Provider, Container } from 'rendition';
import { NetworkInfoForm } from './NetworkInfoForm';
import { Notifications } from './Notifications';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
`;



const App = () => {
	const [attemptedConnect, setAttemptedConnect] = React.useState(false);
	const [isFetchingNetworks, setIsFetchingNetworks] = React.useState(true);
	const [error, setError] = React.useState('');
	const [availableNetworks, setAvailableNetworks] = React.useState(
		[],
	);

	React.useEffect(() => {
		fetch('/networks')
			.then((data) => {
				if (data.status !== 200) {
					throw new Error(data.statusText);
				}

				return data.json();
			})
			.then(setAvailableNetworks)
			.catch((e) => {
				setError(`לא נמצאו רשתות`);
			})
			.finally(() => {
				setIsFetchingNetworks(false);
			});
	}, []);

	const onConnect = (data) => {
		setAttemptedConnect(true);
		setError('');
		console.log(JSON.stringify(data))
		fetch('/connect', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((resp) => {
				if (resp.status !== 200) {
					throw new Error(resp.statusText);
				}
			})
			.catch((e) => {
				setError(`לא היה ניתן להחבר לרשת ${e.message || e}`);
			});
	};

	return (
		<Provider>
			<GlobalStyle />

			<Container>
				<Notifications
					attemptedConnect={attemptedConnect}
					hasAvailableNetworks={
						isFetchingNetworks || availableNetworks.length > 0
					}
					error={error}
				/>
				<NetworkInfoForm
					availableNetworks={availableNetworks}
					onSubmit={onConnect}
				/>
			</Container>
		</Provider>
	);
};

export default App;
