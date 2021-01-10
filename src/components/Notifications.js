import * as React from 'react';
import { Txt, Alert } from 'rendition';

export const Notifications = ({
	hasAvailableNetworks,
	attemptedConnect,
	error,
}) => {
	return (
		<>
			{attemptedConnect && (
				<Alert m={2} info>
					<Txt.span>מנסה להתחבר</Txt.span>
					<Txt.span>
						המכשיר שלך בקרוב יהיה מוכן לפעולה, אם החיבור אינו מוצלח הרשת תישאר דלוקה ועליך לנסו להתחבר אליה מחדש
					</Txt.span>
				</Alert>
			)}
			{!hasAvailableNetworks && (
				<Alert m={2} style={{textAlign:"right"}}>
					<Txt.span> אזהרה! לא נמצאו רשתות אנא וודא שהמכשיר נמצא בטווח הרשת הביתית</Txt.span>

				</Alert>
			)}
		</>
	);
};
