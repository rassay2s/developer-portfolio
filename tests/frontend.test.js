import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { sendData } from "../assets/js/contact.js";
import { createFAQs, fetchWeatherData, normalizeWeatherResult } from "../assets/js/main.js";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "about.html", "services.html", "help.html", "contact.html"];

test("all portfolio pages load the shared ES module without inline handlers", () => {
    for (const page of pages) {
        const html = readFileSync(resolve(repositoryRoot, page), "utf8");
        assert.match(html, /<script type="module" src="assets\/js\/main\.js"><\/script>/);
        assert.doesNotMatch(html, /\son(?:click|submit|input|load)=/i);
    }
});

test("local page resources and links exist", () => {
    const referencePattern = /(?:href|src)="([^"]+)"/g;

    for (const page of pages) {
        const html = readFileSync(resolve(repositoryRoot, page), "utf8");

        for (const [, reference] of html.matchAll(referencePattern)) {
            if (/^(?:https?:|#|mailto:|tel:)/.test(reference)) {
                continue;
            }

            const localPath = reference.split("#", 1)[0];
            assert.ok(existsSync(resolve(repositoryRoot, localPath)), `${page}: missing ${localPath}`);
        }
    }
});

test("FAQ data is created in matching question and answer pairs", () => {
    const faqs = createFAQs();
    assert.equal(faqs.length, 3);
    assert.ok(faqs.every(({ question, answer }) => question && answer));
});

test("weather normalization preserves valid zero values", () => {
    const result = normalizeWeatherResult({
        sources: [{ station_name: "Bonn" }],
        weather: {
            temperature: 0,
            condition: "dry",
            wind_speed_10: 0,
            wind_direction_10: 0,
        },
    });

    assert.deepEqual(result, {
        city: "Bonn",
        temperature: "0°C",
        condition: "dry",
        windSpeed: "0 m/s",
        windDirection: "0°",
    });
});

test("weather requests return structured failures instead of rejecting the batch", async () => {
    const results = await fetchWeatherData(["02667"], async () => ({
        ok: false,
        status: 503,
    }));

    assert.equal(results[0].id, "02667");
    assert.match(results[0].error, /503/);
});

test("contact submission validates required values", async () => {
    await assert.rejects(sendData("", "rami@example.com", "Hello", 0), /fill in all fields/i);
    await assert.doesNotReject(sendData("Rami", "rami@example.com", "Hello", 0));
});
