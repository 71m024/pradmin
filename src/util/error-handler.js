export default function errorHandler(error, setNotificationState) {
  console.error('Error:', error);
  setNotificationState({
    severity: 'error',
    title: error.title,
    description: error.detail,
  });
}
