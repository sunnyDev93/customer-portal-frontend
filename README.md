# Customer Portal Frontend
## Prerequesites
- [Node and NPM](https://nodejs.org/en/download/)
- [Homebrew](https://brew.sh/)
- If you're a Windows user [Git for Windows](https://git-scm.com/download/win)
- - _Git already comes pre-installed on Mac._

Optional
- [Docker](https://www.docker.com/)

## How to run Customer Portal Frontend locally

### Step 1 - Cloning the Repo
First of all, clone this repo to your local: 

`git clone git@gitlab.com:aptive-environmental/customer-portal/customer-portal-frontend.git`

### Step 2 - Installing dependencies
After cloning the repo, go to `/app` folder inside your project folder then run `npm install` to install all the project dependencies.

### Step 3 - .env file
Duplicate the file `.env.example` and rename it to `/app/.env.local`

Inside this file we have the following env variables:

| Variable | Description                                                                                                                                         | Possible values and examples                                                   |
|----|-----------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| REACT_APP_NODE_ENV | CI/CD Environment.                                                                                                                           | `testing` |
| REACT_APP_API_URL | Backend API URL.                                                                                                                           | `https://api.customer-portal.tst.goaptive.com/api/v2` 
| REACT_APP_AUTH0_DOMAIN | Auth0 Domain.                                                                                                                         | `auth.app.customer-portal.tst.goaptive.com`                                                      |
| REACT_APP_AUTH0_CLIENT_ID | Auth0 Client ID.                                                                                                                   | `1lxVCU8CnHfZddoCcPu0Vz3E94YOaFxk`                                               |
| REACT_APP_AUTH0_AUDIENCE | Auth0 Audience.                                                                                                                     | `https://tst-goaptive.us.auth0.com/api/v2/`                                      |
| REACT_APP_CONFIGCAT_SDK_KEY | ConfigCat FeatureFlag SDK Key.                                                                                                                     | `wiTbCHuCNkeKfI_d1eqT1Q/ssDQflaklEyO1mGSAMQKeA`                                      |

We use [Auth0](https://auth0.com/) to handle all the user authentication process. You can use the staging credentials _(`.env.staging`)_ or create your own free Auth0 account and use your own credentials for test purposes.

## Step 4 - Setting a custom dev domain
You'll need to setup a custom dev domain in your machine in order to run the application with no CORS issues. You just need to add a new line in your `hosts` file.

On Mac the `hosts` file is located in `/etc/hosts`.<br/>
On Windows you can find this file in `C:\Windows\System32\Drivers\etc\hosts`

Just open this file with your code editor or nano (on Mac) and add the following line at the end of the file:

`127.0.0.1 app.customer-portal.dev.goaptive.com`

Then just save the file.


## Step 5 - Setting up local HTTPS
Auth0 requires a secure environment to run.

To setup a free local https environment, go to `/app/src` folder and install `mkcert`:
- `brew install mkcert`

To generate self-signed certificates, first run: `mkcert -install` inside your `/app/src` folder. Then run `mkcert app.customer-portal.dev.goaptive.com`. This will generate two certificate files: `app.customer-portal.dev.goaptive.com-key.pem` and `app.customer-portal.dev.goaptive.com.pem`. **(make sure they're inside `/app/src`)**

## Step 6 - Run the project
Run `npm run start-https` to start the project in HTTPS mode.

Then navigate to `https://app.customer-portal.dev.goaptive.com:8000/` 

Auth0 is looking for app.customer-portal.dev.goaptive.com and **not** localhost or 127.0.0.1. You might have authentication or CORS issues if you try to access `https://localhost:8000` or `https://127.0.0.1:8000`

# How to run the project on Windows

Please read this: https://aptive.atlassian.net/wiki/spaces/EN/pages/1604812820/How+to+run+Customer+Portal+Front+end+on+Window
