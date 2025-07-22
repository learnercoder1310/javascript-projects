let form = document.querySelector("form");
let resultDiv = document.querySelector(".result");

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents auto submission
    getWordInfo(form.elements[0].value);
});

let getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = "Fetching Data...";
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error("Word not found");

        let data = await response.json();
        let definitions = data[0].meanings[0].definitions[0];

        // Start building HTML content
        let html = `
            <h2><strong>Word:</strong> ${data[0].word}</h2>
            <p><strong>Part of Speech:</strong> ${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:</strong> ${definitions.definition !== undefined ? definitions.definition : "Not Found"}</p>
            <p><strong>Example:</strong> ${definitions.example || "No example available"}</p>
            <p><strong>Antonyms:</strong></p>
        `;

        if (!definitions.antonyms || definitions.antonyms.length === 0) {
            html += `<span>Not Found</span>`;
        } else {
            html += "<ul>";
            for (let i = 0; i < definitions.antonyms.length; i++) {
                html += `<li>${definitions.antonyms[i]}</li>`;
            }
            html += "</ul>";
        }

        // Add Read More at the end
        html += `<p><a href="${data[0].sourceUrls[0]}" target="_blank">Read More</a></p>`;

        // Finally, inject all content into resultDiv
        resultDiv.innerHTML = html;

    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;"><strong>Error:</strong> ${error.message}</p>`;
    }
};



