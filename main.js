const baseUrl = 'https://www.balldontlie.io/api/v1/players?search='
const baseUrlStats = 'https://www.balldontlie.io/api/v1/stats?per_page[]=60&seasons[]=2019&player_ids[]=';

// TODO one modal per player
/* TODO calculate player's stats average 
    Iterate over player's stats. Push each stat (Points, assists, rebounds) to a separate array (e.g. array(points))
    Than, calculate the sum of each array and divide with the count of the stats (e.g. 1623 points divided by 25 entries)
*/

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
                    <div class="w-2/4 mt-5 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b-lg lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal shadow-xl">
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

// Gets the players stats and displays them in a modal
const detailStats = (id) => {

    fetch( baseUrlStats + id, {
        "method": "GET",
    }).then((res) => {
        let response = res.json()

       // Resolve Promise
       Promise.resolve(response)

        let points = []
        let rebounds = []
        let assists = []
        let modalOutput = ''

       // Handle response
        response.then((values) => {
           console.log(values) 

            $.each(values.data, (values, stat) => {
                points.push(stat.pts)
                assists.push(stat.ast)
                rebounds.push(stat.dreb)
                rebounds.push(stat.oreb)
            });

            // Calculates points average
            let sumPts = points.reduce(function(a, b){
                return a + b;
            }, 0);
            let ptsAverage = Math.floor(sumPts / points.length)
            console.log(ptsAverage)

            // Calculates assists average
            let sumAst = assists.reduce(function(a, b){
                return a + b;
            }, 0);
            let astAverage = Math.floor(sumAst / assists.length)
            console.log(astAverage)

            // Calculates rebounds average
            let sumReb = rebounds.reduce(function(a, b){
                return a + b;
            }, 0);
            let rebAverage = Math.floor(sumReb / rebounds.length)
            console.log(astAverage)

            modalOutput += `
                <div class="font-bold mb-2">
                    <h2 class='text-blue-600 text-2xl'>2019-2020 Stats:</h2>
                    <h2 class='text-blue-600 text-xs mt-2'>* Stats are rounded up to the nearest integer.</h2>
                </div>
                <table class="table-fixed w-full text-blue-600 mt-4">
                    <thead>
                        <tr>
                        <th class="px-6 py-4">Stat:</th>
                        <th class="px-6 py-4">Value:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border px-6 py-4">Points per game</td>
                            <td class="border px-6 py-4">${ptsAverage}</td>
                        </tr>
                        <tr>
                            <td class="border px-6 py-4">Assists per game</td>
                            <td class="border px-6 py-4">${astAverage}</td>
                        </tr>
                        <tr>
                            <td class="border px-6 py-4">Rebounds per game</td>
                            <td class="border px-6 py-4">${rebAverage}</td>
                        </tr>
                    </tbody>
                </table>
            `; 
            $('#ex1').html(modalOutput)  
        })
    })
}
