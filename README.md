# **_PH UNIVERSITY MANAGEMENT SYSTEM_**

**\_Using TypeScript to create an Express application, integrating MongoDB with Mongoose to run the system,and use Mongoose schema validation to guarantee data integrity.**


# ***system requirement***

 - [***PH University Requirement Analysis***](https://www.notion.so/ph-university-requirement-analysis-14e84b2b67a08084a143ce90320802f0?pvs=4)


## 💡 **_Features_**

- **_TypeScript_** The application is built with TypeScript to ensure type safety and better maintainability.
- **_Express-based API_** The application exposes RESTful API endpoints to manage stationery products & orders.
- **_MongoDB Integration_** MongoDB is used as the database to store stationery products & order information.
- **_Mongoose Schema Validation_** Mongoose schema validation ensures data integrity by enforcing data types, required fields, and custom validation rules.

## ⚡ **_Project Setup_**

### **_prerequisites_**

- **_Node.js_**
- **_MongoDB_**
- **_TypeScript_**
- **_npm (package manager)_**

### **_installation_**

**_Clone the repository_**

```bash
git clone https://github.com/your-username/stationery-store.git
cd stationery-store
```

**_install dependencies `npm` or `yarn`_**

```bash
npm install
```

**_or_**

```bash
yarn install
```

**_Configure MongoDB_**

- make sure MongoDB running locally or use a MongoDB service like MongoDB Atlas
- create **_`.env`_** file at the root folder-

```env
DATABASE_URL=mongodb://localhost:27017/stationery-store
PORT=3000
```

**_Compile TypeScript_**

```bash
yarn tsc
```

**_or_**

```bash
npm run tsc
```

**_Start application_**

```bash
yarn start
```

**_or_**

```bash
npm run start
```

✨ **_Api Endpoints_**

- **_`/api/users`_**


  - **_POST_**


- **_`/api/student`_**
