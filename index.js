let cardBody = document.getElementById('cardBody');
let category = ["developer", "computer", "laptop", "programming", "coding"];
let website = ["CodeForces", "CodeForces Gym", "TopCoder", "AtCoder", "CS Academy", "CodeChef", "HackerRank", "HackerEarth", "Kick Start", "LeetCode"];
let websiteAPI = ["codeforces", "codeforces_gym", "top_coder", "at_coder", "cs_academy", "code_chef", "hacker_rank", "hacker_earth", "kick_start", "leet_code"];
let webList = document.getElementById('webList');


// Genrate Random Number to select category
function randomCategory() {
    let num = Math.round(4 * Math.random());
    return num;
}
// Seconds to day
function toDay(seconds) {
    let day = Math.round(seconds / 86400);
    return day;
}

//Return Formated Date
function formatedDate(oldDate) {
    let newDate = oldDate.substring(0, 10);
    return newDate;
}

//Grab the name
// select value of selected Category
function sendCategory(index) {
    fetchAPI(websiteAPI[index]);
}
fetchAPI("all");
//Parse Category to Function

// Grab quotas text in json  
let json;
fetch('Assets/json/codingQuota.json')
    .then(response => response.json())
    .then(quotes => {
        json = quotes;
    })
    .catch(err => console.error(err));

// fetch api for coding contest
function fetchAPI(webName) {
    fetch(`https://kontests.net/api/v1/${webName}`)
        .then(response => response.json())
        .then(data => {

            data.sort((a, b) => {
                var start_date = new Date(a.start_time);
                var end_date = new Date(b.start_time);
                return end_date.getTime() - start_date.getTime();
            });

            console.log(data); 
            let str = "";
            for (key in data) {
                str += `<div class="card mb-3">
                        <img src="https://source.unsplash.com/1000x400/?${category[randomCategory()]},${category[randomCategory()]}" class="card-img-top"
                            alt="Image">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">${data[key].name}</h5>
                                <div>
                                    <span class="badge text-bg-success">${data[key].site != undefined ? data[key].site : website[websiteAPI.indexOf(webName)]} </span>
                                    ${data[key].in_24_hours = true ? `<span></span>` : `<span class="badge text-bg-danger">Ends in 24 hour </span>`}
                                   
                                </div >
                            </div >
                            <p class="card-text">${json[key].text}</p>
                            <div class="d-grid gap-1">
                                <a href="${data[key].url}" target="_blank">
                                <button class="btn btn-block btn-primary">Join Contest</button>
                                </a>
                            </div>
                            </div >
                    <div class="d-flex justify-content-between card-footer text-muted">
                        <div class="timeText ">
                            Start Date:${formatedDate(data[key].start_time)}
                        </div>
                        <div class="timeText ">
                            Duartion: ${toDay(data[key].duration)} Days 
                        </div>
                        <div class="timeText ">
                            End Date: ${formatedDate(data[key].end_time)}
                        </div>
                    </div>
                  </div > `;
            }
            cardBody.innerHTML = str;
        }).catch(err => console.error(err));
}