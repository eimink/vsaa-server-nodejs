"use strict";
exports.initialz = function (req, res) {
  var response = {
    _links: {
      self: { href: RESOURCES.INITIAL }
    }
  };

  if (req.clientId) {
    response._links["http://rel.example.com/event"] = { href: RESOURCES.EVENT };
  } else {
    response._links["oauth2-token"] = {
      href: RESOURCES.TOKEN,
      "grant-types": "client_credentials",
      "token-types": "bearer"
    };
  }

  res.contentType = "application/hal+json";
  res.send(response);
};
