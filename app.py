from flask import Flask, render_template, request, jsonify
import csv
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save-csv', methods=['POST'])
def save_csv():
    data = request.get_json()
    area = data['area']
    contract = data['contract']
    score = data['score']
    date = datetime.now().strftime("%Y-%m-%d")
    time = datetime.now().strftime("%H:%M:%S")

    file_exists = os.path.isfile('respostas.csv')

    with open('respostas.csv', mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(['Área', 'Contrato', 'Pontuação', 'Data', 'Hora'])  # Escreve o cabeçalho se o arquivo não existir
        writer.writerow([area, contract, score, date, time])

    return jsonify({"message": "CSV salvo com sucesso!"})


@app.route('/get-area-data', methods=['GET'])
def get_area_data():
    area_scores = {'Administração': 0, 'Manutenção': 0, 'Operação': 0}

    with open('respostas.csv', mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            area = row['Área']
            score = int(row['Pontuação'])
            if area in area_scores:
                area_scores[area] += score

    return jsonify(area_scores)


if __name__ == '__main__':
    app.run(debug=True)
