export function convertToText(pdfData: { Pages: Array<{ Texts: Array<{ R: Array<{ T: string }> }> }> }) {
    const pdfText = {
        Paciente: "",
        Idade: "",
        DataNascimento: "",
        DataColeta: "",
        Solicitante: "",
        Material: "",
        Result: "", 
    };

    pdfData.Pages.forEach((page) => {
        const pageText = page.Texts.map(textObj =>
            textObj.R.map(item => decodeURIComponent(item.T)).join('')
        ).join(' ');

        console.log('Conteúdo de pageText:', pageText);

        pdfText.Paciente = (pageText.match(/Paciente:\s+(.*?)\s+Idade:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Idade = (pageText.match(/Idade:\s+(\d+)/)?.[1] || "").trim();
        pdfText.DataNascimento = (pageText.match(/Data de nascimento:\s+(.*?)\s+Data da coleta:/)?.[1] || "").trim();
        pdfText.DataColeta = (pageText.match(/Data da coleta:\s+(.*?)\s+Solicitante:/)?.[1] || "").trim();
        pdfText.Solicitante = (pageText.match(/Solicitante:\s+(.*?)\s+Material:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Material = (pageText.match(/Material:\s+(.*?)\s+Resultado/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Result = (pageText.match(/Glicose:\s+(\d+)\s+mg\/dL/)?.[1] || "").trim();
    });

    return pdfText;
}
