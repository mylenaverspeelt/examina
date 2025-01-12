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

        pdfText.Paciente = (pageText.match(/Paciente:\s+([A-Za-zÀ-ÖØ-öø-ÿÇç\s]+)\s+Idade:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Idade = (pageText.match(/Idade:\s+(\d+)/)?.[1] || "").trim();
        pdfText.DataNascimento = (pageText.match(/Data de nascimento:\s+(\d{2}\/\d{2}\/\d{4})/)?.[1] || "").trim();
        pdfText.DataColeta = (pageText.match(/Data da coleta:\s+(\d{2}\/\d{2}\/\d{4})/)?.[1] || "").trim();
        pdfText.Solicitante = (pageText.match(/Solicitante:\s+([A-Za-zÀ-ÖØ-öø-ÿÇç\s]+)\s+Material:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Material = (pageText.match(/Material:\s+([A-Za-zÀ-ÖØ-öø-ÿÇç]+)/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Result = (pageText.match(/G\s*l\s*i\s*c\s*o\s*s\s*e:\s*(\d{2,3})\s*m\s*g\s*\/\s*d\s*L/i)?.[1] || "").trim();  

    });

    return pdfText;
}
