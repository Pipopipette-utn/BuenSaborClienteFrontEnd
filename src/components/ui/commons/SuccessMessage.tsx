import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { FC } from "react";

interface SuccessMessageProps {
	open: boolean;
	onClose: () => void;
	message: string;
}

export const SuccessMessage: FC<SuccessMessageProps> = ({
	open,
	onClose,
	message,
}) => {
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
			<MuiAlert
				onClose={onClose}
				severity="success"
				elevation={6}
				variant="filled"
			>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};
