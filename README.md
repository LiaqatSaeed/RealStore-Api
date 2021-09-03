# RealStore-Api

## Step 1: Implemented Onion Architecture API ( Typescript, Mongoose)

![image](https://user-images.githubusercontent.com/16321880/131994556-6a783898-44e5-4db1-9da7-8848a4b89f52.png)

- [x] Implemented typscript interfaces with Mongoose Models
- [x] Implemented yup validation to validated Request `Body / Params / Query` based on yup validation Schema defiend.
- [x] Request validator middleware is introduce to make sure the defiend yup schema validation.
- [x] Typescript schema is totally sync with mongoose Models.
- [x] `bcrypt` is used for passwords encryption
- [x] `mongoose @pre( Save ) middleware` encrypt user passwords before saving it to database.

## Step 2: Introduce Typegoose in my API

- [x] Replaced my Typescript Inteface & Mongoose Model with only one ES6 class and `typegoose decorators`
- [x] delete all unused code and saved many MBS.





