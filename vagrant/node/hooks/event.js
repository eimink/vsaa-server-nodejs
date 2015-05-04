"use strict";
exports.event = function (req, res) {
  if (!req.clientId) {
    return res.sendUnauthenticated();
  }
  var fields = [
    req.body.DeviceId,
    req.body.Description,
    req.body.ApiKey
  ];
  var response = {
    "success": "event recorded successfully",
    _links: {
      self: { href: RESOURCES.EVENT },
      parent: { href: RESOURCES.INITIAL }
    }
  }
  db.createEvent(fields, function (err, result) {
    if (err) {
      response = {
        "error": "err",
        _links: {
          self: { href: RESOURCES.EVENT },
          parent: { href: RESOURCES.INITIAL }
        }
      }
    }
  });
  if (req.body.message_type === 'APPLICATION_EVENT_QUIT')
    hooks.invalidateClientToken(req.authorization.credentials);
  res.contentType = "application/hal+json";
  res.send(response);
};
