const Notification = ({ message, nClass }) => {
	if (message === null) {
		return null;
	}

	return <div className={nClass}>{message}</div>;
};

export default Notification;
