import 'package:obs_websocket/obs_websocket.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as io;

void main(List<String> args) {
//the method to connect has changed with v2.1.x

  () async {
    ObsWebSocket obsWebSocket =
        await ObsWebSocket.connect(connectUrl: 'ws://127.0.0.1:4444');

    var app = Router();

    app.get('/pause', (Request request) async {
      await obsWebSocket.pauseRecording();
      print("pause");
      return Response.ok('paused');
    });

    app.get('/resume', (Request request) async {
      await obsWebSocket.resumeRecording();
      print("resume");
      return Response.ok('resumed');
    });

    print("running on http://localhost:52000 ...");
    var server = await io.serve(app, 'localhost', 52000);
  }();
}
