backend (node express):
npm init 
npm install express
npm install axios cors

frontend (react):
npm install react-router-dom


For Developing:
must have both frontend and backend opened.

For documentation:
Due to CORS, cannot fetch the dataset directly in frontend, therefore, node express is used as a backend service to connect to the dataset.
Programme information dataset includes event id, venue id etc. As we want to display the exact location of the venue instead of only showing the id, another dataset "Venues of programmes" is used (also in XML).

https://www.lcsd.gov.hk/datagovhk/event/data_dictionary.pdf 