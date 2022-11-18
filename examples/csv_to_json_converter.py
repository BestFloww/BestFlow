# In order to convert your csv file to JSON you just need to have the file in the same folder as this file.
# Change the csvFilePath to the name of your csv file and change the jsonFilePath to the name you want your JSON file to have.
# Run the file and you will have your JSON file in the same folder. 

import csv
import json
import sys
csv.field_size_limit(sys.maxsize)

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []

    # read csv file
    with open(csvFilePath, encoding='utf-8') as csvf:
        # load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf)

        # convert each csv row into python dict
        for row in csvReader:
            # add this python dict to json array
            jsonArray.append(row)

    # convert python jsonArray to JSON String and write to file
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)

if __name__ == '__main__':
    csvFilePath = r'March-April.csv'
    jsonFilePath = r'March-April.json'
    csv_to_json(csvFilePath, jsonFilePath)
