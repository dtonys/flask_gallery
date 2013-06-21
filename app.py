from flask import Flask, url_for, render_template
import requests, json

app = Flask(__name__)
guide1_url = 'http://snapguide.com/api/v1/guide/b995492d5e7943e3b2757a88fe3ef7c6'
guide2_url = 'http://snapguide.com/api/v1/guide/0bed6fee853b4f4e966cec0f1210079d'

#routes
@app.route('/')
def index():
    return render_template('main.html')

@app.route('/getJSON')
def getJSON():
    r = requests.get('http://snapguide.com/api/v1/guide/b995492d5e7943e3b2757a88fe3ef7c6')
    #converts JSON response to python dict
    dict_data = r.json()
    #convert python dict back to JSON
    json_data = json.dumps(dict_data)
    return json_data

@app.route('/getJSON_2')
def getJSON_2():
    r = requests.get('http://snapguide.com/api/v1/guide/0bed6fee853b4f4e966cec0f1210079d')
    #converts JSON response to python dict
    dict_data = r.json()
    #convert python dict back to JSON
    json_data = json.dumps(dict_data)
    return json_data

@app.route('/getGuide')
def getGuide():
    return render_template('guide.html')
    
#listen on localhost
if __name__ == '__main__':
    app.debug = True
    app.run()
    #to listen from all computers on LAN
    #app.run('0.0.0.0')