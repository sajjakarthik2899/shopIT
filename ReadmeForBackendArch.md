Folder	Purpose
controller/	: Contains functions that define what happens when a route is hit (business logic).
routes/	: Defines the API endpoints and connects them to controller methods.
models/ : 	Contains Mongoose schemas that define the data structure and validations.
middlewares/ : Contains reusable middleware logic like authentication, error handling.
utils/ : Helper functions like sending emails, creating tokens, formatting data, etc.
public/ : Used to serve static files (like password-reset.html, images, etc.).
config/	: (Usually) contains DB connection files, environment setups.