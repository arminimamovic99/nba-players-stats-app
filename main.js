const baseUrl = 'https://www.balldontlie.io/api/v1/players?search='
const baseUrlStats = 'https://www.balldontlie.io/api/v1/stats?player_ids[]=';

// TODO one modal per player

const search = () => {
    let playerName = document.getElementById("name").value;

    // Send Request 
    fetch( baseUrl + playerName, {
        "method": "GET",
    }).then((res) => {
         let response = res.json()
        // Resolve Promise
        Promise.resolve(response)

        // Handle response
        response.then((values) => {
            console.log(values)
            
            let output = ''
            let modalOutput = ''
            let players = values.data

            // Render into HTML with jQuery
            $.each(players, (players, player) => {
                output += `
                    <div class="w-2/4 mt-5 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b-lg lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div class="font-bold mb-2">
                            <h2 class='text-blue-600 text-2xl'>${player.first_name + ' ' + player.last_name}</h2>
                            <h2 class='text-blue-600 text-sm'>${player.position + ' | ' + player.team.full_name}</h2>
                        </div>
                        <p><u><a href="#ex1" class="text-s text-blue-600 font-bold" rel="modal:open" onclick='detailStats(${player.id});'>More info</a></u></p>
                    </div>
                `;
                
            });

            $('#player').html(output);
    })
    .catch((err) => console.log('error: ' + err))
})
}

const detailStats = (id) => {

    fetch( baseUrlStats + id, {
        "method": "GET",
    }).then((res) => {
        let response = res.json()
       // Resolve Promise
       Promise.resolve(response)

       // Handle response
       response.then((values) => {
           console.log(values) 

           // Render into modal
        /*modalOutput += `
            <div class="font-bold mb-2">
                <h2 class='text-blue-600 text-lg'>${player.firstame + ' ' + player.lastName}</h2>
                <h2 class='text-blue-600 text-lg'>${'Date of birth: ' + player.dateOfBirth}</h2>
                <h2 class='text-blue-600 text-lg'>${'Country of birth: ' + player.country}</h2>
                <h2 class='text-blue-600 text-lg'>${'Draft year: ' + player.startNba}</h2>
            </div>
        `; */
        // $('#ex1').html(modalOutput)  
        })

    })

}
