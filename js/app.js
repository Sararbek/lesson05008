const formEl = document.querySelector(".form");
const nameInputEl = document.querySelector(".nameInput");
const usernameInput = document.querySelector(".usernameInput")
const passwordInput = document.querySelector(".passwordInput")
const selectorInput = document.querySelector(".sidebar__selector")
const dashBoardWrapperEl = document.querySelector(".main__wrapper")
const sidebarImg = document.querySelector(".sidebar__image img")
const darkModeBtn = document.querySelector(".onOffBtn")
const darkModeInnerBtn = document.querySelector(".onOffBtn button")
const sidebarEl = document.querySelector(".sidebar")
const labelEls = document.querySelectorAll(".sidebar label")
const topbarEl = document.querySelector(".topbar")
const dashboardEl = document.querySelector(".main")

const BASE_URL = "http://localhost:3000"

darkModeBtn.addEventListener("click", ()=> {
    darkModeInnerBtn.classList.toggle("darkmode")
    sidebarEl.classList.toggle("darkmode")
    labelEls.forEach(labelEl => {
        labelEl.classList.toggle("darkmode")
    })
    topbarEl.classList.toggle("darkmode")
    dashboardEl.classList.toggle("darkmode")
    localStorage.setItem("darkMode", sidebarEl.classList.contains("darkmode"))
})

function initDarkmode(){
    const isDarkmode = localStorage.getItem("darkMode") === "true"
    
    if(isDarkmode){
        darkModeInnerBtn.classList.add("darkmode")
        
        sidebarEl.classList.add("darkmode")
        labelEls.forEach(labelEl => {
            labelEl.classList.add("darkmode")
        })
        topbarEl.classList.add("darkmode")
        dashboardEl.classList.add("darkmode")
    }
}

const maleImages = [
    {adress: "https://flbgroup.com/images/users/user-john-doe-437x437.jpg"},
    {adress: "https://i.pinimg.com/280x280_RS/75/3b/cf/753bcfb53ae87ed8f793535b41d96433.jpg"},
    {adress: "https://experianta.com/wp-content/uploads/avatars/23/6094430656f31-bpfull.jpg"},
    {adress: "https://salondesmaires-ain.fr/wp-content/uploads/2014/10/speaker-3.jpg"},
    {adress: "https://decisionsystemsgroup.github.io/workshop-html/img/john-doe.jpg"},
    {adress: "https://www.perkosis.com/uploads/staffs/big/9.jpg"},
    {adress: "https://captiontools.com/wp-content/uploads/2017/03/testy3-1.png"},
    {adress: "https://www.tadpole.co.nz/wp-content/uploads/2021/02/team-1.jpg"},
    {adress: "https://nwestco.com/wp-content/uploads/2016/08/13.jpg"},
    {adress: "https://media.licdn.com/dms/image/v2/D4E03AQGj9oanyG5Ltw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1685552354563?e=2147483647&v=beta&t=KhgbHb08-ElYyWP6J0nx8sF-RX5YuImFUi0TEHX1-mA"},
]

const femaleImages = [
    {adress: "https://arcadia.io/assets/_leadership500/32457/anna-basevich-c-800x800-1.webp"},
    {adress: "https://d2gjqh9j26unp0.cloudfront.net/profilepic/03784baf4aac453afe61d6192438a51c"},
    {adress: "https://media.nngroup.com/media/people/photos/20181001_Raleigh-106.jpg.600x600_q75_autocrop_crop-smart_upscale.jpg"},
    {adress: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpIw-T4AwsHxUEZRngh0H1h5P682Ze-rtptdX3V88eWBr-B8N0pQtBch7oPWMAX3PDbgk&usqp=CAU"},
    {adress: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlNGZcrcVL1oRavLwH6k3bqYNHi52pLbQ_ZNoSQJYTcGPPuITOlmBeD3W2YIgki4jh6Xk&usqp=CAU"},
    {adress: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX5U9VAqUrB0-nUEI3CZ-GOfosZjUGOQ6DIqvHERhNK5laPGL7bkiaB5NDwPUzucrDr_o&usqp=CAU"},
    {adress: "https://www.wpshealthsolutions.com/assets/img/sara-redford.jpg"},
    {adress: "https://d2gjqh9j26unp0.cloudfront.net/profilepic/5caf1e235fefdd822cb8df2334663fa9"},
    {adress: "https://health-equity-action.org/sites/default/files/styles/large/public/pictures/2022-11/Anna-Peare-300x300.jpg?itok=2ZRiVLMD"},
    {adress: "https://media.licdn.com/dms/image/sync/v2/D5627AQFQy5PXajRuiA/articleshare-shrink_800/articleshare-shrink_800/0/1722365599587?e=2147483647&v=beta&t=o7aSeZl_xRS3l1e-wGd3IPh4K2IXw6iht18DjUw6tRk"},
]

function randomMaleImage(maleImages){
    const randomImage = Math.floor(Math.random() * maleImages.length)
    return maleImages[randomImage].adress
}

function randomFemaleImage(femaleImages){
    const randomImage = Math.floor(Math.random() * femaleImages.length)
    return femaleImages[randomImage].adress
}

function sidebarRandomImage(){
    let isMale = true
    setInterval(()=> {
        sidebarImg.src = isMale ? randomMaleImage(maleImages) : randomFemaleImage(femaleImages);
        isMale = !isMale
    },2000)
}

async function fetchUsers(endpoint) {
    try{
        const response = await fetch(`${BASE_URL}${endpoint}`)

        if(!response.ok){
            throw new Error (`Error: ${response.status}`)
        }

        const data = await response.json()
        createUsers(data)

    }catch(e){
        console.log(e.message)
    }finally{

    }
}

function createUsers(users){
    dashBoardWrapperEl.innerHTML = null
    users.forEach(userCard => {
        const cardEl = document.createElement("div")
        cardEl.className = `main__card`
        cardEl.innerHTML = `
            <div class="main__card__imagebox">
                    <div class="main__card__img">
                        <img src="${userCard.imageAdress}">
                    </div>
                    <div class="main__card__name">
                        <p>${userCard.name}</p>
                    </div>
                </div>
                <div class="main__card__userInfo">
                    <ul>
                        <li>${userCard.username}</li>
                        <li>${userCard.password}</li>
                        <li>${userCard.gender}</li>
                    </ul>
                    <button data-id=${userCard.id} name="delete-btn">Delete</button>
                </div>
        `
        dashBoardWrapperEl.appendChild(cardEl)
    })
    const cardEls = document.querySelectorAll(".main__card")
}

window.onload = () => {
    initDarkmode()
    sidebarRandomImage()
    fetchUsers(`/users`)
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    if(!nameInputEl.value.trim() || !usernameInput.value.trim()|| !passwordInput.value.trim() || selectorInput.value === ""){
        alert('Please write at least one character in each input!')
    }else{
        let newUser = {
            name: nameInputEl.value,
            username: usernameInput.value,
            password: passwordInput.value,
            gender: selectorInput.value,
            imageAdress: selectorInput.value === "male" ? randomMaleImage(maleImages) : randomFemaleImage(femaleImages)
        }
        fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(()=> {
            fetchUsers("/users")
        })
    }
    })

dashBoardWrapperEl.addEventListener("click", e => {
    if(e.target.name === "delete-btn"){
        fetch(`${BASE_URL}/users/${e.target.dataset.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(()=> {
            fetchUsers("/users")
        })
    }
})