<p align="center">
  <img width="200px" src="https://www.finastra.com/themes/custom/kickstart/logo.png" title="UI-Bootstrap-App" alt="Finastra Logo">
  <br/>
  <b><font size="5">UI-Development-BootStrap-App</font></b>
</p>

# Introduction
<p>
This code structure is a bootstrapped project for UI development in VueJS/Vuetify which includes the base libraries and components and configured to build and run as a VueJS project. The base components are developed following Finastra design system guidelines as applicable - https://design.fusionfabric.cloud/ . This would enable to get started with UI application development in VueJS faster and re-use the base/common components and Finastra design standard.
</p>

---
### It includes :
<p>
o	Navigation Drawer<br />
o	Top Navigation Bar (configurable)<br />
o	Notifications List<br />
o	Login and Logout Screens<br />
o	Global Search UI<br />
o	Menus and Routing (_config/_app/navigationConfiguration.json & src/core/router/index.js)<br />
o	Idle/Inactivity time out component<br />
o	Unit Test framework and sample test cases included<br />
o	External Help Link<br />
o	Cookie Accept Component<br />
o	Breadcrums<br />
o	Store<br />
o	Components : <br />
  <ul>
    <li>Snackbar</li>
    <li>File Upload</li>
    <li>OTP component</li>
    <li>Error Handler</li>
    <li>Modal / Dialog</li>
    <li>Forms (using schema)</li>
    <li>PhotoCapture (Camera)</li>
    <li>Clipper (image clipper)</li>
  </ul>
o	Sample UI screens :<br />
  <ul>
    <li>Account Listing</li>
    <li>Account Information View</li>
    <li>Customer Profile</li>
  </ul>

o	Other Re-usable UI components Code Repo (VueJS) – [See the components here](https://scm-git-eur.misys.global.ad/projects/FM/repos/retailrow-uicomponents-web/browse/Vuejs?at=refs%2Fheads%2Fdevelop)<br />
o	Configurability Included : <br />
  <ul>
  
  [DCO configurability and customization - Reference](https://confluence.finastra.global/display/FEC/DCO+UI+-+Configurability+and+Customization)
  <li>Themes and Brand Color – Colors defined, adhere to Finastra Standards. File: _config/_app/utility/themeUtility.js</li>
  
  <li>Screen Labels Customization – File: en.json</li>

  <li>Language Translation – Files: en.json(English) , fr.json(French)</li>
  </ul>

o	Customization Configuration - [VueJs Configuration Reference](https://cli.vuejs.org/config/)<br />
o	Pre-requisites : <br />
  <ul>
    <li>NodeJS 8.x and above</li>
    <li>VueJS versions - 2.6.11 and above</li>
    <li>Vuetify versions - 2.2.11 and above</li>
  </ul>
</p>

---
# Project setup
```
npm install
```
> This will install the packages and build the app.

#### How to run the server and browse the application
##### Compiles and hot-reloads the resources for development
```
npm run serve
```
> This will start the node server with set of configuration and launch the app.<br />
> Browse the application in [http://localhost:8080](http://localhost:8080)<br />
> Application's Login ID/Password : <b><i>customer</i></b>

#### Enabling/Disabling - https
###### Client
<p>In <i>vue.config.js</i> file, remove the certificate and key as mentioned in line #101</p>

###### Server
<p>In <i>.env.dev</i> file, set the <i>ENABLE_SSL</i> variable with boolean value<br />
Default: true</p>

#### Run your unit tests
```
npm run test:unit
```
#### Run your end-to-end tests
```
npm run test:e2e
```
#### Lints and fixes files
```
npm run lint
```
> Run Linter (ES Lint) and fix code standard issues

