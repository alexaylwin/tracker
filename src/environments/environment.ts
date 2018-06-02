// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

//LOCAL
//export const SERVICE_BASE_URL:String = "http://localhost:8080/tracker/api";

//NUC
//export const SERVICE_BASE_URL = "http://192.168.1.22/tracker-service";

//PROD
export const SERVICE_BASE_URL:String = "http://tracker-service.alexaylwin.com/tracker/api";
