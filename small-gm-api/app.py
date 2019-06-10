from flask import Flask
import util
import os

app = Flask(__name__)
app.debug = True

@app.route('/sequence')
def sequence():
    return util.get_sequence()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT'))
