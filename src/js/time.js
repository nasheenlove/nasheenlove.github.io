import { data } from "../assets/data/data.js";
import { monthNameToNumber } from "../utils/helper.js";

export const time = () => {
    const timeContainer = document.querySelector('.time');
    const countdownTime = document.querySelector('.countdown-time');

    // console.log(timeContainer);
    const [marriageDiv, receptionDiv] = timeContainer.querySelectorAll('div div');
    const mapWazeLink = timeContainer.querySelector('.waze');
    const mapGooglemapLink = timeContainer.querySelector('.googlemap');
    
    // const addressParagraph = timeContainer.querySelector('p');

    const generateCountdownMarkup = (days, hours, minutes, seconds) => {
        return `<div><p>${days}<br><span>Hari</span></p></div>
                <div>
                    <p>${hours}<br><span>Jam</span></p>
                </div>
                <div>
                    <p>${minutes}<br><span>Minit</span></p>
                </div>
                <div>
                    <p>${seconds}<br><span>Saat</span></p>
                </div>`;
    };

    const updateCountdown = (endTime, countdownTime, intervalId) => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(intervalId);
            countdownTime.innerHTML = generateCountdownMarkup(0, 0, 0, 0);
        } else {
            countdownTime.innerHTML = generateCountdownMarkup(days, hours, minutes, seconds);
        }
    };

    const startCountdown = (countdownTime, timeData) => {
        const { year, month, date } = timeData.marriage;
        const endTime = new Date(`${String(year)}-${String(monthNameToNumber(month)).padStart(2, '0')}-${String(date).padStart(2, '0')}T00:00:00`);

        const intervalId = setInterval(() => updateCountdown(endTime, countdownTime, intervalId), 1000);
        updateCountdown(endTime, countdownTime, intervalId);
    };

    const createTimeListItem = (title, details) => (
        `<h3>${title}</h3>
         <p><b>${details.day}, ${details.date} ${details.month} ${details.year}</b> <br> 
         ${details.hours.start} sehingga ${details.hours.finish}</p>`
    );

    // marriageDiv.innerHTML = createTimeListItem('Akad', data.time.marriage);
    // receptionDiv.innerHTML = createTimeListItem('Resepsi', data.time.reception);
    // startCountdown(countdownTime, data.time);

    // addressParagraph.textContent = data.time.address;
    mapWazeLink.href = data.link.map.waze;
    mapGooglemapLink.href = data.link.map.googlemap;

};
