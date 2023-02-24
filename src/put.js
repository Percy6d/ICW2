
fetch("http://localhost:3000/collection/order/63effd0aacd9e66f35af0d50", {
    method: "PUT",
    headers: {
                'Content-Type': 'application/json'
            },
    body: JSON.stringify(
        {
            "numberOfSpaces": 10
        }
    )
})
    .then(res => {
        if (res.ok) { console.log("PUT request successful") }
        else { console.log("PUT request unsuccessful") }
        return res
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))