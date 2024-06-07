import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { FC } from "react";

interface ErrorMessageProps {
	open: boolean;
	onClose: () => void;
	message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({
	open,
	onClose,
	message,
}) => {
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
			<MuiAlert
				onClose={onClose}
				severity="error"
				elevation={6}
				variant="filled"
			>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};
