document.addEventListener('DOMContentLoaded', () => {
    let currentDraggable = null;
    let isCheckButtonClicked = false;

    const popup = document.getElementById('confirmationPopup');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');
    const checkButton = document.getElementById('checkAnswersButton');

    function showPopup() {
        popup.classList.add('show');
    }

    function hidePopup() {
        popup.classList.remove('show');
    }

    function handleDragStart(e) {
        currentDraggable = this;
        currentDraggable.classList.add('dragging');
    }

    function handleDragEnd(e) {
        currentDraggable.classList.remove('dragging');
        currentDraggable = null;
    }

    function handleDrop(e) {
        e.preventDefault();
        if (currentDraggable) {
            this.appendChild(currentDraggable);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const activitiesContainer = document.querySelector('.mixed-column');
    const activities = Array.from(activitiesContainer.querySelectorAll('.draggable'));
    const shuffledActivities = shuffleArray(activities);

    activitiesContainer.innerHTML = '';
    shuffledActivities.forEach(activity => activitiesContainer.appendChild(activity));

    const draggables = document.querySelectorAll('.draggable');
    const dropzones = document.querySelectorAll('.dropzone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
        
        draggable.addEventListener('touchstart', handleDragStart);
        draggable.addEventListener('touchend', handleDragEnd);
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);

        zone.addEventListener('touchmove', handleDragOver);
        zone.addEventListener('touchend', handleDrop);
    });

    const correctAnswers = {
        "responsavel-1": "responsavel2",
        "atividade-2": "atividade2",
        "responsavel-2": "responsavel3",
        "atividade-3": "atividade3",
        "responsavel-3": "responsavel2",
        "atividade-4": "atividade4",
        "responsavel-4": "responsavel1",
        "atividade-5": "atividade5",
        "responsavel-5": "responsavel4",
        "atividade-6": "atividade6",
        "responsavel-6": "responsavel4",
        "atividade-7": "atividade7",
        "responsavel-7": "responsavel1",
        "atividade-8": "atividade8",
        "responsavel-8": "responsavel3",
        "responsavel-9": "responsavel2"
    };

    // Função para calcular score
    function calculateScore() {
        let score = 0
        const total = Object.keys(correctAnswers).length;

        for (const [dropzoneId, correctItemId] of Object.entries(correctAnswers)) {
            const dropzone = document.getElementById(dropzoneId);
            const child = dropzone.firstElementChild;

            if (child && child.id.startsWith(correctItemId)) {
                score++;
            }
        }

        return { score, total };
    }

    function calculatePercentage(score, total) {
        return Math.round((score / total) * 100);
    }

    function revealAnswers() {
        let delay = 0;

        for (const [dropzoneId, correctItemId] of Object.entries(correctAnswers)) {
            const dropzone = document.getElementById(dropzoneId);
            const child = dropzone.firstElementChild;

            // Adiciona um pequeno atraso para a animação
            setTimeout(() => {
                if (child && child.id === correctItemId) {
                    dropzone.classList.add('correct', 'reveal-animation'); // Resposta correta
                } else {
                    dropzone.classList.add('wrong', 'reveal-animation'); // Resposta errada
                }
            }, delay);

            delay += 250; // Adiciona um delay de 0.5s entre cada revelação
        }
    }

    checkButton.addEventListener('click', () => {
        if (isCheckButtonClicked) {
            alert("Você já verificou suas respostas.");
            return;
        }

        isCheckButtonClicked = true;
        
        showPopup();
    });

    confirmButton.addEventListener('click', async () => {
        isCheckButtonClicked = true;
        
        const { score, total } = calculateScore();
        hidePopup();
        
        revealAnswers();

        setTimeout(() => {
            showChartPopup(score, total);
        }, 5000);

        checkButton.disabled = true;
        checkButton.classList.add('disabled');

        // Enviar dados ao servidor
        const userArea = document.getElementById('userArea').value;
        const userContract = document.getElementById('userContract').value;

        fetch('/save-csv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                area: userArea,
                contract: userContract,
                score: score
            })
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Erro ao salvar o CSV:', error));
    });
    
    
    
    cancelButton.addEventListener('click', async () =>{
        try{
            hidePopup();
        } catch(error){
            console.error('Erro ao processar o cancelamento:', error);
            alert('Ocorreu um erro ao cancelar a operação. Tente novamente.')
        }
    });


    function showChartPopup(score, total, userArea) {
        const chartPopup = document.getElementById('chartPopup');
        chartPopup.classList.add('show');

        // Calcula a porcentagem de acertos
        const percentage = calculatePercentage(score, total);

        percentageElement = document.getElementById('acertos');
        percentageElement.textContent = percentage

        // Adiciona a porcentagem ao popup
        

        /*
        // Configurar o gráfico de acertos do usuário
        const ctx1 = document.getElementById('userScoreChart').getContext('2d');
        new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    data: [score, total - score],
                    backgroundColor: ['#4CAF50', '#f44336']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
         
        // Solicitar dados para o gráfico de maiores acertos por área
        fetch('/get-area-data')
            .then(response => response.json())
            .then(areaData => {
                const ctx2 = document.getElementById('areaScoreChart').getContext('2d');
                new Chart(ctx2, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(areaData),
                        datasets: [{
                            data: Object.values(areaData),
                            backgroundColor: ['#ff6f00', '#2196F3', '#FFC107']
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os dados das áreas:', error);
        });
        */
        // Fechar o gráfico
        document.getElementById('closeChartButton').addEventListener('click', () => {
            chartPopup.classList.remove('show');
            location.reload();
        });

        setTimeout(() => {
            location.reload();
        }, 20000); // 20 segundos
    }

    window.onload = function() {
        const gifContainer = document.querySelector('.tutorial');
    };
    
});
