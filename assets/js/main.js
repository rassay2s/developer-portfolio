import { Answer, FAQCreator, Question } from "./faq.js";

const WEATHER_STATION_IDS = ["02667", "00427", "01078", "01975", "04928"];

export function setNavigationOpen(isOpen) {
    const navMenu = document.getElementById("navmenu");
    const menuButton = document.getElementById("menuicon");

    if (!navMenu || !menuButton) {
        return;
    }

    navMenu.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
}

function initializeNavigation() {
    const menuButton = document.getElementById("menuicon");
    const closeButton = document.getElementById("closeicon");

    menuButton?.addEventListener("click", () => setNavigationOpen(true));
    closeButton?.addEventListener("click", () => setNavigationOpen(false));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setNavigationOpen(false);
        }
    });
}

function initializeServicesAnimation() {
    const services = document.querySelector(".allservices");

    if (!services) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        services.classList.add("visible");
        return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                services.classList.add("visible");
                observer.disconnect();
            }
        },
        { threshold: 0.15 }
    );

    observer.observe(services);
}

export function createFAQs() {
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

    return faqCreator.returnFAQs();
}

function updateFAQs() {
    const faq = document.querySelector(".faq");

    if (!faq) {
        return;
    }

    const heading = document.createElement("h3");
    heading.textContent = "Frequently Asked Questions (FAQ)";
    faq.replaceChildren(heading);

    createFAQs().forEach((faqItem) => {
        const faqItemElement = document.createElement("div");
        const question = document.createElement("h4");
        const answer = document.createElement("p");

        faqItemElement.classList.add("faq-item");
        question.textContent = faqItem.question;
        answer.textContent = faqItem.answer;
        faqItemElement.append(question, answer);
        faq.appendChild(faqItemElement);
    });
}

export async function fetchWeatherData(stationIds, fetchImplementation = fetch) {
    return Promise.all(
        stationIds.map(async (id) => {
            try {
                const response = await fetchImplementation(
                    `https://api.brightsky.dev/current_weather?dwd_station_id=${id}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                return { id, error: error.message };
            }
        })
    );
}

export function normalizeWeatherResult(result) {
    const source = result.sources?.[0];
    const weather = result.weather;
    const requiredValues = [
        source?.station_name,
        weather?.temperature,
        weather?.condition,
        weather?.wind_speed_10,
        weather?.wind_direction_10,
    ];

    if (result.error || requiredValues.some((value) => value === null || value === undefined)) {
        return null;
    }

    return {
        city: source.station_name,
        temperature: `${weather.temperature}°C`,
        condition: weather.condition,
        windSpeed: `${weather.wind_speed_10} m/s`,
        windDirection: `${weather.wind_direction_10}°`,
    };
}

function createTableCell(tagName, value) {
    const cell = document.createElement(tagName);
    cell.textContent = value;
    return cell;
}

function renderWeatherTable(weatherTable, results) {
    const headerRow = document.createElement("tr");
    ["City", "Temperature", "Weather", "Wind Speed", "Wind Direction"].forEach(
        (heading) => headerRow.appendChild(createTableCell("th", heading))
    );

    weatherTable.replaceChildren(headerRow);

    const validResults = results.map(normalizeWeatherResult).filter(Boolean);

    if (validResults.length === 0) {
        const errorRow = document.createElement("tr");
        const errorCell = createTableCell("td", "Weather data is currently unavailable.");
        errorCell.colSpan = 5;
        errorRow.appendChild(errorCell);
        weatherTable.appendChild(errorRow);
        return;
    }

    validResults.forEach((weather) => {
        const row = document.createElement("tr");
        [
            weather.city,
            weather.temperature,
            weather.condition,
            weather.windSpeed,
            weather.windDirection,
        ].forEach((value) => row.appendChild(createTableCell("td", value)));
        weatherTable.appendChild(row);
    });
}

async function updateWeather() {
    const weatherTable = document.getElementById("weatherTable");

    if (!weatherTable) {
        return;
    }

    const results = await fetchWeatherData(WEATHER_STATION_IDS);
    renderWeatherTable(weatherTable, results);
}

export function initializePage() {
    initializeNavigation();
    initializeServicesAnimation();
    updateFAQs();
    void updateWeather();
}

if (typeof document !== "undefined") {
    initializePage();
}
