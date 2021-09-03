# RealStore-Api

## Step 1: Implemented Onion Architecture API ( Typescript, Mongoose)

![image](https://user-images.githubusercontent.com/16321880/131994556-6a783898-44e5-4db1-9da7-8848a4b89f52.png)

- [1] Implemented typscript interfaces with Mongoose Models
- [2] Implemented yup validation to validated Request `Body / Params / Query` based on yup validation Schema defiend.
- [3] Request validator middleware is introduce to make sure the defiend yup schema validation.
- [4] Typescript schema is totally sync with mongoose Models.
- [5] `bcrypt` is used for passwords encryption
- [6] `mongoose @pre( Save ) middleware` encrypt user passwords before saving it to database.

## Step 2: Introduce Typegoose in my API

- [1] Replaced my Typescript Inteface & Mongoose Model with only one ES6 class and `typegoose decorators`
- [2] delete all unused code and saved many MBS.





