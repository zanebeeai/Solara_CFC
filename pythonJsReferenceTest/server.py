from flask import Flask, jsonify, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/get_flux_data', methods=['GET'])
def get_flux_data():
    print("trying to get flux data")
    url = 'https://spaceweather.gc.ca/forecast-prevision/solar-solaire/solarflux/sx-5-flux-en.php'
    response = requests.get(url)

    if response.status_code == 200:
        print("accessed")
        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table', {'class': 'table table-bordered'})
        print(soup)
        if table:
            # Extract table data as a list of lists
            table_data = []
            for row in table.find_all('tr'):
                row_data = [cell.text.strip() for cell in row.find_all('td')]
                table_data.append(row_data)

            return jsonify(table_data)

    else:
        print("site reference was goodnt")

    return jsonify({'error': 'Table not found'}), 404


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
