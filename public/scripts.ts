document.getElementById('conferenceForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {data[key] = value});
    
    const response = await fetch('http://localhost:3000/api/conferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    // 화면에 새로 생성된 컨퍼런스 정보 표시
    const conferenceList = document.getElementById('conferenceList');
    const conferenceInfo = document.createElement('div');
    conferenceInfo.innerHTML = `<p>Conference Name: ${result.name}</p>
                                <p>Abstract Due: ${result.abstract_due}</p>
                                <p>Full Paper Due: ${result.full_paper_due}</p>
                                <p>Location: ${result.location}</p>
                                <p>Conference Start: ${result.conference_start}</p>
                                <p>Conference End: ${result.conference_end}</p>`;
    conferenceList.appendChild(conferenceInfo);
});
