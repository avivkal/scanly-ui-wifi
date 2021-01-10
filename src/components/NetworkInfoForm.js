import { JSONSchema7 as JSONSchema } from 'json-schema';
import * as React from 'react';
import { Flex, Form, Heading, RenditionUiSchema } from 'rendition';
import { Network, NetworkInfo } from './App';

const getSchema = (availableNetworks) => ({
	type: 'object',
	properties: {
		ssid: {
			title: 'שם הרשת הביתית',
			type: 'string',
			default: availableNetworks[0]?.ssid,
			oneOf: availableNetworks.map((network) => ({
				const: network.ssid,
				title: network.ssid,
			})),
		},
		identity: {
			title: 'User',
			type: 'string',
			default: '',
		},
		passphrase: {
			title: 'סיסמה לרשת הביתית',
			type: 'string',
			default: '',
		},
	},
	required: ['ssid'],
});

const getUiSchema = (isEnterprise) => ({
	ssid: {
		'ui:placeholder': 'בחר רשת',
		'ui:options': {
			emphasized: true,
		},
	},
	identity: {
		'ui:options': {
			emphasized: true,
		},
		'ui:widget': !isEnterprise ? 'hidden' : undefined,
	},
	passphrase: {
		'ui:widget': 'password',
		'ui:options': {
			emphasized: true,
		},
	},
});

const isEnterpriseNetwork = (
	networks,
	selectedNetworkSsid,
) => {
	return networks.some(
		(network) =>
			network.ssid === selectedNetworkSsid && network.security === 'enterprise',
	);
};


export const NetworkInfoForm = ({
	availableNetworks,
	onSubmit,
}) => {
	const [data, setData] = React.useState({});

	const isSelectedNetworkEnterprise = isEnterpriseNetwork(
		availableNetworks,
		data.ssid,
	);

	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			m={4}
			mt={5}
		>
			<Heading.h3 align="center" mb={4}>
				אנא בחר את הרשת הביתית שלך מתוך הרשימה והכנס את הסיסמה אליה
			</Heading.h3>

			<Form
				width={['100%', '80%', '60%', '40%']}
				onFormChange={({ formData }) => {
					setData(formData);
				}}
				onFormSubmit={({ formData }) => onSubmit(formData)}
				value={data}
				schema={getSchema(availableNetworks)}
				uiSchema={getUiSchema(isSelectedNetworkEnterprise)}
				submitButtonProps={{
					width: '60%',
					mx: '20%',
					mt: 3,
					disabled: availableNetworks.length <= 0,
				}}
				submitButtonText={'התחבר'}
			/>
		</Flex>
	);
};
