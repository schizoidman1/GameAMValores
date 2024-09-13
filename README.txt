Aqui está um exemplo de um arquivo `README.md` para seu projeto de jogo:

---

# Jogo de Fluxo de Bloqueio WCM

Este projeto é um jogo de arrastar e soltar onde os usuários devem sequenciar corretamente atividades e associar cada uma ao responsável correto dentro do fluxo de bloqueio do WCM. Após completar o jogo, o usuário pode verificar suas respostas e visualizar um gráfico de acertos e erros, além de um gabarito com as respostas corretas.

## Como Executar o Jogo

### Pré-requisitos

1. **Python**: Certifique-se de ter o [Python](https://www.python.org/downloads/) instalado na versão 3.7 ou superior. Caso não consiga instalar o python diretamente na máquina devido a restrições, você pode instalar através do aplicativo Microsoft Visual Studio Code e acessar a aba Extensões e procurar pela extensão do Python.
2. **Bibliotecas Necessárias**:
    - `Flask`: Para rodar o servidor web.
    - `Chart.js`: Para renderizar gráficos no frontend.
    - `Interat.js`: Para a funcionalidade de arrastar e soltar.
    - `HTML/CSS/JavaScript`: Para estruturar e estilizar o jogo.

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/schizoidman1/GameAMValores.git
   cd seu-repositorio
   ```

2. **Instale as dependências do Python**:
   ```bash
   pip install flask
   ```

### Executando o Jogo

1. **Iniciar o servidor Flask**:
   Navegue até o diretório do projeto e execute o seguinte comando para rodar o servidor:
   ```bash
   python app.py
   ```
   Isso iniciará o servidor em `http://127.0.0.1:5000/`.

2. **Acessando o Jogo**:
   Abra o navegador de sua preferência e vá até `http://127.0.0.1:5000/` para acessar o jogo.

### Parando a Execução

1. **Parar o servidor**:
   Para parar o servidor Flask, pressione `CTRL + C` no terminal onde o servidor está sendo executado.

## Informações do Banco de Dados

### Descrição

O jogo salva os resultados em um arquivo CSV localmente, com o nome `respostas.csv`. Este arquivo contém as respostas do usuário, incluindo a área selecionada, a pontuação, a data e a hora em que o jogo foi jogado.

### Formato do CSV

O arquivo `respostas.csv` segue o seguinte formato:

| Área           | Contrato   | Pontuação | Data       | Hora     |
| -------------- | ---------- | --------- | ---------- | -------- |
| Administração  | Interno    |    18     | 2024-09-09 | 14:30:00 |
| Operação       | Contratado |     0     | 2024-09-09 | 14:35:00 |

### Permissões

Certifique-se de que o arquivo `respostas.csv` tenha permissões de leitura e escrita no diretório onde o projeto está sendo executado. Se o arquivo não existir, ele será criado automaticamente na primeira vez que o jogo for jogado.

## Permissões e Segurança

- O jogo roda localmente e não requer permissões especiais.
- Nenhum dado é enviado para servidores externos.
- Certifique-se de rodar o jogo em um ambiente local seguro, já que ele usa arquivos CSV para armazenar informações.
  
## Dependências de JavaScript

1. **Chart.js**: Usado para gerar gráficos de desempenho de acertos e erros.
2. **Interact.js**: Usado para funcionalidades de arrastar e soltar no jogo.

## Estrutura do Projeto

```
├── static
│   ├── css
│   │   └── style.css       # Estilos do jogo
│   ├── js
│   │   └── script.js       # Lógica do jogo em JavaScript
│   └── assets
│       └── logo.png        # Logo da ArcelorMittal
├── templates
│   └── index.html          # Página principal do jogo
├── app.py                  # Aplicação Flask
├── README.txt              # Este arquivo
└── README.md               # README em markdown
```
