from flask import Flask, jsonify, render_template, request, send_from_directory
import requests, csv, json
from bs4 import BeautifulSoup
from io import StringIO
import re

app = Flask(__name__)

# ignore selective detectors; nh; sh; global
#N+ S-; E+ W-
CFC_areaCoords = {
    "alt": (82.5, -62.3),
    "sum": (72.6, -38.4),
    "brw": (71.3, -156.6),
    "mhd": (53, -10),
    "thd": (41, -124),
    "nwr": (40.052, -105.585),
    "kum": (19.5, -154.8),
    "mlo": (19.5, -155.6),
    "smo": (-14.3, -170.6),
    "cgo": (-40.7, 144.8),
    "psa": (-64.6, -64.0),
    "spo": (-90, 0),  # South Pole (90S) can be represented as (90, 0)
}
def get_ozone_data():
    url = "https://ozonewatch.gsfc.nasa.gov/data/omi/Y2023/L3_ozone_omi_20231006.txt" #could constantly update that last number but also no
    response = requests.get(url)
    # print(response)
    # return("eh")
    lines = response.text[244:].replace("\n", "").split(" lat = ")

    result = [[int(x.replace(' ', '0')) for x in lines[0][7:].strip(' ')]]
    for i in range(1, len(lines)):
        result.append(float(lines[i][1:6]))
        result.append([
            int(x.replace(' ', '0')) for x in lines[i][7:].strip(' ')
        ])
    # Combine latitudes and number sequences into a list of tuples

    yCoeff = 3
    mapRes = []

    for i in range(0, len(result)-1, 2):
        lat = result[i+1]
        longs = result[i]
        for long in range(len(longs)):
            mapRes.append([lat, int((long-180*3)/yCoeff), longs[long]])

    return(mapRes)
def get_flux_data():
    print("trying to get flux data")
    url = 'https://spaceweather.gc.ca/forecast-prevision/solar-solaire/solarflux/sx-5-flux-en.php'
    response = requests.get(url)

    if response.status_code == 200:
        print("accessed")
        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table', {'class': 'table table-bordered'})
        # print(soup)
        if table:
            # Find the last row in the table
            last_row = table.find_all('tr')[-1]

            # Extract the last row's data as a list
            last_row_data = [cell.text.strip() for cell in last_row.find_all('td')]

            print(last_row_data)
            return (last_row_data)

    else:
        print("site reference was goodnt")

    return 'Table not found'


def sendData(queryTerms):
    # get query terms
    # queryTerms = ['cfc12', 'cfc11']

    zeroT = {
        'cfc11': [220, "PPT"],
        'cfc12': [460, "PPT"],
        'cfc13': [0.1, "PPT"],
        'ozone': [0.1, "PPT"],
        'temperature': [-100, "°"],
        'solarFlux': [30, "SFU"],
    }
    bigData = []

    for query in queryTerms:
        data = {}
        data["threshold"], data["type"] = zeroT[query]
        data["points"] = []

        queryData = pullData(query)
        for d in queryData:
            if(query[:3] == "cfc"):
                data["points"].append([x for x in d]+[queryData[d]])

            elif(query == "solarFlux"):
                data["points"] = [float(queryData[-2])]

            else:
                data["points"] = queryData

        bigData.append(data)

    # Specify the path to the JSON file where you want to save the data
    json_file_path = 'templates/output.json'

    print(bigData)

    # Write the bigData array to the JSON file
    with open(json_file_path, 'w') as json_file:
        json.dump(bigData, json_file, indent=4)



def pullData(query):
    CFC_link_index = {
        'cfc11': "https://gml.noaa.gov/aftp/data/hats/cfcs/cfc11/combined/HATS_global_F11.txt",
        'cfc12': "https://gml.noaa.gov/aftp/data/hats/cfcs/cfc12/combined/HATS_global_F12.txt",
        'cfc13': "https://gml.noaa.gov/aftp/data/hats/cfcs/cfc113/combined/HATS_global_F113.txt",
    }

    if(query[:3] == "cfc"):
        response = requests.get(CFC_link_index[query])

        # Check if the request was successful
        if response.status_code == 200:
            # Convert the response content (CSV data) into a string
            csv_data = response.text

            # Use StringIO to treat the string as a file-like object
            csv_file = StringIO(csv_data)

            # Create a CSV reader object
            csv_reader = csv.reader(csv_file)

            rows = list(csv_reader)

            # header row is index 67
            print("Header row i think idk")
            # both length 33
            header = rows[67][0].split()
            latestFilledData = 0
            for i in range(len(rows) - 1, -1, -1):
                if 'nan' not in rows[i][0].split():
                    latestFilledData = (rows[i][0].split())
                    break  # Stop looking further

            # print(header[8].split('_')[1])
            radMult = 15
            # data = {(CFC_areaCoords[header[i].split('_')[1]] if header[i].split('_')[1] in [key for key in CFC_areaCoords] and len(header[i].split('_')) == 3 else header[i]): latestFilledData[i] for i in range(len(header))}
            data = {(CFC_areaCoords[header[i].split('_')[1]] if header[i].split('_')[1] in [key for key in
                                                                                            CFC_areaCoords] and len(
                header[i].split('_')) == 3 else ""): float(latestFilledData[i])*radMult for i in range(len(header))}
            del data[""]
            print(data)
            return(data)

        else:
            print(f"Failed to fetch CSV data. Status code: {response.status_code}")
    elif (query == "solarFlux"):
        return(get_flux_data())
    elif (query == "ozone"):
        return(get_ozone_data())

# @app.route('/', methods=['GET'])
# def serve_index():
#     return send_from_directory('pages', 'index.tsx',  mimetype='text/plain' )


@app.route('/data', methods=['GET'])
def data():
    query_data = request.args.getlist('queryData')
    sendData(query_data)
    return render_template('output.json')

if __name__ == '__main__':
    app.run(debug=True)
