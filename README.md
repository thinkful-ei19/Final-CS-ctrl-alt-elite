Endpoints guide:

    Register:
    POST
    '.../api/register'
        requires: username, password
        responds with username, password

    Login:
    POST
    '.../api/login'
        requires: username, password
        responds with authToken

    Get all user info with appointments and clients (when user ID not available):
    POST
    '.../api/users'
        requires: username (in body)
        responds with entire user information:
        appointments and clients information is all populated.

    Get all user info with appointments and clients (with user ID):
    GET
    '../api/users/:id'
        requires: user_ID (in params)
        responds with entire user information:
        appointments and clients information is all populated.

    Create appointment:
    POST
    '../api/appointments/:id'
        requires: id (in params, this is user ID not appointment ID!)
        { time, client, notes } required in body
        responds with user with new appointment included;

    Create client:
    POST
    '../api/clients/:id'
        requires: id (in params, this is user ID not client ID!)
        { email, name, phone } required in body
        responds with user with new client included;        

    Edit appointment:
    PUT
    '.../api/appointments/:id'
        requires: id (in params, this is appointment ID)
        { time, notes, client } in body
        responds with new appointment
        if you need to update the front end state, either update the state on the front end or do another get request on user.

    Edit client:
    PUT
    '.../api/clients/:id'
        requires: id (in params, this is client ID)
        { name, phone, email } in body
        responds with new client
        if you need to update the front end state, either update the state on the front end or do another get request on user.

    Delete appointment:
    DELETE
    '.../api/appointments/:id'
        requires: id (in params, this is appointment ID)
        { userId } in body
        responds with 204
        if you need to update the front end state, either update the state on the front end or do another get request on user.

    Delete client:
    DELETE
    '.../api/clients/:id'
        requires: id (in params, this is client ID)
        { userId } in body
        responds with 204
        if you need to update the front end state, either update the state on the front end or do another get request on user.
