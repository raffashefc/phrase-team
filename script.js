document.addEventListener("DOMContentLoaded", () => {
    let lastMsgIndex = -1;
    let lastGifIndex = -1;

    const phraseEl = document.getElementById("phrase");
    const categoryEl = document.getElementById("category");
    const gifEl = document.getElementById("teamGif");
    const generateBtn = document.getElementById("generate");
    const gifContainer = document.getElementById("gifContainer");
    const shareBtn = document.getElementById("share");
    const copyBtn = document.getElementById("copy");
    const secondaryActions = document.getElementById("secondaryActions");
    
    function generateSurprise() {
        if (!phraseEl || messages.length === 0 || gifs.length === 0) return;

        // Sorteia uma frase sem repetir a anterior
        let msgIndex;

        do {
            msgIndex = Math.floor(Math.random() * messages.length);
        } while (messages.length > 1 && msgIndex === lastMsgIndex);

        lastMsgIndex = msgIndex;

        // Sorteia um GIF sem repetir o anterior
        let gifIndex;

        do {
            gifIndex = Math.floor(Math.random() * gifs.length);
        } while (gifs.length > 1 && gifIndex === lastGifIndex);

        lastGifIndex = gifIndex;

        const currentMsg = messages[msgIndex];

        // Prepara a animação
        phraseEl.classList.remove("changed");
        gifEl.classList.remove("changed");

        void phraseEl.offsetWidth;

        // Atualiza a mensagem, a categoria e o GIF
        phraseEl.textContent = currentMsg.text;
        categoryEl.textContent = currentMsg.category;
        categoryEl.classList.add("active");
        gifEl.src = gifs[gifIndex];

        // Exibe o conteúdo desbloqueado
       gifContainer.hidden = false;
secondaryActions.hidden = false;

        // Aplica as animações
        phraseEl.classList.add("changed");
        gifEl.classList.add("changed");

        // Atualiza o texto do botão
        generateBtn.textContent = "Ver outro insight";
    }

    async function copyInsight() {
    const text = `${phraseEl.textContent}\n${window.location.href}`;

    try {
        await navigator.clipboard.writeText(text);

        copyBtn.textContent = "Copiado! ✓";

        setTimeout(() => {
            copyBtn.textContent = "Copiar ⧉";
        }, 2000);
    } catch (error) {
        console.error("Não foi possível copiar:", error);
        alert("Não foi possível copiar automaticamente. Verifique as permissões do navegador.");
    }
}

    async function shareInsight() {
        const text = phraseEl.textContent;
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Insight do hello_world.exe",
                    text: text,
                    url: url
                });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Não foi possível compartilhar:", error);
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${text}\n${url}`);
                alert("Insight e link copiados!");
            } catch (error) {
                console.error("Não foi possível copiar:", error);
                alert("Não foi possível compartilhar ou copiar automaticamente.");
            }
        }
    }

    // Registra os eventos dos botões
    generateBtn.addEventListener("click", generateSurprise);
    shareBtn.addEventListener("click", shareInsight);
    copyBtn.addEventListener("click", copyInsight);
});
