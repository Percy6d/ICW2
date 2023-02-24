const appDisplay = document.querySelector("#app")



fetch("http://localhost:3000/collection/lesson")
        .then(response => {return response.json()})
        .then(data => {
            data.forEach(element => {
                const subject = '<p>' + 'Subject:' + element.subject + '</p>'
                appDisplay.insertAdjacentHTML("beforeend", subject)
                const location = '<p>' + 'Location:' + element.location + '</p>'
                appDisplay.insertAdjacentHTML("beforeend", location)
                const price = '<p>' + 'Price:' + element.price + '</p>'
                appDisplay.insertAdjacentHTML("beforeend", price)
                const space = '<p>' + 'Space:' + element.space + '</p>'
                appDisplay.insertAdjacentHTML("beforeend", space)          
            });
        })
        .catch(err => console.log(err))