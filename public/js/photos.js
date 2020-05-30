async function getPhotos() {
    var row = document.getElementById('row');
    let response = await fetch('http://localhost:3000/api/photos');
    if (response.ok) {
        let json = await response.json();
        var urlList = []
        for (var i=0;i<json.length;i++) {
            console.log(json[i].URL);
            urlList.push(json[i].URL);
        }
    } else {
        alert("Error: " + response.status);
    }
}

async function addPhoto() {
    let urlInput = document.getElementById('urlInput');
    let tagInput = document.getElementById('tagInput');
    let photo = {
        "URL": urlInput.value,
        "tag": tagInput.value
    }

    let response = await fetch('http://localhost:3000/api/photos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(photo)
    }).then(
        function(response) {
            if (response.status !== 200) {
                alert('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function(data) {
                alert('Success. Photo added.');
            });
        }
    )
        .catch(function(err) {
            alert('Fetch Error :-S', err);
        });
}
