document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const videoURL = document.getElementById('videoURL').value;
    const messageDiv = document.getElementById('message');

    if (videoURL) {
        fetch(videoURL)
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'video.mp4'; // Default download name
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                messageDiv.textContent = 'Download started!';
                messageDiv.style.color = 'green';
            })
            .catch(error => {
                messageDiv.textContent = 'Failed to download the video. Please check the URL.';
            });
    } else {
        messageDiv.textContent = 'Please enter a valid URL.';
    }
});
