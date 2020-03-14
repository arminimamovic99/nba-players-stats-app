const apiKey = '1a7a5f92c9msha9248f6d37eea6bp14c451jsn15d6adf55fa1'

const search = () => {
    //console.log(1)
    let playerName = document.getElementById("name").value;

    /*fetch(`https://api-nba-v1.p.rapidapi.com/players/lastName/${playerName}`,{
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        },
        "mode": "no-cors"
    })*/
    fetch(`https://api-nba-v1.p.rapidapi.com/players/lastName/${playerName}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        }   
    }).then(res => console.log(res.json()))
    .catch((err) => console.log('error: ' + err))
}