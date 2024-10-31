export function convertToText(pdfData: { Pages: Array<{ Texts: Array<{ R: Array<{ T: string }> }> }> }) {
    const pdfText = {
        Paciente: "",
        Idade: "",
        DataNascimento: "",
        DataColeta: "",
        Solicitante: "",
        Material: "",
        Exame: "",
        Amostra: "",
        AdequabilidadeAmostra: "",
        EpiteliosRepresentados: "",
        Microbiologia: "",
        AlteracoesBenignas: "",
        Conclusao: ""
    };

    pdfData.Pages.forEach((page) => {
        const pageText = page.Texts.map(textObj =>
            textObj.R.map(item => decodeURIComponent(item.T)).join('')
        ).join(' ');

        // Verificar o conteúdo de pageText antes de prosseguir com regex
        console.log('Conteúdo de pageText:', pageText);

        // Utiliza regex com ajuste para lidar com espaços variáveis e quebras de linha
        pdfText.Paciente = (pageText.match(/Paciente:\s+(.*?)\s+Idade:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Idade = (pageText.match(/Idade:\s+(\d+)/)?.[1] || "").trim();
        pdfText.DataNascimento = (pageText.match(/Data de nascimento:\s+(.*?)\s+Data da coleta:/)?.[1] || "").trim();
        pdfText.DataColeta = (pageText.match(/Data da coleta:\s+(.*?)\s+Solicitante:/)?.[1] || "").trim();
        pdfText.Solicitante = (pageText.match(/Solicitante:\s+(.*?)\s+Material:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Material = (pageText.match(/Material:\s+(.*?)\s+Resultado/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Exame = (pageText.match(/Exame:\s+(.*?)\s+Tipo de amostra:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Amostra = (pageText.match(/Tipo de amostra:\s+(.*?)\s+Adequabilidade da amostra:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.AdequabilidadeAmostra = (pageText.match(/Adequabilidade da amostra:\s+(.*?)\s+Epitélios representados na amostra:/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.EpiteliosRepresentados = (pageText.match(/Epitélios representados na amostra:\s+(.*?)\s+Microbiologia:/)?.[1] || "").replace(/\s+/g, ' ').trim();

        // Ajuste: permitir múltiplos espaços e quebras de linha
        pdfText.Microbiologia = (pageText.match(/Microbiologia:\s*([\s\S]*?)(?=\s+Alterações\s+celulares\s+benignas\b)/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.AlteracoesBenignas = (pageText.match(/Alterações\s*celulares\s*benignas\s*:\s*([\s\S]*?)(?=\s+Conclusão\b)/)?.[1] || "").replace(/\s+/g, ' ').trim();

        // pdfText.AlteracoesBenignas = (pageText.match(/Alterações\s*celulares\s*benignas:\s*([\s\S]*)/)?.[1] || "").replace(/\s+/g, ' ').trim();
        pdfText.Conclusao = (pageText.match(/Conclusão:\s+(.*?)\s+COMENTÁRIO:/)?.[1] || "").replace(/\s+/g, ' ').trim();
    });

    console.log(pdfText);
    // return pdfText;
}
