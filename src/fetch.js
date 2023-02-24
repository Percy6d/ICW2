
fetch('http://localhost:3000/collection/order', {
    method: "POST",
    headers: {
                'Content-Type': 'application/json'
            },
    body: JSON.stringify(
        {
            "name": "Dave James",
            "phoneNumber": 4428346253,
            "lessonID": 1001,
            "numberOfSpaces": 5
        }
    )
})
    .then(res => {
        if (res.ok) { console.log("POST request successful") }
        else { console.log("POST request unsuccessful") }
        return res
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))