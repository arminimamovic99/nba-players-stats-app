const apiKey = '1a7a5f92c9msha9248f6d37eea6bp14c451jsn15d6adf55fa1'

// TODO one modal per player

const search = () => {
    let playerName = document.getElementById("name").value;

    // Send Request 
    fetch(`https://api-nba-v1.p.rapidapi.com/players/lastName/${playerName}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }   
    }).then((res) => {
        let response = res.json()
        // Resolve Promise
        Promise.resolve(response)

        // Handle response
        response.then((values) => {
            console.log(values.api.players)
            
            let output = ''
            let modalOutput = ''
            let players = values.api.players

            // Render into HTML with jQuery
            $.each(players, (players, player) => {
                output += `
                    <div class="w-2/4 mt-5 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b-lg lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div class="font-bold mb-2">
                            <h2 class='text-blue-600 text-2xl'>${player.firstName + ' ' + player.lastName}</h2>
                            <p class='text-blue-600 text-xs'>${player.dateOfBirth + ' | ' + player.country}</p>
                        </div>
                        <p><u><a href="#ex1" class="text-s text-blue-600 font-bold" rel="modal:open">More info</a></u></p>
                    </div>
                `;
                // Render into modal
                modalOutput += `
                    <div class="font-bold mb-2">
                        <h2 class='text-blue-600 text-lg'>${player.firstName + ' ' + player.lastName}</h2>
                        <h2 class='text-blue-600 text-lg'>${'Date of birth: ' + player.dateOfBirth}</h2>
                        <h2 class='text-blue-600 text-lg'>${'Country of birth: ' + player.country}</h2>
                        <h2 class='text-blue-600 text-lg'>${'Draft year: ' + player.startNba}</h2>
                    </div>
                `;
                $('#ex1').html(modalOutput)
            });

            $('#player').html(output);
        })
    })
    .catch((err) => console.log('error: ' + err))

}
