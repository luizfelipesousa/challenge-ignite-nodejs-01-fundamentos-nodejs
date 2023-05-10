import fs from 'fs';
import { parse } from 'csv-parse';

const csvPath = new URL("./tasks.csv", import.meta.url);

const csvStream = fs.createReadStream(csvPath);

const parser = parse({
    fromLine: 2,
    delimiter: ',',
    skiptEmptyLines: true
});

(async (req, res) => {

    const lines = csvStream.pipe(parser);

    for await (const line of lines) {

        const [title, description] = line;

        console.log(line);

        fetch('http://localhost:3333/tasks', {
            method: 'POST',
            body: JSON.stringify({ title, description })
        }).then(response => response.text())
            .then(text => console.log(text));

    }

    await new Promise((resolve) => setTimeout(resolve, 300));

})();