from obswebsocket import obsws, requests

host = "localhost"
port = 4444
password = "secret"

ws = obsws(host, port, password)
ws.connect()

ws.call(requests.PauseRecording())
#ws.call(requests.ResumeRecording())