Endpoints guide:

Register:
'.../api/register'
    requires: username, password
    responds with username, password

Login:
'.../api/login'
    requires: username, password
    responds with authToken

Get all user info with appointments and clients:
'.../api/users/:id'
    requires: id (in params)
    responds with entire user information:
    appointments and clients information is all populated.

Create appointment:
'../api/appointments/:id'
    requires: id (in params, this is user ID not appointment ID!)
    { time, client, notes } required in body
    responds with new appointment created;
    if you need to update the front end state, either take this response and push it in to the state, or run another get request on the get user endpoint which will respond with updated user info.

Create client:
'../api/clients/:id'
    requires: id (in params, this is user ID not client ID!)
    { email, name, phone } required in body
    responds with new client created;
    if you need to update the front end state, either take this response and push it in to the state, or run another get request on the get user endpoint which will respond with updated user info.

Delete appointment:
'.../api/appointments/:id'
    requires: id (in params, this is appointment ID)
    { userId } in body
    responds with 204
    if you need to update the front end state, either take this response and push it in to the state, or run another get request on the get user endpoint which will respond with updated user info.

Delete client:
'.../api/clients/:id'
    requires: id (in params, this is client ID)
    { userId } in body
    responds with 204
    if you need to update the front end state, either take this response and push it in to the state, or run another get request on the get user endpoint which will respond with updated user info.