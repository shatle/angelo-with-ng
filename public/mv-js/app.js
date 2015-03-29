var ws, ews;
var openws = function() {
  ws = new WebSocket('ws://127.0.0.1:4567/ws?foo=bar');
  ws.onmessage = function(e) { console.log(e.data); };
  ws.onopen = function(e) {
    // ws.send('hi');
  };
}

var emit = function() {
  var value = $('#emitInput').val();
  if ($.trim(value)!="") 
    $.post('/emit', {data: value});
}
// ===
$(function(){
  $('#openws').on('click', openws);
  $('#emit').on('click', emit);
})