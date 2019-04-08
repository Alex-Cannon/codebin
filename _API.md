# API Documentation

## LOGIN
### POST /signup
### POST /signin
### GET (Auth) /signout

## USER
### GET (Auth) /:USER
### POST (Auth) /:USER/settings
### PUT (Auth) /:USER/settings
### DELETE (Auth, login) /:USER

## CODEBINS
### GET (Auth) /:BIN
### POST (Auth, isAuthor) /:BIN
### PUT (Auth, isAuthor) /:BIN
### DELETE (Auth, isAuthor) /:BIN

## SEARCH
### GET /search?