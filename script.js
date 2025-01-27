getWeatherData();
// close icon
let isLoadEventActive = false;

window.addEventListener('load', function (e) {
    const serv = document.getElementById('all');
    serv.classList.add('visible');
    isLoadEventActive = true;

});
window.addEventListener('scroll', function(){

    const services = document.querySelector('.allservices');
    const scrollnum= 1800;
    if(isLoadEventActive) return;
    if(window.scrollY > scrollnum ){
        services.classList.add('visible');
    }else {
        services.classList.remove('visible');
    }
});
function colseNav(){
    let navMenu = document.getElementById('navmenu');
    let social = document.getElementById('socialId');
    navMenu.style.right = "-300px";
    social.style.right = "-300px";
}
function openNav(){
    let navMenu = document.getElementById('navmenu');
    let social = document.getElementById('socialId');
    navMenu.style.right = "0";
    social.style.right = "0";
}
updateFAQs();
// getWeatherData();
function updateFAQs() {
    const faqCreator = new FAQCreator();

    faqCreator.add(
        new Question("1. What services are offered?"),
        new Answer(
            "Full-stack development services, including frontend, backend, and API integration, are available to meet your needs."
        )
    );
    faqCreator.add(
        new Question("2. How do I start a project?"),
        new Answer(
            "Starting a project is simple. Send an email or reach out via the provided contact options, and the process will be explained step-by-step."
        )
    );
    faqCreator.add(
        new Question("3. What is full-stack development?"),
        new Answer(
            "Full-stack development involves creating both the user-facing frontend and the server-side backend of websites and applications."
        )
    );

    const faq = document.querySelector(".faq");
    faq.innerHTML = ""; // clear it.
    faq.innerHTML = "<h3>Frequently Asked Questions (FAQ)</h3>";
    const faqs = faqCreator.returnFAQs();
    faqs.forEach((faqItem) => {
        const faqItemElement = document.createElement("div");
        faqItemElement.classList.add("faq-item");
        faqItemElement.innerHTML = `<h4>${faqItem.question}</h4><p>${faqItem.answer}</p>`;
        faq.appendChild(faqItemElement);
    });
}

function fetchWeatherData(stationsIds) {
    return Promise.all(
        stationsIds.map((id) => {
            return fetch(
                `https://api.brightsky.dev/current_weather?dwd_station_id=${id}`
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .catch((error) => ({ id, error: error.message }));
        })
    );
}

function getWeatherData() {
    const stationsIds = ["02667", "00427", "01078", "01975", "04928"];
    const weatherTable = document.getElementById("weatherTable");

    if (!weatherTable) {
        console.error("Weather table not found");
        return;
    }

    fetchWeatherData(stationsIds)
        .then((results) => {
            weatherTable.innerHTML = `
    <tr>
      <th>City</th>
      <th>Temperature</th>
      <th>Weather</th>
      <th>Wind Speed</th>
      <th>Wind Direction</th>
    </tr>
    `;
            results.forEach((result) => {
                if (result.error) {
                    console.error(
                        `Error fetching weather data for station ${result.id}`,
                        result.error
                    );
                    return;
                }

                const { sources, weather } = result;

                if (
                    sources &&
                    sources[0] &&
                    weather.temperature &&
                    weather.condition &&
                    weather.wind_speed_10 &&
                    weather.wind_direction_10
                ) {
                    weatherTable.innerHTML += `
        <tr>
          <td>${sources[0].station_name}</td>
          <td>${weather.temperature}°C</td>
          <td>${weather.condition}</td>
          <td>${weather.wind_speed_10} m/s</td>
          <td>${weather.wind_direction_10}°</td>
        </tr>
        `;
                } else {
                    console.error("Invalid weather data", result);
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching weather data", error);
        });
}
// Simulierte Funktion zum Senden von Daten (kein Server benötigt)



