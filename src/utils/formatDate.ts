export const formatDate = (dateString: string) => {
    const date = new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return date
}
export const formatTime = (dateString: string) => {
    const time = new Date(dateString).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    return time
}