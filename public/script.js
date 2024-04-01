document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3000/api/conferences');
        if (!response.ok) {
            throw new Error('Failed to fetch conferences');
        }
        const conferences = await response.json();
        const conferenceTableBody = document.getElementById('conferenceTableBody');

        conferences.forEach(conference => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${conference.id}</td>
                <td>${conference.name}</td>
                <td>${new Date(conference.abstract_due).toLocaleString()}</td>
                <td>${new Date(conference.full_paper_due).toLocaleString()}</td>
                <td>${conference.location}</td>
                <td>${new Date(conference.conference_start).toLocaleString()}</td>
                <td>${new Date(conference.conference_end).toLocaleString()}</td>
            `;
            conferenceTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching conferences:', error.message);
    }
});
